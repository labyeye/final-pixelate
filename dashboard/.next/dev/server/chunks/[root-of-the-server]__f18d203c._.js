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
"[project]/src/app/api/brand-guides/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongodb.ts [app-route] (ecmascript)");
;
;
const CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
async function OPTIONS() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
        headers: CORS
    });
}
async function GET(req) {
    try {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const { searchParams } = new URL(req.url);
        const clientId = searchParams.get("clientId");
        const filter = {};
        if (clientId) filter.clientId = clientId;
        const guides = await db.collection("brand_guides").find(filter).sort({
            createdAt: -1
        }).toArray();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(guides, {
            headers: CORS
        });
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message
        }, {
            status: 500,
            headers: CORS
        });
    }
}
async function POST(req) {
    try {
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const body = await req.json();
        const { clientId, clientName, brandName, primaryColors, secondaryColors, fonts, brandVoice, logoUrl, pdfUrl, pdfBase64, notes } = body;
        if (!clientId || !clientName) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "clientId and clientName are required"
            }, {
                status: 400,
                headers: CORS
            });
        }
        const doc = {
            clientId,
            clientName,
            brandName: brandName || clientName,
            primaryColors: primaryColors || [],
            secondaryColors: secondaryColors || [],
            fonts: fonts || [],
            brandVoice: brandVoice || "",
            logoUrl: logoUrl || "",
            pdfUrl: pdfUrl || "",
            pdfBase64: pdfBase64 || "",
            notes: notes || "",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const result = await db.collection("brand_guides").insertOne(doc);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            id: result.insertedId,
            ...doc
        }, {
            status: 201,
            headers: CORS
        });
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message
        }, {
            status: 500,
            headers: CORS
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f18d203c._.js.map