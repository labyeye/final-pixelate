module.exports = [
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/styles/access-error-styles.js [app-rsc] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "styles", {
      enumerable: true,
      get: function () {
        return styles;
      },
    });
    const styles = {
      error: {
        fontFamily:
          'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
      desc: {
        display: "inline-block",
      },
      h1: {
        display: "inline-block",
        margin: "0 20px 0 0",
        padding: "0 23px 0 0",
        fontSize: 24,
        fontWeight: 500,
        verticalAlign: "top",
        lineHeight: "49px",
      },
      h2: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "49px",
        margin: 0,
      },
    };
    if (
      (typeof exports.default === "function" ||
        (typeof exports.default === "object" && exports.default !== null)) &&
      typeof exports.default.__esModule === "undefined"
    ) {
      Object.defineProperty(exports.default, "__esModule", {
        value: true,
      });
      Object.assign(exports.default, exports);
      module.exports = exports.default;
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/http-access-fallback/error-fallback.js [app-rsc] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "HTTPAccessErrorFallback", {
      enumerable: true,
      get: function () {
        return HTTPAccessErrorFallback;
      },
    });
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)",
    );
    const _accesserrorstyles = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/styles/access-error-styles.js [app-rsc] (ecmascript)",
    );
    function HTTPAccessErrorFallback({ status, message }) {
      return (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
          (0, _jsxruntime.jsx)("title", {
            children: `${status}: ${message}`,
          }),
          (0, _jsxruntime.jsx)("div", {
            style: _accesserrorstyles.styles.error,
            children: (0, _jsxruntime.jsxs)("div", {
              children: [
                (0, _jsxruntime.jsx)("style", {
                  dangerouslySetInnerHTML: {
                    __html: `body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}`,
                  },
                }),
                (0, _jsxruntime.jsx)("h1", {
                  className: "next-error-h1",
                  style: _accesserrorstyles.styles.h1,
                  children: status,
                }),
                (0, _jsxruntime.jsx)("div", {
                  style: _accesserrorstyles.styles.desc,
                  children: (0, _jsxruntime.jsx)("h2", {
                    style: _accesserrorstyles.styles.h2,
                    children: message,
                  }),
                }),
              ],
            }),
          }),
        ],
      });
    }
    if (
      (typeof exports.default === "function" ||
        (typeof exports.default === "object" && exports.default !== null)) &&
      typeof exports.default.__esModule === "undefined"
    ) {
      Object.defineProperty(exports.default, "__esModule", {
        value: true,
      });
      Object.assign(exports.default, exports);
      module.exports = exports.default;
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/builtin/not-found.js [app-rsc] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function () {
        return NotFound;
      },
    });
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)",
    );
    const _errorfallback = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/http-access-fallback/error-fallback.js [app-rsc] (ecmascript)",
    );
    function NotFound() {
      return (0, _jsxruntime.jsx)(_errorfallback.HTTPAccessErrorFallback, {
        status: 404,
        message: "This page could not be found.",
      });
    }
    if (
      (typeof exports.default === "function" ||
        (typeof exports.default === "object" && exports.default !== null)) &&
      typeof exports.default.__esModule === "undefined"
    ) {
      Object.defineProperty(exports.default, "__esModule", {
        value: true,
      });
      Object.assign(exports.default, exports);
      module.exports = exports.default;
    }
  },
];
