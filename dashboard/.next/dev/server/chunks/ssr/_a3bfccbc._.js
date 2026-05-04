module.exports = [
  "[project]/src/lib/constants.ts [app-ssr] (ecmascript)",
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
            children: (0,
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
  "[project]/src/app/(crm)/leads/page.tsx [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["default", () => LeadsPage]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/lib/constants.ts [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/components/ui/table.tsx [app-ssr] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/trash.js [app-ssr] (ecmascript) <export default as Trash>",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/hooks/use-toast.ts [app-ssr] (ecmascript)",
      );
    ("use client");
    function LeadsPage() {
      const [leads, setLeads] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [team, setTeam] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])([]);
      const [staffFilter, setStaffFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [statusFilter, setStatusFilter] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])("");
      const [isSyncing, setIsSyncing] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [isDeletingAssigned, setIsDeletingAssigned] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])(false);
      const [deleteProgress, setDeleteProgress] = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useState"
      ])({
        current: 0,
        total: 0,
      });
      const { toast } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useToast"
      ])();
      async function syncIndiaMART() {
        if (
          !window.confirm(
            "Sync all leads from IndiaMART? This may take a moment.",
          )
        )
          return;
        setIsSyncing(true);
        try {
          const res = await fetch("/api/indiamart-webhook?action=sync_now");
          const data = await res.json();
          if (res.ok) {
            toast({
              title: "IndiaMART Sync Complete",
              description: `Synced ${data.synced} new leads (skipped ${data.skipped || 0} duplicates)`,
            });

            const list = await fetchLeadsWithAuth();
            setLeads(list || []);
          } else {
            toast({
              title: "Sync Failed",
              description: data.error || "Failed to sync from IndiaMART",
              variant: "destructive",
            });
          }
        } catch (e) {
          console.error("Sync error:", e);
          toast({
            title: "Sync Error",
            description: "Network error during sync",
            variant: "destructive",
          });
        } finally {
          setIsSyncing(false);
        }
      }
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
        "useEffect"
      ])(() => {
        let mounted = true;
        (async () => {
          try {
            const items = await fetchLeadsWithAuth();
            if (mounted) setLeads(items);

            const t = await fetch("/api/team-members");
            const tm = await t.json();
            if (mounted) setTeam(tm || []);
          } catch (err) {
            console.error("Failed to load leads/team", err);
          }
        })();
        return () => {
          mounted = false;
        };
      }, []);

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
        const API_BASE = "http://localhost:3500";
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
              "header",
              {
                children: [
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 364,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 365,
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
                lineNumber: 363,
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
                className: "flex items-center gap-4",
                children: [
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 371,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "select",
                    {
                      value: staffFilter,
                      onChange: (e) => setStaffFilter(e.target.value),
                      className: "px-2 py-1 rounded-md bg-background border",
                      children: [
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 377,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        team.map((t) =>
                          (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
                              lineNumber: 379,
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
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 372,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 384,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  (0,
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                    "jsxDEV"
                  ])(
                    "select",
                    {
                      value: statusFilter,
                      onChange: (e) => setStatusFilter(e.target.value),
                      className: "px-2 py-1 rounded-md bg-background border",
                      children: [
                        (0,
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
                            fileName: "[project]/src/app/(crm)/leads/page.tsx",
                            lineNumber: 390,
                            columnNumber: 11,
                          },
                          this,
                        ),
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "leadStatuses"
                        ].map((s) =>
                          (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
                              lineNumber: 392,
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
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 385,
                      columnNumber: 9,
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
                      variant: "default",
                      onClick: syncIndiaMART,
                      disabled: isSyncing,
                      className: "bg-green-600 hover:bg-green-700",
                      children: isSyncing ? "Syncing..." : "🔄 Sync IndiaMART",
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 397,
                      columnNumber: 9,
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
                      variant: "destructive",
                      onClick: () => deleteLeadsForStaff(staffFilter),
                      disabled: !staffFilter || isDeletingAssigned,
                      children: "Delete leads for selected staff",
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 405,
                      columnNumber: 9,
                    },
                    this,
                  ),
                  isDeletingAssigned
                    ? (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
                          fileName: "[project]/src/app/(crm)/leads/page.tsx",
                          lineNumber: 413,
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
                fileName: "[project]/src/app/(crm)/leads/page.tsx",
                lineNumber: 370,
                columnNumber: 7,
              },
              this,
            ),
            (0,
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
                      children: (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                        "jsxDEV"
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                          "TableRow"
                        ],
                        {
                          children: [
                            (0,
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "jsxDEV"
                            ])(
                              __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                "TableHead"
                              ],
                              {
                                children: "Name",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/leads/page.tsx",
                                lineNumber: 422,
                                columnNumber: 13,
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
                                children: "Subject",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/leads/page.tsx",
                                lineNumber: 423,
                                columnNumber: 13,
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
                                children: "Phone",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/leads/page.tsx",
                                lineNumber: 424,
                                columnNumber: 13,
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
                                children: "Email",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/leads/page.tsx",
                                lineNumber: 425,
                                columnNumber: 13,
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
                                children: "Project Type",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/leads/page.tsx",
                                lineNumber: 426,
                                columnNumber: 13,
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
                                children: "Budget",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/leads/page.tsx",
                                lineNumber: 427,
                                columnNumber: 13,
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
                                children: "Source",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/leads/page.tsx",
                                lineNumber: 428,
                                columnNumber: 13,
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
                                children: "Assigned",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/leads/page.tsx",
                                lineNumber: 429,
                                columnNumber: 13,
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
                                children: "Status",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/leads/page.tsx",
                                lineNumber: 430,
                                columnNumber: 13,
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
                                children: "Actions",
                              },
                              void 0,
                              false,
                              {
                                fileName:
                                  "[project]/src/app/(crm)/leads/page.tsx",
                                lineNumber: 431,
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
                          lineNumber: 421,
                          columnNumber: 11,
                        },
                        this,
                      ),
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 420,
                      columnNumber: 9,
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
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                            "jsxDEV"
                          ])(
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                              "TableRow"
                            ],
                            {
                              children: [
                                (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                  "jsxDEV"
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                    "TableCell"
                                  ],
                                  {
                                    children: lead.name,
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 454,
                                    columnNumber: 17,
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
                                    className: "text-sm",
                                    children: lead.subject || "-",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 455,
                                    columnNumber: 17,
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
                                    children: lead.phone || "-",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 456,
                                    columnNumber: 17,
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
                                    children: lead.email || "-",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 457,
                                    columnNumber: 17,
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
                                    className: "text-sm",
                                    children: lead.projectType || "-",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 458,
                                    columnNumber: 17,
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
                                    className: "text-sm",
                                    children: lead.budget || "-",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 461,
                                    columnNumber: 17,
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
                                    className: "text-xs",
                                    children: (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "span",
                                      {
                                        className:
                                          "px-2 py-1 rounded-full bg-blue-50 text-blue-700",
                                        children: lead.source || "Unknown",
                                      },
                                      void 0,
                                      false,
                                      {
                                        fileName:
                                          "[project]/src/app/(crm)/leads/page.tsx",
                                        lineNumber: 463,
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
                                    lineNumber: 462,
                                    columnNumber: 17,
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
                                    className: "text-sm",
                                    children:
                                      lead.assignedToName ||
                                      lead.assignedTo ||
                                      "-",
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      "[project]/src/app/(crm)/leads/page.tsx",
                                    lineNumber: 467,
                                    columnNumber: 17,
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
                                    children: (0,
                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                      "jsxDEV"
                                    ])(
                                      "select",
                                      {
                                        value:
                                          lead.status ||
                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "leadStatuses"
                                          ][0],
                                        onChange: (e) =>
                                          updateLeadStatus(
                                            lead._id || lead.id,
                                            e.target.value,
                                          ),
                                        className:
                                          "px-2 py-1 rounded-md bg-background border text-sm",
                                        children:
                                          __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "leadStatuses"
                                          ].map((s) =>
                                            (0,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
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
                                                lineNumber: 482,
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
                                          "[project]/src/app/(crm)/leads/page.tsx",
                                        lineNumber: 471,
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
                                    lineNumber: 470,
                                    columnNumber: 17,
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
                                    children: [
                                      lead.doNotDelete
                                        ? (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            "div",
                                            {
                                              className:
                                                "text-xs text-muted-foreground mb-2",
                                              children: "Not deletable",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/leads/page.tsx",
                                              lineNumber: 490,
                                              columnNumber: 21,
                                            },
                                            this,
                                          )
                                        : null,
                                      (0,
                                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                        "jsxDEV"
                                      ])(
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                          "Button"
                                        ],
                                        {
                                          variant: "destructive",
                                          size: "sm",
                                          onClick: () =>
                                            deleteLead(lead._id || lead.id),
                                          children: (0,
                                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
                                            "jsxDEV"
                                          ])(
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__[
                                              "Trash"
                                            ],
                                            {
                                              className: "w-4 h-4",
                                            },
                                            void 0,
                                            false,
                                            {
                                              fileName:
                                                "[project]/src/app/(crm)/leads/page.tsx",
                                              lineNumber: 499,
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
                                          lineNumber: 494,
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
                                    lineNumber: 488,
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
                                "[project]/src/app/(crm)/leads/page.tsx",
                              lineNumber: 453,
                              columnNumber: 15,
                            },
                            this,
                          ),
                        ),
                    },
                    void 0,
                    false,
                    {
                      fileName: "[project]/src/app/(crm)/leads/page.tsx",
                      lineNumber: 434,
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
                lineNumber: 419,
                columnNumber: 7,
              },
              this,
            ),
          ],
        },
        void 0,
        true,
        {
          fileName: "[project]/src/app/(crm)/leads/page.tsx",
          lineNumber: 362,
          columnNumber: 5,
        },
        this,
      );
    }
  },
  "[project]/node_modules/lucide-react/dist/esm/icons/trash.js [app-ssr] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "__iconNode",
      () => __iconNode,
      "default",
      () => Trash,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)",
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
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
      "default"
    ])("Trash", __iconNode);
  },
  "[project]/node_modules/lucide-react/dist/esm/icons/trash.js [app-ssr] (ecmascript) <export default as Trash>",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "Trash",
      () =>
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[
          "default"
        ],
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/lucide-react/dist/esm/icons/trash.js [app-ssr] (ecmascript)",
      );
  },
];
