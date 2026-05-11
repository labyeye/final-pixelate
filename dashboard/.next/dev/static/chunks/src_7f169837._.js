(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === "object" ? document.currentScript : undefined,
  "[project]/src/components/ui/input.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["Input", () => Input]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/lib/utils.ts [app-client] (ecmascript)",
      );
    const Input =
      /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c = ({ className, type, ...props }, ref) => {
          return /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "input",
            {
              type: type,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
              fileName: "[project]/src/components/ui/input.tsx",
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
  "[project]/src/lib/social-media-planner.ts [app-client] (ecmascript)",
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
  "[project]/src/components/social-media/client-picker.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["ClientPicker", () => ClientPicker]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    const STORAGE_KEY = "selectedClientId";
    function ClientPicker({ onClientSelected, onClientsLoaded }) {
      _s();
      const [clients, setClients] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [selectedId, setSelectedId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(true);
      const [error, setError] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            className: "flex items-center gap-2",
            children: [
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                    "[project]/src/components/social-media/client-picker.tsx",
                  lineNumber: 70,
                  columnNumber: 9,
                },
                this,
              ),
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "select",
                {
                  disabled: true,
                  className: "border rounded-md px-3 py-2 bg-gray-100",
                  children: /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                        "[project]/src/components/social-media/client-picker.tsx",
                      lineNumber: 72,
                      columnNumber: 11,
                    },
                    this,
                  ),
                },
                void 0,
                false,
                {
                  fileName:
                    "[project]/src/components/social-media/client-picker.tsx",
                  lineNumber: 71,
                  columnNumber: 9,
                },
                this,
              ),
            ],
          },
          void 0,
          true,
          {
            fileName: "[project]/src/components/social-media/client-picker.tsx",
            lineNumber: 69,
            columnNumber: 7,
          },
          this,
        );
      }
      if (error) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            className: "flex items-center gap-2 text-red-600",
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                  "[project]/src/components/social-media/client-picker.tsx",
                lineNumber: 81,
                columnNumber: 9,
              },
              this,
            ),
          },
          void 0,
          false,
          {
            fileName: "[project]/src/components/social-media/client-picker.tsx",
            lineNumber: 80,
            columnNumber: 7,
          },
          this,
        );
      }
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "flex items-center gap-2",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                  "[project]/src/components/social-media/client-picker.tsx",
                lineNumber: 88,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "select",
              {
                value: selectedId,
                onChange: (e) => handleChange(e.target.value),
                className: "border rounded-md px-3 py-2 min-w-[200px]",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                        "[project]/src/components/social-media/client-picker.tsx",
                      lineNumber: 94,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  clients.map((client) =>
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                          "[project]/src/components/social-media/client-picker.tsx",
                        lineNumber: 96,
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
                  "[project]/src/components/social-media/client-picker.tsx",
                lineNumber: 89,
                columnNumber: 7,
              },
              this,
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: "[project]/src/components/social-media/client-picker.tsx",
          lineNumber: 87,
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
  "[project]/src/components/social-media/platform-logo.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["PlatformLogo", () => PlatformLogo]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript) <export default as Facebook>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-client] (ecmascript) <export default as Linkedin>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>",
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__[
                "Instagram"
              ],
              {
                className: iconSizeClass,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/src/components/social-media/platform-logo.tsx",
                lineNumber: 59,
                columnNumber: 16,
              },
              this,
            );
          case "Facebook":
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__[
                "Facebook"
              ],
              {
                className: iconSizeClass,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/src/components/social-media/platform-logo.tsx",
                lineNumber: 61,
                columnNumber: 16,
              },
              this,
            );
          case "LinkedIn":
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__[
                "Linkedin"
              ],
              {
                className: iconSizeClass,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/src/components/social-media/platform-logo.tsx",
                lineNumber: 63,
                columnNumber: 16,
              },
              this,
            );
          case "X / Twitter":
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                  "[project]/src/components/social-media/platform-logo.tsx",
                lineNumber: 65,
                columnNumber: 16,
              },
              this,
            );
          case "YouTube Shorts":
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__[
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
                  "[project]/src/components/social-media/platform-logo.tsx",
                lineNumber: 67,
                columnNumber: 16,
              },
              this,
            );
          case "WhatsApp Channel":
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__[
                "MessageCircle"
              ],
              {
                className: iconSizeClass,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/src/components/social-media/platform-logo.tsx",
                lineNumber: 69,
                columnNumber: 16,
              },
              this,
            );
          case "Google My Business":
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__[
                "Building2"
              ],
              {
                className: iconSizeClass,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/src/components/social-media/platform-logo.tsx",
                lineNumber: 71,
                columnNumber: 16,
              },
              this,
            );
          default:
            return /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                  "[project]/src/components/social-media/platform-logo.tsx",
                lineNumber: 73,
                columnNumber: 16,
              },
              this,
            );
        }
      };
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "flex items-center gap-2",
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                  "[project]/src/components/social-media/platform-logo.tsx",
                lineNumber: 79,
                columnNumber: 7,
              },
              this,
            ),
            showLabel &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                    "[project]/src/components/social-media/platform-logo.tsx",
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
          fileName: "[project]/src/components/social-media/platform-logo.tsx",
          lineNumber: 78,
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
  "[project]/src/components/social-media/post-account-display.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["PostAccountDisplay", () => PostAccountDisplay]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$social$2d$media$2f$platform$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/social-media/platform-logo.tsx [app-client] (ecmascript)",
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
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(!!accountId);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
              "[project]/src/components/social-media/post-account-display.tsx",
            lineNumber: 53,
            columnNumber: 12,
          },
          this,
        );
      }
      if (!account) {
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
              "[project]/src/components/social-media/post-account-display.tsx",
            lineNumber: 57,
            columnNumber: 12,
          },
          this,
        );
      }
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: `font-medium inline-flex items-center gap-2 ${className}`,
          children: [
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$social$2d$media$2f$platform$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                  "[project]/src/components/social-media/post-account-display.tsx",
                lineNumber: 62,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                          "[project]/src/components/social-media/post-account-display.tsx",
                        lineNumber: 66,
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
                  "[project]/src/components/social-media/post-account-display.tsx",
                lineNumber: 63,
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
            "[project]/src/components/social-media/post-account-display.tsx",
          lineNumber: 61,
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
  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => AnalyticsPage]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/input.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/hooks/use-auth.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/lib/social-media-planner.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$social$2d$media$2f$client$2d$picker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/social-media/client-picker.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$social$2d$media$2f$post$2d$account$2d$display$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/social-media/post-account-display.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$social$2d$media$2f$platform$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/social-media/platform-logo.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    const NO_ACCOUNT = "__no_account__";
    const PLATFORM_COLORS = {
      Facebook: "#1877F2",
      Instagram: "#E1306C",
      LinkedIn: "#0A66C2",
      "X / Twitter": "#000000",
      "YouTube Shorts": "#FF0000",
      "WhatsApp Channel": "#25D366",
      "Google My Business": "#4285F4",
    };
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
    function calcEngRate(m) {
      if (!m.views) return 0;
      return ((m.likes + m.comments + m.shares) / m.views) * 100;
    }
    function EngagementBadge({ m }) {
      const rate = calcEngRate(m);
      if (!m.views)
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "span",
          {
            className: "text-gray-400 font-semibold",
            children: "—",
          },
          void 0,
          false,
          {
            fileName:
              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
            lineNumber: 77,
            columnNumber: 24,
          },
          this,
        );
      if (rate >= 5)
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "span",
          {
            className:
              "inline-block px-2 py-0.5 rounded border-2 border-black bg-green-300 text-black text-xs font-bold",
            children: ["↑ ", rate.toFixed(2), "%"],
          },
          void 0,
          true,
          {
            fileName:
              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
            lineNumber: 80,
            columnNumber: 7,
          },
          this,
        );
      if (rate >= 2)
        return /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "span",
          {
            className:
              "inline-block px-2 py-0.5 rounded border-2 border-black bg-blue-200 text-black text-xs font-bold",
            children: [rate.toFixed(2), "%"],
          },
          void 0,
          true,
          {
            fileName:
              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
            lineNumber: 86,
            columnNumber: 7,
          },
          this,
        );
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "span",
        {
          className:
            "inline-block px-2 py-0.5 rounded border-2 border-black bg-yellow-200 text-black text-xs font-bold",
          children: [rate.toFixed(2), "%"],
        },
        void 0,
        true,
        {
          fileName:
            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
          lineNumber: 91,
          columnNumber: 5,
        },
        this,
      );
    }
    _c = EngagementBadge;
    const STAT_CONFIG = [
      {
        key: "totalViews",
        label: "Total Views",
        icon: "👁",
        bg: "bg-blue-100",
      },
      {
        key: "totalLikes",
        label: "Total Likes",
        icon: "❤️",
        bg: "bg-red-100",
      },
      {
        key: "totalComments",
        label: "Comments",
        icon: "💬",
        bg: "bg-green-100",
      },
      {
        key: "totalShares",
        label: "Shares",
        icon: "↗",
        bg: "bg-purple-100",
      },
      {
        key: "totalFollowersGained",
        label: "Followers Gained",
        icon: "📈",
        bg: "bg-orange-100",
      },
    ];
    function AnalyticsPage() {
      _s();
      const { user } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useAuth"
      ])();
      const [selectedClientId, setSelectedClientId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [posts, setPosts] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [clients, setClients] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [search, setSearch] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [platformFilter, setPlatformFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [contentTypeFilter, setContentTypeFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [dateFrom, setDateFrom] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [dateTo, setDateTo] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [syncingKey, setSyncingKey] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [syncError, setSyncError] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [syncingAll, setSyncingAll] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [syncAllResult, setSyncAllResult] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [syncProgress, setSyncProgress] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [inlineEditingKey, setInlineEditingKey] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [inlineMetrics, setInlineMetrics] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          if (user && user.role !== "admin" && user.name)
            url.searchParams.set("assignedTo", user.name);
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
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
      const overallEngRate = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AnalyticsPage.useMemo[overallEngRate]": () => {
            if (!summary.totalViews) return null;
            return (
              ((summary.totalLikes +
                summary.totalComments +
                summary.totalShares) /
                summary.totalViews) *
              100
            ).toFixed(2);
          },
        }["AnalyticsPage.useMemo[overallEngRate]"],
        [summary],
      );
      const platformBreakdown = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AnalyticsPage.useMemo[platformBreakdown]": () => {
            const map = {};
            posts.forEach(
              {
                "AnalyticsPage.useMemo[platformBreakdown]": (p) => {
                  if (!map[p.platform])
                    map[p.platform] = {
                      views: 0,
                      likes: 0,
                      comments: 0,
                      shares: 0,
                      followers_gained: 0,
                    };
                  const accountIds =
                    p.socialAccountIds && p.socialAccountIds.length > 0
                      ? p.socialAccountIds
                      : p.socialAccountId
                        ? [p.socialAccountId]
                        : null;
                  if (accountIds && p.accountMetrics) {
                    for (const id of accountIds) {
                      const m = p.accountMetrics[id];
                      if (m) {
                        map[p.platform].views += m.views || 0;
                        map[p.platform].likes += m.likes || 0;
                      }
                    }
                  } else {
                    map[p.platform].views += p.views || 0;
                    map[p.platform].likes += p.likes || 0;
                  }
                },
              }["AnalyticsPage.useMemo[platformBreakdown]"],
            );
            return Object.entries(map)
              .map(
                {
                  "AnalyticsPage.useMemo[platformBreakdown]": ([
                    platform,
                    m,
                  ]) => ({
                    platform,
                    ...m,
                  }),
                }["AnalyticsPage.useMemo[platformBreakdown]"],
              )
              .filter(
                {
                  "AnalyticsPage.useMemo[platformBreakdown]": (e) =>
                    e.views > 0,
                }["AnalyticsPage.useMemo[platformBreakdown]"],
              )
              .sort(
                {
                  "AnalyticsPage.useMemo[platformBreakdown]": (a, b) =>
                    b.views - a.views,
                }["AnalyticsPage.useMemo[platformBreakdown]"],
              );
          },
        }["AnalyticsPage.useMemo[platformBreakdown]"],
        [posts],
      );
      const topPosts = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "AnalyticsPage.useMemo[topPosts]": () => {
            return flatRows
              .map(
                {
                  "AnalyticsPage.useMemo[topPosts]": ({ post, accountId }) => {
                    const m = getAccountMetrics(post, accountId);
                    return {
                      post,
                      accountId,
                      m,
                      er: calcEngRate(m),
                    };
                  },
                }["AnalyticsPage.useMemo[topPosts]"],
              )
              .filter(
                {
                  "AnalyticsPage.useMemo[topPosts]": (r) => r.m.views > 0,
                }["AnalyticsPage.useMemo[topPosts]"],
              )
              .sort(
                {
                  "AnalyticsPage.useMemo[topPosts]": (a, b) => b.er - a.er,
                }["AnalyticsPage.useMemo[topPosts]"],
              )
              .slice(0, 3);
          },
        }["AnalyticsPage.useMemo[topPosts]"],
        [flatRows],
      );
      const handleSyncAll = async () => {
        setSyncingAll(true);
        setSyncError(null);
        setSyncAllResult(null);
        setSyncProgress(null);
        const syncable = flatRows.filter(({ post, accountId }) => {
          const isMetaPlatform =
            post.platform === "Facebook" || post.platform === "Instagram";
          const hasAccount = accountId !== NO_ACCOUNT;
          const hasLink = !!(post.postedLink || post.postedLinks?.[accountId]);
          return isMetaPlatform && hasAccount && hasLink;
        });
        setSyncProgress({
          current: 0,
          total: syncable.length,
          currentTitle: "",
          errors: [],
        });
        let synced = 0;
        let skipped = 0;
        const errors = [];
        for (let i = 0; i < syncable.length; i++) {
          const { post, accountId } = syncable[i];
          const postId = post._id || post.id;
          setSyncProgress((prev) =>
            prev
              ? {
                  ...prev,
                  current: i + 1,
                  currentTitle: post.title,
                }
              : prev,
          );
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
            const data = await res.json().catch(() => ({}));
            if (res.ok && !data.skipped) {
              synced++;
            } else {
              skipped++;
              const msg = data.reason || data.error || `HTTP ${res.status}`;
              errors.push({
                title: post.title,
                error: msg,
              });
              setSyncProgress((prev) =>
                prev
                  ? {
                      ...prev,
                      errors: [
                        ...prev.errors,
                        {
                          title: post.title,
                          error: msg,
                        },
                      ],
                    }
                  : prev,
              );
            }
          } catch (e) {
            skipped++;
            errors.push({
              title: post.title,
              error: e.message || "Network error",
            });
            setSyncProgress((prev) =>
              prev
                ? {
                    ...prev,
                    errors: [
                      ...prev.errors,
                      {
                        title: post.title,
                        error: e.message || "Network error",
                      },
                    ],
                  }
                : prev,
            );
          }
        }
        await loadPosts(selectedClientId);
        setSyncingAll(false);
        setSyncAllResult({
          synced,
          skipped,
        });
      };
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
          if (!res.ok) setSyncError(data.error || "Sync failed");
          else await loadPosts(selectedClientId);
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
      const handleSaveInlineMetrics = async () => {
        if (!inlineEditingKey) return;
        try {
          const body = {
            id: inlineEditingKey.postId,
            ...inlineMetrics,
          };
          if (inlineEditingKey.accountId !== NO_ACCOUNT)
            body.accountId = inlineEditingKey.accountId;
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
      const isSyncDone = !syncingAll && syncProgress !== null;
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "space-y-6 font-headline",
          children: [
            syncProgress &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "div",
                {
                  className:
                    "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
                  children: /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className:
                        "bg-white border-2 border-black rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className:
                              "bg-black text-white px-5 py-4 flex items-center justify-between",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "h2",
                                {
                                  className:
                                    "font-black text-base tracking-tight",
                                  children: isSyncDone
                                    ? "SYNC COMPLETE"
                                    : "SYNCING POSTS…",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                  lineNumber: 430,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              isSyncDone &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "button",
                                  {
                                    className:
                                      "text-white hover:text-gray-300 font-black text-xl leading-none",
                                    onClick: () => setSyncProgress(null),
                                    children: "×",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 434,
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
                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                            lineNumber: 429,
                            columnNumber: 13,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "px-5 py-4 space-y-4",
                            children: [
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "flex items-center justify-between",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className:
                                          "text-sm font-bold text-gray-600",
                                        children: isSyncDone
                                          ? "Finished"
                                          : `Post ${syncProgress.current} of ${syncProgress.total}`,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                        lineNumber: 446,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className: "text-sm font-black",
                                        children: [
                                          syncProgress.current,
                                          "/",
                                          syncProgress.total,
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                        lineNumber: 449,
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
                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                  lineNumber: 445,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "w-full bg-gray-200 rounded-full h-3 border border-black overflow-hidden",
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className:
                                        "h-3 rounded-full transition-all duration-300",
                                      style: {
                                        width: `${syncProgress.total > 0 ? (syncProgress.current / syncProgress.total) * 100 : 0}%`,
                                        backgroundColor: isSyncDone
                                          ? "#22c55e"
                                          : "#2563eb",
                                      },
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                      lineNumber: 456,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                  lineNumber: 455,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                              !isSyncDone &&
                                syncProgress.currentTitle &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "p",
                                  {
                                    className:
                                      "text-xs font-semibold text-gray-500 truncate",
                                    children: [
                                      "Syncing: ",
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "span",
                                        {
                                          className: "text-black font-bold",
                                          children: syncProgress.currentTitle,
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 468,
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
                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 467,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                              isSyncDone &&
                                syncAllResult &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "flex gap-3",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className:
                                            "flex-1 bg-green-50 border-2 border-green-400 rounded-lg p-3 text-center",
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "div",
                                              {
                                                className:
                                                  "text-2xl font-black text-green-700",
                                                children: syncAllResult.synced,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                lineNumber: 476,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "div",
                                              {
                                                className:
                                                  "text-xs font-bold text-green-600 uppercase",
                                                children: "Synced",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                lineNumber: 477,
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
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 475,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className:
                                            "flex-1 bg-red-50 border-2 border-red-300 rounded-lg p-3 text-center",
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "div",
                                              {
                                                className:
                                                  "text-2xl font-black text-red-600",
                                                children: syncAllResult.skipped,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                lineNumber: 480,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "div",
                                              {
                                                className:
                                                  "text-xs font-bold text-red-500 uppercase",
                                                children: "Skipped",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                lineNumber: 481,
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
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 479,
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
                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 474,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                              syncProgress.errors.length > 0 &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "max-h-40 overflow-y-auto space-y-1.5",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "p",
                                        {
                                          className:
                                            "text-xs font-black uppercase text-gray-500 mb-1",
                                          children: [
                                            "Skipped Posts (",
                                            syncProgress.errors.length,
                                            ")",
                                          ],
                                        },
                                        void 0,
                                        true,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 489,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                      syncProgress.errors.map((e, i) =>
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "div",
                                          {
                                            className:
                                              "bg-red-50 border border-red-200 rounded-md px-3 py-2",
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "p",
                                                {
                                                  className:
                                                    "text-xs font-bold text-gray-800 truncate",
                                                  children: e.title,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                  lineNumber: 494,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "p",
                                                {
                                                  className:
                                                    "text-xs text-red-600 mt-0.5",
                                                  children: e.error,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                  lineNumber: 495,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                            ],
                                          },
                                          i,
                                          true,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                            lineNumber: 493,
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
                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 488,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                              isSyncDone &&
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "button",
                                  {
                                    className:
                                      "w-full py-2 bg-black text-white font-black rounded-lg text-sm hover:bg-gray-800 transition-colors",
                                    onClick: () => setSyncProgress(null),
                                    children: "Close",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 503,
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
                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                            lineNumber: 443,
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
                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                      lineNumber: 427,
                      columnNumber: 11,
                    },
                    this,
                  ),
                },
                void 0,
                false,
                {
                  fileName:
                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                  lineNumber: 426,
                  columnNumber: 9,
                },
                this,
              ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "header",
              {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                            lineNumber: 517,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                            lineNumber: 520,
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
                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                      lineNumber: 516,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "flex items-center gap-2",
                      children: [
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "default"
                          ],
                          {
                            href: "/social-media-planner",
                            className:
                              "px-3 py-2 border-2 border-black rounded-md text-sm font-semibold hover:bg-black hover:text-white transition-colors",
                            children: "Dashboard",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                            lineNumber: 525,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "default"
                          ],
                          {
                            href: "/social-media-planner/planner",
                            className:
                              "px-3 py-2 border-2 border-black rounded-md text-sm font-semibold hover:bg-black hover:text-white transition-colors",
                            children: "Planner",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                            lineNumber: 528,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        /*#__PURE__*/ (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "default"
                          ],
                          {
                            href: "/social-media-planner/calendar",
                            className:
                              "px-3 py-2 border-2 border-black rounded-md text-sm font-semibold hover:bg-black hover:text-white transition-colors",
                            children: "Calendar",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
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
                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                      lineNumber: 524,
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
                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                lineNumber: 515,
                columnNumber: 7,
              },
              this,
            ),
            /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "section",
              {
                className: "border-2 border-black rounded-lg p-4",
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$social$2d$media$2f$client$2d$picker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "ClientPicker"
                  ],
                  {
                    onClientSelected: setSelectedClientId,
                  },
                  void 0,
                  false,
                  {
                    fileName:
                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                    lineNumber: 539,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                lineNumber: 538,
                columnNumber: 7,
              },
              this,
            ),
            !selectedClientId &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "section",
                {
                  className:
                    "border-2 border-yellow-400 bg-yellow-50 rounded-lg p-6 text-center",
                  children: /*#__PURE__*/ (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                      lineNumber: 544,
                      columnNumber: 11,
                    },
                    this,
                  ),
                },
                void 0,
                false,
                {
                  fileName:
                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                  lineNumber: 543,
                  columnNumber: 9,
                },
                this,
              ),
            selectedClientId &&
              /*#__PURE__*/ (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "Fragment"
                ],
                {
                  children: [
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "div",
                      {
                        className: "text-lg font-semibold text-gray-700",
                        children: [
                          "Analytics for:",
                          " ",
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "span",
                            {
                              className: "text-black font-black",
                              children:
                                selectedClient?.name || "Selected Client",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                              lineNumber: 554,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "span",
                            {
                              className:
                                "ml-2 text-sm font-normal text-gray-400",
                              children: ["(", posts.length, " posts)"],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                              lineNumber: 557,
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
                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                        lineNumber: 552,
                        columnNumber: 11,
                      },
                      this,
                    ),
                    syncError &&
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className:
                            "rounded-lg border-2 border-red-400 bg-red-50 px-4 py-3 text-sm text-red-800 flex items-center justify-between",
                          children: [
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "span",
                              {
                                children: ["⚠ ", syncError],
                              },
                              void 0,
                              true,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                lineNumber: 565,
                                columnNumber: 15,
                              },
                              this,
                            ),
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "button",
                              {
                                className:
                                  "ml-4 text-xs underline font-semibold",
                                onClick: () => setSyncError(null),
                                children: "Dismiss",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                lineNumber: 566,
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
                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                          lineNumber: 564,
                          columnNumber: 13,
                        },
                        this,
                      ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "section",
                      {
                        className:
                          "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4",
                        children: [
                          STAT_CONFIG.map((cfg) =>
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: `border-2 border-black rounded-lg p-4 ${cfg.bg}`,
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className:
                                        "flex items-center justify-between mb-2",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "div",
                                          {
                                            className:
                                              "text-xs font-bold text-gray-600 uppercase tracking-wide",
                                            children: cfg.label,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                            lineNumber: 577,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "span",
                                          {
                                            className: "text-lg",
                                            children: cfg.icon,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                            lineNumber: 580,
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
                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                      lineNumber: 576,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className: "text-3xl font-black",
                                      children:
                                        summary[cfg.key].toLocaleString(),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                      lineNumber: 582,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                ],
                              },
                              cfg.key,
                              true,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                lineNumber: 575,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className:
                                "border-2 border-black rounded-lg p-4 bg-lime-100",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "flex items-center justify-between mb-2",
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className:
                                            "text-xs font-bold text-gray-600 uppercase tracking-wide",
                                          children: "Avg. Eng. Rate",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 590,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "span",
                                        {
                                          className: "text-lg",
                                          children: "🎯",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 593,
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
                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 589,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: "text-3xl font-black",
                                    children: overallEngRate
                                      ? `${overallEngRate}%`
                                      : "—",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 595,
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
                                "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
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
                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                        lineNumber: 573,
                        columnNumber: 11,
                      },
                      this,
                    ),
                    posts.length > 0 &&
                      (platformBreakdown.length > 0 || topPosts.length > 0) &&
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "section",
                        {
                          className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
                          children: [
                            platformBreakdown.length > 0 &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "border-2 border-black rounded-lg p-5",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "h3",
                                      {
                                        className:
                                          "text-base font-black mb-4 tracking-tight",
                                        children: "VIEWS BY PLATFORM",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                        lineNumber: 607,
                                        columnNumber: 19,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "ResponsiveContainer"
                                      ],
                                      {
                                        width: "100%",
                                        height: 200,
                                        children: /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "BarChart"
                                          ],
                                          {
                                            data: platformBreakdown,
                                            layout: "vertical",
                                            margin: {
                                              left: 8,
                                              right: 16,
                                              top: 4,
                                              bottom: 4,
                                            },
                                            children: [
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "XAxis"
                                                ],
                                                {
                                                  type: "number",
                                                  tick: {
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                  },
                                                  tickLine: false,
                                                  axisLine: false,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                  lineNumber: 616,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "YAxis"
                                                ],
                                                {
                                                  type: "category",
                                                  dataKey: "platform",
                                                  tick: {
                                                    fontSize: 11,
                                                    fontWeight: 700,
                                                  },
                                                  tickLine: false,
                                                  axisLine: false,
                                                  width: 110,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                  lineNumber: 622,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "Tooltip"
                                                ],
                                                {
                                                  formatter: (v) => [
                                                    v.toLocaleString() +
                                                      " views",
                                                    "Views",
                                                  ],
                                                  contentStyle: {
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    border: "2px solid black",
                                                    borderRadius: 8,
                                                  },
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                  lineNumber: 630,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "Bar"
                                                ],
                                                {
                                                  dataKey: "views",
                                                  radius: [0, 4, 4, 0],
                                                  children:
                                                    platformBreakdown.map(
                                                      (entry, i) =>
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                            "Cell"
                                                          ],
                                                          {
                                                            fill:
                                                              PLATFORM_COLORS[
                                                                entry.platform
                                                              ] || "#6366f1",
                                                          },
                                                          i,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                            lineNumber: 641,
                                                            columnNumber: 27,
                                                          },
                                                          this,
                                                        ),
                                                    ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                  lineNumber: 639,
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
                                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                            lineNumber: 611,
                                            columnNumber: 21,
                                          },
                                          this,
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                        lineNumber: 610,
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
                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                  lineNumber: 606,
                                  columnNumber: 17,
                                },
                                this,
                              ),
                            topPosts.length > 0 &&
                              /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "border-2 border-black rounded-lg p-5",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "h3",
                                      {
                                        className:
                                          "text-base font-black mb-4 tracking-tight",
                                        children: "TOP PERFORMING POSTS",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                        lineNumber: 652,
                                        columnNumber: 19,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className: "space-y-3",
                                        children: topPosts.map(
                                          ({ post, m, er }, i) =>
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "div",
                                              {
                                                className:
                                                  "flex items-center gap-3 p-3 border-2 border-black rounded-lg bg-gray-50",
                                                children: [
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "span",
                                                    {
                                                      className:
                                                        "text-2xl font-black text-gray-300 w-6 text-center flex-shrink-0",
                                                      children: i + 1,
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 661,
                                                      columnNumber: 25,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "div",
                                                    {
                                                      className:
                                                        "flex-1 min-w-0",
                                                      children: [
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "div",
                                                          {
                                                            className:
                                                              "text-sm font-black truncate",
                                                            children:
                                                              post.title,
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                            lineNumber: 665,
                                                            columnNumber: 27,
                                                          },
                                                          this,
                                                        ),
                                                        /*#__PURE__*/ (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "div",
                                                          {
                                                            className:
                                                              "text-xs text-gray-500 font-semibold mt-0.5",
                                                            children: [
                                                              post.platform,
                                                              " · ",
                                                              m.views.toLocaleString(),
                                                              " views",
                                                            ],
                                                          },
                                                          void 0,
                                                          true,
                                                          {
                                                            fileName:
                                                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                            lineNumber: 666,
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
                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 664,
                                                      columnNumber: 25,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    EngagementBadge,
                                                    {
                                                      m: m,
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 670,
                                                      columnNumber: 25,
                                                    },
                                                    this,
                                                  ),
                                                ],
                                              },
                                              post._id || post.id,
                                              true,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                lineNumber: 657,
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
                                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                        lineNumber: 655,
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
                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                  lineNumber: 651,
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
                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                          lineNumber: 603,
                          columnNumber: 13,
                        },
                        this,
                      ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "section",
                      {
                        className: "border-2 border-black rounded-lg p-4",
                        children: [
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "h3",
                            {
                              className:
                                "text-base font-black mb-4 tracking-tight",
                              children: "FILTERS",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                              lineNumber: 681,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className:
                                "grid grid-cols-1 md:grid-cols-5 gap-3",
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "label",
                                        {
                                          className:
                                            "block text-xs font-bold mb-1.5 uppercase tracking-wide",
                                          children: "Search Posts",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 684,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Input"
                                        ],
                                        {
                                          placeholder: "Search by title...",
                                          value: search,
                                          onChange: (e) =>
                                            setSearch(e.target.value),
                                          className:
                                            "border-2 border-black rounded-md font-semibold text-sm",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 687,
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
                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 683,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "label",
                                        {
                                          className:
                                            "block text-xs font-bold mb-1.5 uppercase tracking-wide",
                                          children: "Platform",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 695,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "select",
                                        {
                                          className:
                                            "w-full px-3 py-2 border-2 border-black rounded-md font-semibold text-sm bg-white",
                                          value: platformFilter,
                                          onChange: (e) =>
                                            setPlatformFilter(e.target.value),
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                lineNumber: 703,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "SOCIAL_PLATFORMS"
                                            ].map((p) =>
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                  lineNumber: 705,
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
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
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
                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 694,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "label",
                                        {
                                          className:
                                            "block text-xs font-bold mb-1.5 uppercase tracking-wide",
                                          children: "Content Type",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 710,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "select",
                                        {
                                          className:
                                            "w-full px-3 py-2 border-2 border-black rounded-md font-semibold text-sm bg-white",
                                          value: contentTypeFilter,
                                          onChange: (e) =>
                                            setContentTypeFilter(
                                              e.target.value,
                                            ),
                                          children: [
                                            /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                lineNumber: 718,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$social$2d$media$2d$planner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "CONTENT_TYPES"
                                            ].map((ct) =>
                                              /*#__PURE__*/ (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                  lineNumber: 720,
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
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 713,
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
                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 709,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "label",
                                        {
                                          className:
                                            "block text-xs font-bold mb-1.5 uppercase tracking-wide",
                                          children: "From Date",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 725,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Input"
                                        ],
                                        {
                                          type: "date",
                                          value: dateFrom,
                                          onChange: (e) =>
                                            setDateFrom(e.target.value),
                                          className:
                                            "border-2 border-black rounded-md font-semibold text-sm",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 728,
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
                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 724,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    children: [
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "label",
                                        {
                                          className:
                                            "block text-xs font-bold mb-1.5 uppercase tracking-wide",
                                          children: "To Date",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 736,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      /*#__PURE__*/ (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Input"
                                        ],
                                        {
                                          type: "date",
                                          value: dateTo,
                                          onChange: (e) =>
                                            setDateTo(e.target.value),
                                          className:
                                            "border-2 border-black rounded-md font-semibold text-sm",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                          lineNumber: 739,
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
                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                    lineNumber: 735,
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
                                "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                              lineNumber: 682,
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
                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                        lineNumber: 680,
                        columnNumber: 11,
                      },
                      this,
                    ),
                    /*#__PURE__*/ (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "section",
                      {
                        className:
                          "border-2 border-black rounded-lg overflow-hidden",
                        children: [
                          flatRows.length > 0 &&
                            /*#__PURE__*/ (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className:
                                  "flex items-center justify-between px-4 pt-3 pb-2 border-b-2 border-black flex-wrap gap-2",
                                children: [
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "h3",
                                    {
                                      className:
                                        "text-base font-black tracking-tight",
                                      children: [
                                        "POSTS PERFORMANCE",
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "span",
                                          {
                                            className:
                                              "ml-2 text-sm font-semibold text-gray-500",
                                            children: [
                                              "(",
                                              flatRows.length,
                                              " rows)",
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                            lineNumber: 755,
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
                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                      lineNumber: 753,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className:
                                        "flex items-center gap-2 flex-wrap",
                                      children: [
                                        syncAllResult &&
                                          /*#__PURE__*/ (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "span",
                                            {
                                              className:
                                                "text-xs font-semibold text-gray-500",
                                              children: [
                                                "✓ ",
                                                syncAllResult.synced,
                                                " synced, ",
                                                syncAllResult.skipped,
                                                " skipped",
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                              lineNumber: 761,
                                              columnNumber: 21,
                                            },
                                            this,
                                          ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "Button"
                                          ],
                                          {
                                            size: "sm",
                                            className:
                                              "text-xs font-bold border-2 border-blue-600 bg-blue-600 hover:bg-blue-700 text-white transition-colors",
                                            onClick: handleSyncAll,
                                            disabled:
                                              syncingAll || !!syncingKey,
                                            children: syncingAll
                                              ? "Syncing…"
                                              : "⟳ Sync All",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                            lineNumber: 765,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "Button"
                                          ],
                                          {
                                            size: "sm",
                                            variant: "outline",
                                            className:
                                              "text-xs font-bold border-2 border-black hover:bg-black hover:text-white transition-colors",
                                            onClick: handleExportCSV,
                                            children: "↓ Export CSV",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                            lineNumber: 773,
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
                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                      lineNumber: 759,
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
                                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                lineNumber: 752,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          flatRows.length === 0
                            ? /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className: "p-10 text-center",
                                  children: [
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className: "text-4xl mb-3",
                                        children: "📭",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                        lineNumber: 787,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className: "text-lg font-black",
                                        children: "No analytics data available",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                        lineNumber: 788,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    /*#__PURE__*/ (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className:
                                          "text-sm text-gray-500 font-semibold mt-1",
                                        children:
                                          "Posts will appear here once created and metrics are updated.",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                        lineNumber: 789,
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
                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                  lineNumber: 786,
                                  columnNumber: 15,
                                },
                                this,
                              )
                            : /*#__PURE__*/ (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className: "overflow-x-auto",
                                  children: /*#__PURE__*/ (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "table",
                                    {
                                      className: "w-full",
                                      children: [
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "thead",
                                          {
                                            className: "bg-black text-white",
                                            children: /*#__PURE__*/ (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "tr",
                                              {
                                                children: [
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-3 text-left text-xs font-black uppercase tracking-wide",
                                                      children: "Title",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 798,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-3 text-left text-xs font-black uppercase tracking-wide",
                                                      children: "Platform",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 799,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-3 text-left text-xs font-black uppercase tracking-wide",
                                                      children: "Account",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 800,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-3 text-center text-xs font-black uppercase tracking-wide",
                                                      children: "Date",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 801,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-3 text-right text-xs font-black uppercase tracking-wide",
                                                      children: "Views",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 802,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-3 text-right text-xs font-black uppercase tracking-wide",
                                                      children: "Likes",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 803,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-3 text-right text-xs font-black uppercase tracking-wide",
                                                      children: "Comments",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 804,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-3 text-right text-xs font-black uppercase tracking-wide",
                                                      children: "Shares",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 805,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-3 text-right text-xs font-black uppercase tracking-wide",
                                                      children: "Followers",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 806,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-3 text-right text-xs font-black uppercase tracking-wide",
                                                      children: "Eng. Rate",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 807,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  /*#__PURE__*/ (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "th",
                                                    {
                                                      className:
                                                        "px-4 py-3 text-center text-xs font-black uppercase tracking-wide",
                                                      children: "Actions",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                      lineNumber: 808,
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
                                                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                lineNumber: 797,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                            lineNumber: 796,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        /*#__PURE__*/ (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "tbody",
                                          {
                                            children: flatRows.map(
                                              (
                                                { post, accountId, isFirst },
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
                                                    ? "border-t-2 border-black"
                                                    : "";
                                                return /*#__PURE__*/ (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "tr",
                                                  {
                                                    className: `${bgClass} ${borderClass}`,
                                                    children: [
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 max-w-[200px]",
                                                          children: isFirst
                                                            ? /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "div",
                                                                {
                                                                  className:
                                                                    "font-black text-sm text-gray-900 truncate",
                                                                  children: [
                                                                    post.title,
                                                                    /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "text-xs font-semibold text-gray-400 mt-0.5",
                                                                        children:
                                                                          post.contentType,
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                        lineNumber: 828,
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
                                                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 826,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              )
                                                            : /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "text-gray-400 text-xs italic font-semibold pl-2",
                                                                  children: [
                                                                    "↳ ",
                                                                    post.title,
                                                                  ],
                                                                },
                                                                void 0,
                                                                true,
                                                                {
                                                                  fileName:
                                                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 833,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 824,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3",
                                                          children:
                                                            isFirst &&
                                                            /*#__PURE__*/ (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "div",
                                                              {
                                                                className:
                                                                  "flex items-center gap-1.5",
                                                                children: [
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                    "jsxDEV"
                                                                  ])(
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$social$2d$media$2f$platform$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      "PlatformLogo"
                                                                    ],
                                                                    {
                                                                      platform:
                                                                        post.platform,
                                                                      size: "sm",
                                                                    },
                                                                    void 0,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                      lineNumber: 843,
                                                                      columnNumber: 33,
                                                                    },
                                                                    this,
                                                                  ),
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                    "jsxDEV"
                                                                  ])(
                                                                    "span",
                                                                    {
                                                                      className:
                                                                        "text-xs font-bold text-gray-700",
                                                                      children:
                                                                        post.platform,
                                                                    },
                                                                    void 0,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                      lineNumber: 844,
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
                                                                  "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                lineNumber: 842,
                                                                columnNumber: 31,
                                                              },
                                                              this,
                                                            ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 840,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 text-sm",
                                                          children:
                                                            accountId ===
                                                            NO_ACCOUNT
                                                              ? /*#__PURE__*/ (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "jsxDEV"
                                                                ])(
                                                                  "span",
                                                                  {
                                                                    className:
                                                                      "text-gray-400 text-xs font-semibold",
                                                                    children:
                                                                      "—",
                                                                  },
                                                                  void 0,
                                                                  false,
                                                                  {
                                                                    fileName:
                                                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                    lineNumber: 852,
                                                                    columnNumber: 31,
                                                                  },
                                                                  this,
                                                                )
                                                              : /*#__PURE__*/ (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "jsxDEV"
                                                                ])(
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$social$2d$media$2f$post$2d$account$2d$display$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                    lineNumber: 854,
                                                                    columnNumber: 31,
                                                                  },
                                                                  this,
                                                                ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 850,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 text-center text-xs font-bold text-gray-600",
                                                          children: isFirst
                                                            ? post.scheduledDate
                                                            : "",
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 859,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                      isEditing
                                                        ? /*#__PURE__*/ (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              "Fragment"
                                                            ],
                                                            {
                                                              children: [
                                                                [
                                                                  "views",
                                                                  "likes",
                                                                  "comments",
                                                                  "shares",
                                                                  "followers_gained",
                                                                ].map((field) =>
                                                                  /*#__PURE__*/ (0,
                                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                    "jsxDEV"
                                                                  ])(
                                                                    "td",
                                                                    {
                                                                      className:
                                                                        "px-4 py-3 text-right",
                                                                      children:
                                                                        /*#__PURE__*/ (0,
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                          "jsxDEV"
                                                                        ])(
                                                                          "input",
                                                                          {
                                                                            type: "number",
                                                                            min: "0",
                                                                            value:
                                                                              inlineMetrics[
                                                                                field
                                                                              ],
                                                                            onChange:
                                                                              (
                                                                                e,
                                                                              ) =>
                                                                                setInlineMetrics(
                                                                                  (
                                                                                    prev,
                                                                                  ) => ({
                                                                                    ...prev,
                                                                                    [field]:
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
                                                                              "w-20 px-2 py-1 border-2 border-black rounded text-right font-bold text-sm",
                                                                          },
                                                                          void 0,
                                                                          false,
                                                                          {
                                                                            fileName:
                                                                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                            lineNumber: 868,
                                                                            columnNumber: 35,
                                                                          },
                                                                          this,
                                                                        ),
                                                                    },
                                                                    field,
                                                                    false,
                                                                    {
                                                                      fileName:
                                                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                      lineNumber: 867,
                                                                      columnNumber: 33,
                                                                    },
                                                                    this,
                                                                  ),
                                                                ),
                                                                /*#__PURE__*/ (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "jsxDEV"
                                                                ])(
                                                                  "td",
                                                                  {
                                                                    className:
                                                                      "px-4 py-3 text-right text-gray-400 font-semibold text-sm",
                                                                    children:
                                                                      "—",
                                                                  },
                                                                  void 0,
                                                                  false,
                                                                  {
                                                                    fileName:
                                                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                    lineNumber: 882,
                                                                    columnNumber: 31,
                                                                  },
                                                                  this,
                                                                ),
                                                              ],
                                                            },
                                                            void 0,
                                                            true,
                                                          )
                                                        : /*#__PURE__*/ (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                              "Fragment"
                                                            ],
                                                            {
                                                              children: [
                                                                /*#__PURE__*/ (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "jsxDEV"
                                                                ])(
                                                                  "td",
                                                                  {
                                                                    className:
                                                                      "px-4 py-3 text-right font-black text-gray-900 text-sm",
                                                                    children:
                                                                      metrics.views.toLocaleString(),
                                                                  },
                                                                  void 0,
                                                                  false,
                                                                  {
                                                                    fileName:
                                                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                    lineNumber: 886,
                                                                    columnNumber: 31,
                                                                  },
                                                                  this,
                                                                ),
                                                                /*#__PURE__*/ (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "jsxDEV"
                                                                ])(
                                                                  "td",
                                                                  {
                                                                    className:
                                                                      "px-4 py-3 text-right font-black text-gray-900 text-sm",
                                                                    children:
                                                                      metrics.likes.toLocaleString(),
                                                                  },
                                                                  void 0,
                                                                  false,
                                                                  {
                                                                    fileName:
                                                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                    lineNumber: 889,
                                                                    columnNumber: 31,
                                                                  },
                                                                  this,
                                                                ),
                                                                /*#__PURE__*/ (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "jsxDEV"
                                                                ])(
                                                                  "td",
                                                                  {
                                                                    className:
                                                                      "px-4 py-3 text-right font-black text-gray-900 text-sm",
                                                                    children:
                                                                      metrics.comments.toLocaleString(),
                                                                  },
                                                                  void 0,
                                                                  false,
                                                                  {
                                                                    fileName:
                                                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                    lineNumber: 892,
                                                                    columnNumber: 31,
                                                                  },
                                                                  this,
                                                                ),
                                                                /*#__PURE__*/ (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "jsxDEV"
                                                                ])(
                                                                  "td",
                                                                  {
                                                                    className:
                                                                      "px-4 py-3 text-right font-black text-gray-900 text-sm",
                                                                    children:
                                                                      metrics.shares.toLocaleString(),
                                                                  },
                                                                  void 0,
                                                                  false,
                                                                  {
                                                                    fileName:
                                                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                    lineNumber: 895,
                                                                    columnNumber: 31,
                                                                  },
                                                                  this,
                                                                ),
                                                                /*#__PURE__*/ (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "jsxDEV"
                                                                ])(
                                                                  "td",
                                                                  {
                                                                    className:
                                                                      "px-4 py-3 text-right font-black text-gray-900 text-sm",
                                                                    children:
                                                                      metrics.followers_gained.toLocaleString(),
                                                                  },
                                                                  void 0,
                                                                  false,
                                                                  {
                                                                    fileName:
                                                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                    lineNumber: 898,
                                                                    columnNumber: 31,
                                                                  },
                                                                  this,
                                                                ),
                                                                /*#__PURE__*/ (0,
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                  "jsxDEV"
                                                                ])(
                                                                  "td",
                                                                  {
                                                                    className:
                                                                      "px-4 py-3 text-right",
                                                                    children:
                                                                      /*#__PURE__*/ (0,
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                        "jsxDEV"
                                                                      ])(
                                                                        EngagementBadge,
                                                                        {
                                                                          m: metrics,
                                                                        },
                                                                        void 0,
                                                                        false,
                                                                        {
                                                                          fileName:
                                                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                          lineNumber: 902,
                                                                          columnNumber: 33,
                                                                        },
                                                                        this,
                                                                      ),
                                                                  },
                                                                  void 0,
                                                                  false,
                                                                  {
                                                                    fileName:
                                                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                    lineNumber: 901,
                                                                    columnNumber: 31,
                                                                  },
                                                                  this,
                                                                ),
                                                              ],
                                                            },
                                                            void 0,
                                                            true,
                                                          ),
                                                      /*#__PURE__*/ (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "td",
                                                        {
                                                          className:
                                                            "px-4 py-3 text-center",
                                                          children: isEditing
                                                            ? /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "div",
                                                                {
                                                                  className:
                                                                    "flex gap-1.5 justify-center",
                                                                  children: [
                                                                    /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                        "Button"
                                                                      ],
                                                                      {
                                                                        size: "sm",
                                                                        className:
                                                                          "text-xs font-bold bg-green-500 hover:bg-green-600 border-2 border-black h-7 px-3",
                                                                        onClick:
                                                                          handleSaveInlineMetrics,
                                                                        children:
                                                                          "Save",
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                        lineNumber: 911,
                                                                        columnNumber: 33,
                                                                      },
                                                                      this,
                                                                    ),
                                                                    /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                        "Button"
                                                                      ],
                                                                      {
                                                                        size: "sm",
                                                                        variant:
                                                                          "outline",
                                                                        className:
                                                                          "text-xs font-bold border-2 border-black h-7 px-3",
                                                                        onClick:
                                                                          () =>
                                                                            setInlineEditingKey(
                                                                              null,
                                                                            ),
                                                                        children:
                                                                          "Cancel",
                                                                      },
                                                                      void 0,
                                                                      false,
                                                                      {
                                                                        fileName:
                                                                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                        lineNumber: 918,
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
                                                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 910,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              )
                                                            : /*#__PURE__*/ (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "div",
                                                                {
                                                                  className:
                                                                    "flex gap-1.5 justify-center",
                                                                  children: [
                                                                    (post.platform ===
                                                                      "Facebook" ||
                                                                      post.platform ===
                                                                        "Instagram") &&
                                                                      accountId !==
                                                                        NO_ACCOUNT &&
                                                                      /*#__PURE__*/ (0,
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                        "jsxDEV"
                                                                      ])(
                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                          "Button"
                                                                        ],
                                                                        {
                                                                          size: "sm",
                                                                          variant:
                                                                            "outline",
                                                                          className:
                                                                            "text-xs font-bold border-2 border-blue-500 text-blue-700 hover:bg-blue-50 h-7 px-2",
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
                                                                              : "⟳ Sync",
                                                                        },
                                                                        void 0,
                                                                        false,
                                                                        {
                                                                          fileName:
                                                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                          lineNumber: 931,
                                                                          columnNumber: 37,
                                                                        },
                                                                        this,
                                                                      ),
                                                                    /*#__PURE__*/ (0,
                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                      "jsxDEV"
                                                                    ])(
                                                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                                        "Button"
                                                                      ],
                                                                      {
                                                                        size: "sm",
                                                                        className:
                                                                          "text-xs font-bold border-2 border-black h-7 px-2",
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
                                                                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                        lineNumber: 944,
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
                                                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                                  lineNumber: 928,
                                                                  columnNumber: 31,
                                                                },
                                                                this,
                                                              ),
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                          lineNumber: 908,
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
                                                      "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                                    lineNumber: 822,
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
                                              "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                            lineNumber: 811,
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
                                        "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                      lineNumber: 795,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                                  lineNumber: 794,
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
                          "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
                        lineNumber: 750,
                        columnNumber: 11,
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
            "[project]/src/app/(crm)/social-media-planner/analytics/page.tsx",
          lineNumber: 422,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(AnalyticsPage, "NNaO+NdSTxGWdd7K691DPrz+ehE=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useAuth"
        ],
      ];
    });
    _c1 = AnalyticsPage;
    var _c, _c1;
    __turbopack_context__.k.register(_c, "EngagementBadge");
    __turbopack_context__.k.register(_c1, "AnalyticsPage");
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

//# sourceMappingURL=src_7f169837._.js.map
