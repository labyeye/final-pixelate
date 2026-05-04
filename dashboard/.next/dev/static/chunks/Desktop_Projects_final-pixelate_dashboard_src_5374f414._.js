(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === "object" ? document.currentScript : undefined,
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/input.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["Input", () => Input]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/utils.ts [app-client] (ecmascript)",
      );
    const Input =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c = ({ className, type, ...props }, ref) => {
          return (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "input",
            {
              type: type,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
        }),
      );
    _c1 = Input;
    Input.displayName = "Input";
    var _c, _c1;
    __turbopack_context__.k.register(_c, "Input$React.forwardRef");
    __turbopack_context__.k.register(_c1, "Input");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/social-media-planner.ts [app-client] (ecmascript)",
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
      "Cancelled",
    ];
    const toDateTime = (scheduledDate, scheduledTime) => {
      if (!scheduledDate) return null;
      const time =
        scheduledTime && scheduledTime.trim() ? scheduledTime : "00:00";
      const date = new Date(`${scheduledDate}T${time}:00`);
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
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["ClientPicker", () => ClientPicker]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    const STORAGE_KEY = "selectedClientId";
    function ClientPicker({ onClientSelected, onClientsLoaded }) {
      _s();
      const [clients, setClients] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [selectedId, setSelectedId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(true);
      const [error, setError] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "ClientPicker.useEffect": () => {
            const loadClients = {
              "ClientPicker.useEffect.loadClients": async () => {
                try {
                  setLoading(true);
                  const res = await fetch("/api/clients", {
                    cache: "no-store",
                  });
                  if (!res.ok) throw new Error("Failed to fetch clients");
                  const data = await res.json();
                  const clientList = Array.isArray(data) ? data : [];
                  setClients(clientList);
                  onClientsLoaded?.(clientList);
                  const stored = ("TURBOPACK compile-time truthy", 1)
                    ? localStorage.getItem(STORAGE_KEY)
                    : "TURBOPACK unreachable";
                  if (
                    stored &&
                    clientList.some(
                      {
                        "ClientPicker.useEffect.loadClients": (c) =>
                          (c._id || c.id) === stored,
                      }["ClientPicker.useEffect.loadClients"],
                    )
                  ) {
                    setSelectedId(stored);
                    onClientSelected(stored);
                  }
                } catch (e) {
                  console.error(e);
                  setError("Failed to load clients");
                } finally {
                  setLoading(false);
                }
              },
            }["ClientPicker.useEffect.loadClients"];
            loadClients();
          },
        }["ClientPicker.useEffect"],
        [onClientSelected, onClientsLoaded],
      );
      const handleChange = (clientId) => {
        setSelectedId(clientId);
        if (("TURBOPACK compile-time truthy", 1)) {
          localStorage.setItem(STORAGE_KEY, clientId);
        }
        onClientSelected(clientId);
      };
      if (loading) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            className: "flex items-center gap-2",
            children: [
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                  lineNumber: 65,
                  columnNumber: 9,
                },
                this,
              ),
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "select",
                {
                  disabled: true,
                  className: "border rounded-md px-3 py-2 bg-gray-100",
                  children: (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                      lineNumber: 67,
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
                  lineNumber: 66,
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
            lineNumber: 64,
            columnNumber: 7,
          },
          this,
        );
      }
      if (error) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            className: "flex items-center gap-2 text-red-600",
            children: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                lineNumber: 76,
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
            lineNumber: 75,
            columnNumber: 7,
          },
          this,
        );
      }
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "flex items-center gap-2",
          children: [
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                lineNumber: 83,
                columnNumber: 7,
              },
              this,
            ),
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "select",
              {
                value: selectedId,
                onChange: (e) => handleChange(e.target.value),
                className: "border rounded-md px-3 py-2 min-w-[200px]",
                children: [
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                      lineNumber: 89,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  clients.map((client) =>
                    (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                        lineNumber: 91,
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
                lineNumber: 84,
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
          lineNumber: 82,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(ClientPicker, "G0GFSEMEsPlZNmhqJYFR96bRqdo=");
    _c = ClientPicker;
    var _c;
    __turbopack_context__.k.register(_c, "ClientPicker");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx [app-client] (ecmascript)",
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
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/utils.ts [app-client] (ecmascript)",
      );
    ("use client");
    const Dialog =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "Root"
      ];
    const DialogTrigger =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "Trigger"
      ];
    const DialogPortal =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "Portal"
      ];
    const DialogClose =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "Close"
      ];
    const DialogOverlay =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "Overlay"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
    _c = DialogOverlay;
    DialogOverlay.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "Overlay"
      ].displayName;
    const DialogContent =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c1 = ({ className, children, ...props }, ref) =>
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            DialogPortal,
            {
              children: [
                (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "Content"
                  ],
                  {
                    ref: ref,
                    className: (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "cn"
                    ])(
                      "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border-2 bg-background p-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-none",
                      className,
                    ),
                    ...props,
                    children: [
                      children,
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "Close"
                        ],
                        {
                          className:
                            "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
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
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c2 = DialogContent;
    DialogContent.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "Content"
      ].displayName;
    const DialogHeader = ({ className, ...props }) =>
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
    _c3 = DialogHeader;
    DialogHeader.displayName = "DialogHeader";
    const DialogFooter = ({ className, ...props }) =>
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
    _c4 = DialogFooter;
    DialogFooter.displayName = "DialogFooter";
    const DialogTitle =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c5 = ({ className, ...props }, ref) =>
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "Title"
            ],
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "cn"
              ])(
                "text-lg font-semibold leading-none tracking-tight",
                className,
              ),
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
          )),
      );
    _c6 = DialogTitle;
    DialogTitle.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "Title"
      ].displayName;
    const DialogDescription =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c7 = ({ className, ...props }, ref) =>
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "Description"
            ],
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c8 = DialogDescription;
    DialogDescription.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "Description"
      ].displayName;
    var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
    __turbopack_context__.k.register(_c, "DialogOverlay");
    __turbopack_context__.k.register(_c1, "DialogContent$React.forwardRef");
    __turbopack_context__.k.register(_c2, "DialogContent");
    __turbopack_context__.k.register(_c3, "DialogHeader");
    __turbopack_context__.k.register(_c4, "DialogFooter");
    __turbopack_context__.k.register(_c5, "DialogTitle$React.forwardRef");
    __turbopack_context__.k.register(_c6, "DialogTitle");
    __turbopack_context__.k.register(_c7, "DialogDescription$React.forwardRef");
    __turbopack_context__.k.register(_c8, "DialogDescription");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["UpdateMetricsModal", () => UpdateMetricsModal]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/input.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    function UpdateMetricsModal({
      isOpen,
      postTitle,
      currentMetrics,
      onClose,
      onSave,
    }) {
      _s();
      const [metrics, setMetrics] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(currentMetrics);
      const [isSaving, setIsSaving] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "UpdateMetricsModal.useEffect": () => {
            setMetrics(currentMetrics);
          },
        }["UpdateMetricsModal.useEffect"],
        [currentMetrics, isOpen],
      );
      const handleMetricChange = (field, value) => {
        const numValue = Math.max(0, parseInt(value) || 0);
        setMetrics((prev) => ({
          ...prev,
          [field]: numValue,
        }));
      };
      const handleSave = async () => {
        setIsSaving(true);
        try {
          await onSave(metrics);
          onClose();
        } catch (error) {
          console.error("Failed to save metrics:", error);
          alert("Failed to update metrics. Please try again.");
        } finally {
          setIsSaving(false);
        }
      };
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "Dialog"
        ],
        {
          open: isOpen,
          onOpenChange: onClose,
          children: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "DialogContent"
            ],
            {
              className: "max-w-md",
              children: [
                (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "DialogHeader"
                  ],
                  {
                    children: [
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "DialogTitle"
                        ],
                        {
                          children: "Update Metrics",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                          lineNumber: 73,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "p",
                        {
                          className: "text-sm text-gray-600 mt-2",
                          children: ["Post: ", postTitle],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                          lineNumber: 74,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                    lineNumber: 72,
                    columnNumber: 9,
                  },
                  this,
                ),
                (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className: "space-y-4",
                    children: [
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "label",
                              {
                                className: "block text-sm font-semibold mb-1",
                                children: "Views",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                                lineNumber: 79,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Input"
                              ],
                              {
                                type: "number",
                                min: "0",
                                value: metrics.views,
                                onChange: (e) =>
                                  handleMetricChange("views", e.target.value),
                                placeholder: "0",
                                disabled: isSaving,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                                lineNumber: 80,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                          lineNumber: 78,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "label",
                              {
                                className: "block text-sm font-semibold mb-1",
                                children: "Likes",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                                lineNumber: 91,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Input"
                              ],
                              {
                                type: "number",
                                min: "0",
                                value: metrics.likes,
                                onChange: (e) =>
                                  handleMetricChange("likes", e.target.value),
                                placeholder: "0",
                                disabled: isSaving,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                                lineNumber: 92,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                          lineNumber: 90,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "label",
                              {
                                className: "block text-sm font-semibold mb-1",
                                children: "Comments",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                                lineNumber: 103,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Input"
                              ],
                              {
                                type: "number",
                                min: "0",
                                value: metrics.comments,
                                onChange: (e) =>
                                  handleMetricChange(
                                    "comments",
                                    e.target.value,
                                  ),
                                placeholder: "0",
                                disabled: isSaving,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                                lineNumber: 104,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                          lineNumber: 102,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "label",
                              {
                                className: "block text-sm font-semibold mb-1",
                                children: "Shares",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                                lineNumber: 115,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Input"
                              ],
                              {
                                type: "number",
                                min: "0",
                                value: metrics.shares,
                                onChange: (e) =>
                                  handleMetricChange("shares", e.target.value),
                                placeholder: "0",
                                disabled: isSaving,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                                lineNumber: 116,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                          lineNumber: 114,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "label",
                              {
                                className: "block text-sm font-semibold mb-1",
                                children: "Followers Gained",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                                lineNumber: 127,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Input"
                              ],
                              {
                                type: "number",
                                min: "0",
                                value: metrics.followers_gained,
                                onChange: (e) =>
                                  handleMetricChange(
                                    "followers_gained",
                                    e.target.value,
                                  ),
                                placeholder: "0",
                                disabled: isSaving,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                                lineNumber: 128,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                          lineNumber: 126,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                    lineNumber: 77,
                    columnNumber: 9,
                  },
                  this,
                ),
                (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "DialogFooter"
                  ],
                  {
                    children: [
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "Button"
                        ],
                        {
                          variant: "outline",
                          onClick: onClose,
                          disabled: isSaving,
                          children: "Cancel",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                          lineNumber: 140,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "Button"
                        ],
                        {
                          onClick: handleSave,
                          disabled: isSaving,
                          children: isSaving ? "Saving..." : "Save",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                          lineNumber: 147,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
                    lineNumber: 139,
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
                "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
              lineNumber: 71,
              columnNumber: 7,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName:
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx",
          lineNumber: 70,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(UpdateMetricsModal, "sibfTiY9eqJElBeMi/+2OsrJv78=");
    _c = UpdateMetricsModal;
    var _c;
    __turbopack_context__.k.register(_c, "UpdateMetricsModal");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["PlatformLogo", () => PlatformLogo]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript) <export default as Facebook>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-client] (ecmascript) <export default as Linkedin>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>",
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
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__[
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
                lineNumber: 55,
                columnNumber: 16,
              },
              this,
            );
          case "Facebook":
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__[
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
                lineNumber: 57,
                columnNumber: 16,
              },
              this,
            );
          case "LinkedIn":
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__[
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
                lineNumber: 59,
                columnNumber: 16,
              },
              this,
            );
          case "X / Twitter":
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                lineNumber: 61,
                columnNumber: 16,
              },
              this,
            );
          case "YouTube Shorts":
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__[
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
                lineNumber: 63,
                columnNumber: 16,
              },
              this,
            );
          case "WhatsApp Channel":
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__[
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
                lineNumber: 65,
                columnNumber: 16,
              },
              this,
            );
          case "Google My Business":
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__[
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
                lineNumber: 67,
                columnNumber: 16,
              },
              this,
            );
          default:
            return (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                lineNumber: 69,
                columnNumber: 16,
              },
              this,
            );
        }
      };
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "flex items-center gap-2",
          children: [
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                lineNumber: 75,
                columnNumber: 7,
              },
              this,
            ),
            showLabel &&
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                  lineNumber: 80,
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
          lineNumber: 74,
          columnNumber: 5,
        },
        this,
      );
    }
    _c = PlatformLogo;
    var _c;
    __turbopack_context__.k.register(_c, "PlatformLogo");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["PostAccountDisplay", () => PostAccountDisplay]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/platform-logo.tsx [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    function PostAccountDisplay({
      accountId,
      fallback = "(No Account)",
      className = "",
    }) {
      _s();
      const [account, setAccount] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(!!accountId);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "PostAccountDisplay.useEffect": () => {
            if (!accountId) {
              setLoading(false);
              return;
            }
            const fetchAccount = {
              "PostAccountDisplay.useEffect.fetchAccount": async () => {
                try {
                  setLoading(true);
                  const url = new URL(
                    "/api/social-media-accounts",
                    window.location.origin,
                  );
                  url.searchParams.set("id", accountId);
                  const res = await fetch(url.toString(), {
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
              },
            }["PostAccountDisplay.useEffect.fetchAccount"];
            fetchAccount();
          },
        }["PostAccountDisplay.useEffect"],
        [accountId],
      );
      if (loading) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
            lineNumber: 50,
            columnNumber: 12,
          },
          this,
        );
      }
      if (!account) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
            lineNumber: 54,
            columnNumber: 12,
          },
          this,
        );
      }
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: `font-medium inline-flex items-center gap-2 ${className}`,
          children: [
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$platform$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                lineNumber: 59,
                columnNumber: 7,
              },
              this,
            ),
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "span",
              {
                children: [
                  "@",
                  account.handle,
                  account.displayName &&
                    account.displayName !== account.handle &&
                    (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                        lineNumber: 63,
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
                lineNumber: 60,
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
          lineNumber: 58,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(PostAccountDisplay, "cR9ePtzxDg2FbIF5ZsBHSTB1khY=");
    _c = PostAccountDisplay;
    var _c;
    __turbopack_context__.k.register(_c, "PostAccountDisplay");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => AnalyticsPage]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/input.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/hooks/use-auth.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/social-media-planner.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$client$2d$picker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/client-picker.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$update$2d$metrics$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/update-metrics-modal.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$post$2d$account$2d$display$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/social-media/post-account-display.tsx [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    const NO_ACCOUNT = "__no_account__";
    function getAccountMetrics(post, accountId) {
      if (accountId === NO_ACCOUNT) {
        return {
          views: post.views || 0,
          likes: post.likes || 0,
          comments: post.comments || 0,
          shares: post.shares || 0,
          followers_gained: post.followers_gained || 0,
        };
      }
      return (
        post.accountMetrics?.[accountId] || {
          views: 0,
          likes: 0,
          comments: 0,
          shares: 0,
          followers_gained: 0,
        }
      );
    }
    function AnalyticsPage() {
      _s();
      const { user } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useAuth"
      ])();
      const [selectedClientId, setSelectedClientId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [posts, setPosts] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [clients, setClients] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [search, setSearch] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [platformFilter, setPlatformFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [contentTypeFilter, setContentTypeFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [dateFrom, setDateFrom] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [dateTo, setDateTo] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [isMetricsModalOpen, setIsMetricsModalOpen] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [selectedPostForMetrics, setSelectedPostForMetrics] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [syncingKey, setSyncingKey] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [syncError, setSyncError] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [inlineEditingKey, setInlineEditingKey] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [inlineMetrics, setInlineMetrics] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])({
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        followers_gained: 0,
      });
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
          if (dateFrom) url.searchParams.set("fromDate", dateFrom);
          if (dateTo) url.searchParams.set("toDate", dateTo);
          const res = await fetch(url.toString(), {
            cache: "no-store",
          });
          if (!res.ok) throw new Error("Failed to fetch analytics data");
          const data = await res.json();
          setPosts(Array.isArray(data) ? data : []);
        } catch (e) {
          console.error(e);
          setPosts([]);
        }
      };
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "AnalyticsPage.useEffect": () => {
            ({
              "AnalyticsPage.useEffect": async () => {
                try {
                  const res = await fetch("/api/clients", {
                    cache: "no-store",
                  });
                  if (!res.ok) return;
                  const data = await res.json();
                  setClients(Array.isArray(data) ? data : []);
                } catch (e) {
                  console.error(e);
                }
              },
            })["AnalyticsPage.useEffect"]();
          },
        }["AnalyticsPage.useEffect"],
        [],
      );
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "AnalyticsPage.useEffect": () => {
            loadPosts(selectedClientId);
          },
        }["AnalyticsPage.useEffect"],
        [selectedClientId, dateFrom, dateTo, user],
      );
      const selectedClient = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AnalyticsPage.useMemo[selectedClient]": () =>
            clients.find(
              {
                "AnalyticsPage.useMemo[selectedClient]": (c) =>
                  (c._id || c.id) === selectedClientId,
              }["AnalyticsPage.useMemo[selectedClient]"],
            ),
        }["AnalyticsPage.useMemo[selectedClient]"],
        [clients, selectedClientId],
      );
      const filteredPosts = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AnalyticsPage.useMemo[filteredPosts]": () => {
            return posts.filter(
              {
                "AnalyticsPage.useMemo[filteredPosts]": (post) => {
                  const matchesSearch = post.title
                    .toLowerCase()
                    .includes(search.toLowerCase());
                  const matchesPlatform =
                    !platformFilter || post.platform === platformFilter;
                  const matchesContentType =
                    !contentTypeFilter ||
                    post.contentType === contentTypeFilter;
                  return matchesSearch && matchesPlatform && matchesContentType;
                },
              }["AnalyticsPage.useMemo[filteredPosts]"],
            );
          },
        }["AnalyticsPage.useMemo[filteredPosts]"],
        [posts, search, platformFilter, contentTypeFilter],
      );
      const flatRows = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AnalyticsPage.useMemo[flatRows]": () => {
            return filteredPosts.flatMap(
              {
                "AnalyticsPage.useMemo[flatRows]": (post) => {
                  const accountIds =
                    post.socialAccountIds && post.socialAccountIds.length > 0
                      ? post.socialAccountIds
                      : post.socialAccountId
                        ? [post.socialAccountId]
                        : [NO_ACCOUNT];
                  return accountIds.map(
                    {
                      "AnalyticsPage.useMemo[flatRows]": (accountId, idx) => ({
                        post,
                        accountId,
                        isFirst: idx === 0,
                        totalAccounts: accountIds.length,
                      }),
                    }["AnalyticsPage.useMemo[flatRows]"],
                  );
                },
              }["AnalyticsPage.useMemo[flatRows]"],
            );
          },
        }["AnalyticsPage.useMemo[flatRows]"],
        [filteredPosts],
      );
      const summary = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AnalyticsPage.useMemo[summary]": () => {
            return posts.reduce(
              {
                "AnalyticsPage.useMemo[summary]": (acc, p) => {
                  const accountIds =
                    p.socialAccountIds && p.socialAccountIds.length > 0
                      ? p.socialAccountIds
                      : p.socialAccountId
                        ? [p.socialAccountId]
                        : null;
                  if (accountIds && p.accountMetrics) {
                    let hasAny = false;
                    for (const id of accountIds) {
                      const m = p.accountMetrics[id];
                      if (m) {
                        hasAny = true;
                        acc.totalViews += m.views || 0;
                        acc.totalLikes += m.likes || 0;
                        acc.totalComments += m.comments || 0;
                        acc.totalShares += m.shares || 0;
                        acc.totalFollowersGained += m.followers_gained || 0;
                      }
                    }
                    if (!hasAny) {
                      acc.totalViews += p.views || 0;
                      acc.totalLikes += p.likes || 0;
                      acc.totalComments += p.comments || 0;
                      acc.totalShares += p.shares || 0;
                      acc.totalFollowersGained += p.followers_gained || 0;
                    }
                  } else {
                    acc.totalViews += p.views || 0;
                    acc.totalLikes += p.likes || 0;
                    acc.totalComments += p.comments || 0;
                    acc.totalShares += p.shares || 0;
                    acc.totalFollowersGained += p.followers_gained || 0;
                  }
                  return acc;
                },
              }["AnalyticsPage.useMemo[summary]"],
              {
                totalViews: 0,
                totalLikes: 0,
                totalComments: 0,
                totalShares: 0,
                totalFollowersGained: 0,
              },
            );
          },
        }["AnalyticsPage.useMemo[summary]"],
        [posts],
      );
      const handleSyncMetrics = async (post, accountId) => {
        const postId = post._id || post.id;
        setSyncingKey({
          postId,
          accountId,
        });
        setSyncError(null);
        try {
          const res = await fetch("/api/social-media-metrics/sync", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              postId,
              accountId,
            }),
          });
          const data = await res.json();
          if (!res.ok) {
            setSyncError(data.error || "Sync failed");
          } else {
            await loadPosts(selectedClientId);
          }
        } catch (e) {
          setSyncError(e.message || "Sync failed");
        } finally {
          setSyncingKey(null);
        }
      };
      const handleStartInlineEdit = (post, accountId) => {
        setInlineEditingKey({
          postId: post._id || post.id,
          accountId,
        });
        setInlineMetrics(getAccountMetrics(post, accountId));
      };
      const handleCancelInlineEdit = () => {
        setInlineEditingKey(null);
      };
      const handleSaveInlineMetrics = async () => {
        if (!inlineEditingKey) return;
        try {
          const body = {
            id: inlineEditingKey.postId,
            ...inlineMetrics,
          };
          if (inlineEditingKey.accountId !== NO_ACCOUNT) {
            body.accountId = inlineEditingKey.accountId;
          }
          const res = await fetch("/api/social-media-posts", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          if (!res.ok) throw new Error("Failed to update metrics");
          await loadPosts(selectedClientId);
          setInlineEditingKey(null);
        } catch (error) {
          console.error("Error saving metrics:", error);
          alert("Failed to save metrics. Please try again.");
        }
      };
      const engagementRate = (m) => {
        if (!m.views) return "—";
        const rate = ((m.likes + m.comments + m.shares) / m.views) * 100;
        return `${rate.toFixed(2)}%`;
      };
      const handleExportCSV = () => {
        const headers = [
          "Title",
          "Platform",
          "Account ID",
          "Date",
          "Views",
          "Likes",
          "Comments",
          "Shares",
          "Followers",
          "Eng. Rate",
        ];
        const rows = flatRows.map(({ post, accountId }) => {
          const m = getAccountMetrics(post, accountId);
          const er = m.views
            ? (((m.likes + m.comments + m.shares) / m.views) * 100).toFixed(2) +
              "%"
            : "—";
          return [
            `"${post.title.replace(/"/g, '""')}"`,
            post.platform,
            accountId === NO_ACCOUNT ? "" : accountId,
            post.scheduledDate,
            m.views,
            m.likes,
            m.comments,
            m.shares,
            m.followers_gained,
            er,
          ].join(",");
        });
        const csv = [headers.join(","), ...rows].join("\n");
        const blob = new Blob([csv], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `analytics-${selectedClient?.name || "export"}-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      };
      const handleSaveMetrics = async (metrics) => {
        if (!selectedPostForMetrics) return;
        try {
          const res = await fetch("/api/social-media-posts", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: selectedPostForMetrics._id || selectedPostForMetrics.id,
              ...metrics,
            }),
          });
          if (!res.ok) throw new Error("Failed to update metrics");
          await loadPosts(selectedClientId);
          setIsMetricsModalOpen(false);
        } catch (error) {
          console.error("Error saving metrics:", error);
          throw error;
        }
      };
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "space-y-6 font-headline",
          children: [
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "header",
              {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      children: [
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "h1",
                          {
                            className: "text-4xl font-black tracking-tighter",
                            children: "SOCIAL MEDIA ANALYTICS",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                            lineNumber: 306,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "p",
                          {
                            className: "text-muted-foreground",
                            children:
                              "Track post performance and engagement metrics.",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                            lineNumber: 307,
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
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                      lineNumber: 305,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "flex items-center gap-2",
                      children: [
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                            lineNumber: 310,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "default"
                          ],
                          {
                            href: "/social-media-planner/planner",
                            className:
                              "px-3 py-2 border rounded-md text-sm font-semibold",
                            children: "Planner",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                            lineNumber: 311,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                            lineNumber: 312,
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
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                      lineNumber: 309,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                lineNumber: 304,
                columnNumber: 7,
              },
              this,
            ),
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "section",
              {
                className: "border-2 border-black rounded-lg p-4",
                children: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$client$2d$picker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "ClientPicker"
                  ],
                  {
                    onClientSelected: setSelectedClientId,
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                    lineNumber: 318,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                lineNumber: 317,
                columnNumber: 7,
              },
              this,
            ),
            !selectedClientId &&
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "section",
                {
                  className:
                    "border-2 border-yellow-400 bg-yellow-50 rounded-lg p-6",
                  children: (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "text-lg font-semibold text-yellow-900",
                      children: "⚠️ Please select a client to view analytics",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                      lineNumber: 323,
                      columnNumber: 11,
                    },
                    this,
                  ),
                },
                void 0,
                false,
                {
                  fileName:
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                  lineNumber: 322,
                  columnNumber: 9,
                },
                this,
              ),
            selectedClientId &&
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "Fragment"
                ],
                {
                  children: [
                    (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className: "text-lg font-semibold text-gray-700",
                        children: [
                          "Analytics for: ",
                          (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "span",
                            {
                              className: "text-black",
                              children:
                                selectedClient?.name || "Selected Client",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                              lineNumber: 332,
                              columnNumber: 28,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName:
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                        lineNumber: 331,
                        columnNumber: 11,
                      },
                      this,
                    ),
                    (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "section",
                      {
                        className: "grid grid-cols-2 md:grid-cols-5 gap-4",
                        children: [
                          (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className:
                                "border-2 border-black rounded-lg p-4 bg-blue-50",
                              children: [
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "text-sm font-semibold text-gray-600",
                                    children: "Total Views",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 338,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "text-3xl font-black text-blue-900 mt-2",
                                    children:
                                      summary.totalViews.toLocaleString(),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 339,
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
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                              lineNumber: 337,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className:
                                "border-2 border-black rounded-lg p-4 bg-red-50",
                              children: [
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "text-sm font-semibold text-gray-600",
                                    children: "Total Likes",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 342,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "text-3xl font-black text-red-900 mt-2",
                                    children:
                                      summary.totalLikes.toLocaleString(),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 343,
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
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                              lineNumber: 341,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className:
                                "border-2 border-black rounded-lg p-4 bg-green-50",
                              children: [
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "text-sm font-semibold text-gray-600",
                                    children: "Total Comments",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 346,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "text-3xl font-black text-green-900 mt-2",
                                    children:
                                      summary.totalComments.toLocaleString(),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 347,
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
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                              lineNumber: 345,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className:
                                "border-2 border-black rounded-lg p-4 bg-purple-50",
                              children: [
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "text-sm font-semibold text-gray-600",
                                    children: "Total Shares",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 350,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "text-3xl font-black text-purple-900 mt-2",
                                    children:
                                      summary.totalShares.toLocaleString(),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 351,
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
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                              lineNumber: 349,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className:
                                "border-2 border-black rounded-lg p-4 bg-orange-50",
                              children: [
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "text-sm font-semibold text-gray-600",
                                    children: "Followers Gained",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 354,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "text-3xl font-black text-orange-900 mt-2",
                                    children:
                                      summary.totalFollowersGained.toLocaleString(),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 355,
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
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                              lineNumber: 353,
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
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                        lineNumber: 336,
                        columnNumber: 11,
                      },
                      this,
                    ),
                    syncError &&
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className:
                            "rounded-lg border-2 border-red-400 bg-red-50 px-4 py-3 text-sm text-red-800 flex items-center justify-between",
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "span",
                              {
                                children: syncError,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                lineNumber: 362,
                                columnNumber: 15,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "button",
                              {
                                className: "ml-4 text-xs underline",
                                onClick: () => setSyncError(null),
                                children: "Dismiss",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                lineNumber: 363,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                          lineNumber: 361,
                          columnNumber: 13,
                        },
                        this,
                      ),
                    (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "section",
                      {
                        className: "border-2 border-black rounded-lg p-4",
                        children: [
                          (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "h3",
                            {
                              className: "text-lg font-bold mb-4",
                              children: "Filters",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                              lineNumber: 369,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className:
                                "grid grid-cols-1 md:grid-cols-5 gap-3",
                              children: [
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    children: [
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "label",
                                        {
                                          className:
                                            "block text-sm font-semibold mb-2",
                                          children: "Search Posts",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 372,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Input"
                                        ],
                                        {
                                          placeholder: "Search by title...",
                                          value: search,
                                          onChange: (e) =>
                                            setSearch(e.target.value),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 373,
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 371,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    children: [
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "label",
                                        {
                                          className:
                                            "block text-sm font-semibold mb-2",
                                          children: "Platform",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 380,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "select",
                                        {
                                          className:
                                            "w-full px-3 py-2 border rounded-md",
                                          value: platformFilter,
                                          onChange: (e) =>
                                            setPlatformFilter(e.target.value),
                                          children: [
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                lineNumber: 386,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "SOCIAL_PLATFORMS"
                                            ].map((p) =>
                                              (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                  lineNumber: 388,
                                                  columnNumber: 21,
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
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 381,
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 379,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    children: [
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "label",
                                        {
                                          className:
                                            "block text-sm font-semibold mb-2",
                                          children: "Content Type",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 393,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "select",
                                        {
                                          className:
                                            "w-full px-3 py-2 border rounded-md",
                                          value: contentTypeFilter,
                                          onChange: (e) =>
                                            setContentTypeFilter(
                                              e.target.value,
                                            ),
                                          children: [
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                lineNumber: 399,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "CONTENT_TYPES"
                                            ].map((ct) =>
                                              (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "option",
                                                {
                                                  value: ct,
                                                  children: ct,
                                                },
                                                ct,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                  lineNumber: 401,
                                                  columnNumber: 21,
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
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 392,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    children: [
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "label",
                                        {
                                          className:
                                            "block text-sm font-semibold mb-2",
                                          children: "From Date",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 406,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Input"
                                        ],
                                        {
                                          type: "date",
                                          value: dateFrom,
                                          onChange: (e) =>
                                            setDateFrom(e.target.value),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 407,
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 405,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    children: [
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "label",
                                        {
                                          className:
                                            "block text-sm font-semibold mb-2",
                                          children: "To Date",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 410,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Input"
                                        ],
                                        {
                                          type: "date",
                                          value: dateTo,
                                          onChange: (e) =>
                                            setDateTo(e.target.value),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 411,
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 409,
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
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
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
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                        lineNumber: 368,
                        columnNumber: 11,
                      },
                      this,
                    ),
                    (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "section",
                      {
                        className:
                          "border-2 border-black rounded-lg overflow-hidden",
                        children: [
                          flatRows.length > 0 &&
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "flex justify-end px-4 pt-3 pb-1",
                                children: (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "Button"
                                  ],
                                  {
                                    size: "sm",
                                    variant: "outline",
                                    className:
                                      "text-xs font-semibold border-black",
                                    onClick: handleExportCSV,
                                    children: "Export CSV",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 420,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                lineNumber: 419,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          flatRows.length === 0
                            ? (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className: "p-6 text-center text-gray-600",
                                  children: [
                                    (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className: "text-lg",
                                        children:
                                          "📊 No analytics data available for this client",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                        lineNumber: 432,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className: "text-sm text-gray-500 mt-2",
                                        children:
                                          "Posts will appear here once created and metrics are updated.",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                        lineNumber: 433,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                  lineNumber: 431,
                                  columnNumber: 15,
                                },
                                this,
                              )
                            : (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className: "overflow-x-auto",
                                  children: (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "table",
                                    {
                                      className: "w-full",
                                      children: [
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "thead",
                                          {
                                            className: "bg-black text-white",
                                            children: (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "tr",
                                              {
                                                children: [
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-2 text-left font-bold",
                                                      children: "Title",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 440,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-2 text-center font-bold",
                                                      children: "Platform",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 441,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-2 text-center font-bold",
                                                      children: "Account",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 442,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-2 text-center font-bold",
                                                      children: "Date",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 443,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-2 text-right font-bold",
                                                      children: "Views",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 444,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-2 text-right font-bold",
                                                      children: "Likes",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 445,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-2 text-right font-bold",
                                                      children: "Comments",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 446,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-2 text-right font-bold",
                                                      children: "Shares",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 447,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-2 text-right font-bold",
                                                      children: "Followers",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 448,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-2 text-right font-bold",
                                                      children: "Eng. Rate",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 449,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-2 text-center font-bold",
                                                      children: "Actions",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 450,
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
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                lineNumber: 439,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                            lineNumber: 438,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "tbody",
                                          {
                                            children: flatRows.map(
                                              (
                                                {
                                                  post,
                                                  accountId,
                                                  isFirst,
                                                  totalAccounts,
                                                },
                                                rowIdx,
                                              ) => {
                                                const postId =
                                                  post._id || post.id;
                                                const isEditing =
                                                  inlineEditingKey?.postId ===
                                                    postId &&
                                                  inlineEditingKey?.accountId ===
                                                    accountId;
                                                const metrics =
                                                  getAccountMetrics(
                                                    post,
                                                    accountId,
                                                  );
                                                const bgClass =
                                                  rowIdx % 2 === 0
                                                    ? "bg-gray-50"
                                                    : "bg-white";
                                                const borderClass =
                                                  isFirst && rowIdx !== 0
                                                    ? "border-t-2 border-gray-300"
                                                    : "";
                                                return (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "tr",
                                                  {
                                                    className: `${bgClass} ${borderClass}`,
                                                    children: [
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 font-semibold text-gray-900 max-w-[180px]",
                                                          children: isFirst
                                                            ? post.title
                                                            : (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "text-gray-400 text-xs italic",
                                                                  children: [
                                                                    "↳ ",
                                                                    post.title,
                                                                  ],
                                                                },
                                                                void 0,
                                                                true,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 473,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 471,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 text-center text-sm",
                                                          children: isFirst
                                                            ? post.platform
                                                            : "",
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 476,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 text-center text-sm",
                                                          children:
                                                            accountId ===
                                                            NO_ACCOUNT
                                                              ? (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "jsxDEV"
                                                                ])(
                                                                  "span",
                                                                  {
                                                                    className:
                                                                      "text-gray-400 text-xs",
                                                                    children:
                                                                      "No account",
                                                                  },
                                                                  void 0,
                                                                  false,
                                                                  {
                                                                    fileName:
                                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                    lineNumber: 481,
                                                                    columnNumber: 31,
                                                                  },
                                                                  this,
                                                                )
                                                              : (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "jsxDEV"
                                                                ])(
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$post$2d$account$2d$display$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                    "PostAccountDisplay"
                                                                  ],
                                                                  {
                                                                    accountId:
                                                                      accountId,
                                                                  },
                                                                  void 0,
                                                                  false,
                                                                  {
                                                                    fileName:
                                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                    lineNumber: 483,
                                                                    columnNumber: 31,
                                                                  },
                                                                  this,
                                                                ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 479,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 text-center text-sm text-gray-600",
                                                          children: isFirst
                                                            ? post.scheduledDate
                                                            : "",
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 486,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 text-right",
                                                          children: isEditing
                                                            ? (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "input",
                                                                {
                                                                  type: "number",
                                                                  min: "0",
                                                                  value:
                                                                    inlineMetrics.views,
                                                                  onChange: (
                                                                    e,
                                                                  ) =>
                                                                    setInlineMetrics(
                                                                      (
                                                                        prev,
                                                                      ) => ({
                                                                        ...prev,
                                                                        views:
                                                                          Math.max(
                                                                            0,
                                                                            parseInt(
                                                                              e
                                                                                .target
                                                                                .value,
                                                                            ) ||
                                                                              0,
                                                                          ),
                                                                      }),
                                                                    ),
                                                                  className:
                                                                    "w-20 px-2 py-1 border rounded text-right font-semibold",
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 493,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              )
                                                            : (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "font-semibold",
                                                                  children:
                                                                    metrics.views.toLocaleString(),
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 506,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 491,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 text-right",
                                                          children: isEditing
                                                            ? (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "input",
                                                                {
                                                                  type: "number",
                                                                  min: "0",
                                                                  value:
                                                                    inlineMetrics.likes,
                                                                  onChange: (
                                                                    e,
                                                                  ) =>
                                                                    setInlineMetrics(
                                                                      (
                                                                        prev,
                                                                      ) => ({
                                                                        ...prev,
                                                                        likes:
                                                                          Math.max(
                                                                            0,
                                                                            parseInt(
                                                                              e
                                                                                .target
                                                                                .value,
                                                                            ) ||
                                                                              0,
                                                                          ),
                                                                      }),
                                                                    ),
                                                                  className:
                                                                    "w-20 px-2 py-1 border rounded text-right font-semibold",
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 513,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              )
                                                            : (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "font-semibold",
                                                                  children:
                                                                    metrics.likes.toLocaleString(),
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 526,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 511,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 text-right",
                                                          children: isEditing
                                                            ? (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "input",
                                                                {
                                                                  type: "number",
                                                                  min: "0",
                                                                  value:
                                                                    inlineMetrics.comments,
                                                                  onChange: (
                                                                    e,
                                                                  ) =>
                                                                    setInlineMetrics(
                                                                      (
                                                                        prev,
                                                                      ) => ({
                                                                        ...prev,
                                                                        comments:
                                                                          Math.max(
                                                                            0,
                                                                            parseInt(
                                                                              e
                                                                                .target
                                                                                .value,
                                                                            ) ||
                                                                              0,
                                                                          ),
                                                                      }),
                                                                    ),
                                                                  className:
                                                                    "w-20 px-2 py-1 border rounded text-right font-semibold",
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 533,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              )
                                                            : (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "font-semibold",
                                                                  children:
                                                                    metrics.comments.toLocaleString(),
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 546,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 531,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 text-right",
                                                          children: isEditing
                                                            ? (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "input",
                                                                {
                                                                  type: "number",
                                                                  min: "0",
                                                                  value:
                                                                    inlineMetrics.shares,
                                                                  onChange: (
                                                                    e,
                                                                  ) =>
                                                                    setInlineMetrics(
                                                                      (
                                                                        prev,
                                                                      ) => ({
                                                                        ...prev,
                                                                        shares:
                                                                          Math.max(
                                                                            0,
                                                                            parseInt(
                                                                              e
                                                                                .target
                                                                                .value,
                                                                            ) ||
                                                                              0,
                                                                          ),
                                                                      }),
                                                                    ),
                                                                  className:
                                                                    "w-20 px-2 py-1 border rounded text-right font-semibold",
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 553,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              )
                                                            : (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "font-semibold",
                                                                  children:
                                                                    metrics.shares.toLocaleString(),
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 566,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 551,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 text-right",
                                                          children: isEditing
                                                            ? (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "input",
                                                                {
                                                                  type: "number",
                                                                  min: "0",
                                                                  value:
                                                                    inlineMetrics.followers_gained,
                                                                  onChange: (
                                                                    e,
                                                                  ) =>
                                                                    setInlineMetrics(
                                                                      (
                                                                        prev,
                                                                      ) => ({
                                                                        ...prev,
                                                                        followers_gained:
                                                                          Math.max(
                                                                            0,
                                                                            parseInt(
                                                                              e
                                                                                .target
                                                                                .value,
                                                                            ) ||
                                                                              0,
                                                                          ),
                                                                      }),
                                                                    ),
                                                                  className:
                                                                    "w-20 px-2 py-1 border rounded text-right font-semibold",
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 573,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              )
                                                            : (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "font-semibold",
                                                                  children:
                                                                    metrics.followers_gained.toLocaleString(),
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 586,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 571,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 text-right text-sm font-semibold text-indigo-700",
                                                          children: isEditing
                                                            ? "—"
                                                            : engagementRate(
                                                                metrics,
                                                              ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 591,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 text-center",
                                                          children: isEditing
                                                            ? (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "div",
                                                                {
                                                                  className:
                                                                    "flex gap-2 justify-center",
                                                                  children: [
                                                                    (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                        "Button"
                                                                      ],
                                                                      {
                                                                        size: "sm",
                                                                        className:
                                                                          "text-xs bg-green-600 hover:bg-green-700",
                                                                        onClick:
                                                                          handleSaveInlineMetrics,
                                                                        children:
                                                                          "Save",
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                        lineNumber: 599,
                                                                        columnNumber: 33,
                                                                      },
                                                                      this,
                                                                    ),
                                                                    (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                        "Button"
                                                                      ],
                                                                      {
                                                                        size: "sm",
                                                                        variant:
                                                                          "outline",
                                                                        className:
                                                                          "text-xs",
                                                                        onClick:
                                                                          handleCancelInlineEdit,
                                                                        children:
                                                                          "Cancel",
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                        lineNumber: 606,
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
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 598,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              )
                                                            : (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "div",
                                                                {
                                                                  className:
                                                                    "flex gap-1 justify-center",
                                                                  children: [
                                                                    (post.platform ===
                                                                      "Facebook" ||
                                                                      post.platform ===
                                                                        "Instagram") &&
                                                                      accountId !==
                                                                        NO_ACCOUNT &&
                                                                      (0,
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                        "jsxDEV"
                                                                      ])(
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                          "Button"
                                                                        ],
                                                                        {
                                                                          size: "sm",
                                                                          variant:
                                                                            "outline",
                                                                          className:
                                                                            "text-xs border-blue-500 text-blue-700 hover:bg-blue-50",
                                                                          disabled:
                                                                            !!syncingKey,
                                                                          onClick:
                                                                            () =>
                                                                              handleSyncMetrics(
                                                                                post,
                                                                                accountId,
                                                                              ),
                                                                          title:
                                                                            "Fetch live metrics from Meta Graph API",
                                                                          children:
                                                                            syncingKey?.postId ===
                                                                              postId &&
                                                                            syncingKey?.accountId ===
                                                                              accountId
                                                                              ? "Syncing…"
                                                                              : "Sync",
                                                                        },
                                                                        void 0,
                                                                        false,
                                                                        {
                                                                          fileName:
                                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                          lineNumber: 619,
                                                                          columnNumber: 35,
                                                                        },
                                                                        this,
                                                                      ),
                                                                    (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                        "Button"
                                                                      ],
                                                                      {
                                                                        size: "sm",
                                                                        className:
                                                                          "text-xs",
                                                                        onClick:
                                                                          () =>
                                                                            handleStartInlineEdit(
                                                                              post,
                                                                              accountId,
                                                                            ),
                                                                        children:
                                                                          "Edit",
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                        lineNumber: 632,
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
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 616,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 596,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                    ],
                                                  },
                                                  `${postId}-${accountId}`,
                                                  true,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                    lineNumber: 466,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                );
                                              },
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                            lineNumber: 453,
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
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                      lineNumber: 437,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                  lineNumber: 436,
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
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                        lineNumber: 417,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  ],
                },
                void 0,
                true,
              ),
            selectedPostForMetrics &&
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$social$2d$media$2f$update$2d$metrics$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "UpdateMetricsModal"
                ],
                {
                  isOpen: isMetricsModalOpen,
                  postTitle: selectedPostForMetrics.title,
                  currentMetrics: {
                    views: selectedPostForMetrics.views || 0,
                    likes: selectedPostForMetrics.likes || 0,
                    comments: selectedPostForMetrics.comments || 0,
                    shares: selectedPostForMetrics.shares || 0,
                    followers_gained:
                      selectedPostForMetrics.followers_gained || 0,
                  },
                  onClose: () => setIsMetricsModalOpen(false),
                  onSave: handleSaveMetrics,
                },
                void 0,
                false,
                {
                  fileName:
                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
                  lineNumber: 655,
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
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/social-media-planner/analytics/page.tsx",
          lineNumber: 302,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(AnalyticsPage, "GLzUm8pMnLh85ZpxRwP36OmNoOI=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useAuth"
        ],
      ];
    });
    _c = AnalyticsPage;
    var _c;
    __turbopack_context__.k.register(_c, "AnalyticsPage");
    if (
      typeof globalThis.$RefreshHelpers$ === "object" &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$,
      );
    }
  },
]);
