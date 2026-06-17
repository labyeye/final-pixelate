module.exports = [
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/api-fetch.ts [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "apiFetch",
      () => apiFetch,
      "getAuthHeaders",
      () => getAuthHeaders,
    ]);
    function getAuthHeaders() {
      if (("TURBOPACK compile-time truthy", 1)) return {};
      //TURBOPACK unreachable
      const token = undefined;
    }
    function apiFetch(url, init = {}) {
      const headers = {
        ...getAuthHeaders(),
        ...(init.headers || {}),
      };
      return fetch(url, {
        ...init,
        headers,
      });
    }
  },
  "[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      "next/dist/server/app-render/action-async-storage.external.js",
      () =>
        require("next/dist/server/app-render/action-async-storage.external.js"),
    );

    module.exports = mod;
  },
  "[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      "next/dist/server/app-render/work-unit-async-storage.external.js",
      () =>
        require("next/dist/server/app-render/work-unit-async-storage.external.js"),
    );

    module.exports = mod;
  },
  "[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      "next/dist/server/app-render/work-async-storage.external.js",
      () =>
        require("next/dist/server/app-render/work-async-storage.external.js"),
    );

    module.exports = mod;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/hooks/use-auth.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "AuthProvider",
      () => AuthProvider,
      "useAuth",
      () => useAuth,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/api-fetch.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/navigation.js [app-ssr] (ecmascript)",
      );
    ("use client");
    const AuthContext = /*#__PURE__*/ (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "createContext"
    ])(undefined);
    const publicRoutes = ["/login"];
    const clientRoutes = ["/client-portal"];
    const AuthProvider = ({ children }) => {
      const [user, setUser] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(true);
      const router = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useRouter"
      ])();
      const pathname = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "usePathname"
      ])();
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        let mounted = true;
        (async () => {
          try {
            const storedUserId = sessionStorage.getItem("userId");
            const token = localStorage.getItem("auth_token");
            if (!storedUserId || !token) {
              setUser(null);
              return;
            }
            const res = await (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "apiFetch"
            ])("/api/users", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (!res.ok) {
              setUser(null);
              return;
            }
            const allUsers = await res.json();
            if (!mounted) return;
            if (Array.isArray(allUsers)) {
              const foundUser = allUsers.find(
                (u) =>
                  (u.id ?? u._id) ===
                  (isNaN(Number(storedUserId))
                    ? storedUserId
                    : Number(storedUserId)),
              );
              if (foundUser) {
                setUser(foundUser);
              } else {
                sessionStorage.removeItem("userId");
                setUser(null);
              }
            } else {
              setUser(null);
            }
          } catch (e) {
            console.error("Could not access users or session storage.", e);
            setUser(null);
          } finally {
            if (mounted) setLoading(false);
          }
        })();
        return () => {
          mounted = false;
        };
      }, [pathname]);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        if (!loading) {
          const isPublic = publicRoutes.includes(pathname);
          if (!user && !isPublic) {
            router.push("/login");
          }
          if (
            user &&
            user.role !== "client" &&
            clientRoutes.some((r) => pathname.startsWith(r))
          ) {
            router.push("/dashboard");
          }
        }
      }, [loading, user, pathname, router]);
      const login = (userId) => {
        sessionStorage.setItem("userId", String(userId));
        (async () => {
          try {
            const token = localStorage.getItem("auth_token");
            if (!token) return;
            const res = await (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "apiFetch"
            ])("/api/users", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (!res.ok) return;
            const allUsers = await res.json();
            if (!Array.isArray(allUsers)) return;
            const normalized = allUsers.find((u) => {
              const candidate = u.id ?? u._id;
              return String(candidate) === String(userId);
            });
            if (normalized) setUser(normalized);
          } catch (e) {}
        })();
        return true;
      };
      const logout = () => {
        try {
          if (user) {
            (async () => {
              try {
                await (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "apiFetch"
                ])("/api/erp-events", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    type: "logout",
                    userId: user.id || user._id,
                    email: user.email,
                    adminName: user.name,
                    details: {
                      message: "User logged out",
                    },
                  }),
                });
              } catch (e) {}
            })();
          }
        } catch (e) {}
        setUser(null);
        try {
          sessionStorage.removeItem("userId");
        } catch (e) {}
        try {
          localStorage.removeItem("auth_token");
        } catch (e) {}
        try {
          router.replace("/login");
          try {
            router.refresh();
          } catch (e) {}
        } catch (e) {
          try {
            router.push("/login");
          } catch (er) {}
        }
      };
      if (loading) {
        return null;
      }
      if (!user && !publicRoutes.includes(pathname)) {
        return null;
      }
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        AuthContext.Provider,
        {
          value: {
            user,
            login,
            logout,
            loading: loading,
          },
          children: children,
        },
        void 0,
        false,
        {
          fileName:
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/hooks/use-auth.tsx",
          lineNumber: 174,
          columnNumber: 5,
        },
        ("TURBOPACK compile-time value", void 0),
      );
    };
    const useAuth = () => {
      const context = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useContext"
      ])(AuthContext);
      if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
      }
      return context;
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/avatar.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Avatar",
      () => Avatar,
      "AvatarFallback",
      () => AvatarFallback,
      "AvatarImage",
      () => AvatarImage,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-avatar/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/utils.ts [app-ssr] (ecmascript)",
      );
    ("use client");
    const Avatar =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Root"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
              className,
            ),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/avatar.tsx",
            lineNumber: 12,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    Avatar.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Root"
      ].displayName;
    const AvatarImage =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Image"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("aspect-square h-full w-full", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/avatar.tsx",
            lineNumber: 27,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    AvatarImage.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Image"
      ].displayName;
    const AvatarFallback =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Fallback"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "flex h-full w-full items-center justify-center rounded-full bg-muted",
              className,
            ),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/avatar.tsx",
            lineNumber: 39,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    AvatarFallback.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Fallback"
      ].displayName;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/placeholder-images.json (json)",
  (__turbopack_context__) => {
    __turbopack_context__.v({
      placeholderImages: [
        {
          id: "user-avatar-1",
          description: "User avatar",
          imageUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTg3ODg5NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
          imageHint: "person portrait",
        },
      ],
    });
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/placeholder-images.ts [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["PlaceHolderImages", () => PlaceHolderImages]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$placeholder$2d$images$2e$json__$28$json$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/placeholder-images.json (json)",
      );
    const PlaceHolderImages =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$placeholder$2d$images$2e$json__$28$json$29$__[
        "default"
      ].placeholderImages;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/nav-config.ts [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "clientNavItems",
      () => clientNavItems,
      "clientPortalGroups",
      () => clientPortalGroups,
      "clientSpecificNavItems",
      () => clientSpecificNavItems,
      "defaultClientAllowed",
      () => defaultClientAllowed,
      "defaultStaffAllowed",
      () => defaultStaffAllowed,
      "navGroups",
      () => navGroups,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-ssr] (ecmascript) <export default as LayoutDashboard>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/chart-no-axes-column-increasing.js [app-ssr] (ecmascript) <export default as BarChart>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/activity.js [app-ssr] (ecmascript) <export default as Activity>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/megaphone.js [app-ssr] (ecmascript) <export default as Megaphone>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$kanban$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__KanbanSquare$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/square-kanban.js [app-ssr] (ecmascript) <export default as KanbanSquare>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/life-buoy.js [app-ssr] (ecmascript) <export default as LifeBuoy>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-ssr] (ecmascript) <export default as UserPlus>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/receipt.js [app-ssr] (ecmascript) <export default as Receipt>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareCheck$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/square-check.js [app-ssr] (ecmascript) <export default as SquareCheck>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-ssr] (ecmascript) <export default as Briefcase>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BoxIcon$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/box.js [app-ssr] (ecmascript) <export default as BoxIcon>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-ssr] (ecmascript) <export default as DollarSign>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/code.js [app-ssr] (ecmascript) <export default as Code>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/image.js [app-ssr] (ecmascript) <export default as Image>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/circle-play.js [app-ssr] (ecmascript) <export default as PlayCircle>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/calendar-days.js [app-ssr] (ecmascript) <export default as CalendarDays>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/headphones.js [app-ssr] (ecmascript) <export default as Headphones>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/rocket.js [app-ssr] (ecmascript) <export default as Rocket>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>",
      );
    const defaultStaffAllowed = [
      "/dashboard",
      "/leads",
      "/blogs",
      "/work-gallery",
      "/social-media-manager",
      "/social-media-planner",
      "/social-media-calendar",
      "/dashboard/bulk-messaging",
      "/dashboard/campaigns",
      "/dashboard/whatsapp-inbox",
      "/dashboard/whatsapp-webhook",
      "/enquiries",
      "/reviews",
      "/quotations",
      "/quotations/create",
    ];
    const navGroups = [
      {
        title: "Management",
        items: [
          {
            href: "/dashboard",
            label: "Dashboard",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__[
              "LayoutDashboard"
            ],
          },
          {
            href: "/analytics",
            label: "Analytics",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__[
              "BarChart"
            ],
          },
          {
            href: "/dashboard/reports",
            label: "Reports",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__[
              "FileText"
            ],
          },
          {
            href: "/dashboard/settings",
            label: "Settings",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__[
              "Settings"
            ],
          },
          {
            href: "/user-activity",
            label: "User Activity",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__[
              "Activity"
            ],
          },
          {
            href: "/erp-console",
            label: "ERP Console",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__[
              "Zap"
            ],
          },
        ],
      },
      {
        title: "Marketing",
        items: [
          {
            href: "/leads",
            label: "Leads",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$kanban$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__KanbanSquare$3e$__[
              "KanbanSquare"
            ],
          },
          {
            href: "/enquiries",
            label: "Enquiries",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__[
              "LifeBuoy"
            ],
          },
          {
            href: "/reviews",
            label: "Reviews",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__[
              "Star"
            ],
          },
          {
            href: "/newsletter",
            label: "Newsletter",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__[
              "Mail"
            ],
          },
          {
            href: "/announcement-bar",
            label: "Announcements",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__[
              "Megaphone"
            ],
          },
          {
            href: "/blogs",
            label: "Blogs",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__[
              "FileText"
            ],
          },
          {
            href: "/work-gallery",
            label: "Work Gallery",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__[
              "Image"
            ],
          },
          {
            href: "/photo-galleries",
            label: "Photos",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__[
              "Image"
            ],
          },
          {
            href: "/reels",
            label: "Reels",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__[
              "PlayCircle"
            ],
          },
          {
            href: "/social-media-manager",
            label: "Social Media Manager",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__[
              "CalendarDays"
            ],
          },
          {
            href: "/social-media-planner",
            label: "Social Media Planner",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__[
              "CalendarDays"
            ],
          },
          {
            href: "/social-media-calendar",
            label: "Social Media Calendar",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__[
              "CalendarDays"
            ],
          },
        ],
      },
      {
        title: "WhatsApp Marketing",
        items: [
          {
            href: "/dashboard/bulk-messaging",
            label: "Bulk Messaging",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__[
              "MessageCircle"
            ],
          },
          {
            href: "/dashboard/whatsapp-inbox",
            label: "WhatsApp Inbox",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__[
              "Mail"
            ],
          },
          {
            href: "/dashboard/campaigns",
            label: "Campaign Insights",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__[
              "BarChart"
            ],
          },
          {
            href: "/dashboard/whatsapp-webhook",
            label: "Webhook Log",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__[
              "MessageCircle"
            ],
          },
          {
            href: "/dashboard/whatsapp-templates",
            label: "WhatsApp Templates",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__[
              "FileText"
            ],
          },
        ],
      },
      {
        title: "Sales",
        items: [
          {
            href: "/clients",
            label: "Clients",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__[
              "Users"
            ],
          },
          {
            href: "/quotations",
            label: "Quotations",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__[
              "FileText"
            ],
          },
          {
            href: "/onboarding",
            label: "Onboarding",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__[
              "UserPlus"
            ],
          },
          {
            href: "/nda-approval",
            label: "NDA Approval",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__[
              "Lock"
            ],
          },
        ],
      },
      {
        title: "Operations",
        items: [
          {
            href: "/projects",
            label: "Projects",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__[
              "Briefcase"
            ],
          },
          {
            href: "/tasks",
            label: "Tasks",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareCheck$3e$__[
              "SquareCheck"
            ],
          },
          {
            href: "/journey",
            label: "Journey",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__[
              "BookOpen"
            ],
          },
          {
            href: "/services",
            label: "Services",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__[
              "Code"
            ],
          },
          {
            href: "/inventory",
            label: "Inventory",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BoxIcon$3e$__[
              "BoxIcon"
            ],
          },
        ],
      },
      {
        title: "Finance",
        items: [
          {
            href: "/invoicing",
            label: "Invoicing",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__[
              "Receipt"
            ],
          },
          {
            href: "/trash",
            label: "Trash",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__[
              "Trash2"
            ],
          },
          {
            href: "/dashboard/payments",
            label: "Payments",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__[
              "DollarSign"
            ],
          },
          {
            href: "/expenses",
            label: "Expenses",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__[
              "Wallet"
            ],
          },
          {
            href: "/emi",
            label: "EMI Tracker",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__[
              "CreditCard"
            ],
          },
        ],
      },
      {
        title: "HR & Support",
        items: [
          {
            href: "/about-us-team",
            label: "About Us Team",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__[
              "Users"
            ],
          },
          {
            href: "/careers",
            label: "Careers",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__[
              "UserPlus"
            ],
          },
          {
            href: "/developers-and-editors",
            label: "Developers",
            adminOnly: true,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__[
              "Code"
            ],
          },
          {
            href: "/support",
            label: "Support",
            adminOnly: false,
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__[
              "Headphones"
            ],
          },
        ],
      },
    ];
    const clientPortalGroups = [
      {
        title: "Client Portal Exclusive",
        items: [
          {
            href: "/client/planner",
            label: "Planner",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__[
              "CalendarDays"
            ],
          },
          {
            href: "/client/calendar",
            label: "Calendar",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__[
              "CalendarDays"
            ],
          },
          {
            href: "/client/analytics",
            label: "Analytics",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__[
              "BarChart"
            ],
          },
          {
            href: "/client/development",
            label: "Development",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__[
              "Rocket"
            ],
          },
          {
            href: "/client/support",
            label: "Support",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__[
              "Headphones"
            ],
          },
          {
            href: "/client/leads",
            label: "Leads",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__[
              "Zap"
            ],
          },
        ],
      },
      {
        title: "Management",
        items: [
          {
            href: "/dashboard",
            label: "Dashboard",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__[
              "LayoutDashboard"
            ],
          },
          {
            href: "/analytics",
            label: "Analytics",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__[
              "BarChart"
            ],
          },
        ],
      },
      {
        title: "Marketing",
        items: [
          {
            href: "/leads",
            label: "Leads",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$kanban$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__KanbanSquare$3e$__[
              "KanbanSquare"
            ],
          },
          {
            href: "/enquiries",
            label: "Enquiries",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__[
              "LifeBuoy"
            ],
          },
          {
            href: "/reviews",
            label: "Reviews",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__[
              "Star"
            ],
          },
          {
            href: "/work-gallery",
            label: "Work Gallery",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__[
              "Image"
            ],
          },
          {
            href: "/photo-galleries",
            label: "Photos",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__[
              "Image"
            ],
          },
          {
            href: "/reels",
            label: "Reels",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlayCircle$3e$__[
              "PlayCircle"
            ],
          },
          {
            href: "/blogs",
            label: "Blogs",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__[
              "FileText"
            ],
          },
        ],
      },
      {
        title: "Sales",
        items: [
          {
            href: "/clients",
            label: "Clients",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__[
              "Users"
            ],
          },
          {
            href: "/quotations",
            label: "Quotations",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__[
              "FileText"
            ],
          },
          {
            href: "/onboarding",
            label: "Onboarding",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__[
              "UserPlus"
            ],
          },
          {
            href: "/nda-approval",
            label: "NDA Approval",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__[
              "Lock"
            ],
          },
        ],
      },
      {
        title: "Operations",
        items: [
          {
            href: "/projects",
            label: "Projects",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__[
              "Briefcase"
            ],
          },
          {
            href: "/tasks",
            label: "Tasks",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareCheck$3e$__[
              "SquareCheck"
            ],
          },
          {
            href: "/journey",
            label: "Journey",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__[
              "BookOpen"
            ],
          },
          {
            href: "/services",
            label: "Services",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__[
              "Code"
            ],
          },
          {
            href: "/inventory",
            label: "Inventory",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BoxIcon$3e$__[
              "BoxIcon"
            ],
          },
        ],
      },
      {
        title: "Finance",
        items: [
          {
            href: "/invoicing",
            label: "Invoicing",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__[
              "Receipt"
            ],
          },
          {
            href: "/dashboard/payments",
            label: "Payments",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__[
              "DollarSign"
            ],
          },
          {
            href: "/expenses",
            label: "Expenses",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__[
              "Wallet"
            ],
          },
        ],
      },
      {
        title: "HR & Support",
        items: [
          {
            href: "/about-us-team",
            label: "About Us Team",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__[
              "Users"
            ],
          },
          {
            href: "/careers",
            label: "Careers",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__[
              "UserPlus"
            ],
          },
          {
            href: "/developers-and-editors",
            label: "Developers",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__[
              "Code"
            ],
          },
          {
            href: "/support",
            label: "Support",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__[
              "Headphones"
            ],
          },
        ],
      },
    ];
    const clientNavItems = clientPortalGroups.flatMap((g) => g.items);
    const defaultClientAllowed = ["/invoicing", "/projects", "/support"];
    const clientSpecificNavItems = [
      {
        href: "/client/planner",
        label: "Planner",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__[
          "CalendarDays"
        ],
      },
      {
        href: "/client/calendar",
        label: "Calendar",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__[
          "CalendarDays"
        ],
      },
      {
        href: "/client/analytics",
        label: "Analytics",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$no$2d$axes$2d$column$2d$increasing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart$3e$__[
          "BarChart"
        ],
      },
      {
        href: "/client/development",
        label: "Development",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__[
          "Rocket"
        ],
      },
      {
        href: "/client/support",
        label: "Support",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__[
          "Headphones"
        ],
      },
      {
        href: "/client/leads",
        label: "Leads",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__[
          "Zap"
        ],
      },
    ];
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Button",
      () => Button,
      "buttonVariants",
      () => buttonVariants,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/utils.ts [app-ssr] (ecmascript)",
      );
    const buttonVariants = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "cva"
    ])(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      {
        variants: {
          variant: {
            default:
              "bg-primary text-primary-foreground hover:bg-primary/80 border-2 border-foreground",
            destructive:
              "bg-destructive text-destructive-foreground hover:bg-destructive/80 border-2 border-foreground",
            outline:
              "border-2 border-foreground bg-background hover:bg-foreground hover:text-background",
            secondary:
              "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-2 border-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
          },
          size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 px-3",
            lg: "h-11 px-8",
            icon: "h-10 w-10",
          },
        },
        defaultVariants: {
          variant: "default",
          size: "default",
        },
      },
    );
    const Button =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild
          ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "Slot"
            ]
          : "button";
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          Comp,
          {
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              buttonVariants({
                variant,
                size,
                className,
              }),
            ),
            ref: ref,
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx",
            lineNumber: 48,
            columnNumber: 7,
          },
          ("TURBOPACK compile-time value", void 0),
        );
      });
    Button.displayName = "Button";
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["Sidebar", () => Sidebar]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/api-fetch.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/navigation.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/avatar.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/utils.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$placeholder$2d$images$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/placeholder-images.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/hooks/use-auth.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$nav$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/nav-config.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/life-buoy.js [app-ssr] (ecmascript) <export default as LifeBuoy>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-ssr] (ecmascript)",
      );
    ("use client");
    const userAvatar =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$placeholder$2d$images$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "PlaceHolderImages"
      ].find((p) => p.id === "user-avatar-1");
    function Sidebar() {
      const pathname = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "usePathname"
      ])();
      const { user, logout } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useAuth"
      ])();
      const [globalClientPages, setGlobalClientPages] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$nav$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "defaultClientAllowed"
        ],
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "apiFetch"
        ])("/api/settings/client-sidebar")
          .then((r) => r.json())
          .then((data) => {
            if (Array.isArray(data.allowedClientPages)) {
              setGlobalClientPages(data.allowedClientPages);
            }
          })
          .catch(() => {});
      }, []);
      if (!user) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "aside",
          {
            className:
              "hidden md:flex md:w-60 lg:w-72 flex-col fixed inset-y-0 z-10 border-r-2 border-black bg-background",
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
            lineNumber: 42,
            columnNumber: 7,
          },
          this,
        );
      }
      const isClient = user.role === "client";
      const isAdmin = user?.role === "admin";
      const isStaff = user?.role === "staff";
      const userAllowedPages =
        user.allowedPages !== undefined
          ? user.allowedPages
          : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$nav$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "defaultStaffAllowed"
            ];
      const visibleClientNavItems =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$nav$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "clientNavItems"
        ].filter((item) => globalClientPages.includes(item.href));
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "aside",
        {
          className:
            "hidden md:flex md:w-60 lg:w-72 flex-col fixed inset-y-0 z-10 border-r-2 border-black bg-background font-headline",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className:
                  "p-6 border-b-2 border-black bg-white/50 backdrop-blur-sm",
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "default"
                  ],
                  {
                    href: "/dashboard",
                    className: "block group",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "img",
                        {
                          src: "../assets/images/logo-transparent.png",
                          alt: "Kalahanu Tech Logo",
                          className: "mx-auto mb-2 w-16 h-16",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                          lineNumber: 60,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "h1",
                        {
                          className:
                            "text-2xl font-black tracking-tighter group-hover:text-primary transition-colors",
                          children: "Kalahanu Tech",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                          lineNumber: 65,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "p",
                        {
                          className: "text-sm text-muted-foreground font-bold",
                          children: "Studios CRM",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                          lineNumber: 68,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                    lineNumber: 59,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                lineNumber: 58,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "nav",
              {
                className:
                  "flex-1 p-4 space-y-6 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20",
                "aria-label": "Primary navigation",
                children: isClient
                  ? /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "Fragment"
                      ],
                      {
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className: "space-y-2",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "h3",
                                  {
                                    className:
                                      "px-2 text-xs font-black text-muted-foreground uppercase tracking-widest",
                                    children: "Dashboard",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                    lineNumber: 78,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "space-y-1",
                                    children: visibleClientNavItems.map(
                                      (item) =>
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "default"
                                          ],
                                          {
                                            href: item.href,
                                            className: (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "cn"
                                            ])(
                                              "flex items-center gap-3 px-3 py-2 text-sm font-bold transition-all border-2 rounded-md hover:translate-x-1",
                                              pathname.startsWith(item.href)
                                                ? "bg-primary text-primary-foreground border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                                : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-muted hover:border-black/10",
                                            ),
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                item.icon,
                                                {
                                                  className: "w-4 h-4",
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                                  lineNumber: 93,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              item.label,
                                            ],
                                          },
                                          item.href,
                                          true,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                            lineNumber: 83,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                              lineNumber: 77,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className: "space-y-2",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "h3",
                                  {
                                    className:
                                      "px-2 text-xs font-black text-muted-foreground uppercase tracking-widest",
                                    children: "Client Portal",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                    lineNumber: 101,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "space-y-1",
                                    children:
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$nav$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "clientSpecificNavItems"
                                      ].map((item) =>
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "default"
                                          ],
                                          {
                                            href: item.href,
                                            className: (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "cn"
                                            ])(
                                              "flex items-center gap-3 px-3 py-2 text-sm font-bold transition-all border-2 rounded-md hover:translate-x-1",
                                              pathname.startsWith(item.href)
                                                ? "bg-primary text-primary-foreground border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                                : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-muted hover:border-black/10",
                                            ),
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                item.icon,
                                                {
                                                  className: "w-4 h-4",
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                                  lineNumber: 116,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              item.label,
                                            ],
                                          },
                                          item.href,
                                          true,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                            lineNumber: 106,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                      ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                    lineNumber: 104,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                              lineNumber: 100,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                    )
                  : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$nav$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "navGroups"
                    ].map((group) => {
                      const filteredItems = group.items.filter((item) => {
                        if (isStaff) {
                          return userAllowedPages.includes(item.href);
                        }
                        return !(item.adminOnly && !isAdmin);
                      });
                      if (filteredItems.length === 0) return null;
                      return /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "space-y-2",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "h3",
                              {
                                className:
                                  "px-2 text-xs font-black text-muted-foreground uppercase tracking-widest",
                                children: group.title,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                lineNumber: 136,
                                columnNumber: 17,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "space-y-1",
                                children: filteredItems.map((item) =>
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "default"
                                    ],
                                    {
                                      href: item.href,
                                      className: (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "cn"
                                      ])(
                                        "flex items-center gap-3 px-3 py-2 text-sm font-bold transition-all border-2 rounded-md hover:translate-x-1",
                                        pathname === item.href ||
                                          pathname.startsWith(item.href + "/")
                                          ? "bg-primary text-primary-foreground border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                          : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-muted hover:border-black/10",
                                      ),
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          item.icon,
                                          {
                                            className: "w-4 h-4",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                            lineNumber: 152,
                                            columnNumber: 23,
                                          },
                                          this,
                                        ),
                                        item.label,
                                      ],
                                    },
                                    item.href,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                      lineNumber: 141,
                                      columnNumber: 21,
                                    },
                                    this,
                                  ),
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                lineNumber: 139,
                                columnNumber: 17,
                              },
                              this,
                            ),
                          ],
                        },
                        group.title,
                        true,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                          lineNumber: 135,
                          columnNumber: 15,
                        },
                        this,
                      );
                    }),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                lineNumber: 71,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "p-4 border-t-2 border-black bg-muted/30",
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className: "flex items-center gap-3",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "Avatar"
                        ],
                        {
                          className:
                            "h-10 w-10 border-2 border-black rounded-lg",
                          children: [
                            user?.avatar
                              ? /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "AvatarImage"
                                  ],
                                  {
                                    src: user.avatar,
                                    alt: user.name,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                    lineNumber: 168,
                                    columnNumber: 15,
                                  },
                                  this,
                                )
                              : userAvatar
                                ? /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "AvatarImage"
                                    ],
                                    {
                                      src: userAvatar.imageUrl,
                                      alt: "User Avatar",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                      lineNumber: 170,
                                      columnNumber: 15,
                                    },
                                    this,
                                  )
                                : null,
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "AvatarFallback"
                              ],
                              {
                                className:
                                  "rounded-lg bg-primary text-primary-foreground font-black",
                                children:
                                  user?.name?.charAt(0).toUpperCase() ?? "U",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                lineNumber: 172,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                          lineNumber: 166,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "flex-1 overflow-hidden",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "p",
                              {
                                className: "font-bold truncate text-sm",
                                children: user.name,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                lineNumber: 177,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "p",
                              {
                                className:
                                  "text-xs text-muted-foreground uppercase tracking-wider font-bold truncate",
                                children: user.role,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                lineNumber: 178,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                          lineNumber: 176,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "Button"
                        ],
                        {
                          onClick: logout,
                          variant: "ghost",
                          size: "icon",
                          className:
                            "h-8 w-8 hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__[
                                "LifeBuoy"
                              ],
                              {
                                className: "w-4 h-4",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                lineNumber: 188,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "span",
                              {
                                className: "sr-only",
                                children: "Logout",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                                lineNumber: 189,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                          lineNumber: 182,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                    lineNumber: 165,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
                lineNumber: 164,
                columnNumber: 7,
              },
              this,
            ),
          ],
        },
        void 0,
        true,
        {
          fileName:
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx",
          lineNumber: 57,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/sheet.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Sheet",
      () => Sheet,
      "SheetClose",
      () => SheetClose,
      "SheetContent",
      () => SheetContent,
      "SheetDescription",
      () => SheetDescription,
      "SheetFooter",
      () => SheetFooter,
      "SheetHeader",
      () => SheetHeader,
      "SheetOverlay",
      () => SheetOverlay,
      "SheetPortal",
      () => SheetPortal,
      "SheetTitle",
      () => SheetTitle,
      "SheetTrigger",
      () => SheetTrigger,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/utils.ts [app-ssr] (ecmascript)",
      );
    ("use client");
    const Sheet =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Root"
      ];
    const SheetTrigger =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Trigger"
      ];
    const SheetClose =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Close"
      ];
    const SheetPortal =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Portal"
      ];
    const SheetOverlay =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Overlay"
          ],
          {
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              className,
            ),
            ...props,
            ref: ref,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/sheet.tsx",
            lineNumber: 22,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SheetOverlay.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Overlay"
      ].displayName;
    const sheetVariants = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "cva"
    ])(
      "fixed z-50 gap-4 bg-background p-6 transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
      {
        variants: {
          side: {
            top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
            bottom:
              "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
            right:
              "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
          },
        },
        defaultVariants: {
          side: "right",
        },
      },
    );
    const SheetContent =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ side = "right", className, children, ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          SheetPortal,
          {
            children: [
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                SheetOverlay,
                {},
                void 0,
                false,
                {
                  fileName:
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/sheet.tsx",
                  lineNumber: 62,
                  columnNumber: 5,
                },
                ("TURBOPACK compile-time value", void 0),
              ),
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "Content"
                ],
                {
                  ref: ref,
                  className: (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "cn"
                  ])(
                    sheetVariants({
                      side,
                    }),
                    className,
                  ),
                  ...props,
                  children: [
                    children,
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "Close"
                      ],
                      {
                        className:
                          "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                              "X"
                            ],
                            {
                              className: "h-4 w-4",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/sheet.tsx",
                              lineNumber: 70,
                              columnNumber: 9,
                            },
                            ("TURBOPACK compile-time value", void 0),
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "span",
                            {
                              className: "sr-only",
                              children: "Close",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/sheet.tsx",
                              lineNumber: 71,
                              columnNumber: 9,
                            },
                            ("TURBOPACK compile-time value", void 0),
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName:
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/sheet.tsx",
                        lineNumber: 69,
                        columnNumber: 7,
                      },
                      ("TURBOPACK compile-time value", void 0),
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName:
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/sheet.tsx",
                  lineNumber: 63,
                  columnNumber: 5,
                },
                ("TURBOPACK compile-time value", void 0),
              ),
            ],
          },
          void 0,
          true,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/sheet.tsx",
            lineNumber: 61,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SheetContent.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Content"
      ].displayName;
    const SheetHeader = ({ className, ...props }) =>
      /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "cn"
          ])("flex flex-col space-y-2 text-center sm:text-left", className),
          ...props,
        },
        void 0,
        false,
        {
          fileName:
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/sheet.tsx",
          lineNumber: 82,
          columnNumber: 3,
        },
        ("TURBOPACK compile-time value", void 0),
      );
    SheetHeader.displayName = "SheetHeader";
    const SheetFooter = ({ className, ...props }) =>
      /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "cn"
          ])(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className,
          ),
          ...props,
        },
        void 0,
        false,
        {
          fileName:
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/sheet.tsx",
          lineNumber: 96,
          columnNumber: 3,
        },
        ("TURBOPACK compile-time value", void 0),
      );
    SheetFooter.displayName = "SheetFooter";
    const SheetTitle =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Title"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("text-lg font-semibold text-foreground", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/sheet.tsx",
            lineNumber: 110,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SheetTitle.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Title"
      ].displayName;
    const SheetDescription =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Description"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("text-sm text-muted-foreground", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/sheet.tsx",
            lineNumber: 122,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SheetDescription.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Description"
      ].displayName;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["MobileHeader", () => MobileHeader]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/api-fetch.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/navigation.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/sheet.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/avatar.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/life-buoy.js [app-ssr] (ecmascript) <export default as LifeBuoy>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/utils.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/hooks/use-auth.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$nav$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/nav-config.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$placeholder$2d$images$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/placeholder-images.ts [app-ssr] (ecmascript)",
      );
    ("use client");
    const userAvatar =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$placeholder$2d$images$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "PlaceHolderImages"
      ].find((p) => p.id === "user-avatar-1");
    function MobileHeader() {
      const [isOpen, setIsOpen] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const pathname = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "usePathname"
      ])();
      const { user, logout } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useAuth"
      ])();
      const [globalClientPages, setGlobalClientPages] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$nav$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "defaultClientAllowed"
        ],
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "apiFetch"
        ])("/api/settings/client-sidebar")
          .then((r) => r.json())
          .then((data) => {
            if (Array.isArray(data.allowedClientPages)) {
              setGlobalClientPages(data.allowedClientPages);
            }
          })
          .catch(() => {});
      }, []);
      const close = () => setIsOpen(false);
      const isClient = user?.role === "client";
      const isAdmin = user?.role === "admin";
      const isStaff = user?.role === "staff";
      const userAllowedPages =
        user?.allowedPages !== undefined
          ? user.allowedPages
          : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$nav$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "defaultStaffAllowed"
            ];
      const visibleClientNavItems =
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$nav$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "clientNavItems"
        ].filter((item) => globalClientPages.includes(item.href));
      const linkClass = (href, exact = false) =>
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "cn"
        ])(
          "flex items-center gap-3 px-3 py-2.5 text-sm font-bold transition-all border-2 rounded-md",
          (
            exact
              ? pathname === href
              : pathname === href || pathname.startsWith(href + "/")
          )
            ? "bg-primary text-primary-foreground border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-muted hover:border-black/10",
        );
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "Fragment"
        ],
        {
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "header",
            {
              className:
                "sticky top-0 z-40 flex h-14 items-center justify-between border-b-2 border-black bg-background px-4 md:hidden",
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "default"
                  ],
                  {
                    href: "/dashboard",
                    className: "font-black tracking-tighter text-lg",
                    children: "Kalahanu Tech",
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                    lineNumber: 70,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "Sheet"
                  ],
                  {
                    open: isOpen,
                    onOpenChange: setIsOpen,
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "SheetTrigger"
                        ],
                        {
                          asChild: true,
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "Button"
                            ],
                            {
                              variant: "outline",
                              size: "icon",
                              className: "h-9 w-9 border-2 border-black",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__[
                                    "Menu"
                                  ],
                                  {
                                    className: "h-5 w-5",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                    lineNumber: 80,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "span",
                                  {
                                    className: "sr-only",
                                    children: "Toggle Menu",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                              lineNumber: 75,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                          lineNumber: 74,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "SheetContent"
                        ],
                        {
                          side: "left",
                          className:
                            "w-[280px] p-0 border-r-2 border-black bg-background flex flex-col",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className:
                                  "p-5 border-b-2 border-black bg-white/50",
                                children: /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "default"
                                  ],
                                  {
                                    href: "/dashboard",
                                    onClick: close,
                                    className: "block",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "img",
                                        {
                                          src: "../assets/images/logo-transparent.png",
                                          alt: "Kalahanu Tech Logo",
                                          className: "mx-auto mb-1 w-12 h-12",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                          lineNumber: 91,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "h1",
                                        {
                                          className:
                                            "text-xl font-black tracking-tighter text-center",
                                          children: "Kalahanu Tech",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                          lineNumber: 96,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "p",
                                        {
                                          className:
                                            "text-xs text-muted-foreground font-bold text-center",
                                          children: "Studios CRM",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                          lineNumber: 99,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                    lineNumber: 90,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                lineNumber: 89,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "nav",
                              {
                                className:
                                  "flex-1 overflow-y-auto p-3 space-y-5",
                                children: isClient
                                  ? /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "Fragment"
                                      ],
                                      {
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className: "space-y-1",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "h3",
                                                  {
                                                    className:
                                                      "px-2 text-xs font-black text-muted-foreground uppercase tracking-widest mb-1",
                                                    children: "Dashboard",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                    lineNumber: 110,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                visibleClientNavItems.map(
                                                  (item) =>
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "default"
                                                      ],
                                                      {
                                                        href: item.href,
                                                        onClick: close,
                                                        className: linkClass(
                                                          item.href,
                                                        ),
                                                        children: [
                                                          /*#__PURE__*/ (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            item.icon,
                                                            {
                                                              className:
                                                                "w-4 h-4 shrink-0",
                                                            },
                                                            void 0,
                                                            false,
                                                            {
                                                              fileName:
                                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                              lineNumber: 120,
                                                              columnNumber: 25,
                                                            },
                                                            this,
                                                          ),
                                                          item.label,
                                                        ],
                                                      },
                                                      item.href,
                                                      true,
                                                      {
                                                        fileName:
                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 23,
                                                      },
                                                      this,
                                                    ),
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                              lineNumber: 109,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className: "space-y-1",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "h3",
                                                  {
                                                    className:
                                                      "px-2 text-xs font-black text-muted-foreground uppercase tracking-widest mb-1",
                                                    children: "Client Portal",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$nav$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "clientSpecificNavItems"
                                                ].map((item) =>
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "default"
                                                    ],
                                                    {
                                                      href: item.href,
                                                      onClick: close,
                                                      className: linkClass(
                                                        item.href,
                                                      ),
                                                      children: [
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          item.icon,
                                                          {
                                                            className:
                                                              "w-4 h-4 shrink-0",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                            lineNumber: 137,
                                                            columnNumber: 25,
                                                          },
                                                          this,
                                                        ),
                                                        item.label,
                                                      ],
                                                    },
                                                    item.href,
                                                    true,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                      lineNumber: 131,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                ),
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                              lineNumber: 126,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      void 0,
                                      true,
                                    )
                                  : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$nav$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "navGroups"
                                    ].map((group) => {
                                      const filteredItems = group.items.filter(
                                        (item) => {
                                          if (isStaff)
                                            return userAllowedPages.includes(
                                              item.href,
                                            );
                                          return !(item.adminOnly && !isAdmin);
                                        },
                                      );
                                      if (filteredItems.length === 0)
                                        return null;
                                      return /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className: "space-y-1",
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "h3",
                                              {
                                                className:
                                                  "px-2 text-xs font-black text-muted-foreground uppercase tracking-widest mb-1",
                                                children: group.title,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                lineNumber: 153,
                                                columnNumber: 23,
                                              },
                                              this,
                                            ),
                                            filteredItems.map((item) =>
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "default"
                                                ],
                                                {
                                                  href: item.href,
                                                  onClick: close,
                                                  className: linkClass(
                                                    item.href,
                                                  ),
                                                  children: [
                                                    /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      item.icon,
                                                      {
                                                        className:
                                                          "w-4 h-4 shrink-0",
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 27,
                                                      },
                                                      this,
                                                    ),
                                                    item.label,
                                                  ],
                                                },
                                                item.href,
                                                true,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                  lineNumber: 157,
                                                  columnNumber: 25,
                                                },
                                                this,
                                              ),
                                            ),
                                          ],
                                        },
                                        group.title,
                                        true,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                          lineNumber: 152,
                                          columnNumber: 21,
                                        },
                                        this,
                                      );
                                    }),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                lineNumber: 106,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            user &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "p-4 border-t-2 border-black bg-muted/30",
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className: "flex items-center gap-3",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "Avatar"
                                          ],
                                          {
                                            className:
                                              "h-9 w-9 border-2 border-black rounded-lg shrink-0",
                                            children: [
                                              user.avatar
                                                ? /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "AvatarImage"
                                                    ],
                                                    {
                                                      src: user.avatar,
                                                      alt: user.name,
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                      lineNumber: 179,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  )
                                                : userAvatar
                                                  ? /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "AvatarImage"
                                                      ],
                                                      {
                                                        src: userAvatar.imageUrl,
                                                        alt: "User Avatar",
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 23,
                                                      },
                                                      this,
                                                    )
                                                  : null,
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "AvatarFallback"
                                                ],
                                                {
                                                  className:
                                                    "rounded-lg bg-primary text-primary-foreground font-black text-sm",
                                                  children:
                                                    user.name
                                                      ?.charAt(0)
                                                      .toUpperCase() ?? "U",
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                  lineNumber: 186,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                            lineNumber: 177,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "div",
                                          {
                                            className: "flex-1 overflow-hidden",
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "p",
                                                {
                                                  className:
                                                    "font-bold truncate text-sm",
                                                  children: user.name,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                  lineNumber: 191,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "p",
                                                {
                                                  className:
                                                    "text-xs text-muted-foreground uppercase tracking-wider font-bold",
                                                  children: user.role,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                  lineNumber: 192,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                            lineNumber: 190,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "Button"
                                          ],
                                          {
                                            onClick: () => {
                                              logout();
                                              close();
                                            },
                                            variant: "ghost",
                                            size: "icon",
                                            className:
                                              "h-8 w-8 hover:bg-destructive hover:text-destructive-foreground rounded-md",
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__[
                                                  "LifeBuoy"
                                                ],
                                                {
                                                  className: "w-4 h-4",
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                  lineNumber: 205,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "span",
                                                {
                                                  className: "sr-only",
                                                  children: "Logout",
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                                  lineNumber: 206,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                            lineNumber: 196,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                      lineNumber: 176,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                                  lineNumber: 175,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                          lineNumber: 84,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
                    lineNumber: 73,
                    columnNumber: 9,
                  },
                  this,
                ),
              ],
            },
            void 0,
            true,
            {
              fileName:
                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx",
              lineNumber: 69,
              columnNumber: 7,
            },
            this,
          ),
        },
        void 0,
        false,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/client-portal-wrapper.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["ClientPortalWrapper", () => ClientPortalWrapper]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/hooks/use-auth.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/sidebar.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$layout$2f$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/header.tsx [app-ssr] (ecmascript)",
      );
    ("use client");
    function ClientPortalWrapper({ children }) {
      const { user } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useAuth"
      ])();
      const isClient = user?.role === "client";
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "min-h-screen bg-background text-foreground font-body",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "print:hidden",
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "Sidebar"
                  ],
                  {},
                  void 0,
                  false,
                  {
                    fileName:
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/client-portal-wrapper.tsx",
                    lineNumber: 19,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/client-portal-wrapper.tsx",
                lineNumber: 18,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "md:pl-60 lg:pl-72 print:pl-0",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "print:hidden",
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$layout$2f$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "MobileHeader"
                        ],
                        {},
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/client-portal-wrapper.tsx",
                          lineNumber: 23,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/client-portal-wrapper.tsx",
                      lineNumber: 22,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "main",
                    {
                      className: "p-4 sm:p-6 lg:p-8 print:p-0",
                      children: children,
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/client-portal-wrapper.tsx",
                      lineNumber: 25,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/client-portal-wrapper.tsx",
                lineNumber: 21,
                columnNumber: 7,
              },
              this,
            ),
          ],
        },
        void 0,
        true,
        {
          fileName:
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/layout/client-portal-wrapper.tsx",
          lineNumber: 17,
          columnNumber: 5,
        },
        this,
      );
    }
  },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a94095f8._.js.map
