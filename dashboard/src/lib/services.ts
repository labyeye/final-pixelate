import { getDb } from '@/lib/mongodb';
import { hashPassword } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// Basic CRUD wrappers for main collections. These return plain JS objects.

export async function getCollection(name: string) {
  const db = await getDb();
  return db.collection(name);
}

// Clients
export async function getClients() {
  const col = await getCollection('clients');
  return col.find().toArray();
}

export async function createClient(client: any) {
  const col = await getCollection('clients');
  const res = await col.insertOne({ ...client, createdAt: new Date() });
  return { ...client, _id: res.insertedId };
}

// Services
export async function getServices() {
  const col = await getCollection('services');
  return col.find().toArray();
}

export async function createService(service: any) {
  const col = await getCollection('services');
  const res = await col.insertOne({ ...service, createdAt: new Date() });
  return { ...service, _id: res.insertedId };
}

// Team Members
export async function getTeamMembers() {
  // Team members are now stored in the 'users' collection with a jobRole field
  const col = await getCollection('users');
  return col.find({ jobRole: { $exists: true } }).toArray();
}

export async function createTeamMember(member: any) {
  // Create a user document representing a team member. Map member.role -> jobRole and default auth role to staff
  const usersCol = await getCollection('users');
  const toInsert = { ...member, jobRole: member.role ?? member.jobRole, role: member.authRole ?? 'staff', createdAt: new Date() };
  // remove old role field used for job title
  delete toInsert.role; // we'll set auth role below
  const authRole = member.loginRole ?? member.authRole ?? 'staff';
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
  const col = await getCollection('users');
  return col.find().toArray();
}

export async function createUser(user: any) {
  const col = await getCollection('users');
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
  return col.findOne({ _id: new ObjectId(id) });
}

export async function updateById(collectionName: string, id: string, update: any) {
  const col = await getCollection(collectionName);
  // If password is being updated, hash it before saving
  if (update && update.password) {
    update.password = hashPassword(update.password);
  }
  await col.updateOne({ _id: new ObjectId(id) }, { $set: update });
  return findById(collectionName, id);
}

export async function deleteById(collectionName: string, id: string) {
  const col = await getCollection(collectionName);
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount === 1;
}

// Invoices
export async function getInvoices() {
  const col = await getCollection('invoices');
  return col.find().toArray();
}

export async function createInvoice(invoice: any) {
  const col = await getCollection('invoices');
  const res = await col.insertOne({ ...invoice, createdAt: new Date() });
  return { ...invoice, _id: res.insertedId };
}

// Quotations
export async function getQuotations() {
  const col = await getCollection('quotations');
  return col.find().toArray();
}

export async function createQuotation(q: any) {
  const col = await getCollection('quotations');
  // generate human-friendly id like pn-00001
  try {
    const last = await col.find({}).sort({ createdAt: -1 }).limit(1).toArray();
    let lastNum = 0;
    if (last && last.length) {
      const lastId = last[0].id || last[0]._id || '';
      const match = String(lastId).match(/pn-(\d+)/i);
      if (match) lastNum = parseInt(match[1], 10);
    }
    const nextNum = lastNum + 1;
    const padded = String(nextNum).padStart(5, '0');
    const id = `PN-${padded}`;
    const res = await col.insertOne({ ...q, id, createdAt: new Date() });
    return { ...q, id, _id: res.insertedId };
  } catch (e) {
    const res = await col.insertOne({ ...q, createdAt: new Date() });
    return { ...q, _id: res.insertedId };
  }
}

export default {
  getClients,
  createClient,
  getServices,
  createService,
  getTeamMembers,
  createTeamMember,
  getUsers,
  createUser,
  findById,
  updateById,
  deleteById,
};
