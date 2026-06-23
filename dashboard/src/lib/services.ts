import { getDb } from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth";
import { ObjectId } from "mongodb";

export function getFinancialYear(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (month >= 4) {
    return `${year}-${year + 1}`;
  } else {
    return `${year - 1}-${year}`;
  }
}

export async function getCollection(name: string) {
  const db = await getDb();
  return db.collection(name);
}

export async function getClients(projection?: Record<string, 1 | 0>) {
  const col = await getCollection("clients");
  return col.find({}, { projection }).toArray();
}

export async function createClient(client: any) {
  const col = await getCollection("clients");
  const res = await col.insertOne({ ...client, createdAt: new Date() });
  return { ...client, _id: res.insertedId };
}

export async function getServices() {
  const col = await getCollection("services");
  return col.find().toArray();
}

export async function createService(service: any) {
  const col = await getCollection("services");
  const res = await col.insertOne({ ...service, createdAt: new Date() });
  return { ...service, _id: res.insertedId };
}

export async function getInventory() {
  const col = await getCollection("inventory");
  return col.find().toArray();
}

export async function createInventory(item: any) {
  const col = await getCollection("inventory");
  const toInsert = {
    itemName: item.itemName || "",
    category: item.category || "",
    quantityAvailable: Number(item.quantityAvailable || 0),
    unit: item.unit || "pcs",
    price: Number(item.price || 0),
    sellingPrice: Number(item.price || 0),
    vendorName: item.vendorName || "",
    vendorContact: item.vendorContact || "",
    vendorGstNumber: item.vendorGstNumber || null,
    gstPercentage:
      item.gstPercentage != null ? Number(item.gstPercentage) : null,
    gstAmount: item.gstAmount != null ? Number(item.gstAmount) : 0,
    status: Number(item.quantityAvailable || 0) > 0 ? "Available" : "Booked",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const res = await col.insertOne(toInsert);
  return { ...toInsert, _id: res.insertedId };
}

export async function updateInventory(id: string, update: any) {
  const col = await getCollection("inventory");
  const updateDoc: any = { ...update, updatedAt: new Date() };
  if (updateDoc.price != null) updateDoc.sellingPrice = Number(updateDoc.price);
  const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
  if (hex24) {
    await col.updateOne({ _id: new ObjectId(id) }, { $set: updateDoc });
    return (await col.findOne({ _id: new ObjectId(id) })) as any;
  }
  await col.updateOne({ id }, { $set: updateDoc });
  return await col.findOne({ id });
}

export async function deleteInventory(id: string) {
  return softDeleteById("inventory", id);
}

export async function softDeleteById(
  collectionName: string,
  id: string,
  collectionLabel?: string,
): Promise<boolean> {
  const normalizedId = String(id ?? "").trim();
  if (
    !normalizedId ||
    normalizedId === "undefined" ||
    normalizedId === "null"
  ) {
    return false;
  }

  const col = await getCollection(collectionName);
  const trash = await getCollection("_trash");

  const hex24 = /^[a-fA-F0-9]{24}$/.test(normalizedId);

  let doc: any = null;
  let filter: any = null;

  if (hex24) {
    try {
      doc = await col.findOne({ _id: new ObjectId(normalizedId) });
      if (doc) filter = { _id: new ObjectId(normalizedId) };
    } catch (_) {}
  }
  if (!doc) {
    doc = await col.findOne({ _id: normalizedId } as any);
    if (doc) filter = { _id: normalizedId };
  }
  if (!doc) {
    doc = await col.findOne({ id: normalizedId });
    if (doc) filter = { id: normalizedId };
  }
  if (!doc && collectionName === "invoices") {
    doc = await col.findOne({ invoiceNo: normalizedId });
    if (doc) filter = { invoiceNo: normalizedId };
  }
  if (!doc || !filter) return false;

  if (collectionName === "invoices") {
    if (Array.isArray(doc.inventoryItems) && doc.inventoryItems.length) {
      try {
        const items = doc.inventoryItems.map((r: any) => ({
          inventoryId: r.inventoryId,
          quantity: Number(r.quantity || 0),
        }));
        await adjustInventoryQuantities(items, "increment");
      } catch (e) {
        console.error("Failed to restore inventory on soft-delete", e);
      }
    }
  }

  const LABELS: Record<string, string> = {
    invoices: "Invoice",
    leads: "Lead",
    clients: "Client",
    quotations: "Quotation",
    projects: "Project",
    tasks: "Task",
    expenses: "Expense",
    emi: "EMI",
    inventory: "Inventory",
    services: "Service",
    blogs: "Blog",
    reels: "Reel",
    photoGalleries: "Photo Gallery",
    workGallery: "Work Gallery",
    enquiries: "Enquiry",
    supportTickets: "Support Ticket",
    journey_events: "Journey Event",
    teamMembers: "Team Member",
    careers: "Career",
  };

  await trash.insertOne({
    _originalId: String(doc._id),
    originalCollection: collectionName,
    collectionLabel:
      collectionLabel ?? LABELS[collectionName] ?? collectionName,
    document: doc,
    deletedAt: new Date(),
  });

  const res = await col.deleteOne(filter);
  return res.deletedCount === 1;
}

export async function restoreFromTrash(trashId: string): Promise<boolean> {
  const normalizedId = String(trashId ?? "").trim();
  if (
    !normalizedId ||
    normalizedId === "undefined" ||
    normalizedId === "null"
  ) {
    return false;
  }

  const trash = await getCollection("_trash");

  let trashDoc: any = null;
  if (/^[a-fA-F0-9]{24}$/.test(normalizedId)) {
    try {
      trashDoc = await trash.findOne({ _id: new ObjectId(normalizedId) });
    } catch (_) {}
  }
  if (!trashDoc) {
    trashDoc = await trash.findOne({ _id: normalizedId } as any);
  }
  if (!trashDoc) return false;

  const originalCol = await getCollection(trashDoc.originalCollection);
  const doc = { ...trashDoc.document };

  if (trashDoc._originalId && /^[a-fA-F0-9]{24}$/.test(trashDoc._originalId)) {
    doc._id = new ObjectId(trashDoc._originalId);
  }

  if (trashDoc.originalCollection === "invoices") {
    if (Array.isArray(doc.inventoryItems) && doc.inventoryItems.length) {
      try {
        const items = doc.inventoryItems.map((r: any) => ({
          inventoryId: r.inventoryId,
          quantity: Number(r.quantity || 0),
        }));
        await adjustInventoryQuantities(items, "decrement");
      } catch (e) {
        console.error("Failed to re-decrement inventory on restore", e);
      }
    }
  }

  try {
    await originalCol.insertOne(doc);
  } catch (e: any) {
    if (e?.code === 11000) {
      delete doc._id;
      await originalCol.insertOne(doc);
    } else {
      throw e;
    }
  }

  await trash.deleteOne({ _id: trashDoc._id });
  return true;
}

export async function permanentlyDestroyTrashItem(
  trashId: string,
): Promise<boolean> {
  const normalizedId = String(trashId ?? "").trim();
  if (
    !normalizedId ||
    normalizedId === "undefined" ||
    normalizedId === "null"
  ) {
    return false;
  }

  const trash = await getCollection("_trash");
  let res;
  if (/^[a-fA-F0-9]{24}$/.test(normalizedId)) {
    try {
      res = await trash.deleteOne({ _id: new ObjectId(normalizedId) });
    } catch (_) {
      res = await trash.deleteOne({ _id: normalizedId } as any);
    }
  } else {
    res = await trash.deleteOne({ _id: normalizedId } as any);
  }
  return (res?.deletedCount ?? 0) === 1;
}

async function adjustInventoryQuantities(
  items: any[],
  direction: "decrement" | "increment",
) {
  if (!Array.isArray(items) || items.length === 0) return;
  const col = await getCollection("inventory");
  for (const it of items) {
    try {
      const id = it.inventoryId || it._id || it.id;
      const qty = Number(it.quantity || 0);
      if (!id || qty === 0) continue;
      const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
      const filter = hex24 ? { _id: new ObjectId(id) } : { id };
      const doc = await col.findOne(filter);
      if (!doc) continue;
      const current = Number(doc.quantityAvailable || 0);
      const next = direction === "decrement" ? current - qty : current + qty;
      const status = next > 0 ? "Available" : "Booked";
      await col.updateOne(filter, {
        $set: { quantityAvailable: next, status, updatedAt: new Date() },
      });
    } catch (e) {
      console.error("Error adjusting inventory", e);
    }
  }
}

export async function getTeamMembers() {
  const col = await getCollection("users");
  return col.find({ jobRole: { $exists: true } }).toArray();
}

export async function createTeamMember(member: any) {
  const usersCol = await getCollection("users");
  const toInsert = {
    ...member,
    jobRole: member.role ?? member.jobRole,
    role: member.authRole ?? "staff",
    createdAt: new Date(),
  };

  delete toInsert.role;
  const authRole = member.loginRole ?? member.authRole ?? "staff";
  toInsert.role = authRole;

  if (member.password) {
    toInsert.password = hashPassword(member.password);
  }
  const res = await usersCol.insertOne(toInsert);
  return { ...toInsert, _id: res.insertedId };
}

export async function getUsers() {
  const col = await getCollection("users");
  return col.find().toArray();
}

export async function getUserByEmail(email: string) {
  const col = await getCollection("users");
  return col.findOne({ email });
}

export async function createUser(user: any) {
  const col = await getCollection("users");
  const toInsert = { ...user };
  if (toInsert.password) {
    toInsert.password = hashPassword(toInsert.password);
  }
  const res = await col.insertOne({ ...toInsert, createdAt: new Date() });
  return { ...toInsert, _id: res.insertedId };
}

export async function findById(collectionName: string, id: string) {
  const col = await getCollection(collectionName);

  if (!id) return null;

  const byRawId = await col.findOne({ _id: id } as any);
  if (byRawId) return byRawId;

  const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
  if (hex24) {
    try {
      const byObjectId = await col.findOne({ _id: new ObjectId(id) });
      if (byObjectId) return byObjectId;
    } catch (e) {}
  }

  if (collectionName === "invoices") {
    const byInvoiceNo = await col.findOne({ invoiceNo: id });
    if (byInvoiceNo) return byInvoiceNo;
  }

  const byCustomId = await col.findOne({ id: id });
  return byCustomId;
}

export async function updateById(
  collectionName: string,
  id: string,
  update: any,
) {
  const col = await getCollection(collectionName);

  const updateDoc = { ...(update || {}) };

  if (updateDoc._id) delete updateDoc._id;

  if (updateDoc && updateDoc.password) {
    updateDoc.password = hashPassword(updateDoc.password);
  }
  const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
  if (hex24) {
    await col.updateOne({ _id: new ObjectId(id) }, { $set: updateDoc });
    return findById(collectionName, id);
  }

  if (collectionName === "invoices") {
    const byInvoiceNo = await col.findOne({ invoiceNo: id });
    if (byInvoiceNo) {
      await col.updateOne({ _id: byInvoiceNo._id }, { $set: updateDoc });
      return findById(collectionName, String(byInvoiceNo._id));
    }
  }
  await col.updateOne({ id: id }, { $set: updateDoc });
  return findById(collectionName, id);
}

export async function deleteById(collectionName: string, id: string) {
  return softDeleteById(collectionName, id);
}

export async function getInvoices() {
  const col = await getCollection("invoices");
  return col.find().toArray();
}

export async function renumberInvoices(_financialYear?: string) {
  const col = await getCollection("invoices");

  const invoices = await col.find({}).sort({ createdAt: 1 }).toArray();
  if (!invoices || !invoices.length) return { updated: 0 };

  const settingsCol = await getCollection("agencySettings");
  const settings = await settingsCol.findOne({});
  const prefix = settings?.invoicePrefix ?? "KHT/";
  const startNum = settings?.invoiceStartNumber ?? 1;

  let counter = startNum;
  for (const inv of invoices) {
    const padded = String(counter).padStart(4, "0");
    const invoiceNo = `${prefix}${padded}`;
    await col.updateOne({ _id: inv._id }, { $set: { invoiceNo } });
    counter++;
  }
  return { updated: counter - 1 };
}

export async function createInvoice(invoice: any) {
  const col = await getCollection("invoices");

  try {
    const settingsCol = await getCollection("agencySettings");
    const settings = await settingsCol.findOne({});
    const prefix = settings?.invoicePrefix ?? "KHT/";
    const startNum = settings?.invoiceStartNumber ?? 1;

    const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`^${escapedPrefix}(\\d+)$`);
    const docs = await col
      .find({ invoiceNo: { $regex: `^${escapedPrefix}` } })
      .project({ invoiceNo: 1 })
      .toArray();
    let maxNum = startNum - 1;
    for (const d of docs) {
      const s = String(d.invoiceNo || "");
      const m = s.match(regex);
      if (m) {
        const n = parseInt(m[1], 10);
        if (!isNaN(n) && n > maxNum) maxNum = n;
      }
    }
    const nextNum = maxNum + 1;
    const padded = String(nextNum).padStart(4, "0");
    const invoiceNo = `${prefix}${padded}`;
    const id = `KHT-${padded}`;
    const res = await col.insertOne({
      ...invoice,
      id,
      invoiceNo,
      createdAt: new Date(),
    });
    const created = {
      ...invoice,
      id,
      invoiceNo,
      _id: res.insertedId,
    };

    if (
      Array.isArray(invoice.inventoryItems) &&
      invoice.inventoryItems.length
    ) {
      const items = invoice.inventoryItems.map((r: any) => ({
        inventoryId: r.inventoryId,
        quantity: Number(r.quantity || 0),
      }));
      await adjustInventoryQuantities(items, "decrement");
    }
    return created;
  } catch (e) {
    const res = await col.insertOne({ ...invoice, createdAt: new Date() });
    return { ...invoice, _id: res.insertedId };
  }
}

