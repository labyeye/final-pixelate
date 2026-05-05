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
"[project]/Desktop/Projects/final-pixelate/dashboard/src/app/api/whatsapp-templates/[id]/submit/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
;
;
;
const COLLECTION = "whatsapp_templates";
function toObjectId(id) {
    try {
        return new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](id);
    } catch  {
        return null;
    }
}
// Build the Meta API components array from our template document
function buildComponents(template) {
    const components = [];
    // ── HEADER ────────────────────────────────────────────────────────────────
    if (template.headerType && template.headerType !== "NONE") {
        if (template.headerType === "TEXT" && template.headerText) {
            const hasVar = /{{[^}]+}}/.test(template.headerText);
            const comp = {
                type: "HEADER",
                format: "TEXT",
                text: template.headerText
            };
            if (hasVar) {
                comp.example = {
                    header_text: [
                        template.headerExamples?.[0] ?? "Sample Header"
                    ]
                };
            }
            components.push(comp);
        } else {
            // IMAGE / DOCUMENT / VIDEO — use the uploaded Meta media handle if available
            if (template.headerMediaHandle) {
                components.push({
                    type: "HEADER",
                    format: template.headerType,
                    example: {
                        header_handle: [
                            template.headerMediaHandle
                        ]
                    }
                });
            } else {
                // No handle uploaded yet — submit without example (Meta may accept this for DOCUMENT)
                components.push({
                    type: "HEADER",
                    format: template.headerType
                });
            }
        }
    }
    // ── BODY ──────────────────────────────────────────────────────────────────
    if (template.body) {
        // Trim trailing whitespace from each line and strip leading/trailing blank lines
        const cleanBody = template.body.split("\n").map((line)=>line.trimEnd()).join("\n").trim();
        const bodyComp = {
            type: "BODY",
            text: cleanBody
        };
        // Detect {{n}} variables and attach example values
        // Sort {{1}}, {{2}}, … in numeric order so examples align correctly
        const rawMatches = template.body.match(/\{\{(\d+)\}\}/g) ?? [];
        const varNums = [
            ...new Set(rawMatches.map((m)=>parseInt(m.replace(/[{}]/g, ""))))
        ].sort((a, b)=>a - b);
        if (varNums.length > 0) {
            const examples = varNums.map((n)=>{
                const i = n - 1; // {{1}} → index 0
                const val = template.exampleValues?.[i] ?? template.variables?.[i];
                return val && String(val).trim() ? String(val).trim() : `sample_${n}`;
            });
            bodyComp.example = {
                body_text: [
                    examples
                ]
            };
        }
        components.push(bodyComp);
    }
    // ── FOOTER ────────────────────────────────────────────────────────────────
    if (template.footer) {
        components.push({
            type: "FOOTER",
            text: template.footer
        });
    }
    // ── BUTTONS ───────────────────────────────────────────────────────────────
    if (Array.isArray(template.buttons) && template.buttons.length > 0) {
        const buttons = template.buttons.map((btn)=>{
            if (btn.type === "QUICK_REPLY") return {
                type: "QUICK_REPLY",
                text: btn.text
            };
            if (btn.type === "URL") return {
                type: "URL",
                text: btn.text,
                url: btn.url ?? "https://pixelatenest.com"
            };
            if (btn.type === "PHONE_NUMBER") return {
                type: "PHONE_NUMBER",
                text: btn.text,
                phone_number: btn.phone ?? "+919999999999"
            };
            return {
                type: btn.type,
                text: btn.text
            };
        });
        components.push({
            type: "BUTTONS",
            buttons
        });
    }
    return components;
}
async function POST(req, { params }) {
    const { id } = await params;
    // Accept optional name override in body — more reliable than ObjectId URL param
    let nameOverride;
    try {
        const body = await req.json().catch(()=>({}));
        nameOverride = body?.name;
    } catch  {
    // body is optional
    }
    const oid = toObjectId(id);
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    const wabaId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
    const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v21.0";
    const missing = [];
    if (!accessToken) missing.push("WHATSAPP_ACCESS_TOKEN");
    if (!wabaId) missing.push("WHATSAPP_BUSINESS_ACCOUNT_ID");
    if (missing.length > 0) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `Missing in .env: ${missing.join(", ")}`
        }, {
            status: 500
        });
    }
    let db;
    try {
        db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Database connection failed: " + err.message
        }, {
            status: 500
        });
    }
    // Look up template — try 3 strategies in order:
    // 1. By name (most reliable — names are unique)
    // 2. By ObjectId from URL param
    // 3. By string _id fallback
    let template = null;
    try {
        if (nameOverride) {
            template = await db.collection(COLLECTION).findOne({
                name: nameOverride
            });
            console.info(`[submit] lookup by name "${nameOverride}":`, template ? "FOUND" : "NOT FOUND");
        }
        if (!template && oid) {
            template = await db.collection(COLLECTION).findOne({
                _id: oid
            });
            console.info(`[submit] lookup by ObjectId "${id}":`, template ? "FOUND" : "NOT FOUND");
        }
        if (!template) {
            // last resort — scan entire collection (small collection, acceptable)
            const all = await db.collection(COLLECTION).find({}).toArray();
            console.info(`[submit] full scan, ${all.length} docs, looking for id="${id}"`);
            template = all.find((t)=>t._id.toString() === id || t.name === nameOverride) ?? null;
        }
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "DB query failed: " + err.message
        }, {
            status: 500
        });
    }
    if (!template) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `Template not found. Please delete it, recreate it, and submit again.`
        }, {
            status: 404
        });
    }
    const components = buildComponents(template);
    const payload = {
        name: template.name,
        language: template.language ?? "en_US",
        category: template.category ?? "UTILITY",
        components
    };
    console.info("[whatsapp-templates/submit] Submitting to Meta:", JSON.stringify(payload, null, 2));
    let metaRes;
    try {
        metaRes = await fetch(`https://graph.facebook.com/${apiVersion}/${wabaId}/message_templates`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Network error reaching Meta API: " + err.message
        }, {
            status: 502
        });
    }
    const metaJson = await metaRes.json().catch(()=>({}));
    if (!metaRes.ok) {
        const errDetail = metaJson?.error ?? {};
        console.error("[whatsapp-templates/submit] Meta error:", JSON.stringify(metaJson, null, 2));
        console.error("[submit] Meta rejected payload:", JSON.stringify(payload, null, 2));
        const metaMessage = errDetail.message ?? "Meta API returned an error.";
        const metaDetails = errDetail.error_data?.details ?? "";
        const subcode = errDetail.error_subcode ?? "";
        // Subcode 2388023 = template name already exists on Meta — treat as success
        if (subcode === 2388023 || String(subcode) === "2388023" || metaMessage.toLowerCase().includes("already exists")) {
            // Template was previously submitted — just mark it as submitted locally
            await db.collection(COLLECTION).updateOne({
                _id: template._id
            }, {
                $set: {
                    status: "SUBMITTED",
                    submittedAt: new Date().toISOString(),
                    updatedAt: new Date()
                }
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                metaTemplateId: template.metaTemplateId ?? null,
                metaStatus: "PENDING",
                message: `Template "${template.name}" was already submitted to Meta. Check Meta Business Suite for approval status.`
            });
        }
        const friendly = metaDetails ? `${metaMessage} — ${metaDetails}` : subcode ? `${metaMessage} (subcode: ${subcode})` : metaMessage;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `[Meta ${errDetail.code ?? metaRes.status}] ${friendly}`,
            code: errDetail.code,
            subcode,
            detail: errDetail,
            payload
        }, {
            status: metaRes.status >= 500 ? 502 : 422
        });
    }
    const metaTemplateId = metaJson?.id ?? null;
    const metaStatus = metaJson?.status ?? "PENDING";
    // Update local record — use template's actual _id to be safe
    await db.collection(COLLECTION).updateOne({
        _id: template._id
    }, {
        $set: {
            status: "SUBMITTED",
            metaTemplateId,
            metaStatus,
            submittedAt: new Date().toISOString(),
            updatedAt: new Date()
        }
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        metaTemplateId,
        metaStatus,
        message: `Template "${template.name}" submitted to Meta. It will be reviewed within 2–48 hours.`
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bf36087b._.js.map