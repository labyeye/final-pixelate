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
"[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/journey-helpers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";







 __turbopack_context__.s([
    "createQuotationJourneyEvent",
    ()=>createQuotationJourneyEvent
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
async function createQuotationJourneyEvent(db, quotationId, quotationDoc) {
    
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
    
    const statusMap = {
        SENT: 'Sent',
        APPROVED: 'Approved',
        REJECTED: 'Rejected',
        CONVERTED: 'Completed',
        PENDING: 'Pending'
    };
    const journeyStatus = statusMap[quotationDoc.status] ?? 'Pending';
    
    const services = quotationDoc.services ?? [];
    const timeline = quotationDoc.timeline ?? [];
    const modules = quotationDoc.modules ?? [];
    const scope = quotationDoc.scope ?? [];
    const deliverables = quotationDoc.deliverables ?? [];
    const grandTotal = services.reduce((sum, s)=>sum + (Number(s.price) || 0) * (Number(s.qty) || 1), 0);
    
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
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/src/app/api/journey/backfill/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";








 __turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$journey$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/journey-helpers.ts [app-route] (ecmascript)");
;
;
;
async function POST() {
    try {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        
        const quotations = await db.collection('quotations').find({
            status: {
                $nin: [
                    'DRAFT'
                ]
            },
            deleted: {
                $ne: true
            }
        }).toArray();
        let created = 0;
        let skipped = 0;
        for (const q of quotations){
            const quotationId = String(q._id);
            
            const exists = await db.collection('journey_events').findOne({
                'metadata.quotationId': quotationId
            });
            if (exists) {
                skipped++;
                continue;
            }
            
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$journey$2d$helpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createQuotationJourneyEvent"])(db, quotationId, q);
                created++;
            } catch (err) {
                console.error(`Failed to create journey event for quotation ${quotationId}:`, err);
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: `Backfill complete. Created: ${created}, Skipped (already existed): ${skipped}.`,
            created,
            skipped
        });
    } catch (e) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: e.message || String(e)
        }, {
            status: 500
        });
    }
}
}),
];

