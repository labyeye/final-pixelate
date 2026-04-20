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
"[project]/Desktop/Projects/final-pixelate/dashboard/src/app/api/whatsapp/bulk-send/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/mongodb.ts [app-route] (ecmascript)");
;
;
const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION || "v21.0";
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const DELAY_BETWEEN_MESSAGES = 1000;
async function sendPersonalizedMessage(phone, name, _company, templateName = "bni_outreach", services) {
    try {
        const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_ID}/messages`;
        const payload = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: phone,
            type: "template",
            template: {
                name: templateName,
                language: {
                    code: "en"
                },
                components: [
                    {
                        type: "header",
                        parameters: [
                            {
                                type: "text",
                                parameter_name: "person_name",
                                text: name
                            }
                        ]
                    },
                    {
                        type: "body",
                        parameters: [
                            {
                                type: "text",
                                parameter_name: "service_one",
                                text: services?.service_one ?? "Website and App Development"
                            },
                            {
                                type: "text",
                                parameter_name: "service_two",
                                text: services?.service_two ?? "Software (ERP and CRM) Software Development"
                            },
                            {
                                type: "text",
                                parameter_name: "service_three",
                                text: services?.service_three ?? "Digital Media Solutions"
                            }
                        ]
                    }
                ]
            }
        };
        console.log(`📤 Sending to ${phone}:`, JSON.stringify(payload, null, 2));
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const error = await response.json();
            console.error(`Failed to send message to ${phone}:`, error);
            return {
                success: false,
                phone,
                error: error.error?.message || "Failed to send message"
            };
        }
        const data = await response.json();
        return {
            success: true,
            phone,
            messageId: data.messages?.[0]?.id
        };
    } catch (error) {
        console.error(`Error sending message to ${phone}:`, error);
        return {
            success: false,
            phone,
            error: error.message
        };
    }
}
function formatPhoneNumber(phone) {
    let cleaned = phone.replace(/[^\d+]/g, "");
    if (!cleaned.startsWith("+")) {
        if (cleaned.length === 10) cleaned = "+91" + cleaned;
        else if (cleaned.length === 12 && cleaned.startsWith("91")) cleaned = "+" + cleaned;
    }
    return cleaned;
}
async function POST(request) {
    try {
        const body = await request.json();
        const { contacts, template_name = "bni_outreach", services } = body;
        if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "contacts array is required and must not be empty"
            }, {
                status: 400
            });
        }
        if (!WHATSAPP_PHONE_ID || !WHATSAPP_ACCESS_TOKEN) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "WhatsApp API credentials not configured"
            }, {
                status: 500
            });
        }
        if (contacts.length > 100) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Maximum 100 contacts per request (use pagination)"
            }, {
                status: 400
            });
        }
        const results = [];
        let successCount = 0;
        let failureCount = 0;
        console.log(`🚀 Starting bulk message send to ${contacts.length} contacts...`);
        for(let i = 0; i < contacts.length; i++){
            const contact = contacts[i];
            if (!contact.phone || !contact.name) {
                results.push({
                    success: false,
                    phone: contact.phone || "unknown",
                    error: "Missing required fields: phone and name"
                });
                failureCount++;
                continue;
            }
            try {
                const formattedPhone = formatPhoneNumber(contact.phone);
                const result = await sendPersonalizedMessage(formattedPhone, contact.name, contact.company, template_name, services);
                results.push(result);
                if (result.success) {
                    successCount++;
                    console.log(`✅ Message sent to ${contact.name} (${formattedPhone})`);
                    // Save message to inbox
                    try {
                        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
                        await db.collection("whatsapp_messages").insertOne({
                            phone: formattedPhone,
                            contactName: contact.name,
                            messageType: "sent",
                            message: `Bulk WhatsApp message sent via template: ${template_name}`,
                            templateName: template_name,
                            status: "sent",
                            messageId: result.messageId,
                            timestamp: new Date(),
                            campaignId: body.campaignId,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                    } catch (dbError) {
                        console.error("Failed to save message to inbox:", dbError);
                    }
                } else {
                    failureCount++;
                    console.log(`❌ Failed to send to ${contact.name}: ${result.error}`);
                }
            } catch (error) {
                results.push({
                    success: false,
                    phone: contact.phone,
                    error: error.message
                });
                failureCount++;
            }
            if (i < contacts.length - 1) {
                await new Promise((resolve)=>setTimeout(resolve, DELAY_BETWEEN_MESSAGES));
            }
        }
        console.log(`📊 Bulk send complete: ${successCount} sent, ${failureCount} failed`);
        // Save campaign record to database
        try {
            const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
            const now = new Date();
            const campaign = {
                name: `WhatsApp Campaign - ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
                description: `Bulk messaging campaign for ${template_name}`,
                templateName: template_name,
                status: "completed",
                totalContacts: contacts.length,
                sent: successCount,
                delivered: successCount,
                read: 0,
                replied: 0,
                failed: failureCount,
                startDate: now,
                endDate: now,
                createdBy: "bulk-messaging",
                createdAt: now,
                updatedAt: now
            };
            await db.collection("campaigns").insertOne(campaign);
        } catch (dbError) {
            console.error("Failed to save campaign:", dbError);
        // Don't fail the entire request if campaign saving fails
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            summary: {
                total: contacts.length,
                successful: successCount,
                failed: failureCount,
                success_rate: `${(successCount / contacts.length * 100).toFixed(2)}%`
            },
            details: results,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Bulk messaging error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || "Internal server error"
        }, {
            status: 500
        });
    }
}
async function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        message: "Bulk WhatsApp messaging endpoint",
        endpoint: "POST /api/whatsapp/bulk-send",
        documentation: "/api/whatsapp/bulk-send/docs"
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e0a81dfa._.js.map