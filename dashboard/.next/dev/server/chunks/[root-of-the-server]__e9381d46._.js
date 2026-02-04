module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/mongodb [external] (mongodb, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

module.exports = mod;
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "closeMongoClient",
    ()=>closeMongoClient,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getDb",
    ()=>getDb,
    "getMongoClient",
    ()=>getMongoClient
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
/**
 * Dynamic MongoDB helper
 *
 * - Reads connection info from env: MONGODB_URI (required) and optional MONGODB_DB
 * - Lazily connects and caches the client across module reloads (works in dev/Next.js)
 * - Exposes getMongoClient(), getDb(dbName?), and closeMongoClient()
 */ const uri = process.env.MONGODB_URI || process.env.MONGO_URI || "";
const defaultDbFromEnv = process.env.MONGODB_DB || process.env.MONGO_DB;
if (!uri) {
    // don't throw at import time in some environments, but surface a clear error when used
    // Consumers should handle the missing URL or provide it via env.
    // eslint-disable-next-line no-console
    console.warn("MONGODB_URI is not set. MongoDB operations will fail until it's provided.");
}
let client = global._mongoClient;
let clientPromise = global._mongoClientPromise;
function parseDbNameFromUri(connectionString) {
    if (!connectionString) return undefined;
    // strip query string
    const withoutQuery = connectionString.split("?")[0];
    // find last slash
    const lastSlash = withoutQuery.lastIndexOf("/");
    if (lastSlash === -1) return undefined;
    const db = withoutQuery.substring(lastSlash + 1);
    return db || undefined;
}
function ensureClientInitialized() {
    if (!client) {
        if (!uri) {
            return Promise.reject(new Error("MONGODB_URI is not defined."));
        }
        client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["MongoClient"](uri);
        clientPromise = client.connect();
        // Cache on global to survive hot reloads in development
        try {
            global._mongoClient = client;
            global._mongoClientPromise = clientPromise;
        } catch (e) {
        // ignore non-writable global in some runtimes
        }
    }
    // clientPromise must be set here
    return clientPromise;
}
async function getMongoClient() {
    return ensureClientInitialized();
}
async function getDb(dbName) {
    const conn = await ensureClientInitialized();
    // priority: explicit arg -> MONGODB_DB env -> DB parsed from URI -> default 'admin'
    const dbFromUri = parseDbNameFromUri(uri);
    const name = dbName || defaultDbFromEnv || dbFromUri || "admin";
    return conn.db(name);
}
async function closeMongoClient() {
    if (!client) return;
    try {
        await client.close();
    } finally{
        client = undefined;
        clientPromise = undefined;
        try {
            global._mongoClient = undefined;
            global._mongoClientPromise = undefined;
        } catch (e) {
        // ignore
        }
    }
}
const __TURBOPACK__default__export__ = getDb;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "hashPassword",
    ()=>hashPassword,
    "signToken",
    ()=>signToken,
    "verifyPassword",
    ()=>verifyPassword,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
function hashPassword(password) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hashSync(password, 10);
}
function verifyPassword(password, hash) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compareSync(password, hash);
}
function signToken(payload, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, JWT_SECRET, {
        expiresIn: "7d",
        ...opts
    });
}
function verifyToken(token) {
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
    } catch (e) {
        return null;
    }
}
const __TURBOPACK__default__export__ = {
    hashPassword,
    verifyPassword,
    signToken,
    verifyToken
};
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/services.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient,
    "createInventory",
    ()=>createInventory,
    "createInvoice",
    ()=>createInvoice,
    "createQuotation",
    ()=>createQuotation,
    "createService",
    ()=>createService,
    "createTeamMember",
    ()=>createTeamMember,
    "createUser",
    ()=>createUser,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteById",
    ()=>deleteById,
    "deleteInventory",
    ()=>deleteInventory,
    "findById",
    ()=>findById,
    "getClients",
    ()=>getClients,
    "getCollection",
    ()=>getCollection,
    "getInventory",
    ()=>getInventory,
    "getInvoices",
    ()=>getInvoices,
    "getQuotations",
    ()=>getQuotations,
    "getServices",
    ()=>getServices,
    "getTeamMembers",
    ()=>getTeamMembers,
    "getUsers",
    ()=>getUsers,
    "renumberInvoices",
    ()=>renumberInvoices,
    "updateById",
    ()=>updateById,
    "updateInventory",
    ()=>updateInventory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
