(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/(crm)/quotations/[id]/view/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuotationViewPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-fetch.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-client] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-client] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-client] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rocket.js [app-client] (ecmascript) <export default as Rocket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-check-big.js [app-client] (ecmascript) <export default as CheckSquare>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
// ─── Page Header (appears on every inner page) ────────────────────────────────
function PageHeader({ clientName, generatedAt }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 48px",
            background: "#fff",
            zIndex: 10
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/assets/images/Logo_Color_Name_Large.png",
                alt: "Pixelate Nest",
                style: {
                    height: "65px",
                    objectFit: "cover",
                    marginTop: "36px"
                }
            }, void 0, false, {
                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: "right",
                    lineHeight: 1.3,
                    marginTop: "36px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: "15px",
                            fontWeight: "700",
                            color: "#111"
                        },
                        children: clientName
                    }, void 0, false, {
                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: "15px",
                            color: "#000",
                            marginTop: "2px"
                        },
                        children: generatedAt
                    }, void 0, false, {
                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = PageHeader;
// ─── Page Number ──────────────────────────────────────────────────────────────
function PageNumber({ num, total }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "absolute",
            bottom: "16px",
            right: "48px",
            fontSize: "10px",
            fontWeight: "600",
            color: "#bbb",
            letterSpacing: "0.05em"
        },
        children: [
            "Page: ",
            num,
            "/",
            total
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c1 = PageNumber;
// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
            borderLeft: "4px solid #044bab",
            paddingLeft: "12px",
            marginTop: "40px"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: {
                fontSize: "15px",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#111"
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_c2 = SectionHeading;
function QuotationViewPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const id = params.id;
    const [quotation, setQuotation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [client, setClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuotationViewPage.useEffect": ()=>{
            if (!id) return;
            ({
                "QuotationViewPage.useEffect": async ()=>{
                    try {
                        const [qRes, sRes] = await Promise.all([
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/quotations/${id}`),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])("/api/settings")
                        ]);
                        if (!qRes.ok) throw new Error("Failed to fetch quotation");
                        const qData = await qRes.json();
                        setQuotation(qData);
                        if (sRes.ok) setSettings(await sRes.json());
                        if (qData.clientId) {
                            const cRes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/clients/${qData.clientId}`);
                            if (cRes.ok) setClient(await cRes.json());
                        }
                    } catch (error) {
                        console.error("Error loading quotation:", error);
                    } finally{
                        setLoading(false);
                    }
                }
            })["QuotationViewPage.useEffect"]();
        }
    }["QuotationViewPage.useEffect"], [
        id
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-lg font-black tracking-widest uppercase",
                children: "Loading quotation..."
            }, void 0, false, {
                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                lineNumber: 136,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
            lineNumber: 135,
            columnNumber: 7
        }, this);
    }
    if (!quotation) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-lg font-black text-red-600 uppercase",
                children: "Quotation not found"
            }, void 0, false, {
                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                lineNumber: 146,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
            lineNumber: 145,
            columnNumber: 7
        }, this);
    }
    const clientName = client?.businessName || client?.name || "Valued Client";
    const generatedAt = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
    const formattedDate = new Date(quotation.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    const grandTotal = quotation.services ? quotation.services.reduce((sum, item)=>sum + item.price * item.qty, 0) : 0;
    // Build TOC entries and total page count
    // P1=Cover, P2=TOC, P3=About, P4=Client Info
    let totalPages = 4;
    if (quotation.scope && quotation.scope.length > 0) totalPages++; // P5
    totalPages++; // P5/6: Deliverables+Services
    totalPages++; // P6/7: Timeline
    if (quotation.modules && quotation.modules.length > 0) totalPages++; // P7/8
    totalPages++; // PLast: Terms+Signature
    const tocEntries = [];
    let pg = 3; // starts after cover(1) and toc(2)
    tocEntries.push({
        title: "About Us",
        page: pg++
    });
    tocEntries.push({
        title: "Client Information",
        page: pg++
    });
    if (quotation.scope && quotation.scope.length > 0) tocEntries.push({
        title: "Scope of Work",
        page: pg++
    });
    tocEntries.push({
        title: "Deliverables & Services",
        page: pg++
    });
    tocEntries.push({
        title: "Project Timeline",
        page: pg++
    });
    if (quotation.modules && quotation.modules.length > 0) tocEntries.push({
        title: "Modules & Features",
        page: pg++
    });
    tocEntries.push({
        title: "Terms, Notes & Signature",
        page: pg++
    });
    let pageCounter = 0;
    const nextPage = ()=>++pageCounter;
    const pageStyle = {
        position: "relative",
        boxSizing: "border-box",
        padding: "80px 48px 52px"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-cd5f1628dfc1fc40" + " " + "print:hidden fixed top-4 right-4 z-50 flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>{
                            const editId = quotation._id || quotation.id || id;
                            router.push(`/quotations/create?edit=${editId}`);
                        },
                        size: "lg",
                        variant: "outline",
                        className: "shadow-lg border-2 border-black font-black",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this),
                            " Edit"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>window.print(),
                        size: "lg",
                        className: "shadow-lg bg-[#111] text-white hover:bg-[#333] border-2 border-black font-black",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                className: "mr-2 h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this),
                            " Print / Download PDF"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-cd5f1628dfc1fc40" + " " + "print-area min-h-screen bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-cd5f1628dfc1fc40" + " " + "max-w-[210mm] mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            style: {
                                position: "relative",
                                height: "100vh",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                background: "#fff",
                                padding: "160px 64px 0",
                                boxSizing: "border-box"
                            },
                            className: "jsx-cd5f1628dfc1fc40" + " " + "print-page",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: "absolute",
                                        top: "36px",
                                        left: "48px"
                                    },
                                    className: "jsx-cd5f1628dfc1fc40",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/assets/images/Logo_Color_Name_Large.png",
                                        alt: "Pixelate Nest",
                                        style: {
                                            height: "65px",
                                            objectFit: "contain"
                                        },
                                        className: "jsx-cd5f1628dfc1fc40"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 242,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: "center",
                                        maxWidth: "500px"
                                    },
                                    className: "jsx-cd5f1628dfc1fc40",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: "50px",
                                                fontWeight: "500",
                                                marginTop: "30px",
                                                marginBottom: "8px",
                                                letterSpacing: "0.03em"
                                            },
                                            className: "jsx-cd5f1628dfc1fc40",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "#2563EB"
                                                    },
                                                    className: "jsx-cd5f1628dfc1fc40",
                                                    children: "P"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "#111"
                                                    },
                                                    className: "jsx-cd5f1628dfc1fc40",
                                                    children: "ixelate "
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                    lineNumber: 262,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "#F36F21"
                                                    },
                                                    className: "jsx-cd5f1628dfc1fc40",
                                                    children: "N"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "#111"
                                                    },
                                                    className: "jsx-cd5f1628dfc1fc40",
                                                    children: "est"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 252,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            style: {
                                                fontSize: "67px",
                                                fontWeight: "600",
                                                color: "#111",
                                                lineHeight: 1.0,
                                                letterSpacing: "-0.03em",
                                                margin: "0 0 40px 0"
                                            },
                                            className: "jsx-cd5f1628dfc1fc40",
                                            children: quotation.title || "Quotation"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 268,
                                            columnNumber: 15
                                        }, this),
                                        quotation.subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: "15px",
                                                color: "#888",
                                                marginBottom: "32px",
                                                fontWeight: "400"
                                            },
                                            className: "jsx-cd5f1628dfc1fc40",
                                            children: quotation.subtitle
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 282,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: "28px",
                                                color: "#000",
                                                fontWeight: "500",
                                                marginTop: "180px",
                                                letterSpacing: "0.08em",
                                                marginBottom: "8px"
                                            },
                                            className: "jsx-cd5f1628dfc1fc40",
                                            children: "Prepared For"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 295,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: "45px",
                                                fontWeight: "600",
                                                color: "#111",
                                                letterSpacing: "-0.01em",
                                                margin: 0
                                            },
                                            className: "jsx-cd5f1628dfc1fc40",
                                            children: clientName
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 308,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                    lineNumber: 250,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        position: "absolute",
                                        bottom: "44px",
                                        left: 0,
                                        right: 0,
                                        textAlign: "center"
                                    },
                                    className: "jsx-cd5f1628dfc1fc40",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "20px",
                                            color: "#000",
                                            fontWeight: "500",
                                            letterSpacing: "0.06em"
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: formattedDate
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 331,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                    lineNumber: 322,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                            lineNumber: 226,
                            columnNumber: 11
                        }, this),
                        (()=>{
                            const pn = nextPage();
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    ...pageStyle,
                                    minHeight: "100vh"
                                },
                                className: "jsx-cd5f1628dfc1fc40" + " " + "print-page",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageHeader, {
                                        clientName: clientName,
                                        generatedAt: generatedAt
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 352,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: "40px"
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "11px",
                                                    fontWeight: "700",
                                                    color: "#044bab",
                                                    letterSpacing: "0.15em",
                                                    textTransform: "uppercase",
                                                    marginBottom: "10px",
                                                    marginTop: "20px"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: "Contents"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 356,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                style: {
                                                    fontSize: "36px",
                                                    fontWeight: "900",
                                                    color: "#111",
                                                    letterSpacing: "-0.02em",
                                                    margin: 0
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: "Table of Contents"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 369,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 355,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "0"
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: tocEntries.map((entry, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    padding: "14px 14px",
                                                    border: "1px solid #000"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: "32px",
                                                            height: "32px",
                                                            background: "#fff",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            fontSize: "11px",
                                                            fontWeight: "900",
                                                            color: "#000",
                                                            flexShrink: 0,
                                                            marginRight: "16px"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: String(idx + 1).padStart(2, "0")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            flex: 1,
                                                            fontSize: "14px",
                                                            fontWeight: "700",
                                                            color: "#111"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: entry.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 415,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            flex: 1,
                                                            borderBottom: "2px dotted #000",
                                                            margin: "0 12px",
                                                            height: "1px"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 426,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: "13px",
                                                            fontWeight: "900",
                                                            color: "#111",
                                                            minWidth: "20px",
                                                            textAlign: "right"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: entry.page
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 435,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 387,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 383,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageNumber, {
                                        num: pn,
                                        total: totalPages
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 450,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 348,
                                columnNumber: 15
                            }, this);
                        })(),
                        (()=>{
                            const pn = nextPage();
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    ...pageStyle,
                                    background: "#fff",
                                    color: "#000",
                                    minHeight: "100vh"
                                },
                                className: "jsx-cd5f1628dfc1fc40" + " " + "print-page",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageHeader, {
                                        clientName: clientName,
                                        generatedAt: generatedAt
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 468,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontSize: "28px",
                                            fontWeight: "900",
                                            color: "#fff",
                                            textTransform: "uppercase",
                                            letterSpacing: "-0.01em",
                                            marginBottom: "4px"
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: settings?.name || "Pixelate Nest"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 469,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontSize: "36px",
                                            fontWeight: "900",
                                            color: "#111",
                                            letterSpacing: "-0.02em",
                                            marginBottom: "30px",
                                            margin: 0
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            "About Pixelate Nest",
                                            " "
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 482,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: "In 2026, Pixelate Nest was founded with a clear mission: to help ambitious brands navigate the digital world with confidence. We started by combining our passions for cinematic storytelling and cutting-edge web technology, creating a single, integrated agency where creative ideas can truly take flight. Today, we partner with clients to build everything from high-performance websites to compelling video campaigns. At every step, you get access to a dedicated team with the strategic insights and technical expertise needed to turn your vision into a powerful digital asset."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 494,
                                        columnNumber: 17
                                    }, this),
                                    settings?.aboutUs && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: "28px"
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    borderLeft: "3px solid #F36F21",
                                                    paddingLeft: "12px",
                                                    marginBottom: "10px"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: "11px",
                                                        fontWeight: "700",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.1em",
                                                        color: "#aaa"
                                                    },
                                                    className: "jsx-cd5f1628dfc1fc40",
                                                    children: "About Us"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                    lineNumber: 516,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 509,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: "13px",
                                                    color: "#ccc",
                                                    lineHeight: "1.7"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: settings.aboutUs
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 528,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 508,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr 1fr",
                                            gap: "12px",
                                            marginBottom: "28px",
                                            marginTop: "20px"
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            {
                                                label: "Mission",
                                                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"],
                                                text: settings?.mission || "To deliver exceptional digital solutions that exceed client expectations."
                                            },
                                            {
                                                label: "Vision",
                                                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"],
                                                text: settings?.vision || "To be the leading creative digital agency transforming businesses globally."
                                            },
                                            {
                                                label: "Goal",
                                                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__["Rocket"],
                                                text: settings?.goal || "To empower 1000+ businesses with cutting-edge digital solutions."
                                            }
                                        ].map(({ label, Icon, text })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: "#fff",
                                                    border: "1px solid #2a2a2a",
                                                    padding: "16px"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "8px",
                                                            marginBottom: "8px"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                size: 14,
                                                                color: "#044bab",
                                                                className: "jsx-cd5f1628dfc1fc40"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 588,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: "11px",
                                                                    fontWeight: "700",
                                                                    textTransform: "uppercase",
                                                                    letterSpacing: "0.1em",
                                                                    color: "#000"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 589,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 580,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: "12px",
                                                            color: "#000",
                                                            lineHeight: "1.6"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: text
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 601,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, label, true, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 572,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 540,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            border: "1px solid #2a2a2a",
                                            padding: "20px"
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    borderLeft: "3px solid #044bab",
                                                    paddingLeft: "12px",
                                                    marginBottom: "14px"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: "11px",
                                                        fontWeight: "700",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.1em",
                                                        color: "#000"
                                                    },
                                                    className: "jsx-cd5f1628dfc1fc40",
                                                    children: "Contact"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                    lineNumber: 622,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 615,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "grid",
                                                    gridTemplateColumns: "1fr 1fr",
                                                    gap: "16px",
                                                    fontSize: "13px"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: [
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
                                                ].map(({ label, value })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: "13px",
                                                                    fontWeight: "700",
                                                                    textTransform: "uppercase",
                                                                    letterSpacing: "0.1em",
                                                                    color: "#000",
                                                                    marginBottom: "3px"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 663,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    color: "#000",
                                                                    fontWeight: "400",
                                                                    fontSize: "13px"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: value
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 675,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, label, true, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 662,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 634,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 614,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageNumber, {
                                        num: pn,
                                        total: totalPages
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 688,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 459,
                                columnNumber: 15
                            }, this);
                        })(),
                        (()=>{
                            const pn = nextPage();
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    ...pageStyle,
                                    minHeight: "100vh"
                                },
                                className: "jsx-cd5f1628dfc1fc40" + " " + "print-page",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageHeader, {
                                        clientName: clientName,
                                        generatedAt: generatedAt
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 701,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        style: {
                                            marginBottom: "28px"
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeading, {
                                                children: "Client Information"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 704,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    border: "1px solid #e5e7eb",
                                                    padding: "24px",
                                                    background: "#fafafa"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "grid",
                                                        gridTemplateColumns: "1fr 1fr 1fr",
                                                        gap: "20px"
                                                    },
                                                    className: "jsx-cd5f1628dfc1fc40",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-cd5f1628dfc1fc40",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: "10px",
                                                                        fontWeight: "700",
                                                                        textTransform: "uppercase",
                                                                        letterSpacing: "0.1em",
                                                                        color: "#000",
                                                                        marginBottom: "4px"
                                                                    },
                                                                    className: "jsx-cd5f1628dfc1fc40",
                                                                    children: "Client Name"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                    lineNumber: 720,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: "15px",
                                                                        fontWeight: "900",
                                                                        color: "#111"
                                                                    },
                                                                    className: "jsx-cd5f1628dfc1fc40",
                                                                    children: client?.name || "N/A"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                    lineNumber: 732,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                            lineNumber: 719,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-cd5f1628dfc1fc40",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: "10px",
                                                                        fontWeight: "700",
                                                                        textTransform: "uppercase",
                                                                        letterSpacing: "0.1em",
                                                                        color: "#000",
                                                                        marginBottom: "4px"
                                                                    },
                                                                    className: "jsx-cd5f1628dfc1fc40",
                                                                    children: "Email"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                    lineNumber: 743,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontWeight: "600",
                                                                        color: "#333",
                                                                        fontSize: "13px"
                                                                    },
                                                                    className: "jsx-cd5f1628dfc1fc40",
                                                                    children: client?.email || "N/A"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                    lineNumber: 755,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                            lineNumber: 742,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-cd5f1628dfc1fc40",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: "10px",
                                                                        fontWeight: "700",
                                                                        textTransform: "uppercase",
                                                                        letterSpacing: "0.1em",
                                                                        color: "#000",
                                                                        marginBottom: "4px"
                                                                    },
                                                                    className: "jsx-cd5f1628dfc1fc40",
                                                                    children: "Phone"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                    lineNumber: 766,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontWeight: "600",
                                                                        color: "#333",
                                                                        fontSize: "13px"
                                                                    },
                                                                    className: "jsx-cd5f1628dfc1fc40",
                                                                    children: client?.phone || "N/A"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                    lineNumber: 778,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                            lineNumber: 765,
                                                            columnNumber: 23
                                                        }, this),
                                                        client?.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                gridColumn: "span 3"
                                                            },
                                                            className: "jsx-cd5f1628dfc1fc40",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: "10px",
                                                                        fontWeight: "700",
                                                                        textTransform: "uppercase",
                                                                        letterSpacing: "0.1em",
                                                                        color: "#000",
                                                                        marginBottom: "4px"
                                                                    },
                                                                    className: "jsx-cd5f1628dfc1fc40",
                                                                    children: "Address"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                    lineNumber: 790,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontWeight: "600",
                                                                        color: "#000",
                                                                        fontSize: "13px"
                                                                    },
                                                                    className: "jsx-cd5f1628dfc1fc40",
                                                                    children: client.address
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                    lineNumber: 802,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                            lineNumber: 789,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                    lineNumber: 712,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 705,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 703,
                                        columnNumber: 17
                                    }, this),
                                    quotation.objective && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        style: {
                                            marginBottom: "24px"
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeading, {
                                                children: "Project Objective"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 819,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: "14px",
                                                    color: "#444",
                                                    lineHeight: "1.8",
                                                    whiteSpace: "pre-wrap"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: quotation.objective
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 820,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 818,
                                        columnNumber: 19
                                    }, this),
                                    quotation.purpose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        style: {
                                            marginBottom: "24px"
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeading, {
                                                children: "Purpose"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 834,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: "14px",
                                                    color: "#444",
                                                    lineHeight: "1.8",
                                                    whiteSpace: "pre-wrap"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: quotation.purpose
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 835,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 833,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageNumber, {
                                        num: pn,
                                        total: totalPages
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 847,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 697,
                                columnNumber: 15
                            }, this);
                        })(),
                        quotation.scope && quotation.scope.length > 0 && (()=>{
                            const pn = nextPage();
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    ...pageStyle,
                                    minHeight: "100vh"
                                },
                                className: "jsx-cd5f1628dfc1fc40" + " " + "print-page",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageHeader, {
                                        clientName: clientName,
                                        generatedAt: generatedAt
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 862,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeading, {
                                                children: "Scope of Work"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 867,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    border: "1px solid #e5e7eb"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: quotation.scope.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "flex-start",
                                                            gap: "14px",
                                                            padding: "13px 16px",
                                                            borderBottom: idx < quotation.scope.length - 1 ? "1px solid #f0f0f0" : "none",
                                                            background: idx % 2 === 0 ? "#fff" : "#fafafa"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: "11px",
                                                                    fontWeight: "900",
                                                                    color: "#F36F21",
                                                                    minWidth: "24px",
                                                                    marginTop: "1px"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: [
                                                                    String(idx + 1).padStart(2, "0"),
                                                                    "."
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 884,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: "13px",
                                                                    color: "#333",
                                                                    lineHeight: "1.7"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: item
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 895,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, idx, true, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 870,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 868,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 866,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageNumber, {
                                        num: pn,
                                        total: totalPages
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 908,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 858,
                                columnNumber: 17
                            }, this);
                        })(),
                        (()=>{
                            const pn = nextPage();
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    ...pageStyle,
                                    minHeight: "100vh"
                                },
                                className: "jsx-cd5f1628dfc1fc40" + " " + "print-page",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageHeader, {
                                        clientName: clientName,
                                        generatedAt: generatedAt
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 921,
                                        columnNumber: 17
                                    }, this),
                                    quotation.deliverables && quotation.deliverables.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        style: {
                                            marginBottom: "32px"
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeading, {
                                                children: "Deliverables"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 926,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    border: "1px solid #e5e7eb"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: quotation.deliverables.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "flex-start",
                                                            gap: "12px",
                                                            padding: "11px 16px",
                                                            borderBottom: idx < quotation.deliverables.length - 1 ? "1px solid #f0f0f0" : "none",
                                                            background: idx % 2 === 0 ? "#fff" : "#fafafa"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckSquare$3e$__["CheckSquare"], {
                                                                size: 14,
                                                                color: "#F36F21",
                                                                style: {
                                                                    marginTop: "2px",
                                                                    flexShrink: 0
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 943,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: "13px",
                                                                    color: "#333",
                                                                    lineHeight: "1.6"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: item
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 948,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, idx, true, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 929,
                                                        columnNumber: 27
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 927,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 925,
                                        columnNumber: 21
                                    }, this),
                                    quotation.services && quotation.services.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeading, {
                                                children: "Services Breakdown"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 965,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                style: {
                                                    width: "100%",
                                                    borderCollapse: "collapse",
                                                    fontSize: "13px"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            style: {
                                                                background: "#fff",
                                                                color: "#000",
                                                                border: "2px solid #111"
                                                            },
                                                            className: "jsx-cd5f1628dfc1fc40",
                                                            children: [
                                                                "Service",
                                                                "Qty",
                                                                "Price",
                                                                "Total"
                                                            ].map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    style: {
                                                                        padding: "11px 14px",
                                                                        textAlign: i > 1 ? "right" : i === 1 ? "center" : "left",
                                                                        fontSize: "13px",
                                                                        fontWeight: "700",
                                                                        textTransform: "uppercase",
                                                                        letterSpacing: "0.08em"
                                                                    },
                                                                    className: "jsx-cd5f1628dfc1fc40",
                                                                    children: h
                                                                }, h, false, {
                                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                    lineNumber: 982,
                                                                    columnNumber: 29
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                            lineNumber: 974,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 973,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: quotation.services.map((item, idx)=>{
                                                            const itemTotal = item.price * item.qty;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                style: {
                                                                    background: idx % 2 === 0 ? "#fff" : "#fafafa",
                                                                    borderBottom: "1px solid #f0f0f0"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            padding: "11px 14px",
                                                                            fontWeight: "600",
                                                                            color: "#111"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: item.serviceName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1010,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            padding: "11px 14px",
                                                                            textAlign: "center",
                                                                            color: "#555"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: item.qty
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1019,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            padding: "11px 14px",
                                                                            textAlign: "right",
                                                                            color: "#555"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: [
                                                                            "Rs.",
                                                                            item.price.toLocaleString("en-IN")
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1028,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            padding: "11px 14px",
                                                                            textAlign: "right",
                                                                            fontWeight: "700",
                                                                            color: "#111"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: [
                                                                            "Rs.",
                                                                            itemTotal.toLocaleString("en-IN")
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1037,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, idx, true, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 1003,
                                                                columnNumber: 29
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 999,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            style: {
                                                                background: "#fff",
                                                                color: "#000"
                                                            },
                                                            className: "jsx-cd5f1628dfc1fc40",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    colSpan: 3,
                                                                    style: {
                                                                        padding: "13px 14px",
                                                                        textAlign: "right",
                                                                        fontWeight: "700",
                                                                        fontSize: "14px",
                                                                        textTransform: "uppercase",
                                                                        letterSpacing: "0.08em"
                                                                    },
                                                                    className: "jsx-cd5f1628dfc1fc40",
                                                                    children: "Grand Total"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                    lineNumber: 1053,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: "13px 14px",
                                                                        textAlign: "right",
                                                                        fontWeight: "900",
                                                                        fontSize: "14px"
                                                                    },
                                                                    className: "jsx-cd5f1628dfc1fc40",
                                                                    children: [
                                                                        "Rs.",
                                                                        grandTotal.toLocaleString("en-IN")
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                    lineNumber: 1066,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                            lineNumber: 1052,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 1051,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 966,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 964,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageNumber, {
                                        num: pn,
                                        total: totalPages
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 1081,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 917,
                                columnNumber: 15
                            }, this);
                        })(),
                        (()=>{
                            const pn = nextPage();
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    ...pageStyle,
                                    minHeight: "100vh"
                                },
                                className: "jsx-cd5f1628dfc1fc40" + " " + "print-page",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageHeader, {
                                        clientName: clientName,
                                        generatedAt: generatedAt
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 1094,
                                        columnNumber: 17
                                    }, this),
                                    quotation.timeline && quotation.timeline.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeading, {
                                                children: "Project Timeline"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 1097,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                                style: {
                                                    width: "100%",
                                                    borderCollapse: "collapse",
                                                    fontSize: "13px"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            style: {
                                                                background: "#044bab",
                                                                color: "#fff"
                                                            },
                                                            className: "jsx-cd5f1628dfc1fc40",
                                                            children: [
                                                                "Phase",
                                                                "Description",
                                                                "Duration"
                                                            ].map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                    style: {
                                                                        padding: "11px 14px",
                                                                        textAlign: i === 2 ? "right" : "left",
                                                                        fontSize: "10px",
                                                                        fontWeight: "700",
                                                                        textTransform: "uppercase",
                                                                        letterSpacing: "0.08em"
                                                                    },
                                                                    className: "jsx-cd5f1628dfc1fc40",
                                                                    children: h
                                                                }, h, false, {
                                                                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                    lineNumber: 1108,
                                                                    columnNumber: 29
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                            lineNumber: 1106,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: quotation.timeline.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                style: {
                                                                    background: idx % 2 === 0 ? "#fff" : "#fafafa",
                                                                    border: "1px solid #000"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            padding: "11px 14px",
                                                                            fontWeight: "700",
                                                                            color: "#111"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: item.phase
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1133,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            padding: "11px 14px",
                                                                            color: "#555"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: item.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1142,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        style: {
                                                                            padding: "11px 14px",
                                                                            textAlign: "right",
                                                                            fontWeight: "700",
                                                                            color: "#111"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: item.duration
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1145,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, idx, true, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 1126,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 1124,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 1098,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 1096,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageNumber, {
                                        num: pn,
                                        total: totalPages
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 1161,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 1090,
                                columnNumber: 15
                            }, this);
                        })(),
                        quotation.modules && quotation.modules.length > 0 && (()=>{
                            const pn = nextPage();
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    ...pageStyle,
                                    minHeight: "100vh"
                                },
                                className: "jsx-cd5f1628dfc1fc40" + " " + "print-page",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageHeader, {
                                        clientName: clientName,
                                        generatedAt: generatedAt
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 1176,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeading, {
                                                children: "Modules & Features"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 1181,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "grid",
                                                    gridTemplateColumns: "1fr 1fr",
                                                    gap: "12px"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: quotation.modules.map((mod, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            border: "1px solid #000",
                                                            padding: "16px",
                                                            background: "#fafafa"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                    alignItems: "flex-start",
                                                                    marginBottom: "8px"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontWeight: "800",
                                                                            fontSize: "13px",
                                                                            color: "#111"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: mod.moduleName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1206,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: "9px",
                                                                            fontWeight: "700",
                                                                            padding: "3px 8px",
                                                                            background: mod.status === "Completed" ? "#111" : mod.status === "Ongoing" ? "#F36F21" : "#e5e7eb",
                                                                            color: mod.status === "Completed" || mod.status === "Ongoing" ? "#fff" : "#000",
                                                                            textTransform: "uppercase",
                                                                            letterSpacing: "0.06em"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: mod.status
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1215,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 1198,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: "12px",
                                                                    color: "#666",
                                                                    lineHeight: "1.5"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: mod.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 1238,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, idx, true, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 1190,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 1182,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 1180,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageNumber, {
                                        num: pn,
                                        total: totalPages
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 1251,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 1172,
                                columnNumber: 17
                            }, this);
                        })(),
                        (()=>{
                            const pn = nextPage();
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    ...pageStyle,
                                    minHeight: "100vh",
                                    display: "flex",
                                    flexDirection: "column"
                                },
                                className: "jsx-cd5f1628dfc1fc40" + " " + "print-page",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageHeader, {
                                        clientName: clientName,
                                        generatedAt: generatedAt
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 1269,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            (quotation.notes || quotation.paymentTerms) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                style: {
                                                    marginBottom: "24px"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeading, {
                                                        children: "Additional Information"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 1274,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            border: "1px solid #e5e7eb",
                                                            padding: "20px",
                                                            background: "#fafafa"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: [
                                                            quotation.paymentTerms && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    marginBottom: "14px"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: "10px",
                                                                            fontWeight: "700",
                                                                            textTransform: "uppercase",
                                                                            letterSpacing: "0.1em",
                                                                            color: "#aaa",
                                                                            marginBottom: "5px"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: "Payment Terms"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1284,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: "13px",
                                                                            color: "#444",
                                                                            lineHeight: "1.7",
                                                                            whiteSpace: "pre-wrap"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: quotation.paymentTerms
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1296,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 1283,
                                                                columnNumber: 27
                                                            }, this),
                                                            quotation.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: "10px",
                                                                            fontWeight: "700",
                                                                            textTransform: "uppercase",
                                                                            letterSpacing: "0.1em",
                                                                            color: "#aaa",
                                                                            marginBottom: "5px"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: "Notes"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1310,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        style: {
                                                                            fontSize: "13px",
                                                                            color: "#444",
                                                                            lineHeight: "1.7",
                                                                            whiteSpace: "pre-wrap"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: quotation.notes
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1322,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 1309,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 1275,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 1273,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                style: {
                                                    marginBottom: "24px"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeading, {
                                                        children: "Terms & Conditions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 1339,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            border: "1px solid #e5e7eb",
                                                            padding: "20px",
                                                            background: "#fafafa"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: (settings?.terms && settings.terms.length > 0 ? settings.terms : [
                                                            "Payment terms: 50% advance, 50% on completion",
                                                            "Project timeline is subject to timely feedback and approvals",
                                                            "Revisions beyond agreed scope will be charged separately",
                                                            "All deliverables remain property of Pixelate Nest until full payment",
                                                            "Client must provide necessary content and assets on time"
                                                        ]).map((term, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: "flex",
                                                                    gap: "12px",
                                                                    marginBottom: "10px",
                                                                    fontSize: "13px",
                                                                    color: "#444"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontWeight: "900",
                                                                            color: "#F36F21",
                                                                            minWidth: "20px",
                                                                            fontSize: "12px"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: [
                                                                            idx + 1,
                                                                            "."
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1367,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            lineHeight: "1.6"
                                                                        },
                                                                        className: "jsx-cd5f1628dfc1fc40",
                                                                        children: term
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                        lineNumber: 1377,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, idx, true, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 1357,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 1340,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 1338,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 1271,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            borderTop: "1px solid #e5e7eb",
                                            paddingTop: "24px",
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "40px",
                                            marginBottom: "24px"
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/assets/images/sign.png",
                                                        alt: "Authorized Signature",
                                                        style: {
                                                            height: "60px",
                                                            objectFit: "contain",
                                                            marginBottom: "8px",
                                                            display: "block"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 1396,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            borderTop: "1.5px solid #111",
                                                            paddingTop: "8px"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: "11px",
                                                                    fontWeight: "700",
                                                                    textTransform: "uppercase",
                                                                    letterSpacing: "0.08em",
                                                                    color: "#111"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: "Authorized Signatory"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 1412,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: "11px",
                                                                    color: "#888",
                                                                    marginTop: "2px"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: settings?.name || "Kalahanu Tech Studios LLP"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 1423,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 1406,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 1395,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            height: "60px",
                                                            marginBottom: "8px"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 1435,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            borderTop: "1.5px solid #111",
                                                            paddingTop: "8px"
                                                        },
                                                        className: "jsx-cd5f1628dfc1fc40",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: "11px",
                                                                    fontWeight: "700",
                                                                    textTransform: "uppercase",
                                                                    letterSpacing: "0.08em",
                                                                    color: "#111"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: "Client Signature"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 1442,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: "11px",
                                                                    color: "#888",
                                                                    marginTop: "2px"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: clientName
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 1453,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    fontSize: "10px",
                                                                    color: "#bbb",
                                                                    marginTop: "4px"
                                                                },
                                                                className: "jsx-cd5f1628dfc1fc40",
                                                                children: "Date: __________________"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 1462,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 1436,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 1434,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 1385,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            borderTop: "1px solid #f0f0f0",
                                            paddingTop: "12px",
                                            textAlign: "center"
                                        },
                                        className: "jsx-cd5f1628dfc1fc40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "11px",
                                                    color: "#888",
                                                    fontWeight: "500"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: settings?.footerText || `© 2026 ${settings?.name || "Kalahanu Tech Studios LLP"}. All Rights Reserved.`
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 1483,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "10px",
                                                    color: "#bbb",
                                                    marginTop: "4px"
                                                },
                                                className: "jsx-cd5f1628dfc1fc40",
                                                children: [
                                                    settings?.phone || "+91 84069 12345",
                                                    "  | ",
                                                    " ",
                                                    settings?.email || "support@pixelatenest.com",
                                                    " ",
                                                    " |  ",
                                                    settings?.website || "www.pixelatenest.com"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 1493,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 1476,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageNumber, {
                                        num: pn,
                                        total: totalPages
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 1506,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 1260,
                                columnNumber: 15
                            }, this);
                        })()
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(crm)/quotations/[id]/view/page.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "cd5f1628dfc1fc40",
                children: "@media print{*{print-color-adjust:exact!important;-webkit-print-color-adjust:exact!important}body{margin:0!important;padding:0!important}header,nav,aside,[class*=sidebar],[class*=navbar]{display:none!important}.print-area{max-width:none;margin:0;padding:0}.print-page{page-break-before:always;page-break-inside:avoid}@page{size:A4;margin:0}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true);
}
_s(QuotationViewPage, "cJLK+ZSkKYPGddEyxCkPsDoPBqM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c3 = QuotationViewPage;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "PageHeader");
__turbopack_context__.k.register(_c1, "PageNumber");
__turbopack_context__.k.register(_c2, "SectionHeading");
__turbopack_context__.k.register(_c3, "QuotationViewPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_%28crm%29_quotations_%5Bid%5D_view_page_tsx_65d4f376._.js.map