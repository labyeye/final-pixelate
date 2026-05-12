(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === "object" ? document.currentScript : undefined,
  "[project]/src/lib/constants.ts [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "clientStatusColors",
      () => clientStatusColors,
      "clientStatuses",
      () => clientStatuses,
      "leadStatusColors",
      () => leadStatusColors,
      "leadStatuses",
      () => leadStatuses,
      "priorityColors",
      () => priorityColors,
    ]);
    const leadStatuses = [
      "not called",
      "called",
      "not interested",
      "meeting booked",
      "interested",
      "call back later",
      "converted",
      "other",
    ];
    const leadStatusColors = {
      "not called": "bg-gray-100 text-gray-700 border-gray-300",
      called: "bg-blue-100 text-blue-700 border-blue-300",
      interested: "bg-green-100 text-green-700 border-green-300",
      "meeting booked": "bg-purple-100 text-purple-700 border-purple-300",
      "call back later": "bg-yellow-100 text-yellow-700 border-yellow-300",
      "not interested": "bg-red-100 text-red-700 border-red-300",
      converted: "bg-emerald-100 text-emerald-700 border-emerald-300",
      other: "bg-orange-100 text-orange-700 border-orange-300",
    };
    const priorityColors = {
      high: "bg-red-100 text-red-700 border-red-300",
      medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
      low: "bg-green-100 text-green-700 border-green-300",
    };
    const clientStatuses = ["active", "inactive", "prospect", "churned"];
    const clientStatusColors = {
      active: "bg-green-100 text-green-700 border-green-300",
      inactive: "bg-gray-100 text-gray-700 border-gray-300",
      prospect: "bg-blue-100 text-blue-700 border-blue-300",
      churned: "bg-red-100 text-red-700 border-red-300",
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
  "[project]/src/components/ui/table.tsx [app-client] (ecmascript)",
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
    const Table =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c = ({ className, ...props }, ref) =>
           (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "div",
            {
              className: "relative w-full overflow-auto",
              children:  (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "table",
                {
                  ref: ref,
                  className: (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c1 = Table;
    Table.displayName = "Table";
    const TableHeader =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c2 = ({ className, ...props }, ref) =>
           (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "thead",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c3 = TableHeader;
    TableHeader.displayName = "TableHeader";
    const TableBody =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c4 = ({ className, ...props }, ref) =>
           (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "tbody",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c5 = TableBody;
    TableBody.displayName = "TableBody";
    const TableFooter =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c6 = ({ className, ...props }, ref) =>
           (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "tfoot",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c7 = TableFooter;
    TableFooter.displayName = "TableFooter";
    const TableRow =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c8 = ({ className, ...props }, ref) =>
           (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "tr",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c9 = TableRow;
    TableRow.displayName = "TableRow";
    const TableHead =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c10 = ({ className, ...props }, ref) =>
           (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "th",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c11 = TableHead;
    TableHead.displayName = "TableHead";
    const TableCell =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c12 = ({ className, ...props }, ref) =>
           (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "td",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c13 = TableCell;
    TableCell.displayName = "TableCell";
    const TableCaption =
       __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c14 = ({ className, ...props }, ref) =>
           (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "caption",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c15 = TableCaption;
    TableCaption.displayName = "TableCaption";
    var _c,
      _c1,
      _c2,
      _c3,
      _c4,
      _c5,
      _c6,
      _c7,
      _c8,
      _c9,
      _c10,
      _c11,
      _c12,
      _c13,
      _c14,
      _c15;
    __turbopack_context__.k.register(_c, "Table$React.forwardRef");
    __turbopack_context__.k.register(_c1, "Table");
    __turbopack_context__.k.register(_c2, "TableHeader$React.forwardRef");
    __turbopack_context__.k.register(_c3, "TableHeader");
    __turbopack_context__.k.register(_c4, "TableBody$React.forwardRef");
    __turbopack_context__.k.register(_c5, "TableBody");
    __turbopack_context__.k.register(_c6, "TableFooter$React.forwardRef");
    __turbopack_context__.k.register(_c7, "TableFooter");
    __turbopack_context__.k.register(_c8, "TableRow$React.forwardRef");
    __turbopack_context__.k.register(_c9, "TableRow");
    __turbopack_context__.k.register(_c10, "TableHead$React.forwardRef");
    __turbopack_context__.k.register(_c11, "TableHead");
    __turbopack_context__.k.register(_c12, "TableCell$React.forwardRef");
    __turbopack_context__.k.register(_c13, "TableCell");
    __turbopack_context__.k.register(_c14, "TableCaption$React.forwardRef");
    __turbopack_context__.k.register(_c15, "TableCaption");
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
  "[project]/src/app/(crm)/leads/page.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => LeadsPage]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/navigation.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/lib/constants.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/input.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/table.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/hooks/use-toast.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript) <export default as Trash>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutList$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/layout-list.js [app-client] (ecmascript) <export default as LayoutList>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$kanban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Kanban$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/kanban.js [app-client] (ecmascript) <export default as Kanban>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/filter.js [app-client] (ecmascript) <export default as Filter>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature(),
      _s1 = __turbopack_context__.k.signature();
    ("use client");
    function getToken() {
      return localStorage.getItem("auth_token") || "";
    }
    function authH() {
      const t = getToken();
      return t
        ? {
            Authorization: "Bearer " + t,
            "Content-Type": "application/json",
          }
        : {
            "Content-Type": "application/json",
          };
    }
    function getRole() {
      try {
        const t = getToken();
        if (!t) return null;
        return JSON.parse(atob(t.split(".")[1])).role || null;
      } catch {
        return null;
      }
    }
    function formatDate(d) {
      if (!d) return null;
      return new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
    }
    function isOverdue(followUpDate) {
      if (!followUpDate) return false;
      return new Date(followUpDate) < new Date();
    }
    function KanbanCard({ lead, onStatusChange, onDelete, role }) {
      _s();
      const router = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useRouter"
      ])();
      const id = String(lead._id || lead.id);
      const overdueFlag = isOverdue(lead.followUpDate);
      return  (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className:
            "bg-white border-2 border-black p-3 space-y-2 cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group",
          onClick: () => router.push(`/leads/${id}`),
          children: [
             (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "flex items-start justify-between gap-1",
                children: [
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "span",
                    {
                      className: "font-bold text-sm leading-tight",
                      children: lead.name,
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 100,
                      columnNumber: 9,
                    },
                    this,
                  ),
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        onDelete(id);
                      },
                      className:
                        "opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity",
                      children:  (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__[
                          "Trash"
                        ],
                        {
                          className: "w-3.5 h-3.5",
                        },
                        void 0,
                        false,
                        {
                          fileName: "[project]/src/app/(crm)/leads/page.tsx",
                          lineNumber: 108,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 101,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/app/(crm)/leads/page.tsx",
                lineNumber: 99,
                columnNumber: 7,
              },
              this,
            ),
            lead.phone &&
               (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "div",
                {
                  className:
                    "flex items-center gap-1 text-xs text-muted-foreground",
                  children: [
                     (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__[
                        "Phone"
                      ],
                      {
                        className: "w-3 h-3",
                      },
                      void 0,
                      false,
                      {
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 113,
                        columnNumber: 11,
                      },
                      this,
                    ),
                    " ",
                    lead.phone,
                  ],
                },
                void 0,
                true,
                {
                  fileName: "[project]/src/app/(crm)/leads/page.tsx",
                  lineNumber: 112,
                  columnNumber: 9,
                },
                this,
              ),
            lead.budget &&
               (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "div",
                {
                  className: "text-xs font-bold text-green-700",
                  children: ["₹", lead.budget],
                },
                void 0,
                true,
                {
                  fileName: "[project]/src/app/(crm)/leads/page.tsx",
                  lineNumber: 117,
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
                className: "flex items-center gap-1 flex-wrap",
                children: [
                  lead.source &&
                     (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "span",
                      {
                        className:
                          "text-xs px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200",
                        children: lead.source,
                      },
                      void 0,
                      false,
                      {
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 121,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  lead.priority &&
                     (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "span",
                      {
                        className: `text-xs px-1.5 py-0.5 rounded-full border ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priorityColors"][lead.priority] || ""}`,
                        children: lead.priority,
                      },
                      void 0,
                      false,
                      {
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 126,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  overdueFlag &&
                     (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "span",
                      {
                        className:
                          "text-xs px-1.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center gap-1",
                        children: [
                           (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__[
                              "Clock"
                            ],
                            {
                              className: "w-2.5 h-2.5",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/app/(crm)/leads/page.tsx",
                              lineNumber: 134,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          " overdue",
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 133,
                        columnNumber: 11,
                      },
                      this,
                    ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/app/(crm)/leads/page.tsx",
                lineNumber: 119,
                columnNumber: 7,
              },
              this,
            ),
            lead.assignedToName &&
               (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "div",
                {
                  className: "text-xs text-muted-foreground",
                  children: ["@", lead.assignedToName],
                },
                void 0,
                true,
                {
                  fileName: "[project]/src/app/(crm)/leads/page.tsx",
                  lineNumber: 139,
                  columnNumber: 9,
                },
                this,
              ),
            lead.followUpDate &&
               (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "div",
                {
                  className:
                    "text-xs text-muted-foreground flex items-center gap-1",
                  children: [
                     (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__[
                        "Calendar"
                      ],
                      {
                        className: "w-3 h-3",
                      },
                      void 0,
                      false,
                      {
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 145,
                        columnNumber: 11,
                      },
                      this,
                    ),
                    " ",
                    formatDate(lead.followUpDate),
                  ],
                },
                void 0,
                true,
                {
                  fileName: "[project]/src/app/(crm)/leads/page.tsx",
                  lineNumber: 144,
                  columnNumber: 9,
                },
                this,
              ),
          ],
        },
        void 0,
        true,
        {
          fileName: "[project]/src/app/(crm)/leads/page.tsx",
          lineNumber: 95,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(KanbanCard, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useRouter"
        ],
      ];
    });
    _c = KanbanCard;
    function AnalyticsStrip({ leads }) {
      const total = leads.length;
      const converted = leads.filter((l) => l.status === "converted").length;
      const interested = leads.filter((l) => l.status === "interested").length;
      const meetingBooked = leads.filter(
        (l) => l.status === "meeting booked",
      ).length;
      const thisMonth = leads.filter((l) => {
        if (!l.createdAt) return false;
        const d = new Date(l.createdAt);
        const now = new Date();
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      }).length;
      const convRate = total ? Math.round((converted / total) * 100) : 0;
      const cards = [
        {
          label: "Total Leads",
          value: total,
          icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__[
            "Users"
          ],
          color: "border-black bg-white",
        },
        {
          label: "New This Month",
          value: thisMonth,
          icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__[
            "Plus"
          ],
          color: "border-black bg-white",
        },
        {
          label: "Interested",
          value: interested,
          icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__[
            "TrendingUp"
          ],
          color: "border-black bg-white",
        },
        {
          label: "Meeting Booked",
          value: meetingBooked,
          icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__[
            "Calendar"
          ],
          color: "border-black bg-white",
        },
        {
          label: "Converted",
          value: converted,
          icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__[
            "CheckCircle"
          ],
          color: "border-black bg-white",
        },
        {
          label: "Conv. Rate",
          value: `${convRate}%`,
          icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__[
            "ArrowUpRight"
          ],
          color: "border-black bg-white",
        },
      ];
      return  (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3",
          children: cards.map((c) => {
            const Icon = c.icon;
            return  (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: `border-2 border-black p-3 flex flex-col gap-1 ${c.color}`,
                children: [
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "flex items-center justify-between",
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "span",
                          {
                            className:
                              "text-xs font-bold text-muted-foreground uppercase tracking-wide",
                            children: c.label,
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 218,
                            columnNumber: 15,
                          },
                          this,
                        ),
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          Icon,
                          {
                            className: "w-4 h-4 text-muted-foreground",
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
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
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 217,
                      columnNumber: 13,
                    },
                    this,
                  ),
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "span",
                    {
                      className: "text-2xl font-black",
                      children: c.value,
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 223,
                      columnNumber: 13,
                    },
                    this,
                  ),
                ],
              },
              c.label,
              true,
              {
                fileName: "[project]/src/app/(crm)/leads/page.tsx",
                lineNumber: 213,
                columnNumber: 11,
              },
              this,
            );
          }),
        },
        void 0,
        false,
        {
          fileName: "[project]/src/app/(crm)/leads/page.tsx",
          lineNumber: 209,
          columnNumber: 5,
        },
        this,
      );
    }
    _c1 = AnalyticsStrip;
    function LeadsPage() {
      _s1();
      const router = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useRouter"
      ])();
      const { toast } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useToast"
      ])();
      const [leads, setLeads] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [team, setTeam] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [view, setView] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("table");
      const [search, setSearch] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [staffFilter, setStaffFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [statusFilter, setStatusFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [sourceFilter, setSourceFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [priorityFilter, setPriorityFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [showFilters, setShowFilters] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [selected, setSelected] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(new Set());
      const [loading, setLoading] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(true);
      const [isSyncing, setIsSyncing] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [bulkDeleting, setBulkDeleting] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const role = ("TURBOPACK compile-time truthy", 1)
        ? getRole()
        : "TURBOPACK unreachable";
      async function fetchLeads() {
        try {
          const res = await fetch("/api/leads", {
            headers: authH(),
          });
          if (!res.ok) return [];
          const data = await res.json();
          return Array.isArray(data) ? data : [];
        } catch {
          return [];
        }
      }
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "LeadsPage.useEffect": () => {
            ({
              "LeadsPage.useEffect": async () => {
                setLoading(true);
                try {
                  const [items, tm] = await Promise.all([
                    fetchLeads(),
                    fetch("/api/team-members")
                      .then(
                        {
                          "LeadsPage.useEffect": (r) => r.json(),
                        }["LeadsPage.useEffect"],
                      )
                      .catch(
                        {
                          "LeadsPage.useEffect": () => [],
                        }["LeadsPage.useEffect"],
                      ),
                  ]);
                  setLeads(items);
                  setTeam(Array.isArray(tm) ? tm : []);
                } finally {
                  setLoading(false);
                }
              },
            })["LeadsPage.useEffect"]();
          },
        }["LeadsPage.useEffect"],
        [],
      );
      const allSources = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "LeadsPage.useMemo[allSources]": () => {
            const s = new Set(
              leads.map(
                {
                  "LeadsPage.useMemo[allSources]": (l) => l.source || "Unknown",
                }["LeadsPage.useMemo[allSources]"],
              ),
            );
            return Array.from(s).sort();
          },
        }["LeadsPage.useMemo[allSources]"],
        [leads],
      );
      const filtered = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "LeadsPage.useMemo[filtered]": () => {
            return leads.filter(
              {
                "LeadsPage.useMemo[filtered]": (l) => {
                  if (search) {
                    const q = search.toLowerCase();
                    const match = [
                      l.name,
                      l.phone,
                      l.email,
                      l.subject,
                      l.projectType,
                    ].some(
                      {
                        "LeadsPage.useMemo[filtered].match": (f) =>
                          f && String(f).toLowerCase().includes(q),
                      }["LeadsPage.useMemo[filtered].match"],
                    );
                    if (!match) return false;
                  }
                  if (staffFilter && String(l.assignedTo) !== staffFilter)
                    return false;
                  if (statusFilter && l.status !== statusFilter) return false;
                  if (sourceFilter && (l.source || "Unknown") !== sourceFilter)
                    return false;
                  if (priorityFilter && (l.priority || "") !== priorityFilter)
                    return false;
                  return true;
                },
              }["LeadsPage.useMemo[filtered]"],
            );
          },
        }["LeadsPage.useMemo[filtered]"],
        [
          leads,
          search,
          staffFilter,
          statusFilter,
          sourceFilter,
          priorityFilter,
        ],
      );
      const kanbanGroups = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useMemo"
      ])(
        {
          "LeadsPage.useMemo[kanbanGroups]": () => {
            const groups = {};
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "leadStatuses"
            ].forEach(
              {
                "LeadsPage.useMemo[kanbanGroups]": (s) => {
                  groups[s] = [];
                },
              }["LeadsPage.useMemo[kanbanGroups]"],
            );
            filtered.forEach(
              {
                "LeadsPage.useMemo[kanbanGroups]": (l) => {
                  const s = l.status || "not called";
                  if (groups[s]) groups[s].push(l);
                  else groups[s] = [l];
                },
              }["LeadsPage.useMemo[kanbanGroups]"],
            );
            return groups;
          },
        }["LeadsPage.useMemo[kanbanGroups]"],
        [filtered],
      );
      async function updateLeadStatus(leadId, newStatus) {
        setLeads((prev) =>
          prev.map((l) =>
            String(l._id || l.id) === leadId
              ? {
                  ...l,
                  status: newStatus,
                }
              : l,
          ),
        );
        try {
          await fetch(`/api/leads/${leadId}`, {
            method: "PATCH",
            headers: authH(),
            body: JSON.stringify({
              status: newStatus,
              updatedAt: new Date(),
            }),
          });
        } catch {
          const items = await fetchLeads();
          setLeads(items);
        }
      }
      async function deleteLead(leadId) {
        if (!window.confirm("Delete this lead?")) return;
        try {
          const res = await fetch(`/api/leads/${leadId}`, {
            method: "DELETE",
            headers: authH(),
          });
          if (res.ok) {
            setLeads((prev) =>
              prev.filter((l) => String(l._id || l.id) !== leadId),
            );
            setSelected((prev) => {
              const n = new Set(prev);
              n.delete(leadId);
              return n;
            });
            toast({
              title: "Lead deleted",
            });
          } else {
            toast({
              title: "Delete failed",
              variant: "destructive",
            });
          }
        } catch {
          toast({
            title: "Network error",
            variant: "destructive",
          });
        }
      }
      async function bulkDelete() {
        if (!selected.size) return;
        if (!window.confirm(`Delete ${selected.size} selected leads?`)) return;
        setBulkDeleting(true);
        let deleted = 0;
        for (const id of Array.from(selected)) {
          try {
            const res = await fetch(`/api/leads/${id}`, {
              method: "DELETE",
              headers: authH(),
            });
            if (res.ok) {
              deleted++;
              setLeads((prev) =>
                prev.filter((l) => String(l._id || l.id) !== id),
              );
            }
          } catch {}
        }
        setSelected(new Set());
        setBulkDeleting(false);
        toast({
          title: `Deleted ${deleted} leads`,
        });
      }
      async function bulkAssign(staffId) {
        if (!selected.size || !staffId) return;
        const staffMember = team.find((t) => String(t._id || t.id) === staffId);
        const name = staffMember?.name || "";
        for (const id of Array.from(selected)) {
          try {
            await fetch(`/api/leads/${id}`, {
              method: "PATCH",
              headers: authH(),
              body: JSON.stringify({
                assignedTo: staffId,
                assignedToName: name,
              }),
            });
            setLeads((prev) =>
              prev.map((l) =>
                String(l._id || l.id) === id
                  ? {
                      ...l,
                      assignedTo: staffId,
                      assignedToName: name,
                    }
                  : l,
              ),
            );
          } catch {}
        }
        setSelected(new Set());
        toast({
          title: `Assigned ${selected.size} leads to ${name}`,
        });
      }
      async function bulkStatus(status) {
        if (!selected.size || !status) return;
        for (const id of Array.from(selected)) {
          try {
            await fetch(`/api/leads/${id}`, {
              method: "PATCH",
              headers: authH(),
              body: JSON.stringify({
                status,
              }),
            });
            setLeads((prev) =>
              prev.map((l) =>
                String(l._id || l.id) === id
                  ? {
                      ...l,
                      status: status,
                    }
                  : l,
              ),
            );
          } catch {}
        }
        setSelected(new Set());
        toast({
          title: `Updated ${selected.size} leads to "${status}"`,
        });
      }
      function exportCSV() {
        const rows = [
          [
            "Name",
            "Phone",
            "Email",
            "Subject",
            "Project Type",
            "Budget",
            "Source",
            "Status",
            "Priority",
            "Assigned To",
            "Created",
          ],
          ...filtered.map((l) => [
            l.name,
            l.phone || "",
            l.email || "",
            l.subject || "",
            l.projectType || "",
            String(l.budget || ""),
            l.source || "",
            l.status || "",
            l.priority || "",
            l.assignedToName || "",
            l.createdAt
              ? new Date(l.createdAt).toLocaleDateString("en-IN")
              : "",
          ]),
        ];
        const csv = rows
          .map((r) =>
            r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
          )
          .join("\n");
        const blob = new Blob([csv], {
          type: "text/csv",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "leads.csv";
        a.click();
        URL.revokeObjectURL(url);
        toast({
          title: `Exported ${filtered.length} leads`,
        });
      }
      async function syncMetaAds() {
        if (!window.confirm("Sync leads from Meta Ads?")) return;
        setIsSyncing(true);
        try {
          const res = await fetch("/api/meta-leads");
          const data = await res.json();
          if (res.ok) {
            const items = await fetchLeads();
            setLeads(items);
            toast({
              title: "Meta Ads Sync Complete",
              description: `${data.synced} new leads imported`,
            });
          } else {
            toast({
              title: "Meta Sync Failed",
              description: data.error,
              variant: "destructive",
            });
          }
        } catch {
          toast({
            title: "Meta Sync Error",
            variant: "destructive",
          });
        } finally {
          setIsSyncing(false);
        }
      }
      async function syncIndiaMART() {
        if (!window.confirm("Sync all leads from IndiaMART?")) return;
        setIsSyncing(true);
        try {
          const res = await fetch("/api/indiamart-webhook?action=sync_now");
          const data = await res.json();
          if (res.ok) {
            const items = await fetchLeads();
            setLeads(items);
            toast({
              title: "IndiaMART Sync Complete",
              description: `${data.synced} new leads`,
            });
          } else {
            toast({
              title: "Sync Failed",
              description: data.error,
              variant: "destructive",
            });
          }
        } catch {
          toast({
            title: "Sync Error",
            variant: "destructive",
          });
        } finally {
          setIsSyncing(false);
        }
      }
      function toggleSelect(id) {
        setSelected((prev) => {
          const n = new Set(prev);
          n.has(id) ? n.delete(id) : n.add(id);
          return n;
        });
      }
      function toggleAll() {
        if (selected.size === filtered.length) {
          setSelected(new Set());
        } else {
          setSelected(new Set(filtered.map((l) => String(l._id || l.id))));
        }
      }
      const clearFilters = () => {
        setSearch("");
        setStaffFilter("");
        setStatusFilter("");
        setSourceFilter("");
        setPriorityFilter("");
      };
      const hasFilters =
        search || staffFilter || statusFilter || sourceFilter || priorityFilter;
      return  (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "space-y-5 font-headline",
          children: [
             (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "header",
              {
                className: "flex items-center justify-between gap-4",
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
                            className: "text-5xl font-black tracking-tighter",
                            children: "LEADS",
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 558,
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
                            className: "text-muted-foreground text-lg",
                            children: [
                              filtered.length,
                              " of ",
                              leads.length,
                              " leads",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 559,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 557,
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
                      className:
                        "flex items-center gap-2 flex-wrap justify-end",
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
                            size: "sm",
                            onClick: () =>
                              setView((v) =>
                                v === "table" ? "kanban" : "table",
                              ),
                            className: "border-2 border-black font-bold",
                            children:
                              view === "table"
                                ?  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "Fragment"
                                    ],
                                    {
                                      children: [
                                         (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$kanban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Kanban$3e$__[
                                            "Kanban"
                                          ],
                                          {
                                            className: "w-4 h-4 mr-1",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/leads/page.tsx",
                                            lineNumber: 572,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        " Kanban",
                                      ],
                                    },
                                    void 0,
                                    true,
                                  )
                                :  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "Fragment"
                                    ],
                                    {
                                      children: [
                                         (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutList$3e$__[
                                            "LayoutList"
                                          ],
                                          {
                                            className: "w-4 h-4 mr-1",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/leads/page.tsx",
                                            lineNumber: 576,
                                            columnNumber: 17,
                                          },
                                          this,
                                        ),
                                        " Table",
                                      ],
                                    },
                                    void 0,
                                    true,
                                  ),
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 564,
                            columnNumber: 11,
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
                            variant: "outline",
                            size: "sm",
                            onClick: exportCSV,
                            className: "border-2 border-black font-bold",
                            children: [
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__[
                                  "Download"
                                ],
                                {
                                  className: "w-4 h-4 mr-1",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/leads/page.tsx",
                                  lineNumber: 586,
                                  columnNumber: 13,
                                },
                                this,
                              ),
                              " Export",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 580,
                            columnNumber: 11,
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
                            size: "sm",
                            onClick: syncIndiaMART,
                            disabled: isSyncing,
                            className:
                              "bg-green-600 hover:bg-green-700 text-white border-2 border-black font-bold",
                            children: [
                              isSyncing
                                ?  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__[
                                      "Loader2"
                                    ],
                                    {
                                      className: "w-4 h-4 animate-spin mr-1",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 595,
                                      columnNumber: 15,
                                    },
                                    this,
                                  )
                                :  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__[
                                      "RefreshCw"
                                    ],
                                    {
                                      className: "w-4 h-4 mr-1",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 597,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                              "Sync IndiaMART",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 588,
                            columnNumber: 11,
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
                            size: "sm",
                            onClick: syncMetaAds,
                            disabled: isSyncing,
                            className:
                              "bg-blue-600 hover:bg-blue-700 text-white border-2 border-black font-bold",
                            children: [
                              isSyncing
                                ?  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__[
                                      "Loader2"
                                    ],
                                    {
                                      className: "w-4 h-4 animate-spin mr-1",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 608,
                                      columnNumber: 15,
                                    },
                                    this,
                                  )
                                :  (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__[
                                      "RefreshCw"
                                    ],
                                    {
                                      className: "w-4 h-4 mr-1",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 610,
                                      columnNumber: 15,
                                    },
                                    this,
                                  ),
                              "Sync Meta Ads",
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 601,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 563,
                      columnNumber: 9,
                    },
                    this,
                  ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/app/(crm)/leads/page.tsx",
                lineNumber: 556,
                columnNumber: 7,
              },
              this,
            ),
             (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              AnalyticsStrip,
              {
                leads: leads,
              },
              void 0,
              false,
              {
                fileName: "[project]/src/app/(crm)/leads/page.tsx",
                lineNumber: 618,
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
                className: " gap-4",
                children:  (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  "jsxDEV"
                ])(
                  "div",
                  {
                    className: " border-2 border-black p-4",
                    children: [
                       (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "h3",
                        {
                          className:
                            "text-sm font-bold uppercase tracking-wide mb-3",
                          children: "Pipeline Funnel",
                        },
                        void 0,
                        false,
                        {
                          fileName: "[project]/src/app/(crm)/leads/page.tsx",
                          lineNumber: 624,
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
                          className: "flex w-max gap-auto flex-wrap",
                          children:
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "leadStatuses"
                            ].map((s) => {
                              const count = leads.filter(
                                (l) => (l.status || "not called") === s,
                              ).length;
                              const pct = leads.length
                                ? Math.round((count / leads.length) * 100)
                                : 0;
                              return  (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "button",
                                {
                                  onClick: () =>
                                    setStatusFilter(
                                      statusFilter === s ? "" : s,
                                    ),
                                  className: `flex flex-col items-center border-2 px-3 py-2 min-w-[90px] transition-all ${statusFilter === s ? "border-black bg-black text-white" : "border-gray-200 hover:border-gray-400"}`,
                                  children: [
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className: "text-xl font-black",
                                        children: count,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/leads/page.tsx",
                                        lineNumber: 645,
                                        columnNumber: 19,
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
                                          "text-xs font-medium capitalize text-center leading-tight",
                                        children: s,
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/leads/page.tsx",
                                        lineNumber: 646,
                                        columnNumber: 19,
                                      },
                                      this,
                                    ),
                                     (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className: "text-xs opacity-60",
                                        children: [pct, "%"],
                                      },
                                      void 0,
                                      true,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/leads/page.tsx",
                                        lineNumber: 649,
                                        columnNumber: 19,
                                      },
                                      this,
                                    ),
                                  ],
                                },
                                s,
                                true,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/leads/page.tsx",
                                  lineNumber: 636,
                                  columnNumber: 17,
                                },
                                this,
                              );
                            }),
                        },
                        void 0,
                        false,
                        {
                          fileName: "[project]/src/app/(crm)/leads/page.tsx",
                          lineNumber: 627,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: "[project]/src/app/(crm)/leads/page.tsx",
                    lineNumber: 623,
                    columnNumber: 9,
                  },
                  this,
                ),
              },
              void 0,
              false,
              {
                fileName: "[project]/src/app/(crm)/leads/page.tsx",
                lineNumber: 621,
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
                className: "flex items-center gap-2 flex-wrap",
                children: [
                   (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "div",
                    {
                      className: "relative flex-1 min-w-[200px]",
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__[
                            "Search"
                          ],
                          {
                            className:
                              "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 660,
                            columnNumber: 11,
                          },
                          this,
                        ),
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "Input"
                          ],
                          {
                            placeholder:
                              "Search name, phone, email, subject...",
                            value: search,
                            onChange: (e) => setSearch(e.target.value),
                            className: "pl-9 border-2 border-black",
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 661,
                            columnNumber: 11,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 659,
                      columnNumber: 9,
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
                      variant: "outline",
                      size: "sm",
                      onClick: () => setShowFilters((p) => !p),
                      className: `border-2 font-bold ${showFilters ? "border-black bg-black text-white" : "border-black"}`,
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__[
                            "Filter"
                          ],
                          {
                            className: "w-4 h-4 mr-1",
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 674,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        " Filters",
                        hasFilters &&
                           (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "span",
                            {
                              className:
                                "ml-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center",
                              children: "!",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/app/(crm)/leads/page.tsx",
                              lineNumber: 676,
                              columnNumber: 13,
                            },
                            this,
                          ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 668,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  hasFilters &&
                     (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "Button"
                      ],
                      {
                        variant: "ghost",
                        size: "sm",
                        onClick: clearFilters,
                        className: "text-muted-foreground",
                        children: [
                           (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                              "X"
                            ],
                            {
                              className: "w-4 h-4 mr-1",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/app/(crm)/leads/page.tsx",
                              lineNumber: 688,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          " Clear",
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 682,
                        columnNumber: 11,
                      },
                      this,
                    ),
                ],
              },
              void 0,
              true,
              {
                fileName: "[project]/src/app/(crm)/leads/page.tsx",
                lineNumber: 658,
                columnNumber: 7,
              },
              this,
            ),
            showFilters &&
               (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "div",
                {
                  className:
                    "border-2 border-black p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50",
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
                            "label",
                            {
                              className:
                                "text-xs font-bold mb-1 block uppercase tracking-wide",
                              children: "Staff",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/app/(crm)/leads/page.tsx",
                              lineNumber: 697,
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
                              value: staffFilter,
                              onChange: (e) => setStaffFilter(e.target.value),
                              className:
                                "w-full px-2 py-1.5 rounded-lg border-2 border-black text-sm bg-white",
                              children: [
                                 (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 705,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                team.map((t) =>
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    "option",
                                    {
                                      value: String(t._id || t.id),
                                      children: t.name,
                                    },
                                    String(t._id || t.id),
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 707,
                                      columnNumber: 17,
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
                                "[project]/src/app/(crm)/leads/page.tsx",
                              lineNumber: 700,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 696,
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
                        children: [
                           (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "label",
                            {
                              className:
                                "text-xs font-bold mb-1 block uppercase tracking-wide",
                              children: "Status",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/app/(crm)/leads/page.tsx",
                              lineNumber: 717,
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
                              value: statusFilter,
                              onChange: (e) => setStatusFilter(e.target.value),
                              className:
                                "w-full px-2 py-1.5 rounded-lg border-2 border-black text-sm bg-white",
                              children: [
                                 (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "option",
                                  {
                                    value: "",
                                    children: "All Statuses",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 725,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "leadStatuses"
                                ].map((s) =>
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 727,
                                      columnNumber: 17,
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
                                "[project]/src/app/(crm)/leads/page.tsx",
                              lineNumber: 720,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 716,
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
                        children: [
                           (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "label",
                            {
                              className:
                                "text-xs font-bold mb-1 block uppercase tracking-wide",
                              children: "Source",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/app/(crm)/leads/page.tsx",
                              lineNumber: 734,
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
                              value: sourceFilter,
                              onChange: (e) => setSourceFilter(e.target.value),
                              className:
                                "w-full px-2 py-1.5 rounded-lg border-2 border-black text-sm bg-white",
                              children: [
                                 (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "option",
                                  {
                                    value: "",
                                    children: "All Sources",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 742,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                allSources.map((s) =>
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 744,
                                      columnNumber: 17,
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
                                "[project]/src/app/(crm)/leads/page.tsx",
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
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 733,
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
                        children: [
                           (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "label",
                            {
                              className:
                                "text-xs font-bold mb-1 block uppercase tracking-wide",
                              children: "Priority",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/app/(crm)/leads/page.tsx",
                              lineNumber: 751,
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
                              value: priorityFilter,
                              onChange: (e) =>
                                setPriorityFilter(e.target.value),
                              className:
                                "w-full px-2 py-1.5 rounded-lg border-2 border-black text-sm bg-white",
                              children: [
                                 (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "option",
                                  {
                                    value: "",
                                    children: "All Priorities",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 759,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                 (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "option",
                                  {
                                    value: "high",
                                    children: "High",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 760,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                 (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "option",
                                  {
                                    value: "medium",
                                    children: "Medium",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 761,
                                    columnNumber: 15,
                                  },
                                  this,
                                ),
                                 (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "option",
                                  {
                                    value: "low",
                                    children: "Low",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 762,
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
                                "[project]/src/app/(crm)/leads/page.tsx",
                              lineNumber: 754,
                              columnNumber: 13,
                            },
                            this,
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 750,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName: "[project]/src/app/(crm)/leads/page.tsx",
                  lineNumber: 695,
                  columnNumber: 9,
                },
                this,
              ),
            selected.size > 0 &&
               (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "div",
                {
                  className:
                    "border-2 border-black bg-black text-white px-4 py-3 flex items-center gap-3 flex-wrap",
                  children: [
                     (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "span",
                      {
                        className: "font-bold text-sm",
                        children: [selected.size, " selected"],
                      },
                      void 0,
                      true,
                      {
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 771,
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
                        className: "flex-1",
                      },
                      void 0,
                      false,
                      {
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 772,
                        columnNumber: 11,
                      },
                      this,
                    ),
                     (0,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "jsxDEV"
                    ])(
                      "select",
                      {
                        onChange: (e) => {
                          if (e.target.value) {
                            bulkStatus(e.target.value);
                            e.target.value = "";
                          }
                        },
                        className:
                          "px-2 py-1.5 rounded-lg border border-white/30 bg-white/10 text-white text-sm",
                        children: [
                           (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "option",
                            {
                              value: "",
                              children: "Change Status…",
                            },
                            void 0,
                            false,
                            {
                              fileName:
                                "[project]/src/app/(crm)/leads/page.tsx",
                              lineNumber: 782,
                              columnNumber: 13,
                            },
                            this,
                          ),
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "leadStatuses"
                          ].map((s) =>
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                  "[project]/src/app/(crm)/leads/page.tsx",
                                lineNumber: 784,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 773,
                        columnNumber: 11,
                      },
                      this,
                    ),
                    role === "admin" &&
                       (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "select",
                        {
                          onChange: (e) => {
                            if (e.target.value) {
                              bulkAssign(e.target.value);
                              e.target.value = "";
                            }
                          },
                          className:
                            "px-2 py-1.5 rounded-lg border border-white/30 bg-white/10 text-white text-sm",
                          children: [
                             (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              "option",
                              {
                                value: "",
                                children: "Assign to…",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/leads/page.tsx",
                                lineNumber: 799,
                                columnNumber: 15,
                              },
                              this,
                            ),
                            team.map((t) =>
                               (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                "option",
                                {
                                  value: String(t._id || t.id),
                                  children: t.name,
                                },
                                String(t._id || t.id),
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/leads/page.tsx",
                                  lineNumber: 801,
                                  columnNumber: 17,
                                },
                                this,
                              ),
                            ),
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName: "[project]/src/app/(crm)/leads/page.tsx",
                          lineNumber: 790,
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
                        size: "sm",
                        variant: "destructive",
                        onClick: bulkDelete,
                        disabled: bulkDeleting,
                        className: "border border-white/30",
                        children: [
                          bulkDeleting
                            ?  (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__[
                                  "Loader2"
                                ],
                                {
                                  className: "w-3 h-3 animate-spin mr-1",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/leads/page.tsx",
                                  lineNumber: 818,
                                  columnNumber: 15,
                                },
                                this,
                              )
                            :  (0,
                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "jsxDEV"
                              ])(
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__[
                                  "Trash"
                                ],
                                {
                                  className: "w-3 h-3 mr-1",
                                },
                                void 0,
                                false,
                                {
                                  fileName:
                                    "[project]/src/app/(crm)/leads/page.tsx",
                                  lineNumber: 820,
                                  columnNumber: 15,
                                },
                                this,
                              ),
                          "Delete",
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 810,
                        columnNumber: 11,
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
                        size: "sm",
                        variant: "ghost",
                        onClick: () => setSelected(new Set()),
                        className: "text-white hover:bg-white/10",
                        children:  (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__[
                            "X"
                          ],
                          {
                            className: "w-3 h-3",
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 830,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName: "[project]/src/app/(crm)/leads/page.tsx",
                        lineNumber: 824,
                        columnNumber: 11,
                      },
                      this,
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName: "[project]/src/app/(crm)/leads/page.tsx",
                  lineNumber: 770,
                  columnNumber: 9,
                },
                this,
              ),
            loading &&
               (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "div",
                {
                  className: "flex items-center justify-center py-16",
                  children:  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__[
                      "Loader2"
                    ],
                    {
                      className: "animate-spin w-8 h-8 text-muted-foreground",
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 838,
                      columnNumber: 11,
                    },
                    this,
                  ),
                },
                void 0,
                false,
                {
                  fileName: "[project]/src/app/(crm)/leads/page.tsx",
                  lineNumber: 837,
                  columnNumber: 9,
                },
                this,
              ),
            !loading &&
              view === "table" &&
               (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "div",
                {
                  className: "border-2 border-black overflow-hidden",
                  children:  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "Table"
                    ],
                    {
                      children: [
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "TableHeader"
                          ],
                          {
                            children:  (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "TableRow"
                              ],
                              {
                                className: "border-b-2 border-black bg-gray-50",
                                children: [
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableHead"
                                    ],
                                    {
                                      className: "w-10",
                                      children:  (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        "input",
                                        {
                                          type: "checkbox",
                                          checked:
                                            filtered.length > 0 &&
                                            selected.size === filtered.length,
                                          onChange: toggleAll,
                                          className:
                                            "w-4 h-4 border-2 border-black rounded",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/leads/page.tsx",
                                          lineNumber: 849,
                                          columnNumber: 19,
                                        },
                                        this,
                                      ),
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 848,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableHead"
                                    ],
                                    {
                                      className: "font-bold",
                                      children: "Name",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 858,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableHead"
                                    ],
                                    {
                                      className: "font-bold",
                                      children: "Contact",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 859,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableHead"
                                    ],
                                    {
                                      className: "font-bold",
                                      children: "Project / Budget",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 860,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableHead"
                                    ],
                                    {
                                      className: "font-bold",
                                      children: "Source",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 861,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableHead"
                                    ],
                                    {
                                      className: "font-bold",
                                      children: "Assigned",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 862,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableHead"
                                    ],
                                    {
                                      className: "font-bold",
                                      children: "Priority",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 863,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableHead"
                                    ],
                                    {
                                      className: "font-bold",
                                      children: "Follow-up",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 864,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableHead"
                                    ],
                                    {
                                      className: "font-bold",
                                      children: "Status",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 865,
                                      columnNumber: 17,
                                    },
                                    this,
                                  ),
                                   (0,
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "jsxDEV"
                                  ])(
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "TableHead"
                                    ],
                                    {
                                      className: "font-bold text-right",
                                      children: "Actions",
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName:
                                        "[project]/src/app/(crm)/leads/page.tsx",
                                      lineNumber: 866,
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
                                  "[project]/src/app/(crm)/leads/page.tsx",
                                lineNumber: 847,
                                columnNumber: 15,
                              },
                              this,
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 846,
                            columnNumber: 13,
                          },
                          this,
                        ),
                         (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "TableBody"
                          ],
                          {
                            children: [
                              filtered.length === 0 &&
                                 (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableRow"
                                  ],
                                  {
                                    children:  (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "TableCell"
                                      ],
                                      {
                                        colSpan: 10,
                                        className:
                                          "text-center py-12 text-muted-foreground",
                                        children:
                                          "No leads match your filters.",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/leads/page.tsx",
                                        lineNumber: 872,
                                        columnNumber: 19,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 871,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                              filtered.map((lead) => {
                                const id = String(lead._id || lead.id);
                                const overdueFlag = isOverdue(
                                  lead.followUpDate,
                                );
                                return  (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableRow"
                                  ],
                                  {
                                    className: `border-b-2 border-black last:border-b-0 hover:bg-gray-50 transition-colors ${selected.has(id) ? "bg-blue-50" : ""}`,
                                    children: [
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          onClick: (e) => e.stopPropagation(),
                                          children:  (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "input",
                                            {
                                              type: "checkbox",
                                              checked: selected.has(id),
                                              onChange: () => toggleSelect(id),
                                              className:
                                                "w-4 h-4 border-2 border-black rounded",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/leads/page.tsx",
                                              lineNumber: 889,
                                              columnNumber: 23,
                                            },
                                            this,
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/leads/page.tsx",
                                          lineNumber: 888,
                                          columnNumber: 21,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          className: "font-bold",
                                          children: [
                                             (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "default"
                                              ],
                                              {
                                                href: `/leads/${id}`,
                                                className:
                                                  "hover:underline flex items-center gap-1",
                                                children: [
                                                  lead.name,
                                                   (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__[
                                                      "ChevronRight"
                                                    ],
                                                    {
                                                      className:
                                                        "w-3 h-3 opacity-40",
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/leads/page.tsx",
                                                      lineNumber: 902,
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
                                                  "[project]/src/app/(crm)/leads/page.tsx",
                                                lineNumber: 897,
                                                columnNumber: 23,
                                              },
                                              this,
                                            ),
                                            lead.doNotDelete &&
                                               (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "span",
                                                {
                                                  className:
                                                    "text-xs text-orange-600 flex items-center gap-0.5",
                                                  children: [
                                                     (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__[
                                                        "AlertTriangle"
                                                      ],
                                                      {
                                                        className: "w-3 h-3",
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/app/(crm)/leads/page.tsx",
                                                        lineNumber: 906,
                                                        columnNumber: 27,
                                                      },
                                                      this,
                                                    ),
                                                    " protected",
                                                  ],
                                                },
                                                void 0,
                                                true,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/leads/page.tsx",
                                                  lineNumber: 905,
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
                                            "[project]/src/app/(crm)/leads/page.tsx",
                                          lineNumber: 896,
                                          columnNumber: 21,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          children:  (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className: "space-y-0.5",
                                              children: [
                                                lead.phone &&
                                                   (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    "div",
                                                    {
                                                      className:
                                                        "text-sm flex items-center gap-1",
                                                      children: [
                                                         (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__[
                                                            "Phone"
                                                          ],
                                                          {
                                                            className:
                                                              "w-3 h-3 opacity-50",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/app/(crm)/leads/page.tsx",
                                                            lineNumber: 914,
                                                            columnNumber: 29,
                                                          },
                                                          this,
                                                        ),
                                                        lead.phone,
                                                      ],
                                                    },
                                                    void 0,
                                                    true,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/leads/page.tsx",
                                                      lineNumber: 913,
                                                      columnNumber: 27,
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
                                                        "text-xs text-muted-foreground flex items-center gap-1 max-w-[160px] truncate",
                                                      children: [
                                                         (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__[
                                                            "Mail"
                                                          ],
                                                          {
                                                            className:
                                                              "w-3 h-3 opacity-50 flex-shrink-0",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/app/(crm)/leads/page.tsx",
                                                            lineNumber: 920,
                                                            columnNumber: 29,
                                                          },
                                                          this,
                                                        ),
                                                        lead.email,
                                                      ],
                                                    },
                                                    void 0,
                                                    true,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/leads/page.tsx",
                                                      lineNumber: 919,
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
                                                "[project]/src/app/(crm)/leads/page.tsx",
                                              lineNumber: 911,
                                              columnNumber: 23,
                                            },
                                            this,
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/leads/page.tsx",
                                          lineNumber: 910,
                                          columnNumber: 21,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          children: [
                                             (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                              "jsxDEV"
                                            ])(
                                              "div",
                                              {
                                                className: "text-sm",
                                                children:
                                                  lead.projectType ||
                                                  lead.subject ||
                                                  "—",
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  "[project]/src/app/(crm)/leads/page.tsx",
                                                lineNumber: 927,
                                                columnNumber: 23,
                                              },
                                              this,
                                            ),
                                            lead.budget &&
                                               (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "div",
                                                {
                                                  className:
                                                    "text-xs font-bold text-green-700",
                                                  children: ["₹", lead.budget],
                                                },
                                                void 0,
                                                true,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/leads/page.tsx",
                                                  lineNumber: 931,
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
                                            "[project]/src/app/(crm)/leads/page.tsx",
                                          lineNumber: 926,
                                          columnNumber: 21,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          children:  (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "span",
                                            {
                                              className:
                                                "text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200",
                                              children:
                                                lead.source || "Unknown",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/leads/page.tsx",
                                              lineNumber: 937,
                                              columnNumber: 23,
                                            },
                                            this,
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/leads/page.tsx",
                                          lineNumber: 936,
                                          columnNumber: 21,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          className: "text-sm",
                                          children: lead.assignedToName || "—",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/leads/page.tsx",
                                          lineNumber: 941,
                                          columnNumber: 21,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          children: lead.priority
                                            ?  (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "span",
                                                {
                                                  className: `text-xs px-2 py-1 rounded-full border font-medium ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priorityColors"][lead.priority] || ""}`,
                                                  children: lead.priority,
                                                },
                                                void 0,
                                                false,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/leads/page.tsx",
                                                  lineNumber: 946,
                                                  columnNumber: 25,
                                                },
                                                this,
                                              )
                                            : "—",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/leads/page.tsx",
                                          lineNumber: 944,
                                          columnNumber: 21,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          children: lead.followUpDate
                                            ?  (0,
                                              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                "jsxDEV"
                                              ])(
                                                "span",
                                                {
                                                  className: `text-xs flex items-center gap-1 ${overdueFlag ? "text-red-600 font-bold" : "text-muted-foreground"}`,
                                                  children: [
                                                     (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__[
                                                        "Calendar"
                                                      ],
                                                      {
                                                        className: "w-3 h-3",
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/app/(crm)/leads/page.tsx",
                                                        lineNumber: 960,
                                                        columnNumber: 27,
                                                      },
                                                      this,
                                                    ),
                                                    formatDate(
                                                      lead.followUpDate,
                                                    ),
                                                    overdueFlag &&
                                                       (0,
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "jsxDEV"
                                                      ])(
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__[
                                                          "AlertTriangle"
                                                        ],
                                                        {
                                                          className: "w-3 h-3",
                                                        },
                                                        void 0,
                                                        false,
                                                        {
                                                          fileName:
                                                            "[project]/src/app/(crm)/leads/page.tsx",
                                                          lineNumber: 962,
                                                          columnNumber: 43,
                                                        },
                                                        this,
                                                      ),
                                                  ],
                                                },
                                                void 0,
                                                true,
                                                {
                                                  fileName:
                                                    "[project]/src/app/(crm)/leads/page.tsx",
                                                  lineNumber: 957,
                                                  columnNumber: 25,
                                                },
                                                this,
                                              )
                                            : "—",
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/leads/page.tsx",
                                          lineNumber: 955,
                                          columnNumber: 21,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          children:  (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "select",
                                            {
                                              value:
                                                lead.status || "not called",
                                              onChange: (e) =>
                                                updateLeadStatus(
                                                  id,
                                                  e.target.value,
                                                ),
                                              onClick: (e) =>
                                                e.stopPropagation(),
                                              className: `px-2 py-1 rounded-lg border-2 border-black text-xs font-bold ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["leadStatusColors"][lead.status || "not called"] || "bg-gray-100"}`,
                                              children:
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "leadStatuses"
                                                ].map((s) =>
                                                   (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                                        "[project]/src/app/(crm)/leads/page.tsx",
                                                      lineNumber: 976,
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
                                                "[project]/src/app/(crm)/leads/page.tsx",
                                              lineNumber: 969,
                                              columnNumber: 23,
                                            },
                                            this,
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/leads/page.tsx",
                                          lineNumber: 968,
                                          columnNumber: 21,
                                        },
                                        this,
                                      ),
                                       (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "TableCell"
                                        ],
                                        {
                                          className: "text-right",
                                          children:  (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "flex items-center gap-1 justify-end",
                                              children: [
                                                 (0,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                  "jsxDEV"
                                                ])(
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "default"
                                                  ],
                                                  {
                                                    href: `/leads/${id}`,
                                                    children:  (0,
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      "jsxDEV"
                                                    ])(
                                                      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                        "Button"
                                                      ],
                                                      {
                                                        variant: "ghost",
                                                        size: "icon",
                                                        className: "h-7 w-7",
                                                        children:
                                                           (0,
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                            "jsxDEV"
                                                          ])(
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__[
                                                              "Eye"
                                                            ],
                                                            {
                                                              className:
                                                                "w-3.5 h-3.5",
                                                            },
                                                            void 0,
                                                            false,
                                                            {
                                                              fileName:
                                                                "[project]/src/app/(crm)/leads/page.tsx",
                                                              lineNumber: 990,
                                                              columnNumber: 29,
                                                            },
                                                            this,
                                                          ),
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          "[project]/src/app/(crm)/leads/page.tsx",
                                                        lineNumber: 985,
                                                        columnNumber: 27,
                                                      },
                                                      this,
                                                    ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      "[project]/src/app/(crm)/leads/page.tsx",
                                                    lineNumber: 984,
                                                    columnNumber: 25,
                                                  },
                                                  this,
                                                ),
                                                role === "admin" &&
                                                   (0,
                                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                    "jsxDEV"
                                                  ])(
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                      "Button"
                                                    ],
                                                    {
                                                      variant: "ghost",
                                                      size: "icon",
                                                      className:
                                                        "h-7 w-7 text-red-500 hover:text-red-700",
                                                      onClick: () =>
                                                        deleteLead(id),
                                                      children:
                                                         (0,
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                                          "jsxDEV"
                                                        ])(
                                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__[
                                                            "Trash"
                                                          ],
                                                          {
                                                            className:
                                                              "w-3.5 h-3.5",
                                                          },
                                                          void 0,
                                                          false,
                                                          {
                                                            fileName:
                                                              "[project]/src/app/(crm)/leads/page.tsx",
                                                            lineNumber: 1000,
                                                            columnNumber: 29,
                                                          },
                                                          this,
                                                        ),
                                                    },
                                                    void 0,
                                                    false,
                                                    {
                                                      fileName:
                                                        "[project]/src/app/(crm)/leads/page.tsx",
                                                      lineNumber: 994,
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
                                                "[project]/src/app/(crm)/leads/page.tsx",
                                              lineNumber: 983,
                                              columnNumber: 23,
                                            },
                                            this,
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/src/app/(crm)/leads/page.tsx",
                                          lineNumber: 982,
                                          columnNumber: 21,
                                        },
                                        this,
                                      ),
                                    ],
                                  },
                                  id,
                                  true,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 884,
                                    columnNumber: 19,
                                  },
                                  this,
                                );
                              }),
                            ],
                          },
                          void 0,
                          true,
                          {
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 869,
                            columnNumber: 13,
                          },
                          this,
                        ),
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 845,
                      columnNumber: 11,
                    },
                    this,
                  ),
                },
                void 0,
                false,
                {
                  fileName: "[project]/src/app/(crm)/leads/page.tsx",
                  lineNumber: 844,
                  columnNumber: 9,
                },
                this,
              ),
            !loading &&
              view === "kanban" &&
               (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "div",
                {
                  className: "flex gap-4 overflow-x-auto pb-4",
                  children:
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "leadStatuses"
                    ].map((status) => {
                      const cards = kanbanGroups[status] || [];
                      const statusColor =
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "leadStatusColors"
                        ][status] || "bg-gray-100";
                      return  (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "flex-shrink-0 w-72",
                          children:  (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            "div",
                            {
                              className: `border-2 border-black overflow-hidden`,
                              children: [
                                 (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  "div",
                                  {
                                    className: `px-3 py-2 border-b-2 border-black ${statusColor}`,
                                    children:  (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "div",
                                      {
                                        className:
                                          "flex items-center justify-between",
                                        children: [
                                           (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "span",
                                            {
                                              className:
                                                "text-xs font-black uppercase tracking-wide",
                                              children: status,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/leads/page.tsx",
                                              lineNumber: 1026,
                                              columnNumber: 23,
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
                                                "text-xs font-bold bg-white border border-black rounded-full w-6 h-6 flex items-center justify-center",
                                              children: cards.length,
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/leads/page.tsx",
                                              lineNumber: 1029,
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
                                          "[project]/src/app/(crm)/leads/page.tsx",
                                        lineNumber: 1025,
                                        columnNumber: 21,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 1022,
                                    columnNumber: 19,
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
                                      "p-2 space-y-2 min-h-[100px] bg-gray-50",
                                    children: [
                                      cards.map((lead) =>
                                         (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          KanbanCard,
                                          {
                                            lead: lead,
                                            onStatusChange: updateLeadStatus,
                                            onDelete: deleteLead,
                                            role: role,
                                          },
                                          String(lead._id || lead.id),
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/leads/page.tsx",
                                            lineNumber: 1036,
                                            columnNumber: 23,
                                          },
                                          this,
                                        ),
                                      ),
                                      cards.length === 0 &&
                                         (0,
                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "jsxDEV"
                                        ])(
                                          "p",
                                          {
                                            className:
                                              "text-xs text-center text-muted-foreground py-4",
                                            children: "Empty",
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              "[project]/src/app/(crm)/leads/page.tsx",
                                            lineNumber: 1045,
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
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 1034,
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
                                "[project]/src/app/(crm)/leads/page.tsx",
                              lineNumber: 1021,
                              columnNumber: 17,
                            },
                            this,
                          ),
                        },
                        status,
                        false,
                        {
                          fileName: "[project]/src/app/(crm)/leads/page.tsx",
                          lineNumber: 1020,
                          columnNumber: 15,
                        },
                        this,
                      );
                    }),
                },
                void 0,
                false,
                {
                  fileName: "[project]/src/app/(crm)/leads/page.tsx",
                  lineNumber: 1015,
                  columnNumber: 9,
                },
                this,
              ),
          ],
        },
        void 0,
        true,
        {
          fileName: "[project]/src/app/(crm)/leads/page.tsx",
          lineNumber: 554,
          columnNumber: 5,
        },
        this,
      );
    }
    _s1(LeadsPage, "cOghbWBJ+0YSxhGWr7L66YQORVo=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useRouter"
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useToast"
        ],
      ];
    });
    _c2 = LeadsPage;
    var _c, _c1, _c2;
    __turbopack_context__.k.register(_c, "KanbanCard");
    __turbopack_context__.k.register(_c1, "AnalyticsStrip");
    __turbopack_context__.k.register(_c2, "LeadsPage");
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


