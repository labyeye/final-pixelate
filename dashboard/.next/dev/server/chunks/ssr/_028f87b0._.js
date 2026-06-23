module.exports = [
"[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_485214ad._.js",
  "server/chunks/ssr/node_modules_4f11bacc._.js",
  "server/chunks/ssr/[externals]_module_aa10390c._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-ssr] (ecmascript)");
    });
});
}),
"[project]/node_modules/next/dist/compiled/react-dom/server.node.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_next_dist_compiled_bc7a517c._.js",
  "server/chunks/ssr/[root-of-the-server]__d0aee9be._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/next/dist/compiled/react-dom/server.node.js [app-ssr] (ecmascript)");
    });
});
}),
"[project]/src/components/quotations/quotation-print-layout.tsx [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/src_components_quotations_quotation-print-layout_tsx_cebdda63._.js",
  "server/chunks/ssr/node_modules_lucide-react_dist_esm_icons_5e6122e4._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/components/quotations/quotation-print-layout.tsx [app-ssr] (ecmascript)");
    });
});
}),
];