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
"[project]/src/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
function hashPassword(password) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hashSync(password, 10);
}
function verifyPassword(password, hash) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compareSync(password, hash);
}
function signToken(payload, opts = {}) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, JWT_SECRET, {
        expiresIn: "7d",
        ...opts
    });
}
function verifyToken(token) {
    try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
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
"[project]/src/lib/services.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
    "getFinancialYear",
    ()=>getFinancialYear,
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
    "permanentlyDestroyTrashItem",
    ()=>permanentlyDestroyTrashItem,
    "renumberInvoices",
    ()=>renumberInvoices,
    "restoreFromTrash",
    ()=>restoreFromTrash,
    "softDeleteById",
    ()=>softDeleteById,
    "updateById",
    ()=>updateById,
    "updateInventory",
    ()=>updateInventory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
;
;
function getFinancialYear(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 1-12
    if (month >= 4) {
        // April onwards: current year to next year
        return `${year}-${year + 1}`;
    } else {
        // January to March: previous year to current year
        return `${year - 1}-${year}`;
    }
}
async function getCollection(name) {
    const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
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
    return softDeleteById("inventory", id);
}
async function softDeleteById(collectionName, id, collectionLabel) {
    const normalizedId = String(id ?? "").trim();
    if (!normalizedId || normalizedId === "undefined" || normalizedId === "null") {
        return false;
    }
    const col = await getCollection(collectionName);
    const trash = await getCollection("_trash");
    const hex24 = /^[a-fA-F0-9]{24}$/.test(normalizedId);
    // Locate the document first
    let doc = null;
    let filter = null;
    if (hex24) {
        try {
            doc = await col.findOne({
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](normalizedId)
            });
            if (doc) filter = {
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](normalizedId)
            };
        } catch (_) {}
    }
    if (!doc) {
        // Some collections may store _id as a string
        doc = await col.findOne({
            _id: normalizedId
        });
        if (doc) filter = {
            _id: normalizedId
        };
    }
    if (!doc) {
        // Try custom id field
        doc = await col.findOne({
            id: normalizedId
        });
        if (doc) filter = {
            id: normalizedId
        };
    }
    if (!doc && collectionName === "invoices") {
        doc = await col.findOne({
            invoiceNo: normalizedId
        });
        if (doc) filter = {
            invoiceNo: normalizedId
        };
    }
    if (!doc || !filter) return false;
    // For invoices: restore inventory quantities
    if (collectionName === "invoices") {
        if (Array.isArray(doc.inventoryItems) && doc.inventoryItems.length) {
            try {
                const items = doc.inventoryItems.map((r)=>({
                        inventoryId: r.inventoryId,
                        quantity: Number(r.quantity || 0)
                    }));
                await adjustInventoryQuantities(items, "increment");
            } catch (e) {
                console.error("Failed to restore inventory on soft-delete", e);
            }
        }
    }
    const LABELS = {
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
        careers: "Career"
    };
    // Snapshot into _trash
    await trash.insertOne({
        _originalId: String(doc._id),
        originalCollection: collectionName,
        collectionLabel: collectionLabel ?? LABELS[collectionName] ?? collectionName,
        document: doc,
        deletedAt: new Date()
    });
    // Remove from original collection
    const res = await col.deleteOne(filter);
    return res.deletedCount === 1;
}
async function restoreFromTrash(trashId) {
    const normalizedId = String(trashId ?? "").trim();
    if (!normalizedId || normalizedId === "undefined" || normalizedId === "null") {
        return false;
    }
    const trash = await getCollection("_trash");
    let trashDoc = null;
    if (/^[a-fA-F0-9]{24}$/.test(normalizedId)) {
        try {
            trashDoc = await trash.findOne({
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](normalizedId)
            });
        } catch (_) {}
    }
    if (!trashDoc) {
        trashDoc = await trash.findOne({
            _id: normalizedId
        });
    }
    if (!trashDoc) return false;
    const originalCol = await getCollection(trashDoc.originalCollection);
    const doc = {
        ...trashDoc.document
    };
    // Restore _id as ObjectId if it was one
    if (trashDoc._originalId && /^[a-fA-F0-9]{24}$/.test(trashDoc._originalId)) {
        doc._id = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](trashDoc._originalId);
    }
    // Re-decrement inventory if invoice
    if (trashDoc.originalCollection === "invoices") {
        if (Array.isArray(doc.inventoryItems) && doc.inventoryItems.length) {
            try {
                const items = doc.inventoryItems.map((r)=>({
                        inventoryId: r.inventoryId,
                        quantity: Number(r.quantity || 0)
                    }));
                await adjustInventoryQuantities(items, "decrement");
            } catch (e) {
                console.error("Failed to re-decrement inventory on restore", e);
            }
        }
    }
    try {
        await originalCol.insertOne(doc);
    } catch (e) {
        // If duplicate _id, try without _id so Mongo assigns a new one
        if (e?.code === 11000) {
            delete doc._id;
            await originalCol.insertOne(doc);
        } else {
            throw e;
        }
    }
    await trash.deleteOne({
        _id: trashDoc._id
    });
    return true;
}
async function permanentlyDestroyTrashItem(trashId) {
    const normalizedId = String(trashId ?? "").trim();
    if (!normalizedId || normalizedId === "undefined" || normalizedId === "null") {
        return false;
    }
    const trash = await getCollection("_trash");
    let res;
    if (/^[a-fA-F0-9]{24}$/.test(normalizedId)) {
        try {
            res = await trash.deleteOne({
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](normalizedId)
            });
        } catch (_) {
            res = await trash.deleteOne({
                _id: normalizedId
            });
        }
    } else {
        res = await trash.deleteOne({
            _id: normalizedId
        });
    }
    return (res?.deletedCount ?? 0) === 1;
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
        toInsert.password = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hashPassword"])(member.password);
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
        toInsert.password = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hashPassword"])(toInsert.password);
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
        updateDoc.password = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hashPassword"])(updateDoc.password);
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
    return softDeleteById(collectionName, id);
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
        const fy = financialYear || getFinancialYear(inv.createdAt || new Date());
        const padded = String(counter).padStart(4, "0");
        const invoiceNo = `KTS/${fy}/${padded}`;
        await col.updateOne({
            _id: inv._id
        }, {
            $set: {
                invoiceNo
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
    // generate invoiceNo in KTS/2025-2026/0001 format
    try {
        const fy = getFinancialYear(new Date());
        // find existing max number for this financial year in KTS/YYYY-YYYY/#### format
        const regex = new RegExp(`^KTS/${fy}/(\\d+)$`);
        const docs = await col.find({
            invoiceNo: {
                $regex: `^KTS/${fy}/`
            }
        }).project({
            invoiceNo: 1
        }).toArray();
        let maxNum = 0;
        for (const d of docs){
            const s = String(d.invoiceNo || "");
            const m = s.match(regex);
            if (m) {
                const n = parseInt(m[1], 10);
                if (!isNaN(n) && n > maxNum) maxNum = n;
            }
        }
        const nextNum = maxNum + 1;
        const padded = String(nextNum).padStart(4, "0");
        const invoiceNo = `KTS/${fy}/${padded}`;
        const id = `PN-${padded}`;
        const res = await col.insertOne({
            ...invoice,
            id,
            invoiceNo,
            createdAt: new Date()
        });
        const created = {
            ...invoice,
            id,
            invoiceNo,
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
"[project]/src/lib/quotation-models.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Enhanced Quotation System Models for Next.js
 * Professional structure with all required fields
 */ __turbopack_context__.s([
    "calculateQuotationTotals",
    ()=>calculateQuotationTotals,
    "generateQuotationId",
    ()=>generateQuotationId
]);
function calculateQuotationTotals(quotation) {
    const lineItemsTotal = quotation.lineItems.reduce((sum, item)=>sum + item.total, 0);
    const servicesTotal = quotation.services.reduce((sum, item)=>sum + item.total, 0);
    const subtotal = lineItemsTotal + servicesTotal;
    const taxAmount = quotation.lineItems.reduce((sum, item)=>sum + item.unitPrice * item.qty * item.tax / 100, 0);
    const grandTotal = subtotal;
    return {
        subtotal,
        taxAmount,
        grandTotal
    };
}
function generateQuotationId(lastId) {
    const year = new Date().getFullYear();
    const prefix = `PXL-${year}-`;
    if (!lastId) return `${prefix}001`;
    const match = lastId.match(/PXL-\d{4}-(\d+)/);
    if (match) {
        const num = parseInt(match[1], 10) + 1;
        return `${prefix}${String(num).padStart(3, "0")}`;
    }
    return `${prefix}001`;
}
}),
"[project]/src/lib/journey-helpers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * journey-helpers.ts
 *
 * Shared utility: given a fully-fetched quotation document and its client,
 * inserts one `journey_events` record.  Called after a quotation is saved
 * so the event always reflects the real persisted data.
 */ __turbopack_context__.s([
    "createOnboardingJourneyEvent",
    ()=>createOnboardingJourneyEvent,
    "createProjectJourneyEvent",
    ()=>createProjectJourneyEvent,
    "createQuotationJourneyEvent",
    ()=>createQuotationJourneyEvent,
    "parseJourneyOccurredAt",
    ()=>parseJourneyOccurredAt
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
function parseJourneyOccurredAt(value, fallback = new Date()) {
    if (!value) return fallback;
    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? fallback : value;
    }
    const raw = String(value).trim();
    if (!raw) return fallback;
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
        const localDate = new Date(`${raw}T00:00:00`);
        return Number.isNaN(localDate.getTime()) ? fallback : localDate;
    }
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}
async function createQuotationJourneyEvent(db, quotationId, quotationDoc) {
    // ── 1. Fetch client by the quotation's clientId ─────────────────────────
    const rawClientId = quotationDoc.clientId;
    let clientDoc = null;
    try {
        clientDoc = await db.collection('clients').findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](String(rawClientId))
        });
    } catch  {
        clientDoc = await db.collection('clients').findOne({
            _id: rawClientId
        });
    }
    const clientName = clientDoc?.name ?? clientDoc?.businessName ?? '';
    const clientId = String(rawClientId);
    // ── 2. Map quotation status → journey status badge ───────────────────────
    const statusMap = {
        SENT: 'Sent',
        APPROVED: 'Approved',
        REJECTED: 'Rejected',
        CONVERTED: 'Completed',
        PENDING: 'Pending'
    };
    const journeyStatus = statusMap[quotationDoc.status] ?? 'Pending';
    // ── 3. Compute grand total from the real services array ──────────────────
    const services = quotationDoc.services ?? [];
    const timeline = quotationDoc.timeline ?? [];
    const modules = quotationDoc.modules ?? [];
    const scope = quotationDoc.scope ?? [];
    const deliverables = quotationDoc.deliverables ?? [];
    const grandTotal = services.reduce((sum, s)=>sum + (Number(s.price) || 0) * (Number(s.qty) || 1), 0);
    // ── 4. Build the description from the real quotation fields ──────────────
    const parts = [];
    parts.push(`📄 Quote ID: ${quotationDoc.quoteId}`);
    if (quotationDoc.subtitle) parts.push(`📝 ${quotationDoc.subtitle}`);
    if (quotationDoc.objective) parts.push(`🎯 Objective: ${quotationDoc.objective}`);
    if (quotationDoc.purpose) parts.push(`💡 Purpose: ${quotationDoc.purpose}`);
    if (scope.length > 0) parts.push(`🔧 Scope of Work:\n${scope.map((s)=>`  • ${s}`).join('\n')}`);
    if (services.length > 0) {
        const lines = services.map((s)=>`${s.serviceName} × ${s.qty ?? 1}` + (s.price ? ` @ ₹${Number(s.price).toLocaleString('en-IN')}` : ''));
        parts.push(`💼 Services:\n${lines.map((l)=>`  • ${l}`).join('\n')}`);
        parts.push(`💰 Grand Total: ₹${grandTotal.toLocaleString('en-IN')}`);
    }
    if (timeline.length > 0) {
        const lines = timeline.map((t)=>`${t.phase} – ${t.duration}`);
        parts.push(`🗓 Timeline:\n${lines.map((l)=>`  • ${l}`).join('\n')}`);
    }
    if (modules.length > 0) {
        const lines = modules.map((m)=>`${m.moduleName}${m.description ? ` (${m.description})` : ''}`);
        parts.push(`🧩 Modules:\n${lines.map((l)=>`  • ${l}`).join('\n')}`);
    }
    if (deliverables.length > 0) parts.push(`📦 Deliverables:\n${deliverables.map((d)=>`  • ${d}`).join('\n')}`);
    if (quotationDoc.paymentTerms) parts.push(`💳 Payment Terms: ${quotationDoc.paymentTerms}`);
    if (quotationDoc.notes) parts.push(`📌 Notes: ${quotationDoc.notes}`);
    // ── 5. Insert the journey event ──────────────────────────────────────────
    await db.collection('journey_events').insertOne({
        clientId,
        clientName,
        projectId: null,
        projectName: quotationDoc.title ?? null,
        type: 'quotation',
        title: `Quotation Sent – ${quotationDoc.title || quotationDoc.quoteId}`,
        description: parts.join('\n\n'),
        performedBy: 'System',
        status: journeyStatus,
        fileUrl: null,
        linkUrl: `/quotations/${quotationId}/view`,
        occurredAt: new Date(),
        metadata: {
            quotationId,
            quoteId: quotationDoc.quoteId,
            grandTotal,
            servicesCount: services.length,
            modulesCount: modules.length,
            scopeCount: scope.length,
            timelinePhases: timeline.length,
            quotationStatus: quotationDoc.status
        },
        createdAt: new Date()
    });
}
async function createOnboardingJourneyEvent(db, onboardingId, onboardingDoc) {
    const rawClientId = onboardingDoc.clientId;
    if (!rawClientId) {
        return;
    }
    let clientDoc = null;
    try {
        clientDoc = await db.collection('clients').findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](String(rawClientId))
        });
    } catch  {
        clientDoc = await db.collection('clients').findOne({
            _id: rawClientId
        });
    }
    const clientName = onboardingDoc.clientName ?? onboardingDoc.company ?? clientDoc?.name ?? clientDoc?.businessName ?? '';
    const projectTitle = onboardingDoc.projectTitle ?? onboardingDoc.projectType ?? onboardingDoc.productType ?? null;
    const descriptionParts = [];
    if (onboardingDoc.projectType) {
        descriptionParts.push(`🧩 Project Type: ${onboardingDoc.projectType}`);
    }
    if (onboardingDoc.productType) {
        descriptionParts.push(`🛠 Product Type: ${onboardingDoc.productType}`);
    }
    if (onboardingDoc.budget) {
        descriptionParts.push(`💰 Budget: ${onboardingDoc.budget}`);
    }
    if (onboardingDoc.startDate) {
        descriptionParts.push(`🚀 Start Date: ${onboardingDoc.startDate}`);
    }
    if (onboardingDoc.deadline) {
        descriptionParts.push(`📅 Deadline: ${onboardingDoc.deadline}`);
    }
    if (onboardingDoc.brief) {
        descriptionParts.push(`📝 Brief: ${onboardingDoc.brief}`);
    }
    await db.collection('journey_events').insertOne({
        clientId: String(rawClientId),
        clientName,
        projectId: onboardingDoc.projectId ? String(onboardingDoc.projectId) : null,
        projectName: projectTitle,
        type: 'onboarding',
        title: `Onboarding Completed${projectTitle ? ` – ${projectTitle}` : ''}`,
        description: descriptionParts.join('\n\n') || 'Client onboarding record created.',
        performedBy: 'System',
        status: 'Completed',
        fileUrl: null,
        linkUrl: `/onboarding`,
        occurredAt: parseJourneyOccurredAt(onboardingDoc.date),
        metadata: {
            onboardingId,
            projectTitle: onboardingDoc.projectTitle ?? null,
            projectType: onboardingDoc.projectType ?? null,
            productType: onboardingDoc.productType ?? null
        },
        createdAt: new Date()
    });
}
async function createProjectJourneyEvent(db, projectId, projectDoc, mode = 'created') {
    const rawClientId = projectDoc.clientId ?? projectDoc.client;
    if (!rawClientId) {
        return;
    }
    let clientDoc = null;
    try {
        clientDoc = await db.collection('clients').findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](String(rawClientId))
        });
    } catch  {
        clientDoc = await db.collection('clients').findOne({
            _id: rawClientId
        });
    }
    const clientName = projectDoc.clientName ?? clientDoc?.name ?? clientDoc?.businessName ?? '';
    const title = projectDoc.title ?? 'Project Created';
    const services = Array.isArray(projectDoc.services) ? projectDoc.services : [];
    const serviceNames = services.map((s)=>s?.name).filter((name)=>typeof name === 'string' && name.trim().length > 0);
    const descriptionParts = [
        `📁 Project: ${title}`
    ];
    if (projectDoc.amount != null) {
        descriptionParts.push(`💰 Amount: ₹${Number(projectDoc.amount || 0).toLocaleString('en-IN')}`);
    }
    if (projectDoc.deliveryDate) {
        descriptionParts.push(`📅 Delivery Date: ${projectDoc.deliveryDate}`);
    }
    if (serviceNames.length > 0) {
        descriptionParts.push(`🧩 Services: ${serviceNames.join(', ')}`);
    }
    await db.collection('journey_events').insertOne({
        clientId: String(rawClientId),
        clientName,
        projectId,
        projectName: title,
        type: 'project_update',
        title: `${mode === 'updated' ? 'Project Updated' : 'Project Created'} – ${title}`,
        description: descriptionParts.join('\n\n'),
        performedBy: 'System',
        status: 'Completed',
        fileUrl: null,
        linkUrl: `/projects`,
        occurredAt: parseJourneyOccurredAt(mode === 'updated' ? projectDoc.updatedAt : projectDoc.createdAt),
        metadata: {
            projectId,
            eventMode: mode,
            amount: projectDoc.amount ?? null,
            servicesCount: services.length
        },
        createdAt: new Date()
    });
}
}),
"[project]/src/app/api/quotations/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quotation$2d$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/quotation-models.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/journey-helpers.ts [app-route] (ecmascript)");
;
;
;
;
;
;
async function GET(request) {
    try {
        const col = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]('quotations');
        const { searchParams } = new URL(request.url);
        const clientIdParam = searchParams.get('clientId');
        // Build filter: if clientId is provided, filter quotations for that client
        let filter = {};
        if (clientIdParam) {
            // Try matching as ObjectId and as string
            try {
                filter = {
                    $or: [
                        {
                            clientId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](clientIdParam)
                        },
                        {
                            clientId: clientIdParam
                        }
                    ]
                };
            } catch  {
                filter = {
                    clientId: clientIdParam
                };
            }
        }
        const quotations = await col.find(filter).sort({
            createdAt: -1
        }).toArray();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(quotations);
    } catch (error) {
        console.error('Error fetching quotations:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || 'Failed to fetch quotations'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const quotationData = await request.json();
        const col = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]('quotations');
        // Generate next quotation ID if not provided
        if (!quotationData.quoteId) {
            const lastQuote = await col.findOne({}, {
                sort: {
                    createdAt: -1
                }
            });
            quotationData.quoteId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quotation$2d$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateQuotationId"])(lastQuote?.quoteId);
        }
        // Set defaults
        const newQuotation = {
            ...quotationData,
            status: quotationData.status || 'DRAFT',
            date: quotationData.date || new Date(),
            timeline: quotationData.timeline || [],
            lineItems: quotationData.lineItems || [],
            services: quotationData.services || [],
            modules: quotationData.modules || [],
            scope: quotationData.scope || [],
            deliverables: quotationData.deliverables || [],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const result = await col.insertOne(newQuotation);
        // Re-fetch from DB so the journey event uses the exact persisted document
        const created = await col.findOne({
            _id: result.insertedId
        });
        // ── Auto-create Journey event for every non-DRAFT quotation ───────────
        if (created && created.clientId && created.status !== 'DRAFT') {
            try {
                const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$journey$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQuotationJourneyEvent"])(db, String(result.insertedId), created);
            } catch (journeyErr) {
                console.error('Failed to auto-create journey event:', journeyErr);
            }
        }
        // ─────────────────────────────────────────────────────────────────────
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(created, {
            status: 201
        });
    } catch (error) {
        console.error('Error creating quotation:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || 'Failed to create quotation'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f5e4760a._.js.map