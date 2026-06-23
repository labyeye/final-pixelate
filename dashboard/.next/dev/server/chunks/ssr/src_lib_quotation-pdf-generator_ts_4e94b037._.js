module.exports = [
"[project]/src/lib/quotation-pdf-generator.ts [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_jspdf_dist_jspdf_es_min_d554b372.js",
  "server/chunks/ssr/src_lib_quotation-pdf-generator_ts_b7e7265f._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/lib/quotation-pdf-generator.ts [app-ssr] (ecmascript)");
    });
});
}),
];