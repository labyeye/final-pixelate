(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =  __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HeadManagerContext", {
    enumerable: true,
    get: function() {
        return HeadManagerContext;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _react =  _interop_require_default._(__turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react/index.js [client] (ecmascript)"));
const HeadManagerContext = _react.default.createContext({});
if ("TURBOPACK compile-time truthy", 1) {
    HeadManagerContext.displayName = 'HeadManagerContext';
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/mitt.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";











 


Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return mitt;
    }
});
function mitt() {
    const all = Object.create(null);
    return {
        on (type, handler) {
            ;
            (all[type] || (all[type] = [])).push(handler);
        },
        off (type, handler) {
            if (all[type]) {
                all[type].splice(all[type].indexOf(handler) >>> 0, 1);
            }
        },
        emit (type, ...evts) {
            
            ;
            (all[type] || []).slice().map((handler)=>{
                handler(...evts);
            });
        }
    };
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router-context.shared-runtime.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =  __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RouterContext", {
    enumerable: true,
    get: function() {
        return RouterContext;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _react =  _interop_require_default._(__turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react/index.js [client] (ecmascript)"));
const RouterContext = _react.default.createContext(null);
if ("TURBOPACK compile-time truthy", 1) {
    RouterContext.displayName = 'RouterContext';
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils/warn-once.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =  __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "warnOnce", {
    enumerable: true,
    get: function() {
        return warnOnce;
    }
});
let warnOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const warnings = new Set();
    warnOnce = (msg)=>{
        if (!warnings.has(msg)) {
            console.warn(msg);
        }
        warnings.add(msg);
    };
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/disable-smooth-scroll.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =  __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "disableSmoothScrollDuringRouteTransition", {
    enumerable: true,
    get: function() {
        return disableSmoothScrollDuringRouteTransition;
    }
});
const _warnonce = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils/warn-once.js [client] (ecmascript)");
function disableSmoothScrollDuringRouteTransition(fn, options = {}) {
    
    
    if (options.onlyHashChange) {
        fn();
        return;
    }
    const htmlElement = document.documentElement;
    const hasDataAttribute = htmlElement.dataset.scrollBehavior === 'smooth';
    if (!hasDataAttribute) {
        
        if (("TURBOPACK compile-time value", "development") === 'development' && getComputedStyle(htmlElement).scrollBehavior === 'smooth') {
            (0, _warnonce.warnOnce)('Detected `scroll-behavior: smooth` on the `<html>` element. To disable smooth scrolling during route transitions, ' + 'add `data-scroll-behavior="smooth"` to your <html> element. ' + 'Learn more: https://nextjs.org/docs/messages/missing-data-scroll-behavior');
        }
        
        fn();
        return;
    }
    
    const existing = htmlElement.style.scrollBehavior;
    htmlElement.style.scrollBehavior = 'auto';
    if (!options.dontForceLayout) {
        
        
        
        htmlElement.getClientRects();
    }
    fn();
    htmlElement.style.scrollBehavior = existing;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";




 Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureLeadingSlash", {
    enumerable: true,
    get: function() {
        return ensureLeadingSlash;
    }
});
function ensureLeadingSlash(path) {
    return path.startsWith('/') ? path : `/${path}`;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DEFAULT_SEGMENT_KEY: null,
    PAGE_SEGMENT_KEY: null,
    addSearchParamsIfPageSegment: null,
    computeSelectedLayoutSegment: null,
    getSegmentValue: null,
    getSelectedLayoutSegmentPath: null,
    isGroupSegment: null,
    isParallelRouteSegment: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DEFAULT_SEGMENT_KEY: function() {
        return DEFAULT_SEGMENT_KEY;
    },
    PAGE_SEGMENT_KEY: function() {
        return PAGE_SEGMENT_KEY;
    },
    addSearchParamsIfPageSegment: function() {
        return addSearchParamsIfPageSegment;
    },
    computeSelectedLayoutSegment: function() {
        return computeSelectedLayoutSegment;
    },
    getSegmentValue: function() {
        return getSegmentValue;
    },
    getSelectedLayoutSegmentPath: function() {
        return getSelectedLayoutSegmentPath;
    },
    isGroupSegment: function() {
        return isGroupSegment;
    },
    isParallelRouteSegment: function() {
        return isParallelRouteSegment;
    }
});
function getSegmentValue(segment) {
    return Array.isArray(segment) ? segment[1] : segment;
}
function isGroupSegment(segment) {
    
    return segment[0] === '(' && segment.endsWith(')');
}
function isParallelRouteSegment(segment) {
    return segment.startsWith('@') && segment !== '@children';
}
function addSearchParamsIfPageSegment(segment, searchParams) {
    const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
    if (isPageSegment) {
        const stringifiedQuery = JSON.stringify(searchParams);
        return stringifiedQuery !== '{}' ? PAGE_SEGMENT_KEY + '?' + stringifiedQuery : PAGE_SEGMENT_KEY;
    }
    return segment;
}
function computeSelectedLayoutSegment(segments, parallelRouteKey) {
    if (!segments || segments.length === 0) {
        return null;
    }
    
    const rawSegment = parallelRouteKey === 'children' ? segments[0] : segments[segments.length - 1];
    
    
    return rawSegment === DEFAULT_SEGMENT_KEY ? null : rawSegment;
}
function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first = true, segmentPath = []) {
    let node;
    if (first) {
        
        node = tree[1][parallelRouteKey];
    } else {
        
        const parallelRoutes = tree[1];
        node = parallelRoutes.children ?? Object.values(parallelRoutes)[0];
    }
    if (!node) return segmentPath;
    const segment = node[0];
    let segmentValue = getSegmentValue(segment);
    if (!segmentValue || segmentValue.startsWith(PAGE_SEGMENT_KEY)) {
        return segmentPath;
    }
    segmentPath.push(segmentValue);
    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
}
const PAGE_SEGMENT_KEY = '__PAGE__';
const DEFAULT_SEGMENT_KEY = '__DEFAULT__'; 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/app-paths.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    normalizeAppPath: null,
    normalizeRscURL: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    normalizeAppPath: function() {
        return normalizeAppPath;
    },
    normalizeRscURL: function() {
        return normalizeRscURL;
    }
});
const _ensureleadingslash = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js [client] (ecmascript)");
const _segment = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [client] (ecmascript)");
function normalizeAppPath(route) {
    return (0, _ensureleadingslash.ensureLeadingSlash)(route.split('/').reduce((pathname, segment, index, segments)=>{
        
        if (!segment) {
            return pathname;
        }
        
        if ((0, _segment.isGroupSegment)(segment)) {
            return pathname;
        }
        
        if (segment[0] === '@') {
            return pathname;
        }
        
        if ((segment === 'page' || segment === 'route') && index === segments.length - 1) {
            return pathname;
        }
        return `${pathname}/${segment}`;
    }, ''));
}
function normalizeRscURL(url) {
    return url.replace(/\.rsc($|\?)/, '$1');
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/interception-routes.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    INTERCEPTION_ROUTE_MARKERS: null,
    extractInterceptionRouteInformation: null,
    isInterceptionRouteAppPath: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    INTERCEPTION_ROUTE_MARKERS: function() {
        return INTERCEPTION_ROUTE_MARKERS;
    },
    extractInterceptionRouteInformation: function() {
        return extractInterceptionRouteInformation;
    },
    isInterceptionRouteAppPath: function() {
        return isInterceptionRouteAppPath;
    }
});
const _apppaths = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/app-paths.js [client] (ecmascript)");
const INTERCEPTION_ROUTE_MARKERS = [
    '(..)(..)',
    '(.)',
    '(..)',
    '(...)'
];
function isInterceptionRouteAppPath(path) {
    
    return path.split('/').find((segment)=>INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m))) !== undefined;
}
function extractInterceptionRouteInformation(path) {
    let interceptingRoute;
    let marker;
    let interceptedRoute;
    for (const segment of path.split('/')){
        marker = INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
        if (marker) {
            ;
            [interceptingRoute, interceptedRoute] = path.split(marker, 2);
            break;
        }
    }
    if (!interceptingRoute || !marker || !interceptedRoute) {
        throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", {
            value: "E269",
            enumerable: false,
            configurable: true
        });
    }
    interceptingRoute = (0, _apppaths.normalizeAppPath)(interceptingRoute) 
    ;
    switch(marker){
        case '(.)':
            
            if (interceptingRoute === '/') {
                interceptedRoute = `/${interceptedRoute}`;
            } else {
                interceptedRoute = interceptingRoute + '/' + interceptedRoute;
            }
            break;
        case '(..)':
            
            if (interceptingRoute === '/') {
                throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", {
                    value: "E207",
                    enumerable: false,
                    configurable: true
                });
            }
            interceptedRoute = interceptingRoute.split('/').slice(0, -1).concat(interceptedRoute).join('/');
            break;
        case '(...)':
            
            interceptedRoute = '/' + interceptedRoute;
            break;
        case '(..)(..)':
            
            const splitInterceptingRoute = interceptingRoute.split('/');
            if (splitInterceptingRoute.length <= 2) {
                throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", {
                    value: "E486",
                    enumerable: false,
                    configurable: true
                });
            }
            interceptedRoute = splitInterceptingRoute.slice(0, -2).concat(interceptedRoute).join('/');
            break;
        default:
            throw Object.defineProperty(new Error('Invariant: unexpected marker'), "__NEXT_ERROR_CODE", {
                value: "E112",
                enumerable: false,
                configurable: true
            });
    }
    return {
        interceptingRoute,
        interceptedRoute
    };
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isDynamicRoute", {
    enumerable: true,
    get: function() {
        return isDynamicRoute;
    }
});
const _interceptionroutes = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/interception-routes.js [client] (ecmascript)");

const TEST_ROUTE = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/;

const TEST_STRICT_ROUTE = /\/\[[^/]+\](?=\/|$)/;
function isDynamicRoute(route, strict = true) {
    if ((0, _interceptionroutes.isInterceptionRouteAppPath)(route)) {
        route = (0, _interceptionroutes.extractInterceptionRouteInformation)(route).interceptedRoute;
    }
    if (strict) {
        return TEST_STRICT_ROUTE.test(route);
    }
    return TEST_ROUTE.test(route);
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/querystring.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target, ...searchParamsList) {
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =  __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}


