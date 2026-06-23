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
"[project]/src/lib/pdf-fonts.ts [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/src_lib_pdf-fonts_ts_e432b7ed._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/lib/pdf-fonts.ts [app-ssr] (ecmascript)");
    });
});
}),
];