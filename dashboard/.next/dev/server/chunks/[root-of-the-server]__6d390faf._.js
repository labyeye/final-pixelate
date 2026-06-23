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
    "verifyPasswordAsync",
    ()=>verifyPasswordAsync,
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
async function verifyPasswordAsync(password, hash) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(password, hash);
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
"[project]/src/lib/require-auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "requireAuth",
    ()=>requireAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
;
;
function requireAuth(request) {
    const auth = request.headers.get("authorization") || "";
    const token = auth.replace("Bearer ", "");
    const decoded = token ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyToken"])(token) : null;
    if (!decoded) {
        return {
            decoded: null,
            error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "unauthorized"
            }, {
                status: 401
            })
        };
    }
    return {
        decoded: decoded,
        error: null
    };
}
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
"[project]/src/lib/quotation-html.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Matches the design of /quotations/[id]/view/page.tsx exactly
// Used by Puppeteer via page.setContent() — no auth redirects, no client-side JS needed
__turbopack_context__.s([
    "buildQuotationHtml",
    ()=>buildQuotationHtml
]);
function buildQuotationHtml(quotation, client, settings, origin) {
    const clientName = client?.businessName || client?.name || "Valued Client";
    const generatedAt = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
    const formattedDate = new Date(quotation.date || Date.now()).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    const grandTotal = (quotation.services || []).reduce((s, i)=>s + i.price * i.qty, 0);
    const agencyName = settings?.name || "Pixelate Nest";
    const logo = `${origin}/assets/images/Logo_Color_Name_Large.png`;
    const signImg = `${origin}/assets/images/sign.png`;
    const logoHeader = `${origin}/assets/images/logo-transparent.png`;
    const terms = settings?.terms?.length ? settings.terms : [
        "Payment terms: 50% advance, 50% on completion",
        "Project timeline is subject to timely feedback and approvals",
        "Revisions beyond agreed scope will be charged separately",
        "All deliverables remain property of agency until full payment",
        "Client must provide necessary content and assets on time"
    ];
    // TOC entries
    const tocEntries = [];
    let pg = 0;
    tocEntries.push({
        title: "About Us",
        page: ++pg + 1
    });
    tocEntries.push({
        title: "Client Information",
        page: ++pg + 1
    });
    if (quotation.scope?.length) tocEntries.push({
        title: "Scope of Work",
        page: ++pg + 1
    });
    tocEntries.push({
        title: "Deliverables & Services",
        page: ++pg + 1
    });
    tocEntries.push({
        title: "Project Timeline",
        page: ++pg + 1
    });
    if (quotation.modules?.length) tocEntries.push({
        title: "Modules & Features",
        page: ++pg + 1
    });
    tocEntries.push({
        title: "Terms & Conditions",
        page: ++pg + 1
    });
    const totalPages = pg + 2; // cover + toc + content pages
    const pageStyle = `position:relative;box-sizing:border-box;padding:88px 48px 48px;min-height:297mm;page-break-before:always;page-break-inside:avoid;`;
    const header = ()=>`
    <div style="position:absolute;top:0;left:0;right:0;height:72px;border-bottom:2px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between;padding:0 48px;background:#fff;z-index:10;">
      <img src="${logoHeader}" style="height:40px;object-fit:contain;" />
      <div style="text-align:right;line-height:1.3;">
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#111;">${clientName}</div>
        <div style="font-size:10px;color:#888;margin-top:2px;">Generated: ${generatedAt}</div>
      </div>
    </div>`;
    const pageNum = (n)=>`<div style="position:absolute;bottom:16px;right:48px;font-size:10px;font-weight:700;color:#bbb;letter-spacing:0.1em;">${n} / ${totalPages}</div>`;
    const sectionHead = (title)=>`
    <div style="margin-bottom:14px;margin-top:4px;">
      <div style="font-size:10px;font-weight:700;color:#F36F21;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:6px;">Section</div>
      <h2 style="font-size:22px;font-weight:900;color:#111;letter-spacing:-0.02em;margin:0;">${title}</h2>
    </div>`;
    // ── P1: Cover ──────────────────────────────────────────────────────────────
    const p1 = `
  <section style="position:relative;height:297mm;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;background:#fff;padding:160px 64px 0;box-sizing:border-box;page-break-inside:avoid;">
    <div style="position:absolute;top:36px;left:48px;">
      <img src="${logo}" style="height:65px;object-fit:contain;" />
    </div>
    <div style="text-align:center;max-width:500px;">
      <div style="font-size:50px;font-weight:500;margin-top:30px;margin-bottom:8px;letter-spacing:0.03em;">
        <span style="color:#2563EB;">P</span><span style="color:#111;">ixelate </span><span style="color:#F36F21;">N</span><span style="color:#111;">est</span>
      </div>
      <h1 style="font-size:67px;font-weight:600;color:#111;line-height:1.0;letter-spacing:-0.03em;margin:0 0 40px 0;">${quotation.title || "Quotation"}</h1>
      ${quotation.subtitle ? `<p style="font-size:15px;color:#888;margin-bottom:32px;">${quotation.subtitle}</p>` : ""}
      <p style="font-size:28px;color:#000;font-weight:500;margin-top:180px;letter-spacing:0.08em;margin-bottom:8px;">Prepared For</p>
      <p style="font-size:45px;font-weight:600;color:#111;letter-spacing:-0.01em;margin:0;">${clientName}</p>
    </div>
    <div style="position:absolute;bottom:44px;left:0;right:0;text-align:center;">
      <span style="font-size:20px;color:#000;font-weight:500;letter-spacing:0.06em;">${formattedDate}</span>
    </div>
  </section>`;
    // ── P2: Table of Contents ──────────────────────────────────────────────────
    const tocRows = tocEntries.map((e, idx)=>`
    <div style="display:flex;align-items:center;padding:14px;border:1px solid #000;${idx > 0 ? "border-top:none;" : ""}">
      <div style="width:32px;height:32px;background:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:#000;flex-shrink:0;margin-right:16px;border:1px solid #eee;">${String(idx + 1).padStart(2, "0")}</div>
      <span style="flex:1;font-size:14px;font-weight:700;color:#111;">${e.title}</span>
      <div style="flex:1;border-bottom:2px dotted #000;margin:0 12px;height:1px;"></div>
      <span style="font-size:13px;font-weight:900;color:#111;">${e.page}</span>
    </div>`).join("");
    const p2 = `
  <div style="${pageStyle}">
    ${header()}
    <div style="margin-bottom:40px;">
      <div style="font-size:11px;font-weight:700;color:#044bab;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:10px;margin-top:20px;">Contents</div>
      <h2 style="font-size:36px;font-weight:900;color:#111;letter-spacing:-0.02em;margin:0;">Table of Contents</h2>
    </div>
    <div>${tocRows}</div>
    ${pageNum(2)}
  </div>`;
    // ── P3: About + Contact ────────────────────────────────────────────────────
    const mvgCards = [
        {
            label: "Mission",
            text: settings?.mission || "To deliver exceptional digital solutions that exceed client expectations."
        },
        {
            label: "Vision",
            text: settings?.vision || "To be the leading creative digital agency transforming businesses globally."
        },
        {
            label: "Goal",
            text: settings?.goal || "To empower 1000+ businesses with cutting-edge digital solutions."
        }
    ].map(({ label, text })=>`
    <div style="background:#fff;border:1px solid #2a2a2a;padding:16px;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#000;margin-bottom:8px;">${label}</div>
      <p style="font-size:12px;color:#000;line-height:1.6;">${text}</p>
    </div>`).join("");
    const contactItems = [
        {
            label: "Email",
            value: settings?.email || "info@pixelatenest.com"
        },
        {
            label: "Phone",
            value: settings?.phone || "+91 XXXXXXXXXX"
        },
        {
            label: "Address",
            value: settings?.address || "Kala Bhawan, Muzaffarpur, Bihar"
        },
        {
            label: "Website",
            value: settings?.website || "www.pixelatenest.com"
        }
    ].map(({ label, value })=>`
    <div>
      <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#000;margin-bottom:3px;">${label}</div>
      <div style="color:#000;font-size:13px;">${value}</div>
    </div>`).join("");
    const p3 = `
  <div style="${pageStyle}background:#fff;color:#000;">
    ${header()}
    <h2 style="font-size:36px;font-weight:900;color:#111;letter-spacing:-0.02em;margin:0 0 16px 0;">About ${agencyName}</h2>
    <p style="font-size:13px;color:#444;line-height:1.7;margin-bottom:20px;">In 2026, Pixelate Nest was founded with a clear mission: to help ambitious brands navigate the digital world with confidence. We started by combining our passions for cinematic storytelling and cutting-edge web technology, creating a single, integrated agency where creative ideas can truly take flight.</p>
    ${settings?.aboutUs ? `<p style="font-size:13px;color:#444;line-height:1.7;margin-bottom:20px;padding-left:12px;border-left:3px solid #F36F21;">${settings.aboutUs}</p>` : ""}
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px;margin-top:20px;">${mvgCards}</div>
    <div style="border:1px solid #2a2a2a;padding:20px;">
      <div style="border-left:3px solid #044bab;padding-left:12px;margin-bottom:14px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#000;">Contact</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">${contactItems}</div>
    </div>
    ${pageNum(3)}
  </div>`;
    // ── P4: Client Information ─────────────────────────────────────────────────
    const p4 = `
  <div style="${pageStyle}">
    ${header()}
    ${sectionHead("Client Information")}
    <div style="border:1px solid #e5e7eb;padding:24px;background:#fafafa;margin-bottom:24px;">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;${client?.address ? "margin-bottom:16px;" : ""}">
        <div>
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#000;margin-bottom:4px;">Client Name</div>
          <div style="font-size:15px;font-weight:900;color:#111;">${client?.name || "N/A"}</div>
        </div>
        <div>
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#000;margin-bottom:4px;">Email</div>
          <div style="font-weight:600;color:#333;font-size:13px;">${client?.email || "N/A"}</div>
        </div>
        <div>
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#000;margin-bottom:4px;">Phone</div>
          <div style="font-weight:600;color:#333;font-size:13px;">${client?.phone || "N/A"}</div>
        </div>
        ${client?.address ? `<div style="grid-column:span 3;">
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#000;margin-bottom:4px;">Address</div>
          <div style="font-weight:600;color:#000;font-size:13px;">${client.address}</div>
        </div>` : ""}
      </div>
    </div>
    ${quotation.objective ? `${sectionHead("Project Objective")}<p style="font-size:14px;color:#444;line-height:1.8;margin-bottom:24px;white-space:pre-wrap;">${quotation.objective}</p>` : ""}
    ${quotation.purpose ? `${sectionHead("Purpose")}<p style="font-size:14px;color:#444;line-height:1.8;white-space:pre-wrap;">${quotation.purpose}</p>` : ""}
    ${pageNum(4)}
  </div>`;
    // ── P5 (cond): Scope ───────────────────────────────────────────────────────
    let p5 = "";
    let currentPg = 4;
    if (quotation.scope?.length) {
        currentPg++;
        const rows = quotation.scope.map((item, idx)=>`
      <div style="display:flex;align-items:flex-start;gap:14px;padding:13px 16px;border-bottom:${idx < quotation.scope.length - 1 ? "1px solid #f0f0f0" : "none"};background:${idx % 2 === 0 ? "#fff" : "#fafafa"};">
        <span style="font-size:11px;font-weight:900;color:#F36F21;min-width:24px;margin-top:1px;">${String(idx + 1).padStart(2, "0")}.</span>
        <span style="font-size:13px;color:#333;line-height:1.7;">${item}</span>
      </div>`).join("");
        p5 = `
    <div style="${pageStyle}">
      ${header()}
      ${sectionHead("Scope of Work")}
      <div style="border:1px solid #e5e7eb;">${rows}</div>
      ${pageNum(currentPg)}
    </div>`;
    }
    // ── P6: Deliverables + Services ────────────────────────────────────────────
    currentPg++;
    const deliverRows = (quotation.deliverables || []).map((item, idx)=>`
    <div style="display:flex;align-items:flex-start;gap:12px;padding:11px 16px;border-bottom:${idx < (quotation.deliverables?.length ?? 0) - 1 ? "1px solid #f0f0f0" : "none"};background:${idx % 2 === 0 ? "#fff" : "#fafafa"};">
      <span style="color:#F36F21;font-size:14px;margin-top:1px;flex-shrink:0;">✓</span>
      <span style="font-size:13px;color:#333;line-height:1.6;">${item}</span>
    </div>`).join("");
    const serviceRows = (quotation.services || []).map((item, idx)=>{
        const total = item.price * item.qty;
        return `<tr style="background:${idx % 2 === 0 ? "#fff" : "#fafafa"};border-bottom:1px solid #f0f0f0;">
      <td style="padding:11px 14px;font-weight:600;color:#111;">${item.serviceName}</td>
      <td style="padding:11px 14px;text-align:center;color:#555;">${item.qty}</td>
      <td style="padding:11px 14px;text-align:right;color:#555;">Rs.${item.price.toLocaleString("en-IN")}</td>
      <td style="padding:11px 14px;text-align:right;font-weight:700;color:#111;">Rs.${total.toLocaleString("en-IN")}</td>
    </tr>`;
    }).join("");
    const p6 = `
  <div style="${pageStyle}">
    ${header()}
    ${quotation.deliverables?.length ? `
      ${sectionHead("Deliverables")}
      <div style="border:1px solid #e5e7eb;margin-bottom:28px;">${deliverRows}</div>` : ""}
    ${quotation.services?.length ? `
      ${sectionHead("Services Breakdown")}
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#fff;color:#000;border:2px solid #111;">
            <th style="padding:11px 14px;text-align:left;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Service</th>
            <th style="padding:11px 14px;text-align:center;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Qty</th>
            <th style="padding:11px 14px;text-align:right;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Price</th>
            <th style="padding:11px 14px;text-align:right;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Total</th>
          </tr>
        </thead>
        <tbody>${serviceRows}</tbody>
        <tfoot>
          <tr style="background:#fff;color:#000;">
            <td colspan="3" style="padding:13px 14px;text-align:right;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:0.08em;">Grand Total</td>
            <td style="padding:13px 14px;text-align:right;font-weight:900;font-size:18px;color:#111;">Rs.${grandTotal.toLocaleString("en-IN")}</td>
          </tr>
        </tfoot>
      </table>` : ""}
    ${pageNum(currentPg)}
  </div>`;
    // ── P7: Timeline ───────────────────────────────────────────────────────────
    currentPg++;
    const timelineRows = (quotation.timeline || []).map((item, idx)=>`
    <tr style="background:${idx % 2 === 0 ? "#fff" : "#fafafa"};border-bottom:1px solid #f0f0f0;">
      <td style="padding:11px 14px;font-weight:700;color:#111;">${item.phase}</td>
      <td style="padding:11px 14px;color:#444;">${item.description}</td>
      <td style="padding:11px 14px;text-align:right;font-weight:600;color:#F36F21;">${item.duration}</td>
    </tr>`).join("");
    const p7 = `
  <div style="${pageStyle}">
    ${header()}
    ${sectionHead("Project Timeline")}
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <thead>
        <tr style="background:#fff;color:#000;border-bottom:2px solid #111;">
          <th style="padding:11px 14px;text-align:left;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Phase</th>
          <th style="padding:11px 14px;text-align:left;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Description</th>
          <th style="padding:11px 14px;text-align:right;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Duration</th>
        </tr>
      </thead>
      <tbody>${timelineRows}</tbody>
    </table>
    ${pageNum(currentPg)}
  </div>`;
    // ── P8 (cond): Modules ─────────────────────────────────────────────────────
    let p8 = "";
    if (quotation.modules?.length) {
        currentPg++;
        const modCards = quotation.modules.map((mod)=>{
            const bg = mod.status === "Completed" ? "#111" : mod.status === "Ongoing" ? "#044bab" : "#f3f4f6";
            const fg = mod.status === "Planned" ? "#111" : "#fff";
            return `
      <div style="border:1px solid #e5e7eb;padding:16px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
          <span style="font-weight:700;font-size:14px;color:#111;">${mod.moduleName}</span>
          <span style="font-size:10px;font-weight:700;padding:3px 8px;background:${bg};color:${fg};text-transform:uppercase;">${mod.status}</span>
        </div>
        <p style="font-size:12px;color:#555;line-height:1.5;">${mod.description}</p>
      </div>`;
        }).join("");
        p8 = `
    <div style="${pageStyle}">
      ${header()}
      ${sectionHead("Modules & Features")}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">${modCards}</div>
      ${pageNum(currentPg)}
    </div>`;
    }
    // ── P Last: Terms + Signature ──────────────────────────────────────────────
    currentPg++;
    const termsHtml = terms.map((t, idx)=>`
    <div style="display:flex;gap:10px;margin-bottom:8px;font-size:13px;color:#444;">
      <span style="font-weight:700;color:#F36F21;min-width:20px;">${idx + 1}.</span>
      <span style="line-height:1.6;">${t}</span>
    </div>`).join("");
    const pLast = `
  <div style="${pageStyle}display:flex;flex-direction:column;">
    ${header()}
    <div style="flex:1;">
      ${quotation.notes || quotation.paymentTerms ? `
      <div style="margin-bottom:24px;">
        ${sectionHead("Additional Information")}
        <div style="border:1px solid #e5e7eb;padding:20px;background:#fafafa;">
          ${quotation.paymentTerms ? `<div style="margin-bottom:${quotation.notes ? "14px" : "0"};"><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:6px;">Payment Terms</div><p style="font-size:13px;color:#444;line-height:1.7;white-space:pre-wrap;">${quotation.paymentTerms}</p></div>` : ""}
          ${quotation.notes ? `<div><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:6px;">Notes</div><p style="font-size:13px;color:#444;line-height:1.7;white-space:pre-wrap;">${quotation.notes}</p></div>` : ""}
        </div>
      </div>` : ""}
      ${sectionHead("Terms & Conditions")}
      <div style="border:1px solid #e5e7eb;padding:20px;background:#fafafa;margin-bottom:24px;">${termsHtml}</div>
    </div>
    <div style="border-top:2px solid #111;padding-top:24px;display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-bottom:20px;">
      <div>
        <img src="${signImg}" style="height:56px;object-fit:contain;margin-bottom:8px;display:block;" />
        <div style="border-top:1.5px solid #111;padding-top:8px;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#111;">Authorized Signatory</div>
          <div style="font-size:11px;color:#555;margin-top:2px;">${agencyName}</div>
        </div>
      </div>
      <div>
        <div style="height:56px;margin-bottom:8px;"></div>
        <div style="border-top:1.5px solid #111;padding-top:8px;">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#111;">Client Signature</div>
          <div style="font-size:11px;color:#555;margin-top:2px;">${clientName}</div>
          <div style="font-size:10px;color:#aaa;margin-top:4px;">Date: __________________</div>
        </div>
      </div>
    </div>
    <div style="border-top:1px solid #eee;padding-top:10px;text-align:center;">
      <div style="font-size:11px;color:#888;">${settings?.footerText || `© 2026 ${agencyName}. All Rights Reserved.`}</div>
      <div style="font-size:10px;color:#bbb;margin-top:3px;">${settings?.phone || "+91 84069 12345"} | ${settings?.email || "support@pixelatenest.com"} | ${settings?.website || "www.pixelatenest.com"}</div>
    </div>
    ${pageNum(currentPg)}
  </div>`;
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: Arial, sans-serif; }
    body { background: #fff; }
    @media print {
      * { print-color-adjust: exact !important; -webkit-print-color-adjust: exact !important; }
      @page { size: A4; margin: 0; }
    }
  </style>
</head>
<body>${p1}${p2}${p3}${p4}${p5}${p6}${p7}${p8}${pLast}</body>
</html>`;
}
}),
"[project]/src/app/api/generate-quotation-pdf/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$require$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/require-auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quotation$2d$html$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/quotation-html.ts [app-route] (ecmascript)");
;
;
;
;
;
async function POST(request) {
    const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$require$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAuth"])(request);
    if (auth.error) return auth.error;
    try {
        const { quotationId } = await request.json();
        if (!quotationId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "quotationId required"
            }, {
                status: 400
            });
        }
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        let quotation = null;
        try {
            quotation = await db.collection("quotations").findOne({
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](quotationId)
            });
        } catch  {
            quotation = await db.collection("quotations").findOne({
                _id: quotationId
            });
        }
        if (!quotation) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Quotation not found"
            }, {
                status: 404
            });
        }
        let client = null;
        if (quotation.clientId) {
            try {
                client = await db.collection("clients").findOne({
                    _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__["ObjectId"](quotation.clientId)
                });
            } catch  {
                client = await db.collection("clients").findOne({
                    _id: quotation.clientId
                });
            }
        }
        const settings = await db.collection("settings").findOne({});
        const origin = request.nextUrl.origin;
        const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$quotation$2d$html$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildQuotationHtml"])(quotation, client, settings, origin);
        const puppeteer = await __turbopack_context__.A("[externals]/puppeteer [external] (puppeteer, esm_import, async loader)");
        const browser = await puppeteer.default.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage"
            ]
        });
        try {
            const page = await browser.newPage();
            await page.setViewport({
                width: 794,
                height: 1122
            });
            // Use setContent instead of goto — no auth, no redirects
            await page.setContent(html, {
                waitUntil: "networkidle0",
                timeout: 30000
            });
            // Wait for images (logo, sign) to load
            await page.evaluate(()=>Promise.all(Array.from(document.images).filter((img)=>!img.complete).map((img)=>new Promise((res)=>{
                        img.onload = img.onerror = ()=>res();
                    }))));
            await page.emulateMediaType("print");
            const pdfBuffer = await page.pdf({
                format: "A4",
                printBackground: true,
                margin: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            });
            const safeTitle = (quotation.title || "Quotation").replace(/[^a-zA-Z0-9-_]/g, "-");
            const filename = `${quotation.quoteId || quotationId}-${safeTitle}.pdf`;
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](pdfBuffer, {
                status: 200,
                headers: {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": `attachment; filename="${filename}"`,
                    "X-Filename": filename
                }
            });
        } finally{
            await browser.close();
        }
    } catch (e) {
        console.error("generate-quotation-pdf error:", e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: e.message || "PDF generation failed"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6d390faf._.js.map