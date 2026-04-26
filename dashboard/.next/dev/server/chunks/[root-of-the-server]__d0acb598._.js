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
        } catch (e) {
        
        }
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
        } catch (e) {
        
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
    return softDeleteById("inventory", id);
}
async function softDeleteById(collectionName, id, collectionLabel) {
    const col = await getCollection(collectionName);
    const trash = await getCollection("_trash");
    const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
    
    let doc = null;
    let filter = null;
    if (hex24) {
        try {
            doc = await col.findOne({
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
            });
            if (doc) filter = {
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id)
            };
        } catch (_) {}
    }
    if (!doc) {
        
        doc = await col.findOne({
            id
        });
        if (doc) filter = {
            id
        };
    }
    if (!doc && collectionName === "invoices") {
        doc = await col.findOne({
            invoiceNo: id
        });
        if (doc) filter = {
            invoiceNo: id
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
    const trash = await getCollection("_trash");
    let trashDoc = null;
    try {
        trashDoc = await trash.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](trashId)
        });
    } catch (_) {}
    if (!trashDoc) {
        trashDoc = await trash.findOne({
            _originalId: trashId
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
    const trash = await getCollection("_trash");
    let res;
    try {
        res = await trash.deleteOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](trashId)
        });
    } catch (_) {
        res = await trash.deleteOne({
            _originalId: trashId
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
        } catch (e) {
         }
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
    
    const invoices = await col.find({}).sort({
        createdAt: 1
    }).toArray();
    if (!invoices || !invoices.length) return {
        updated: 0
    };
    let counter = 1;
    for (const inv of invoices){
        
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
    
    try {
        const now = new Date();
        const fy = invoice.financialYear || function getFY(d) {
            const y = d.getFullYear();
            const m = d.getMonth() + 1;
            
            if (m >= 4) return `${y}-${y + 1}`;
            return `${y - 1}-${y}`;
        }(now);
        
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
"[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/quotation-models.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";




 __turbopack_context__.s([
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
"[project]/Desktop/Projects/final-pixelate/dashboard/src/app/api/quotations/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/services.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$quotation$2d$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/quotation-models.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/mongodb.ts [app-route] (ecmascript)");
;
;
;
;
;
async function GET(request) {
    try {
        const col = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]('quotations');
        const { searchParams } = new URL(request.url);
        const clientIdParam = searchParams.get('clientId');
        
        let filter = {};
        if (clientIdParam) {
            
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(quotations);
    } catch (error) {
        console.error('Error fetching quotations:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || 'Failed to fetch quotations'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const quotationData = await request.json();
        const col = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCollection"]('quotations');
        
        if (!quotationData.quoteId) {
            const lastQuote = await col.findOne({}, {
                sort: {
                    createdAt: -1
                }
            });
            quotationData.quoteId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$quotation$2d$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateQuotationId"])(lastQuote?.quoteId);
        }
        
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
        const created = await col.findOne({
            _id: result.insertedId
        });
        
        if (newQuotation.clientId && newQuotation.status !== 'DRAFT') {
            try {
                const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
                
                let clientName = newQuotation.clientName ?? '';
                if (!clientName) {
                    let clientDoc = null;
                    try {
                        clientDoc = await db.collection('clients').findOne({
                            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](String(newQuotation.clientId))
                        });
                    } catch  {}
                    if (!clientDoc) clientDoc = await db.collection('clients').findOne({
                        _id: newQuotation.clientId
                    });
                    clientName = clientDoc?.name ?? clientDoc?.businessName ?? '';
                }
                
                const grandTotal = (newQuotation.services ?? []).reduce((sum, s)=>sum + (s.price ?? 0) * (s.qty ?? 1), 0);
                const journeyStatus = newQuotation.status === 'SENT' ? 'Sent' : newQuotation.status === 'APPROVED' ? 'Approved' : newQuotation.status === 'REJECTED' ? 'Rejected' : newQuotation.status === 'CONVERTED' ? 'Completed' : 'Pending';
                
                const descParts = [];
                descParts.push(`📄 Quote ID: ${newQuotation.quoteId}`);
                if (newQuotation.subtitle) descParts.push(`📝 ${newQuotation.subtitle}`);
                if (newQuotation.objective) descParts.push(`🎯 Objective: ${newQuotation.objective}`);
                if ((newQuotation.scope ?? []).length > 0) descParts.push(`🔧 Scope: ${newQuotation.scope.join(', ')}`);
                if ((newQuotation.services ?? []).length > 0) {
                    const svcLines = newQuotation.services.map((s)=>`${s.serviceName} × ${s.qty} @ ₹${(s.price ?? 0).toLocaleString('en-IN')}`);
                    descParts.push(`💼 Services:\n${svcLines.map((l)=>`  • ${l}`).join('\n')}`);
                    descParts.push(`💰 Grand Total: ₹${grandTotal.toLocaleString('en-IN')}`);
                }
                if ((newQuotation.timeline ?? []).length > 0) {
                    const tLines = newQuotation.timeline.map((t)=>`${t.phase} – ${t.duration}`);
                    descParts.push(`🗓 Timeline:\n${tLines.map((l)=>`  • ${l}`).join('\n')}`);
                }
                if ((newQuotation.modules ?? []).length > 0) descParts.push(`🧩 Modules: ${newQuotation.modules.map((m)=>m.moduleName).join(', ')}`);
                if ((newQuotation.deliverables ?? []).length > 0) descParts.push(`📦 Deliverables: ${newQuotation.deliverables.join(', ')}`);
                if (newQuotation.paymentTerms) descParts.push(`💳 Payment Terms: ${newQuotation.paymentTerms}`);
                if (newQuotation.notes) descParts.push(`📌 Notes: ${newQuotation.notes}`);
                await db.collection('journey_events').insertOne({
                    clientId: String(newQuotation.clientId),
                    clientName,
                    projectId: null,
                    projectName: newQuotation.title ?? null,
                    type: 'quotation',
                    title: `Quotation Sent – ${newQuotation.title || newQuotation.quoteId}`,
                    description: descParts.join('\n\n'),
                    performedBy: 'System',
                    status: journeyStatus,
                    fileUrl: null,
                    linkUrl: `/quotations/${result.insertedId}/view`,
                    occurredAt: new Date(),
                    metadata: {
                        quotationId: String(result.insertedId),
                        quoteId: newQuotation.quoteId,
                        grandTotal,
                        servicesCount: (newQuotation.services ?? []).length,
                        modulesCount: (newQuotation.modules ?? []).length,
                        scopeCount: (newQuotation.scope ?? []).length,
                        timelinePhases: (newQuotation.timeline ?? []).length,
                        status: newQuotation.status
                    },
                    createdAt: new Date()
                });
            } catch (journeyErr) {
                console.error('Failed to auto-create journey event:', journeyErr);
            }
        }
        
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(created, {
            status: 201
        });
    } catch (error) {
        console.error('Error creating quotation:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || 'Failed to create quotation'
        }, {
            status: 500
        });
    }
}
}),
];

