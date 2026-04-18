(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/social-media-planner.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONTENT_TYPES",
    ()=>CONTENT_TYPES,
    "POST_STATUSES",
    ()=>POST_STATUSES,
    "SOCIAL_PLATFORMS",
    ()=>SOCIAL_PLATFORMS,
    "fetchSocialAccount",
    ()=>fetchSocialAccount,
    "formatAccountDisplay",
    ()=>formatAccountDisplay,
    "isSameDate",
    ()=>isSameDate,
    "toDateTime",
    ()=>toDateTime
]);
const SOCIAL_PLATFORMS = [
    "Instagram",
    "Facebook",
    "LinkedIn",
    "X / Twitter",
    "YouTube Shorts",
    "WhatsApp Channel"
];
const CONTENT_TYPES = [
    "Image Post",
    "Reel",
    "Carousel",
    "Video",
    "Text Post",
    "Story",
    "Promotional Post",
    "Festival Post",
    "Announcement",
    "Testimonial",
    "Educational Post"
];
const POST_STATUSES = [
    "Draft",
    "Ready",
    "Scheduled",
    "Posted",
    "Missed",
    "Cancelled"
];
const toDateTime = (scheduledDate, scheduledTime)=>{
    if (!scheduledDate) return null;
    const time = scheduledTime && scheduledTime.trim() ? scheduledTime : "00:00";
    const date = new Date(`${scheduledDate}T${time}:00`);
    return Number.isNaN(date.getTime()) ? null : date;
};
const isSameDate = (a, b)=>a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const fetchSocialAccount = async (accountId)=>{
    try {
        const res = await fetch(`/api/social-media-accounts?id=${accountId}`, {
            cache: "no-store"
        });
        if (res.ok) {
            const data = await res.json();
            return Array.isArray(data) ? data[0] || null : data;
        }
    } catch (e) {
        console.error("Failed to fetch social account:", e);
    }
    return null;
};
const formatAccountDisplay = (account)=>{
    if (!account) return "(No Account)";
    return `@${account.handle}`;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostAccountDisplay",
    ()=>PostAccountDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function PostAccountDisplay({ accountId, fallback = "(No Account)", className = "" }) {
    _s();
    const [account, setAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!!accountId);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostAccountDisplay.useEffect": ()=>{
            if (!accountId) {
                setLoading(false);
                return;
            }
            const fetchAccount = {
                "PostAccountDisplay.useEffect.fetchAccount": async ()=>{
                    try {
                        setLoading(true);
                        const url = new URL("/api/social-media-accounts", window.location.origin);
                        url.searchParams.set("id", accountId);
                        const res = await fetch(url.toString(), {
                            cache: "no-store"
                        });
                        if (res.ok) {
                            const data = await res.json();
                            const acc = Array.isArray(data) ? data[0] : data;
                            setAccount(acc || null);
                        }
                    } catch (e) {
                        console.error("Failed to fetch account:", e);
                        setAccount(null);
                    } finally{
                        setLoading(false);
                    }
                }
            }["PostAccountDisplay.useEffect.fetchAccount"];
            fetchAccount();
        }
    }["PostAccountDisplay.useEffect"], [
        accountId
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `text-gray-400 ${className}`,
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx",
            lineNumber: 49,
            columnNumber: 12
        }, this);
    }
    if (!account) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `text-gray-500 ${className}`,
            children: fallback
        }, void 0, false, {
            fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx",
            lineNumber: 53,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `font-medium ${className}`,
        children: [
            "@",
            account.handle,
            account.displayName && account.displayName !== account.handle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs text-gray-600 ml-1",
                children: [
                    "(",
                    account.displayName,
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(PostAccountDisplay, "cR9ePtzxDg2FbIF5ZsBHSTB1khY=");
_c = PostAccountDisplay;
var _c;
__turbopack_context__.k.register(_c, "PostAccountDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SocialMediaCalendarPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/social-media-planner.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$post$2d$account$2d$display$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const statusBg = {
    Draft: "bg-gray-100",
    Ready: "bg-blue-100",
    Scheduled: "bg-amber-100",
    Posted: "bg-green-100",
    Missed: "bg-red-100",
    Cancelled: "bg-slate-100"
};
function SocialMediaCalendarPage() {
    _s();
    const [selectedClientId, setSelectedClientId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("monthly");
    const [cursorDate, setCursorDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [platformFilter, setPlatformFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [staffFilter, setStaffFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [contentTypeFilter, setContentTypeFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const loadPosts = async (clientId)=>{
        if (!clientId) {
            setPosts([]);
            return;
        }
        try {
            const url = new URL("/api/social-media-posts", window.location.origin);
            url.searchParams.set("clientId", clientId);
            const res = await fetch(url.toString(), {
                cache: "no-store"
            });
            if (!res.ok) throw new Error("Failed to load social posts");
            const data = await res.json();
            setPosts(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
            setPosts([]);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SocialMediaCalendarPage.useEffect": ()=>{
            loadPosts(selectedClientId);
        }
    }["SocialMediaCalendarPage.useEffect"], [
        selectedClientId
    ]);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SocialMediaCalendarPage.useMemo[filtered]": ()=>{
            return posts.filter({
                "SocialMediaCalendarPage.useMemo[filtered]": (item)=>{
                    if (platformFilter && item.platform !== platformFilter) return false;
                    if (staffFilter && item.assignedTo !== staffFilter) return false;
                    if (statusFilter && item.status !== statusFilter) return false;
                    if (contentTypeFilter && item.contentType !== contentTypeFilter) return false;
                    return true;
                }
            }["SocialMediaCalendarPage.useMemo[filtered]"]);
        }
    }["SocialMediaCalendarPage.useMemo[filtered]"], [
        posts,
        platformFilter,
        staffFilter,
        statusFilter,
        contentTypeFilter
    ]);
    const staffOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SocialMediaCalendarPage.useMemo[staffOptions]": ()=>{
            const set = new Set();
            filtered.forEach({
                "SocialMediaCalendarPage.useMemo[staffOptions]": (item)=>{
                    const value = String(item.assignedTo || "").trim();
                    if (value) set.add(value);
                }
            }["SocialMediaCalendarPage.useMemo[staffOptions]"]);
            return Array.from(set);
        }
    }["SocialMediaCalendarPage.useMemo[staffOptions]"], [
        filtered
    ]);
    const postsByDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SocialMediaCalendarPage.useMemo[postsByDate]": ()=>{
            const map = new Map();
            filtered.forEach({
                "SocialMediaCalendarPage.useMemo[postsByDate]": (item)=>{
                    if (!item.scheduledDate) return;
                    const key = item.scheduledDate;
                    const arr = map.get(key) || [];
                    arr.push(item);
                    map.set(key, arr);
                }
            }["SocialMediaCalendarPage.useMemo[postsByDate]"]);
            return map;
        }
    }["SocialMediaCalendarPage.useMemo[postsByDate]"], [
        filtered
    ]);
    const todayQueue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SocialMediaCalendarPage.useMemo[todayQueue]": ()=>{
            return filtered.filter({
                "SocialMediaCalendarPage.useMemo[todayQueue]": (item)=>{
                    const dt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDateTime"])(item.scheduledDate, item.scheduledTime);
                    return dt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDate"])(dt, new Date()) : false;
                }
            }["SocialMediaCalendarPage.useMemo[todayQueue]"]).sort({
                "SocialMediaCalendarPage.useMemo[todayQueue]": (a, b)=>String(a.scheduledTime).localeCompare(String(b.scheduledTime))
            }["SocialMediaCalendarPage.useMemo[todayQueue]"]);
        }
    }["SocialMediaCalendarPage.useMemo[todayQueue]"], [
        filtered
    ]);
    const upcoming = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SocialMediaCalendarPage.useMemo[upcoming]": ()=>{
            const now = new Date();
            return filtered.map({
                "SocialMediaCalendarPage.useMemo[upcoming]": (item)=>({
                        item,
                        dt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDateTime"])(item.scheduledDate, item.scheduledTime)
                    })
            }["SocialMediaCalendarPage.useMemo[upcoming]"]).filter({
                "SocialMediaCalendarPage.useMemo[upcoming]": (x)=>x.dt && x.dt >= now
            }["SocialMediaCalendarPage.useMemo[upcoming]"]).sort({
                "SocialMediaCalendarPage.useMemo[upcoming]": (a, b)=>+a.dt - +b.dt
            }["SocialMediaCalendarPage.useMemo[upcoming]"]).slice(0, 8).map({
                "SocialMediaCalendarPage.useMemo[upcoming]": (x)=>x.item
            }["SocialMediaCalendarPage.useMemo[upcoming]"]);
        }
    }["SocialMediaCalendarPage.useMemo[upcoming]"], [
        filtered
    ]);
    const missed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SocialMediaCalendarPage.useMemo[missed]": ()=>{
            const now = new Date();
            return filtered.filter({
                "SocialMediaCalendarPage.useMemo[missed]": (item)=>{
                    const dt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toDateTime"])(item.scheduledDate, item.scheduledTime);
                    if (!dt) return item.status === "Missed";
                    return item.status === "Missed" || (item.status === "Scheduled" || item.status === "Ready") && dt < now;
                }
            }["SocialMediaCalendarPage.useMemo[missed]"]).slice(0, 8);
        }
    }["SocialMediaCalendarPage.useMemo[missed]"], [
        filtered
    ]);
    const updatePostDate = async (id, dateStr)=>{
        const res = await fetch(`/api/social-media-posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                scheduledDate: dateStr,
                status: "Scheduled"
            })
        });
        if (!res.ok) {
            alert("Failed to reschedule post");
            return;
        }
        await loadPosts(selectedClientId);
    };
    const onDragStart = (event, id)=>{
        event.dataTransfer.setData("text/plain", id);
    };
    const onDropDay = async (event, dateStr)=>{
        event.preventDefault();
        const id = event.dataTransfer.getData("text/plain");
        if (!id) return;
        await updatePostDate(id, dateStr);
    };
    const monthCells = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SocialMediaCalendarPage.useMemo[monthCells]": ()=>{
            const first = new Date(cursorDate.getFullYear(), cursorDate.getMonth(), 1);
            const start = new Date(first);
            start.setDate(first.getDate() - first.getDay());
            return Array.from({
                length: 42
            }).map({
                "SocialMediaCalendarPage.useMemo[monthCells]": (_, idx)=>{
                    const date = new Date(start);
                    date.setDate(start.getDate() + idx);
                    return date;
                }
            }["SocialMediaCalendarPage.useMemo[monthCells]"]);
        }
    }["SocialMediaCalendarPage.useMemo[monthCells]"], [
        cursorDate
    ]);
    const moveMonth = (delta)=>{
        const next = new Date(cursorDate);
        next.setMonth(next.getMonth() + delta);
        setCursorDate(next);
    };
    const selectedKey = selectedDate.toISOString().slice(0, 10);
    const selectedPosts = postsByDate.get(selectedKey) || [];
    const weekDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SocialMediaCalendarPage.useMemo[weekDays]": ()=>{
            const start = new Date(selectedDate);
            start.setDate(start.getDate() - start.getDay());
            return Array.from({
                length: 7
            }).map({
                "SocialMediaCalendarPage.useMemo[weekDays]": (_, idx)=>{
                    const d = new Date(start);
                    d.setDate(start.getDate() + idx);
                    return d;
                }
            }["SocialMediaCalendarPage.useMemo[weekDays]"]);
        }
    }["SocialMediaCalendarPage.useMemo[weekDays]"], [
        selectedDate
    ]);
    const dayPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SocialMediaCalendarPage.useMemo[dayPosts]": ()=>{
            return selectedPosts.sort({
                "SocialMediaCalendarPage.useMemo[dayPosts]": (a, b)=>String(a.scheduledTime).localeCompare(String(b.scheduledTime))
            }["SocialMediaCalendarPage.useMemo[dayPosts]"]);
        }
    }["SocialMediaCalendarPage.useMemo[dayPosts]"], [
        selectedPosts
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 font-headline",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl font-black tracking-tighter",
                                children: "CONTENT CALENDAR"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: "Daily, weekly and monthly social posting schedule."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/social-media-planner",
                                className: "px-3 py-2 border rounded-md text-sm font-semibold",
                                children: "Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/social-media-planner/planner",
                                className: "px-3 py-2 border rounded-md text-sm font-semibold",
                                children: "Planner"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/social-media-planner/analytics",
                                className: "px-3 py-2 border rounded-md text-sm font-semibold",
                                children: "Analytics"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "border-2 border-black rounded-lg p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "border rounded-md p-2",
                        value: platformFilter,
                        onChange: (e)=>setPlatformFilter(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "All Platforms"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SOCIAL_PLATFORMS"].map((platform)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: platform,
                                    children: platform
                                }, platform, false, {
                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "border rounded-md p-2",
                        value: staffFilter,
                        onChange: (e)=>setStaffFilter(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "All Staff"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 245,
                                columnNumber: 11
                            }, this),
                            staffOptions.map((name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: name,
                                    children: name
                                }, name, false, {
                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "border rounded-md p-2",
                        value: statusFilter,
                        onChange: (e)=>setStatusFilter(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "All Status"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POST_STATUSES"].map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: status,
                                    children: status
                                }, status, false, {
                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "border rounded-md p-2",
                        value: contentTypeFilter,
                        onChange: (e)=>setContentTypeFilter(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "All Content Types"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTENT_TYPES"].map((contentType)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: contentType,
                                    children: contentType
                                }, contentType, false, {
                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        className: "border rounded-md p-2",
                        value: viewMode,
                        onChange: (e)=>setViewMode(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "daily",
                                children: "Daily View"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 281,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "weekly",
                                children: "Weekly View"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 282,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "monthly",
                                children: "Monthly View"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "border rounded-md p-2 text-sm",
                        onClick: ()=>{
                            setPlatformFilter("");
                            setStaffFilter("");
                            setStatusFilter("");
                            setContentTypeFilter("");
                        },
                        children: "Clear Filters"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            viewMode === "monthly" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "border-2 border-black rounded-lg overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 border-b-2 border-black flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "border rounded px-2 py-1",
                                onClick: ()=>moveMonth(-1),
                                children: "Prev"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-black text-lg",
                                children: cursorDate.toLocaleDateString("en-IN", {
                                    month: "long",
                                    year: "numeric"
                                })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 307,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "border rounded px-2 py-1",
                                onClick: ()=>moveMonth(1),
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 313,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 300,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-7 border-b",
                        children: [
                            "Sun",
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat"
                        ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2 text-xs font-semibold border-r last:border-r-0",
                                children: d
                            }, d, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 323,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 321,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-7",
                        children: monthCells.map((date)=>{
                            const key = date.toISOString().slice(0, 10);
                            const dayItems = postsByDate.get(key) || [];
                            const isCurrentMonth = date.getMonth() === cursorDate.getMonth();
                            const isToday = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSameDate"])(date, new Date());
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setSelectedDate(date),
                                onDragOver: (e)=>e.preventDefault(),
                                onDrop: (e)=>onDropDay(e, key),
                                className: `min-h-28 border-r border-b p-1 cursor-pointer ${isCurrentMonth ? "bg-white" : "bg-slate-50 text-muted-foreground"} ${isToday ? "ring-1 ring-blue-500" : ""}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-semibold mb-1",
                                        children: date.getDate()
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                        lineNumber: 347,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            dayItems.slice(0, 3).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    draggable: true,
                                                    onDragStart: (e)=>onDragStart(e, String(item._id || item.id || "")),
                                                    className: `text-[10px] px-1 py-0.5 rounded truncate ${statusBg[item.status] || "bg-gray-100"}`,
                                                    title: `${item.title} · ${item.platform}`,
                                                    children: [
                                                        item.scheduledTime,
                                                        " ",
                                                        item.title
                                                    ]
                                                }, String(item._id || item.id), true, {
                                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 23
                                                }, this)),
                                            dayItems.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[10px] text-muted-foreground",
                                                children: [
                                                    "+",
                                                    dayItems.length - 3,
                                                    " more"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                                lineNumber: 365,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                        lineNumber: 350,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 340,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 332,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                lineNumber: 299,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "border rounded-lg p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-black mb-2",
                        children: [
                            "Selected Date Posts (",
                            selectedDate.toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            }),
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 378,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            !selectedPosts.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground",
                                children: "No posts scheduled on selected date."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 389,
                                columnNumber: 13
                            }, this),
                            selectedPosts.slice().sort((a, b)=>String(a.scheduledTime).localeCompare(String(b.scheduledTime))).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border rounded p-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-semibold text-sm",
                                            children: [
                                                item.scheduledTime,
                                                " · ",
                                                item.title
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                            lineNumber: 403,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-muted-foreground",
                                            children: [
                                                item.platform,
                                                " · ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$post$2d$account$2d$display$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PostAccountDisplay"], {
                                                    accountId: item.socialAccountId
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 37
                                                }, this),
                                                " · ",
                                                item.assignedTo || "Unassigned",
                                                " ·",
                                                " ",
                                                item.status
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                            lineNumber: 406,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, `sel-${String(item._id || item.id)}`, true, {
                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                    lineNumber: 399,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 387,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                lineNumber: 377,
                columnNumber: 7
            }, this),
            viewMode === "weekly" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "border-2 border-black rounded-lg overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 border-b-2 border-black flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "border rounded px-2 py-1",
                                onClick: ()=>setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 7)),
                                children: "Prev Week"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 418,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-black text-lg",
                                children: [
                                    "Week of",
                                    " ",
                                    weekDays[0].toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short"
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 432,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "border rounded px-2 py-1",
                                onClick: ()=>setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 7)),
                                children: "Next Week"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 439,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 417,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-7 gap-2 p-2",
                        children: weekDays.map((date)=>{
                            const key = date.toISOString().slice(0, 10);
                            const dayItems = postsByDate.get(key) || [];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border rounded p-2 min-h-32",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-semibold mb-1",
                                        children: date.toLocaleDateString("en-IN", {
                                            weekday: "short",
                                            day: "2-digit",
                                            month: "short"
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                        lineNumber: 460,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: dayItems.length ? dayItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `text-[11px] px-1 py-0.5 rounded ${statusBg[item.status] || "bg-gray-100"}`,
                                                children: [
                                                    item.scheduledTime,
                                                    " ",
                                                    item.title
                                                ]
                                            }, String(item._id || item.id), true, {
                                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                                lineNumber: 470,
                                                columnNumber: 25
                                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-muted-foreground",
                                            children: "No posts"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                            lineNumber: 478,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                        lineNumber: 467,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, key, true, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 459,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 454,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                lineNumber: 416,
                columnNumber: 9
            }, this),
            viewMode === "daily" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "border-2 border-black rounded-lg overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 border-b-2 border-black flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "border rounded px-2 py-1",
                                onClick: ()=>setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 1)),
                                children: "Prev Day"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 493,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-black text-lg",
                                children: selectedDate.toLocaleDateString("en-IN", {
                                    weekday: "long",
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 507,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "border rounded px-2 py-1",
                                onClick: ()=>setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1)),
                                children: "Next Day"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 515,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 492,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 space-y-2",
                        children: dayPosts.length ? dayPosts.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `border rounded p-2 ${statusBg[item.status] || "bg-gray-50"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-semibold",
                                        children: item.title
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                        lineNumber: 537,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-muted-foreground",
                                        children: [
                                            item.platform,
                                            " · ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$post$2d$account$2d$display$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PostAccountDisplay"], {
                                                accountId: item.socialAccountId
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                                lineNumber: 539,
                                                columnNumber: 39
                                            }, this),
                                            " · ",
                                            item.contentType,
                                            " · ",
                                            item.scheduledTime
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                        lineNumber: 538,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs mt-1",
                                        children: item.caption
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                        lineNumber: 541,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, String(item._id || item.id), true, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 533,
                                columnNumber: 17
                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-muted-foreground",
                            children: "No posts scheduled for this day."
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                            lineNumber: 545,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 530,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                lineNumber: 491,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 xl:grid-cols-2 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "border rounded-lg p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-black mb-2",
                                children: "Today’s Queue"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 555,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    !todayQueue.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground",
                                        children: "No posts for today."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                        lineNumber: 558,
                                        columnNumber: 15
                                    }, this),
                                    todayQueue.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border rounded p-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-semibold text-sm",
                                                    children: [
                                                        item.scheduledTime,
                                                        " · ",
                                                        item.title
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                                    lineNumber: 567,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: [
                                                        item.platform,
                                                        " · ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$post$2d$account$2d$display$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PostAccountDisplay"], {
                                                            accountId: item.socialAccountId
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                                            lineNumber: 571,
                                                            columnNumber: 37
                                                        }, this),
                                                        " · ",
                                                        item.assignedTo || "Unassigned"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                                    lineNumber: 570,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, String(item._id || item.id), true, {
                                            fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                            lineNumber: 563,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 556,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 554,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "border rounded-lg p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-black mb-2",
                                children: "Upcoming & Missed"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 579,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 max-h-60 overflow-auto",
                                children: [
                                    upcoming.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border rounded p-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-semibold",
                                                    children: item.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                                    lineNumber: 586,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: [
                                                        "Upcoming · ",
                                                        item.scheduledDate,
                                                        " ",
                                                        item.scheduledTime
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                                    lineNumber: 587,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, `up-${String(item._id || item.id)}`, true, {
                                            fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                            lineNumber: 582,
                                            columnNumber: 15
                                        }, this)),
                                    missed.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border rounded p-2 bg-red-50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-semibold",
                                                    children: item.title
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                                    lineNumber: 597,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-red-700",
                                                    children: [
                                                        "Missed · ",
                                                        item.scheduledDate,
                                                        " ",
                                                        item.scheduledTime
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                                    lineNumber: 598,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, `ms-${String(item._id || item.id)}`, true, {
                                            fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                            lineNumber: 593,
                                            columnNumber: 15
                                        }, this)),
                                    !upcoming.length && !missed.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground",
                                        children: "No upcoming or missed posts."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                        lineNumber: 604,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                                lineNumber: 580,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                        lineNumber: 578,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
                lineNumber: 553,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/calendar/page.tsx",
        lineNumber: 195,
        columnNumber: 5
    }, this);
}
_s(SocialMediaCalendarPage, "qp37okaYenZ8asM6gJEahhsFuGE=");
_c = SocialMediaCalendarPage;
var _c;
__turbopack_context__.k.register(_c, "SocialMediaCalendarPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_Projects_final-pixelate_dashboard_src_0ea33893._.js.map