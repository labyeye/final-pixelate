(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === "object" ? document.currentScript : undefined,
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/asset-prefix.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "getAssetPrefix", {
      enumerable: true,
      get: function () {
        return getAssetPrefix;
      },
    });
    const _invarianterror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)",
    );
    function getAssetPrefix() {
      const currentScript = document.currentScript;
      if (!(currentScript instanceof HTMLScriptElement)) {
        throw Object.defineProperty(
          new _invarianterror.InvariantError(
            `Expected document.currentScript to be a <script> element. Received ${currentScript} instead.`,
          ),
          "__NEXT_ERROR_CODE",
          {
            value: "E783",
            enumerable: false,
            configurable: true,
          },
        );
      }
      const { pathname } = new URL(currentScript.src);
      const nextIndex = pathname.indexOf("/_next/");
      if (nextIndex === -1) {
        throw Object.defineProperty(
          new _invarianterror.InvariantError(
            `Expected document.currentScript src to contain '/_next/'. Received ${currentScript.src} instead.`,
          ),
          "__NEXT_ERROR_CODE",
          {
            value: "E784",
            enumerable: false,
            configurable: true,
          },
        );
      }
      return pathname.slice(0, nextIndex);
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/set-attributes-from-props.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "setAttributesFromProps", {
      enumerable: true,
      get: function () {
        return setAttributesFromProps;
      },
    });
    const DOMAttributeNames = {
      acceptCharset: "accept-charset",
      className: "class",
      htmlFor: "for",
      httpEquiv: "http-equiv",
      noModule: "noModule",
    };
    const ignoreProps = [
      "onLoad",
      "onReady",
      "dangerouslySetInnerHTML",
      "children",
      "onError",
      "strategy",
      "stylesheets",
    ];
    function isBooleanScriptAttribute(attr) {
      return ["async", "defer", "noModule"].includes(attr);
    }
    function setAttributesFromProps(el, props) {
      for (const [p, value] of Object.entries(props)) {
        if (!props.hasOwnProperty(p)) continue;
        if (ignoreProps.includes(p)) continue;
        
        if (value === undefined) {
          continue;
        }
        const attr = DOMAttributeNames[p] || p.toLowerCase();
        if (el.tagName === "SCRIPT" && isBooleanScriptAttribute(attr)) {
          
          
          el[attr] = !!value;
        } else {
          el.setAttribute(attr, String(value));
        }
        
        
        if (
          value === false ||
          (el.tagName === "SCRIPT" &&
            isBooleanScriptAttribute(attr) &&
            (!value || value === "false"))
        ) {
          
          
          el.setAttribute(attr, "");
          el.removeAttribute(attr);
        }
      }
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-bootstrap.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    




 var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "appBootstrap", {
      enumerable: true,
      get: function () {
        return appBootstrap;
      },
    });
    const _assetprefix = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/asset-prefix.js [app-client] (ecmascript)",
    );
    const _setattributesfromprops = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/set-attributes-from-props.js [app-client] (ecmascript)",
    );
    const version = "16.0.7";
    window.next = {
      version,
      appDir: true,
    };
    function loadScriptsInSequence(scripts, hydrate) {
      if (!scripts || !scripts.length) {
        return hydrate();
      }
      return scripts
        .reduce((promise, [src, props]) => {
          return promise.then(() => {
            return new Promise((resolve, reject) => {
              const el = document.createElement("script");
              if (props) {
                (0, _setattributesfromprops.setAttributesFromProps)(el, props);
              }
              if (src) {
                el.src = src;
                el.onload = () => resolve();
                el.onerror = reject;
              } else if (props) {
                el.innerHTML = props.children;
                setTimeout(resolve);
              }
              document.head.appendChild(el);
            });
          });
        }, Promise.resolve())
        .catch((err) => {
          console.error(err);
          
        })
        .then(() => {
          hydrate();
        });
    }
    function appBootstrap(hydrate) {
      const assetPrefix = (0, _assetprefix.getAssetPrefix)();
      loadScriptsInSequence(self.__next_s, () => {
        
        
        
        
        if (("TURBOPACK compile-time falsy", 0)) 
        ;
        hydrate(assetPrefix);
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/react-client-callbacks/report-global-error.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "reportGlobalError", {
      enumerable: true,
      get: function () {
        return reportGlobalError;
      },
    });
    const reportGlobalError =
      typeof reportError === "function"
        ? reportError
        : (error) => {
            
            globalThis.console.error(error);
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/react-client-callbacks/on-recoverable-error.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        isRecoverableError: null,
        onRecoverableError: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      isRecoverableError: function () {
        return isRecoverableError;
      },
      onRecoverableError: function () {
        return onRecoverableError;
      },
    });
    const _interop_require_default = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)",
    );
    const _bailouttocsr = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-client] (ecmascript)",
    );
    const _iserror =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/lib/is-error.js [app-client] (ecmascript)",
      ),
    );
    const _reportglobalerror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/react-client-callbacks/report-global-error.js [app-client] (ecmascript)",
    );
    const recoverableErrors = new WeakSet();
    function isRecoverableError(error) {
      return recoverableErrors.has(error);
    }
    const onRecoverableError = (error) => {
      
      let cause =
        (0, _iserror.default)(error) && "cause" in error ? error.cause : error;
      
      if ((0, _bailouttocsr.isBailoutToCSRError)(cause)) return;
      if (("TURBOPACK compile-time truthy", 1)) {
        const { decorateDevError } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/next-devtools/userspace/app/errors/stitched-error.js [app-client] (ecmascript)",
        );
        const causeError = decorateDevError(cause);
        recoverableErrors.add(causeError);
        cause = causeError;
      }
      (0, _reportglobalerror.reportGlobalError)(cause);
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        HTTPAccessErrorStatus: null,
        HTTP_ERROR_FALLBACK_ERROR_CODE: null,
        getAccessFallbackErrorTypeByStatus: null,
        getAccessFallbackHTTPStatus: null,
        isHTTPAccessFallbackError: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      HTTPAccessErrorStatus: function () {
        return HTTPAccessErrorStatus;
      },
      HTTP_ERROR_FALLBACK_ERROR_CODE: function () {
        return HTTP_ERROR_FALLBACK_ERROR_CODE;
      },
      getAccessFallbackErrorTypeByStatus: function () {
        return getAccessFallbackErrorTypeByStatus;
      },
      getAccessFallbackHTTPStatus: function () {
        return getAccessFallbackHTTPStatus;
      },
      isHTTPAccessFallbackError: function () {
        return isHTTPAccessFallbackError;
      },
    });
    const HTTPAccessErrorStatus = {
      NOT_FOUND: 404,
      FORBIDDEN: 403,
      UNAUTHORIZED: 401,
    };
    const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
    const HTTP_ERROR_FALLBACK_ERROR_CODE = "NEXT_HTTP_ERROR_FALLBACK";
    function isHTTPAccessFallbackError(error) {
      if (
        typeof error !== "object" ||
        error === null ||
        !("digest" in error) ||
        typeof error.digest !== "string"
      ) {
        return false;
      }
      const [prefix, httpStatus] = error.digest.split(";");
      return (
        prefix === HTTP_ERROR_FALLBACK_ERROR_CODE &&
        ALLOWED_CODES.has(Number(httpStatus))
      );
    }
    function getAccessFallbackHTTPStatus(error) {
      const httpStatus = error.digest.split(";")[1];
      return Number(httpStatus);
    }
    function getAccessFallbackErrorTypeByStatus(status) {
      switch (status) {
        case 401:
          return "unauthorized";
        case 403:
          return "forbidden";
        case 404:
          return "not-found";
        default:
          return;
      }
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect-status-code.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "RedirectStatusCode", {
      enumerable: true,
      get: function () {
        return RedirectStatusCode;
      },
    });
    var RedirectStatusCode =  (function (RedirectStatusCode) {
      RedirectStatusCode[(RedirectStatusCode["SeeOther"] = 303)] = "SeeOther";
      RedirectStatusCode[(RedirectStatusCode["TemporaryRedirect"] = 307)] =
        "TemporaryRedirect";
      RedirectStatusCode[(RedirectStatusCode["PermanentRedirect"] = 308)] =
        "PermanentRedirect";
      return RedirectStatusCode;
    })({});
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect-error.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        REDIRECT_ERROR_CODE: null,
        RedirectType: null,
        isRedirectError: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      REDIRECT_ERROR_CODE: function () {
        return REDIRECT_ERROR_CODE;
      },
      RedirectType: function () {
        return RedirectType;
      },
      isRedirectError: function () {
        return isRedirectError;
      },
    });
    const _redirectstatuscode = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect-status-code.js [app-client] (ecmascript)",
    );
    const REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
    var RedirectType =  (function (RedirectType) {
      RedirectType["push"] = "push";
      RedirectType["replace"] = "replace";
      return RedirectType;
    })({});
    function isRedirectError(error) {
      if (
        typeof error !== "object" ||
        error === null ||
        !("digest" in error) ||
        typeof error.digest !== "string"
      ) {
        return false;
      }
      const digest = error.digest.split(";");
      const [errorCode, type] = digest;
      const destination = digest.slice(2, -2).join(";");
      const status = digest.at(-2);
      const statusCode = Number(status);
      return (
        errorCode === REDIRECT_ERROR_CODE &&
        (type === "replace" || type === "push") &&
        typeof destination === "string" &&
        !isNaN(statusCode) &&
        statusCode in _redirectstatuscode.RedirectStatusCode
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/is-next-router-error.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "isNextRouterError", {
      enumerable: true,
      get: function () {
        return isNextRouterError;
      },
    });
    const _httpaccessfallback = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-client] (ecmascript)",
    );
    const _redirecterror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect-error.js [app-client] (ecmascript)",
    );
    function isNextRouterError(error) {
      return (
        (0, _redirecterror.isRedirectError)(error) ||
        (0, _httpaccessfallback.isHTTPAccessFallbackError)(error)
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/lib/console.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        formatConsoleArgs: null,
        parseConsoleArgs: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      formatConsoleArgs: function () {
        return formatConsoleArgs;
      },
      parseConsoleArgs: function () {
        return parseConsoleArgs;
      },
    });
    const _interop_require_default = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)",
    );
    const _iserror =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/lib/is-error.js [app-client] (ecmascript)",
      ),
    );
    function formatObject(arg, depth) {
      switch (typeof arg) {
        case "object":
          if (arg === null) {
            return "null";
          } else if (Array.isArray(arg)) {
            let result = "[";
            if (depth < 1) {
              for (let i = 0; i < arg.length; i++) {
                if (result !== "[") {
                  result += ",";
                }
                if (Object.prototype.hasOwnProperty.call(arg, i)) {
                  result += formatObject(arg[i], depth + 1);
                }
              }
            } else {
              result += arg.length > 0 ? "..." : "";
            }
            result += "]";
            return result;
          } else if (arg instanceof Error) {
            return arg + "";
          } else {
            const keys = Object.keys(arg);
            let result = "{";
            if (depth < 1) {
              for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const desc = Object.getOwnPropertyDescriptor(arg, "key");
                if (desc && !desc.get && !desc.set) {
                  const jsonKey = JSON.stringify(key);
                  if (jsonKey !== '"' + key + '"') {
                    result += jsonKey + ": ";
                  } else {
                    result += key + ": ";
                  }
                  result += formatObject(desc.value, depth + 1);
                }
              }
            } else {
              result += keys.length > 0 ? "..." : "";
            }
            result += "}";
            return result;
          }
        case "string":
          return JSON.stringify(arg);
        case "number":
        case "bigint":
        case "boolean":
        case "symbol":
        case "undefined":
        case "function":
        default:
          return String(arg);
      }
    }
    function formatConsoleArgs(args) {
      let message;
      let idx;
      if (typeof args[0] === "string") {
        message = args[0];
        idx = 1;
      } else {
        message = "";
        idx = 0;
      }
      let result = "";
      let startQuote = false;
      for (let i = 0; i < message.length; ++i) {
        const char = message[i];
        if (char !== "%" || i === message.length - 1 || idx >= args.length) {
          result += char;
          continue;
        }
        const code = message[++i];
        switch (code) {
          case "c": {
            
            
            result = startQuote ? `${result}]` : `[${result}`;
            startQuote = !startQuote;
            idx++;
            break;
          }
          case "O":
          case "o": {
            result += formatObject(args[idx++], 0);
            break;
          }
          case "d":
          case "i": {
            result += parseInt(args[idx++], 10);
            break;
          }
          case "f": {
            result += parseFloat(args[idx++]);
            break;
          }
          case "s": {
            result += String(args[idx++]);
            break;
          }
          default:
            result += "%" + code;
        }
      }
      for (; idx < args.length; idx++) {
        result += (idx > 0 ? " " : "") + formatObject(args[idx], 0);
      }
      return result;
    }
    function parseConsoleArgs(args) {
      
      
      
      
      
      
      
      
      
      
      
      
      
      if (
        args.length > 3 &&
        typeof args[0] === "string" &&
        args[0].startsWith("%c%s%c") &&
        typeof args[1] === "string" &&
        typeof args[2] === "string" &&
        typeof args[3] === "string"
      ) {
        const environmentName = args[2];
        const maybeError = args[4];
        return {
          environmentName: environmentName.trim(),
          error: (0, _iserror.default)(maybeError) ? maybeError : null,
        };
      }
      return {
        environmentName: null,
        error: null,
      };
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-globals.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/polyfill-module.js [app-client] (ecmascript)",
    );
    
    if (("TURBOPACK compile-time truthy", 1)) {
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/next-devtools/userspace/app/app-dev-overlay-setup.js [app-client] (ecmascript)",
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-headers.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        ACTION_HEADER: null,
        FLIGHT_HEADERS: null,
        NEXT_ACTION_NOT_FOUND_HEADER: null,
        NEXT_DID_POSTPONE_HEADER: null,
        NEXT_HMR_REFRESH_HASH_COOKIE: null,
        NEXT_HMR_REFRESH_HEADER: null,
        NEXT_HTML_REQUEST_ID_HEADER: null,
        NEXT_IS_PRERENDER_HEADER: null,
        NEXT_REQUEST_ID_HEADER: null,
        NEXT_REWRITTEN_PATH_HEADER: null,
        NEXT_REWRITTEN_QUERY_HEADER: null,
        NEXT_ROUTER_PREFETCH_HEADER: null,
        NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: null,
        NEXT_ROUTER_STALE_TIME_HEADER: null,
        NEXT_ROUTER_STATE_TREE_HEADER: null,
        NEXT_RSC_UNION_QUERY: null,
        NEXT_URL: null,
        RSC_CONTENT_TYPE_HEADER: null,
        RSC_HEADER: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      ACTION_HEADER: function () {
        return ACTION_HEADER;
      },
      FLIGHT_HEADERS: function () {
        return FLIGHT_HEADERS;
      },
      NEXT_ACTION_NOT_FOUND_HEADER: function () {
        return NEXT_ACTION_NOT_FOUND_HEADER;
      },
      NEXT_DID_POSTPONE_HEADER: function () {
        return NEXT_DID_POSTPONE_HEADER;
      },
      NEXT_HMR_REFRESH_HASH_COOKIE: function () {
        return NEXT_HMR_REFRESH_HASH_COOKIE;
      },
      NEXT_HMR_REFRESH_HEADER: function () {
        return NEXT_HMR_REFRESH_HEADER;
      },
      NEXT_HTML_REQUEST_ID_HEADER: function () {
        return NEXT_HTML_REQUEST_ID_HEADER;
      },
      NEXT_IS_PRERENDER_HEADER: function () {
        return NEXT_IS_PRERENDER_HEADER;
      },
      NEXT_REQUEST_ID_HEADER: function () {
        return NEXT_REQUEST_ID_HEADER;
      },
      NEXT_REWRITTEN_PATH_HEADER: function () {
        return NEXT_REWRITTEN_PATH_HEADER;
      },
      NEXT_REWRITTEN_QUERY_HEADER: function () {
        return NEXT_REWRITTEN_QUERY_HEADER;
      },
      NEXT_ROUTER_PREFETCH_HEADER: function () {
        return NEXT_ROUTER_PREFETCH_HEADER;
      },
      NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function () {
        return NEXT_ROUTER_SEGMENT_PREFETCH_HEADER;
      },
      NEXT_ROUTER_STALE_TIME_HEADER: function () {
        return NEXT_ROUTER_STALE_TIME_HEADER;
      },
      NEXT_ROUTER_STATE_TREE_HEADER: function () {
        return NEXT_ROUTER_STATE_TREE_HEADER;
      },
      NEXT_RSC_UNION_QUERY: function () {
        return NEXT_RSC_UNION_QUERY;
      },
      NEXT_URL: function () {
        return NEXT_URL;
      },
      RSC_CONTENT_TYPE_HEADER: function () {
        return RSC_CONTENT_TYPE_HEADER;
      },
      RSC_HEADER: function () {
        return RSC_HEADER;
      },
    });
    const RSC_HEADER = "rsc";
    const ACTION_HEADER = "next-action";
    const NEXT_ROUTER_STATE_TREE_HEADER = "next-router-state-tree";
    const NEXT_ROUTER_PREFETCH_HEADER = "next-router-prefetch";
    const NEXT_ROUTER_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
    const NEXT_HMR_REFRESH_HEADER = "next-hmr-refresh";
    const NEXT_HMR_REFRESH_HASH_COOKIE = "__next_hmr_refresh_hash__";
    const NEXT_URL = "next-url";
    const RSC_CONTENT_TYPE_HEADER = "text/x-component";
    const FLIGHT_HEADERS = [
      RSC_HEADER,
      NEXT_ROUTER_STATE_TREE_HEADER,
      NEXT_ROUTER_PREFETCH_HEADER,
      NEXT_HMR_REFRESH_HEADER,
      NEXT_ROUTER_SEGMENT_PREFETCH_HEADER,
    ];
    const NEXT_RSC_UNION_QUERY = "_rsc";
    const NEXT_ROUTER_STALE_TIME_HEADER = "x-nextjs-stale-time";
    const NEXT_DID_POSTPONE_HEADER = "x-nextjs-postponed";
    const NEXT_REWRITTEN_PATH_HEADER = "x-nextjs-rewritten-path";
    const NEXT_REWRITTEN_QUERY_HEADER = "x-nextjs-rewritten-query";
    const NEXT_IS_PRERENDER_HEADER = "x-nextjs-prerender";
    const NEXT_ACTION_NOT_FOUND_HEADER = "x-nextjs-action-not-found";
    const NEXT_REQUEST_ID_HEADER = "x-nextjs-request-id";
    const NEXT_HTML_REQUEST_ID_HEADER = "x-nextjs-html-request-id";
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/navigation-untracked.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "useUntrackedPathname", {
      enumerable: true,
      get: function () {
        return useUntrackedPathname;
      },
    });
    const _react = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
    );
    const _hooksclientcontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [app-client] (ecmascript)",
    );
    





 function hasFallbackRouteParams() {
      if (typeof window === "undefined") {
        
        const { workUnitAsyncStorage } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/work-unit-async-storage.external.js [app-client] (ecmascript)",
        );
        const workUnitStore = workUnitAsyncStorage.getStore();
        if (!workUnitStore) return false;
        switch (workUnitStore.type) {
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
            const fallbackParams = workUnitStore.fallbackRouteParams;
            return fallbackParams ? fallbackParams.size > 0 : false;
          case "prerender-legacy":
          case "request":
          case "prerender-runtime":
          case "cache":
          case "private-cache":
          case "unstable-cache":
            break;
          default:
            workUnitStore;
        }
        return false;
      }
      return false;
    }
    function useUntrackedPathname() {
      
      
      
      
      if (hasFallbackRouteParams()) {
        return null;
      }
      
      
      
      return (0, _react.useContext)(
        _hooksclientcontextsharedruntime.PathnameContext,
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "createHrefFromUrl", {
      enumerable: true,
      get: function () {
        return createHrefFromUrl;
      },
    });
    function createHrefFromUrl(url, includeHash = true) {
      return url.pathname + url.search + (includeHash ? url.hash : "");
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/nav-failure-handler.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        handleHardNavError: null,
        useNavFailureHandler: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      handleHardNavError: function () {
        return handleHardNavError;
      },
      useNavFailureHandler: function () {
        return useNavFailureHandler;
      },
    });
    const _react = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
    );
    const _createhreffromurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [app-client] (ecmascript)",
    );
    function handleHardNavError(error) {
      if (
        error &&
        typeof window !== "undefined" &&
        window.next.__pendingUrl &&
        (0, _createhreffromurl.createHrefFromUrl)(
          new URL(window.location.href),
        ) !==
          (0, _createhreffromurl.createHrefFromUrl)(window.next.__pendingUrl)
      ) {
        console.error(
          `Error occurred during navigation, falling back to hard navigation`,
          error,
        );
        window.location.href = window.next.__pendingUrl.toString();
        return true;
      }
      return false;
    }
    function useNavFailureHandler() {
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/handle-isr-error.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "HandleISRError", {
      enumerable: true,
      get: function () {
        return HandleISRError;
      },
    });
    const workAsyncStorage =
      typeof window === "undefined"
        ? __turbopack_context__.r(
            "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/work-async-storage.external.js [app-client] (ecmascript)",
          ).workAsyncStorage
        : undefined;
    function HandleISRError({ error }) {
      if (workAsyncStorage) {
        const store = workAsyncStorage.getStore();
        if (store?.isStaticGeneration) {
          if (error) {
            console.error(error);
          }
          throw error;
        }
      }
      return null;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/error-boundary.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use client");
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        ErrorBoundary: null,
        ErrorBoundaryHandler: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      ErrorBoundary: function () {
        return ErrorBoundary;
      },
      ErrorBoundaryHandler: function () {
        return ErrorBoundaryHandler;
      },
    });
    const _interop_require_default = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)",
    );
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    const _react =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      ),
    );
    const _navigationuntracked = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/navigation-untracked.js [app-client] (ecmascript)",
    );
    const _isnextroutererror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/is-next-router-error.js [app-client] (ecmascript)",
    );
    const _navfailurehandler = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/nav-failure-handler.js [app-client] (ecmascript)",
    );
    const _handleisrerror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/handle-isr-error.js [app-client] (ecmascript)",
    );
    const _isbot = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/is-bot.js [app-client] (ecmascript)",
    );
    const isBotUserAgent =
      typeof window !== "undefined" &&
      (0, _isbot.isBot)(window.navigator.userAgent);
    class ErrorBoundaryHandler extends _react.default.Component {
      constructor(props) {
        (super(props),
          (this.reset = () => {
            this.setState({
              error: null,
            });
          }));
        this.state = {
          error: null,
          previousPathname: this.props.pathname,
        };
      }
      static getDerivedStateFromError(error) {
        if ((0, _isnextroutererror.isNextRouterError)(error)) {
          
          
          throw error;
        }
        return {
          error,
        };
      }
      static getDerivedStateFromProps(props, state) {
        const { error } = state;
        
        
        
        
        if (("TURBOPACK compile-time falsy", 0)) 
        ;
        




 if (props.pathname !== state.previousPathname && state.error) {
          return {
            error: null,
            previousPathname: props.pathname,
          };
        }
        return {
          error: state.error,
          previousPathname: props.pathname,
        };
      }
      
      render() {
        
        
        if (this.state.error && !isBotUserAgent) {
          return  (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [
               (0, _jsxruntime.jsx)(
                _handleisrerror.HandleISRError,
                {
                  error: this.state.error,
                },
              ),
              this.props.errorStyles,
              this.props.errorScripts,
               (0, _jsxruntime.jsx)(this.props.errorComponent, {
                error: this.state.error,
                reset: this.reset,
              }),
            ],
          });
        }
        return this.props.children;
      }
    }
    function ErrorBoundary({
      errorComponent,
      errorStyles,
      errorScripts,
      children,
    }) {
      
      
      
      
      const pathname = (0, _navigationuntracked.useUntrackedPathname)();
      if (errorComponent) {
        return  (0, _jsxruntime.jsx)(ErrorBoundaryHandler, {
          pathname: pathname,
          errorComponent: errorComponent,
          errorStyles: errorStyles,
          errorScripts: errorScripts,
          children: children,
        });
      }
      return  (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children,
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/builtin/global-error.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(
      exports, 
      "default",
      {
        enumerable: true,
        get: function () {
          return _default;
        },
      },
    );
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    const _handleisrerror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/handle-isr-error.js [app-client] (ecmascript)",
    );
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
      text: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "28px",
        margin: "0 8px",
      },
    };
    function DefaultGlobalError({ error }) {
      const digest = error?.digest;
      return  (0, _jsxruntime.jsxs)("html", {
        id: "__next_error__",
        children: [
           (0, _jsxruntime.jsx)("head", {}),
           (0, _jsxruntime.jsxs)("body", {
            children: [
               (0, _jsxruntime.jsx)(
                _handleisrerror.HandleISRError,
                {
                  error: error,
                },
              ),
               (0, _jsxruntime.jsx)("div", {
                style: styles.error,
                children:  (0, _jsxruntime.jsxs)("div", {
                  children: [
                     (0, _jsxruntime.jsxs)("h2", {
                      style: styles.text,
                      children: [
                        "Application error: a ",
                        digest ? "server" : "client",
                        "-side exception has occurred while loading ",
                        window.location.hostname,
                        " (see the",
                        " ",
                        digest ? "server logs" : "browser console",
                        " for more information).",
                      ],
                    }),
                    digest
                      ?  (0, _jsxruntime.jsx)("p", {
                          style: styles.text,
                          children: `Digest: ${digest}`,
                        })
                      : null,
                  ],
                }),
              }),
            ],
          }),
        ],
      });
    }
    const _default = DefaultGlobalError;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/runtime-error-handler.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "RuntimeErrorHandler", {
      enumerable: true,
      get: function () {
        return RuntimeErrorHandler;
      },
    });
    const RuntimeErrorHandler = {
      hadRuntimeError: false,
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/not-found.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "notFound", {
      enumerable: true,
      get: function () {
        return notFound;
      },
    });
    const _httpaccessfallback = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-client] (ecmascript)",
    );
    












 const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};404`;
    function notFound() {
      const error = Object.defineProperty(
        new Error(DIGEST),
        "__NEXT_ERROR_CODE",
        {
          value: "E394",
          enumerable: false,
          configurable: true,
        },
      );
      error.digest = DIGEST;
      throw error;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/react-client-callbacks/error-boundary-callbacks.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        onCaughtError: null,
        onUncaughtError: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      onCaughtError: function () {
        return onCaughtError;
      },
      onUncaughtError: function () {
        return onUncaughtError;
      },
    });
    const _interop_require_default = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)",
    );
    const _isnextroutererror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/is-next-router-error.js [app-client] (ecmascript)",
    );
    const _bailouttocsr = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-client] (ecmascript)",
    );
    const _reportglobalerror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/react-client-callbacks/report-global-error.js [app-client] (ecmascript)",
    );
    const _errorboundary = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/error-boundary.js [app-client] (ecmascript)",
    );
    const _globalerror =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/builtin/global-error.js [app-client] (ecmascript)",
      ),
    );
    const devToolErrorMod = ("TURBOPACK compile-time truthy", 1)
      ? __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/next-devtools/userspace/app/errors/index.js [app-client] (ecmascript)",
        )
      : "TURBOPACK unreachable";
    function onCaughtError(thrownValue, errorInfo) {
      const errorBoundaryComponent = errorInfo.errorBoundary?.constructor;
      let isImplicitErrorBoundary;
      if (("TURBOPACK compile-time truthy", 1)) {
        const { AppDevOverlayErrorBoundary } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/next-devtools/userspace/app/app-dev-overlay-error-boundary.js [app-client] (ecmascript)",
        );
        isImplicitErrorBoundary =
          errorBoundaryComponent === AppDevOverlayErrorBoundary;
      }
      isImplicitErrorBoundary =
        isImplicitErrorBoundary ||
        (errorBoundaryComponent === _errorboundary.ErrorBoundaryHandler &&
          errorInfo.errorBoundary.props.errorComponent ===
            _globalerror.default);
      
      if (("TURBOPACK compile-time truthy", 1)) {
        const { SEGMENT_EXPLORER_SIMULATED_ERROR_MESSAGE } =
          __turbopack_context__.r(
            "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.js [app-client] (ecmascript)",
          );
        if (
          thrownValue instanceof Error &&
          thrownValue.message === SEGMENT_EXPLORER_SIMULATED_ERROR_MESSAGE
        ) {
          return;
        }
      }
      if (isImplicitErrorBoundary) {
        
        
        
        return onUncaughtError(thrownValue);
      }
      
      if (
        (0, _bailouttocsr.isBailoutToCSRError)(thrownValue) ||
        (0, _isnextroutererror.isNextRouterError)(thrownValue)
      )
        return;
      if (("TURBOPACK compile-time truthy", 1)) {
        const errorBoundaryName =
          errorBoundaryComponent?.displayName ||
          errorBoundaryComponent?.name ||
          "Unknown";
        const componentThatErroredFrame =
          errorInfo?.componentStack?.split("\n")[1];
        
        const matches = 
          
          componentThatErroredFrame?.match(/\s+at (\w+)\s+|(\w+)@/) ?? [];
        const componentThatErroredName = matches[1] || matches[2] || "Unknown";
        
        const errorBoundaryMessage = `It was handled by the <${errorBoundaryName}> error boundary.`;
        const componentErrorMessage = ("TURBOPACK compile-time truthy", 1)
          ? `The above error occurred in the <${componentThatErroredName}> component.`
          : "TURBOPACK unreachable";
        const errorLocation = `${componentErrorMessage} ${errorBoundaryMessage}`;
        const error = devToolErrorMod.decorateDevError(thrownValue);
        
        devToolErrorMod.originConsoleError(
          "%o\n\n%s",
          thrownValue,
          errorLocation,
        );
        devToolErrorMod.handleClientError(error);
      } 
      else;
    }
    function onUncaughtError(thrownValue) {
      
      if (
        (0, _bailouttocsr.isBailoutToCSRError)(thrownValue) ||
        (0, _isnextroutererror.isNextRouterError)(thrownValue)
      )
        return;
      if (("TURBOPACK compile-time truthy", 1)) {
        const error = devToolErrorMod.decorateDevError(thrownValue);
        
        (0, _reportglobalerror.reportGlobalError)(error);
      } 
      else;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/router-reducer-types.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        ACTION_HMR_REFRESH: null,
        ACTION_NAVIGATE: null,
        ACTION_REFRESH: null,
        ACTION_RESTORE: null,
        ACTION_SERVER_ACTION: null,
        ACTION_SERVER_PATCH: null,
        PrefetchKind: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      ACTION_HMR_REFRESH: function () {
        return ACTION_HMR_REFRESH;
      },
      ACTION_NAVIGATE: function () {
        return ACTION_NAVIGATE;
      },
      ACTION_REFRESH: function () {
        return ACTION_REFRESH;
      },
      ACTION_RESTORE: function () {
        return ACTION_RESTORE;
      },
      ACTION_SERVER_ACTION: function () {
        return ACTION_SERVER_ACTION;
      },
      ACTION_SERVER_PATCH: function () {
        return ACTION_SERVER_PATCH;
      },
      PrefetchKind: function () {
        return PrefetchKind;
      },
    });
    const ACTION_REFRESH = "refresh";
    const ACTION_NAVIGATE = "navigate";
    const ACTION_RESTORE = "restore";
    const ACTION_SERVER_PATCH = "server-patch";
    const ACTION_HMR_REFRESH = "hmr-refresh";
    const ACTION_SERVER_ACTION = "server-action";
    var PrefetchKind =  (function (PrefetchKind) {
      PrefetchKind["AUTO"] = "auto";
      PrefetchKind["FULL"] = "full";
      PrefetchKind["TEMPORARY"] = "temporary";
      return PrefetchKind;
    })({});
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/use-action-queue.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        dispatchAppRouterAction: null,
        useActionQueue: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      dispatchAppRouterAction: function () {
        return dispatchAppRouterAction;
      },
      useActionQueue: function () {
        return useActionQueue;
      },
    });
    const _interop_require_wildcard = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)",
    );
    const _react =  _interop_require_wildcard._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      ),
    );
    const _isthenable = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/is-thenable.js [app-client] (ecmascript)",
    );
    
    
    
    let dispatch = null;
    function dispatchAppRouterAction(action) {
      if (dispatch === null) {
        throw Object.defineProperty(
          new Error(
            "Internal Next.js error: Router action dispatched before initialization.",
          ),
          "__NEXT_ERROR_CODE",
          {
            value: "E668",
            enumerable: false,
            configurable: true,
          },
        );
      }
      dispatch(action);
    }
    const __DEV__ =
      ("TURBOPACK compile-time value", "development") !== "production";
    const promisesWithDebugInfo = ("TURBOPACK compile-time truthy", 1)
      ? new WeakMap()
      : "TURBOPACK unreachable";
    function useActionQueue(actionQueue) {
      const [state, setState] = _react.default.useState(actionQueue.state);
      
      
      
      
      
      
      
      if (("TURBOPACK compile-time truthy", 1)) {
        const { useAppDevRenderingIndicator } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/next-devtools/userspace/use-app-dev-rendering-indicator.js [app-client] (ecmascript)",
        );
        
        const appDevRenderingIndicator = useAppDevRenderingIndicator();
        dispatch = (action) => {
          appDevRenderingIndicator(() => {
            actionQueue.dispatch(action, setState);
          });
        };
      } 
      else;
      
      
      
      
      
      const stateWithDebugInfo = (0, _react.useMemo)(() => {
        if (("TURBOPACK compile-time falsy", 0)) 
        ;
        if ((0, _isthenable.isThenable)(state)) {
          
          
          let promiseWithDebugInfo = promisesWithDebugInfo.get(state);
          if (promiseWithDebugInfo === undefined) {
            const debugInfo = [];
            promiseWithDebugInfo = Promise.resolve(state).then((asyncState) => {
              if (asyncState.debugInfo !== null) {
                debugInfo.push(...asyncState.debugInfo);
              }
              return asyncState;
            });
            promiseWithDebugInfo._debugInfo = debugInfo;
            promisesWithDebugInfo.set(state, promiseWithDebugInfo);
          }
          return promiseWithDebugInfo;
        }
        return state;
      }, [state]);
      return (0, _isthenable.isThenable)(stateWithDebugInfo)
        ? (0, _react.use)(stateWithDebugInfo)
        : stateWithDebugInfo;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-call-server.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "callServer", {
      enumerable: true,
      get: function () {
        return callServer;
      },
    });
    const _react = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
    );
    const _routerreducertypes = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/router-reducer-types.js [app-client] (ecmascript)",
    );
    const _useactionqueue = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/use-action-queue.js [app-client] (ecmascript)",
    );
    async function callServer(actionId, actionArgs) {
      return new Promise((resolve, reject) => {
        (0, _react.startTransition)(() => {
          (0, _useactionqueue.dispatchAppRouterAction)({
            type: _routerreducertypes.ACTION_SERVER_ACTION,
            actionId,
            actionArgs,
            resolve,
            reject,
          });
        });
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-find-source-map-url.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "findSourceMapURL", {
      enumerable: true,
      get: function () {
        return findSourceMapURL;
      },
    });
    const basePath = ("TURBOPACK compile-time value", "") || "";
    const pathname = `${basePath}/__nextjs_source-map`;
    const findSourceMapURL = ("TURBOPACK compile-time truthy", 1)
      ? function findSourceMapURL(filename) {
          if (filename === "") {
            return null;
          }
          if (
            filename.startsWith(document.location.origin) &&
            filename.includes("/_next/static")
          ) {
            
            
            
            
            
            
            
            return `${filename}.map`;
          }
          const url = new URL(pathname, document.location.origin);
          url.searchParams.set("filename", filename);
          return url.href;
        }
      : "TURBOPACK unreachable";
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/match-segments.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "matchSegment", {
      enumerable: true,
      get: function () {
        return matchSegment;
      },
    });
    const matchSegment = (existingSegment, segment) => {
      
      if (typeof existingSegment === "string") {
        if (typeof segment === "string") {
          
          return existingSegment === segment;
        }
        return false;
      }
      if (typeof segment === "string") {
        return false;
      }
      return (
        existingSegment[0] === segment[0] && existingSegment[1] === segment[1]
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/compute-changed-path.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        computeChangedPath: null,
        extractPathFromFlightRouterState: null,
        getSelectedParams: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      computeChangedPath: function () {
        return computeChangedPath;
      },
      extractPathFromFlightRouterState: function () {
        return extractPathFromFlightRouterState;
      },
      getSelectedParams: function () {
        return getSelectedParams;
      },
    });
    const _interceptionroutes = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/interception-routes.js [app-client] (ecmascript)",
    );
    const _segment = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)",
    );
    const _matchsegments = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/match-segments.js [app-client] (ecmascript)",
    );
    const removeLeadingSlash = (segment) => {
      return segment[0] === "/" ? segment.slice(1) : segment;
    };
    const segmentToPathname = (segment) => {
      if (typeof segment === "string") {
        
        
        if (segment === "children") return "";
        return segment;
      }
      return segment[1];
    };
    function normalizeSegments(segments) {
      return (
        segments.reduce((acc, segment) => {
          segment = removeLeadingSlash(segment);
          if (segment === "" || (0, _segment.isGroupSegment)(segment)) {
            return acc;
          }
          return `${acc}/${segment}`;
        }, "") || "/"
      );
    }
    function extractPathFromFlightRouterState(flightRouterState) {
      const segment = Array.isArray(flightRouterState[0])
        ? flightRouterState[0][1]
        : flightRouterState[0];
      if (
        segment === _segment.DEFAULT_SEGMENT_KEY ||
        _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m) =>
          segment.startsWith(m),
        )
      )
        return undefined;
      if (segment.startsWith(_segment.PAGE_SEGMENT_KEY)) return "";
      const segments = [segmentToPathname(segment)];
      const parallelRoutes = flightRouterState[1] ?? {};
      const childrenPath = parallelRoutes.children
        ? extractPathFromFlightRouterState(parallelRoutes.children)
        : undefined;
      if (childrenPath !== undefined) {
        segments.push(childrenPath);
      } else {
        for (const [key, value] of Object.entries(parallelRoutes)) {
          if (key === "children") continue;
          const childPath = extractPathFromFlightRouterState(value);
          if (childPath !== undefined) {
            segments.push(childPath);
          }
        }
      }
      return normalizeSegments(segments);
    }
    function computeChangedPathImpl(treeA, treeB) {
      const [segmentA, parallelRoutesA] = treeA;
      const [segmentB, parallelRoutesB] = treeB;
      const normalizedSegmentA = segmentToPathname(segmentA);
      const normalizedSegmentB = segmentToPathname(segmentB);
      if (
        _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some(
          (m) =>
            normalizedSegmentA.startsWith(m) ||
            normalizedSegmentB.startsWith(m),
        )
      ) {
        return "";
      }
      if (!(0, _matchsegments.matchSegment)(segmentA, segmentB)) {
        
        return extractPathFromFlightRouterState(treeB) ?? "";
      }
      for (const parallelRouterKey in parallelRoutesA) {
        if (parallelRoutesB[parallelRouterKey]) {
          const changedPath = computeChangedPathImpl(
            parallelRoutesA[parallelRouterKey],
            parallelRoutesB[parallelRouterKey],
          );
          if (changedPath !== null) {
            return `${segmentToPathname(segmentB)}/${changedPath}`;
          }
        }
      }
      return null;
    }
    function computeChangedPath(treeA, treeB) {
      const changedPath = computeChangedPathImpl(treeA, treeB);
      if (changedPath == null || changedPath === "/") {
        return changedPath;
      }
      
      return normalizeSegments(changedPath.split("/"));
    }
    function getSelectedParams(currentTree, params = {}) {
      const parallelRoutes = currentTree[1];
      for (const parallelRoute of Object.values(parallelRoutes)) {
        const segment = parallelRoute[0];
        const isDynamicParameter = Array.isArray(segment);
        const segmentValue = isDynamicParameter ? segment[1] : segment;
        if (!segmentValue || segmentValue.startsWith(_segment.PAGE_SEGMENT_KEY))
          continue;
        
        const isCatchAll =
          isDynamicParameter && (segment[2] === "c" || segment[2] === "oc");
        if (isCatchAll) {
          params[segment[0]] = segment[1].split("/");
        } else if (isDynamicParameter) {
          params[segment[0]] = segment[1];
        }
        params = getSelectedParams(parallelRoute, params);
      }
      return params;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/handle-mutable.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "handleMutable", {
      enumerable: true,
      get: function () {
        return handleMutable;
      },
    });
    const _computechangedpath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/compute-changed-path.js [app-client] (ecmascript)",
    );
    function isNotUndefined(value) {
      return typeof value !== "undefined";
    }
    function handleMutable(state, mutable) {
      
      const shouldScroll = mutable.shouldScroll ?? true;
      let previousNextUrl = state.previousNextUrl;
      let nextUrl = state.nextUrl;
      if (isNotUndefined(mutable.patchedTree)) {
        
        const changedPath = (0, _computechangedpath.computeChangedPath)(
          state.tree,
          mutable.patchedTree,
        );
        if (changedPath) {
          
          previousNextUrl = nextUrl;
          nextUrl = changedPath;
        } else if (!nextUrl) {
          
          nextUrl = state.canonicalUrl;
        }
        
      }
      return {
        
        canonicalUrl: mutable.canonicalUrl ?? state.canonicalUrl,
        renderedSearch: mutable.renderedSearch ?? state.renderedSearch,
        pushRef: {
          pendingPush: isNotUndefined(mutable.pendingPush)
            ? mutable.pendingPush
            : state.pushRef.pendingPush,
          mpaNavigation: isNotUndefined(mutable.mpaNavigation)
            ? mutable.mpaNavigation
            : state.pushRef.mpaNavigation,
          preserveCustomHistoryState: isNotUndefined(
            mutable.preserveCustomHistoryState,
          )
            ? mutable.preserveCustomHistoryState
            : state.pushRef.preserveCustomHistoryState,
        },
        
        focusAndScrollRef: {
          apply: shouldScroll
            ? isNotUndefined(mutable?.scrollableSegments)
              ? true
              : state.focusAndScrollRef.apply
            : false,
          onlyHashChange: mutable.onlyHashChange || false,
          hashFragment: shouldScroll
            ? mutable.hashFragment && mutable.hashFragment !== ""
              ? decodeURIComponent(mutable.hashFragment.slice(1))
              : state.focusAndScrollRef.hashFragment
            : null,
          segmentPaths: shouldScroll
            ? (mutable?.scrollableSegments ??
              state.focusAndScrollRef.segmentPaths)
            : [],
        },
        
        cache: mutable.cache ? mutable.cache : state.cache,
        
        tree: isNotUndefined(mutable.patchedTree)
          ? mutable.patchedTree
          : state.tree,
        nextUrl,
        previousNextUrl: previousNextUrl,
        debugInfo: mutable.collectedDebugInfo ?? null,
      };
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/route-params.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        doesStaticSegmentAppearInURL: null,
        getCacheKeyForDynamicParam: null,
        getParamValueFromCacheKey: null,
        getRenderedPathname: null,
        getRenderedSearch: null,
        parseDynamicParamFromURLPart: null,
        urlSearchParamsToParsedUrlQuery: null,
        urlToUrlWithoutFlightMarker: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      doesStaticSegmentAppearInURL: function () {
        return doesStaticSegmentAppearInURL;
      },
      getCacheKeyForDynamicParam: function () {
        return getCacheKeyForDynamicParam;
      },
      getParamValueFromCacheKey: function () {
        return getParamValueFromCacheKey;
      },
      getRenderedPathname: function () {
        return getRenderedPathname;
      },
      getRenderedSearch: function () {
        return getRenderedSearch;
      },
      parseDynamicParamFromURLPart: function () {
        return parseDynamicParamFromURLPart;
      },
      urlSearchParamsToParsedUrlQuery: function () {
        return urlSearchParamsToParsedUrlQuery;
      },
      urlToUrlWithoutFlightMarker: function () {
        return urlToUrlWithoutFlightMarker;
      },
    });
    const _segment = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)",
    );
    const _segmentvalueencoding = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment-cache/segment-value-encoding.js [app-client] (ecmascript)",
    );
    const _approuterheaders = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-headers.js [app-client] (ecmascript)",
    );
    function getRenderedSearch(response) {
      
      
      
      const rewrittenQuery = response.headers.get(
        _approuterheaders.NEXT_REWRITTEN_QUERY_HEADER,
      );
      if (rewrittenQuery !== null) {
        return rewrittenQuery === "" ? "" : "?" + rewrittenQuery;
      }
      
      
      return urlToUrlWithoutFlightMarker(new URL(response.url)).search;
    }
    function getRenderedPathname(response) {
      
      
      
      const rewrittenPath = response.headers.get(
        _approuterheaders.NEXT_REWRITTEN_PATH_HEADER,
      );
      return (
        rewrittenPath ??
        urlToUrlWithoutFlightMarker(new URL(response.url)).pathname
      );
    }
    function parseDynamicParamFromURLPart(paramType, pathnameParts, partIndex) {
      
      switch (paramType) {
        
        case "c": {
          
          
          return partIndex < pathnameParts.length
            ? pathnameParts.slice(partIndex).map((s) => encodeURIComponent(s))
            : [];
        }
        
        case "ci(..)(..)":
        case "ci(.)":
        case "ci(..)":
        case "ci(...)": {
          const prefix = paramType.length - 2;
          return partIndex < pathnameParts.length
            ? pathnameParts.slice(partIndex).map((s, i) => {
                if (i === 0) {
                  return encodeURIComponent(s.slice(prefix));
                }
                return encodeURIComponent(s);
              })
            : [];
        }
        
        case "oc": {
          
          
          return partIndex < pathnameParts.length
            ? pathnameParts.slice(partIndex).map((s) => encodeURIComponent(s))
            : null;
        }
        
        case "d": {
          if (partIndex >= pathnameParts.length) {
            
            
            
            
            
            
            
            return "";
          }
          return encodeURIComponent(pathnameParts[partIndex]);
        }
        
        case "di(..)(..)":
        case "di(.)":
        case "di(..)":
        case "di(...)": {
          const prefix = paramType.length - 2;
          if (partIndex >= pathnameParts.length) {
            
            
            
            
            
            
            
            return "";
          }
          return encodeURIComponent(pathnameParts[partIndex].slice(prefix));
        }
        default:
          paramType;
          return "";
      }
    }
    function doesStaticSegmentAppearInURL(segment) {
      
      
      
      
      
      
      
      if (
        segment === _segmentvalueencoding.ROOT_SEGMENT_REQUEST_KEY || 
        
        
        
        
        segment.startsWith(_segment.PAGE_SEGMENT_KEY) || 
        (segment[0] === "(" && segment.endsWith(")")) ||
        segment === _segment.DEFAULT_SEGMENT_KEY ||
        segment === "/_not-found"
      ) {
        return false;
      } else {
        
        return true;
      }
    }
    function getCacheKeyForDynamicParam(paramValue, renderedSearch) {
      
      
      
      if (typeof paramValue === "string") {
        
        
        
        const pageSegmentWithSearchParams = (0,
        _segment.addSearchParamsIfPageSegment)(
          paramValue,
          Object.fromEntries(new URLSearchParams(renderedSearch)),
        );
        return pageSegmentWithSearchParams;
      } else if (paramValue === null) {
        return "";
      } else {
        return paramValue.join("/");
      }
    }
    function urlToUrlWithoutFlightMarker(url) {
      const urlWithoutFlightParameters = new URL(url);
      urlWithoutFlightParameters.searchParams.delete(
        _approuterheaders.NEXT_RSC_UNION_QUERY,
      );
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
      return urlWithoutFlightParameters;
    }
    function getParamValueFromCacheKey(paramCacheKey, paramType) {
      
      
      const isCatchAll = paramType === "c" || paramType === "oc";
      if (isCatchAll) {
        
        
        
        
        
        
        return paramCacheKey.split("/");
      }
      return paramCacheKey;
    }
    function urlSearchParamsToParsedUrlQuery(searchParams) {
      
      
      
      const result = {};
      for (const [key, value] of searchParams.entries()) {
        if (result[key] === undefined) {
          result[key] = value;
        } else if (Array.isArray(result[key])) {
          result[key].push(value);
        } else {
          result[key] = [result[key], value];
        }
      }
      return result;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/flight-data-helpers.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        createInitialRSCPayloadFromFallbackPrerender: null,
        getFlightDataPartsFromPath: null,
        getNextFlightSegmentPath: null,
        normalizeFlightData: null,
        prepareFlightRouterStateForRequest: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      createInitialRSCPayloadFromFallbackPrerender: function () {
        return createInitialRSCPayloadFromFallbackPrerender;
      },
      getFlightDataPartsFromPath: function () {
        return getFlightDataPartsFromPath;
      },
      getNextFlightSegmentPath: function () {
        return getNextFlightSegmentPath;
      },
      normalizeFlightData: function () {
        return normalizeFlightData;
      },
      prepareFlightRouterStateForRequest: function () {
        return prepareFlightRouterStateForRequest;
      },
    });
    const _segment = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)",
    );
    const _routeparams = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/route-params.js [app-client] (ecmascript)",
    );
    const _createhreffromurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [app-client] (ecmascript)",
    );
    function getFlightDataPartsFromPath(flightDataPath) {
      
      const flightDataPathLength = 4;
      
      const [tree, seedData, head, isHeadPartial] =
        flightDataPath.slice(-flightDataPathLength);
      
      const segmentPath = flightDataPath.slice(0, -flightDataPathLength);
      return {
        
        
        
        pathToSegment: segmentPath.slice(0, -1),
        segmentPath,
        
        
        segment: segmentPath[segmentPath.length - 1] ?? "",
        tree,
        seedData,
        head,
        isHeadPartial,
        isRootRender: flightDataPath.length === flightDataPathLength,
      };
    }
    function createInitialRSCPayloadFromFallbackPrerender(
      response,
      fallbackInitialRSCPayload,
    ) {
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      const renderedPathname = (0, _routeparams.getRenderedPathname)(response);
      const renderedSearch = (0, _routeparams.getRenderedSearch)(response);
      const canonicalUrl = (0, _createhreffromurl.createHrefFromUrl)(
        new URL(location.href),
      );
      const originalFlightDataPath = fallbackInitialRSCPayload.f[0];
      const originalFlightRouterState = originalFlightDataPath[0];
      return {
        b: fallbackInitialRSCPayload.b,
        c: canonicalUrl.split("/"),
        q: renderedSearch,
        i: fallbackInitialRSCPayload.i,
        f: [
          [
            fillInFallbackFlightRouterState(
              originalFlightRouterState,
              renderedPathname,
              renderedSearch,
            ),
            originalFlightDataPath[1],
            originalFlightDataPath[2],
            originalFlightDataPath[2],
          ],
        ],
        m: fallbackInitialRSCPayload.m,
        G: fallbackInitialRSCPayload.G,
        S: fallbackInitialRSCPayload.S,
      };
    }
    function fillInFallbackFlightRouterState(
      flightRouterState,
      renderedPathname,
      renderedSearch,
    ) {
      const pathnameParts = renderedPathname.split("/").filter((p) => p !== "");
      const index = 0;
      return fillInFallbackFlightRouterStateImpl(
        flightRouterState,
        renderedSearch,
        pathnameParts,
        index,
      );
    }
    function fillInFallbackFlightRouterStateImpl(
      flightRouterState,
      renderedSearch,
      pathnameParts,
      pathnamePartsIndex,
    ) {
      const originalSegment = flightRouterState[0];
      let newSegment;
      let doesAppearInURL;
      if (typeof originalSegment === "string") {
        newSegment = originalSegment;
        doesAppearInURL = (0, _routeparams.doesStaticSegmentAppearInURL)(
          originalSegment,
        );
      } else {
        const paramName = originalSegment[0];
        const paramType = originalSegment[2];
        const paramValue = (0, _routeparams.parseDynamicParamFromURLPart)(
          paramType,
          pathnameParts,
          pathnamePartsIndex,
        );
        const cacheKey = (0, _routeparams.getCacheKeyForDynamicParam)(
          paramValue,
          renderedSearch,
        );
        newSegment = [paramName, cacheKey, paramType];
        doesAppearInURL = true;
      }
      
      
      const childPathnamePartsIndex = doesAppearInURL
        ? pathnamePartsIndex + 1
        : pathnamePartsIndex;
      const children = flightRouterState[1];
      const newChildren = {};
      for (let key in children) {
        const childFlightRouterState = children[key];
        newChildren[key] = fillInFallbackFlightRouterStateImpl(
          childFlightRouterState,
          renderedSearch,
          pathnameParts,
          childPathnamePartsIndex,
        );
      }
      const newState = [
        newSegment,
        newChildren,
        null,
        flightRouterState[3],
        flightRouterState[4],
      ];
      return newState;
    }
    function getNextFlightSegmentPath(flightSegmentPath) {
      
      
      return flightSegmentPath.slice(2);
    }
    function normalizeFlightData(flightData) {
      
      
      if (typeof flightData === "string") {
        return flightData;
      }
      return flightData.map((flightDataPath) =>
        getFlightDataPartsFromPath(flightDataPath),
      );
    }
    function prepareFlightRouterStateForRequest(
      flightRouterState,
      isHmrRefresh,
    ) {
      
      if (isHmrRefresh) {
        return encodeURIComponent(JSON.stringify(flightRouterState));
      }
      return encodeURIComponent(
        JSON.stringify(
          stripClientOnlyDataFromFlightRouterState(flightRouterState),
        ),
      );
    }
    


 function stripClientOnlyDataFromFlightRouterState(flightRouterState) {
      const [
        segment,
        parallelRoutes,
        _url,
        refreshMarker,
        isRootLayout,
        hasLoadingBoundary,
      ] = flightRouterState;
      
      
      const cleanedSegment = stripSearchParamsFromPageSegment(segment);
      
      const cleanedParallelRoutes = {};
      for (const [key, childState] of Object.entries(parallelRoutes)) {
        cleanedParallelRoutes[key] =
          stripClientOnlyDataFromFlightRouterState(childState);
      }
      const result = [
        cleanedSegment,
        cleanedParallelRoutes,
        null,
        shouldPreserveRefreshMarker(refreshMarker) ? refreshMarker : null,
      ];
      
      if (isRootLayout !== undefined) {
        result[4] = isRootLayout;
      }
      if (hasLoadingBoundary !== undefined) {
        result[5] = hasLoadingBoundary;
      }
      return result;
    }
    


 function stripSearchParamsFromPageSegment(segment) {
      if (
        typeof segment === "string" &&
        segment.startsWith(_segment.PAGE_SEGMENT_KEY + "?")
      ) {
        return _segment.PAGE_SEGMENT_KEY;
      }
      return segment;
    }
    



 function shouldPreserveRefreshMarker(refreshMarker) {
      return Boolean(refreshMarker && refreshMarker !== "refresh");
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-build-id.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    
    
    
    
    
    
    
    
    
    
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        getAppBuildId: null,
        setAppBuildId: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      getAppBuildId: function () {
        return getAppBuildId;
      },
      setAppBuildId: function () {
        return setAppBuildId;
      },
    });
    let globalBuildId = "";
    function setAppBuildId(buildId) {
      globalBuildId = buildId;
    }
    function getAppBuildId() {
      return globalBuildId;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/set-cache-busting-search-param.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        setCacheBustingSearchParam: null,
        setCacheBustingSearchParamWithHash: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      setCacheBustingSearchParam: function () {
        return setCacheBustingSearchParam;
      },
      setCacheBustingSearchParamWithHash: function () {
        return setCacheBustingSearchParamWithHash;
      },
    });
    const _cachebustingsearchparam = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/cache-busting-search-param.js [app-client] (ecmascript)",
    );
    const _approuterheaders = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-headers.js [app-client] (ecmascript)",
    );
    const setCacheBustingSearchParam = (url, headers) => {
      const uniqueCacheKey = (0,
      _cachebustingsearchparam.computeCacheBustingSearchParam)(
        headers[_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER],
        headers[_approuterheaders.NEXT_ROUTER_SEGMENT_PREFETCH_HEADER],
        headers[_approuterheaders.NEXT_ROUTER_STATE_TREE_HEADER],
        headers[_approuterheaders.NEXT_URL],
      );
      setCacheBustingSearchParamWithHash(url, uniqueCacheKey);
    };
    const setCacheBustingSearchParamWithHash = (url, hash) => {
      









 const existingSearch = url.search;
      const rawQuery = existingSearch.startsWith("?")
        ? existingSearch.slice(1)
        : existingSearch;
      
      
      const pairs = rawQuery
        .split("&")
        .filter(
          (pair) =>
            pair &&
            !pair.startsWith(`${_approuterheaders.NEXT_RSC_UNION_QUERY}=`),
        );
      if (hash.length > 0) {
        pairs.push(`${_approuterheaders.NEXT_RSC_UNION_QUERY}=${hash}`);
      } else {
        pairs.push(`${_approuterheaders.NEXT_RSC_UNION_QUERY}`);
      }
      url.search = pairs.length ? `?${pairs.join("&")}` : "";
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fetch-server-response.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use client");
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        createFetch: null,
        createFromNextReadableStream: null,
        fetchServerResponse: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      createFetch: function () {
        return createFetch;
      },
      createFromNextReadableStream: function () {
        return createFromNextReadableStream;
      },
      fetchServerResponse: function () {
        return fetchServerResponse;
      },
    });
    const _client = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react-server-dom-turbopack/client.js [app-client] (ecmascript)",
    );
    const _approuterheaders = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-headers.js [app-client] (ecmascript)",
    );
    const _appcallserver = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-call-server.js [app-client] (ecmascript)",
    );
    const _appfindsourcemapurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-find-source-map-url.js [app-client] (ecmascript)",
    );
    const _routerreducertypes = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/router-reducer-types.js [app-client] (ecmascript)",
    );
    const _flightdatahelpers = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/flight-data-helpers.js [app-client] (ecmascript)",
    );
    const _appbuildid = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-build-id.js [app-client] (ecmascript)",
    );
    const _setcachebustingsearchparam = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/set-cache-busting-search-param.js [app-client] (ecmascript)",
    );
    const _routeparams = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/route-params.js [app-client] (ecmascript)",
    );
    const createFromReadableStream = _client.createFromReadableStream;
    const createFromFetch = _client.createFromFetch;
    let createDebugChannel;
    if (("TURBOPACK compile-time falsy", 0)) 
    ;
    function doMpaNavigation(url) {
      return (0, _routeparams.urlToUrlWithoutFlightMarker)(
        new URL(url, location.origin),
      ).toString();
    }
    let isPageUnloading = false;
    if (typeof window !== "undefined") {
      
      
      
      window.addEventListener("pagehide", () => {
        isPageUnloading = true;
      });
      
      
      window.addEventListener("pageshow", () => {
        isPageUnloading = false;
      });
    }
    async function fetchServerResponse(url, options) {
      const { flightRouterState, nextUrl, prefetchKind } = options;
      const headers = {
        
        [_approuterheaders.RSC_HEADER]: "1",
        
        [_approuterheaders.NEXT_ROUTER_STATE_TREE_HEADER]: (0,
        _flightdatahelpers.prepareFlightRouterStateForRequest)(
          flightRouterState,
          options.isHmrRefresh,
        ),
      };
      




 if (prefetchKind === _routerreducertypes.PrefetchKind.AUTO) {
        headers[_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER] = "1";
      }
      if (
        ("TURBOPACK compile-time value", "development") === "development" &&
        options.isHmrRefresh
      ) {
        headers[_approuterheaders.NEXT_HMR_REFRESH_HEADER] = "1";
      }
      if (nextUrl) {
        headers[_approuterheaders.NEXT_URL] = nextUrl;
      }
      
      
      const originalUrl = url;
      try {
        
        
        
        
        const fetchPriority = prefetchKind
          ? prefetchKind === _routerreducertypes.PrefetchKind.TEMPORARY
            ? "high"
            : "low"
          : "auto";
        if (("TURBOPACK compile-time falsy", 0)) 
        ;
        
        
        
        const isLegacyPPR =
          ("TURBOPACK compile-time value", false) &&
          !("TURBOPACK compile-time value", false);
        const shouldImmediatelyDecode = !isLegacyPPR;
        const res = await createFetch(
          url,
          headers,
          fetchPriority,
          shouldImmediatelyDecode,
        );
        const responseUrl = (0, _routeparams.urlToUrlWithoutFlightMarker)(
          new URL(res.url),
        );
        const canonicalUrl = res.redirected ? responseUrl : originalUrl;
        const contentType = res.headers.get("content-type") || "";
        const interception = !!res.headers
          .get("vary")
          ?.includes(_approuterheaders.NEXT_URL);
        const postponed = !!res.headers.get(
          _approuterheaders.NEXT_DID_POSTPONE_HEADER,
        );
        const staleTimeHeaderSeconds = res.headers.get(
          _approuterheaders.NEXT_ROUTER_STALE_TIME_HEADER,
        );
        const staleTime =
          staleTimeHeaderSeconds !== null
            ? parseInt(staleTimeHeaderSeconds, 10) * 1000
            : -1;
        let isFlightResponse = contentType.startsWith(
          _approuterheaders.RSC_CONTENT_TYPE_HEADER,
        );
        if (("TURBOPACK compile-time falsy", 0)) 
        ;
        
        
        if (!isFlightResponse || !res.ok || !res.body) {
          
          if (url.hash) {
            responseUrl.hash = url.hash;
          }
          return doMpaNavigation(responseUrl.toString());
        }
        
        
        
        
        
        
        
        if (("TURBOPACK compile-time falsy", 0)) 
        ;
        let flightResponsePromise = res.flightResponse;
        if (flightResponsePromise === null) {
          
          
          
          
          
          const flightStream = postponed
            ? createUnclosingPrefetchStream(res.body)
            : res.body;
          flightResponsePromise = createFromNextReadableStream(
            flightStream,
            headers,
          );
        }
        const flightResponse = await flightResponsePromise;
        if ((0, _appbuildid.getAppBuildId)() !== flightResponse.b) {
          return doMpaNavigation(res.url);
        }
        const normalizedFlightData = (0,
        _flightdatahelpers.normalizeFlightData)(flightResponse.f);
        if (typeof normalizedFlightData === "string") {
          return doMpaNavigation(normalizedFlightData);
        }
        return {
          flightData: normalizedFlightData,
          canonicalUrl: canonicalUrl,
          renderedSearch: (0, _routeparams.getRenderedSearch)(res),
          couldBeIntercepted: interception,
          prerendered: flightResponse.S,
          postponed,
          staleTime,
          debugInfo: flightResponsePromise._debugInfo ?? null,
        };
      } catch (err) {
        if (!isPageUnloading) {
          console.error(
            `Failed to fetch RSC payload for ${originalUrl}. Falling back to browser navigation.`,
            err,
          );
        }
        
        
        
        return originalUrl.toString();
      }
    }
    async function createFetch(
      url,
      headers,
      fetchPriority,
      shouldImmediatelyDecode,
      signal,
    ) {
      
      
      
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
      if (("TURBOPACK compile-time truthy", 1)) {
        if (self.__next_r) {
          headers[_approuterheaders.NEXT_HTML_REQUEST_ID_HEADER] =
            self.__next_r;
        }
        
        
        
        headers[_approuterheaders.NEXT_REQUEST_ID_HEADER] = crypto
          .getRandomValues(new Uint32Array(1))[0]
          .toString(16);
      }
      const fetchOptions = {
        
        credentials: "same-origin",
        headers,
        priority: fetchPriority || undefined,
        signal,
      };
      
      
      
      let fetchUrl = new URL(url);
      (0, _setcachebustingsearchparam.setCacheBustingSearchParam)(
        fetchUrl,
        headers,
      );
      let fetchPromise = fetch(fetchUrl, fetchOptions);
      
      
      
      
      
      
      
      
      
      
      let flightResponsePromise = shouldImmediatelyDecode
        ? createFromNextFetch(fetchPromise, headers)
        : null;
      let browserResponse = await fetchPromise;
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      let redirected = browserResponse.redirected;
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
      
      
      const responseUrl = new URL(browserResponse.url, fetchUrl);
      responseUrl.searchParams.delete(_approuterheaders.NEXT_RSC_UNION_QUERY);
      const rscResponse = {
        url: responseUrl.href,
        
        
        
        
        redirected,
        
        
        
        ok: browserResponse.ok,
        headers: browserResponse.headers,
        body: browserResponse.body,
        status: browserResponse.status,
        
        
        
        flightResponse: flightResponsePromise,
      };
      return rscResponse;
    }
    function createFromNextReadableStream(flightStream, requestHeaders) {
      return createFromReadableStream(flightStream, {
        callServer: _appcallserver.callServer,
        findSourceMapURL: _appfindsourcemapurl.findSourceMapURL,
        debugChannel: createDebugChannel && createDebugChannel(requestHeaders),
      });
    }
    function createFromNextFetch(promiseForResponse, requestHeaders) {
      return createFromFetch(promiseForResponse, {
        callServer: _appcallserver.callServer,
        findSourceMapURL: _appfindsourcemapurl.findSourceMapURL,
        debugChannel: createDebugChannel && createDebugChannel(requestHeaders),
      });
    }
    function createUnclosingPrefetchStream(originalFlightStream) {
      
      
      
      
      
      
      
      
      
      
      
      const reader = originalFlightStream.getReader();
      return new ReadableStream({
        async pull(controller) {
          while (true) {
            const { done, value } = await reader.read();
            if (!done) {
              
              
              controller.enqueue(value);
              continue;
            }
            
            
            return;
          }
        },
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-router-cache-key.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "createRouterCacheKey", {
      enumerable: true,
      get: function () {
        return createRouterCacheKey;
      },
    });
    const _segment = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)",
    );
    function createRouterCacheKey(segment, withoutSearchParameters = false) {
      
      
      if (Array.isArray(segment)) {
        return `${segment[0]}|${segment[1]}|${segment[2]}`;
      }
      
      
      if (
        withoutSearchParameters &&
        segment.startsWith(_segment.PAGE_SEGMENT_KEY)
      ) {
        return _segment.PAGE_SEGMENT_KEY;
      }
      return segment;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/is-navigating-to-new-root-layout.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "isNavigatingToNewRootLayout", {
      enumerable: true,
      get: function () {
        return isNavigatingToNewRootLayout;
      },
    });
    function isNavigatingToNewRootLayout(currentTree, nextTree) {
      
      const currentTreeSegment = currentTree[0];
      const nextTreeSegment = nextTree[0];
      
      
      
      if (Array.isArray(currentTreeSegment) && Array.isArray(nextTreeSegment)) {
        
        
        if (
          currentTreeSegment[0] !== nextTreeSegment[0] ||
          currentTreeSegment[2] !== nextTreeSegment[2]
        ) {
          return true;
        }
      } else if (currentTreeSegment !== nextTreeSegment) {
        return true;
      }
      
      if (currentTree[4]) {
        
        return !nextTree[4];
      }
      
      if (nextTree[4]) {
        return true;
      }
      
      
      
      const currentTreeChild = Object.values(currentTree[1])[0];
      const nextTreeChild = Object.values(nextTree[1])[0];
      if (!currentTreeChild || !nextTreeChild) return true;
      return isNavigatingToNewRootLayout(currentTreeChild, nextTreeChild);
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/ppr-navigations.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        abortTask: null,
        listenForDynamicRequest: null,
        startPPRNavigation: null,
        updateCacheNodeOnPopstateRestoration: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      abortTask: function () {
        return abortTask;
      },
      listenForDynamicRequest: function () {
        return listenForDynamicRequest;
      },
      startPPRNavigation: function () {
        return startPPRNavigation;
      },
      updateCacheNodeOnPopstateRestoration: function () {
        return updateCacheNodeOnPopstateRestoration;
      },
    });
    const _segment = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)",
    );
    const _matchsegments = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/match-segments.js [app-client] (ecmascript)",
    );
    const _createhreffromurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [app-client] (ecmascript)",
    );
    const _createroutercachekey = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-router-cache-key.js [app-client] (ecmascript)",
    );
    const _isnavigatingtonewrootlayout = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/is-navigating-to-new-root-layout.js [app-client] (ecmascript)",
    );
    const _navigatereducer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/navigate-reducer.js [app-client] (ecmascript)",
    );
    const MPA_NAVIGATION_TASK = {
      route: null,
      node: null,
      dynamicRequestTree: null,
      children: null,
    };
    function startPPRNavigation(
      navigatedAt,
      oldUrl,
      oldCacheNode,
      oldRouterState,
      newRouterState,
      prefetchData,
      prefetchHead,
      isPrefetchHeadPartial,
      isSamePageNavigation,
      scrollableSegmentsResult,
    ) {
      const segmentPath = [];
      return updateCacheNodeOnNavigation(
        navigatedAt,
        oldUrl,
        oldCacheNode,
        oldRouterState,
        newRouterState,
        false,
        prefetchData,
        prefetchHead,
        isPrefetchHeadPartial,
        isSamePageNavigation,
        segmentPath,
        scrollableSegmentsResult,
      );
    }
    function updateCacheNodeOnNavigation(
      navigatedAt,
      oldUrl,
      oldCacheNode,
      oldRouterState,
      newRouterState,
      didFindRootLayout,
      prefetchData,
      prefetchHead,
      isPrefetchHeadPartial,
      isSamePageNavigation,
      segmentPath,
      scrollableSegmentsResult,
    ) {
      
      const oldRouterStateChildren = oldRouterState[1];
      const newRouterStateChildren = newRouterState[1];
      const prefetchDataChildren =
        prefetchData !== null ? prefetchData[1] : null;
      if (!didFindRootLayout) {
        
        
        
        const isRootLayout = newRouterState[4] === true;
        if (isRootLayout) {
          
          didFindRootLayout = true;
        }
      }
      const oldParallelRoutes = oldCacheNode.parallelRoutes;
      
      
      
      
      
      
      
      
      
      
      
      const prefetchParallelRoutes = new Map(oldParallelRoutes);
      
      
      
      
      
      let patchedRouterStateChildren = {};
      let taskChildren = null;
      
      
      
      
      
      
      
      
      
      let needsDynamicRequest = false;
      
      
      
      
      
      
      
      let dynamicRequestTreeChildren = {};
      for (let parallelRouteKey in newRouterStateChildren) {
        const newRouterStateChild = newRouterStateChildren[parallelRouteKey];
        const oldRouterStateChild = oldRouterStateChildren[parallelRouteKey];
        const oldSegmentMapChild = oldParallelRoutes.get(parallelRouteKey);
        const prefetchDataChild =
          prefetchDataChildren !== null
            ? prefetchDataChildren[parallelRouteKey]
            : null;
        const newSegmentChild = newRouterStateChild[0];
        const newSegmentPathChild = segmentPath.concat([
          parallelRouteKey,
          newSegmentChild,
        ]);
        const newSegmentKeyChild = (0,
        _createroutercachekey.createRouterCacheKey)(newSegmentChild);
        const oldSegmentChild =
          oldRouterStateChild !== undefined
            ? oldRouterStateChild[0]
            : undefined;
        const oldCacheNodeChild =
          oldSegmentMapChild !== undefined
            ? oldSegmentMapChild.get(newSegmentKeyChild)
            : undefined;
        let taskChild;
        if (newSegmentChild === _segment.DEFAULT_SEGMENT_KEY) {
          
          
          
          
          
          
          
          if (oldRouterStateChild !== undefined) {
            
            
            
            taskChild = reuseActiveSegmentInDefaultSlot(
              oldUrl,
              oldRouterStateChild,
            );
          } else {
            
            taskChild = beginRenderingNewRouteTree(
              navigatedAt,
              oldRouterStateChild,
              newRouterStateChild,
              oldCacheNodeChild,
              didFindRootLayout,
              prefetchDataChild !== undefined ? prefetchDataChild : null,
              prefetchHead,
              isPrefetchHeadPartial,
              newSegmentPathChild,
              scrollableSegmentsResult,
            );
          }
        } else if (
          isSamePageNavigation && 
          
          
          
          
          
          Object.keys(newRouterStateChild[1]).length === 0
        ) {
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          taskChild = beginRenderingNewRouteTree(
            navigatedAt,
            oldRouterStateChild,
            newRouterStateChild,
            oldCacheNodeChild,
            didFindRootLayout,
            prefetchDataChild !== undefined ? prefetchDataChild : null,
            prefetchHead,
            isPrefetchHeadPartial,
            newSegmentPathChild,
            scrollableSegmentsResult,
          );
        } else if (
          oldRouterStateChild !== undefined &&
          oldSegmentChild !== undefined &&
          (0, _matchsegments.matchSegment)(newSegmentChild, oldSegmentChild)
        ) {
          if (
            oldCacheNodeChild !== undefined &&
            oldRouterStateChild !== undefined
          ) {
            
            
            taskChild = updateCacheNodeOnNavigation(
              navigatedAt,
              oldUrl,
              oldCacheNodeChild,
              oldRouterStateChild,
              newRouterStateChild,
              didFindRootLayout,
              prefetchDataChild,
              prefetchHead,
              isPrefetchHeadPartial,
              isSamePageNavigation,
              newSegmentPathChild,
              scrollableSegmentsResult,
            );
          } else {
            
            
            taskChild = beginRenderingNewRouteTree(
              navigatedAt,
              oldRouterStateChild,
              newRouterStateChild,
              oldCacheNodeChild,
              didFindRootLayout,
              prefetchDataChild !== undefined ? prefetchDataChild : null,
              prefetchHead,
              isPrefetchHeadPartial,
              newSegmentPathChild,
              scrollableSegmentsResult,
            );
          }
        } else {
          
          taskChild = beginRenderingNewRouteTree(
            navigatedAt,
            oldRouterStateChild,
            newRouterStateChild,
            oldCacheNodeChild,
            didFindRootLayout,
            prefetchDataChild !== undefined ? prefetchDataChild : null,
            prefetchHead,
            isPrefetchHeadPartial,
            newSegmentPathChild,
            scrollableSegmentsResult,
          );
        }
        if (taskChild !== null) {
          
          if (taskChild.route === null) {
            
            
            return MPA_NAVIGATION_TASK;
          }
          if (taskChildren === null) {
            taskChildren = new Map();
          }
          taskChildren.set(parallelRouteKey, taskChild);
          const newCacheNodeChild = taskChild.node;
          if (newCacheNodeChild !== null) {
            const newSegmentMapChild = new Map(oldSegmentMapChild);
            newSegmentMapChild.set(newSegmentKeyChild, newCacheNodeChild);
            prefetchParallelRoutes.set(parallelRouteKey, newSegmentMapChild);
          }
          
          
          
          const taskChildRoute = taskChild.route;
          patchedRouterStateChildren[parallelRouteKey] = taskChildRoute;
          const dynamicRequestTreeChild = taskChild.dynamicRequestTree;
          if (dynamicRequestTreeChild !== null) {
            
            needsDynamicRequest = true;
            dynamicRequestTreeChildren[parallelRouteKey] =
              dynamicRequestTreeChild;
          } else {
            dynamicRequestTreeChildren[parallelRouteKey] = taskChildRoute;
          }
        } else {
          
          patchedRouterStateChildren[parallelRouteKey] = newRouterStateChild;
          dynamicRequestTreeChildren[parallelRouteKey] = newRouterStateChild;
        }
      }
      if (taskChildren === null) {
        
        return null;
      }
      const newCacheNode = {
        lazyData: null,
        rsc: oldCacheNode.rsc,
        
        
        
        
        
        
        prefetchRsc: oldCacheNode.prefetchRsc,
        head: oldCacheNode.head,
        prefetchHead: oldCacheNode.prefetchHead,
        loading: oldCacheNode.loading,
        
        parallelRoutes: prefetchParallelRoutes,
        navigatedAt,
      };
      return {
        
        route: patchRouterStateWithNewChildren(
          newRouterState,
          patchedRouterStateChildren,
        ),
        node: newCacheNode,
        dynamicRequestTree: needsDynamicRequest
          ? patchRouterStateWithNewChildren(
              newRouterState,
              dynamicRequestTreeChildren,
            )
          : null,
        children: taskChildren,
      };
    }
    function beginRenderingNewRouteTree(
      navigatedAt,
      oldRouterState,
      newRouterState,
      existingCacheNode,
      didFindRootLayout,
      prefetchData,
      possiblyPartialPrefetchHead,
      isPrefetchHeadPartial,
      segmentPath,
      scrollableSegmentsResult,
    ) {
      if (!didFindRootLayout) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        if (
          oldRouterState === undefined ||
          (0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(
            oldRouterState,
            newRouterState,
          )
        ) {
          
          return MPA_NAVIGATION_TASK;
        }
      }
      return createCacheNodeOnNavigation(
        navigatedAt,
        newRouterState,
        existingCacheNode,
        prefetchData,
        possiblyPartialPrefetchHead,
        isPrefetchHeadPartial,
        segmentPath,
        scrollableSegmentsResult,
      );
    }
    function createCacheNodeOnNavigation(
      navigatedAt,
      routerState,
      existingCacheNode,
      prefetchData,
      possiblyPartialPrefetchHead,
      isPrefetchHeadPartial,
      segmentPath,
      scrollableSegmentsResult,
    ) {
      
      
      
      
      
      const routerStateChildren = routerState[1];
      const isLeafSegment = Object.keys(routerStateChildren).length === 0;
      
      
      
      
      
      let rsc;
      let loading;
      let head;
      let cacheNodeNavigatedAt;
      if (
        existingCacheNode !== undefined && 
        
        
        existingCacheNode.navigatedAt + _navigatereducer.DYNAMIC_STALETIME_MS >
          navigatedAt
      ) {
        
        
        rsc = existingCacheNode.rsc;
        loading = existingCacheNode.loading;
        head = existingCacheNode.head;
        
        cacheNodeNavigatedAt = existingCacheNode.navigatedAt;
      } else if (prefetchData !== null) {
        
        
        
        rsc = prefetchData[0];
        loading = prefetchData[2];
        head = isLeafSegment ? possiblyPartialPrefetchHead : null;
        
        
        
        cacheNodeNavigatedAt = navigatedAt;
        const isPrefetchRscPartial = prefetchData[3];
        if (
          isPrefetchRscPartial || 
          (isPrefetchHeadPartial && isLeafSegment)
        ) {
          
          
          return spawnPendingTask(
            navigatedAt,
            routerState,
            prefetchData,
            possiblyPartialPrefetchHead,
            isPrefetchHeadPartial,
            segmentPath,
            scrollableSegmentsResult,
          );
        } else {
          
          
        }
      } else {
        
        
        
        
        return spawnPendingTask(
          navigatedAt,
          routerState,
          null,
          possiblyPartialPrefetchHead,
          isPrefetchHeadPartial,
          segmentPath,
          scrollableSegmentsResult,
        );
      }
      
      
      
      const prefetchDataChildren =
        prefetchData !== null ? prefetchData[1] : null;
      const taskChildren = new Map();
      const existingCacheNodeChildren =
        existingCacheNode !== undefined
          ? existingCacheNode.parallelRoutes
          : null;
      const cacheNodeChildren = new Map(existingCacheNodeChildren);
      let dynamicRequestTreeChildren = {};
      let needsDynamicRequest = false;
      if (isLeafSegment) {
        
        
        
        
        
        
        scrollableSegmentsResult.push(segmentPath);
      } else {
        for (let parallelRouteKey in routerStateChildren) {
          const routerStateChild = routerStateChildren[parallelRouteKey];
          const prefetchDataChild =
            prefetchDataChildren !== null
              ? prefetchDataChildren[parallelRouteKey]
              : null;
          const existingSegmentMapChild =
            existingCacheNodeChildren !== null
              ? existingCacheNodeChildren.get(parallelRouteKey)
              : undefined;
          const segmentChild = routerStateChild[0];
          const segmentPathChild = segmentPath.concat([
            parallelRouteKey,
            segmentChild,
          ]);
          const segmentKeyChild = (0,
          _createroutercachekey.createRouterCacheKey)(segmentChild);
          const existingCacheNodeChild =
            existingSegmentMapChild !== undefined
              ? existingSegmentMapChild.get(segmentKeyChild)
              : undefined;
          const taskChild = createCacheNodeOnNavigation(
            navigatedAt,
            routerStateChild,
            existingCacheNodeChild,
            prefetchDataChild,
            possiblyPartialPrefetchHead,
            isPrefetchHeadPartial,
            segmentPathChild,
            scrollableSegmentsResult,
          );
          taskChildren.set(parallelRouteKey, taskChild);
          const dynamicRequestTreeChild = taskChild.dynamicRequestTree;
          if (dynamicRequestTreeChild !== null) {
            
            needsDynamicRequest = true;
            dynamicRequestTreeChildren[parallelRouteKey] =
              dynamicRequestTreeChild;
          } else {
            dynamicRequestTreeChildren[parallelRouteKey] = routerStateChild;
          }
          const newCacheNodeChild = taskChild.node;
          if (newCacheNodeChild !== null) {
            const newSegmentMapChild = new Map();
            newSegmentMapChild.set(segmentKeyChild, newCacheNodeChild);
            cacheNodeChildren.set(parallelRouteKey, newSegmentMapChild);
          }
        }
      }
      return {
        
        
        
        
        route: routerState,
        node: {
          lazyData: null,
          
          
          rsc,
          prefetchRsc: null,
          head,
          prefetchHead: null,
          loading,
          parallelRoutes: cacheNodeChildren,
          navigatedAt: cacheNodeNavigatedAt,
        },
        dynamicRequestTree: needsDynamicRequest
          ? patchRouterStateWithNewChildren(
              routerState,
              dynamicRequestTreeChildren,
            )
          : null,
        children: taskChildren,
      };
    }
    function patchRouterStateWithNewChildren(baseRouterState, newChildren) {
      const clone = [baseRouterState[0], newChildren];
      
      
      
      if (2 in baseRouterState) {
        clone[2] = baseRouterState[2];
      }
      if (3 in baseRouterState) {
        clone[3] = baseRouterState[3];
      }
      if (4 in baseRouterState) {
        clone[4] = baseRouterState[4];
      }
      return clone;
    }
    function spawnPendingTask(
      navigatedAt,
      routerState,
      prefetchData,
      prefetchHead,
      isPrefetchHeadPartial,
      segmentPath,
      scrollableSegmentsResult,
    ) {
      
      
      
      const dynamicRequestTree = patchRouterStateWithNewChildren(
        routerState,
        routerState[1],
      );
      dynamicRequestTree[3] = "refetch";
      const newTask = {
        route: routerState,
        
        node: createPendingCacheNode(
          navigatedAt,
          routerState,
          prefetchData,
          prefetchHead,
          isPrefetchHeadPartial,
          segmentPath,
          scrollableSegmentsResult,
        ),
        
        
        dynamicRequestTree,
        children: null,
      };
      return newTask;
    }
    function reuseActiveSegmentInDefaultSlot(oldUrl, oldRouterState) {
      
      
      
      
      
      
      
      
      
      let reusedRouterState;
      const oldRefreshMarker = oldRouterState[3];
      if (oldRefreshMarker === "refresh") {
        
        
        reusedRouterState = oldRouterState;
      } else {
        
        
        reusedRouterState = patchRouterStateWithNewChildren(
          oldRouterState,
          oldRouterState[1],
        );
        reusedRouterState[2] = (0, _createhreffromurl.createHrefFromUrl)(
          oldUrl,
        );
        reusedRouterState[3] = "refresh";
      }
      return {
        route: reusedRouterState,
        node: null,
        dynamicRequestTree: null,
        children: null,
      };
    }
    function listenForDynamicRequest(task, responsePromise) {
      responsePromise.then(
        (result) => {
          if (typeof result === "string") {
            
            
            
            return;
          }
          const { flightData, debugInfo } = result;
          for (const normalizedFlightData of flightData) {
            const {
              segmentPath,
              tree: serverRouterState,
              seedData: dynamicData,
              head: dynamicHead,
            } = normalizedFlightData;
            if (!dynamicData) {
              continue;
            }
            writeDynamicDataIntoPendingTask(
              task,
              segmentPath,
              serverRouterState,
              dynamicData,
              dynamicHead,
              debugInfo,
            );
          }
          
          
          
          abortTask(task, null, debugInfo);
        },
        (error) => {
          
          abortTask(task, error, null);
        },
      );
    }
    function writeDynamicDataIntoPendingTask(
      rootTask,
      segmentPath,
      serverRouterState,
      dynamicData,
      dynamicHead,
      debugInfo,
    ) {
      
      
      
      
      
      
      
      
      
      
      let task = rootTask;
      for (let i = 0; i < segmentPath.length; i += 2) {
        const parallelRouteKey = segmentPath[i];
        const segment = segmentPath[i + 1];
        const taskChildren = task.children;
        if (taskChildren !== null) {
          const taskChild = taskChildren.get(parallelRouteKey);
          if (taskChild !== undefined) {
            const taskSegment = taskChild.route[0];
            if ((0, _matchsegments.matchSegment)(segment, taskSegment)) {
              
              task = taskChild;
              continue;
            }
          }
        }
        
        
        
        
        return;
      }
      finishTaskUsingDynamicDataPayload(
        task,
        serverRouterState,
        dynamicData,
        dynamicHead,
        debugInfo,
      );
    }
    function finishTaskUsingDynamicDataPayload(
      task,
      serverRouterState,
      dynamicData,
      dynamicHead,
      debugInfo,
    ) {
      if (task.dynamicRequestTree === null) {
        
        return;
      }
      
      
      const taskChildren = task.children;
      const taskNode = task.node;
      if (taskChildren === null) {
        
        
        
        if (taskNode !== null) {
          finishPendingCacheNode(
            taskNode,
            task.route,
            serverRouterState,
            dynamicData,
            dynamicHead,
            debugInfo,
          );
          
          task.dynamicRequestTree = null;
        }
        return;
      }
      
      
      const serverChildren = serverRouterState[1];
      const dynamicDataChildren = dynamicData[1];
      for (const parallelRouteKey in serverRouterState) {
        const serverRouterStateChild = serverChildren[parallelRouteKey];
        const dynamicDataChild = dynamicDataChildren[parallelRouteKey];
        const taskChild = taskChildren.get(parallelRouteKey);
        if (taskChild !== undefined) {
          const taskSegment = taskChild.route[0];
          if (
            (0, _matchsegments.matchSegment)(
              serverRouterStateChild[0],
              taskSegment,
            ) &&
            dynamicDataChild !== null &&
            dynamicDataChild !== undefined
          ) {
            
            return finishTaskUsingDynamicDataPayload(
              taskChild,
              serverRouterStateChild,
              dynamicDataChild,
              dynamicHead,
              debugInfo,
            );
          }
        }
        
        
        
        
      }
    }
    function createPendingCacheNode(
      navigatedAt,
      routerState,
      prefetchData,
      prefetchHead,
      isPrefetchHeadPartial,
      segmentPath,
      scrollableSegmentsResult,
    ) {
      const routerStateChildren = routerState[1];
      const prefetchDataChildren =
        prefetchData !== null ? prefetchData[1] : null;
      const parallelRoutes = new Map();
      for (let parallelRouteKey in routerStateChildren) {
        const routerStateChild = routerStateChildren[parallelRouteKey];
        const prefetchDataChild =
          prefetchDataChildren !== null
            ? prefetchDataChildren[parallelRouteKey]
            : null;
        const segmentChild = routerStateChild[0];
        const segmentPathChild = segmentPath.concat([
          parallelRouteKey,
          segmentChild,
        ]);
        const segmentKeyChild = (0, _createroutercachekey.createRouterCacheKey)(
          segmentChild,
        );
        const newCacheNodeChild = createPendingCacheNode(
          navigatedAt,
          routerStateChild,
          prefetchDataChild === undefined ? null : prefetchDataChild,
          prefetchHead,
          isPrefetchHeadPartial,
          segmentPathChild,
          scrollableSegmentsResult,
        );
        const newSegmentMapChild = new Map();
        newSegmentMapChild.set(segmentKeyChild, newCacheNodeChild);
        parallelRoutes.set(parallelRouteKey, newSegmentMapChild);
      }
      
      
      const isLeafSegment = parallelRoutes.size === 0;
      if (isLeafSegment) {
        
        
        
        
        
        
        scrollableSegmentsResult.push(segmentPath);
      }
      const maybePrefetchRsc = prefetchData !== null ? prefetchData[0] : null;
      return {
        lazyData: null,
        parallelRoutes: parallelRoutes,
        prefetchRsc: maybePrefetchRsc !== undefined ? maybePrefetchRsc : null,
        prefetchHead: isLeafSegment ? prefetchHead : [null, null],
        
        
        rsc: createDeferredRsc(),
        head: isLeafSegment ? createDeferredRsc() : null,
        
        
        
        loading:
          prefetchData !== null
            ? (prefetchData[2] ?? null)
            : createDeferredRsc(),
        navigatedAt,
      };
    }
    function finishPendingCacheNode(
      cacheNode,
      taskState,
      serverState,
      dynamicData,
      dynamicHead,
      debugInfo,
    ) {
      
      
      
      
      
      
      
      
      
      
      const taskStateChildren = taskState[1];
      const serverStateChildren = serverState[1];
      const dataChildren = dynamicData[1];
      
      
      
      const parallelRoutes = cacheNode.parallelRoutes;
      for (let parallelRouteKey in taskStateChildren) {
        const taskStateChild = taskStateChildren[parallelRouteKey];
        const serverStateChild = serverStateChildren[parallelRouteKey];
        const dataChild = dataChildren[parallelRouteKey];
        const segmentMapChild = parallelRoutes.get(parallelRouteKey);
        const taskSegmentChild = taskStateChild[0];
        const taskSegmentKeyChild = (0,
        _createroutercachekey.createRouterCacheKey)(taskSegmentChild);
        const cacheNodeChild =
          segmentMapChild !== undefined
            ? segmentMapChild.get(taskSegmentKeyChild)
            : undefined;
        if (cacheNodeChild !== undefined) {
          if (
            serverStateChild !== undefined &&
            (0, _matchsegments.matchSegment)(
              taskSegmentChild,
              serverStateChild[0],
            )
          ) {
            if (dataChild !== undefined && dataChild !== null) {
              
              finishPendingCacheNode(
                cacheNodeChild,
                taskStateChild,
                serverStateChild,
                dataChild,
                dynamicHead,
                debugInfo,
              );
            } else {
              
              
              
              
              abortPendingCacheNode(
                taskStateChild,
                cacheNodeChild,
                null,
                debugInfo,
              );
            }
          } else {
            
            
            abortPendingCacheNode(
              taskStateChild,
              cacheNodeChild,
              null,
              debugInfo,
            );
          }
        } else {
          
          
          
          
        }
      }
      
      
      const rsc = cacheNode.rsc;
      const dynamicSegmentData = dynamicData[0];
      if (rsc === null) {
        
        
        cacheNode.rsc = dynamicSegmentData;
      } else if (isDeferredRsc(rsc)) {
        
        
        
        rsc.resolve(dynamicSegmentData, debugInfo);
      } else {
        
        
      }
      
      
      const loading = cacheNode.loading;
      if (isDeferredRsc(loading)) {
        const dynamicLoading = dynamicData[2];
        loading.resolve(dynamicLoading, debugInfo);
      }
      
      
      
      const head = cacheNode.head;
      if (isDeferredRsc(head)) {
        head.resolve(dynamicHead, debugInfo);
      }
    }
    function abortTask(task, error, debugInfo) {
      const cacheNode = task.node;
      if (cacheNode === null) {
        
        return;
      }
      const taskChildren = task.children;
      if (taskChildren === null) {
        
        
        abortPendingCacheNode(task.route, cacheNode, error, debugInfo);
      } else {
        
        
        
        for (const taskChild of taskChildren.values()) {
          abortTask(taskChild, error, debugInfo);
        }
      }
      
      task.dynamicRequestTree = null;
    }
    function abortPendingCacheNode(routerState, cacheNode, error, debugInfo) {
      
      
      
      
      const routerStateChildren = routerState[1];
      const parallelRoutes = cacheNode.parallelRoutes;
      for (let parallelRouteKey in routerStateChildren) {
        const routerStateChild = routerStateChildren[parallelRouteKey];
        const segmentMapChild = parallelRoutes.get(parallelRouteKey);
        if (segmentMapChild === undefined) {
          continue;
        }
        const segmentChild = routerStateChild[0];
        const segmentKeyChild = (0, _createroutercachekey.createRouterCacheKey)(
          segmentChild,
        );
        const cacheNodeChild = segmentMapChild.get(segmentKeyChild);
        if (cacheNodeChild !== undefined) {
          abortPendingCacheNode(
            routerStateChild,
            cacheNodeChild,
            error,
            debugInfo,
          );
        } else {
          
          
        }
      }
      const rsc = cacheNode.rsc;
      if (isDeferredRsc(rsc)) {
        if (error === null) {
          
          rsc.resolve(null, debugInfo);
        } else {
          
          rsc.reject(error, debugInfo);
        }
      }
      const loading = cacheNode.loading;
      if (isDeferredRsc(loading)) {
        loading.resolve(null, debugInfo);
      }
      
      
      
      
      const head = cacheNode.head;
      if (isDeferredRsc(head)) {
        head.resolve(null, debugInfo);
      }
    }
    function updateCacheNodeOnPopstateRestoration(oldCacheNode, routerState) {
      
      
      
      
      
      
      
      
      
      const routerStateChildren = routerState[1];
      const oldParallelRoutes = oldCacheNode.parallelRoutes;
      const newParallelRoutes = new Map(oldParallelRoutes);
      for (let parallelRouteKey in routerStateChildren) {
        const routerStateChild = routerStateChildren[parallelRouteKey];
        const segmentChild = routerStateChild[0];
        const segmentKeyChild = (0, _createroutercachekey.createRouterCacheKey)(
          segmentChild,
        );
        const oldSegmentMapChild = oldParallelRoutes.get(parallelRouteKey);
        if (oldSegmentMapChild !== undefined) {
          const oldCacheNodeChild = oldSegmentMapChild.get(segmentKeyChild);
          if (oldCacheNodeChild !== undefined) {
            const newCacheNodeChild = updateCacheNodeOnPopstateRestoration(
              oldCacheNodeChild,
              routerStateChild,
            );
            const newSegmentMapChild = new Map(oldSegmentMapChild);
            newSegmentMapChild.set(segmentKeyChild, newCacheNodeChild);
            newParallelRoutes.set(parallelRouteKey, newSegmentMapChild);
          }
        }
      }
      
      
      
      
      
      
      
      
      const rsc = oldCacheNode.rsc;
      const shouldUsePrefetch = isDeferredRsc(rsc) && rsc.status === "pending";
      return {
        lazyData: null,
        rsc,
        head: oldCacheNode.head,
        prefetchHead: shouldUsePrefetch
          ? oldCacheNode.prefetchHead
          : [null, null],
        prefetchRsc: shouldUsePrefetch ? oldCacheNode.prefetchRsc : null,
        loading: oldCacheNode.loading,
        
        parallelRoutes: newParallelRoutes,
        navigatedAt: oldCacheNode.navigatedAt,
      };
    }
    const DEFERRED = Symbol();
    
    
    
    
    function isDeferredRsc(value) {
      return value && typeof value === "object" && value.tag === DEFERRED;
    }
    function createDeferredRsc() {
      
      
      
      
      
      
      
      
      
      
      
      
      const debugInfo = [];
      let resolve;
      let reject;
      const pendingRsc = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      pendingRsc.status = "pending";
      pendingRsc.resolve = (value, responseDebugInfo) => {
        if (pendingRsc.status === "pending") {
          const fulfilledRsc = pendingRsc;
          fulfilledRsc.status = "fulfilled";
          fulfilledRsc.value = value;
          if (responseDebugInfo !== null) {
            
            debugInfo.push.apply(debugInfo, responseDebugInfo);
          }
          resolve(value);
        }
      };
      pendingRsc.reject = (error, responseDebugInfo) => {
        if (pendingRsc.status === "pending") {
          const rejectedRsc = pendingRsc;
          rejectedRsc.status = "rejected";
          rejectedRsc.reason = error;
          if (responseDebugInfo !== null) {
            
            debugInfo.push.apply(debugInfo, responseDebugInfo);
          }
          reject(error);
        }
      };
      pendingRsc.tag = DEFERRED;
      pendingRsc._debugInfo = debugInfo;
      return pendingRsc;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    

 Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        FetchStrategy: null,
        NavigationResultTag: null,
        PrefetchPriority: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      FetchStrategy: function () {
        return FetchStrategy;
      },
      NavigationResultTag: function () {
        return NavigationResultTag;
      },
      PrefetchPriority: function () {
        return PrefetchPriority;
      },
    });
    var NavigationResultTag =  (function (NavigationResultTag) {
      NavigationResultTag[(NavigationResultTag["MPA"] = 0)] = "MPA";
      NavigationResultTag[(NavigationResultTag["Success"] = 1)] = "Success";
      NavigationResultTag[(NavigationResultTag["NoOp"] = 2)] = "NoOp";
      NavigationResultTag[(NavigationResultTag["Async"] = 3)] = "Async";
      return NavigationResultTag;
    })({});
    var PrefetchPriority =  (function (PrefetchPriority) {
      




 PrefetchPriority[(PrefetchPriority["Intent"] = 2)] = "Intent";
      

 PrefetchPriority[(PrefetchPriority["Default"] = 1)] = "Default";
      


 PrefetchPriority[(PrefetchPriority["Background"] = 0)] = "Background";
      return PrefetchPriority;
    })({});
    var FetchStrategy =  (function (FetchStrategy) {
      
      
      
      FetchStrategy[(FetchStrategy["LoadingBoundary"] = 0)] = "LoadingBoundary";
      FetchStrategy[(FetchStrategy["PPR"] = 1)] = "PPR";
      FetchStrategy[(FetchStrategy["PPRRuntime"] = 2)] = "PPRRuntime";
      FetchStrategy[(FetchStrategy["Full"] = 3)] = "Full";
      return FetchStrategy;
    })({});
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/lru.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        deleteFromLru: null,
        lruPut: null,
        updateLruSize: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      deleteFromLru: function () {
        return deleteFromLru;
      },
      lruPut: function () {
        return lruPut;
      },
      updateLruSize: function () {
        return updateLruSize;
      },
    });
    const _cachemap = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache-map.js [app-client] (ecmascript)",
    );
    let head = null;
    let didScheduleCleanup = false;
    let lruSize = 0;
    
    
    
    const maxLruSize = 50 * 1024 * 1024; 
    function lruPut(node) {
      if (head === node) {
        
        return;
      }
      const prev = node.prev;
      const next = node.next;
      if (next === null || prev === null) {
        
        lruSize += node.size;
        
        
        
        ensureCleanupIsScheduled();
      } else {
        
        prev.next = next;
        next.prev = prev;
      }
      
      if (head === null) {
        
        node.prev = node;
        node.next = node;
      } else {
        
        const tail = head.prev;
        node.prev = tail;
        
        if (tail !== null) {
          tail.next = node;
        }
        node.next = head;
        head.prev = node;
      }
      head = node;
    }
    function updateLruSize(node, newNodeSize) {
      
      
      const prevNodeSize = node.size;
      node.size = newNodeSize;
      if (node.next === null) {
        
        return;
      }
      
      lruSize = lruSize - prevNodeSize + newNodeSize;
      ensureCleanupIsScheduled();
    }
    function deleteFromLru(deleted) {
      const next = deleted.next;
      const prev = deleted.prev;
      if (next !== null && prev !== null) {
        lruSize -= deleted.size;
        deleted.next = null;
        deleted.prev = null;
        
        if (head === deleted) {
          
          if (next === head) {
            
            head = null;
          } else {
            head = next;
          }
        } else {
          prev.next = next;
          next.prev = prev;
        }
      } else {
        
      }
    }
    function ensureCleanupIsScheduled() {
      if (didScheduleCleanup || lruSize <= maxLruSize) {
        return;
      }
      didScheduleCleanup = true;
      requestCleanupCallback(cleanup);
    }
    function cleanup() {
      didScheduleCleanup = false;
      
      
      
      const ninetyPercentMax = maxLruSize * 0.9;
      while (lruSize > ninetyPercentMax && head !== null) {
        const tail = head.prev;
        
        if (tail !== null) {
          
          
          (0, _cachemap.deleteFromCacheMap)(tail.value);
        }
      }
    }
    const requestCleanupCallback =
      typeof requestIdleCallback === "function"
        ? requestIdleCallback
        : (cb) => setTimeout(cb, 0);
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache-map.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        Fallback: null,
        createCacheMap: null,
        deleteFromCacheMap: null,
        getFromCacheMap: null,
        isValueExpired: null,
        setInCacheMap: null,
        setSizeInCacheMap: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      Fallback: function () {
        return Fallback;
      },
      createCacheMap: function () {
        return createCacheMap;
      },
      deleteFromCacheMap: function () {
        return deleteFromCacheMap;
      },
      getFromCacheMap: function () {
        return getFromCacheMap;
      },
      isValueExpired: function () {
        return isValueExpired;
      },
      setInCacheMap: function () {
        return setInCacheMap;
      },
      setSizeInCacheMap: function () {
        return setSizeInCacheMap;
      },
    });
    const _lru = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/lru.js [app-client] (ecmascript)",
    );
    const Fallback = {};
    
    
    const Revalidation = {};
    function createCacheMap() {
      const cacheMap = {
        parent: null,
        key: null,
        value: null,
        map: null,
        
        prev: null,
        next: null,
        size: 0,
      };
      return cacheMap;
    }
    function getOrInitialize(cacheMap, keys, isRevalidation) {
      
      
      
      
      
      
      let entry = cacheMap;
      let remainingKeys = keys;
      let key = null;
      while (true) {
        const previousKey = key;
        if (remainingKeys !== null) {
          key = remainingKeys.value;
          remainingKeys = remainingKeys.parent;
        } else if (isRevalidation && previousKey !== Revalidation) {
          
          
          
          
          
          if (entry.value === null) {
            return entry;
          }
          
          key = Revalidation;
        } else {
          break;
        }
        let map = entry.map;
        if (map !== null) {
          const existingEntry = map.get(key);
          if (existingEntry !== undefined) {
            
            entry = existingEntry;
            continue;
          }
        } else {
          map = new Map();
          entry.map = map;
        }
        
        const newEntry = {
          parent: entry,
          key,
          value: null,
          map: null,
          
          prev: null,
          next: null,
          size: 0,
        };
        map.set(key, newEntry);
        entry = newEntry;
      }
      return entry;
    }
    function getFromCacheMap(
      now,
      currentCacheVersion,
      rootEntry,
      keys,
      isRevalidation,
    ) {
      const entry = getEntryWithFallbackImpl(
        now,
        currentCacheVersion,
        rootEntry,
        keys,
        isRevalidation,
        0,
      );
      if (entry === null || entry.value === null) {
        return null;
      }
      
      (0, _lru.lruPut)(entry);
      return entry.value;
    }
    function isValueExpired(now, currentCacheVersion, value) {
      return value.staleAt <= now || value.version < currentCacheVersion;
    }
    function lazilyEvictIfNeeded(now, currentCacheVersion, entry) {
      
      
      if (entry.value === null) {
        
        return entry;
      }
      const value = entry.value;
      if (isValueExpired(now, currentCacheVersion, value)) {
        
        
        deleteMapEntry(entry);
        return null;
      }
      
      return entry;
    }
    function getEntryWithFallbackImpl(
      now,
      currentCacheVersion,
      entry,
      keys,
      isRevalidation,
      previousKey,
    ) {
      
      
      
      
      
      
      let key;
      let remainingKeys;
      if (keys !== null) {
        key = keys.value;
        remainingKeys = keys.parent;
      } else if (isRevalidation && previousKey !== Revalidation) {
        
        
        key = Revalidation;
        remainingKeys = null;
      } else {
        
        
        
        
        
        
        return lazilyEvictIfNeeded(now, currentCacheVersion, entry);
      }
      const map = entry.map;
      if (map !== null) {
        const existingEntry = map.get(key);
        if (existingEntry !== undefined) {
          
          const result = getEntryWithFallbackImpl(
            now,
            currentCacheVersion,
            existingEntry,
            remainingKeys,
            isRevalidation,
            key,
          );
          if (result !== null) {
            return result;
          }
        }
        
        const fallbackEntry = map.get(Fallback);
        if (fallbackEntry !== undefined) {
          
          return getEntryWithFallbackImpl(
            now,
            currentCacheVersion,
            fallbackEntry,
            remainingKeys,
            isRevalidation,
            key,
          );
        }
      }
      return null;
    }
    function setInCacheMap(cacheMap, keys, value, isRevalidation) {
      
      
      
      const entry = getOrInitialize(cacheMap, keys, isRevalidation);
      setMapEntryValue(entry, value);
      
      (0, _lru.lruPut)(entry);
      (0, _lru.updateLruSize)(entry, value.size);
    }
    function setMapEntryValue(entry, value) {
      if (entry.value !== null) {
        
        
        
        dropRef(entry.value);
        
        const emptyEntry = entry;
        emptyEntry.value = null;
        fillEmptyReference(emptyEntry, value);
      } else {
        fillEmptyReference(entry, value);
      }
    }
    function fillEmptyReference(entry, value) {
      
      
      const oldEntry = value.ref;
      const fullEntry = entry;
      fullEntry.value = value;
      value.ref = fullEntry;
      (0, _lru.updateLruSize)(fullEntry, value.size);
      if (oldEntry !== null && oldEntry !== entry && oldEntry.value === value) {
        
        
        
        
        
        
        
        deleteMapEntry(oldEntry);
      }
    }
    function deleteFromCacheMap(value) {
      const entry = value.ref;
      if (entry === null) {
        
        return;
      }
      dropRef(value);
      deleteMapEntry(entry);
    }
    function dropRef(value) {
      
      
      
      
      value.ref = null;
    }
    function deleteMapEntry(entry) {
      
      const emptyEntry = entry;
      emptyEntry.value = null;
      (0, _lru.deleteFromLru)(entry);
      
      const map = emptyEntry.map;
      if (map === null) {
        
        
        
        let parent = emptyEntry.parent;
        let key = emptyEntry.key;
        while (parent !== null) {
          const parentMap = parent.map;
          if (parentMap !== null) {
            parentMap.delete(key);
            if (parentMap.size === 0) {
              
              parent.map = null;
              if (parent.value === null) {
                
                
                key = parent.key;
                parent = parent.parent;
                continue;
              }
            }
          }
          break;
        }
      } else {
        
        
        const revalidatingEntry = map.get(Revalidation);
        if (
          revalidatingEntry !== undefined &&
          revalidatingEntry.value !== null
        ) {
          setMapEntryValue(emptyEntry, revalidatingEntry.value);
        }
      }
    }
    function setSizeInCacheMap(value, size) {
      const entry = value.ref;
      if (entry === null) {
        
        return;
      }
      
      
      
      value.size = size;
      (0, _lru.updateLruSize)(entry, size);
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/vary-path.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        appendLayoutVaryPath: null,
        clonePageVaryPathWithNewSearchParams: null,
        finalizeLayoutVaryPath: null,
        finalizeMetadataVaryPath: null,
        finalizePageVaryPath: null,
        getFulfilledRouteVaryPath: null,
        getRouteVaryPath: null,
        getSegmentVaryPathForRequest: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      appendLayoutVaryPath: function () {
        return appendLayoutVaryPath;
      },
      clonePageVaryPathWithNewSearchParams: function () {
        return clonePageVaryPathWithNewSearchParams;
      },
      finalizeLayoutVaryPath: function () {
        return finalizeLayoutVaryPath;
      },
      finalizeMetadataVaryPath: function () {
        return finalizeMetadataVaryPath;
      },
      finalizePageVaryPath: function () {
        return finalizePageVaryPath;
      },
      getFulfilledRouteVaryPath: function () {
        return getFulfilledRouteVaryPath;
      },
      getRouteVaryPath: function () {
        return getRouteVaryPath;
      },
      getSegmentVaryPathForRequest: function () {
        return getSegmentVaryPathForRequest;
      },
    });
    const _types = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)",
    );
    const _cachemap = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache-map.js [app-client] (ecmascript)",
    );
    const _segmentvalueencoding = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment-cache/segment-value-encoding.js [app-client] (ecmascript)",
    );
    function getRouteVaryPath(pathname, search, nextUrl) {
      
      const varyPath = {
        value: pathname,
        parent: {
          value: search,
          parent: {
            value: nextUrl,
            parent: null,
          },
        },
      };
      return varyPath;
    }
    function getFulfilledRouteVaryPath(
      pathname,
      search,
      nextUrl,
      couldBeIntercepted,
    ) {
      
      
      
      const varyPath = {
        value: pathname,
        parent: {
          value: search,
          parent: {
            value: couldBeIntercepted ? nextUrl : _cachemap.Fallback,
            parent: null,
          },
        },
      };
      return varyPath;
    }
    function appendLayoutVaryPath(parentPath, cacheKey) {
      const varyPathPart = {
        value: cacheKey,
        parent: parentPath,
      };
      return varyPathPart;
    }
    function finalizeLayoutVaryPath(requestKey, varyPath) {
      const layoutVaryPath = {
        value: requestKey,
        parent: varyPath,
      };
      return layoutVaryPath;
    }
    function finalizePageVaryPath(requestKey, renderedSearch, varyPath) {
      
      
      const pageVaryPath = {
        value: requestKey,
        parent: {
          value: renderedSearch,
          parent: varyPath,
        },
      };
      return pageVaryPath;
    }
    function finalizeMetadataVaryPath(
      pageRequestKey,
      renderedSearch,
      varyPath,
    ) {
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      const pageVaryPath = {
        
        
        
        value: pageRequestKey + _segmentvalueencoding.HEAD_REQUEST_KEY,
        parent: {
          value: renderedSearch,
          parent: varyPath,
        },
      };
      return pageVaryPath;
    }
    function getSegmentVaryPathForRequest(fetchStrategy, tree) {
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      const originalVaryPath = tree.varyPath;
      
      
      
      if (tree.isPage) {
        
        
        
        const doesVaryOnSearchParams =
          fetchStrategy === _types.FetchStrategy.Full ||
          fetchStrategy === _types.FetchStrategy.PPRRuntime;
        if (!doesVaryOnSearchParams) {
          
          
          
          
          
          
          const searchParamsVaryPath = originalVaryPath.parent;
          const pathParamsVaryPath = searchParamsVaryPath.parent;
          const patchedVaryPath = {
            value: originalVaryPath.value,
            parent: {
              value: _cachemap.Fallback,
              parent: pathParamsVaryPath,
            },
          };
          return patchedVaryPath;
        }
      }
      
      return originalVaryPath;
    }
    function clonePageVaryPathWithNewSearchParams(originalVaryPath, newSearch) {
      
      
      const searchParamsVaryPath = originalVaryPath.parent;
      const clonedVaryPath = {
        value: originalVaryPath.value,
        parent: {
          value: newSearch,
          parent: searchParamsVaryPath.parent,
        },
      };
      return clonedVaryPath;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache-key.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "createCacheKey", {
      enumerable: true,
      get: function () {
        return createCacheKey;
      },
    });
    function createCacheKey(originalHref, nextUrl) {
      const originalUrl = new URL(originalHref);
      const cacheKey = {
        pathname: originalUrl.pathname,
        search: originalUrl.search,
        nextUrl: nextUrl,
      };
      return cacheKey;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/scheduler.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        cancelPrefetchTask: null,
        isPrefetchTaskDirty: null,
        pingPrefetchTask: null,
        reschedulePrefetchTask: null,
        schedulePrefetchTask: null,
        startRevalidationCooldown: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      cancelPrefetchTask: function () {
        return cancelPrefetchTask;
      },
      isPrefetchTaskDirty: function () {
        return isPrefetchTaskDirty;
      },
      pingPrefetchTask: function () {
        return pingPrefetchTask;
      },
      reschedulePrefetchTask: function () {
        return reschedulePrefetchTask;
      },
      schedulePrefetchTask: function () {
        return schedulePrefetchTask;
      },
      startRevalidationCooldown: function () {
        return startRevalidationCooldown;
      },
    });
    const _approutertypes = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/app-router-types.js [app-client] (ecmascript)",
    );
    const _matchsegments = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/match-segments.js [app-client] (ecmascript)",
    );
    const _cache = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache.js [app-client] (ecmascript)",
    );
    const _varypath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/vary-path.js [app-client] (ecmascript)",
    );
    const _cachekey = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache-key.js [app-client] (ecmascript)",
    );
    const _types = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)",
    );
    const _segment = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)",
    );
    const scheduleMicrotask =
      typeof queueMicrotask === "function"
        ? queueMicrotask
        : (fn) =>
            Promise.resolve()
              .then(fn)
              .catch((error) =>
                setTimeout(() => {
                  throw error;
                }),
              );
    const taskHeap = [];
    let inProgressRequests = 0;
    let sortIdCounter = 0;
    let didScheduleMicrotask = false;
    
    
    
    let mostRecentlyHoveredLink = null;
    
    const REVALIDATION_COOLDOWN_MS = 300;
    
    
    let revalidationCooldownTimeoutHandle = null;
    function startRevalidationCooldown() {
      
      
      if (revalidationCooldownTimeoutHandle !== null) {
        clearTimeout(revalidationCooldownTimeoutHandle);
      }
      
      revalidationCooldownTimeoutHandle = setTimeout(() => {
        revalidationCooldownTimeoutHandle = null;
        
        ensureWorkIsScheduled();
      }, REVALIDATION_COOLDOWN_MS);
    }
    function schedulePrefetchTask(
      key,
      treeAtTimeOfPrefetch,
      fetchStrategy,
      priority,
      onInvalidate,
    ) {
      
      const task = {
        key,
        treeAtTimeOfPrefetch,
        cacheVersion: (0, _cache.getCurrentCacheVersion)(),
        priority,
        phase: 1,
        hasBackgroundWork: false,
        spawnedRuntimePrefetches: null,
        fetchStrategy,
        sortId: sortIdCounter++,
        isCanceled: false,
        onInvalidate,
        _heapIndex: -1,
      };
      trackMostRecentlyHoveredLink(task);
      heapPush(taskHeap, task);
      
      
      
      
      
      
      
      ensureWorkIsScheduled();
      return task;
    }
    function cancelPrefetchTask(task) {
      
      
      
      
      
      task.isCanceled = true;
      heapDelete(taskHeap, task);
    }
    function reschedulePrefetchTask(
      task,
      treeAtTimeOfPrefetch,
      fetchStrategy,
      priority,
    ) {
      
      
      
      
      
      
      
      task.isCanceled = false;
      task.phase = 1;
      
      
      task.sortId = sortIdCounter++;
      task.priority = 
        task === mostRecentlyHoveredLink
          ? _types.PrefetchPriority.Intent
          : priority;
      task.treeAtTimeOfPrefetch = treeAtTimeOfPrefetch;
      task.fetchStrategy = fetchStrategy;
      trackMostRecentlyHoveredLink(task);
      if (task._heapIndex !== -1) {
        
        heapResift(taskHeap, task);
      } else {
        heapPush(taskHeap, task);
      }
      ensureWorkIsScheduled();
    }
    function isPrefetchTaskDirty(task, nextUrl, tree) {
      
      
      
      
      
      const currentCacheVersion = (0, _cache.getCurrentCacheVersion)();
      return (
        task.cacheVersion !== currentCacheVersion ||
        task.treeAtTimeOfPrefetch !== tree ||
        task.key.nextUrl !== nextUrl
      );
    }
    function trackMostRecentlyHoveredLink(task) {
      
      
      if (
        task.priority === _types.PrefetchPriority.Intent &&
        task !== mostRecentlyHoveredLink
      ) {
        if (mostRecentlyHoveredLink !== null) {
          
          if (
            mostRecentlyHoveredLink.priority !==
            _types.PrefetchPriority.Background
          ) {
            mostRecentlyHoveredLink.priority = _types.PrefetchPriority.Default;
            heapResift(taskHeap, mostRecentlyHoveredLink);
          }
        }
        mostRecentlyHoveredLink = task;
      }
    }
    function ensureWorkIsScheduled() {
      if (didScheduleMicrotask) {
        
        return;
      }
      didScheduleMicrotask = true;
      scheduleMicrotask(processQueueInMicrotask);
    }
    







 function hasNetworkBandwidth(task) {
      
      if (revalidationCooldownTimeoutHandle !== null) {
        
        
        
        return false;
      }
      
      
      
      
      
      if (task.priority === _types.PrefetchPriority.Intent) {
        
        
        
        
        
        
        
        
        return inProgressRequests < 12;
      }
      
      return inProgressRequests < 4;
    }
    function spawnPrefetchSubtask(prefetchSubtask) {
      
      
      
      
      
      
      
      
      
      inProgressRequests++;
      return prefetchSubtask.then((result) => {
        if (result === null) {
          
          
          onPrefetchConnectionClosed();
          return null;
        }
        
        result.closed.then(onPrefetchConnectionClosed);
        return result.value;
      });
    }
    function onPrefetchConnectionClosed() {
      inProgressRequests--;
      
      
      ensureWorkIsScheduled();
    }
    function pingPrefetchTask(task) {
      
      if (
        task.isCanceled || 
        task._heapIndex !== -1
      ) {
        return;
      }
      
      heapPush(taskHeap, task);
      ensureWorkIsScheduled();
    }
    function processQueueInMicrotask() {
      didScheduleMicrotask = false;
      
      
      
      const now = Date.now();
      
      let task = heapPeek(taskHeap);
      while (task !== null && hasNetworkBandwidth(task)) {
        task.cacheVersion = (0, _cache.getCurrentCacheVersion)();
        const exitStatus = pingRoute(now, task);
        
        
        const hasBackgroundWork = task.hasBackgroundWork;
        task.hasBackgroundWork = false;
        task.spawnedRuntimePrefetches = null;
        switch (exitStatus) {
          case 0:
            
            
            return;
          case 1:
            
            
            heapPop(taskHeap);
            
            task = heapPeek(taskHeap);
            continue;
          case 2:
            if (task.phase === 1) {
              
              
              task.phase = 0;
              heapResift(taskHeap, task);
            } else if (hasBackgroundWork) {
              
              
              task.priority = _types.PrefetchPriority.Background;
              heapResift(taskHeap, task);
            } else {
              
              heapPop(taskHeap);
            }
            task = heapPeek(taskHeap);
            continue;
          default:
            exitStatus;
        }
      }
    }
    








 function background(task) {
      if (task.priority === _types.PrefetchPriority.Background) {
        return true;
      }
      task.hasBackgroundWork = true;
      return false;
    }
    function pingRoute(now, task) {
      const key = task.key;
      const route = (0, _cache.readOrCreateRouteCacheEntry)(now, task, key);
      const exitStatus = pingRootRouteTree(now, task, route);
      if (exitStatus !== 0 && key.search !== "") {
        
        
        
        
        
        
        
        
        
        
        
        const url = new URL(key.pathname, location.origin);
        const keyWithoutSearch = (0, _cachekey.createCacheKey)(
          url.href,
          key.nextUrl,
        );
        const routeWithoutSearch = (0, _cache.readOrCreateRouteCacheEntry)(
          now,
          task,
          keyWithoutSearch,
        );
        switch (routeWithoutSearch.status) {
          case _cache.EntryStatus.Empty: {
            if (background(task)) {
              routeWithoutSearch.status = _cache.EntryStatus.Pending;
              spawnPrefetchSubtask(
                (0, _cache.fetchRouteOnCacheMiss)(
                  routeWithoutSearch,
                  task,
                  keyWithoutSearch,
                ),
              );
            }
            break;
          }
          case _cache.EntryStatus.Pending:
          case _cache.EntryStatus.Fulfilled:
          case _cache.EntryStatus.Rejected: {
            break;
          }
          default:
            routeWithoutSearch;
        }
      }
      return exitStatus;
    }
    function pingRootRouteTree(now, task, route) {
      switch (route.status) {
        case _cache.EntryStatus.Empty: {
          
          
          
          
          
          
          
          
          
          
          
          
          
          spawnPrefetchSubtask(
            (0, _cache.fetchRouteOnCacheMiss)(route, task, task.key),
          );
          
          
          
          
          
          
          route.staleAt = now + 60 * 1000;
          
          route.status = _cache.EntryStatus.Pending;
          
        }
        case _cache.EntryStatus.Pending: {
          
          
          
          const blockedTasks = route.blockedTasks;
          if (blockedTasks === null) {
            route.blockedTasks = new Set([task]);
          } else {
            blockedTasks.add(task);
          }
          return 1;
        }
        case _cache.EntryStatus.Rejected: {
          
          return 2;
        }
        case _cache.EntryStatus.Fulfilled: {
          if (task.phase !== 0) {
            
            return 2;
          }
          
          if (!hasNetworkBandwidth(task)) {
            
            return 0;
          }
          const tree = route.tree;
          
          
          
          
          const fetchStrategy =
            task.fetchStrategy === _types.FetchStrategy.PPR
              ? route.isPPREnabled
                ? _types.FetchStrategy.PPR
                : _types.FetchStrategy.LoadingBoundary
              : task.fetchStrategy;
          switch (fetchStrategy) {
            case _types.FetchStrategy.PPR: {
              
              
              
              
              
              
              
              pingStaticHead(now, task, route);
              const exitStatus = pingSharedPartOfCacheComponentsTree(
                now,
                task,
                route,
                task.treeAtTimeOfPrefetch,
                tree,
              );
              if (exitStatus === 0) {
                
                return 0;
              }
              const spawnedRuntimePrefetches = task.spawnedRuntimePrefetches;
              if (spawnedRuntimePrefetches !== null) {
                
                
                const spawnedEntries = new Map();
                pingRuntimeHead(
                  now,
                  task,
                  route,
                  spawnedEntries,
                  _types.FetchStrategy.PPRRuntime,
                );
                const requestTree = pingRuntimePrefetches(
                  now,
                  task,
                  route,
                  tree,
                  spawnedRuntimePrefetches,
                  spawnedEntries,
                );
                let needsDynamicRequest = spawnedEntries.size > 0;
                if (needsDynamicRequest) {
                  
                  
                  spawnPrefetchSubtask(
                    (0, _cache.fetchSegmentPrefetchesUsingDynamicRequest)(
                      task,
                      route,
                      _types.FetchStrategy.PPRRuntime,
                      requestTree,
                      spawnedEntries,
                    ),
                  );
                }
              }
              return 2;
            }
            case _types.FetchStrategy.Full:
            case _types.FetchStrategy.PPRRuntime:
            case _types.FetchStrategy.LoadingBoundary: {
              
              
              
              
              
              
              
              const spawnedEntries = new Map();
              pingRuntimeHead(now, task, route, spawnedEntries, fetchStrategy);
              const dynamicRequestTree = diffRouteTreeAgainstCurrent(
                now,
                task,
                route,
                task.treeAtTimeOfPrefetch,
                tree,
                spawnedEntries,
                fetchStrategy,
              );
              let needsDynamicRequest = spawnedEntries.size > 0;
              if (needsDynamicRequest) {
                spawnPrefetchSubtask(
                  (0, _cache.fetchSegmentPrefetchesUsingDynamicRequest)(
                    task,
                    route,
                    fetchStrategy,
                    dynamicRequestTree,
                    spawnedEntries,
                  ),
                );
              }
              return 2;
            }
            default:
              fetchStrategy;
          }
          break;
        }
        default: {
          route;
        }
      }
      return 2;
    }
    function pingStaticHead(now, task, route) {
      
      
      
      pingStaticSegmentData(
        now,
        task,
        route,
        (0, _cache.readOrCreateSegmentCacheEntry)(
          now,
          _types.FetchStrategy.PPR,
          route,
          route.metadata,
        ),
        task.key,
        route.metadata,
      );
    }
    function pingRuntimeHead(now, task, route, spawnedEntries, fetchStrategy) {
      pingRouteTreeAndIncludeDynamicData(
        now,
        task,
        route,
        route.metadata,
        false,
        spawnedEntries, 
        fetchStrategy === _types.FetchStrategy.LoadingBoundary
          ? _types.FetchStrategy.Full
          : fetchStrategy,
      );
    }
    
    function pingSharedPartOfCacheComponentsTree(
      now,
      task,
      route,
      oldTree,
      newTree,
    ) {
      
      
      
      
      
      
      
      
      
      
      
      const segment = (0, _cache.readOrCreateSegmentCacheEntry)(
        now,
        task.fetchStrategy,
        route,
        newTree,
      );
      pingStaticSegmentData(now, task, route, segment, task.key, newTree);
      
      const oldTreeChildren = oldTree[1];
      const newTreeChildren = newTree.slots;
      if (newTreeChildren !== null) {
        for (const parallelRouteKey in newTreeChildren) {
          if (!hasNetworkBandwidth(task)) {
            
            return 0;
          }
          const newTreeChild = newTreeChildren[parallelRouteKey];
          const newTreeChildSegment = newTreeChild.segment;
          const oldTreeChild = oldTreeChildren[parallelRouteKey];
          const oldTreeChildSegment = oldTreeChild?.[0];
          let childExitStatus;
          if (
            oldTreeChildSegment !== undefined &&
            doesCurrentSegmentMatchCachedSegment(
              route,
              newTreeChildSegment,
              oldTreeChildSegment,
            )
          ) {
            
            childExitStatus = pingSharedPartOfCacheComponentsTree(
              now,
              task,
              route,
              oldTreeChild,
              newTreeChild,
            );
          } else {
            
            
            childExitStatus = pingNewPartOfCacheComponentsTree(
              now,
              task,
              route,
              newTreeChild,
            );
          }
          if (childExitStatus === 0) {
            
            return 0;
          }
        }
      }
      return 2;
    }
    function pingNewPartOfCacheComponentsTree(now, task, route, tree) {
      
      
      
      
      
      if (tree.hasRuntimePrefetch) {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        if (task.spawnedRuntimePrefetches === null) {
          task.spawnedRuntimePrefetches = new Set([tree.requestKey]);
        } else {
          task.spawnedRuntimePrefetches.add(tree.requestKey);
        }
        
        return 2;
      }
      
      const segment = (0, _cache.readOrCreateSegmentCacheEntry)(
        now,
        task.fetchStrategy,
        route,
        tree,
      );
      pingStaticSegmentData(now, task, route, segment, task.key, tree);
      if (tree.slots !== null) {
        if (!hasNetworkBandwidth(task)) {
          
          return 0;
        }
        
        for (const parallelRouteKey in tree.slots) {
          const childTree = tree.slots[parallelRouteKey];
          const childExitStatus = pingNewPartOfCacheComponentsTree(
            now,
            task,
            route,
            childTree,
          );
          if (childExitStatus === 0) {
            
            return 0;
          }
        }
      }
      
      return 2;
    }
    function diffRouteTreeAgainstCurrent(
      now,
      task,
      route,
      oldTree,
      newTree,
      spawnedEntries,
      fetchStrategy,
    ) {
      
      
      
      
      
      
      
      
      
      const oldTreeChildren = oldTree[1];
      const newTreeChildren = newTree.slots;
      let requestTreeChildren = {};
      if (newTreeChildren !== null) {
        for (const parallelRouteKey in newTreeChildren) {
          const newTreeChild = newTreeChildren[parallelRouteKey];
          const newTreeChildSegment = newTreeChild.segment;
          const oldTreeChild = oldTreeChildren[parallelRouteKey];
          const oldTreeChildSegment = oldTreeChild?.[0];
          if (
            oldTreeChildSegment !== undefined &&
            doesCurrentSegmentMatchCachedSegment(
              route,
              newTreeChildSegment,
              oldTreeChildSegment,
            )
          ) {
            
            const requestTreeChild = diffRouteTreeAgainstCurrent(
              now,
              task,
              route,
              oldTreeChild,
              newTreeChild,
              spawnedEntries,
              fetchStrategy,
            );
            requestTreeChildren[parallelRouteKey] = requestTreeChild;
          } else {
            
            
            
            switch (fetchStrategy) {
              case _types.FetchStrategy.LoadingBoundary: {
                
                
                
                
                
                
                
                
                
                
                
                
                const subtreeHasLoadingBoundary =
                  newTreeChild.hasLoadingBoundary !==
                  _approutertypes.HasLoadingBoundary
                    .SubtreeHasNoLoadingBoundary;
                const requestTreeChild = subtreeHasLoadingBoundary
                  ? pingPPRDisabledRouteTreeUpToLoadingBoundary(
                      now,
                      task,
                      route,
                      newTreeChild,
                      null,
                      spawnedEntries,
                    )
                  : (0, _cache.convertRouteTreeToFlightRouterState)(
                      newTreeChild,
                    );
                requestTreeChildren[parallelRouteKey] = requestTreeChild;
                break;
              }
              case _types.FetchStrategy.PPRRuntime: {
                
                
                const requestTreeChild = pingRouteTreeAndIncludeDynamicData(
                  now,
                  task,
                  route,
                  newTreeChild,
                  false,
                  spawnedEntries,
                  fetchStrategy,
                );
                requestTreeChildren[parallelRouteKey] = requestTreeChild;
                break;
              }
              case _types.FetchStrategy.Full: {
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                const requestTreeChild = pingRouteTreeAndIncludeDynamicData(
                  now,
                  task,
                  route,
                  newTreeChild,
                  false,
                  spawnedEntries,
                  fetchStrategy,
                );
                requestTreeChildren[parallelRouteKey] = requestTreeChild;
                break;
              }
              default:
                fetchStrategy;
            }
          }
        }
      }
      const requestTree = [
        newTree.segment,
        requestTreeChildren,
        null,
        null,
        newTree.isRootLayout,
      ];
      return requestTree;
    }
    function pingPPRDisabledRouteTreeUpToLoadingBoundary(
      now,
      task,
      route,
      tree,
      refetchMarkerContext,
      spawnedEntries,
    ) {
      
      
      
      
      
      
      
      
      
      
      let refetchMarker =
        refetchMarkerContext === null ? "inside-shared-layout" : null;
      const segment = (0, _cache.readOrCreateSegmentCacheEntry)(
        now,
        task.fetchStrategy,
        route,
        tree,
      );
      switch (segment.status) {
        case _cache.EntryStatus.Empty: {
          
          
          
          
          
          
          
          
          spawnedEntries.set(
            tree.requestKey,
            (0, _cache.upgradeToPendingSegment)(
              segment, 
              
              _types.FetchStrategy.LoadingBoundary,
            ),
          );
          if (refetchMarkerContext !== "refetch") {
            refetchMarker = refetchMarkerContext = "refetch";
          } else {
            
            
          }
          break;
        }
        case _cache.EntryStatus.Fulfilled: {
          
          const segmentHasLoadingBoundary =
            tree.hasLoadingBoundary ===
            _approutertypes.HasLoadingBoundary.SegmentHasLoadingBoundary;
          if (segmentHasLoadingBoundary) {
            
            
            
            return (0, _cache.convertRouteTreeToFlightRouterState)(tree);
          }
          break;
        }
        case _cache.EntryStatus.Pending: {
          break;
        }
        case _cache.EntryStatus.Rejected: {
          break;
        }
        default:
          segment;
      }
      const requestTreeChildren = {};
      if (tree.slots !== null) {
        for (const parallelRouteKey in tree.slots) {
          const childTree = tree.slots[parallelRouteKey];
          requestTreeChildren[parallelRouteKey] =
            pingPPRDisabledRouteTreeUpToLoadingBoundary(
              now,
              task,
              route,
              childTree,
              refetchMarkerContext,
              spawnedEntries,
            );
        }
      }
      const requestTree = [
        tree.segment,
        requestTreeChildren,
        null,
        refetchMarker,
        tree.isRootLayout,
      ];
      return requestTree;
    }
    function pingRouteTreeAndIncludeDynamicData(
      now,
      task,
      route,
      tree,
      isInsideRefetchingParent,
      spawnedEntries,
      fetchStrategy,
    ) {
      
      
      
      
      
      
      
      
      const segment = (0, _cache.readOrCreateSegmentCacheEntry)(
        now, 
        
        
        
        fetchStrategy,
        route,
        tree,
      );
      let spawnedSegment = null;
      switch (segment.status) {
        case _cache.EntryStatus.Empty: {
          
          spawnedSegment = (0, _cache.upgradeToPendingSegment)(
            segment,
            fetchStrategy,
          );
          break;
        }
        case _cache.EntryStatus.Fulfilled: {
          
          if (
            segment.isPartial &&
            (0, _cache.canNewFetchStrategyProvideMoreContent)(
              segment.fetchStrategy,
              fetchStrategy,
            )
          ) {
            
            
            
            
            
            spawnedSegment = pingFullSegmentRevalidation(
              now,
              route,
              tree,
              fetchStrategy,
            );
          }
          break;
        }
        case _cache.EntryStatus.Pending:
        case _cache.EntryStatus.Rejected: {
          
          
          if (
            (0, _cache.canNewFetchStrategyProvideMoreContent)(
              segment.fetchStrategy,
              fetchStrategy,
            )
          ) {
            spawnedSegment = pingFullSegmentRevalidation(
              now,
              route,
              tree,
              fetchStrategy,
            );
          }
          break;
        }
        default:
          segment;
      }
      const requestTreeChildren = {};
      if (tree.slots !== null) {
        for (const parallelRouteKey in tree.slots) {
          const childTree = tree.slots[parallelRouteKey];
          requestTreeChildren[parallelRouteKey] =
            pingRouteTreeAndIncludeDynamicData(
              now,
              task,
              route,
              childTree,
              isInsideRefetchingParent || spawnedSegment !== null,
              spawnedEntries,
              fetchStrategy,
            );
        }
      }
      if (spawnedSegment !== null) {
        
        spawnedEntries.set(tree.requestKey, spawnedSegment);
      }
      
      const refetchMarker =
        !isInsideRefetchingParent && spawnedSegment !== null ? "refetch" : null;
      const requestTree = [
        tree.segment,
        requestTreeChildren,
        null,
        refetchMarker,
        tree.isRootLayout,
      ];
      return requestTree;
    }
    function pingRuntimePrefetches(
      now,
      task,
      route,
      tree,
      spawnedRuntimePrefetches,
      spawnedEntries,
    ) {
      
      
      
      
      
      
      if (spawnedRuntimePrefetches.has(tree.requestKey)) {
        
        return pingRouteTreeAndIncludeDynamicData(
          now,
          task,
          route,
          tree,
          false,
          spawnedEntries,
          _types.FetchStrategy.PPRRuntime,
        );
      }
      let requestTreeChildren = {};
      const slots = tree.slots;
      if (slots !== null) {
        for (const parallelRouteKey in slots) {
          const childTree = slots[parallelRouteKey];
          requestTreeChildren[parallelRouteKey] = pingRuntimePrefetches(
            now,
            task,
            route,
            childTree,
            spawnedRuntimePrefetches,
            spawnedEntries,
          );
        }
      }
      
      const requestTree = [tree.segment, requestTreeChildren, null, null];
      return requestTree;
    }
    function pingStaticSegmentData(now, task, route, segment, routeKey, tree) {
      switch (segment.status) {
        case _cache.EntryStatus.Empty:
          
          spawnPrefetchSubtask(
            (0, _cache.fetchSegmentOnCacheMiss)(
              route,
              (0, _cache.upgradeToPendingSegment)(
                segment,
                _types.FetchStrategy.PPR,
              ),
              routeKey,
              tree,
            ),
          );
          break;
        case _cache.EntryStatus.Pending: {
          
          
          switch (segment.fetchStrategy) {
            case _types.FetchStrategy.PPR:
            case _types.FetchStrategy.PPRRuntime:
            case _types.FetchStrategy.Full:
              break;
            case _types.FetchStrategy.LoadingBoundary:
              
              
              
              
              
              if (background(task)) {
                
                
                pingPPRSegmentRevalidation(now, route, routeKey, tree);
              }
              break;
            default:
              segment.fetchStrategy;
          }
          break;
        }
        case _cache.EntryStatus.Rejected: {
          
          
          switch (segment.fetchStrategy) {
            case _types.FetchStrategy.PPR:
            case _types.FetchStrategy.PPRRuntime:
            case _types.FetchStrategy.Full:
              break;
            case _types.FetchStrategy.LoadingBoundary:
              
              
              
              
              
              
              
              
              
              pingPPRSegmentRevalidation(now, route, routeKey, tree);
              break;
            default:
              segment.fetchStrategy;
          }
          break;
        }
        case _cache.EntryStatus.Fulfilled:
          break;
        default:
          segment;
      }
      
      
      
    }
    function pingPPRSegmentRevalidation(now, route, routeKey, tree) {
      const revalidatingSegment = (0,
      _cache.readOrCreateRevalidatingSegmentEntry)(
        now,
        _types.FetchStrategy.PPR,
        route,
        tree,
      );
      switch (revalidatingSegment.status) {
        case _cache.EntryStatus.Empty:
          
          
          upsertSegmentOnCompletion(
            spawnPrefetchSubtask(
              (0, _cache.fetchSegmentOnCacheMiss)(
                route,
                (0, _cache.upgradeToPendingSegment)(
                  revalidatingSegment,
                  _types.FetchStrategy.PPR,
                ),
                routeKey,
                tree,
              ),
            ),
            (0, _varypath.getSegmentVaryPathForRequest)(
              _types.FetchStrategy.PPR,
              tree,
            ),
          );
          break;
        case _cache.EntryStatus.Pending:
          break;
        case _cache.EntryStatus.Fulfilled:
        case _cache.EntryStatus.Rejected:
          break;
        default:
          revalidatingSegment;
      }
    }
    function pingFullSegmentRevalidation(now, route, tree, fetchStrategy) {
      const revalidatingSegment = (0,
      _cache.readOrCreateRevalidatingSegmentEntry)(
        now,
        fetchStrategy,
        route,
        tree,
      );
      if (revalidatingSegment.status === _cache.EntryStatus.Empty) {
        
        
        
        
        
        const pendingSegment = (0, _cache.upgradeToPendingSegment)(
          revalidatingSegment,
          fetchStrategy,
        );
        upsertSegmentOnCompletion(
          (0, _cache.waitForSegmentCacheEntry)(pendingSegment),
          (0, _varypath.getSegmentVaryPathForRequest)(fetchStrategy, tree),
        );
        return pendingSegment;
      } else {
        
        const nonEmptyRevalidatingSegment = revalidatingSegment;
        if (
          (0, _cache.canNewFetchStrategyProvideMoreContent)(
            nonEmptyRevalidatingSegment.fetchStrategy,
            fetchStrategy,
          )
        ) {
          
          
          const emptySegment = (0,
          _cache.overwriteRevalidatingSegmentCacheEntry)(
            fetchStrategy,
            route,
            tree,
          );
          const pendingSegment = (0, _cache.upgradeToPendingSegment)(
            emptySegment,
            fetchStrategy,
          );
          upsertSegmentOnCompletion(
            (0, _cache.waitForSegmentCacheEntry)(pendingSegment),
            (0, _varypath.getSegmentVaryPathForRequest)(fetchStrategy, tree),
          );
          return pendingSegment;
        }
        switch (nonEmptyRevalidatingSegment.status) {
          case _cache.EntryStatus.Pending:
            
            return null;
          case _cache.EntryStatus.Fulfilled:
          case _cache.EntryStatus.Rejected:
            
            
            
            return null;
          default:
            nonEmptyRevalidatingSegment;
            return null;
        }
      }
    }
    const noop = () => {};
    function upsertSegmentOnCompletion(promise, varyPath) {
      
      promise.then((fulfilled) => {
        if (fulfilled !== null) {
          
          (0, _cache.upsertSegmentEntry)(Date.now(), varyPath, fulfilled);
        }
      }, noop);
    }
    function doesCurrentSegmentMatchCachedSegment(
      route,
      currentSegment,
      cachedSegment,
    ) {
      if (cachedSegment === _segment.PAGE_SEGMENT_KEY) {
        
        
        
        
        
        
        
        
        
        
        return (
          currentSegment ===
          (0, _segment.addSearchParamsIfPageSegment)(
            _segment.PAGE_SEGMENT_KEY,
            Object.fromEntries(new URLSearchParams(route.renderedSearch)),
          )
        );
      }
      
      return (0, _matchsegments.matchSegment)(cachedSegment, currentSegment);
    }
    
    
    
    
    
    function compareQueuePriority(a, b) {
      
      
      
      
      const priorityDiff = b.priority - a.priority;
      if (priorityDiff !== 0) {
        return priorityDiff;
      }
      
      
      const phaseDiff = b.phase - a.phase;
      if (phaseDiff !== 0) {
        return phaseDiff;
      }
      
      
      return b.sortId - a.sortId;
    }
    function heapPush(heap, node) {
      const index = heap.length;
      heap.push(node);
      node._heapIndex = index;
      heapSiftUp(heap, node, index);
    }
    function heapPeek(heap) {
      return heap.length === 0 ? null : heap[0];
    }
    function heapPop(heap) {
      if (heap.length === 0) {
        return null;
      }
      const first = heap[0];
      first._heapIndex = -1;
      const last = heap.pop();
      if (last !== first) {
        heap[0] = last;
        last._heapIndex = 0;
        heapSiftDown(heap, last, 0);
      }
      return first;
    }
    function heapDelete(heap, node) {
      const index = node._heapIndex;
      if (index !== -1) {
        node._heapIndex = -1;
        if (heap.length !== 0) {
          const last = heap.pop();
          if (last !== node) {
            heap[index] = last;
            last._heapIndex = index;
            heapSiftDown(heap, last, index);
          }
        }
      }
    }
    function heapResift(heap, node) {
      const index = node._heapIndex;
      if (index !== -1) {
        if (index === 0) {
          heapSiftDown(heap, node, 0);
        } else {
          const parentIndex = (index - 1) >>> 1;
          const parent = heap[parentIndex];
          if (compareQueuePriority(parent, node) > 0) {
            
            heapSiftUp(heap, node, index);
          } else {
            
            heapSiftDown(heap, node, index);
          }
        }
      }
    }
    function heapSiftUp(heap, node, i) {
      let index = i;
      while (index > 0) {
        const parentIndex = (index - 1) >>> 1;
        const parent = heap[parentIndex];
        if (compareQueuePriority(parent, node) > 0) {
          
          heap[parentIndex] = node;
          node._heapIndex = parentIndex;
          heap[index] = parent;
          parent._heapIndex = index;
          index = parentIndex;
        } else {
          
          return;
        }
      }
    }
    function heapSiftDown(heap, node, i) {
      let index = i;
      const length = heap.length;
      const halfLength = length >>> 1;
      while (index < halfLength) {
        const leftIndex = (index + 1) * 2 - 1;
        const left = heap[leftIndex];
        const rightIndex = leftIndex + 1;
        const right = heap[rightIndex];
        
        if (compareQueuePriority(left, node) < 0) {
          if (rightIndex < length && compareQueuePriority(right, left) < 0) {
            heap[index] = right;
            right._heapIndex = index;
            heap[rightIndex] = node;
            node._heapIndex = rightIndex;
            index = rightIndex;
          } else {
            heap[index] = left;
            left._heapIndex = index;
            heap[leftIndex] = node;
            node._heapIndex = leftIndex;
            index = leftIndex;
          }
        } else if (
          rightIndex < length &&
          compareQueuePriority(right, node) < 0
        ) {
          heap[index] = right;
          right._heapIndex = index;
          heap[rightIndex] = node;
          node._heapIndex = rightIndex;
          index = rightIndex;
        } else {
          
          return;
        }
      }
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/normalize-trailing-slash.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "normalizePathTrailingSlash", {
      enumerable: true,
      get: function () {
        return normalizePathTrailingSlash;
      },
    });
    const _removetrailingslash = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js [app-client] (ecmascript)",
    );
    const _parsepath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-client] (ecmascript)",
    );
    const normalizePathTrailingSlash = (path) => {
      if (!path.startsWith("/") || ("TURBOPACK compile-time value", void 0)) {
        return path;
      }
      const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
      return `${(0, _removetrailingslash.removeTrailingSlash)(pathname)}${query}${hash}`;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "addBasePath", {
      enumerable: true,
      get: function () {
        return addBasePath;
      },
    });
    const _addpathprefix = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [app-client] (ecmascript)",
    );
    const _normalizetrailingslash = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/normalize-trailing-slash.js [app-client] (ecmascript)",
    );
    const basePath = ("TURBOPACK compile-time value", "") || "";
    function addBasePath(path, required) {
      return (0, _normalizetrailingslash.normalizePathTrailingSlash)(
        ("TURBOPACK compile-time falsy", 0)
          ? "TURBOPACK unreachable"
          : (0, _addpathprefix.addPathPrefix)(path, basePath),
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-utils.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        createPrefetchURL: null,
        isExternalURL: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      createPrefetchURL: function () {
        return createPrefetchURL;
      },
      isExternalURL: function () {
        return isExternalURL;
      },
    });
    const _isbot = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/is-bot.js [app-client] (ecmascript)",
    );
    const _addbasepath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)",
    );
    function isExternalURL(url) {
      return url.origin !== window.location.origin;
    }
    function createPrefetchURL(href) {
      
      if ((0, _isbot.isBot)(window.navigator.userAgent)) {
        return null;
      }
      let url;
      try {
        url = new URL(
          (0, _addbasepath.addBasePath)(href),
          window.location.href,
        );
      } catch (_) {
        
        
        throw Object.defineProperty(
          new Error(
            `Cannot prefetch '${href}' because it cannot be converted to a URL.`,
          ),
          "__NEXT_ERROR_CODE",
          {
            value: "E234",
            enumerable: false,
            configurable: true,
          },
        );
      }
      
      if (("TURBOPACK compile-time truthy", 1)) {
        return null;
      }
      
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        IDLE_LINK_STATUS: null,
        PENDING_LINK_STATUS: null,
        mountFormInstance: null,
        mountLinkInstance: null,
        onLinkVisibilityChanged: null,
        onNavigationIntent: null,
        pingVisibleLinks: null,
        setLinkForCurrentNavigation: null,
        unmountLinkForCurrentNavigation: null,
        unmountPrefetchableInstance: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      IDLE_LINK_STATUS: function () {
        return IDLE_LINK_STATUS;
      },
      PENDING_LINK_STATUS: function () {
        return PENDING_LINK_STATUS;
      },
      mountFormInstance: function () {
        return mountFormInstance;
      },
      mountLinkInstance: function () {
        return mountLinkInstance;
      },
      onLinkVisibilityChanged: function () {
        return onLinkVisibilityChanged;
      },
      onNavigationIntent: function () {
        return onNavigationIntent;
      },
      pingVisibleLinks: function () {
        return pingVisibleLinks;
      },
      setLinkForCurrentNavigation: function () {
        return setLinkForCurrentNavigation;
      },
      unmountLinkForCurrentNavigation: function () {
        return unmountLinkForCurrentNavigation;
      },
      unmountPrefetchableInstance: function () {
        return unmountPrefetchableInstance;
      },
    });
    const _types = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)",
    );
    const _cachekey = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache-key.js [app-client] (ecmascript)",
    );
    const _scheduler = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/scheduler.js [app-client] (ecmascript)",
    );
    const _react = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
    );
    
    
    let linkForMostRecentNavigation = null;
    const PENDING_LINK_STATUS = {
      pending: true,
    };
    const IDLE_LINK_STATUS = {
      pending: false,
    };
    function setLinkForCurrentNavigation(link) {
      (0, _react.startTransition)(() => {
        linkForMostRecentNavigation?.setOptimisticLinkStatus(IDLE_LINK_STATUS);
        link?.setOptimisticLinkStatus(PENDING_LINK_STATUS);
        linkForMostRecentNavigation = link;
      });
    }
    function unmountLinkForCurrentNavigation(link) {
      if (linkForMostRecentNavigation === link) {
        linkForMostRecentNavigation = null;
      }
    }
    
    
    const prefetchable =
      typeof WeakMap === "function" ? new WeakMap() : new Map();
    
    
    
    
    const prefetchableAndVisible = new Set();
    
    const observer =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver(handleIntersect, {
            rootMargin: "200px",
          })
        : null;
    function observeVisibility(element, instance) {
      const existingInstance = prefetchable.get(element);
      if (existingInstance !== undefined) {
        
        
        
        unmountPrefetchableInstance(element);
      }
      
      prefetchable.set(element, instance);
      if (observer !== null) {
        observer.observe(element);
      }
    }
    function coercePrefetchableUrl(href) {
      if (typeof window !== "undefined") {
        const { createPrefetchURL } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-utils.js [app-client] (ecmascript)",
        );
        try {
          return createPrefetchURL(href);
        } catch {
          
          
          
          
          
          const reportErrorFn =
            typeof reportError === "function" ? reportError : console.error;
          reportErrorFn(
            `Cannot prefetch '${href}' because it cannot be converted to a URL.`,
          );
          return null;
        }
      } else {
        return null;
      }
    }
    function mountLinkInstance(
      element,
      href,
      router,
      fetchStrategy,
      prefetchEnabled,
      setOptimisticLinkStatus,
    ) {
      if (prefetchEnabled) {
        const prefetchURL = coercePrefetchableUrl(href);
        if (prefetchURL !== null) {
          const instance = {
            router,
            fetchStrategy,
            isVisible: false,
            prefetchTask: null,
            prefetchHref: prefetchURL.href,
            setOptimisticLinkStatus,
          };
          
          
          observeVisibility(element, instance);
          return instance;
        }
      }
      
      
      const instance = {
        router,
        fetchStrategy,
        isVisible: false,
        prefetchTask: null,
        prefetchHref: null,
        setOptimisticLinkStatus,
      };
      return instance;
    }
    function mountFormInstance(element, href, router, fetchStrategy) {
      const prefetchURL = coercePrefetchableUrl(href);
      if (prefetchURL === null) {
        
        
        
        
        return;
      }
      const instance = {
        router,
        fetchStrategy,
        isVisible: false,
        prefetchTask: null,
        prefetchHref: prefetchURL.href,
        setOptimisticLinkStatus: null,
      };
      observeVisibility(element, instance);
    }
    function unmountPrefetchableInstance(element) {
      const instance = prefetchable.get(element);
      if (instance !== undefined) {
        prefetchable.delete(element);
        prefetchableAndVisible.delete(instance);
        const prefetchTask = instance.prefetchTask;
        if (prefetchTask !== null) {
          (0, _scheduler.cancelPrefetchTask)(prefetchTask);
        }
      }
      if (observer !== null) {
        observer.unobserve(element);
      }
    }
    function handleIntersect(entries) {
      for (const entry of entries) {
        
        
        
        const isVisible = entry.intersectionRatio > 0;
        onLinkVisibilityChanged(entry.target, isVisible);
      }
    }
    function onLinkVisibilityChanged(element, isVisible) {
      if (("TURBOPACK compile-time truthy", 1)) {
        
        
        
        return;
      }
      
      const instance = undefined;
    }
    function onNavigationIntent(element, unstable_upgradeToDynamicPrefetch) {
      const instance = prefetchable.get(element);
      if (instance === undefined) {
        return;
      }
      
      if (instance !== undefined) {
        if (("TURBOPACK compile-time falsy", 0)) 
        ;
        rescheduleLinkPrefetch(instance, _types.PrefetchPriority.Intent);
      }
    }
    function rescheduleLinkPrefetch(instance, priority) {
      
      if (typeof window !== "undefined") {
        const existingPrefetchTask = instance.prefetchTask;
        if (!instance.isVisible) {
          
          
          if (existingPrefetchTask !== null) {
            (0, _scheduler.cancelPrefetchTask)(existingPrefetchTask);
          }
          
          
          
          
          return;
        }
        const { getCurrentAppRouterState } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)",
        );
        const appRouterState = getCurrentAppRouterState();
        if (appRouterState !== null) {
          const treeAtTimeOfPrefetch = appRouterState.tree;
          if (existingPrefetchTask === null) {
            
            const nextUrl = appRouterState.nextUrl;
            const cacheKey = (0, _cachekey.createCacheKey)(
              instance.prefetchHref,
              nextUrl,
            );
            instance.prefetchTask = (0, _scheduler.schedulePrefetchTask)(
              cacheKey,
              treeAtTimeOfPrefetch,
              instance.fetchStrategy,
              priority,
              null,
            );
          } else {
            
            
            (0, _scheduler.reschedulePrefetchTask)(
              existingPrefetchTask,
              treeAtTimeOfPrefetch,
              instance.fetchStrategy,
              priority,
            );
          }
        }
      }
    }
    function pingVisibleLinks(nextUrl, tree) {
      
      
      
      
      
      
      
      for (const instance of prefetchableAndVisible) {
        const task = instance.prefetchTask;
        if (
          task !== null &&
          !(0, _scheduler.isPrefetchTaskDirty)(task, nextUrl, tree)
        ) {
          continue;
        }
        
        
        if (task !== null) {
          (0, _scheduler.cancelPrefetchTask)(task);
        }
        const cacheKey = (0, _cachekey.createCacheKey)(
          instance.prefetchHref,
          nextUrl,
        );
        instance.prefetchTask = (0, _scheduler.schedulePrefetchTask)(
          cacheKey,
          tree,
          instance.fetchStrategy,
          _types.PrefetchPriority.Default,
          null,
        );
      }
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        EntryStatus: null,
        canNewFetchStrategyProvideMoreContent: null,
        convertRouteTreeToFlightRouterState: null,
        createDetachedSegmentCacheEntry: null,
        fetchRouteOnCacheMiss: null,
        fetchSegmentOnCacheMiss: null,
        fetchSegmentPrefetchesUsingDynamicRequest: null,
        getCurrentCacheVersion: null,
        getStaleTimeMs: null,
        overwriteRevalidatingSegmentCacheEntry: null,
        pingInvalidationListeners: null,
        readOrCreateRevalidatingSegmentEntry: null,
        readOrCreateRouteCacheEntry: null,
        readOrCreateSegmentCacheEntry: null,
        readRouteCacheEntry: null,
        readSegmentCacheEntry: null,
        requestOptimisticRouteCacheEntry: null,
        revalidateEntireCache: null,
        upgradeToPendingSegment: null,
        upsertSegmentEntry: null,
        waitForSegmentCacheEntry: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      EntryStatus: function () {
        return EntryStatus;
      },
      canNewFetchStrategyProvideMoreContent: function () {
        return canNewFetchStrategyProvideMoreContent;
      },
      convertRouteTreeToFlightRouterState: function () {
        return convertRouteTreeToFlightRouterState;
      },
      createDetachedSegmentCacheEntry: function () {
        return createDetachedSegmentCacheEntry;
      },
      fetchRouteOnCacheMiss: function () {
        return fetchRouteOnCacheMiss;
      },
      fetchSegmentOnCacheMiss: function () {
        return fetchSegmentOnCacheMiss;
      },
      fetchSegmentPrefetchesUsingDynamicRequest: function () {
        return fetchSegmentPrefetchesUsingDynamicRequest;
      },
      getCurrentCacheVersion: function () {
        return getCurrentCacheVersion;
      },
      getStaleTimeMs: function () {
        return getStaleTimeMs;
      },
      overwriteRevalidatingSegmentCacheEntry: function () {
        return overwriteRevalidatingSegmentCacheEntry;
      },
      pingInvalidationListeners: function () {
        return pingInvalidationListeners;
      },
      readOrCreateRevalidatingSegmentEntry: function () {
        return readOrCreateRevalidatingSegmentEntry;
      },
      readOrCreateRouteCacheEntry: function () {
        return readOrCreateRouteCacheEntry;
      },
      readOrCreateSegmentCacheEntry: function () {
        return readOrCreateSegmentCacheEntry;
      },
      readRouteCacheEntry: function () {
        return readRouteCacheEntry;
      },
      readSegmentCacheEntry: function () {
        return readSegmentCacheEntry;
      },
      requestOptimisticRouteCacheEntry: function () {
        return requestOptimisticRouteCacheEntry;
      },
      revalidateEntireCache: function () {
        return revalidateEntireCache;
      },
      upgradeToPendingSegment: function () {
        return upgradeToPendingSegment;
      },
      upsertSegmentEntry: function () {
        return upsertSegmentEntry;
      },
      waitForSegmentCacheEntry: function () {
        return waitForSegmentCacheEntry;
      },
    });
    const _approutertypes = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/app-router-types.js [app-client] (ecmascript)",
    );
    const _approuterheaders = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-headers.js [app-client] (ecmascript)",
    );
    const _fetchserverresponse = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fetch-server-response.js [app-client] (ecmascript)",
    );
    const _scheduler = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/scheduler.js [app-client] (ecmascript)",
    );
    const _varypath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/vary-path.js [app-client] (ecmascript)",
    );
    const _appbuildid = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-build-id.js [app-client] (ecmascript)",
    );
    const _createhreffromurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [app-client] (ecmascript)",
    );
    const _cachekey = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache-key.js [app-client] (ecmascript)",
    );
    const _routeparams = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/route-params.js [app-client] (ecmascript)",
    );
    const _cachemap = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache-map.js [app-client] (ecmascript)",
    );
    const _segmentvalueencoding = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment-cache/segment-value-encoding.js [app-client] (ecmascript)",
    );
    const _flightdatahelpers = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/flight-data-helpers.js [app-client] (ecmascript)",
    );
    const _navigatereducer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/navigate-reducer.js [app-client] (ecmascript)",
    );
    const _links = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)",
    );
    const _segment = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)",
    );
    const _outputexportprefetchencoding = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment-cache/output-export-prefetch-encoding.js [app-client] (ecmascript)",
    );
    const _types = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)",
    );
    const _promisewithresolvers = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/promise-with-resolvers.js [app-client] (ecmascript)",
    );
    function getStaleTimeMs(staleTimeSeconds) {
      return Math.max(staleTimeSeconds, 30) * 1000;
    }
    var EntryStatus =  (function (EntryStatus) {
      EntryStatus[(EntryStatus["Empty"] = 0)] = "Empty";
      EntryStatus[(EntryStatus["Pending"] = 1)] = "Pending";
      EntryStatus[(EntryStatus["Fulfilled"] = 2)] = "Fulfilled";
      EntryStatus[(EntryStatus["Rejected"] = 3)] = "Rejected";
      return EntryStatus;
    })({});
    const isOutputExportMode =
      ("TURBOPACK compile-time value", "development") === "production" &&
      ("TURBOPACK compile-time value", void 0) === "export";
    const MetadataOnlyRequestTree = ["", {}, null, "metadata-only"];
    let routeCacheMap = (0, _cachemap.createCacheMap)();
    let segmentCacheMap = (0, _cachemap.createCacheMap)();
    
    
    
    
    
    
    let invalidationListeners = null;
    
    let currentCacheVersion = 0;
    function getCurrentCacheVersion() {
      return currentCacheVersion;
    }
    function revalidateEntireCache(nextUrl, tree) {
      
      
      
      
      
      
      currentCacheVersion++;
      
      (0, _scheduler.startRevalidationCooldown)();
      
      (0, _links.pingVisibleLinks)(nextUrl, tree);
      
      
      
      pingInvalidationListeners(nextUrl, tree);
    }
    function attachInvalidationListener(task) {
      
      
      
      
      
      if (task.onInvalidate !== null) {
        if (invalidationListeners === null) {
          invalidationListeners = new Set([task]);
        } else {
          invalidationListeners.add(task);
        }
      }
    }
    function notifyInvalidationListener(task) {
      const onInvalidate = task.onInvalidate;
      if (onInvalidate !== null) {
        
        
        task.onInvalidate = null;
        
        try {
          onInvalidate();
        } catch (error) {
          if (typeof reportError === "function") {
            reportError(error);
          } else {
            console.error(error);
          }
        }
      }
    }
    function pingInvalidationListeners(nextUrl, tree) {
      
      
      
      
      if (invalidationListeners !== null) {
        const tasks = invalidationListeners;
        invalidationListeners = null;
        for (const task of tasks) {
          if ((0, _scheduler.isPrefetchTaskDirty)(task, nextUrl, tree)) {
            notifyInvalidationListener(task);
          }
        }
      }
    }
    function readRouteCacheEntry(now, key) {
      const varyPath = (0, _varypath.getRouteVaryPath)(
        key.pathname,
        key.search,
        key.nextUrl,
      );
      const isRevalidation = false;
      return (0, _cachemap.getFromCacheMap)(
        now,
        getCurrentCacheVersion(),
        routeCacheMap,
        varyPath,
        isRevalidation,
      );
    }
    function readSegmentCacheEntry(now, varyPath) {
      const isRevalidation = false;
      return (0, _cachemap.getFromCacheMap)(
        now,
        getCurrentCacheVersion(),
        segmentCacheMap,
        varyPath,
        isRevalidation,
      );
    }
    function readRevalidatingSegmentCacheEntry(now, varyPath) {
      const isRevalidation = true;
      return (0, _cachemap.getFromCacheMap)(
        now,
        getCurrentCacheVersion(),
        segmentCacheMap,
        varyPath,
        isRevalidation,
      );
    }
    function waitForSegmentCacheEntry(pendingEntry) {
      
      
      let promiseWithResolvers = pendingEntry.promise;
      if (promiseWithResolvers === null) {
        promiseWithResolvers = pendingEntry.promise = (0,
        _promisewithresolvers.createPromiseWithResolvers)();
      } else {
        
      }
      return promiseWithResolvers.promise;
    }
    function readOrCreateRouteCacheEntry(now, task, key) {
      attachInvalidationListener(task);
      const existingEntry = readRouteCacheEntry(now, key);
      if (existingEntry !== null) {
        return existingEntry;
      }
      
      const pendingEntry = {
        canonicalUrl: null,
        status: 0,
        blockedTasks: null,
        tree: null,
        metadata: null,
        
        
        
        couldBeIntercepted: true,
        
        isPPREnabled: false,
        renderedSearch: null,
        
        ref: null,
        size: 0,
        
        
        staleAt: Infinity,
        version: getCurrentCacheVersion(),
      };
      const varyPath = (0, _varypath.getRouteVaryPath)(
        key.pathname,
        key.search,
        key.nextUrl,
      );
      const isRevalidation = false;
      (0, _cachemap.setInCacheMap)(
        routeCacheMap,
        varyPath,
        pendingEntry,
        isRevalidation,
      );
      return pendingEntry;
    }
    function requestOptimisticRouteCacheEntry(now, requestedUrl, nextUrl) {
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      const requestedSearch = requestedUrl.search;
      if (requestedSearch === "") {
        
        
        return null;
      }
      const urlWithoutSearchParams = new URL(requestedUrl);
      urlWithoutSearchParams.search = "";
      const routeWithNoSearchParams = readRouteCacheEntry(
        now,
        (0, _cachekey.createCacheKey)(urlWithoutSearchParams.href, nextUrl),
      );
      if (
        routeWithNoSearchParams === null ||
        routeWithNoSearchParams.status !== 2
      ) {
        
        
        return null;
      }
      
      
      
      
      
      
      const canonicalUrlForRouteWithNoSearchParams = new URL(
        routeWithNoSearchParams.canonicalUrl,
        requestedUrl.origin,
      );
      const optimisticCanonicalSearch =
        canonicalUrlForRouteWithNoSearchParams.search !== ""
          ? canonicalUrlForRouteWithNoSearchParams.search
          : requestedSearch;
      
      
      
      
      
      const optimisticRenderedSearch =
        routeWithNoSearchParams.renderedSearch !== ""
          ? routeWithNoSearchParams.renderedSearch
          : requestedSearch;
      const optimisticUrl = new URL(
        routeWithNoSearchParams.canonicalUrl,
        location.origin,
      );
      optimisticUrl.search = optimisticCanonicalSearch;
      const optimisticCanonicalUrl = (0, _createhreffromurl.createHrefFromUrl)(
        optimisticUrl,
      );
      const optimisticRouteTree = createOptimisticRouteTree(
        routeWithNoSearchParams.tree,
        optimisticRenderedSearch,
      );
      const optimisticMetadataTree = createOptimisticRouteTree(
        routeWithNoSearchParams.metadata,
        optimisticRenderedSearch,
      );
      
      
      const optimisticEntry = {
        canonicalUrl: optimisticCanonicalUrl,
        status: 2,
        
        blockedTasks: null,
        tree: optimisticRouteTree,
        metadata: optimisticMetadataTree,
        couldBeIntercepted: routeWithNoSearchParams.couldBeIntercepted,
        isPPREnabled: routeWithNoSearchParams.isPPREnabled,
        
        renderedSearch: optimisticRenderedSearch,
        
        ref: null,
        size: 0,
        staleAt: routeWithNoSearchParams.staleAt,
        version: routeWithNoSearchParams.version,
      };
      
      
      return optimisticEntry;
    }
    function createOptimisticRouteTree(tree, newRenderedSearch) {
      
      
      let clonedSlots = null;
      const originalSlots = tree.slots;
      if (originalSlots !== null) {
        clonedSlots = {};
        for (const parallelRouteKey in originalSlots) {
          const childTree = originalSlots[parallelRouteKey];
          clonedSlots[parallelRouteKey] = createOptimisticRouteTree(
            childTree,
            newRenderedSearch,
          );
        }
      }
      
      if (tree.isPage) {
        return {
          requestKey: tree.requestKey,
          segment: tree.segment,
          varyPath: (0, _varypath.clonePageVaryPathWithNewSearchParams)(
            tree.varyPath,
            newRenderedSearch,
          ),
          isPage: true,
          slots: clonedSlots,
          isRootLayout: tree.isRootLayout,
          hasLoadingBoundary: tree.hasLoadingBoundary,
          hasRuntimePrefetch: tree.hasRuntimePrefetch,
        };
      }
      return {
        requestKey: tree.requestKey,
        segment: tree.segment,
        varyPath: tree.varyPath,
        isPage: false,
        slots: clonedSlots,
        isRootLayout: tree.isRootLayout,
        hasLoadingBoundary: tree.hasLoadingBoundary,
        hasRuntimePrefetch: tree.hasRuntimePrefetch,
      };
    }
    function readOrCreateSegmentCacheEntry(now, fetchStrategy, route, tree) {
      const existingEntry = readSegmentCacheEntry(now, tree.varyPath);
      if (existingEntry !== null) {
        return existingEntry;
      }
      
      const varyPathForRequest = (0, _varypath.getSegmentVaryPathForRequest)(
        fetchStrategy,
        tree,
      );
      const pendingEntry = createDetachedSegmentCacheEntry(route.staleAt);
      const isRevalidation = false;
      (0, _cachemap.setInCacheMap)(
        segmentCacheMap,
        varyPathForRequest,
        pendingEntry,
        isRevalidation,
      );
      return pendingEntry;
    }
    function readOrCreateRevalidatingSegmentEntry(
      now,
      fetchStrategy,
      route,
      tree,
    ) {
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      const existingEntry = readRevalidatingSegmentCacheEntry(
        now,
        tree.varyPath,
      );
      if (existingEntry !== null) {
        return existingEntry;
      }
      
      const varyPathForRequest = (0, _varypath.getSegmentVaryPathForRequest)(
        fetchStrategy,
        tree,
      );
      const pendingEntry = createDetachedSegmentCacheEntry(route.staleAt);
      const isRevalidation = true;
      (0, _cachemap.setInCacheMap)(
        segmentCacheMap,
        varyPathForRequest,
        pendingEntry,
        isRevalidation,
      );
      return pendingEntry;
    }
    function overwriteRevalidatingSegmentCacheEntry(
      fetchStrategy,
      route,
      tree,
    ) {
      
      
      
      const varyPathForRequest = (0, _varypath.getSegmentVaryPathForRequest)(
        fetchStrategy,
        tree,
      );
      const pendingEntry = createDetachedSegmentCacheEntry(route.staleAt);
      const isRevalidation = true;
      (0, _cachemap.setInCacheMap)(
        segmentCacheMap,
        varyPathForRequest,
        pendingEntry,
        isRevalidation,
      );
      return pendingEntry;
    }
    function upsertSegmentEntry(now, varyPath, candidateEntry) {
      
      
      
      
      
      
      if (
        (0, _cachemap.isValueExpired)(
          now,
          getCurrentCacheVersion(),
          candidateEntry,
        )
      ) {
        
        return null;
      }
      const existingEntry = readSegmentCacheEntry(now, varyPath);
      if (existingEntry !== null) {
        
        
        
        if (
          
          (candidateEntry.fetchStrategy !== existingEntry.fetchStrategy &&
            !canNewFetchStrategyProvideMoreContent(
              existingEntry.fetchStrategy,
              candidateEntry.fetchStrategy,
            )) || 
          
          (!existingEntry.isPartial && candidateEntry.isPartial)
        ) {
          
          
          
          
          
          const rejectedEntry = candidateEntry;
          rejectedEntry.status = 3;
          rejectedEntry.loading = null;
          rejectedEntry.rsc = null;
          return null;
        }
        
        (0, _cachemap.deleteFromCacheMap)(existingEntry);
      }
      const isRevalidation = false;
      (0, _cachemap.setInCacheMap)(
        segmentCacheMap,
        varyPath,
        candidateEntry,
        isRevalidation,
      );
      return candidateEntry;
    }
    function createDetachedSegmentCacheEntry(staleAt) {
      const emptyEntry = {
        status: 0,
        
        
        fetchStrategy: _types.FetchStrategy.PPR,
        rsc: null,
        loading: null,
        isPartial: true,
        promise: null,
        
        ref: null,
        size: 0,
        staleAt,
        version: 0,
      };
      return emptyEntry;
    }
    function upgradeToPendingSegment(emptyEntry, fetchStrategy) {
      const pendingEntry = emptyEntry;
      pendingEntry.status = 1;
      pendingEntry.fetchStrategy = fetchStrategy;
      
      
      
      
      
      pendingEntry.version = getCurrentCacheVersion();
      return pendingEntry;
    }
    function pingBlockedTasks(entry) {
      const blockedTasks = entry.blockedTasks;
      if (blockedTasks !== null) {
        for (const task of blockedTasks) {
          (0, _scheduler.pingPrefetchTask)(task);
        }
        entry.blockedTasks = null;
      }
    }
    function fulfillRouteCacheEntry(
      entry,
      tree,
      metadataVaryPath,
      staleAt,
      couldBeIntercepted,
      canonicalUrl,
      renderedSearch,
      isPPREnabled,
    ) {
      
      
      
      
      const metadata = {
        requestKey: _segmentvalueencoding.HEAD_REQUEST_KEY,
        segment: _segmentvalueencoding.HEAD_REQUEST_KEY,
        varyPath: metadataVaryPath,
        
        
        
        isPage: true,
        slots: null,
        isRootLayout: false,
        hasLoadingBoundary:
          _approutertypes.HasLoadingBoundary.SubtreeHasNoLoadingBoundary,
        hasRuntimePrefetch: false,
      };
      const fulfilledEntry = entry;
      fulfilledEntry.status = 2;
      fulfilledEntry.tree = tree;
      fulfilledEntry.metadata = metadata;
      fulfilledEntry.staleAt = staleAt;
      fulfilledEntry.couldBeIntercepted = couldBeIntercepted;
      fulfilledEntry.canonicalUrl = canonicalUrl;
      fulfilledEntry.renderedSearch = renderedSearch;
      fulfilledEntry.isPPREnabled = isPPREnabled;
      pingBlockedTasks(entry);
      return fulfilledEntry;
    }
    function fulfillSegmentCacheEntry(
      segmentCacheEntry,
      rsc,
      loading,
      staleAt,
      isPartial,
    ) {
      const fulfilledEntry = segmentCacheEntry;
      fulfilledEntry.status = 2;
      fulfilledEntry.rsc = rsc;
      fulfilledEntry.loading = loading;
      fulfilledEntry.staleAt = staleAt;
      fulfilledEntry.isPartial = isPartial;
      
      if (segmentCacheEntry.promise !== null) {
        segmentCacheEntry.promise.resolve(fulfilledEntry);
        
        fulfilledEntry.promise = null;
      }
      return fulfilledEntry;
    }
    function rejectRouteCacheEntry(entry, staleAt) {
      const rejectedEntry = entry;
      rejectedEntry.status = 3;
      rejectedEntry.staleAt = staleAt;
      pingBlockedTasks(entry);
    }
    function rejectSegmentCacheEntry(entry, staleAt) {
      const rejectedEntry = entry;
      rejectedEntry.status = 3;
      rejectedEntry.staleAt = staleAt;
      if (entry.promise !== null) {
        
        
        entry.promise.resolve(null);
        entry.promise = null;
      }
    }
    function convertRootTreePrefetchToRouteTree(
      rootTree,
      renderedPathname,
      renderedSearch,
      acc,
    ) {
      
      const pathnameParts = renderedPathname.split("/").filter((p) => p !== "");
      const index = 0;
      const rootSegment = _segmentvalueencoding.ROOT_SEGMENT_REQUEST_KEY;
      return convertTreePrefetchToRouteTree(
        rootTree.tree,
        rootSegment,
        null,
        _segmentvalueencoding.ROOT_SEGMENT_REQUEST_KEY,
        pathnameParts,
        index,
        renderedSearch,
        acc,
      );
    }
    function convertTreePrefetchToRouteTree(
      prefetch,
      segment,
      partialVaryPath,
      requestKey,
      pathnameParts,
      pathnamePartsIndex,
      renderedSearch,
      acc,
    ) {
      
      
      
      
      
      let slots = null;
      let isPage;
      let varyPath;
      const prefetchSlots = prefetch.slots;
      if (prefetchSlots !== null) {
        isPage = false;
        varyPath = (0, _varypath.finalizeLayoutVaryPath)(
          requestKey,
          partialVaryPath,
        );
        slots = {};
        for (let parallelRouteKey in prefetchSlots) {
          const childPrefetch = prefetchSlots[parallelRouteKey];
          const childParamName = childPrefetch.name;
          const childParamType = childPrefetch.paramType;
          const childServerSentParamKey = childPrefetch.paramKey;
          let childDoesAppearInURL;
          let childSegment;
          let childPartialVaryPath;
          if (childParamType !== null) {
            
            const childParamValue = (0,
            _routeparams.parseDynamicParamFromURLPart)(
              childParamType,
              pathnameParts,
              pathnamePartsIndex,
            );
            
            
            
            
            
            
            
            
            
            const childParamKey = 
              childServerSentParamKey !== null
                ? childServerSentParamKey
                : (0, _routeparams.getCacheKeyForDynamicParam)(
                    childParamValue,
                    "",
                  );
            childPartialVaryPath = (0, _varypath.appendLayoutVaryPath)(
              partialVaryPath,
              childParamKey,
            );
            childSegment = [childParamName, childParamKey, childParamType];
            childDoesAppearInURL = true;
          } else {
            
            
            childPartialVaryPath = partialVaryPath;
            childSegment = childParamName;
            childDoesAppearInURL = (0,
            _routeparams.doesStaticSegmentAppearInURL)(childParamName);
          }
          
          
          const childPathnamePartsIndex = childDoesAppearInURL
            ? pathnamePartsIndex + 1
            : pathnamePartsIndex;
          const childRequestKeyPart = (0,
          _segmentvalueencoding.createSegmentRequestKeyPart)(childSegment);
          const childRequestKey = (0,
          _segmentvalueencoding.appendSegmentRequestKeyPart)(
            requestKey,
            parallelRouteKey,
            childRequestKeyPart,
          );
          slots[parallelRouteKey] = convertTreePrefetchToRouteTree(
            childPrefetch,
            childSegment,
            childPartialVaryPath,
            childRequestKey,
            pathnameParts,
            childPathnamePartsIndex,
            renderedSearch,
            acc,
          );
        }
      } else {
        if (requestKey.endsWith(_segment.PAGE_SEGMENT_KEY)) {
          
          isPage = true;
          varyPath = (0, _varypath.finalizePageVaryPath)(
            requestKey,
            renderedSearch,
            partialVaryPath,
          );
          
          
          
          
          
          
          if (acc.metadataVaryPath === null) {
            acc.metadataVaryPath = (0, _varypath.finalizeMetadataVaryPath)(
              requestKey,
              renderedSearch,
              partialVaryPath,
            );
          }
        } else {
          
          isPage = false;
          varyPath = (0, _varypath.finalizeLayoutVaryPath)(
            requestKey,
            partialVaryPath,
          );
        }
      }
      return {
        requestKey,
        segment,
        varyPath,
        
        
        
        
        
        
        isPage: isPage,
        slots,
        isRootLayout: prefetch.isRootLayout,
        
        
        hasLoadingBoundary:
          _approutertypes.HasLoadingBoundary.SegmentHasLoadingBoundary,
        hasRuntimePrefetch: prefetch.hasRuntimePrefetch,
      };
    }
    function convertRootFlightRouterStateToRouteTree(
      flightRouterState,
      renderedSearch,
      acc,
    ) {
      return convertFlightRouterStateToRouteTree(
        flightRouterState,
        _segmentvalueencoding.ROOT_SEGMENT_REQUEST_KEY,
        null,
        renderedSearch,
        acc,
      );
    }
    function convertFlightRouterStateToRouteTree(
      flightRouterState,
      requestKey,
      parentPartialVaryPath,
      renderedSearch,
      acc,
    ) {
      const originalSegment = flightRouterState[0];
      let segment;
      let partialVaryPath;
      let isPage;
      let varyPath;
      if (Array.isArray(originalSegment)) {
        isPage = false;
        const paramCacheKey = originalSegment[1];
        partialVaryPath = (0, _varypath.appendLayoutVaryPath)(
          parentPartialVaryPath,
          paramCacheKey,
        );
        varyPath = (0, _varypath.finalizeLayoutVaryPath)(
          requestKey,
          partialVaryPath,
        );
        segment = originalSegment;
      } else {
        
        
        partialVaryPath = parentPartialVaryPath;
        if (requestKey.endsWith(_segment.PAGE_SEGMENT_KEY)) {
          
          isPage = true;
          
          
          
          
          
          
          
          
          
          segment = _segment.PAGE_SEGMENT_KEY;
          varyPath = (0, _varypath.finalizePageVaryPath)(
            requestKey,
            renderedSearch,
            partialVaryPath,
          );
          
          
          
          
          
          
          if (acc.metadataVaryPath === null) {
            acc.metadataVaryPath = (0, _varypath.finalizeMetadataVaryPath)(
              requestKey,
              renderedSearch,
              partialVaryPath,
            );
          }
        } else {
          
          isPage = false;
          segment = originalSegment;
          varyPath = (0, _varypath.finalizeLayoutVaryPath)(
            requestKey,
            partialVaryPath,
          );
        }
      }
      let slots = null;
      const parallelRoutes = flightRouterState[1];
      for (let parallelRouteKey in parallelRoutes) {
        const childRouterState = parallelRoutes[parallelRouteKey];
        const childSegment = childRouterState[0];
        
        
        
        const childRequestKeyPart = (0,
        _segmentvalueencoding.createSegmentRequestKeyPart)(childSegment);
        const childRequestKey = (0,
        _segmentvalueencoding.appendSegmentRequestKeyPart)(
          requestKey,
          parallelRouteKey,
          childRequestKeyPart,
        );
        const childTree = convertFlightRouterStateToRouteTree(
          childRouterState,
          childRequestKey,
          partialVaryPath,
          renderedSearch,
          acc,
        );
        if (slots === null) {
          slots = {
            [parallelRouteKey]: childTree,
          };
        } else {
          slots[parallelRouteKey] = childTree;
        }
      }
      return {
        requestKey,
        segment,
        varyPath,
        
        
        
        
        
        
        isPage: isPage,
        slots,
        isRootLayout: flightRouterState[4] === true,
        hasLoadingBoundary:
          flightRouterState[5] !== undefined
            ? flightRouterState[5]
            : _approutertypes.HasLoadingBoundary.SubtreeHasNoLoadingBoundary,
        
        
        hasRuntimePrefetch: false,
      };
    }
    function convertRouteTreeToFlightRouterState(routeTree) {
      const parallelRoutes = {};
      if (routeTree.slots !== null) {
        for (const parallelRouteKey in routeTree.slots) {
          parallelRoutes[parallelRouteKey] =
            convertRouteTreeToFlightRouterState(
              routeTree.slots[parallelRouteKey],
            );
        }
      }
      const flightRouterState = [
        routeTree.segment,
        parallelRoutes,
        null,
        null,
        routeTree.isRootLayout,
      ];
      return flightRouterState;
    }
    async function fetchRouteOnCacheMiss(entry, task, key) {
      
      
      
      
      const pathname = key.pathname;
      const search = key.search;
      const nextUrl = key.nextUrl;
      const segmentPath = "/_tree";
      const headers = {
        [_approuterheaders.RSC_HEADER]: "1",
        [_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER]: "1",
        [_approuterheaders.NEXT_ROUTER_SEGMENT_PREFETCH_HEADER]: segmentPath,
      };
      if (nextUrl !== null) {
        headers[_approuterheaders.NEXT_URL] = nextUrl;
      }
      try {
        const url = new URL(pathname + search, location.origin);
        let response;
        let urlAfterRedirects;
        if (("TURBOPACK compile-time falsy", 0)) 
        ;
        else {
          
          
          
          
          response = await fetchPrefetchResponse(url, headers);
          urlAfterRedirects =
            response !== null && response.redirected
              ? new URL(response.url)
              : url;
        }
        if (
          !response ||
          !response.ok || 
          
          
          response.status === 204 ||
          !response.body
        ) {
          
          
          rejectRouteCacheEntry(entry, Date.now() + 10 * 1000);
          return null;
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        const canonicalUrl = (0, _createhreffromurl.createHrefFromUrl)(
          urlAfterRedirects,
        );
        
        const varyHeader = response.headers.get("vary");
        const couldBeIntercepted =
          varyHeader !== null &&
          varyHeader.includes(_approuterheaders.NEXT_URL);
        
        const closed = (0, _promisewithresolvers.createPromiseWithResolvers)();
        
        
        
        const routeIsPPREnabled =
          response.headers.get(_approuterheaders.NEXT_DID_POSTPONE_HEADER) ===
            "2" || 
          
          
          isOutputExportMode;
        if (routeIsPPREnabled) {
          const prefetchStream = createPrefetchResponseStream(
            response.body,
            closed.resolve,
            function onResponseSizeUpdate(size) {
              (0, _cachemap.setSizeInCacheMap)(entry, size);
            },
          );
          const serverData = await (0,
          _fetchserverresponse.createFromNextReadableStream)(
            prefetchStream,
            headers,
          );
          if (serverData.buildId !== (0, _appbuildid.getAppBuildId)()) {
            
            
            
            
            
            
            rejectRouteCacheEntry(entry, Date.now() + 10 * 1000);
            return null;
          }
          
          
          
          const renderedPathname = (0, _routeparams.getRenderedPathname)(
            response,
          );
          const renderedSearch = (0, _routeparams.getRenderedSearch)(response);
          
          
          
          
          
          const acc = {
            metadataVaryPath: null,
          };
          const routeTree = convertRootTreePrefetchToRouteTree(
            serverData,
            renderedPathname,
            renderedSearch,
            acc,
          );
          const metadataVaryPath = acc.metadataVaryPath;
          if (metadataVaryPath === null) {
            rejectRouteCacheEntry(entry, Date.now() + 10 * 1000);
            return null;
          }
          const staleTimeMs = getStaleTimeMs(serverData.staleTime);
          fulfillRouteCacheEntry(
            entry,
            routeTree,
            metadataVaryPath,
            Date.now() + staleTimeMs,
            couldBeIntercepted,
            canonicalUrl,
            renderedSearch,
            routeIsPPREnabled,
          );
        } else {
          
          
          
          
          
          const prefetchStream = createPrefetchResponseStream(
            response.body,
            closed.resolve,
            function onResponseSizeUpdate(size) {
              (0, _cachemap.setSizeInCacheMap)(entry, size);
            },
          );
          const serverData = await (0,
          _fetchserverresponse.createFromNextReadableStream)(
            prefetchStream,
            headers,
          );
          if (serverData.b !== (0, _appbuildid.getAppBuildId)()) {
            
            
            
            
            
            
            rejectRouteCacheEntry(entry, Date.now() + 10 * 1000);
            return null;
          }
          writeDynamicTreeResponseIntoCache(
            Date.now(),
            task, 
            _types.FetchStrategy.LoadingBoundary,
            response,
            serverData,
            entry,
            couldBeIntercepted,
            canonicalUrl,
            routeIsPPREnabled,
          );
        }
        if (!couldBeIntercepted) {
          
          
          
          
          
          
          
          
          
          
          const fulfilledVaryPath = (0, _varypath.getFulfilledRouteVaryPath)(
            pathname,
            search,
            nextUrl,
            couldBeIntercepted,
          );
          const isRevalidation = false;
          (0, _cachemap.setInCacheMap)(
            routeCacheMap,
            fulfilledVaryPath,
            entry,
            isRevalidation,
          );
        }
        
        
        return {
          value: null,
          closed: closed.promise,
        };
      } catch (error) {
        
        
        rejectRouteCacheEntry(entry, Date.now() + 10 * 1000);
        return null;
      }
    }
    async function fetchSegmentOnCacheMiss(
      route,
      segmentCacheEntry,
      routeKey,
      tree,
    ) {
      
      
      
      
      
      
      
      
      
      
      
      const url = new URL(route.canonicalUrl, location.origin);
      const nextUrl = routeKey.nextUrl;
      const requestKey = tree.requestKey;
      const normalizedRequestKey =
        requestKey === _segmentvalueencoding.ROOT_SEGMENT_REQUEST_KEY 
          ? 
            
            
            "/_index"
          : requestKey;
      const headers = {
        [_approuterheaders.RSC_HEADER]: "1",
        [_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER]: "1",
        [_approuterheaders.NEXT_ROUTER_SEGMENT_PREFETCH_HEADER]:
          normalizedRequestKey,
      };
      if (nextUrl !== null) {
        headers[_approuterheaders.NEXT_URL] = nextUrl;
      }
      const requestUrl = ("TURBOPACK compile-time falsy", 0)
        ? "TURBOPACK unreachable"
        : url;
      try {
        const response = await fetchPrefetchResponse(requestUrl, headers);
        if (
          !response ||
          !response.ok ||
          response.status === 204 || 
          
          
          
          
          
          (response.headers.get(_approuterheaders.NEXT_DID_POSTPONE_HEADER) !==
            "2" && 
            
            
            !isOutputExportMode) ||
          !response.body
        ) {
          
          
          rejectSegmentCacheEntry(segmentCacheEntry, Date.now() + 10 * 1000);
          return null;
        }
        
        const closed = (0, _promisewithresolvers.createPromiseWithResolvers)();
        
        
        const prefetchStream = createPrefetchResponseStream(
          response.body,
          closed.resolve,
          function onResponseSizeUpdate(size) {
            (0, _cachemap.setSizeInCacheMap)(segmentCacheEntry, size);
          },
        );
        const serverData = await (0,
        _fetchserverresponse.createFromNextReadableStream)(
          prefetchStream,
          headers,
        );
        if (serverData.buildId !== (0, _appbuildid.getAppBuildId)()) {
          
          
          
          
          
          rejectSegmentCacheEntry(segmentCacheEntry, Date.now() + 10 * 1000);
          return null;
        }
        return {
          value: fulfillSegmentCacheEntry(
            segmentCacheEntry,
            serverData.rsc,
            serverData.loading, 
            route.staleAt,
            serverData.isPartial,
          ),
          
          
          closed: closed.promise,
        };
      } catch (error) {
        
        
        rejectSegmentCacheEntry(segmentCacheEntry, Date.now() + 10 * 1000);
        return null;
      }
    }
    async function fetchSegmentPrefetchesUsingDynamicRequest(
      task,
      route,
      fetchStrategy,
      dynamicRequestTree,
      spawnedEntries,
    ) {
      const key = task.key;
      const url = new URL(route.canonicalUrl, location.origin);
      const nextUrl = key.nextUrl;
      if (
        spawnedEntries.size === 1 &&
        spawnedEntries.has(route.metadata.requestKey)
      ) {
        
        
        dynamicRequestTree = MetadataOnlyRequestTree;
      }
      const headers = {
        [_approuterheaders.RSC_HEADER]: "1",
        [_approuterheaders.NEXT_ROUTER_STATE_TREE_HEADER]: (0,
        _flightdatahelpers.prepareFlightRouterStateForRequest)(
          dynamicRequestTree,
        ),
      };
      if (nextUrl !== null) {
        headers[_approuterheaders.NEXT_URL] = nextUrl;
      }
      switch (fetchStrategy) {
        case _types.FetchStrategy.Full: {
          break;
        }
        case _types.FetchStrategy.PPRRuntime: {
          headers[_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER] = "2";
          break;
        }
        case _types.FetchStrategy.LoadingBoundary: {
          headers[_approuterheaders.NEXT_ROUTER_PREFETCH_HEADER] = "1";
          break;
        }
        default: {
          fetchStrategy;
        }
      }
      try {
        const response = await fetchPrefetchResponse(url, headers);
        if (!response || !response.ok || !response.body) {
          
          
          rejectSegmentEntriesIfStillPending(
            spawnedEntries,
            Date.now() + 10 * 1000,
          );
          return null;
        }
        const renderedSearch = (0, _routeparams.getRenderedSearch)(response);
        if (renderedSearch !== route.renderedSearch) {
          
          
          
          
          
          
          
          rejectSegmentEntriesIfStillPending(
            spawnedEntries,
            Date.now() + 10 * 1000,
          );
          return null;
        }
        
        const closed = (0, _promisewithresolvers.createPromiseWithResolvers)();
        let fulfilledEntries = null;
        const prefetchStream = createPrefetchResponseStream(
          response.body,
          closed.resolve,
          function onResponseSizeUpdate(totalBytesReceivedSoFar) {
            
            
            
            if (fulfilledEntries === null) {
              
              
              return;
            }
            const averageSize =
              totalBytesReceivedSoFar / fulfilledEntries.length;
            for (const entry of fulfilledEntries) {
              (0, _cachemap.setSizeInCacheMap)(entry, averageSize);
            }
          },
        );
        const serverData = await (0,
        _fetchserverresponse.createFromNextReadableStream)(
          prefetchStream,
          headers,
        );
        const isResponsePartial =
          fetchStrategy === _types.FetchStrategy.PPRRuntime
            ? serverData.rp?.[0] === true
            : false;
        
        
        
        fulfilledEntries = writeDynamicRenderResponseIntoCache(
          Date.now(),
          task,
          fetchStrategy,
          response,
          serverData,
          isResponsePartial,
          route,
          spawnedEntries,
        );
        
        
        return {
          value: null,
          closed: closed.promise,
        };
      } catch (error) {
        rejectSegmentEntriesIfStillPending(
          spawnedEntries,
          Date.now() + 10 * 1000,
        );
        return null;
      }
    }
    function writeDynamicTreeResponseIntoCache(
      now,
      task,
      fetchStrategy,
      response,
      serverData,
      entry,
      couldBeIntercepted,
      canonicalUrl,
      routeIsPPREnabled,
    ) {
      
      
      const renderedSearch = (0, _routeparams.getRenderedSearch)(response);
      const normalizedFlightDataResult = (0,
      _flightdatahelpers.normalizeFlightData)(serverData.f);
      if (
        
        typeof normalizedFlightDataResult === "string" ||
        normalizedFlightDataResult.length !== 1
      ) {
        rejectRouteCacheEntry(entry, now + 10 * 1000);
        return;
      }
      const flightData = normalizedFlightDataResult[0];
      if (!flightData.isRootRender) {
        
        rejectRouteCacheEntry(entry, now + 10 * 1000);
        return;
      }
      const flightRouterState = flightData.tree;
      
      
      const staleTimeSeconds =
        typeof serverData.rp?.[1] === "number"
          ? serverData.rp[1]
          : parseInt(
              response.headers.get(
                _approuterheaders.NEXT_ROUTER_STALE_TIME_HEADER,
              ) ?? "",
              10,
            );
      const staleTimeMs = !isNaN(staleTimeSeconds)
        ? getStaleTimeMs(staleTimeSeconds)
        : _navigatereducer.STATIC_STALETIME_MS;
      
      
      
      
      const isResponsePartial =
        response.headers.get(_approuterheaders.NEXT_DID_POSTPONE_HEADER) ===
        "1";
      
      
      
      
      
      const acc = {
        metadataVaryPath: null,
      };
      const routeTree = convertRootFlightRouterStateToRouteTree(
        flightRouterState,
        renderedSearch,
        acc,
      );
      const metadataVaryPath = acc.metadataVaryPath;
      if (metadataVaryPath === null) {
        rejectRouteCacheEntry(entry, now + 10 * 1000);
        return;
      }
      const fulfilledEntry = fulfillRouteCacheEntry(
        entry,
        routeTree,
        metadataVaryPath,
        now + staleTimeMs,
        couldBeIntercepted,
        canonicalUrl,
        renderedSearch,
        routeIsPPREnabled,
      );
      
      
      
      
      
      
      
      
      
      writeDynamicRenderResponseIntoCache(
        now,
        task,
        fetchStrategy,
        response,
        serverData,
        isResponsePartial,
        fulfilledEntry,
        null,
      );
    }
    function rejectSegmentEntriesIfStillPending(entries, staleAt) {
      const fulfilledEntries = [];
      for (const entry of entries.values()) {
        if (entry.status === 1) {
          rejectSegmentCacheEntry(entry, staleAt);
        } else if (entry.status === 2) {
          fulfilledEntries.push(entry);
        }
      }
      return fulfilledEntries;
    }
    function writeDynamicRenderResponseIntoCache(
      now,
      task,
      fetchStrategy,
      response,
      serverData,
      isResponsePartial,
      route,
      spawnedEntries,
    ) {
      if (serverData.b !== (0, _appbuildid.getAppBuildId)()) {
        
        
        
        
        
        if (spawnedEntries !== null) {
          rejectSegmentEntriesIfStillPending(spawnedEntries, now + 10 * 1000);
        }
        return null;
      }
      const flightDatas = (0, _flightdatahelpers.normalizeFlightData)(
        serverData.f,
      );
      if (typeof flightDatas === "string") {
        
        
        return null;
      }
      
      
      const staleTimeSeconds =
        typeof serverData.rp?.[1] === "number"
          ? serverData.rp[1]
          : parseInt(
              response.headers.get(
                _approuterheaders.NEXT_ROUTER_STALE_TIME_HEADER,
              ) ?? "",
              10,
            );
      const staleTimeMs = !isNaN(staleTimeSeconds)
        ? getStaleTimeMs(staleTimeSeconds)
        : _navigatereducer.STATIC_STALETIME_MS;
      const staleAt = now + staleTimeMs;
      for (const flightData of flightDatas) {
        const seedData = flightData.seedData;
        if (seedData !== null) {
          
          
          
          
          
          
          
          const segmentPath = flightData.segmentPath;
          let tree = route.tree;
          for (let i = 0; i < segmentPath.length; i += 2) {
            const parallelRouteKey = segmentPath[i];
            if (tree?.slots?.[parallelRouteKey] !== undefined) {
              tree = tree.slots[parallelRouteKey];
            } else {
              if (spawnedEntries !== null) {
                rejectSegmentEntriesIfStillPending(
                  spawnedEntries,
                  now + 10 * 1000,
                );
              }
              return null;
            }
          }
          writeSeedDataIntoCache(
            now,
            task,
            fetchStrategy,
            route,
            tree,
            staleAt,
            seedData,
            isResponsePartial,
            spawnedEntries,
          );
        }
        const head = flightData.head;
        if (head !== null) {
          fulfillEntrySpawnedByRuntimePrefetch(
            now,
            fetchStrategy,
            route,
            head,
            null,
            flightData.isHeadPartial,
            staleAt,
            route.metadata,
            spawnedEntries,
          );
        }
      }
      
      
      
      
      
      
      
      
      if (spawnedEntries !== null) {
        const fulfilledEntries = rejectSegmentEntriesIfStillPending(
          spawnedEntries,
          now + 10 * 1000,
        );
        return fulfilledEntries;
      }
      return null;
    }
    function writeSeedDataIntoCache(
      now,
      task,
      fetchStrategy,
      route,
      tree,
      staleAt,
      seedData,
      isResponsePartial,
      entriesOwnedByCurrentTask,
    ) {
      
      
      const rsc = seedData[0];
      const loading = seedData[2];
      const isPartial = rsc === null || isResponsePartial;
      fulfillEntrySpawnedByRuntimePrefetch(
        now,
        fetchStrategy,
        route,
        rsc,
        loading,
        isPartial,
        staleAt,
        tree,
        entriesOwnedByCurrentTask,
      );
      
      const slots = tree.slots;
      if (slots !== null) {
        const seedDataChildren = seedData[1];
        for (const parallelRouteKey in slots) {
          const childTree = slots[parallelRouteKey];
          const childSeedData = seedDataChildren[parallelRouteKey];
          if (childSeedData !== null && childSeedData !== undefined) {
            writeSeedDataIntoCache(
              now,
              task,
              fetchStrategy,
              route,
              childTree,
              staleAt,
              childSeedData,
              isResponsePartial,
              entriesOwnedByCurrentTask,
            );
          }
        }
      }
    }
    function fulfillEntrySpawnedByRuntimePrefetch(
      now,
      fetchStrategy,
      route,
      rsc,
      loading,
      isPartial,
      staleAt,
      tree,
      entriesOwnedByCurrentTask,
    ) {
      
      
      
      const ownedEntry =
        entriesOwnedByCurrentTask !== null
          ? entriesOwnedByCurrentTask.get(tree.requestKey)
          : undefined;
      if (ownedEntry !== undefined) {
        fulfillSegmentCacheEntry(ownedEntry, rsc, loading, staleAt, isPartial);
      } else {
        
        const possiblyNewEntry = readOrCreateSegmentCacheEntry(
          now,
          fetchStrategy,
          route,
          tree,
        );
        if (possiblyNewEntry.status === 0) {
          
          const newEntry = possiblyNewEntry;
          fulfillSegmentCacheEntry(
            upgradeToPendingSegment(newEntry, fetchStrategy),
            rsc,
            loading,
            staleAt,
            isPartial,
          );
        } else {
          
          
          const newEntry = fulfillSegmentCacheEntry(
            upgradeToPendingSegment(
              createDetachedSegmentCacheEntry(staleAt),
              fetchStrategy,
            ),
            rsc,
            loading,
            staleAt,
            isPartial,
          );
          upsertSegmentEntry(
            now,
            (0, _varypath.getSegmentVaryPathForRequest)(fetchStrategy, tree),
            newEntry,
          );
        }
      }
    }
    async function fetchPrefetchResponse(url, headers) {
      const fetchPriority = "low";
      
      
      
      
      const shouldImmediatelyDecode = false;
      const response = await (0, _fetchserverresponse.createFetch)(
        url,
        headers,
        fetchPriority,
        shouldImmediatelyDecode,
      );
      if (!response.ok) {
        return null;
      }
      
      if (("TURBOPACK compile-time falsy", 0)) {
        
        
        
        
      } else {
        const contentType = response.headers.get("content-type");
        const isFlightResponse =
          contentType &&
          contentType.startsWith(_approuterheaders.RSC_CONTENT_TYPE_HEADER);
        if (!isFlightResponse) {
          return null;
        }
      }
      return response;
    }
    function createPrefetchResponseStream(
      originalFlightStream,
      onStreamClose,
      onResponseSizeUpdate,
    ) {
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      let totalByteLength = 0;
      const reader = originalFlightStream.getReader();
      return new ReadableStream({
        async pull(controller) {
          while (true) {
            const { done, value } = await reader.read();
            if (!done) {
              
              
              controller.enqueue(value);
              
              
              
              
              totalByteLength += value.byteLength;
              onResponseSizeUpdate(totalByteLength);
              continue;
            }
            
            
            onStreamClose();
            return;
          }
        },
      });
    }
    function addSegmentPathToUrlInOutputExportMode(url, segmentPath) {
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
      return url;
    }
    function canNewFetchStrategyProvideMoreContent(
      currentStrategy,
      newStrategy,
    ) {
      return currentStrategy < newStrategy;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/navigation.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "navigate", {
      enumerable: true,
      get: function () {
        return navigate;
      },
    });
    const _fetchserverresponse = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fetch-server-response.js [app-client] (ecmascript)",
    );
    const _pprnavigations = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/ppr-navigations.js [app-client] (ecmascript)",
    );
    const _createhreffromurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [app-client] (ecmascript)",
    );
    const _cache = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache.js [app-client] (ecmascript)",
    );
    const _cachekey = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache-key.js [app-client] (ecmascript)",
    );
    const _segment = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)",
    );
    const _types = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)",
    );
    function navigate(
      url,
      currentUrl,
      currentCacheNode,
      currentFlightRouterState,
      nextUrl,
      shouldScroll,
      accumulation,
    ) {
      const now = Date.now();
      const href = url.href;
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      const isSamePageNavigation = 
        
        
        
        href === window.location.href;
      const cacheKey = (0, _cachekey.createCacheKey)(href, nextUrl);
      const route = (0, _cache.readRouteCacheEntry)(now, cacheKey);
      if (route !== null && route.status === _cache.EntryStatus.Fulfilled) {
        
        const snapshot = readRenderSnapshotFromCache(now, route, route.tree);
        const prefetchFlightRouterState = snapshot.flightRouterState;
        const prefetchSeedData = snapshot.seedData;
        const headSnapshot = readHeadSnapshotFromCache(now, route);
        const prefetchHead = headSnapshot.rsc;
        const isPrefetchHeadPartial = headSnapshot.isPartial;
        
        
        
        
        
        
        const newCanonicalUrl = route.canonicalUrl + url.hash;
        const renderedSearch = route.renderedSearch;
        return navigateUsingPrefetchedRouteTree(
          now,
          url,
          currentUrl,
          nextUrl,
          isSamePageNavigation,
          currentCacheNode,
          currentFlightRouterState,
          prefetchFlightRouterState,
          prefetchSeedData,
          prefetchHead,
          isPrefetchHeadPartial,
          newCanonicalUrl,
          renderedSearch,
          shouldScroll,
          url.hash,
        );
      }
      
      
      
      
      
      
      
      
      
      if (route === null || route.status !== _cache.EntryStatus.Rejected) {
        const optimisticRoute = (0, _cache.requestOptimisticRouteCacheEntry)(
          now,
          url,
          nextUrl,
        );
        if (optimisticRoute !== null) {
          
          const snapshot = readRenderSnapshotFromCache(
            now,
            optimisticRoute,
            optimisticRoute.tree,
          );
          const prefetchFlightRouterState = snapshot.flightRouterState;
          const prefetchSeedData = snapshot.seedData;
          const headSnapshot = readHeadSnapshotFromCache(now, optimisticRoute);
          const prefetchHead = headSnapshot.rsc;
          const isPrefetchHeadPartial = headSnapshot.isPartial;
          const newCanonicalUrl = optimisticRoute.canonicalUrl + url.hash;
          const newRenderedSearch = optimisticRoute.renderedSearch;
          return navigateUsingPrefetchedRouteTree(
            now,
            url,
            currentUrl,
            nextUrl,
            isSamePageNavigation,
            currentCacheNode,
            currentFlightRouterState,
            prefetchFlightRouterState,
            prefetchSeedData,
            prefetchHead,
            isPrefetchHeadPartial,
            newCanonicalUrl,
            newRenderedSearch,
            shouldScroll,
            url.hash,
          );
        }
      }
      
      let collectedDebugInfo = accumulation.collectedDebugInfo ?? [];
      if (accumulation.collectedDebugInfo === undefined) {
        collectedDebugInfo = accumulation.collectedDebugInfo = [];
      }
      return {
        tag: _types.NavigationResultTag.Async,
        data: navigateDynamicallyWithNoPrefetch(
          now,
          url,
          currentUrl,
          nextUrl,
          isSamePageNavigation,
          currentCacheNode,
          currentFlightRouterState,
          shouldScroll,
          url.hash,
          collectedDebugInfo,
        ),
      };
    }
    function navigateUsingPrefetchedRouteTree(
      now,
      url,
      currentUrl,
      nextUrl,
      isSamePageNavigation,
      currentCacheNode,
      currentFlightRouterState,
      prefetchFlightRouterState,
      prefetchSeedData,
      prefetchHead,
      isPrefetchHeadPartial,
      canonicalUrl,
      renderedSearch,
      shouldScroll,
      hash,
    ) {
      
      
      
      
      
      
      const scrollableSegments = [];
      const task = (0, _pprnavigations.startPPRNavigation)(
        now,
        currentUrl,
        currentCacheNode,
        currentFlightRouterState,
        prefetchFlightRouterState,
        prefetchSeedData,
        prefetchHead,
        isPrefetchHeadPartial,
        isSamePageNavigation,
        scrollableSegments,
      );
      if (task !== null) {
        const dynamicRequestTree = task.dynamicRequestTree;
        if (dynamicRequestTree !== null) {
          const promiseForDynamicServerResponse = (0,
          _fetchserverresponse.fetchServerResponse)(
            new URL(canonicalUrl, url.origin),
            {
              flightRouterState: dynamicRequestTree,
              nextUrl,
            },
          );
          (0, _pprnavigations.listenForDynamicRequest)(
            task,
            promiseForDynamicServerResponse,
          );
        } else {
          
          
        }
        return navigationTaskToResult(
          task,
          currentCacheNode,
          canonicalUrl,
          renderedSearch,
          scrollableSegments,
          shouldScroll,
          hash,
        );
      }
      
      
      return {
        tag: _types.NavigationResultTag.NoOp,
        data: {
          canonicalUrl,
          shouldScroll,
        },
      };
    }
    function navigationTaskToResult(
      task,
      currentCacheNode,
      canonicalUrl,
      renderedSearch,
      scrollableSegments,
      shouldScroll,
      hash,
    ) {
      const flightRouterState = task.route;
      if (flightRouterState === null) {
        
        
        return {
          tag: _types.NavigationResultTag.MPA,
          data: canonicalUrl,
        };
      }
      const newCacheNode = task.node;
      return {
        tag: _types.NavigationResultTag.Success,
        data: {
          flightRouterState,
          cacheNode: newCacheNode !== null ? newCacheNode : currentCacheNode,
          canonicalUrl,
          renderedSearch,
          scrollableSegments,
          shouldScroll,
          hash,
        },
      };
    }
    function readRenderSnapshotFromCache(now, route, tree) {
      let childRouterStates = {};
      let childSeedDatas = {};
      const slots = tree.slots;
      if (slots !== null) {
        for (const parallelRouteKey in slots) {
          const childTree = slots[parallelRouteKey];
          const childResult = readRenderSnapshotFromCache(
            now,
            route,
            childTree,
          );
          childRouterStates[parallelRouteKey] = childResult.flightRouterState;
          childSeedDatas[parallelRouteKey] = childResult.seedData;
        }
      }
      let rsc = null;
      let loading = null;
      let isPartial = true;
      const segmentEntry = (0, _cache.readSegmentCacheEntry)(
        now,
        tree.varyPath,
      );
      if (segmentEntry !== null) {
        switch (segmentEntry.status) {
          case _cache.EntryStatus.Fulfilled: {
            
            rsc = segmentEntry.rsc;
            loading = segmentEntry.loading;
            isPartial = segmentEntry.isPartial;
            break;
          }
          case _cache.EntryStatus.Pending: {
            
            
            
            const promiseForFulfilledEntry = (0,
            _cache.waitForSegmentCacheEntry)(segmentEntry);
            rsc = promiseForFulfilledEntry.then((entry) =>
              entry !== null ? entry.rsc : null,
            );
            loading = promiseForFulfilledEntry.then((entry) =>
              entry !== null ? entry.loading : null,
            );
            
            
            
            isPartial = true;
            break;
          }
          case _cache.EntryStatus.Empty:
          case _cache.EntryStatus.Rejected:
            break;
          default:
            segmentEntry;
        }
      }
      
      
      
      
      
      
      
      
      
      
      const segment = (0, _segment.addSearchParamsIfPageSegment)(
        tree.segment,
        Object.fromEntries(new URLSearchParams(route.renderedSearch)),
      );
      
      const hasRuntimePrefetch = false;
      return {
        flightRouterState: [
          segment,
          childRouterStates,
          null,
          null,
          tree.isRootLayout,
        ],
        seedData: [rsc, childSeedDatas, loading, isPartial, hasRuntimePrefetch],
      };
    }
    function readHeadSnapshotFromCache(now, route) {
      
      let rsc = null;
      let isPartial = true;
      const segmentEntry = (0, _cache.readSegmentCacheEntry)(
        now,
        route.metadata.varyPath,
      );
      if (segmentEntry !== null) {
        switch (segmentEntry.status) {
          case _cache.EntryStatus.Fulfilled: {
            rsc = segmentEntry.rsc;
            isPartial = segmentEntry.isPartial;
            break;
          }
          case _cache.EntryStatus.Pending: {
            const promiseForFulfilledEntry = (0,
            _cache.waitForSegmentCacheEntry)(segmentEntry);
            rsc = promiseForFulfilledEntry.then((entry) =>
              entry !== null ? entry.rsc : null,
            );
            isPartial = true;
            break;
          }
          case _cache.EntryStatus.Empty:
          case _cache.EntryStatus.Rejected:
            break;
          default:
            segmentEntry;
        }
      }
      return {
        rsc,
        isPartial,
      };
    }
    async function navigateDynamicallyWithNoPrefetch(
      now,
      url,
      currentUrl,
      nextUrl,
      isSamePageNavigation,
      currentCacheNode,
      currentFlightRouterState,
      shouldScroll,
      hash,
      collectedDebugInfo,
    ) {
      
      
      
      
      
      
      
      
      
      
      
      const promiseForDynamicServerResponse = (0,
      _fetchserverresponse.fetchServerResponse)(url, {
        flightRouterState: currentFlightRouterState,
        nextUrl,
      });
      const result = await promiseForDynamicServerResponse;
      if (typeof result === "string") {
        
        const newUrl = result;
        return {
          tag: _types.NavigationResultTag.MPA,
          data: newUrl,
        };
      }
      const {
        flightData,
        canonicalUrl,
        renderedSearch,
        debugInfo: debugInfoFromResponse,
      } = result;
      if (debugInfoFromResponse !== null) {
        collectedDebugInfo.push(...debugInfoFromResponse);
      }
      
      
      
      const prefetchFlightRouterState =
        simulatePrefetchTreeUsingDynamicTreePatch(
          currentFlightRouterState,
          flightData,
        );
      
      
      const prefetchSeedData = null;
      const prefetchHead = null;
      const isPrefetchHeadPartial = true;
      
      const scrollableSegments = [];
      const task = (0, _pprnavigations.startPPRNavigation)(
        now,
        currentUrl,
        currentCacheNode,
        currentFlightRouterState,
        prefetchFlightRouterState,
        prefetchSeedData,
        prefetchHead,
        isPrefetchHeadPartial,
        isSamePageNavigation,
        scrollableSegments,
      );
      if (task !== null) {
        
        
        
        
        
        
        
        
        const hasDynamicHoles = task.dynamicRequestTree !== null;
        if (hasDynamicHoles) {
          (0, _pprnavigations.listenForDynamicRequest)(
            task,
            promiseForDynamicServerResponse,
          );
        } else {
          
          
        }
        return navigationTaskToResult(
          task,
          currentCacheNode,
          (0, _createhreffromurl.createHrefFromUrl)(canonicalUrl),
          renderedSearch,
          scrollableSegments,
          shouldScroll,
          hash,
        );
      }
      
      
      return {
        tag: _types.NavigationResultTag.NoOp,
        data: {
          canonicalUrl: (0, _createhreffromurl.createHrefFromUrl)(canonicalUrl),
          shouldScroll,
        },
      };
    }
    function simulatePrefetchTreeUsingDynamicTreePatch(
      currentTree,
      flightData,
    ) {
      
      
      
      
      
      
      
      let baseTree = currentTree;
      for (const { segmentPath, tree: treePatch } of flightData) {
        
        
        
        const canMutateInPlace = baseTree !== currentTree;
        baseTree = simulatePrefetchTreeUsingDynamicTreePatchImpl(
          baseTree,
          treePatch,
          segmentPath,
          canMutateInPlace,
          0,
        );
      }
      return baseTree;
    }
    function simulatePrefetchTreeUsingDynamicTreePatchImpl(
      baseRouterState,
      patch,
      segmentPath,
      canMutateInPlace,
      index,
    ) {
      if (index === segmentPath.length) {
        
        return patch;
      }
      
      
      
      
      
      
      
      
      
      
      
      const updatedParallelRouteKey = segmentPath[index];
      
      const baseChildren = baseRouterState[1];
      const newChildren = {};
      for (const parallelRouteKey in baseChildren) {
        if (parallelRouteKey === updatedParallelRouteKey) {
          const childBaseRouterState = baseChildren[parallelRouteKey];
          newChildren[parallelRouteKey] =
            simulatePrefetchTreeUsingDynamicTreePatchImpl(
              childBaseRouterState,
              patch,
              segmentPath,
              canMutateInPlace, 
              index + 2,
            );
        } else {
          
          newChildren[parallelRouteKey] = baseChildren[parallelRouteKey];
        }
      }
      if (canMutateInPlace) {
        
        
        baseRouterState[1] = newChildren;
        return baseRouterState;
      }
      
      
      
      
      
      const clone = [baseRouterState[0], newChildren];
      if (2 in baseRouterState) {
        clone[2] = baseRouterState[2];
      }
      if (3 in baseRouterState) {
        clone[3] = baseRouterState[3];
      }
      if (4 in baseRouterState) {
        clone[4] = baseRouterState[4];
      }
      return clone;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/navigate-reducer.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        DYNAMIC_STALETIME_MS: null,
        STATIC_STALETIME_MS: null,
        generateSegmentsFromPatch: null,
        handleExternalUrl: null,
        navigateReducer: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      DYNAMIC_STALETIME_MS: function () {
        return DYNAMIC_STALETIME_MS;
      },
      STATIC_STALETIME_MS: function () {
        return STATIC_STALETIME_MS;
      },
      generateSegmentsFromPatch: function () {
        return generateSegmentsFromPatch;
      },
      handleExternalUrl: function () {
        return handleExternalUrl;
      },
      navigateReducer: function () {
        return navigateReducer;
      },
    });
    const _createhreffromurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [app-client] (ecmascript)",
    );
    const _handlemutable = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/handle-mutable.js [app-client] (ecmascript)",
    );
    const _navigation = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/navigation.js [app-client] (ecmascript)",
    );
    const _types = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)",
    );
    const _cache = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache.js [app-client] (ecmascript)",
    );
    const DYNAMIC_STALETIME_MS =
      Number(("TURBOPACK compile-time value", "0")) * 1000;
    const STATIC_STALETIME_MS = (0, _cache.getStaleTimeMs)(
      Number(("TURBOPACK compile-time value", "300")),
    );
    function handleExternalUrl(state, mutable, url, pendingPush) {
      mutable.mpaNavigation = true;
      mutable.canonicalUrl = url;
      mutable.pendingPush = pendingPush;
      mutable.scrollableSegments = undefined;
      return (0, _handlemutable.handleMutable)(state, mutable);
    }
    function generateSegmentsFromPatch(flightRouterPatch) {
      const segments = [];
      const [segment, parallelRoutes] = flightRouterPatch;
      if (Object.keys(parallelRoutes).length === 0) {
        return [[segment]];
      }
      for (const [parallelRouteKey, parallelRoute] of Object.entries(
        parallelRoutes,
      )) {
        for (const childSegment of generateSegmentsFromPatch(parallelRoute)) {
          
          if (segment === "") {
            segments.push([parallelRouteKey, ...childSegment]);
          } else {
            segments.push([segment, parallelRouteKey, ...childSegment]);
          }
        }
      }
      return segments;
    }
    function handleNavigationResult(url, state, mutable, pendingPush, result) {
      switch (result.tag) {
        case _types.NavigationResultTag.MPA: {
          
          const newUrl = result.data;
          return handleExternalUrl(state, mutable, newUrl, pendingPush);
        }
        case _types.NavigationResultTag.NoOp: {
          
          
          const newCanonicalUrl = result.data.canonicalUrl;
          mutable.canonicalUrl = newCanonicalUrl;
          
          const oldUrl = new URL(state.canonicalUrl, url);
          const onlyHashChange = 
            url.pathname === oldUrl.pathname &&
            url.search === oldUrl.search &&
            url.hash !== oldUrl.hash;
          if (onlyHashChange) {
            
            mutable.onlyHashChange = true;
            mutable.shouldScroll = result.data.shouldScroll;
            mutable.hashFragment = url.hash;
            
            
            mutable.scrollableSegments = [];
          }
          return (0, _handlemutable.handleMutable)(state, mutable);
        }
        case _types.NavigationResultTag.Success: {
          
          mutable.cache = result.data.cacheNode;
          mutable.patchedTree = result.data.flightRouterState;
          mutable.renderedSearch = result.data.renderedSearch;
          mutable.canonicalUrl = result.data.canonicalUrl;
          mutable.scrollableSegments = result.data.scrollableSegments;
          mutable.shouldScroll = result.data.shouldScroll;
          mutable.hashFragment = result.data.hash;
          return (0, _handlemutable.handleMutable)(state, mutable);
        }
        case _types.NavigationResultTag.Async: {
          return result.data.then(
            (asyncResult) =>
              handleNavigationResult(
                url,
                state,
                mutable,
                pendingPush,
                asyncResult,
              ), 
            
            () => {
              return state;
            },
          );
        }
        default: {
          result;
          return state;
        }
      }
    }
    function navigateReducer(state, action) {
      const { url, isExternalUrl, navigateType, shouldScroll } = action;
      const mutable = {};
      const href = (0, _createhreffromurl.createHrefFromUrl)(url);
      const pendingPush = navigateType === "push";
      mutable.preserveCustomHistoryState = false;
      mutable.pendingPush = pendingPush;
      if (isExternalUrl) {
        return handleExternalUrl(state, mutable, url.toString(), pendingPush);
      }
      
      
      if (document.getElementById("__next-page-redirect")) {
        return handleExternalUrl(state, mutable, href, pendingPush);
      }
      
      
      
      const currentUrl = new URL(state.canonicalUrl, location.origin);
      const result = (0, _navigation.navigate)(
        url,
        currentUrl,
        state.cache,
        state.tree,
        state.nextUrl,
        shouldScroll,
        mutable,
      );
      return handleNavigationResult(url, state, mutable, pendingPush, result);
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fill-lazy-items-till-leaf-with-head.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "fillLazyItemsTillLeafWithHead", {
      enumerable: true,
      get: function () {
        return fillLazyItemsTillLeafWithHead;
      },
    });
    const _createroutercachekey = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-router-cache-key.js [app-client] (ecmascript)",
    );
    function fillLazyItemsTillLeafWithHead(
      navigatedAt,
      newCache,
      existingCache,
      routerState,
      cacheNodeSeedData,
      head,
    ) {
      const isLastSegment = Object.keys(routerState[1]).length === 0;
      if (isLastSegment) {
        newCache.head = head;
        return;
      }
      
      for (const key in routerState[1]) {
        const parallelRouteState = routerState[1][key];
        const segmentForParallelRoute = parallelRouteState[0];
        const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(
          segmentForParallelRoute,
        );
        
        
        
        
        
        
        
        
        
        
        const parallelSeedData =
          cacheNodeSeedData !== null && cacheNodeSeedData[1][key] !== undefined
            ? cacheNodeSeedData[1][key]
            : null;
        if (existingCache) {
          const existingParallelRoutesCacheNode =
            existingCache.parallelRoutes.get(key);
          if (existingParallelRoutesCacheNode) {
            let parallelRouteCacheNode = new Map(
              existingParallelRoutesCacheNode,
            );
            const existingCacheNode = parallelRouteCacheNode.get(cacheKey);
            let newCacheNode;
            if (parallelSeedData !== null) {
              
              const seedNode = parallelSeedData[0];
              const loading = parallelSeedData[2];
              newCacheNode = {
                lazyData: null,
                rsc: seedNode,
                
                
                
                
                
                prefetchRsc: null,
                head: null,
                prefetchHead: null,
                loading,
                parallelRoutes: new Map(existingCacheNode?.parallelRoutes),
                navigatedAt,
              };
            } else {
              
              
              newCacheNode = {
                lazyData: null,
                rsc: null,
                prefetchRsc: null,
                head: null,
                prefetchHead: null,
                parallelRoutes: new Map(existingCacheNode?.parallelRoutes),
                loading: null,
                navigatedAt,
              };
            }
            
            parallelRouteCacheNode.set(cacheKey, newCacheNode);
            
            fillLazyItemsTillLeafWithHead(
              navigatedAt,
              newCacheNode,
              existingCacheNode,
              parallelRouteState,
              parallelSeedData ? parallelSeedData : null,
              head,
            );
            newCache.parallelRoutes.set(key, parallelRouteCacheNode);
            continue;
          }
        }
        let newCacheNode;
        if (parallelSeedData !== null) {
          
          const seedNode = parallelSeedData[0];
          const loading = parallelSeedData[2];
          newCacheNode = {
            lazyData: null,
            rsc: seedNode,
            prefetchRsc: null,
            head: null,
            prefetchHead: null,
            parallelRoutes: new Map(),
            loading,
            navigatedAt,
          };
        } else {
          
          
          newCacheNode = {
            lazyData: null,
            rsc: null,
            prefetchRsc: null,
            head: null,
            prefetchHead: null,
            parallelRoutes: new Map(),
            loading: null,
            navigatedAt,
          };
        }
        const existingParallelRoutes = newCache.parallelRoutes.get(key);
        if (existingParallelRoutes) {
          existingParallelRoutes.set(cacheKey, newCacheNode);
        } else {
          newCache.parallelRoutes.set(key, new Map([[cacheKey, newCacheNode]]));
        }
        fillLazyItemsTillLeafWithHead(
          navigatedAt,
          newCacheNode,
          undefined,
          parallelRouteState,
          parallelSeedData,
          head,
        );
      }
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/invalidate-cache-by-router-state.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "invalidateCacheByRouterState", {
      enumerable: true,
      get: function () {
        return invalidateCacheByRouterState;
      },
    });
    const _createroutercachekey = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-router-cache-key.js [app-client] (ecmascript)",
    );
    function invalidateCacheByRouterState(
      newCache,
      existingCache,
      routerState,
    ) {
      
      for (const key in routerState[1]) {
        const segmentForParallelRoute = routerState[1][key][0];
        const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(
          segmentForParallelRoute,
        );
        const existingParallelRoutesCacheNode =
          existingCache.parallelRoutes.get(key);
        if (existingParallelRoutesCacheNode) {
          let parallelRouteCacheNode = new Map(existingParallelRoutesCacheNode);
          parallelRouteCacheNode.delete(cacheKey);
          newCache.parallelRoutes.set(key, parallelRouteCacheNode);
        }
      }
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fill-cache-with-new-subtree-data.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        fillCacheWithNewSubTreeData: null,
        fillCacheWithNewSubTreeDataButOnlyLoading: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      fillCacheWithNewSubTreeData: function () {
        return fillCacheWithNewSubTreeData;
      },
      fillCacheWithNewSubTreeDataButOnlyLoading: function () {
        return fillCacheWithNewSubTreeDataButOnlyLoading;
      },
    });
    const _invalidatecachebyrouterstate = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/invalidate-cache-by-router-state.js [app-client] (ecmascript)",
    );
    const _filllazyitemstillleafwithhead = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fill-lazy-items-till-leaf-with-head.js [app-client] (ecmascript)",
    );
    const _createroutercachekey = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-router-cache-key.js [app-client] (ecmascript)",
    );
    const _segment = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)",
    );
    

 function fillCacheHelper(
      navigatedAt,
      newCache,
      existingCache,
      flightData,
      fillLazyItems,
    ) {
      const {
        segmentPath,
        seedData: cacheNodeSeedData,
        tree: treePatch,
        head,
      } = flightData;
      let newCacheNode = newCache;
      let existingCacheNode = existingCache;
      for (let i = 0; i < segmentPath.length; i += 2) {
        const parallelRouteKey = segmentPath[i];
        const segment = segmentPath[i + 1];
        
        
        const isLastEntry = i === segmentPath.length - 2;
        const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(
          segment,
        );
        const existingChildSegmentMap =
          existingCacheNode.parallelRoutes.get(parallelRouteKey);
        if (!existingChildSegmentMap) {
          continue;
        }
        let childSegmentMap = newCacheNode.parallelRoutes.get(parallelRouteKey);
        if (!childSegmentMap || childSegmentMap === existingChildSegmentMap) {
          childSegmentMap = new Map(existingChildSegmentMap);
          newCacheNode.parallelRoutes.set(parallelRouteKey, childSegmentMap);
        }
        const existingChildCacheNode = existingChildSegmentMap.get(cacheKey);
        let childCacheNode = childSegmentMap.get(cacheKey);
        if (isLastEntry) {
          if (
            cacheNodeSeedData &&
            (!childCacheNode ||
              !childCacheNode.lazyData ||
              childCacheNode === existingChildCacheNode)
          ) {
            const rsc = cacheNodeSeedData[0];
            const loading = cacheNodeSeedData[2];
            childCacheNode = {
              lazyData: null,
              
              
              rsc:
                fillLazyItems || segment !== _segment.PAGE_SEGMENT_KEY
                  ? rsc
                  : null,
              prefetchRsc: null,
              head: null,
              prefetchHead: null,
              loading,
              parallelRoutes:
                fillLazyItems && existingChildCacheNode
                  ? new Map(existingChildCacheNode.parallelRoutes)
                  : new Map(),
              navigatedAt,
            };
            if (existingChildCacheNode && fillLazyItems) {
              (0, _invalidatecachebyrouterstate.invalidateCacheByRouterState)(
                childCacheNode,
                existingChildCacheNode,
                treePatch,
              );
            }
            if (fillLazyItems) {
              (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(
                navigatedAt,
                childCacheNode,
                existingChildCacheNode,
                treePatch,
                cacheNodeSeedData,
                head,
              );
            }
            childSegmentMap.set(cacheKey, childCacheNode);
          }
          continue;
        }
        if (!childCacheNode || !existingChildCacheNode) {
          continue;
        }
        if (childCacheNode === existingChildCacheNode) {
          childCacheNode = {
            lazyData: childCacheNode.lazyData,
            rsc: childCacheNode.rsc,
            prefetchRsc: childCacheNode.prefetchRsc,
            head: childCacheNode.head,
            prefetchHead: childCacheNode.prefetchHead,
            parallelRoutes: new Map(childCacheNode.parallelRoutes),
            loading: childCacheNode.loading,
          };
          childSegmentMap.set(cacheKey, childCacheNode);
        }
        
        newCacheNode = childCacheNode;
        existingCacheNode = existingChildCacheNode;
      }
    }
    function fillCacheWithNewSubTreeData(
      navigatedAt,
      newCache,
      existingCache,
      flightData,
    ) {
      fillCacheHelper(navigatedAt, newCache, existingCache, flightData, true);
    }
    function fillCacheWithNewSubTreeDataButOnlyLoading(
      navigatedAt,
      newCache,
      existingCache,
      flightData,
    ) {
      fillCacheHelper(navigatedAt, newCache, existingCache, flightData, false);
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/apply-flight-data.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "applyFlightData", {
      enumerable: true,
      get: function () {
        return applyFlightData;
      },
    });
    const _filllazyitemstillleafwithhead = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fill-lazy-items-till-leaf-with-head.js [app-client] (ecmascript)",
    );
    const _fillcachewithnewsubtreedata = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fill-cache-with-new-subtree-data.js [app-client] (ecmascript)",
    );
    function applyFlightData(navigatedAt, existingCache, cache, flightData) {
      
      const { tree: treePatch, seedData, head, isRootRender } = flightData;
      
      if (seedData === null) {
        return false;
      }
      if (isRootRender) {
        const rsc = seedData[0];
        const loading = seedData[2];
        cache.loading = loading;
        cache.rsc = rsc;
        
        
        
        
        
        cache.prefetchRsc = null;
        (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(
          navigatedAt,
          cache,
          existingCache,
          treePatch,
          seedData,
          head,
        );
      } else {
        
        cache.rsc = existingCache.rsc;
        
        
        
        cache.prefetchRsc = existingCache.prefetchRsc;
        cache.parallelRoutes = new Map(existingCache.parallelRoutes);
        cache.loading = existingCache.loading;
        
        (0, _fillcachewithnewsubtreedata.fillCacheWithNewSubTreeData)(
          navigatedAt,
          cache,
          existingCache,
          flightData,
        );
      }
      return true;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/refetch-inactive-parallel-segments.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        addRefreshMarkerToActiveParallelSegments: null,
        refreshInactiveParallelSegments: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      addRefreshMarkerToActiveParallelSegments: function () {
        return addRefreshMarkerToActiveParallelSegments;
      },
      refreshInactiveParallelSegments: function () {
        return refreshInactiveParallelSegments;
      },
    });
    const _applyflightdata = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/apply-flight-data.js [app-client] (ecmascript)",
    );
    const _fetchserverresponse = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fetch-server-response.js [app-client] (ecmascript)",
    );
    const _segment = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)",
    );
    async function refreshInactiveParallelSegments(options) {
      const fetchedSegments = new Set();
      await refreshInactiveParallelSegmentsImpl({
        ...options,
        rootTree: options.updatedTree,
        fetchedSegments,
      });
    }
    async function refreshInactiveParallelSegmentsImpl({
      navigatedAt,
      state,
      updatedTree,
      updatedCache,
      includeNextUrl,
      fetchedSegments,
      rootTree = updatedTree,
      canonicalUrl,
    }) {
      const [, parallelRoutes, refetchPath, refetchMarker] = updatedTree;
      const fetchPromises = [];
      if (
        refetchPath &&
        refetchPath !== canonicalUrl &&
        refetchMarker === "refresh" && 
        
        !fetchedSegments.has(refetchPath)
      ) {
        fetchedSegments.add(refetchPath); 
        
        
        const fetchPromise = (0, _fetchserverresponse.fetchServerResponse)(
          new URL(refetchPath, location.origin),
          {
            
            
            flightRouterState: [
              rootTree[0],
              rootTree[1],
              rootTree[2],
              "refetch",
            ],
            nextUrl: includeNextUrl ? state.nextUrl : null,
          },
        ).then((result) => {
          if (typeof result !== "string") {
            const { flightData } = result;
            for (const flightDataPath of flightData) {
              
              
              
              (0, _applyflightdata.applyFlightData)(
                navigatedAt,
                updatedCache,
                updatedCache,
                flightDataPath,
              );
            }
          } else {
            
            
            
          }
        });
        fetchPromises.push(fetchPromise);
      }
      for (const key in parallelRoutes) {
        const parallelFetchPromise = refreshInactiveParallelSegmentsImpl({
          navigatedAt,
          state,
          updatedTree: parallelRoutes[key],
          updatedCache,
          includeNextUrl,
          fetchedSegments,
          rootTree,
          canonicalUrl,
        });
        fetchPromises.push(parallelFetchPromise);
      }
      await Promise.all(fetchPromises);
    }
    function addRefreshMarkerToActiveParallelSegments(tree, path) {
      const [segment, parallelRoutes, , refetchMarker] = tree;
      
      if (
        segment.includes(_segment.PAGE_SEGMENT_KEY) &&
        refetchMarker !== "refresh"
      ) {
        tree[2] = path;
        tree[3] = "refresh";
      }
      for (const key in parallelRoutes) {
        addRefreshMarkerToActiveParallelSegments(parallelRoutes[key], path);
      }
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/apply-router-state-patch-to-tree.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "applyRouterStatePatchToTree", {
      enumerable: true,
      get: function () {
        return applyRouterStatePatchToTree;
      },
    });
    const _segment = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)",
    );
    const _flightdatahelpers = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/flight-data-helpers.js [app-client] (ecmascript)",
    );
    const _matchsegments = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/match-segments.js [app-client] (ecmascript)",
    );
    const _refetchinactiveparallelsegments = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/refetch-inactive-parallel-segments.js [app-client] (ecmascript)",
    );
    

 function applyPatch(initialTree, patchTree) {
      const [initialSegment, initialParallelRoutes] = initialTree;
      const [patchSegment, patchParallelRoutes] = patchTree;
      
      
      if (
        patchSegment === _segment.DEFAULT_SEGMENT_KEY &&
        initialSegment !== _segment.DEFAULT_SEGMENT_KEY
      ) {
        return initialTree;
      }
      if ((0, _matchsegments.matchSegment)(initialSegment, patchSegment)) {
        const newParallelRoutes = {};
        for (const key in initialParallelRoutes) {
          const isInPatchTreeParallelRoutes =
            typeof patchParallelRoutes[key] !== "undefined";
          if (isInPatchTreeParallelRoutes) {
            newParallelRoutes[key] = applyPatch(
              initialParallelRoutes[key],
              patchParallelRoutes[key],
            );
          } else {
            newParallelRoutes[key] = initialParallelRoutes[key];
          }
        }
        for (const key in patchParallelRoutes) {
          if (newParallelRoutes[key]) {
            continue;
          }
          newParallelRoutes[key] = patchParallelRoutes[key];
        }
        const tree = [initialSegment, newParallelRoutes];
        
        if (initialTree[2]) {
          tree[2] = initialTree[2];
        }
        if (initialTree[3]) {
          tree[3] = initialTree[3];
        }
        if (initialTree[4]) {
          tree[4] = initialTree[4];
        }
        return tree;
      }
      return patchTree;
    }
    function applyRouterStatePatchToTree(
      flightSegmentPath,
      flightRouterState,
      treePatch,
      path,
    ) {
      const [segment, parallelRoutes, url, refetch, isRootLayout] =
        flightRouterState;
      
      if (flightSegmentPath.length === 1) {
        const tree = applyPatch(flightRouterState, treePatch);
        (0,
        _refetchinactiveparallelsegments.addRefreshMarkerToActiveParallelSegments)(
          tree,
          path,
        );
        return tree;
      }
      const [currentSegment, parallelRouteKey] = flightSegmentPath;
      
      if (!(0, _matchsegments.matchSegment)(currentSegment, segment)) {
        return null;
      }
      const lastSegment = flightSegmentPath.length === 2;
      let parallelRoutePatch;
      if (lastSegment) {
        parallelRoutePatch = applyPatch(
          parallelRoutes[parallelRouteKey],
          treePatch,
        );
      } else {
        parallelRoutePatch = applyRouterStatePatchToTree(
          (0, _flightdatahelpers.getNextFlightSegmentPath)(flightSegmentPath),
          parallelRoutes[parallelRouteKey],
          treePatch,
          path,
        );
        if (parallelRoutePatch === null) {
          return null;
        }
      }
      const tree = [
        flightSegmentPath[0],
        {
          ...parallelRoutes,
          [parallelRouteKey]: parallelRoutePatch,
        },
        url,
        refetch,
      ];
      
      if (isRootLayout) {
        tree[4] = true;
      }
      (0,
      _refetchinactiveparallelsegments.addRefreshMarkerToActiveParallelSegments)(
        tree,
        path,
      );
      return tree;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-announcer.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "AppRouterAnnouncer", {
      enumerable: true,
      get: function () {
        return AppRouterAnnouncer;
      },
    });
    const _react = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
    );
    const _reactdom = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)",
    );
    const ANNOUNCER_TYPE = "next-route-announcer";
    const ANNOUNCER_ID = "__next-route-announcer__";
    function getAnnouncerNode() {
      const existingAnnouncer = document.getElementsByName(ANNOUNCER_TYPE)[0];
      if (existingAnnouncer?.shadowRoot?.childNodes[0]) {
        return existingAnnouncer.shadowRoot.childNodes[0];
      } else {
        const container = document.createElement(ANNOUNCER_TYPE);
        container.style.cssText = "position:absolute";
        const announcer = document.createElement("div");
        announcer.ariaLive = "assertive";
        announcer.id = ANNOUNCER_ID;
        announcer.role = "alert";
        announcer.style.cssText =
          "position:absolute;border:0;height:1px;margin:-1px;padding:0;width:1px;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap;word-wrap:normal";
        
        const shadow = container.attachShadow({
          mode: "open",
        });
        shadow.appendChild(announcer);
        document.body.appendChild(container);
        return announcer;
      }
    }
    function AppRouterAnnouncer({ tree }) {
      const [portalNode, setPortalNode] = (0, _react.useState)(null);
      (0, _react.useEffect)(() => {
        const announcer = getAnnouncerNode();
        setPortalNode(announcer);
        return () => {
          const container = document.getElementsByTagName(ANNOUNCER_TYPE)[0];
          if (container?.isConnected) {
            document.body.removeChild(container);
          }
        };
      }, []);
      const [routeAnnouncement, setRouteAnnouncement] = (0, _react.useState)(
        "",
      );
      const previousTitle = (0, _react.useRef)(undefined);
      (0, _react.useEffect)(() => {
        let currentTitle = "";
        if (document.title) {
          currentTitle = document.title;
        } else {
          const pageHeader = document.querySelector("h1");
          if (pageHeader) {
            currentTitle = pageHeader.innerText || pageHeader.textContent || "";
          }
        }
        
        
        if (
          previousTitle.current !== undefined &&
          previousTitle.current !== currentTitle
        ) {
          setRouteAnnouncement(currentTitle);
        }
        previousTitle.current = currentTitle;
      }, [tree]);
      return portalNode
        ?  (0, _reactdom.createPortal)(
            routeAnnouncement,
            portalNode,
          )
        : null;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/readonly-url-search-params.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    



  Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "ReadonlyURLSearchParams", {
      enumerable: true,
      get: function () {
        return ReadonlyURLSearchParams;
      },
    });
    class ReadonlyURLSearchParamsError extends Error {
      constructor() {
        super(
          "Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams",
        );
      }
    }
    class ReadonlyURLSearchParams extends URLSearchParams {
       append() {
        throw new ReadonlyURLSearchParamsError();
      }
       delete() {
        throw new ReadonlyURLSearchParamsError();
      }
       set() {
        throw new ReadonlyURLSearchParamsError();
      }
       sort() {
        throw new ReadonlyURLSearchParamsError();
      }
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/unrecognized-action-error.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        UnrecognizedActionError: null,
        unstable_isUnrecognizedActionError: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      UnrecognizedActionError: function () {
        return UnrecognizedActionError;
      },
      unstable_isUnrecognizedActionError: function () {
        return unstable_isUnrecognizedActionError;
      },
    });
    class UnrecognizedActionError extends Error {
      constructor(...args) {
        super(...args);
        this.name = "UnrecognizedActionError";
      }
    }
    function unstable_isUnrecognizedActionError(error) {
      return !!(
        error &&
        typeof error === "object" &&
        error instanceof UnrecognizedActionError
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        getRedirectError: null,
        getRedirectStatusCodeFromError: null,
        getRedirectTypeFromError: null,
        getURLFromRedirectError: null,
        permanentRedirect: null,
        redirect: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      getRedirectError: function () {
        return getRedirectError;
      },
      getRedirectStatusCodeFromError: function () {
        return getRedirectStatusCodeFromError;
      },
      getRedirectTypeFromError: function () {
        return getRedirectTypeFromError;
      },
      getURLFromRedirectError: function () {
        return getURLFromRedirectError;
      },
      permanentRedirect: function () {
        return permanentRedirect;
      },
      redirect: function () {
        return redirect;
      },
    });
    const _redirectstatuscode = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect-status-code.js [app-client] (ecmascript)",
    );
    const _redirecterror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect-error.js [app-client] (ecmascript)",
    );
    const actionAsyncStorage =
      typeof window === "undefined"
        ? __turbopack_context__.r(
            "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/action-async-storage.external.js [app-client] (ecmascript)",
          ).actionAsyncStorage
        : undefined;
    function getRedirectError(
      url,
      type,
      statusCode = _redirectstatuscode.RedirectStatusCode.TemporaryRedirect,
    ) {
      const error = Object.defineProperty(
        new Error(_redirecterror.REDIRECT_ERROR_CODE),
        "__NEXT_ERROR_CODE",
        {
          value: "E394",
          enumerable: false,
          configurable: true,
        },
      );
      error.digest = `${_redirecterror.REDIRECT_ERROR_CODE};${type};${url};${statusCode};`;
      return error;
    }
    function redirect( url, type) {
      type ??= actionAsyncStorage?.getStore()?.isAction
        ? _redirecterror.RedirectType.push
        : _redirecterror.RedirectType.replace;
      throw getRedirectError(
        url,
        type,
        _redirectstatuscode.RedirectStatusCode.TemporaryRedirect,
      );
    }
    function permanentRedirect(
       url,
      type = _redirecterror.RedirectType.replace,
    ) {
      throw getRedirectError(
        url,
        type,
        _redirectstatuscode.RedirectStatusCode.PermanentRedirect,
      );
    }
    function getURLFromRedirectError(error) {
      if (!(0, _redirecterror.isRedirectError)(error)) return null;
      
      
      return error.digest.split(";").slice(2, -2).join(";");
    }
    function getRedirectTypeFromError(error) {
      if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(
          new Error("Not a redirect error"),
          "__NEXT_ERROR_CODE",
          {
            value: "E260",
            enumerable: false,
            configurable: true,
          },
        );
      }
      return error.digest.split(";", 2)[1];
    }
    function getRedirectStatusCodeFromError(error) {
      if (!(0, _redirecterror.isRedirectError)(error)) {
        throw Object.defineProperty(
          new Error("Not a redirect error"),
          "__NEXT_ERROR_CODE",
          {
            value: "E260",
            enumerable: false,
            configurable: true,
          },
        );
      }
      return Number(error.digest.split(";").at(-2));
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/forbidden.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "forbidden", {
      enumerable: true,
      get: function () {
        return forbidden;
      },
    });
    const _httpaccessfallback = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-client] (ecmascript)",
    );
    
    










 const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};403`;
    function forbidden() {
      if (("TURBOPACK compile-time truthy", 1)) {
        throw Object.defineProperty(
          new Error(
            `\`forbidden()\` is experimental and only allowed to be enabled when \`experimental.authInterrupts\` is enabled.`,
          ),
          "__NEXT_ERROR_CODE",
          {
            value: "E488",
            enumerable: false,
            configurable: true,
          },
        );
      }
      const error = Object.defineProperty(
        new Error(DIGEST),
        "__NEXT_ERROR_CODE",
        {
          value: "E394",
          enumerable: false,
          configurable: true,
        },
      );
      error.digest = DIGEST;
      throw error;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/unauthorized.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "unauthorized", {
      enumerable: true,
      get: function () {
        return unauthorized;
      },
    });
    const _httpaccessfallback = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-client] (ecmascript)",
    );
    
    











 const DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};401`;
    function unauthorized() {
      if (("TURBOPACK compile-time truthy", 1)) {
        throw Object.defineProperty(
          new Error(
            `\`unauthorized()\` is experimental and only allowed to be used when \`experimental.authInterrupts\` is enabled.`,
          ),
          "__NEXT_ERROR_CODE",
          {
            value: "E411",
            enumerable: false,
            configurable: true,
          },
        );
      }
      const error = Object.defineProperty(
        new Error(DIGEST),
        "__NEXT_ERROR_CODE",
        {
          value: "E394",
          enumerable: false,
          configurable: true,
        },
      );
      error.digest = DIGEST;
      throw error;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/unstable-rethrow.browser.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "unstable_rethrow", {
      enumerable: true,
      get: function () {
        return unstable_rethrow;
      },
    });
    const _bailouttocsr = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-client] (ecmascript)",
    );
    const _isnextroutererror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/is-next-router-error.js [app-client] (ecmascript)",
    );
    function unstable_rethrow(error) {
      if (
        (0, _isnextroutererror.isNextRouterError)(error) ||
        (0, _bailouttocsr.isBailoutToCSRError)(error)
      ) {
        throw error;
      }
      if (error instanceof Error && "cause" in error) {
        unstable_rethrow(error.cause);
      }
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/hooks-server-context.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        DynamicServerError: null,
        isDynamicServerError: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      DynamicServerError: function () {
        return DynamicServerError;
      },
      isDynamicServerError: function () {
        return isDynamicServerError;
      },
    });
    const DYNAMIC_ERROR_CODE = "DYNAMIC_SERVER_USAGE";
    class DynamicServerError extends Error {
      constructor(description) {
        (super(`Dynamic server usage: ${description}`),
          (this.description = description),
          (this.digest = DYNAMIC_ERROR_CODE));
      }
    }
    function isDynamicServerError(err) {
      if (
        typeof err !== "object" ||
        err === null ||
        !("digest" in err) ||
        typeof err.digest !== "string"
      ) {
        return false;
      }
      return err.digest === DYNAMIC_ERROR_CODE;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/static-generation-bailout.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        StaticGenBailoutError: null,
        isStaticGenBailoutError: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      StaticGenBailoutError: function () {
        return StaticGenBailoutError;
      },
      isStaticGenBailoutError: function () {
        return isStaticGenBailoutError;
      },
    });
    const NEXT_STATIC_GEN_BAILOUT = "NEXT_STATIC_GEN_BAILOUT";
    class StaticGenBailoutError extends Error {
      constructor(...args) {
        (super(...args), (this.code = NEXT_STATIC_GEN_BAILOUT));
      }
    }
    function isStaticGenBailoutError(error) {
      if (typeof error !== "object" || error === null || !("code" in error)) {
        return false;
      }
      return error.code === NEXT_STATIC_GEN_BAILOUT;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/unstable-rethrow.server.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "unstable_rethrow", {
      enumerable: true,
      get: function () {
        return unstable_rethrow;
      },
    });
    const _dynamicrenderingutils = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/dynamic-rendering-utils.js [app-client] (ecmascript)",
    );
    const _ispostpone = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/lib/router-utils/is-postpone.js [app-client] (ecmascript)",
    );
    const _bailouttocsr = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [app-client] (ecmascript)",
    );
    const _isnextroutererror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/is-next-router-error.js [app-client] (ecmascript)",
    );
    const _dynamicrendering = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-client] (ecmascript)",
    );
    const _hooksservercontext = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/hooks-server-context.js [app-client] (ecmascript)",
    );
    function unstable_rethrow(error) {
      if (
        (0, _isnextroutererror.isNextRouterError)(error) ||
        (0, _bailouttocsr.isBailoutToCSRError)(error) ||
        (0, _hooksservercontext.isDynamicServerError)(error) ||
        (0, _dynamicrendering.isDynamicPostpone)(error) ||
        (0, _ispostpone.isPostpone)(error) ||
        (0, _dynamicrenderingutils.isHangingPromiseRejectionError)(error) ||
        (0, _dynamicrendering.isPrerenderInterruptedError)(error)
      ) {
        throw error;
      }
      if (error instanceof Error && "cause" in error) {
        unstable_rethrow(error.cause);
      }
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/unstable-rethrow.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    





 Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "unstable_rethrow", {
      enumerable: true,
      get: function () {
        return unstable_rethrow;
      },
    });
    const unstable_rethrow =
      typeof window === "undefined"
        ? __turbopack_context__.r(
            "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/unstable-rethrow.server.js [app-client] (ecmascript)",
          ).unstable_rethrow
        : __turbopack_context__.r(
            "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/unstable-rethrow.browser.js [app-client] (ecmascript)",
          ).unstable_rethrow;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/navigation.react-server.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        ReadonlyURLSearchParams: null,
        RedirectType: null,
        forbidden: null,
        notFound: null,
        permanentRedirect: null,
        redirect: null,
        unauthorized: null,
        unstable_isUnrecognizedActionError: null,
        unstable_rethrow: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      ReadonlyURLSearchParams: function () {
        return _readonlyurlsearchparams.ReadonlyURLSearchParams;
      },
      RedirectType: function () {
        return _redirecterror.RedirectType;
      },
      forbidden: function () {
        return _forbidden.forbidden;
      },
      notFound: function () {
        return _notfound.notFound;
      },
      permanentRedirect: function () {
        return _redirect.permanentRedirect;
      },
      redirect: function () {
        return _redirect.redirect;
      },
      unauthorized: function () {
        return _unauthorized.unauthorized;
      },
      unstable_isUnrecognizedActionError: function () {
        return unstable_isUnrecognizedActionError;
      },
      unstable_rethrow: function () {
        return _unstablerethrow.unstable_rethrow;
      },
    });
    const _readonlyurlsearchparams = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/readonly-url-search-params.js [app-client] (ecmascript)",
    );
    const _redirect = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect.js [app-client] (ecmascript)",
    );
    const _redirecterror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect-error.js [app-client] (ecmascript)",
    );
    const _notfound = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/not-found.js [app-client] (ecmascript)",
    );
    const _forbidden = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/forbidden.js [app-client] (ecmascript)",
    );
    const _unauthorized = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/unauthorized.js [app-client] (ecmascript)",
    );
    const _unstablerethrow = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/unstable-rethrow.js [app-client] (ecmascript)",
    );
    function unstable_isUnrecognizedActionError() {
      throw Object.defineProperty(
        new Error(
          "`unstable_isUnrecognizedActionError` can only be used on the client.",
        ),
        "__NEXT_ERROR_CODE",
        {
          value: "E776",
          enumerable: false,
          configurable: true,
        },
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        ReadonlyURLSearchParams: null,
        RedirectType: null,
        ServerInsertedHTMLContext: null,
        forbidden: null,
        notFound: null,
        permanentRedirect: null,
        redirect: null,
        unauthorized: null,
        unstable_isUnrecognizedActionError: null,
        unstable_rethrow: null,
        useParams: null,
        usePathname: null,
        useRouter: null,
        useSearchParams: null,
        useSelectedLayoutSegment: null,
        useSelectedLayoutSegments: null,
        useServerInsertedHTML: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      ReadonlyURLSearchParams: function () {
        return _navigationreactserver.ReadonlyURLSearchParams;
      },
      RedirectType: function () {
        return _navigationreactserver.RedirectType;
      },
      ServerInsertedHTMLContext: function () {
        return _serverinsertedhtmlsharedruntime.ServerInsertedHTMLContext;
      },
      forbidden: function () {
        return _navigationreactserver.forbidden;
      },
      notFound: function () {
        return _navigationreactserver.notFound;
      },
      permanentRedirect: function () {
        return _navigationreactserver.permanentRedirect;
      },
      redirect: function () {
        return _navigationreactserver.redirect;
      },
      unauthorized: function () {
        return _navigationreactserver.unauthorized;
      },
      unstable_isUnrecognizedActionError: function () {
        return _unrecognizedactionerror.unstable_isUnrecognizedActionError;
      },
      unstable_rethrow: function () {
        return _navigationreactserver.unstable_rethrow;
      },
      useParams: function () {
        return useParams;
      },
      usePathname: function () {
        return usePathname;
      },
      useRouter: function () {
        return useRouter;
      },
      useSearchParams: function () {
        return useSearchParams;
      },
      useSelectedLayoutSegment: function () {
        return useSelectedLayoutSegment;
      },
      useSelectedLayoutSegments: function () {
        return useSelectedLayoutSegments;
      },
      useServerInsertedHTML: function () {
        return _serverinsertedhtmlsharedruntime.useServerInsertedHTML;
      },
    });
    const _interop_require_wildcard = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)",
    );
    const _react =  _interop_require_wildcard._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      ),
    );
    const _approutercontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)",
    );
    const _hooksclientcontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [app-client] (ecmascript)",
    );
    const _segment = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)",
    );
    const _readonlyurlsearchparams = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/readonly-url-search-params.js [app-client] (ecmascript)",
    );
    const _serverinsertedhtmlsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js [app-client] (ecmascript)",
    );
    const _unrecognizedactionerror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/unrecognized-action-error.js [app-client] (ecmascript)",
    );
    const _navigationreactserver = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/navigation.react-server.js [app-client] (ecmascript)",
    );
    const useDynamicRouteParams =
      typeof window === "undefined"
        ? __turbopack_context__.r(
            "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-client] (ecmascript)",
          ).useDynamicRouteParams
        : undefined;
    const useDynamicSearchParams =
      typeof window === "undefined"
        ? __turbopack_context__.r(
            "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-client] (ecmascript)",
          ).useDynamicSearchParams
        : undefined;
    function useSearchParams() {
      useDynamicSearchParams?.("useSearchParams()");
      const searchParams = (0, _react.useContext)(
        _hooksclientcontextsharedruntime.SearchParamsContext,
      );
      
      
      
      const readonlySearchParams = (0, _react.useMemo)(() => {
        if (!searchParams) {
          
          
          return null;
        }
        return new _readonlyurlsearchparams.ReadonlyURLSearchParams(
          searchParams,
        );
      }, [searchParams]);
      
      if (
        ("TURBOPACK compile-time value", "development") !== "production" &&
        "use" in _react.default
      ) {
        const navigationPromises = (0, _react.use)(
          _hooksclientcontextsharedruntime.NavigationPromisesContext,
        );
        if (navigationPromises) {
          return (0, _react.use)(navigationPromises.searchParams);
        }
      }
      return readonlySearchParams;
    }
    function usePathname() {
      useDynamicRouteParams?.("usePathname()");
      
      
      const pathname = (0, _react.useContext)(
        _hooksclientcontextsharedruntime.PathnameContext,
      );
      
      if (
        ("TURBOPACK compile-time value", "development") !== "production" &&
        "use" in _react.default
      ) {
        const navigationPromises = (0, _react.use)(
          _hooksclientcontextsharedruntime.NavigationPromisesContext,
        );
        if (navigationPromises) {
          return (0, _react.use)(navigationPromises.pathname);
        }
      }
      return pathname;
    }
    function useRouter() {
      const router = (0, _react.useContext)(
        _approutercontextsharedruntime.AppRouterContext,
      );
      if (router === null) {
        throw Object.defineProperty(
          new Error("invariant expected app router to be mounted"),
          "__NEXT_ERROR_CODE",
          {
            value: "E238",
            enumerable: false,
            configurable: true,
          },
        );
      }
      return router;
    }
    function useParams() {
      useDynamicRouteParams?.("useParams()");
      const params = (0, _react.useContext)(
        _hooksclientcontextsharedruntime.PathParamsContext,
      );
      
      if (
        ("TURBOPACK compile-time value", "development") !== "production" &&
        "use" in _react.default
      ) {
        const navigationPromises = (0, _react.use)(
          _hooksclientcontextsharedruntime.NavigationPromisesContext,
        );
        if (navigationPromises) {
          return (0, _react.use)(navigationPromises.params);
        }
      }
      return params;
    }
    function useSelectedLayoutSegments(parallelRouteKey = "children") {
      useDynamicRouteParams?.("useSelectedLayoutSegments()");
      const context = (0, _react.useContext)(
        _approutercontextsharedruntime.LayoutRouterContext,
      );
      
      if (!context) return null;
      
      if (
        ("TURBOPACK compile-time value", "development") !== "production" &&
        "use" in _react.default
      ) {
        const navigationPromises = (0, _react.use)(
          _hooksclientcontextsharedruntime.NavigationPromisesContext,
        );
        if (navigationPromises) {
          const promise =
            navigationPromises.selectedLayoutSegmentsPromises?.get(
              parallelRouteKey,
            );
          if (promise) {
            
            
            return (0, _react.use)(promise);
          }
        }
      }
      return (0, _segment.getSelectedLayoutSegmentPath)(
        context.parentTree,
        parallelRouteKey,
      );
    }
    function useSelectedLayoutSegment(parallelRouteKey = "children") {
      useDynamicRouteParams?.("useSelectedLayoutSegment()");
      const navigationPromises = (0, _react.useContext)(
        _hooksclientcontextsharedruntime.NavigationPromisesContext,
      );
      const selectedLayoutSegments =
        useSelectedLayoutSegments(parallelRouteKey);
      
      if (
        ("TURBOPACK compile-time value", "development") !== "production" &&
        navigationPromises &&
        "use" in _react.default
      ) {
        const promise =
          navigationPromises.selectedLayoutSegmentPromises?.get(
            parallelRouteKey,
          );
        if (promise) {
          
          
          return (0, _react.use)(promise);
        }
      }
      return (0, _segment.computeSelectedLayoutSegment)(
        selectedLayoutSegments,
        parallelRouteKey,
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect-boundary.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        RedirectBoundary: null,
        RedirectErrorBoundary: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      RedirectBoundary: function () {
        return RedirectBoundary;
      },
      RedirectErrorBoundary: function () {
        return RedirectErrorBoundary;
      },
    });
    const _interop_require_wildcard = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)",
    );
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    const _react =  _interop_require_wildcard._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      ),
    );
    const _navigation = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)",
    );
    const _redirect = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect.js [app-client] (ecmascript)",
    );
    const _redirecterror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect-error.js [app-client] (ecmascript)",
    );
    function HandleRedirect({ redirect, reset, redirectType }) {
      const router = (0, _navigation.useRouter)();
      (0, _react.useEffect)(() => {
        _react.default.startTransition(() => {
          if (redirectType === _redirecterror.RedirectType.push) {
            router.push(redirect, {});
          } else {
            router.replace(redirect, {});
          }
          reset();
        });
      }, [redirect, redirectType, reset, router]);
      return null;
    }
    class RedirectErrorBoundary extends _react.default.Component {
      constructor(props) {
        super(props);
        this.state = {
          redirect: null,
          redirectType: null,
        };
      }
      static getDerivedStateFromError(error) {
        if ((0, _redirecterror.isRedirectError)(error)) {
          const url = (0, _redirect.getURLFromRedirectError)(error);
          const redirectType = (0, _redirect.getRedirectTypeFromError)(error);
          if ("handled" in error) {
            
            
            
            return {
              redirect: null,
              redirectType: null,
            };
          }
          return {
            redirect: url,
            redirectType,
          };
        }
        
        throw error;
      }
      
      render() {
        const { redirect, redirectType } = this.state;
        if (redirect !== null && redirectType !== null) {
          return  (0, _jsxruntime.jsx)(HandleRedirect, {
            redirect: redirect,
            redirectType: redirectType,
            reset: () =>
              this.setState({
                redirect: null,
              }),
          });
        }
        return this.props.children;
      }
    }
    function RedirectBoundary({ children }) {
      const router = (0, _navigation.useRouter)();
      return  (0, _jsxruntime.jsx)(RedirectErrorBoundary, {
        router: router,
        children: children,
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/find-head-in-cache.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "findHeadInCache", {
      enumerable: true,
      get: function () {
        return findHeadInCache;
      },
    });
    const _segment = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)",
    );
    const _createroutercachekey = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-router-cache-key.js [app-client] (ecmascript)",
    );
    function findHeadInCache(cache, parallelRoutes) {
      return findHeadInCacheImpl(cache, parallelRoutes, "", "");
    }
    function findHeadInCacheImpl(
      cache,
      parallelRoutes,
      keyPrefix,
      keyPrefixWithoutSearchParams,
    ) {
      const isLastItem = Object.keys(parallelRoutes).length === 0;
      if (isLastItem) {
        
        return [cache, keyPrefix, keyPrefixWithoutSearchParams];
      }
      
      
      const parallelRoutesKeys = Object.keys(parallelRoutes).filter(
        (key) => key !== "children",
      );
      
      if ("children" in parallelRoutes) {
        parallelRoutesKeys.unshift("children");
      }
      for (const key of parallelRoutesKeys) {
        const [segment, childParallelRoutes] = parallelRoutes[key];
        
        
        if (segment === _segment.DEFAULT_SEGMENT_KEY) {
          continue;
        }
        const childSegmentMap = cache.parallelRoutes.get(key);
        if (!childSegmentMap) {
          continue;
        }
        const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(
          segment,
        );
        const cacheKeyWithoutSearchParams = (0,
        _createroutercachekey.createRouterCacheKey)(segment, true);
        const cacheNode = childSegmentMap.get(cacheKey);
        if (!cacheNode) {
          continue;
        }
        const item = findHeadInCacheImpl(
          cacheNode,
          childParallelRoutes,
          keyPrefix + "/" + cacheKey,
          keyPrefix + "/" + cacheKeyWithoutSearchParams,
        );
        if (item) {
          return item;
        }
      }
      return null;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/unresolved-thenable.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    

 Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "unresolvedThenable", {
      enumerable: true,
      get: function () {
        return unresolvedThenable;
      },
    });
    const unresolvedThenable = {
      then: () => {},
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "hasBasePath", {
      enumerable: true,
      get: function () {
        return hasBasePath;
      },
    });
    const _pathhasprefix = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [app-client] (ecmascript)",
    );
    const basePath = ("TURBOPACK compile-time value", "") || "";
    function hasBasePath(path) {
      return (0, _pathhasprefix.pathHasPrefix)(path, basePath);
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/remove-base-path.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "removeBasePath", {
      enumerable: true,
      get: function () {
        return removeBasePath;
      },
    });
    const _hasbasepath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)",
    );
    const basePath = ("TURBOPACK compile-time value", "") || "";
    function removeBasePath(path) {
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
      
      if (basePath.length === 0) return path;
      path = path.slice(basePath.length);
      if (!path.startsWith("/")) path = `/${path}`;
      return path;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/errors/graceful-degrade-boundary.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        GracefulDegradeBoundary: null,
        default: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      GracefulDegradeBoundary: function () {
        return GracefulDegradeBoundary;
      },
      default: function () {
        return _default;
      },
    });
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    const _react = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
    );
    function getDomNodeAttributes(node) {
      const result = {};
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        result[attr.name] = attr.value;
      }
      return result;
    }
    class GracefulDegradeBoundary extends _react.Component {
      constructor(props) {
        super(props);
        this.state = {
          hasError: false,
        };
        this.rootHtml = "";
        this.htmlAttributes = {};
        this.htmlRef =  (0, _react.createRef)();
      }
      static getDerivedStateFromError(_) {
        return {
          hasError: true,
        };
      }
      componentDidMount() {
        const htmlNode = this.htmlRef.current;
        if (this.state.hasError && htmlNode) {
          
          Object.entries(this.htmlAttributes).forEach(([key, value]) => {
            htmlNode.setAttribute(key, value);
          });
        }
      }
      render() {
        const { hasError } = this.state;
        
        if (typeof window !== "undefined" && !this.rootHtml) {
          this.rootHtml = document.documentElement.innerHTML;
          this.htmlAttributes = getDomNodeAttributes(document.documentElement);
        }
        if (hasError) {
          
          return  (0, _jsxruntime.jsx)("html", {
            ref: this.htmlRef,
            suppressHydrationWarning: true,
            dangerouslySetInnerHTML: {
              __html: this.rootHtml,
            },
          });
        }
        return this.props.children;
      }
    }
    const _default = GracefulDegradeBoundary;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/errors/root-error-boundary.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function () {
        return RootErrorBoundary;
      },
    });
    const _interop_require_default = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)",
    );
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    const _react =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      ),
    );
    const _gracefuldegradeboundary =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/errors/graceful-degrade-boundary.js [app-client] (ecmascript)",
      ),
    );
    const _errorboundary = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/error-boundary.js [app-client] (ecmascript)",
    );
    const _isbot = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/is-bot.js [app-client] (ecmascript)",
    );
    const isBotUserAgent =
      typeof window !== "undefined" &&
      (0, _isbot.isBot)(window.navigator.userAgent);
    function RootErrorBoundary({
      children,
      errorComponent,
      errorStyles,
      errorScripts,
    }) {
      if (isBotUserAgent) {
        
        
        return  (0, _jsxruntime.jsx)(
          _gracefuldegradeboundary.default,
          {
            children: children,
          },
        );
      }
      return  (0, _jsxruntime.jsx)(_errorboundary.ErrorBoundary, {
        errorComponent: errorComponent,
        errorStyles: errorStyles,
        errorScripts: errorScripts,
        children: children,
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/navigation-devtools.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        createLayoutSegmentPromises: null,
        createNestedLayoutNavigationPromises: null,
        createRootNavigationPromises: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      createLayoutSegmentPromises: function () {
        return createLayoutSegmentPromises;
      },
      createNestedLayoutNavigationPromises: function () {
        return createNestedLayoutNavigationPromises;
      },
      createRootNavigationPromises: function () {
        return createRootNavigationPromises;
      },
    });
    const _hooksclientcontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [app-client] (ecmascript)",
    );
    const _segment = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [app-client] (ecmascript)",
    );
    const _readonlyurlsearchparams = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/readonly-url-search-params.js [app-client] (ecmascript)",
    );
    const layoutSegmentPromisesCache = new WeakMap();
    function createLayoutSegmentPromises(tree) {
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
      
      const cached = layoutSegmentPromisesCache.get(tree);
      if (cached) {
        return cached;
      }
      
      const segmentPromises = new Map();
      const segmentsPromises = new Map();
      const parallelRoutes = tree[1];
      for (const parallelRouteKey of Object.keys(parallelRoutes)) {
        const segments = (0, _segment.getSelectedLayoutSegmentPath)(
          tree,
          parallelRouteKey,
        );
        
        const segment = (0, _segment.computeSelectedLayoutSegment)(
          segments,
          parallelRouteKey,
        );
        segmentPromises.set(
          parallelRouteKey,
          (0,
          _hooksclientcontextsharedruntime.createDevToolsInstrumentedPromise)(
            "useSelectedLayoutSegment",
            segment,
          ),
        );
        segmentsPromises.set(
          parallelRouteKey,
          (0,
          _hooksclientcontextsharedruntime.createDevToolsInstrumentedPromise)(
            "useSelectedLayoutSegments",
            segments,
          ),
        );
      }
      const result = {
        selectedLayoutSegmentPromises: segmentPromises,
        selectedLayoutSegmentsPromises: segmentsPromises,
      };
      
      layoutSegmentPromisesCache.set(tree, result);
      return result;
    }
    const rootNavigationPromisesCache = new WeakMap();
    function createRootNavigationPromises(
      tree,
      pathname,
      searchParams,
      pathParams,
    ) {
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
      
      const searchParamsString = searchParams.toString();
      const pathParamsString = JSON.stringify(pathParams);
      const cacheKey = `${pathname}:${searchParamsString}:${pathParamsString}`;
      
      let treeCache = rootNavigationPromisesCache.get(tree);
      if (!treeCache) {
        treeCache = new Map();
        rootNavigationPromisesCache.set(tree, treeCache);
      }
      
      const cached = treeCache.get(cacheKey);
      if (cached) {
        return cached;
      }
      const readonlySearchParams =
        new _readonlyurlsearchparams.ReadonlyURLSearchParams(searchParams);
      const layoutSegmentPromises = createLayoutSegmentPromises(tree);
      const promises = {
        pathname: (0,
        _hooksclientcontextsharedruntime.createDevToolsInstrumentedPromise)(
          "usePathname",
          pathname,
        ),
        searchParams: (0,
        _hooksclientcontextsharedruntime.createDevToolsInstrumentedPromise)(
          "useSearchParams",
          readonlySearchParams,
        ),
        params: (0,
        _hooksclientcontextsharedruntime.createDevToolsInstrumentedPromise)(
          "useParams",
          pathParams,
        ),
        ...layoutSegmentPromises,
      };
      treeCache.set(cacheKey, promises);
      return promises;
    }
    const nestedLayoutPromisesCache = new WeakMap();
    function createNestedLayoutNavigationPromises(tree, parentNavPromises) {
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
      const parallelRoutes = tree[1];
      const parallelRouteKeys = Object.keys(parallelRoutes);
      
      if (parallelRouteKeys.length === 0) {
        return null;
      }
      
      let treeCache = nestedLayoutPromisesCache.get(tree);
      if (!treeCache) {
        treeCache = new Map();
        nestedLayoutPromisesCache.set(tree, treeCache);
      }
      
      const cached = treeCache.get(parentNavPromises);
      if (cached) {
        return cached;
      }
      
      const layoutSegmentPromises = createLayoutSegmentPromises(tree);
      const promises = {
        ...parentNavPromises,
        ...layoutSegmentPromises,
      };
      treeCache.set(parentNavPromises, promises);
      return promises;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/http-access-fallback/error-boundary.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use client");
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "HTTPAccessFallbackBoundary", {
      enumerable: true,
      get: function () {
        return HTTPAccessFallbackBoundary;
      },
    });
    const _interop_require_wildcard = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)",
    );
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    const _react =  _interop_require_wildcard._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      ),
    );
    const _navigationuntracked = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/navigation-untracked.js [app-client] (ecmascript)",
    );
    const _httpaccessfallback = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js [app-client] (ecmascript)",
    );
    const _warnonce = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)",
    );
    const _approutercontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)",
    );
    class HTTPAccessFallbackErrorBoundary extends _react.default.Component {
      constructor(props) {
        super(props);
        this.state = {
          triggeredStatus: undefined,
          previousPathname: props.pathname,
        };
      }
      componentDidCatch() {
        if (
          ("TURBOPACK compile-time value", "development") === "development" &&
          this.props.missingSlots &&
          this.props.missingSlots.size > 0 && 
          !this.props.missingSlots.has("children")
        ) {
          let warningMessage =
            "No default component was found for a parallel route rendered on this page. Falling back to nearest NotFound boundary.\n" +
            "Learn more: https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#defaultjs\n\n";
          const formattedSlots = Array.from(this.props.missingSlots)
            .sort((a, b) => a.localeCompare(b))
            .map((slot) => `@${slot}`)
            .join(", ");
          warningMessage += "Missing slots: " + formattedSlots;
          (0, _warnonce.warnOnce)(warningMessage);
        }
      }
      static getDerivedStateFromError(error) {
        if ((0, _httpaccessfallback.isHTTPAccessFallbackError)(error)) {
          const httpStatus = (0,
          _httpaccessfallback.getAccessFallbackHTTPStatus)(error);
          return {
            triggeredStatus: httpStatus,
          };
        }
        
        throw error;
      }
      static getDerivedStateFromProps(props, state) {
        




 if (
          props.pathname !== state.previousPathname &&
          state.triggeredStatus
        ) {
          return {
            triggeredStatus: undefined,
            previousPathname: props.pathname,
          };
        }
        return {
          triggeredStatus: state.triggeredStatus,
          previousPathname: props.pathname,
        };
      }
      render() {
        const { notFound, forbidden, unauthorized, children } = this.props;
        const { triggeredStatus } = this.state;
        const errorComponents = {
          [_httpaccessfallback.HTTPAccessErrorStatus.NOT_FOUND]: notFound,
          [_httpaccessfallback.HTTPAccessErrorStatus.FORBIDDEN]: forbidden,
          [_httpaccessfallback.HTTPAccessErrorStatus.UNAUTHORIZED]:
            unauthorized,
        };
        if (triggeredStatus) {
          const isNotFound =
            triggeredStatus ===
              _httpaccessfallback.HTTPAccessErrorStatus.NOT_FOUND && notFound;
          const isForbidden =
            triggeredStatus ===
              _httpaccessfallback.HTTPAccessErrorStatus.FORBIDDEN && forbidden;
          const isUnauthorized =
            triggeredStatus ===
              _httpaccessfallback.HTTPAccessErrorStatus.UNAUTHORIZED &&
            unauthorized;
          
          if (!(isNotFound || isForbidden || isUnauthorized)) {
            return children;
          }
          return  (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [
               (0, _jsxruntime.jsx)("meta", {
                name: "robots",
                content: "noindex",
              }),
              ("TURBOPACK compile-time value", "development") ===
                "development" &&
                 (0, _jsxruntime.jsx)("meta", {
                  name: "boundary-next-error",
                  content: (0,
                  _httpaccessfallback.getAccessFallbackErrorTypeByStatus)(
                    triggeredStatus,
                  ),
                }),
              errorComponents[triggeredStatus],
            ],
          });
        }
        return children;
      }
    }
    function HTTPAccessFallbackBoundary({
      notFound,
      forbidden,
      unauthorized,
      children,
    }) {
      
      
      
      
      const pathname = (0, _navigationuntracked.useUntrackedPathname)();
      const missingSlots = (0, _react.useContext)(
        _approutercontextsharedruntime.MissingSlotContext,
      );
      const hasErrorFallback = !!(notFound || forbidden || unauthorized);
      if (hasErrorFallback) {
        return  (0, _jsxruntime.jsx)(
          HTTPAccessFallbackErrorBoundary,
          {
            pathname: pathname,
            notFound: notFound,
            forbidden: forbidden,
            unauthorized: unauthorized,
            missingSlots: missingSlots,
            children: children,
          },
        );
      }
      return  (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children,
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/dev-root-http-access-fallback-boundary.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        DevRootHTTPAccessFallbackBoundary: null,
        bailOnRootNotFound: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      DevRootHTTPAccessFallbackBoundary: function () {
        return DevRootHTTPAccessFallbackBoundary;
      },
      bailOnRootNotFound: function () {
        return bailOnRootNotFound;
      },
    });
    const _interop_require_default = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)",
    );
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    const _react =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      ),
    );
    const _errorboundary = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/http-access-fallback/error-boundary.js [app-client] (ecmascript)",
    );
    function bailOnRootNotFound() {
      throw Object.defineProperty(
        new Error("notFound() is not allowed to use in root layout"),
        "__NEXT_ERROR_CODE",
        {
          value: "E192",
          enumerable: false,
          configurable: true,
        },
      );
    }
    function NotAllowedRootHTTPFallbackError() {
      bailOnRootNotFound();
      return null;
    }
    function DevRootHTTPAccessFallbackBoundary({ children }) {
      return  (0, _jsxruntime.jsx)(
        _errorboundary.HTTPAccessFallbackBoundary,
        {
          notFound:  (0, _jsxruntime.jsx)(
            NotAllowedRootHTTPFallbackError,
            {},
          ),
          children: children,
        },
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/hot-reloader/shared.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        REACT_REFRESH_FULL_RELOAD: null,
        REACT_REFRESH_FULL_RELOAD_FROM_ERROR: null,
        reportInvalidHmrMessage: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      REACT_REFRESH_FULL_RELOAD: function () {
        return REACT_REFRESH_FULL_RELOAD;
      },
      REACT_REFRESH_FULL_RELOAD_FROM_ERROR: function () {
        return REACT_REFRESH_FULL_RELOAD_FROM_ERROR;
      },
      reportInvalidHmrMessage: function () {
        return reportInvalidHmrMessage;
      },
    });
    const REACT_REFRESH_FULL_RELOAD =
      "[Fast Refresh] performing full reload\n\n" +
      "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" +
      "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" +
      "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" +
      "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" +
      "Fast Refresh requires at least one parent function component in your React tree.";
    const REACT_REFRESH_FULL_RELOAD_FROM_ERROR =
      "[Fast Refresh] performing full reload because your application had an unrecoverable error";
    function reportInvalidHmrMessage(message, err) {
      console.warn(
        "[HMR] Invalid message: " +
          JSON.stringify(message) +
          "\n" +
          ((err instanceof Error && err?.stack) || ""),
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/hot-reloader/get-socket-url.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "getSocketUrl", {
      enumerable: true,
      get: function () {
        return getSocketUrl;
      },
    });
    const _normalizedassetprefix = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/normalized-asset-prefix.js [app-client] (ecmascript)",
    );
    function getSocketProtocol(assetPrefix) {
      let protocol = window.location.protocol;
      try {
        
        protocol = new URL(assetPrefix).protocol;
      } catch {}
      return protocol === "http:" ? "ws:" : "wss:";
    }
    function getSocketUrl(assetPrefix) {
      const prefix = (0, _normalizedassetprefix.normalizedAssetPrefix)(
        assetPrefix,
      );
      const protocol = getSocketProtocol(assetPrefix || "");
      if (URL.canParse(prefix)) {
        
        
        return prefix.replace(/^http/, "ws");
      }
      const { hostname, port } = window.location;
      return `${protocol}//${hostname}${port ? `:${port}` : ""}${prefix}`;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/hot-reloader/app/web-socket.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        createProcessTurbopackMessage: null,
        createWebSocket: null,
        useWebSocketPing: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      createProcessTurbopackMessage: function () {
        return createProcessTurbopackMessage;
      },
      createWebSocket: function () {
        return createWebSocket;
      },
      useWebSocketPing: function () {
        return useWebSocketPing;
      },
    });
    const _react = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
    );
    const _approutercontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)",
    );
    const _getsocketurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/hot-reloader/get-socket-url.js [app-client] (ecmascript)",
    );
    const _hotreloadertypes = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/dev/hot-reloader-types.js [app-client] (ecmascript)",
    );
    const _shared = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/hot-reloader/shared.js [app-client] (ecmascript)",
    );
    const _hotreloaderapp = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/hot-reloader/app/hot-reloader-app.js [app-client] (ecmascript)",
    );
    const _forwardlogs = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/next-devtools/userspace/app/forward-logs.js [app-client] (ecmascript)",
    );
    const _invarianterror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)",
    );
    const _constants = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/lib/constants.js [app-client] (ecmascript)",
    );
    let reconnections = 0;
    let reloading = false;
    let serverSessionId = null;
    let mostRecentCompilationHash = null;
    function createWebSocket(assetPrefix, staticIndicatorState) {
      if (!self.__next_r) {
        throw Object.defineProperty(
          new _invarianterror.InvariantError(
            `Expected a request ID to be defined for the document via self.__next_r.`,
          ),
          "__NEXT_ERROR_CODE",
          {
            value: "E806",
            enumerable: false,
            configurable: true,
          },
        );
      }
      let webSocket;
      let timer;
      const sendMessage = (data) => {
        if (webSocket && webSocket.readyState === webSocket.OPEN) {
          webSocket.send(data);
        }
      };
      const processTurbopackMessage =
        createProcessTurbopackMessage(sendMessage);
      function init() {
        if (webSocket) {
          webSocket.close();
        }
        const newWebSocket = new window.WebSocket(
          `${(0, _getsocketurl.getSocketUrl)(assetPrefix)}/_next/webpack-hmr?id=${self.__next_r}`,
        );
        newWebSocket.binaryType = "arraybuffer";
        function handleOnline() {
          _forwardlogs.logQueue.onSocketReady(newWebSocket);
          reconnections = 0;
          window.console.log("[HMR] connected");
        }
        function handleMessage(event) {
          
          if (reloading) {
            return;
          }
          try {
            const message =
              event.data instanceof ArrayBuffer
                ? parseBinaryMessage(event.data)
                : JSON.parse(event.data);
            
            if (
              message.type ===
              _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_CONNECTED
            ) {
              if (
                serverSessionId !== null &&
                serverSessionId !== message.data.sessionId
              ) {
                
                
                window.location.reload();
                reloading = true;
                return;
              }
              serverSessionId = message.data.sessionId;
            }
            
            if (
              message.type ===
                _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SYNC &&
              "hash" in message
            ) {
              
              if (
                mostRecentCompilationHash !== null &&
                mostRecentCompilationHash !== message.hash
              ) {
                window.location.reload();
                reloading = true;
                return;
              }
              mostRecentCompilationHash = message.hash;
            }
            (0, _hotreloaderapp.processMessage)(
              message,
              sendMessage,
              processTurbopackMessage,
              staticIndicatorState,
            );
          } catch (err) {
            (0, _shared.reportInvalidHmrMessage)(event, err);
          }
        }
        function handleDisconnect() {
          newWebSocket.onerror = null;
          newWebSocket.onclose = null;
          newWebSocket.close();
          reconnections++;
          
          if (reconnections > _constants.WEB_SOCKET_MAX_RECONNECTIONS) {
            reloading = true;
            window.location.reload();
            return;
          }
          clearTimeout(timer);
          
          timer = setTimeout(init, reconnections > 5 ? 5000 : 1000);
        }
        newWebSocket.onopen = handleOnline;
        newWebSocket.onerror = handleDisconnect;
        newWebSocket.onclose = handleDisconnect;
        newWebSocket.onmessage = handleMessage;
        webSocket = newWebSocket;
        return newWebSocket;
      }
      return init();
    }
    function createProcessTurbopackMessage(sendMessage) {
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
      let queue = [];
      let callback;
      const processTurbopackMessage = (msg) => {
        if (callback) {
          callback(msg);
        } else {
          queue.push(msg);
        }
      };
      __turbopack_context__
        .A(
          "[turbopack]/browser/dev/hmr-client/hmr-client.ts [app-client] (ecmascript, async loader)",
        )
        .then(({ connect }) => {
          connect({
            addMessageListener(cb) {
              callback = cb;
              
              for (const msg of queue) {
                cb(msg);
              }
              queue.length = 0;
            },
            sendMessage,
            onUpdateError: (err) =>
              (0, _hotreloaderapp.performFullReload)(err, sendMessage),
          });
        });
      return processTurbopackMessage;
    }
    function useWebSocketPing(webSocket) {
      const { tree } = (0, _react.useContext)(
        _approutercontextsharedruntime.GlobalLayoutRouterContext,
      );
      (0, _react.useEffect)(() => {
        if (!webSocket) {
          throw Object.defineProperty(
            new _invarianterror.InvariantError(
              "Expected webSocket to be defined in dev mode.",
            ),
            "__NEXT_ERROR_CODE",
            {
              value: "E785",
              enumerable: false,
              configurable: true,
            },
          );
        }
        
        
        if (("TURBOPACK compile-time truthy", 1)) {
          return;
        }
        
        
        const interval = undefined;
      }, [tree, webSocket]);
    }
    const textDecoder = new TextDecoder();
    function parseBinaryMessage(data) {
      assertByteLength(data, 1);
      const view = new DataView(data);
      const messageType = view.getUint8(0);
      switch (messageType) {
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REACT_DEBUG_CHUNK: {
          assertByteLength(data, 2);
          const requestIdLength = view.getUint8(1);
          assertByteLength(data, 2 + requestIdLength);
          const requestId = textDecoder.decode(
            new Uint8Array(data, 2, requestIdLength),
          );
          const chunk =
            data.byteLength > 2 + requestIdLength
              ? new Uint8Array(data, 2 + requestIdLength)
              : null;
          return {
            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER
              .REACT_DEBUG_CHUNK,
            requestId,
            chunk,
          };
        }
        default: {
          throw Object.defineProperty(
            new _invarianterror.InvariantError(
              `Invalid binary HMR message of type ${messageType}`,
            ),
            "__NEXT_ERROR_CODE",
            {
              value: "E809",
              enumerable: false,
              configurable: true,
            },
          );
        }
      }
    }
    function assertByteLength(data, expectedLength) {
      if (data.byteLength < expectedLength) {
        throw Object.defineProperty(
          new _invarianterror.InvariantError(
            `Invalid binary HMR message: insufficient data (expected ${expectedLength} bytes, got ${data.byteLength})`,
          ),
          "__NEXT_ERROR_CODE",
          {
            value: "E808",
            enumerable: false,
            configurable: true,
          },
        );
      }
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/report-hmr-latency.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(
      exports,
      









 "default",
      {
        enumerable: true,
        get: function () {
          return reportHmrLatency;
        },
      },
    );
    function reportHmrLatency(
      sendMessage,
      updatedModules,
      startMsSinceEpoch,
      endMsSinceEpoch,
      hasUpdate = true,
    ) {
      const latencyMs = endMsSinceEpoch - startMsSinceEpoch;
      console.log(`[Fast Refresh] done in ${latencyMs}ms`);
      if (!hasUpdate) {
        return;
      }
      sendMessage(
        JSON.stringify({
          event: "client-hmr-latency",
          id: window.__nextDevClientId,
          startTime: startMsSinceEpoch,
          endTime: endMsSinceEpoch,
          page: window.location.pathname,
          updatedModules,
          
          
          isPageHidden: document.visibilityState === "hidden",
        }),
      );
      if (self.__NEXT_HMR_LATENCY_CB) {
        self.__NEXT_HMR_LATENCY_CB(latencyMs);
      }
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/hot-reloader/turbopack-hot-reloader-common.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "TurbopackHmr", {
      enumerable: true,
      get: function () {
        return TurbopackHmr;
      },
    });
    
    
    const TURBOPACK_HMR_START_DELAY_MS = 100;
    class TurbopackHmr {
      #updatedModules;
      #startMsSinceEpoch;
      #lastUpdateMsSinceEpoch;
      #deferredReportHmrStartId;
      #reportedHmrStart;
      constructor() {
        this.#updatedModules = new Set();
        this.#reportedHmrStart = false;
      }
      
      
      
      
      
      
      
      
      #runDeferredReportHmrStart() {
        if (this.#deferredReportHmrStartId != null) {
          console.log("[Fast Refresh] rebuilding");
          this.#reportedHmrStart = true;
          this.#cancelDeferredReportHmrStart();
        }
      }
      #cancelDeferredReportHmrStart() {
        clearTimeout(this.#deferredReportHmrStartId);
        this.#deferredReportHmrStartId = undefined;
      }
      onBuilding() {
        this.#lastUpdateMsSinceEpoch = undefined;
        this.#cancelDeferredReportHmrStart();
        this.#startMsSinceEpoch = Date.now();
        
        this.#deferredReportHmrStartId = setTimeout(
          () => this.#runDeferredReportHmrStart(),
          self.__NEXT_HMR_TURBOPACK_REPORT_NOISY_NOOP_EVENTS
            ? 0
            : TURBOPACK_HMR_START_DELAY_MS,
        );
      }
       #onUpdate() {
        this.#runDeferredReportHmrStart();
        this.#lastUpdateMsSinceEpoch = Date.now();
      }
      onTurbopackMessage(msg) {
        this.#onUpdate();
        const updatedModules = extractModulesFromTurbopackMessage(msg.data);
        for (const module1 of updatedModules) {
          this.#updatedModules.add(module1);
        }
      }
      onServerComponentChanges() {
        this.#onUpdate();
      }
      onReloadPage() {
        this.#onUpdate();
      }
      onPageAddRemove() {
        this.#onUpdate();
      }
      



 onBuilt() {
        
        
        
        
        
        const hasUpdates =
          this.#lastUpdateMsSinceEpoch != null &&
          this.#startMsSinceEpoch != null;
        if (!hasUpdates && !this.#reportedHmrStart) {
          
          this.#cancelDeferredReportHmrStart();
          return null;
        }
        this.#runDeferredReportHmrStart();
        const result = {
          hasUpdates,
          updatedModules: this.#updatedModules,
          startMsSinceEpoch: this.#startMsSinceEpoch,
          endMsSinceEpoch: this.#lastUpdateMsSinceEpoch ?? Date.now(),
        };
        this.#updatedModules = new Set();
        this.#reportedHmrStart = false;
        return result;
      }
    }
    function extractModulesFromTurbopackMessage(data) {
      const updatedModules = new Set();
      const updates = Array.isArray(data) ? data : [data];
      for (const update of updates) {
        
        if (
          update.type !== "partial" ||
          update.instruction.type !== "ChunkListUpdate" ||
          update.instruction.merged === undefined
        ) {
          continue;
        }
        for (const mergedUpdate of update.instruction.merged) {
          for (const name of Object.keys(mergedUpdate.entries)) {
            const res = /(.*)\s+[([].*/.exec(name);
            if (res === null) {
              continue;
            }
            updatedModules.add(res[1]);
          }
        }
      }
      return updatedModules;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/debug-channel.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        createDebugChannel: null,
        getOrCreateDebugChannelReadableWriterPair: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      createDebugChannel: function () {
        return createDebugChannel;
      },
      getOrCreateDebugChannelReadableWriterPair: function () {
        return getOrCreateDebugChannelReadableWriterPair;
      },
    });
    const _approuterheaders = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-headers.js [app-client] (ecmascript)",
    );
    const _invarianterror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)",
    );
    const pairs = new Map();
    function getOrCreateDebugChannelReadableWriterPair(requestId) {
      let pair = pairs.get(requestId);
      if (!pair) {
        const { readable, writable } = new TransformStream();
        pair = {
          readable,
          writer: writable.getWriter(),
        };
        pairs.set(requestId, pair);
        pair.writer.closed.finally(() => pairs.delete(requestId));
      }
      return pair;
    }
    function createDebugChannel(requestHeaders) {
      let requestId;
      if (requestHeaders) {
        requestId =
          requestHeaders[_approuterheaders.NEXT_REQUEST_ID_HEADER] ?? undefined;
        if (!requestId) {
          throw Object.defineProperty(
            new _invarianterror.InvariantError(
              `Expected a ${JSON.stringify(_approuterheaders.NEXT_REQUEST_ID_HEADER)} request header.`,
            ),
            "__NEXT_ERROR_CODE",
            {
              value: "E854",
              enumerable: false,
              configurable: true,
            },
          );
        }
      } else {
        requestId = self.__next_r;
        if (!requestId) {
          throw Object.defineProperty(
            new _invarianterror.InvariantError(
              `Expected a request ID to be defined for the document via self.__next_r.`,
            ),
            "__NEXT_ERROR_CODE",
            {
              value: "E806",
              enumerable: false,
              configurable: true,
            },
          );
        }
      }
      const { readable } = getOrCreateDebugChannelReadableWriterPair(requestId);
      return {
        readable,
      };
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/hot-reloader/app/hot-reloader-app.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        default: null,
        performFullReload: null,
        processMessage: null,
        waitForWebpackRuntimeHotUpdate: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      default: function () {
        return HotReload;
      },
      performFullReload: function () {
        return performFullReload;
      },
      processMessage: function () {
        return processMessage;
      },
      waitForWebpackRuntimeHotUpdate: function () {
        return waitForWebpackRuntimeHotUpdate;
      },
    });
    const _interop_require_default = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)",
    );
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    const _react = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
    );
    const _stripansi =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/strip-ansi/index.js [app-client] (ecmascript)",
      ),
    );
    const _formatwebpackmessages =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/format-webpack-messages.js [app-client] (ecmascript)",
      ),
    );
    const _shared = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/hot-reloader/shared.js [app-client] (ecmascript)",
    );
    const _nextdevtools = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/next-devtools/index.js (raw)",
    );
    const _replayssronlyerrors = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/next-devtools/userspace/app/errors/replay-ssr-only-errors.js [app-client] (ecmascript)",
    );
    const _appdevoverlayerrorboundary = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/next-devtools/userspace/app/app-dev-overlay-error-boundary.js [app-client] (ecmascript)",
    );
    const _useerrorhandler = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/next-devtools/userspace/app/errors/use-error-handler.js [app-client] (ecmascript)",
    );
    const _runtimeerrorhandler = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/runtime-error-handler.js [app-client] (ecmascript)",
    );
    const _websocket = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/hot-reloader/app/web-socket.js [app-client] (ecmascript)",
    );
    const _hotreloadertypes = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/dev/hot-reloader-types.js [app-client] (ecmascript)",
    );
    const _navigationuntracked = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/navigation-untracked.js [app-client] (ecmascript)",
    );
    const _reporthmrlatency =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/report-hmr-latency.js [app-client] (ecmascript)",
      ),
    );
    const _turbopackhotreloadercommon = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/hot-reloader/turbopack-hot-reloader-common.js [app-client] (ecmascript)",
    );
    const _approuterheaders = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-headers.js [app-client] (ecmascript)",
    );
    const _approuterinstance = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)",
    );
    const _invarianterror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)",
    );
    const _debugchannel = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/debug-channel.js [app-client] (ecmascript)",
    );
    let mostRecentCompilationHash = null;
    let __nextDevClientId = Math.round(Math.random() * 100 + Date.now());
    let reloading = false;
    let webpackStartMsSinceEpoch = null;
    const turbopackHmr = ("TURBOPACK compile-time truthy", 1)
      ? new _turbopackhotreloadercommon.TurbopackHmr()
      : "TURBOPACK unreachable";
    let pendingHotUpdateWebpack = Promise.resolve();
    let resolvePendingHotUpdateWebpack = () => {};
    function setPendingHotUpdateWebpack() {
      pendingHotUpdateWebpack = new Promise((resolve) => {
        resolvePendingHotUpdateWebpack = () => {
          resolve();
        };
      });
    }
    function waitForWebpackRuntimeHotUpdate() {
      return pendingHotUpdateWebpack;
    }
    
    function handleAvailableHash(hash) {
      
      mostRecentCompilationHash = hash;
    }
    



 function isUpdateAvailable() {
      if (("TURBOPACK compile-time truthy", 1)) {
        return true;
      }
      
    }
    
    function canApplyUpdates() {
      return module.hot.status() === "idle";
    }
    function afterApplyUpdates(fn) {
      if (canApplyUpdates()) {
        fn();
      } else {
        function handler(status) {
          if (status === "idle") {
            module.hot.removeStatusHandler(handler);
            fn();
          }
        }
        module.hot.addStatusHandler(handler);
      }
    }
    function performFullReload(err, sendMessage) {
      const stackTrace =
        err &&
        ((err.stack && err.stack.split("\n").slice(0, 5).join("\n")) ||
          err.message ||
          err + "");
      sendMessage(
        JSON.stringify({
          event: "client-full-reload",
          stackTrace,
          hadRuntimeError:
            !!_runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError,
          dependencyChain: err ? err.dependencyChain : undefined,
        }),
      );
      if (reloading) return;
      reloading = true;
      window.location.reload();
    }
    
    function tryApplyUpdatesWebpack(sendMessage) {
      if (!isUpdateAvailable() || !canApplyUpdates()) {
        resolvePendingHotUpdateWebpack();
        _nextdevtools.dispatcher.onBuildOk();
        (0, _reporthmrlatency.default)(
          sendMessage,
          [],
          webpackStartMsSinceEpoch,
          Date.now(),
        );
        return;
      }
      function handleApplyUpdates(err, updatedModules) {
        if (
          err ||
          _runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError ||
          updatedModules == null
        ) {
          if (err) {
            console.warn(_shared.REACT_REFRESH_FULL_RELOAD);
          } else if (_runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError) {
            console.warn(_shared.REACT_REFRESH_FULL_RELOAD_FROM_ERROR);
          }
          performFullReload(err, sendMessage);
          return;
        }
        _nextdevtools.dispatcher.onBuildOk();
        if (isUpdateAvailable()) {
          
          tryApplyUpdatesWebpack(sendMessage);
          return;
        }
        _nextdevtools.dispatcher.onRefresh();
        resolvePendingHotUpdateWebpack();
        (0, _reporthmrlatency.default)(
          sendMessage,
          updatedModules,
          webpackStartMsSinceEpoch,
          Date.now(),
        );
        if (("TURBOPACK compile-time falsy", 0)) 
        ;
      }
      
      module.hot
        .check( false)
        .then((updatedModules) => {
          if (updatedModules == null) {
            return null;
          }
          
          
          
          _nextdevtools.dispatcher.onBeforeRefresh();
          
          return module.hot.apply();
        })
        .then(
          (updatedModules) => {
            handleApplyUpdates(null, updatedModules);
          },
          (err) => {
            handleApplyUpdates(err, null);
          },
        );
    }
    function processMessage(
      message,
      sendMessage,
      processTurbopackMessage,
      staticIndicatorState,
    ) {
      function handleErrors(errors) {
        
        const formatted = (0, _formatwebpackmessages.default)({
          errors: errors,
          warnings: [],
        });
        
        _nextdevtools.dispatcher.onBuildError(formatted.errors[0]);
        
        for (let i = 0; i < formatted.errors.length; i++) {
          console.error((0, _stripansi.default)(formatted.errors[i]));
        }
        
        
        if (("TURBOPACK compile-time falsy", 0)) 
        ;
      }
      function handleHotUpdate() {
        if (("TURBOPACK compile-time truthy", 1)) {
          const hmrUpdate = turbopackHmr.onBuilt();
          if (hmrUpdate != null) {
            (0, _reporthmrlatency.default)(
              sendMessage,
              [...hmrUpdate.updatedModules],
              hmrUpdate.startMsSinceEpoch,
              hmrUpdate.endMsSinceEpoch,
              hmrUpdate.hasUpdates,
            );
          }
          _nextdevtools.dispatcher.onBuildOk();
        } 
        else;
      }
      switch (message.type) {
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ISR_MANIFEST: {
          if (("TURBOPACK compile-time truthy", 1)) {
            staticIndicatorState.appIsrManifest = message.data;
            
            
            
            
            const isStatic = staticIndicatorState.pathname
              ? message.data[staticIndicatorState.pathname]
              : undefined;
            _nextdevtools.dispatcher.onStaticIndicator(
              isStatic === undefined
                ? "pending"
                : isStatic
                  ? "static"
                  : "dynamic",
            );
          }
          break;
        }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.BUILDING: {
          _nextdevtools.dispatcher.buildingIndicatorShow();
          if (("TURBOPACK compile-time truthy", 1)) {
            turbopackHmr.onBuilding();
          } 
          else;
          break;
        }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.BUILT:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SYNC: {
          _nextdevtools.dispatcher.buildingIndicatorHide();
          if (message.hash) {
            handleAvailableHash(message.hash);
          }
          const { errors, warnings } = message;
          
          if ("versionInfo" in message)
            _nextdevtools.dispatcher.onVersionInfo(message.versionInfo);
          if ("debug" in message && message.debug)
            _nextdevtools.dispatcher.onDebugInfo(message.debug);
          if ("devIndicator" in message)
            _nextdevtools.dispatcher.onDevIndicator(message.devIndicator);
          if ("devToolsConfig" in message)
            _nextdevtools.dispatcher.onDevToolsConfig(message.devToolsConfig);
          const hasErrors = Boolean(errors && errors.length);
          
          if (hasErrors) {
            sendMessage(
              JSON.stringify({
                event: "client-error",
                errorCount: errors.length,
                clientId: __nextDevClientId,
              }),
            );
            handleErrors(errors);
            return;
          }
          const hasWarnings = Boolean(warnings && warnings.length);
          if (hasWarnings) {
            sendMessage(
              JSON.stringify({
                event: "client-warning",
                warningCount: warnings.length,
                clientId: __nextDevClientId,
              }),
            );
            
            const formattedMessages = (0, _formatwebpackmessages.default)({
              warnings: warnings,
              errors: [],
            });
            for (let i = 0; i < formattedMessages.warnings.length; i++) {
              if (i === 5) {
                console.warn(
                  "There were more warnings in other files.\n" +
                    "You can find a complete log in the terminal.",
                );
                break;
              }
              console.warn(
                (0, _stripansi.default)(formattedMessages.warnings[i]),
              );
            }
            
          }
          sendMessage(
            JSON.stringify({
              event: "client-success",
              clientId: __nextDevClientId,
            }),
          );
          if (
            message.type === _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.BUILT
          ) {
            handleHotUpdate();
          }
          return;
        }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER
          .TURBOPACK_CONNECTED: {
          processTurbopackMessage({
            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER
              .TURBOPACK_CONNECTED,
            data: {
              sessionId: message.data.sessionId,
            },
          });
          break;
        }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.TURBOPACK_MESSAGE: {
          turbopackHmr.onTurbopackMessage(message);
          _nextdevtools.dispatcher.onBeforeRefresh();
          processTurbopackMessage({
            type: _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER
              .TURBOPACK_MESSAGE,
            data: message.data,
          });
          if (_runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError) {
            console.warn(_shared.REACT_REFRESH_FULL_RELOAD_FROM_ERROR);
            performFullReload(null, sendMessage);
          }
          _nextdevtools.dispatcher.onRefresh();
          break;
        }
        
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER
          .SERVER_COMPONENT_CHANGES: {
          turbopackHmr?.onServerComponentChanges();
          sendMessage(
            JSON.stringify({
              event: "server-component-reload-page",
              clientId: __nextDevClientId,
              hash: message.hash,
            }),
          );
          
          
          document.cookie = `${_approuterheaders.NEXT_HMR_REFRESH_HASH_COOKIE}=${message.hash};path=/`;
          if (
            _runtimeerrorhandler.RuntimeErrorHandler.hadRuntimeError ||
            document.documentElement.id === "__next_error__"
          ) {
            if (reloading) return;
            reloading = true;
            return window.location.reload();
          }
          (0, _react.startTransition)(() => {
            _approuterinstance.publicAppRouterInstance.hmrRefresh();
            _nextdevtools.dispatcher.onRefresh();
          });
          if (("TURBOPACK compile-time falsy", 0)) 
          ;
          return;
        }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.RELOAD_PAGE: {
          turbopackHmr?.onReloadPage();
          sendMessage(
            JSON.stringify({
              event: "client-reload-page",
              clientId: __nextDevClientId,
            }),
          );
          if (reloading) return;
          reloading = true;
          return window.location.reload();
        }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.ADDED_PAGE:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REMOVED_PAGE: {
          turbopackHmr?.onPageAddRemove();
          
          return _approuterinstance.publicAppRouterInstance.hmrRefresh();
        }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_ERROR: {
          const { errorJSON } = message;
          if (errorJSON) {
            const errorObject = JSON.parse(errorJSON);
            const error = Object.defineProperty(
              new Error(errorObject.message),
              "__NEXT_ERROR_CODE",
              {
                value: "E394",
                enumerable: false,
                configurable: true,
              },
            );
            error.stack = errorObject.stack;
            handleErrors([error]);
          }
          return;
        }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER
          .DEV_PAGES_MANIFEST_UPDATE: {
          return;
        }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.DEVTOOLS_CONFIG: {
          _nextdevtools.dispatcher.onDevToolsConfig(message.data);
          return;
        }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.REACT_DEBUG_CHUNK: {
          const { requestId, chunk } = message;
          const { writer } = (0,
          _debugchannel.getOrCreateDebugChannelReadableWriterPair)(requestId);
          if (chunk) {
            writer.ready.then(() => writer.write(chunk)).catch(console.error);
          } else {
            
            
            
            
            
            writer.ready.then(() => writer.close()).catch(console.error);
          }
          return;
        }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER
          .REQUEST_CURRENT_ERROR_STATE: {
          const errorState = (0, _nextdevtools.getSerializedOverlayState)();
          const response = {
            event:
              _hotreloadertypes.HMR_MESSAGE_SENT_TO_SERVER
                .MCP_ERROR_STATE_RESPONSE,
            requestId: message.requestId,
            errorState,
            url: window.location.href,
          };
          sendMessage(JSON.stringify(response));
          return;
        }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER
          .REQUEST_PAGE_METADATA: {
          const segmentTrieData = (0, _nextdevtools.getSegmentTrieData)();
          const response = {
            event:
              _hotreloadertypes.HMR_MESSAGE_SENT_TO_SERVER
                .MCP_PAGE_METADATA_RESPONSE,
            requestId: message.requestId,
            segmentTrieData,
            url: window.location.href,
          };
          sendMessage(JSON.stringify(response));
          return;
        }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CACHE_INDICATOR: {
          _nextdevtools.dispatcher.onCacheIndicator(message.state);
          return;
        }
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.MIDDLEWARE_CHANGES:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.CLIENT_CHANGES:
        case _hotreloadertypes.HMR_MESSAGE_SENT_TO_BROWSER.SERVER_ONLY_CHANGES:
          break;
        default: {
          message;
        }
      }
    }
    function HotReload({
      children,
      globalError,
      webSocket,
      staticIndicatorState,
    }) {
      (0, _useerrorhandler.useErrorHandler)(
        _nextdevtools.dispatcher.onUnhandledError,
        _nextdevtools.dispatcher.onUnhandledRejection,
      );
      (0, _websocket.useWebSocketPing)(webSocket);
      
      
      const pathname = (0, _navigationuntracked.useUntrackedPathname)();
      if (("TURBOPACK compile-time truthy", 1)) {
        
        
        
        (0, _react.useEffect)(() => {
          if (!staticIndicatorState) {
            throw Object.defineProperty(
              new _invarianterror.InvariantError(
                "Expected staticIndicatorState to be defined in dev mode.",
              ),
              "__NEXT_ERROR_CODE",
              {
                value: "E786",
                enumerable: false,
                configurable: true,
              },
            );
          }
          staticIndicatorState.pathname = pathname;
          if (staticIndicatorState.appIsrManifest) {
            const isStatic = pathname
              ? staticIndicatorState.appIsrManifest[pathname]
              : undefined;
            _nextdevtools.dispatcher.onStaticIndicator(
              isStatic === undefined
                ? "pending"
                : isStatic
                  ? "static"
                  : "dynamic",
            );
          }
        }, [pathname, staticIndicatorState]);
      }
      return  (0, _jsxruntime.jsxs)(
        _appdevoverlayerrorboundary.AppDevOverlayErrorBoundary,
        {
          globalError: globalError,
          children: [
             (0, _jsxruntime.jsx)(
              _replayssronlyerrors.ReplaySsrOnlyErrors,
              {
                onBlockingError: _nextdevtools.dispatcher.openErrorOverlay,
              },
            ),
            children,
          ],
        },
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        createEmptyCacheNode: null,
        default: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      createEmptyCacheNode: function () {
        return createEmptyCacheNode;
      },
      default: function () {
        return AppRouter;
      },
    });
    const _interop_require_default = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)",
    );
    const _interop_require_wildcard = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)",
    );
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    const _react =  _interop_require_wildcard._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      ),
    );
    const _approutercontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)",
    );
    const _routerreducertypes = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/router-reducer-types.js [app-client] (ecmascript)",
    );
    const _createhreffromurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [app-client] (ecmascript)",
    );
    const _hooksclientcontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [app-client] (ecmascript)",
    );
    const _useactionqueue = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/use-action-queue.js [app-client] (ecmascript)",
    );
    const _approuterannouncer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-announcer.js [app-client] (ecmascript)",
    );
    const _redirectboundary = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect-boundary.js [app-client] (ecmascript)",
    );
    const _findheadincache = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/find-head-in-cache.js [app-client] (ecmascript)",
    );
    const _unresolvedthenable = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/unresolved-thenable.js [app-client] (ecmascript)",
    );
    const _removebasepath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/remove-base-path.js [app-client] (ecmascript)",
    );
    const _hasbasepath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)",
    );
    const _computechangedpath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/compute-changed-path.js [app-client] (ecmascript)",
    );
    const _navfailurehandler = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/nav-failure-handler.js [app-client] (ecmascript)",
    );
    const _approuterinstance = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)",
    );
    const _redirect = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect.js [app-client] (ecmascript)",
    );
    const _redirecterror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect-error.js [app-client] (ecmascript)",
    );
    const _links = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)",
    );
    const _rooterrorboundary =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/errors/root-error-boundary.js [app-client] (ecmascript)",
      ),
    );
    const _globalerror =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/builtin/global-error.js [app-client] (ecmascript)",
      ),
    );
    const _boundarycomponents = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/lib/framework/boundary-components.js [app-client] (ecmascript)",
    );
    const globalMutable = {};
    function HistoryUpdater({ appRouterState }) {
      (0, _react.useInsertionEffect)(() => {
        if (("TURBOPACK compile-time falsy", 0)) 
        ;
        const { tree, pushRef, canonicalUrl, renderedSearch } = appRouterState;
        const appHistoryState = {
          tree,
          renderedSearch,
        };
        const historyState = {
          ...(pushRef.preserveCustomHistoryState ? window.history.state : {}),
          
          
          
          __NA: true,
          __PRIVATE_NEXTJS_INTERNALS_TREE: appHistoryState,
        };
        if (
          pushRef.pendingPush && 
          
          (0, _createhreffromurl.createHrefFromUrl)(
            new URL(window.location.href),
          ) !== canonicalUrl
        ) {
          
          pushRef.pendingPush = false;
          window.history.pushState(historyState, "", canonicalUrl);
        } else {
          window.history.replaceState(historyState, "", canonicalUrl);
        }
      }, [appRouterState]);
      (0, _react.useEffect)(() => {
        
        
        
        
        (0, _links.pingVisibleLinks)(
          appRouterState.nextUrl,
          appRouterState.tree,
        );
      }, [appRouterState.nextUrl, appRouterState.tree]);
      return null;
    }
    function createEmptyCacheNode() {
      return {
        lazyData: null,
        rsc: null,
        prefetchRsc: null,
        head: null,
        prefetchHead: null,
        parallelRoutes: new Map(),
        loading: null,
        navigatedAt: -1,
      };
    }
    function copyNextJsInternalHistoryState(data) {
      if (data == null) data = {};
      const currentState = window.history.state;
      const __NA = currentState?.__NA;
      if (__NA) {
        data.__NA = __NA;
      }
      const __PRIVATE_NEXTJS_INTERNALS_TREE =
        currentState?.__PRIVATE_NEXTJS_INTERNALS_TREE;
      if (__PRIVATE_NEXTJS_INTERNALS_TREE) {
        data.__PRIVATE_NEXTJS_INTERNALS_TREE = __PRIVATE_NEXTJS_INTERNALS_TREE;
      }
      return data;
    }
    function Head({ headCacheNode }) {
      
      
      
      const head = headCacheNode !== null ? headCacheNode.head : null;
      const prefetchHead =
        headCacheNode !== null ? headCacheNode.prefetchHead : null;
      
      const resolvedPrefetchRsc = prefetchHead !== null ? prefetchHead : head;
      
      
      
      return (0, _react.useDeferredValue)(head, resolvedPrefetchRsc);
    }
    

 function Router({
      actionQueue,
      globalError,
      webSocket,
      staticIndicatorState,
    }) {
      const state = (0, _useactionqueue.useActionQueue)(actionQueue);
      const { canonicalUrl } = state;
      
      const { searchParams, pathname } = (0, _react.useMemo)(() => {
        const url = new URL(
          canonicalUrl,
          typeof window === "undefined" ? "http://n" : window.location.href,
        );
        return {
          
          searchParams: url.searchParams,
          pathname: (0, _hasbasepath.hasBasePath)(url.pathname)
            ? (0, _removebasepath.removeBasePath)(url.pathname)
            : url.pathname,
        };
      }, [canonicalUrl]);
      if (("TURBOPACK compile-time truthy", 1)) {
        const { cache, tree } = state;
        
        
        (0, _react.useEffect)(() => {
          
          
          
          window.nd = {
            router: _approuterinstance.publicAppRouterInstance,
            cache,
            tree,
          };
        }, [cache, tree]);
      }
      (0, _react.useEffect)(() => {
        
        
        
        
        function handlePageShow(event) {
          if (
            !event.persisted ||
            !window.history.state?.__PRIVATE_NEXTJS_INTERNALS_TREE
          ) {
            return;
          }
          
          
          
          globalMutable.pendingMpaPath = undefined;
          (0, _useactionqueue.dispatchAppRouterAction)({
            type: _routerreducertypes.ACTION_RESTORE,
            url: new URL(window.location.href),
            historyState: window.history.state.__PRIVATE_NEXTJS_INTERNALS_TREE,
          });
        }
        window.addEventListener("pageshow", handlePageShow);
        return () => {
          window.removeEventListener("pageshow", handlePageShow);
        };
      }, []);
      (0, _react.useEffect)(() => {
        
        
        function handleUnhandledRedirect(event) {
          const error = "reason" in event ? event.reason : event.error;
          if ((0, _redirecterror.isRedirectError)(error)) {
            event.preventDefault();
            const url = (0, _redirect.getURLFromRedirectError)(error);
            const redirectType = (0, _redirect.getRedirectTypeFromError)(error);
            
            
            if (redirectType === _redirecterror.RedirectType.push) {
              _approuterinstance.publicAppRouterInstance.push(url, {});
            } else {
              _approuterinstance.publicAppRouterInstance.replace(url, {});
            }
          }
        }
        window.addEventListener("error", handleUnhandledRedirect);
        window.addEventListener("unhandledrejection", handleUnhandledRedirect);
        return () => {
          window.removeEventListener("error", handleUnhandledRedirect);
          window.removeEventListener(
            "unhandledrejection",
            handleUnhandledRedirect,
          );
        };
      }, []);
      
      
      
      
      
      
      
      
      
      
      const { pushRef } = state;
      if (pushRef.mpaNavigation) {
        
        if (globalMutable.pendingMpaPath !== canonicalUrl) {
          const location = window.location;
          if (pushRef.pendingPush) {
            location.assign(canonicalUrl);
          } else {
            location.replace(canonicalUrl);
          }
          globalMutable.pendingMpaPath = canonicalUrl;
        }
        
        
        
        
        
        
        throw _unresolvedthenable.unresolvedThenable;
      }
      (0, _react.useEffect)(() => {
        const originalPushState = window.history.pushState.bind(window.history);
        const originalReplaceState = window.history.replaceState.bind(
          window.history,
        );
        
        const applyUrlFromHistoryPushReplace = (url) => {
          const href = window.location.href;
          const appHistoryState =
            window.history.state?.__PRIVATE_NEXTJS_INTERNALS_TREE;
          (0, _react.startTransition)(() => {
            (0, _useactionqueue.dispatchAppRouterAction)({
              type: _routerreducertypes.ACTION_RESTORE,
              url: new URL(url ?? href, href),
              historyState: appHistoryState,
            });
          });
        };
        



 window.history.pushState = function pushState(data, _unused, url) {
          
          if (data?.__NA || data?._N) {
            return originalPushState(data, _unused, url);
          }
          data = copyNextJsInternalHistoryState(data);
          if (url) {
            applyUrlFromHistoryPushReplace(url);
          }
          return originalPushState(data, _unused, url);
        };
        



 window.history.replaceState = function replaceState(
          data,
          _unused,
          url,
        ) {
          
          if (data?.__NA || data?._N) {
            return originalReplaceState(data, _unused, url);
          }
          data = copyNextJsInternalHistoryState(data);
          if (url) {
            applyUrlFromHistoryPushReplace(url);
          }
          return originalReplaceState(data, _unused, url);
        };
        



 const onPopState = (event) => {
          if (!event.state) {
            
            return;
          }
          
          if (!event.state.__NA) {
            window.location.reload();
            return;
          }
          
          
          (0, _react.startTransition)(() => {
            (0, _approuterinstance.dispatchTraverseAction)(
              window.location.href,
              event.state.__PRIVATE_NEXTJS_INTERNALS_TREE,
            );
          });
        };
        
        window.addEventListener("popstate", onPopState);
        return () => {
          window.history.pushState = originalPushState;
          window.history.replaceState = originalReplaceState;
          window.removeEventListener("popstate", onPopState);
        };
      }, []);
      const { cache, tree, nextUrl, focusAndScrollRef, previousNextUrl } =
        state;
      const matchingHead = (0, _react.useMemo)(() => {
        return (0, _findheadincache.findHeadInCache)(cache, tree[1]);
      }, [cache, tree]);
      
      const pathParams = (0, _react.useMemo)(() => {
        return (0, _computechangedpath.getSelectedParams)(tree);
      }, [tree]);
      
      
      
      let instrumentedNavigationPromises = null;
      if (("TURBOPACK compile-time truthy", 1)) {
        const { createRootNavigationPromises } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/navigation-devtools.js [app-client] (ecmascript)",
        );
        instrumentedNavigationPromises = createRootNavigationPromises(
          tree,
          pathname,
          searchParams,
          pathParams,
        );
      }
      const layoutRouterContext = (0, _react.useMemo)(() => {
        return {
          parentTree: tree,
          parentCacheNode: cache,
          parentSegmentPath: null,
          parentParams: {},
          
          
          debugNameContext: "/",
          
          
          url: canonicalUrl,
          
          isActive: true,
        };
      }, [tree, cache, canonicalUrl]);
      const globalLayoutRouterContext = (0, _react.useMemo)(() => {
        return {
          tree,
          focusAndScrollRef,
          nextUrl,
          previousNextUrl,
        };
      }, [tree, focusAndScrollRef, nextUrl, previousNextUrl]);
      let head;
      if (matchingHead !== null) {
        
        
        
        
        
        
        const [headCacheNode, headKey, headKeyWithoutSearchParams] =
          matchingHead;
        head =  (0, _jsxruntime.jsx)(
          Head,
          {
            headCacheNode: headCacheNode,
          },
          typeof window === "undefined" ? headKeyWithoutSearchParams : headKey,
        );
      } else {
        head = null;
      }
      let content =  (0, _jsxruntime.jsxs)(
        _redirectboundary.RedirectBoundary,
        {
          children: [
            head,
             (0, _jsxruntime.jsx)(
              _boundarycomponents.RootLayoutBoundary,
              {
                children: cache.rsc,
              },
            ),
             (0, _jsxruntime.jsx)(
              _approuterannouncer.AppRouterAnnouncer,
              {
                tree: tree,
              },
            ),
          ],
        },
      );
      if (("TURBOPACK compile-time truthy", 1)) {
        
        
        
        
        
        
        if (typeof window !== "undefined") {
          const { DevRootHTTPAccessFallbackBoundary } = __turbopack_context__.r(
            "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/dev-root-http-access-fallback-boundary.js [app-client] (ecmascript)",
          );
          content =  (0, _jsxruntime.jsx)(
            DevRootHTTPAccessFallbackBoundary,
            {
              children: content,
            },
          );
        }
        const HotReloader = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/hot-reloader/app/hot-reloader-app.js [app-client] (ecmascript)",
        ).default;
        content =  (0, _jsxruntime.jsx)(HotReloader, {
          globalError: globalError,
          webSocket: webSocket,
          staticIndicatorState: staticIndicatorState,
          children: content,
        });
      } 
      else;
      return  (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
           (0, _jsxruntime.jsx)(HistoryUpdater, {
            appRouterState: state,
          }),
           (0, _jsxruntime.jsx)(RuntimeStyles, {}),
           (0, _jsxruntime.jsx)(
            _hooksclientcontextsharedruntime.NavigationPromisesContext.Provider,
            {
              value: instrumentedNavigationPromises,
              children:  (0, _jsxruntime.jsx)(
                _hooksclientcontextsharedruntime.PathParamsContext.Provider,
                {
                  value: pathParams,
                  children:  (0, _jsxruntime.jsx)(
                    _hooksclientcontextsharedruntime.PathnameContext.Provider,
                    {
                      value: pathname,
                      children:  (0, _jsxruntime.jsx)(
                        _hooksclientcontextsharedruntime.SearchParamsContext
                          .Provider,
                        {
                          value: searchParams,
                          children:  (0, _jsxruntime.jsx)(
                            _approutercontextsharedruntime
                              .GlobalLayoutRouterContext.Provider,
                            {
                              value: globalLayoutRouterContext,
                              children:  (0, _jsxruntime.jsx)(
                                _approutercontextsharedruntime.AppRouterContext
                                  .Provider,
                                {
                                  value:
                                    _approuterinstance.publicAppRouterInstance,
                                  children:  (0, _jsxruntime.jsx)(
                                    _approutercontextsharedruntime
                                      .LayoutRouterContext.Provider,
                                    {
                                      value: layoutRouterContext,
                                      children: content,
                                    },
                                  ),
                                },
                              ),
                            },
                          ),
                        },
                      ),
                    },
                  ),
                },
              ),
            },
          ),
        ],
      });
    }
    function AppRouter({
      actionQueue,
      globalErrorState,
      webSocket,
      staticIndicatorState,
    }) {
      (0, _navfailurehandler.useNavFailureHandler)();
      const router =  (0, _jsxruntime.jsx)(Router, {
        actionQueue: actionQueue,
        globalError: globalErrorState,
        webSocket: webSocket,
        staticIndicatorState: staticIndicatorState,
      });
      
      
      return  (0, _jsxruntime.jsx)(_rooterrorboundary.default, {
        errorComponent: _globalerror.default,
        children: router,
      });
    }
    const runtimeStyles = new Set();
    let runtimeStyleChanged = new Set();
    globalThis._N_E_STYLE_LOAD = function (href) {
      let len = runtimeStyles.size;
      runtimeStyles.add(href);
      if (runtimeStyles.size !== len) {
        runtimeStyleChanged.forEach((cb) => cb());
      }
      
      
      return Promise.resolve();
    };
    function RuntimeStyles() {
      const [, forceUpdate] = _react.default.useState(0);
      const renderedStylesSize = runtimeStyles.size;
      (0, _react.useEffect)(() => {
        const changed = () => forceUpdate((c) => c + 1);
        runtimeStyleChanged.add(changed);
        if (renderedStylesSize !== runtimeStyles.size) {
          changed();
        }
        return () => {
          runtimeStyleChanged.delete(changed);
        };
      }, [renderedStylesSize, forceUpdate]);
      const dplId = ("TURBOPACK compile-time falsy", 0)
        ? "TURBOPACK unreachable"
        : "";
      return [...runtimeStyles].map((href, i) =>
         (0, _jsxruntime.jsx)(
          "link",
          {
            rel: "stylesheet",
            href: `${href}${dplId}`,
            
            precedence: "next",
          },
          i,
        ),
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/server-patch-reducer.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "serverPatchReducer", {
      enumerable: true,
      get: function () {
        return serverPatchReducer;
      },
    });
    const _createhreffromurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [app-client] (ecmascript)",
    );
    const _applyrouterstatepatchtotree = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/apply-router-state-patch-to-tree.js [app-client] (ecmascript)",
    );
    const _isnavigatingtonewrootlayout = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/is-navigating-to-new-root-layout.js [app-client] (ecmascript)",
    );
    const _navigatereducer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/navigate-reducer.js [app-client] (ecmascript)",
    );
    const _applyflightdata = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/apply-flight-data.js [app-client] (ecmascript)",
    );
    const _handlemutable = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/handle-mutable.js [app-client] (ecmascript)",
    );
    const _approuter = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router.js [app-client] (ecmascript)",
    );
    function serverPatchReducer(state, action) {
      const { serverResponse, navigatedAt } = action;
      const mutable = {};
      mutable.preserveCustomHistoryState = false;
      
      if (typeof serverResponse === "string") {
        return (0, _navigatereducer.handleExternalUrl)(
          state,
          mutable,
          serverResponse,
          state.pushRef.pendingPush,
        );
      }
      const { flightData, canonicalUrl, renderedSearch } = serverResponse;
      let currentTree = state.tree;
      let currentCache = state.cache;
      for (const normalizedFlightData of flightData) {
        const { segmentPath: flightSegmentPath, tree: treePatch } =
          normalizedFlightData;
        const newTree = (0,
        _applyrouterstatepatchtotree.applyRouterStatePatchToTree)(
          ["", ...flightSegmentPath],
          currentTree,
          treePatch,
          state.canonicalUrl,
        );
        
        
        
        
        
        if (newTree === null) {
          return state;
        }
        if (
          (0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(
            currentTree,
            newTree,
          )
        ) {
          return (0, _navigatereducer.handleExternalUrl)(
            state,
            mutable,
            state.canonicalUrl,
            state.pushRef.pendingPush,
          );
        }
        mutable.canonicalUrl = (0, _createhreffromurl.createHrefFromUrl)(
          canonicalUrl,
        );
        const cache = (0, _approuter.createEmptyCacheNode)();
        (0, _applyflightdata.applyFlightData)(
          navigatedAt,
          currentCache,
          cache,
          normalizedFlightData,
        );
        mutable.patchedTree = newTree;
        mutable.renderedSearch = renderedSearch;
        mutable.cache = cache;
        currentCache = cache;
        currentTree = newTree;
      }
      return (0, _handlemutable.handleMutable)(state, mutable);
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/restore-reducer.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "restoreReducer", {
      enumerable: true,
      get: function () {
        return restoreReducer;
      },
    });
    const _createhreffromurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [app-client] (ecmascript)",
    );
    const _computechangedpath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/compute-changed-path.js [app-client] (ecmascript)",
    );
    const _pprnavigations = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/ppr-navigations.js [app-client] (ecmascript)",
    );
    function restoreReducer(state, action) {
      const { url, historyState } = action;
      const href = (0, _createhreffromurl.createHrefFromUrl)(url);
      
      
      
      
      
      
      let treeToRestore;
      let renderedSearch;
      if (historyState) {
        treeToRestore = historyState.tree;
        renderedSearch = historyState.renderedSearch;
      } else {
        treeToRestore = state.tree;
        renderedSearch = state.renderedSearch;
      }
      const oldCache = state.cache;
      const newCache = ("TURBOPACK compile-time falsy", 0) 
        ? 
          "TURBOPACK unreachable"
        : oldCache;
      return {
        
        canonicalUrl: href,
        renderedSearch,
        pushRef: {
          pendingPush: false,
          mpaNavigation: false,
          
          preserveCustomHistoryState: true,
        },
        focusAndScrollRef: state.focusAndScrollRef,
        cache: newCache,
        
        tree: treeToRestore,
        nextUrl:
          (0, _computechangedpath.extractPathFromFlightRouterState)(
            treeToRestore,
          ) ?? url.pathname,
        previousNextUrl: null,
        debugInfo: null,
      };
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/handle-segment-mismatch.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "handleSegmentMismatch", {
      enumerable: true,
      get: function () {
        return handleSegmentMismatch;
      },
    });
    const _navigatereducer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/navigate-reducer.js [app-client] (ecmascript)",
    );
    function handleSegmentMismatch(state, action, treePatch) {
      if (("TURBOPACK compile-time truthy", 1)) {
        console.warn(
          "Performing hard navigation because your application experienced an unrecoverable error. If this keeps occurring, please file a Next.js issue.\n\n" +
            "Reason: Segment mismatch\n" +
            `Last Action: ${action.type}\n\n` +
            `Current Tree: ${JSON.stringify(state.tree)}\n\n` +
            `Tree Patch Payload: ${JSON.stringify(treePatch)}`,
        );
      }
      return (0, _navigatereducer.handleExternalUrl)(
        state,
        {},
        state.canonicalUrl,
        true,
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/has-interception-route-in-current-tree.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "hasInterceptionRouteInCurrentTree", {
      enumerable: true,
      get: function () {
        return hasInterceptionRouteInCurrentTree;
      },
    });
    const _interceptionroutes = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/interception-routes.js [app-client] (ecmascript)",
    );
    function hasInterceptionRouteInCurrentTree([segment, parallelRoutes]) {
      
      if (
        Array.isArray(segment) &&
        (segment[2] === "di(..)(..)" ||
          segment[2] === "ci(..)(..)" ||
          segment[2] === "di(.)" ||
          segment[2] === "ci(.)" ||
          segment[2] === "di(..)" ||
          segment[2] === "ci(..)" ||
          segment[2] === "di(...)" ||
          segment[2] === "ci(...)")
      ) {
        return true;
      }
      
      if (
        typeof segment === "string" &&
        (0, _interceptionroutes.isInterceptionRouteAppPath)(segment)
      ) {
        return true;
      }
      
      if (parallelRoutes) {
        for (const key in parallelRoutes) {
          if (hasInterceptionRouteInCurrentTree(parallelRoutes[key])) {
            return true;
          }
        }
      }
      return false;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/refresh-reducer.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "refreshReducer", {
      enumerable: true,
      get: function () {
        return refreshReducer;
      },
    });
    const _fetchserverresponse = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fetch-server-response.js [app-client] (ecmascript)",
    );
    const _createhreffromurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [app-client] (ecmascript)",
    );
    const _applyrouterstatepatchtotree = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/apply-router-state-patch-to-tree.js [app-client] (ecmascript)",
    );
    const _isnavigatingtonewrootlayout = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/is-navigating-to-new-root-layout.js [app-client] (ecmascript)",
    );
    const _navigatereducer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/navigate-reducer.js [app-client] (ecmascript)",
    );
    const _handlemutable = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/handle-mutable.js [app-client] (ecmascript)",
    );
    const _filllazyitemstillleafwithhead = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fill-lazy-items-till-leaf-with-head.js [app-client] (ecmascript)",
    );
    const _approuter = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router.js [app-client] (ecmascript)",
    );
    const _handlesegmentmismatch = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/handle-segment-mismatch.js [app-client] (ecmascript)",
    );
    const _hasinterceptionrouteincurrenttree = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/has-interception-route-in-current-tree.js [app-client] (ecmascript)",
    );
    const _refetchinactiveparallelsegments = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/refetch-inactive-parallel-segments.js [app-client] (ecmascript)",
    );
    const _cache = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache.js [app-client] (ecmascript)",
    );
    function refreshReducer(state, action) {
      const { origin } = action;
      const mutable = {};
      const href = state.canonicalUrl;
      let currentTree = state.tree;
      mutable.preserveCustomHistoryState = false;
      const cache = (0, _approuter.createEmptyCacheNode)();
      
      
      const includeNextUrl = (0,
      _hasinterceptionrouteincurrenttree.hasInterceptionRouteInCurrentTree)(
        state.tree,
      );
      
      
      cache.lazyData = (0, _fetchserverresponse.fetchServerResponse)(
        new URL(href, origin),
        {
          flightRouterState: [
            currentTree[0],
            currentTree[1],
            currentTree[2],
            "refetch",
          ],
          nextUrl: includeNextUrl ? state.nextUrl : null,
        },
      );
      const navigatedAt = Date.now();
      return cache.lazyData.then(
        async (result) => {
          
          if (typeof result === "string") {
            return (0, _navigatereducer.handleExternalUrl)(
              state,
              mutable,
              result,
              state.pushRef.pendingPush,
            );
          }
          const { flightData, canonicalUrl, renderedSearch } = result;
          
          cache.lazyData = null;
          for (const normalizedFlightData of flightData) {
            const {
              tree: treePatch,
              seedData: cacheNodeSeedData,
              head,
              isRootRender,
            } = normalizedFlightData;
            if (!isRootRender) {
              
              console.log("REFRESH FAILED");
              return state;
            }
            const newTree = (0,
            _applyrouterstatepatchtotree.applyRouterStatePatchToTree)(
              [""],
              currentTree,
              treePatch,
              state.canonicalUrl,
            );
            if (newTree === null) {
              return (0, _handlesegmentmismatch.handleSegmentMismatch)(
                state,
                action,
                treePatch,
              );
            }
            if (
              (0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(
                currentTree,
                newTree,
              )
            ) {
              return (0, _navigatereducer.handleExternalUrl)(
                state,
                mutable,
                href,
                state.pushRef.pendingPush,
              );
            }
            mutable.canonicalUrl = (0, _createhreffromurl.createHrefFromUrl)(
              canonicalUrl,
            );
            
            if (cacheNodeSeedData !== null) {
              const rsc = cacheNodeSeedData[0];
              const loading = cacheNodeSeedData[2];
              cache.rsc = rsc;
              cache.prefetchRsc = null;
              cache.loading = loading;
              (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(
                navigatedAt,
                cache,
                undefined,
                treePatch,
                cacheNodeSeedData,
                head,
              );
              (0, _cache.revalidateEntireCache)(state.nextUrl, newTree);
            }
            await (0,
            _refetchinactiveparallelsegments.refreshInactiveParallelSegments)({
              navigatedAt,
              state,
              updatedTree: newTree,
              updatedCache: cache,
              includeNextUrl,
              canonicalUrl: mutable.canonicalUrl || state.canonicalUrl,
            });
            mutable.cache = cache;
            mutable.patchedTree = newTree;
            mutable.renderedSearch = renderedSearch;
            currentTree = newTree;
          }
          return (0, _handlemutable.handleMutable)(state, mutable);
        },
        () => state,
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/hmr-refresh-reducer.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "hmrRefreshReducer", {
      enumerable: true,
      get: function () {
        return hmrRefreshReducer;
      },
    });
    const _fetchserverresponse = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fetch-server-response.js [app-client] (ecmascript)",
    );
    const _createhreffromurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [app-client] (ecmascript)",
    );
    const _applyrouterstatepatchtotree = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/apply-router-state-patch-to-tree.js [app-client] (ecmascript)",
    );
    const _isnavigatingtonewrootlayout = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/is-navigating-to-new-root-layout.js [app-client] (ecmascript)",
    );
    const _navigatereducer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/navigate-reducer.js [app-client] (ecmascript)",
    );
    const _handlemutable = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/handle-mutable.js [app-client] (ecmascript)",
    );
    const _applyflightdata = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/apply-flight-data.js [app-client] (ecmascript)",
    );
    const _approuter = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router.js [app-client] (ecmascript)",
    );
    const _handlesegmentmismatch = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/handle-segment-mismatch.js [app-client] (ecmascript)",
    );
    const _hasinterceptionrouteincurrenttree = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/has-interception-route-in-current-tree.js [app-client] (ecmascript)",
    );
    
    function hmrRefreshReducerImpl(state, action) {
      const { origin } = action;
      const mutable = {};
      const href = state.canonicalUrl;
      mutable.preserveCustomHistoryState = false;
      const cache = (0, _approuter.createEmptyCacheNode)();
      
      
      const includeNextUrl = (0,
      _hasinterceptionrouteincurrenttree.hasInterceptionRouteInCurrentTree)(
        state.tree,
      );
      
      
      const navigatedAt = Date.now();
      cache.lazyData = (0, _fetchserverresponse.fetchServerResponse)(
        new URL(href, origin),
        {
          flightRouterState: [
            state.tree[0],
            state.tree[1],
            state.tree[2],
            "refetch",
          ],
          nextUrl: includeNextUrl ? state.nextUrl : null,
          isHmrRefresh: true,
        },
      );
      return cache.lazyData.then(
        (result) => {
          
          if (typeof result === "string") {
            return (0, _navigatereducer.handleExternalUrl)(
              state,
              mutable,
              result,
              state.pushRef.pendingPush,
            );
          }
          const { flightData, canonicalUrl, renderedSearch } = result;
          
          cache.lazyData = null;
          let currentTree = state.tree;
          let currentCache = state.cache;
          for (const normalizedFlightData of flightData) {
            const { tree: treePatch, isRootRender } = normalizedFlightData;
            if (!isRootRender) {
              
              console.log("REFRESH FAILED");
              return state;
            }
            const newTree = (0,
            _applyrouterstatepatchtotree.applyRouterStatePatchToTree)(
              [""],
              currentTree,
              treePatch,
              state.canonicalUrl,
            );
            if (newTree === null) {
              return (0, _handlesegmentmismatch.handleSegmentMismatch)(
                state,
                action,
                treePatch,
              );
            }
            if (
              (0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(
                currentTree,
                newTree,
              )
            ) {
              return (0, _navigatereducer.handleExternalUrl)(
                state,
                mutable,
                href,
                state.pushRef.pendingPush,
              );
            }
            const applied = (0, _applyflightdata.applyFlightData)(
              navigatedAt,
              currentCache,
              cache,
              normalizedFlightData,
            );
            if (applied) {
              mutable.cache = cache;
              currentCache = cache;
            }
            mutable.patchedTree = newTree;
            mutable.renderedSearch = renderedSearch;
            mutable.canonicalUrl = (0, _createhreffromurl.createHrefFromUrl)(
              canonicalUrl,
            );
            currentTree = newTree;
          }
          return (0, _handlemutable.handleMutable)(state, mutable);
        },
        () => state,
      );
    }
    function hmrRefreshReducerNoop(state, _action) {
      return state;
    }
    const hmrRefreshReducer = ("TURBOPACK compile-time falsy", 0)
      ? "TURBOPACK unreachable"
      : hmrRefreshReducerImpl;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/assign-location.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "assignLocation", {
      enumerable: true,
      get: function () {
        return assignLocation;
      },
    });
    const _addbasepath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)",
    );
    function assignLocation(location, url) {
      if (location.startsWith(".")) {
        const urlBase = url.origin + url.pathname;
        return new URL( 
          
          (urlBase.endsWith("/") ? urlBase : urlBase + "/") + location,
        );
      }
      return new URL((0, _addbasepath.addBasePath)(location), url.href);
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/server-action-reducer.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "serverActionReducer", {
      enumerable: true,
      get: function () {
        return serverActionReducer;
      },
    });
    const _appcallserver = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-call-server.js [app-client] (ecmascript)",
    );
    const _appfindsourcemapurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-find-source-map-url.js [app-client] (ecmascript)",
    );
    const _approuterheaders = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-headers.js [app-client] (ecmascript)",
    );
    const _unrecognizedactionerror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/unrecognized-action-error.js [app-client] (ecmascript)",
    );
    const _client = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react-server-dom-turbopack/client.js [app-client] (ecmascript)",
    );
    const _assignlocation = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/assign-location.js [app-client] (ecmascript)",
    );
    const _createhreffromurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [app-client] (ecmascript)",
    );
    const _navigatereducer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/navigate-reducer.js [app-client] (ecmascript)",
    );
    const _applyrouterstatepatchtotree = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/apply-router-state-patch-to-tree.js [app-client] (ecmascript)",
    );
    const _isnavigatingtonewrootlayout = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/is-navigating-to-new-root-layout.js [app-client] (ecmascript)",
    );
    const _handlemutable = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/handle-mutable.js [app-client] (ecmascript)",
    );
    const _filllazyitemstillleafwithhead = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fill-lazy-items-till-leaf-with-head.js [app-client] (ecmascript)",
    );
    const _approuter = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router.js [app-client] (ecmascript)",
    );
    const _hasinterceptionrouteincurrenttree = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/has-interception-route-in-current-tree.js [app-client] (ecmascript)",
    );
    const _handlesegmentmismatch = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/handle-segment-mismatch.js [app-client] (ecmascript)",
    );
    const _refetchinactiveparallelsegments = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/refetch-inactive-parallel-segments.js [app-client] (ecmascript)",
    );
    const _flightdatahelpers = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/flight-data-helpers.js [app-client] (ecmascript)",
    );
    const _redirect = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect.js [app-client] (ecmascript)",
    );
    const _redirecterror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect-error.js [app-client] (ecmascript)",
    );
    const _removebasepath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/remove-base-path.js [app-client] (ecmascript)",
    );
    const _hasbasepath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)",
    );
    const _serverreferenceinfo = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/server-reference-info.js [app-client] (ecmascript)",
    );
    const _cache = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache.js [app-client] (ecmascript)",
    );
    const createFromFetch = _client.createFromFetch;
    let createDebugChannel;
    if (("TURBOPACK compile-time falsy", 0)) 
    ;
    async function fetchServerAction(state, nextUrl, { actionId, actionArgs }) {
      const temporaryReferences = (0, _client.createTemporaryReferenceSet)();
      const info = (0, _serverreferenceinfo.extractInfoFromServerReferenceId)(
        actionId,
      );
      
      
      
      const usedArgs =
        info.type === "use-cache"
          ? (0, _serverreferenceinfo.omitUnusedArgs)(actionArgs, info)
          : actionArgs;
      const body = await (0, _client.encodeReply)(usedArgs, {
        temporaryReferences,
      });
      const headers = {
        Accept: _approuterheaders.RSC_CONTENT_TYPE_HEADER,
        [_approuterheaders.ACTION_HEADER]: actionId,
        [_approuterheaders.NEXT_ROUTER_STATE_TREE_HEADER]: (0,
        _flightdatahelpers.prepareFlightRouterStateForRequest)(state.tree),
      };
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
      if (nextUrl) {
        headers[_approuterheaders.NEXT_URL] = nextUrl;
      }
      if (("TURBOPACK compile-time truthy", 1)) {
        if (self.__next_r) {
          headers[_approuterheaders.NEXT_HTML_REQUEST_ID_HEADER] =
            self.__next_r;
        }
        
        
        
        headers[_approuterheaders.NEXT_REQUEST_ID_HEADER] = crypto
          .getRandomValues(new Uint32Array(1))[0]
          .toString(16);
      }
      const res = await fetch(state.canonicalUrl, {
        method: "POST",
        headers,
        body,
      });
      
      const unrecognizedActionHeader = res.headers.get(
        _approuterheaders.NEXT_ACTION_NOT_FOUND_HEADER,
      );
      if (unrecognizedActionHeader === "1") {
        throw Object.defineProperty(
          new _unrecognizedactionerror.UnrecognizedActionError(
            `Server Action "${actionId}" was not found on the server. \nRead more: https://nextjs.org/docs/messages/failed-to-find-server-action`,
          ),
          "__NEXT_ERROR_CODE",
          {
            value: "E715",
            enumerable: false,
            configurable: true,
          },
        );
      }
      const redirectHeader = res.headers.get("x-action-redirect");
      const [location, _redirectType] = redirectHeader?.split(";") || [];
      let redirectType;
      switch (_redirectType) {
        case "push":
          redirectType = _redirecterror.RedirectType.push;
          break;
        case "replace":
          redirectType = _redirecterror.RedirectType.replace;
          break;
        default:
          redirectType = undefined;
      }
      const isPrerender = !!res.headers.get(
        _approuterheaders.NEXT_IS_PRERENDER_HEADER,
      );
      let revalidatedParts;
      try {
        const revalidatedHeader = JSON.parse(
          res.headers.get("x-action-revalidated") || "[[],0,0]",
        );
        revalidatedParts = {
          paths: revalidatedHeader[0] || [],
          tag: !!revalidatedHeader[1],
          cookie: revalidatedHeader[2],
        };
      } catch (e) {
        revalidatedParts = NO_REVALIDATED_PARTS;
      }
      const redirectLocation = location
        ? (0, _assignlocation.assignLocation)(
            location,
            new URL(state.canonicalUrl, window.location.href),
          )
        : undefined;
      const contentType = res.headers.get("content-type");
      const isRscResponse = !!(
        contentType &&
        contentType.startsWith(_approuterheaders.RSC_CONTENT_TYPE_HEADER)
      );
      
      
      
      if (!isRscResponse && !redirectLocation) {
        
        
        const message =
          res.status >= 400 && contentType === "text/plain"
            ? await res.text()
            : "An unexpected response was received from the server.";
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
          value: "E394",
          enumerable: false,
          configurable: true,
        });
      }
      let actionResult;
      let actionFlightData;
      if (isRscResponse) {
        const response = await createFromFetch(Promise.resolve(res), {
          callServer: _appcallserver.callServer,
          findSourceMapURL: _appfindsourcemapurl.findSourceMapURL,
          temporaryReferences,
          debugChannel: createDebugChannel && createDebugChannel(headers),
        });
        
        actionResult = redirectLocation ? undefined : response.a;
        actionFlightData = (0, _flightdatahelpers.normalizeFlightData)(
          response.f,
        );
      } else {
        
        actionResult = undefined;
        actionFlightData = undefined;
      }
      return {
        actionResult,
        actionFlightData,
        redirectLocation,
        redirectType,
        revalidatedParts,
        isPrerender,
      };
    }
    const NO_REVALIDATED_PARTS = {
      paths: [],
      tag: false,
      cookie: false,
    };
    function serverActionReducer(state, action) {
      const { resolve, reject } = action;
      const mutable = {};
      let currentTree = state.tree;
      mutable.preserveCustomHistoryState = false;
      
      
      
      
      const nextUrl = 
        
        
        
        (state.previousNextUrl || state.nextUrl) &&
        (0,
        _hasinterceptionrouteincurrenttree.hasInterceptionRouteInCurrentTree)(
          state.tree,
        )
          ? state.previousNextUrl || state.nextUrl
          : null;
      const navigatedAt = Date.now();
      return fetchServerAction(state, nextUrl, action).then(
        async ({
          actionResult,
          actionFlightData: flightData,
          redirectLocation,
          redirectType,
          revalidatedParts,
        }) => {
          let redirectHref;
          
          if (redirectLocation) {
            if (redirectType === _redirecterror.RedirectType.replace) {
              state.pushRef.pendingPush = false;
              mutable.pendingPush = false;
            } else {
              state.pushRef.pendingPush = true;
              mutable.pendingPush = true;
            }
            redirectHref = (0, _createhreffromurl.createHrefFromUrl)(
              redirectLocation,
              false,
            );
            mutable.canonicalUrl = redirectHref;
          }
          if (!flightData) {
            resolve(actionResult);
            
            if (redirectLocation) {
              return (0, _navigatereducer.handleExternalUrl)(
                state,
                mutable,
                redirectLocation.href,
                state.pushRef.pendingPush,
              );
            }
            return state;
          }
          if (typeof flightData === "string") {
            
            resolve(actionResult);
            return (0, _navigatereducer.handleExternalUrl)(
              state,
              mutable,
              flightData,
              state.pushRef.pendingPush,
            );
          }
          const actionRevalidated =
            revalidatedParts.paths.length > 0 ||
            revalidatedParts.tag ||
            revalidatedParts.cookie;
          
          
          
          
          if (actionRevalidated) {
            action.didRevalidate = true;
          }
          for (const normalizedFlightData of flightData) {
            const {
              tree: treePatch,
              seedData: cacheNodeSeedData,
              head,
              isRootRender,
            } = normalizedFlightData;
            if (!isRootRender) {
              
              console.log("SERVER ACTION APPLY FAILED");
              resolve(actionResult);
              return state;
            }
            
            const newTree = (0,
            _applyrouterstatepatchtotree.applyRouterStatePatchToTree)(
              [""],
              currentTree,
              treePatch,
              redirectHref ? redirectHref : state.canonicalUrl,
            );
            if (newTree === null) {
              resolve(actionResult);
              return (0, _handlesegmentmismatch.handleSegmentMismatch)(
                state,
                action,
                treePatch,
              );
            }
            if (
              (0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(
                currentTree,
                newTree,
              )
            ) {
              resolve(actionResult);
              return (0, _navigatereducer.handleExternalUrl)(
                state,
                mutable,
                redirectHref || state.canonicalUrl,
                state.pushRef.pendingPush,
              );
            }
            
            if (cacheNodeSeedData !== null) {
              const rsc = cacheNodeSeedData[0];
              const cache = (0, _approuter.createEmptyCacheNode)();
              cache.rsc = rsc;
              cache.prefetchRsc = null;
              cache.loading = cacheNodeSeedData[2];
              (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(
                navigatedAt,
                cache,
                undefined,
                treePatch,
                cacheNodeSeedData,
                head,
              );
              mutable.cache = cache;
              (0, _cache.revalidateEntireCache)(state.nextUrl, newTree);
              if (actionRevalidated) {
                await (0,
                _refetchinactiveparallelsegments.refreshInactiveParallelSegments)(
                  {
                    navigatedAt,
                    state,
                    updatedTree: newTree,
                    updatedCache: cache,
                    includeNextUrl: Boolean(nextUrl),
                    canonicalUrl: mutable.canonicalUrl || state.canonicalUrl,
                  },
                );
              }
            }
            mutable.patchedTree = newTree;
            currentTree = newTree;
          }
          if (redirectLocation && redirectHref) {
            
            
            
            
            
            
            const redirectError = (0, _redirect.getRedirectError)(
              (0, _hasbasepath.hasBasePath)(redirectHref)
                ? (0, _removebasepath.removeBasePath)(redirectHref)
                : redirectHref,
              redirectType || _redirecterror.RedirectType.push,
            );
            redirectError.handled = true;
            reject(redirectError);
          } else {
            resolve(actionResult);
          }
          return (0, _handlemutable.handleMutable)(state, mutable);
        },
        (e) => {
          
          reject(e);
          return state;
        },
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/router-reducer.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "reducer", {
      enumerable: true,
      get: function () {
        return reducer;
      },
    });
    const _routerreducertypes = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/router-reducer-types.js [app-client] (ecmascript)",
    );
    const _navigatereducer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/navigate-reducer.js [app-client] (ecmascript)",
    );
    const _serverpatchreducer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/server-patch-reducer.js [app-client] (ecmascript)",
    );
    const _restorereducer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/restore-reducer.js [app-client] (ecmascript)",
    );
    const _refreshreducer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/refresh-reducer.js [app-client] (ecmascript)",
    );
    const _hmrrefreshreducer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/hmr-refresh-reducer.js [app-client] (ecmascript)",
    );
    const _serveractionreducer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/server-action-reducer.js [app-client] (ecmascript)",
    );
    

 function clientReducer(state, action) {
      switch (action.type) {
        case _routerreducertypes.ACTION_NAVIGATE: {
          return (0, _navigatereducer.navigateReducer)(state, action);
        }
        case _routerreducertypes.ACTION_SERVER_PATCH: {
          return (0, _serverpatchreducer.serverPatchReducer)(state, action);
        }
        case _routerreducertypes.ACTION_RESTORE: {
          return (0, _restorereducer.restoreReducer)(state, action);
        }
        case _routerreducertypes.ACTION_REFRESH: {
          return (0, _refreshreducer.refreshReducer)(state, action);
        }
        case _routerreducertypes.ACTION_HMR_REFRESH: {
          return (0, _hmrrefreshreducer.hmrRefreshReducer)(state, action);
        }
        case _routerreducertypes.ACTION_SERVER_ACTION: {
          return (0, _serveractionreducer.serverActionReducer)(state, action);
        }
        
        default:
          throw Object.defineProperty(
            new Error("Unknown action"),
            "__NEXT_ERROR_CODE",
            {
              value: "E295",
              enumerable: false,
              configurable: true,
            },
          );
      }
    }
    function serverReducer(state, _action) {
      return state;
    }
    const reducer =
      typeof window === "undefined" ? serverReducer : clientReducer;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/prefetch.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "prefetch", {
      enumerable: true,
      get: function () {
        return prefetch;
      },
    });
    const _approuterutils = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-utils.js [app-client] (ecmascript)",
    );
    const _cachekey = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/cache-key.js [app-client] (ecmascript)",
    );
    const _scheduler = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/scheduler.js [app-client] (ecmascript)",
    );
    const _types = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)",
    );
    function prefetch(
      href,
      nextUrl,
      treeAtTimeOfPrefetch,
      fetchStrategy,
      onInvalidate,
    ) {
      const url = (0, _approuterutils.createPrefetchURL)(href);
      if (url === null) {
        
        return;
      }
      const cacheKey = (0, _cachekey.createCacheKey)(url.href, nextUrl);
      (0, _scheduler.schedulePrefetchTask)(
        cacheKey,
        treeAtTimeOfPrefetch,
        fetchStrategy,
        _types.PrefetchPriority.Default,
        onInvalidate,
      );
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        createMutableActionQueue: null,
        dispatchNavigateAction: null,
        dispatchTraverseAction: null,
        getCurrentAppRouterState: null,
        publicAppRouterInstance: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      createMutableActionQueue: function () {
        return createMutableActionQueue;
      },
      dispatchNavigateAction: function () {
        return dispatchNavigateAction;
      },
      dispatchTraverseAction: function () {
        return dispatchTraverseAction;
      },
      getCurrentAppRouterState: function () {
        return getCurrentAppRouterState;
      },
      publicAppRouterInstance: function () {
        return publicAppRouterInstance;
      },
    });
    const _routerreducertypes = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/router-reducer-types.js [app-client] (ecmascript)",
    );
    const _routerreducer = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/router-reducer.js [app-client] (ecmascript)",
    );
    const _react = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
    );
    const _isthenable = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/is-thenable.js [app-client] (ecmascript)",
    );
    const _types = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/types.js [app-client] (ecmascript)",
    );
    const _prefetch = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/segment-cache/prefetch.js [app-client] (ecmascript)",
    );
    const _useactionqueue = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/use-action-queue.js [app-client] (ecmascript)",
    );
    const _addbasepath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)",
    );
    const _approuterutils = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-utils.js [app-client] (ecmascript)",
    );
    const _links = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)",
    );
    function runRemainingActions(actionQueue, setState) {
      if (actionQueue.pending !== null) {
        actionQueue.pending = actionQueue.pending.next;
        if (actionQueue.pending !== null) {
          runAction({
            actionQueue,
            action: actionQueue.pending,
            setState,
          });
        }
      } else {
        
        
        
        if (actionQueue.needsRefresh) {
          actionQueue.needsRefresh = false;
          actionQueue.dispatch(
            {
              type: _routerreducertypes.ACTION_REFRESH,
              origin: window.location.origin,
            },
            setState,
          );
        }
      }
    }
    async function runAction({ actionQueue, action, setState }) {
      const prevState = actionQueue.state;
      actionQueue.pending = action;
      const payload = action.payload;
      const actionResult = actionQueue.action(prevState, payload);
      function handleResult(nextState) {
        
        if (action.discarded) {
          
          if (
            action.payload.type === _routerreducertypes.ACTION_SERVER_ACTION &&
            action.payload.didRevalidate
          ) {
            
            
            actionQueue.needsRefresh = true;
          }
          
          
          runRemainingActions(actionQueue, setState);
          return;
        }
        actionQueue.state = nextState;
        runRemainingActions(actionQueue, setState);
        action.resolve(nextState);
      }
      
      if ((0, _isthenable.isThenable)(actionResult)) {
        actionResult.then(handleResult, (err) => {
          runRemainingActions(actionQueue, setState);
          action.reject(err);
        });
      } else {
        handleResult(actionResult);
      }
    }
    function dispatchAction(actionQueue, payload, setState) {
      let resolvers = {
        resolve: setState,
        reject: () => {},
      };
      
      
      
      
      if (payload.type !== _routerreducertypes.ACTION_RESTORE) {
        
        const deferredPromise = new Promise((resolve, reject) => {
          resolvers = {
            resolve,
            reject,
          };
        });
        (0, _react.startTransition)(() => {
          
          
          setState(deferredPromise);
        });
      }
      const newAction = {
        payload,
        next: null,
        resolve: resolvers.resolve,
        reject: resolvers.reject,
      };
      
      if (actionQueue.pending === null) {
        
        
        actionQueue.last = newAction;
        runAction({
          actionQueue,
          action: newAction,
          setState,
        });
      } else if (
        payload.type === _routerreducertypes.ACTION_NAVIGATE ||
        payload.type === _routerreducertypes.ACTION_RESTORE
      ) {
        
        
        actionQueue.pending.discarded = true;
        
        
        newAction.next = actionQueue.pending.next;
        runAction({
          actionQueue,
          action: newAction,
          setState,
        });
      } else {
        
        
        if (actionQueue.last !== null) {
          actionQueue.last.next = newAction;
        }
        actionQueue.last = newAction;
      }
    }
    let globalActionQueue = null;
    function createMutableActionQueue(initialState, instrumentationHooks) {
      const actionQueue = {
        state: initialState,
        dispatch: (payload, setState) =>
          dispatchAction(actionQueue, payload, setState),
        action: async (state, action) => {
          const result = (0, _routerreducer.reducer)(state, action);
          return result;
        },
        pending: null,
        last: null,
        onRouterTransitionStart:
          instrumentationHooks !== null &&
          typeof instrumentationHooks.onRouterTransitionStart === "function"
            ? instrumentationHooks.onRouterTransitionStart
            : null,
      };
      if (typeof window !== "undefined") {
        
        
        
        if (globalActionQueue !== null) {
          throw Object.defineProperty(
            new Error(
              "Internal Next.js Error: createMutableActionQueue was called more " +
                "than once",
            ),
            "__NEXT_ERROR_CODE",
            {
              value: "E624",
              enumerable: false,
              configurable: true,
            },
          );
        }
        globalActionQueue = actionQueue;
      }
      return actionQueue;
    }
    function getCurrentAppRouterState() {
      return globalActionQueue !== null ? globalActionQueue.state : null;
    }
    function getAppRouterActionQueue() {
      if (globalActionQueue === null) {
        throw Object.defineProperty(
          new Error(
            "Internal Next.js error: Router action dispatched before initialization.",
          ),
          "__NEXT_ERROR_CODE",
          {
            value: "E668",
            enumerable: false,
            configurable: true,
          },
        );
      }
      return globalActionQueue;
    }
    function getProfilingHookForOnNavigationStart() {
      if (globalActionQueue !== null) {
        return globalActionQueue.onRouterTransitionStart;
      }
      return null;
    }
    function dispatchNavigateAction(
      href,
      navigateType,
      shouldScroll,
      linkInstanceRef,
    ) {
      
      
      const url = new URL((0, _addbasepath.addBasePath)(href), location.href);
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
      (0, _links.setLinkForCurrentNavigation)(linkInstanceRef);
      const onRouterTransitionStart = getProfilingHookForOnNavigationStart();
      if (onRouterTransitionStart !== null) {
        onRouterTransitionStart(href, navigateType);
      }
      (0, _useactionqueue.dispatchAppRouterAction)({
        type: _routerreducertypes.ACTION_NAVIGATE,
        url,
        isExternalUrl: (0, _approuterutils.isExternalURL)(url),
        locationSearch: location.search,
        shouldScroll,
        navigateType,
      });
    }
    function dispatchTraverseAction(href, historyState) {
      const onRouterTransitionStart = getProfilingHookForOnNavigationStart();
      if (onRouterTransitionStart !== null) {
        onRouterTransitionStart(href, "traverse");
      }
      (0, _useactionqueue.dispatchAppRouterAction)({
        type: _routerreducertypes.ACTION_RESTORE,
        url: new URL(href),
        historyState,
      });
    }
    const publicAppRouterInstance = {
      back: () => window.history.back(),
      forward: () => window.history.forward(),
      
      prefetch:
        
        (href, options) => {
          const actionQueue = getAppRouterActionQueue();
          const prefetchKind =
            options?.kind ?? _routerreducertypes.PrefetchKind.AUTO;
          
          
          let fetchStrategy;
          switch (prefetchKind) {
            case _routerreducertypes.PrefetchKind.AUTO: {
              
              fetchStrategy = _types.FetchStrategy.PPR;
              break;
            }
            case _routerreducertypes.PrefetchKind.FULL: {
              fetchStrategy = _types.FetchStrategy.Full;
              break;
            }
            case _routerreducertypes.PrefetchKind.TEMPORARY: {
              
              return;
            }
            default: {
              prefetchKind;
              
              
              
              
              fetchStrategy = _types.FetchStrategy.PPR;
            }
          }
          (0, _prefetch.prefetch)(
            href,
            actionQueue.state.nextUrl,
            actionQueue.state.tree,
            fetchStrategy,
            options?.onInvalidate ?? null,
          );
        },
      replace: (href, options) => {
        (0, _react.startTransition)(() => {
          dispatchNavigateAction(
            href,
            "replace",
            options?.scroll ?? true,
            null,
          );
        });
      },
      push: (href, options) => {
        (0, _react.startTransition)(() => {
          dispatchNavigateAction(href, "push", options?.scroll ?? true, null);
        });
      },
      refresh: () => {
        (0, _react.startTransition)(() => {
          (0, _useactionqueue.dispatchAppRouterAction)({
            type: _routerreducertypes.ACTION_REFRESH,
            origin: window.location.origin,
          });
        });
      },
      hmrRefresh: () => {
        if (("TURBOPACK compile-time falsy", 0)) 
        ;
        else {
          (0, _react.startTransition)(() => {
            (0, _useactionqueue.dispatchAppRouterAction)({
              type: _routerreducertypes.ACTION_HMR_REFRESH,
              origin: window.location.origin,
            });
          });
        }
      },
    };
    
    if (typeof window !== "undefined" && window.next) {
      window.next.router = publicAppRouterInstance;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-initial-router-state.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "createInitialRouterState", {
      enumerable: true,
      get: function () {
        return createInitialRouterState;
      },
    });
    const _createhreffromurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-href-from-url.js [app-client] (ecmascript)",
    );
    const _filllazyitemstillleafwithhead = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fill-lazy-items-till-leaf-with-head.js [app-client] (ecmascript)",
    );
    const _computechangedpath = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/compute-changed-path.js [app-client] (ecmascript)",
    );
    const _refetchinactiveparallelsegments = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/refetch-inactive-parallel-segments.js [app-client] (ecmascript)",
    );
    const _flightdatahelpers = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/flight-data-helpers.js [app-client] (ecmascript)",
    );
    function createInitialRouterState({
      navigatedAt,
      initialFlightData,
      initialCanonicalUrlParts,
      initialRenderedSearch,
      initialParallelRoutes,
      location,
    }) {
      
      
      
      const initialCanonicalUrl = initialCanonicalUrlParts.join("/");
      const normalizedFlightData = (0,
      _flightdatahelpers.getFlightDataPartsFromPath)(initialFlightData[0]);
      const {
        tree: initialTree,
        seedData: initialSeedData,
        head: initialHead,
      } = normalizedFlightData;
      
      
      const rsc = initialSeedData?.[0];
      const loading = initialSeedData?.[2] ?? null;
      const cache = {
        lazyData: null,
        rsc,
        prefetchRsc: null,
        head: null,
        prefetchHead: null,
        
        parallelRoutes: initialParallelRoutes,
        loading,
        navigatedAt,
      };
      const canonicalUrl = 
        location
          ? (0, _createhreffromurl.createHrefFromUrl)(location)
          : initialCanonicalUrl;
      (0,
      _refetchinactiveparallelsegments.addRefreshMarkerToActiveParallelSegments)(
        initialTree,
        canonicalUrl,
      );
      
      if (initialParallelRoutes === null || initialParallelRoutes.size === 0) {
        (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(
          navigatedAt,
          cache,
          undefined,
          initialTree,
          initialSeedData,
          initialHead,
        );
      }
      const initialState = {
        tree: initialTree,
        cache,
        pushRef: {
          pendingPush: false,
          mpaNavigation: false,
          
          
          preserveCustomHistoryState: true,
        },
        focusAndScrollRef: {
          apply: false,
          onlyHashChange: false,
          hashFragment: null,
          segmentPaths: [],
        },
        canonicalUrl,
        renderedSearch: initialRenderedSearch,
        nextUrl:
          ((0, _computechangedpath.extractPathFromFlightRouterState)(
            initialTree,
          ) ||
            location?.pathname) ??
          null,
        previousNextUrl: null,
        debugInfo: null,
      };
      return initialState;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-link-gc.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "linkGc", {
      enumerable: true,
      get: function () {
        return linkGc;
      },
    });
    function linkGc() {
      
      if (("TURBOPACK compile-time truthy", 1)) {
        const callback = (mutationList) => {
          for (const mutation of mutationList) {
            if (mutation.type === "childList") {
              for (const node of mutation.addedNodes) {
                if ("tagName" in node && node.tagName === "LINK") {
                  const link = node;
                  if (link.dataset.precedence?.startsWith("next")) {
                    const href = link.getAttribute("href");
                    if (href) {
                      const [resource, version] = href.split("?v=", 2);
                      if (version) {
                        const currentOrigin = window.location.origin;
                        const allLinks = [
                          ...document.querySelectorAll(
                            'link[href^="' + resource + '"]',
                          ),
                          
                          
                          ...document.querySelectorAll(
                            'link[href^="' +
                              (resource.startsWith(currentOrigin)
                                ? resource.slice(currentOrigin.length)
                                : currentOrigin + resource) +
                              '"]',
                          ),
                        ];
                        for (const otherLink of allLinks) {
                          if (
                            otherLink.dataset.precedence?.startsWith("next")
                          ) {
                            const otherHref = otherLink.getAttribute("href");
                            if (otherHref) {
                              const [, otherVersion] = otherHref.split(
                                "?v=",
                                2,
                              );
                              if (!otherVersion || +otherVersion < +version) {
                                
                                
                                
                                
                                setTimeout(() => {
                                  otherLink.remove();
                                }, 5);
                                const preloadLink = document.querySelector(
                                  `link[rel="preload"][as="style"][href="${otherHref}"]`,
                                );
                                if (preloadLink) {
                                  preloadLink.remove();
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        };
        
        const observer = new MutationObserver(callback);
        observer.observe(document.head, {
          childList: true,
        });
      }
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-index.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "hydrate", {
      enumerable: true,
      get: function () {
        return hydrate;
      },
    });
    const _interop_require_default = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)",
    );
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-globals.js [app-client] (ecmascript)",
    );
    const _client =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react-dom/client.js [app-client] (ecmascript)",
      ),
    );
    const _react =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      ),
    );
    const _client1 = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react-server-dom-turbopack/client.js [app-client] (ecmascript)",
    );
    const _headmanagercontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js [app-client] (ecmascript)",
    );
    const _onrecoverableerror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/react-client-callbacks/on-recoverable-error.js [app-client] (ecmascript)",
    );
    const _errorboundarycallbacks = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/react-client-callbacks/error-boundary-callbacks.js [app-client] (ecmascript)",
    );
    const _appcallserver = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-call-server.js [app-client] (ecmascript)",
    );
    const _appfindsourcemapurl = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-find-source-map-url.js [app-client] (ecmascript)",
    );
    const _approuterinstance = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)",
    );
    const _approuter =  _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/app-router.js [app-client] (ecmascript)",
      ),
    );
    const _createinitialrouterstate = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-initial-router-state.js [app-client] (ecmascript)",
    );
    const _approutercontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)",
    );
    const _appbuildid = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-build-id.js [app-client] (ecmascript)",
    );
    const _flightdatahelpers = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/flight-data-helpers.js [app-client] (ecmascript)",
    );
    
    const createFromReadableStream = _client1.createFromReadableStream;
    const createFromFetch = _client1.createFromFetch;
    const appElement = document;
    const encoder = new TextEncoder();
    let initialServerDataBuffer = undefined;
    let initialServerDataWriter = undefined;
    let initialServerDataLoaded = false;
    let initialServerDataFlushed = false;
    let initialFormStateData = null;
    function nextServerDataCallback(seg) {
      if (seg[0] === 0) {
        initialServerDataBuffer = [];
      } else if (seg[0] === 1) {
        if (!initialServerDataBuffer)
          throw Object.defineProperty(
            new Error("Unexpected server data: missing bootstrap script."),
            "__NEXT_ERROR_CODE",
            {
              value: "E18",
              enumerable: false,
              configurable: true,
            },
          );
        if (initialServerDataWriter) {
          initialServerDataWriter.enqueue(encoder.encode(seg[1]));
        } else {
          initialServerDataBuffer.push(seg[1]);
        }
      } else if (seg[0] === 2) {
        initialFormStateData = seg[1];
      } else if (seg[0] === 3) {
        if (!initialServerDataBuffer)
          throw Object.defineProperty(
            new Error("Unexpected server data: missing bootstrap script."),
            "__NEXT_ERROR_CODE",
            {
              value: "E18",
              enumerable: false,
              configurable: true,
            },
          );
        
        const binaryString = atob(seg[1]);
        const decodedChunk = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
          decodedChunk[i] = binaryString.charCodeAt(i);
        }
        if (initialServerDataWriter) {
          initialServerDataWriter.enqueue(decodedChunk);
        } else {
          initialServerDataBuffer.push(decodedChunk);
        }
      }
    }
    function isStreamErrorOrUnfinished(ctr) {
      
      return ctr.desiredSize === null || ctr.desiredSize < 0;
    }
    
    
    
    
    
    
    
    
    function nextServerDataRegisterWriter(ctr) {
      if (initialServerDataBuffer) {
        initialServerDataBuffer.forEach((val) => {
          ctr.enqueue(typeof val === "string" ? encoder.encode(val) : val);
        });
        if (initialServerDataLoaded && !initialServerDataFlushed) {
          if (isStreamErrorOrUnfinished(ctr)) {
            ctr.error(
              Object.defineProperty(
                new Error(
                  "The connection to the page was unexpectedly closed, possibly due to the stop button being clicked, loss of Wi-Fi, or an unstable internet connection.",
                ),
                "__NEXT_ERROR_CODE",
                {
                  value: "E117",
                  enumerable: false,
                  configurable: true,
                },
              ),
            );
          } else {
            ctr.close();
          }
          initialServerDataFlushed = true;
          initialServerDataBuffer = undefined;
        }
      }
      initialServerDataWriter = ctr;
    }
    
    const DOMContentLoaded = function () {
      if (initialServerDataWriter && !initialServerDataFlushed) {
        initialServerDataWriter.close();
        initialServerDataFlushed = true;
        initialServerDataBuffer = undefined;
      }
      initialServerDataLoaded = true;
    };
    
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
    } else {
      
      setTimeout(DOMContentLoaded);
    }
    const nextServerDataLoadingGlobal = (self.__next_f = self.__next_f || []);
    
    
    nextServerDataLoadingGlobal.forEach(nextServerDataCallback);
    nextServerDataLoadingGlobal.length = 0;
    
    nextServerDataLoadingGlobal.push = nextServerDataCallback;
    const readable = new ReadableStream({
      start(controller) {
        nextServerDataRegisterWriter(controller);
      },
    });
    if (("TURBOPACK compile-time truthy", 1)) {
      
      readable.name = "hydration";
    }
    let debugChannel;
    if (("TURBOPACK compile-time falsy", 0)) 
    ;
    const clientResumeFetch = window.__NEXT_CLIENT_RESUME;
    let initialServerResponse;
    if (clientResumeFetch) {
      initialServerResponse = Promise.resolve(
        createFromFetch(clientResumeFetch, {
          callServer: _appcallserver.callServer,
          findSourceMapURL: _appfindsourcemapurl.findSourceMapURL,
          debugChannel,
        }),
      ).then(async (fallbackInitialRSCPayload) =>
        (0, _flightdatahelpers.createInitialRSCPayloadFromFallbackPrerender)(
          await clientResumeFetch,
          fallbackInitialRSCPayload,
        ),
      );
    } else {
      initialServerResponse = createFromReadableStream(readable, {
        callServer: _appcallserver.callServer,
        findSourceMapURL: _appfindsourcemapurl.findSourceMapURL,
        debugChannel,
        
        startTime: 0,
      });
    }
    function ServerRoot({
      initialRSCPayload,
      actionQueue,
      webSocket,
      staticIndicatorState,
    }) {
      const router =  (0, _jsxruntime.jsx)(_approuter.default, {
        actionQueue: actionQueue,
        globalErrorState: initialRSCPayload.G,
        webSocket: webSocket,
        staticIndicatorState: staticIndicatorState,
      });
      if (
        ("TURBOPACK compile-time value", "development") === "development" &&
        initialRSCPayload.m
      ) {
        
        
        return  (0, _jsxruntime.jsx)(
          _approutercontextsharedruntime.MissingSlotContext,
          {
            value: initialRSCPayload.m,
            children: router,
          },
        );
      }
      return router;
    }
    const StrictModeIfEnabled = ("TURBOPACK compile-time truthy", 1)
      ? _react.default.StrictMode
      : "TURBOPACK unreachable";
    function Root({ children }) {
      if (("TURBOPACK compile-time falsy", 0)) 
      ;
      return children;
    }
    function onDefaultTransitionIndicator() {
      
      
      return () => {};
    }
    const reactRootOptions = {
      onDefaultTransitionIndicator: onDefaultTransitionIndicator,
      onRecoverableError: _onrecoverableerror.onRecoverableError,
      onCaughtError: _errorboundarycallbacks.onCaughtError,
      onUncaughtError: _errorboundarycallbacks.onUncaughtError,
    };
    async function hydrate(instrumentationHooks, assetPrefix) {
      let staticIndicatorState;
      let webSocket;
      if (("TURBOPACK compile-time truthy", 1)) {
        const { createWebSocket } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/dev/hot-reloader/app/web-socket.js [app-client] (ecmascript)",
        );
        staticIndicatorState = {
          pathname: null,
          appIsrManifest: null,
        };
        webSocket = createWebSocket(assetPrefix, staticIndicatorState);
      }
      const initialRSCPayload = await initialServerResponse;
      
      
      (0, _appbuildid.setAppBuildId)(initialRSCPayload.b);
      const initialTimestamp = Date.now();
      const actionQueue = (0, _approuterinstance.createMutableActionQueue)(
        (0, _createinitialrouterstate.createInitialRouterState)({
          navigatedAt: initialTimestamp,
          initialFlightData: initialRSCPayload.f,
          initialCanonicalUrlParts: initialRSCPayload.c,
          initialRenderedSearch: initialRSCPayload.q,
          initialParallelRoutes: new Map(),
          location: window.location,
        }),
        instrumentationHooks,
      );
      const reactEl =  (0, _jsxruntime.jsx)(StrictModeIfEnabled, {
        children:  (0, _jsxruntime.jsx)(
          _headmanagercontextsharedruntime.HeadManagerContext.Provider,
          {
            value: {
              appDir: true,
            },
            children:  (0, _jsxruntime.jsx)(Root, {
              children:  (0, _jsxruntime.jsx)(ServerRoot, {
                initialRSCPayload: initialRSCPayload,
                actionQueue: actionQueue,
                webSocket: webSocket,
                staticIndicatorState: staticIndicatorState,
              }),
            }),
          },
        ),
      });
      if (document.documentElement.id === "__next_error__") {
        let element = reactEl;
        
        if (("TURBOPACK compile-time truthy", 1)) {
          const { RootLevelDevOverlayElement } = __turbopack_context__.r(
            "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/next-devtools/userspace/app/client-entry.js [app-client] (ecmascript)",
          );
          
          element =  (0, _jsxruntime.jsx)(
            RootLevelDevOverlayElement,
            {
              children: element,
            },
          );
        }
        _client.default
          .createRoot(appElement, reactRootOptions)
          .render(element);
      } else {
        _react.default.startTransition(() => {
          _client.default.hydrateRoot(appElement, reactEl, {
            ...reactRootOptions,
            formState: initialFormStateData,
          });
        });
      }
      
      if (("TURBOPACK compile-time truthy", 1)) {
        const { linkGc } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-link-gc.js [app-client] (ecmascript)",
        );
        linkGc();
      }
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-next-turbopack.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
       __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)",
      );
    ("use strict");
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    const _appbootstrap = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-bootstrap.js [app-client] (ecmascript)",
    );
    const _onrecoverableerror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/react-client-callbacks/on-recoverable-error.js [app-client] (ecmascript)",
    );
    window.next.turbopack = true;
    self.__webpack_hash__ = "";
    
    const instrumentationHooks = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/lib/require-instrumentation-client.js [app-client] (ecmascript)",
    );
    (0, _appbootstrap.appBootstrap)((assetPrefix) => {
      const { hydrate } = __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/app-index.js [app-client] (ecmascript)",
      );
      try {
        hydrate(instrumentationHooks, assetPrefix);
      } finally {
        if (("TURBOPACK compile-time truthy", 1)) {
          const enableCacheIndicator = ("TURBOPACK compile-time value", false);
          const { getOwnerStack } = __turbopack_context__.r(
            "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/next-devtools/userspace/app/errors/stitched-error.js [app-client] (ecmascript)",
          );
          const { renderAppDevOverlay } = __turbopack_context__.r(
            "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/next-devtools/index.js (raw)",
          );
          renderAppDevOverlay(
            getOwnerStack,
            _onrecoverableerror.isRecoverableError,
            enableCacheIndicator,
          );
        }
      }
    });
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
]);


