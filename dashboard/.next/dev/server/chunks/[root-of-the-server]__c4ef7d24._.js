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
"[project]/Desktop/Projects/final-pixelate/dashboard/src/app/api/reports/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/services.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const clientId = searchParams.get("clientId");
        const type = searchParams.get("type");
        const from = searchParams.get("from");
        const to = searchParams.get("to");
        if (!type) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Report type is required"
            }, {
                status: 400
            });
        }
        const startDate = from ? new Date(from) : new Date(0);
        const endDate = to ? new Date(to) : new Date();
        if (to && !to.includes("T")) {
            endDate.setHours(23, 59, 59, 999);
        }
        switch(type){
            case "income":
                return await getIncomeStatement(startDate, endDate);
            case "expense":
                return await getExpenseStatement(startDate, endDate);
            case "staff":
                return await getStaffReport(startDate, endDate, searchParams.get("staffMemberId"));
            case "client":
                return await getClientReport(startDate, endDate, clientId);
            case "task":
                return await getTaskReport(startDate, endDate);
            case "dues":
                return await getDuesReport(startDate, endDate);
            case "project":
                return await getProjectReport(startDate, endDate);
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Invalid report type"
                }, {
                    status: 400
                });
        }
    } catch (error) {
        console.error("Error generating report:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || "Failed to generate report"
        }, {
            status: 500
        });
    }
}
/**
 * Helper to generate a MongoDB query that matches a field against a date range,
 * handling both native Date objects and ISO string formats.
 */ function getDateQuery(field, start, end) {
    return {
        $or: [
            {
                [field]: {
                    $gte: start,
                    $lte: end
                }
            },
            {
                [field]: {
                    $gte: start.toISOString(),
                    $lte: end.toISOString()
                }
            }
        ]
    };
}
async function getIncomeStatement(startDate, endDate) {
    const invoicesCol = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]("invoices");
    // Incomes come from either payments made in this period OR invoices created in this period (without payments)
    const invoices = await invoicesCol.find({
        $or: [
            {
                "paymentHistory.date": {
                    $gte: startDate,
                    $lte: endDate
                }
            },
            {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            },
            {
                createdAt: {
                    $gte: startDate.toISOString(),
                    $lte: endDate.toISOString()
                }
            }
        ]
    }).toArray();
    let totalRevenue = 0;
    let totalPending = 0;
    const incomeDetails = [];
    const monthlyData = {};
    invoices.forEach((inv)=>{
        const totalAmount = Number(inv.amount || 0);
        const paidAmount = Number(inv.paidAmount || 0);
        // 1. Process individual payments from history
        if (inv.paymentHistory && inv.paymentHistory.length > 0) {
            inv.paymentHistory.forEach((payment)=>{
                const pDate = new Date(payment.date);
                if (pDate >= startDate && pDate <= endDate) {
                    const amount = Number(payment.amount || 0);
                    totalRevenue += amount;
                    incomeDetails.push({
                        date: payment.date,
                        reference: inv.invoiceNo || inv.id,
                        party: inv.clientName || "Unknown",
                        description: `${inv.title || "Invoice Payment"} (${payment.mode || "Other"})`,
                        amount: amount,
                        totalAmount: totalAmount,
                        type: "Credit",
                        status: inv.status,
                        isPaymentRecord: true
                    });
                    const monthKey = `${pDate.getFullYear()}-${String(pDate.getMonth() + 1).padStart(2, "0")}`;
                    monthlyData[monthKey] = (monthlyData[monthKey] || 0) + amount;
                }
            });
        } else if (paidAmount > 0) {
            // 2. Fallback for legacy data (no history) - rely on invoice date
            const iDate = new Date(inv.createdAt);
            if (iDate >= startDate && iDate <= endDate) {
                totalRevenue += paidAmount;
                incomeDetails.push({
                    date: inv.createdAt,
                    reference: inv.invoiceNo || inv.id,
                    party: inv.clientName || "Unknown",
                    description: inv.title || "Invoice (Legacy)",
                    amount: paidAmount,
                    totalAmount: totalAmount,
                    type: "Credit",
                    status: inv.status
                });
                const monthKey = `${iDate.getFullYear()}-${String(iDate.getMonth() + 1).padStart(2, "0")}`;
                monthlyData[monthKey] = (monthlyData[monthKey] || 0) + paidAmount;
            }
        }
        // Pending for invoices CREATED in this period
        const iDate = new Date(inv.createdAt);
        if (iDate >= startDate && iDate <= endDate) {
            totalPending += totalAmount - paidAmount;
        }
    });
    const expensesCol = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]("expenses");
    const expenses = await expensesCol.find(getDateQuery("createdAt", startDate, endDate)).toArray();
    const totalExpenses = expenses.reduce((acc, curr)=>acc + Number(curr.amount || 0), 0);
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        title: "Income Statement (Cash Basis)",
        period: {
            from: startDate,
            to: endDate
        },
        summary: {
            totalRevenue,
            totalExpenses,
            netIncome: totalRevenue - totalExpenses,
            pendingIncome: totalPending
        },
        details: incomeDetails.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime()),
        monthlyBreakdown: Object.entries(monthlyData).map(([k, v])=>({
                month: k,
                amount: v
            })).sort((a, b)=>a.month.localeCompare(b.month))
    });
}
async function getDuesReport(startDate, endDate) {
    const clientsCol = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]("clients");
    const allClients = await clientsCol.find().toArray();
    const invoicesCol = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]("invoices");
    const invoices = await invoicesCol.find(getDateQuery("createdAt", startDate, endDate)).toArray();
    const clientDues = {};
    const nameToId = {};
    allClients.forEach((c)=>{
        const cId = c._id.toString();
        clientDues[cId] = {
            id: cId,
            name: c.name,
            totalBilled: 0,
            received: 0,
            pending: 0
        };
        if (c.name) nameToId[c.name.toLowerCase()] = cId;
    });
    invoices.forEach((inv)=>{
        const total = Number(inv.amount || 0);
        const paid = Number(inv.paidAmount || 0);
        let targetId = inv.clientId ? inv.clientId.toString() : null;
        if (!targetId && inv.clientName) targetId = nameToId[inv.clientName.toLowerCase()];
        const entryId = targetId || inv.clientId || inv.clientName || "unknown";
        if (!clientDues[entryId]) {
            clientDues[entryId] = {
                id: entryId,
                name: inv.clientName || "Unknown",
                totalBilled: 0,
                received: 0,
                pending: 0
            };
        }
        clientDues[entryId].totalBilled += total;
        clientDues[entryId].received += paid;
        clientDues[entryId].pending += total - paid;
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        title: "Outstanding Dues Report",
        period: {
            from: startDate,
            to: endDate
        },
        details: Object.values(clientDues).sort((a, b)=>b.pending - a.pending)
    });
}
async function getExpenseStatement(startDate, endDate) {
    const expensesCol = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]("expenses");
    const expenses = await expensesCol.find(getDateQuery("createdAt", startDate, endDate)).toArray();
    const totalExpenses = expenses.reduce((acc, curr)=>acc + Number(curr.amount || 0), 0);
    const byCategory = {};
    expenses.forEach((exp)=>{
        const cat = exp.category || "Uncategorized";
        byCategory[cat] = (byCategory[cat] || 0) + Number(exp.amount || 0);
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        title: "Expense Statement",
        period: {
            from: startDate,
            to: endDate
        },
        summary: {
            totalExpenses
        },
        byCategory: Object.entries(byCategory).map(([k, v])=>({
                category: k,
                amount: v
            })),
        details: expenses.map((exp)=>({
                date: exp.createdAt,
                reference: exp.id || "-",
                party: exp.vendor || exp.paidTo || "-",
                description: exp.description || exp.category,
                amount: exp.amount,
                type: "Debit"
            }))
    });
}
async function getStaffReport(startDate, endDate, staffMemberId) {
    const tasksCol = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]("tasks");
    const dateQuery = getDateQuery("createdAt", startDate, endDate);
    // If a specific staff member is selected, filter tasks by their ID or name
    if (staffMemberId && staffMemberId !== "all") {
        // Resolve their name from the team-members collection
        let staffName = null;
        try {
            const member = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findById"]("team-members", staffMemberId);
            staffName = member?.name ?? null;
        } catch (_) {}
        const nameFilter = staffName ? {
            $or: [
                {
                    assigneeId: staffMemberId
                },
                {
                    assigneeName: staffName
                }
            ]
        } : {
            assigneeId: staffMemberId
        };
        const tasks = await tasksCol.find({
            $and: [
                dateQuery,
                nameFilter
            ]
        }).toArray();
        let completed = 0;
        let pending = 0;
        tasks.forEach((task)=>{
            const s = (task.status || "pending").toLowerCase();
            if (s === "done" || s === "completed") completed++;
            else pending++;
        });
        // ── Earnings: projects where this staff member is assigned ──
        const projectsCol = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]("projects");
        const allProjects = await projectsCol.find({}).toArray();
        const staffEarnings = [];
        allProjects.forEach((p)=>{
            const assignees = Array.isArray(p.assignees) ? p.assignees : [];
            const isAssigned = assignees.some((a)=>{
                if (typeof a === "string") {
                    return a === staffName || a === staffMemberId;
                }
                return a?.name === staffName || String(a?.id) === staffMemberId || String(a?._id) === staffMemberId;
            });
            if (isAssigned) {
                const totalAmount = Number(p.amount || 0);
                const assigneeCount = assignees.length || 1;
                const myShare = Math.round(totalAmount / assigneeCount);
                staffEarnings.push({
                    projectId: p._id?.toString(),
                    projectTitle: p.title || "Untitled",
                    client: p.client || p.clientName || "—",
                    status: (p.status || "UNKNOWN").toUpperCase(),
                    totalAmount,
                    myShare,
                    progress: Number(p.progress || 0),
                    createdAt: p.createdAt
                });
            }
        });
        // ── Payout history: salary expenses linked to this staff member ──
        const expensesCol = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]("expenses");
        const salaryExpenses = await expensesCol.find({
            $and: [
                {
                    category: {
                        $regex: /^salary$/i
                    }
                },
                {
                    $or: [
                        {
                            staffMemberId: staffMemberId
                        },
                        ...staffName ? [
                            {
                                staffName: staffName
                            }
                        ] : []
                    ]
                }
            ]
        }).toArray();
        const payouts = salaryExpenses.map((e)=>({
                date: e.date || e.createdAt,
                amount: Number(e.amount || 0),
                paymentMethod: e.paymentMethod || "—",
                linkedProjectId: e.linkedProjectId || "",
                linkedProjectTitle: e.linkedProjectTitle || "—",
                note: e.note || e.reference || "",
                status: e.status || "paid"
            })).sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
        const totalEarnings = staffEarnings.reduce((s, e)=>s + e.myShare, 0);
        const totalPayouts = payouts.reduce((s, p)=>s + p.amount, 0);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            title: `Staff Report — ${staffName || staffMemberId}`,
            period: {
                from: startDate,
                to: endDate
            },
            isSingleStaff: true,
            staffName: staffName || staffMemberId,
            summary: {
                total: tasks.length,
                completed,
                pending
            },
            details: tasks.map((t)=>({
                    title: t.title,
                    status: t.status,
                    priority: t.priority,
                    createdAt: t.createdAt
                })),
            earnings: staffEarnings,
            earningsSummary: {
                totalProjects: staffEarnings.length,
                totalEarnings
            },
            payouts,
            payoutSummary: {
                totalPayouts,
                count: payouts.length
            }
        });
    }
    // All staff summary
    const tasks = await tasksCol.find(dateQuery).toArray();
    const stats = {};
    tasks.forEach((task)=>{
        const assignee = task.assigneeName || "Unassigned";
        if (!stats[assignee]) stats[assignee] = {
            name: assignee,
            completed: 0,
            pending: 0,
            total: 0
        };
        stats[assignee].total++;
        const status = (task.status || "pending").toLowerCase();
        if (status === "done" || status === "completed") stats[assignee].completed++;
        else stats[assignee].pending++;
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        title: "Staff Performance Report",
        period: {
            from: startDate,
            to: endDate
        },
        isSingleStaff: false,
        details: Object.values(stats)
    });
}
async function getClientReport(startDate, endDate, clientId) {
    const invoicesCol = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]("invoices");
    let query = getDateQuery("createdAt", startDate, endDate);
    // If specific client selected, we need to find all invoices where identity matches
    if (clientId && clientId !== "all") {
        // 1. Get client name to allow matching by name as well (for legacy records missing ID)
        const client = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findById"]("clients", clientId);
        const clientName = client?.name;
        // 2. Wrap the query to require (DATE FILTER) AND (IDENTITY MATCH)
        query = {
            $and: [
                query,
                {
                    $or: [
                        {
                            clientId: clientId
                        },
                        ...clientName ? [
                            {
                                clientName: clientName
                            }
                        ] : [],
                        // Handle cases where ID might be stored as ObjectId
                        ...clientId.length === 24 ? [
                            {
                                clientId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](clientId)
                            }
                        ] : []
                    ]
                }
            ]
        };
    }
    const invoices = await invoicesCol.find(query).toArray();
    if (clientId && clientId !== "all") {
        let totalBilled = 0;
        let received = 0;
        let pending = 0;
        // Collect all payment transactions across all invoices
        const paymentDetails = [];
        const details = invoices.map((inv)=>{
            const amount = Number(inv.amount || 0);
            const paid = Number(inv.paidAmount || 0);
            totalBilled += amount;
            received += paid;
            pending += amount - paid;
            // Extract payment history for this invoice
            if (inv.paymentHistory && inv.paymentHistory.length > 0) {
                inv.paymentHistory.forEach((payment)=>{
                    const pDate = new Date(payment.date);
                    // Only include payments within the selected date range
                    if (pDate >= startDate && pDate <= endDate) {
                        paymentDetails.push({
                            date: payment.date,
                            invoiceNo: inv.invoiceNo || inv.id,
                            mode: payment.mode || "Other",
                            amount: Number(payment.amount || 0),
                            remarks: payment.remarks || "-"
                        });
                    }
                });
            }
            return {
                date: inv.createdAt,
                invoiceNo: inv.invoiceNo || inv.id,
                description: inv.title || "Invoice",
                amount: amount,
                paid: paid,
                status: inv.status
            };
        });
        // Sort payment details by date (newest first)
        paymentDetails.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            title: "Client Statement",
            period: {
                from: startDate,
                to: endDate
            },
            isSingleClient: true,
            summary: {
                totalBilled,
                received,
                pending,
                invoiceCount: invoices.length
            },
            details,
            paymentDetails
        });
    }
    // Summary for all clients
    const clientStats = {};
    invoices.forEach((inv)=>{
        const client = inv.clientName || "Unknown Client";
        if (!clientStats[client]) {
            clientStats[client] = {
                name: client,
                totalBilled: 0,
                received: 0,
                pending: 0,
                invoiceCount: 0
            };
        }
        const amount = Number(inv.amount || 0);
        const paid = Number(inv.paidAmount || 0);
        clientStats[client].totalBilled += amount;
        clientStats[client].received += paid;
        clientStats[client].pending += amount - paid;
        clientStats[client].invoiceCount += 1;
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        title: "Client Financial Report",
        period: {
            from: startDate,
            to: endDate
        },
        isSingleClient: false,
        details: Object.values(clientStats)
    });
}
async function getTaskReport(startDate, endDate) {
    const tasksCol = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]("tasks");
    const tasks = await tasksCol.find(getDateQuery("createdAt", startDate, endDate)).toArray();
    const statusStats = {};
    tasks.forEach((t)=>{
        const s = t.status || "no-status";
        statusStats[s] = (statusStats[s] || 0) + 1;
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        title: "Task Report",
        period: {
            from: startDate,
            to: endDate
        },
        summary: {
            totalTasks: tasks.length,
            byStatus: Object.entries(statusStats).map(([status, count])=>({
                    status,
                    count
                }))
        },
        details: tasks.map((t)=>({
                title: t.title,
                status: t.status,
                priority: t.priority,
                assignee: t.assigneeName,
                createdAt: t.createdAt
            }))
    });
}
async function getProjectReport(startDate, endDate) {
    const projectsCol = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]("projects");
    const projects = await projectsCol.find(getDateQuery("createdAt", startDate, endDate)).toArray();
    // Status breakdown
    const statusStats = {};
    let totalAmount = 0;
    let completedAmount = 0;
    let totalProgress = 0;
    projects.forEach((p)=>{
        const s = (p.status || "UNKNOWN").toUpperCase();
        statusStats[s] = (statusStats[s] || 0) + 1;
        totalAmount += Number(p.amount || 0);
        if (s === "COMPLETED") completedAmount += Number(p.amount || 0);
        totalProgress += Number(p.progress || 0);
    });
    const avgProgress = projects.length > 0 ? Math.round(totalProgress / projects.length) : 0;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        title: "Project Status Report",
        period: {
            from: startDate,
            to: endDate
        },
        summary: {
            totalProjects: projects.length,
            totalAmount,
            completedAmount,
            avgProgress,
            byStatus: Object.entries(statusStats).map(([status, count])=>({
                    status,
                    count
                }))
        },
        details: projects.map((p)=>({
                title: p.title,
                client: p.client || p.clientName || "—",
                status: (p.status || "UNKNOWN").toUpperCase(),
                progress: Number(p.progress || 0),
                amount: Number(p.amount || 0),
                assignees: Array.isArray(p.assignees) ? p.assignees.map((a)=>typeof a === "string" ? a : a?.name ?? "—").join(", ") : "—",
                createdAt: p.createdAt,
                description: p.description || ""
            }))
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c4ef7d24._.js.map