;
;
async function getCollection(name) {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return db.collection(name);
}
async function getClients() {
    const col = await getCollection('clients');
    return col.find().toArray();
}
async function createClient(client) {
    const col = await getCollection('clients');
    const res = await col.insertOne({
        ...client,
        createdAt: new Date()
    });
    return {
        ...client,
        _id: res.insertedId
    };
}
async function getServices() {
    const col = await getCollection('services');
    return col.find().toArray();
}
async function createService(service) {
    const col = await getCollection('services');
    const res = await col.insertOne({
        ...service,
        createdAt: new Date()
    });
    return {
        ...service,
        _id: res.insertedId
    };
}
async function getInventory() {
    const col = await getCollection('inventory');
    return col.find().toArray();
}
async function createInventory(item) {
    const col = await getCollection('inventory');
    const toInsert = {
        itemName: item.itemName || '',
        category: item.category || '',
        quantityAvailable: Number(item.quantityAvailable || 0),
        unit: item.unit || 'pcs',
        price: Number(item.price || 0),
        sellingPrice: Number(item.price || 0),
        vendorName: item.vendorName || '',
        vendorContact: item.vendorContact || '',
        vendorGstNumber: item.vendorGstNumber || null,
        gstPercentage: item.gstPercentage != null ? Number(item.gstPercentage) : null,
        gstAmount: item.gstAmount != null ? Number(item.gstAmount) : 0,
        status: Number(item.quantityAvailable || 0) > 0 ? 'Available' : 'Booked',
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const res = await col.insertOne(toInsert);
    return {
        ...toInsert,
        _id: res.insertedId
    };
}
async function updateInventory(id, update) {
    const col = await getCollection('inventory');
    const updateDoc = {
        ...update,
        updatedAt: new Date()
    };
    if (updateDoc.price != null) updateDoc.sellingPrice = Number(updateDoc.price);
    const hex24 = typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);
    if (hex24) {
        await col.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
        }, {
            $set: updateDoc
        });
        return await col.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
        });
    }
    await col.updateOne({
        id
    }, {
        $set: updateDoc
    });
    return await col.findOne({
        id
    });
}
async function deleteInventory(id) {
    const col = await getCollection('inventory');
    const hex24 = typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);
    if (hex24) {
        const res = await col.deleteOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
        });
        return res.deletedCount === 1;
    }
    const res = await col.deleteOne({
        id
    });
    return res.deletedCount === 1;
}
// Helper to adjust stock quantities. `items` is array of { inventoryId, quantity }
async function adjustInventoryQuantities(items, direction) {
    if (!Array.isArray(items) || items.length === 0) return;
    const col = await getCollection('inventory');
    for (const it of items){
        try {
            const id = it.inventoryId || it._id || it.id;
            const qty = Number(it.quantity || 0);
            if (!id || qty === 0) continue;
            const hex24 = typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);
            const filter = hex24 ? {
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
            } : {
                id
            };
            const doc = await col.findOne(filter);
            if (!doc) continue;
            const current = Number(doc.quantityAvailable || 0);
            const next = direction === 'decrement' ? current - qty : current + qty;
            const status = next > 0 ? 'Available' : 'Booked';
            await col.updateOne(filter, {
                $set: {
                    quantityAvailable: next,
                    status,
                    updatedAt: new Date()
                }
            });
        } catch (e) {
            console.error('Error adjusting inventory', e);
        }
    }
}
async function getTeamMembers() {
    // Team members are now stored in the 'users' collection with a jobRole field
    const col = await getCollection('users');
    return col.find({
        jobRole: {
            $exists: true
        }
    }).toArray();
}
async function createTeamMember(member) {
    // Create a user document representing a team member. Map member.role -> jobRole and default auth role to staff
    const usersCol = await getCollection('users');
    const toInsert = {
        ...member,
        jobRole: member.role ?? member.jobRole,
        role: member.authRole ?? 'staff',
        createdAt: new Date()
    };
    // remove old role field used for job title
    delete toInsert.role; // we'll set auth role below
    const authRole = member.loginRole ?? member.authRole ?? 'staff';
    toInsert.role = authRole;
    // Hash password if provided (defensive)
    if (member.password) {
        toInsert.password = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hashPassword"])(member.password);
    }
    const res = await usersCol.insertOne(toInsert);
    return {
        ...toInsert,
        _id: res.insertedId
    };
}
async function getUsers() {
    const col = await getCollection('users');
    return col.find().toArray();
}
async function createUser(user) {
    const col = await getCollection('users');
    const toInsert = {
        ...user
    };
    if (toInsert.password) {
        toInsert.password = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hashPassword"])(toInsert.password);
    }
    const res = await col.insertOne({
        ...toInsert,
        createdAt: new Date()
    });
    return {
        ...toInsert,
        _id: res.insertedId
    };
}
async function findById(collectionName, id) {
    const col = await getCollection(collectionName);
    // If id looks like a 24-char hex string, treat it as Mongo ObjectId
    const hex24 = typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);
    if (hex24) {
        return col.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
        });
    }
    // For invoices, allow lookup by invoiceNo (INV-00001) as well as by `id` field
    if (collectionName === 'invoices') {
        const byInvoiceNo = await col.findOne({
            invoiceNo: id
        });
        if (byInvoiceNo) return byInvoiceNo;
    }
    // Otherwise, try to find by custom `id` field
    const byCustom = await col.findOne({
        id: id
    });
    return byCustom;
}
async function updateById(collectionName, id, update) {
    const col = await getCollection(collectionName);
    // If password is being updated, hash it before saving
    const updateDoc = {
        ...update || {}
    };
    // remove _id to avoid Mongo errors trying to modify the immutable _id field
    if (updateDoc._id) delete updateDoc._id;
    // If password is being updated, hash it before saving
    if (updateDoc && updateDoc.password) {
        updateDoc.password = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hashPassword"])(updateDoc.password);
    }
    const hex24 = typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);
    if (hex24) {
        await col.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
        }, {
            $set: updateDoc
        });
        return findById(collectionName, id);
    }
    // try update by custom `id` field; for invoices also allow invoiceNo
    if (collectionName === 'invoices') {
        const byInvoiceNo = await col.findOne({
            invoiceNo: id
        });
        if (byInvoiceNo) {
            await col.updateOne({
                _id: byInvoiceNo._id
            }, {
                $set: updateDoc
            });
            return findById(collectionName, String(byInvoiceNo._id));
        }
    }
    await col.updateOne({
        id: id
    }, {
        $set: updateDoc
    });
    return findById(collectionName, id);
}
async function deleteById(collectionName, id) {
    const col = await getCollection(collectionName);
    const hex24 = typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);
    if (hex24) {
        try {
            // If deleting an invoice by ObjectId, restore inventory quantities first
            if (collectionName === 'invoices') {
                const doc = await col.findOne({
                    _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
                });
                if (doc && Array.isArray(doc.inventoryItems) && doc.inventoryItems.length) {
                    try {
                        const items = doc.inventoryItems.map((r)=>({
                                inventoryId: r.inventoryId,
                                quantity: Number(r.quantity || 0)
                            }));
                        await adjustInventoryQuantities(items, 'increment');
                    } catch (e) {
                        console.error('Failed to restore inventory on invoice delete', e);
                    }
                }
            }
            const res = await col.deleteOne({
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
            });
            return res.deletedCount === 1;
        } catch (e) {
            console.error('Error deleting document', e);
            return false;
        }
    }
    // For invoices, also try by invoiceNo
    if (collectionName === 'invoices') {
        const byInvoiceNo = await col.findOne({
            invoiceNo: id
        });
        if (byInvoiceNo) {
            // restore inventory quantities if invoice had inventory usage
            try {
                if (Array.isArray(byInvoiceNo.inventoryItems) && byInvoiceNo.inventoryItems.length) {
                    const items = byInvoiceNo.inventoryItems.map((r)=>({
                            inventoryId: r.inventoryId,
                            quantity: Number(r.quantity || 0)
                        }));
                    await adjustInventoryQuantities(items, 'increment');
                }
            } catch (e) {
                console.error('Failed to restore inventory on invoice delete', e);
            }
            const res = await col.deleteOne({
                _id: byInvoiceNo._id
            });
            return res.deletedCount === 1;
        }
    }
    // Fall back to custom `id` field
    const res = await col.deleteOne({
        id: id
    });
    return res.deletedCount === 1;
}
async function getInvoices() {
    const col = await getCollection('invoices');
    return col.find().toArray();
}
async function renumberInvoices(financialYear) {
    const col = await getCollection('invoices');
    // fetch invoices sorted by createdAt asc
    const invoices = await col.find({}).sort({
        createdAt: 1
    }).toArray();
    if (!invoices || !invoices.length) return {
        updated: 0
    };
    let counter = 1;
    for (const inv of invoices){
        // determine fy for this invoice
        const invDate = inv.createdAt ? new Date(inv.createdAt) : new Date();
        const fy = financialYear || function getFY(d) {
            const y = d.getFullYear();
            const m = d.getMonth() + 1;
            if (m >= 4) return `${y}-${y + 1}`;
            return `${y - 1}-${y}`;
        }(invDate);
        const padded = String(counter).padStart(5, '0');
        const invoiceNo = `KTS/${fy}/${padded}`;
        await col.updateOne({
            _id: inv._id
        }, {
            $set: {
                invoiceNo,
                financialYear: fy
            }
        });
        counter++;
    }
    return {
        updated: counter - 1
    };
}
async function createInvoice(invoice) {
    const col = await getCollection('invoices');
    // generate invoice id and invoiceNo using KTS/<financialYear>/<padded>
    try {
        const now = new Date();
        const fy = invoice.financialYear || function getFY(d) {
            const y = d.getFullYear();
            const m = d.getMonth() + 1;
            // FY starts from April
            if (m >= 4) return `${y}-${y + 1}`;
            return `${y - 1}-${y}`;
        }(now);
        // find existing max number for this FY
        const regex = new RegExp(`^KTS/${fy.replace(/[-\\/]/g, '\\$&')}/(\\d+)$`);
        const docs = await col.find({
            invoiceNo: {
                $regex: `^KTS/${fy.replace(/[-\\/]/g, '\\$&')}/`
            }
        }).project({
            invoiceNo: 1
        }).toArray();
        let maxNum = 0;
        for (const d of docs){
            const s = String(d.invoiceNo || '');
            const m = s.match(/\/(\d+)$/);
            if (m) {
                const n = parseInt(m[1], 10);
                if (!isNaN(n) && n > maxNum) maxNum = n;
            }
        }
        const nextNum = maxNum + 1;
        const padded = String(nextNum).padStart(5, '0');
        const invoiceNo = `KTS/${fy}/${padded}`;
        const id = `PN-${padded}`;
        const res = await col.insertOne({
            ...invoice,
            id,
            invoiceNo,
            financialYear: fy,
            createdAt: new Date()
        });
        const created = {
            ...invoice,
            id,
            invoiceNo,
            financialYear: fy,
            _id: res.insertedId
        };
        // If invoice contains inventory usage, decrement stock
        if (Array.isArray(invoice.inventoryItems) && invoice.inventoryItems.length) {
            const items = invoice.inventoryItems.map((r)=>({
                    inventoryId: r.inventoryId,
                    quantity: Number(r.quantity || 0)
                }));
            await adjustInventoryQuantities(items, 'decrement');
        }
        return created;
    } catch (e) {
        const res = await col.insertOne({
            ...invoice,
            createdAt: new Date()
        });
        return {
            ...invoice,
            _id: res.insertedId
        };
    }
}
async function getQuotations() {
    const col = await getCollection('quotations');
    return col.find().toArray();
}
async function createQuotation(q) {
    const col = await getCollection('quotations');
    // generate human-friendly id like pn-00001
    try {
        const last = await col.find({}).sort({
            createdAt: -1
        }).limit(1).toArray();
        let lastNum = 0;
        if (last && last.length) {
            const lastId = last[0].id || last[0]._id || '';
            const match = String(lastId).match(/pn-(\d+)/i);
            if (match) lastNum = parseInt(match[1], 10);
        }
        const nextNum = lastNum + 1;
        const padded = String(nextNum).padStart(5, '0');
        const id = `PN-${padded}`;
        const res = await col.insertOne({
            ...q,
            id,
            createdAt: new Date()
        });
        return {
            ...q,
            id,
            _id: res.insertedId
        };
    } catch (e) {
        const res = await col.insertOne({
            ...q,
            createdAt: new Date()
        });
        return {
            ...q,
            _id: res.insertedId
        };
    }
}
const __TURBOPACK__default__export__ = {
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
    deleteById
};
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/src/app/api/inventory/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/services.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const items = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getInventory"]();
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(items);
    } catch (e) {
        console.error('Error fetching inventory', e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: e.message || 'Failed to fetch inventory'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const created = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createInventory"](body);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(created, {
            status: 201
        });
    } catch (e) {
        console.error('Error creating inventory', e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: e.message || 'Failed to create inventory'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e9381d46._.js.map