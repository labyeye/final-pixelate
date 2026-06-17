module.exports = [
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/input.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["Input", () => Input]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/utils.ts [app-ssr] (ecmascript)",
      );
    const Input =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, type, ...props }, ref) => {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "input",
          {
            type: type,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "flex h-14 w-full rounded-none border-2 border-foreground bg-background px-4 py-3 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className,
            ),
            ref: ref,
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/input.tsx",
            lineNumber: 8,
            columnNumber: 7,
          },
          ("TURBOPACK compile-time value", void 0),
        );
      });
    Input.displayName = "Input";
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/social-media-planner.ts [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "CONTENT_TYPES",
      () => CONTENT_TYPES,
      "POST_STATUSES",
      () => POST_STATUSES,
      "SOCIAL_PLATFORMS",
      () => SOCIAL_PLATFORMS,
      "fetchSocialAccount",
      () => fetchSocialAccount,
      "formatAccountDisplay",
      () => formatAccountDisplay,
      "getPlatformIcon",
      () => getPlatformIcon,
      "isSameDate",
      () => isSameDate,
      "toDateTime",
      () => toDateTime,
    ]);
    const SOCIAL_PLATFORMS = [
      "Instagram",
      "Facebook",
      "LinkedIn",
      "X / Twitter",
      "YouTube Shorts",
      "WhatsApp Channel",
      "Google My Business",
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
      "Educational Post",
    ];
    const POST_STATUSES = [
      "Draft",
      "Ready",
      "Scheduled",
      "Posted",
      "Missed",
      "Failed",
      "Cancelled",
    ];
    const toDateTime = (scheduledDate, scheduledTime) => {
      if (!scheduledDate) return null;
      const time =
        scheduledTime && scheduledTime.trim() ? scheduledTime : "00:00";
      const date = new Date(`${scheduledDate}T${time}:00+05:30`);
      return Number.isNaN(date.getTime()) ? null : date;
    };
    const isSameDate = (a, b) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
    const fetchSocialAccount = async (accountId) => {
      try {
        const res = await fetch(`/api/social-media-accounts?id=${accountId}`, {
          cache: "no-store",
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
    const formatAccountDisplay = (account) => {
      if (!account) return "(No Account)";
      return `@${account.handle}`;
    };
    const getPlatformIcon = (platform) => {
      const icons = {
        Instagram: "IG",
        Facebook: "FB",
        LinkedIn: "IN",
        "X / Twitter": "X",
        "YouTube Shorts": "YT",
        "WhatsApp Channel": "WA",
        "Google My Business": "G",
      };
      return icons[platform] || "SM";
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["ClientPicker", () => ClientPicker]);
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
    ("use client");
    const STORAGE_KEY = "selectedClientId";
    function ClientPicker({ onClientSelected, onClientsLoaded }) {
      const [clients, setClients] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [selectedId, setSelectedId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(true);
      const [error, setError] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        const loadClients = async () => {
          try {
            setLoading(true);
            const res = await (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "apiFetch"
            ])("/api/clients", {
              cache: "no-store",
            });
            if (!res.ok) throw new Error("Failed to fetch clients");
            const data = await res.json();
            const clientList = Array.isArray(data) ? data : [];
            setClients(clientList);
            onClientsLoaded?.(clientList);
            const stored = ("TURBOPACK compile-time falsy", 0)
              ? "TURBOPACK unreachable"
              : null;
            if (
              stored &&
              clientList.some((c) => (c._id || c.id) === stored)
            ) //TURBOPACK unreachable
            ;
          } catch (e) {
            console.error(e);
            setError("Failed to load clients");
          } finally {
            setLoading(false);
          }
        };
        loadClients();
      }, [onClientSelected, onClientsLoaded]);
      const handleChange = (clientId) => {
        setSelectedId(clientId);
        if (("TURBOPACK compile-time falsy", 0)) //TURBOPACK unreachable
        ;
        onClientSelected(clientId);
      };
      if (loading) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            className: "flex items-center gap-2",
            children: [
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "label",
                {
                  className: "font-semibold",
                  children: "Select Client:",
                },
                void 0,
                false,
                {
                  fileName:
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx",
                  lineNumber: 71,
                  columnNumber: 9,
                },
                this,
              ),
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "select",
                {
                  disabled: true,
                  className: "border rounded-md px-3 py-2 bg-gray-100",
                  children: /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "option",
                    {
                      children: "Loading clients...",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx",
                      lineNumber: 73,
                      columnNumber: 11,
                    },
                    this,
                  ),
                },
                void 0,
                false,
                {
                  fileName:
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx",
                  lineNumber: 72,
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
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx",
            lineNumber: 70,
            columnNumber: 7,
          },
          this,
        );
      }
      if (error) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            className: "flex items-center gap-2 text-red-600",
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "span",
              {
                className: "text-sm",
                children: error,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx",
                lineNumber: 82,
                columnNumber: 9,
              },
              this,
            ),
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx",
            lineNumber: 81,
            columnNumber: 7,
          },
          this,
        );
      }
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "flex items-center gap-2",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "label",
              {
                className: "font-semibold text-sm",
                children: "Select Client:",
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx",
                lineNumber: 89,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "select",
              {
                value: selectedId,
                onChange: (e) => handleChange(e.target.value),
                className: "border rounded-md px-3 py-2 min-w-[200px]",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "option",
                    {
                      value: "",
                      children: "-- Choose a client --",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx",
                      lineNumber: 95,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  clients.map((client) =>
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "option",
                      {
                        value: String(client._id || client.id),
                        children: client.name,
                      },
                      client._id || client.id,
                      false,
                      {
                        fileName:
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx",
                        lineNumber: 97,
                        columnNumber: 11,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx",
                lineNumber: 90,
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
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx",
          lineNumber: 88,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/textarea.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["Textarea", () => Textarea]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/utils.ts [app-ssr] (ecmascript)",
      );
    const Textarea =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) => {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "textarea",
          {
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "flex min-h-[80px] w-full rounded-none border-2 border-foreground bg-background px-4 py-3 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className,
            ),
            ref: ref,
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/textarea.tsx",
            lineNumber: 10,
            columnNumber: 5,
          },
          ("TURBOPACK compile-time value", void 0),
        );
      });
    Textarea.displayName = "Textarea";
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/Instagram_icon.png (static in ecmascript, tag client)",
  (__turbopack_context__) => {
    __turbopack_context__.v("/_next/static/media/Instagram_icon.8959c2e1.png");
  },
  '[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/Instagram_icon.png.mjs { IMAGE => "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/Instagram_icon.png (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)',
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => __TURBOPACK__default__export__]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$Instagram_icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/Instagram_icon.png (static in ecmascript, tag client)",
      );
    const __TURBOPACK__default__export__ = {
      src: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$Instagram_icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__[
        "default"
      ],
      width: 5001,
      height: 5001,
      blurWidth: 8,
      blurHeight: 8,
      blurDataURL:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR42gEIAff+AKag4otmX8zxb2HK/4Fhx/+PWsP/l06//55Gv/HJktqLAH1Ku/Gke8v/x5bP/82Oyf/SjMn/2JnR/8h0xv+1QbTxAJlJqf/Qk8f/v0ia/9R2s//YeLX/3X25/+OYy//HQKf/ALhOlv/fj7T/3nmj/+Z2oP/mdKP/5Har/+eJuv/TRJ7/ANdjcv/voJz/8JCG//CEjf/ufZP/63Se/+uIs//aRZP/AOt7Tv/4tpP/94ZF//qidf/3lHz/7VVl/++Qsf/dPoj/APeZR/H8wX3//c6Z//3Dkf/7tJD/+Keb/+13lf/eO4LxAP3WoYv+y27x/tN5//7NeP/8tWn/9oZY/+lTZPHsj7OL7IC7K1reCWMAAAAASUVORK5CYII=",
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/facebook-logo-icon-fb-app-transparent-background-premium-social-media-design-for-digital-download-free-png.webp (static in ecmascript, tag client)",
  (__turbopack_context__) => {
    __turbopack_context__.v(
      "/_next/static/media/facebook-logo-icon-fb-app-transparent-background-premium-social-media-design-for-digital-download-free-png.f888baa9.webp",
    );
  },
  '[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/facebook-logo-icon-fb-app-transparent-background-premium-social-media-design-for-digital-download-free-png.webp.mjs { IMAGE => "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/facebook-logo-icon-fb-app-transparent-background-premium-social-media-design-for-digital-download-free-png.webp (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)',
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => __TURBOPACK__default__export__]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$facebook$2d$logo$2d$icon$2d$fb$2d$app$2d$transparent$2d$background$2d$premium$2d$social$2d$media$2d$design$2d$for$2d$digital$2d$download$2d$free$2d$png$2e$webp__$28$static__in__ecmascript$2c$__tag__client$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/facebook-logo-icon-fb-app-transparent-background-premium-social-media-design-for-digital-download-free-png.webp (static in ecmascript, tag client)",
      );
    const __TURBOPACK__default__export__ = {
      src: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$facebook$2d$logo$2d$icon$2d$fb$2d$app$2d$transparent$2d$background$2d$premium$2d$social$2d$media$2d$design$2d$for$2d$digital$2d$download$2d$free$2d$png$2e$webp__$28$static__in__ecmascript$2c$__tag__client$29$__[
        "default"
      ],
      width: 350,
      height: 350,
      blurWidth: 8,
      blurHeight: 8,
      blurDataURL:
        "data:image/webp;base64,UklGRkQBAABXRUJQVlA4TDgBAAAvB8ABEM1VICICHggIDgIAAIAranoAAAMwBAYEAAACCQAAAAEAAAAAggAAYBIAAMAADAkAAFoG/BAAAB4ICAoDAADA+R/wEwAAjTEhUQAAANgAAAAAAAAAAAAAAABAMAAGBgQgKAAA8CTbPBAQFAYAAIDzP8oiAACoIQABgQEwMAAAAAAAAAAAAAAAABAAAAB42NAMFABA84N5ICAmEAAAAOd/g4DBPwAAAAAAAD4AAAMELwAAAAAAkGCAAAAEAAAAAAAAggHBEhCAn6h/fck2PeVXX7KJ+gdAXU3fnA9f721sLY7l2t3VVAHUDKfdTxn9JdYOaT9TzHAKUHv5sGtnWF4afgBqEY13LvdpIe++5vfaW0QDQJNrOxy17eHsR5QeztqSaxtAs5knJlnn9sxrv2dMsrKZBwA=",
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/linkedin-logo-linkedin-icon-transparent-free-png.webp (static in ecmascript, tag client)",
  (__turbopack_context__) => {
    __turbopack_context__.v(
      "/_next/static/media/linkedin-logo-linkedin-icon-transparent-free-png.3ac09b4e.webp",
    );
  },
  '[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/linkedin-logo-linkedin-icon-transparent-free-png.webp.mjs { IMAGE => "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/linkedin-logo-linkedin-icon-transparent-free-png.webp (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)',
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => __TURBOPACK__default__export__]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$linkedin$2d$logo$2d$linkedin$2d$icon$2d$transparent$2d$free$2d$png$2e$webp__$28$static__in__ecmascript$2c$__tag__client$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/linkedin-logo-linkedin-icon-transparent-free-png.webp (static in ecmascript, tag client)",
      );
    const __TURBOPACK__default__export__ = {
      src: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$linkedin$2d$logo$2d$linkedin$2d$icon$2d$transparent$2d$free$2d$png$2e$webp__$28$static__in__ecmascript$2c$__tag__client$29$__[
        "default"
      ],
      width: 980,
      height: 980,
      blurWidth: 8,
      blurHeight: 8,
      blurDataURL:
        "data:image/webp;base64,UklGRjABAABXRUJQVlA4TCMBAAAvB8ABEM1VICICHghaDgIAAIAH4GAABmAgKAFACQCCAAAAAAAAAAACABgFAACACgQACMAAgAPwDwEA4IGgpTAAAACc/wONPwBGCkgABQAAAAAAAAAAAAAAAAAAAAAAmAGBAEBBEACxA+CBoOUgAAAAnP8DcGYAA+EAwACDEQAAAAAAAAAAAAAAAAAAAAAAABUwCWwcAPwo8EBATgAAAADO/4IAAHgAAAAABhgAQECAAAAAAAAAAAECAgAYYAAAAAAMAICBBAbA38xUpi+ZmQDCzLT1etfW3vLub/76NTMBKO9i/ck+xDmnPOb4J8+7GEAkiS4s0v1SngAgmo98ri/u4f2urS/3R/ORAHKpznqePd+71mMf5TouFUC4VF96vlwqAAEA",
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/white-square-bordered-youtube-logo-on-transparent-background-free-png.webp (static in ecmascript, tag client)",
  (__turbopack_context__) => {
    __turbopack_context__.v(
      "/_next/static/media/white-square-bordered-youtube-logo-on-transparent-background-free-png.f0f4ec0d.webp",
    );
  },
  '[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/white-square-bordered-youtube-logo-on-transparent-background-free-png.webp.mjs { IMAGE => "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/white-square-bordered-youtube-logo-on-transparent-background-free-png.webp (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)',
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => __TURBOPACK__default__export__]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$white$2d$square$2d$bordered$2d$youtube$2d$logo$2d$on$2d$transparent$2d$background$2d$free$2d$png$2e$webp__$28$static__in__ecmascript$2c$__tag__client$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/white-square-bordered-youtube-logo-on-transparent-background-free-png.webp (static in ecmascript, tag client)",
      );
    const __TURBOPACK__default__export__ = {
      src: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$white$2d$square$2d$bordered$2d$youtube$2d$logo$2d$on$2d$transparent$2d$background$2d$free$2d$png$2e$webp__$28$static__in__ecmascript$2c$__tag__client$29$__[
        "default"
      ],
      width: 350,
      height: 350,
      blurWidth: 8,
      blurHeight: 8,
      blurDataURL:
        "data:image/webp;base64,UklGRgABAABXRUJQVlA4TPQAAAAvB8ABEM1VICICHgiADQIAAID3AAAAxtGBAwAAAKAHAUQBFMABAHCAAjgQgFoAAAAAKGA4AwAANH4AAMADGYBBAAAAOP9dAQUAgAMAAAAAAAjACwAAcAoAnQMAAD0gAAAAAAAAcAAAHIDCAwExgQAAADj/awBQAAMQAAAEAAB6AAAEAAAAAAAAIAAAfAAAIAAAGIABFACsbAhQq2qiIIIYc6ApTLRuf8GwkgnUqm5peJTjzPuVn724tXWqJjmmULk2zkSo5JhaolD/GZlQqCJMfzEzfkwPMWP6E0HsG9u3s5a73bd/zzs2Meaz4fXBV/zfF4M5",
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/google-my-business-logo.svg (static in ecmascript, tag client)",
  (__turbopack_context__) => {
    __turbopack_context__.v(
      "/_next/static/media/google-my-business-logo.7aa38aa9.svg",
    );
  },
  '[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/google-my-business-logo.svg.mjs { IMAGE => "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/google-my-business-logo.svg (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)',
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => __TURBOPACK__default__export__]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$google$2d$my$2d$business$2d$logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/google-my-business-logo.svg (static in ecmascript, tag client)",
      );
    const __TURBOPACK__default__export__ = {
      src: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$google$2d$my$2d$business$2d$logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__[
        "default"
      ],
      width: 2500,
      height: 2185,
      blurWidth: 0,
      blurHeight: 0,
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "PlatformIcon",
      () => PlatformIcon,
      "PlatformOption",
      () => PlatformOption,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/image.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/twitter.js [app-ssr] (ecmascript) <export default as Twitter>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$Instagram_icon$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$Instagram_icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/Instagram_icon.png.mjs { IMAGE => "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/Instagram_icon.png (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)',
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$facebook$2d$logo$2d$icon$2d$fb$2d$app$2d$transparent$2d$background$2d$premium$2d$social$2d$media$2d$design$2d$for$2d$digital$2d$download$2d$free$2d$png$2e$webp$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$facebook$2d$logo$2d$icon$2d$fb$2d$app$2d$transparent$2d$background$2d$premium$2d$social$2d$media$2d$design$2d$for$2d$digital$2d$download$2d$free$2d$png$2e$webp__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/facebook-logo-icon-fb-app-transparent-background-premium-social-media-design-for-digital-download-free-png.webp.mjs { IMAGE => "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/facebook-logo-icon-fb-app-transparent-background-premium-social-media-design-for-digital-download-free-png.webp (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)',
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$linkedin$2d$logo$2d$linkedin$2d$icon$2d$transparent$2d$free$2d$png$2e$webp$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$linkedin$2d$logo$2d$linkedin$2d$icon$2d$transparent$2d$free$2d$png$2e$webp__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/linkedin-logo-linkedin-icon-transparent-free-png.webp.mjs { IMAGE => "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/linkedin-logo-linkedin-icon-transparent-free-png.webp (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)',
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$white$2d$square$2d$bordered$2d$youtube$2d$logo$2d$on$2d$transparent$2d$background$2d$free$2d$png$2e$webp$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$white$2d$square$2d$bordered$2d$youtube$2d$logo$2d$on$2d$transparent$2d$background$2d$free$2d$png$2e$webp__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/white-square-bordered-youtube-logo-on-transparent-background-free-png.webp.mjs { IMAGE => "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/white-square-bordered-youtube-logo-on-transparent-background-free-png.webp (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)',
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$google$2d$my$2d$business$2d$logo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$google$2d$my$2d$business$2d$logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/google-my-business-logo.svg.mjs { IMAGE => "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/images/social/google-my-business-logo.svg (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)',
      );
    ("use client");
    function PlatformIcon({ platform, size = "md", className = "" }) {
      const sizeMap = {
        sm: 16,
        md: 20,
        lg: 26,
      };
      const px = sizeMap[size];
      const imgClass = `flex-shrink-0 ${className}`;
      switch (platform) {
        case "Instagram":
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "default"
            ],
            {
              src: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$Instagram_icon$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$Instagram_icon$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__[
                "default"
              ],
              alt: "Instagram",
              width: px,
              height: px,
              className: imgClass,
            },
            void 0,
            false,
            {
              fileName:
                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx",
              lineNumber: 31,
              columnNumber: 9,
            },
            this,
          );
        case "Facebook":
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "default"
            ],
            {
              src: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$facebook$2d$logo$2d$icon$2d$fb$2d$app$2d$transparent$2d$background$2d$premium$2d$social$2d$media$2d$design$2d$for$2d$digital$2d$download$2d$free$2d$png$2e$webp$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$facebook$2d$logo$2d$icon$2d$fb$2d$app$2d$transparent$2d$background$2d$premium$2d$social$2d$media$2d$design$2d$for$2d$digital$2d$download$2d$free$2d$png$2e$webp__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__[
                "default"
              ],
              alt: "Facebook",
              width: px,
              height: px,
              className: imgClass,
            },
            void 0,
            false,
            {
              fileName:
                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx",
              lineNumber: 41,
              columnNumber: 9,
            },
            this,
          );
        case "LinkedIn":
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "default"
            ],
            {
              src: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$linkedin$2d$logo$2d$linkedin$2d$icon$2d$transparent$2d$free$2d$png$2e$webp$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$linkedin$2d$logo$2d$linkedin$2d$icon$2d$transparent$2d$free$2d$png$2e$webp__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__[
                "default"
              ],
              alt: "LinkedIn",
              width: px,
              height: px,
              className: imgClass,
            },
            void 0,
            false,
            {
              fileName:
                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx",
              lineNumber: 51,
              columnNumber: 9,
            },
            this,
          );
        case "YouTube Shorts":
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "default"
            ],
            {
              src: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$white$2d$square$2d$bordered$2d$youtube$2d$logo$2d$on$2d$transparent$2d$background$2d$free$2d$png$2e$webp$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$white$2d$square$2d$bordered$2d$youtube$2d$logo$2d$on$2d$transparent$2d$background$2d$free$2d$png$2e$webp__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__[
                "default"
              ],
              alt: "YouTube Shorts",
              width: px,
              height: px,
              className: imgClass,
            },
            void 0,
            false,
            {
              fileName:
                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx",
              lineNumber: 61,
              columnNumber: 9,
            },
            this,
          );
        case "Google My Business":
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "default"
            ],
            {
              src: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$google$2d$my$2d$business$2d$logo$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$images$2f$social$2f$google$2d$my$2d$business$2d$logo$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__[
                "default"
              ],
              alt: "Google My Business",
              width: px,
              height: px,
              className: imgClass,
            },
            void 0,
            false,
            {
              fileName:
                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx",
              lineNumber: 71,
              columnNumber: 9,
            },
            this,
          );
        case "X / Twitter":
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__[
              "Twitter"
            ],
            {
              size: px,
              className: `${className} flex-shrink-0`,
              strokeWidth: 2.5,
            },
            void 0,
            false,
            {
              fileName:
                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx",
              lineNumber: 81,
              columnNumber: 9,
            },
            this,
          );
        case "WhatsApp Channel":
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__[
              "MessageCircle"
            ],
            {
              size: px,
              className: `${className} flex-shrink-0`,
              strokeWidth: 2.5,
            },
            void 0,
            false,
            {
              fileName:
                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx",
              lineNumber: 89,
              columnNumber: 9,
            },
            this,
          );
        default:
          return null;
      }
    }
    function PlatformOption({ platform }) {
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "flex items-center gap-2",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              PlatformIcon,
              {
                platform: platform,
                size: "sm",
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx",
                lineNumber: 103,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "span",
              {
                children: platform,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx",
                lineNumber: 104,
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
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx",
          lineNumber: 102,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "MultiAccountSelector",
      () => MultiAccountSelector,
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
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx [app-ssr] (ecmascript)",
      );
    ("use client");
    function MultiAccountSelector({ clientId, platforms, value, onChange }) {
      const [accounts, setAccounts] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [showDropdown, setShowDropdown] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        if (!clientId) {
          setAccounts([]);
          return;
        }
        setLoading(true);
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "apiFetch"
        ])(`/api/social-media-accounts?clientId=${clientId}`)
          .then((res) => res.json())
          .then((data) => {
            setAccounts(Array.isArray(data) ? data : []);
          })
          .catch((err) => {
            console.error("Failed to load accounts:", err);
            setAccounts([]);
          })
          .finally(() => setLoading(false));
      }, [clientId]);
      const filteredAccounts =
        platforms.length > 0
          ? accounts.filter((acc) => platforms.includes(acc.platform))
          : accounts;
      const selectedAccounts = filteredAccounts.filter((acc) =>
        value.includes(acc._id || acc.id || ""),
      );
      const availableAccounts = filteredAccounts.filter(
        (acc) => !value.includes(acc._id || acc.id || ""),
      );
      const handleSelectAccount = (account) => {
        const accountId = account._id || account.id || "";
        const newIds = [...value, accountId];
        const handles = newIds
          .map(
            (id) => accounts.find((acc) => (acc._id || acc.id) === id)?.handle,
          )
          .filter(Boolean);
        onChange(newIds, handles);
        setShowDropdown(false);
      };
      const handleRemoveAccount = (accountId) => {
        const newIds = value.filter((id) => id !== accountId);
        const handles = newIds
          .map(
            (id) => accounts.find((acc) => (acc._id || acc.id) === id)?.handle,
          )
          .filter(Boolean);
        onChange(newIds, handles);
      };
      const groupedAvailable = availableAccounts.reduce((acc, account) => {
        const p = account.platform;
        if (!acc[p]) acc[p] = [];
        acc[p].push(account);
        return acc;
      }, {});
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "relative w-full",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className:
                  "border rounded-md p-2 mb-2 bg-gray-50 min-h-[36px] flex flex-wrap gap-2 items-center",
                children:
                  selectedAccounts.length === 0
                    ? /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "span",
                        {
                          className: "text-sm text-gray-400",
                          children: loading
                            ? "Loading accounts..."
                            : platforms.length === 0
                              ? "Select platforms above first"
                              : "Select accounts...",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                          lineNumber: 97,
                          columnNumber: 11,
                        },
                        this,
                      )
                    : selectedAccounts.map((acc) =>
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className:
                              "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "PlatformIcon"
                                ],
                                {
                                  platform: acc.platform,
                                  size: "sm",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                                  lineNumber: 110,
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
                                  children: acc.displayName || acc.handle,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                                  lineNumber: 111,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "button",
                                {
                                  onClick: () =>
                                    handleRemoveAccount(
                                      acc._id || acc.id || "",
                                    ),
                                  className: "hover:text-blue-900",
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                                      "X"
                                    ],
                                    {
                                      className: "h-3 w-3",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                                      lineNumber: 116,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                                  lineNumber: 112,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            ],
                          },
                          acc._id || acc.id,
                          true,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                            lineNumber: 106,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      ),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                lineNumber: 95,
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
                className: "relative",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "Button"
                    ],
                    {
                      onClick: () => setShowDropdown(!showDropdown),
                      variant: "outline",
                      className: "w-full text-left",
                      disabled:
                        loading ||
                        availableAccounts.length === 0 ||
                        platforms.length === 0,
                      children:
                        platforms.length === 0
                          ? "Select platforms first"
                          : availableAccounts.length === 0
                            ? "No more accounts available"
                            : `+ Add Account (${availableAccounts.length} available)`,
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                      lineNumber: 124,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  showDropdown &&
                    availableAccounts.length > 0 &&
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className:
                          "absolute z-10 top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-[240px] overflow-y-auto",
                        children: Object.entries(groupedAvailable).map(
                          ([platform, accs]) =>
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className:
                                        "px-3 py-1 bg-gray-100 text-xs font-bold text-gray-500 flex items-center gap-1 sticky top-0",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "PlatformIcon"
                                          ],
                                          {
                                            platform: platform,
                                            size: "sm",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                                            lineNumber: 142,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        platform,
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                                      lineNumber: 141,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  accs.map((acc) =>
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "button",
                                      {
                                        onClick: () => handleSelectAccount(acc),
                                        className:
                                          "w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-b-0 flex items-center gap-2",
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "div",
                                          {
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "div",
                                                {
                                                  className: "font-medium",
                                                  children:
                                                    acc.displayName ||
                                                    acc.handle,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                                                  lineNumber: 152,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "div",
                                                {
                                                  className:
                                                    "text-xs text-gray-500",
                                                  children: ["@", acc.handle],
                                                },
                                                void 0,
                                                true,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                                                  lineNumber: 155,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                                            lineNumber: 151,
                                            columnNumber: 21,
                                          },
                                          this,
                                        ),
                                      },
                                      acc._id || acc.id,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                                        lineNumber: 146,
                                        columnNumber: 19,
                                      },
                                      this,
                                    ),
                                  ),
                                ],
                              },
                              platform,
                              true,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                                lineNumber: 140,
                                columnNumber: 15,
                              },
                              this,
                            ),
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                        lineNumber: 138,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                lineNumber: 123,
                columnNumber: 7,
              },
              this,
            ),
            selectedAccounts.length > 0 &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "p",
                {
                  className: "text-xs text-green-600 mt-2",
                  children: [
                    "✓ This post will be shared to ",
                    selectedAccounts.length,
                    " account(s)",
                  ],
                },
                void 0,
                true,
                {
                  fileName:
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
                  lineNumber: 166,
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
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx",
          lineNumber: 94,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["AddPostModal", () => AddPostModal]);
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
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/input.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/textarea.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/social-media-planner.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$multi$2d$account$2d$selector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx [app-ssr] (ecmascript)",
      );
    ("use client");
    const CAPTION_LIMITS = {
      Instagram: 2200,
      Facebook: 63206,
      "X / Twitter": 280,
      LinkedIn: 3000,
      "YouTube Shorts": 5000,
      "WhatsApp Channel": 1024,
      "Google My Business": 1500,
    };
    const initialForm = {
      clientId: "",
      socialAccountId: "",
      socialAccountIds: [],
      title: "",
      platform: "Instagram",
      platforms: [],
      contentType: "Image Post",
      caption: "",
      hashtags: "",
      mediaFile: "",
      carouselMediaLinks: [],
      reelLink: "",
      reelCoverLink: "",
      scheduledDate: "",
      scheduledTime: "",
      assignedTo: "",
      status: "Draft",
      approvalStatus: "Pending",
      campaign: "",
      internalComments: "",
      notes: "",
    };
    function AddPostModal({
      isOpen,
      clientId,
      onClose,
      onSave,
      staffOptions,
      createdBy,
      editingPost,
    }) {
      const [form, setForm] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(initialForm);
      const [saving, setSaving] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [isAlreadyPosted, setIsAlreadyPosted] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [postedLinksByAccount, setPostedLinksByAccount] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])({});
      const [postedAccounts, setPostedAccounts] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const isEditing = !!editingPost;
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        if (isOpen) {
          if (editingPost) {
            const platforms =
              editingPost.platforms && editingPost.platforms.length > 0
                ? editingPost.platforms
                : editingPost.platform
                  ? [editingPost.platform]
                  : [];
            setForm({
              ...editingPost,
              platforms,
            });
          } else {
            setForm({
              ...initialForm,
              clientId,
            });
          }
          setIsAlreadyPosted(false);
          setPostedLinksByAccount({});
          setPostedAccounts([]);
        }
      }, [isOpen, clientId, editingPost]);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        if (!isAlreadyPosted) {
          setPostedAccounts([]);
          return;
        }
        const accIds = form.socialAccountIds || [];
        if (accIds.length === 0) {
          setPostedAccounts([]);
          return;
        }
        let cancelled = false;
        const fetchAccounts = async () => {
          try {
            const promises = accIds.map((id) => {
              const url = new URL(
                "/api/social-media-accounts",
                window.location.origin,
              );
              url.searchParams.set("id", id);
              return (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "apiFetch"
              ])(url.toString(), {
                cache: "no-store",
              }).then((res) => (res.ok ? res.json() : null));
            });
            const results = await Promise.all(promises);
            if (cancelled) return;
            const loaded = results
              .map((d) => (Array.isArray(d) ? d[0] : d))
              .filter(Boolean);
            setPostedAccounts(loaded);
          } catch (e) {
            console.error("Failed to fetch accounts for posted links:", e);
            if (!cancelled) setPostedAccounts([]);
          }
        };
        fetchAccounts();
        return () => {
          cancelled = true;
        };
      }, [isAlreadyPosted, form.socialAccountIds]);
      const handleChange = (key, value) => {
        setForm((prev) => ({
          ...prev,
          [key]: value,
        }));
      };
      const handlePlatformsChange = (selectedPlatforms) => {
        setForm((prev) => ({
          ...prev,
          platforms: selectedPlatforms,
          platform: selectedPlatforms[0] || prev.platform,
          socialAccountId: "",
          socialAccountIds: [],
        }));
      };
      const handleAccountsChange = (accountIds) => {
        setForm((prev) => ({
          ...prev,
          socialAccountIds: accountIds,
          socialAccountId: accountIds[0] || "",
        }));
      };
      const handleSave = async (saveAction) => {
        if (!form.title || !form.scheduledDate || !form.scheduledTime) {
          alert(
            isAlreadyPosted
              ? "Please fill title, posted date and time."
              : "Please fill title, scheduled date and time.",
          );
          return;
        }
        if (!form.platforms || form.platforms.length === 0) {
          alert("Please select at least one platform.");
          return;
        }
        const hasAccount =
          form.socialAccountIds && form.socialAccountIds.length > 0;
        if (!hasAccount) {
          alert("Please select at least one social account.");
          return;
        }
        if (!clientId) {
          alert("Please select a client first");
          return;
        }
        let postedAtIso;
        let firstPostedLink = "";
        let nonEmptyPostedLinks = {};
        if (saveAction === "posted") {
          const accIds = form.socialAccountIds || [];
          nonEmptyPostedLinks = Object.fromEntries(
            accIds
              .map((id) => [id, (postedLinksByAccount[id] || "").trim()])
              .filter(([, v]) => v.length > 0),
          );
          if (Object.keys(nonEmptyPostedLinks).length === 0) {
            alert("Please enter the posted link.");
            return;
          }
          firstPostedLink = Object.values(nonEmptyPostedLinks)[0] || "";
          const dt = new Date(
            `${form.scheduledDate}T${form.scheduledTime}:00+05:30`,
          );
          if (Number.isNaN(dt.getTime())) {
            alert("Invalid posted date or time.");
            return;
          }
          postedAtIso = dt.toISOString();
        }
        setSaving(true);
        try {
          const status =
            saveAction === "posted"
              ? "Posted"
              : saveAction === "schedule"
                ? "Scheduled"
                : "Draft";
          const payload = {
            ...form,
            clientId,
            status,
            createdBy: createdBy || "",
          };
          if (saveAction === "posted") {
            payload.postedAt = postedAtIso;
            payload.postedLink = firstPostedLink;
            payload.postedLinks = nonEmptyPostedLinks;
          }
          await onSave(payload);
          setForm(initialForm);
          setPostedLinksByAccount({});
          setIsAlreadyPosted(false);
          onClose();
        } catch (e) {
          console.error("Save error:", e);
          const errorMsg = e?.message || "Failed to save post";
          alert(errorMsg);
        } finally {
          setSaving(false);
        }
      };
      const fileToBase64 = (file) => {
        if (!file) return Promise.resolve("");
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };
      if (!isOpen) return null;
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className:
            "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "div",
            {
              className:
                "bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto",
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className:
                      "sticky top-0 bg-white border-b p-4 flex items-center justify-between",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "h2",
                        {
                          className: "text-xl font-bold",
                          children: isEditing
                            ? "Edit Social Post"
                            : "Add New Social Post",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                          lineNumber: 275,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "button",
                        {
                          onClick: onClose,
                          className: "text-2xl leading-none hover:opacity-70",
                          disabled: saving,
                          children: "×",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                          lineNumber: 278,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                    lineNumber: 274,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className: "p-6 space-y-4",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-semibold mb-1",
                                      children: "Post Title *",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 292,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      placeholder: "Enter post title",
                                      value: form.title,
                                      onChange: (e) =>
                                        handleChange("title", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 295,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 291,
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
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-semibold mb-1",
                                      children: "Content Type *",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 302,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "select",
                                    {
                                      value: form.contentType,
                                      onChange: (e) =>
                                        handleChange(
                                          "contentType",
                                          e.target.value,
                                        ),
                                      className: "border rounded-md p-2 w-full",
                                      children:
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "CONTENT_TYPES"
                                        ].map((contentType) =>
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "option",
                                            {
                                              value: contentType,
                                              children: contentType,
                                            },
                                            contentType,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                              lineNumber: 311,
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
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 305,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 301,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                          lineNumber: 290,
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
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "label",
                              {
                                className: "block text-sm font-semibold mb-2",
                                children: [
                                  "Platforms *",
                                  " ",
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "span",
                                    {
                                      className:
                                        "text-xs font-normal text-gray-400",
                                      children: "(select one or more)",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 323,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 321,
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
                                className: "flex flex-wrap gap-2",
                                children:
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "SOCIAL_PLATFORMS"
                                  ].map((p) => {
                                    const selected = (
                                      form.platforms || []
                                    ).includes(p);
                                    return /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "button",
                                      {
                                        type: "button",
                                        onClick: () => {
                                          const current = form.platforms || [];
                                          const next = selected
                                            ? current.filter((x) => x !== p)
                                            : [...current, p];
                                          handlePlatformsChange(next);
                                        },
                                        className: `flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${selected ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"}`,
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "PlatformIcon"
                                            ],
                                            {
                                              platform: p,
                                              size: "sm",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                              lineNumber: 347,
                                              columnNumber: 21,
                                            },
                                            this,
                                          ),
                                          p,
                                          selected &&
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "span",
                                              {
                                                className:
                                                  "text-blue-500 font-bold leading-none",
                                                children: "✓",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                                lineNumber: 350,
                                                columnNumber: 23,
                                              },
                                              this,
                                            ),
                                        ],
                                      },
                                      p,
                                      true,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                        lineNumber: 331,
                                        columnNumber: 19,
                                      },
                                      this,
                                    );
                                  }),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 327,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (form.platforms || []).length === 0 &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className: "text-xs text-amber-600 mt-1",
                                  children:
                                    "Please select at least one platform.",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                  lineNumber: 359,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                          lineNumber: 320,
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
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "label",
                              {
                                className: "block text-sm font-semibold mb-1",
                                children: "Campaign / Project",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 367,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "Input"
                              ],
                              {
                                placeholder: "e.g. Summer Launch, Diwali 2025",
                                value: form.campaign || "",
                                onChange: (e) =>
                                  handleChange("campaign", e.target.value),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 370,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                          lineNumber: 366,
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
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "label",
                              {
                                className: "block text-sm font-semibold mb-2",
                                children: "Social Accounts *",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 379,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$multi$2d$account$2d$selector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "MultiAccountSelector"
                              ],
                              {
                                clientId: clientId,
                                platforms: form.platforms || [],
                                value: form.socialAccountIds || [],
                                onChange: (accountIds) =>
                                  handleAccountsChange(accountIds),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 382,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                          lineNumber: 378,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      !isEditing &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: `flex items-center justify-between gap-3 rounded-md border-2 px-3 py-2 ${isAlreadyPosted ? "border-green-500 bg-green-50" : "border-gray-200 bg-gray-50"}`,
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "label",
                                      {
                                        className:
                                          "block text-sm font-semibold",
                                        children: "Already Posted?",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                        lineNumber: 400,
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
                                        className: "text-xs text-gray-600",
                                        children:
                                          "Toggle on if this post has already gone live. We'll save the posted link, date and time.",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                        lineNumber: 403,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                  lineNumber: 399,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => setIsAlreadyPosted((v) => !v),
                                  className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${isAlreadyPosted ? "bg-green-600" : "bg-gray-300"}`,
                                  "aria-pressed": isAlreadyPosted,
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "span",
                                    {
                                      className: `inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAlreadyPosted ? "translate-x-6" : "translate-x-1"}`,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 416,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                  lineNumber: 408,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                            lineNumber: 392,
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
                          className: "grid grid-cols-1 md:grid-cols-3 gap-3",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-semibold mb-1",
                                      children: isAlreadyPosted
                                        ? "Posted Date *"
                                        : "Schedule Date *",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 428,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      type: "date",
                                      value: form.scheduledDate,
                                      onChange: (e) =>
                                        handleChange(
                                          "scheduledDate",
                                          e.target.value,
                                        ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 431,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 427,
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
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-semibold mb-1",
                                      children: isAlreadyPosted
                                        ? "Posted Time *"
                                        : "Schedule Time *",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 438,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      type: "time",
                                      value: form.scheduledTime,
                                      onChange: (e) =>
                                        handleChange(
                                          "scheduledTime",
                                          e.target.value,
                                        ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 441,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 437,
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
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-semibold mb-1",
                                      children: "Assigned Staff",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 448,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "select",
                                    {
                                      value: form.assignedTo,
                                      onChange: (e) =>
                                        handleChange(
                                          "assignedTo",
                                          e.target.value,
                                        ),
                                      className: "border rounded-md p-2 w-full",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "option",
                                          {
                                            value: "",
                                            children: "-- Unassigned --",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                            lineNumber: 456,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        staffOptions.map((name) =>
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "option",
                                            {
                                              value: name,
                                              children: name,
                                            },
                                            name,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                              lineNumber: 458,
                                              columnNumber: 19,
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
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 451,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 447,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                          lineNumber: 426,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      isAlreadyPosted &&
                        (() => {
                          const accIds = form.socialAccountIds || [];
                          if (accIds.length === 0) {
                            return /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className:
                                  "rounded-md border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800",
                                children:
                                  "Select at least one social account above to enter its posted link.",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 473,
                                columnNumber: 19,
                              },
                              this,
                            );
                          }
                          if (accIds.length === 1) {
                            const id = accIds[0];
                            const acc = postedAccounts.find(
                              (a) => (a._id || a.id) === id,
                            );
                            return /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-semibold mb-1",
                                      children: [
                                        "Posted Link *",
                                        acc &&
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "span",
                                            {
                                              className:
                                                "ml-2 text-xs font-normal text-gray-500",
                                              children: ["(@", acc.handle, ")"],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                              lineNumber: 490,
                                              columnNumber: 25,
                                            },
                                            this,
                                          ),
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 487,
                                      columnNumber: 21,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      type: "url",
                                      placeholder:
                                        "https://instagram.com/p/...",
                                      value: postedLinksByAccount[id] || "",
                                      onChange: (e) =>
                                        setPostedLinksByAccount((prev) => ({
                                          ...prev,
                                          [id]: e.target.value,
                                        })),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 495,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 486,
                                columnNumber: 19,
                              },
                              this,
                            );
                          }
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
                                  "label",
                                  {
                                    className: "block text-sm font-semibold",
                                    children: [
                                      "Posted Links *",
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "span",
                                        {
                                          className:
                                            "ml-2 text-xs font-normal text-gray-500",
                                          children: "(one per account)",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                          lineNumber: 514,
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                    lineNumber: 512,
                                    columnNumber: 19,
                                  },
                                  this,
                                ),
                                accIds.map((id) => {
                                  const acc = postedAccounts.find(
                                    (a) => (a._id || a.id) === id,
                                  );
                                  const label = acc
                                    ? `@${acc.handle}${acc.displayName && acc.displayName !== acc.handle ? ` (${acc.displayName})` : ""}`
                                    : id;
                                  return /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className:
                                        "flex items-center gap-2 border rounded-md p-2",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "span",
                                          {
                                            className:
                                              "text-xs font-semibold text-gray-700 w-44 truncate shrink-0",
                                            children: label,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                            lineNumber: 534,
                                            columnNumber: 25,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "Input"
                                          ],
                                          {
                                            type: "url",
                                            placeholder:
                                              "https://example.com/post/123",
                                            value:
                                              postedLinksByAccount[id] || "",
                                            onChange: (e) =>
                                              setPostedLinksByAccount(
                                                (prev) => ({
                                                  ...prev,
                                                  [id]: e.target.value,
                                                }),
                                              ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                            lineNumber: 537,
                                            columnNumber: 25,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    id,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 530,
                                      columnNumber: 23,
                                    },
                                    this,
                                  );
                                }),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                              lineNumber: 511,
                              columnNumber: 17,
                            },
                            this,
                          );
                        })(),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "grid grid-cols-1 gap-3",
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "label",
                                  {
                                    className:
                                      "block text-sm font-semibold mb-1",
                                    children: "Approval Status",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                    lineNumber: 558,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "select",
                                  {
                                    value: form.approvalStatus || "Pending",
                                    onChange: (e) =>
                                      handleChange(
                                        "approvalStatus",
                                        e.target.value,
                                      ),
                                    className: "border rounded-md p-2 w-full",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "option",
                                        {
                                          value: "Pending",
                                          children: "Pending",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                          lineNumber: 566,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "option",
                                        {
                                          value: "Approved",
                                          children: "Approved",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                          lineNumber: 567,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "option",
                                        {
                                          value: "Rejected",
                                          children: "Rejected",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                          lineNumber: 568,
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                    lineNumber: 561,
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
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                              lineNumber: 557,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                          lineNumber: 556,
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
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className:
                                  "flex items-center justify-between mb-1",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className: "block text-sm font-semibold",
                                      children: "Caption",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 576,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (() => {
                                    const limit = CAPTION_LIMITS[form.platform];
                                    const len = (form.caption || "").length;
                                    if (!limit) return null;
                                    const pct = len / limit;
                                    const color =
                                      pct >= 1
                                        ? "text-red-600 font-bold"
                                        : pct >= 0.9
                                          ? "text-orange-500 font-semibold"
                                          : "text-gray-400";
                                    return /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className: `text-xs ${color}`,
                                        children: [
                                          len.toLocaleString(),
                                          " / ",
                                          limit.toLocaleString(),
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                        lineNumber: 589,
                                        columnNumber: 19,
                                      },
                                      this,
                                    );
                                  })(),
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 575,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "Textarea"
                              ],
                              {
                                placeholder: "Enter post caption/copy",
                                value: form.caption,
                                onChange: (e) =>
                                  handleChange("caption", e.target.value),
                                className: "h-24",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 595,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                          lineNumber: 574,
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
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "label",
                              {
                                className: "block text-sm font-semibold mb-1",
                                children: "Hashtags",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 605,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "Input"
                              ],
                              {
                                placeholder: "#hashtag1 #hashtag2",
                                value: form.hashtags || "",
                                onChange: (e) =>
                                  handleChange("hashtags", e.target.value),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 606,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                          lineNumber: 604,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      form.contentType === "Carousel" &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "flex items-center justify-between mb-2",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "label",
                                      {
                                        className:
                                          "block text-sm font-semibold",
                                        children: "Carousel Media Links",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                        lineNumber: 617,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "button",
                                      {
                                        type: "button",
                                        onClick: () =>
                                          setForm((prev) => ({
                                            ...prev,
                                            carouselMediaLinks: [
                                              ...(prev.carouselMediaLinks ||
                                                []),
                                              "",
                                            ],
                                          })),
                                        className:
                                          "text-xs px-2 py-1 border rounded hover:bg-gray-100 font-semibold",
                                        children: "+ Add Slide",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                        lineNumber: 620,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                  lineNumber: 616,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              (form.carouselMediaLinks || []).length === 0 &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "p",
                                  {
                                    className: "text-xs text-muted-foreground",
                                    children:
                                      'Click "+ Add Slide" to add media links for each carousel slide.',
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                    lineNumber: 637,
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
                                  className: "space-y-2",
                                  children: (form.carouselMediaLinks || []).map(
                                    (link, idx) =>
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className: "flex items-center gap-2",
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "span",
                                              {
                                                className:
                                                  "text-xs font-semibold text-gray-500 w-6 shrink-0",
                                                children: [idx + 1, "."],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                                lineNumber: 645,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "Input"
                                              ],
                                              {
                                                placeholder: `Slide ${idx + 1} media URL`,
                                                value: link,
                                                onChange: (e) => {
                                                  const updated = [
                                                    ...(form.carouselMediaLinks ||
                                                      []),
                                                  ];
                                                  updated[idx] = e.target.value;
                                                  setForm((prev) => ({
                                                    ...prev,
                                                    carouselMediaLinks: updated,
                                                  }));
                                                },
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                                lineNumber: 648,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "button",
                                              {
                                                type: "button",
                                                onClick: () => {
                                                  const updated = (
                                                    form.carouselMediaLinks ||
                                                    []
                                                  ).filter((_, i) => i !== idx);
                                                  setForm((prev) => ({
                                                    ...prev,
                                                    carouselMediaLinks: updated,
                                                  }));
                                                },
                                                className:
                                                  "text-red-500 hover:text-red-700 text-lg leading-none shrink-0",
                                                children: "×",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                                lineNumber: 660,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                          ],
                                        },
                                        idx,
                                        true,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                          lineNumber: 644,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                  lineNumber: 642,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                            lineNumber: 615,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      form.contentType === "Reel" &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "label",
                                      {
                                        className:
                                          "block text-sm font-semibold mb-1",
                                        children: "Reel Video Link *",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                        lineNumber: 685,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "Input"
                                      ],
                                      {
                                        placeholder:
                                          "https://example.com/reel.mp4",
                                        value: form.reelLink || "",
                                        onChange: (e) =>
                                          handleChange(
                                            "reelLink",
                                            e.target.value,
                                          ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                        lineNumber: 688,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                  lineNumber: 684,
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
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "label",
                                      {
                                        className:
                                          "block text-sm font-semibold mb-1",
                                        children: "Cover Page Link",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                        lineNumber: 695,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "Input"
                                      ],
                                      {
                                        placeholder:
                                          "https://example.com/cover.jpg",
                                        value: form.reelCoverLink || "",
                                        onChange: (e) =>
                                          handleChange(
                                            "reelCoverLink",
                                            e.target.value,
                                          ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                        lineNumber: 698,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                  lineNumber: 694,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                            lineNumber: 683,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      form.contentType !== "Carousel" &&
                        form.contentType !== "Reel" &&
                        /*#__PURE__*/ (0,
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
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "label",
                                      {
                                        className:
                                          "block text-sm font-semibold mb-1",
                                        children: "Media URL or Path",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                        lineNumber: 713,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "Input"
                                      ],
                                      {
                                        placeholder:
                                          "https://example.com/image.jpg",
                                        value: form.mediaFile || "",
                                        onChange: (e) =>
                                          handleChange(
                                            "mediaFile",
                                            e.target.value,
                                          ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                        lineNumber: 716,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                  lineNumber: 712,
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
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "label",
                                      {
                                        className:
                                          "block text-sm font-semibold mb-1",
                                        children: "Upload Media File",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                        lineNumber: 724,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "Input"
                                      ],
                                      {
                                        type: "file",
                                        accept: "image/*,video/*",
                                        onChange: async (e) => {
                                          const file =
                                            e.target.files?.[0] || null;
                                          const data = await fileToBase64(file);
                                          if (data)
                                            handleChange("mediaFile", data);
                                        },
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                        lineNumber: 727,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                  lineNumber: 723,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              form.mediaFile &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "border rounded p-3 bg-gray-50",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className:
                                            "text-xs font-semibold text-muted-foreground mb-2",
                                          children: "Media",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                          lineNumber: 740,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                      String(form.mediaFile).startsWith(
                                        "data:image",
                                      )
                                        ? /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "img",
                                            {
                                              src: form.mediaFile,
                                              alt: "preview",
                                              className:
                                                "h-32 w-32 object-cover rounded",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                              lineNumber: 744,
                                              columnNumber: 21,
                                            },
                                            this,
                                          )
                                        : String(form.mediaFile).startsWith(
                                              "data:video",
                                            )
                                          ? /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "video",
                                              {
                                                src: form.mediaFile,
                                                className: "h-40 rounded",
                                                controls: true,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                                lineNumber: 750,
                                                columnNumber: 21,
                                              },
                                              this,
                                            )
                                          : /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "a",
                                              {
                                                href: form.mediaFile,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className:
                                                  "inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm",
                                                children: "Open Link",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                                lineNumber: 756,
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                    lineNumber: 739,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                            ],
                          },
                          void 0,
                          true,
                        ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "label",
                              {
                                className: "block text-sm font-semibold mb-1",
                                children: [
                                  "Internal Comments",
                                  " ",
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "span",
                                    {
                                      className:
                                        "text-xs text-gray-400 font-normal",
                                      children:
                                        "(staff only, not visible to client)",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 774,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 772,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "Textarea"
                              ],
                              {
                                placeholder:
                                  "Team notes, revision requests, internal feedback...",
                                value: form.internalComments || "",
                                onChange: (e) =>
                                  handleChange(
                                    "internalComments",
                                    e.target.value,
                                  ),
                                className: "h-20",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 778,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                          lineNumber: 771,
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
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "label",
                              {
                                className: "block text-sm font-semibold mb-1",
                                children: [
                                  "Notes",
                                  " ",
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "span",
                                    {
                                      className:
                                        "text-xs text-gray-400 font-normal",
                                      children: "(visible to client)",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 790,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 788,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "Textarea"
                              ],
                              {
                                placeholder: "Notes visible to the client",
                                value: form.notes || "",
                                onChange: (e) =>
                                  handleChange("notes", e.target.value),
                                className: "h-20",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 794,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                          lineNumber: 787,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                    lineNumber: 288,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className: "border-t p-4 flex gap-2 justify-end bg-gray-50",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "Button"
                        ],
                        {
                          variant: "outline",
                          onClick: onClose,
                          disabled: saving,
                          children: "Cancel",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                          lineNumber: 805,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      isEditing
                        ? /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "Button"
                            ],
                            {
                              onClick: () => handleSave("schedule"),
                              disabled: saving,
                              children: saving ? "Saving..." : "Save Changes",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                              lineNumber: 809,
                              columnNumber: 13,
                            },
                            this,
                          )
                        : isAlreadyPosted
                          ? /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "Button"
                              ],
                              {
                                onClick: () => handleSave("posted"),
                                disabled: saving,
                                className: "bg-green-600 hover:bg-green-700",
                                children: saving
                                  ? "Saving..."
                                  : "Save as Posted",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                lineNumber: 813,
                                columnNumber: 13,
                              },
                              this,
                            )
                          : /*#__PURE__*/ (0,
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
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Button"
                                    ],
                                    {
                                      variant: "outline",
                                      onClick: () => handleSave("draft"),
                                      disabled: saving,
                                      children: saving
                                        ? "Saving..."
                                        : "Save as Draft",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 822,
                                      columnNumber: 15,
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
                                      onClick: () => handleSave("schedule"),
                                      disabled: saving,
                                      children: saving
                                        ? "Scheduling..."
                                        : "Schedule Post",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                                      lineNumber: 829,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              void 0,
                              true,
                            ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName:
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
                    lineNumber: 804,
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
                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
              lineNumber: 272,
              columnNumber: 7,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName:
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx",
          lineNumber: 271,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Dialog",
      () => Dialog,
      "DialogClose",
      () => DialogClose,
      "DialogContent",
      () => DialogContent,
      "DialogDescription",
      () => DialogDescription,
      "DialogFooter",
      () => DialogFooter,
      "DialogHeader",
      () => DialogHeader,
      "DialogOverlay",
      () => DialogOverlay,
      "DialogPortal",
      () => DialogPortal,
      "DialogTitle",
      () => DialogTitle,
      "DialogTrigger",
      () => DialogTrigger,
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
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/utils.ts [app-ssr] (ecmascript)",
      );
    ("use client");
    const Dialog =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Root"
      ];
    const DialogTrigger =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Trigger"
      ];
    const DialogPortal =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Portal"
      ];
    const DialogClose =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Close"
      ];
    const DialogOverlay =
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
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              className,
            ),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx",
            lineNumber: 21,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    DialogOverlay.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Overlay"
      ].displayName;
    const DialogContent =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, children, ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          DialogPortal,
          {
            children: [
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                DialogOverlay,
                {},
                void 0,
                false,
                {
                  fileName:
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx",
                  lineNumber: 37,
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
                    "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border-2 bg-background p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-none",
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
                          "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
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
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx",
                              lineNumber: 48,
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
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx",
                              lineNumber: 49,
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
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx",
                        lineNumber: 47,
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
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx",
                  lineNumber: 38,
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
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx",
            lineNumber: 36,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    DialogContent.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Content"
      ].displayName;
    const DialogHeader = ({ className, ...props }) =>
      /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "cn"
          ])("flex flex-col space-y-1.5 text-center sm:text-left", className),
          ...props,
        },
        void 0,
        false,
        {
          fileName:
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx",
          lineNumber: 60,
          columnNumber: 3,
        },
        ("TURBOPACK compile-time value", void 0),
      );
    DialogHeader.displayName = "DialogHeader";
    const DialogFooter = ({ className, ...props }) =>
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
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx",
          lineNumber: 74,
          columnNumber: 3,
        },
        ("TURBOPACK compile-time value", void 0),
      );
    DialogFooter.displayName = "DialogFooter";
    const DialogTitle =
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
            ])("text-lg font-semibold leading-none tracking-tight", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx",
            lineNumber: 88,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    DialogTitle.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Title"
      ].displayName;
    const DialogDescription =
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
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx",
            lineNumber: 103,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    DialogDescription.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Description"
      ].displayName;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Select",
      () => Select,
      "SelectContent",
      () => SelectContent,
      "SelectGroup",
      () => SelectGroup,
      "SelectItem",
      () => SelectItem,
      "SelectLabel",
      () => SelectLabel,
      "SelectScrollDownButton",
      () => SelectScrollDownButton,
      "SelectScrollUpButton",
      () => SelectScrollUpButton,
      "SelectSeparator",
      () => SelectSeparator,
      "SelectTrigger",
      () => SelectTrigger,
      "SelectValue",
      () => SelectValue,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-select/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/utils.ts [app-ssr] (ecmascript)",
      );
    ("use client");
    const Select =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Root"
      ];
    const SelectGroup =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Group"
      ];
    const SelectValue =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Value"
      ];
    const SelectTrigger =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, children, ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Trigger"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "flex h-10 w-full items-center justify-between rounded-none border-2 border-foreground bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
              className,
            ),
            ...props,
            children: [
              children,
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "Icon"
                ],
                {
                  asChild: true,
                  children: /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__[
                      "ChevronDown"
                    ],
                    {
                      className: "h-4 w-4 opacity-50",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
                      lineNumber: 29,
                      columnNumber: 7,
                    },
                    ("TURBOPACK compile-time value", void 0),
                  ),
                },
                void 0,
                false,
                {
                  fileName:
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
                  lineNumber: 28,
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
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
            lineNumber: 19,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SelectTrigger.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Trigger"
      ].displayName;
    const SelectScrollUpButton =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "ScrollUpButton"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "flex cursor-default items-center justify-center py-1",
              className,
            ),
            ...props,
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__[
                "ChevronUp"
              ],
              {
                className: "h-4 w-4",
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
                lineNumber: 47,
                columnNumber: 5,
              },
              ("TURBOPACK compile-time value", void 0),
            ),
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
            lineNumber: 39,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SelectScrollUpButton.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "ScrollUpButton"
      ].displayName;
    const SelectScrollDownButton =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "ScrollDownButton"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "flex cursor-default items-center justify-center py-1",
              className,
            ),
            ...props,
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__[
                "ChevronDown"
              ],
              {
                className: "h-4 w-4",
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
                lineNumber: 64,
                columnNumber: 5,
              },
              ("TURBOPACK compile-time value", void 0),
            ),
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
            lineNumber: 56,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SelectScrollDownButton.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "ScrollDownButton"
      ].displayName;
    const SelectContent =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, children, position = "popper", ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Portal"
          ],
          {
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "Content"
              ],
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "cn"
                ])(
                  "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-none border-2 bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                  position === "popper" &&
                    "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                  className,
                ),
                position: position,
                ...props,
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    SelectScrollUpButton,
                    {},
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
                      lineNumber: 86,
                      columnNumber: 7,
                    },
                    ("TURBOPACK compile-time value", void 0),
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "Viewport"
                    ],
                    {
                      className: (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "cn"
                      ])(
                        "p-1",
                        position === "popper" &&
                          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                      ),
                      children: children,
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
                      lineNumber: 87,
                      columnNumber: 7,
                    },
                    ("TURBOPACK compile-time value", void 0),
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    SelectScrollDownButton,
                    {},
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
                      lineNumber: 96,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
                lineNumber: 75,
                columnNumber: 5,
              },
              ("TURBOPACK compile-time value", void 0),
            ),
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
            lineNumber: 74,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SelectContent.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Content"
      ].displayName;
    const SelectLabel =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Label"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
            lineNumber: 106,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SelectLabel.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Label"
      ].displayName;
    const SelectItem =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, children, ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Item"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "relative flex w-full cursor-default select-none items-center rounded-none py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
              className,
            ),
            ...props,
            children: [
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "span",
                {
                  className:
                    "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                  children: /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "ItemIndicator"
                    ],
                    {
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__[
                          "Check"
                        ],
                        {
                          className: "h-4 w-4",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
                          lineNumber: 128,
                          columnNumber: 9,
                        },
                        ("TURBOPACK compile-time value", void 0),
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
                      lineNumber: 127,
                      columnNumber: 7,
                    },
                    ("TURBOPACK compile-time value", void 0),
                  ),
                },
                void 0,
                false,
                {
                  fileName:
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
                  lineNumber: 126,
                  columnNumber: 5,
                },
                ("TURBOPACK compile-time value", void 0),
              ),
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "ItemText"
                ],
                {
                  children: children,
                },
                void 0,
                false,
                {
                  fileName:
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
                  lineNumber: 132,
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
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
            lineNumber: 118,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SelectItem.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Item"
      ].displayName;
    const SelectSeparator =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Separator"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("-mx-1 my-1 h-px bg-muted", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx",
            lineNumber: 141,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SelectSeparator.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Separator"
      ].displayName;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["PlatformLogo", () => PlatformLogo]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/building-2.js [app-ssr] (ecmascript) <export default as Building2>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/facebook.js [app-ssr] (ecmascript) <export default as Facebook>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/instagram.js [app-ssr] (ecmascript) <export default as Instagram>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-ssr] (ecmascript) <export default as Linkedin>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>",
      );
    ("use client");
    const sizeMap = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };
    const wrapperSizeMap = {
      sm: "w-6 h-6",
      md: "w-7 h-7",
      lg: "w-9 h-9",
    };
    const platformColors = {
      Instagram: {
        bg: "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
        fg: "text-white",
      },
      Facebook: {
        bg: "bg-blue-600",
        fg: "text-white",
      },
      LinkedIn: {
        bg: "bg-blue-700",
        fg: "text-white",
      },
      "X / Twitter": {
        bg: "bg-black",
        fg: "text-white",
      },
      "YouTube Shorts": {
        bg: "bg-red-600",
        fg: "text-white",
      },
      "WhatsApp Channel": {
        bg: "bg-green-600",
        fg: "text-white",
      },
      "Google My Business": {
        bg: "bg-blue-500",
        fg: "text-white",
      },
    };
    function PlatformLogo({ platform, size = "md", showLabel = false }) {
      const iconSizeClass = sizeMap[size];
      const wrapperSizeClass = wrapperSizeMap[size];
      const colors = platformColors[platform] || {
        bg: "bg-gray-400",
        fg: "text-white",
      };
      const renderIcon = (targetPlatform) => {
        switch (targetPlatform) {
          case "Instagram":
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__[
                "Instagram"
              ],
              {
                className: iconSizeClass,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx",
                lineNumber: 59,
                columnNumber: 16,
              },
              this,
            );
          case "Facebook":
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__[
                "Facebook"
              ],
              {
                className: iconSizeClass,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx",
                lineNumber: 61,
                columnNumber: 16,
              },
              this,
            );
          case "LinkedIn":
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__[
                "Linkedin"
              ],
              {
                className: iconSizeClass,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx",
                lineNumber: 63,
                columnNumber: 16,
              },
              this,
            );
          case "X / Twitter":
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "span",
              {
                className: "font-black leading-none",
                children: "X",
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx",
                lineNumber: 65,
                columnNumber: 16,
              },
              this,
            );
          case "YouTube Shorts":
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__[
                "Play"
              ],
              {
                className: iconSizeClass,
                fill: "currentColor",
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx",
                lineNumber: 67,
                columnNumber: 16,
              },
              this,
            );
          case "WhatsApp Channel":
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__[
                "MessageCircle"
              ],
              {
                className: iconSizeClass,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx",
                lineNumber: 69,
                columnNumber: 16,
              },
              this,
            );
          case "Google My Business":
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__[
                "Building2"
              ],
              {
                className: iconSizeClass,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx",
                lineNumber: 71,
                columnNumber: 16,
              },
              this,
            );
          default:
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "span",
              {
                className: "font-black leading-none",
                children: "S",
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx",
                lineNumber: 73,
                columnNumber: 16,
              },
              this,
            );
        }
      };
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "flex items-center gap-2",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: `${wrapperSizeClass} ${colors.bg} ${colors.fg} rounded-md flex items-center justify-center text-xs flex-shrink-0`,
                children: renderIcon(platform),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx",
                lineNumber: 79,
                columnNumber: 7,
              },
              this,
            ),
            showLabel &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "span",
                {
                  className: "text-sm font-medium",
                  children: platform,
                },
                void 0,
                false,
                {
                  fileName:
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx",
                  lineNumber: 84,
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
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx",
          lineNumber: 78,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["SocialAccountsTable", () => SocialAccountsTable]);
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
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/input.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/social-media-planner.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/link-2.js [app-ssr] (ecmascript) <export default as Link2>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx [app-ssr] (ecmascript)",
      );
    ("use client");
    function SocialAccountsTable({ clientId }) {
      const [accounts, setAccounts] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [isLoading, setIsLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [isDialogOpen, setIsDialogOpen] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [selectedPlatform, setSelectedPlatform] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("Instagram");
      const [username, setUsername] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [displayName, setDisplayName] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [error, setError] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [isSubmitting, setIsSubmitting] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const loadAccounts = async () => {
        if (!clientId) {
          setAccounts([]);
          return;
        }
        setIsLoading(true);
        try {
          const res = await fetch(
            `/api/social-media-accounts?clientId=${clientId}`,
            {
              cache: "no-store",
            },
          );
          if (!res.ok) throw new Error("Failed to fetch accounts");
          const data = await res.json();
          setAccounts(Array.isArray(data) ? data : []);
        } catch (e) {
          console.error("Error loading accounts:", e);
          setAccounts([]);
        } finally {
          setIsLoading(false);
        }
      };
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        loadAccounts();
      }, [clientId]);
      const handleAddAccount = async () => {
        setError("");
        if (!username.trim()) {
          setError("Username/Handle is required");
          return;
        }
        if (username.trim().length > 500) {
          setError("Username/Handle must be less than 500 characters");
          return;
        }
        setIsSubmitting(true);
        try {
          const res = await (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "apiFetch"
          ])("/api/social-media-accounts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              clientId,
              platform: selectedPlatform,
              handle: username.trim(),
              displayName: displayName.trim() || username.trim(),
            }),
          });
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to add account");
          }
          setUsername("");
          setDisplayName("");
          setSelectedPlatform("Instagram");
          setIsDialogOpen(false);
          await loadAccounts();
        } catch (e) {
          setError(e.message || "Failed to add account");
        } finally {
          setIsSubmitting(false);
        }
      };
      const handleDeleteAccount = async (accountId) => {
        if (!window.confirm("Delete this account?")) return;
        try {
          const res = await (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "apiFetch"
          ])(`/api/social-media-accounts?id=${accountId}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Failed to delete account");
          await loadAccounts();
        } catch (e) {
          console.error("Error deleting account:", e);
          alert("Failed to delete account");
        }
      };
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "space-y-4",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "flex items-center justify-between",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "h2",
                    {
                      className: "text-lg font-semibold",
                      children: "Social Media Accounts",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                      lineNumber: 137,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "Dialog"
                    ],
                    {
                      open: isDialogOpen,
                      onOpenChange: setIsDialogOpen,
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "DialogTrigger"
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
                                size: "sm",
                                className: "gap-2",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__[
                                      "Plus"
                                    ],
                                    {
                                      className: "h-4 w-4",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                      lineNumber: 141,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  "Add Account",
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                lineNumber: 140,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                            lineNumber: 139,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "DialogContent"
                          ],
                          {
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "DialogHeader"
                                ],
                                {
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "DialogTitle"
                                    ],
                                    {
                                      children: "Add Social Media Account",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                      lineNumber: 147,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                  lineNumber: 146,
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
                                  className: "space-y-4",
                                  children: [
                                    error &&
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className:
                                            "rounded bg-red-50 p-3 text-sm text-red-700",
                                          children: error,
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                          lineNumber: 151,
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
                                        className: "space-y-2",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "label",
                                            {
                                              className: "text-sm font-medium",
                                              children: "Platform",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                              lineNumber: 157,
                                              columnNumber: 17,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "Select"
                                            ],
                                            {
                                              value: selectedPlatform,
                                              onValueChange: (val) =>
                                                setSelectedPlatform(val),
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "SelectTrigger"
                                                  ],
                                                  {
                                                    children: /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "SelectValue"
                                                      ],
                                                      {},
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 21,
                                                      },
                                                      this,
                                                    ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 19,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "SelectContent"
                                                  ],
                                                  {
                                                    children:
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "SOCIAL_PLATFORMS"
                                                      ].map((platform) =>
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                            "SelectItem"
                                                          ],
                                                          {
                                                            value: platform,
                                                            children:
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "div",
                                                                {
                                                                  className:
                                                                    "flex items-center gap-2",
                                                                  children: [
                                                                    /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                        "PlatformIcon"
                                                                      ],
                                                                      {
                                                                        platform:
                                                                          platform,
                                                                        size: "sm",
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                                        lineNumber: 171,
                                                                        columnNumber: 27,
                                                                      },
                                                                      this,
                                                                    ),
                                                                    /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      "span",
                                                                      {
                                                                        children:
                                                                          platform,
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                                        lineNumber: 172,
                                                                        columnNumber: 27,
                                                                      },
                                                                      this,
                                                                    ),
                                                                  ],
                                                                },
                                                                void 0,
                                                                true,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                                  lineNumber: 170,
                                                                  columnNumber: 25,
                                                                },
                                                                this,
                                                              ),
                                                          },
                                                          platform,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                            lineNumber: 169,
                                                            columnNumber: 23,
                                                          },
                                                          this,
                                                        ),
                                                      ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                    lineNumber: 167,
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
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                              lineNumber: 158,
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
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                        lineNumber: 156,
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
                                        className: "space-y-2",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "label",
                                            {
                                              className: "text-sm font-medium",
                                              children: "Username / Handle",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                              lineNumber: 181,
                                              columnNumber: 17,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "Input"
                                            ],
                                            {
                                              placeholder: "e.g., john_doe",
                                              value: username,
                                              onChange: (e) =>
                                                setUsername(e.target.value),
                                              disabled: isSubmitting,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                              lineNumber: 182,
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
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                        lineNumber: 180,
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
                                        className: "space-y-2",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "label",
                                            {
                                              className: "text-sm font-medium",
                                              children:
                                                "Display Name (Optional)",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                              lineNumber: 191,
                                              columnNumber: 17,
                                            },
                                            this,
                                          ),
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "Input"
                                            ],
                                            {
                                              placeholder:
                                                "e.g., John Doe Marketing",
                                              value: displayName,
                                              onChange: (e) =>
                                                setDisplayName(e.target.value),
                                              disabled: isSubmitting,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                              lineNumber: 194,
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
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                        lineNumber: 190,
                                        columnNumber: 15,
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
                                        onClick: handleAddAccount,
                                        disabled: isSubmitting,
                                        className: "w-full",
                                        children: isSubmitting
                                          ? "Adding..."
                                          : "Add Account",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                        lineNumber: 202,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                  lineNumber: 149,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                            lineNumber: 145,
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
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                      lineNumber: 138,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                lineNumber: 136,
                columnNumber: 7,
              },
              this,
            ),
            isLoading
              ? /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className: "flex justify-center py-8 text-gray-500",
                    children: "Loading accounts...",
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                    lineNumber: 215,
                    columnNumber: 9,
                  },
                  this,
                )
              : accounts.length === 0
                ? /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className:
                        "rounded border border-dashed bg-gray-50 p-8 text-center text-gray-500",
                      children:
                        'No accounts added yet. Click "Add Account" to get started.',
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                      lineNumber: 219,
                      columnNumber: 9,
                    },
                    this,
                  )
                : /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "overflow-x-auto rounded border",
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "table",
                        {
                          className: "w-full text-sm",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "thead",
                              {
                                className: "border-b bg-gray-50",
                                children: /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "tr",
                                  {
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "th",
                                        {
                                          className:
                                            "px-4 py-3 text-left font-medium",
                                          children: "Platform",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                          lineNumber: 227,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "th",
                                        {
                                          className:
                                            "px-4 py-3 text-left font-medium",
                                          children: "Username",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                          lineNumber: 228,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "th",
                                        {
                                          className:
                                            "px-4 py-3 text-left font-medium",
                                          children: "Display Name",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                          lineNumber: 229,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "th",
                                        {
                                          className:
                                            "px-4 py-3 text-center font-medium",
                                          children: "Meta Connection",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                          lineNumber: 232,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "th",
                                        {
                                          className:
                                            "px-4 py-3 text-center font-medium",
                                          children: "Actions",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                          lineNumber: 235,
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                    lineNumber: 226,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                lineNumber: 225,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "tbody",
                              {
                                children: accounts.map((account) =>
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "tr",
                                    {
                                      className: "border-b hover:bg-gray-50",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "td",
                                          {
                                            className: "px-4 py-3",
                                            children: /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "PlatformLogo"
                                              ],
                                              {
                                                platform: account.platform,
                                                size: "md",
                                                showLabel: true,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                lineNumber: 245,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                            lineNumber: 244,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "td",
                                          {
                                            className: "px-4 py-3 font-mono",
                                            children: ["@", account.handle],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                            lineNumber: 251,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "td",
                                          {
                                            className:
                                              "px-4 py-3 text-gray-600",
                                            children:
                                              account.displayName ||
                                              account.handle,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                            lineNumber: 252,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "td",
                                          {
                                            className: "px-4 py-3 text-center",
                                            children:
                                              account.platform === "Facebook" ||
                                              account.platform === "Instagram"
                                                ? account.isConnected
                                                  ? /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      "span",
                                                      {
                                                        className:
                                                          "inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800",
                                                        children: [
                                                          /*#__PURE__*/ (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__[
                                                              "CheckCircle2"
                                                            ],
                                                            {
                                                              className:
                                                                "h-3 w-3",
                                                            },
                                                            void 0,
                                                            false,
                                                            {
                                                              fileName:
                                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                              lineNumber: 262,
                                                              columnNumber: 27,
                                                            },
                                                            this,
                                                          ),
                                                          account.connectedPageName
                                                            ? `Connected: ${account.connectedPageName}`
                                                            : "Connected",
                                                        ],
                                                      },
                                                      void 0,
                                                      true,
                                                      {
                                                        fileName:
                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                        lineNumber: 261,
                                                        columnNumber: 25,
                                                      },
                                                      this,
                                                    )
                                                  : /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      "a",
                                                      {
                                                        href: `/api/auth/meta/connect?accountId=${account._id || account.id}`,
                                                        className:
                                                          "inline-flex items-center gap-1 rounded border border-blue-600 px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50",
                                                        title:
                                                          "Connect this account to Meta to enable auto-sync",
                                                        children: [
                                                          /*#__PURE__*/ (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__[
                                                              "Link2"
                                                            ],
                                                            {
                                                              className:
                                                                "h-3 w-3",
                                                            },
                                                            void 0,
                                                            false,
                                                            {
                                                              fileName:
                                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                              lineNumber: 273,
                                                              columnNumber: 27,
                                                            },
                                                            this,
                                                          ),
                                                          "Connect to Meta",
                                                        ],
                                                      },
                                                      void 0,
                                                      true,
                                                      {
                                                        fileName:
                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 25,
                                                      },
                                                      this,
                                                    )
                                                : /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "span",
                                                    {
                                                      className:
                                                        "text-xs text-gray-400",
                                                      children: "N/A",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                      lineNumber: 278,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                            lineNumber: 257,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "td",
                                          {
                                            className: "px-4 py-3 text-center",
                                            children: /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "button",
                                              {
                                                onClick: () =>
                                                  handleDeleteAccount(
                                                    account._id ||
                                                      account.id ||
                                                      "",
                                                  ),
                                                className:
                                                  "inline-flex items-center gap-1 rounded px-2 py-1 text-red-600 hover:bg-red-50",
                                                title: "Delete account",
                                                children: /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__[
                                                    "Trash2"
                                                  ],
                                                  {
                                                    className: "h-4 w-4",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 23,
                                                  },
                                                  this,
                                                ),
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                                lineNumber: 283,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                            lineNumber: 282,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    account._id || account.id,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                      lineNumber: 240,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                                lineNumber: 238,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                          lineNumber: 224,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
                      lineNumber: 223,
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
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx",
          lineNumber: 135,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["PostAccountDisplay", () => PostAccountDisplay]);
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
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx [app-ssr] (ecmascript)",
      );
    ("use client");
    function PostAccountDisplay({
      accountId,
      fallback = "(No Account)",
      className = "",
    }) {
      const [account, setAccount] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(!!accountId);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        if (!accountId) {
          setLoading(false);
          return;
        }
        const fetchAccount = async () => {
          try {
            setLoading(true);
            const url = new URL(
              "/api/social-media-accounts",
              window.location.origin,
            );
            url.searchParams.set("id", accountId);
            const res = await (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "apiFetch"
            ])(url.toString(), {
              cache: "no-store",
            });
            if (res.ok) {
              const data = await res.json();
              const acc = Array.isArray(data) ? data[0] : data;
              setAccount(acc || null);
            }
          } catch (e) {
            console.error("Failed to fetch account:", e);
            setAccount(null);
          } finally {
            setLoading(false);
          }
        };
        fetchAccount();
      }, [accountId]);
      if (loading) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "span",
          {
            className: `text-gray-400 ${className}`,
            children: "Loading...",
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx",
            lineNumber: 54,
            columnNumber: 12,
          },
          this,
        );
      }
      if (!account) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "span",
          {
            className: `text-gray-500 ${className}`,
            children: fallback,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx",
            lineNumber: 58,
            columnNumber: 12,
          },
          this,
        );
      }
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: `font-medium inline-flex items-center gap-2 ${className}`,
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "PlatformLogo"
              ],
              {
                platform: account.platform,
                size: "sm",
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx",
                lineNumber: 63,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "span",
              {
                children: [
                  "@",
                  account.handle,
                  account.displayName &&
                    account.displayName !== account.handle &&
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "span",
                      {
                        className: "text-xs text-gray-600 ml-1",
                        children: ["(", account.displayName, ")"],
                      },
                      void 0,
                      true,
                      {
                        fileName:
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx",
                        lineNumber: 67,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx",
                lineNumber: 64,
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
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx",
          lineNumber: 62,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-display.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["MultiAccountDisplay", () => MultiAccountDisplay]);
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
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx [app-ssr] (ecmascript)",
      );
    ("use client");
    function MultiAccountDisplay({
      accountIds,
      fallback = "(No Accounts)",
      className = "",
    }) {
      const [accounts, setAccounts] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(!!accountIds && accountIds.length > 0);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        if (!accountIds || accountIds.length === 0) {
          setLoading(false);
          return;
        }
        const fetchAccounts = async () => {
          try {
            setLoading(true);
            const promises = accountIds.map((id) => {
              const url = new URL(
                "/api/social-media-accounts",
                window.location.origin,
              );
              url.searchParams.set("id", id);
              return (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "apiFetch"
              ])(url.toString(), {
                cache: "no-store",
              }).then((res) => (res.ok ? res.json() : null));
            });
            const results = await Promise.all(promises);
            const loaded = results
              .map((data) => (Array.isArray(data) ? data[0] : data))
              .filter(Boolean);
            setAccounts(loaded);
          } catch (e) {
            console.error("Failed to fetch accounts:", e);
            setAccounts([]);
          } finally {
            setLoading(false);
          }
        };
        fetchAccounts();
      }, [accountIds]);
      if (loading) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "span",
          {
            className: `text-gray-400 ${className}`,
            children: "Loading...",
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-display.tsx",
            lineNumber: 59,
            columnNumber: 12,
          },
          this,
        );
      }
      if (!accounts || accounts.length === 0) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "span",
          {
            className: `text-gray-500 ${className}`,
            children: fallback,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-display.tsx",
            lineNumber: 63,
            columnNumber: 12,
          },
          this,
        );
      }
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: `flex flex-wrap gap-2 ${className}`,
          children: accounts.map((account) =>
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className:
                  "inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded px-3 py-1 text-xs font-medium",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "PlatformLogo"
                    ],
                    {
                      platform: account.platform,
                      size: "sm",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-display.tsx",
                      lineNumber: 73,
                      columnNumber: 11,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "span",
                    {
                      children: [
                        "@",
                        account.handle,
                        account.displayName &&
                          account.displayName !== account.handle &&
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "span",
                            {
                              className: "text-gray-600 ml-1",
                              children: ["(", account.displayName, ")"],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-display.tsx",
                              lineNumber: 77,
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
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-display.tsx",
                      lineNumber: 74,
                      columnNumber: 11,
                    },
                    this,
                  ),
                ],
              },
              account._id || account.id,
              true,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-display.tsx",
                lineNumber: 69,
                columnNumber: 9,
              },
              this,
            ),
          ),
        },
        void 0,
        false,
        {
          fileName:
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-display.tsx",
          lineNumber: 67,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["ViewPlanModal", () => ViewPlanModal]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/social-media-planner.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$post$2d$account$2d$display$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$multi$2d$account$2d$display$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-display.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@fortawesome/react-fontawesome/dist/index.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@fortawesome/free-solid-svg-icons/index.mjs [app-ssr] (ecmascript)",
      );
    ("use client");
    const statusBadge = {
      Draft: "bg-gray-100 text-gray-700",
      Ready: "bg-blue-100 text-blue-700",
      Scheduled: "bg-amber-100 text-amber-700",
      Posted: "bg-green-100 text-green-700",
      Missed: "bg-red-100 text-red-700",
      Cancelled: "bg-slate-100 text-slate-700",
    };
    const approvalBadge = {
      Pending: "bg-yellow-100 text-yellow-700",
      Approved: "bg-green-100 text-green-700",
      Rejected: "bg-red-100 text-red-700",
    };
    function ViewPlanModal({ isOpen, plan, onClose }) {
      const [isScrolledDown, setIsScrolledDown] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      if (!isOpen || !plan) return null;
      const handleScroll = (e) => {
        const element = e.currentTarget;
        setIsScrolledDown(element.scrollTop > 0);
      };
      const scheduledDateTime = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "toDateTime"
      ])(plan.scheduledDate, plan.scheduledTime);
      const isOverdue =
        !!scheduledDateTime &&
        scheduledDateTime < new Date() &&
        plan.status !== "Posted" &&
        plan.status !== "Cancelled" &&
        plan.status !== "Missed";
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className:
            "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "div",
            {
              className:
                "bg-white rounded-lg max-w-3xl w-full max-h-[90vh] flex flex-col shadow-xl",
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className:
                      "border-b-2 border-black p-4 flex items-center justify-between flex-shrink-0",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "h2",
                        {
                          className: "text-2xl font-black",
                          children: "View Plan Details",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                          lineNumber: 68,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "button",
                        {
                          onClick: onClose,
                          className:
                            "text-2xl font-bold hover:bg-gray-200 w-10 h-10 flex items-center justify-center rounded",
                          children: "✕",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                          lineNumber: 69,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                    lineNumber: 67,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    onScroll: handleScroll,
                    className: "overflow-y-auto flex-1 p-6 space-y-6",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "space-y-3",
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className:
                                "flex items-start justify-between gap-4",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "h3",
                                        {
                                          className:
                                            "text-3xl font-black break-words",
                                          children: plan.title,
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                          lineNumber: 86,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      plan.caption &&
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "p",
                                          {
                                            className:
                                              "text-base text-gray-600 mt-2 whitespace-pre-wrap break-words",
                                            children: plan.caption,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                            lineNumber: 90,
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                    lineNumber: 85,
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
                                    className:
                                      "flex flex-wrap gap-2 flex-shrink-0",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "span",
                                        {
                                          className: `px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap ${statusBadge[plan.status] || "bg-gray-100"}`,
                                          children: plan.status,
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                          lineNumber: 96,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      plan.approvalStatus &&
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "span",
                                          {
                                            className: `px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap ${approvalBadge[plan.approvalStatus] || "bg-gray-100"}`,
                                            children: plan.approvalStatus,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                            lineNumber: 104,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                      isOverdue &&
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "span",
                                          {
                                            className:
                                              "px-3 py-1 rounded-lg text-sm font-semibold bg-red-100 text-red-700 whitespace-nowrap",
                                            children: "⚠️ Overdue",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                            lineNumber: 113,
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                    lineNumber: 95,
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
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                              lineNumber: 84,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                          lineNumber: 83,
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
                          className: "grid grid-cols-2 gap-4",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "border rounded-lg p-3 space-y-1",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "text-xs font-bold text-gray-500",
                                      children: "PLATFORM",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                      lineNumber: 124,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "p",
                                    {
                                      className: "text-lg font-semibold",
                                      children: plan.platform,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                      lineNumber: 127,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                lineNumber: 123,
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
                                className: "border rounded-lg p-3 space-y-1",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "text-xs font-bold text-gray-500",
                                      children: "CONTENT TYPE",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                      lineNumber: 130,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "p",
                                    {
                                      className: "text-lg font-semibold",
                                      children: plan.contentType,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                      lineNumber: 133,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                lineNumber: 129,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                          lineNumber: 122,
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
                          className: "grid grid-cols-2 gap-4",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "border rounded-lg p-3 space-y-1",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "text-xs font-bold text-gray-500",
                                      children: "ACCOUNT(S)",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                      lineNumber: 140,
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
                                      className: "mt-2",
                                      children:
                                        plan.socialAccountIds &&
                                        plan.socialAccountIds.length > 0
                                          ? /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$multi$2d$account$2d$display$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "MultiAccountDisplay"
                                              ],
                                              {
                                                accountIds:
                                                  plan.socialAccountIds,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                                lineNumber: 145,
                                                columnNumber: 19,
                                              },
                                              this,
                                            )
                                          : /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$post$2d$account$2d$display$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "PostAccountDisplay"
                                              ],
                                              {
                                                accountId: plan.socialAccountId,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                                lineNumber: 147,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                      lineNumber: 143,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                lineNumber: 139,
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
                                className: "border rounded-lg p-3 space-y-1",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "text-xs font-bold text-gray-500",
                                      children: "SCHEDULED DATE & TIME",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                      lineNumber: 152,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "p",
                                    {
                                      className: "text-lg font-semibold",
                                      children: [
                                        plan.scheduledDate,
                                        " ",
                                        plan.scheduledTime,
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                      lineNumber: 155,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                lineNumber: 151,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                          lineNumber: 138,
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
                          className: "grid grid-cols-2 gap-4",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "border rounded-lg p-3 space-y-1",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "text-xs font-bold text-gray-500",
                                      children: "ASSIGNED TO",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                      lineNumber: 164,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "p",
                                    {
                                      className: "text-lg font-semibold",
                                      children: plan.assignedTo || "Unassigned",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                      lineNumber: 167,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                lineNumber: 163,
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
                                className: "border rounded-lg p-3 space-y-1",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "text-xs font-bold text-gray-500",
                                      children: "CREATED BY",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                      lineNumber: 172,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "p",
                                    {
                                      className: "text-lg font-semibold",
                                      children: plan.createdBy || "—",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                lineNumber: 171,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                          lineNumber: 162,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      plan.campaign &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "border rounded-lg p-3 space-y-1",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "label",
                                {
                                  className: "text-xs font-bold text-gray-500",
                                  children: "CAMPAIGN / PROJECT",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 182,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className: "text-lg font-semibold",
                                  children: plan.campaign,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 185,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                            lineNumber: 181,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      plan.hashtags &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "border rounded-lg p-3 space-y-1",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "label",
                                {
                                  className: "text-xs font-bold text-gray-500",
                                  children: "HASHTAGS",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 192,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className: "text-sm font-mono break-words",
                                  children: plan.hashtags,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 195,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                            lineNumber: 191,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      plan.mediaFile &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "border rounded-lg p-3 space-y-2",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "label",
                                {
                                  className: "text-xs font-bold text-gray-500",
                                  children: "MEDIA",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 202,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "a",
                                {
                                  href: plan.mediaFile,
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  className:
                                    "inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "FontAwesomeIcon"
                                      ],
                                      {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "faLink"
                                        ],
                                        className: "w-3.5 h-3.5",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                        lineNumber: 209,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    " Open Media",
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 203,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                            lineNumber: 201,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      plan.postedLinks &&
                      Object.keys(plan.postedLinks).length > 0
                        ? /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className: "border rounded-lg p-3 space-y-2",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "label",
                                  {
                                    className:
                                      "text-xs font-bold text-gray-500",
                                    children: "POSTED LINKS",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                    lineNumber: 218,
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
                                    className: "space-y-2",
                                    children: Object.entries(
                                      plan.postedLinks,
                                    ).map(([accountId, link]) =>
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "a",
                                        {
                                          href: link,
                                          target: "_blank",
                                          rel: "noopener noreferrer",
                                          className:
                                            "inline-flex w-fit items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold",
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "FontAwesomeIcon"
                                              ],
                                              {
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "faLink"
                                                ],
                                                className: "w-3.5 h-3.5",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                                lineNumber: 230,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                            " ",
                                            "View Post (",
                                            accountId.slice(-6),
                                            ")",
                                          ],
                                        },
                                        accountId,
                                        true,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                          lineNumber: 223,
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                    lineNumber: 221,
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
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                              lineNumber: 217,
                              columnNumber: 13,
                            },
                            this,
                          )
                        : plan.postedLink
                          ? /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "border rounded-lg p-3 space-y-2",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "text-xs font-bold text-gray-500",
                                      children: "POSTED LINK",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                      lineNumber: 238,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "a",
                                    {
                                      href: plan.postedLink,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      className:
                                        "inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "FontAwesomeIcon"
                                          ],
                                          {
                                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "faLink"
                                            ],
                                            className: "w-3.5 h-3.5",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                            lineNumber: 247,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        " View Posted Post",
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                      lineNumber: 241,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                lineNumber: 237,
                                columnNumber: 13,
                              },
                              this,
                            )
                          : null,
                      plan.notes &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className:
                              "border rounded-lg p-3 space-y-1 bg-amber-50",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "label",
                                {
                                  className: "text-xs font-bold text-gray-500",
                                  children: "NOTES",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 256,
                                  columnNumber: 15,
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
                                    "text-sm whitespace-pre-wrap break-words",
                                  children: plan.notes,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 257,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                            lineNumber: 255,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      plan.internalComments &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className:
                              "border rounded-lg p-3 space-y-1 bg-gray-50 border-dashed",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "label",
                                {
                                  className: "text-xs font-bold text-gray-500",
                                  children: [
                                    "INTERNAL COMMENTS",
                                    " ",
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className: "font-normal italic",
                                        children: "(staff only)",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                        lineNumber: 268,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 266,
                                  columnNumber: 15,
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
                                    "text-sm whitespace-pre-wrap break-words",
                                  children: plan.internalComments,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 270,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                            lineNumber: 265,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      plan.rejectionReason &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className:
                              "border-2 border-red-300 rounded-lg p-3 space-y-1 bg-red-50",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "label",
                                {
                                  className: "text-xs font-bold text-red-600",
                                  children: "CLIENT REJECTION REASON",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 279,
                                  columnNumber: 15,
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
                                    "text-sm whitespace-pre-wrap break-words text-red-800",
                                  children: plan.rejectionReason,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 282,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                            lineNumber: 278,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      plan.clientRemarks &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className:
                              "border-2 border-blue-300 rounded-lg p-3 space-y-1 bg-blue-50",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "label",
                                {
                                  className: "text-xs font-bold text-blue-600",
                                  children: "CLIENT REMARKS",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 291,
                                  columnNumber: 15,
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
                                    "text-sm whitespace-pre-wrap break-words text-blue-800",
                                  children: plan.clientRemarks,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 294,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                            lineNumber: 290,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      (() => {
                        const fmt = (d) =>
                          d
                            ? new Date(d).toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "";
                        const entries = [];
                        if (plan.createdAt) {
                          entries.push({
                            dot: "bg-blue-500",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "faFileLines"
                            ],
                            iconColor: "text-white",
                            label: "Plan Created",
                            sub: plan.createdBy
                              ? `by ${plan.createdBy}`
                              : undefined,
                            date: fmt(plan.createdAt),
                          });
                        }
                        if (plan.statusHistory?.length) {
                          for (const e of plan.statusHistory) {
                            const cfg = {
                              Approved: {
                                dot: "bg-green-500",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "faCircleCheck"
                                ],
                                iconColor: "text-white",
                                label: "Client Approved",
                              },
                              Rejected: {
                                dot: "bg-red-500",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "faCircleXmark"
                                ],
                                iconColor: "text-white",
                                label: "Client Rejected",
                              },
                              Pending: {
                                dot: "bg-yellow-400",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "faArrowRotateLeft"
                                ],
                                iconColor: "text-white",
                                label: "Re-opened for Review",
                              },
                            };
                            const c = cfg[e.approvalStatus] || {
                              dot: "bg-gray-400",
                              icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "faHourglassHalf"
                              ],
                              iconColor: "text-white",
                              label: e.approvalStatus,
                            };
                            entries.push({
                              ...c,
                              sub: e.changedBy,
                              date: fmt(e.changedAt),
                              italic: e.remarks,
                            });
                          }
                        }
                        if (plan.postedAt) {
                          entries.push({
                            dot: "bg-green-600",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "faMapPin"
                            ],
                            iconColor: "text-white",
                            label: "Post Published",
                            date: fmt(plan.postedAt),
                          });
                        }
                        if (entries.length === 0) return null;
                        return /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className:
                              "border-2 border-gray-200 rounded-xl p-4",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "h4",
                                {
                                  className:
                                    "text-xs font-black text-gray-500 mb-4 tracking-wider uppercase",
                                  children: "Post Timeline",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 391,
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
                                  className: "relative pl-5",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className:
                                          "absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-200",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                        lineNumber: 395,
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
                                        className: "space-y-5",
                                        children: entries.map((e, i) =>
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "relative flex gap-3 items-start",
                                              children: [
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "div",
                                                  {
                                                    className: `absolute -left-5 top-0.5 w-4 h-4 rounded-full ${e.dot} flex-shrink-0 shadow-sm flex items-center justify-center`,
                                                    children: /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "FontAwesomeIcon"
                                                      ],
                                                      {
                                                        icon: e.icon,
                                                        className: `w-2 h-2 ${e.iconColor}`,
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                                        lineNumber: 402,
                                                        columnNumber: 27,
                                                      },
                                                      this,
                                                    ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                ),
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "div",
                                                  {
                                                    className: "min-w-0",
                                                    children: [
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "p",
                                                        {
                                                          className:
                                                            "text-xs font-bold text-gray-800",
                                                          children: e.label,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                                          lineNumber: 408,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      e.sub &&
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "p",
                                                          {
                                                            className:
                                                              "text-xs text-gray-500",
                                                            children: e.sub,
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                                            lineNumber: 412,
                                                            columnNumber: 29,
                                                          },
                                                          this,
                                                        ),
                                                      e.italic &&
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "p",
                                                          {
                                                            className:
                                                              "text-xs text-gray-600 italic mt-0.5",
                                                            children: [
                                                              '"',
                                                              e.italic,
                                                              '"',
                                                            ],
                                                          },
                                                          void 0,
                                                          true,
                                                          {
                                                            fileName:
                                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                                            lineNumber: 415,
                                                            columnNumber: 29,
                                                          },
                                                          this,
                                                        ),
                                                      e.date &&
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "p",
                                                          {
                                                            className:
                                                              "text-xs text-gray-400 mt-0.5",
                                                            children: e.date,
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                                            lineNumber: 420,
                                                            columnNumber: 29,
                                                          },
                                                          this,
                                                        ),
                                                    ],
                                                  },
                                                  void 0,
                                                  true,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            i,
                                            true,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                              lineNumber: 398,
                                              columnNumber: 23,
                                            },
                                            this,
                                          ),
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                        lineNumber: 396,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 394,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                            lineNumber: 390,
                            columnNumber: 15,
                          },
                          this,
                        );
                      })(),
                      plan.status === "Posted" &&
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className:
                              "border-2 border-green-300 bg-green-50 rounded-lg p-4",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "h4",
                                {
                                  className:
                                    "font-bold text-green-900 mb-3 flex items-center gap-2",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "FontAwesomeIcon"
                                      ],
                                      {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "faChartBar"
                                        ],
                                        className: "w-4 h-4",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                        lineNumber: 437,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    " ",
                                    "Analytics",
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 436,
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
                                  className: "grid grid-cols-3 gap-3",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className: "text-center",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "p",
                                            {
                                              className:
                                                "text-2xl font-bold text-green-700",
                                              children: plan.views || 0,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                              lineNumber: 442,
                                              columnNumber: 19,
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
                                                "text-xs text-green-600",
                                              children: "Views",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                              lineNumber: 445,
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
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                        lineNumber: 441,
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
                                        className: "text-center",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "p",
                                            {
                                              className:
                                                "text-2xl font-bold text-green-700",
                                              children: plan.likes || 0,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                              lineNumber: 448,
                                              columnNumber: 19,
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
                                                "text-xs text-green-600",
                                              children: "Likes",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                              lineNumber: 451,
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
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                        lineNumber: 447,
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
                                        className: "text-center",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "p",
                                            {
                                              className:
                                                "text-2xl font-bold text-green-700",
                                              children: plan.comments || 0,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                              lineNumber: 454,
                                              columnNumber: 19,
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
                                                "text-xs text-green-600",
                                              children: "Comments",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                              lineNumber: 457,
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
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                        lineNumber: 453,
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
                                        className: "text-center",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "p",
                                            {
                                              className:
                                                "text-2xl font-bold text-green-700",
                                              children: plan.shares || 0,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                              lineNumber: 460,
                                              columnNumber: 19,
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
                                                "text-xs text-green-600",
                                              children: "Shares",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                              lineNumber: 463,
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
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                        lineNumber: 459,
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
                                        className: "text-center",
                                        children: [
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "p",
                                            {
                                              className:
                                                "text-2xl font-bold text-green-700",
                                              children:
                                                plan.followers_gained || 0,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                              lineNumber: 466,
                                              columnNumber: 19,
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
                                                "text-xs text-green-600",
                                              children: "Followers",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                              lineNumber: 469,
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
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                        lineNumber: 465,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                                  lineNumber: 440,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                            lineNumber: 435,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                    lineNumber: 78,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className: `border-t-2 border-black p-4 flex justify-end gap-2 flex-shrink-0 transition-colors ${isScrolledDown ? "bg-gray-50" : ""}`,
                    children: /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "Button"
                      ],
                      {
                        onClick: onClose,
                        className: "font-semibold",
                        children: "Close",
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                        lineNumber: 480,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
                    lineNumber: 477,
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
                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
              lineNumber: 65,
              columnNumber: 7,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName:
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx",
          lineNumber: 64,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["PostLinksModal", () => PostLinksModal]);
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
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/input.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx [app-ssr] (ecmascript)",
      );
    ("use client");
    function PostLinksModal({
      isOpen,
      post,
      accountIds = [],
      onClose,
      onSave,
    }) {
      const [links, setLinks] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])({});
      const [accounts, setAccounts] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [saving, setSaving] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      // Fallback for old single-platform posts where account lookup fails
      const [fallbackLink, setFallbackLink] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        if (!isOpen || !post) {
          setAccounts([]);
          setLinks({});
          setFallbackLink("");
          return;
        }
        // Pre-seed fallback with legacy postedLink for old posts
        setFallbackLink(post.postedLink || "");
        if (!accountIds || accountIds.length === 0) {
          setAccounts([]);
          return;
        }
        const fetchAccounts = async () => {
          try {
            setLoading(true);
            const promises = accountIds.map((id) => {
              const url = new URL(
                "/api/social-media-accounts",
                window.location.origin,
              );
              url.searchParams.set("id", id);
              return (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "apiFetch"
              ])(url.toString(), {
                cache: "no-store",
              }).then((res) => (res.ok ? res.json() : null));
            });
            const results = await Promise.all(promises);
            const loaded = results
              .map((data) => (Array.isArray(data) ? data[0] : data))
              .filter(Boolean);
            setAccounts(loaded);
            const initialLinks = {};
            loaded.forEach((account) => {
              const accId = account._id || account.id || "";
              // For old posts that only have postedLink (not postedLinks map),
              // pre-fill from postedLink when there's only one account
              initialLinks[accId] =
                post.postedLinks?.[accId] ||
                (loaded.length === 1 ? post.postedLink || "" : "");
            });
            setLinks(initialLinks);
          } catch (e) {
            console.error("Failed to fetch accounts:", e);
            setAccounts([]);
          } finally {
            setLoading(false);
          }
        };
        fetchAccounts();
      }, [isOpen, post, accountIds]);
      const handleLinkChange = (accountId, link) => {
        setLinks((prev) => ({
          ...prev,
          [accountId]: link,
        }));
      };
      const handleSave = async () => {
        setSaving(true);
        try {
          if (accounts.length === 0) {
            // Fallback mode: no accounts found, save link directly using a
            // sentinel key that handleSavePostedLinks recognises
            await onSave({
              __direct__: fallbackLink,
            });
          } else {
            await onSave(links);
          }
          setLinks({});
          setFallbackLink("");
          onClose();
        } catch (e) {
          console.error("Error saving links:", e);
          alert("Failed to save links. Please try again.");
        } finally {
          setSaving(false);
        }
      };
      if (!isOpen || !post) return null;
      const isFallbackMode = !loading && accounts.length === 0;
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className:
            "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "div",
            {
              className:
                "bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-xl",
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className:
                      "border-b-2 border-black p-4 flex items-center justify-between flex-shrink-0",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "h2",
                        {
                          className: "text-2xl font-black",
                          children: "Posted Links",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                          lineNumber: 122,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "button",
                        {
                          onClick: onClose,
                          className:
                            "text-2xl font-bold hover:bg-gray-200 w-10 h-10 flex items-center justify-center rounded",
                          disabled: saving,
                          children: "✕",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                          lineNumber: 123,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                    lineNumber: 121,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className: "overflow-y-auto flex-1 p-6 space-y-4",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "p",
                        {
                          className: "text-sm text-gray-600",
                          children: "Enter the posted link for each account:",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                          lineNumber: 133,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      loading
                        ? /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className: "text-center py-8 text-gray-500",
                              children: "Loading accounts...",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                              lineNumber: 138,
                              columnNumber: 13,
                            },
                            this,
                          )
                        : isFallbackMode // Old single-platform posts — account record not found,
                          ? // let user edit postedLink directly
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
                                    "p",
                                    {
                                      className:
                                        "text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2",
                                      children:
                                        "Account details not found for this post. You can still edit the posted link directly.",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                                      lineNumber: 145,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      type: "url",
                                      placeholder:
                                        "https://instagram.com/reel/... or https://facebook.com/...",
                                      value: fallbackLink,
                                      onChange: (e) =>
                                        setFallbackLink(e.target.value),
                                      disabled: saving,
                                      className: "border-2 border-black",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                                      lineNumber: 148,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                                lineNumber: 144,
                                columnNumber: 13,
                              },
                              this,
                            )
                          : /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "space-y-4",
                                children: accounts.map((account) => {
                                  const accountId =
                                    account._id || account.id || "";
                                  return /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className:
                                        "border rounded-lg p-4 space-y-2",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "div",
                                          {
                                            className:
                                              "flex items-center gap-2 mb-3",
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "PlatformLogo"
                                                ],
                                                {
                                                  platform: account.platform,
                                                  size: "md",
                                                  showLabel: false,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                                                  lineNumber: 167,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "span",
                                                {
                                                  className: "font-semibold",
                                                  children: [
                                                    "@",
                                                    account.handle,
                                                  ],
                                                },
                                                void 0,
                                                true,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                                                  lineNumber: 172,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                              account.displayName &&
                                                account.displayName !==
                                                  account.handle &&
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "span",
                                                  {
                                                    className:
                                                      "text-sm text-gray-600",
                                                    children: [
                                                      "(",
                                                      account.displayName,
                                                      ")",
                                                    ],
                                                  },
                                                  void 0,
                                                  true,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 27,
                                                  },
                                                  this,
                                                ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                                            lineNumber: 166,
                                            columnNumber: 21,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "Input"
                                          ],
                                          {
                                            type: "url",
                                            placeholder:
                                              "https://example.com/post/123",
                                            value: links[accountId] || "",
                                            onChange: (e) =>
                                              handleLinkChange(
                                                accountId,
                                                e.target.value,
                                              ),
                                            disabled: saving,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                                            lineNumber: 180,
                                            columnNumber: 21,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    accountId,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                                      lineNumber: 162,
                                      columnNumber: 19,
                                    },
                                    this,
                                  );
                                }),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                                lineNumber: 158,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                    lineNumber: 132,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className:
                      "border-t-2 border-black p-4 flex justify-end gap-2 flex-shrink-0",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "Button"
                        ],
                        {
                          variant: "outline",
                          onClick: onClose,
                          disabled: saving,
                          children: "Cancel",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                          lineNumber: 197,
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
                          onClick: handleSave,
                          disabled: saving,
                          children: saving ? "Saving..." : "Save Links",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                          lineNumber: 200,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
                    lineNumber: 196,
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
                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
              lineNumber: 120,
              columnNumber: 7,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName:
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx",
          lineNumber: 119,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-selector.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["PlatformSelector", () => PlatformSelector]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/social-media-planner.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx [app-ssr] (ecmascript)",
      );
    ("use client");
    function PlatformSelector({ value, onChange, label = "Platform" }) {
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
              "label",
              {
                className: "block text-sm font-semibold",
                children: [label, " *"],
              },
              void 0,
              true,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-selector.tsx",
                lineNumber: 29,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "Select"
              ],
              {
                value: value,
                onValueChange: onChange,
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "SelectTrigger"
                    ],
                    {
                      className: "w-full",
                      children: /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "SelectValue"
                        ],
                        {
                          placeholder: "Select a platform",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-selector.tsx",
                          lineNumber: 32,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-selector.tsx",
                      lineNumber: 31,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "SelectContent"
                    ],
                    {
                      children:
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "SOCIAL_PLATFORMS"
                        ].map((platform) =>
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "SelectItem"
                            ],
                            {
                              value: platform,
                              children: /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className: "flex items-center gap-2",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "PlatformIcon"
                                      ],
                                      {
                                        platform: platform,
                                        size: "sm",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-selector.tsx",
                                        lineNumber: 38,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        children: platform,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-selector.tsx",
                                        lineNumber: 39,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-selector.tsx",
                                  lineNumber: 37,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            },
                            platform,
                            false,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-selector.tsx",
                              lineNumber: 36,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-selector.tsx",
                      lineNumber: 34,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-selector.tsx",
                lineNumber: 30,
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
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-selector.tsx",
          lineNumber: 28,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["DuplicatePostModal", () => DuplicatePostModal]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$selector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-selector.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$multi$2d$account$2d$selector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/multi-account-selector.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@fortawesome/react-fontawesome/dist/index.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@fortawesome/free-solid-svg-icons/index.mjs [app-ssr] (ecmascript)",
      );
    ("use client");
    function DuplicatePostModal({
      isOpen,
      post,
      clientId,
      onClose,
      onDuplicate,
    }) {
      const [platform, setPlatform] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("Instagram");
      const [accountIds, setAccountIds] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [saving, setSaving] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        if (isOpen && post) {
          setPlatform(post.platform || "Instagram");
          const ids = post.socialAccountIds?.length
            ? post.socialAccountIds
            : post.socialAccountId
              ? [post.socialAccountId]
              : [];
          setAccountIds(ids);
        }
      }, [isOpen, post]);
      const handlePlatformChange = (val) => {
        setPlatform(val);
        setAccountIds([]);
      };
      const handleSave = async () => {
        if (!accountIds.length) {
          alert("Please select at least one account.");
          return;
        }
        setSaving(true);
        try {
          await onDuplicate(platform, accountIds);
          onClose();
        } catch {
          alert("Failed to duplicate post.");
        } finally {
          setSaving(false);
        }
      };
      if (!isOpen || !post) return null;
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className:
            "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4",
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "div",
            {
              className:
                "bg-white border-2 border-black rounded-xl shadow-2xl w-full max-w-md font-headline",
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className:
                      "border-b-2 border-black p-4 flex items-center gap-3",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className:
                            "w-9 h-9 bg-primary border-2 border-black rounded-lg flex items-center justify-center shrink-0",
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "FontAwesomeIcon"
                            ],
                            {
                              icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "faCopy"
                              ],
                              className: "w-4 h-4 text-white",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
                              lineNumber: 70,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
                          lineNumber: 69,
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
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "h2",
                              {
                                className: "text-lg font-black tracking-tight",
                                children: "Duplicate Post",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
                                lineNumber: 73,
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
                                  "text-xs text-muted-foreground font-medium truncate max-w-[280px]",
                                children: post.title,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
                                lineNumber: 74,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
                          lineNumber: 72,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
                    lineNumber: 68,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className: "p-5 space-y-5",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$selector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "PlatformSelector"
                        ],
                        {
                          value: platform,
                          onChange: handlePlatformChange,
                          label: "Platform",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
                          lineNumber: 81,
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
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "label",
                              {
                                className: "block text-sm font-semibold mb-2",
                                children: "Social Accounts *",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
                                lineNumber: 88,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$multi$2d$account$2d$selector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "MultiAccountSelector"
                              ],
                              {
                                clientId: clientId,
                                platforms: [platform],
                                value: accountIds,
                                onChange: (ids) => setAccountIds(ids),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
                                lineNumber: 91,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
                          lineNumber: 87,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
                    lineNumber: 80,
                    columnNumber: 9,
                  },
                  this,
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className:
                      "border-t-2 border-black p-4 flex gap-2 justify-end bg-gray-50 rounded-b-xl",
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "Button"
                        ],
                        {
                          variant: "outline",
                          onClick: onClose,
                          disabled: saving,
                          className: "border-2 border-black",
                          children: "Cancel",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
                          lineNumber: 101,
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
                          onClick: handleSave,
                          disabled: saving || !accountIds.length,
                          className:
                            "bg-primary text-white border-2 border-black hover:bg-primary font-bold shadow-[2px_2px_0px_#000]",
                          children: saving
                            ? "Duplicating…"
                            : "Duplicate & Schedule",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
                          lineNumber: 104,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
                    lineNumber: 100,
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
                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
              lineNumber: 67,
              columnNumber: 7,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName:
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx",
          lineNumber: 66,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => SocialMediaPlannerPage]);
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
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/navigation.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/xlsx/xlsx.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/input.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/hooks/use-auth.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@fortawesome/react-fontawesome/dist/index.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@fortawesome/free-solid-svg-icons/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/social-media-planner.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$client$2d$picker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$add$2d$post$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/add-post-modal.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$social$2d$accounts$2d$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/social-accounts-table.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$view$2d$plan$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/view-plan-modal.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-icon.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$post$2d$links$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-links-modal.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$duplicate$2d$post$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/duplicate-post-modal.tsx [app-ssr] (ecmascript)",
      );
    ("use client");
    const statusBadge = {
      Draft: "bg-gray-100 text-gray-700",
      Ready: "bg-blue-100 text-blue-700",
      Scheduled: "bg-amber-100 text-amber-700",
      Posted: "bg-green-100 text-green-700",
      Missed: "bg-red-100 text-red-700",
      Cancelled: "bg-slate-100 text-slate-700",
    };
    const approvalBadge = {
      Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
      Approved: "bg-green-100 text-green-700 border border-green-300",
      Rejected: "bg-red-100 text-red-700 border border-red-300",
    };
    const approvalFaIcon = {
      Pending:
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "faHourglassHalf"
        ],
      Approved:
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "faCircleCheck"
        ],
      Rejected:
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "faCircleXmark"
        ],
    };
    const approvalIconColor = {
      Pending: "text-yellow-600",
      Approved: "text-green-600",
      Rejected: "text-red-600",
    };
    // Isolated so it can be wrapped in <Suspense> — useSearchParams() requires it
    function MetaBannerSync({ setMetaBanner }) {
      const searchParams = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useSearchParams"
      ])();
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        const connected = searchParams?.get("meta_connected");
        const metaError = searchParams?.get("meta_error");
        if (connected) {
          setMetaBanner({
            type: "success",
            message: `Successfully connected ${connected} account(s) to Meta. You can now sync metrics from the Analytics page.`,
          });
        } else if (metaError) {
          setMetaBanner({
            type: "error",
            message: `Meta connection failed: ${decodeURIComponent(metaError)}`,
          });
        }
      }, [searchParams, setMetaBanner]);
      return null;
    }
    function SocialMediaPlannerPage() {
      const { user } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useAuth"
      ])();
      const [metaBanner, setMetaBanner] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [selectedClientId, setSelectedClientId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [posts, setPosts] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [team, setTeam] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [accountsMap, setAccountsMap] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])({});
      const [isModalOpen, setIsModalOpen] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [editingPost, setEditingPost] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [viewingPlan, setViewingPlan] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [isViewPlanModalOpen, setIsViewPlanModalOpen] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [isPostLinksModalOpen, setIsPostLinksModalOpen] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [postForLinks, setPostForLinks] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [isDuplicateModalOpen, setIsDuplicateModalOpen] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [duplicatingPost, setDuplicatingPost] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [dropdownInfo, setDropdownInfo] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [search, setSearch] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [platformFilter, setPlatformFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [statusFilter, setStatusFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [staffFilter, setStaffFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [contentTypeFilter, setContentTypeFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [campaignFilter, setCampaignFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [dateFrom, setDateFrom] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [dateTo, setDateTo] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const loadPosts = async (clientId) => {
        if (!clientId) {
          setPosts([]);
          return;
        }
        try {
          const url = new URL(
            "/api/social-media-posts",
            window.location.origin,
          );
          url.searchParams.set("clientId", clientId);
          if (user && user.role !== "admin" && user.name) {
            url.searchParams.set("assignedTo", user.name);
          }
          const res = await (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "apiFetch"
          ])(url.toString(), {
            cache: "no-store",
          });
          if (!res.ok) throw new Error("Failed to fetch social posts");
          const data = await res.json();
          setPosts(Array.isArray(data) ? data : []);
        } catch (e) {
          console.error(e);
          setPosts([]);
        }
      };
      const importFileRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useRef"
      ])(null);
      const [importing, setImporting] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const handleExcelImport = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !selectedClientId) return;
        setImporting(true);
        try {
          const buffer = await file.arrayBuffer();
          const wb =
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "read"
            ](new Uint8Array(buffer), {
              type: "array",
            });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const rows =
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "utils"
            ].sheet_to_json(ws, {
              defval: "",
            });
          let created = 0;
          let skipped = 0;
          for (const row of rows) {
            const title = String(row["Title"] || row["title"] || "").trim();
            const scheduledDate = String(
              row["Scheduled Date"] || row["scheduled_date"] || "",
            ).trim();
            const scheduledTime = String(
              row["Scheduled Time"] || row["scheduled_time"] || "",
            ).trim();
            if (!title || !scheduledDate || !scheduledTime) {
              skipped++;
              continue;
            }
            const platform = String(
              row["Platform"] || row["platform"] || "Instagram",
            ).trim();
            const contentType = String(
              row["Content Type"] || row["content_type"] || "Image Post",
            ).trim();
            const post = {
              clientId: selectedClientId,
              title,
              platform,
              platforms: [platform],
              socialAccountId: "",
              socialAccountIds: [],
              contentType,
              caption: String(row["Caption"] || row["caption"] || "").trim(),
              hashtags: String(row["Hashtags"] || row["hashtags"] || "").trim(),
              mediaFile: String(
                row["Media URL"] || row["media_url"] || "",
              ).trim(),
              reelLink: String(
                row["Reel Video Link"] || row["reel_link"] || "",
              ).trim(),
              scheduledDate,
              scheduledTime,
              assignedTo: String(
                row["Assigned To"] || row["assigned_to"] || "",
              ).trim(),
              campaign: String(row["Campaign"] || row["campaign"] || "").trim(),
              notes: String(row["Notes"] || row["notes"] || "").trim(),
              status: "Scheduled",
              approvalStatus: String(
                row["Approval Status"] || row["approval_status"] || "Pending",
              ).trim(),
            };
            await (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "apiFetch"
            ])("/api/social-media-posts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(post),
            });
            created++;
          }
          alert(
            `Import done: ${created} posts created, ${skipped} rows skipped (missing Title/Date/Time).`,
          );
          await loadPosts(selectedClientId);
        } catch (err) {
          alert(`Import failed: ${err.message}`);
        } finally {
          setImporting(false);
          if (importFileRef.current) importFileRef.current.value = "";
        }
      };
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        (async () => {
          try {
            const res = await (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "apiFetch"
            ])("/api/team-members", {
              cache: "no-store",
            });
            if (!res.ok) return;
            const data = await res.json();
            setTeam(Array.isArray(data) ? data : []);
          } catch (e) {
            console.error(e);
          }
        })();
      }, []);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        loadPosts(selectedClientId);
        if (selectedClientId) {
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "apiFetch"
          ])(`/api/social-media-accounts?clientId=${selectedClientId}`, {
            cache: "no-store",
          })
            .then((r) => r.json())
            .then((data) => {
              if (Array.isArray(data)) {
                const map = {};
                data.forEach((a) => {
                  const id = String(a._id || a.id || "");
                  if (id) map[id] = a.displayName || `@${a.handle}`;
                });
                setAccountsMap(map);
              }
            })
            .catch(() => {});
        } else {
          setAccountsMap({});
        }
      }, [selectedClientId, user]);
      const staffOptions = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(() => {
        const fromTeam = team
          .map((m) => String(m?.name || "").trim())
          .filter(Boolean);
        const fromPosts = posts
          .map((p) => String(p.assignedTo || "").trim())
          .filter(Boolean);
        return Array.from(new Set([...fromTeam, ...fromPosts]));
      }, [team, posts]);
      const filtered = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(() => {
        return posts.filter((item) => {
          const text = `${item.title} ${item.caption}`.toLowerCase();
          const q = search.trim().toLowerCase();
          if (q && !text.includes(q)) return false;
          if (platformFilter && item.platform !== platformFilter) return false;
          if (statusFilter && item.status !== statusFilter) return false;
          if (staffFilter && item.assignedTo !== staffFilter) return false;
          if (contentTypeFilter && item.contentType !== contentTypeFilter)
            return false;
          if (campaignFilter && item.campaign !== campaignFilter) return false;
          if (dateFrom && item.scheduledDate < dateFrom) return false;
          if (dateTo && item.scheduledDate > dateTo) return false;
          return true;
        });
      }, [
        posts,
        search,
        platformFilter,
        statusFilter,
        staffFilter,
        contentTypeFilter,
        campaignFilter,
        dateFrom,
        dateTo,
      ]);
      const savePost = async (post) => {
        try {
          const isUpdate = !!(post._id || post.id);
          const method = isUpdate ? "PUT" : "POST";
          const url = isUpdate
            ? `/api/social-media-posts/${post._id || post.id}`
            : "/api/social-media-posts";
          const res = await (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "apiFetch"
          ])(url, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
          });
          const responseData = await res.json();
          if (!res.ok) {
            const errorMsg =
              responseData?.error ||
              (isUpdate ? "Failed to update post" : "Failed to create post");
            throw new Error(errorMsg);
          }
          await loadPosts(selectedClientId);
        } catch (e) {
          console.error("savePost error:", e);
          throw e;
        }
      };
      const deletePost = async (id) => {
        if (!window.confirm("Delete this post plan?")) return;
        const res = await (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "apiFetch"
        ])(`/api/social-media-posts/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          alert("Failed to delete post");
          return;
        }
        await loadPosts(selectedClientId);
      };
      const openDuplicateModal = (item) => {
        setDuplicatingPost(item);
        setIsDuplicateModalOpen(true);
      };
      const handleDuplicate = async (platform, accountIds) => {
        if (!duplicatingPost) return;
        const payload = {
          ...duplicatingPost,
          title: duplicatingPost.title,
          platform,
          socialAccountIds: accountIds,
          socialAccountId: accountIds[0] || "",
          status: "Scheduled",
          postedLink: "",
          postedLinks: {},
          postedAt: undefined,
        };
        delete payload._id;
        delete payload.id;
        const res = await (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "apiFetch"
        ])("/api/social-media-posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error("Failed to duplicate post");
        }
        await loadPosts(selectedClientId);
        setDuplicatingPost(null);
      };
      const updateStatus = async (id, status, post) => {
        if (status === "Posted" && post) {
          const accountIds =
            post.socialAccountIds && post.socialAccountIds.length > 0
              ? post.socialAccountIds
              : post.socialAccountId
                ? [post.socialAccountId]
                : [];
          if (accountIds.length > 1) {
            setPostForLinks(post);
            setIsPostLinksModalOpen(true);
            return;
          } else if (accountIds.length === 1) {
            const accountId = accountIds[0];
            const link =
              window.prompt("Paste posted link (optional):", "") || "";
            const postedLinks =
              link && accountId
                ? {
                    [accountId]: link,
                  }
                : {};
            const res = await (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "apiFetch"
            ])(`/api/social-media-posts/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status,
                postedLink: link,
                postedLinks,
              }),
            });
            if (!res.ok) {
              alert("Failed to update status");
              return;
            }
            await loadPosts(selectedClientId);
            return;
          }
        }
        const body = {
          status,
        };
        const res = await (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "apiFetch"
        ])(`/api/social-media-posts/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          alert("Failed to update status");
          return;
        }
        await loadPosts(selectedClientId);
      };
      const handleSavePostedLinks = async (links) => {
        if (!postForLinks) return;
        const postId = String(postForLinks._id || postForLinks.id || "");
        if (!postId) return;
        let body;
        if ("__direct__" in links) {
          // Fallback mode: old post with no account record — save to postedLink only
          const link = String(links.__direct__ || "").trim();
          body = {
            status: "Posted",
            postedLink: link,
          };
        } else {
          const nonEmptyLinks = Object.fromEntries(
            Object.entries(links).filter(
              ([, link]) => String(link || "").trim().length > 0,
            ),
          );
          const firstLink = Object.values(nonEmptyLinks)[0] || "";
          body = {
            status: "Posted",
            postedLink: firstLink,
            postedLinks: nonEmptyLinks,
          };
        }
        const res = await (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "apiFetch"
        ])(`/api/social-media-posts/${postId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          alert("Failed to update status");
          return;
        }
        setIsPostLinksModalOpen(false);
        setPostForLinks(null);
        await loadPosts(selectedClientId);
      };
      const reschedulePost = async (item) => {
        const nextDate = window.prompt(
          "Reschedule Date (YYYY-MM-DD)",
          item.scheduledDate || "",
        );
        if (!nextDate) return;
        const nextTime = window.prompt(
          "Reschedule Time (HH:MM)",
          item.scheduledTime || "09:00",
        );
        if (!nextTime) return;
        const res = await (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$api$2d$fetch$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "apiFetch"
        ])(`/api/social-media-posts/${item._id || item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            scheduledDate: nextDate,
            scheduledTime: nextTime,
            status: "Scheduled",
          }),
        });
        if (!res.ok) {
          alert("Failed to reschedule");
          return;
        }
        await loadPosts(selectedClientId);
      };
      const editPost = (item) => {
        setEditingPost(item);
        setIsModalOpen(true);
      };
      const openViewPlan = (item) => {
        setViewingPlan(item);
        setIsViewPlanModalOpen(true);
      };
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "space-y-6 font-headline",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "Suspense"
              ],
              {
                fallback: null,
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  MetaBannerSync,
                  {
                    setMetaBanner: setMetaBanner,
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                    lineNumber: 518,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                lineNumber: 517,
                columnNumber: 7,
              },
              this,
            ),
            metaBanner &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "div",
                {
                  className: `rounded-lg border-2 px-4 py-3 text-sm font-medium flex items-center justify-between ${metaBanner.type === "success" ? "border-green-500 bg-green-50 text-green-900" : "border-red-500 bg-red-50 text-red-900"}`,
                  children: [
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "span",
                      {
                        children: metaBanner.message,
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                        lineNumber: 530,
                        columnNumber: 11,
                      },
                      this,
                    ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "button",
                      {
                        className:
                          "ml-4 text-xs underline opacity-70 hover:opacity-100",
                        onClick: () => setMetaBanner(null),
                        children: "Dismiss",
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                        lineNumber: 531,
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
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                  lineNumber: 523,
                  columnNumber: 9,
                },
                this,
              ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "header",
              {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "h1",
                          {
                            className: "text-4xl font-black tracking-tighter",
                            children: "CONTENT PLANNER / SCHEDULER",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                            lineNumber: 543,
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
                            className: "text-muted-foreground",
                            children:
                              "Plan, schedule and track social media posts by platform and staff.",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                            lineNumber: 546,
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
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                      lineNumber: 542,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "flex items-center gap-2",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "default"
                          ],
                          {
                            href: "/social-media-planner",
                            className:
                              "px-3 py-2 border rounded-md text-sm font-semibold",
                            children: "Dashboard",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                            lineNumber: 551,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "default"
                          ],
                          {
                            href: "/social-media-planner/calendar",
                            className:
                              "px-3 py-2 border rounded-md text-sm font-semibold",
                            children: "Calendar",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                            lineNumber: 557,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "default"
                          ],
                          {
                            href: "/social-media-planner/analytics",
                            className:
                              "px-3 py-2 border rounded-md text-sm font-semibold",
                            children: "Analytics",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                            lineNumber: 563,
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
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                      lineNumber: 550,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                lineNumber: 541,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "section",
              {
                className: "border-2 border-black rounded-lg p-4",
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$client$2d$picker$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "ClientPicker"
                  ],
                  {
                    onClientSelected: setSelectedClientId,
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                    lineNumber: 574,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                lineNumber: 573,
                columnNumber: 7,
              },
              this,
            ),
            !selectedClientId &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "section",
                {
                  className:
                    "border-2 border-yellow-400 bg-yellow-50 rounded-lg p-4 flex items-center gap-3",
                  children: [
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "FontAwesomeIcon"
                      ],
                      {
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "faTriangleExclamation"
                        ],
                        className: "text-yellow-600 w-5 h-5 flex-shrink-0",
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                        lineNumber: 580,
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
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "p",
                            {
                              className:
                                "text-sm font-semibold text-yellow-900",
                              children:
                                "Please select a client to view and manage content",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                              lineNumber: 585,
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
                              className: "text-xs text-yellow-700 mt-0.5",
                              children:
                                "Select a client from the dropdown above to start planning.",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                              lineNumber: 588,
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
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                        lineNumber: 584,
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
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                  lineNumber: 579,
                  columnNumber: 9,
                },
                this,
              ),
            selectedClientId &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "section",
                {
                  className: "flex items-center justify-between gap-3",
                  children: [
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className:
                          "flex-1 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50/60",
                        children: /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "flex flex-wrap items-center gap-2",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "span",
                                {
                                  className:
                                    "text-xs font-bold text-gray-500 flex items-center gap-1.5 pr-2.5 border-r border-gray-300 mr-0.5",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "FontAwesomeIcon"
                                      ],
                                      {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "faFilter"
                                        ],
                                        className: "w-3 h-3",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                        lineNumber: 600,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    "Filters",
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                  lineNumber: 599,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "Input"
                                ],
                                {
                                  className:
                                    "h-7 text-xs py-0 w-36 border-gray-300",
                                  placeholder: "Search title / caption…",
                                  value: search,
                                  onChange: (e) => setSearch(e.target.value),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                  lineNumber: 603,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "select",
                                {
                                  className:
                                    "h-7 text-xs px-2 border border-gray-300 rounded-md bg-white",
                                  value: platformFilter,
                                  onChange: (e) =>
                                    setPlatformFilter(e.target.value),
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "option",
                                      {
                                        value: "",
                                        children: "All Platforms",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                        lineNumber: 614,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "SOCIAL_PLATFORMS"
                                    ].map((p) =>
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "option",
                                        {
                                          value: p,
                                          children: p,
                                        },
                                        p,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                          lineNumber: 616,
                                          columnNumber: 19,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                  lineNumber: 609,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "select",
                                {
                                  className:
                                    "h-7 text-xs px-2 border border-gray-300 rounded-md bg-white",
                                  value: statusFilter,
                                  onChange: (e) =>
                                    setStatusFilter(e.target.value),
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "option",
                                      {
                                        value: "",
                                        children: "All Status",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                        lineNumber: 626,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "POST_STATUSES"
                                    ].map((s) =>
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "option",
                                        {
                                          value: s,
                                          children: s,
                                        },
                                        s,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                          lineNumber: 628,
                                          columnNumber: 19,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                  lineNumber: 621,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "select",
                                {
                                  className:
                                    "h-7 text-xs px-2 border border-gray-300 rounded-md bg-white",
                                  value: staffFilter,
                                  onChange: (e) =>
                                    setStaffFilter(e.target.value),
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "option",
                                      {
                                        value: "",
                                        children: "All Staff",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                        lineNumber: 638,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    staffOptions.map((n) =>
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "option",
                                        {
                                          value: n,
                                          children: n,
                                        },
                                        n,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                          lineNumber: 640,
                                          columnNumber: 19,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                  lineNumber: 633,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "select",
                                {
                                  className:
                                    "h-7 text-xs px-2 border border-gray-300 rounded-md bg-white",
                                  value: contentTypeFilter,
                                  onChange: (e) =>
                                    setContentTypeFilter(e.target.value),
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "option",
                                      {
                                        value: "",
                                        children: "All Types",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                        lineNumber: 650,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "CONTENT_TYPES"
                                    ].map((c) =>
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "option",
                                        {
                                          value: c,
                                          children: c,
                                        },
                                        c,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                          lineNumber: 652,
                                          columnNumber: 19,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                  lineNumber: 645,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "Input"
                                ],
                                {
                                  className:
                                    "h-7 text-xs py-0 w-32 border-gray-300",
                                  placeholder: "Campaign…",
                                  value: campaignFilter,
                                  onChange: (e) =>
                                    setCampaignFilter(e.target.value),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                  lineNumber: 657,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "input",
                                {
                                  type: "date",
                                  className:
                                    "h-7 text-xs px-2 border border-gray-300 rounded-md bg-white",
                                  value: dateFrom,
                                  onChange: (e) => setDateFrom(e.target.value),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                  lineNumber: 663,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "input",
                                {
                                  type: "date",
                                  className:
                                    "h-7 text-xs px-2 border border-gray-300 rounded-md bg-white",
                                  value: dateTo,
                                  onChange: (e) => setDateTo(e.target.value),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                  lineNumber: 669,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              (search ||
                                platformFilter ||
                                statusFilter ||
                                staffFilter ||
                                contentTypeFilter ||
                                campaignFilter ||
                                dateFrom ||
                                dateTo) &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "button",
                                  {
                                    onClick: () => {
                                      setSearch("");
                                      setPlatformFilter("");
                                      setStatusFilter("");
                                      setStaffFilter("");
                                      setContentTypeFilter("");
                                      setCampaignFilter("");
                                      setDateFrom("");
                                      setDateTo("");
                                    },
                                    className:
                                      "h-7 text-xs px-2.5 border border-gray-300 rounded-md bg-white flex items-center gap-1.5 hover:bg-gray-100 text-gray-600",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "FontAwesomeIcon"
                                        ],
                                        {
                                          icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "faXmark"
                                          ],
                                          className: "w-3 h-3",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                          lineNumber: 696,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                      "Clear",
                                    ],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                    lineNumber: 683,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                            lineNumber: 598,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                        lineNumber: 597,
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
                        className: "flex items-center gap-2 flex-shrink-0",
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "input",
                            {
                              ref: importFileRef,
                              type: "file",
                              accept: ".xlsx,.xls",
                              className: "hidden",
                              onChange: handleExcelImport,
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                              lineNumber: 704,
                              columnNumber: 13,
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
                              variant: "outline",
                              size: "sm",
                              className: "gap-2 border-2 border-black",
                              disabled: importing || !selectedClientId,
                              onClick: () => importFileRef.current?.click(),
                              title: "Import posts from Excel (.xlsx)",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "FontAwesomeIcon"
                                  ],
                                  {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "faUpload"
                                    ],
                                    className: "w-3 h-3",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                    lineNumber: 719,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                importing ? "Importing…" : "Import Excel",
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                              lineNumber: 711,
                              columnNumber: 13,
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
                              onClick: () => setIsModalOpen(true),
                              size: "sm",
                              className: "gap-2",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "FontAwesomeIcon"
                                  ],
                                  {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "faPlus"
                                    ],
                                    className: "w-3 h-3",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                    lineNumber: 727,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                "Add Plan",
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                              lineNumber: 722,
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
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                        lineNumber: 702,
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
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                  lineNumber: 595,
                  columnNumber: 9,
                },
                this,
              ),
            selectedClientId &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "section",
                {
                  className: "border-2 border-black rounded-lg overflow-hidden",
                  children: [
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className:
                          "p-4 border-b-2 border-black flex items-center justify-between",
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "h2",
                            {
                              className: "text-xl font-black",
                              children: "Planned Posts",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                              lineNumber: 736,
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
                              className: "text-sm text-muted-foreground",
                              children: [filtered.length, " records"],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                              lineNumber: 737,
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
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                        lineNumber: 735,
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
                        className: "overflow-auto",
                        children:
                          posts.length === 0
                            ? /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "p-6 text-center text-muted-foreground bg-gray-50",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className: "text-lg font-semibold",
                                        children:
                                          "No posts planned for this client",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                        lineNumber: 745,
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
                                          "text-sm mt-1 flex items-center justify-center gap-1.5",
                                        children: [
                                          "Click",
                                          " ",
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "FontAwesomeIcon"
                                            ],
                                            {
                                              icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "faPlus"
                                              ],
                                              className: "w-2.5 h-2.5",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                              lineNumber: 750,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          " Add Plan to create your first post",
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                        lineNumber: 748,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                  lineNumber: 744,
                                  columnNumber: 15,
                                },
                                this,
                              )
                            : /*#__PURE__*/ (0,
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
                                    "table",
                                    {
                                      className: "w-full text-sm",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "thead",
                                          {
                                            className: "bg-muted/40",
                                            children: /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "tr",
                                              {
                                                children: [
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "text-left p-2 border-b w-[220px] max-w-[220px]",
                                                      children: "Title",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                      lineNumber: 759,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "text-left p-2 border-b",
                                                      children: "Platform",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                      lineNumber: 762,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "text-left p-2 border-b",
                                                      children: "Account",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                      lineNumber: 763,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "text-left p-2 border-b",
                                                      children: "Content",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                      lineNumber: 764,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "text-left p-2 border-b",
                                                      children:
                                                        "Scheduled / Posted",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                      lineNumber: 765,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "text-left p-2 border-b",
                                                      children: "Assigned",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                      lineNumber: 768,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "text-left p-2 border-b",
                                                      children: "Status",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                      lineNumber: 769,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "text-left p-2 border-b",
                                                      children: "Approval",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                      lineNumber: 770,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "text-left p-2 border-b w-10",
                                                      children: "Actions",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                      lineNumber: 771,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                lineNumber: 758,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                            lineNumber: 757,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "tbody",
                                          {
                                            children: [
                                              filtered.map((item) => {
                                                const itemId = String(
                                                  item._id || item.id || "",
                                                );
                                                const dt = (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "toDateTime"
                                                ])(
                                                  item.scheduledDate,
                                                  item.scheduledTime,
                                                );
                                                const isOverdue =
                                                  !!dt &&
                                                  dt < new Date() &&
                                                  item.status !== "Posted" &&
                                                  item.status !== "Cancelled" &&
                                                  item.status !== "Missed";
                                                const postedAt = item.postedAt
                                                  ? new Date(
                                                      item.postedAt,
                                                    ).toLocaleString("en-IN", {
                                                      day: "2-digit",
                                                      month: "short",
                                                      year: "2-digit",
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                    })
                                                  : null;
                                                return /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "tr",
                                                  {
                                                    className: isOverdue
                                                      ? "bg-red-50"
                                                      : "",
                                                    children: [
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "p-2 border-b align-top w-[220px] max-w-[220px]",
                                                          children: [
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "div",
                                                              {
                                                                className:
                                                                  "font-semibold line-clamp-2 break-words",
                                                                children:
                                                                  item.title,
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                lineNumber: 807,
                                                                columnNumber: 29,
                                                              },
                                                              this,
                                                            ),
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "div",
                                                              {
                                                                className:
                                                                  "text-xs text-muted-foreground line-clamp-1 mt-0.5",
                                                                children:
                                                                  item.caption,
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                lineNumber: 810,
                                                                columnNumber: 29,
                                                              },
                                                              this,
                                                            ),
                                                            item.campaign &&
                                                              /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "inline-block mt-1 px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded font-medium",
                                                                  children:
                                                                    item.campaign,
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                  lineNumber: 814,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              ),
                                                          ],
                                                        },
                                                        void 0,
                                                        true,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                          lineNumber: 806,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "p-2 border-b align-top",
                                                          children:
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "div",
                                                              {
                                                                className:
                                                                  "flex items-center gap-1.5 whitespace-nowrap",
                                                                children: [
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                    "jsxDEV"
                                                                  ])(
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$icon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                      "PlatformIcon"
                                                                    ],
                                                                    {
                                                                      platform:
                                                                        item.platform,
                                                                      size: "sm",
                                                                    },
                                                                    void 0,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                      lineNumber: 821,
                                                                      columnNumber: 31,
                                                                    },
                                                                    this,
                                                                  ),
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                    "jsxDEV"
                                                                  ])(
                                                                    "span",
                                                                    {
                                                                      children:
                                                                        item.platform,
                                                                    },
                                                                    void 0,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                      lineNumber: 825,
                                                                      columnNumber: 31,
                                                                    },
                                                                    this,
                                                                  ),
                                                                ],
                                                              },
                                                              void 0,
                                                              true,
                                                              {
                                                                fileName:
                                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                lineNumber: 820,
                                                                columnNumber: 29,
                                                              },
                                                              this,
                                                            ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                          lineNumber: 819,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "p-2 border-b align-top",
                                                          children: (() => {
                                                            const ids = item
                                                              .socialAccountIds
                                                              ?.length
                                                              ? item.socialAccountIds
                                                              : item.socialAccountId
                                                                ? [
                                                                    item.socialAccountId,
                                                                  ]
                                                                : [];
                                                            if (!ids.length)
                                                              return /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "text-xs text-muted-foreground",
                                                                  children: "—",
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                  lineNumber: 837,
                                                                  columnNumber: 35,
                                                                },
                                                                this,
                                                              );
                                                            return /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "div",
                                                              {
                                                                className:
                                                                  "flex flex-col gap-1",
                                                                children:
                                                                  ids.map(
                                                                    (aid) =>
                                                                      /*#__PURE__*/ (0,
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                        "jsxDEV"
                                                                      ])(
                                                                        "span",
                                                                        {
                                                                          className:
                                                                            "text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 whitespace-nowrap",
                                                                          children:
                                                                            accountsMap[
                                                                              aid
                                                                            ] ||
                                                                            aid,
                                                                        },
                                                                        aid,
                                                                        false,
                                                                        {
                                                                          fileName:
                                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                          lineNumber: 844,
                                                                          columnNumber: 37,
                                                                        },
                                                                        this,
                                                                      ),
                                                                  ),
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                lineNumber: 842,
                                                                columnNumber: 33,
                                                              },
                                                              this,
                                                            );
                                                          })(),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                          lineNumber: 828,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "p-2 border-b align-top whitespace-nowrap",
                                                          children:
                                                            item.contentType,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                          lineNumber: 855,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "p-2 border-b align-top",
                                                          children:
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "div",
                                                              {
                                                                className:
                                                                  "space-y-1",
                                                                children: [
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                    "jsxDEV"
                                                                  ])(
                                                                    "div",
                                                                    {
                                                                      className:
                                                                        "text-xs",
                                                                      children:
                                                                        [
                                                                          /*#__PURE__*/ (0,
                                                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                            "jsxDEV"
                                                                          ])(
                                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                              "FontAwesomeIcon"
                                                                            ],
                                                                            {
                                                                              icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                                "faCalendarDays"
                                                                              ],
                                                                              className:
                                                                                "w-2.5 h-2.5 text-muted-foreground mr-1",
                                                                            },
                                                                            void 0,
                                                                            false,
                                                                            {
                                                                              fileName:
                                                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                              lineNumber: 861,
                                                                              columnNumber: 33,
                                                                            },
                                                                            this,
                                                                          ),
                                                                          /*#__PURE__*/ (0,
                                                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                            "jsxDEV"
                                                                          ])(
                                                                            "span",
                                                                            {
                                                                              className:
                                                                                "font-medium",
                                                                              children:
                                                                                item.scheduledDate,
                                                                            },
                                                                            void 0,
                                                                            false,
                                                                            {
                                                                              fileName:
                                                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                              lineNumber: 865,
                                                                              columnNumber: 33,
                                                                            },
                                                                            this,
                                                                          ),
                                                                          item.scheduledTime &&
                                                                            /*#__PURE__*/ (0,
                                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                              "jsxDEV"
                                                                            ])(
                                                                              "span",
                                                                              {
                                                                                className:
                                                                                  "text-muted-foreground",
                                                                                children:
                                                                                  [
                                                                                    " ",
                                                                                    item.scheduledTime,
                                                                                  ],
                                                                              },
                                                                              void 0,
                                                                              true,
                                                                              {
                                                                                fileName:
                                                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                                lineNumber: 869,
                                                                                columnNumber: 35,
                                                                              },
                                                                              this,
                                                                            ),
                                                                        ],
                                                                    },
                                                                    void 0,
                                                                    true,
                                                                    {
                                                                      fileName:
                                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                      lineNumber: 860,
                                                                      columnNumber: 31,
                                                                    },
                                                                    this,
                                                                  ),
                                                                  postedAt &&
                                                                    /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "text-xs text-green-700 flex items-center gap-1",
                                                                        children:
                                                                          [
                                                                            /*#__PURE__*/ (0,
                                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                              "jsxDEV"
                                                                            ])(
                                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                                "FontAwesomeIcon"
                                                                              ],
                                                                              {
                                                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                                  "faCheck"
                                                                                ],
                                                                                className:
                                                                                  "w-2.5 h-2.5",
                                                                              },
                                                                              void 0,
                                                                              false,
                                                                              {
                                                                                fileName:
                                                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                                lineNumber: 877,
                                                                                columnNumber: 35,
                                                                              },
                                                                              this,
                                                                            ),
                                                                            /*#__PURE__*/ (0,
                                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                              "jsxDEV"
                                                                            ])(
                                                                              "span",
                                                                              {
                                                                                className:
                                                                                  "font-medium",
                                                                                children:
                                                                                  postedAt,
                                                                              },
                                                                              void 0,
                                                                              false,
                                                                              {
                                                                                fileName:
                                                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                                lineNumber: 881,
                                                                                columnNumber: 35,
                                                                              },
                                                                              this,
                                                                            ),
                                                                          ],
                                                                      },
                                                                      void 0,
                                                                      true,
                                                                      {
                                                                        fileName:
                                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                        lineNumber: 876,
                                                                        columnNumber: 33,
                                                                      },
                                                                      this,
                                                                    ),
                                                                ],
                                                              },
                                                              void 0,
                                                              true,
                                                              {
                                                                fileName:
                                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                lineNumber: 859,
                                                                columnNumber: 29,
                                                              },
                                                              this,
                                                            ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                          lineNumber: 858,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "p-2 border-b align-top whitespace-nowrap",
                                                          children:
                                                            item.assignedTo ||
                                                            "Unassigned",
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                          lineNumber: 888,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "p-2 border-b align-top",
                                                          children:
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "span",
                                                              {
                                                                className: `px-2 py-1 rounded text-xs whitespace-nowrap ${statusBadge[item.status] || "bg-gray-100"}`,
                                                                children:
                                                                  item.status,
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                lineNumber: 892,
                                                                columnNumber: 29,
                                                              },
                                                              this,
                                                            ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                          lineNumber: 891,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "p-2 border-b align-top",
                                                          children:
                                                            item.approvalStatus
                                                              ? /*#__PURE__*/ (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                  "jsxDEV"
                                                                ])(
                                                                  "div",
                                                                  {
                                                                    className:
                                                                      "space-y-1",
                                                                    children: [
                                                                      /*#__PURE__*/ (0,
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                        "jsxDEV"
                                                                      ])(
                                                                        "span",
                                                                        {
                                                                          className: `inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap ${approvalBadge[item.approvalStatus] || "bg-gray-100"}`,
                                                                          children:
                                                                            [
                                                                              /*#__PURE__*/ (0,
                                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                                "jsxDEV"
                                                                              ])(
                                                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                                  "FontAwesomeIcon"
                                                                                ],
                                                                                {
                                                                                  icon: approvalFaIcon[
                                                                                    item
                                                                                      .approvalStatus
                                                                                  ],
                                                                                  className: `w-2.5 h-2.5 ${approvalIconColor[item.approvalStatus]}`,
                                                                                },
                                                                                void 0,
                                                                                false,
                                                                                {
                                                                                  fileName:
                                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                                  lineNumber: 904,
                                                                                  columnNumber: 35,
                                                                                },
                                                                                this,
                                                                              ),
                                                                              item.approvalStatus,
                                                                            ],
                                                                        },
                                                                        void 0,
                                                                        true,
                                                                        {
                                                                          fileName:
                                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                          lineNumber: 901,
                                                                          columnNumber: 33,
                                                                        },
                                                                        this,
                                                                      ),
                                                                      item.approvalStatus ===
                                                                        "Rejected" &&
                                                                        item.rejectionReason &&
                                                                        /*#__PURE__*/ (0,
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                          "jsxDEV"
                                                                        ])(
                                                                          "div",
                                                                          {
                                                                            className:
                                                                              "flex items-start gap-1 text-xs text-red-600 max-w-[130px] line-clamp-2 mt-1",
                                                                            title:
                                                                              item.rejectionReason,
                                                                            children:
                                                                              [
                                                                                /*#__PURE__*/ (0,
                                                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                                  "jsxDEV"
                                                                                ])(
                                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                                    "FontAwesomeIcon"
                                                                                  ],
                                                                                  {
                                                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                                      "faComment"
                                                                                    ],
                                                                                    className:
                                                                                      "w-2.5 h-2.5 mt-0.5 flex-shrink-0",
                                                                                  },
                                                                                  void 0,
                                                                                  false,
                                                                                  {
                                                                                    fileName:
                                                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                                    lineNumber: 916,
                                                                                    columnNumber: 39,
                                                                                  },
                                                                                  this,
                                                                                ),
                                                                                /*#__PURE__*/ (0,
                                                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                                  "jsxDEV"
                                                                                ])(
                                                                                  "span",
                                                                                  {
                                                                                    children:
                                                                                      item.rejectionReason,
                                                                                  },
                                                                                  void 0,
                                                                                  false,
                                                                                  {
                                                                                    fileName:
                                                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                                    lineNumber: 920,
                                                                                    columnNumber: 39,
                                                                                  },
                                                                                  this,
                                                                                ),
                                                                              ],
                                                                          },
                                                                          void 0,
                                                                          true,
                                                                          {
                                                                            fileName:
                                                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                            lineNumber: 912,
                                                                            columnNumber: 37,
                                                                          },
                                                                          this,
                                                                        ),
                                                                      item.clientRemarks &&
                                                                        item.approvalStatus !==
                                                                          "Rejected" &&
                                                                        /*#__PURE__*/ (0,
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                          "jsxDEV"
                                                                        ])(
                                                                          "div",
                                                                          {
                                                                            className:
                                                                              "flex items-start gap-1 text-xs text-blue-700 max-w-[130px] line-clamp-2 mt-1",
                                                                            title:
                                                                              item.clientRemarks,
                                                                            children:
                                                                              [
                                                                                /*#__PURE__*/ (0,
                                                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                                  "jsxDEV"
                                                                                ])(
                                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                                    "FontAwesomeIcon"
                                                                                  ],
                                                                                  {
                                                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                                      "faComment"
                                                                                    ],
                                                                                    className:
                                                                                      "w-2.5 h-2.5 mt-0.5 flex-shrink-0",
                                                                                  },
                                                                                  void 0,
                                                                                  false,
                                                                                  {
                                                                                    fileName:
                                                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                                    lineNumber: 931,
                                                                                    columnNumber: 39,
                                                                                  },
                                                                                  this,
                                                                                ),
                                                                                /*#__PURE__*/ (0,
                                                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                                  "jsxDEV"
                                                                                ])(
                                                                                  "span",
                                                                                  {
                                                                                    children:
                                                                                      item.clientRemarks,
                                                                                  },
                                                                                  void 0,
                                                                                  false,
                                                                                  {
                                                                                    fileName:
                                                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                                    lineNumber: 935,
                                                                                    columnNumber: 39,
                                                                                  },
                                                                                  this,
                                                                                ),
                                                                              ],
                                                                          },
                                                                          void 0,
                                                                          true,
                                                                          {
                                                                            fileName:
                                                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                            lineNumber: 927,
                                                                            columnNumber: 37,
                                                                          },
                                                                          this,
                                                                        ),
                                                                    ],
                                                                  },
                                                                  void 0,
                                                                  true,
                                                                  {
                                                                    fileName:
                                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                    lineNumber: 900,
                                                                    columnNumber: 31,
                                                                  },
                                                                  this,
                                                                )
                                                              : /*#__PURE__*/ (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                  "jsxDEV"
                                                                ])(
                                                                  "span",
                                                                  {
                                                                    className:
                                                                      "text-xs text-muted-foreground",
                                                                    children:
                                                                      "—",
                                                                  },
                                                                  void 0,
                                                                  false,
                                                                  {
                                                                    fileName:
                                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                    lineNumber: 940,
                                                                    columnNumber: 31,
                                                                  },
                                                                  this,
                                                                ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                          lineNumber: 898,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "p-2 border-b align-top",
                                                          children:
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "div",
                                                              {
                                                                className:
                                                                  "relative",
                                                                children:
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                    "jsxDEV"
                                                                  ])(
                                                                    "button",
                                                                    {
                                                                      onClick: (
                                                                        e,
                                                                      ) => {
                                                                        e.stopPropagation();
                                                                        if (
                                                                          dropdownInfo?.id ===
                                                                          itemId
                                                                        ) {
                                                                          setDropdownInfo(
                                                                            null,
                                                                          );
                                                                        } else {
                                                                          const rect =
                                                                            e.currentTarget.getBoundingClientRect();
                                                                          setDropdownInfo(
                                                                            {
                                                                              id: itemId,
                                                                              x:
                                                                                rect.right -
                                                                                176,
                                                                              y:
                                                                                rect.bottom +
                                                                                4,
                                                                            },
                                                                          );
                                                                        }
                                                                      },
                                                                      className:
                                                                        "w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100 text-gray-600 font-bold text-lg",
                                                                      title:
                                                                        "Actions",
                                                                      children:
                                                                        "⋯",
                                                                    },
                                                                    void 0,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                      lineNumber: 947,
                                                                      columnNumber: 31,
                                                                    },
                                                                    this,
                                                                  ),
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                                lineNumber: 946,
                                                                columnNumber: 29,
                                                              },
                                                              this,
                                                            ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                          lineNumber: 945,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                    ],
                                                  },
                                                  itemId,
                                                  true,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                    lineNumber: 802,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                );
                                              }),
                                              !filtered.length &&
                                                posts.length > 0 &&
                                                /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "tr",
                                                  {
                                                    children: /*#__PURE__*/ (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      "td",
                                                      {
                                                        colSpan: 9,
                                                        className:
                                                          "p-6 text-center text-muted-foreground",
                                                        children:
                                                          "No posts found for selected filters.",
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                        lineNumber: 975,
                                                        columnNumber: 25,
                                                      },
                                                      this,
                                                    ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                                    lineNumber: 974,
                                                    columnNumber: 23,
                                                  },
                                                  this,
                                                ),
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                            lineNumber: 774,
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
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                      lineNumber: 756,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                              ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                        lineNumber: 742,
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
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                  lineNumber: 734,
                  columnNumber: 9,
                },
                this,
              ),
            selectedClientId &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "section",
                {
                  className: "border-2 border-black rounded-lg p-4",
                  children: /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$social$2d$accounts$2d$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "SocialAccountsTable"
                    ],
                    {
                      clientId: selectedClientId,
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                      lineNumber: 994,
                      columnNumber: 11,
                    },
                    this,
                  ),
                },
                void 0,
                false,
                {
                  fileName:
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                  lineNumber: 993,
                  columnNumber: 9,
                },
                this,
              ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$add$2d$post$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "AddPostModal"
              ],
              {
                isOpen: isModalOpen,
                clientId: selectedClientId,
                onClose: () => {
                  setIsModalOpen(false);
                  setEditingPost(null);
                },
                onSave: savePost,
                staffOptions: staffOptions,
                createdBy: user?.name,
                editingPost: editingPost,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                lineNumber: 999,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$view$2d$plan$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "ViewPlanModal"
              ],
              {
                isOpen: isViewPlanModalOpen,
                plan: viewingPlan,
                onClose: () => {
                  setIsViewPlanModalOpen(false);
                  setViewingPlan(null);
                },
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                lineNumber: 1013,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$post$2d$links$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "PostLinksModal"
              ],
              {
                isOpen: isPostLinksModalOpen,
                post: postForLinks,
                accountIds: postForLinks?.socialAccountIds?.length
                  ? postForLinks.socialAccountIds
                  : postForLinks?.socialAccountId
                    ? [postForLinks.socialAccountId]
                    : [],
                onClose: () => {
                  setIsPostLinksModalOpen(false);
                  setPostForLinks(null);
                },
                onSave: handleSavePostedLinks,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                lineNumber: 1022,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$duplicate$2d$post$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "DuplicatePostModal"
              ],
              {
                isOpen: isDuplicateModalOpen,
                post: duplicatingPost,
                clientId: selectedClientId,
                onClose: () => {
                  setIsDuplicateModalOpen(false);
                  setDuplicatingPost(null);
                },
                onDuplicate: handleDuplicate,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                lineNumber: 1039,
                columnNumber: 7,
              },
              this,
            ),
            dropdownInfo &&
              (() => {
                const dp = filtered.find(
                  (p) => String(p._id || p.id) === dropdownInfo.id,
                );
                if (!dp) return null;
                const dpId = dropdownInfo.id;
                return /*#__PURE__*/ (0,
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
                          className: "fixed inset-0 z-[9998]",
                          onClick: () => setDropdownInfo(null),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                          lineNumber: 1060,
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
                          style: {
                            position: "fixed",
                            top: dropdownInfo.y,
                            left: Math.max(8, dropdownInfo.x),
                            zIndex: 9999,
                          },
                          className:
                            "bg-white border-2 border-black rounded-xl shadow-2xl w-48 py-1.5 text-sm",
                          onClick: (e) => e.stopPropagation(),
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "button",
                              {
                                onClick: () => {
                                  openViewPlan(dp);
                                  setDropdownInfo(null);
                                },
                                className:
                                  "w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2.5 font-medium text-gray-700",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "FontAwesomeIcon"
                                    ],
                                    {
                                      icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "faEye"
                                      ],
                                      className: "w-3.5 h-3.5 text-gray-400",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                      lineNumber: 1081,
                                      columnNumber: 19,
                                    },
                                    this,
                                  ),
                                  " ",
                                  "View Details",
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                lineNumber: 1074,
                                columnNumber: 17,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "button",
                              {
                                onClick: () => {
                                  editPost(dp);
                                  setDropdownInfo(null);
                                },
                                className:
                                  "w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2.5 font-medium text-gray-700",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "FontAwesomeIcon"
                                    ],
                                    {
                                      icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "faPen"
                                      ],
                                      className: "w-3.5 h-3.5 text-gray-400",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                      lineNumber: 1094,
                                      columnNumber: 19,
                                    },
                                    this,
                                  ),
                                  " ",
                                  "Edit",
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                lineNumber: 1087,
                                columnNumber: 17,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "button",
                              {
                                onClick: () => {
                                  openDuplicateModal(dp);
                                  setDropdownInfo(null);
                                },
                                className:
                                  "w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2.5 font-medium text-gray-700",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "FontAwesomeIcon"
                                    ],
                                    {
                                      icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "faCopy"
                                      ],
                                      className: "w-3.5 h-3.5 text-gray-400",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                      lineNumber: 1107,
                                      columnNumber: 19,
                                    },
                                    this,
                                  ),
                                  " ",
                                  "Duplicate",
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                lineNumber: 1100,
                                columnNumber: 17,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "button",
                              {
                                onClick: () => {
                                  reschedulePost(dp);
                                  setDropdownInfo(null);
                                },
                                className:
                                  "w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2.5 font-medium text-gray-700",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "FontAwesomeIcon"
                                    ],
                                    {
                                      icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "faCalendarDays"
                                      ],
                                      className: "w-3.5 h-3.5 text-gray-400",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                      lineNumber: 1120,
                                      columnNumber: 19,
                                    },
                                    this,
                                  ),
                                  " ",
                                  "Reschedule",
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                lineNumber: 1113,
                                columnNumber: 17,
                              },
                              this,
                            ),
                            dp.status === "Posted" &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "button",
                                {
                                  onClick: () => {
                                    setPostForLinks(dp);
                                    setIsPostLinksModalOpen(true);
                                    setDropdownInfo(null);
                                  },
                                  className:
                                    "w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-700 flex items-center gap-2.5 font-medium",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "FontAwesomeIcon"
                                      ],
                                      {
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "faLink"
                                        ],
                                        className: "w-3.5 h-3.5",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                        lineNumber: 1135,
                                        columnNumber: 21,
                                      },
                                      this,
                                    ),
                                    " ",
                                    "Edit Posted Links",
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                  lineNumber: 1127,
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
                                className: "border-t border-gray-100 my-1",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                lineNumber: 1139,
                                columnNumber: 17,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "button",
                              {
                                onClick: () => {
                                  updateStatus(dpId, "Posted", dp);
                                  setDropdownInfo(null);
                                },
                                className:
                                  "w-full text-left px-4 py-2 hover:bg-green-50 text-green-700 flex items-center gap-2.5 font-medium",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "FontAwesomeIcon"
                                    ],
                                    {
                                      icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "faCheck"
                                      ],
                                      className: "w-3.5 h-3.5",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                      lineNumber: 1147,
                                      columnNumber: 19,
                                    },
                                    this,
                                  ),
                                  " ",
                                  "Mark Posted",
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                lineNumber: 1140,
                                columnNumber: 17,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "button",
                              {
                                onClick: () => {
                                  updateStatus(dpId, "Missed");
                                  setDropdownInfo(null);
                                },
                                className:
                                  "w-full text-left px-4 py-2 hover:bg-amber-50 text-amber-700 flex items-center gap-2.5 font-medium",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "FontAwesomeIcon"
                                    ],
                                    {
                                      icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "faTriangleExclamation"
                                      ],
                                      className: "w-3.5 h-3.5",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                      lineNumber: 1157,
                                      columnNumber: 19,
                                    },
                                    this,
                                  ),
                                  " ",
                                  "Mark Missed",
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                lineNumber: 1150,
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
                                className: "border-t border-gray-100 my-1",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                lineNumber: 1163,
                                columnNumber: 17,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "button",
                              {
                                onClick: () => {
                                  deletePost(dpId);
                                  setDropdownInfo(null);
                                },
                                className:
                                  "w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2.5 font-medium",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$react$2d$fontawesome$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "FontAwesomeIcon"
                                    ],
                                    {
                                      icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$fortawesome$2f$free$2d$solid$2d$svg$2d$icons$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "faTrash"
                                      ],
                                      className: "w-3.5 h-3.5",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                      lineNumber: 1171,
                                      columnNumber: 19,
                                    },
                                    this,
                                  ),
                                  " ",
                                  "Delete",
                                ],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                                lineNumber: 1164,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
                          lineNumber: 1064,
                          columnNumber: 15,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                );
              })(),
          ],
        },
        void 0,
        true,
        {
          fileName:
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/planner/page.tsx",
          lineNumber: 515,
          columnNumber: 5,
        },
        this,
      );
    }
  },
];

//# sourceMappingURL=Desktop_Projects_final-pixelate_dashboard_src_bb6d1db7._.js.map
