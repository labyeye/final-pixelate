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
const uri = process.env.MONGODB_URI || process.env.MONGO_URI || "";
const defaultDbFromEnv = process.env.MONGODB_DB || process.env.MONGO_DB;
if (!uri) {
    console.warn("MONGODB_URI is not set. MongoDB operations will fail until it's provided.");
}
let client = global._mongoClient;
let clientPromise = global._mongoClientPromise;
function parseDbNameFromUri(connectionString) {
    if (!connectionString) return undefined;
    const withoutQuery = connectionString.split("?")[0];
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
        try {
            global._mongoClient = client;
            global._mongoClientPromise = clientPromise;
        } catch (e) {}
    }
    return clientPromise;
}
async function getMongoClient() {
    return ensureClientInitialized();
}
async function getDb(dbName) {
    const conn = await ensureClientInitialized();
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
        } catch (e) {}
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
    const month = date.getMonth() + 1;
    if (month >= 4) {
        return `${year}-${year + 1}`;
    } else {
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
        doc = await col.findOne({
            _id: normalizedId
        });
        if (doc) filter = {
            _id: normalizedId
        };
    }
    if (!doc) {
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
    await trash.insertOne({
        _originalId: String(doc._id),
        originalCollection: collectionName,
        collectionLabel: collectionLabel ?? LABELS[collectionName] ?? collectionName,
        document: doc,
        deletedAt: new Date()
    });
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
    if (trashDoc._originalId && /^[a-fA-F0-9]{24}$/.test(trashDoc._originalId)) {
        doc._id = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](trashDoc._originalId);
    }
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
    const col = await getCollection("users");
    return col.find({
        jobRole: {
            $exists: true
        }
    }).toArray();
}
async function createTeamMember(member) {
    const usersCol = await getCollection("users");
    const toInsert = {
        ...member,
        jobRole: member.role ?? member.jobRole,
        role: member.authRole ?? "staff",
        createdAt: new Date()
    };
    delete toInsert.role;
    const authRole = member.loginRole ?? member.authRole ?? "staff";
    toInsert.role = authRole;
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
    const byRawId = await col.findOne({
        _id: id
    });
    if (byRawId) return byRawId;
    const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
    if (hex24) {
        try {
            const byObjectId = await col.findOne({
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
            });
            if (byObjectId) return byObjectId;
        } catch (e) {}
    }
    if (collectionName === "invoices") {
        const byInvoiceNo = await col.findOne({
            invoiceNo: id
        });
        if (byInvoiceNo) return byInvoiceNo;
    }
    const byCustomId = await col.findOne({
        id: id
    });
    return byCustomId;
}
async function updateById(collectionName, id, update) {
    const col = await getCollection(collectionName);
    const updateDoc = {
        ...update || {}
    };
    if (updateDoc._id) delete updateDoc._id;
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
async function renumberInvoices(_financialYear) {
    const col = await getCollection("invoices");
    const invoices = await col.find({}).sort({
        createdAt: 1
    }).toArray();
    if (!invoices || !invoices.length) return {
        updated: 0
    };
    const settingsCol = await getCollection("agencySettings");
    const settings = await settingsCol.findOne({});
    const prefix = settings?.invoicePrefix ?? "KHT/";
    const startNum = settings?.invoiceStartNumber ?? 1;
    let counter = startNum;
    for (const inv of invoices){
        const padded = String(counter).padStart(4, "0");
        const invoiceNo = `${prefix}${padded}`;
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
    try {
        const settingsCol = await getCollection("agencySettings");
        const settings = await settingsCol.findOne({});
        const prefix = settings?.invoicePrefix ?? "KHT/";
        const startNum = settings?.invoiceStartNumber ?? 1;
        const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`^${escapedPrefix}(\\d+)$`);
        const docs = await col.find({
            invoiceNo: {
                $regex: `^${escapedPrefix}`
            }
        }).project({
            invoiceNo: 1
        }).toArray();
        let maxNum = startNum - 1;
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
        const invoiceNo = `${prefix}${padded}`;
        const id = `KHT-${padded}`;
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
"[project]/src/lib/login-rate-limiter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkLoginRateLimit",
    ()=>checkLoginRateLimit,
    "clearLoginRateLimit",
    ()=>clearLoginRateLimit
]);
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const BLOCK_MS = 15 * 60 * 1000;
const store = new Map();
function checkLoginRateLimit(email) {
    const key = email.toLowerCase();
    const now = Date.now();
    const record = store.get(key);
    if (record?.blockedUntil) {
        if (now < record.blockedUntil) {
            return {
                allowed: false,
                retryAfterSecs: Math.ceil((record.blockedUntil - now) / 1000)
            };
        }
        store.delete(key);
    }
    if (!record || now - record.firstAttempt > WINDOW_MS) {
        store.set(key, {
            count: 1,
            firstAttempt: now
        });
        return {
            allowed: true
        };
    }
    record.count++;
    if (record.count > MAX_ATTEMPTS) {
        record.blockedUntil = now + BLOCK_MS;
        return {
            allowed: false,
            retryAfterSecs: Math.ceil(BLOCK_MS / 1000)
        };
    }
    return {
        allowed: true
    };
}
function clearLoginRateLimit(email) {
    store.delete(email.toLowerCase());
}
}),
"[project]/src/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$login$2d$rate$2d$limiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/login-rate-limiter.ts [app-route] (ecmascript)");
;
;
;
;
;
async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "email+password required"
        }, {
            status: 400
        });
        const { allowed, retryAfterSecs } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$login$2d$rate$2d$limiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkLoginRateLimit"])(email);
        if (!allowed) {
            const mins = Math.ceil((retryAfterSecs ?? 900) / 60);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Too many failed attempts. Try again in ${mins} minute${mins !== 1 ? "s" : ""}.`
            }, {
                status: 429,
                headers: {
                    "Retry-After": String(retryAfterSecs)
                }
            });
        }
        const users = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUsers"]();
        const u = (users || []).find((x)=>x.email === email);
        if (!u) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "invalid credentials"
        }, {
            status: 401
        });
        if (!u.password || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyPassword"])(password, u.password)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "invalid credentials"
        }, {
            status: 401
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$login$2d$rate$2d$limiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clearLoginRateLimit"])(email);
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["signToken"])({
            id: u._id,
            email: u.email,
            role: u.role,
            clientId: u.clientId
        });
        try {
            const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
            await db.collection("erp_events").insertOne({
                type: "login",
                userId: u._id,
                email: u.email,
                adminName: u.name,
                details: {
                    message: "User logged in"
                },
                createdAt: new Date()
            });
        } catch (e) {
            console.error("Failed to log login event", e);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            token,
            user: {
                id: u._id,
                email: u.email,
                name: u.name,
                role: u.role,
                allowedPages: u.allowedPages,
                clientId: u.clientId
            }
        });
    } catch (e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: e.message || String(e)
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__31ba8e34._.js.map