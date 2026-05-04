(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === "object" ? document.currentScript : undefined,
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react-dom/index.js [client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)",
      );
    ("use strict");
    function checkDCE() {
      if (
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function"
      ) {
        return;
      }
      if (("TURBOPACK compile-time truthy", 1)) {
        throw new Error("^_^");
      }
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    if (("TURBOPACK compile-time falsy", 0));
    else {
      module.exports = __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react-dom/cjs/react-dom.development.js [client] (ecmascript)",
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react-dom/client.js [client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)",
      );
    ("use strict");
    var m = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react-dom/index.js [client] (ecmascript)",
    );
    if (("TURBOPACK compile-time falsy", 0));
    else {
      var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      exports.createRoot = function (c, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.createRoot(c, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
      exports.hydrateRoot = function (c, h, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.hydrateRoot(c, h, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
    }
  },
]);