export async function getQuotations() {
  const col = await getCollection("quotations");
  return col.find().toArray();
}

export async function createQuotation(q: any) {
  const col = await getCollection("quotations");

  try {
    const last = await col.find({}).sort({ createdAt: -1 }).limit(1).toArray();
    let lastNum = 0;
    if (last && last.length) {
      const lastId = last[0].id || last[0]._id || "";
      const match = String(lastId).match(/pn-(\d+)/i);
      if (match) lastNum = parseInt(match[1], 10);
    }
    const nextNum = lastNum + 1;
    const padded = String(nextNum).padStart(5, "0");
    const id = `PN-${padded}`;
    const res = await col.insertOne({ ...q, id, createdAt: new Date() });
    return { ...q, id, _id: res.insertedId };
  } catch (e) {
    const res = await col.insertOne({ ...q, createdAt: new Date() });
    return { ...q, _id: res.insertedId };
  }
}

export async function getNdaApprovals() {
  const col = await getCollection("nda_approvals");
  return col.find().toArray();
}

export async function createNdaApproval(data: any) {
  const col = await getCollection("nda_approvals");
  const toInsert = { ...data, createdAt: new Date() };
  const res = await col.insertOne(toInsert);
  return { ...toInsert, _id: res.insertedId };
}

export async function getOnboardings() {
  const col = await getCollection("onboardings");
  return col.find().sort({ createdAt: -1 }).toArray();
}

export async function createOnboarding(data: any) {
  const col = await getCollection("onboardings");
  const toInsert = { ...data, createdAt: new Date() };
  const res = await col.insertOne(toInsert);
  return { ...toInsert, _id: res.insertedId };
}

export default {
  getClients,
  createClient,
  getServices,
  createService,
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
  getTeamMembers,
  createTeamMember,
  getUsers,
  createUser,
  findById,
  updateById,
  deleteById,
  getNdaApprovals,
  createNdaApproval,
  getOnboardings,
  createOnboarding,
};
