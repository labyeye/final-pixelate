import { MongoClient, ObjectId, Db } from "mongodb";
import { getDb } from "@/lib/mongodb";

// Whole-account removal for a product tenant, done straight on that product's Mongo DB (same root URI as /db-manager).
// Soft  = suspend now (company + every login inactive), purge automatically after 30 days, restorable until then.
// Hard  = delete the company and everything that belongs to it right now (cannot be undone).
// Only Nest HR is wired so far; add a product to SPECS to enable it.
const SPECS: Record<string, { company: string; probe: string; users: string }> = {
  hrms: { company: "companies", probe: "employees", users: "users" },
};
export const deletable = (product: string) => product in SPECS;

declare global { var _dbMgrClient: Promise<MongoClient> | undefined }
const client = () => {
  const uri = process.env.DB_MANAGER_URI;
  if (!uri) throw new Error("Not configured: add DB_MANAGER_URI to the dashboard .env");
  return (global._dbMgrClient ??= new MongoClient(uri, { serverSelectionTimeoutMS: 8000 }).connect());
};

const dbCache: Record<string, string> = {};
async function productDb(product: string, oid: ObjectId): Promise<Db> {
  const spec = SPECS[product];
  if (!spec) throw new Error("Delete is not enabled for this product yet");
  const c = await client();
  if (dbCache[product]) return c.db(dbCache[product]);
  const { databases } = await c.db().admin().listDatabases({ nameOnly: true });
  for (const d of databases) {
    if (["admin", "local", "config"].includes(d.name)) continue;
    const names = (await c.db(d.name).listCollections({}, { nameOnly: true }).toArray()).map((x) => x.name);
    if (names.includes(spec.company) && names.includes(spec.probe) && (await c.db(d.name).collection(spec.company).findOne({ _id: oid }, { projection: { _id: 1 } }))) {
      dbCache[product] = d.name;
      return c.db(d.name);
    }
  }
  throw new Error("Account not found in the product database");
}

const oidOf = (id: string) => {
  if (!/^[a-f0-9]{24}$/.test(id)) throw new Error("Invalid account id");
  return new ObjectId(id);
};

// Every collection row that belongs to this company: by company/companyId, or by one of its employees/users.
async function scope(db: Db, product: string, oid: ObjectId) {
  const spec = SPECS[product];
  const ids = [oid, String(oid)];
  const employees = (await db.collection("employees").find({ company: { $in: ids } }, { projection: { _id: 1 } }).toArray()).map((d) => d._id);
  const users = (await db.collection(spec.users).find({ company: { $in: ids } }, { projection: { _id: 1, status: 1 } }).toArray());
  const userIds = users.map((u) => u._id);
  const or: any[] = [{ company: { $in: ids } }, { companyId: { $in: ids } }];
  if (employees.length) or.push({ employee: { $in: employees } }, { employeeId: { $in: employees } });
  if (userIds.length) or.push({ user: { $in: userIds } }, { userId: { $in: userIds } });
  const cols = (await db.listCollections({}, { nameOnly: true }).toArray()).map((x) => x.name).filter((n) => !n.startsWith("system.") && n !== spec.company);
  return { filter: { $or: or }, cols, users, employees: employees.length };
}

export async function preview(product: string, id: string) {
  const oid = oidOf(id);
  const db = await productDb(product, oid);
  const company = await db.collection(SPECS[product].company).findOne({ _id: oid }, { projection: { name: 1, email: 1, status: 1 } });
  if (!company) throw new Error("Account not found");
  const s = await scope(db, product, oid);
  const counts: { collection: string; count: number }[] = [];
  for (const c of s.cols) {
    const n = await db.collection(c).countDocuments(s.filter);
    if (n) counts.push({ collection: c, count: n });
  }
  return { name: company.name as string, email: company.email as string, logins: s.users.length, employees: s.employees, counts };
}

const audit = async (entry: Record<string, unknown>, by: string) =>
  (await getDb()).collection("account_delete_audit").insertOne({ at: new Date(), by, ...entry });

