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
"[project]/src/app/api/send-invoice-whatsapp/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongodb.ts [app-route] (ecmascript)");
;
;
;
function sanitisePhone(raw) {
    return raw.replace(/\D/g, "");
}
function isValidPhone(digits) {
    return /^\d{7,15}$/.test(digits);
}
const WA_ERROR_MAP = {
    131030: "Recipient phone number is not registered on WhatsApp.",
    131031: "Recipient phone number is not a valid WhatsApp account.",
    131026: "Message undeliverable to this recipient.",
    131047: "Session expired (24-hour window). Template was used but check template approval.",
    131051: "Unsupported message type for this recipient.",
    132000: "Template not found or not approved. Check WHATSAPP_TEMPLATE_NAME.",
    132001: "Template parameter count or type does not match the approved template.",
    132005: "Template language code is wrong. Set WHATSAPP_TEMPLATE_LANG=en_US.",
    132007: "Template header format does not match — ensure DOCUMENT header type.",
    132008: "Template components malformed.",
    132012: "Template parameter format mismatch.",
    135000: "Generic template error — check component types and parameter values.",
    190: "Access token expired or invalid. Regenerate your System User token.",
    200: "Permission error — ensure whatsapp_business_messaging permission is granted.",
    368: "Account temporarily blocked due to policy violation.",
    131048: "Spam rate limit hit. Slow down.",
    131049: "Message failed to send because of a business account issue.",
    131016: "Service temporarily unavailable.",
    100: "Invalid request or missing parameter. Check the payload structure."
};
async function sendTextFallback(digits, clientName, invNo, amount, phoneNumberId, accessToken, apiVersion) {
    const fallbackPayload = {
        messaging_product: "whatsapp",
        to: digits,
        type: "text",
        text: {
            body: `Hi ${clientName},\n\nYour invoice *${invNo}* for *${amount}* has been generated.\n\n` + `We were unable to attach the PDF document in this message. ` + `Please contact us to receive it via email or download link.\n\n` + `— Pixelate Studio`
        }
    };
    try {
        const res = await fetch(`https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fallbackPayload)
        });
        const json = await res.json().catch(()=>({}));
        if (res.ok) {
            console.info(`[WhatsApp] Fallback text sent — to: ${digits}, invNo: ${invNo}`);
        } else {
            console.error("[WhatsApp] Fallback text also failed:", JSON.stringify(json));
        }
    } catch (err) {
        console.error("[WhatsApp] Fallback text network error:", err);
    }
}
async function POST(req) {
    const internalSecret = process.env.INTERNAL_API_SECRET;
    if (internalSecret) {
        const authHeader = req.headers.get("x-internal-secret");
        if (authHeader !== internalSecret) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
    }
    let body;
    try {
        body = await req.json();
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid JSON body."
        }, {
            status: 400
        });
    }
    const { phone, clientName, invNo, amount, filename, mediaId, pdfUrl, clientId, invoiceId, templateName: bodyTemplateName, templateLang: bodyTemplateLang, extraBodyParams } = body;
    if (clientId) {
        try {
            const clientDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findById"]("clients", clientId);
            if (!clientDoc) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Client not found.",
                    code: "CLIENT_NOT_FOUND"
                }, {
                    status: 404
                });
            }
            if (clientDoc.whatsapp_opted_in !== true) {
                console.warn(`[WhatsApp] Blocked send to client ${clientId} — no opt-in on record.`);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Client has not opted in to receive WhatsApp messages. " + "Ask the client to consent first (checkbox on invoice creation).",
                    code: "OPT_IN_REQUIRED"
                }, {
                    status: 403
                });
            }
            if (clientDoc.whatsapp_opted_in === false) {
                console.warn(`[WhatsApp] Blocked send to client ${clientId} — client has opted out.`);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Client has opted out of WhatsApp messages (replied STOP). Cannot send.",
                    code: "OPT_OUT"
                }, {
                    status: 403
                });
            }
        } catch (dbErr) {
            console.error("[WhatsApp] DB error during opt-in check:", dbErr);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Could not verify opt-in status. Try again."
            }, {
                status: 500
            });
        }
    }
    if (invoiceId) {
        try {
            const invoiceDoc = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findById"]("invoices", invoiceId);
            if (invoiceDoc?.whatsapp_sent === true) {
                console.info(`[WhatsApp] Invoice ${invoiceId} already sent. Resending. Previous wamid: ${invoiceDoc.whatsapp_message_id}`);
            }
        } catch (dbErr) {
            console.error("[WhatsApp] DB error during send check:", dbErr);
        }
    }
    const missingFields = [];
    if (!phone) missingFields.push("phone");
    if (!clientName) missingFields.push("clientName");
    if (!invNo) missingFields.push("invNo");
    if (!amount) missingFields.push("amount");
    if (!mediaId && !pdfUrl) missingFields.push("mediaId or pdfUrl (one is required)");
    if (missingFields.length) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `Missing required fields: ${missingFields.join(", ")}`
        }, {
            status: 400
        });
    }
    const digits = sanitisePhone(phone);
    if (!isValidPhone(digits)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid phone number. Provide digits only in E.164 format without the + " + "(e.g. 919876543210 for an Indian number)."
        }, {
            status: 400
        });
    }
    if (pdfUrl) {
        if (!pdfUrl.startsWith("https://")) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "pdfUrl must be a public HTTPS URL with no authentication, no redirects, " + "and directly accessible via curl/incognito. HTTP URLs are rejected by WhatsApp."
            }, {
                status: 400
            });
        }
    }
    const accessToken = process.env.META_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    if (!accessToken) {
        console.error("[WhatsApp] META_ACCESS_TOKEN is not set.");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Server misconfiguration: missing token."
        }, {
            status: 500
        });
    }
    if (!phoneNumberId) {
        console.error("[WhatsApp] WHATSAPP_PHONE_NUMBER_ID is not set.");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Server misconfiguration: missing phone number ID."
        }, {
            status: 500
        });
    }
    console.info(`[WhatsApp] Sending to: ${digits} (sender phoneNumberId: ${phoneNumberId})`);
    const templateName = bodyTemplateName || process.env.WHATSAPP_TEMPLATE_NAME || "invoicing";
    const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v21.0";
    let templateLang = bodyTemplateLang || process.env.WHATSAPP_TEMPLATE_LANG || "en_US";
    try {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const tmplDoc = await db.collection("whatsapp_templates").findOne({
            name: templateName
        });
        if (tmplDoc?.language) {
            templateLang = tmplDoc.language;
            console.info(`[WhatsApp] Resolved template language from DB: ${templateLang} (template: ${templateName})`);
        }
    } catch (dbErr) {
        console.warn("[WhatsApp] Could not look up template language from DB — using fallback:", templateLang);
    }
    function sanitiseFilename(raw) {
        return raw.replace(/[/\\:*?"<>|]/g, "-").replace(/-{2,}/g, "-").replace(/^-|-$/g, "").trim();
    }
    const safeFilename = filename ? sanitiseFilename(filename.replace(/\.pdf$/i, "")) + ".pdf" : sanitiseFilename(`Invoice-${invNo}`) + ".pdf";
    const documentParam = mediaId ? {
        type: "document",
        document: {
            id: mediaId,
            filename: safeFilename
        }
    } : {
        type: "document",
        document: {
            link: pdfUrl,
            filename: safeFilename
        }
    };
    const payload = {
        messaging_product: "whatsapp",
        to: digits,
        type: "template",
        template: {
            name: templateName,
            language: {
                code: templateLang
            },
            components: [
                {
                    type: "header",
                    parameters: [
                        documentParam
                    ]
                },
                {
                    type: "body",
                    parameters: [
                        {
                            type: "text",
                            parameter_name: "client_name",
                            text: clientName
                        },
                        {
                            type: "text",
                            parameter_name: "inv_no",
                            text: invNo
                        },
                        {
                            type: "text",
                            parameter_name: "amount",
                            text: `${String(amount)} incl GST`
                        },
                        ...Array.isArray(extraBodyParams) ? extraBodyParams : []
                    ]
                }
            ]
        }
    };
    const endpoint = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;
    console.info("[WhatsApp] Sending payload:", JSON.stringify(payload, null, 2));
    let waResponse;
    try {
        waResponse = await fetch(endpoint, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    } catch (networkErr) {
        console.error("[WhatsApp] Network error calling Graph API:", networkErr);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Network error while contacting WhatsApp API. Please try again."
        }, {
            status: 502
        });
    }
    const waJson = await waResponse.json().catch(()=>({}));
    if (!waResponse.ok) {
        const errDetail = waJson?.error ?? {};
        const code = errDetail.code ?? waResponse.status;
        console.error(`[WhatsApp] API error — HTTP ${waResponse.status}:`, JSON.stringify(waJson, null, 2));
        const friendlyMessage = WA_ERROR_MAP[code] ?? errDetail.message ?? "WhatsApp API returned an error.";
        const documentErrorCodes = [
            131016,
            131026,
            100
        ];
        const isDocumentError = documentErrorCodes.includes(code) || (errDetail.message ?? "").toLowerCase().includes("media");
        if (isDocumentError && pdfUrl) {
            console.warn("[WhatsApp] Document delivery failed — sending text fallback.");
            await sendTextFallback(digits, clientName, invNo, String(amount), phoneNumberId, accessToken, apiVersion);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Document delivery failed: ${friendlyMessage}. A text notification was sent instead.`,
                code,
                fallbackSent: true,
                detail: errDetail
            }, {
                status: 207
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: friendlyMessage,
            code,
            detail: errDetail,
            fallbackSent: false
        }, {
            status: waResponse.status >= 500 ? 502 : 422
        });
    }
    const messageId = waJson?.messages?.[0]?.id ?? null;
    console.info(`[WhatsApp] Accepted by Meta — to: ${digits}, invNo: ${invNo}, wamid: ${messageId}`);
    console.info("[WhatsApp] IMPORTANT: wamid ≠ delivered. Check webhook for sent/delivered/read/failed events.");
    if (invoiceId) {
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateById"]("invoices", invoiceId, {
                whatsapp_sent: true,
                whatsapp_sent_at: new Date().toISOString(),
                whatsapp_message_id: messageId,
                whatsapp_send_status: "sent"
            });
        } catch (dbErr) {
            console.error("[WhatsApp] Failed to mark invoice as sent in DB (non-fatal):", dbErr);
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        messageId,
        to: digits,
        note: "Message accepted by Meta. Delivery confirmed via webhook only."
    });
}
async function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Method not allowed."
    }, {
        status: 405
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bdbbe461._.js.map