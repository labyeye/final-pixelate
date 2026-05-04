module.exports = [
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/quotation-models.ts [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "calculateQuotationTotals",
      () => calculateQuotationTotals,
      "generateQuotationId",
      () => generateQuotationId,
    ]);
    function calculateQuotationTotals(quotation) {
      const lineItemsTotal = quotation.lineItems.reduce(
        (sum, item) => sum + item.total,
        0,
      );
      const servicesTotal = quotation.services.reduce(
        (sum, item) => sum + item.total,
        0,
      );
      const subtotal = lineItemsTotal + servicesTotal;
      const taxAmount = quotation.lineItems.reduce(
        (sum, item) => sum + (item.unitPrice * item.qty * item.tax) / 100,
        0,
      );
      const grandTotal = subtotal;
      return {
        subtotal,
        taxAmount,
        grandTotal,
      };
    }
    function generateQuotationId(lastId) {
      const year = new Date().getFullYear();
      const prefix = `PXL-${year}-`;
      if (!lastId) return `${prefix}001`;
      const match = lastId.match(/PXL-\d{4}-(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10) + 1;
        return `${prefix}${String(num).padStart(3, "0")}`;
      }
      return `${prefix}001`;
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/sign.png (static in ecmascript, tag client)",
  (__turbopack_context__) => {
    __turbopack_context__.v("/_next/static/media/sign.ae1cdb78.png");
  },
  '[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/sign.png.mjs { IMAGE => "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/sign.png (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)',
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => __TURBOPACK__default__export__]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$sign$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/sign.png (static in ecmascript, tag client)",
      );
    const __TURBOPACK__default__export__ = {
      src: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$sign$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__[
        "default"
      ],
      width: 1531,
      height: 600,
      blurWidth: 8,
      blurHeight: 3,
      blurDataURL:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAYAAACuyE5IAAAAOUlEQVR42i3LMQrAIABD0bSlKIgiiDg4ef9L+pUMjwxJJOnBj4jsLGhIclkx0G1henhfycPPAt5TbjigARy15KFuAAAAAElFTkSuQmCC",
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => QuotationViewPage]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/navigation.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript) <export default as Printer>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-ssr] (ecmascript) <export default as Edit>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$quotation$2d$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/quotation-models.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$sign$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$sign$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/sign.png.mjs { IMAGE => "[project]/Desktop/Projects/final-pixelate/dashboard/src/assets/sign.png (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)',
      );
    ("use client");
    function QuotationViewPage() {
      const params = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useParams"
      ])();
      const router = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useRouter"
      ])();
      const id = params.id;
      const [quotation, setQuotation] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [settings, setSettings] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [client, setClient] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(true);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        if (!id) return;
        (async () => {
          try {
            const qRes = await fetch(`/api/quotations/${id}`);
            if (!qRes.ok) throw new Error("Failed to fetch quotation");
            const qData = await qRes.json();
            setQuotation(qData);

            if (qData.clientId) {
              const cRes = await fetch(`/api/clients/${qData.clientId}`);
              if (cRes.ok) setClient(await cRes.json());
            }

            const sRes = await fetch("/api/settings");
            if (sRes.ok) setSettings(await sRes.json());
          } catch (error) {
            console.error("Error loading quotation:", error);
          } finally {
            setLoading(false);
          }
        })();
      }, [id]);
      const handlePrint = () => {
        window.print();
      };
      if (loading) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            className: "flex items-center justify-center min-h-screen",
            children: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "text-lg",
                children: "Loading quotation...",
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                lineNumber: 55,
                columnNumber: 9,
              },
              this,
            ),
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
            lineNumber: 54,
            columnNumber: 7,
          },
          this,
        );
      }
      if (!quotation) {
        return (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            className: "flex items-center justify-center min-h-screen",
            children: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "text-lg text-red-600",
                children: "Quotation not found",
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                lineNumber: 63,
                columnNumber: 9,
              },
              this,
            ),
          },
          void 0,
          false,
          {
            fileName:
              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
            lineNumber: 62,
            columnNumber: 7,
          },
          this,
        );
      }
      const { subtotal, taxAmount, grandTotal } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$quotation$2d$models$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "calculateQuotationTotals"
      ])(quotation);
      const formattedDate = new Date(quotation.date).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        },
      );
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "Fragment"
        ],
        {
          children: [
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className:
                  "jsx-1e216edfbeb3664a" +
                  " " +
                  "print:hidden fixed top-4 right-4 z-50 flex gap-2",
                children: [
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "Button"
                    ],
                    {
                      onClick: () => {
                        const editId = quotation._id || quotation.id || id;
                        router.push(`/quotations/create?edit=${editId}`);
                      },
                      size: "lg",
                      variant: "outline",
                      className: "shadow-lg",
                      children: [
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__[
                            "Edit"
                          ],
                          {
                            className: "mr-2 h-4 w-4",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                            lineNumber: 89,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        "Edit",
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                      lineNumber: 79,
                      columnNumber: 9,
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
                      onClick: handlePrint,
                      size: "lg",
                      className: "shadow-lg",
                      children: [
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__[
                            "Printer"
                          ],
                          {
                            className: "mr-2 h-4 w-4",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                            lineNumber: 93,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        "Print",
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                      lineNumber: 92,
                      columnNumber: 9,
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
                      onClick: handlePrint,
                      size: "lg",
                      className: "shadow-lg bg-[#044bab] hover:bg-[#d85e1a]",
                      children: [
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__[
                            "Download"
                          ],
                          {
                            className: "mr-2 h-4 w-4",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                            lineNumber: 101,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        "Download PDF",
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                      lineNumber: 96,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                lineNumber: 78,
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
                className:
                  "jsx-1e216edfbeb3664a" +
                  " " +
                  "print-area min-h-screen bg-white",
                children: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className:
                      "jsx-1e216edfbeb3664a" + " " + "max-w-[210mm] mx-auto",
                    children: [
                      (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "section",
                        {
                          className:
                            "jsx-1e216edfbeb3664a" +
                            " " +
                            "h-screen flex flex-col items-center justify-center p-12 relative bg-[#ffffff]",
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className:
                                  "jsx-1e216edfbeb3664a" +
                                  " " +
                                  "absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#044bab] to-[#044bab]",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 148,
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
                                  "jsx-1e216edfbeb3664a" +
                                  " " +
                                  "absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#044bab] to-[#044bab]",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 149,
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
                                  "jsx-1e216edfbeb3664a" +
                                  " " +
                                  "text-center space-y-8 max-w-2xl",
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "div",
                                    {
                                      className:
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "inline-block bg-[#044bab] text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide",
                                      children: quotation.quoteId,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 152,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "h1",
                                    {
                                      className:
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "text-5xl md:text-6xl font-black text-gray-900 leading-tight",
                                      children: quotation.title,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 156,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  quotation.subtitle &&
                                    (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className:
                                          "jsx-1e216edfbeb3664a" +
                                          " " +
                                          "text-2xl text-gray-700 font-light",
                                        children: quotation.subtitle,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 17,
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
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "flex items-center justify-center gap-4 py-4",
                                      children: [
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "div",
                                          {
                                            className:
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "w-20 h-1 bg-[#044bab]",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 167,
                                            columnNumber: 17,
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
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "w-3 h-3 bg-[#044bab] rounded-full",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 168,
                                            columnNumber: 17,
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
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "w-20 h-1 bg-[#044bab]",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 169,
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
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 166,
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
                                      className:
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "space-y-2",
                                      children: [
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "p",
                                          {
                                            className:
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "text-sm text-gray-500 uppercase tracking-wider",
                                            children: "Prepared For",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 173,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "p",
                                          {
                                            className:
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "text-3xl font-bold text-gray-900",
                                            children:
                                              client?.businessName ||
                                              client?.name ||
                                              "Valued Client",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 176,
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
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 172,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "p",
                                    {
                                      className:
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "text-lg text-gray-600",
                                      children: formattedDate,
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 181,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                          lineNumber: 147,
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
                            "jsx-1e216edfbeb3664a" +
                            " " +
                            "print-page px-12 pt-24 pb-20",
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className:
                                  "jsx-1e216edfbeb3664a" + " " + "mb-6",
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "h2",
                                    {
                                      className:
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "text-2xl font-bold text-gray-900 mb-4 flex items-center",
                                      children: [
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "span",
                                          {
                                            className:
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "w-1 h-8 bg-[#044bab] mr-3",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 189,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        "About Pixelate Nest",
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 188,
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
                                      className:
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "space-y-4 text-gray-700 leading-relaxed text-base",
                                      children: [
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "p",
                                          {
                                            className: "jsx-1e216edfbeb3664a",
                                            children:
                                              settings?.aboutUs ||
                                              "Pixelate Nest is a leading creative digital agency specializing in innovative software solutions, cutting-edge web and app development, stunning photography, and professional video editing services. We help businesses transform their digital presence and achieve measurable growth through technology-driven solutions.",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 193,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "p",
                                          {
                                            className:
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "text-sm",
                                            children:
                                              "With a team of experienced developers, designers, and creative professionals, we deliver end-to-end solutions tailored to each client's unique needs. Our expertise spans custom software development, e-commerce platforms, mobile applications, brand photography, corporate video production, and digital marketing content creation.",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 197,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "p",
                                          {
                                            className:
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "text-sm",
                                            children:
                                              "We pride ourselves on our commitment to quality, timely delivery, and exceptional client service. Every project is executed with precision, creativity, and a focus on delivering tangible business results.",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 205,
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
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 192,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 187,
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
                                  "jsx-1e216edfbeb3664a" + " " + "mb-6",
                                children: (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "jsx-1e216edfbeb3664a" +
                                      " " +
                                      "grid grid-cols-1 md:grid-cols-3 gap-6",
                                    children: [
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className:
                                            "jsx-1e216edfbeb3664a" +
                                            " " +
                                            "bg-[#FFFFFF] p-6 rounded-lg border-l-4 border-[#044BAB]",
                                          children: [
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "h3",
                                              {
                                                className:
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "text-xl font-bold text-gray-900 mb-3 flex items-center",
                                                children: [
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "span",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "text-2xl mr-2",
                                                      children: "🎯",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 218,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                  "Mission",
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 217,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "p",
                                              {
                                                className:
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "text-gray-700 text-sm leading-relaxed",
                                                children:
                                                  settings?.mission ||
                                                  "To deliver exceptional digital solutions that exceed client expectations.",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 221,
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
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                          lineNumber: 216,
                                          columnNumber: 17,
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
                                            "jsx-1e216edfbeb3664a" +
                                            " " +
                                            "bg-[#FFFFFF] p-6 rounded-lg border-l-4 border-[#044BAB]",
                                          children: [
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "h3",
                                              {
                                                className:
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "text-xl font-bold text-gray-900 mb-3 flex items-center",
                                                children: [
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "span",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "text-2xl mr-2",
                                                      children: "👁️",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 229,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                  "Vision",
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 228,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "p",
                                              {
                                                className:
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "text-gray-700 text-sm leading-relaxed",
                                                children:
                                                  settings?.vision ||
                                                  "To be the leading creative digital agency transforming businesses globally.",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 232,
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
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                          lineNumber: 227,
                                          columnNumber: 17,
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
                                            "jsx-1e216edfbeb3664a" +
                                            " " +
                                            "bg-[#FFFFFF] p-6 rounded-lg border-l-4 border-[#044BAB]",
                                          children: [
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "h3",
                                              {
                                                className:
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "text-xl font-bold text-gray-900 mb-3 flex items-center",
                                                children: [
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "span",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "text-2xl mr-2",
                                                      children: "🚀",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 240,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                  "Goal",
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 239,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "p",
                                              {
                                                className:
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "text-gray-700 text-sm leading-relaxed",
                                                children:
                                                  settings?.goal ||
                                                  "To empower 1000+ businesses with cutting-edge digital solutions.",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 243,
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
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                          lineNumber: 238,
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                    lineNumber: 215,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 214,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                          lineNumber: 185,
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
                            "jsx-1e216edfbeb3664a" +
                            " " +
                            "print-page px-12 pt-24 pb-20",
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "section",
                              {
                                className:
                                  "jsx-1e216edfbeb3664a" + " " + "mb-8",
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "h3",
                                    {
                                      className:
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "text-xl font-bold text-gray-900 mb-6 flex items-center",
                                      children: [
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "span",
                                          {
                                            className:
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "w-1 h-8 bg-[#044bab] mr-3",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 256,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        "Client Information",
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 255,
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
                                      className:
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "bg-gray-50 p-6 rounded-lg border-l-4 border-[#044bab]",
                                      children: (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className:
                                            "jsx-1e216edfbeb3664a" +
                                            " " +
                                            "grid grid-cols-3 gap-6",
                                          children: [
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "div",
                                              {
                                                className:
                                                  "jsx-1e216edfbeb3664a",
                                                children: [
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "p",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "text-xs text-gray-500 uppercase tracking-wide mb-1",
                                                      children: "Client Name",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 262,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "p",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "text-lg font-bold text-gray-900",
                                                      children:
                                                        client?.name || "N/A",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 265,
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
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 261,
                                                columnNumber: 19,
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
                                                  "jsx-1e216edfbeb3664a",
                                                children: [
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "p",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "text-xs text-gray-500 uppercase tracking-wide mb-1",
                                                      children: "Email",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 270,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "p",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "font-semibold text-gray-900",
                                                      children:
                                                        client?.email || "N/A",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 273,
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
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 269,
                                                columnNumber: 19,
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
                                                  "jsx-1e216edfbeb3664a",
                                                children: [
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "p",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "text-xs text-gray-500 uppercase tracking-wide mb-1 ml-20",
                                                      children: "Phone",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 278,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "p",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "font-semibold text-gray-900 ml-20",
                                                      children:
                                                        client?.phone || "N/A",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 281,
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
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 277,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                            client?.address &&
                                              (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "div",
                                                {
                                                  className:
                                                    "jsx-1e216edfbeb3664a" +
                                                    " " +
                                                    "col-span-3",
                                                  children: [
                                                    (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      "p",
                                                      {
                                                        className:
                                                          "jsx-1e216edfbeb3664a" +
                                                          " " +
                                                          "text-xs text-gray-500 uppercase tracking-wide mb-1",
                                                        children: "Address",
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 23,
                                                      },
                                                      this,
                                                    ),
                                                    (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      "p",
                                                      {
                                                        className:
                                                          "jsx-1e216edfbeb3664a" +
                                                          " " +
                                                          "font-semibold text-gray-900",
                                                        children:
                                                          client.address,
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                        lineNumber: 290,
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
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                  lineNumber: 286,
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
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                          lineNumber: 260,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 259,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 254,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            quotation.objective &&
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "section",
                                {
                                  className:
                                    "jsx-1e216edfbeb3664a" + " " + "mb-8",
                                  children: [
                                    (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "h3",
                                      {
                                        className:
                                          "jsx-1e216edfbeb3664a" +
                                          " " +
                                          "text-xl font-bold text-gray-900 mb-4 flex items-center",
                                        children: [
                                          (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "span",
                                            {
                                              className:
                                                "jsx-1e216edfbeb3664a" +
                                                " " +
                                                "w-1 h-6 bg-[#044bab] mr-3",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                              lineNumber: 302,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          "Project Objective",
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 301,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className:
                                          "jsx-1e216edfbeb3664a" +
                                          " " +
                                          "text-gray-700 leading-relaxed whitespace-pre-wrap",
                                        children: quotation.objective,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 305,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                  lineNumber: 300,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            quotation.purpose &&
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "section",
                                {
                                  className:
                                    "jsx-1e216edfbeb3664a" + " " + "mb-8",
                                  children: [
                                    (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "h3",
                                      {
                                        className:
                                          "jsx-1e216edfbeb3664a" +
                                          " " +
                                          "text-xl font-bold text-gray-900 mb-4 flex items-center",
                                        children: [
                                          (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "span",
                                            {
                                              className:
                                                "jsx-1e216edfbeb3664a" +
                                                " " +
                                                "w-1 h-6 bg-[#044bab] mr-3",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                              lineNumber: 314,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          "Purpose",
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 313,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "p",
                                      {
                                        className:
                                          "jsx-1e216edfbeb3664a" +
                                          " " +
                                          "text-gray-700 leading-relaxed whitespace-pre-wrap",
                                        children: quotation.purpose,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 317,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                          lineNumber: 253,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      quotation.scope &&
                        quotation.scope.length > 0 &&
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className:
                              "jsx-1e216edfbeb3664a" +
                              " " +
                              "print-page px-12 pt-24 pb-20",
                            children: (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "section",
                              {
                                className:
                                  "jsx-1e216edfbeb3664a" + " " + "mb-8",
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "h3",
                                    {
                                      className:
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "text-xl font-bold text-gray-900 mb-4 flex items-center",
                                      children: [
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "span",
                                          {
                                            className:
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "w-1 h-6 bg-[#044bab] mr-3",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 329,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        "Scope of Work",
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 328,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "ul",
                                    {
                                      className:
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "space-y-2",
                                      children: quotation.scope.map(
                                        (item, idx) =>
                                          (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "li",
                                            {
                                              className:
                                                "jsx-1e216edfbeb3664a" +
                                                " " +
                                                "flex items-start",
                                              children: [
                                                (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "span",
                                                  {
                                                    className:
                                                      "jsx-1e216edfbeb3664a" +
                                                      " " +
                                                      "text-[#044bab] mr-2 font-bold",
                                                    children: "•",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                    lineNumber: 335,
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
                                                      "jsx-1e216edfbeb3664a" +
                                                      " " +
                                                      "text-gray-700",
                                                    children: item,
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                    lineNumber: 336,
                                                    columnNumber: 23,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            idx,
                                            true,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                              lineNumber: 334,
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
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 332,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 327,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                            lineNumber: 326,
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
                            "jsx-1e216edfbeb3664a" +
                            " " +
                            "print-page px-12 pt-24 pb-20",
                          children: [
                            quotation.deliverables &&
                              quotation.deliverables.length > 0 &&
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "section",
                                {
                                  className:
                                    "jsx-1e216edfbeb3664a" + " " + "mb-8",
                                  children: [
                                    (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "h3",
                                      {
                                        className:
                                          "jsx-1e216edfbeb3664a" +
                                          " " +
                                          "text-xl font-bold text-gray-900 mb-4 flex items-center",
                                        children: [
                                          (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "span",
                                            {
                                              className:
                                                "jsx-1e216edfbeb3664a" +
                                                " " +
                                                "w-1 h-6 bg-[#044bab] mr-3",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                              lineNumber: 349,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          "Deliverables",
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 348,
                                        columnNumber: 17,
                                      },
                                      this,
                                    ),
                                    (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "ul",
                                      {
                                        className:
                                          "jsx-1e216edfbeb3664a" +
                                          " " +
                                          "space-y-2",
                                        children: quotation.deliverables.map(
                                          (item, idx) =>
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "li",
                                              {
                                                className:
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "flex items-start",
                                                children: [
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "span",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "text-[#044bab] mr-2",
                                                      children: "✓",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 355,
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
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "text-gray-700",
                                                      children: item,
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 356,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                ],
                                              },
                                              idx,
                                              true,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 354,
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
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 352,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                  lineNumber: 347,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                            quotation.services &&
                              quotation.services.length > 0 &&
                              (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "section",
                                {
                                  className:
                                    "jsx-1e216edfbeb3664a" + " " + "mb-8",
                                  children: [
                                    (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "h3",
                                      {
                                        className:
                                          "jsx-1e216edfbeb3664a" +
                                          " " +
                                          "text-xl font-bold text-gray-900 mb-4 flex items-center",
                                        children: [
                                          (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "span",
                                            {
                                              className:
                                                "jsx-1e216edfbeb3664a" +
                                                " " +
                                                "w-1 h-6 bg-[#044bab] mr-3",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                              lineNumber: 366,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                          "Services Breakdown",
                                        ],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 365,
                                        columnNumber: 17,
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
                                          "jsx-1e216edfbeb3664a" +
                                          " " +
                                          "overflow-hidden border border-gray-200 rounded-lg",
                                        children: (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "table",
                                          {
                                            className:
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "w-full",
                                            children: [
                                              (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "thead",
                                                {
                                                  className:
                                                    "jsx-1e216edfbeb3664a" +
                                                    " " +
                                                    "bg-gray-100",
                                                  children: (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "tr",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a",
                                                      children: [
                                                        (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "th",
                                                          {
                                                            className:
                                                              "jsx-1e216edfbeb3664a" +
                                                              " " +
                                                              "px-4 py-3 text-left text-sm font-semibold text-gray-900",
                                                            children: "Service",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                            lineNumber: 373,
                                                            columnNumber: 25,
                                                          },
                                                          this,
                                                        ),
                                                        (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "th",
                                                          {
                                                            className:
                                                              "jsx-1e216edfbeb3664a" +
                                                              " " +
                                                              "px-4 py-3 text-center text-sm font-semibold text-gray-900",
                                                            children: "Qty",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                            lineNumber: 376,
                                                            columnNumber: 25,
                                                          },
                                                          this,
                                                        ),
                                                        (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "th",
                                                          {
                                                            className:
                                                              "jsx-1e216edfbeb3664a" +
                                                              " " +
                                                              "px-4 py-3 text-right text-sm font-semibold text-gray-900",
                                                            children: "Price",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                            lineNumber: 379,
                                                            columnNumber: 25,
                                                          },
                                                          this,
                                                        ),
                                                        (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "th",
                                                          {
                                                            className:
                                                              "jsx-1e216edfbeb3664a" +
                                                              " " +
                                                              "px-4 py-3 text-right text-sm font-semibold text-gray-900",
                                                            children: "Total",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                            lineNumber: 382,
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
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 372,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                  lineNumber: 371,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "tbody",
                                                {
                                                  className:
                                                    "jsx-1e216edfbeb3664a" +
                                                    " " +
                                                    "divide-y divide-gray-200",
                                                  children:
                                                    quotation.services.map(
                                                      (item, idx) => {
                                                        const itemTotal =
                                                          item.price * item.qty;
                                                        return (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "tr",
                                                          {
                                                            className:
                                                              "jsx-1e216edfbeb3664a",
                                                            children: [
                                                              (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "td",
                                                                {
                                                                  className:
                                                                    "jsx-1e216edfbeb3664a" +
                                                                    " " +
                                                                    "px-4 py-3 text-sm text-gray-900",
                                                                  children:
                                                                    item.serviceName,
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                  lineNumber: 392,
                                                                  columnNumber: 29,
                                                                },
                                                                this,
                                                              ),
                                                              (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "td",
                                                                {
                                                                  className:
                                                                    "jsx-1e216edfbeb3664a" +
                                                                    " " +
                                                                    "px-4 py-3 text-sm text-gray-700 text-center",
                                                                  children:
                                                                    item.qty,
                                                                },
                                                                void 0,
                                                                false,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                  lineNumber: 395,
                                                                  columnNumber: 29,
                                                                },
                                                                this,
                                                              ),
                                                              (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "td",
                                                                {
                                                                  className:
                                                                    "jsx-1e216edfbeb3664a" +
                                                                    " " +
                                                                    "px-4 py-3 text-sm text-gray-900 text-right",
                                                                  children: [
                                                                    "₹",
                                                                    item.price.toLocaleString(),
                                                                  ],
                                                                },
                                                                void 0,
                                                                true,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                  lineNumber: 398,
                                                                  columnNumber: 29,
                                                                },
                                                                this,
                                                              ),
                                                              (0,
                                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                                "jsxDEV"
                                                              ])(
                                                                "td",
                                                                {
                                                                  className:
                                                                    "jsx-1e216edfbeb3664a" +
                                                                    " " +
                                                                    "px-4 py-3 text-sm font-semibold text-gray-900 text-right",
                                                                  children: [
                                                                    "₹",
                                                                    itemTotal.toLocaleString(),
                                                                  ],
                                                                },
                                                                void 0,
                                                                true,
                                                                {
                                                                  fileName:
                                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                  lineNumber: 401,
                                                                  columnNumber: 29,
                                                                },
                                                                this,
                                                              ),
                                                            ],
                                                          },
                                                          idx,
                                                          true,
                                                          {
                                                            fileName:
                                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                            lineNumber: 391,
                                                            columnNumber: 27,
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
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                  lineNumber: 387,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "tfoot",
                                                {
                                                  className:
                                                    "jsx-1e216edfbeb3664a" +
                                                    " " +
                                                    "bg-gray-50 border-t-2 border-gray-300",
                                                  children: (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "tr",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a",
                                                      children: [
                                                        (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "td",
                                                          {
                                                            colSpan: 3,
                                                            className:
                                                              "jsx-1e216edfbeb3664a" +
                                                              " " +
                                                              "px-4 py-3 text-right text-sm font-semibold text-gray-900",
                                                            children:
                                                              "Grand Total",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                            lineNumber: 410,
                                                            columnNumber: 25,
                                                          },
                                                          this,
                                                        ),
                                                        (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          "td",
                                                          {
                                                            className:
                                                              "jsx-1e216edfbeb3664a" +
                                                              " " +
                                                              "px-4 py-3 text-right text-lg font-bold text-[#044bab]",
                                                            children: [
                                                              "₹",
                                                              quotation.services
                                                                .reduce(
                                                                  (sum, item) =>
                                                                    sum +
                                                                    item.price *
                                                                      item.qty,
                                                                  0,
                                                                )
                                                                .toLocaleString(),
                                                            ],
                                                          },
                                                          void 0,
                                                          true,
                                                          {
                                                            fileName:
                                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                            lineNumber: 416,
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
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 409,
                                                      columnNumber: 23,
                                                    },
                                                    this,
                                                  ),
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                  lineNumber: 408,
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
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 370,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                        lineNumber: 369,
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
                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                          lineNumber: 345,
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
                            "jsx-1e216edfbeb3664a" +
                            " " +
                            "print-page px-12 pt-24 pb-20",
                          children:
                            quotation.timeline &&
                            quotation.timeline.length > 0 &&
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "section",
                              {
                                className:
                                  "jsx-1e216edfbeb3664a" + " " + "mb-8",
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "h3",
                                    {
                                      className:
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "text-xl font-bold text-gray-900 mb-4 flex items-center",
                                      children: [
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "span",
                                          {
                                            className:
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "w-1 h-6 bg-[#044bab] mr-3",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 438,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        "Project Timeline",
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 437,
                                      columnNumber: 17,
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
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "overflow-hidden border border-gray-200 rounded-lg",
                                      children: (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "table",
                                        {
                                          className:
                                            "jsx-1e216edfbeb3664a" +
                                            " " +
                                            "w-full",
                                          children: [
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "thead",
                                              {
                                                className:
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "bg-gray-100",
                                                children: (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "tr",
                                                  {
                                                    className:
                                                      "jsx-1e216edfbeb3664a",
                                                    children: [
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "th",
                                                        {
                                                          className:
                                                            "jsx-1e216edfbeb3664a" +
                                                            " " +
                                                            "px-4 py-3 text-left text-sm font-semibold text-gray-900",
                                                          children: "Phase",
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                          lineNumber: 445,
                                                          columnNumber: 25,
                                                        },
                                                        this,
                                                      ),
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "th",
                                                        {
                                                          className:
                                                            "jsx-1e216edfbeb3664a" +
                                                            " " +
                                                            "px-4 py-3 text-left text-sm font-semibold text-gray-900",
                                                          children:
                                                            "Description",
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                          lineNumber: 448,
                                                          columnNumber: 25,
                                                        },
                                                        this,
                                                      ),
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "th",
                                                        {
                                                          className:
                                                            "jsx-1e216edfbeb3664a" +
                                                            " " +
                                                            "px-4 py-3 text-right text-sm font-semibold text-gray-900",
                                                          children: "Duration",
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                          lineNumber: 451,
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
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 23,
                                                  },
                                                  this,
                                                ),
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 443,
                                                columnNumber: 21,
                                              },
                                              this,
                                            ),
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "tbody",
                                              {
                                                className:
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "divide-y divide-gray-200",
                                                children:
                                                  quotation.timeline.map(
                                                    (item, idx) =>
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "tr",
                                                        {
                                                          className:
                                                            "jsx-1e216edfbeb3664a",
                                                          children: [
                                                            (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "td",
                                                              {
                                                                className:
                                                                  "jsx-1e216edfbeb3664a" +
                                                                  " " +
                                                                  "px-4 py-3 text-sm text-gray-900",
                                                                children:
                                                                  item.phase,
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 459,
                                                                columnNumber: 27,
                                                              },
                                                              this,
                                                            ),
                                                            (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "td",
                                                              {
                                                                className:
                                                                  "jsx-1e216edfbeb3664a" +
                                                                  " " +
                                                                  "px-4 py-3 text-sm text-gray-700",
                                                                children:
                                                                  item.description,
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 462,
                                                                columnNumber: 27,
                                                              },
                                                              this,
                                                            ),
                                                            (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "td",
                                                              {
                                                                className:
                                                                  "jsx-1e216edfbeb3664a" +
                                                                  " " +
                                                                  "px-4 py-3 text-sm text-gray-900 text-right",
                                                                children:
                                                                  item.duration,
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                                lineNumber: 465,
                                                                columnNumber: 27,
                                                              },
                                                              this,
                                                            ),
                                                          ],
                                                        },
                                                        idx,
                                                        true,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                          lineNumber: 458,
                                                          columnNumber: 25,
                                                        },
                                                        this,
                                                      ),
                                                  ),
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 456,
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
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                          lineNumber: 442,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 441,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 436,
                                columnNumber: 15,
                              },
                              this,
                            ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                          lineNumber: 434,
                          columnNumber: 11,
                        },
                        this,
                      ),
                      quotation.modules &&
                        quotation.modules.length > 0 &&
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className:
                              "jsx-1e216edfbeb3664a" +
                              " " +
                              "print-page px-12 pt-16 pb-20",
                            children: (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "section",
                              {
                                className:
                                  "jsx-1e216edfbeb3664a" + " " + "mb-8",
                                children: [
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "h3",
                                    {
                                      className:
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "text-xl font-bold text-gray-900 mb-4 flex items-center",
                                      children: [
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "span",
                                          {
                                            className:
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "w-1 h-6 bg-[#044bab] mr-3",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 482,
                                            columnNumber: 19,
                                          },
                                          this,
                                        ),
                                        "Modules & Features",
                                      ],
                                    },
                                    void 0,
                                    true,
                                    {
                                      fileName:
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 481,
                                      columnNumber: 17,
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
                                        "jsx-1e216edfbeb3664a" +
                                        " " +
                                        "space-y-3",
                                      children: quotation.modules.map(
                                        (mod, idx) =>
                                          (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "jsx-1e216edfbeb3664a" +
                                                " " +
                                                "border border-gray-200 rounded-lg p-4",
                                              children: [
                                                (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "div",
                                                  {
                                                    className:
                                                      "jsx-1e216edfbeb3664a" +
                                                      " " +
                                                      "flex items-start justify-between mb-2",
                                                    children: [
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "h4",
                                                        {
                                                          className:
                                                            "jsx-1e216edfbeb3664a" +
                                                            " " +
                                                            "font-semibold text-gray-900",
                                                          children:
                                                            mod.moduleName,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                          lineNumber: 492,
                                                          columnNumber: 25,
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
                                                            "jsx-1e216edfbeb3664a" +
                                                            " " +
                                                            `text-xs px-2 py-1 rounded-full ${mod.status === "Completed" ? "bg-green-100 text-green-800" : mod.status === "Ongoing" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`,
                                                          children: mod.status,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                          lineNumber: 495,
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
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                    lineNumber: 491,
                                                    columnNumber: 23,
                                                  },
                                                  this,
                                                ),
                                                (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "p",
                                                  {
                                                    className:
                                                      "jsx-1e216edfbeb3664a" +
                                                      " " +
                                                      "text-sm text-gray-700",
                                                    children: mod.description,
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                    lineNumber: 507,
                                                    columnNumber: 23,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            idx,
                                            true,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                              lineNumber: 487,
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
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 485,
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
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 480,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                            lineNumber: 479,
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
                            minHeight: "100vh",
                          },
                          className:
                            "jsx-1e216edfbeb3664a" +
                            " " +
                            "print-page px-12 pt-16 flex flex-col",
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "div",
                              {
                                className:
                                  "jsx-1e216edfbeb3664a" + " " + "flex-1",
                                children:
                                  (quotation.notes || quotation.paymentTerms) &&
                                  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "section",
                                    {
                                      className:
                                        "jsx-1e216edfbeb3664a" + " " + "mb-8",
                                      children: [
                                        (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "h3",
                                          {
                                            className:
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "text-xl font-bold text-gray-900 mb-4 flex items-center",
                                            children: [
                                              (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "span",
                                                {
                                                  className:
                                                    "jsx-1e216edfbeb3664a" +
                                                    " " +
                                                    "w-1 h-6 bg-[#044bab] mr-3",
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                  lineNumber: 524,
                                                  columnNumber: 21,
                                                },
                                                this,
                                              ),
                                              "Additional Information",
                                            ],
                                          },
                                          void 0,
                                          true,
                                          {
                                            fileName:
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 523,
                                            columnNumber: 19,
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
                                              "jsx-1e216edfbeb3664a" +
                                              " " +
                                              "bg-gray-50 p-5 rounded-lg space-y-6",
                                            children: [
                                              quotation.paymentTerms &&
                                                (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "div",
                                                  {
                                                    className:
                                                      "jsx-1e216edfbeb3664a",
                                                    children: [
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "p",
                                                        {
                                                          className:
                                                            "jsx-1e216edfbeb3664a" +
                                                            " " +
                                                            "text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold",
                                                          children:
                                                            "Payment Terms",
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                          lineNumber: 530,
                                                          columnNumber: 25,
                                                        },
                                                        this,
                                                      ),
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "p",
                                                        {
                                                          className:
                                                            "jsx-1e216edfbeb3664a" +
                                                            " " +
                                                            "text-sm text-gray-700 leading-relaxed whitespace-pre-wrap",
                                                          children:
                                                            quotation.paymentTerms,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                          lineNumber: 533,
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
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                    lineNumber: 529,
                                                    columnNumber: 23,
                                                  },
                                                  this,
                                                ),
                                              quotation.notes &&
                                                (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  "div",
                                                  {
                                                    className:
                                                      "jsx-1e216edfbeb3664a",
                                                    children: [
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "p",
                                                        {
                                                          className:
                                                            "jsx-1e216edfbeb3664a" +
                                                            " " +
                                                            "text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold",
                                                          children: "Notes",
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                          lineNumber: 540,
                                                          columnNumber: 25,
                                                        },
                                                        this,
                                                      ),
                                                      (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        "p",
                                                        {
                                                          className:
                                                            "jsx-1e216edfbeb3664a" +
                                                            " " +
                                                            "text-sm text-gray-700 leading-relaxed whitespace-pre-wrap",
                                                          children:
                                                            quotation.notes,
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                          lineNumber: 543,
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
                                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                    lineNumber: 539,
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
                                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                            lineNumber: 527,
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
                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                      lineNumber: 522,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 520,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "section",
                              {
                                className:
                                  "jsx-1e216edfbeb3664a" +
                                  " " +
                                  "mt-auto pt-6 border-t-2 border-gray-200 mb-4",
                                children: (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "jsx-1e216edfbeb3664a" +
                                      " " +
                                      "grid grid-cols-2 gap-8",
                                    children: [
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className: "jsx-1e216edfbeb3664a",
                                          children: [
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "div",
                                              {
                                                className:
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "h-0 mb-30",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 557,
                                                columnNumber: 19,
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
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "border-gray-400 pt-2",
                                                children: [
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "img",
                                                    {
                                                      src: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$sign$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$assets$2f$sign$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__[
                                                        "default"
                                                      ].src,
                                                      alt: "Signature",
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "h-16 mb-2",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 559,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "p",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "text-sm font-semibold text-gray-900",
                                                      children:
                                                        "Authorized Signatory",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 560,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "p",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "text-xs text-gray-600 mt-1",
                                                      children:
                                                        settings?.name ||
                                                        "Kalahanu Tech Studios LLP",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 563,
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
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 558,
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
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                          lineNumber: 556,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "div",
                                        {
                                          className: "jsx-1e216edfbeb3664a",
                                          children: [
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "div",
                                              {
                                                className:
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "h-12 mb-7",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 569,
                                                columnNumber: 19,
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
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "border-gray-400 pt-2",
                                                children: [
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "p",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "text-sm font-semibold text-gray-900",
                                                      children:
                                                        "Client Signature",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 571,
                                                      columnNumber: 21,
                                                    },
                                                    this,
                                                  ),
                                                  (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "p",
                                                    {
                                                      className:
                                                        "jsx-1e216edfbeb3664a" +
                                                        " " +
                                                        "text-xs text-gray-600 mt-1",
                                                      children:
                                                        client?.name ||
                                                        "Client",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                      lineNumber: 574,
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
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 570,
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
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                    lineNumber: 555,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 554,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "footer",
                              {
                                className:
                                  "jsx-1e216edfbeb3664a" +
                                  " " +
                                  "pt-3 pb-4 border-t border-gray-200 text-center text-xs text-gray-500",
                                children: (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className:
                                      "jsx-1e216edfbeb3664a" +
                                      " " +
                                      "space-y-1",
                                    children: [
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "p",
                                        {
                                          className: "jsx-1e216edfbeb3664a",
                                          children:
                                            settings?.footerText ||
                                            "© 2026 Kalahanu Tech Studios LLP. All Rights Reserved.",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                          lineNumber: 585,
                                          columnNumber: 17,
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
                                            "jsx-1e216edfbeb3664a" +
                                            " " +
                                            "flex items-center justify-center gap-6",
                                          children: [
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "span",
                                              {
                                                className:
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "text-gray-700",
                                                children: "+91 84069 12345",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 590,
                                                columnNumber: 19,
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
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "w-px h-4 bg-gray-300",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 591,
                                                columnNumber: 19,
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
                                                  "jsx-1e216edfbeb3664a" +
                                                  " " +
                                                  "text-gray-700",
                                                children:
                                                  "support@pixelatenest.com",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                                lineNumber: 592,
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
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                          lineNumber: 589,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "p",
                                        {
                                          className: "jsx-1e216edfbeb3664a",
                                          children:
                                            settings?.website ||
                                            "www.pixelatenest.com",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                          lineNumber: 596,
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                    lineNumber: 584,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                                lineNumber: 583,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                          lineNumber: 516,
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
                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                    lineNumber: 106,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/quotations/[id]/view/page.tsx",
                lineNumber: 105,
                columnNumber: 7,
              },
              this,
            ),
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "default"
              ],
              {
                id: "1e216edfbeb3664a",
                children:
                  "@media print{*{print-color-adjust:exact!important;-webkit-print-color-adjust:exact!important;color-adjust:exact!important}body{margin:0!important;padding:0!important}header,nav,aside,[class*=sidebar],[class*=navbar],[class*=layout]>:not(.print-root){display:none!important}.print-root{display:block!important}.print-area{max-width:none;margin:0;padding:0}.print-page{page-break-before:always;page-break-inside:avoid;box-sizing:border-box}@page{size:A4;margin:0}}",
              },
              void 0,
              false,
              void 0,
              this,
            ),
          ],
        },
        void 0,
        true,
      );
    }
  },
];
