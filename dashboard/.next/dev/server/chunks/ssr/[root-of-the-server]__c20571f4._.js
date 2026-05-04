module.exports = [
  "[externals]/module [external] (module, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x("module", () => require("module"));

    module.exports = mod;
  },
  "[externals]/util [external] (util, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x("util", () => require("util"));

    module.exports = mod;
  },
  "[externals]/crypto [external] (crypto, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x("crypto", () => require("crypto"));

    module.exports = mod;
  },
  "[externals]/async_hooks [external] (async_hooks, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x("async_hooks", () =>
      require("async_hooks"),
    );

    module.exports = mod;
  },
  "[externals]/stream [external] (stream, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x("stream", () => require("stream"));

    module.exports = mod;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["OnboardingPDF", () => OnboardingPDF]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    function OnboardingPDF({ data }) {
      const formatDate = (d) => {
        if (!d) return "—";
        const dt = d instanceof Date ? d : new Date(d);
        if (isNaN(dt.getTime())) return "—";
        return dt.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      };
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          style: {
            fontFamily:
              "'Noto Sans Local', 'Noto Sans', Inter, Roboto, sans-serif",
            width: "210mm",
            color: "#111",
            background: "#fff",
            fontSize: "13px",
            lineHeight: "1.5",
            boxSizing: "border-box",
          },
          children: [
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                style: {
                  width: "210mm",
                  height: "297mm",
                  padding: "36mm 20mm",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  background: "linear-gradient(135deg,#f7fbff 0%,#eef6ff 100%)",
                  pageBreakAfter: "always",
                },
                children: [
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "h1",
                    {
                      style: {
                        fontSize: "44px",
                        margin: 0,
                        color: "#0b3a91",
                      },
                      children: "Client Onboarding",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                      lineNumber: 42,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      style: {
                        marginTop: 18,
                        fontSize: 18,
                        color: "#333",
                      },
                      children: data?.projectTitle || "New Project",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                      lineNumber: 43,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      style: {
                        marginTop: 28,
                        fontSize: 16,
                        color: "#666",
                      },
                      children: formatDate(data?.date || new Date()),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                      lineNumber: 44,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                lineNumber: 28,
                columnNumber: 7,
              },
              this,
            ),
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                style: {
                  width: "210mm",
                  padding: "20mm",
                  pageBreakAfter: "always",
                },
                children: [
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      style: {
                        marginBottom: 12,
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#0b3a91",
                      },
                      children: "Client Details",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                      lineNumber: 49,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      style: {
                        background: "#f6f7fb",
                        padding: 16,
                        borderRadius: 8,
                      },
                      children: [
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              marginBottom: 8,
                            },
                            children: [
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "strong",
                                {
                                  children: "Name:",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 51,
                                  columnNumber: 44,
                                },
                                this,
                              ),
                              " ",
                              data.clientName || "—",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                            lineNumber: 51,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              marginBottom: 8,
                            },
                            children: [
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "strong",
                                {
                                  children: "Company:",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 52,
                                  columnNumber: 44,
                                },
                                this,
                              ),
                              " ",
                              data.company || "—",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                            lineNumber: 52,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              marginBottom: 8,
                            },
                            children: [
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "strong",
                                {
                                  children: "Email:",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 53,
                                  columnNumber: 44,
                                },
                                this,
                              ),
                              " ",
                              data.email || "—",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                            lineNumber: 53,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              marginBottom: 8,
                            },
                            children: [
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "strong",
                                {
                                  children: "Phone:",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 54,
                                  columnNumber: 44,
                                },
                                this,
                              ),
                              " ",
                              data.phone || "—",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                            lineNumber: 54,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              marginBottom: 8,
                            },
                            children: [
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "strong",
                                {
                                  children: "Address:",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 55,
                                  columnNumber: 44,
                                },
                                this,
                              ),
                              " ",
                              data.address || "—",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                            lineNumber: 55,
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
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                      lineNumber: 50,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      style: {
                        marginTop: 20,
                        marginBottom: 12,
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#0b3a91",
                      },
                      children: "Project Snapshot",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                      lineNumber: 58,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      style: {
                        background: "#fff",
                        padding: 16,
                        borderRadius: 8,
                        border: "1px solid #eee",
                      },
                      children: [
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              marginBottom: 8,
                            },
                            children: [
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "strong",
                                {
                                  children: "Project Type:",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 60,
                                  columnNumber: 44,
                                },
                                this,
                              ),
                              " ",
                              data.projectType || "—",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                            lineNumber: 60,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              marginBottom: 8,
                            },
                            children: [
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "strong",
                                {
                                  children: "Website / App Type:",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 61,
                                  columnNumber: 44,
                                },
                                this,
                              ),
                              " ",
                              data.productType || "—",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                            lineNumber: 61,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              marginBottom: 8,
                            },
                            children: [
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "strong",
                                {
                                  children: "Pages / Modules:",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 62,
                                  columnNumber: 44,
                                },
                                this,
                              ),
                              " ",
                              data.pages || "—",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                            lineNumber: 62,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              marginBottom: 8,
                            },
                            children: [
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "strong",
                                {
                                  children: "Estimated Budget:",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 63,
                                  columnNumber: 44,
                                },
                                this,
                              ),
                              " ",
                              data.budget || "—",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                            lineNumber: 63,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              marginBottom: 8,
                            },
                            children: [
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "strong",
                                {
                                  children: "Start Date:",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 64,
                                  columnNumber: 44,
                                },
                                this,
                              ),
                              " ",
                              formatDate(data.startDate),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                            lineNumber: 64,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              marginBottom: 8,
                            },
                            children: [
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "strong",
                                {
                                  children: "Target Delivery:",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 65,
                                  columnNumber: 44,
                                },
                                this,
                              ),
                              " ",
                              formatDate(data.deadline),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                            lineNumber: 65,
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
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                      lineNumber: 59,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                lineNumber: 48,
                columnNumber: 7,
              },
              this,
            ),
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                style: {
                  width: "210mm",
                  padding: "20mm",
                },
                children: [
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      style: {
                        marginBottom: 12,
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#0b3a91",
                      },
                      children: "Project Brief / Requirements",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                      lineNumber: 71,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      style: {
                        background: "#f6f7fb",
                        padding: 16,
                        borderRadius: 8,
                        minHeight: 120,
                      },
                      children: (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          style: {
                            whiteSpace: "pre-wrap",
                            fontSize: 14,
                            color: "#222",
                          },
                          children: data.brief || "—",
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
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
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                      lineNumber: 72,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      style: {
                        marginTop: 20,
                        display: "flex",
                        gap: 20,
                      },
                      children: [
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              flex: 1,
                            },
                            children: [
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  style: {
                                    fontSize: 16,
                                    fontWeight: 700,
                                    marginBottom: 8,
                                  },
                                  children: "Primary Contact",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 78,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  style: {
                                    background: "#fff",
                                    padding: 12,
                                    borderRadius: 8,
                                    border: "1px solid #eee",
                                  },
                                  children: [
                                    (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        style: {
                                          marginBottom: 6,
                                        },
                                        children: (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "strong",
                                          {
                                            children: data.contactName || "—",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                            lineNumber: 80,
                                            columnNumber: 48,
                                          },
                                          this,
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                        lineNumber: 80,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        style: {
                                          marginBottom: 4,
                                        },
                                        children: data.contactEmail || "—",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                    (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        children: data.contactPhone || "—",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                        lineNumber: 82,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 79,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                            lineNumber: 77,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              flex: 1,
                            },
                            children: [
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  style: {
                                    fontSize: 16,
                                    fontWeight: 700,
                                    marginBottom: 8,
                                  },
                                  children: "Deliverables (High level)",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 87,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "div",
                                {
                                  style: {
                                    background: "#fff",
                                    padding: 12,
                                    borderRadius: 8,
                                    border: "1px solid #eee",
                                  },
                                  children: (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "ul",
                                    {
                                      style: {
                                        margin: 0,
                                        paddingLeft: 18,
                                      },
                                      children:
                                        (data.deliverables || []).length > 0
                                          ? (data.deliverables || []).map(
                                              (d, i) =>
                                                (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "li",
                                                  {
                                                    children: d,
                                                  },
                                                  i,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 75,
                                                  },
                                                  this,
                                                ),
                                            )
                                          : (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "li",
                                              {
                                                children: "—",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                                lineNumber: 93,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                      lineNumber: 89,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                  lineNumber: 88,
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
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                            lineNumber: 86,
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
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                      lineNumber: 76,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      style: {
                        marginTop: 28,
                      },
                      children: [
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              fontSize: 14,
                              color: "#666",
                            },
                            children: "Notes",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                            lineNumber: 101,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            style: {
                              marginTop: 8,
                              background: "#fff",
                              padding: 12,
                              borderRadius: 8,
                              border: "1px solid #eee",
                            },
                            children: (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                style: {
                                  whiteSpace: "pre-wrap",
                                },
                                children: data.notes || "—",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                lineNumber: 103,
                                columnNumber: 13,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
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
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                      lineNumber: 100,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      style: {
                        marginTop: 28,
                      },
                      children: (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          },
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                style: {
                                  fontSize: 13,
                                  color: "#777",
                                },
                                children: "Generated by Pixelate Nest",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                lineNumber: 109,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                style: {
                                  textAlign: "right",
                                },
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      style: {
                                        fontSize: 14,
                                        fontWeight: 700,
                                      },
                                      children: data.clientName || "Client",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                      lineNumber: 111,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      style: {
                                        fontSize: 12,
                                        color: "#777",
                                        marginTop: 8,
                                      },
                                      children:
                                        "Signature: ________________________",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                      lineNumber: 112,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                                lineNumber: 110,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                          lineNumber: 108,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                      lineNumber: 107,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
                lineNumber: 70,
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
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx",
          lineNumber: 16,
          columnNumber: 5,
        },
        this,
      );
    }
  },
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
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, type, ...props }, ref) => {
        return (0,
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
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) => {
        return (0,
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
            lineNumber: 9,
            columnNumber: 7,
          },
          ("TURBOPACK compile-time value", void 0),
        );
      });
    Textarea.displayName = "Textarea";
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
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, children, ...props }, ref) =>
        (0,
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
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "Icon"
                ],
                {
                  asChild: true,
                  children: (0,
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
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
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
            children: (0,
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
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
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
            children: (0,
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
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, children, position = "popper", ...props }, ref) =>
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Portal"
          ],
          {
            children: (0,
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
                  (0,
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
                  (0,
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
                  (0,
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
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
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
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, children, ...props }, ref) =>
        (0,
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
              (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "span",
                {
                  className:
                    "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                  children: (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "ItemIndicator"
                    ],
                    {
                      children: (0,
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
              (0,
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
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
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
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
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
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, children, ...props }, ref) =>
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          DialogPortal,
          {
            children: [
              (0,
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
              (0,
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
                    (0,
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
                          (0,
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
                          (0,
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
      (0,
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
      (0,
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
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
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
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/table.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Table",
      () => Table,
      "TableBody",
      () => TableBody,
      "TableCaption",
      () => TableCaption,
      "TableCell",
      () => TableCell,
      "TableFooter",
      () => TableFooter,
      "TableHead",
      () => TableHead,
      "TableHeader",
      () => TableHeader,
      "TableRow",
      () => TableRow,
    ]);
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
    const Table =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            className: "relative w-full overflow-auto",
            children: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "table",
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "cn"
                ])("w-full caption-bottom text-sm", className),
                ...props,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/table.tsx",
                lineNumber: 10,
                columnNumber: 5,
              },
              ("TURBOPACK compile-time value", void 0),
            ),
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/table.tsx",
            lineNumber: 9,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    Table.displayName = "Table";
    const TableHeader =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "thead",
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("[&_tr]:border-b", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/table.tsx",
            lineNumber: 23,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    TableHeader.displayName = "TableHeader";
    const TableBody =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "tbody",
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("[&_tr:last-child]:border-0", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/table.tsx",
            lineNumber: 31,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    TableBody.displayName = "TableBody";
    const TableFooter =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "tfoot",
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
              className,
            ),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/table.tsx",
            lineNumber: 43,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    TableFooter.displayName = "TableFooter";
    const TableRow =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "tr",
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
              className,
            ),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/table.tsx",
            lineNumber: 58,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    TableRow.displayName = "TableRow";
    const TableHead =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "th",
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
              className,
            ),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/table.tsx",
            lineNumber: 73,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    TableHead.displayName = "TableHead";
    const TableCell =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "td",
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/table.tsx",
            lineNumber: 88,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    TableCell.displayName = "TableCell";
    const TableCaption =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
        (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "caption",
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("mt-4 text-sm text-muted-foreground", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/table.tsx",
            lineNumber: 100,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    TableCaption.displayName = "TableCaption";
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => OnboardingPage]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/navigation.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/jspdf/dist/jspdf.es.min.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$server$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react-dom/server.node.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$onboarding$2f$onboarding$2d$pdf$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/onboarding/onboarding-pdf.tsx [app-ssr] (ecmascript)",
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
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/select.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/dialog.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/table.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/date-fns/format.mjs [app-ssr] (ecmascript) <locals>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/hooks/use-toast.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/hooks/use-auth.tsx [app-ssr] (ecmascript)",
      );
    ("use client");
    function OnboardingPage() {
      const router = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useRouter"
      ])();
      const { toast } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useToast"
      ])();
      const { user } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useAuth"
      ])();
      const isClient = user?.role === "client";
      const myClientId = user?.clientId ?? null;
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [clients, setClients] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [onboardings, setOnboardings] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [selectedClientId, setSelectedClientId] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [isModalOpen, setIsModalOpen] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const getInitialFormState = () => ({
        clientName: "",
        company: "",
        email: "",
        phone: "",
        address: "",
        projectType: "Website",
        productType: "Website",
        pages: "",
        budget: "",
        startDate: "",
        deadline: "",
        brief: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        deliverables: ["Discovery Call", "Wireframes", "Design", "Development"],
        notes: "",
        projectTitle: "",
        date: new Date().toISOString(),
      });
      const [form, setForm] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(getInitialFormState);
      const update = (k, v) =>
        setForm((s) => ({
          ...s,
          [k]: v,
        }));
      const fetchOnboardings = async () => {
        try {
          const url =
            isClient && myClientId
              ? `/api/onboarding?clientId=${myClientId}`
              : "/api/onboarding";
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            setOnboardings(data);
          }
        } catch (error) {
          console.error("Failed to fetch onboardings", error);
        }
      };
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        let mounted = true;
        (async () => {
          try {
            const res = await fetch("/api/clients");
            if (!res.ok) throw new Error("Failed to load clients");
            const items = await res.json();
            if (!mounted) return;
            setClients(items || []);
          } catch (e) {
            console.error("Could not fetch clients", e);
          }
        })();
        fetchOnboardings();
        return () => {
          mounted = false;
        };
      }, [isClient, myClientId]);

      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        if (!selectedClientId) return;
        const c = clients.find((x) => (x._id ?? x.id) === selectedClientId);
        if (!c) return;
        setForm((s) => ({
          ...s,
          clientName: c.name || s.clientName,
          company: c.companyName || c.name || s.company,
          email: c.email || s.email,
          phone: c.phone || s.phone,
          address: c.address || s.address,
          contactName: c.contactPerson || s.contactName,
          contactEmail: c.contactEmail || c.email || s.contactEmail,
          contactPhone: c.contactPhone || c.phone || s.contactPhone,
        }));
      }, [selectedClientId, clients]);
      const generatePdf = async (dataToPrint = form) => {
        setLoading(true);
        try {
          const doc =
            new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "default"
            ]({
              unit: "mm",
              format: "a4",
              orientation: "portrait",
            });
          try {
            const { loadNotoSansForJsPDF } = await __turbopack_context__.A(
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/pdf-fonts.ts [app-ssr] (ecmascript, async loader)",
            );
            const family = await loadNotoSansForJsPDF(doc, "NotoSans");
            if (family) {
              try {
                doc.setFont(family);
              } catch (e) {}
            }
          } catch (e) {}
          const pdfBody = (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$server$2e$node$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "renderToString"
          ])(
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$onboarding$2f$onboarding$2d$pdf$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "OnboardingPDF"
              ],
              {
                data: dataToPrint,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                lineNumber: 150,
                columnNumber: 38,
              },
              this,
            ),
          );
          const styledHtml = `<div style="width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;">${pdfBody}</div>`;

          if (doc.html) {
            await new Promise((res, rej) => {
              doc.html(styledHtml, {
                callback: function (doc2) {
                  try {
                    doc2.save(
                      `onboarding-${(dataToPrint.clientName || "client").replace(/\s+/g, "-")}.pdf`,
                    );
                    res();
                  } catch (e) {
                    rej(e);
                  }
                },
                x: 0,
                y: 0,
                width: 210,
              });
            });
          } else {
            doc.text(
              "Client Onboarding - " + (dataToPrint.clientName || ""),
              10,
              10,
            );
            doc.save(
              `onboarding-${(dataToPrint.clientName || "client").replace(/\s+/g, "-")}.pdf`,
            );
          }
        } catch (e) {
          console.error("Failed to generate PDF", e);
          toast({
            title: "PDF Failed",
            description: "Failed to generate onboarding PDF.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };
      const saveAndGenerate = async () => {
        setLoading(true);
        try {
          const payload = {
            ...form,
            clientId: selectedClientId || myClientId || undefined,
          };
          const res = await fetch("/api/onboarding", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          if (res.ok) {
            toast({
              title: "Success",
              description: "Onboarding record saved.",
            });

            await generatePdf(form);

            await fetchOnboardings();
            setIsModalOpen(false);
          } else {
            const err = await res.json();
            toast({
              title: "Save Failed",
              description: "Failed to save: " + (err.error || "Unknown"),
              variant: "destructive",
            });
          }
        } catch (e) {
          console.error("Failed to save onboarding", e);
          toast({
            title: "Save Failed",
            description: "Failed to save onboarding record. Please try again.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };
      const handleOpenModal = (clientId) => {
        setForm(getInitialFormState());
        setSelectedClientId(clientId || null);
        setIsModalOpen(true);
      };
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "p-6 space-y-6",
          children: [
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "flex justify-between items-center",
                children: [
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      children: [
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "h2",
                          {
                            className: "text-2xl font-bold tracking-tight",
                            children: isClient
                              ? "My Onboarding Documents"
                              : "Onboarding History",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                            lineNumber: 235,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "p",
                          {
                            className: "text-muted-foreground",
                            children: isClient
                              ? "View your onboarding documents."
                              : "View and manage generated onboarding documents.",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                            lineNumber: 238,
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
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                      lineNumber: 234,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  !isClient &&
                    (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "Button"
                      ],
                      {
                        onClick: () => handleOpenModal(),
                        children: [
                          (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__[
                              "Plus"
                            ],
                            {
                              className: "mr-2 h-4 w-4",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                              lineNumber: 244,
                              columnNumber: 11,
                            },
                            this,
                          ),
                          " New Onboarding",
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName:
                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                        lineNumber: 243,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                lineNumber: 233,
                columnNumber: 7,
              },
              this,
            ),
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "border rounded-md",
                children: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "Table"
                  ],
                  {
                    children: [
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "TableHeader"
                        ],
                        {
                          children: (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "TableRow"
                            ],
                            {
                              children: [
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    children: "Client Name",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                    lineNumber: 253,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    children: "Project Type",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    children: "Date",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                    lineNumber: 255,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    children: "Contact",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                    lineNumber: 256,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "TableHead"
                                  ],
                                  {
                                    className: "text-right",
                                    children: "Actions",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
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
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                              lineNumber: 252,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                          lineNumber: 251,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "TableBody"
                        ],
                        {
                          children:
                            onboardings.length === 0
                              ? (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "TableRow"
                                  ],
                                  {
                                    children: (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "TableCell"
                                      ],
                                      {
                                        colSpan: 5,
                                        className:
                                          "text-center h-24 text-muted-foreground",
                                        children:
                                          "No onboarding history found.",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                        lineNumber: 263,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15,
                                  },
                                  this,
                                )
                              : onboardings.map((onb) =>
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "TableRow"
                                    ],
                                    {
                                      children: [
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "TableCell"
                                          ],
                                          {
                                            className: "font-medium",
                                            children: (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "div",
                                              {
                                                className: "flex flex-col",
                                                children: [
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "span",
                                                    {
                                                      children: onb.clientName,
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                                      lineNumber: 275,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "span",
                                                    {
                                                      className:
                                                        "text-xs text-muted-foreground",
                                                      children: onb.company,
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                                      lineNumber: 276,
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
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                                lineNumber: 274,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                            lineNumber: 273,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "TableCell"
                                          ],
                                          {
                                            children: onb.projectType,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                            lineNumber: 281,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "TableCell"
                                          ],
                                          {
                                            children: onb.date
                                              ? (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
                                                  "format"
                                                ])(new Date(onb.date), "PP")
                                              : "-",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                            lineNumber: 282,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "TableCell"
                                          ],
                                          {
                                            children:
                                              onb.contactName || onb.email,
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                            lineNumber: 285,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "TableCell"
                                          ],
                                          {
                                            className: "text-right",
                                            children: (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "Button"
                                              ],
                                              {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: () => generatePdf(onb),
                                                children: [
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__[
                                                      "Download"
                                                    ],
                                                    {
                                                      className: "h-4 w-4 mr-2",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                                      lineNumber: 292,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                  "PDF",
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                                lineNumber: 287,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                            lineNumber: 286,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                      ],
                                    },
                                    onb._id ?? onb.id,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 272,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                          lineNumber: 260,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                    lineNumber: 250,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                lineNumber: 249,
                columnNumber: 7,
              },
              this,
            ),
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "Dialog"
              ],
              {
                open: isModalOpen,
                onOpenChange: setIsModalOpen,
                children: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "DialogContent"
                  ],
                  {
                    className: "max-w-4xl max-h-[90vh] overflow-y-auto",
                    children: [
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "DialogHeader"
                        ],
                        {
                          children: (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "DialogTitle"
                            ],
                            {
                              children: "Client Onboarding Form",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                              lineNumber: 306,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                          lineNumber: 305,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className:
                            "grid grid-cols-1 md:grid-cols-2 gap-4 py-4",
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className:
                                  "md:col-span-2 p-4 bg-muted/50 rounded-lg flex items-center gap-4",
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__[
                                      "User"
                                    ],
                                    {
                                      className:
                                        "h-5 w-5 text-muted-foreground",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 311,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className: "flex-1",
                                      children: [
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "label",
                                          {
                                            className:
                                              "block text-sm font-medium mb-1",
                                            children: "Select Existing Client",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                            lineNumber: 313,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "Select"
                                          ],
                                          {
                                            value:
                                              selectedClientId ?? "__none__",
                                            onValueChange: (v) =>
                                              setSelectedClientId(
                                                v === "__none__" ? null : v,
                                              ),
                                            children: [
                                              (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "SelectTrigger"
                                                ],
                                                {
                                                  className: "bg-background",
                                                  children: (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "SelectValue"
                                                    ],
                                                    {
                                                      children: selectedClientId
                                                        ? clients.find(
                                                            (c) =>
                                                              (c._id ??
                                                                c.id) ===
                                                              selectedClientId,
                                                          )?.name
                                                        : "Choose a client to autofill",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                                      lineNumber: 323,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                                  lineNumber: 322,
                                                  columnNumber: 19,
                                                },
                                                this,
                                              ),
                                              (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "SelectContent"
                                                ],
                                                {
                                                  children: [
                                                    (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "SelectItem"
                                                      ],
                                                      {
                                                        value: "__none__",
                                                        children: "-- None --",
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                                        lineNumber: 332,
                                                        columnNumber: 21,
                                                      },
                                                      this,
                                                    ),
                                                    clients.map((c) =>
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                          "SelectItem"
                                                        ],
                                                        {
                                                          value: String(
                                                            c._id ?? c.id,
                                                          ),
                                                          children: [
                                                            c.name,
                                                            " ",
                                                            c.companyName
                                                              ? `(${c.companyName})`
                                                              : "",
                                                          ],
                                                        },
                                                        c._id ?? c.id,
                                                        true,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                                          lineNumber: 334,
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
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                                  lineNumber: 331,
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
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                            lineNumber: 316,
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
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 312,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 310,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "md:col-span-2 border-t pt-4 mt-2",
                                children: (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "h3",
                                  {
                                    className: "font-semibold mb-4",
                                    children: "Project Details",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                    lineNumber: 347,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 346,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Project Title",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 351,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      value: form.projectTitle,
                                      onChange: (e) =>
                                        update("projectTitle", e.target.value),
                                      placeholder: "e.g. Pixelate CRM Redesign",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 354,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 350,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Onboarding Date",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 361,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      type: "date",
                                      value: form.date
                                        ? String(form.date).slice(0, 10)
                                        : "",
                                      onChange: (e) =>
                                        update("date", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 364,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 360,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Client Name",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 372,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      value: form.clientName,
                                      onChange: (e) =>
                                        update("clientName", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 375,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 371,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Company",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 381,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      value: form.company,
                                      onChange: (e) =>
                                        update("company", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 382,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 380,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Email",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 388,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      type: "email",
                                      value: form.email,
                                      onChange: (e) =>
                                        update("email", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 389,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 387,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Phone",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 396,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      value: form.phone,
                                      onChange: (e) =>
                                        update("phone", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 397,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 395,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "md:col-span-2",
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Address",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 403,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Textarea"
                                    ],
                                    {
                                      value: form.address,
                                      onChange: (e) =>
                                        update("address", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 404,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 402,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Project Type",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 411,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      value: form.projectType,
                                      onChange: (e) =>
                                        update("projectType", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 414,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 410,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Product Type (Website/App)",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 420,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      value: form.productType,
                                      onChange: (e) =>
                                        update("productType", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 423,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 419,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Pages / Modules",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 430,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      value: form.pages,
                                      onChange: (e) =>
                                        update("pages", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 433,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 429,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Estimated Budget",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 439,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      value: form.budget,
                                      onChange: (e) =>
                                        update("budget", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 442,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 438,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Start Date",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 449,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      type: "date",
                                      value: form.startDate,
                                      onChange: (e) =>
                                        update("startDate", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 452,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 448,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Target Delivery",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 459,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      type: "date",
                                      value: form.deadline,
                                      onChange: (e) =>
                                        update("deadline", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 462,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 458,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "md:col-span-2",
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Project Brief",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 470,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Textarea"
                                    ],
                                    {
                                      rows: 6,
                                      value: form.brief,
                                      onChange: (e) =>
                                        update("brief", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 473,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 469,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "md:col-span-2",
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Deliverables (one per line)",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 481,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Textarea"
                                    ],
                                    {
                                      rows: 4,
                                      value: (form.deliverables || []).join(
                                        "\n",
                                      ),
                                      onChange: (e) =>
                                        update(
                                          "deliverables",
                                          e.target.value
                                            .split("\n")
                                            .map((item) => item.trim())
                                            .filter(Boolean),
                                        ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 484,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 480,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "md:col-span-2",
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Notes",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 500,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Textarea"
                                    ],
                                    {
                                      rows: 4,
                                      value: form.notes,
                                      onChange: (e) =>
                                        update("notes", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 501,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 499,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className: "md:col-span-2 border-t pt-4 mt-2",
                                children: (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "h3",
                                  {
                                    className: "font-semibold mb-4",
                                    children: "Contact Person",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                    lineNumber: 509,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 508,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Primary Contact Name",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 513,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      value: form.contactName,
                                      onChange: (e) =>
                                        update("contactName", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 516,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 512,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Primary Contact Email",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 522,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      value: form.contactEmail,
                                      onChange: (e) =>
                                        update("contactEmail", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 525,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 521,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "label",
                                    {
                                      className:
                                        "block text-sm font-medium mb-1",
                                      children: "Primary Contact Phone",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 531,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Input"
                                    ],
                                    {
                                      value: form.contactPhone,
                                      onChange: (e) =>
                                        update("contactPhone", e.target.value),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 534,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 530,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className:
                                  "md:col-span-2 flex items-center justify-end gap-3 mt-6 border-t pt-4",
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Button"
                                    ],
                                    {
                                      variant: "outline",
                                      onClick: () => setIsModalOpen(false),
                                      children: "Cancel",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 541,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "Button"
                                    ],
                                    {
                                      onClick: saveAndGenerate,
                                      disabled: loading,
                                      children: loading
                                        ? "Generating..."
                                        : "Save & Generate PDF",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                      lineNumber: 544,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                                lineNumber: 540,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                          lineNumber: 309,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                    lineNumber: 304,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
                lineNumber: 303,
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
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/onboarding/page.tsx",
          lineNumber: 232,
          columnNumber: 5,
        },
        this,
      );
    }
  },
];