const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery 
    
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/parse-path.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";





 Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parsePath", {
    enumerable: true,
    get: function() {
        return parsePath;
    }
});
function parsePath(path) {
    const hashIndex = path.indexOf('#');
    const queryIndex = path.indexOf('?');
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : '',
            hash: hashIndex > -1 ? path.slice(hashIndex) : ''
        };
    }
    return {
        pathname: path,
        query: '',
        hash: ''
    };
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addPathPrefix", {
    enumerable: true,
    get: function() {
        return addPathPrefix;
    }
});
const _parsepath = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/parse-path.js [client] (ecmascript)");
function addPathPrefix(path, prefix) {
    if (!path.startsWith('/') || !prefix) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return `${prefix}${pathname}${query}${hash}`;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";







 Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removeTrailingSlash", {
    enumerable: true,
    get: function() {
        return removeTrailingSlash;
    }
});
function removeTrailingSlash(route) {
    return route.replace(/\/$/, '') || '/';
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/route-match-utils.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";




 Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    safeCompile: null,
    safePathToRegexp: null,
    safeRegexpToFunction: null,
    safeRouteMatcher: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    safeCompile: function() {
        return safeCompile;
    },
    safePathToRegexp: function() {
        return safePathToRegexp;
    },
    safeRegexpToFunction: function() {
        return safeRegexpToFunction;
    },
    safeRouteMatcher: function() {
        return safeRouteMatcher;
    }
});
const _pathtoregexp = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/path-to-regexp/index.js [client] (ecmascript)");
const _routepatternnormalizer = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/lib/route-pattern-normalizer.js [client] (ecmascript)");
function safePathToRegexp(route, keys, options) {
    if (typeof route !== 'string') {
        return (0, _pathtoregexp.pathToRegexp)(route, keys, options);
    }
    
    const needsNormalization = (0, _routepatternnormalizer.hasAdjacentParameterIssues)(route);
    const routeToUse = needsNormalization ? (0, _routepatternnormalizer.normalizeAdjacentParameters)(route) : route;
    try {
        return (0, _pathtoregexp.pathToRegexp)(routeToUse, keys, options);
    } catch (error) {
        
        if (!needsNormalization) {
            try {
                const normalizedRoute = (0, _routepatternnormalizer.normalizeAdjacentParameters)(route);
                return (0, _pathtoregexp.pathToRegexp)(normalizedRoute, keys, options);
            } catch (retryError) {
                
                throw error;
            }
        }
        throw error;
    }
}
function safeCompile(route, options) {
    
    const needsNormalization = (0, _routepatternnormalizer.hasAdjacentParameterIssues)(route);
    const routeToUse = needsNormalization ? (0, _routepatternnormalizer.normalizeAdjacentParameters)(route) : route;
    try {
        const compiler = (0, _pathtoregexp.compile)(routeToUse, options);
        
        
        
        if (needsNormalization) {
            return (params)=>{
                return (0, _routepatternnormalizer.stripNormalizedSeparators)(compiler(params));
            };
        }
        return compiler;
    } catch (error) {
        
        if (!needsNormalization) {
            try {
                const normalizedRoute = (0, _routepatternnormalizer.normalizeAdjacentParameters)(route);
                const compiler = (0, _pathtoregexp.compile)(normalizedRoute, options);
                
                return (params)=>{
                    return (0, _routepatternnormalizer.stripNormalizedSeparators)(compiler(params));
                };
            } catch (retryError) {
                
                throw error;
            }
        }
        throw error;
    }
}
function safeRegexpToFunction(regexp, keys) {
    const originalMatcher = (0, _pathtoregexp.regexpToFunction)(regexp, keys || []);
    return (pathname)=>{
        const result = originalMatcher(pathname);
        if (!result) return false;
        
        return {
            ...result,
            params: (0, _routepatternnormalizer.stripParameterSeparators)(result.params)
        };
    };
}
function safeRouteMatcher(matcherFn) {
    return (pathname)=>{
        const result = matcherFn(pathname);
        if (!result) return false;
        
        return (0, _routepatternnormalizer.stripParameterSeparators)(result);
    };
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/route-matcher.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getRouteMatcher", {
    enumerable: true,
    get: function() {
        return getRouteMatcher;
    }
});
const _utils = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils.js [client] (ecmascript)");
const _routematchutils = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/route-match-utils.js [client] (ecmascript)");
function getRouteMatcher({ re, groups }) {
    const rawMatcher = (pathname)=>{
        const routeMatch = re.exec(pathname);
        if (!routeMatch) return false;
        const decode = (param)=>{
            try {
                return decodeURIComponent(param);
            } catch  {
                throw Object.defineProperty(new _utils.DecodeError('failed to decode param'), "__NEXT_ERROR_CODE", {
                    value: "E528",
                    enumerable: false,
                    configurable: true
                });
            }
        };
        const params = {};
        for (const [key, group] of Object.entries(groups)){
            const match = routeMatch[group.pos];
            if (match !== undefined) {
                if (group.repeat) {
                    params[key] = match.split('/').map((entry)=>decode(entry));
                } else {
                    params[key] = decode(match);
                }
            }
        }
        return params;
    };
    
    return (0, _routematchutils.safeRouteMatcher)(rawMatcher);
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/escape-regexp.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "escapeStringRegexp", {
    enumerable: true,
    get: function() {
        return escapeStringRegexp;
    }
});
const reHasRegExp = /[|\\{}()[\]^$+*?.-]/;
const reReplaceRegExp = /[|\\{}()[\]^$+*?.-]/g;
function escapeStringRegexp(str) {
    
    if (reHasRegExp.test(str)) {
        return str.replace(reReplaceRegExp, '\\$&');
    }
    return str;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/invariant-error.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InvariantError", {
    enumerable: true,
    get: function() {
        return InvariantError;
    }
});
class InvariantError extends Error {
    constructor(message, options){
        super(`Invariant: ${message.endsWith('.') ? message : message + '.'} This is a bug in Next.js.`, options);
        this.name = 'InvariantError';
    }
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/parse-loader-tree.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseLoaderTree", {
    enumerable: true,
    get: function() {
        return parseLoaderTree;
    }
});
const _segment = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/segment.js [client] (ecmascript)");
function parseLoaderTree(tree) {
    const [segment, parallelRoutes, modules] = tree;
    const { layout, template } = modules;
    let { page } = modules;
    
    
    page = segment === _segment.DEFAULT_SEGMENT_KEY ? modules.defaultPage : page;
    const conventionPath = layout?.[1] || template?.[1] || page?.[1];
    return {
        page,
        segment,
        modules,
         conventionPath,
        parallelRoutes
    };
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/get-segment-param.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getParamProperties: null,
    getSegmentParam: null,
    isCatchAll: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getParamProperties: function() {
        return getParamProperties;
    },
    getSegmentParam: function() {
        return getSegmentParam;
    },
    isCatchAll: function() {
        return isCatchAll;
    }
});
const _interceptionroutes = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/interception-routes.js [client] (ecmascript)");
function getSegmentParam(segment) {
    const interceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((marker)=>segment.startsWith(marker));
    
    
    if (interceptionMarker) {
        segment = segment.slice(interceptionMarker.length);
    }
    if (segment.startsWith('[[...') && segment.endsWith(']]')) {
        return {
            
            
            type: 'optional-catchall',
            param: segment.slice(5, -2)
        };
    }
    if (segment.startsWith('[...') && segment.endsWith(']')) {
        return {
            type: interceptionMarker ? `catchall-intercepted-${interceptionMarker}` : 'catchall',
            param: segment.slice(4, -1)
        };
    }
    if (segment.startsWith('[') && segment.endsWith(']')) {
        return {
            type: interceptionMarker ? `dynamic-intercepted-${interceptionMarker}` : 'dynamic',
            param: segment.slice(1, -1)
        };
    }
    return null;
}
function isCatchAll(type) {
    return type === 'catchall' || type === 'catchall-intercepted-(..)(..)' || type === 'catchall-intercepted-(.)' || type === 'catchall-intercepted-(..)' || type === 'catchall-intercepted-(...)' || type === 'optional-catchall';
}
function getParamProperties(paramType) {
    let repeat = false;
    let optional = false;
    switch(paramType){
        case 'catchall':
        case 'catchall-intercepted-(..)(..)':
        case 'catchall-intercepted-(.)':
        case 'catchall-intercepted-(..)':
        case 'catchall-intercepted-(...)':
            repeat = true;
            break;
        case 'optional-catchall':
            repeat = true;
            optional = true;
            break;
        case 'dynamic':
        case 'dynamic-intercepted-(..)(..)':
        case 'dynamic-intercepted-(.)':
        case 'dynamic-intercepted-(..)':
        case 'dynamic-intercepted-(...)':
            break;
        default:
            paramType;
    }
    return {
        repeat,
        optional
    };
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/get-dynamic-param.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    PARAMETER_PATTERN: null,
    getDynamicParam: null,
    interpolateParallelRouteParams: null,
    parseMatchedParameter: null,
    parseParameter: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PARAMETER_PATTERN: function() {
        return PARAMETER_PATTERN;
    },
    getDynamicParam: function() {
        return getDynamicParam;
    },
    interpolateParallelRouteParams: function() {
        return interpolateParallelRouteParams;
    },
    parseMatchedParameter: function() {
        return parseMatchedParameter;
    },
    parseParameter: function() {
        return parseParameter;
    }
});
const _invarianterror = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/invariant-error.js [client] (ecmascript)");
const _parseloadertree = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/parse-loader-tree.js [client] (ecmascript)");
const _getsegmentparam = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/get-segment-param.js [client] (ecmascript)");









 function getParamValue(interpolatedParams, segmentKey, fallbackRouteParams) {
    let value = interpolatedParams[segmentKey];
    if (fallbackRouteParams?.has(segmentKey)) {
        
        
        const [searchValue] = fallbackRouteParams.get(segmentKey);
        value = searchValue;
    } else if (Array.isArray(value)) {
        value = value.map((i)=>encodeURIComponent(i));
    } else if (typeof value === 'string') {
        value = encodeURIComponent(value);
    }
    return value;
}
function interpolateParallelRouteParams(loaderTree, params, pagePath, fallbackRouteParams) {
    const interpolated = structuredClone(params);
    
    const stack = [
        {
            tree: loaderTree,
            depth: 0
        }
    ];
    
    const pathSegments = pagePath.split('/').slice(1) 
    ;
    while(stack.length > 0){
        const { tree, depth } = stack.pop();
        const { segment, parallelRoutes } = (0, _parseloadertree.parseLoaderTree)(tree);
        
        const segmentParam = (0, _getsegmentparam.getSegmentParam)(segment);
        if (segmentParam && !interpolated.hasOwnProperty(segmentParam.param) && 
        
        !fallbackRouteParams?.has(segmentParam.param)) {
            switch(segmentParam.type){
                case 'catchall':
                case 'optional-catchall':
                case 'catchall-intercepted-(..)(..)':
                case 'catchall-intercepted-(.)':
                case 'catchall-intercepted-(..)':
                case 'catchall-intercepted-(...)':
                    
                    const remainingSegments = pathSegments.slice(depth);
                    
                    const processedSegments = remainingSegments.flatMap((pathSegment)=>{
                        const param = (0, _getsegmentparam.getSegmentParam)(pathSegment);
                        
                        
                        
                        
                        
                        return param ? interpolated[param.param] : pathSegment;
                    }).filter((s)=>s !== undefined);
                    if (processedSegments.length > 0) {
                        interpolated[segmentParam.param] = processedSegments;
                    }
                    break;
                case 'dynamic':
                case 'dynamic-intercepted-(..)(..)':
                case 'dynamic-intercepted-(.)':
                case 'dynamic-intercepted-(..)':
                case 'dynamic-intercepted-(...)':
                    
                    if (depth < pathSegments.length) {
                        const pathSegment = pathSegments[depth];
                        const param = (0, _getsegmentparam.getSegmentParam)(pathSegment);
                        interpolated[segmentParam.param] = param ? interpolated[param.param] : pathSegment;
                    }
                    break;
                default:
                    segmentParam.type;
            }
        }
        
        let nextDepth = depth;
        const isRouteGroup = segment.startsWith('(') && segment.endsWith(')');
        if (!isRouteGroup && segment !== '') {
            nextDepth++;
        }
        
        for (const route of Object.values(parallelRoutes)){
            stack.push({
                tree: route,
                depth: nextDepth
            });
        }
    }
    return interpolated;
}
function getDynamicParam(interpolatedParams, segmentKey, dynamicParamType, fallbackRouteParams) {
    let value = getParamValue(interpolatedParams, segmentKey, fallbackRouteParams);
    
    
    if (!value || value.length === 0) {
        if (dynamicParamType === 'oc') {
            return {
                param: segmentKey,
                value: null,
                type: dynamicParamType,
                treeSegment: [
                    segmentKey,
                    '',
                    dynamicParamType
                ]
            };
        }
        throw Object.defineProperty(new _invarianterror.InvariantError(`Missing value for segment key: "${segmentKey}" with dynamic param type: ${dynamicParamType}`), "__NEXT_ERROR_CODE", {
            value: "E864",
            enumerable: false,
            configurable: true
        });
    }
    return {
        param: segmentKey,
        
        value,
        
        treeSegment: [
            segmentKey,
            Array.isArray(value) ? value.join('/') : value,
            dynamicParamType
        ],
        type: dynamicParamType
    };
}
const PARAMETER_PATTERN = /^([^[]*)\[((?:\[[^\]]*\])|[^\]]+)\](.*)$/;
function parseParameter(param) {
    const match = param.match(PARAMETER_PATTERN);
    if (!match) {
        return parseMatchedParameter(param);
    }
    return parseMatchedParameter(match[2]);
}
function parseMatchedParameter(param) {
    const optional = param.startsWith('[') && param.endsWith(']');
    if (optional) {
        param = param.slice(1, -1);
    }
    const repeat = param.startsWith('...');
    if (repeat) {
        param = param.slice(3);
    }
    return {
        key: param,
        repeat,
        optional
    };
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/route-regex.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getNamedMiddlewareRegex: null,
    getNamedRouteRegex: null,
    getRouteRegex: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getNamedMiddlewareRegex: function() {
        return getNamedMiddlewareRegex;
    },
    getNamedRouteRegex: function() {
        return getNamedRouteRegex;
    },
    getRouteRegex: function() {
        return getRouteRegex;
    }
});
const _constants = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/lib/constants.js [client] (ecmascript)");
const _interceptionroutes = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/interception-routes.js [client] (ecmascript)");
const _escaperegexp = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/escape-regexp.js [client] (ecmascript)");
const _removetrailingslash = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js [client] (ecmascript)");
const _getdynamicparam = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/get-dynamic-param.js [client] (ecmascript)");
function getParametrizedRoute(route, includeSuffix, includePrefix) {
    const groups = {};
    let groupIndex = 1;
    const segments = [];
    for (const segment of (0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split('/')){
        const markerMatch = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
        const paramMatches = segment.match(_getdynamicparam.PARAMETER_PATTERN) 
        ;
        if (markerMatch && paramMatches && paramMatches[2]) {
            const { key, optional, repeat } = (0, _getdynamicparam.parseMatchedParameter)(paramMatches[2]);
            groups[key] = {
                pos: groupIndex++,
                repeat,
                optional
            };
            segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(markerMatch)}([^/]+?)`);
        } else if (paramMatches && paramMatches[2]) {
            const { key, repeat, optional } = (0, _getdynamicparam.parseMatchedParameter)(paramMatches[2]);
            groups[key] = {
                pos: groupIndex++,
                repeat,
                optional
            };
            if (includePrefix && paramMatches[1]) {
                segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(paramMatches[1])}`);
            }
            let s = repeat ? optional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
            
            if (includePrefix && paramMatches[1]) {
                s = s.substring(1);
            }
            segments.push(s);
        } else {
            segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(segment)}`);
        }
        
        if (includeSuffix && paramMatches && paramMatches[3]) {
            segments.push((0, _escaperegexp.escapeStringRegexp)(paramMatches[3]));
        }
    }
    return {
        parameterizedRoute: segments.join(''),
        groups
    };
}
function getRouteRegex(normalizedRoute, { includeSuffix = false, includePrefix = false, excludeOptionalTrailingSlash = false } = {}) {
    const { parameterizedRoute, groups } = getParametrizedRoute(normalizedRoute, includeSuffix, includePrefix);
    let re = parameterizedRoute;
    if (!excludeOptionalTrailingSlash) {
        re += '(?:/)?';
    }
    return {
        re: new RegExp(`^${re}$`),
        groups: groups
    };
}



 function buildGetSafeRouteKey() {
    let i = 0;
    return ()=>{
        let routeKey = '';
        let j = ++i;
        while(j > 0){
            routeKey += String.fromCharCode(97 + (j - 1) % 26);
            j = Math.floor((j - 1) / 26);
        }
        return routeKey;
    };
}
function getSafeKeyFromSegment({ interceptionMarker, getSafeRouteKey, segment, routeKeys, keyPrefix, backreferenceDuplicateKeys }) {
    const { key, optional, repeat } = (0, _getdynamicparam.parseMatchedParameter)(segment);
    
    
    let cleanedKey = key.replace(/\W/g, '');
    if (keyPrefix) {
        cleanedKey = `${keyPrefix}${cleanedKey}`;
    }
    let invalidKey = false;
    
    
    if (cleanedKey.length === 0 || cleanedKey.length > 30) {
        invalidKey = true;
    }
    if (!isNaN(parseInt(cleanedKey.slice(0, 1)))) {
        invalidKey = true;
    }
    if (invalidKey) {
        cleanedKey = getSafeRouteKey();
    }
    const duplicateKey = cleanedKey in routeKeys;
    if (keyPrefix) {
        routeKeys[cleanedKey] = `${keyPrefix}${key}`;
    } else {
        routeKeys[cleanedKey] = key;
    }
    
    
    
    const interceptionPrefix = interceptionMarker ? (0, _escaperegexp.escapeStringRegexp)(interceptionMarker) : '';
    let pattern;
    if (duplicateKey && backreferenceDuplicateKeys) {
        
        
        pattern = `\\k<${cleanedKey}>`;
    } else if (repeat) {
        pattern = `(?<${cleanedKey}>.+?)`;
    } else {
        pattern = `(?<${cleanedKey}>[^/]+?)`;
    }
    return {
        key,
        pattern: optional ? `(?:/${interceptionPrefix}${pattern})?` : `/${interceptionPrefix}${pattern}`,
        cleanedKey: cleanedKey,
        optional,
        repeat
    };
}
function getNamedParametrizedRoute(route, prefixRouteKeys, includeSuffix, includePrefix, backreferenceDuplicateKeys, reference = {
    names: {},
    intercepted: {}
}) {
    const getSafeRouteKey = buildGetSafeRouteKey();
    const routeKeys = {};
    const segments = [];
    const inverseParts = [];
    
    reference = structuredClone(reference);
    for (const segment of (0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split('/')){
        const hasInterceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m)=>segment.startsWith(m));
        const paramMatches = segment.match(_getdynamicparam.PARAMETER_PATTERN) 
        ;
        const interceptionMarker = hasInterceptionMarker ? paramMatches?.[1] : undefined;
        let keyPrefix;
        if (interceptionMarker && paramMatches?.[2]) {
            keyPrefix = prefixRouteKeys ? _constants.NEXT_INTERCEPTION_MARKER_PREFIX : undefined;
            reference.intercepted[paramMatches[2]] = interceptionMarker;
        } else if (paramMatches?.[2] && reference.intercepted[paramMatches[2]]) {
            keyPrefix = prefixRouteKeys ? _constants.NEXT_INTERCEPTION_MARKER_PREFIX : undefined;
        } else {
            keyPrefix = prefixRouteKeys ? _constants.NEXT_QUERY_PARAM_PREFIX : undefined;
        }
        if (interceptionMarker && paramMatches && paramMatches[2]) {
            
            const { key, pattern, cleanedKey, repeat, optional } = getSafeKeyFromSegment({
                getSafeRouteKey,
                interceptionMarker,
                segment: paramMatches[2],
                routeKeys,
                keyPrefix,
                backreferenceDuplicateKeys
            });
            segments.push(pattern);
            inverseParts.push(`/${paramMatches[1]}:${reference.names[key] ?? cleanedKey}${repeat ? optional ? '*' : '+' : ''}`);
            reference.names[key] ??= cleanedKey;
        } else if (paramMatches && paramMatches[2]) {
            
            if (includePrefix && paramMatches[1]) {
                segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(paramMatches[1])}`);
                inverseParts.push(`/${paramMatches[1]}`);
            }
            const { key, pattern, cleanedKey, repeat, optional } = getSafeKeyFromSegment({
                getSafeRouteKey,
                segment: paramMatches[2],
                routeKeys,
                keyPrefix,
                backreferenceDuplicateKeys
            });
            
            let s = pattern;
            if (includePrefix && paramMatches[1]) {
                s = s.substring(1);
            }
            segments.push(s);
            inverseParts.push(`/:${reference.names[key] ?? cleanedKey}${repeat ? optional ? '*' : '+' : ''}`);
            reference.names[key] ??= cleanedKey;
        } else {
            segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(segment)}`);
            inverseParts.push(`/${segment}`);
        }
        
        if (includeSuffix && paramMatches && paramMatches[3]) {
            segments.push((0, _escaperegexp.escapeStringRegexp)(paramMatches[3]));
            inverseParts.push(paramMatches[3]);
        }
    }
    return {
        namedParameterizedRoute: segments.join(''),
        routeKeys,
        pathToRegexpPattern: inverseParts.join(''),
        reference
    };
}
function getNamedRouteRegex(normalizedRoute, options) {
    const result = getNamedParametrizedRoute(normalizedRoute, options.prefixRouteKeys, options.includeSuffix ?? false, options.includePrefix ?? false, options.backreferenceDuplicateKeys ?? false, options.reference);
    let namedRegex = result.namedParameterizedRoute;
    if (!options.excludeOptionalTrailingSlash) {
        namedRegex += '(?:/)?';
    }
    return {
        ...getRouteRegex(normalizedRoute, options),
        namedRegex: `^${namedRegex}$`,
        routeKeys: result.routeKeys,
        pathToRegexpPattern: result.pathToRegexpPattern,
        reference: result.reference
    };
}
function getNamedMiddlewareRegex(normalizedRoute, options) {
    const { parameterizedRoute } = getParametrizedRoute(normalizedRoute, false, false);
    const { catchAll = true } = options;
    if (parameterizedRoute === '/') {
        let catchAllRegex = catchAll ? '.*' : '';
        return {
            namedRegex: `^/${catchAllRegex}$`
        };
    }
    const { namedParameterizedRoute } = getNamedParametrizedRoute(normalizedRoute, false, false, false, false, undefined);
    let catchAllGroupedRegex = catchAll ? '(?:(/.*)?)' : '';
    return {
        namedRegex: `^${namedParameterizedRoute}${catchAllGroupedRegex}$`
    };
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/interpolate-as.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "interpolateAs", {
    enumerable: true,
    get: function() {
        return interpolateAs;
    }
});
const _routematcher = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/route-matcher.js [client] (ecmascript)");
const _routeregex = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/route-regex.js [client] (ecmascript)");
function interpolateAs(route, asPathname, query) {
    let interpolatedRoute = '';
    const dynamicRegex = (0, _routeregex.getRouteRegex)(route);
    const dynamicGroups = dynamicRegex.groups;
    const dynamicMatches = (asPathname !== route ? (0, _routematcher.getRouteMatcher)(dynamicRegex)(asPathname) : '') || 
    
    query;
    interpolatedRoute = route;
    const params = Object.keys(dynamicGroups);
    if (!params.every((param)=>{
        let value = dynamicMatches[param] || '';
        const { repeat, optional } = dynamicGroups[param];
        
        
        let replaced = `[${repeat ? '...' : ''}${param}]`;
        if (optional) {
            replaced = `${!value ? '/' : ''}[${replaced}]`;
        }
        if (repeat && !Array.isArray(value)) value = [
            value
        ];
        return (optional || param in dynamicMatches) && 
        (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map(
        
        
        (segment)=>encodeURIComponent(segment)).join('/') : encodeURIComponent(value)) || '/');
    })) {
        interpolatedRoute = '' 
        ;
    
    
    }
    return {
        params,
        result: interpolatedRoute
    };
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/get-asset-path-from-route.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return getAssetPathFromRoute;
    }
});
function getAssetPathFromRoute(route, ext = '') {
    const path = route === '/' ? '/index' : /^\/index(\/|$)/.test(route) ? `/index${route}` : route;
    return path + ext;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/parse-relative-url.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseRelativeUrl", {
    enumerable: true,
    get: function() {
        return parseRelativeUrl;
    }
});
const _utils = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils.js [client] (ecmascript)");
const _querystring = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/querystring.js [client] (ecmascript)");
function parseRelativeUrl(url, base, parseQuery = true) {
    const globalBase = new URL(typeof window === 'undefined' ? 'http://n' : (0, _utils.getLocationOrigin)());
    const resolvedBase = base ? new URL(base, globalBase) : url.startsWith('.') ? new URL(typeof window === 'undefined' ? 'http://n' : window.location.href) : globalBase;
    const { pathname, searchParams, search, hash, href, origin } = new URL(url, resolvedBase);
    if (origin !== globalBase.origin) {
        throw Object.defineProperty(new Error(`invariant: invalid relative URL, router received ${url}`), "__NEXT_ERROR_CODE", {
            value: "E159",
            enumerable: false,
            configurable: true
        });
    }
    return {
        pathname,
        query: parseQuery ? (0, _querystring.searchParamsToUrlQuery)(searchParams) : undefined,
        search,
        hash,
        href: href.slice(origin.length),
        
        
        slashes: undefined
    };
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/encode-uri-path.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "encodeURIPath", {
    enumerable: true,
    get: function() {
        return encodeURIPath;
    }
});
function encodeURIPath(file) {
    return file.split('/').map((p)=>encodeURIComponent(p)).join('/');
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/modern-browserslist-target.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";






 const MODERN_BROWSERSLIST_TARGET = [
    'chrome 111',
    'edge 111',
    'firefox 111',
    'safari 16.4'
];
module.exports = MODERN_BROWSERSLIST_TARGET; 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/entry-constants.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    UNDERSCORE_GLOBAL_ERROR_ROUTE: null,
    UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY: null,
    UNDERSCORE_NOT_FOUND_ROUTE: null,
    UNDERSCORE_NOT_FOUND_ROUTE_ENTRY: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    UNDERSCORE_GLOBAL_ERROR_ROUTE: function() {
        return UNDERSCORE_GLOBAL_ERROR_ROUTE;
    },
    UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY: function() {
        return UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY;
    },
    UNDERSCORE_NOT_FOUND_ROUTE: function() {
        return UNDERSCORE_NOT_FOUND_ROUTE;
    },
    UNDERSCORE_NOT_FOUND_ROUTE_ENTRY: function() {
        return UNDERSCORE_NOT_FOUND_ROUTE_ENTRY;
    }
});
const UNDERSCORE_NOT_FOUND_ROUTE = '/_not-found';
const UNDERSCORE_NOT_FOUND_ROUTE_ENTRY = `${UNDERSCORE_NOT_FOUND_ROUTE}/page`;
const UNDERSCORE_GLOBAL_ERROR_ROUTE = '/_global-error';
const UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY = `${UNDERSCORE_GLOBAL_ERROR_ROUTE}/page`; 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/constants.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =  __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    APP_CLIENT_INTERNALS: null,
    APP_PATHS_MANIFEST: null,
    APP_PATH_ROUTES_MANIFEST: null,
    AdapterOutputType: null,
    BARREL_OPTIMIZATION_PREFIX: null,
    BLOCKED_PAGES: null,
    BUILD_ID_FILE: null,
    BUILD_MANIFEST: null,
    CLIENT_PUBLIC_FILES_PATH: null,
    CLIENT_REFERENCE_MANIFEST: null,
    CLIENT_STATIC_FILES_PATH: null,
    CLIENT_STATIC_FILES_RUNTIME_MAIN: null,
    CLIENT_STATIC_FILES_RUNTIME_MAIN_APP: null,
    CLIENT_STATIC_FILES_RUNTIME_POLYFILLS: null,
    CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL: null,
    CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH: null,
    CLIENT_STATIC_FILES_RUNTIME_WEBPACK: null,
    COMPILER_INDEXES: null,
    COMPILER_NAMES: null,
    CONFIG_FILES: null,
    DEFAULT_RUNTIME_WEBPACK: null,
    DEFAULT_SANS_SERIF_FONT: null,
    DEFAULT_SERIF_FONT: null,
    DEV_CLIENT_MIDDLEWARE_MANIFEST: null,
    DEV_CLIENT_PAGES_MANIFEST: null,
    DYNAMIC_CSS_MANIFEST: null,
    EDGE_RUNTIME_WEBPACK: null,
    EDGE_UNSUPPORTED_NODE_APIS: null,
    EXPORT_DETAIL: null,
    EXPORT_MARKER: null,
    FUNCTIONS_CONFIG_MANIFEST: null,
    IMAGES_MANIFEST: null,
    INTERCEPTION_ROUTE_REWRITE_MANIFEST: null,
    MIDDLEWARE_BUILD_MANIFEST: null,
    MIDDLEWARE_MANIFEST: null,
    MIDDLEWARE_REACT_LOADABLE_MANIFEST: null,
    MODERN_BROWSERSLIST_TARGET: null,
    NEXT_BUILTIN_DOCUMENT: null,
    NEXT_FONT_MANIFEST: null,
    PAGES_MANIFEST: null,
    PHASE_DEVELOPMENT_SERVER: null,
    PHASE_EXPORT: null,
    PHASE_INFO: null,
    PHASE_PRODUCTION_BUILD: null,
    PHASE_PRODUCTION_SERVER: null,
    PHASE_TEST: null,
    PRERENDER_MANIFEST: null,
    REACT_LOADABLE_MANIFEST: null,
    ROUTES_MANIFEST: null,
    RSC_MODULE_TYPES: null,
    SERVER_DIRECTORY: null,
    SERVER_FILES_MANIFEST: null,
    SERVER_PROPS_ID: null,
    SERVER_REFERENCE_MANIFEST: null,
    STATIC_PROPS_ID: null,
    STATIC_STATUS_PAGES: null,
    STRING_LITERAL_DROP_BUNDLE: null,
    SUBRESOURCE_INTEGRITY_MANIFEST: null,
    SYSTEM_ENTRYPOINTS: null,
    TRACE_OUTPUT_VERSION: null,
    TURBOPACK_CLIENT_BUILD_MANIFEST: null,
    TURBOPACK_CLIENT_MIDDLEWARE_MANIFEST: null,
    TURBO_TRACE_DEFAULT_MEMORY_LIMIT: null,
    UNDERSCORE_GLOBAL_ERROR_ROUTE: null,
    UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY: null,
    UNDERSCORE_NOT_FOUND_ROUTE: null,
    UNDERSCORE_NOT_FOUND_ROUTE_ENTRY: null,
    WEBPACK_STATS: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    APP_CLIENT_INTERNALS: function() {
        return APP_CLIENT_INTERNALS;
    },
    APP_PATHS_MANIFEST: function() {
        return APP_PATHS_MANIFEST;
    },
    APP_PATH_ROUTES_MANIFEST: function() {
        return APP_PATH_ROUTES_MANIFEST;
    },
    AdapterOutputType: function() {
        return AdapterOutputType;
    },
    BARREL_OPTIMIZATION_PREFIX: function() {
        return BARREL_OPTIMIZATION_PREFIX;
    },
    BLOCKED_PAGES: function() {
        return BLOCKED_PAGES;
    },
    BUILD_ID_FILE: function() {
        return BUILD_ID_FILE;
    },
    BUILD_MANIFEST: function() {
        return BUILD_MANIFEST;
    },
    CLIENT_PUBLIC_FILES_PATH: function() {
        return CLIENT_PUBLIC_FILES_PATH;
    },
    CLIENT_REFERENCE_MANIFEST: function() {
        return CLIENT_REFERENCE_MANIFEST;
    },
    CLIENT_STATIC_FILES_PATH: function() {
        return CLIENT_STATIC_FILES_PATH;
    },
    CLIENT_STATIC_FILES_RUNTIME_MAIN: function() {
        return CLIENT_STATIC_FILES_RUNTIME_MAIN;
    },
    CLIENT_STATIC_FILES_RUNTIME_MAIN_APP: function() {
        return CLIENT_STATIC_FILES_RUNTIME_MAIN_APP;
    },
    CLIENT_STATIC_FILES_RUNTIME_POLYFILLS: function() {
        return CLIENT_STATIC_FILES_RUNTIME_POLYFILLS;
    },
    CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL: function() {
        return CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL;
    },
    CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH: function() {
        return CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH;
    },
    CLIENT_STATIC_FILES_RUNTIME_WEBPACK: function() {
        return CLIENT_STATIC_FILES_RUNTIME_WEBPACK;
    },
    COMPILER_INDEXES: function() {
        return COMPILER_INDEXES;
    },
    COMPILER_NAMES: function() {
        return COMPILER_NAMES;
    },
    CONFIG_FILES: function() {
        return CONFIG_FILES;
    },
    DEFAULT_RUNTIME_WEBPACK: function() {
        return DEFAULT_RUNTIME_WEBPACK;
    },
    DEFAULT_SANS_SERIF_FONT: function() {
        return DEFAULT_SANS_SERIF_FONT;
    },
    DEFAULT_SERIF_FONT: function() {
        return DEFAULT_SERIF_FONT;
    },
    DEV_CLIENT_MIDDLEWARE_MANIFEST: function() {
        return DEV_CLIENT_MIDDLEWARE_MANIFEST;
    },
    DEV_CLIENT_PAGES_MANIFEST: function() {
        return DEV_CLIENT_PAGES_MANIFEST;
    },
    DYNAMIC_CSS_MANIFEST: function() {
        return DYNAMIC_CSS_MANIFEST;
    },
    EDGE_RUNTIME_WEBPACK: function() {
        return EDGE_RUNTIME_WEBPACK;
    },
    EDGE_UNSUPPORTED_NODE_APIS: function() {
        return EDGE_UNSUPPORTED_NODE_APIS;
    },
    EXPORT_DETAIL: function() {
        return EXPORT_DETAIL;
    },
    EXPORT_MARKER: function() {
        return EXPORT_MARKER;
    },
    FUNCTIONS_CONFIG_MANIFEST: function() {
        return FUNCTIONS_CONFIG_MANIFEST;
    },
    IMAGES_MANIFEST: function() {
        return IMAGES_MANIFEST;
    },
    INTERCEPTION_ROUTE_REWRITE_MANIFEST: function() {
        return INTERCEPTION_ROUTE_REWRITE_MANIFEST;
    },
    MIDDLEWARE_BUILD_MANIFEST: function() {
        return MIDDLEWARE_BUILD_MANIFEST;
    },
    MIDDLEWARE_MANIFEST: function() {
        return MIDDLEWARE_MANIFEST;
    },
    MIDDLEWARE_REACT_LOADABLE_MANIFEST: function() {
        return MIDDLEWARE_REACT_LOADABLE_MANIFEST;
    },
    MODERN_BROWSERSLIST_TARGET: function() {
        return _modernbrowserslisttarget.default;
    },
    NEXT_BUILTIN_DOCUMENT: function() {
        return NEXT_BUILTIN_DOCUMENT;
    },
    NEXT_FONT_MANIFEST: function() {
        return NEXT_FONT_MANIFEST;
    },
    PAGES_MANIFEST: function() {
        return PAGES_MANIFEST;
    },
    PHASE_DEVELOPMENT_SERVER: function() {
        return PHASE_DEVELOPMENT_SERVER;
    },
    PHASE_EXPORT: function() {
        return PHASE_EXPORT;
    },
    PHASE_INFO: function() {
        return PHASE_INFO;
    },
    PHASE_PRODUCTION_BUILD: function() {
        return PHASE_PRODUCTION_BUILD;
    },
    PHASE_PRODUCTION_SERVER: function() {
        return PHASE_PRODUCTION_SERVER;
    },
    PHASE_TEST: function() {
        return PHASE_TEST;
    },
    PRERENDER_MANIFEST: function() {
        return PRERENDER_MANIFEST;
    },
    REACT_LOADABLE_MANIFEST: function() {
        return REACT_LOADABLE_MANIFEST;
    },
    ROUTES_MANIFEST: function() {
        return ROUTES_MANIFEST;
    },
    RSC_MODULE_TYPES: function() {
        return RSC_MODULE_TYPES;
    },
    SERVER_DIRECTORY: function() {
        return SERVER_DIRECTORY;
    },
    SERVER_FILES_MANIFEST: function() {
        return SERVER_FILES_MANIFEST;
    },
    SERVER_PROPS_ID: function() {
        return SERVER_PROPS_ID;
    },
    SERVER_REFERENCE_MANIFEST: function() {
        return SERVER_REFERENCE_MANIFEST;
    },
    STATIC_PROPS_ID: function() {
        return STATIC_PROPS_ID;
    },
    STATIC_STATUS_PAGES: function() {
        return STATIC_STATUS_PAGES;
    },
    STRING_LITERAL_DROP_BUNDLE: function() {
        return STRING_LITERAL_DROP_BUNDLE;
    },
    SUBRESOURCE_INTEGRITY_MANIFEST: function() {
        return SUBRESOURCE_INTEGRITY_MANIFEST;
    },
    SYSTEM_ENTRYPOINTS: function() {
        return SYSTEM_ENTRYPOINTS;
    },
    TRACE_OUTPUT_VERSION: function() {
        return TRACE_OUTPUT_VERSION;
    },
    TURBOPACK_CLIENT_BUILD_MANIFEST: function() {
        return TURBOPACK_CLIENT_BUILD_MANIFEST;
    },
    TURBOPACK_CLIENT_MIDDLEWARE_MANIFEST: function() {
        return TURBOPACK_CLIENT_MIDDLEWARE_MANIFEST;
    },
    TURBO_TRACE_DEFAULT_MEMORY_LIMIT: function() {
        return TURBO_TRACE_DEFAULT_MEMORY_LIMIT;
    },
    UNDERSCORE_GLOBAL_ERROR_ROUTE: function() {
        return _entryconstants.UNDERSCORE_GLOBAL_ERROR_ROUTE;
    },
    UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY: function() {
        return _entryconstants.UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY;
    },
    UNDERSCORE_NOT_FOUND_ROUTE: function() {
        return _entryconstants.UNDERSCORE_NOT_FOUND_ROUTE;
    },
    UNDERSCORE_NOT_FOUND_ROUTE_ENTRY: function() {
        return _entryconstants.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY;
    },
    WEBPACK_STATS: function() {
        return WEBPACK_STATS;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _modernbrowserslisttarget =  _interop_require_default._(__turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/modern-browserslist-target.js [client] (ecmascript)"));
const _entryconstants = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/entry-constants.js [client] (ecmascript)");
const COMPILER_NAMES = {
    client: 'client',
    server: 'server',
    edgeServer: 'edge-server'
};
const COMPILER_INDEXES = {
    [COMPILER_NAMES.client]: 0,
    [COMPILER_NAMES.server]: 1,
    [COMPILER_NAMES.edgeServer]: 2
};
var AdapterOutputType =  function(AdapterOutputType) {
    

 AdapterOutputType["PAGES"] = "PAGES";
    

 AdapterOutputType["PAGES_API"] = "PAGES_API";
    


 AdapterOutputType["APP_PAGE"] = "APP_PAGE";
    


 AdapterOutputType["APP_ROUTE"] = "APP_ROUTE";
    


 AdapterOutputType["PRERENDER"] = "PRERENDER";
    

 AdapterOutputType["STATIC_FILE"] = "STATIC_FILE";
    

 AdapterOutputType["MIDDLEWARE"] = "MIDDLEWARE";
    return AdapterOutputType;
}({});
const PHASE_EXPORT = 'phase-export';
const PHASE_PRODUCTION_BUILD = 'phase-production-build';
const PHASE_PRODUCTION_SERVER = 'phase-production-server';
const PHASE_DEVELOPMENT_SERVER = 'phase-development-server';
const PHASE_TEST = 'phase-test';
const PHASE_INFO = 'phase-info';
const PAGES_MANIFEST = 'pages-manifest.json';
const WEBPACK_STATS = 'webpack-stats.json';
const APP_PATHS_MANIFEST = 'app-paths-manifest.json';
const APP_PATH_ROUTES_MANIFEST = 'app-path-routes-manifest.json';
const BUILD_MANIFEST = 'build-manifest.json';
const FUNCTIONS_CONFIG_MANIFEST = 'functions-config-manifest.json';
const SUBRESOURCE_INTEGRITY_MANIFEST = 'subresource-integrity-manifest';
const NEXT_FONT_MANIFEST = 'next-font-manifest';
const EXPORT_MARKER = 'export-marker.json';
const EXPORT_DETAIL = 'export-detail.json';
const PRERENDER_MANIFEST = 'prerender-manifest.json';
const ROUTES_MANIFEST = 'routes-manifest.json';
const IMAGES_MANIFEST = 'images-manifest.json';
const SERVER_FILES_MANIFEST = 'required-server-files.json';
const DEV_CLIENT_PAGES_MANIFEST = '_devPagesManifest.json';
const MIDDLEWARE_MANIFEST = 'middleware-manifest.json';
const TURBOPACK_CLIENT_MIDDLEWARE_MANIFEST = '_clientMiddlewareManifest.json';
const TURBOPACK_CLIENT_BUILD_MANIFEST = 'client-build-manifest.json';
const DEV_CLIENT_MIDDLEWARE_MANIFEST = '_devMiddlewareManifest.json';
const REACT_LOADABLE_MANIFEST = 'react-loadable-manifest.json';
const SERVER_DIRECTORY = 'server';
const CONFIG_FILES = [
    'next.config.js',
    'next.config.mjs',
    'next.config.ts',
    
    
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]?.features?.typescript ? [
        'next.config.mts'
    ] : []
];
const BUILD_ID_FILE = 'BUILD_ID';
const BLOCKED_PAGES = [
    '/_document',
    '/_app',
    '/_error'
];
const CLIENT_PUBLIC_FILES_PATH = 'public';
const CLIENT_STATIC_FILES_PATH = 'static';
const STRING_LITERAL_DROP_BUNDLE = '__NEXT_DROP_CLIENT_FILE__';
const NEXT_BUILTIN_DOCUMENT = '__NEXT_BUILTIN_DOCUMENT__';
const BARREL_OPTIMIZATION_PREFIX = '__barrel_optimize__';
const CLIENT_REFERENCE_MANIFEST = 'client-reference-manifest';
const SERVER_REFERENCE_MANIFEST = 'server-reference-manifest';
const MIDDLEWARE_BUILD_MANIFEST = 'middleware-build-manifest';
const MIDDLEWARE_REACT_LOADABLE_MANIFEST = 'middleware-react-loadable-manifest';
const INTERCEPTION_ROUTE_REWRITE_MANIFEST = 'interception-route-rewrite-manifest';
const DYNAMIC_CSS_MANIFEST = 'dynamic-css-manifest';
const CLIENT_STATIC_FILES_RUNTIME_MAIN = `main`;
const CLIENT_STATIC_FILES_RUNTIME_MAIN_APP = `${CLIENT_STATIC_FILES_RUNTIME_MAIN}-app`;
const APP_CLIENT_INTERNALS = 'app-pages-internals';
const CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH = `react-refresh`;
const CLIENT_STATIC_FILES_RUNTIME_WEBPACK = `webpack`;
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS = 'polyfills';
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL = Symbol(CLIENT_STATIC_FILES_RUNTIME_POLYFILLS);
const DEFAULT_RUNTIME_WEBPACK = 'webpack-runtime';
const EDGE_RUNTIME_WEBPACK = 'edge-runtime-webpack';
const STATIC_PROPS_ID = '__N_SSG';
const SERVER_PROPS_ID = '__N_SSP';
const DEFAULT_SERIF_FONT = {
    name: 'Times New Roman',
    xAvgCharWidth: 821,
    azAvgWidth: 854.3953488372093,
    unitsPerEm: 2048
};
const DEFAULT_SANS_SERIF_FONT = {
    name: 'Arial',
    xAvgCharWidth: 904,
    azAvgWidth: 934.5116279069767,
    unitsPerEm: 2048
};
const STATIC_STATUS_PAGES = [
    '/500'
];
const TRACE_OUTPUT_VERSION = 1;
const TURBO_TRACE_DEFAULT_MEMORY_LIMIT = 6000;
const RSC_MODULE_TYPES = {
    client: 'client',
    server: 'server'
};
const EDGE_UNSUPPORTED_NODE_APIS = [
    'clearImmediate',
    'setImmediate',
    'BroadcastChannel',
    'ByteLengthQueuingStrategy',
    'CompressionStream',
    'CountQueuingStrategy',
    'DecompressionStream',
    'DomException',
    'MessageChannel',
    'MessageEvent',
    'MessagePort',
    'ReadableByteStreamController',
    'ReadableStreamBYOBRequest',
    'ReadableStreamDefaultController',
    'TransformStreamDefaultController',
    'WritableStreamDefaultController'
];
const SYSTEM_ENTRYPOINTS = new Set([
    CLIENT_STATIC_FILES_RUNTIME_MAIN,
    CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH,
    CLIENT_STATIC_FILES_RUNTIME_MAIN_APP
]);
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/bloom-filter.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";


var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =  __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BloomFilter", {
    enumerable: true,
    get: function() {
        return BloomFilter;
    }
});
function murmurhash2(str) {
    let h = 0;
    for(let i = 0; i < str.length; i++){
        const c = str.charCodeAt(i);
        h = Math.imul(h ^ c, 0x5bd1e995);
        h ^= h >>> 13;
        h = Math.imul(h, 0x5bd1e995);
    }
    return h >>> 0;
}

const DEFAULT_ERROR_RATE = 0.0001;
class BloomFilter {
    constructor(numItems, errorRate = DEFAULT_ERROR_RATE){
        this.numItems = numItems;
        this.errorRate = errorRate;
        this.numBits = Math.ceil(-(numItems * Math.log(errorRate)) / (Math.log(2) * Math.log(2)));
        this.numHashes = Math.ceil(this.numBits / numItems * Math.log(2));
        this.bitArray = new Array(this.numBits).fill(0);
    }
    static from(items, errorRate = DEFAULT_ERROR_RATE) {
        const filter = new BloomFilter(items.length, errorRate);
        for (const item of items){
            filter.add(item);
        }
        return filter;
    }
    export() {
        const data = {
            numItems: this.numItems,
            errorRate: this.errorRate,
            numBits: this.numBits,
            numHashes: this.numHashes,
            bitArray: this.bitArray
        };
        if ("TURBOPACK compile-time falsy", 0) 
        ;
        return data;
    }
    import(data) {
        this.numItems = data.numItems;
        this.errorRate = data.errorRate;
        this.numBits = data.numBits;
        this.numHashes = data.numHashes;
        this.bitArray = data.bitArray;
    }
    add(item) {
        const hashValues = this.getHashValues(item);
        hashValues.forEach((hash)=>{
            this.bitArray[hash] = 1;
        });
    }
    contains(item) {
        const hashValues = this.getHashValues(item);
        return hashValues.every((hash)=>this.bitArray[hash]);
    }
    getHashValues(item) {
        const hashValues = [];
        for(let i = 1; i <= this.numHashes; i++){
            const hash = murmurhash2(`${item}${i}`) % this.numBits;
            hashValues.push(hash);
        }
        return hashValues;
    }
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/is-plain-object.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getObjectClassLabel: null,
    isPlainObject: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getObjectClassLabel: function() {
        return getObjectClassLabel;
    },
    isPlainObject: function() {
        return isPlainObject;
    }
});
function getObjectClassLabel(value) {
    return Object.prototype.toString.call(value);
}
function isPlainObject(value) {
    if (getObjectClassLabel(value) !== '[object Object]') {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    







 return prototype === null || prototype.hasOwnProperty('isPrototypeOf');
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/sorted-routes.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getSortedRouteObjects: null,
    getSortedRoutes: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getSortedRouteObjects: function() {
        return getSortedRouteObjects;
    },
    getSortedRoutes: function() {
        return getSortedRoutes;
    }
});
class UrlNode {
    insert(urlPath) {
        this._insert(urlPath.split('/').filter(Boolean), [], false);
    }
    smoosh() {
        return this._smoosh();
    }
    _smoosh(prefix = '/') {
        const childrenPaths = [
            ...this.children.keys()
        ].sort();
        if (this.slugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[]'), 1);
        }
        if (this.restSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[...]'), 1);
        }
        if (this.optionalRestSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[[...]]'), 1);
        }
        const routes = childrenPaths.map((c)=>this.children.get(c)._smoosh(`${prefix}${c}/`)).reduce((prev, curr)=>[
                ...prev,
                ...curr
            ], []);
        if (this.slugName !== null) {
            routes.push(...this.children.get('[]')._smoosh(`${prefix}[${this.slugName}]/`));
        }
        if (!this.placeholder) {
            const r = prefix === '/' ? '/' : prefix.slice(0, -1);
            if (this.optionalRestSlugName != null) {
                throw Object.defineProperty(new Error(`You cannot define a route with the same specificity as a optional catch-all route ("${r}" and "${r}[[...${this.optionalRestSlugName}]]").`), "__NEXT_ERROR_CODE", {
                    value: "E458",
                    enumerable: false,
                    configurable: true
                });
            }
            routes.unshift(r);
        }
        if (this.restSlugName !== null) {
            routes.push(...this.children.get('[...]')._smoosh(`${prefix}[...${this.restSlugName}]/`));
        }
        if (this.optionalRestSlugName !== null) {
            routes.push(...this.children.get('[[...]]')._smoosh(`${prefix}[[...${this.optionalRestSlugName}]]/`));
        }
        return routes;
    }
    _insert(urlPaths, slugNames, isCatchAll) {
        if (urlPaths.length === 0) {
            this.placeholder = false;
            return;
        }
        if (isCatchAll) {
            throw Object.defineProperty(new Error(`Catch-all must be the last part of the URL.`), "__NEXT_ERROR_CODE", {
                value: "E392",
                enumerable: false,
                configurable: true
            });
        }
        
        let nextSegment = urlPaths[0];
        
        if (nextSegment.startsWith('[') && nextSegment.endsWith(']')) {
            
            let segmentName = nextSegment.slice(1, -1);
            let isOptional = false;
            if (segmentName.startsWith('[') && segmentName.endsWith(']')) {
                
                segmentName = segmentName.slice(1, -1);
                isOptional = true;
            }
            if (segmentName.startsWith('…')) {
                throw Object.defineProperty(new Error(`Detected a three-dot character ('…') at ('${segmentName}'). Did you mean ('...')?`), "__NEXT_ERROR_CODE", {
                    value: "E147",
                    enumerable: false,
                    configurable: true
                });
            }
            if (segmentName.startsWith('...')) {
                
                segmentName = segmentName.substring(3);
                isCatchAll = true;
            }
            if (segmentName.startsWith('[') || segmentName.endsWith(']')) {
                throw Object.defineProperty(new Error(`Segment names may not start or end with extra brackets ('${segmentName}').`), "__NEXT_ERROR_CODE", {
                    value: "E421",
                    enumerable: false,
                    configurable: true
                });
            }
            if (segmentName.startsWith('.')) {
                throw Object.defineProperty(new Error(`Segment names may not start with erroneous periods ('${segmentName}').`), "__NEXT_ERROR_CODE", {
                    value: "E288",
                    enumerable: false,
                    configurable: true
                });
            }
            function handleSlug(previousSlug, nextSlug) {
                if (previousSlug !== null) {
                    
                    
                    
                    
                    
                    if (previousSlug !== nextSlug) {
                        
                        throw Object.defineProperty(new Error(`You cannot use different slug names for the same dynamic path ('${previousSlug}' !== '${nextSlug}').`), "__NEXT_ERROR_CODE", {
                            value: "E337",
                            enumerable: false,
                            configurable: true
                        });
                    }
                }
                slugNames.forEach((slug)=>{
                    if (slug === nextSlug) {
                        throw Object.defineProperty(new Error(`You cannot have the same slug name "${nextSlug}" repeat within a single dynamic path`), "__NEXT_ERROR_CODE", {
                            value: "E247",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    if (slug.replace(/\W/g, '') === nextSegment.replace(/\W/g, '')) {
                        throw Object.defineProperty(new Error(`You cannot have the slug names "${slug}" and "${nextSlug}" differ only by non-word symbols within a single dynamic path`), "__NEXT_ERROR_CODE", {
                            value: "E499",
                            enumerable: false,
                            configurable: true
                        });
                    }
                });
                slugNames.push(nextSlug);
            }
            if (isCatchAll) {
                if (isOptional) {
                    if (this.restSlugName != null) {
                        throw Object.defineProperty(new Error(`You cannot use both an required and optional catch-all route at the same level ("[...${this.restSlugName}]" and "${urlPaths[0]}" ).`), "__NEXT_ERROR_CODE", {
                            value: "E299",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    handleSlug(this.optionalRestSlugName, segmentName);
                    
                    this.optionalRestSlugName = segmentName;
                    
                    nextSegment = '[[...]]';
                } else {
                    if (this.optionalRestSlugName != null) {
                        throw Object.defineProperty(new Error(`You cannot use both an optional and required catch-all route at the same level ("[[...${this.optionalRestSlugName}]]" and "${urlPaths[0]}").`), "__NEXT_ERROR_CODE", {
                            value: "E300",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    handleSlug(this.restSlugName, segmentName);
                    
                    this.restSlugName = segmentName;
                    
                    nextSegment = '[...]';
                }
            } else {
                if (isOptional) {
                    throw Object.defineProperty(new Error(`Optional route parameters are not yet supported ("${urlPaths[0]}").`), "__NEXT_ERROR_CODE", {
                        value: "E435",
                        enumerable: false,
                        configurable: true
                    });
                }
                handleSlug(this.slugName, segmentName);
                
                this.slugName = segmentName;
                
                nextSegment = '[]';
            }
        }
        
        if (!this.children.has(nextSegment)) {
            this.children.set(nextSegment, new UrlNode());
        }
        this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
    }
    constructor(){
        this.placeholder = true;
        this.children = new Map();
        this.slugName = null;
        this.restSlugName = null;
        this.optionalRestSlugName = null;
    }
}
function getSortedRoutes(normalizedPages) {
    
    
    
    
    
    
    
    
    
    
    const root = new UrlNode();
    
    normalizedPages.forEach((pagePath)=>root.insert(pagePath));
    
    return root.smoosh();
}
function getSortedRouteObjects(objects, getter) {
    
    
    const indexes = {};
    const pathnames = [];
    for(let i = 0; i < objects.length; i++){
        const pathname = getter(objects[i]);
        indexes[pathname] = i;
        pathnames[i] = pathname;
    }
    
    const sorted = getSortedRoutes(pathnames);
    
    
    return sorted.map((pathname)=>objects[indexes[pathname]]);
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    getSortedRouteObjects: null,
    getSortedRoutes: null,
    isDynamicRoute: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getSortedRouteObjects: function() {
        return _sortedroutes.getSortedRouteObjects;
    },
    getSortedRoutes: function() {
        return _sortedroutes.getSortedRoutes;
    },
    isDynamicRoute: function() {
        return _isdynamic.isDynamicRoute;
    }
});
const _sortedroutes = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/sorted-routes.js [client] (ecmascript)");
const _isdynamic = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js [client] (ecmascript)"); 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/page-path/normalize-path-sep.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";





 Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "normalizePathSep", {
    enumerable: true,
    get: function() {
        return normalizePathSep;
    }
});
function normalizePathSep(path) {
    return path.replace(/\\/g, '/');
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/page-path/denormalize-page-path.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "denormalizePagePath", {
    enumerable: true,
    get: function() {
        return denormalizePagePath;
    }
});
const _utils = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/index.js [client] (ecmascript)");
const _normalizepathsep = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/page-path/normalize-path-sep.js [client] (ecmascript)");
function denormalizePagePath(page) {
    let _page = (0, _normalizepathsep.normalizePathSep)(page);
    return _page.startsWith('/index/') && !(0, _utils.isDynamicRoute)(_page) ? _page.slice(6) : _page !== '/index' ? _page : '/';
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "normalizeLocalePath", {
    enumerable: true,
    get: function() {
        return normalizeLocalePath;
    }
});




 const cache = new WeakMap();
function normalizeLocalePath(pathname, locales) {
    
    if (!locales) return {
        pathname
    };
    
    let lowercasedLocales = cache.get(locales);
    if (!lowercasedLocales) {
        lowercasedLocales = locales.map((locale)=>locale.toLowerCase());
        cache.set(locales, lowercasedLocales);
    }
    let detectedLocale;
    
    
    const segments = pathname.split('/', 2);
    
    
    if (!segments[1]) return {
        pathname
    };
    
    const segment = segments[1].toLowerCase();
    
    
    const index = lowercasedLocales.indexOf(segment);
    if (index < 0) return {
        pathname
    };
    
    detectedLocale = locales[index];
    
    pathname = pathname.slice(detectedLocale.length + 1) || '/';
    return {
        pathname,
        detectedLocale
    };
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/format-url.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";






















var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =  __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [client] (ecmascript)");
const _querystring =  _interop_require_wildcard._(__turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/querystring.js [client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pathHasPrefix", {
    enumerable: true,
    get: function() {
        return pathHasPrefix;
    }
});
const _parsepath = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/parse-path.js [client] (ecmascript)");
function pathHasPrefix(path, prefix) {
    if (typeof path !== 'string') {
        return false;
    }
    const { pathname } = (0, _parsepath.parsePath)(path);
    return pathname === prefix || pathname.startsWith(prefix + '/');
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/omit.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "omit", {
    enumerable: true,
    get: function() {
        return omit;
    }
});
function omit(object, keys) {
    const omitted = {};
    Object.keys(object).forEach((key)=>{
        if (!keys.includes(key)) {
            omitted[key] = object[key];
        }
    });
    return omitted;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils.js [client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/has-base-path.js [client] (ecmascript)");
function isLocalURL(url) {
    
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/remove-path-prefix.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removePathPrefix", {
    enumerable: true,
    get: function() {
        return removePathPrefix;
    }
});
const _pathhasprefix = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [client] (ecmascript)");
function removePathPrefix(path, prefix) {
    
    
    
    
    
    
    
    
    
    
    
    
    if (!(0, _pathhasprefix.pathHasPrefix)(path, prefix)) {
        return path;
    }
    
    const withoutPrefix = path.slice(prefix.length);
    
    if (withoutPrefix.startsWith('/')) {
        return withoutPrefix;
    }
    
    
    return `/${withoutPrefix}`;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/get-next-pathname-info.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getNextPathnameInfo", {
    enumerable: true,
    get: function() {
        return getNextPathnameInfo;
    }
});
const _normalizelocalepath = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js [client] (ecmascript)");
const _removepathprefix = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/remove-path-prefix.js [client] (ecmascript)");
const _pathhasprefix = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [client] (ecmascript)");
function getNextPathnameInfo(pathname, options) {
    const { basePath, i18n, trailingSlash } = options.nextConfig ?? {};
    const info = {
        pathname,
        trailingSlash: pathname !== '/' ? pathname.endsWith('/') : trailingSlash
    };
    if (basePath && (0, _pathhasprefix.pathHasPrefix)(info.pathname, basePath)) {
        info.pathname = (0, _removepathprefix.removePathPrefix)(info.pathname, basePath);
        info.basePath = basePath;
    }
    let pathnameNoDataPrefix = info.pathname;
    if (info.pathname.startsWith('/_next/data/') && info.pathname.endsWith('.json')) {
        const paths = info.pathname.replace(/^\/_next\/data\
        const buildId = paths[0];
        info.buildId = buildId;
        pathnameNoDataPrefix = paths[1] !== 'index' ? `/${paths.slice(1).join('/')}` : '/';
        
        
        if (options.parseData === true) {
            info.pathname = pathnameNoDataPrefix;
        }
    }
    
    
    if (i18n) {
        let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : (0, _normalizelocalepath.normalizeLocalePath)(info.pathname, i18n.locales);
        info.locale = result.detectedLocale;
        info.pathname = result.pathname ?? info.pathname;
        if (!result.detectedLocale && info.buildId) {
            result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : (0, _normalizelocalepath.normalizeLocalePath)(pathnameNoDataPrefix, i18n.locales);
            if (result.detectedLocale) {
                info.locale = result.detectedLocale;
            }
        }
    }
    return info;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/add-path-suffix.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addPathSuffix", {
    enumerable: true,
    get: function() {
        return addPathSuffix;
    }
});
const _parsepath = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/parse-path.js [client] (ecmascript)");
function addPathSuffix(path, suffix) {
    if (!path.startsWith('/') || !suffix) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return `${pathname}${suffix}${query}${hash}`;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/add-locale.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addLocale", {
    enumerable: true,
    get: function() {
        return addLocale;
    }
});
const _addpathprefix = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [client] (ecmascript)");
const _pathhasprefix = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js [client] (ecmascript)");
function addLocale(path, locale, defaultLocale, ignorePrefix) {
    
    
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    
    
    if (!ignorePrefix) {
        if ((0, _pathhasprefix.pathHasPrefix)(lower, '/api')) return path;
        if ((0, _pathhasprefix.pathHasPrefix)(lower, `/${locale.toLowerCase()}`)) return path;
    }
    
    return (0, _addpathprefix.addPathPrefix)(path, `/${locale}`);
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/format-next-pathname-info.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatNextPathnameInfo", {
    enumerable: true,
    get: function() {
        return formatNextPathnameInfo;
    }
});
const _removetrailingslash = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js [client] (ecmascript)");
const _addpathprefix = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [client] (ecmascript)");
const _addpathsuffix = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/add-path-suffix.js [client] (ecmascript)");
const _addlocale = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/add-locale.js [client] (ecmascript)");
function formatNextPathnameInfo(info) {
    let pathname = (0, _addlocale.addLocale)(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = (0, _removetrailingslash.removeTrailingSlash)(pathname);
    }
    if (info.buildId) {
        pathname = (0, _addpathsuffix.addPathSuffix)((0, _addpathprefix.addPathPrefix)(pathname, `/_next/data/${info.buildId}`), info.pathname === '/' ? 'index.json' : '.json');
    }
    pathname = (0, _addpathprefix.addPathPrefix)(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith('/') ? (0, _addpathsuffix.addPathSuffix)(pathname, '/') : pathname : (0, _removetrailingslash.removeTrailingSlash)(pathname);
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/compare-states.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "compareRouterStates", {
    enumerable: true,
    get: function() {
        return compareRouterStates;
    }
});
function compareRouterStates(a, b) {
    const stateKeys = Object.keys(a);
    if (stateKeys.length !== Object.keys(b).length) return false;
    for(let i = stateKeys.length; i--;){
        const key = stateKeys[i];
        if (key === 'query') {
            const queryKeys = Object.keys(a.query);
            if (queryKeys.length !== Object.keys(b.query).length) {
                return false;
            }
            for(let j = queryKeys.length; j--;){
                const queryKey = queryKeys[j];
                if (!b.query.hasOwnProperty(queryKey) || a.query[queryKey] !== b.query[queryKey]) {
                    return false;
                }
            }
        } else if (!b.hasOwnProperty(key) || a[key] !== b[key]) {
            return false;
        }
    }
    return true;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/html-bots.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";





Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HTML_LIMITED_BOT_UA_RE", {
    enumerable: true,
    get: function() {
        return HTML_LIMITED_BOT_UA_RE;
    }
});
const HTML_LIMITED_BOT_UA_RE = /[\w-]+-Google|Google-[\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight/i; 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/is-bot.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    HTML_LIMITED_BOT_UA_RE: null,
    HTML_LIMITED_BOT_UA_RE_STRING: null,
    getBotType: null,
    isBot: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    HTML_LIMITED_BOT_UA_RE: function() {
        return _htmlbots.HTML_LIMITED_BOT_UA_RE;
    },
    HTML_LIMITED_BOT_UA_RE_STRING: function() {
        return HTML_LIMITED_BOT_UA_RE_STRING;
    },
    getBotType: function() {
        return getBotType;
    },
    isBot: function() {
        return isBot;
    }
});
const _htmlbots = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/html-bots.js [client] (ecmascript)");




const HEADLESS_BROWSER_BOT_UA_RE = /Googlebot(?!-)|Googlebot$/i;
const HTML_LIMITED_BOT_UA_RE_STRING = _htmlbots.HTML_LIMITED_BOT_UA_RE.source;
function isDomBotUA(userAgent) {
    return HEADLESS_BROWSER_BOT_UA_RE.test(userAgent);
}
function isHtmlLimitedBotUA(userAgent) {
    return _htmlbots.HTML_LIMITED_BOT_UA_RE.test(userAgent);
}
function isBot(userAgent) {
    return isDomBotUA(userAgent) || isHtmlLimitedBotUA(userAgent);
}
function getBotType(userAgent) {
    if (isDomBotUA(userAgent)) {
        return 'dom';
    }
    if (isHtmlLimitedBotUA(userAgent)) {
        return 'html';
    }
    return undefined;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/router.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =  __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    createKey: null,
    default: null,
    matchesMiddleware: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    createKey: function() {
        return createKey;
    },
    default: function() {
        return Router;
    },
    matchesMiddleware: function() {
        return matchesMiddleware;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [client] (ecmascript)");
const _removetrailingslash = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js [client] (ecmascript)");
const _routeloader = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/route-loader.js [client] (ecmascript)");
const _script = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/script.js [client] (ecmascript)");
const _iserror =  _interop_require_wildcard._(__turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/lib/is-error.js [client] (ecmascript)"));
const _denormalizepagepath = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/page-path/denormalize-page-path.js [client] (ecmascript)");
const _normalizelocalepath = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js [client] (ecmascript)");
const _mitt =  _interop_require_default._(__turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/mitt.js [client] (ecmascript)"));
const _utils = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils.js [client] (ecmascript)");
const _isdynamic = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js [client] (ecmascript)");
const _parserelativeurl = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/parse-relative-url.js [client] (ecmascript)");
const _routematcher = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/route-matcher.js [client] (ecmascript)");
const _routeregex = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/route-regex.js [client] (ecmascript)");
const _formaturl = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/format-url.js [client] (ecmascript)");
const _detectdomainlocale = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/detect-domain-locale.js [client] (ecmascript)");
const _parsepath = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/parse-path.js [client] (ecmascript)");
const _addlocale = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/add-locale.js [client] (ecmascript)");
const _removelocale = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/remove-locale.js [client] (ecmascript)");
const _removebasepath = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/remove-base-path.js [client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/add-base-path.js [client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/has-base-path.js [client] (ecmascript)");
const _resolvehref = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/resolve-href.js [client] (ecmascript)");
const _isapiroute = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/lib/is-api-route.js [client] (ecmascript)");
const _getnextpathnameinfo = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/get-next-pathname-info.js [client] (ecmascript)");
const _formatnextpathnameinfo = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/format-next-pathname-info.js [client] (ecmascript)");
const _comparestates = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/compare-states.js [client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [client] (ecmascript)");
const _isbot = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/is-bot.js [client] (ecmascript)");
const _omit = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/omit.js [client] (ecmascript)");
const _interpolateas = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/interpolate-as.js [client] (ecmascript)");
const _disablesmoothscroll = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/disable-smooth-scroll.js [client] (ecmascript)");
const _constants = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/lib/constants.js [client] (ecmascript)");
let resolveRewrites;
if ("TURBOPACK compile-time falsy", 0) 
;
function buildCancellationError() {
    return Object.assign(Object.defineProperty(new Error('Route Cancelled'), "__NEXT_ERROR_CODE", {
        value: "E315",
        enumerable: false,
        configurable: true
    }), {
        cancelled: true
    });
}
async function matchesMiddleware(options) {
    const matchers = await Promise.resolve(options.router.pageLoader.getMiddleware());
    if (!matchers) return false;
    const { pathname: asPathname } = (0, _parsepath.parsePath)(options.asPath);
    
    const cleanedAs = (0, _hasbasepath.hasBasePath)(asPathname) ? (0, _removebasepath.removeBasePath)(asPathname) : asPathname;
    const asWithBasePathAndLocale = (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)(cleanedAs, options.locale));
    
    
    return matchers.some((m)=>new RegExp(m.regexp).test(asWithBasePathAndLocale));
}
function stripOrigin(url) {
    const origin = (0, _utils.getLocationOrigin)();
    return url.startsWith(origin) ? url.substring(origin.length) : url;
}
function prepareUrlAs(router, url, as) {
    
    
    let [resolvedHref, resolvedAs] = (0, _resolvehref.resolveHref)(router, url, true);
    const origin = (0, _utils.getLocationOrigin)();
    const hrefWasAbsolute = resolvedHref.startsWith(origin);
    const asWasAbsolute = resolvedAs && resolvedAs.startsWith(origin);
    resolvedHref = stripOrigin(resolvedHref);
    resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
    const preparedUrl = hrefWasAbsolute ? resolvedHref : (0, _addbasepath.addBasePath)(resolvedHref);
    const preparedAs = as ? stripOrigin((0, _resolvehref.resolveHref)(router, as)) : resolvedAs || resolvedHref;
    return {
        url: preparedUrl,
        as: asWasAbsolute ? preparedAs : (0, _addbasepath.addBasePath)(preparedAs)
    };
}
function resolveDynamicRoute(pathname, pages) {
    const cleanPathname = (0, _removetrailingslash.removeTrailingSlash)((0, _denormalizepagepath.denormalizePagePath)(pathname));
    if (cleanPathname === '/404' || cleanPathname === '/_error') {
        return pathname;
    }
    
    if (!pages.includes(cleanPathname)) {
        
        pages.some((page)=>{
            if ((0, _isdynamic.isDynamicRoute)(page) && (0, _routeregex.getRouteRegex)(page).re.test(cleanPathname)) {
                pathname = page;
                return true;
            }
        });
    }
    return (0, _removetrailingslash.removeTrailingSlash)(pathname);
}
function getMiddlewareData(source, response, options) {
    const nextConfig = {
        basePath: options.router.basePath,
        i18n: {
            locales: options.router.locales
        },
        trailingSlash: Boolean(("TURBOPACK compile-time value", false))
    };
    const rewriteHeader = response.headers.get('x-nextjs-rewrite');
    let rewriteTarget = rewriteHeader || response.headers.get('x-nextjs-matched-path');
    const matchedPath = response.headers.get(_constants.MATCHED_PATH_HEADER);
    if (matchedPath && !rewriteTarget && !matchedPath.includes('__next_data_catchall') && !matchedPath.includes('/_error') && !matchedPath.includes('/404')) {
        
        rewriteTarget = matchedPath;
    }
    if (rewriteTarget) {
        if (rewriteTarget.startsWith('/') || ("TURBOPACK compile-time value", false)) {
            const parsedRewriteTarget = (0, _parserelativeurl.parseRelativeUrl)(rewriteTarget);
            const pathnameInfo = (0, _getnextpathnameinfo.getNextPathnameInfo)(parsedRewriteTarget.pathname, {
                nextConfig,
                parseData: true
            });
            let fsPathname = (0, _removetrailingslash.removeTrailingSlash)(pathnameInfo.pathname);
            return Promise.all([
                options.router.pageLoader.getPageList(),
                (0, _routeloader.getClientBuildManifest)()
            ]).then(([pages, { __rewrites: rewrites }])=>{
                let as = (0, _addlocale.addLocale)(pathnameInfo.pathname, pathnameInfo.locale);
                if ((0, _isdynamic.isDynamicRoute)(as) || !rewriteHeader && pages.includes((0, _normalizelocalepath.normalizeLocalePath)((0, _removebasepath.removeBasePath)(as), options.router.locales).pathname)) {
                    const parsedSource = (0, _getnextpathnameinfo.getNextPathnameInfo)((0, _parserelativeurl.parseRelativeUrl)(source).pathname, {
                        nextConfig: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : nextConfig,
                        parseData: true
                    });
                    as = (0, _addbasepath.addBasePath)(parsedSource.pathname);
                    parsedRewriteTarget.pathname = as;
                }
                if ("TURBOPACK compile-time falsy", 0) 
                ;
                else if (!pages.includes(fsPathname)) {
                    const resolvedPathname = resolveDynamicRoute(fsPathname, pages);
                    if (resolvedPathname !== fsPathname) {
                        fsPathname = resolvedPathname;
                    }
                }
                const resolvedHref = !pages.includes(fsPathname) ? resolveDynamicRoute((0, _normalizelocalepath.normalizeLocalePath)((0, _removebasepath.removeBasePath)(parsedRewriteTarget.pathname), options.router.locales).pathname, pages) : fsPathname;
                if ((0, _isdynamic.isDynamicRoute)(resolvedHref)) {
                    const matches = (0, _routematcher.getRouteMatcher)((0, _routeregex.getRouteRegex)(resolvedHref))(as);
                    Object.assign(parsedRewriteTarget.query, matches || {});
                }
                return {
                    type: 'rewrite',
                    parsedAs: parsedRewriteTarget,
                    resolvedHref
                };
            });
        }
        const src = (0, _parsepath.parsePath)(source);
        const pathname = (0, _formatnextpathnameinfo.formatNextPathnameInfo)({
            ...(0, _getnextpathnameinfo.getNextPathnameInfo)(src.pathname, {
                nextConfig,
                parseData: true
            }),
            defaultLocale: options.router.defaultLocale,
            buildId: ''
        });
        return Promise.resolve({
            type: 'redirect-external',
            destination: `${pathname}${src.query}${src.hash}`
        });
    }
    const redirectTarget = response.headers.get('x-nextjs-redirect');
    if (redirectTarget) {
        if (redirectTarget.startsWith('/')) {
            const src = (0, _parsepath.parsePath)(redirectTarget);
            const pathname = (0, _formatnextpathnameinfo.formatNextPathnameInfo)({
                ...(0, _getnextpathnameinfo.getNextPathnameInfo)(src.pathname, {
                    nextConfig,
                    parseData: true
                }),
                defaultLocale: options.router.defaultLocale,
                buildId: ''
            });
            return Promise.resolve({
                type: 'redirect-internal',
                newAs: `${pathname}${src.query}${src.hash}`,
                newUrl: `${pathname}${src.query}${src.hash}`
            });
        }
        return Promise.resolve({
            type: 'redirect-external',
            destination: redirectTarget
        });
    }
    return Promise.resolve({
        type: 'next'
    });
}
async function withMiddlewareEffects(options) {
    const matches = await matchesMiddleware(options);
    if (!matches || !options.fetchData) {
        return null;
    }
    const data = await options.fetchData();
    const effect = await getMiddlewareData(data.dataHref, data.response, options);
    return {
        dataHref: data.dataHref,
        json: data.json,
        response: data.response,
        text: data.text,
        cacheKey: data.cacheKey,
        effect
    };
}
const manualScrollRestoration = ("TURBOPACK compile-time value", false) && typeof window !== 'undefined' && 'scrollRestoration' in window.history && !!function() {
    try {
        let v = '__next';
        return sessionStorage.setItem(v, v), sessionStorage.removeItem(v), true;
    } catch (n) {}
}();
const SSG_DATA_NOT_FOUND = Symbol('SSG_DATA_NOT_FOUND');
function fetchRetry(url, attempts, options) {
    return fetch(url, {
        
        
        
        
        
        
        
        
        
        
        
        credentials: 'same-origin',
        method: options.method || 'GET',
        headers: Object.assign({}, options.headers, {
            'x-nextjs-data': '1'
        })
    }).then((response)=>{
        return !response.ok && attempts > 1 && response.status >= 500 ? fetchRetry(url, attempts - 1, options) : response;
    });
}
function tryToParseAsJSON(text) {
    try {
        return JSON.parse(text);
    } catch (error) {
        return null;
    }
}
function fetchNextData({ dataHref, inflightCache, isPrefetch, hasMiddleware, isServerRender, parseJSON, persistCache, isBackground, unstable_skipClientCache }) {
    const { href: cacheKey } = new URL(dataHref, window.location.href);
    const getData = (params)=>fetchRetry(dataHref, isServerRender ? 3 : 1, {
            headers: Object.assign({}, isPrefetch ? {
                purpose: 'prefetch'
            } : {}, isPrefetch && hasMiddleware ? {
                'x-middleware-prefetch': '1'
            } : {}, ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : {}),
            method: params?.method ?? 'GET'
        }).then((response)=>{
            if (response.ok && params?.method === 'HEAD') {
                return {
                    dataHref,
                    response,
                    text: '',
                    json: {},
                    cacheKey
                };
            }
            return response.text().then((text)=>{
                if (!response.ok) {
                    




 if (hasMiddleware && [
                        301,
                        302,
                        307,
                        308
                    ].includes(response.status)) {
                        return {
                            dataHref,
                            response,
                            text,
                            json: {},
                            cacheKey
                        };
                    }
                    if (response.status === 404) {
                        if (tryToParseAsJSON(text)?.notFound) {
                            return {
                                dataHref,
                                json: {
                                    notFound: SSG_DATA_NOT_FOUND
                                },
                                response,
                                text,
                                cacheKey
                            };
                        }
                    }
                    const error = Object.defineProperty(new Error(`Failed to load static props`), "__NEXT_ERROR_CODE", {
                        value: "E124",
                        enumerable: false,
                        configurable: true
                    });
                    



 if (!isServerRender) {
                        (0, _routeloader.markAssetError)(error);
                    }
                    throw error;
                }
                return {
                    dataHref,
                    json: parseJSON ? tryToParseAsJSON(text) : null,
                    response,
                    text,
                    cacheKey
                };
            });
        }).then((data)=>{
            if (!persistCache || ("TURBOPACK compile-time value", "development") !== 'production' || data.response.headers.get('x-middleware-cache') === 'no-cache') {
                delete inflightCache[cacheKey];
            }
            return data;
        }).catch((err)=>{
            if (!unstable_skipClientCache) {
                delete inflightCache[cacheKey];
            }
            if (err.message === 'Failed to fetch' || 
            err.message === 'NetworkError when attempting to fetch resource.' || 
            err.message === 'Load failed') {
                (0, _routeloader.markAssetError)(err);
            }
            throw err;
        });
    
    
    
    
    if (unstable_skipClientCache && persistCache) {
        return getData({}).then((data)=>{
            if (data.response.headers.get('x-middleware-cache') !== 'no-cache') {
                
                inflightCache[cacheKey] = Promise.resolve(data);
            }
            return data;
        });
    }
    if (inflightCache[cacheKey] !== undefined) {
        return inflightCache[cacheKey];
    }
    return inflightCache[cacheKey] = getData(isBackground ? {
        method: 'HEAD'
    } : {});
}
function createKey() {
    return Math.random().toString(36).slice(2, 10);
}
function handleHardNavigation({ url, router }) {
    
    
    if (url === (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)(router.asPath, router.locale))) {
        throw Object.defineProperty(new Error(`Invariant: attempted to hard navigate to the same URL ${url} ${location.href}`), "__NEXT_ERROR_CODE", {
            value: "E282",
            enumerable: false,
            configurable: true
        });
    }
    window.location.href = url;
}
const getCancelledHandler = ({ route, router })=>{
    let cancelled = false;
    const cancel = router.clc = ()=>{
        cancelled = true;
    };
    const handleCancelled = ()=>{
        if (cancelled) {
            const error = Object.defineProperty(new Error(`Abort fetching component for route: "${route}"`), "__NEXT_ERROR_CODE", {
                value: "E483",
                enumerable: false,
                configurable: true
            });
            error.cancelled = true;
            throw error;
        }
        if (cancel === router.clc) {
            router.clc = null;
        }
    };
    return handleCancelled;
};
class Router {
    static{
        this.events = (0, _mitt.default)();
    }
    constructor(pathname, query, as, { initialProps, pageLoader, App, wrapApp, Component, err, subscription, isFallback, locale, locales, defaultLocale, domainLocales, isPreview }){
        
        this.sdc = {};
        
        this.sbc = {};
        this.isFirstPopStateEvent = true;
        this._key = createKey();
        this.onPopState = (e)=>{
            const { isFirstPopStateEvent } = this;
            this.isFirstPopStateEvent = false;
            const state = e.state;
            if (!state) {
                
                
                
                
                
                
                
                
                
                const { pathname, query } = this;
                this.changeState('replaceState', (0, _formaturl.formatWithValidation)({
                    pathname: (0, _addbasepath.addBasePath)(pathname),
                    query
                }), (0, _utils.getURL)());
                return;
            }
            
            if (state.__NA) {
                window.location.reload();
                return;
            }
            if (!state.__N) {
                return;
            }
            
            if (isFirstPopStateEvent && this.locale === state.options.locale && state.as === this.asPath) {
                return;
            }
            let forcedScroll;
            const { url, as, options, key } = state;
            if ("TURBOPACK compile-time falsy", 0) 
            ;
            this._key = key;
            const { pathname } = (0, _parserelativeurl.parseRelativeUrl)(url);
            
            
            if (this.isSsr && as === (0, _addbasepath.addBasePath)(this.asPath) && pathname === (0, _addbasepath.addBasePath)(this.pathname)) {
                return;
            }
            
            
            if (this._bps && !this._bps(state)) {
                return;
            }
            this.change('replaceState', url, as, Object.assign({}, options, {
                shallow: options.shallow && this._shallow,
                locale: options.locale || this.defaultLocale,
                
                _h: 0
            }), forcedScroll);
        };
        
        const route = (0, _removetrailingslash.removeTrailingSlash)(pathname);
        
        this.components = {};
        
        
        
        if (pathname !== '/_error') {
            this.components[route] = {
                Component,
                initial: true,
                props: initialProps,
                err,
                __N_SSG: initialProps && initialProps.__N_SSG,
                __N_SSP: initialProps && initialProps.__N_SSP
            };
        }
        this.components['/_app'] = {
            Component: App,
            styleSheets: []
        };
        
        
        this.events = Router.events;
        this.pageLoader = pageLoader;
        
        
        const autoExportDynamic = (0, _isdynamic.isDynamicRoute)(pathname) && self.__NEXT_DATA__.autoExport;
        this.basePath = ("TURBOPACK compile-time value", "") || '';
        this.sub = subscription;
        this.clc = null;
        this._wrapApp = wrapApp;
        
        
        this.isSsr = true;
        this.isLocaleDomain = false;
        this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || self.__NEXT_DATA__.isExperimentalCompile || self.__NEXT_DATA__.appGip && !self.__NEXT_DATA__.gsp || !autoExportDynamic && !self.location.search && !("TURBOPACK compile-time value", false));
        if ("TURBOPACK compile-time falsy", 0) 
        ;
        this.state = {
            route,
            pathname,
            query,
            asPath: autoExportDynamic ? pathname : as,
            isPreview: !!isPreview,
            locale: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined,
            isFallback
        };
        this._initialMatchesMiddlewarePromise = Promise.resolve(false);
        if (typeof window !== 'undefined') {
            
            
            if (!as.startsWith('//')) {
                
                
                const options = {
                    locale
                };
                const asPath = (0, _utils.getURL)();
                this._initialMatchesMiddlewarePromise = matchesMiddleware({
                    router: this,
                    locale,
                    asPath
                }).then((matches)=>{
                    
                    
                    ;
                    options._shouldResolveHref = as !== pathname;
                    this.changeState('replaceState', matches ? asPath : (0, _formaturl.formatWithValidation)({
                        pathname: (0, _addbasepath.addBasePath)(pathname),
                        query
                    }), asPath, options);
                    return matches;
                });
            }
            window.addEventListener('popstate', this.onPopState);
            
            
            if ("TURBOPACK compile-time falsy", 0) 
            ;
        }
    }
    reload() {
        window.location.reload();
    }
    

 back() {
        window.history.back();
    }
    

 forward() {
        window.history.forward();
    }
    




 push(url, as, options = {}) {
        if ("TURBOPACK compile-time falsy", 0) 
        ;
        ;
        ({ url, as } = prepareUrlAs(this, url, as));
        return this.change('pushState', url, as, options);
    }
    




 replace(url, as, options = {}) {
        ;
        ({ url, as } = prepareUrlAs(this, url, as));
        return this.change('replaceState', url, as, options);
    }
    async _bfl(as, resolvedAs, locale, skipNavigate) {
        if ("TURBOPACK compile-time truthy", 1) {
            if (!this._bfl_s && !this._bfl_d) {
                const { BloomFilter } = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/bloom-filter.js [client] (ecmascript)");
                let staticFilterData;
                let dynamicFilterData;
                try {
                    ;
                    ({ __routerFilterStatic: staticFilterData, __routerFilterDynamic: dynamicFilterData } = await (0, _routeloader.getClientBuildManifest)());
                } catch (err) {
                    
                    
                    console.error(err);
                    if (skipNavigate) {
                        return true;
                    }
                    handleHardNavigation({
                        url: (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)(as, locale || this.locale, this.defaultLocale)),
                        router: this
                    });
                    return new Promise(()=>{});
                }
                const routerFilterSValue = ("TURBOPACK compile-time value", {
                    "numItems": ("TURBOPACK compile-time value", 109),
                    "errorRate": ("TURBOPACK compile-time value", 0.0001),
                    "numBits": ("TURBOPACK compile-time value", 2090),
                    "numHashes": ("TURBOPACK compile-time value", 14),
                    "bitArray": ("TURBOPACK compile-time value", [
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1)
                    ])
                });
                if (!staticFilterData && routerFilterSValue) {
                    staticFilterData = routerFilterSValue ? routerFilterSValue : undefined;
                }
                const routerFilterDValue = ("TURBOPACK compile-time value", {
                    "numItems": ("TURBOPACK compile-time value", 30),
                    "errorRate": ("TURBOPACK compile-time value", 0.0001),
                    "numBits": ("TURBOPACK compile-time value", 576),
                    "numHashes": ("TURBOPACK compile-time value", 14),
                    "bitArray": ("TURBOPACK compile-time value", [
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 0),
                        ("TURBOPACK compile-time value", 1),
                        ("TURBOPACK compile-time value", 1)
                    ])
                });
                if (!dynamicFilterData && routerFilterDValue) {
                    dynamicFilterData = routerFilterDValue ? routerFilterDValue : undefined;
                }
                if (staticFilterData?.numHashes) {
                    this._bfl_s = new BloomFilter(staticFilterData.numItems, staticFilterData.errorRate);
                    this._bfl_s.import(staticFilterData);
                }
                if (dynamicFilterData?.numHashes) {
                    this._bfl_d = new BloomFilter(dynamicFilterData.numItems, dynamicFilterData.errorRate);
                    this._bfl_d.import(dynamicFilterData);
                }
            }
            let matchesBflStatic = false;
            let matchesBflDynamic = false;
            const pathsToCheck = [
                {
                    as
                },
                {
                    as: resolvedAs
                }
            ];
            for (const { as: curAs, allowMatchCurrent } of pathsToCheck){
                if (curAs) {
                    const asNoSlash = (0, _removetrailingslash.removeTrailingSlash)(new URL(curAs, 'http://n').pathname);
                    const asNoSlashLocale = (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)(asNoSlash, locale || this.locale));
                    if (allowMatchCurrent || asNoSlash !== (0, _removetrailingslash.removeTrailingSlash)(new URL(this.asPath, 'http://n').pathname)) {
                        matchesBflStatic = matchesBflStatic || !!this._bfl_s?.contains(asNoSlash) || !!this._bfl_s?.contains(asNoSlashLocale);
                        for (const normalizedAS of [
                            asNoSlash,
                            asNoSlashLocale
                        ]){
                            
                            
                            const curAsParts = normalizedAS.split('/');
                            for(let i = 0; !matchesBflDynamic && i < curAsParts.length + 1; i++){
                                const currentPart = curAsParts.slice(0, i).join('/');
                                if (currentPart && this._bfl_d?.contains(currentPart)) {
                                    matchesBflDynamic = true;
                                    break;
                                }
                            }
                        }
                        
                        
                        if (matchesBflStatic || matchesBflDynamic) {
                            if (skipNavigate) {
                                return true;
                            }
                            handleHardNavigation({
                                url: (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)(as, locale || this.locale, this.defaultLocale)),
                                router: this
                            });
                            return new Promise(()=>{});
                        }
                    }
                }
            }
        }
        return false;
    }
    async change(method, url, as, options, forcedScroll) {
        if (!(0, _islocalurl.isLocalURL)(url)) {
            handleHardNavigation({
                url,
                router: this
            });
            return false;
        }
        
        
        
        const isQueryUpdating = options._h === 1;
        if (!isQueryUpdating && !options.shallow) {
            await this._bfl(as, undefined, options.locale);
        }
        let shouldResolveHref = isQueryUpdating || options._shouldResolveHref || (0, _parsepath.parsePath)(url).pathname === (0, _parsepath.parsePath)(as).pathname;
        const nextState = {
            ...this.state
        };
        
        
        
        const readyStateChange = this.isReady !== true;
        this.isReady = true;
        const isSsr = this.isSsr;
        if (!isQueryUpdating) {
            this.isSsr = false;
        }
        
        
        if (isQueryUpdating && this.clc) {
            return false;
        }
        const prevLocale = nextState.locale;
        if ("TURBOPACK compile-time falsy", 0) 
        ;
        
        if (_utils.ST) {
            performance.mark('routeChange');
        }
        const { shallow = false, scroll = true } = options;
        const routeProps = {
            shallow
        };
        if (this._inFlightRoute && this.clc) {
            if (!isSsr) {
                Router.events.emit('routeChangeError', buildCancellationError(), this._inFlightRoute, routeProps);
            }
            this.clc();
            this.clc = null;
        }
        as = (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)((0, _hasbasepath.hasBasePath)(as) ? (0, _removebasepath.removeBasePath)(as) : as, options.locale, this.defaultLocale));
        const cleanedAs = (0, _removelocale.removeLocale)((0, _hasbasepath.hasBasePath)(as) ? (0, _removebasepath.removeBasePath)(as) : as, nextState.locale);
        this._inFlightRoute = as;
        const localeChange = prevLocale !== nextState.locale;
        
        
        if (!isQueryUpdating && this.onlyAHashChange(cleanedAs) && !localeChange) {
            nextState.asPath = cleanedAs;
            Router.events.emit('hashChangeStart', as, routeProps);
            
            this.changeState(method, url, as, {
                ...options,
                scroll: false
            });
            if (scroll) {
                this.scrollToHash(cleanedAs);
            }
            try {
                await this.set(nextState, this.components[nextState.route], null);
            } catch (err) {
                if ((0, _iserror.default)(err) && err.cancelled) {
                    Router.events.emit('routeChangeError', err, cleanedAs, routeProps);
                }
                throw err;
            }
            Router.events.emit('hashChangeComplete', as, routeProps);
            return true;
        }
        let parsed = (0, _parserelativeurl.parseRelativeUrl)(url);
        let { pathname, query } = parsed;
        
        
        
        let pages, rewrites;
        try {
            ;
            [pages, { __rewrites: rewrites }] = await Promise.all([
                this.pageLoader.getPageList(),
                (0, _routeloader.getClientBuildManifest)(),
                this.pageLoader.getMiddleware()
            ]);
        } catch (err) {
            
            
            handleHardNavigation({
                url: as,
                router: this
            });
            return false;
        }
        
        
        
        
        
        if (!this.urlIsNew(cleanedAs) && !localeChange) {
            method = 'replaceState';
        }
        
        
        let resolvedAs = as;
        
        
        
        pathname = pathname ? (0, _removetrailingslash.removeTrailingSlash)((0, _removebasepath.removeBasePath)(pathname)) : pathname;
        let route = (0, _removetrailingslash.removeTrailingSlash)(pathname);
        const parsedAsPathname = as.startsWith('/') && (0, _parserelativeurl.parseRelativeUrl)(as).pathname;
        
        
        if (this.components[pathname]?.__appRouter) {
            handleHardNavigation({
                url: as,
                router: this
            });
            return new Promise(()=>{});
        }
        const isMiddlewareRewrite = !!(parsedAsPathname && route !== parsedAsPathname && (!(0, _isdynamic.isDynamicRoute)(route) || !(0, _routematcher.getRouteMatcher)((0, _routeregex.getRouteRegex)(route))(parsedAsPathname)));
        
        
        const isMiddlewareMatch = !options.shallow && await matchesMiddleware({
            asPath: as,
            locale: nextState.locale,
            router: this
        });
        if (isQueryUpdating && isMiddlewareMatch) {
            shouldResolveHref = false;
        }
        if (shouldResolveHref && pathname !== '/_error') {
            ;
            options._shouldResolveHref = true;
            if (("TURBOPACK compile-time value", false) && as.startsWith('/')) 
            ;
            else {
                parsed.pathname = resolveDynamicRoute(pathname, pages);
                if (parsed.pathname !== pathname) {
                    pathname = parsed.pathname;
                    parsed.pathname = (0, _addbasepath.addBasePath)(pathname);
                    if (!isMiddlewareMatch) {
                        url = (0, _formaturl.formatWithValidation)(parsed);
                    }
                }
            }
        }
        if (!(0, _islocalurl.isLocalURL)(as)) {
            if ("TURBOPACK compile-time truthy", 1) {
                throw Object.defineProperty(new Error(`Invalid href: "${url}" and as: "${as}", received relative href and external as` + `\nSee more info: https://nextjs.org/docs/messages/invalid-relative-url-external-as`), "__NEXT_ERROR_CODE", {
                    value: "E380",
                    enumerable: false,
                    configurable: true
                });
            }
            handleHardNavigation({
                url: as,
                router: this
            });
            return false;
        }
        resolvedAs = (0, _removelocale.removeLocale)((0, _removebasepath.removeBasePath)(resolvedAs), nextState.locale);
        route = (0, _removetrailingslash.removeTrailingSlash)(pathname);
        let routeMatch = false;
        if ((0, _isdynamic.isDynamicRoute)(route)) {
            const parsedAs = (0, _parserelativeurl.parseRelativeUrl)(resolvedAs);
            const asPathname = parsedAs.pathname;
            const routeRegex = (0, _routeregex.getRouteRegex)(route);
            routeMatch = (0, _routematcher.getRouteMatcher)(routeRegex)(asPathname);
            const shouldInterpolate = route === asPathname;
            const interpolatedAs = shouldInterpolate ? (0, _interpolateas.interpolateAs)(route, asPathname, query) : {};
            if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
                const missingParams = Object.keys(routeRegex.groups).filter((param)=>!query[param] && !routeRegex.groups[param].optional);
                if (missingParams.length > 0 && !isMiddlewareMatch) {
                    if ("TURBOPACK compile-time truthy", 1) {
                        console.warn(`${shouldInterpolate ? `Interpolating href` : `Mismatching \`as\` and \`href\``} failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);
                    }
                    throw Object.defineProperty(new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(', ')}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://nextjs.org/docs/messages/${shouldInterpolate ? 'href-interpolation-failed' : 'incompatible-href-as'}`), "__NEXT_ERROR_CODE", {
                        value: "E344",
                        enumerable: false,
                        configurable: true
                    });
                }
            } else if (shouldInterpolate) {
                as = (0, _formaturl.formatWithValidation)(Object.assign({}, parsedAs, {
                    pathname: interpolatedAs.result,
                    query: (0, _omit.omit)(query, interpolatedAs.params)
                }));
            } else {
                
                Object.assign(query, routeMatch);
            }
        }
        if (!isQueryUpdating) {
            Router.events.emit('routeChangeStart', as, routeProps);
        }
        const isErrorRoute = this.pathname === '/404' || this.pathname === '/_error';
        try {
            let routeInfo = await this.getRouteInfo({
                route,
                pathname,
                query,
                as,
                resolvedAs,
                routeProps,
                locale: nextState.locale,
                isPreview: nextState.isPreview,
                hasMiddleware: isMiddlewareMatch,
                unstable_skipClientCache: options.unstable_skipClientCache,
                isQueryUpdating: isQueryUpdating && !this.isFallback,
                isMiddlewareRewrite
            });
            if (!isQueryUpdating && !options.shallow) {
                await this._bfl(as, 'resolvedAs' in routeInfo ? routeInfo.resolvedAs : undefined, nextState.locale);
            }
            if ('route' in routeInfo && isMiddlewareMatch) {
                pathname = routeInfo.route || route;
                route = pathname;
                if (!routeProps.shallow) {
                    query = Object.assign({}, routeInfo.query || {}, query);
                }
                const cleanedParsedPathname = (0, _hasbasepath.hasBasePath)(parsed.pathname) ? (0, _removebasepath.removeBasePath)(parsed.pathname) : parsed.pathname;
                if (routeMatch && pathname !== cleanedParsedPathname) {
                    Object.keys(routeMatch).forEach((key)=>{
                        if (routeMatch && query[key] === routeMatch[key]) {
                            delete query[key];
                        }
                    });
                }
                if ((0, _isdynamic.isDynamicRoute)(pathname)) {
                    const prefixedAs = !routeProps.shallow && routeInfo.resolvedAs ? routeInfo.resolvedAs : (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)(new URL(as, location.href).pathname, nextState.locale), true);
                    let rewriteAs = prefixedAs;
                    if ((0, _hasbasepath.hasBasePath)(rewriteAs)) {
                        rewriteAs = (0, _removebasepath.removeBasePath)(rewriteAs);
                    }
                    if ("TURBOPACK compile-time falsy", 0) 
                    ;
                    const routeRegex = (0, _routeregex.getRouteRegex)(pathname);
                    const curRouteMatch = (0, _routematcher.getRouteMatcher)(routeRegex)(new URL(rewriteAs, location.href).pathname);
                    if (curRouteMatch) {
                        Object.assign(query, curRouteMatch);
                    }
                }
            }
            
            if ('type' in routeInfo) {
                if (routeInfo.type === 'redirect-internal') {
                    return this.change(method, routeInfo.newUrl, routeInfo.newAs, options);
                } else {
                    handleHardNavigation({
                        url: routeInfo.destination,
                        router: this
                    });
                    return new Promise(()=>{});
                }
            }
            const component = routeInfo.Component;
            if (component && component.unstable_scriptLoader) {
                const scripts = [].concat(component.unstable_scriptLoader());
                scripts.forEach((script)=>{
                    (0, _script.handleClientScriptLoad)(script.props);
                });
            }
            
            if ((routeInfo.__N_SSG || routeInfo.__N_SSP) && routeInfo.props) {
                if (routeInfo.props.pageProps && routeInfo.props.pageProps.__N_REDIRECT) {
                    
                    options.locale = false;
                    const destination = routeInfo.props.pageProps.__N_REDIRECT;
                    
                    
                    
                    if (destination.startsWith('/') && routeInfo.props.pageProps.__N_REDIRECT_BASE_PATH !== false) {
                        const parsedHref = (0, _parserelativeurl.parseRelativeUrl)(destination);
                        parsedHref.pathname = resolveDynamicRoute(parsedHref.pathname, pages);
                        const { url: newUrl, as: newAs } = prepareUrlAs(this, destination, destination);
                        return this.change(method, newUrl, newAs, options);
                    }
                    handleHardNavigation({
                        url: destination,
                        router: this
                    });
                    return new Promise(()=>{});
                }
                nextState.isPreview = !!routeInfo.props.__N_PREVIEW;
                
                if (routeInfo.props.notFound === SSG_DATA_NOT_FOUND) {
                    let notFoundRoute;
                    try {
                        await this.fetchComponent('/404');
                        notFoundRoute = '/404';
                    } catch (_) {
                        notFoundRoute = '/_error';
                    }
                    routeInfo = await this.getRouteInfo({
                        route: notFoundRoute,
                        pathname: notFoundRoute,
                        query,
                        as,
                        resolvedAs,
                        routeProps: {
                            shallow: false
                        },
                        locale: nextState.locale,
                        isPreview: nextState.isPreview,
                        isNotFound: true
                    });
                    if ('type' in routeInfo) {
                        throw Object.defineProperty(new Error(`Unexpected middleware effect on /404`), "__NEXT_ERROR_CODE", {
                            value: "E158",
                            enumerable: false,
                            configurable: true
                        });
                    }
                }
            }
            if (isQueryUpdating && this.pathname === '/_error' && self.__NEXT_DATA__.props?.pageProps?.statusCode === 500 && routeInfo.props?.pageProps) {
                
                
                routeInfo.props.pageProps.statusCode = 500;
            }
            
            const isValidShallowRoute = options.shallow && nextState.route === (routeInfo.route ?? route);
            const shouldScroll = options.scroll ?? (!isQueryUpdating && !isValidShallowRoute);
            const resetScroll = shouldScroll ? {
                x: 0,
                y: 0
            } : null;
            const upcomingScrollState = forcedScroll ?? resetScroll;
            
            const upcomingRouterState = {
                ...nextState,
                route,
                pathname,
                query,
                asPath: cleanedAs,
                isFallback: false
            };
            
            
            
            
            
            if (isQueryUpdating && isErrorRoute) {
                routeInfo = await this.getRouteInfo({
                    route: this.pathname,
                    pathname: this.pathname,
                    query,
                    as,
                    resolvedAs,
                    routeProps: {
                        shallow: false
                    },
                    locale: nextState.locale,
                    isPreview: nextState.isPreview,
                    isQueryUpdating: isQueryUpdating && !this.isFallback
                });
                if ('type' in routeInfo) {
                    throw Object.defineProperty(new Error(`Unexpected middleware effect on ${this.pathname}`), "__NEXT_ERROR_CODE", {
                        value: "E225",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (this.pathname === '/_error' && self.__NEXT_DATA__.props?.pageProps?.statusCode === 500 && routeInfo.props?.pageProps) {
                    
                    
                    routeInfo.props.pageProps.statusCode = 500;
                }
                try {
                    await this.set(upcomingRouterState, routeInfo, upcomingScrollState);
                } catch (err) {
                    if ((0, _iserror.default)(err) && err.cancelled) {
                        Router.events.emit('routeChangeError', err, cleanedAs, routeProps);
                    }
                    throw err;
                }
                return true;
            }
            Router.events.emit('beforeHistoryChange', as, routeProps);
            this.changeState(method, url, as, options);
            
            
            
            const canSkipUpdating = isQueryUpdating && !upcomingScrollState && !readyStateChange && !localeChange && (0, _comparestates.compareRouterStates)(upcomingRouterState, this.state);
            if (!canSkipUpdating) {
                try {
                    await this.set(upcomingRouterState, routeInfo, upcomingScrollState);
                } catch (e) {
                    if (e.cancelled) routeInfo.error = routeInfo.error || e;
                    else throw e;
                }
                if (routeInfo.error) {
                    if (!isQueryUpdating) {
                        Router.events.emit('routeChangeError', routeInfo.error, cleanedAs, routeProps);
                    }
                    throw routeInfo.error;
                }
                if ("TURBOPACK compile-time falsy", 0) 
                ;
                if (!isQueryUpdating) {
                    Router.events.emit('routeChangeComplete', as, routeProps);
                }
                
                const hashRegex = /#.+$/;
                if (shouldScroll && hashRegex.test(as)) {
                    this.scrollToHash(as);
                }
            }
            return true;
        } catch (err) {
            if ((0, _iserror.default)(err) && err.cancelled) {
                return false;
            }
            throw err;
        }
    }
    changeState(method, url, as, options = {}) {
        if ("TURBOPACK compile-time truthy", 1) {
            if (typeof window.history === 'undefined') {
                console.error(`Warning: window.history is not available.`);
                return;
            }
            if (typeof window.history[method] === 'undefined') {
                console.error(`Warning: window.history.${method} is not available`);
                return;
            }
        }
        if (method !== 'pushState' || (0, _utils.getURL)() !== as) {
            this._shallow = options.shallow;
            window.history[method]({
                url,
                as,
                options,
                __N: true,
                key: this._key = method !== 'pushState' ? this._key : createKey()
            }, 
            
            '', as);
        }
    }
    async handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
        if (err.cancelled) {
            
            throw err;
        }
        if ((0, _routeloader.isAssetError)(err) || loadErrorFail) {
            Router.events.emit('routeChangeError', err, as, routeProps);
            
            
            
            
            
            handleHardNavigation({
                url: as,
                router: this
            });
            
            
            throw buildCancellationError();
        }
        console.error(err);
        try {
            let props;
            const { page: Component, styleSheets } = await this.fetchComponent('/_error');
            const routeInfo = {
                props,
                Component,
                styleSheets,
                err,
                error: err
            };
            if (!routeInfo.props) {
                try {
                    routeInfo.props = await this.getInitialProps(Component, {
                        err,
                        pathname,
                        query
                    });
                } catch (gipErr) {
                    console.error('Error in error page `getInitialProps`: ', gipErr);
                    routeInfo.props = {};
                }
            }
            return routeInfo;
        } catch (routeInfoErr) {
            return this.handleRouteInfoError((0, _iserror.default)(routeInfoErr) ? routeInfoErr : Object.defineProperty(new Error(routeInfoErr + ''), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            }), pathname, query, as, routeProps, true);
        }
    }
    async getRouteInfo({ route: requestedRoute, pathname, query, as, resolvedAs, routeProps, locale, hasMiddleware, isPreview, unstable_skipClientCache, isQueryUpdating, isMiddlewareRewrite, isNotFound }) {
        




 let route = requestedRoute;
        try {
            let existingInfo = this.components[route];
            if (routeProps.shallow && existingInfo && this.route === route) {
                return existingInfo;
            }
            const handleCancelled = getCancelledHandler({
                route,
                router: this
            });
            if (hasMiddleware) {
                existingInfo = undefined;
            }
            let cachedRouteInfo = existingInfo && !('initial' in existingInfo) && ("TURBOPACK compile-time value", "development") !== 'development' ? "TURBOPACK unreachable" : undefined;
            const isBackground = isQueryUpdating;
            const fetchNextDataParams = {
                dataHref: this.pageLoader.getDataHref({
                    href: (0, _formaturl.formatWithValidation)({
                        pathname,
                        query
                    }),
                    skipInterpolation: true,
                    asPath: isNotFound ? '/404' : resolvedAs,
                    locale
                }),
                hasMiddleware: true,
                isServerRender: this.isSsr,
                parseJSON: true,
                inflightCache: isBackground ? this.sbc : this.sdc,
                persistCache: !isPreview,
                isPrefetch: false,
                unstable_skipClientCache,
                isBackground
            };
            let data = isQueryUpdating && !isMiddlewareRewrite ? null : await withMiddlewareEffects({
                fetchData: ()=>fetchNextData(fetchNextDataParams),
                asPath: isNotFound ? '/404' : resolvedAs,
                locale: locale,
                router: this
            }).catch((err)=>{
                
                
                
                
                if (isQueryUpdating) {
                    return null;
                }
                throw err;
            });
            
            
            if (data && (pathname === '/_error' || pathname === '/404')) {
                data.effect = undefined;
            }
            if (isQueryUpdating) {
                if (!data) {
                    data = {
                        json: self.__NEXT_DATA__.props
                    };
                } else {
                    data.json = self.__NEXT_DATA__.props;
                }
            }
            handleCancelled();
            if (data?.effect?.type === 'redirect-internal' || data?.effect?.type === 'redirect-external') {
                return data.effect;
            }
            if (data?.effect?.type === 'rewrite') {
                const resolvedRoute = (0, _removetrailingslash.removeTrailingSlash)(data.effect.resolvedHref);
                const pages = await this.pageLoader.getPageList();
                
                
                
                
                if (!isQueryUpdating || pages.includes(resolvedRoute)) {
                    route = resolvedRoute;
                    pathname = data.effect.resolvedHref;
                    query = {
                        ...query,
                        ...data.effect.parsedAs.query
                    };
                    resolvedAs = (0, _removebasepath.removeBasePath)((0, _normalizelocalepath.normalizeLocalePath)(data.effect.parsedAs.pathname, this.locales).pathname);
                    
                    existingInfo = this.components[route];
                    if (routeProps.shallow && existingInfo && this.route === route && !hasMiddleware) {
                        
                        
                        
                        return {
                            ...existingInfo,
                            route
                        };
                    }
                }
            }
            if ((0, _isapiroute.isAPIRoute)(route)) {
                handleHardNavigation({
                    url: as,
                    router: this
                });
                return new Promise(()=>{});
            }
            const routeInfo = cachedRouteInfo || await this.fetchComponent(route).then((res)=>({
                    Component: res.page,
                    styleSheets: res.styleSheets,
                    __N_SSG: res.mod.__N_SSG,
                    __N_SSP: res.mod.__N_SSP
                }));
            if ("TURBOPACK compile-time truthy", 1) {
                const { isValidElementType } = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react-is/index.js [client] (ecmascript)");
                if (!isValidElementType(routeInfo.Component)) {
                    throw Object.defineProperty(new Error(`The default export is not a React Component in page: "${pathname}"`), "__NEXT_ERROR_CODE", {
                        value: "E286",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            const wasBailedPrefetch = data?.response?.headers.get('x-middleware-skip');
            const shouldFetchData = routeInfo.__N_SSG || routeInfo.__N_SSP;
            
            
            if (wasBailedPrefetch && data?.dataHref) {
                delete this.sdc[data.dataHref];
            }
            const { props, cacheKey } = await this._getData(async ()=>{
                if (shouldFetchData) {
                    if (data?.json && !wasBailedPrefetch) {
                        return {
                            cacheKey: data.cacheKey,
                            props: data.json
                        };
                    }
                    const dataHref = data?.dataHref ? data.dataHref : this.pageLoader.getDataHref({
                        href: (0, _formaturl.formatWithValidation)({
                            pathname,
                            query
                        }),
                        asPath: resolvedAs,
                        locale
                    });
                    const fetched = await fetchNextData({
                        dataHref,
                        isServerRender: this.isSsr,
                        parseJSON: true,
                        inflightCache: wasBailedPrefetch ? {} : this.sdc,
                        persistCache: !isPreview,
                        isPrefetch: false,
                        unstable_skipClientCache
                    });
                    return {
                        cacheKey: fetched.cacheKey,
                        props: fetched.json || {}
                    };
                }
                return {
                    headers: {},
                    props: await this.getInitialProps(routeInfo.Component, {
                        pathname,
                        query,
                        asPath: as,
                        locale,
                        locales: this.locales,
                        defaultLocale: this.defaultLocale
                    })
                };
            });
            
            
            
            if (routeInfo.__N_SSP && fetchNextDataParams.dataHref && cacheKey) {
                delete this.sdc[cacheKey];
            }
            
            
            if (!this.isPreview && routeInfo.__N_SSG && ("TURBOPACK compile-time value", "development") !== 'development' && !isQueryUpdating) 
            ;
            props.pageProps = Object.assign({}, props.pageProps);
            routeInfo.props = props;
            routeInfo.route = route;
            routeInfo.query = query;
            routeInfo.resolvedAs = resolvedAs;
            this.components[route] = routeInfo;
            return routeInfo;
        } catch (err) {
            return this.handleRouteInfoError((0, _iserror.getProperError)(err), pathname, query, as, routeProps);
        }
    }
    set(state, data, resetScroll) {
        this.state = state;
        return this.sub(data, this.components['/_app'].Component, resetScroll);
    }
    


 beforePopState(cb) {
        this._bps = cb;
    }
    onlyAHashChange(as) {
        if (!this.asPath) return false;
        const [oldUrlNoHash, oldHash] = this.asPath.split('#', 2);
        const [newUrlNoHash, newHash] = as.split('#', 2);
        
        if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
            return true;
        }
        
        if (oldUrlNoHash !== newUrlNoHash) {
            return false;
        }
        
        
        
        
        return oldHash !== newHash;
    }
    scrollToHash(as) {
        const [, hash = ''] = as.split('#', 2);
        (0, _disablesmoothscroll.disableSmoothScrollDuringRouteTransition)(()=>{
            
            
            if (hash === '' || hash === 'top') {
                window.scrollTo(0, 0);
                return;
            }
            
            const rawHash = decodeURIComponent(hash);
            
            const idEl = document.getElementById(rawHash);
            if (idEl) {
                idEl.scrollIntoView();
                return;
            }
            
            
            const nameEl = document.getElementsByName(rawHash)[0];
            if (nameEl) {
                nameEl.scrollIntoView();
            }
        }, {
            onlyHashChange: this.onlyAHashChange(as)
        });
    }
    urlIsNew(asPath) {
        return this.asPath !== asPath;
    }
    




 async prefetch(url, asPath = url, options = {}) {
        
        if ("TURBOPACK compile-time truthy", 1) {
            return;
        }
        
        ;
        let parsed;
        const urlPathname = undefined;
        let pathname, query;
        const originalPathname = undefined;
        const pages = undefined;
        let resolvedAs;
        const locale = undefined;
        const isMiddlewareMatch = undefined;
        const data = undefined;
        const route = undefined;
    }
    async fetchComponent(route) {
        const handleCancelled = getCancelledHandler({
            route,
            router: this
        });
        try {
            const componentResult = await this.pageLoader.loadPage(route);
            handleCancelled();
            return componentResult;
        } catch (err) {
            handleCancelled();
            throw err;
        }
    }
    _getData(fn) {
        let cancelled = false;
        const cancel = ()=>{
            cancelled = true;
        };
        this.clc = cancel;
        return fn().then((data)=>{
            if (cancel === this.clc) {
                this.clc = null;
            }
            if (cancelled) {
                const err = Object.defineProperty(new Error('Loading initial props cancelled'), "__NEXT_ERROR_CODE", {
                    value: "E405",
                    enumerable: false,
                    configurable: true
                });
                err.cancelled = true;
                throw err;
            }
            return data;
        });
    }
    getInitialProps(Component, ctx) {
        const { Component: App } = this.components['/_app'];
        const AppTree = this._wrapApp(App);
        ctx.AppTree = AppTree;
        return (0, _utils.loadGetInitialProps)(App, {
            AppTree,
            Component,
            router: this,
            ctx
        });
    }
    get route() {
        return this.state.route;
    }
    get pathname() {
        return this.state.pathname;
    }
    get query() {
        return this.state.query;
    }
    get asPath() {
        return this.state.asPath;
    }
    get locale() {
        return this.state.locale;
    }
    get isFallback() {
        return this.state.isFallback;
    }
    get isPreview() {
        return this.state.isPreview;
    }
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/image-config.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    VALID_LOADERS: null,
    imageConfigDefault: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    VALID_LOADERS: function() {
        return VALID_LOADERS;
    },
    imageConfigDefault: function() {
        return imageConfigDefault;
    }
});
const VALID_LOADERS = [
    'default',
    'imgix',
    'cloudinary',
    'akamai',
    'custom'
];
const imageConfigDefault = {
    deviceSizes: [
        640,
        750,
        828,
        1080,
        1200,
        1920,
        2048,
        3840
    ],
    imageSizes: [
        32,
        48,
        64,
        96,
        128,
        256,
        384
    ],
    path: '/_next/image',
    loader: 'default',
    loaderFile: '',
    

 domains: [],
    disableStaticImages: false,
    minimumCacheTTL: 14400,
    formats: [
        'image/webp'
    ],
    maximumRedirects: 3,
    dangerouslyAllowLocalIP: false,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: `script-src 'none'; frame-src 'none'; sandbox;`,
    contentDispositionType: 'attachment',
    localPatterns: undefined,
    remotePatterns: [],
    qualities: [
        75
    ],
    unoptimized: false
}; 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/image-config-context.shared-runtime.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =  __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImageConfigContext", {
    enumerable: true,
    get: function() {
        return ImageConfigContext;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _react =  _interop_require_default._(__turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react/index.js [client] (ecmascript)"));
const _imageconfig = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/image-config.js [client] (ecmascript)");
const ImageConfigContext = _react.default.createContext(_imageconfig.imageConfigDefault);
if ("TURBOPACK compile-time truthy", 1) {
    ImageConfigContext.displayName = 'ImageConfigContext';
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =  __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    AppRouterContext: null,
    GlobalLayoutRouterContext: null,
    LayoutRouterContext: null,
    MissingSlotContext: null,
    TemplateContext: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AppRouterContext: function() {
        return AppRouterContext;
    },
    GlobalLayoutRouterContext: function() {
        return GlobalLayoutRouterContext;
    },
    LayoutRouterContext: function() {
        return LayoutRouterContext;
    },
    MissingSlotContext: function() {
        return MissingSlotContext;
    },
    TemplateContext: function() {
        return TemplateContext;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _react =  _interop_require_default._(__turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react/index.js [client] (ecmascript)"));
const AppRouterContext = _react.default.createContext(null);
const LayoutRouterContext = _react.default.createContext(null);
const GlobalLayoutRouterContext = _react.default.createContext(null);
const TemplateContext = _react.default.createContext(null);
if ("TURBOPACK compile-time truthy", 1) {
    AppRouterContext.displayName = 'AppRouterContext';
    LayoutRouterContext.displayName = 'LayoutRouterContext';
    GlobalLayoutRouterContext.displayName = 'GlobalLayoutRouterContext';
    TemplateContext.displayName = 'TemplateContext';
}
const MissingSlotContext = _react.default.createContext(new Set()); 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =  __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    NavigationPromisesContext: null,
    PathParamsContext: null,
    PathnameContext: null,
    SearchParamsContext: null,
    createDevToolsInstrumentedPromise: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    NavigationPromisesContext: function() {
        return NavigationPromisesContext;
    },
    PathParamsContext: function() {
        return PathParamsContext;
    },
    PathnameContext: function() {
        return PathnameContext;
    },
    SearchParamsContext: function() {
        return SearchParamsContext;
    },
    createDevToolsInstrumentedPromise: function() {
        return createDevToolsInstrumentedPromise;
    }
});
const _react = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react/index.js [client] (ecmascript)");
const SearchParamsContext = (0, _react.createContext)(null);
const PathnameContext = (0, _react.createContext)(null);
const PathParamsContext = (0, _react.createContext)(null);
const NavigationPromisesContext = (0, _react.createContext)(null);
function createDevToolsInstrumentedPromise(displayName, value) {
    const promise = Promise.resolve(value);
    promise.status = 'fulfilled';
    promise.value = value;
    promise.displayName = `${displayName} (SSR)`;
    return promise;
}
if ("TURBOPACK compile-time truthy", 1) {
    SearchParamsContext.displayName = 'SearchParamsContext';
    PathnameContext.displayName = 'PathnameContext';
    PathParamsContext.displayName = 'PathParamsContext';
    NavigationPromisesContext.displayName = 'NavigationPromisesContext';
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/as-path-to-search-params.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "asPathToSearchParams", {
    enumerable: true,
    get: function() {
        return asPathToSearchParams;
    }
});
function asPathToSearchParams(asPath) {
    return new URL(asPath, 'http://n').searchParams;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/adapters.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    PathnameContextProviderAdapter: null,
    adaptForAppRouterInstance: null,
    adaptForPathParams: null,
    adaptForSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PathnameContextProviderAdapter: function() {
        return PathnameContextProviderAdapter;
    },
    adaptForAppRouterInstance: function() {
        return adaptForAppRouterInstance;
    },
    adaptForPathParams: function() {
        return adaptForPathParams;
    },
    adaptForSearchParams: function() {
        return adaptForSearchParams;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react/jsx-runtime.js [client] (ecmascript)");
const _react =  _interop_require_wildcard._(__turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react/index.js [client] (ecmascript)"));
const _hooksclientcontextsharedruntime = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/index.js [client] (ecmascript)");
const _aspathtosearchparams = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/as-path-to-search-params.js [client] (ecmascript)");
const _routeregex = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/route-regex.js [client] (ecmascript)");
function adaptForAppRouterInstance(pagesRouter) {
    return {
        back () {
            pagesRouter.back();
        },
        forward () {
            pagesRouter.forward();
        },
        refresh () {
            pagesRouter.reload();
        },
        hmrRefresh () {},
        push (href, { scroll } = {}) {
            void pagesRouter.push(href, undefined, {
                scroll
            });
        },
        replace (href, { scroll } = {}) {
            void pagesRouter.replace(href, undefined, {
                scroll
            });
        },
        prefetch (href) {
            void pagesRouter.prefetch(href);
        }
    };
}
function adaptForSearchParams(router) {
    if (!router.isReady || !router.query) {
        return new URLSearchParams();
    }
    return (0, _aspathtosearchparams.asPathToSearchParams)(router.asPath);
}
function adaptForPathParams(router) {
    if (!router.isReady || !router.query) {
        return null;
    }
    const pathParams = {};
    const routeRegex = (0, _routeregex.getRouteRegex)(router.pathname);
    const keys = Object.keys(routeRegex.groups);
    for (const key of keys){
        pathParams[key] = router.query[key];
    }
    return pathParams;
}
function PathnameContextProviderAdapter({ children, router, ...props }) {
    const ref = (0, _react.useRef)(props.isAutoExport);
    const value = (0, _react.useMemo)(()=>{
        
        
        
        const isAutoExport = ref.current;
        if (isAutoExport) {
            ref.current = false;
        }
        
        
        if ((0, _utils.isDynamicRoute)(router.pathname)) {
            
            
            
            
            if (router.isFallback) {
                return null;
            }
            
            
            
            
            
            if (isAutoExport && !router.isReady) {
                return null;
            }
        }
        
        
        
        
        let url;
        try {
            url = new URL(router.asPath, 'http://f');
        } catch (_) {
            
            return '/';
        }
        return url.pathname;
    }, [
        router.asPath,
        router.isFallback,
        router.isReady,
        router.pathname
    ]);
    return  (0, _jsxruntime.jsx)(_hooksclientcontextsharedruntime.PathnameContext.Provider, {
        value: value,
        children: children
    });
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    BailoutToCSRError: null,
    isBailoutToCSRError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BailoutToCSRError: function() {
        return BailoutToCSRError;
    },
    isBailoutToCSRError: function() {
        return isBailoutToCSRError;
    }
});
const BAILOUT_TO_CSR = 'BAILOUT_TO_CLIENT_SIDE_RENDERING';
class BailoutToCSRError extends Error {
    constructor(reason){
        super(`Bail out to client-side rendering: ${reason}`), this.reason = reason, this.digest = BAILOUT_TO_CSR;
    }
}
function isBailoutToCSRError(err) {
    if (typeof err !== 'object' || err === null || !('digest' in err)) {
        return false;
    }
    return err.digest === BAILOUT_TO_CSR;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/error-source.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    decorateServerError: null,
    getErrorSource: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    decorateServerError: function() {
        return decorateServerError;
    },
    getErrorSource: function() {
        return getErrorSource;
    }
});
const symbolError = Symbol.for('NextjsError');
function getErrorSource(error) {
    return error[symbolError] || null;
}
function decorateServerError(error, type) {
    Object.defineProperty(error, symbolError, {
        writable: false,
        enumerable: false,
        configurable: false,
        value: type
    });
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/normalized-asset-prefix.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "normalizedAssetPrefix", {
    enumerable: true,
    get: function() {
        return normalizedAssetPrefix;
    }
});
function normalizedAssetPrefix(assetPrefix) {
    
    const escapedAssetPrefix = assetPrefix?.replace(/^\/+|\/+$/g, '') || false;
    
    
    if (!escapedAssetPrefix) {
        return '';
    }
    if (URL.canParse(escapedAssetPrefix)) {
        const url = new URL(escapedAssetPrefix).toString();
        return url.endsWith('/') ? url.slice(0, -1) : url;
    }
    
    
    return `/${escapedAssetPrefix}`;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/format-webpack-messages.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";























 Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return formatWebpackMessages;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _stripansi =  _interop_require_default._(__turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/strip-ansi/index.js [client] (ecmascript)"));


const friendlySyntaxErrorLabel = 'Syntax error:';
const WEBPACK_BREAKING_CHANGE_POLYFILLS = '\n\nBREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.';
function isLikelyASyntaxError(message) {
    return (0, _stripansi.default)(message).includes(friendlySyntaxErrorLabel);
}
let hadMissingSassError = false;

function formatMessage(message, verbose, importTraceNote) {
    
    if (typeof message === 'object' && message.message) {
        const filteredModuleTrace = message.moduleTrace && message.moduleTrace.filter((trace)=>!/next-(middleware|client-pages|route|edge-function)-loader\.js/.test(trace.originName));
        let body = message.message;
        const breakingChangeIndex = body.indexOf(WEBPACK_BREAKING_CHANGE_POLYFILLS);
        if (breakingChangeIndex >= 0) {
            body = body.slice(0, breakingChangeIndex);
        }
        message = (message.moduleName ? (0, _stripansi.default)(message.moduleName) + '\n' : '') + (message.file ? (0, _stripansi.default)(message.file) + '\n' : '') + body + (message.details && verbose ? '\n' + message.details : '') + (filteredModuleTrace && filteredModuleTrace.length ? (importTraceNote || '\n\nImport trace for requested module:') + filteredModuleTrace.map((trace)=>`\n${trace.moduleName}`).join('') : '') + (message.stack && verbose ? '\n' + message.stack : '');
    }
    let lines = message.split('\n');
    
    
    lines = lines.filter((line)=>!/Module [A-z ]+\(from/.test(line));
    
    
    lines = lines.map((line)=>{
        const parsingError = /Line (\d+):(?:(\d+):)?\s*Parsing error: (.+)$/.exec(line);
        if (!parsingError) {
            return line;
        }
        const [, errorLine, errorColumn, errorMessage] = parsingError;
        return `${friendlySyntaxErrorLabel} ${errorMessage} (${errorLine}:${errorColumn})`;
    });
    message = lines.join('\n');
    
    message = message.replace(/SyntaxError\s+\((\d+):(\d+)\)\s*(.+?)\n/g, `${friendlySyntaxErrorLabel} $3 ($1:$2)\n`);
    
    message = message.replace(/^.*export '(.+?)' was not found in '(.+?)'.*$/gm, `Attempted import error: '$1' is not exported from '$2'.`);
    message = message.replace(/^.*export 'default' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm, `Attempted import error: '$2' does not contain a default export (imported as '$1').`);
    message = message.replace(/^.*export '(.+?)' \(imported as '(.+?)'\) was not found in '(.+?)'.*$/gm, `Attempted import error: '$1' is not exported from '$3' (imported as '$2').`);
    lines = message.split('\n');
    
    if (lines.length > 2 && lines[1].trim() === '') {
        lines.splice(1, 1);
    }
    
    if (lines[1] && lines[1].startsWith('Module not found: ')) {
        lines = [
            lines[0],
            lines[1].replace('Error: ', '').replace('Module not found: Cannot find file:', 'Cannot find file:'),
            ...lines.slice(2)
        ];
    }
    
    if (lines[1] && lines[1].match(/Cannot find module.+sass/)) {
        
        const firstLine = lines[0].split('!');
        lines[0] = firstLine[firstLine.length - 1];
        lines[1] = "To use Next.js' built-in Sass support, you first need to install `sass`.\n";
        lines[1] += 'Run `npm i sass` or `yarn add sass` inside your workspace.\n';
        lines[1] += '\nLearn more: https://nextjs.org/docs/messages/install-sass';
        
        lines = lines.slice(0, 2);
        hadMissingSassError = true;
    } else if (hadMissingSassError && message.match(/(sass-loader|resolve-url-loader: CSS error)/)) {
        
        lines = [];
    }
    if (!verbose) {
        message = lines.join('\n');
        
        
        
        
        message = message.replace(/^\s*at\s((?!webpack:).)*:\d+:\d+[\s)]*(\n|$)/gm, '') 
        ;
        message = message.replace(/^\s*at\s<anonymous>(\n|$)/gm, '') 
        ;
        message = message.replace(/File was processed with these loaders:\n(.+[\\/](next[\\/]dist[\\/].+|@next[\\/]react-refresh-utils[\\/]loader)\.js\n)*You may need an additional loader to handle the result of these loaders.\n/g, '');
        lines = message.split('\n');
    }
    
    lines = lines.filter((line, index, arr)=>index === 0 || line.trim() !== '' || line.trim() !== arr[index - 1].trim());
    
    message = lines.join('\n');
    return message.trim();
}
function formatWebpackMessages(json, verbose) {
    const formattedErrors = json.errors.map((message)=>{
        const isUnknownNextFontError = message.message.includes('An error occurred in `next/font`.');
        return formatMessage(message, isUnknownNextFontError || verbose);
    });
    const formattedWarnings = json.warnings.map((message)=>{
        return formatMessage(message, verbose);
    });
    
    let reactServerComponentsError = -1;
    for(let i = 0; i < formattedErrors.length; i++){
        const error = formattedErrors[i];
        if (error.includes('ReactServerComponentsError')) {
            reactServerComponentsError = i;
            break;
        }
    }
    
    if (reactServerComponentsError !== -1) {
        const error = formattedErrors.splice(reactServerComponentsError, 1);
        formattedErrors.unshift(error[0]);
    }
    const result = {
        ...json,
        errors: formattedErrors,
        warnings: formattedWarnings
    };
    if (!verbose && result.errors.some(isLikelyASyntaxError)) {
        
        result.errors = result.errors.filter(isLikelyASyntaxError);
        result.warnings = [];
    }
    return result;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/side-effect.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return SideEffect;
    }
});
const _react = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react/index.js [client] (ecmascript)");
const isServer = typeof window === 'undefined';
const useClientOnlyLayoutEffect = isServer ? ()=>{} : _react.useLayoutEffect;
const useClientOnlyEffect = isServer ? ()=>{} : _react.useEffect;
function SideEffect(props) {
    const { headManager, reduceComponentsToState } = props;
    function emitChange() {
        if (headManager && headManager.mountedInstances) {
            const headElements = _react.Children.toArray(Array.from(headManager.mountedInstances).filter(Boolean));
            headManager.updateHead(reduceComponentsToState(headElements));
        }
    }
    if (isServer) {
        headManager?.mountedInstances?.add(props.children);
        emitChange();
    }
    useClientOnlyLayoutEffect({
        "SideEffect.useClientOnlyLayoutEffect": ()=>{
            headManager?.mountedInstances?.add(props.children);
            return ({
                "SideEffect.useClientOnlyLayoutEffect": ()=>{
                    headManager?.mountedInstances?.delete(props.children);
                }
            })["SideEffect.useClientOnlyLayoutEffect"];
        }
    }["SideEffect.useClientOnlyLayoutEffect"]);
    
    
    
    
    
    useClientOnlyLayoutEffect({
        "SideEffect.useClientOnlyLayoutEffect": ()=>{
            if (headManager) {
                headManager._pendingUpdate = emitChange;
            }
            return ({
                "SideEffect.useClientOnlyLayoutEffect": ()=>{
                    if (headManager) {
                        headManager._pendingUpdate = emitChange;
                    }
                }
            })["SideEffect.useClientOnlyLayoutEffect"];
        }
    }["SideEffect.useClientOnlyLayoutEffect"]);
    useClientOnlyEffect({
        "SideEffect.useClientOnlyEffect": ()=>{
            if (headManager && headManager._pendingUpdate) {
                headManager._pendingUpdate();
                headManager._pendingUpdate = null;
            }
            return ({
                "SideEffect.useClientOnlyEffect": ()=>{
                    if (headManager && headManager._pendingUpdate) {
                        headManager._pendingUpdate();
                        headManager._pendingUpdate = null;
                    }
                }
            })["SideEffect.useClientOnlyEffect"];
        }
    }["SideEffect.useClientOnlyEffect"]);
    return null;
} 
}),
"[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/head.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ =  __turbopack_context__.i("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    defaultHead: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    defaultHead: function() {
        return defaultHead;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react/jsx-runtime.js [client] (ecmascript)");
const _react =  _interop_require_wildcard._(__turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/react/index.js [client] (ecmascript)"));
const _sideeffect =  _interop_require_default._(__turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/side-effect.js [client] (ecmascript)"));
const _headmanagercontextsharedruntime = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js [client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils/warn-once.js [client] (ecmascript)");
function defaultHead() {
    const head = [
         (0, _jsxruntime.jsx)("meta", {
            charSet: "utf-8"
        }, "charset"),
         (0, _jsxruntime.jsx)("meta", {
            name: "viewport",
            content: "width=device-width"
        }, "viewport")
    ];
    return head;
}
function onlyReactElement(list, child) {
    
    if (typeof child === 'string' || typeof child === 'number') {
        return list;
    }
    
    if (child.type === _react.default.Fragment) {
        return list.concat(_react.default.Children.toArray(child.props.children).reduce((fragmentList, fragmentChild)=>{
            if (typeof fragmentChild === 'string' || typeof fragmentChild === 'number') {
                return fragmentList;
            }
            return fragmentList.concat(fragmentChild);
        }, []));
    }
    return list.concat(child);
}
const METATYPES = [
    'name',
    'httpEquiv',
    'charSet',
    'itemProp'
];




 function unique() {
    const keys = new Set();
    const tags = new Set();
    const metaTypes = new Set();
    const metaCategories = {};
    return (h)=>{
        let isUnique = true;
        let hasKey = false;
        if (h.key && typeof h.key !== 'number' && h.key.indexOf('$') > 0) {
            hasKey = true;
            const key = h.key.slice(h.key.indexOf('$') + 1);
            if (keys.has(key)) {
                isUnique = false;
            } else {
                keys.add(key);
            }
        }
        
        switch(h.type){
            case 'title':
            case 'base':
                if (tags.has(h.type)) {
                    isUnique = false;
                } else {
                    tags.add(h.type);
                }
                break;
            case 'meta':
                for(let i = 0, len = METATYPES.length; i < len; i++){
                    const metatype = METATYPES[i];
                    if (!h.props.hasOwnProperty(metatype)) continue;
                    if (metatype === 'charSet') {
                        if (metaTypes.has(metatype)) {
                            isUnique = false;
                        } else {
                            metaTypes.add(metatype);
                        }
                    } else {
                        const category = h.props[metatype];
                        const categories = metaCategories[metatype] || new Set();
                        if ((metatype !== 'name' || !hasKey) && categories.has(category)) {
                            isUnique = false;
                        } else {
                            categories.add(category);
                            metaCategories[metatype] = categories;
                        }
                    }
                }
                break;
        }
        return isUnique;
    };
}



 function reduceComponents(headChildrenElements) {
    return headChildrenElements.reduce(onlyReactElement, []).reverse().concat(defaultHead().reverse()).filter(unique()).reverse().map((c, i)=>{
        const key = c.key || i;
        if ("TURBOPACK compile-time truthy", 1) {
            
            if (c.type === 'script' && c.props['type'] !== 'application/ld+json') {
                const srcMessage = c.props['src'] ? `<script> tag with src="${c.props['src']}"` : `inline <script>`;
                (0, _warnonce.warnOnce)(`Do not add <script> tags using next/head (see ${srcMessage}). Use next/script instead. \nSee more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component`);
            } else if (c.type === 'link' && c.props['rel'] === 'stylesheet') {
                (0, _warnonce.warnOnce)(`Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="${c.props['href']}"). Use Document instead. \nSee more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component`);
            }
        }
        return  _react.default.cloneElement(c, {
            key
        });
    });
}



 function Head({ children }) {
    const headManager = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
    return  (0, _jsxruntime.jsx)(_sideeffect.default, {
        reduceComponentsToState: reduceComponents,
        headManager: headManager,
        children: children
    });
}
const _default = Head;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} 
}),
]);

