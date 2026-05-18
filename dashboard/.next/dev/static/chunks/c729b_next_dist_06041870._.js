(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === "object" ? document.currentScript : undefined,
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/disable-smooth-scroll.js [app-client] (ecmascript)",
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
    Object.defineProperty(exports, "disableSmoothScrollDuringRouteTransition", {
      enumerable: true,
      get: function () {
        return disableSmoothScrollDuringRouteTransition;
      },
    });
    const _warnonce = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)",
    );
    function disableSmoothScrollDuringRouteTransition(fn, options = {}) {
      if (options.onlyHashChange) {
        fn();
        return;
      }
      const htmlElement = document.documentElement;
      const hasDataAttribute = htmlElement.dataset.scrollBehavior === "smooth";
      if (!hasDataAttribute) {
        if (
          ("TURBOPACK compile-time value", "development") === "development" &&
          getComputedStyle(htmlElement).scrollBehavior === "smooth"
        ) {
          (0, _warnonce.warnOnce)(
            "Detected `scroll-behavior: smooth` on the `<html>` element. To disable smooth scrolling during route transitions, " +
              'add `data-scroll-behavior="smooth"` to your <html> element. ' +
              "Learn more: https://nextjs.org/docs/messages/missing-data-scroll-behavior",
          );
        }

        fn();
        return;
      }

      const existing = htmlElement.style.scrollBehavior;
      htmlElement.style.scrollBehavior = "auto";
      if (!options.dontForceLayout) {
        htmlElement.getClientRects();
      }
      fn();
      htmlElement.style.scrollBehavior = existing;
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/bfcache.js [app-client] (ecmascript)",
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
    Object.defineProperty(exports, "useRouterBFCache", {
      enumerable: true,
      get: function () {
        return useRouterBFCache;
      },
    });
    const _react = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
    );

    const MAX_BF_CACHE_ENTRIES = ("TURBOPACK compile-time falsy", 0)
      ? "TURBOPACK unreachable"
      : 1;
    function useRouterBFCache(activeTree, activeStateKey) {
      const [prevActiveEntry, setPrevActiveEntry] = (0, _react.useState)(() => {
        const initialEntry = {
          tree: activeTree,
          stateKey: activeStateKey,
          next: null,
        };
        return initialEntry;
      });
      if (prevActiveEntry.tree === activeTree) {
        return prevActiveEntry;
      }

      const newActiveEntry = {
        tree: activeTree,
        stateKey: activeStateKey,
        next: null,
      };

      let n = 1;
      let oldEntry = prevActiveEntry;
      let clonedEntry = newActiveEntry;
      while (oldEntry !== null && n < MAX_BF_CACHE_ENTRIES) {
        if (oldEntry.stateKey === activeStateKey) {
          clonedEntry.next = oldEntry.next;
          break;
        } else {
          n++;
          const entry = {
            tree: oldEntry.tree,
            stateKey: oldEntry.stateKey,
            next: null,
          };
          clonedEntry.next = entry;
          clonedEntry = entry;
        }
        oldEntry = oldEntry.next;
      }
      setPrevActiveEntry(newActiveEntry);
      return newActiveEntry;
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/layout-router.js [app-client] (ecmascript)",
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
    Object.defineProperty(
      exports,

      "default",
      {
        enumerable: true,
        get: function () {
          return OuterLayoutRouter;
        },
      },
    );
    const _interop_require_default = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)",
    );
    const _interop_require_wildcard = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)",
    );
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    const _routerreducertypes = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/router-reducer-types.js [app-client] (ecmascript)",
    );
    const _react = _interop_require_wildcard._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      ),
    );
    const _reactdom = _interop_require_default._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)",
      ),
    );
    const _approutercontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)",
    );
    const _fetchserverresponse = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/fetch-server-response.js [app-client] (ecmascript)",
    );
    const _unresolvedthenable = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/unresolved-thenable.js [app-client] (ecmascript)",
    );
    const _errorboundary = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/error-boundary.js [app-client] (ecmascript)",
    );
    const _matchsegments = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/match-segments.js [app-client] (ecmascript)",
    );
    const _disablesmoothscroll = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/disable-smooth-scroll.js [app-client] (ecmascript)",
    );
    const _redirectboundary = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/redirect-boundary.js [app-client] (ecmascript)",
    );
    const _errorboundary1 = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/http-access-fallback/error-boundary.js [app-client] (ecmascript)",
    );
    const _createroutercachekey = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/create-router-cache-key.js [app-client] (ecmascript)",
    );
    const _hasinterceptionrouteincurrenttree = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/router-reducer/reducers/has-interception-route-in-current-tree.js [app-client] (ecmascript)",
    );
    const _useactionqueue = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/use-action-queue.js [app-client] (ecmascript)",
    );
    const _bfcache = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/bfcache.js [app-client] (ecmascript)",
    );
    const _apppaths = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/router/utils/app-paths.js [app-client] (ecmascript)",
    );
    const _hooksclientcontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [app-client] (ecmascript)",
    );
    const _routeparams = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/route-params.js [app-client] (ecmascript)",
    );

    function walkAddRefetch(segmentPathToWalk, treeToRecreate) {
      if (segmentPathToWalk) {
        const [segment, parallelRouteKey] = segmentPathToWalk;
        const isLast = segmentPathToWalk.length === 2;
        if ((0, _matchsegments.matchSegment)(treeToRecreate[0], segment)) {
          if (treeToRecreate[1].hasOwnProperty(parallelRouteKey)) {
            if (isLast) {
              const subTree = walkAddRefetch(
                undefined,
                treeToRecreate[1][parallelRouteKey],
              );
              return [
                treeToRecreate[0],
                {
                  ...treeToRecreate[1],
                  [parallelRouteKey]: [
                    subTree[0],
                    subTree[1],
                    subTree[2],
                    "refetch",
                  ],
                },
              ];
            }
            return [
              treeToRecreate[0],
              {
                ...treeToRecreate[1],
                [parallelRouteKey]: walkAddRefetch(
                  segmentPathToWalk.slice(2),
                  treeToRecreate[1][parallelRouteKey],
                ),
              },
            ];
          }
        }
      }
      return treeToRecreate;
    }
    const __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
      _reactdom.default
        .__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

    function findDOMNode(instance) {
      if (typeof window === "undefined") return null;

      const internal_reactDOMfindDOMNode =
        __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.findDOMNode;
      return internal_reactDOMfindDOMNode(instance);
    }
    const rectProperties = [
      "bottom",
      "height",
      "left",
      "right",
      "top",
      "width",
      "x",
      "y",
    ];

    function shouldSkipElement(element) {
      if (["sticky", "fixed"].includes(getComputedStyle(element).position)) {
        return true;
      }

      const rect = element.getBoundingClientRect();
      return rectProperties.every((item) => rect[item] === 0);
    }

    function topOfElementInViewport(element, viewportHeight) {
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.top <= viewportHeight;
    }

    function getHashFragmentDomNode(hashFragment) {
      if (hashFragment === "top") {
        return document.body;
      }

      return (
        document.getElementById(hashFragment) ??
        document.getElementsByName(hashFragment)[0]
      );
    }
    class InnerScrollAndFocusHandler extends _react.default.Component {
      componentDidMount() {
        this.handlePotentialScroll();
      }
      componentDidUpdate() {
        if (this.props.focusAndScrollRef.apply) {
          this.handlePotentialScroll();
        }
      }
      render() {
        return this.props.children;
      }
      constructor(...args) {
        (super(...args),
          (this.handlePotentialScroll = () => {
            const { focusAndScrollRef, segmentPath } = this.props;
            if (focusAndScrollRef.apply) {
              if (
                focusAndScrollRef.segmentPaths.length !== 0 &&
                !focusAndScrollRef.segmentPaths.some((scrollRefSegmentPath) =>
                  segmentPath.every((segment, index) =>
                    (0, _matchsegments.matchSegment)(
                      segment,
                      scrollRefSegmentPath[index],
                    ),
                  ),
                )
              ) {
                return;
              }
              let domNode = null;
              const hashFragment = focusAndScrollRef.hashFragment;
              if (hashFragment) {
                domNode = getHashFragmentDomNode(hashFragment);
              }

              if (!domNode) {
                domNode = findDOMNode(this);
              }

              if (!(domNode instanceof Element)) {
                return;
              }

              while (
                !(domNode instanceof HTMLElement) ||
                shouldSkipElement(domNode)
              ) {
                if (("TURBOPACK compile-time truthy", 1)) {
                  if (domNode.parentElement?.localName === "head") {
                  }
                }

                if (domNode.nextElementSibling === null) {
                  return;
                }
                domNode = domNode.nextElementSibling;
              }

              focusAndScrollRef.apply = false;
              focusAndScrollRef.hashFragment = null;
              focusAndScrollRef.segmentPaths = [];
              (0,
              _disablesmoothscroll.disableSmoothScrollDuringRouteTransition)(
                () => {
                  if (hashFragment) {
                    domNode.scrollIntoView();
                    return;
                  }

                  const htmlElement = document.documentElement;
                  const viewportHeight = htmlElement.clientHeight;

                  if (topOfElementInViewport(domNode, viewportHeight)) {
                    return;
                  }

                  htmlElement.scrollTop = 0;

                  if (!topOfElementInViewport(domNode, viewportHeight)) {
                    domNode.scrollIntoView();
                  }
                },
                {
                  dontForceLayout: true,
                  onlyHashChange: focusAndScrollRef.onlyHashChange,
                },
              );

              focusAndScrollRef.onlyHashChange = false;

              domNode.focus();
            }
          }));
      }
    }
    function ScrollAndFocusHandler({ segmentPath, children }) {
      const context = (0, _react.useContext)(
        _approutercontextsharedruntime.GlobalLayoutRouterContext,
      );
      if (!context) {
        throw Object.defineProperty(
          new Error("invariant global layout router not mounted"),
          "__NEXT_ERROR_CODE",
          {
            value: "E473",
            enumerable: false,
            configurable: true,
          },
        );
      }
      return (0, _jsxruntime.jsx)(InnerScrollAndFocusHandler, {
        segmentPath: segmentPath,
        focusAndScrollRef: context.focusAndScrollRef,
        children: children,
      });
    }

    function InnerLayoutRouter({
      tree,
      segmentPath,
      debugNameContext,
      cacheNode,
      params,
      url,
      isActive,
    }) {
      const context = (0, _react.useContext)(
        _approutercontextsharedruntime.GlobalLayoutRouterContext,
      );
      const parentNavPromises = (0, _react.useContext)(
        _hooksclientcontextsharedruntime.NavigationPromisesContext,
      );
      if (!context) {
        throw Object.defineProperty(
          new Error("invariant global layout router not mounted"),
          "__NEXT_ERROR_CODE",
          {
            value: "E473",
            enumerable: false,
            configurable: true,
          },
        );
      }
      const { tree: fullTree } = context;

      const resolvedPrefetchRsc =
        cacheNode.prefetchRsc !== null ? cacheNode.prefetchRsc : cacheNode.rsc;

      const rsc = (0, _react.useDeferredValue)(
        cacheNode.rsc,
        resolvedPrefetchRsc,
      );

      const resolvedRsc =
        typeof rsc === "object" &&
        rsc !== null &&
        typeof rsc.then === "function"
          ? (0, _react.use)(rsc)
          : rsc;
      if (!resolvedRsc) {
        if (isActive) {
          let lazyData = cacheNode.lazyData;
          if (lazyData === null) {
            const refetchTree = walkAddRefetch(["", ...segmentPath], fullTree);
            const includeNextUrl = (0,
            _hasinterceptionrouteincurrenttree.hasInterceptionRouteInCurrentTree)(
              fullTree,
            );
            const navigatedAt = Date.now();
            cacheNode.lazyData = lazyData = (0,
            _fetchserverresponse.fetchServerResponse)(
              new URL(url, location.origin),
              {
                flightRouterState: refetchTree,
                nextUrl: includeNextUrl
                  ? context.previousNextUrl || context.nextUrl
                  : null,
              },
            ).then((serverResponse) => {
              (0, _react.startTransition)(() => {
                (0, _useactionqueue.dispatchAppRouterAction)({
                  type: _routerreducertypes.ACTION_SERVER_PATCH,
                  previousTree: fullTree,
                  serverResponse,
                  navigatedAt,
                });
              });
              return serverResponse;
            });

            (0, _react.use)(lazyData);
          }
        }

        (0, _react.use)(_unresolvedthenable.unresolvedThenable);
      }

      let content = resolvedRsc;

      let navigationPromises = null;
      if (("TURBOPACK compile-time truthy", 1)) {
        const { createNestedLayoutNavigationPromises } =
          __turbopack_context__.r(
            "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/navigation-devtools.js [app-client] (ecmascript)",
          );
        navigationPromises = createNestedLayoutNavigationPromises(
          tree,
          parentNavPromises,
        );
      }
      if (navigationPromises) {
        content = (0, _jsxruntime.jsx)(
          _hooksclientcontextsharedruntime.NavigationPromisesContext.Provider,
          {
            value: navigationPromises,
            children: resolvedRsc,
          },
        );
      }
      const subtree = (0, _jsxruntime.jsx)(
        _approutercontextsharedruntime.LayoutRouterContext.Provider,
        {
          value: {
            parentTree: tree,
            parentCacheNode: cacheNode,
            parentSegmentPath: segmentPath,
            parentParams: params,
            debugNameContext: debugNameContext,

            url: url,
            isActive: isActive,
          },
          children: content,
        },
      );

      return subtree;
    }

    function LoadingBoundary({ name, loading, children }) {
      let loadingModuleData;
      if (
        typeof loading === "object" &&
        loading !== null &&
        typeof loading.then === "function"
      ) {
        const promiseForLoading = loading;
        loadingModuleData = (0, _react.use)(promiseForLoading);
      } else {
        loadingModuleData = loading;
      }
      if (loadingModuleData) {
        const loadingRsc = loadingModuleData[0];
        const loadingStyles = loadingModuleData[1];
        const loadingScripts = loadingModuleData[2];
        return (0, _jsxruntime.jsx)(_react.Suspense, {
          name: name,
          fallback: (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
            children: [loadingStyles, loadingScripts, loadingRsc],
          }),
          children: children,
        });
      }
      return (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
        children: children,
      });
    }
    function OuterLayoutRouter({
      parallelRouterKey,
      error,
      errorStyles,
      errorScripts,
      templateStyles,
      templateScripts,
      template,
      notFound,
      forbidden,
      unauthorized,
      segmentViewBoundaries,
    }) {
      const context = (0, _react.useContext)(
        _approutercontextsharedruntime.LayoutRouterContext,
      );
      if (!context) {
        throw Object.defineProperty(
          new Error("invariant expected layout router to be mounted"),
          "__NEXT_ERROR_CODE",
          {
            value: "E56",
            enumerable: false,
            configurable: true,
          },
        );
      }
      const {
        parentTree,
        parentCacheNode,
        parentSegmentPath,
        parentParams,
        url,
        isActive,
        debugNameContext,
      } = context;

      const parentParallelRoutes = parentCacheNode.parallelRoutes;
      let segmentMap = parentParallelRoutes.get(parallelRouterKey);

      if (!segmentMap) {
        segmentMap = new Map();
        parentParallelRoutes.set(parallelRouterKey, segmentMap);
      }
      const parentTreeSegment = parentTree[0];
      const segmentPath =
        parentSegmentPath === null
          ? [parallelRouterKey]
          : parentSegmentPath.concat([parentTreeSegment, parallelRouterKey]);

      const activeTree = parentTree[1][parallelRouterKey];
      const activeSegment = activeTree[0];
      const activeStateKey = (0, _createroutercachekey.createRouterCacheKey)(
        activeSegment,
        true,
      );

      let bfcacheEntry = (0, _bfcache.useRouterBFCache)(
        activeTree,
        activeStateKey,
      );
      let children = [];
      do {
        const tree = bfcacheEntry.tree;
        const stateKey = bfcacheEntry.stateKey;
        const segment = tree[0];
        const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(
          segment,
        );

        let cacheNode = segmentMap.get(cacheKey);
        if (cacheNode === undefined) {
          const newLazyCacheNode = {
            lazyData: null,
            rsc: null,
            prefetchRsc: null,
            head: null,
            prefetchHead: null,
            parallelRoutes: new Map(),
            loading: null,
            navigatedAt: -1,
          };

          cacheNode = newLazyCacheNode;
          segmentMap.set(cacheKey, newLazyCacheNode);
        }

        let segmentBoundaryTriggerNode = null;
        let segmentViewStateNode = null;
        if (("TURBOPACK compile-time truthy", 1)) {
          const { SegmentBoundaryTriggerNode, SegmentViewStateNode } =
            __turbopack_context__.r(
              "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.js [app-client] (ecmascript)",
            );
          const pagePrefix = (0, _apppaths.normalizeAppPath)(url);
          segmentViewStateNode = (0, _jsxruntime.jsx)(
            SegmentViewStateNode,
            {
              page: pagePrefix,
            },
            pagePrefix,
          );
          segmentBoundaryTriggerNode = (0, _jsxruntime.jsx)(
            _jsxruntime.Fragment,
            {
              children: (0, _jsxruntime.jsx)(SegmentBoundaryTriggerNode, {}),
            },
          );
        }
        let params = parentParams;
        if (Array.isArray(segment)) {
          const paramName = segment[0];
          const paramCacheKey = segment[1];
          const paramType = segment[2];
          const paramValue = (0, _routeparams.getParamValueFromCacheKey)(
            paramCacheKey,
            paramType,
          );
          if (paramValue !== null) {
            params = {
              ...parentParams,
              [paramName]: paramValue,
            };
          }
        }
        const debugName = getBoundaryDebugNameFromSegment(segment);

        const childDebugNameContext = debugName ?? debugNameContext;

        const isVirtual = debugName === undefined;
        const debugNameToDisplay = isVirtual ? undefined : debugNameContext;

        const loadingModuleData = parentCacheNode.loading;
        let child = (0, _jsxruntime.jsxs)(
          _approutercontextsharedruntime.TemplateContext.Provider,
          {
            value: (0, _jsxruntime.jsxs)(ScrollAndFocusHandler, {
              segmentPath: segmentPath,
              children: [
                (0, _jsxruntime.jsx)(_errorboundary.ErrorBoundary, {
                  errorComponent: error,
                  errorStyles: errorStyles,
                  errorScripts: errorScripts,
                  children: (0, _jsxruntime.jsx)(LoadingBoundary, {
                    name: debugNameToDisplay,
                    loading: loadingModuleData,
                    children: (0, _jsxruntime.jsx)(
                      _errorboundary1.HTTPAccessFallbackBoundary,
                      {
                        notFound: notFound,
                        forbidden: forbidden,
                        unauthorized: unauthorized,
                        children: (0, _jsxruntime.jsxs)(
                          _redirectboundary.RedirectBoundary,
                          {
                            children: [
                              (0, _jsxruntime.jsx)(InnerLayoutRouter, {
                                url: url,
                                tree: tree,
                                params: params,
                                cacheNode: cacheNode,
                                segmentPath: segmentPath,
                                debugNameContext: childDebugNameContext,
                                isActive:
                                  isActive && stateKey === activeStateKey,
                              }),
                              segmentBoundaryTriggerNode,
                            ],
                          },
                        ),
                      },
                    ),
                  }),
                }),
                segmentViewStateNode,
              ],
            }),
            children: [templateStyles, templateScripts, template],
          },
          stateKey,
        );
        if (("TURBOPACK compile-time truthy", 1)) {
          const { SegmentStateProvider } = __turbopack_context__.r(
            "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.js [app-client] (ecmascript)",
          );
          child = (0, _jsxruntime.jsxs)(
            SegmentStateProvider,
            {
              children: [child, segmentViewBoundaries],
            },
            stateKey,
          );
        }
        if (("TURBOPACK compile-time falsy", 0));
        children.push(child);
        bfcacheEntry = bfcacheEntry.next;
      } while (bfcacheEntry !== null);
      return children;
    }
    function getBoundaryDebugNameFromSegment(segment) {
      if (segment === "/") {
        return "/";
      }
      if (typeof segment === "string") {
        if (isVirtualLayout(segment)) {
          return undefined;
        } else {
          return segment + "/";
        }
      }
      const paramCacheKey = segment[1];
      return paramCacheKey + "/";
    }
    function isVirtualLayout(segment) {
      return segment === "(slot)";
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/render-from-template-context.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function () {
        return RenderFromTemplateContext;
      },
    });
    const _interop_require_wildcard = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)",
    );
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    const _react = _interop_require_wildcard._(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      ),
    );
    const _approutercontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)",
    );
    function RenderFromTemplateContext() {
      const children = (0, _react.useContext)(
        _approutercontextsharedruntime.TemplateContext,
      );
      return (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "ReflectAdapter", {
      enumerable: true,
      get: function () {
        return ReflectAdapter;
      },
    });
    class ReflectAdapter {
      static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === "function") {
          return value.bind(target);
        }
        return value;
      }
      static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
      }
      static has(target, prop) {
        return Reflect.has(target, prop);
      }
      static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
      }
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        describeHasCheckingStringProperty: null,
        describeStringPropertyAccess: null,
        wellKnownProperties: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      describeHasCheckingStringProperty: function () {
        return describeHasCheckingStringProperty;
      },
      describeStringPropertyAccess: function () {
        return describeStringPropertyAccess;
      },
      wellKnownProperties: function () {
        return wellKnownProperties;
      },
    });
    const isDefinitelyAValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
    function describeStringPropertyAccess(target, prop) {
      if (isDefinitelyAValidIdentifier.test(prop)) {
        return `\`${target}.${prop}\``;
      }
      return `\`${target}[${JSON.stringify(prop)}]\``;
    }
    function describeHasCheckingStringProperty(target, prop) {
      const stringifiedProp = JSON.stringify(prop);
      return `\`Reflect.has(${target}, ${stringifiedProp})\`, \`${stringifiedProp} in ${target}\`, or similar`;
    }
    const wellKnownProperties = new Set([
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toString",
      "valueOf",
      "toLocaleString",

      "then",
      "catch",
      "finally",

      "status",

      "displayName",
      "_debugInfo",

      "toJSON",
      "$$typeof",
      "__esModule",
    ]);
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/request/search-params.browser.dev.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "createRenderSearchParamsFromClient", {
      enumerable: true,
      get: function () {
        return createRenderSearchParamsFromClient;
      },
    });
    const _reflect = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)",
    );
    const _reflectutils = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)",
    );
    const CachedSearchParams = new WeakMap();
    function makeUntrackedSearchParamsWithDevWarnings(underlyingSearchParams) {
      const cachedSearchParams = CachedSearchParams.get(underlyingSearchParams);
      if (cachedSearchParams) {
        return cachedSearchParams;
      }
      const proxiedProperties = new Set();
      const promise = Promise.resolve(underlyingSearchParams);
      Object.keys(underlyingSearchParams).forEach((prop) => {
        if (_reflectutils.wellKnownProperties.has(prop)) {
        } else {
          proxiedProperties.add(prop);
        }
      });
      const proxiedPromise = new Proxy(promise, {
        get(target, prop, receiver) {
          if (typeof prop === "string") {
            if (
              !_reflectutils.wellKnownProperties.has(prop) &&
              (proxiedProperties.has(prop) ||
                Reflect.has(target, prop) === false)
            ) {
              const expression = (0,
              _reflectutils.describeStringPropertyAccess)("searchParams", prop);
              warnForSyncAccess(expression);
            }
          }
          return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
          if (typeof prop === "string") {
            proxiedProperties.delete(prop);
          }
          return Reflect.set(target, prop, value, receiver);
        },
        has(target, prop) {
          if (typeof prop === "string") {
            if (
              !_reflectutils.wellKnownProperties.has(prop) &&
              (proxiedProperties.has(prop) ||
                Reflect.has(target, prop) === false)
            ) {
              const expression = (0,
              _reflectutils.describeHasCheckingStringProperty)(
                "searchParams",
                prop,
              );
              warnForSyncAccess(expression);
            }
          }
          return Reflect.has(target, prop);
        },
        ownKeys(target) {
          warnForSyncSpread();
          return Reflect.ownKeys(target);
        },
      });
      CachedSearchParams.set(underlyingSearchParams, proxiedPromise);
      return proxiedPromise;
    }
    function warnForSyncAccess(expression) {
      console.error(
        `A searchParam property was accessed directly with ${expression}. ` +
          `\`searchParams\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` +
          `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`,
      );
    }
    function warnForSyncSpread() {
      console.error(
        `The keys of \`searchParams\` were accessed directly. ` +
          `\`searchParams\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` +
          `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`,
      );
    }
    function createRenderSearchParamsFromClient(underlyingSearchParams) {
      return makeUntrackedSearchParamsWithDevWarnings(underlyingSearchParams);
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/request/search-params.browser.js [app-client] (ecmascript)",
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
    Object.defineProperty(exports, "createRenderSearchParamsFromClient", {
      enumerable: true,
      get: function () {
        return createRenderSearchParamsFromClient;
      },
    });
    const createRenderSearchParamsFromClient = ("TURBOPACK compile-time truthy",
    1)
      ? __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/request/search-params.browser.dev.js [app-client] (ecmascript)",
        ).createRenderSearchParamsFromClient
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/request/params.browser.dev.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "createRenderParamsFromClient", {
      enumerable: true,
      get: function () {
        return createRenderParamsFromClient;
      },
    });
    const _reflect = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)",
    );
    const _reflectutils = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)",
    );
    const CachedParams = new WeakMap();
    function makeDynamicallyTrackedParamsWithDevWarnings(underlyingParams) {
      const cachedParams = CachedParams.get(underlyingParams);
      if (cachedParams) {
        return cachedParams;
      }

      const promise = Promise.resolve(underlyingParams);
      const proxiedProperties = new Set();
      Object.keys(underlyingParams).forEach((prop) => {
        if (_reflectutils.wellKnownProperties.has(prop)) {
        } else {
          proxiedProperties.add(prop);
        }
      });
      const proxiedPromise = new Proxy(promise, {
        get(target, prop, receiver) {
          if (typeof prop === "string") {
            if (proxiedProperties.has(prop)) {
              const expression = (0,
              _reflectutils.describeStringPropertyAccess)("params", prop);
              warnForSyncAccess(expression);
            }
          }
          return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
          if (typeof prop === "string") {
            proxiedProperties.delete(prop);
          }
          return _reflect.ReflectAdapter.set(target, prop, value, receiver);
        },
        ownKeys(target) {
          warnForEnumeration();
          return Reflect.ownKeys(target);
        },
      });
      CachedParams.set(underlyingParams, proxiedPromise);
      return proxiedPromise;
    }
    function warnForSyncAccess(expression) {
      console.error(
        `A param property was accessed directly with ${expression}. ` +
          `\`params\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` +
          `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`,
      );
    }
    function warnForEnumeration() {
      console.error(
        `params are being enumerated. ` +
          `\`params\` is a Promise and must be unwrapped with \`React.use()\` before accessing its properties. ` +
          `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`,
      );
    }
    function createRenderParamsFromClient(clientParams) {
      return makeDynamicallyTrackedParamsWithDevWarnings(clientParams);
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/request/params.browser.js [app-client] (ecmascript)",
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
    Object.defineProperty(exports, "createRenderParamsFromClient", {
      enumerable: true,
      get: function () {
        return createRenderParamsFromClient;
      },
    });
    const createRenderParamsFromClient = ("TURBOPACK compile-time truthy", 1)
      ? __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/request/params.browser.dev.js [app-client] (ecmascript)",
        ).createRenderParamsFromClient
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js [app-client] (ecmascript)",
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
    Object.defineProperty(
      exports,
      "createDedupedByCallsiteServerErrorLoggerDev",
      {
        enumerable: true,
        get: function () {
          return createDedupedByCallsiteServerErrorLoggerDev;
        },
      },
    );
    const _react = _interop_require_wildcard(
      __turbopack_context__.r(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
      ),
    );
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function") return null;
      var cacheBabelInterop = new WeakMap();
      var cacheNodeInterop = new WeakMap();
      return (_getRequireWildcardCache = function (nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interop_require_wildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (
        obj === null ||
        (typeof obj !== "object" && typeof obj !== "function")
      ) {
        return {
          default: obj,
        };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {
        __proto__: null,
      };
      var hasPropertyDescriptor =
        Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (
          key !== "default" &&
          Object.prototype.hasOwnProperty.call(obj, key)
        ) {
          var desc = hasPropertyDescriptor
            ? Object.getOwnPropertyDescriptor(obj, key)
            : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    const errorRef = {
      current: null,
    };

    const cache =
      typeof _react.cache === "function" ? _react.cache : (fn) => fn;

    const logErrorOrWarn = ("TURBOPACK compile-time falsy", 0)
      ? "TURBOPACK unreachable"
      : console.warn;

    const flushCurrentErrorIfNew = cache((key) => {
      try {
        logErrorOrWarn(errorRef.current);
      } finally {
        errorRef.current = null;
      }
    });
    function createDedupedByCallsiteServerErrorLoggerDev(getMessage) {
      return function logDedupedError(...args) {
        const message = getMessage(...args);
        if (("TURBOPACK compile-time truthy", 1)) {
          var _stack;
          const callStackFrames =
            (_stack = new Error().stack) == null ? void 0 : _stack.split("\n");
          if (callStackFrames === undefined || callStackFrames.length < 4) {
            logErrorOrWarn(message);
          } else {
            const key = callStackFrames[4];
            errorRef.current = message;
            flushCurrentErrorIfNew(key);
          }
        } else;
      };
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/after-task-async-storage-instance.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "afterTaskAsyncStorageInstance", {
      enumerable: true,
      get: function () {
        return afterTaskAsyncStorageInstance;
      },
    });
    const _asynclocalstorage = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/async-local-storage.js [app-client] (ecmascript)",
    );
    const afterTaskAsyncStorageInstance = (0,
    _asynclocalstorage.createAsyncLocalStorage)();
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/after-task-async-storage.external.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "afterTaskAsyncStorage", {
      enumerable: true,
      get: function () {
        return _aftertaskasyncstorageinstance.afterTaskAsyncStorageInstance;
      },
    });
    const _aftertaskasyncstorageinstance = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/after-task-async-storage-instance.js [app-client] (ecmascript)",
    );
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/request/utils.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    0 &&
      (module.exports = {
        isRequestAPICallableInsideAfter: null,
        throwForSearchParamsAccessInUseCache: null,
        throwWithStaticGenerationBailoutErrorWithDynamicError: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      isRequestAPICallableInsideAfter: function () {
        return isRequestAPICallableInsideAfter;
      },
      throwForSearchParamsAccessInUseCache: function () {
        return throwForSearchParamsAccessInUseCache;
      },
      throwWithStaticGenerationBailoutErrorWithDynamicError: function () {
        return throwWithStaticGenerationBailoutErrorWithDynamicError;
      },
    });
    const _staticgenerationbailout = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/static-generation-bailout.js [app-client] (ecmascript)",
    );
    const _aftertaskasyncstorageexternal = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/after-task-async-storage.external.js [app-client] (ecmascript)",
    );
    function throwWithStaticGenerationBailoutErrorWithDynamicError(
      route,
      expression,
    ) {
      throw Object.defineProperty(
        new _staticgenerationbailout.StaticGenBailoutError(
          `Route ${route} with \`dynamic = "error"\` couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`,
        ),
        "__NEXT_ERROR_CODE",
        {
          value: "E543",
          enumerable: false,
          configurable: true,
        },
      );
    }
    function throwForSearchParamsAccessInUseCache(workStore, constructorOpt) {
      const error = Object.defineProperty(
        new Error(
          `Route ${workStore.route} used \`searchParams\` inside "use cache". Accessing dynamic request data inside a cache scope is not supported. If you need some search params inside a cached function await \`searchParams\` outside of the cached function and pass only the required search params as arguments to the cached function. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`,
        ),
        "__NEXT_ERROR_CODE",
        {
          value: "E842",
          enumerable: false,
          configurable: true,
        },
      );
      Error.captureStackTrace(error, constructorOpt);
      workStore.invalidDynamicUsageError ??= error;
      throw error;
    }
    function isRequestAPICallableInsideAfter() {
      const afterTaskStore =
        _aftertaskasyncstorageexternal.afterTaskAsyncStorage.getStore();
      return (
        (afterTaskStore == null
          ? void 0
          : afterTaskStore.rootTaskSpawnPhase) === "action"
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/request/search-params.js [app-client] (ecmascript)",
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
        createPrerenderSearchParamsForClientPage: null,
        createSearchParamsFromClient: null,
        createServerSearchParamsForMetadata: null,
        createServerSearchParamsForServerPage: null,
        makeErroringSearchParamsForUseCache: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      createPrerenderSearchParamsForClientPage: function () {
        return createPrerenderSearchParamsForClientPage;
      },
      createSearchParamsFromClient: function () {
        return createSearchParamsFromClient;
      },
      createServerSearchParamsForMetadata: function () {
        return createServerSearchParamsForMetadata;
      },
      createServerSearchParamsForServerPage: function () {
        return createServerSearchParamsForServerPage;
      },
      makeErroringSearchParamsForUseCache: function () {
        return makeErroringSearchParamsForUseCache;
      },
    });
    const _reflect = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)",
    );
    const _dynamicrendering = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-client] (ecmascript)",
    );
    const _workunitasyncstorageexternal = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/work-unit-async-storage.external.js [app-client] (ecmascript)",
    );
    const _invarianterror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)",
    );
    const _dynamicrenderingutils = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/dynamic-rendering-utils.js [app-client] (ecmascript)",
    );
    const _creatededupedbycallsiteservererrorlogger = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js [app-client] (ecmascript)",
    );
    const _reflectutils = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)",
    );
    const _utils = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/request/utils.js [app-client] (ecmascript)",
    );
    const _stagedrendering = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/staged-rendering.js [app-client] (ecmascript)",
    );
    function createSearchParamsFromClient(underlyingSearchParams, workStore) {
      const workUnitStore =
        _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
      if (workUnitStore) {
        switch (workUnitStore.type) {
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
            return createStaticPrerenderSearchParams(workStore, workUnitStore);
          case "prerender-runtime":
            throw Object.defineProperty(
              new _invarianterror.InvariantError(
                "createSearchParamsFromClient should not be called in a runtime prerender.",
              ),
              "__NEXT_ERROR_CODE",
              {
                value: "E769",
                enumerable: false,
                configurable: true,
              },
            );
          case "cache":
          case "private-cache":
          case "unstable-cache":
            throw Object.defineProperty(
              new _invarianterror.InvariantError(
                "createSearchParamsFromClient should not be called in cache contexts.",
              ),
              "__NEXT_ERROR_CODE",
              {
                value: "E739",
                enumerable: false,
                configurable: true,
              },
            );
          case "request":
            return createRenderSearchParams(
              underlyingSearchParams,
              workStore,
              workUnitStore,
            );
          default:
            workUnitStore;
        }
      }
      (0, _workunitasyncstorageexternal.throwInvariantForMissingStore)();
    }
    const createServerSearchParamsForMetadata =
      createServerSearchParamsForServerPage;
    function createServerSearchParamsForServerPage(
      underlyingSearchParams,
      workStore,
    ) {
      const workUnitStore =
        _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
      if (workUnitStore) {
        switch (workUnitStore.type) {
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
            return createStaticPrerenderSearchParams(workStore, workUnitStore);
          case "cache":
          case "private-cache":
          case "unstable-cache":
            throw Object.defineProperty(
              new _invarianterror.InvariantError(
                "createServerSearchParamsForServerPage should not be called in cache contexts.",
              ),
              "__NEXT_ERROR_CODE",
              {
                value: "E747",
                enumerable: false,
                configurable: true,
              },
            );
          case "prerender-runtime":
            return createRuntimePrerenderSearchParams(
              underlyingSearchParams,
              workUnitStore,
            );
          case "request":
            return createRenderSearchParams(
              underlyingSearchParams,
              workStore,
              workUnitStore,
            );
          default:
            workUnitStore;
        }
      }
      (0, _workunitasyncstorageexternal.throwInvariantForMissingStore)();
    }
    function createPrerenderSearchParamsForClientPage(workStore) {
      if (workStore.forceStatic) {
        return Promise.resolve({});
      }
      const workUnitStore =
        _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
      if (workUnitStore) {
        switch (workUnitStore.type) {
          case "prerender":
          case "prerender-client":
            return (0, _dynamicrenderingutils.makeHangingPromise)(
              workUnitStore.renderSignal,
              workStore.route,
              "`searchParams`",
            );
          case "prerender-runtime":
            throw Object.defineProperty(
              new _invarianterror.InvariantError(
                "createPrerenderSearchParamsForClientPage should not be called in a runtime prerender.",
              ),
              "__NEXT_ERROR_CODE",
              {
                value: "E768",
                enumerable: false,
                configurable: true,
              },
            );
          case "cache":
          case "private-cache":
          case "unstable-cache":
            throw Object.defineProperty(
              new _invarianterror.InvariantError(
                "createPrerenderSearchParamsForClientPage should not be called in cache contexts.",
              ),
              "__NEXT_ERROR_CODE",
              {
                value: "E746",
                enumerable: false,
                configurable: true,
              },
            );
          case "prerender-ppr":
          case "prerender-legacy":
          case "request":
            return Promise.resolve({});
          default:
            workUnitStore;
        }
      }
      (0, _workunitasyncstorageexternal.throwInvariantForMissingStore)();
    }
    function createStaticPrerenderSearchParams(workStore, prerenderStore) {
      if (workStore.forceStatic) {
        return Promise.resolve({});
      }
      switch (prerenderStore.type) {
        case "prerender":
        case "prerender-client":
          return makeHangingSearchParams(workStore, prerenderStore);
        case "prerender-ppr":
        case "prerender-legacy":
          return makeErroringSearchParams(workStore, prerenderStore);
        default:
          return prerenderStore;
      }
    }
    function createRuntimePrerenderSearchParams(
      underlyingSearchParams,
      workUnitStore,
    ) {
      return (0, _dynamicrendering.delayUntilRuntimeStage)(
        workUnitStore,
        makeUntrackedSearchParams(underlyingSearchParams),
      );
    }
    function createRenderSearchParams(
      underlyingSearchParams,
      workStore,
      requestStore,
    ) {
      if (workStore.forceStatic) {
        return Promise.resolve({});
      } else {
        if (("TURBOPACK compile-time truthy", 1)) {
          return makeUntrackedSearchParamsWithDevWarnings(
            underlyingSearchParams,
            workStore,
            requestStore,
          );
        } else;
      }
    }
    const CachedSearchParams = new WeakMap();
    const CachedSearchParamsForUseCache = new WeakMap();
    function makeHangingSearchParams(workStore, prerenderStore) {
      const cachedSearchParams = CachedSearchParams.get(prerenderStore);
      if (cachedSearchParams) {
        return cachedSearchParams;
      }
      const promise = (0, _dynamicrenderingutils.makeHangingPromise)(
        prerenderStore.renderSignal,
        workStore.route,
        "`searchParams`",
      );
      const proxiedPromise = new Proxy(promise, {
        get(target, prop, receiver) {
          if (Object.hasOwn(promise, prop)) {
            return _reflect.ReflectAdapter.get(target, prop, receiver);
          }
          switch (prop) {
            case "then": {
              const expression =
                "`await searchParams`, `searchParams.then`, or similar";
              (0, _dynamicrendering.annotateDynamicAccess)(
                expression,
                prerenderStore,
              );
              return _reflect.ReflectAdapter.get(target, prop, receiver);
            }
            case "status": {
              const expression =
                "`use(searchParams)`, `searchParams.status`, or similar";
              (0, _dynamicrendering.annotateDynamicAccess)(
                expression,
                prerenderStore,
              );
              return _reflect.ReflectAdapter.get(target, prop, receiver);
            }
            default: {
              return _reflect.ReflectAdapter.get(target, prop, receiver);
            }
          }
        },
      });
      CachedSearchParams.set(prerenderStore, proxiedPromise);
      return proxiedPromise;
    }
    function makeErroringSearchParams(workStore, prerenderStore) {
      const cachedSearchParams = CachedSearchParams.get(workStore);
      if (cachedSearchParams) {
        return cachedSearchParams;
      }
      const underlyingSearchParams = {};

      const promise = Promise.resolve(underlyingSearchParams);
      const proxiedPromise = new Proxy(promise, {
        get(target, prop, receiver) {
          if (Object.hasOwn(promise, prop)) {
            return _reflect.ReflectAdapter.get(target, prop, receiver);
          }
          if (typeof prop === "string" && prop === "then") {
            const expression =
              "`await searchParams`, `searchParams.then`, or similar";
            if (workStore.dynamicShouldError) {
              (0, _utils.throwWithStaticGenerationBailoutErrorWithDynamicError)(
                workStore.route,
                expression,
              );
            } else if (prerenderStore.type === "prerender-ppr") {
              (0, _dynamicrendering.postponeWithTracking)(
                workStore.route,
                expression,
                prerenderStore.dynamicTracking,
              );
            } else {
              (0, _dynamicrendering.throwToInterruptStaticGeneration)(
                expression,
                workStore,
                prerenderStore,
              );
            }
          }
          return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
      });
      CachedSearchParams.set(workStore, proxiedPromise);
      return proxiedPromise;
    }
    function makeErroringSearchParamsForUseCache(workStore) {
      const cachedSearchParams = CachedSearchParamsForUseCache.get(workStore);
      if (cachedSearchParams) {
        return cachedSearchParams;
      }
      const promise = Promise.resolve({});
      const proxiedPromise = new Proxy(promise, {
        get: function get(target, prop, receiver) {
          if (Object.hasOwn(promise, prop)) {
            return _reflect.ReflectAdapter.get(target, prop, receiver);
          }
          if (
            typeof prop === "string" &&
            (prop === "then" || !_reflectutils.wellKnownProperties.has(prop))
          ) {
            (0, _utils.throwForSearchParamsAccessInUseCache)(workStore, get);
          }
          return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
      });
      CachedSearchParamsForUseCache.set(workStore, proxiedPromise);
      return proxiedPromise;
    }
    function makeUntrackedSearchParams(underlyingSearchParams) {
      const cachedSearchParams = CachedSearchParams.get(underlyingSearchParams);
      if (cachedSearchParams) {
        return cachedSearchParams;
      }
      const promise = Promise.resolve(underlyingSearchParams);
      CachedSearchParams.set(underlyingSearchParams, promise);
      return promise;
    }
    function makeUntrackedSearchParamsWithDevWarnings(
      underlyingSearchParams,
      workStore,
      requestStore,
    ) {
      if (requestStore.asyncApiPromises) {
        return makeUntrackedSearchParamsWithDevWarningsImpl(
          underlyingSearchParams,
          workStore,
          requestStore,
        );
      } else {
        const cachedSearchParams = CachedSearchParams.get(
          underlyingSearchParams,
        );
        if (cachedSearchParams) {
          return cachedSearchParams;
        }
        const promise = makeUntrackedSearchParamsWithDevWarningsImpl(
          underlyingSearchParams,
          workStore,
          requestStore,
        );
        CachedSearchParams.set(requestStore, promise);
        return promise;
      }
    }
    function makeUntrackedSearchParamsWithDevWarningsImpl(
      underlyingSearchParams,
      workStore,
      requestStore,
    ) {
      const promiseInitialized = {
        current: false,
      };
      const proxiedUnderlying = instrumentSearchParamsObjectWithDevWarnings(
        underlyingSearchParams,
        workStore,
        promiseInitialized,
      );
      let promise;
      if (requestStore.asyncApiPromises) {
        const sharedSearchParamsParent =
          requestStore.asyncApiPromises.sharedSearchParamsParent;
        promise = new Promise((resolve, reject) => {
          sharedSearchParamsParent.then(
            () => resolve(proxiedUnderlying),
            reject,
          );
        });

        promise.displayName = "searchParams";
      } else {
        promise = (0, _dynamicrenderingutils.makeDevtoolsIOAwarePromise)(
          proxiedUnderlying,
          requestStore,
          _stagedrendering.RenderStage.Runtime,
        );
      }
      promise.then(
        () => {
          promiseInitialized.current = true;
        },

        ignoreReject,
      );
      return instrumentSearchParamsPromiseWithDevWarnings(
        underlyingSearchParams,
        promise,
        workStore,
      );
    }
    function ignoreReject() {}
    function instrumentSearchParamsObjectWithDevWarnings(
      underlyingSearchParams,
      workStore,
      promiseInitialized,
    ) {
      return new Proxy(underlyingSearchParams, {
        get(target, prop, receiver) {
          if (typeof prop === "string" && promiseInitialized.current) {
            if (workStore.dynamicShouldError) {
              const expression = (0,
              _reflectutils.describeStringPropertyAccess)("searchParams", prop);
              (0, _utils.throwWithStaticGenerationBailoutErrorWithDynamicError)(
                workStore.route,
                expression,
              );
            }
          }
          return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        has(target, prop) {
          if (typeof prop === "string") {
            if (workStore.dynamicShouldError) {
              const expression = (0,
              _reflectutils.describeHasCheckingStringProperty)(
                "searchParams",
                prop,
              );
              (0, _utils.throwWithStaticGenerationBailoutErrorWithDynamicError)(
                workStore.route,
                expression,
              );
            }
          }
          return Reflect.has(target, prop);
        },
        ownKeys(target) {
          if (workStore.dynamicShouldError) {
            const expression =
              "`{...searchParams}`, `Object.keys(searchParams)`, or similar";
            (0, _utils.throwWithStaticGenerationBailoutErrorWithDynamicError)(
              workStore.route,
              expression,
            );
          }
          return Reflect.ownKeys(target);
        },
      });
    }
    function instrumentSearchParamsPromiseWithDevWarnings(
      underlyingSearchParams,
      promise,
      workStore,
    ) {
      const proxiedProperties = new Set();
      Object.keys(underlyingSearchParams).forEach((prop) => {
        if (_reflectutils.wellKnownProperties.has(prop)) {
        } else {
          proxiedProperties.add(prop);
        }
      });
      return new Proxy(promise, {
        get(target, prop, receiver) {
          if (prop === "then" && workStore.dynamicShouldError) {
            const expression = "`searchParams.then`";
            (0, _utils.throwWithStaticGenerationBailoutErrorWithDynamicError)(
              workStore.route,
              expression,
            );
          }
          if (typeof prop === "string") {
            if (
              !_reflectutils.wellKnownProperties.has(prop) &&
              (proxiedProperties.has(prop) ||
                Reflect.has(target, prop) === false)
            ) {
              const expression = (0,
              _reflectutils.describeStringPropertyAccess)("searchParams", prop);
              warnForSyncAccess(workStore.route, expression);
            }
          }
          return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
          if (typeof prop === "string") {
            proxiedProperties.delete(prop);
          }
          return Reflect.set(target, prop, value, receiver);
        },
        has(target, prop) {
          if (typeof prop === "string") {
            if (
              !_reflectutils.wellKnownProperties.has(prop) &&
              (proxiedProperties.has(prop) ||
                Reflect.has(target, prop) === false)
            ) {
              const expression = (0,
              _reflectutils.describeHasCheckingStringProperty)(
                "searchParams",
                prop,
              );
              warnForSyncAccess(workStore.route, expression);
            }
          }
          return Reflect.has(target, prop);
        },
        ownKeys(target) {
          const expression = "`Object.keys(searchParams)` or similar";
          warnForSyncAccess(workStore.route, expression);
          return Reflect.ownKeys(target);
        },
      });
    }
    const warnForSyncAccess = (0,
    _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(
      createSearchAccessError,
    );
    function createSearchAccessError(route, expression) {
      const prefix = route ? `Route "${route}" ` : "This route ";
      return Object.defineProperty(
        new Error(
          `${prefix}used ${expression}. ` +
            `\`searchParams\` is a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. ` +
            `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`,
        ),
        "__NEXT_ERROR_CODE",
        {
          value: "E848",
          enumerable: false,
          configurable: true,
        },
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/dynamic-access-async-storage-instance.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "dynamicAccessAsyncStorageInstance", {
      enumerable: true,
      get: function () {
        return dynamicAccessAsyncStorageInstance;
      },
    });
    const _asynclocalstorage = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/async-local-storage.js [app-client] (ecmascript)",
    );
    const dynamicAccessAsyncStorageInstance = (0,
    _asynclocalstorage.createAsyncLocalStorage)();
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/dynamic-access-async-storage.external.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "dynamicAccessAsyncStorage", {
      enumerable: true,
      get: function () {
        return _dynamicaccessasyncstorageinstance.dynamicAccessAsyncStorageInstance;
      },
    });
    const _dynamicaccessasyncstorageinstance = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/dynamic-access-async-storage-instance.js [app-client] (ecmascript)",
    );
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/request/params.js [app-client] (ecmascript)",
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
        createParamsFromClient: null,
        createPrerenderParamsForClientSegment: null,
        createServerParamsForMetadata: null,
        createServerParamsForRoute: null,
        createServerParamsForServerSegment: null,
      });
    function _export(target, all) {
      for (var name in all)
        Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name],
        });
    }
    _export(exports, {
      createParamsFromClient: function () {
        return createParamsFromClient;
      },
      createPrerenderParamsForClientSegment: function () {
        return createPrerenderParamsForClientSegment;
      },
      createServerParamsForMetadata: function () {
        return createServerParamsForMetadata;
      },
      createServerParamsForRoute: function () {
        return createServerParamsForRoute;
      },
      createServerParamsForServerSegment: function () {
        return createServerParamsForServerSegment;
      },
    });
    const _workasyncstorageexternal = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/work-async-storage.external.js [app-client] (ecmascript)",
    );
    const _reflect = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/web/spec-extension/adapters/reflect.js [app-client] (ecmascript)",
    );
    const _dynamicrendering = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/dynamic-rendering.js [app-client] (ecmascript)",
    );
    const _workunitasyncstorageexternal = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/work-unit-async-storage.external.js [app-client] (ecmascript)",
    );
    const _invarianterror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)",
    );
    const _reflectutils = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/utils/reflect-utils.js [app-client] (ecmascript)",
    );
    const _dynamicrenderingutils = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/dynamic-rendering-utils.js [app-client] (ecmascript)",
    );
    const _creatededupedbycallsiteservererrorlogger = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/create-deduped-by-callsite-server-error-logger.js [app-client] (ecmascript)",
    );
    const _dynamicaccessasyncstorageexternal = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/dynamic-access-async-storage.external.js [app-client] (ecmascript)",
    );
    const _stagedrendering = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/staged-rendering.js [app-client] (ecmascript)",
    );
    function createParamsFromClient(underlyingParams, workStore) {
      const workUnitStore =
        _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
      if (workUnitStore) {
        switch (workUnitStore.type) {
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
            return createStaticPrerenderParams(
              underlyingParams,
              workStore,
              workUnitStore,
            );
          case "cache":
          case "private-cache":
          case "unstable-cache":
            throw Object.defineProperty(
              new _invarianterror.InvariantError(
                "createParamsFromClient should not be called in cache contexts.",
              ),
              "__NEXT_ERROR_CODE",
              {
                value: "E736",
                enumerable: false,
                configurable: true,
              },
            );
          case "prerender-runtime":
            throw Object.defineProperty(
              new _invarianterror.InvariantError(
                "createParamsFromClient should not be called in a runtime prerender.",
              ),
              "__NEXT_ERROR_CODE",
              {
                value: "E770",
                enumerable: false,
                configurable: true,
              },
            );
          case "request":
            if (("TURBOPACK compile-time truthy", 1)) {
              const devFallbackParams = workUnitStore.devFallbackParams;
              return createRenderParamsInDev(
                underlyingParams,
                devFallbackParams,
                workStore,
                workUnitStore,
              );
            } else;
          default:
            workUnitStore;
        }
      }
      (0, _workunitasyncstorageexternal.throwInvariantForMissingStore)();
    }
    const createServerParamsForMetadata = createServerParamsForServerSegment;
    function createServerParamsForRoute(underlyingParams, workStore) {
      const workUnitStore =
        _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
      if (workUnitStore) {
        switch (workUnitStore.type) {
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
            return createStaticPrerenderParams(
              underlyingParams,
              workStore,
              workUnitStore,
            );
          case "cache":
          case "private-cache":
          case "unstable-cache":
            throw Object.defineProperty(
              new _invarianterror.InvariantError(
                "createServerParamsForRoute should not be called in cache contexts.",
              ),
              "__NEXT_ERROR_CODE",
              {
                value: "E738",
                enumerable: false,
                configurable: true,
              },
            );
          case "prerender-runtime":
            return createRuntimePrerenderParams(
              underlyingParams,
              workUnitStore,
            );
          case "request":
            if (("TURBOPACK compile-time truthy", 1)) {
              const devFallbackParams = workUnitStore.devFallbackParams;
              return createRenderParamsInDev(
                underlyingParams,
                devFallbackParams,
                workStore,
                workUnitStore,
              );
            } else;
          default:
            workUnitStore;
        }
      }
      (0, _workunitasyncstorageexternal.throwInvariantForMissingStore)();
    }
    function createServerParamsForServerSegment(underlyingParams, workStore) {
      const workUnitStore =
        _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
      if (workUnitStore) {
        switch (workUnitStore.type) {
          case "prerender":
          case "prerender-client":
          case "prerender-ppr":
          case "prerender-legacy":
            return createStaticPrerenderParams(
              underlyingParams,
              workStore,
              workUnitStore,
            );
          case "cache":
          case "private-cache":
          case "unstable-cache":
            throw Object.defineProperty(
              new _invarianterror.InvariantError(
                "createServerParamsForServerSegment should not be called in cache contexts.",
              ),
              "__NEXT_ERROR_CODE",
              {
                value: "E743",
                enumerable: false,
                configurable: true,
              },
            );
          case "prerender-runtime":
            return createRuntimePrerenderParams(
              underlyingParams,
              workUnitStore,
            );
          case "request":
            if (("TURBOPACK compile-time truthy", 1)) {
              const devFallbackParams = workUnitStore.devFallbackParams;
              return createRenderParamsInDev(
                underlyingParams,
                devFallbackParams,
                workStore,
                workUnitStore,
              );
            } else;
          default:
            workUnitStore;
        }
      }
      (0, _workunitasyncstorageexternal.throwInvariantForMissingStore)();
    }
    function createPrerenderParamsForClientSegment(underlyingParams) {
      const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
      if (!workStore) {
        throw Object.defineProperty(
          new _invarianterror.InvariantError(
            "Missing workStore in createPrerenderParamsForClientSegment",
          ),
          "__NEXT_ERROR_CODE",
          {
            value: "E773",
            enumerable: false,
            configurable: true,
          },
        );
      }
      const workUnitStore =
        _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
      if (workUnitStore) {
        switch (workUnitStore.type) {
          case "prerender":
          case "prerender-client":
            const fallbackParams = workUnitStore.fallbackRouteParams;
            if (fallbackParams) {
              for (let key in underlyingParams) {
                if (fallbackParams.has(key)) {
                  return (0, _dynamicrenderingutils.makeHangingPromise)(
                    workUnitStore.renderSignal,
                    workStore.route,
                    "`params`",
                  );
                }
              }
            }
            break;
          case "cache":
          case "private-cache":
          case "unstable-cache":
            throw Object.defineProperty(
              new _invarianterror.InvariantError(
                "createPrerenderParamsForClientSegment should not be called in cache contexts.",
              ),
              "__NEXT_ERROR_CODE",
              {
                value: "E734",
                enumerable: false,
                configurable: true,
              },
            );
          case "prerender-ppr":
          case "prerender-legacy":
          case "prerender-runtime":
          case "request":
            break;
          default:
            workUnitStore;
        }
      }

      return Promise.resolve(underlyingParams);
    }
    function createStaticPrerenderParams(
      underlyingParams,
      workStore,
      prerenderStore,
    ) {
      switch (prerenderStore.type) {
        case "prerender":
        case "prerender-client": {
          const fallbackParams = prerenderStore.fallbackRouteParams;
          if (fallbackParams) {
            for (const key in underlyingParams) {
              if (fallbackParams.has(key)) {
                return makeHangingParams(
                  underlyingParams,
                  workStore,
                  prerenderStore,
                );
              }
            }
          }
          break;
        }
        case "prerender-ppr": {
          const fallbackParams = prerenderStore.fallbackRouteParams;
          if (fallbackParams) {
            for (const key in underlyingParams) {
              if (fallbackParams.has(key)) {
                return makeErroringParams(
                  underlyingParams,
                  fallbackParams,
                  workStore,
                  prerenderStore,
                );
              }
            }
          }
          break;
        }
        case "prerender-legacy":
          break;
        default:
          prerenderStore;
      }
      return makeUntrackedParams(underlyingParams);
    }
    function createRuntimePrerenderParams(underlyingParams, workUnitStore) {
      return (0, _dynamicrendering.delayUntilRuntimeStage)(
        workUnitStore,
        makeUntrackedParams(underlyingParams),
      );
    }
    function createRenderParamsInProd(underlyingParams) {
      return makeUntrackedParams(underlyingParams);
    }
    function createRenderParamsInDev(
      underlyingParams,
      devFallbackParams,
      workStore,
      requestStore,
    ) {
      let hasFallbackParams = false;
      if (devFallbackParams) {
        for (let key in underlyingParams) {
          if (devFallbackParams.has(key)) {
            hasFallbackParams = true;
            break;
          }
        }
      }
      return makeDynamicallyTrackedParamsWithDevWarnings(
        underlyingParams,
        hasFallbackParams,
        workStore,
        requestStore,
      );
    }
    const CachedParams = new WeakMap();
    const fallbackParamsProxyHandler = {
      get: function get(target, prop, receiver) {
        if (prop === "then" || prop === "catch" || prop === "finally") {
          const originalMethod = _reflect.ReflectAdapter.get(
            target,
            prop,
            receiver,
          );
          return {
            [prop]: (...args) => {
              const store =
                _dynamicaccessasyncstorageexternal.dynamicAccessAsyncStorage.getStore();
              if (store) {
                store.abortController.abort(
                  Object.defineProperty(
                    new Error(
                      `Accessed fallback \`params\` during prerendering.`,
                    ),
                    "__NEXT_ERROR_CODE",
                    {
                      value: "E691",
                      enumerable: false,
                      configurable: true,
                    },
                  ),
                );
              }
              return new Proxy(
                originalMethod.apply(target, args),
                fallbackParamsProxyHandler,
              );
            },
          }[prop];
        }
        return _reflect.ReflectAdapter.get(target, prop, receiver);
      },
    };
    function makeHangingParams(underlyingParams, workStore, prerenderStore) {
      const cachedParams = CachedParams.get(underlyingParams);
      if (cachedParams) {
        return cachedParams;
      }
      const promise = new Proxy(
        (0, _dynamicrenderingutils.makeHangingPromise)(
          prerenderStore.renderSignal,
          workStore.route,
          "`params`",
        ),
        fallbackParamsProxyHandler,
      );
      CachedParams.set(underlyingParams, promise);
      return promise;
    }
    function makeErroringParams(
      underlyingParams,
      fallbackParams,
      workStore,
      prerenderStore,
    ) {
      const cachedParams = CachedParams.get(underlyingParams);
      if (cachedParams) {
        return cachedParams;
      }
      const augmentedUnderlying = {
        ...underlyingParams,
      };

      const promise = Promise.resolve(augmentedUnderlying);
      CachedParams.set(underlyingParams, promise);
      Object.keys(underlyingParams).forEach((prop) => {
        if (_reflectutils.wellKnownProperties.has(prop)) {
        } else {
          if (fallbackParams.has(prop)) {
            Object.defineProperty(augmentedUnderlying, prop, {
              get() {
                const expression = (0,
                _reflectutils.describeStringPropertyAccess)("params", prop);

                if (prerenderStore.type === "prerender-ppr") {
                  (0, _dynamicrendering.postponeWithTracking)(
                    workStore.route,
                    expression,
                    prerenderStore.dynamicTracking,
                  );
                } else {
                  (0, _dynamicrendering.throwToInterruptStaticGeneration)(
                    expression,
                    workStore,
                    prerenderStore,
                  );
                }
              },
              enumerable: true,
            });
          }
        }
      });
      return promise;
    }
    function makeUntrackedParams(underlyingParams) {
      const cachedParams = CachedParams.get(underlyingParams);
      if (cachedParams) {
        return cachedParams;
      }
      const promise = Promise.resolve(underlyingParams);
      CachedParams.set(underlyingParams, promise);
      return promise;
    }
    function makeDynamicallyTrackedParamsWithDevWarnings(
      underlyingParams,
      hasFallbackParams,
      workStore,
      requestStore,
    ) {
      if (requestStore.asyncApiPromises && hasFallbackParams) {
        const sharedParamsParent =
          requestStore.asyncApiPromises.sharedParamsParent;
        const promise = new Promise((resolve, reject) => {
          sharedParamsParent.then(() => resolve(underlyingParams), reject);
        });

        promise.displayName = "params";
        return instrumentParamsPromiseWithDevWarnings(
          underlyingParams,
          promise,
          workStore,
        );
      }
      const cachedParams = CachedParams.get(underlyingParams);
      if (cachedParams) {
        return cachedParams;
      }

      const promise = hasFallbackParams
        ? (0, _dynamicrenderingutils.makeDevtoolsIOAwarePromise)(
            underlyingParams,
            requestStore,
            _stagedrendering.RenderStage.Runtime,
          )
        : Promise.resolve(underlyingParams);
      const proxiedPromise = instrumentParamsPromiseWithDevWarnings(
        underlyingParams,
        promise,
        workStore,
      );
      CachedParams.set(underlyingParams, proxiedPromise);
      return proxiedPromise;
    }
    function instrumentParamsPromiseWithDevWarnings(
      underlyingParams,
      promise,
      workStore,
    ) {
      const proxiedProperties = new Set();
      Object.keys(underlyingParams).forEach((prop) => {
        if (_reflectutils.wellKnownProperties.has(prop)) {
        } else {
          proxiedProperties.add(prop);
        }
      });
      return new Proxy(promise, {
        get(target, prop, receiver) {
          if (typeof prop === "string") {
            if (proxiedProperties.has(prop)) {
              const expression = (0,
              _reflectutils.describeStringPropertyAccess)("params", prop);
              warnForSyncAccess(workStore.route, expression);
            }
          }
          return _reflect.ReflectAdapter.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
          if (typeof prop === "string") {
            proxiedProperties.delete(prop);
          }
          return _reflect.ReflectAdapter.set(target, prop, value, receiver);
        },
        ownKeys(target) {
          const expression = "`...params` or similar expression";
          warnForSyncAccess(workStore.route, expression);
          return Reflect.ownKeys(target);
        },
      });
    }
    const warnForSyncAccess = (0,
    _creatededupedbycallsiteservererrorlogger.createDedupedByCallsiteServerErrorLoggerDev)(
      createParamsAccessError,
    );
    function createParamsAccessError(route, expression) {
      const prefix = route ? `Route "${route}" ` : "This route ";
      return Object.defineProperty(
        new Error(
          `${prefix}used ${expression}. ` +
            `\`params\` is a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. ` +
            `Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`,
        ),
        "__NEXT_ERROR_CODE",
        {
          value: "E834",
          enumerable: false,
          configurable: true,
        },
      );
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/client-page.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "ClientPageRoot", {
      enumerable: true,
      get: function () {
        return ClientPageRoot;
      },
    });
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    const _invarianterror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)",
    );
    const _approutercontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)",
    );
    const _react = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
    );
    const _routeparams = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/route-params.js [app-client] (ecmascript)",
    );
    const _hooksclientcontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js [app-client] (ecmascript)",
    );
    function ClientPageRoot({ Component, serverProvidedParams }) {
      let searchParams;
      let params;
      if (serverProvidedParams !== null) {
        searchParams = serverProvidedParams.searchParams;
        params = serverProvidedParams.params;
      } else {
        const layoutRouterContext = (0, _react.use)(
          _approutercontextsharedruntime.LayoutRouterContext,
        );
        params =
          layoutRouterContext !== null ? layoutRouterContext.parentParams : {};

        searchParams = (0, _routeparams.urlSearchParamsToParsedUrlQuery)(
          (0, _react.use)(_hooksclientcontextsharedruntime.SearchParamsContext),
        );
      }
      if (typeof window === "undefined") {
        const { workAsyncStorage } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/work-async-storage.external.js [app-client] (ecmascript)",
        );
        let clientSearchParams;
        let clientParams;

        const store = workAsyncStorage.getStore();
        if (!store) {
          throw Object.defineProperty(
            new _invarianterror.InvariantError(
              "Expected workStore to exist when handling searchParams in a client Page.",
            ),
            "__NEXT_ERROR_CODE",
            {
              value: "E564",
              enumerable: false,
              configurable: true,
            },
          );
        }
        const { createSearchParamsFromClient } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/request/search-params.js [app-client] (ecmascript)",
        );
        clientSearchParams = createSearchParamsFromClient(searchParams, store);
        const { createParamsFromClient } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/request/params.js [app-client] (ecmascript)",
        );
        clientParams = createParamsFromClient(params, store);
        return (0, _jsxruntime.jsx)(Component, {
          params: clientParams,
          searchParams: clientSearchParams,
        });
      } else {
        const { createRenderSearchParamsFromClient } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/request/search-params.browser.js [app-client] (ecmascript)",
        );
        const clientSearchParams =
          createRenderSearchParamsFromClient(searchParams);
        const { createRenderParamsFromClient } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/request/params.browser.js [app-client] (ecmascript)",
        );
        const clientParams = createRenderParamsFromClient(params);
        return (0, _jsxruntime.jsx)(Component, {
          params: clientParams,
          searchParams: clientSearchParams,
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/components/client-segment.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "ClientSegmentRoot", {
      enumerable: true,
      get: function () {
        return ClientSegmentRoot;
      },
    });
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    const _invarianterror = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/invariant-error.js [app-client] (ecmascript)",
    );
    const _approutercontextsharedruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)",
    );
    const _react = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)",
    );
    function ClientSegmentRoot({ Component, slots, serverProvidedParams }) {
      let params;
      if (serverProvidedParams !== null) {
        params = serverProvidedParams.params;
      } else {
        const layoutRouterContext = (0, _react.use)(
          _approutercontextsharedruntime.LayoutRouterContext,
        );
        params =
          layoutRouterContext !== null ? layoutRouterContext.parentParams : {};
      }
      if (typeof window === "undefined") {
        const { workAsyncStorage } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/app-render/work-async-storage.external.js [app-client] (ecmascript)",
        );
        let clientParams;

        const store = workAsyncStorage.getStore();
        if (!store) {
          throw Object.defineProperty(
            new _invarianterror.InvariantError(
              "Expected workStore to exist when handling params in a client segment such as a Layout or Template.",
            ),
            "__NEXT_ERROR_CODE",
            {
              value: "E600",
              enumerable: false,
              configurable: true,
            },
          );
        }
        const { createParamsFromClient } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/server/request/params.js [app-client] (ecmascript)",
        );
        clientParams = createParamsFromClient(params, store);
        return (0, _jsxruntime.jsx)(Component, {
          ...slots,
          params: clientParams,
        });
      } else {
        const { createRenderParamsFromClient } = __turbopack_context__.r(
          "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/client/request/params.browser.js [app-client] (ecmascript)",
        );
        const clientParams = createRenderParamsFromClient(params);
        return (0, _jsxruntime.jsx)(Component, {
          ...slots,
          params: clientParams,
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/lib/metadata/generate/icon-mark.js [app-client] (ecmascript)",
  (__turbopack_context__, module, exports) => {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
    Object.defineProperty(exports, "IconMark", {
      enumerable: true,
      get: function () {
        return IconMark;
      },
    });
    const _jsxruntime = __turbopack_context__.r(
      "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)",
    );
    const IconMark = () => {
      if (typeof window !== "undefined") {
        return null;
      }
      return (0, _jsxruntime.jsx)("meta", {
        name: "\xabnxt-icon\xbb",
      });
    };
  },
]);
