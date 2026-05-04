(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === "object" ? document.currentScript : undefined,
  '[next]/entry/page-loader.ts { PAGE => "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/app.js [client] (ecmascript)" } [client] (ecmascript)',
  (__turbopack_context__, module, exports) => {
    const PAGE_PATH = "/_app";
    (window.__NEXT_P = window.__NEXT_P || []).push([
      PAGE_PATH,
      () => {
        return __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/app.js [client] (ecmascript)",
        );
      },
    ]);

    if (module.hot) {
      module.hot.dispose(function () {
        window.__NEXT_P.push([PAGE_PATH]);
      });
    }
  },
]);
