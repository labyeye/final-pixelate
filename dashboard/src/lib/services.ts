import { getDb } from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth";
import { ObjectId } from "mongodb";

// Basic CRUD wrappers for main collections. These return plain JS objects.

export async function getCollection(name: string) {
  const db = await getDb();
  return db.collection(name);
}

// Clients
export async function getClients() {
  const col = await getCollection("clients");
  return col.find().toArray();
}

export async function createClient(client: any) {
  const col = await getCollection("clients");
  const res = await col.insertOne({ ...client, createdAt: new Date() });
  return { ...client, _id: res.insertedId };
}

// Services
export async function getServices() {
  const col = await getCollection("services");
  return col.find().toArray();
}

export async function createService(service: any) {
  const col = await getCollection("services");
  const res = await col.insertOne({ ...service, createdAt: new Date() });
  return { ...service, _id: res.insertedId };
}

// Inventory
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

/**
 * Soft-delete: snapshots the full document into the `_trash` collection and
 * removes it from the original collection. Works for any collection.
 *
 * Trash document shape:
 * {
 *   _originalId: string,          // stringified _id of original doc
 *   originalCollection: string,   // e.g. "leads", "clients"
 *   collectionLabel: string,      // human-readable label
 *   document: object,             // full original document
 *   deletedAt: Date,
 * }
 */
export async function softDeleteById(
  collectionName: string,
  id: string,
  collectionLabel?: string,
): Promise<boolean> {
  const normalizedId = String(id ?? "").trim();
  if (!normalizedId || normalizedId === "undefined" || normalizedId === "null") {
    return false;
  }

  const col = await getCollection(collectionName);
  const trash = await getCollection("_trash");

  const hex24 = /^[a-fA-F0-9]{24}$/.test(normalizedId);

  // Locate the document first
  let doc: any = null;
  let filter: any = null;

  if (hex24) {
    try {
      doc = await col.findOne({ _id: new ObjectId(normalizedId) });
      if (doc) filter = { _id: new ObjectId(normalizedId) };
    } catch (_) {}
  }
  if (!doc) {
    // Some collections may store _id as a string
    doc = await col.findOne({ _id: normalizedId } as any);
    if (doc) filter = { _id: normalizedId };
  }
  if (!doc) {
    // Try custom id field
    doc = await col.findOne({ id: normalizedId });
    if (doc) filter = { id: normalizedId };
  }
  if (!doc && collectionName === "invoices") {
    doc = await col.findOne({ invoiceNo: normalizedId });
    if (doc) filter = { invoiceNo: normalizedId };
  }
  if (!doc || !filter) return false;

  // For invoices: restore inventory quantities
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

  // Snapshot into _trash
  await trash.insertOne({
    _originalId: String(doc._id),
    originalCollection: collectionName,
    collectionLabel: collectionLabel ?? LABELS[collectionName] ?? collectionName,
    document: doc,
    deletedAt: new Date(),
  });

  // Remove from original collection
  const res = await col.deleteOne(filter);
  return res.deletedCount === 1;
}

/**
 * Restore a trashed document back to its original collection.
 * Re-decrements inventory if it was an invoice.
 */
