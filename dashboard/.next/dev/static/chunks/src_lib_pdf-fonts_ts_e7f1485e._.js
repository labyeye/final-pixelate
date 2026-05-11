(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === "object" ? document.currentScript : undefined,
  "[project]/src/lib/pdf-fonts.ts [app-client] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "loadNotoSansForJsPDF",
      () => loadNotoSansForJsPDF,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      /*#__PURE__*/ __turbopack_context__.i(
        "[project]/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)",
      );
    async function loadNotoSansForJsPDF(doc, fontName = "NotoSans") {
      try {
        const localUrl = "/fonts/NotoSans-Regular.ttf";
        let res = await fetch(localUrl, {
          method: "GET",
        }).catch(() => null);
        if (!res || !res.ok) {
          const cdn =
            "https://fonts.gstatic.com/s/notosans/v27/o-0IIpQlx3QUlC5A4PNb4g.ttf";
          res = await fetch(cdn);
          if (!res.ok) throw new Error("Failed to fetch font from CDN");
        }
        const arrayBuffer = await res.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        let binary = "";
        const chunkSize = 0x8000;
        for (let i = 0; i < bytes.length; i += chunkSize) {
          binary += String.fromCharCode.apply(
            null,
            Array.from(bytes.slice(i, i + chunkSize)),
          );
        }
        const base64 =
          typeof btoa !== "undefined"
            ? btoa(binary)
            : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                "Buffer"
              ]
                .from(binary, "binary")
                .toString("base64");
        const vfsName = fontName + ".ttf";
        doc.addFileToVFS(vfsName, base64);
        doc.addFont(vfsName, fontName, "normal");
        return fontName;
      } catch (e) {
        console.error("Could not load Noto Sans for jsPDF", e);
        return null;
      }
    }
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

//# sourceMappingURL=src_lib_pdf-fonts_ts_e7f1485e._.js.map
