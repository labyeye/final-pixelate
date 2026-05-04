(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === "object" ? document.currentScript : undefined,
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/constants.ts [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["leadStatuses", () => leadStatuses]);
    const leadStatuses = [
      "not called",
      "called",
      "not interested",
      "meeting booked",
      "interested",
      "call back later",
      "other",
    ];
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/table.tsx [app-client] (ecmascript)",
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
    const Table =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c = ({ className, ...props }, ref) =>
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "div",
            {
              className: "relative w-full overflow-auto",
              children: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "jsxDEV"
              ])(
                "table",
                {
                  ref: ref,
                  className: (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c1 = Table;
    Table.displayName = "Table";
    const TableHeader =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c2 = ({ className, ...props }, ref) =>
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "thead",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c3 = TableHeader;
    TableHeader.displayName = "TableHeader";
    const TableBody =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c4 = ({ className, ...props }, ref) =>
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "tbody",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c5 = TableBody;
    TableBody.displayName = "TableBody";
    const TableFooter =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c6 = ({ className, ...props }, ref) =>
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "tfoot",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c7 = TableFooter;
    TableFooter.displayName = "TableFooter";
    const TableRow =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c8 = ({ className, ...props }, ref) =>
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "tr",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c9 = TableRow;
    TableRow.displayName = "TableRow";
    const TableHead =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c10 = ({ className, ...props }, ref) =>
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "th",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c11 = TableHead;
    TableHead.displayName = "TableHead";
    const TableCell =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c12 = ({ className, ...props }, ref) =>
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "td",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
          )),
      );
    _c13 = TableCell;
    TableCell.displayName = "TableCell";
    const TableCaption =
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "forwardRef"
      ](
        (_c14 = ({ className, ...props }, ref) =>
          (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            "jsxDEV"
          ])(
            "caption",
            {
              ref: ref,
              className: (0,
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => LeadsPage]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/constants.ts [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/button.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/components/ui/table.tsx [app-client] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript) <export default as Trash>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/hooks/use-toast.ts [app-client] (ecmascript)",
      );
    var _s = __turbopack_context__.k.signature();
    ("use client");
    function LeadsPage() {
      _s();
      const [leads, setLeads] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [team, setTeam] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [staffFilter, setStaffFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [statusFilter, setStatusFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [isDeletingAssigned, setIsDeletingAssigned] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [deleteProgress, setDeleteProgress] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useState"
      ])({
        current: 0,
        total: 0,
      });
      const { toast } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useToast"
      ])();
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(
        {
          "LeadsPage.useEffect": () => {
            let mounted = true;
            ({
              "LeadsPage.useEffect": async () => {
                try {
                  const items = await fetchLeadsWithAuth();
                  if (mounted) setLeads(items);

                  const t = await fetch("/api/team-members");
                  const tm = await t.json();
                  if (mounted) setTeam(tm || []);
                } catch (err) {
                  console.error("Failed to load leads/team", err);
                }
              },
            })["LeadsPage.useEffect"]();
            return {
              "LeadsPage.useEffect": () => {
                mounted = false;
              },
            }["LeadsPage.useEffect"];
          },
        }["LeadsPage.useEffect"],
        [],
      );

      async function fetchLeadsWithAuth() {
        try {
          const token = localStorage.getItem("auth_token") || "";
          const res = await fetch("/api/leads", {
            headers: token
              ? {
                  Authorization: "Bearer " + token,
                }
              : {},
          });
          if (!res.ok) {
            console.warn("fetchLeadsWithAuth: server returned", res.status);

            return [];
          }
          const data = await res.json();
          if (!Array.isArray(data)) return [];
          return data;
        } catch (e) {
          console.error("fetchLeadsWithAuth error", e);
          return [];
        }
      }

      async function deleteAllLeads() {
        if (!window.confirm("Delete ALL leads? This cannot be undone.")) return;
        const API_BASE =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
            ? "https://backend.pixelatenest.com"
            : "";
        const token = localStorage.getItem("auth_token") || "";
        try {
          const res = await fetch(API_BASE + "/api/leads", {
            method: "DELETE",
            headers: token
              ? {
                  Authorization: "Bearer " + token,
                }
              : {},
          });
          if (res.ok) {
            setLeads([]);
            localStorage.removeItem("leads_local");
            toast({
              title: "All Leads Deleted",
              description: "All leads deleted successfully (server).",
            });
            return;
          }
        } catch (e) {
          console.warn("Bulk delete not available or failed, falling back", e);
        }
        try {
          const list = await fetchLeadsWithAuth();
          for (const l of list) {
            try {
              await fetch("/api/leads/" + String(l._id || l.id), {
                method: "DELETE",
                headers: token
                  ? {
                      Authorization: "Bearer " + token,
                    }
                  : {},
              });
            } catch (er) {}
          }
          setLeads([]);
          localStorage.removeItem("leads_local");
          toast({
            title: "All Leads Deleted",
            description: "All leads deleted (per-item).",
          });
        } catch (e) {
          console.error("Failed to delete leads", e);
          toast({
            title: "Delete Failed",
            description: "Failed to delete all leads.",
            variant: "destructive",
          });
        }
      }

      async function deleteLeadsForStaff(staffId) {
        if (!staffId) {
          toast({
            title: "No Staff Selected",
            description: "Choose a staff member first.",
            variant: "destructive",
          });
          return;
        }
        if (
          !window.confirm(
            "Delete ALL leads assigned to this staff member? This cannot be undone.",
          )
        )
          return;
        const API_BASE =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
            ? "https://backend.pixelatenest.com"
            : "";
        const token = localStorage.getItem("auth_token") || "";
        try {
          const allLeads = await fetchLeadsWithAuth();
          const toDelete = allLeads.filter(
            (l) => String(l.assignedTo) === String(staffId),
          );
          if (!toDelete.length) {
            toast({
              title: "No Leads Found",
              description: "No leads assigned to this staff member.",
              variant: "destructive",
            });
            return;
          }
          setIsDeletingAssigned(true);
          setDeleteProgress({
            current: 0,
            total: toDelete.length,
          });
          for (const l of toDelete) {
            try {
              const res = await fetch(
                API_BASE + "/api/leads/" + String(l._id || l.id),
                {
                  method: "DELETE",
                  headers: token
                    ? {
                        Authorization: "Bearer " + token,
                      }
                    : {},
                },
              );

              if (!res.ok) {
                throw new Error("Server returned " + res.status);
              }
            } catch (e) {
              console.error("Failed to delete lead", l, e);
            } finally {
              setDeleteProgress((p) => ({
                current: Math.min(p.total, p.current + 1),
                total: p.total,
              }));
            }
          }

          try {
            const list = await fetchLeadsWithAuth();
            setLeads(list || []);
          } catch (er) {}
          toast({
            title: "Assigned Leads Deleted",
            description: "Deletion of assigned leads completed.",
          });
        } catch (e) {
          console.error("deleteLeadsForStaff failed", e);
          toast({
            title: "Delete Failed",
            description:
              "Failed to delete assigned leads: " +
              (e instanceof Error ? e.message : String(e)),
            variant: "destructive",
          });
        } finally {
          setIsDeletingAssigned(false);
          setDeleteProgress({
            current: 0,
            total: 0,
          });
          setStaffFilter("");
        }
      }
      async function deleteLead(leadId) {
        if (!leadId) return;
        const API_BASE =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
            ? "https://backend.pixelatenest.com"
            : "";
        try {
          const token = localStorage.getItem("auth_token") || "";
          let decoded = null;
          try {
            if (token) decoded = JSON.parse(atob(token.split(".")[1]));
          } catch (e) {
            decoded = null;
          }

          if (decoded && decoded.role === "admin") {
            const res = await fetch(API_BASE + "/api/leads/" + String(leadId), {
              method: "DELETE",
              headers: token
                ? {
                    Authorization: "Bearer " + token,
                  }
                : {},
            });
            if (res.ok) {
              setLeads(
                leads.filter((l) => String(l._id || l.id) !== String(leadId)),
              );
              alert("Deleted from DB");
              return;
            }
          }

          const note =
            prompt(
              "You are not allowed to permanently delete leads. Enter a short note to mark this lead as not deletable:",
            ) || "";
          await fetch(API_BASE + "/api/leads/" + String(leadId), {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              ...(token
                ? {
                    Authorization: "Bearer " + token,
                  }
                : {}),
            },
            body: JSON.stringify({
              doNotDelete: true,
              reason: note,
            }),
          });
          setLeads(
            leads.map((l) =>
              String(l._id || l.id) === String(leadId)
                ? {
                    ...l,
                    doNotDelete: true,
                    reason: note,
                  }
                : l,
            ),
          );
          alert("Marked as not deletable");
        } catch (e) {
          console.error("Delete failed", e);

          setLeads(
            leads.filter((l) => String(l._id || l.id) !== String(leadId)),
          );
          alert("Deleted locally (server may be unreachable)");
        }
      }
      async function updateLeadStatus(leadId, newStatus) {
        if (!leadId) return;

        const reason =
          prompt("Optional: enter a reason for this status change") || "";

        setLeads((l) =>
          l.map((x) =>
            String(x._id || x.id) === String(leadId)
              ? {
                  ...x,
                  status: newStatus,
                  statusReason: reason,
                }
              : x,
          ),
        );
        const API_BASE =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1"
            ? "https://backend.pixelatenest.com"
            : "";
        const token = localStorage.getItem("auth_token") || "";
        try {
          const res = await fetch(API_BASE + "/api/leads/" + String(leadId), {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              ...(token
                ? {
                    Authorization: "Bearer " + token,
                  }
                : {}),
            },
            body: JSON.stringify({
              status: newStatus,
              statusReason: reason,
            }),
          });
          if (!res.ok) {
            try {
              const list = await fetchLeadsWithAuth();
              setLeads(list || []);
            } catch (er) {}
            alert("Failed to update status on server");
          }
        } catch (e) {
          console.error("Status update failed", e);

          try {
            const token = localStorage.getItem("auth_token") || "";
            const list = await (
              await fetch("/api/leads", {
                headers: token
                  ? {
                      Authorization: "Bearer " + token,
                    }
                  : {},
              })
            ).json();
            setLeads(list || []);
          } catch (er) {}
          alert("Network error while updating status");
        }
      }
      return (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        "jsxDEV"
      ])(
        "div",
        {
          className: "space-y-6",
          children: [
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "header",
              {
                children: [
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "h1",
                    {
                      className: "text-3xl font-bold",
                      children: "Leads (Table)",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                      lineNumber: 299,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "p",
                    {
                      className: "text-sm text-muted-foreground",
                      children: "View and manage your leads.",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                      lineNumber: 300,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                lineNumber: 298,
                columnNumber: 7,
              },
              this,
            ),
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              "div",
              {
                className: "flex items-center gap-4",
                children: [
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "label",
                    {
                      className: "text-sm",
                      children: "Filter by staff:",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                      lineNumber: 306,
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
                      value: staffFilter,
                      onChange: (e) => setStaffFilter(e.target.value),
                      className: "px-2 py-1 rounded-md bg-background border",
                      children: [
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "option",
                          {
                            value: "",
                            children: "-- Select staff --",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                            lineNumber: 312,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        team.map((t) =>
                          (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                              lineNumber: 314,
                              columnNumber: 13,
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
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                      lineNumber: 307,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "label",
                    {
                      className: "text-sm",
                      children: "Filter by status:",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                      lineNumber: 319,
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
                      value: statusFilter,
                      onChange: (e) => setStatusFilter(e.target.value),
                      className: "px-2 py-1 rounded-md bg-background border",
                      children: [
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "jsxDEV"
                        ])(
                          "option",
                          {
                            value: "",
                            children: "-- Any status --",
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                            lineNumber: 325,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "leadStatuses"
                        ].map((s) =>
                          (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                              lineNumber: 327,
                              columnNumber: 13,
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
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                      lineNumber: 320,
                      columnNumber: 9,
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
                      variant: "destructive",
                      onClick: () => deleteLeadsForStaff(staffFilter),
                      disabled: !staffFilter || isDeletingAssigned,
                      children: "Delete leads for selected staff",
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                      lineNumber: 332,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  isDeletingAssigned
                    ? (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        "div",
                        {
                          className: "text-sm",
                          children: [
                            "Deleting ",
                            deleteProgress.current,
                            "/",
                            deleteProgress.total,
                            "...",
                          ],
                        },
                        void 0,
                        true,
                        {
                          fileName:
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                          lineNumber: 340,
                          columnNumber: 11,
                        },
                        this,
                      )
                    : null,
                ],
              },
              void 0,
              true,
              {
                fileName:
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                lineNumber: 305,
                columnNumber: 7,
              },
              this,
            ),
            (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              "jsxDEV"
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "Table"
              ],
              {
                children: [
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "TableHeader"
                    ],
                    {
                      children: (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          "TableRow"
                        ],
                        {
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "TableHead"
                              ],
                              {
                                children: "Name",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                lineNumber: 349,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "TableHead"
                              ],
                              {
                                children: "Category",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                lineNumber: 350,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "TableHead"
                              ],
                              {
                                children: "Phone",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                lineNumber: 351,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "TableHead"
                              ],
                              {
                                children: "Email",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                lineNumber: 352,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "TableHead"
                              ],
                              {
                                children: "Assigned",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                lineNumber: 353,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "TableHead"
                              ],
                              {
                                children: "Status",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                lineNumber: 354,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "TableHead"
                              ],
                              {
                                children: "Status Reason",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                lineNumber: 355,
                                columnNumber: 13,
                              },
                              this,
                            ),
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                "TableHead"
                              ],
                              {
                                children: "Actions",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                lineNumber: 356,
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
                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                          lineNumber: 348,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName:
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                      lineNumber: 347,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                      "TableBody"
                    ],
                    {
                      children: leads
                        .filter((l) => {
                          if (staffFilter) {
                            if (
                              String(l.assignedTo || l.assignedToName) !==
                              String(staffFilter)
                            )
                              return false;
                          }

                          if (statusFilter) {
                            if (String(l.status || "") !== String(statusFilter))
                              return false;
                          }
                          return true;
                        })
                        .map((lead) =>
                          (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              "TableRow"
                            ],
                            {
                              children: [
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableCell"
                                  ],
                                  {
                                    children: lead.name,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 379,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableCell"
                                  ],
                                  {
                                    children: lead.category || "-",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 380,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableCell"
                                  ],
                                  {
                                    children: lead.phone,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 381,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableCell"
                                  ],
                                  {
                                    children: lead.email,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 382,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableCell"
                                  ],
                                  {
                                    children:
                                      lead.assignedToName ||
                                      lead.assignedTo ||
                                      "-",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 383,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableCell"
                                  ],
                                  {
                                    children: (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "select",
                                      {
                                        value:
                                          lead.status ||
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "leadStatuses"
                                          ][0],
                                        onChange: (e) =>
                                          updateLeadStatus(
                                            lead._id || lead.id,
                                            e.target.value,
                                          ),
                                        className:
                                          "px-2 py-1 rounded-md bg-background border",
                                        children:
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "leadStatuses"
                                          ].map((s) =>
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
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
                                                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
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
                                          "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                        lineNumber: 387,
                                        columnNumber: 19,
                                      },
                                      this,
                                    ),
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 386,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableCell"
                                  ],
                                  {
                                    children: lead.statusReason || "-",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 404,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    "TableCell"
                                  ],
                                  {
                                    children: [
                                      lead.doNotDelete
                                        ? (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "text-sm text-muted-foreground",
                                              children: "Not deletable",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                              lineNumber: 407,
                                              columnNumber: 21,
                                            },
                                            this,
                                          )
                                        : null,
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                          "Button"
                                        ],
                                        {
                                          variant: "destructive",
                                          size: "sm",
                                          onClick: () =>
                                            deleteLead(lead._id || lead.id),
                                          children: (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__[
                                              "Trash"
                                            ],
                                            {},
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                              lineNumber: 416,
                                              columnNumber: 21,
                                            },
                                            this,
                                          ),
                                        },
                                        void 0,
                                        false,
                                        {
                                          fileName:
                                            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                          lineNumber: 411,
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
                                      "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 405,
                                    columnNumber: 17,
                                  },
                                  this,
                                ),
                              ],
                            },
                            String(lead._id || lead.id),
                            true,
                            {
                              fileName:
                                "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                              lineNumber: 378,
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
                        "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                      lineNumber: 359,
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
                  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
                lineNumber: 346,
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
            "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/(crm)/leads/page.tsx",
          lineNumber: 297,
          columnNumber: 5,
        },
        this,
      );
    }
    _s(LeadsPage, "VgN2DnkeGIpTdekalKSjDd8zZfU=", false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "useToast"
        ],
      ];
    });
    _c = LeadsPage;
    var _c;
    __turbopack_context__.k.register(_c, "LeadsPage");
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "__iconNode",
      () => __iconNode,
      "default",
      () => Trash,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)",
      );
    const __iconNode = [
      [
        "path",
        {
          d: "M3 6h18",
          key: "d0wm0j",
        },
      ],
      [
        "path",
        {
          d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
          key: "4alrt4",
        },
      ],
      [
        "path",
        {
          d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
          key: "v07s0e",
        },
      ],
    ];
    const Trash = (0,
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
      "default"
    ])("Trash", __iconNode);
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript) <export default as Trash>",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Trash",
      () =>
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          "default"
        ],
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript)",
      );
  },
]);