export async function restoreFromTrash(trashId: string): Promise<boolean> {
  const normalizedId = String(trashId ?? "").trim();
  if (!normalizedId || normalizedId === "undefined" || normalizedId === "null") {
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

  // Restore _id as ObjectId if it was one
  if (trashDoc._originalId && /^[a-fA-F0-9]{24}$/.test(trashDoc._originalId)) {
    doc._id = new ObjectId(trashDoc._originalId);
  }

  // Re-decrement inventory if invoice
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
    // If duplicate _id, try without _id so Mongo assigns a new one
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

/** Permanently destroy a trashed document — no recovery possible. */
export async function permanentlyDestroyTrashItem(trashId: string): Promise<boolean> {
  const normalizedId = String(trashId ?? "").trim();
  if (!normalizedId || normalizedId === "undefined" || normalizedId === "null") {
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

// Helper to adjust stock quantities. `items` is array of { inventoryId, quantity }
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

// Team Members
export async function getTeamMembers() {
  // Team members are now stored in the 'users' collection with a jobRole field
  const col = await getCollection("users");
  return col.find({ jobRole: { $exists: true } }).toArray();
}

export async function createTeamMember(member: any) {
  // Create a user document representing a team member. Map member.role -> jobRole and default auth role to staff
  const usersCol = await getCollection("users");
  const toInsert = {
    ...member,
    jobRole: member.role ?? member.jobRole,
    role: member.authRole ?? "staff",
    createdAt: new Date(),
  };
  // remove old role field used for job title
  delete toInsert.role; // we'll set auth role below
  const authRole = member.loginRole ?? member.authRole ?? "staff";
  toInsert.role = authRole;
  // Hash password if provided (defensive)
  if (member.password) {
    toInsert.password = hashPassword(member.password);
  }
  const res = await usersCol.insertOne(toInsert);
  return { ...toInsert, _id: res.insertedId };
}

// Users
export async function getUsers() {
  const col = await getCollection("users");
  return col.find().toArray();
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

// Generic helpers for single item by id
export async function findById(collectionName: string, id: string) {
  const col = await getCollection(collectionName);

  if (!id) return null;

  // 1. Try finding by _id as raw String first (common in this DB)
  const byRawId = await col.findOne({ _id: id } as any);
  if (byRawId) return byRawId;

  // 2. Try Mongo ObjectId if it matches the format
  const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
  if (hex24) {
    try {
      const byObjectId = await col.findOne({ _id: new ObjectId(id) });
      if (byObjectId) return byObjectId;
    } catch (e) {
      /* ignore */
    }
  }

  // 3. For invoices, try lookup by invoiceNo (e.g. PN-2025/001)
  if (collectionName === "invoices") {
    const byInvoiceNo = await col.findOne({ invoiceNo: id });
    if (byInvoiceNo) return byInvoiceNo;
  }

  // 4. Try fallback to custom `id` field
  const byCustomId = await col.findOne({ id: id });
  return byCustomId;
}

export async function updateById(
  collectionName: string,
  id: string,
  update: any,
) {
  const col = await getCollection(collectionName);
  // If password is being updated, hash it before saving
  const updateDoc = { ...(update || {}) };
  // remove _id to avoid Mongo errors trying to modify the immutable _id field
  if (updateDoc._id) delete updateDoc._id;
  // If password is being updated, hash it before saving
  if (updateDoc && updateDoc.password) {
    updateDoc.password = hashPassword(updateDoc.password);
  }
  const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
  if (hex24) {
    await col.updateOne({ _id: new ObjectId(id) }, { $set: updateDoc });
    return findById(collectionName, id);
  }
  // try update by custom `id` field; for invoices also allow invoiceNo
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

// Invoices
export async function getInvoices() {
  const col = await getCollection("invoices");
  return col.find().toArray();
}

// Renumber invoices: set invoiceNo to KTS/<financialYear>/<padded> in createdAt order or single FY
export async function renumberInvoices(financialYear?: string) {
  const col = await getCollection("invoices");
  // fetch invoices sorted by createdAt asc
  const invoices = await col.find({}).sort({ createdAt: 1 }).toArray();
  if (!invoices || !invoices.length) return { updated: 0 };
  let counter = 1;
  for (const inv of invoices) {
    // determine fy for this invoice
    const invDate = inv.createdAt ? new Date(inv.createdAt) : new Date();
    const fy =
      financialYear ||
      (function getFY(d: Date) {
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        if (m >= 4) return `${y}-${y + 1}`;
        return `${y - 1}-${y}`;
      })(invDate);
    const padded = String(counter).padStart(5, "0");
    const invoiceNo = `KTS/${fy}/${padded}`;
    await col.updateOne(
      { _id: inv._id },
      { $set: { invoiceNo, financialYear: fy } },
    );
    counter++;
  }
  return { updated: counter - 1 };
}

export async function createInvoice(invoice: any) {
  const col = await getCollection("invoices");
  // generate invoice id and invoiceNo using KTS/<financialYear>/<padded>
  try {
    const now = new Date();
    const fy =
      (invoice.financialYear as string) ||
      (function getFY(d: Date) {
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        // FY starts from April
        if (m >= 4) return `${y}-${y + 1}`;
        return `${y - 1}-${y}`;
      })(now);

    // find existing max number for this FY
    const regex = new RegExp(`^KTS/${fy.replace(/[-\\/]/g, "\\$&")}/(\\d+)$`);
    const docs = await col
      .find({ invoiceNo: { $regex: `^KTS/${fy.replace(/[-\\/]/g, "\\$&")}/` } })
      .project({ invoiceNo: 1 })
      .toArray();
    let maxNum = 0;
    for (const d of docs) {
      const s = String(d.invoiceNo || "");
      const m = s.match(/\/(\d+)$/);
      if (m) {
        const n = parseInt(m[1], 10);
        if (!isNaN(n) && n > maxNum) maxNum = n;
      }
    }
    const nextNum = maxNum + 1;
    const padded = String(nextNum).padStart(5, "0");
    const invoiceNo = `KTS/${fy}/${padded}`;
    const id = `PN-${padded}`;
    const res = await col.insertOne({
      ...invoice,
      id,
      invoiceNo,
      financialYear: fy,
      createdAt: new Date(),
    });
    const created = {
      ...invoice,
      id,
      invoiceNo,
      financialYear: fy,
      _id: res.insertedId,
    };
    // If invoice contains inventory usage, decrement stock
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

// Quotations
export async function getQuotations() {
  const col = await getCollection("quotations");
  return col.find().toArray();
}

export async function createQuotation(q: any) {
  const col = await getCollection("quotations");
  // generate human-friendly id like pn-00001
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

// NDA Approvals
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

// Onboardings
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
