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
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c = ({ className, type, ...props }, ref) => {
          return  (0,
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
  "[project]/src/app/(crm)/client/leads/page.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => ClientLeadsPage]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/hooks/use-auth.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/input.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature(),
      _s1 = __turbopack_context__.k.signature();
    ("use client");
    
    const STATUS_CONFIG = {
      "not called": {
        label: "Not Called",
        color: "text-gray-700",
        bg: "bg-gray-100",
        dot: "bg-gray-400",
      },
      called: {
        label: "Called",
        color: "text-blue-700",
        bg: "bg-blue-100",
        dot: "bg-blue-500",
      },
      interested: {
        label: "Interested",
        color: "text-green-700",
        bg: "bg-green-100",
        dot: "bg-green-500",
      },
      "meeting booked": {
        label: "Meeting Booked",
        color: "text-purple-700",
        bg: "bg-purple-100",
        dot: "bg-purple-500",
      },
      "not interested": {
        label: "Not Interested",
        color: "text-red-700",
        bg: "bg-red-100",
        dot: "bg-red-400",
      },
      "call back later": {
        label: "Call Back Later",
        color: "text-yellow-700",
        bg: "bg-yellow-100",
        dot: "bg-yellow-400",
      },
      other: {
        label: "Other",
        color: "text-slate-700",
        bg: "bg-slate-100",
        dot: "bg-slate-400",
      },
    };
    const ALL_STATUSES = Object.keys(STATUS_CONFIG);
    _c = ALL_STATUSES;
    
    function getAuthHeaders() {
      const token = ("TURBOPACK compile-time truthy", 1)
        ? localStorage.getItem("auth_token")
        : "TURBOPACK unreachable";
      return {
        "Content-Type": "application/json",
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      };
    }
    function StatusBadge({ status }) {
      const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["other"];
      return  (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "span",
        {
          className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.color}`,
          children: [
             (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "span",
              {
                className: `w-1.5 h-1.5 rounded-full ${cfg.dot}`,
              },
              void 0,
              false,
              {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 56,
                columnNumber: 7,
              },
              this,
            ),
            cfg.label,
          ],
        },
        void 0,
        true,
        {
          fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
          lineNumber: 55,
          columnNumber: 5,
        },
        this,
      );
    }
    _c1 = StatusBadge;
    
    function LeadModal({ lead, onClose, onSave }) {
      _s();
      const [status, setStatus] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(lead.status || "not called");
      const [notes, setNotes] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(lead.notes || "");
      const [followUpDate, setFollowUpDate] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(lead.followUpDate || "");
      const [saving, setSaving] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const handleSave = async () => {
        setSaving(true);
        await onSave(String(lead._id || lead.id), {
          status,
          notes,
          followUpDate,
        });
        setSaving(false);
        onClose();
      };
      const extraFields = lead.metaFields
        ? Object.entries(lead.metaFields).filter(
            ([k]) =>
              ![
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
                "last_name",
              ].includes(k),
          )
        : [];
      return  (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className:
            "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
          children:  (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "div",
            {
              className:
                "bg-white border-2 border-black rounded-xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto",
              children: [
                 (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className:
                      "sticky top-0 bg-black text-white px-5 py-4 flex items-center justify-between rounded-t-xl",
                    children: [
                       (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          children: [
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "h2",
                              {
                                className: "font-black text-lg",
                                children: lead.name,
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 99,
                                columnNumber: 13,
                              },
                              this,
                            ),
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "p",
                              {
                                className: "text-gray-300 text-xs mt-0.5",
                                children:
                                  lead.campaignName ||
                                  lead.source ||
                                  "Meta Ads",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 100,
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
                            "[project]/src/app/(crm)/client/leads/page.tsx",
                          lineNumber: 98,
                          columnNumber: 11,
                        },
                        this,
                      ),
                       (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "button",
                        {
                          onClick: onClose,
                          className:
                            "text-white hover:text-gray-300 text-2xl leading-none font-black",
                          children: "×",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/app/(crm)/client/leads/page.tsx",
                          lineNumber: 102,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                    lineNumber: 97,
                    columnNumber: 9,
                  },
                  this,
                ),
                 (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className: "p-5 space-y-5",
                    children: [
                       (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "grid grid-cols-2 gap-3",
                          children: [
                            lead.phone &&
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "border-2 border-black rounded-lg p-3",
                                  children: [
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className:
                                          "text-xs font-bold text-gray-500 mb-1",
                                        children: "PHONE",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "a",
                                      {
                                        href: `tel:${lead.phone}`,
                                        className:
                                          "font-black text-blue-700 hover:underline text-sm",
                                        children: lead.phone,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className: "flex gap-2 mt-2",
                                        children: [
                                           (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "a",
                                            {
                                              href: `tel:${lead.phone}`,
                                              className:
                                                "flex-1 text-center text-xs py-1.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700",
                                              children: "📞 Call",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/client/leads/page.tsx",
                                              lineNumber: 113,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                           (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "a",
                                            {
                                              href: `https://wa.me/${lead.phone.replace(/\D/g, "")}`,
                                              target: "_blank",
                                              rel: "noopener noreferrer",
                                              className:
                                                "flex-1 text-center text-xs py-1.5 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600",
                                              children: "💬 WhatsApp",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/client/leads/page.tsx",
                                              lineNumber: 114,
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
                                          "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 112,
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
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 109,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            lead.email &&
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className:
                                    "border-2 border-black rounded-lg p-3",
                                  children: [
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className:
                                          "text-xs font-bold text-gray-500 mb-1",
                                        children: "EMAIL",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 121,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "a",
                                      {
                                        href: `mailto:${lead.email}`,
                                        className:
                                          "font-black text-blue-700 hover:underline text-sm break-all",
                                        children: lead.email,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "a",
                                      {
                                        href: `mailto:${lead.email}`,
                                        className:
                                          "block mt-2 text-center text-xs py-1.5 bg-gray-800 text-white rounded-lg font-bold hover:bg-black",
                                        children: "✉ Send Email",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 123,
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
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 120,
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
                            "[project]/src/app/(crm)/client/leads/page.tsx",
                          lineNumber: 107,
                          columnNumber: 11,
                        },
                        this,
                      ),
                       (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className:
                            "border-2 border-black rounded-lg p-3 bg-blue-50 space-y-1.5",
                          children: [
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "p",
                              {
                                className:
                                  "text-xs font-black text-gray-500 uppercase mb-2",
                                children: "Ad Campaign Info",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 130,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            lead.campaignName &&
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className: "text-xs font-semibold",
                                  children: [
                                    "📢 ",
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className: "font-black",
                                        children: lead.campaignName,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 75,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 131,
                                  columnNumber: 35,
                                },
                                this,
                              ),
                            lead.adSetName &&
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className: "text-xs text-gray-600",
                                  children: ["🎯 Ad Set: ", lead.adSetName],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 132,
                                  columnNumber: 32,
                                },
                                this,
                              ),
                            lead.adName &&
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className: "text-xs text-gray-600",
                                  children: ["📄 Ad: ", lead.adName],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 133,
                                  columnNumber: 29,
                                },
                                this,
                              ),
                            lead.formName &&
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className: "text-xs text-gray-600",
                                  children: ["📋 Form: ", lead.formName],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 134,
                                  columnNumber: 31,
                                },
                                this,
                              ),
                            lead.createdAt &&
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className: "text-xs text-gray-500",
                                  children: [
                                    "🕐 Submitted: ",
                                    new Date(lead.createdAt).toLocaleString(
                                      "en-IN",
                                      {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      },
                                    ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 136,
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
                            "[project]/src/app/(crm)/client/leads/page.tsx",
                          lineNumber: 129,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      extraFields.length > 0 &&
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "border-2 border-black rounded-lg p-3",
                            children: [
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className:
                                    "text-xs font-black text-gray-500 uppercase mb-2",
                                  children: "Form Responses",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 143,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  className: "space-y-1.5",
                                  children: extraFields.map(([k, v]) =>
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className:
                                          "flex justify-between text-xs",
                                        children: [
                                           (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "span",
                                            {
                                              className:
                                                "font-bold text-gray-600 capitalize",
                                              children: k.replace(/_/g, " "),
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/client/leads/page.tsx",
                                              lineNumber: 147,
                                              columnNumber: 21,
                                            },
                                            this,
                                          ),
                                           (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "span",
                                            {
                                              className:
                                                "font-semibold text-gray-900",
                                              children: v || "—",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/client/leads/page.tsx",
                                              lineNumber: 148,
                                              columnNumber: 21,
                                            },
                                            this,
                                          ),
                                        ],
                                      },
                                      k,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 146,
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
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 144,
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
                              "[project]/src/app/(crm)/client/leads/page.tsx",
                            lineNumber: 142,
                            columnNumber: 13,
                          },
                          this,
                        ),
                       (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "border-2 border-black rounded-lg p-3",
                          children: [
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "p",
                              {
                                className:
                                  "text-xs font-black text-gray-500 uppercase mb-2",
                                children: "Lead Status",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 157,
                                columnNumber: 13,
                              },
                              this,
                            ),
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "grid grid-cols-2 gap-2",
                                children: ALL_STATUSES.map((s) => {
                                  const cfg = STATUS_CONFIG[s];
                                  return  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "button",
                                    {
                                      onClick: () => setStatus(s),
                                      className: `text-xs font-bold py-2 px-3 rounded-lg border-2 transition-all text-left flex items-center gap-2
                      ${status === s ? `border-black ${cfg.bg} ${cfg.color}` : "border-gray-200 text-gray-500 hover:border-gray-400"}`,
                                      children: [
                                         (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "span",
                                          {
                                            className: `w-2 h-2 rounded-full flex-shrink-0 ${status === s ? cfg.dot : "bg-gray-300"}`,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/client/leads/page.tsx",
                                            lineNumber: 168,
                                            columnNumber: 21,
                                          },
                                          this,
                                        ),
                                        cfg.label,
                                      ],
                                    },
                                    s,
                                    true,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/client/leads/page.tsx",
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
                                  "[project]/src/app/(crm)/client/leads/page.tsx",
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
                            "[project]/src/app/(crm)/client/leads/page.tsx",
                          lineNumber: 156,
                          columnNumber: 11,
                        },
                        this,
                      ),
                       (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "border-2 border-black rounded-lg p-3",
                          children: [
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "p",
                              {
                                className:
                                  "text-xs font-black text-gray-500 uppercase mb-2",
                                children: "Follow-up Date",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 178,
                                columnNumber: 13,
                              },
                              this,
                            ),
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "input",
                              {
                                type: "date",
                                value: followUpDate,
                                onChange: (e) =>
                                  setFollowUpDate(e.target.value),
                                className:
                                  "w-full px-3 py-2 border-2 border-black rounded-lg text-sm font-semibold",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 179,
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
                            "[project]/src/app/(crm)/client/leads/page.tsx",
                          lineNumber: 177,
                          columnNumber: 11,
                        },
                        this,
                      ),
                       (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "border-2 border-black rounded-lg p-3",
                          children: [
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "p",
                              {
                                className:
                                  "text-xs font-black text-gray-500 uppercase mb-2",
                                children: "Notes",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 189,
                                columnNumber: 13,
                              },
                              this,
                            ),
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "textarea",
                              {
                                value: notes,
                                onChange: (e) => setNotes(e.target.value),
                                placeholder:
                                  "Add call notes, follow-up details...",
                                rows: 3,
                                className:
                                  "w-full px-3 py-2 border-2 border-black rounded-lg text-sm font-semibold resize-none focus:outline-none",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 190,
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
                            "[project]/src/app/(crm)/client/leads/page.tsx",
                          lineNumber: 188,
                          columnNumber: 11,
                        },
                        this,
                      ),
                       (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "flex gap-3",
                          children: [
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Button"
                              ],
                              {
                                variant: "outline",
                                onClick: onClose,
                                className:
                                  "flex-1 border-2 border-black font-bold",
                                children: "Cancel",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 201,
                                columnNumber: 13,
                              },
                              this,
                            ),
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "Button"
                              ],
                              {
                                onClick: handleSave,
                                disabled: saving,
                                className:
                                  "flex-1 bg-black text-white font-black border-2 border-black hover:bg-gray-800",
                                children: saving ? "Saving…" : "Save Changes",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 202,
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
                            "[project]/src/app/(crm)/client/leads/page.tsx",
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
                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                    lineNumber: 105,
                    columnNumber: 9,
                  },
                  this,
                ),
              ],
            },
            void 0,
            true,
            {
              fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
              lineNumber: 95,
              columnNumber: 7,
            },
            this,
          ),
        },
        void 0,
        false,
        {
          fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
          lineNumber: 94,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(LeadModal, "faSzH0mn45l2vN19tD512cO1eMY=");
    _c2 = LeadModal;
    function ClientLeadsPage() {
      _s1();
      const { user } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useAuth"
      ])();
      const [leads, setLeads] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(true);
      const [syncing, setSyncing] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [syncResult, setSyncResult] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [syncError, setSyncError] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [selectedLead, setSelectedLead] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      
      const [search, setSearch] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [statusFilter, setStatusFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [campaignFilter, setCampaignFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const fetchLeads = async () => {
        try {
          setLoading(true);
          const res = await fetch("/api/leads", {
            headers: getAuthHeaders(),
          });
          if (!res.ok) throw new Error("Failed");
          const data = await res.json();
          setLeads(Array.isArray(data) ? data : []);
        } catch {
          setLeads([]);
        } finally {
          setLoading(false);
        }
      };
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "ClientLeadsPage.useEffect": () => {
            if (!user || user.role !== "client") return;
            fetchLeads();
          },
        }["ClientLeadsPage.useEffect"],
        [user],
      );
      const handleSyncFbLeads = async () => {
        if (!user?.clientId) return;
        setSyncing(true);
        setSyncError(null);
        setSyncResult(null);
        try {
          const res = await fetch("/api/client-leads/sync", {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({
              clientId: user.clientId,
            }),
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
        } finally {
          setSyncing(false);
        }
      };
      const handleSaveLead = async (id, updates) => {
        await fetch(`/api/leads/${id}`, {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify(updates),
        });
        setLeads((prev) =>
          prev.map((l) =>
            String(l._id || l.id) === id
              ? {
                  ...l,
                  ...updates,
                }
              : l,
          ),
        );
      };
      
      const stats = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "ClientLeadsPage.useMemo[stats]": () => {
            const total = leads.length;
            const converted = leads.filter(
              {
                "ClientLeadsPage.useMemo[stats]": (l) =>
                  l.status === "interested" || l.status === "meeting booked",
              }["ClientLeadsPage.useMemo[stats]"],
            ).length;
            const notCalled = leads.filter(
              {
                "ClientLeadsPage.useMemo[stats]": (l) =>
                  !l.status || l.status === "not called",
              }["ClientLeadsPage.useMemo[stats]"],
            ).length;
            const now = new Date();
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            const newThisMonth = leads.filter(
              {
                "ClientLeadsPage.useMemo[stats]": (l) =>
                  l.createdAt && new Date(l.createdAt) >= monthStart,
              }["ClientLeadsPage.useMemo[stats]"],
            ).length;
            return {
              total,
              converted,
              notCalled,
              newThisMonth,
              conversionRate:
                total > 0 ? Math.round((converted / total) * 100) : 0,
            };
          },
        }["ClientLeadsPage.useMemo[stats]"],
        [leads],
      );
      
      const campaigns = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "ClientLeadsPage.useMemo[campaigns]": () =>
            Array.from(
              new Set(
                leads
                  .map(
                    {
                      "ClientLeadsPage.useMemo[campaigns]": (l) =>
                        l.campaignName,
                    }["ClientLeadsPage.useMemo[campaigns]"],
                  )
                  .filter(Boolean),
              ),
            ),
        }["ClientLeadsPage.useMemo[campaigns]"],
        [leads],
      );
      
      const filtered = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "ClientLeadsPage.useMemo[filtered]": () =>
            leads.filter(
              {
                "ClientLeadsPage.useMemo[filtered]": (l) => {
                  const q = search.toLowerCase();
                  const matchSearch =
                    !search ||
                    l.name?.toLowerCase().includes(q) ||
                    l.phone?.includes(q) ||
                    l.email?.toLowerCase().includes(q) ||
                    l.campaignName?.toLowerCase().includes(q);
                  const matchStatus =
                    !statusFilter || l.status === statusFilter;
                  const matchCampaign =
                    !campaignFilter || l.campaignName === campaignFilter;
                  return matchSearch && matchStatus && matchCampaign;
                },
              }["ClientLeadsPage.useMemo[filtered]"],
            ),
        }["ClientLeadsPage.useMemo[filtered]"],
        [leads, search, statusFilter, campaignFilter],
      );
      
      const followUpsDue = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "ClientLeadsPage.useMemo[followUpsDue]": () => {
            const today = new Date().toISOString().slice(0, 10);
            return leads.filter(
              {
                "ClientLeadsPage.useMemo[followUpsDue]": (l) =>
                  l.followUpDate &&
                  l.followUpDate <= today &&
                  l.status !== "not interested",
              }["ClientLeadsPage.useMemo[followUpsDue]"],
            );
          },
        }["ClientLeadsPage.useMemo[followUpsDue]"],
        [leads],
      );
      if (!user || user.role !== "client") {
        return  (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            className: "flex items-center justify-center min-h-screen",
            children:  (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "border-2 border-black rounded-xl p-8 text-center",
                children:  (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "h2",
                  {
                    className: "text-xl font-black",
                    children: "Access Denied",
                  },
                  void 0,
                  false,
                  {
                    fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                    lineNumber: 315,
                    columnNumber: 11,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 314,
                columnNumber: 9,
              },
              this,
            ),
          },
          void 0,
          false,
          {
            fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
            lineNumber: 313,
            columnNumber: 7,
          },
          this,
        );
      }
      return  (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "min-h-screen bg-background font-headline p-6 space-y-6",
          children: [
             (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "flex flex-wrap items-start justify-between gap-4",
                children: [
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "h1",
                          {
                            className: "text-4xl font-black tracking-tighter",
                            children: "Lead Management",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/client/leads/page.tsx",
                            lineNumber: 327,
                            columnNumber: 11,
                          },
                          this,
                        ),
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "p",
                          {
                            className: "text-muted-foreground mt-1",
                            children:
                              "Track, manage and follow up on your leads",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/client/leads/page.tsx",
                            lineNumber: 328,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                      lineNumber: 326,
                      columnNumber: 9,
                    },
                    this,
                  ),
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "flex flex-col items-end gap-2",
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "Button"
                          ],
                          {
                            onClick: handleSyncFbLeads,
                            disabled: syncing,
                            className:
                              "bg-blue-600 hover:bg-blue-700 text-white border-2 border-black font-bold",
                            children: syncing
                              ? "Syncing…"
                              : "⟳ Sync from Facebook Ads",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/client/leads/page.tsx",
                            lineNumber: 331,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        syncResult &&
                           (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "p",
                            {
                              className: "text-xs font-semibold text-green-700",
                              children: [
                                "✓ ",
                                syncResult.synced,
                                " new · ",
                                syncResult.skipped,
                                " existing · ",
                                syncResult.total,
                                " total found",
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/src/app/(crm)/client/leads/page.tsx",
                              lineNumber: 339,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        syncError &&
                           (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "p",
                            {
                              className: "text-xs font-semibold text-red-600",
                              children: ["⚠ ", syncError],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/src/app/(crm)/client/leads/page.tsx",
                              lineNumber: 343,
                              columnNumber: 25,
                            },
                            this,
                          ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                      lineNumber: 330,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 325,
                columnNumber: 7,
              },
              this,
            ),
            followUpsDue.length > 0 &&
               (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "div",
                {
                  className:
                    "border-2 border-orange-400 bg-orange-50 rounded-xl px-4 py-3 flex items-center justify-between flex-wrap gap-2",
                  children: [
                     (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "p",
                      {
                        className: "text-sm font-bold text-orange-800",
                        children: [
                          "🔔 ",
                          followUpsDue.length,
                          " follow-up",
                          followUpsDue.length > 1 ? "s" : "",
                          " due today —",
                          " ",
                          followUpsDue
                            .map((l) => l.name)
                            .slice(0, 3)
                            .join(", "),
                          followUpsDue.length > 3 &&
                            ` +${followUpsDue.length - 3} more`,
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName:
                          "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 350,
                        columnNumber: 11,
                      },
                      this,
                    ),
                     (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "button",
                      {
                        onClick: () => setStatusFilter(""),
                        className:
                          "text-xs font-bold text-orange-700 underline",
                        children: "View All",
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "[project]/src/app/(crm)/client/leads/page.tsx",
                        lineNumber: 355,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                  lineNumber: 349,
                  columnNumber: 9,
                },
                this,
              ),
             (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "grid grid-cols-2 md:grid-cols-5 gap-3",
                children: [
                  {
                    label: "Total Leads",
                    value: stats.total,
                    color: "bg-gray-50",
                    icon: "👥",
                  },
                  {
                    label: "Not Called",
                    value: stats.notCalled,
                    color: "bg-red-50",
                    icon: "📵",
                  },
                  {
                    label: "Interested",
                    value: stats.converted,
                    color: "bg-green-50",
                    icon: "✅",
                  },
                  {
                    label: "This Month",
                    value: stats.newThisMonth,
                    color: "bg-blue-50",
                    icon: "📅",
                  },
                  {
                    label: "Conv. Rate",
                    value: `${stats.conversionRate}%`,
                    color: "bg-purple-50",
                    icon: "🎯",
                  },
                ].map((s) =>
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: `border-2 border-black rounded-xl p-4 ${s.color}`,
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "flex items-center justify-between mb-1",
                            children: [
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "span",
                                {
                                  className:
                                    "text-xs font-bold text-gray-500 uppercase tracking-wide",
                                  children: s.label,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 375,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "span",
                                {
                                  className: "text-base",
                                  children: s.icon,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 376,
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
                              "[project]/src/app/(crm)/client/leads/page.tsx",
                            lineNumber: 374,
                            columnNumber: 13,
                          },
                          this,
                        ),
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "text-2xl font-black",
                            children: s.value,
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/client/leads/page.tsx",
                            lineNumber: 378,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      ],
                    },
                    s.label,
                    true,
                    {
                      fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                      lineNumber: 373,
                      columnNumber: 11,
                    },
                    this,
                  ),
                ),
              },
              void 0,
              false,
              {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 365,
                columnNumber: 7,
              },
              this,
            ),
             (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "border-2 border-black rounded-xl p-4",
                children: [
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "p",
                    {
                      className:
                        "text-xs font-black text-gray-500 uppercase mb-3",
                      children: "Status Breakdown",
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                      lineNumber: 385,
                      columnNumber: 9,
                    },
                    this,
                  ),
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "flex flex-wrap gap-2",
                      children: [
                        ALL_STATUSES.map((s) => {
                          const count = leads.filter(
                            (l) => l.status === s,
                          ).length;
                          if (count === 0) return null;
                          const cfg = STATUS_CONFIG[s];
                          return  (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "button",
                            {
                              onClick: () =>
                                setStatusFilter(statusFilter === s ? "" : s),
                              className: `flex items-center gap-2 px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all
                  ${statusFilter === s ? `border-black ${cfg.bg} ${cfg.color}` : "border-gray-200 hover:border-gray-400 text-gray-600"}`,
                              children: [
                                 (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "span",
                                  {
                                    className: `w-2 h-2 rounded-full ${cfg.dot}`,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/client/leads/page.tsx",
                                    lineNumber: 398,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                                cfg.label,
                                " ",
                                 (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "span",
                                  {
                                    className: "font-black",
                                    children: ["(", count, ")"],
                                  },
                                  void 0,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/client/leads/page.tsx",
                                    lineNumber: 399,
                                    columnNumber: 29,
                                  },
                                  this,
                                ),
                              ],
                            },
                            s,
                            true,
                            {
                              fileName:
                                "[project]/src/app/(crm)/client/leads/page.tsx",
                              lineNumber: 392,
                              columnNumber: 15,
                            },
                            this,
                          );
                        }),
                        statusFilter &&
                           (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "button",
                            {
                              onClick: () => setStatusFilter(""),
                              className:
                                "px-3 py-1.5 rounded-full border-2 border-gray-300 text-xs font-bold text-gray-500 hover:border-black",
                              children: "✕ Clear",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/app/(crm)/client/leads/page.tsx",
                              lineNumber: 404,
                              columnNumber: 13,
                            },
                            this,
                          ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                      lineNumber: 386,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 384,
                columnNumber: 7,
              },
              this,
            ),
             (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "border-2 border-black rounded-xl overflow-hidden",
                children: [
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className:
                        "border-b-2 border-black px-4 py-3 bg-gray-50 flex flex-wrap gap-3 items-center justify-between",
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "flex flex-wrap gap-3 flex-1",
                            children: [
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "Input"
                                ],
                                {
                                  placeholder:
                                    "Search name, phone, email, campaign...",
                                  value: search,
                                  onChange: (e) => setSearch(e.target.value),
                                  className:
                                    "border-2 border-black font-semibold text-sm max-w-xs",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 416,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "select",
                                {
                                  value: campaignFilter,
                                  onChange: (e) =>
                                    setCampaignFilter(e.target.value),
                                  className:
                                    "px-3 py-2 border-2 border-black rounded-md bg-white font-semibold text-sm",
                                  children: [
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "option",
                                      {
                                        value: "",
                                        children: "All Campaigns",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/client/leads/page.tsx",
                                        lineNumber: 427,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    campaigns.map((c) =>
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                            "[project]/src/app/(crm)/client/leads/page.tsx",
                                          lineNumber: 428,
                                          columnNumber: 37,
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
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 422,
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
                              "[project]/src/app/(crm)/client/leads/page.tsx",
                            lineNumber: 415,
                            columnNumber: 11,
                          },
                          this,
                        ),
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "span",
                          {
                            className: "text-xs font-bold text-gray-500",
                            children: [filtered.length, " leads"],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/app/(crm)/client/leads/page.tsx",
                            lineNumber: 431,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                      lineNumber: 414,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  loading
                    ?  (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className:
                            "p-12 text-center text-muted-foreground font-semibold",
                          children: "Loading leads…",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/src/app/(crm)/client/leads/page.tsx",
                          lineNumber: 436,
                          columnNumber: 11,
                        },
                        this,
                      )
                    : filtered.length === 0
                      ?  (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "p-12 text-center",
                            children: [
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className: "text-xl font-black",
                                  children: "No leads found",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 439,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "p",
                                {
                                  className: "text-sm text-gray-500 mt-1",
                                  children:
                                    "Try syncing from Facebook Ads or adjust filters",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                  lineNumber: 440,
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
                              "[project]/src/app/(crm)/client/leads/page.tsx",
                            lineNumber: 438,
                            columnNumber: 11,
                          },
                          this,
                        )
                      :  (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "overflow-x-auto",
                            children:  (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "table",
                              {
                                className: "w-full",
                                children: [
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "thead",
                                    {
                                      className: "bg-black text-white",
                                      children:  (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "tr",
                                        {
                                          children: [
                                             (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "th",
                                              {
                                                className:
                                                  "px-4 py-3 text-left text-xs font-black uppercase",
                                                children: "Lead",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 447,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                             (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "th",
                                              {
                                                className:
                                                  "px-4 py-3 text-left text-xs font-black uppercase",
                                                children: "Contact",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 448,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                             (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "th",
                                              {
                                                className:
                                                  "px-4 py-3 text-left text-xs font-black uppercase",
                                                children: "Campaign",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 449,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                             (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "th",
                                              {
                                                className:
                                                  "px-4 py-3 text-left text-xs font-black uppercase",
                                                children: "Status",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 450,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                             (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "th",
                                              {
                                                className:
                                                  "px-4 py-3 text-left text-xs font-black uppercase",
                                                children: "Follow-up",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 451,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                             (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "th",
                                              {
                                                className:
                                                  "px-4 py-3 text-left text-xs font-black uppercase",
                                                children: "Notes",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 452,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                             (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "th",
                                              {
                                                className:
                                                  "px-4 py-3 text-left text-xs font-black uppercase",
                                                children: "Date",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 453,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                             (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "th",
                                              {
                                                className:
                                                  "px-4 py-3 text-center text-xs font-black uppercase",
                                                children: "Action",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                                lineNumber: 454,
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
                                            "[project]/src/app/(crm)/client/leads/page.tsx",
                                          lineNumber: 446,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/client/leads/page.tsx",
                                      lineNumber: 445,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "tbody",
                                    {
                                      children: filtered.map((lead, i) => {
                                        const followUpDue =
                                          lead.followUpDate &&
                                          lead.followUpDate <=
                                            new Date()
                                              .toISOString()
                                              .slice(0, 10);
                                        return  (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "tr",
                                          {
                                            className: `border-b border-gray-200 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`,
                                            children: [
                                               (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "td",
                                                {
                                                  className: "px-4 py-3",
                                                  children:  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "div",
                                                    {
                                                      className:
                                                        "font-black text-sm",
                                                      children:
                                                        lead.name || "—",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/client/leads/page.tsx",
                                                      lineNumber: 466,
                                                      columnNumber: 25,
                                                    },
                                                    this,
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                                  lineNumber: 465,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                               (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "td",
                                                {
                                                  className: "px-4 py-3",
                                                  children: [
                                                    lead.phone &&
                                                       (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "a",
                                                        {
                                                          href: `tel:${lead.phone}`,
                                                          className:
                                                            "text-sm font-semibold text-blue-700 hover:underline block",
                                                          children: lead.phone,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/client/leads/page.tsx",
                                                          lineNumber: 470,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                    lead.email &&
                                                       (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "a",
                                                        {
                                                          href: `mailto:${lead.email}`,
                                                          className:
                                                            "text-xs text-gray-500 hover:underline block truncate max-w-[140px]",
                                                          children: lead.email,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/client/leads/page.tsx",
                                                          lineNumber: 473,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                    lead.phone &&
                                                       (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "a",
                                                        {
                                                          href: `https://wa.me/${lead.phone.replace(/\D/g, "")}`,
                                                          target: "_blank",
                                                          rel: "noopener noreferrer",
                                                          className:
                                                            "inline-flex items-center gap-1 text-xs text-green-600 font-bold hover:underline mt-1",
                                                          children:
                                                            "💬 WhatsApp",
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/client/leads/page.tsx",
                                                          lineNumber: 476,
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
                                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                                  lineNumber: 468,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                               (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "td",
                                                {
                                                  className:
                                                    "px-4 py-3 max-w-[160px]",
                                                  children: [
                                                    lead.campaignName &&
                                                       (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "div",
                                                        {
                                                          className:
                                                            "text-xs font-black truncate",
                                                          children: [
                                                            "📢 ",
                                                            lead.campaignName,
                                                          ],
                                                        },
                                                        void 0,
                                                        true,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/client/leads/page.tsx",
                                                          lineNumber: 487,
                                                          columnNumber: 47,
                                                        },
                                                        this,
                                                      ),
                                                    lead.adSetName &&
                                                       (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "div",
                                                        {
                                                          className:
                                                            "text-xs text-gray-500 truncate",
                                                          children: [
                                                            "🎯 ",
                                                            lead.adSetName,
                                                          ],
                                                        },
                                                        void 0,
                                                        true,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/client/leads/page.tsx",
                                                          lineNumber: 488,
                                                          columnNumber: 44,
                                                        },
                                                        this,
                                                      ),
                                                    lead.formName &&
                                                      !lead.campaignName &&
                                                       (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "div",
                                                        {
                                                          className:
                                                            "text-xs text-gray-500 truncate",
                                                          children: [
                                                            "📋 ",
                                                            lead.formName,
                                                          ],
                                                        },
                                                        void 0,
                                                        true,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/client/leads/page.tsx",
                                                          lineNumber: 489,
                                                          columnNumber: 65,
                                                        },
                                                        this,
                                                      ),
                                                  ],
                                                },
                                                void 0,
                                                true,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                                  lineNumber: 486,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                               (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "td",
                                                {
                                                  className: "px-4 py-3",
                                                  children:  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    StatusBadge,
                                                    {
                                                      status:
                                                        lead.status ||
                                                        "not called",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/client/leads/page.tsx",
                                                      lineNumber: 492,
                                                      columnNumber: 25,
                                                    },
                                                    this,
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                                  lineNumber: 491,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                               (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "td",
                                                {
                                                  className: "px-4 py-3",
                                                  children: lead.followUpDate
                                                    ?  (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "span",
                                                        {
                                                          className: `text-xs font-bold ${followUpDue ? "text-red-600" : "text-gray-600"}`,
                                                          children: [
                                                            followUpDue
                                                              ? "🔔 "
                                                              : "📅 ",
                                                            new Date(
                                                              lead.followUpDate,
                                                            ).toLocaleDateString(
                                                              "en-IN",
                                                              {
                                                                day: "2-digit",
                                                                month: "short",
                                                              },
                                                            ),
                                                          ],
                                                        },
                                                        void 0,
                                                        true,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/client/leads/page.tsx",
                                                          lineNumber: 496,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      )
                                                    :  (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "span",
                                                        {
                                                          className:
                                                            "text-xs text-gray-400",
                                                          children: "—",
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/client/leads/page.tsx",
                                                          lineNumber: 500,
                                                          columnNumber: 27,
                                                        },
                                                        this,
                                                      ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                                  lineNumber: 494,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                               (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "td",
                                                {
                                                  className:
                                                    "px-4 py-3 max-w-[150px]",
                                                  children:  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "p",
                                                    {
                                                      className:
                                                        "text-xs text-gray-600 truncate",
                                                      children:
                                                        lead.notes || "—",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/client/leads/page.tsx",
                                                      lineNumber: 504,
                                                      columnNumber: 25,
                                                    },
                                                    this,
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                                  lineNumber: 503,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                               (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "td",
                                                {
                                                  className:
                                                    "px-4 py-3 text-xs text-gray-500 font-semibold whitespace-nowrap",
                                                  children: lead.createdAt
                                                    ? new Date(
                                                        lead.createdAt,
                                                      ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                          day: "2-digit",
                                                          month: "short",
                                                          year: "2-digit",
                                                        },
                                                      )
                                                    : "—",
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                                  lineNumber: 506,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                               (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "td",
                                                {
                                                  className:
                                                    "px-4 py-3 text-center",
                                                  children:  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      "Button"
                                                    ],
                                                    {
                                                      size: "sm",
                                                      className:
                                                        "text-xs font-bold border-2 border-black h-7 px-3 bg-white text-black hover:bg-black hover:text-white",
                                                      onClick: () =>
                                                        setSelectedLead(lead),
                                                      children: "Manage",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/client/leads/page.tsx",
                                                      lineNumber: 510,
                                                      columnNumber: 25,
                                                    },
                                                    this,
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/client/leads/page.tsx",
                                                  lineNumber: 509,
                                                  columnNumber: 23,
                                                },
                                                this,
                                              ),
                                            ],
                                          },
                                          String(lead._id || lead.id),
                                          true,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/client/leads/page.tsx",
                                            lineNumber: 461,
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
                                        "[project]/src/app/(crm)/client/leads/page.tsx",
                                      lineNumber: 457,
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
                                  "[project]/src/app/(crm)/client/leads/page.tsx",
                                lineNumber: 444,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/client/leads/page.tsx",
                            lineNumber: 443,
                            columnNumber: 11,
                          },
                          this,
                        ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                lineNumber: 412,
                columnNumber: 7,
              },
              this,
            ),
            selectedLead &&
               (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                LeadModal,
                {
                  lead: selectedLead,
                  onClose: () => setSelectedLead(null),
                  onSave: handleSaveLead,
                },
                void 0,
                false,
                {
                  fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
                  lineNumber: 529,
                  columnNumber: 9,
                },
                this,
              ),
          ],
        },
        void 0,
        true,
        {
          fileName: "[project]/src/app/(crm)/client/leads/page.tsx",
          lineNumber: 322,
          columnNumber: 5,
        },
        this,
      );
    }
    _s1(ClientLeadsPage, "xPLUNi+Kl5/87HhxEJZfbMe4VxE=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useAuth"
        ],
      ];
    });
    _c3 = ClientLeadsPage;
    var _c, _c1, _c2, _c3;
    __turbopack_context__.k.register(_c, "ALL_STATUSES");
    __turbopack_context__.k.register(_c1, "StatusBadge");
    __turbopack_context__.k.register(_c2, "LeadModal");
    __turbopack_context__.k.register(_c3, "ClientLeadsPage");
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


