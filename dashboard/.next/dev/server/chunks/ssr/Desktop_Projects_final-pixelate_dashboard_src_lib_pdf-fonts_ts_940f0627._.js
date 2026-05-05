module.exports = [
"[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/pdf-fonts.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadNotoSansForJsPDF",
    ()=>loadNotoSansForJsPDF
]);
async function loadNotoSansForJsPDF(doc, fontName = "NotoSans") {
    try {
        const localUrl = "/fonts/NotoSans-Regular.ttf";
        let res = await fetch(localUrl, {
            method: "GET"
        }).catch(()=>null);
        if (!res || !res.ok) {
            const cdn = "https://fonts.gstatic.com/s/notosans/v27/o-0IIpQlx3QUlC5A4PNb4g.ttf";
            res = await fetch(cdn);
            if (!res.ok) throw new Error("Failed to fetch font from CDN");
        }
        const arrayBuffer = await res.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        let binary = "";
        const chunkSize = 0x8000;
        for(let i = 0; i < bytes.length; i += chunkSize){
            binary += String.fromCharCode.apply(null, Array.from(bytes.slice(i, i + chunkSize)));
        }
        const base64 = typeof btoa !== "undefined" ? btoa(binary) : Buffer.from(binary, "binary").toString("base64");
        const vfsName = fontName + ".ttf";
        doc.addFileToVFS(vfsName, base64);
        doc.addFont(vfsName, fontName, "normal");
        return fontName;
    } catch (e) {
        console.error("Could not load Noto Sans for jsPDF", e);
        return null;
    }
}
}),
];

//# sourceMappingURL=Desktop_Projects_final-pixelate_dashboard_src_lib_pdf-fonts_ts_940f0627._.js.map