export async function hardDelete(product: string, id: string, confirmName: string, by: string) {
  const oid = oidOf(id);
  const db = await productDb(product, oid);
  const spec = SPECS[product];
  const company = await db.collection(spec.company).findOne({ _id: oid }, { projection: { name: 1, email: 1 } });
  if (!company) throw new Error("Account not found");
  if (confirmName.trim() !== String(company.name).trim()) throw new Error("Confirmation name does not match");
  const s = await scope(db, product, oid);
  const deleted: Record<string, number> = {};
  for (const c of s.cols) {
    const r = await db.collection(c).deleteMany(s.filter);
    if (r.deletedCount) deleted[c] = r.deletedCount;
  }
  await db.collection(spec.company).deleteOne({ _id: oid });
  await (await getDb()).collection("account_deletions").updateMany({ product, accountId: id, state: "scheduled" }, { $set: { state: "purged", purgedAt: new Date() } });
  await audit({ op: "hard-delete", product, accountId: id, name: company.name, email: company.email, deleted }, by);
  return { deleted };
}

export async function softDelete(product: string, id: string, confirmName: string, by: string) {
  const oid = oidOf(id);
  const db = await productDb(product, oid);
  const spec = SPECS[product];
  const company = await db.collection(spec.company).findOne({ _id: oid });
  if (!company) throw new Error("Account not found");
  if (confirmName.trim() !== String(company.name).trim()) throw new Error("Confirmation name does not match");
  const rec = (await getDb()).collection("account_deletions");
  if (await rec.findOne({ product, accountId: id, state: "scheduled" })) throw new Error("Already scheduled for deletion");
  const ids = [oid, String(oid)];
  const users = await db.collection(spec.users).find({ company: { $in: ids } }, { projection: { _id: 1, status: 1 } }).toArray();
  const activeUserIds = users.filter((u) => u.status !== "inactive").map((u) => String(u._id));
  const purgeAt = new Date(Date.now() + 30 * 864e5);
  await rec.insertOne({ product, accountId: id, name: company.name, email: company.email, state: "scheduled", requestedAt: new Date(), purgeAt, by, prev: { companyStatus: company.status, activeUserIds } });
  await db.collection(spec.users).updateMany({ company: { $in: ids } }, { $set: { status: "inactive" } });
  await db.collection(spec.company).updateOne({ _id: oid }, { $set: { status: "inactive" } });
  await audit({ op: "soft-delete", product, accountId: id, name: company.name, purgeAt }, by);
  return { purgeAt };
}

export async function restore(product: string, id: string, by: string) {
  const oid = oidOf(id);
  const rec = (await getDb()).collection("account_deletions");
  const r = await rec.findOne({ product, accountId: id, state: "scheduled" });
  if (!r) throw new Error("No scheduled deletion for this account");
  const db = await productDb(product, oid);
  const spec = SPECS[product];
  const prev = r.prev as { companyStatus: string; activeUserIds: string[] };
  if (prev.activeUserIds.length) await db.collection(spec.users).updateMany({ _id: { $in: prev.activeUserIds.map((x) => new ObjectId(x)) } }, { $set: { status: "active" } });
  await db.collection(spec.company).updateOne({ _id: oid }, { $set: { status: prev.companyStatus ?? "active" } });
  await rec.updateOne({ _id: r._id }, { $set: { state: "restored", restoredAt: new Date() } });
  await audit({ op: "restore", product, accountId: id, name: r.name }, by);
}

export async function listScheduled(product?: string) {
  const q: any = { state: "scheduled" };
  if (product) q.product = product;
  return (await (await getDb()).collection("account_deletions").find(q).sort({ purgeAt: 1 }).toArray()).map((d) => ({
    product: d.product, id: d.accountId, name: d.name, email: d.email, requestedAt: d.requestedAt, purgeAt: d.purgeAt, by: d.by,
  }));
}

// Deletes every account whose 30 days are up. Called hourly from instrumentation and whenever the list is opened.
export async function purgeDue() {
  const rec = (await getDb()).collection("account_deletions");
  const due = await rec.find({ state: "scheduled", purgeAt: { $lte: new Date() } }).toArray();
  for (const d of due) {
    try {
      await hardDelete(d.product, d.accountId, String(d.name), "auto-purge (30 days)");
    } catch (e: any) {
      await rec.updateOne({ _id: d._id }, { $set: { lastError: e.message, lastErrorAt: new Date() } });
    }
  }
  return due.length;
}
