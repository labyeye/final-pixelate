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
    "createNdaApproval",
    ()=>createNdaApproval,
    "createOnboarding",
    ()=>createOnboarding,
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
    "getNdaApprovals",
    ()=>getNdaApprovals,
    "getOnboardings",
    ()=>getOnboardings,
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
    const col = await getCollection("clients");
    return col.find().toArray();
}
async function createClient(client) {
    const col = await getCollection("clients");
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
    const col = await getCollection("services");
    return col.find().toArray();
}
async function createService(service) {
    const col = await getCollection("services");
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
    const col = await getCollection("inventory");
    return col.find().toArray();
}
async function createInventory(item) {
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
        gstPercentage: item.gstPercentage != null ? Number(item.gstPercentage) : null,
        gstAmount: item.gstAmount != null ? Number(item.gstAmount) : 0,
        status: Number(item.quantityAvailable || 0) > 0 ? "Available" : "Booked",
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
    const col = await getCollection("inventory");
    const updateDoc = {
        ...update,
        updatedAt: new Date()
    };
    if (updateDoc.price != null) updateDoc.sellingPrice = Number(updateDoc.price);
    const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
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
    const col = await getCollection("inventory");
    const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
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
    const col = await getCollection("inventory");
    for (const it of items){
        try {
            const id = it.inventoryId || it._id || it.id;
            const qty = Number(it.quantity || 0);
            if (!id || qty === 0) continue;
            const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
            const filter = hex24 ? {
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
            } : {
                id
            };
            const doc = await col.findOne(filter);
            if (!doc) continue;
            const current = Number(doc.quantityAvailable || 0);
            const next = direction === "decrement" ? current - qty : current + qty;
            const status = next > 0 ? "Available" : "Booked";
            await col.updateOne(filter, {
                $set: {
                    quantityAvailable: next,
                    status,
                    updatedAt: new Date()
                }
            });
        } catch (e) {
            console.error("Error adjusting inventory", e);
        }
    }
}
async function getTeamMembers() {
    // Team members are now stored in the 'users' collection with a jobRole field
    const col = await getCollection("users");
    return col.find({
        jobRole: {
            $exists: true
        }
    }).toArray();
}
async function createTeamMember(member) {
    // Create a user document representing a team member. Map member.role -> jobRole and default auth role to staff
    const usersCol = await getCollection("users");
    const toInsert = {
        ...member,
        jobRole: member.role ?? member.jobRole,
        role: member.authRole ?? "staff",
        createdAt: new Date()
    };
    // remove old role field used for job title
    delete toInsert.role; // we'll set auth role below
    const authRole = member.loginRole ?? member.authRole ?? "staff";
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
    const col = await getCollection("users");
    return col.find().toArray();
}
async function createUser(user) {
    const col = await getCollection("users");
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
    if (!id) return null;
    // 1. Try finding by _id as raw String first (common in this DB)
    const byRawId = await col.findOne({
        _id: id
    });
    if (byRawId) return byRawId;
    // 2. Try Mongo ObjectId if it matches the format
    const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
    if (hex24) {
        try {
            const byObjectId = await col.findOne({
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
            });
            if (byObjectId) return byObjectId;
        } catch (e) {
        /* ignore */ }
    }
    // 3. For invoices, try lookup by invoiceNo (e.g. PN-2025/001)
    if (collectionName === "invoices") {
        const byInvoiceNo = await col.findOne({
            invoiceNo: id
        });
        if (byInvoiceNo) return byInvoiceNo;
    }
    // 4. Try fallback to custom `id` field
    const byCustomId = await col.findOne({
        id: id
    });
    return byCustomId;
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
    const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
    if (hex24) {
        await col.updateOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
        }, {
            $set: updateDoc
        });
        return findById(collectionName, id);
    }
    // try update by custom `id` field; for invoices also allow invoiceNo
    if (collectionName === "invoices") {
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
    const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
    if (hex24) {
        try {
            // If deleting an invoice by ObjectId, restore inventory quantities first
            if (collectionName === "invoices") {
                const doc = await col.findOne({
                    _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
                });
                if (doc && Array.isArray(doc.inventoryItems) && doc.inventoryItems.length) {
                    try {
                        const items = doc.inventoryItems.map((r)=>({
                                inventoryId: r.inventoryId,
                                quantity: Number(r.quantity || 0)
                            }));
                        await adjustInventoryQuantities(items, "increment");
                    } catch (e) {
                        console.error("Failed to restore inventory on invoice delete", e);
                    }
                }
            }
            const res = await col.deleteOne({
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
            });
            return res.deletedCount === 1;
        } catch (e) {
            console.error("Error deleting document", e);
            return false;
        }
    }
    // For invoices, also try by invoiceNo
    if (collectionName === "invoices") {
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
                    await adjustInventoryQuantities(items, "increment");
                }
            } catch (e) {
                console.error("Failed to restore inventory on invoice delete", e);
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
    const col = await getCollection("invoices");
    return col.find().toArray();
}
async function renumberInvoices(financialYear) {
    const col = await getCollection("invoices");
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
        const padded = String(counter).padStart(5, "0");
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
    const col = await getCollection("invoices");
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
        const regex = new RegExp(`^KTS/${fy.replace(/[-\\/]/g, "\\$&")}/(\\d+)$`);
        const docs = await col.find({
            invoiceNo: {
                $regex: `^KTS/${fy.replace(/[-\\/]/g, "\\$&")}/`
            }
        }).project({
            invoiceNo: 1
        }).toArray();
        let maxNum = 0;
        for (const d of docs){
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
            await adjustInventoryQuantities(items, "decrement");
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
    const col = await getCollection("quotations");
    return col.find().toArray();
}
async function createQuotation(q) {
    const col = await getCollection("quotations");
    // generate human-friendly id like pn-00001
    try {
        const last = await col.find({}).sort({
            createdAt: -1
        }).limit(1).toArray();
        let lastNum = 0;
        if (last && last.length) {
            const lastId = last[0].id || last[0]._id || "";
            const match = String(lastId).match(/pn-(\d+)/i);
            if (match) lastNum = parseInt(match[1], 10);
        }
        const nextNum = lastNum + 1;
        const padded = String(nextNum).padStart(5, "0");
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
async function getNdaApprovals() {
    const col = await getCollection("nda_approvals");
    return col.find().toArray();
}
async function createNdaApproval(data) {
    const col = await getCollection("nda_approvals");
    const toInsert = {
        ...data,
        createdAt: new Date()
    };
    const res = await col.insertOne(toInsert);
    return {
        ...toInsert,
        _id: res.insertedId
    };
}
async function getOnboardings() {
    const col = await getCollection("onboardings");
    return col.find().sort({
        createdAt: -1
    }).toArray();
}
async function createOnboarding(data) {
    const col = await getCollection("onboardings");
    const toInsert = {
        ...data,
        createdAt: new Date()
    };
    const res = await col.insertOne(toInsert);
    return {
        ...toInsert,
        _id: res.insertedId
    };
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
    deleteById,
    getNdaApprovals,
    createNdaApproval,
    getOnboardings,
    createOnboarding
};
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/nav-config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clientNavItems",
    ()=>clientNavItems,
    "clientPortalGroups",
    ()=>clientPortalGroups,
    "defaultClientAllowed",
    ()=>defaultClientAllowed,
    "defaultStaffAllowed",
    ()=>defaultStaffAllowed,
    "navGroups",
    ()=>navGroups
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-route] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column-increasing.js [app-route] (ecmascript) <export default as BarChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/activity.js [app-route] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/users.js [app-route] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/megaphone.js [app-route] (ecmascript) <export default as Megaphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$kanban$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__KanbanSquare$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/square-kanban.js [app-route] (ecmascript) <export default as KanbanSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/life-buoy.js [app-route] (ecmascript) <export default as LifeBuoy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-route] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/lock.js [app-route] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/star.js [app-route] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/file-text.js [app-route] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/receipt.js [app-route] (ecmascript) <export default as Receipt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareCheck$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/square-check.js [app-route] (ecmascript) <export default as SquareCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-route] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BoxIcon$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/box.js [app-route] (ecmascript) <export default as BoxIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-route] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/code.js [app-route] (ecmascript) <export default as Code>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/image.js [app-route] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-route] (ecmascript) <export default as PlayCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/settings.js [app-route] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/mail.js [app-route] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-route] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/wallet.js [app-route] (ecmascript) <export default as Wallet>");
;
const defaultStaffAllowed = [
    "/dashboard",
    "/leads",
    "/blogs",
    "/work-gallery",
    "/enquiries",
    "/reviews",
    "/quotations",
    "/quotations/create"
];
const navGroups = [
    {
        title: "Overview",
        items: [
            {
                href: "/dashboard",
                label: "Dashboard",
                adminOnly: false,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
            },
            {
                href: "/analytics",
                label: "Analytics",
                adminOnly: false,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__["BarChart"]
            },
            {
                href: "/user-activity",
                label: "User Activity",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"]
            },
            {
                href: "/profile",
                label: "Profile",
                adminOnly: false,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
            },
            {
                href: "/announcement-bar",
                label: "Announcements",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__["Megaphone"]
            },
            {
                href: "/newsletter",
                label: "Newsletter",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"]
            },
            {
                href: "/dashboard/reports",
                label: "Reports",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
            },
            {
                href: "/dashboard/settings",
                label: "Settings",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"]
            }
        ]
    },
    {
        title: "Sales & CRM",
        items: [
            {
                href: "/leads",
                label: "Leads",
                adminOnly: false,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$kanban$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__KanbanSquare$3e$__["KanbanSquare"]
            },
            {
                href: "/enquiries",
                label: "Enquiries",
                adminOnly: false,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__["LifeBuoy"]
            },
            {
                href: "/onboarding",
                label: "Onboarding",
                adminOnly: false,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"]
            },
            {
                href: "/nda-approval",
                label: "NDA Approval",
                adminOnly: false,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"]
            },
            {
                href: "/clients",
                label: "Clients",
                adminOnly: false,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
            },
            {
                href: "/reviews",
                label: "Reviews",
                adminOnly: false,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"]
            },
            {
                href: "/quotations",
                label: "Quotations",
                adminOnly: false,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
            },
            {
                href: "/invoicing",
                label: "Invoicing",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__["Receipt"]
            }
        ]
    },
    {
        title: "Finance",
        items: [
            {
                href: "/expenses",
                label: "Expenses",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
            },
            {
                href: "/dashboard/payments",
                label: "Payments",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"]
            },
            {
                href: "/emi",
                label: "EMI Tracker",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"]
            }
        ]
    },
    {
        title: "Operations",
        items: [
            {
                href: "/tasks",
                label: "Tasks",
                adminOnly: false,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareCheck$3e$__["SquareCheck"]
            },
            {
                href: "/projects",
                label: "Projects",
                adminOnly: false,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"]
            },
            {
                href: "/inventory",
                label: "Inventory",
                adminOnly: false,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BoxIcon$3e$__["BoxIcon"]
            },
            {
                href: "/services",
                label: "Services",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"]
            }
        ]
    },
    {
        title: "Content",
        items: [
            {
                href: "/work-gallery",
                label: "Work Gallery",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"]
            },
            {
                href: "/photo-galleries",
                label: "Photos",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"]
            },
            {
                href: "/reels",
                label: "Reels",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"]
            },
            {
                href: "/blogs",
                label: "Blogs",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
            }
        ]
    },
    {
        title: "Team & Support",
        items: [
            {
                href: "/about-us-team",
                label: "About Us Team",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
            },
            {
                href: "/careers",
                label: "Careers",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"]
            },
            {
                href: "/developers-and-editors",
                label: "Developers",
                adminOnly: true,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
            },
            {
                href: "/support",
                label: "Support",
                adminOnly: false,
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__["LifeBuoy"]
            }
        ]
    }
];
const clientPortalGroups = [
    {
        title: "Overview",
        items: [
            {
                href: "/dashboard",
                label: "Dashboard",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
            },
            {
                href: "/analytics",
                label: "Analytics",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__["BarChart"]
            },
            {
                href: "/profile",
                label: "Profile",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
            }
        ]
    },
    {
        title: "Sales & CRM",
        items: [
            {
                href: "/leads",
                label: "Leads",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$kanban$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__KanbanSquare$3e$__["KanbanSquare"]
            },
            {
                href: "/enquiries",
                label: "Enquiries",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__["LifeBuoy"]
            },
            {
                href: "/onboarding",
                label: "Onboarding",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"]
            },
            {
                href: "/nda-approval",
                label: "NDA Approval",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"]
            },
            {
                href: "/clients",
                label: "Clients",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
            },
            {
                href: "/reviews",
                label: "Reviews",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"]
            },
            {
                href: "/quotations",
                label: "Quotations",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
            },
            {
                href: "/invoicing",
                label: "Invoicing",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__["Receipt"]
            },
            {
                href: "/dashboard/payments",
                label: "Payments",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"]
            }
        ]
    },
    {
        title: "Operations",
        items: [
            {
                href: "/tasks",
                label: "Tasks",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareCheck$3e$__["SquareCheck"]
            },
            {
                href: "/projects",
                label: "Projects",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"]
            },
            {
                href: "/inventory",
                label: "Inventory",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__BoxIcon$3e$__["BoxIcon"]
            },
            {
                href: "/expenses",
                label: "Expenses",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"]
            },
            {
                href: "/services",
                label: "Services",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"]
            }
        ]
    },
    {
        title: "Content",
        items: [
            {
                href: "/work-gallery",
                label: "Work Gallery",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"]
            },
            {
                href: "/photo-galleries",
                label: "Photos",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"]
            },
            {
                href: "/reels",
                label: "Reels",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__["PlayCircle"]
            },
            {
                href: "/blogs",
                label: "Blogs",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
            }
        ]
    },
    {
        title: "Team & Support",
        items: [
            {
                href: "/about-us-team",
                label: "About Us Team",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
            },
            {
                href: "/careers",
                label: "Careers",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"]
            },
            {
                href: "/developers-and-editors",
                label: "Developers",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
            },
            {
                href: "/support",
                label: "Support",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__["LifeBuoy"]
            }
        ]
    }
];
const clientNavItems = clientPortalGroups.flatMap((g)=>g.items);
const defaultClientAllowed = [
    "/invoicing",
    "/projects",
    "/support"
];
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/src/app/api/settings/client-sidebar/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/services.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$nav$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/nav-config.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    try {
        const col = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]("agencySettings");
        const doc = await col.findOne({});
        const allowedClientPages = doc?.allowedClientPages ?? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$nav$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultClientAllowed"];
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            allowedClientPages
        });
    } catch (error) {
        console.error("Error fetching client sidebar settings:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || "Failed to fetch client sidebar settings"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const { allowedClientPages } = await request.json();
        if (!Array.isArray(allowedClientPages)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "allowedClientPages must be an array"
            }, {
                status: 400
            });
        }
        const col = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]("agencySettings");
        const existing = await col.findOne({});
        if (existing) {
            await col.updateOne({}, {
                $set: {
                    allowedClientPages,
                    updatedAt: new Date()
                }
            });
        } else {
            await col.insertOne({
                allowedClientPages,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            allowedClientPages
        });
    } catch (error) {
        console.error("Error updating client sidebar settings:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || "Failed to update client sidebar settings"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5d005d2e._.js.map