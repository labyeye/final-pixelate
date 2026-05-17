(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-14 w-full rounded-none border-2 border-foreground bg-background px-4 py-3 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(crm)/client/leads/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientLeadsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-auth.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const STATUS_CONFIG = {
    "not called": {
        label: "Not Called",
        color: "text-gray-700",
        bg: "bg-gray-100",
        dot: "bg-gray-400"
    },
    called: {
        label: "Called",
        color: "text-blue-700",
        bg: "bg-blue-100",
        dot: "bg-blue-500"
    },
    interested: {
        label: "Interested",
        color: "text-green-700",
        bg: "bg-green-100",
        dot: "bg-green-500"
    },
    "meeting booked": {
        label: "Meeting Booked",
        color: "text-purple-700",
        bg: "bg-purple-100",
        dot: "bg-purple-500"
    },
    "not interested": {
        label: "Not Interested",
        color: "text-red-700",
        bg: "bg-red-100",
        dot: "bg-red-400"
    },
    "call back later": {
        label: "Call Back Later",
        color: "text-yellow-700",
        bg: "bg-yellow-100",
        dot: "bg-yellow-400"
    },
    other: {
        label: "Other",
        color: "text-slate-700",
        bg: "bg-slate-100",
        dot: "bg-slate-400"
    }
};
const ALL_STATUSES = Object.keys(STATUS_CONFIG);
_c = ALL_STATUSES;
function getAuthHeaders() {
    const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("auth_token") : "TURBOPACK unreachable";
    return {
        "Content-Type": "application/json",
        ...token ? {
            Authorization: `Bearer ${token}`
        } : {}
    };
}
function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["other"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.color}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `w-1.5 h-1.5 rounded-full ${cfg.dot}`
            }, void 0, false, {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            cfg.label
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
_c1 = StatusBadge;
function ConfirmModal({ title, message, onConfirm, onCancel, confirmLabel = "Confirm", confirmClass = "bg-black text-white font-black border-2 border-black hover:bg-gray-800" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white border-2 border-black rounded-xl shadow-2xl w-full max-w-sm p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "font-black text-lg mb-2",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                    lineNumber: 134,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-600 mb-6",
                    children: message
                }, void 0, false, {
                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                    lineNumber: 135,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onCancel,
                            className: "flex-1 py-2 px-4 border-2 border-black rounded-lg font-bold text-sm hover:bg-gray-50",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onConfirm,
                            className: `flex-1 py-2 px-4 rounded-lg text-sm ${confirmClass}`,
                            children: confirmLabel
                        }, void 0, false, {
                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
            lineNumber: 133,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_c2 = ConfirmModal;
function LeadModal({ lead, onClose, onSave }) {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(lead.status || "not called");
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(lead.notes || "");
    const [followUpDate, setFollowUpDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(lead.followUpDate || "");
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveError, setSaveError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [confirm, setConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSaveClick = ()=>{
        setSaveError(null);
        setConfirm(true);
    };
    const handleConfirm = async ()=>{
        setConfirm(false);
        setSaving(true);
        const result = await onSave(String(lead._id || lead.id), {
            status,
            notes,
            followUpDate
        });
        setSaving(false);
        if (result.ok) {
            onClose();
        } else {
            setSaveError(result.error || "Failed to save. Please try again.");
        }
    };
    const extraFields = lead.metaFields ? Object.entries(lead.metaFields).filter(([k])=>![
            "full_name",
            "name",
            "phone_number",
            "phone",
            "mobile_number",
            "contact_number",
            "mobile",
            "whatsapp_number",
            "email",
            "email_address",
            "first_name",
            "last_name"
        ].includes(k)) : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border-2 border-black rounded-xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky top-0 bg-black text-white px-5 py-4 flex items-center justify-between rounded-t-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-black text-lg",
                                        children: lead.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-300 text-xs mt-0.5",
                                        children: lead.campaignName || lead.source || "Meta Ads"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "text-white hover:text-gray-300 text-2xl leading-none font-black",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-5 space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3",
                                children: [
                                    lead.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-2 border-black rounded-lg p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-gray-500 mb-1",
                                                children: "PHONE"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 241,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `tel:${lead.phone}`,
                                                className: "font-black text-blue-700 hover:underline text-sm",
                                                children: lead.phone
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 242,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2 mt-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: `tel:${lead.phone}`,
                                                        className: "flex-1 text-center text-xs py-1.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700",
                                                        children: "📞 Call"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: `https://wa.me/${lead.phone.replace(/\D/g, "")}`,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "flex-1 text-center text-xs py-1.5 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600",
                                                        children: "💬 WhatsApp"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 248,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this),
                                    lead.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-2 border-black rounded-lg p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-gray-500 mb-1",
                                                children: "EMAIL"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 268,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `mailto:${lead.email}`,
                                                className: "font-black text-blue-700 hover:underline text-sm break-all",
                                                children: lead.email
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 269,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `mailto:${lead.email}`,
                                                className: "block mt-2 text-center text-xs py-1.5 bg-gray-800 text-white rounded-lg font-bold hover:bg-black",
                                                children: "✉ Send Email"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 275,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 267,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-2 border-black rounded-lg p-3 bg-blue-50 space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-black text-gray-500 uppercase mb-2",
                                        children: "Ad Campaign Info"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this),
                                    lead.campaignName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-semibold",
                                        children: [
                                            "📢 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-black",
                                                children: lead.campaignName
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 292,
                                                columnNumber: 20
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 291,
                                        columnNumber: 15
                                    }, this),
                                    lead.adName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-600",
                                        children: [
                                            "📄 Ad: ",
                                            lead.adName
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this),
                                    lead.formName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-600",
                                        children: [
                                            "📋 Form: ",
                                            lead.formName
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 299,
                                        columnNumber: 15
                                    }, this),
                                    lead.createdAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                            "🕐 Submitted:",
                                            " ",
                                            new Date(lead.createdAt).toLocaleString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this),
                            extraFields.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-2 border-black rounded-lg p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-black text-gray-500 uppercase mb-2",
                                        children: "Form Responses"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 318,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: extraFields.map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-gray-600 capitalize",
                                                        children: k.replace(/_/g, " ")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                        lineNumber: 324,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-gray-900",
                                                        children: v || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                        lineNumber: 327,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, k, true, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 323,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 321,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 317,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-2 border-black rounded-lg p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-black text-gray-500 uppercase mb-2",
                                        children: "Lead Status"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 338,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: ALL_STATUSES.map((s)=>{
                                            const cfg = STATUS_CONFIG[s];
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setStatus(s),
                                                className: `text-xs font-bold py-2 px-3 rounded-lg border-2 transition-all text-left flex items-center gap-2
                      ${status === s ? `border-black ${cfg.bg} ${cfg.color}` : "border-gray-200 text-gray-500 hover:border-gray-400"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `w-2 h-2 rounded-full flex-shrink-0 ${status === s ? cfg.dot : "bg-gray-300"}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                        lineNumber: 351,
                                                        columnNumber: 21
                                                    }, this),
                                                    cfg.label
                                                ]
                                            }, s, true, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 345,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 341,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-2 border-black rounded-lg p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-black text-gray-500 uppercase mb-2",
                                        children: "Follow-up Date"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 363,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "date",
                                        value: followUpDate,
                                        onChange: (e)=>setFollowUpDate(e.target.value),
                                        className: "w-full px-3 py-2 border-2 border-black rounded-lg text-sm font-semibold"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 366,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 362,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-2 border-black rounded-lg p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-black text-gray-500 uppercase mb-2",
                                        children: "Notes"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 376,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: notes,
                                        onChange: (e)=>setNotes(e.target.value),
                                        placeholder: "Add call notes, follow-up details...",
                                        rows: 3,
                                        className: "w-full px-3 py-2 border-2 border-black rounded-lg text-sm font-semibold resize-none focus:outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 379,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 375,
                                columnNumber: 11
                            }, this),
                            lead.statusHistory && lead.statusHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-2 border-black rounded-lg p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-black text-gray-500 uppercase mb-3",
                                        children: "Status History"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative pl-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute left-1.5 top-0 bottom-0 w-px bg-gray-200"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 395,
                                                columnNumber: 17
                                            }, this),
                                            [
                                                ...lead.statusHistory
                                            ].reverse().map((h, i)=>{
                                                const fromCfg = STATUS_CONFIG[h.from] || STATUS_CONFIG["other"];
                                                const toCfg = STATUS_CONFIG[h.to] || STATUS_CONFIG["other"];
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative mb-3 last:mb-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `absolute -left-[11px] w-3 h-3 rounded-full border-2 border-white ${toCfg.dot}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                            lineNumber: 402,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1.5 flex-wrap",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `text-xs font-bold px-2 py-0.5 rounded-full ${fromCfg.bg} ${fromCfg.color}`,
                                                                    children: fromCfg.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                                    lineNumber: 406,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-gray-400",
                                                                    children: "→"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                                    lineNumber: 411,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `text-xs font-bold px-2 py-0.5 rounded-full ${toCfg.bg} ${toCfg.color}`,
                                                                    children: toCfg.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                                    lineNumber: 412,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                            lineNumber: 405,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400 mt-0.5",
                                                            children: new Date(h.changedAt).toLocaleString("en-IN", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit"
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                            lineNumber: 418,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                    lineNumber: 401,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 394,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 390,
                                columnNumber: 13
                            }, this),
                            saveError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-2 border-red-400 bg-red-50 rounded-lg px-4 py-3 text-sm font-bold text-red-700",
                                children: [
                                    "⚠ ",
                                    saveError
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 436,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        onClick: onClose,
                                        className: "flex-1 border-2 border-black font-bold",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 441,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: handleSaveClick,
                                        disabled: saving,
                                        className: "flex-1 bg-black text-white font-black border-2 border-black hover:bg-gray-800",
                                        children: saving ? "Saving…" : "Save Changes"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 448,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 440,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this),
            confirm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConfirmModal, {
                title: "Save Changes?",
                message: status !== lead.status ? `Change status from "${STATUS_CONFIG[lead.status]?.label || lead.status}" to "${STATUS_CONFIG[status]?.label || status}"${notes !== lead.notes || followUpDate !== lead.followUpDate ? " and update notes/follow-up date" : ""}?` : "Save notes and follow-up date changes?",
                confirmLabel: "Yes, Save",
                onConfirm: handleConfirm,
                onCancel: ()=>setConfirm(false)
            }, void 0, false, {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 460,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
        lineNumber: 218,
        columnNumber: 5
    }, this);
}
_s(LeadModal, "x+spKdSDWa6A8qvh8tlwN6GpbOI=");
_c3 = LeadModal;
function ClientLeadsPage() {
    _s1();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [leads, setLeads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [syncing, setSyncing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [syncResult, setSyncResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [syncError, setSyncError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedLead, setSelectedLead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [campaignFilter, setCampaignFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [dateFilter, setDateFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [dateSortDir, setDateSortDir] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("desc");
    const fetchLeads = async ()=>{
        try {
            setLoading(true);
            const res = await fetch("/api/leads", {
                headers: getAuthHeaders()
            });
            if (!res.ok) throw new Error("Failed");
            const data = await res.json();
            setLeads(Array.isArray(data) ? data : []);
        } catch  {
            setLeads([]);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientLeadsPage.useEffect": ()=>{
            if (!user || user.role !== "client") return;
            fetchLeads();
        }
    }["ClientLeadsPage.useEffect"], [
        user
    ]);
    const handleSyncFbLeads = async ()=>{
        if (!user?.clientId) return;
        setSyncing(true);
        setSyncError(null);
        setSyncResult(null);
        try {
            const res = await fetch("/api/client-leads/sync", {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    clientId: user.clientId
                })
            });
            const data = await res.json();
            if (!res.ok) {
                setSyncError(data.error || "Sync failed");
                return;
            }
            setSyncResult(data);
            await fetchLeads();
        } catch (e) {
            setSyncError(e.message || "Sync failed");
        } finally{
            setSyncing(false);
        }
    };
    const handleSaveLead = async (id, updates)=>{
        try {
            const res = await fetch(`/api/leads/${id}`, {
                method: "PATCH",
                headers: getAuthHeaders(),
                body: JSON.stringify(updates)
            });
            if (!res.ok) {
                const data = await res.json().catch(()=>({}));
                return {
                    ok: false,
                    error: data.error || `Server error (${res.status})`
                };
            }
            await res.json();
            setLeads((prev)=>prev.map((l)=>String(l._id || l.id) !== id ? l : {
                        ...l,
                        ...updates
                    }));
            setSelectedLead((prev)=>prev ? {
                    ...prev,
                    ...updates
                } : prev);
            return {
                ok: true
            };
        } catch (e) {
            return {
                ok: false,
                error: e.message || "Network error"
            };
        }
    };
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClientLeadsPage.useMemo[stats]": ()=>{
            const total = leads.length;
            const converted = leads.filter({
                "ClientLeadsPage.useMemo[stats]": (l)=>l.status === "interested" || l.status === "meeting booked"
            }["ClientLeadsPage.useMemo[stats]"]).length;
            const notCalled = leads.filter({
                "ClientLeadsPage.useMemo[stats]": (l)=>!l.status || l.status === "not called"
            }["ClientLeadsPage.useMemo[stats]"]).length;
            const now = new Date();
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            const newThisMonth = leads.filter({
                "ClientLeadsPage.useMemo[stats]": (l)=>l.createdAt && new Date(l.createdAt) >= monthStart
            }["ClientLeadsPage.useMemo[stats]"]).length;
            return {
                total,
                converted,
                notCalled,
                newThisMonth,
                conversionRate: total > 0 ? Math.round(converted / total * 100) : 0
            };
        }
    }["ClientLeadsPage.useMemo[stats]"], [
        leads
    ]);
    const campaigns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClientLeadsPage.useMemo[campaigns]": ()=>Array.from(new Set(leads.map({
                "ClientLeadsPage.useMemo[campaigns]": (l)=>l.campaignName
            }["ClientLeadsPage.useMemo[campaigns]"]).filter(Boolean)))
    }["ClientLeadsPage.useMemo[campaigns]"], [
        leads
    ]);
    const getCity = (lead)=>{
        if (lead.city) return lead.city;
        if (lead.metaFields) {
            const cityKey = Object.keys(lead.metaFields).find((k)=>[
                    "city",
                    "location",
                    "town",
                    "district"
                ].includes(k.toLowerCase()));
            if (cityKey) return lead.metaFields[cityKey];
        }
        return "";
    };
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClientLeadsPage.useMemo[filtered]": ()=>{
            const now = new Date();
            const todayStr = now.toISOString().slice(0, 10);
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - 7);
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
            const result = leads.filter({
                "ClientLeadsPage.useMemo[filtered].result": (l)=>{
                    const q = search.toLowerCase();
                    const matchSearch = !search || l.name?.toLowerCase().includes(q) || l.phone?.includes(q) || l.email?.toLowerCase().includes(q) || l.campaignName?.toLowerCase().includes(q) || getCity(l).toLowerCase().includes(q);
                    const matchStatus = !statusFilter || l.status === statusFilter;
                    const matchCampaign = !campaignFilter || l.campaignName === campaignFilter;
                    let matchDate = true;
                    if (dateFilter && l.createdAt) {
                        const d = new Date(l.createdAt);
                        if (dateFilter === "today") matchDate = l.createdAt.slice(0, 10) === todayStr;
                        else if (dateFilter === "week") matchDate = d >= weekStart;
                        else if (dateFilter === "month") matchDate = d >= monthStart;
                        else if (dateFilter === "last_month") matchDate = d >= lastMonthStart && d <= lastMonthEnd;
                    } else if (dateFilter) {
                        matchDate = false;
                    }
                    return matchSearch && matchStatus && matchCampaign && matchDate;
                }
            }["ClientLeadsPage.useMemo[filtered].result"]);
            result.sort({
                "ClientLeadsPage.useMemo[filtered]": (a, b)=>{
                    const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateSortDir === "desc" ? db - da : da - db;
                }
            }["ClientLeadsPage.useMemo[filtered]"]);
            return result;
        }
    }["ClientLeadsPage.useMemo[filtered]"], [
        leads,
        search,
        statusFilter,
        campaignFilter,
        dateFilter,
        dateSortDir
    ]);
    const followUpsDue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClientLeadsPage.useMemo[followUpsDue]": ()=>{
            const today = new Date().toISOString().slice(0, 10);
            return leads.filter({
                "ClientLeadsPage.useMemo[followUpsDue]": (l)=>l.followUpDate && l.followUpDate <= today && l.status !== "not interested"
            }["ClientLeadsPage.useMemo[followUpsDue]"]);
        }
    }["ClientLeadsPage.useMemo[followUpsDue]"], [
        leads
    ]);
    if (!user || user.role !== "client") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-2 border-black rounded-xl p-8 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-xl font-black",
                    children: "Access Denied"
                }, void 0, false, {
                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                    lineNumber: 673,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 672,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
            lineNumber: 671,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background font-headline p-6 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-start justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-black tracking-tighter",
                                children: "Lead Management"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 684,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground mt-1",
                                children: "Track, manage and follow up on your leads"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 687,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 683,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-end gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: handleSyncFbLeads,
                                disabled: syncing,
                                className: "bg-blue-600 hover:bg-blue-700 text-white border-2 border-black font-bold",
                                children: syncing ? "Syncing…" : "⟳ Sync from Facebook Ads"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 692,
                                columnNumber: 11
                            }, this),
                            syncResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold text-green-700",
                                children: [
                                    "✓ ",
                                    syncResult.synced,
                                    " new · ",
                                    syncResult.skipped,
                                    " existing ·",
                                    " ",
                                    syncResult.total,
                                    " total found"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 700,
                                columnNumber: 13
                            }, this),
                            syncError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-semibold text-red-600",
                                children: [
                                    "⚠ ",
                                    syncError
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 706,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 691,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 682,
                columnNumber: 7
            }, this),
            followUpsDue.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-2 border-orange-400 bg-orange-50 rounded-xl px-4 py-3 flex items-center justify-between flex-wrap gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-bold text-orange-800",
                        children: [
                            "🔔 ",
                            followUpsDue.length,
                            " follow-up",
                            followUpsDue.length > 1 ? "s" : "",
                            " due today —",
                            " ",
                            followUpsDue.map((l)=>l.name).slice(0, 3).join(", "),
                            followUpsDue.length > 3 && ` +${followUpsDue.length - 3} more`
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 714,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setStatusFilter(""),
                        className: "text-xs font-bold text-orange-700 underline",
                        children: "View All"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 723,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 713,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-5 gap-3",
                children: [
                    {
                        label: "Total Leads",
                        value: stats.total,
                        color: "bg-gray-50",
                        icon: "👥"
                    },
                    {
                        label: "Not Called",
                        value: stats.notCalled,
                        color: "bg-red-50",
                        icon: "📵"
                    },
                    {
                        label: "Interested",
                        value: stats.converted,
                        color: "bg-green-50",
                        icon: "✅"
                    },
                    {
                        label: "This Month",
                        value: stats.newThisMonth,
                        color: "bg-blue-50",
                        icon: "📅"
                    },
                    {
                        label: "Conv. Rate",
                        value: `${stats.conversionRate}%`,
                        color: "bg-purple-50",
                        icon: "🎯"
                    }
                ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `border-2 border-black rounded-xl p-4 ${s.color}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold text-gray-500 uppercase tracking-wide",
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 771,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base",
                                        children: s.icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 774,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 770,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-2xl font-black",
                                children: s.value
                            }, void 0, false, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 776,
                                columnNumber: 13
                            }, this)
                        ]
                    }, s.label, true, {
                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 766,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 733,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-2 border-black rounded-xl p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-black text-gray-500 uppercase mb-3",
                        children: "Status Breakdown"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 783,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                            ALL_STATUSES.map((s)=>{
                                const count = leads.filter((l)=>l.status === s).length;
                                if (count === 0) return null;
                                const cfg = STATUS_CONFIG[s];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setStatusFilter(statusFilter === s ? "" : s),
                                    className: `flex items-center gap-2 px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all
                  ${statusFilter === s ? `border-black ${cfg.bg} ${cfg.color}` : "border-gray-200 hover:border-gray-400 text-gray-600"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `w-2 h-2 rounded-full ${cfg.dot}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                            lineNumber: 798,
                                            columnNumber: 17
                                        }, this),
                                        cfg.label,
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-black",
                                            children: [
                                                "(",
                                                count,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                            lineNumber: 799,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, s, true, {
                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                    lineNumber: 792,
                                    columnNumber: 15
                                }, this);
                            }),
                            statusFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setStatusFilter(""),
                                className: "px-3 py-1.5 rounded-full border-2 border-gray-300 text-xs font-bold text-gray-500 hover:border-black",
                                children: "✕ Clear"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 804,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 786,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 782,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-2 border-black rounded-xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b-2 border-black px-4 py-3 bg-gray-50 flex flex-wrap gap-3 items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-3 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        placeholder: "Search name, phone, email, campaign...",
                                        value: search,
                                        onChange: (e)=>setSearch(e.target.value),
                                        className: "border-2 border-black font-semibold text-sm max-w-xs"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 819,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: campaignFilter,
                                        onChange: (e)=>setCampaignFilter(e.target.value),
                                        className: "px-3 py-2 border-2 border-black rounded-md bg-white font-semibold text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "All Campaigns"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 830,
                                                columnNumber: 15
                                            }, this),
                                            campaigns.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: c,
                                                    children: c
                                                }, c, false, {
                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                    lineNumber: 832,
                                                    columnNumber: 17
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 825,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 818,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold text-gray-500",
                                children: [
                                    filtered.length,
                                    " leads"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 838,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 817,
                        columnNumber: 9
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-12 text-center text-muted-foreground font-semibold",
                        children: "Loading leads…"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 845,
                        columnNumber: 11
                    }, this) : filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl font-black",
                                children: "No leads found"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 850,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mt-1",
                                children: "Try syncing from Facebook Ads or adjust filters"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 851,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 849,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-black text-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-xs font-black uppercase",
                                                children: "Lead"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 860,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-xs font-black uppercase",
                                                children: "Contact"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 863,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-xs font-black uppercase",
                                                children: "City"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 866,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-xs font-black uppercase",
                                                children: "Campaign"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 869,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-xs font-black uppercase min-w-[140px]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Campaign Status"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                            lineNumber: 874,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: statusFilter,
                                                            onChange: (e)=>setStatusFilter(e.target.value),
                                                            onClick: (e)=>e.stopPropagation(),
                                                            className: "bg-white text-black text-xs font-semibold rounded px-1 py-0.5 border border-gray-300 w-full",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "All"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                                    lineNumber: 881,
                                                                    columnNumber: 25
                                                                }, this),
                                                                ALL_STATUSES.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: s,
                                                                        children: STATUS_CONFIG[s].label
                                                                    }, s, false, {
                                                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                                        lineNumber: 883,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                            lineNumber: 875,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                    lineNumber: 873,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 872,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-xs font-black uppercase",
                                                children: "Follow-up"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 890,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-xs font-black uppercase",
                                                children: "Notes"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 893,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-left text-xs font-black uppercase min-w-[150px]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Date"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                                    lineNumber: 899,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setDateSortDir((d)=>d === "desc" ? "asc" : "desc"),
                                                                    className: "text-gray-300 hover:text-white text-xs",
                                                                    title: dateSortDir === "desc" ? "Newest first" : "Oldest first",
                                                                    children: dateSortDir === "desc" ? "↓" : "↑"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                                    lineNumber: 900,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                            lineNumber: 898,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: dateFilter,
                                                            onChange: (e)=>setDateFilter(e.target.value),
                                                            onClick: (e)=>e.stopPropagation(),
                                                            className: "bg-white text-black text-xs font-semibold rounded px-1 py-0.5 border border-gray-300 w-full",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "All Time"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                                    lineNumber: 922,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "today",
                                                                    children: "Today"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                                    lineNumber: 923,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "week",
                                                                    children: "Last 7 Days"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                                    lineNumber: 924,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "month",
                                                                    children: "This Month"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                                    lineNumber: 925,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "last_month",
                                                                    children: "Last Month"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                                    lineNumber: 926,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                            lineNumber: 916,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                    lineNumber: 897,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 896,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-4 py-3 text-center text-xs font-black uppercase",
                                                children: "Action"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 930,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 859,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                    lineNumber: 858,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: filtered.map((lead, i)=>{
                                        const followUpDue = lead.followUpDate && lead.followUpDate <= new Date().toISOString().slice(0, 10);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: `border-b border-gray-200 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-black text-sm",
                                                        children: lead.name || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                        lineNumber: 946,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                    lineNumber: 945,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3",
                                                    children: [
                                                        lead.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: `tel:${lead.phone}`,
                                                            className: "text-sm font-semibold text-blue-700 hover:underline block",
                                                            children: lead.phone
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                            lineNumber: 952,
                                                            columnNumber: 27
                                                        }, this),
                                                        lead.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: `mailto:${lead.email}`,
                                                            className: "text-xs text-gray-500 hover:underline block truncate max-w-[140px]",
                                                            children: lead.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                            lineNumber: 960,
                                                            columnNumber: 27
                                                        }, this),
                                                        lead.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: `https://wa.me/${lead.phone.replace(/\D/g, "")}`,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "inline-flex items-center gap-1 text-xs text-green-600 font-bold hover:underline mt-1",
                                                            children: "💬 WhatsApp"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                            lineNumber: 968,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                    lineNumber: 950,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3 text-sm font-semibold text-gray-700",
                                                    children: getCity(lead) || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-400",
                                                        children: "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                        lineNumber: 980,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                    lineNumber: 978,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3 max-w-[160px]",
                                                    children: [
                                                        lead.campaignName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs font-black truncate",
                                                            children: [
                                                                "📢 ",
                                                                lead.campaignName
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                            lineNumber: 985,
                                                            columnNumber: 27
                                                        }, this),
                                                        lead.adSetName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 truncate",
                                                            children: [
                                                                "🎯 ",
                                                                lead.adSetName
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                            lineNumber: 990,
                                                            columnNumber: 27
                                                        }, this),
                                                        lead.formName && !lead.campaignName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 truncate",
                                                            children: [
                                                                "📋 ",
                                                                lead.formName
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                            lineNumber: 995,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                    lineNumber: 983,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                                                        status: lead.status || "not called"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                        lineNumber: 1001,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                    lineNumber: 1000,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3",
                                                    children: lead.followUpDate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-xs font-bold ${followUpDue ? "text-red-600" : "text-gray-600"}`,
                                                        children: [
                                                            followUpDue ? "🔔 " : "📅 ",
                                                            new Date(lead.followUpDate).toLocaleDateString("en-IN", {
                                                                day: "2-digit",
                                                                month: "short"
                                                            })
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                        lineNumber: 1005,
                                                        columnNumber: 27
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-gray-400",
                                                        children: "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                        lineNumber: 1015,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                    lineNumber: 1003,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3 max-w-[150px]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-600 truncate",
                                                        children: lead.notes || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                        lineNumber: 1019,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                    lineNumber: 1018,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3 text-xs text-gray-500 font-semibold whitespace-nowrap",
                                                    children: lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-IN", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "2-digit"
                                                    }) : "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                    lineNumber: 1023,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3 text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        size: "sm",
                                                        className: "text-xs font-bold border-2 border-black h-7 px-3 bg-white text-black hover:bg-black hover:text-white",
                                                        onClick: ()=>setSelectedLead(lead),
                                                        children: "Manage"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                        lineNumber: 1036,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                                    lineNumber: 1035,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, String(lead._id || lead.id), true, {
                                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                            lineNumber: 941,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                                    lineNumber: 935,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                            lineNumber: 857,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 856,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 815,
                columnNumber: 7
            }, this),
            selectedLead && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeadModal, {
                lead: selectedLead,
                onClose: ()=>setSelectedLead(null),
                onSave: handleSaveLead
            }, void 0, false, {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 1055,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
        lineNumber: 680,
        columnNumber: 5
    }, this);
}
_s1(ClientLeadsPage, "snfQQOVmmycnrKRi5+YPqrVmKpg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c4 = ClientLeadsPage;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "ALL_STATUSES");
__turbopack_context__.k.register(_c1, "StatusBadge");
__turbopack_context__.k.register(_c2, "ConfirmModal");
__turbopack_context__.k.register(_c3, "LeadModal");
__turbopack_context__.k.register(_c4, "ClientLeadsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_df41d1c9._.js.map