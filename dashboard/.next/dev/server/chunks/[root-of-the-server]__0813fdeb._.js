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
"[project]/src/app/api/send-brand-guide-whatsapp/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
function sanitisePhone(raw) {
    return raw.replace(/\D/g, "");
}
function isValidPhone(digits) {
    return /^\d{7,15}$/.test(digits);
}
async function POST(req) {
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
    const { phone, clientName, brandName, mediaId, pdfUrl, templateName, templateLang } = body;
    const missingFields = [];
    if (!phone) missingFields.push("phone");
    if (!clientName) missingFields.push("clientName");
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
            error: "Invalid phone number. Provide digits in E.164 format without + (e.g. 919876543210)."
        }, {
            status: 400
        });
    }
    if (pdfUrl && !pdfUrl.startsWith("https://")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "pdfUrl must be a public HTTPS URL."
        }, {
            status: 400
        });
    }
    const accessToken = process.env.META_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v21.0";
    if (!accessToken || !phoneNumberId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Server misconfiguration: missing WhatsApp credentials."
        }, {
            status: 500
        });
    }
    const tmplName = "brand_guide";
    const tmplLang = "en_us";
    const safeFilename = `Brand-Guide-${(brandName || clientName).replace(/[/\\:*?"<>|]/g, "-")}.pdf`;
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
            name: tmplName,
            language: {
                code: tmplLang
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
                            parameter_name: "brand_name",
                            text: brandName || clientName
                        }
                    ]
                }
            ]
        }
    };
    const endpoint = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Network error while contacting WhatsApp API. Please try again."
        }, {
            status: 502
        });
    }
    const waJson = await waResponse.json().catch(()=>({}));
    if (!waResponse.ok) {
        const errDetail = waJson?.error ?? {};
        const friendlyMessage = errDetail.message ?? "WhatsApp API returned an error.";
        console.error("[WhatsApp brand-guide] API error:", JSON.stringify(waJson, null, 2));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: friendlyMessage,
            detail: errDetail
        }, {
            status: waResponse.status >= 500 ? 502 : 422
        });
    }
    const messageId = waJson?.messages?.[0]?.id ?? null;
    console.info(`[WhatsApp brand-guide] Sent to ${digits}, wamid: ${messageId}`);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__0813fdeb._.js.map