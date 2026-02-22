(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Projects/final-pixelate/dashboard/src/hooks/use-auth.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Define public routes that don't require authentication
const publicRoutes = [
    '/login'
];
// Routes accessible only to clients
const clientRoutes = [
    '/client-portal'
];
const AuthProvider = ({ children })=>{
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            let mounted = true;
            ({
                "AuthProvider.useEffect": async ()=>{
                    try {
                        const storedUserId = sessionStorage.getItem('userId');
                        // fetch users from the API instead of importing server-only modules
                        const res = await fetch('/api/users');
                        const allUsers = await res.json();
                        if (!mounted) return;
                        if (storedUserId) {
                            const foundUser = allUsers.find({
                                "AuthProvider.useEffect.foundUser": (u)=>(u.id ?? u._id) === (isNaN(Number(storedUserId)) ? storedUserId : Number(storedUserId))
                            }["AuthProvider.useEffect.foundUser"]);
                            if (foundUser) {
                                setUser(foundUser);
                            } else {
                                sessionStorage.removeItem('userId');
                                setUser(null);
                            }
                        } else {
                            setUser(null);
                        }
                    } catch (e) {
                        console.error("Could not access users or session storage.", e);
                        setUser(null);
                    } finally{
                        if (mounted) setLoading(false);
                    }
                }
            })["AuthProvider.useEffect"]();
            return ({
                "AuthProvider.useEffect": ()=>{
                    mounted = false;
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], [
        pathname
    ]); // Re-check on path change could be useful
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (!loading) {
                const isPublic = publicRoutes.includes(pathname);
                const isClientRoute = clientRoutes.some({
                    "AuthProvider.useEffect.isClientRoute": (r)=>pathname.startsWith(r)
                }["AuthProvider.useEffect.isClientRoute"]);
                if (!user && !isPublic) {
                    router.push('/login');
                } else if (user && user.role === 'client' && !isClientRoute) {
                    // Clients can only access the client portal
                    router.push('/client-portal');
                } else if (user && user.role !== 'client' && isClientRoute) {
                    // Non-clients cannot access client portal
                    router.push('/dashboard');
                }
            }
        }
    }["AuthProvider.useEffect"], [
        loading,
        user,
        pathname,
        router
    ]);
    const login = (userId)=>{
        // synchronous behavior retained: set the id in sessionStorage and rely on the
        // next checkUser cycle to refresh the user. We optimistically set the user
        // if the list is already loaded.
        sessionStorage.setItem('userId', String(userId));
        // Try to find user in currently loaded list (fast path)
        // Note: getUsers() is async so we don't await here to keep login sync.
        // If the user isn't loaded yet, the effect will pick them up.
        (async ()=>{
            try {
                const res = await fetch('/api/users');
                const allUsers = await res.json();
                const normalized = allUsers.find((u)=>{
                    const candidate = u.id ?? u._id;
                    // compare strings and numbers equivalently
                    return String(candidate) === String(userId);
                });
                if (normalized) setUser(normalized);
            } catch (e) {
            // ignore
            }
        })();
        return true;
    };
    const logout = ()=>{
        // Clear in-memory state and any persisted auth/session data
        setUser(null);
        try {
            sessionStorage.removeItem('userId');
        } catch (e) {}
        try {
            localStorage.removeItem('auth_token');
        } catch (e) {}
        // Redirect to the login page and refresh navigation state
        try {
            router.replace('/login');
            // ensure any server-side props / caches are refreshed
            // router.refresh is available in app-router
            try {
                router.refresh();
            } catch (e) {}
        } catch (e) {
            try {
                router.push('/login');
            } catch (er) {}
        }
    };
    if (loading) {
        return null; // Don't render anything until client-side check is complete
    }
    if (!user && !publicRoutes.includes(pathname)) {
        // While redirecting, render nothing to prevent flashing of content
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            login,
            logout,
            loading: loading
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/Projects/final-pixelate/dashboard/src/hooks/use-auth.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "GW5IAz/41mFv7naHdemrili0vlk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=Desktop_Projects_final-pixelate_dashboard_1d172130._.js.map