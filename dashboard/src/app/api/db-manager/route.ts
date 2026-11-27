// Mongo-Compass-style access to every product database, for dashboard admins only.
// Uses DB_MANAGER_URI (admin) when set, else each product's own Mongo URI from the dashboard env.
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, BSON } from "mongodb";
import { requireAuth } from "@/lib/require-auth";
import { getDb } from "@/lib/mongodb";

const { EJSON } = BSON;
const SYSTEM_DBS = new Set(["admin", "local", "config"]);
const BANNED_OPS = /\$(where|function|accumulator)\b/; // server-side JS execution
const MAX_LIMIT = 100;

// One connection per configured URI. DB_MANAGER_URI (admin) wins if set; otherwise each product's own
// per-database user is used, so every product shows up in one list with no extra setup.
const URI_ENVS = ["DB_MANAGER_URI", "MONGODB_URI", "NESTHR_MONGO_URI", "NESTLEADS_MONGO_URI", "NESTGYM_MONGO_URI"];
declare global { var _dbMgrClients: Record<string, Promise<MongoClient>> | undefined }
async function owners() {
  const cache = (global._dbMgrClients ??= {});
  const map = new Map<string, { c: MongoClient; size?: number }>();
  const seen = new Set<string>();
  for (const k of URI_ENVS) {
    const uri = process.env[k];
    if (!uri || seen.has(uri)) continue;
    seen.add(uri);
    try {
      const c = await (cache[k] ??= new MongoClient(uri, { serverSelectionTimeoutMS: 8000 }).connect());
      const dbs = await c.db().admin().listDatabases({ nameOnly: false }).then((r) => r.databases).catch(() => c.db().admin().listDatabases({ nameOnly: true }).then((r) => r.databases as any[]));
      for (const d of dbs) if (!SYSTEM_DBS.has(d.name) && !map.has(d.name)) map.set(d.name, { c, size: (d as any).sizeOnDisk });
    } catch { delete cache[k]; } // don't cache a failed connect
  }
  if (!map.size) throw new Error("No database connection available (set DB_MANAGER_URI or the product Mongo URIs)");
  return map;
}
async function clientFor(db: string) {
  const o = (await owners()).get(db);
  if (!o) throw new Error("Database not found or not accessible");
  return o.c;
}

const parse = (s: unknown, fallback: any = {}) => {
  if (s == null || s === "") return fallback;
  const str = typeof s === "string" ? s : JSON.stringify(s);
  if (BANNED_OPS.test(str)) throw new Error("$where/$function/$accumulator are not allowed");
  return EJSON.parse(str, { relaxed: false });
};
const out = (v: any) => EJSON.serialize(v, { relaxed: true });
const names = (db?: string | null, col?: string | null) => {
  if (!db || SYSTEM_DBS.has(db) || !/^[\w-]{1,64}$/.test(db)) throw new Error("Invalid database");
  if (col !== undefined && (!col || col.startsWith("system.") || col.length > 120)) throw new Error("Invalid collection");
};

async function audit(who: any, entry: Record<string, any>) {
  try {
    await (await getDb()).collection("db_manager_audit").insertOne({ at: new Date(), by: who?.email ?? who?.id ?? "admin", ...entry });
  } catch {}
}

function guard(request: Request) {
  const auth = requireAuth(request);
  if (auth.error) return { error: auth.error };
  if ((auth.decoded as any).role !== "admin")
    return { error: NextResponse.json({ error: "forbidden" }, { status: 403 }) };
  return { who: auth.decoded };
}
const fail = (e: any) => NextResponse.json({ error: e.message ?? "failed" }, { status: 400 });

// GET ?                       -> databases
// GET ?db=x                   -> collections
// GET ?db=x&col=y&filter=&sort=&skip=&limit=  -> documents
export async function GET(request: NextRequest) {
  const g = guard(request);
  if (g.error) return g.error;
  const sp = new URL(request.url).searchParams;
  const db = sp.get("db"), col = sp.get("col");
  try {
    if (!db) {
      const m = await owners();
      return NextResponse.json({ databases: [...m].map(([name, v]) => ({ name, sizeOnDisk: v.size })).sort((a, b) => a.name.localeCompare(b.name)) });
    }
    names(db);
    const c = await clientFor(db);
    if (!col) {
      const cols = await c.db(db).listCollections({}, { nameOnly: true }).toArray();
      const list = await Promise.all(
        cols.filter((x) => !x.name.startsWith("system.")).sort((a, b) => a.name.localeCompare(b.name))
          .map(async (x) => ({ name: x.name, count: await c.db(db).collection(x.name).estimatedDocumentCount() })),
      );
      return NextResponse.json({ collections: list });
    }
    names(db, col);
    const filter = parse(sp.get("filter"));
    const sort = parse(sp.get("sort"), { _id: -1 });
    const limit = Math.min(Math.max(parseInt(sp.get("limit") ?? "25") || 25, 1), MAX_LIMIT);
    const skip = Math.max(parseInt(sp.get("skip") ?? "0") || 0, 0);
    const coll = c.db(db).collection(col);
    const [docs, total] = await Promise.all([
      coll.find(filter, { sort, skip, limit, maxTimeMS: 10000 }).toArray(),
      coll.countDocuments(filter, { maxTimeMS: 10000 }),
    ]);
    return NextResponse.json({ docs: out(docs), total, skip, limit });
  } catch (e) { return fail(e); }
}

// POST { op: "insert"|"replace"|"delete", db, col, doc?, id? }
// Replace/delete address one document by _id (EJSON), so a bad filter can never touch many rows.
export async function POST(request: NextRequest) {
  const g = guard(request);
  if (g.error) return g.error;
  try {
    const b = await request.json();
    names(b.db, b.col);
    const coll = (await clientFor(b.db)).db(b.db).collection(b.col);
    const doc = b.doc !== undefined ? parse(b.doc) : undefined;
    if (b.op === "insert") {
      const r = await coll.insertOne(doc);
      await audit(g.who, { op: "insert", db: b.db, col: b.col, id: out(r.insertedId) });
      return NextResponse.json({ ok: true, id: out(r.insertedId) });
    }
    const _id = parse(b.id, undefined);
    if (_id === undefined) throw new Error("id required");
    const before = await coll.findOne({ _id });
    if (!before) throw new Error("Document not found");
    if (b.op === "replace") {
      if (doc._id !== undefined && String(doc._id) !== String(_id)) throw new Error("_id cannot be changed");
      delete doc._id;
      await coll.replaceOne({ _id }, doc);
    } else if (b.op === "delete") {
      await coll.deleteOne({ _id });
    } else throw new Error("Unknown op");
    // keep the previous version so any change/delete can be undone by hand
    await audit(g.who, { op: b.op, db: b.db, col: b.col, id: out(_id), before: out(before) });
    return NextResponse.json({ ok: true });
  } catch (e) { return fail(e); }
}
