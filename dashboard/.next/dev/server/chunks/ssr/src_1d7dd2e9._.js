module.exports = [
  "[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Badge",
      () => Badge,
      "badgeVariants",
      () => badgeVariants,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/lib/utils.ts [app-ssr] (ecmascript)",
      );
    const badgeVariants = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "cva"
    ])(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      {
        variants: {
          variant: {
            default:
              "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary:
              "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive:
              "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "text-foreground",
          },
        },
        defaultVariants: {
          variant: "default",
        },
      },
    );
    function Badge({ className, variant, ...props }) {
      return  (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "cn"
          ])(
            badgeVariants({
              variant,
            }),
            className,
          ),
          ...props,
        },
        void 0,
        false,
        {
          fileName: "[project]/src/components/ui/badge.tsx",
          lineNumber: 33,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/src/components/ui/table.tsx [app-ssr] (ecmascript)",
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
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/lib/utils.ts [app-ssr] (ecmascript)",
      );
    const Table =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "div",
          {
            className: "relative w-full overflow-auto",
            children:  (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "table",
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "cn"
                ])("w-full caption-bottom text-sm", className),
                ...props,
              },
              void 0,
              false,
              {
                fileName: "[project]/src/components/ui/table.tsx",
                lineNumber: 10,
                columnNumber: 5,
              },
              ("TURBOPACK compile-time value", void 0),
            ),
          },
          void 0,
          false,
          {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 9,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    Table.displayName = "Table";
    const TableHeader =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "thead",
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("[&_tr]:border-b", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 23,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    TableHeader.displayName = "TableHeader";
    const TableBody =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "tbody",
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("[&_tr:last-child]:border-0", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 31,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    TableBody.displayName = "TableBody";
    const TableFooter =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "tfoot",
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 43,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    TableFooter.displayName = "TableFooter";
    const TableRow =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "tr",
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 58,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    TableRow.displayName = "TableRow";
    const TableHead =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "th",
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 73,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    TableHead.displayName = "TableHead";
    const TableCell =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "td",
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 88,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    TableCell.displayName = "TableCell";
    const TableCaption =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "caption",
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("mt-4 text-sm text-muted-foreground", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName: "[project]/src/components/ui/table.tsx",
            lineNumber: 100,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    TableCaption.displayName = "TableCaption";
  },
  "[project]/src/components/ui/select.tsx [app-ssr] (ecmascript)",
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
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/@radix-ui/react-select/dist/index.mjs [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUp>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/lib/utils.ts [app-ssr] (ecmascript)",
      );
    ("use client");
    const Select =
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Root"
      ];
    const SelectGroup =
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Group"
      ];
    const SelectValue =
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Value"
      ];
    const SelectTrigger =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, children, ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Trigger"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "flex h-10 w-full items-center justify-between rounded-none border-2 border-foreground bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
              className,
            ),
            ...props,
            children: [
              children,
               (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "Icon"
                ],
                {
                  asChild: true,
                  children:  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__[
                      "ChevronDown"
                    ],
                    {
                      className: "h-4 w-4 opacity-50",
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/components/ui/select.tsx",
                      lineNumber: 29,
                      columnNumber: 7,
                    },
                    ("TURBOPACK compile-time value", void 0),
                  ),
                },
                void 0,
                false,
                {
                  fileName: "[project]/src/components/ui/select.tsx",
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
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 19,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SelectTrigger.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Trigger"
      ].displayName;
    const SelectScrollUpButton =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "ScrollUpButton"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "flex cursor-default items-center justify-center py-1",
              className,
            ),
            ...props,
            children:  (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__[
                "ChevronUp"
              ],
              {
                className: "h-4 w-4",
              },
              void 0,
              false,
              {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 47,
                columnNumber: 5,
              },
              ("TURBOPACK compile-time value", void 0),
            ),
          },
          void 0,
          false,
          {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 39,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SelectScrollUpButton.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "ScrollUpButton"
      ].displayName;
    const SelectScrollDownButton =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "ScrollDownButton"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "flex cursor-default items-center justify-center py-1",
              className,
            ),
            ...props,
            children:  (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__[
                "ChevronDown"
              ],
              {
                className: "h-4 w-4",
              },
              void 0,
              false,
              {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 64,
                columnNumber: 5,
              },
              ("TURBOPACK compile-time value", void 0),
            ),
          },
          void 0,
          false,
          {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 56,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SelectScrollDownButton.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "ScrollDownButton"
      ].displayName;
    const SelectContent =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, children, position = "popper", ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Portal"
          ],
          {
            children:  (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "Content"
              ],
              {
                ref: ref,
                className: (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    SelectScrollUpButton,
                    {},
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/components/ui/select.tsx",
                      lineNumber: 86,
                      columnNumber: 7,
                    },
                    ("TURBOPACK compile-time value", void 0),
                  ),
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "Viewport"
                    ],
                    {
                      className: (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
                      fileName: "[project]/src/components/ui/select.tsx",
                      lineNumber: 87,
                      columnNumber: 7,
                    },
                    ("TURBOPACK compile-time value", void 0),
                  ),
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    SelectScrollDownButton,
                    {},
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/components/ui/select.tsx",
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
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 75,
                columnNumber: 5,
              },
              ("TURBOPACK compile-time value", void 0),
            ),
          },
          void 0,
          false,
          {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 74,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SelectContent.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Content"
      ].displayName;
    const SelectLabel =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Label"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 106,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SelectLabel.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Label"
      ].displayName;
    const SelectItem =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, children, ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Item"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])(
              "relative flex w-full cursor-default select-none items-center rounded-none py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
              className,
            ),
            ...props,
            children: [
               (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "span",
                {
                  className:
                    "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                  children:  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                      "ItemIndicator"
                    ],
                    {
                      children:  (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__[
                          "Check"
                        ],
                        {
                          className: "h-4 w-4",
                        },
                        void 0,
                        false,
                        {
                          fileName: "[project]/src/components/ui/select.tsx",
                          lineNumber: 128,
                          columnNumber: 9,
                        },
                        ("TURBOPACK compile-time value", void 0),
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/components/ui/select.tsx",
                      lineNumber: 127,
                      columnNumber: 7,
                    },
                    ("TURBOPACK compile-time value", void 0),
                  ),
                },
                void 0,
                false,
                {
                  fileName: "[project]/src/components/ui/select.tsx",
                  lineNumber: 126,
                  columnNumber: 5,
                },
                ("TURBOPACK compile-time value", void 0),
              ),
               (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                  "ItemText"
                ],
                {
                  children: children,
                },
                void 0,
                false,
                {
                  fileName: "[project]/src/components/ui/select.tsx",
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
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 118,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SelectItem.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Item"
      ].displayName;
    const SelectSeparator =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](({ className, ...props }, ref) =>
         (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Separator"
          ],
          {
            ref: ref,
            className: (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "cn"
            ])("-mx-1 my-1 h-px bg-muted", className),
            ...props,
          },
          void 0,
          false,
          {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 141,
            columnNumber: 3,
          },
          ("TURBOPACK compile-time value", void 0),
        ),
      );
    SelectSeparator.displayName =
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "Separator"
      ].displayName;
  },
  "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => WhatsAppWebhookPage]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/table.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/select.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-ssr] (ecmascript) <export default as RefreshCw>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/check-check.js [app-ssr] (ecmascript) <export default as CheckCheck>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/lib/utils.ts [app-ssr] (ecmascript)",
      );
    ("use client");
    const STATUS_CONFIG = {
      sent: {
        label: "Sent",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__[
          "Check"
        ],
        className: "bg-yellow-100 text-yellow-800 border-yellow-300",
      },
      delivered: {
        label: "Delivered",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__[
          "CheckCheck"
        ],
        className: "bg-blue-100 text-blue-800 border-blue-300",
      },
      read: {
        label: "Read",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__[
          "CheckCheck"
        ],
        className: "bg-green-100 text-green-800 border-green-300",
      },
      failed: {
        label: "Failed",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__[
          "XCircle"
        ],
        className: "bg-red-100 text-red-800 border-red-300",
      },
    };
    function StatusBadge({ status }) {
      if (!status)
        return  (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          "span",
          {
            className: "text-muted-foreground text-xs",
            children: "—",
          },
          void 0,
          false,
          {
            fileName:
              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
            lineNumber: 71,
            columnNumber: 23,
          },
          this,
        );
      const cfg = STATUS_CONFIG[status];
      if (!cfg)
        return  (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "jsxDEV"
        ])(
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "Badge"
          ],
          {
            variant: "outline",
            children: status,
          },
          void 0,
          false,
          {
            fileName:
              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
            lineNumber: 73,
            columnNumber: 20,
          },
          this,
        );
      const Icon = cfg.icon;
      return  (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "Badge"
        ],
        {
          variant: "outline",
          className: (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
            "cn"
          ])(
            "flex items-center gap-1 font-semibold text-xs px-2 py-0.5 w-fit",
            cfg.className,
          ),
          children: [
             (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              Icon,
              {
                size: 12,
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                lineNumber: 83,
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
          fileName:
            "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
          lineNumber: 76,
          columnNumber: 5,
        },
        this,
      );
    }
    function formatTs(iso) {
      if (!iso) return "—";
      const d = new Date(iso);
      return d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    }
    function wamidShort(wamid) {
      if (!wamid) return "—";
      
      return "…" + wamid.slice(-20);
    }
    function WhatsAppWebhookPage() {
      const [entries, setEntries] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(true);
      const [statusFilter, setStatusFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("all");
      const [autoRefresh, setAutoRefresh] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [lastRefreshed, setLastRefreshed] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(null);
      const fetchData = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useCallback"
      ])(async () => {
        setLoading(true);
        try {
          const params = new URLSearchParams({
            status: statusFilter,
            limit: "200",
          });
          const res = await fetch(`/api/whatsapp/delivery-log?${params}`);
          if (!res.ok) throw new Error("Failed to fetch");
          const data = await res.json();
          setEntries(data);
          setLastRefreshed(new Date());
        } catch {
          
        } finally {
          setLoading(false);
        }
      }, [statusFilter]);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        fetchData();
      }, [fetchData]);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        if (!autoRefresh) return;
        const id = setInterval(fetchData, 10_000);
        return () => clearInterval(id);
      }, [autoRefresh, fetchData]);
      
      const counts = entries.reduce((acc, e) => {
        const s = e.whatsapp_send_status ?? "sent";
        acc[s] = (acc[s] ?? 0) + 1;
        return acc;
      }, {});
      return  (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "space-y-6",
          children: [
             (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "flex items-start justify-between flex-wrap gap-4",
                children: [
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "h1",
                          {
                            className:
                              "text-3xl font-black tracking-tight flex items-center gap-2",
                            children: [
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__[
                                  "MessageSquare"
                                ],
                                {
                                  className: "h-8 w-8 text-green-600",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                  lineNumber: 161,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              "WhatsApp Webhook Log",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                            lineNumber: 160,
                            columnNumber: 11,
                          },
                          this,
                        ),
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "p",
                          {
                            className: "text-muted-foreground text-sm mt-1",
                            children:
                              "Real-time delivery status for every WhatsApp message sent by this system",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                            lineNumber: 164,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        lastRefreshed &&
                           (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "p",
                            {
                              className: "text-xs text-muted-foreground mt-0.5",
                              children: [
                                "Last updated: ",
                                lastRefreshed.toLocaleTimeString("en-IN"),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                              lineNumber: 169,
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
                        "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                      lineNumber: 159,
                      columnNumber: 9,
                    },
                    this,
                  ),
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "flex items-center gap-2 flex-wrap",
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "Select"
                          ],
                          {
                            value: statusFilter,
                            onValueChange: setStatusFilter,
                            children: [
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "SelectTrigger"
                                ],
                                {
                                  className:
                                    "w-36 border-2 border-black font-bold",
                                  children:  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "SelectValue"
                                    ],
                                    {
                                      placeholder: "Filter",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                      lineNumber: 177,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                  lineNumber: 176,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "SelectContent"
                                ],
                                {
                                  children: [
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "SelectItem"
                                      ],
                                      {
                                        value: "all",
                                        children: "All Statuses",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "SelectItem"
                                      ],
                                      {
                                        value: "sent",
                                        children: "Sent",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "SelectItem"
                                      ],
                                      {
                                        value: "delivered",
                                        children: "Delivered",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "SelectItem"
                                      ],
                                      {
                                        value: "read",
                                        children: "Read",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                        lineNumber: 183,
                                        columnNumber: 15,
                                      },
                                      this,
                                    ),
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "SelectItem"
                                      ],
                                      {
                                        value: "failed",
                                        children: "Failed",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                        lineNumber: 184,
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
                                    "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
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
                              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                            lineNumber: 175,
                            columnNumber: 11,
                          },
                          this,
                        ),
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "Button"
                          ],
                          {
                            variant: autoRefresh ? "default" : "outline",
                            size: "sm",
                            className: (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "cn"
                            ])(
                              "border-2 border-black font-bold",
                              autoRefresh &&
                                "bg-green-600 text-white hover:bg-green-700",
                            ),
                            onClick: () => setAutoRefresh((v) => !v),
                            children: autoRefresh ? "Auto ✓" : "Auto Refresh",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                            lineNumber: 188,
                            columnNumber: 11,
                          },
                          this,
                        ),
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "Button"
                          ],
                          {
                            variant: "outline",
                            size: "sm",
                            className: "border-2 border-black font-bold",
                            onClick: fetchData,
                            disabled: loading,
                            children: [
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__[
                                  "RefreshCw"
                                ],
                                {
                                  size: 14,
                                  className: (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "cn"
                                  ])("mr-1", loading && "animate-spin"),
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                  lineNumber: 207,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              "Refresh",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
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
                        "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                      lineNumber: 174,
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
                  "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                lineNumber: 158,
                columnNumber: 7,
              },
              this,
            ),
             (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                children: ["sent", "delivered", "read", "failed"].map((s) => {
                  const cfg = STATUS_CONFIG[s];
                  const Icon = cfg.icon;
                  return  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "button",
                    {
                      onClick: () => setStatusFilter(s),
                      className: (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "cn"
                      ])(
                        "rounded-xl border-2 border-black p-4 text-left shadow-[2px_2px_0px_black] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all",
                        statusFilter === s ? "bg-black text-white" : "bg-white",
                      ),
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "flex items-center gap-2 mb-1",
                            children: [
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                Icon,
                                {
                                  size: 16,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                  lineNumber: 231,
                                  columnNumber: 17,
                                },
                                this,
                              ),
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "span",
                                {
                                  className:
                                    "text-xs font-bold uppercase tracking-wide",
                                  children: cfg.label,
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                  lineNumber: 232,
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
                              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                            lineNumber: 230,
                            columnNumber: 15,
                          },
                          this,
                        ),
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "div",
                          {
                            className: "text-3xl font-black",
                            children: counts[s] ?? 0,
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                            lineNumber: 236,
                            columnNumber: 15,
                          },
                          this,
                        ),
                      ],
                    },
                    s,
                    true,
                    {
                      fileName:
                        "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                      lineNumber: 222,
                      columnNumber: 13,
                    },
                    this,
                  );
                }),
              },
              void 0,
              false,
              {
                fileName:
                  "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                lineNumber: 217,
                columnNumber: 7,
              },
              this,
            ),
             (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className:
                  "rounded-xl border-2 border-black overflow-hidden shadow-[3px_3px_0px_black]",
                children: [
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className:
                        "bg-black text-white px-4 py-2 flex items-center justify-between",
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "span",
                          {
                            className: "font-bold text-sm",
                            children: [
                              entries.length,
                              " message",
                              entries.length !== 1 ? "s" : "",
                              statusFilter !== "all"
                                ? ` • ${statusFilter}`
                                : "",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName:
                              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                            lineNumber: 245,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        autoRefresh &&
                           (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "span",
                            {
                              className:
                                "text-xs text-green-400 font-mono animate-pulse",
                              children: "● live",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                              lineNumber: 250,
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
                        "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                      lineNumber: 244,
                      columnNumber: 9,
                    },
                    this,
                  ),
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "overflow-x-auto",
                      children:  (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "Table"
                        ],
                        {
                          children: [
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "TableHeader"
                              ],
                              {
                                children:  (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "TableRow"
                                  ],
                                  {
                                    className:
                                      "bg-gray-50 border-b-2 border-black",
                                    children: [
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "TableHead"
                                        ],
                                        {
                                          className: "font-black text-black",
                                          children: "Invoice",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                          lineNumber: 260,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "TableHead"
                                        ],
                                        {
                                          className: "font-black text-black",
                                          children: "Client",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                          lineNumber: 261,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "TableHead"
                                        ],
                                        {
                                          className: "font-black text-black",
                                          children: "Phone",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                          lineNumber: 262,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "TableHead"
                                        ],
                                        {
                                          className: "font-black text-black",
                                          children: "Status",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                          lineNumber: 263,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "TableHead"
                                        ],
                                        {
                                          className: "font-black text-black",
                                          children: "Accepted by Meta",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                          lineNumber: 264,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "TableHead"
                                        ],
                                        {
                                          className: "font-black text-black",
                                          children: "Sent",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                          lineNumber: 267,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "TableHead"
                                        ],
                                        {
                                          className: "font-black text-black",
                                          children: "Delivered",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                          lineNumber: 268,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "TableHead"
                                        ],
                                        {
                                          className: "font-black text-black",
                                          children: "Read",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                          lineNumber: 271,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "TableHead"
                                        ],
                                        {
                                          className: "font-black text-black",
                                          children: "wamid",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                          lineNumber: 272,
                                          columnNumber: 17,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "TableHead"
                                        ],
                                        {
                                          className: "font-black text-black",
                                          children: "Failure Reason",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                          lineNumber: 273,
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
                                      "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                    lineNumber: 259,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                lineNumber: 258,
                                columnNumber: 13,
                              },
                              this,
                            ),
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "TableBody"
                              ],
                              {
                                children:
                                  loading && entries.length === 0
                                    ?  (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "TableRow"
                                        ],
                                        {
                                          children:  (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "TableCell"
                                            ],
                                            {
                                              colSpan: 10,
                                              className:
                                                "text-center py-16 text-muted-foreground",
                                              children: [
                                                 (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__[
                                                    "RefreshCw"
                                                  ],
                                                  {
                                                    className:
                                                      "animate-spin mx-auto mb-2",
                                                    size: 24,
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                "Loading…",
                                              ],
                                            },
                                            void 0,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                              lineNumber: 281,
                                              columnNumber: 19,
                                            },
                                            this,
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                          lineNumber: 280,
                                          columnNumber: 17,
                                        },
                                        this,
                                      )
                                    : entries.length === 0
                                      ?  (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "TableRow"
                                          ],
                                          {
                                            children:  (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "TableCell"
                                              ],
                                              {
                                                colSpan: 10,
                                                className:
                                                  "text-center py-16 text-muted-foreground",
                                                children: [
                                                  "No WhatsApp messages found",
                                                  statusFilter !== "all"
                                                    ? ` with status "${statusFilter}"`
                                                    : "",
                                                  ".",
                                                ],
                                              },
                                              void 0,
                                              true,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                lineNumber: 294,
                                                columnNumber: 19,
                                              },
                                              this,
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                            lineNumber: 293,
                                            columnNumber: 17,
                                          },
                                          this,
                                        )
                                      : entries.map((entry) =>
                                           (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                              "TableRow"
                                            ],
                                            {
                                              className: (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                "cn"
                                              ])(
                                                "border-b border-gray-200 hover:bg-gray-50 transition-colors",
                                                entry.whatsapp_send_status ===
                                                  "failed" && "bg-red-50",
                                                entry.whatsapp_send_status ===
                                                  "read" && "bg-green-50/40",
                                              ),
                                              children: [
                                                 (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "TableCell"
                                                  ],
                                                  {
                                                    className:
                                                      "font-mono font-bold text-sm",
                                                    children:
                                                      entry.invoiceNumber ??
                                                      "—",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                 (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "TableCell"
                                                  ],
                                                  {
                                                    className: "font-semibold",
                                                    children:
                                                      entry.clientName ?? "—",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                 (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "TableCell"
                                                  ],
                                                  {
                                                    className:
                                                      "font-mono text-sm text-muted-foreground",
                                                    children:
                                                      entry.phone ?? "—",
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                 (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "TableCell"
                                                  ],
                                                  {
                                                    children:  (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      StatusBadge,
                                                      {
                                                        status:
                                                          entry.whatsapp_send_status,
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 23,
                                                      },
                                                      this,
                                                    ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                    lineNumber: 324,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                 (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "TableCell"
                                                  ],
                                                  {
                                                    className:
                                                      "text-xs text-muted-foreground whitespace-nowrap",
                                                    children: formatTs(
                                                      entry.whatsapp_sent_at,
                                                    ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                    lineNumber: 327,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                 (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "TableCell"
                                                  ],
                                                  {
                                                    className:
                                                      "text-xs whitespace-nowrap",
                                                    children:
                                                      entry.whatsapp_send_status ===
                                                        "sent" ||
                                                      entry.whatsapp_send_status ===
                                                        "delivered" ||
                                                      entry.whatsapp_send_status ===
                                                        "read"
                                                        ?  (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            "span",
                                                            {
                                                              className:
                                                                "text-yellow-700 font-semibold",
                                                              children:
                                                                "✓ sent",
                                                            },
                                                            void 0,
                                                            false,
                                                            {
                                                              fileName:
                                                                "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                              lineNumber: 335,
                                                              columnNumber: 25,
                                                            },
                                                            this,
                                                          )
                                                        : entry.whatsapp_send_status ===
                                                            "failed"
                                                          ?  (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "span",
                                                              {
                                                                className:
                                                                  "text-red-500",
                                                                children: "✗",
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                                lineNumber: 339,
                                                                columnNumber: 25,
                                                              },
                                                              this,
                                                            )
                                                          :  (0,
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                              "jsxDEV"
                                                            ])(
                                                              "span",
                                                              {
                                                                className:
                                                                  "text-muted-foreground",
                                                                children: "—",
                                                              },
                                                              void 0,
                                                              false,
                                                              {
                                                                fileName:
                                                                  "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                                lineNumber: 341,
                                                                columnNumber: 25,
                                                              },
                                                              this,
                                                            ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                    lineNumber: 331,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                 (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "TableCell"
                                                  ],
                                                  {
                                                    className:
                                                      "text-xs whitespace-nowrap",
                                                    children:
                                                      entry.whatsapp_delivered_at
                                                        ?  (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            "span",
                                                            {
                                                              className:
                                                                "text-blue-700 font-semibold",
                                                              title: formatTs(
                                                                entry.whatsapp_delivered_at,
                                                              ),
                                                              children: [
                                                                "✓✓ ",
                                                                formatTs(
                                                                  entry.whatsapp_delivered_at,
                                                                ),
                                                              ],
                                                            },
                                                            void 0,
                                                            true,
                                                            {
                                                              fileName:
                                                                "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                              lineNumber: 346,
                                                              columnNumber: 25,
                                                            },
                                                            this,
                                                          )
                                                        :  (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            "span",
                                                            {
                                                              className:
                                                                "text-muted-foreground",
                                                              children: "—",
                                                            },
                                                            void 0,
                                                            false,
                                                            {
                                                              fileName:
                                                                "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                              lineNumber: 353,
                                                              columnNumber: 25,
                                                            },
                                                            this,
                                                          ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                    lineNumber: 344,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                 (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "TableCell"
                                                  ],
                                                  {
                                                    className:
                                                      "text-xs whitespace-nowrap",
                                                    children:
                                                      entry.whatsapp_read_at
                                                        ?  (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            "span",
                                                            {
                                                              className:
                                                                "text-green-700 font-semibold",
                                                              title: formatTs(
                                                                entry.whatsapp_read_at,
                                                              ),
                                                              children: [
                                                                "✓✓ ",
                                                                formatTs(
                                                                  entry.whatsapp_read_at,
                                                                ),
                                                              ],
                                                            },
                                                            void 0,
                                                            true,
                                                            {
                                                              fileName:
                                                                "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                              lineNumber: 358,
                                                              columnNumber: 25,
                                                            },
                                                            this,
                                                          )
                                                        :  (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            "span",
                                                            {
                                                              className:
                                                                "text-muted-foreground",
                                                              children: "—",
                                                            },
                                                            void 0,
                                                            false,
                                                            {
                                                              fileName:
                                                                "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                              lineNumber: 365,
                                                              columnNumber: 25,
                                                            },
                                                            this,
                                                          ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                 (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "TableCell"
                                                  ],
                                                  {
                                                    className:
                                                      "font-mono text-xs text-muted-foreground max-w-[180px] truncate",
                                                    title:
                                                      entry.whatsapp_message_id,
                                                    children: wamidShort(
                                                      entry.whatsapp_message_id,
                                                    ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                    lineNumber: 368,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                                 (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                    "TableCell"
                                                  ],
                                                  {
                                                    className:
                                                      "text-xs max-w-[200px]",
                                                    children:
                                                      entry.whatsapp_send_status ===
                                                      "failed"
                                                        ?  (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            "span",
                                                            {
                                                              className:
                                                                "text-red-700 font-semibold",
                                                              children: [
                                                                entry.whatsapp_fail_code
                                                                  ? `[${entry.whatsapp_fail_code}] `
                                                                  : "",
                                                                entry.whatsapp_fail_reason ??
                                                                  "Unknown error",
                                                              ],
                                                            },
                                                            void 0,
                                                            true,
                                                            {
                                                              fileName:
                                                                "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                              lineNumber: 376,
                                                              columnNumber: 25,
                                                            },
                                                            this,
                                                          )
                                                        :  (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            "span",
                                                            {
                                                              className:
                                                                "text-muted-foreground",
                                                              children: "—",
                                                            },
                                                            void 0,
                                                            false,
                                                            {
                                                              fileName:
                                                                "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                              lineNumber: 383,
                                                              columnNumber: 25,
                                                            },
                                                            this,
                                                          ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 21,
                                                  },
                                                  this,
                                                ),
                                              ],
                                            },
                                            entry._id,
                                            true,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                              lineNumber: 307,
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
                                  "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                                lineNumber: 278,
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
                            "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                          lineNumber: 257,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                      lineNumber: 256,
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
                  "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                lineNumber: 243,
                columnNumber: 7,
              },
              this,
            ),
             (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className:
                  "flex flex-wrap gap-4 text-xs text-muted-foreground border-t pt-4",
                children: [
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "span",
                    {
                      className: "font-bold text-black",
                      children: "Legend:",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                      lineNumber: 396,
                      columnNumber: 9,
                    },
                    this,
                  ),
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "span",
                    {
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "strong",
                          {
                            className: "text-yellow-700",
                            children: "Accepted by Meta",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                            lineNumber: 398,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        " — timestamp when our server sent the message to Meta's API",
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                      lineNumber: 397,
                      columnNumber: 9,
                    },
                    this,
                  ),
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "span",
                    {
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "strong",
                          {
                            className: "text-yellow-700",
                            children: "Sent",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                            lineNumber: 402,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        " — confirmed via webhook that Meta dispatched it to the recipient",
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                      lineNumber: 401,
                      columnNumber: 9,
                    },
                    this,
                  ),
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "span",
                    {
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "strong",
                          {
                            className: "text-blue-700",
                            children: "Delivered",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                            lineNumber: 406,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        " — recipient's device received it",
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                      lineNumber: 405,
                      columnNumber: 9,
                    },
                    this,
                  ),
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "span",
                    {
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "strong",
                          {
                            className: "text-green-700",
                            children: "Read",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                            lineNumber: 410,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        " — recipient opened it",
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                      lineNumber: 409,
                      columnNumber: 9,
                    },
                    this,
                  ),
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "span",
                    {
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "strong",
                          {
                            className: "text-red-700",
                            children: "Failed",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                            lineNumber: 413,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        " — delivery failed (error code shown)",
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName:
                        "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                      lineNumber: 412,
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
                  "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
                lineNumber: 395,
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
            "[project]/src/app/(crm)/dashboard/whatsapp-webhook/page.tsx",
          lineNumber: 156,
          columnNumber: 5,
        },
        this,
      );
    }
  },
];


