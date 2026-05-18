(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  "chunks/turbopack-Desktop_Projects_final-pixelate_dashboard_edge-wrapper_c8df0d90.js",
  {
    otherChunks: [
      "chunks/Desktop_Projects_final-pixelate_dashboard_e7177aa8._.js",
      "chunks/[root-of-the-server]__651e24a2._.js",
    ],
    runtimeModuleIds: [
      '[project]/Desktop/Projects/final-pixelate/dashboard/edge-wrapper.js { MODULE => "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/dist/esm/build/templates/middleware.js { INNER_MIDDLEWARE_MODULE => \\"[project]/Desktop/Projects/final-pixelate/dashboard/src/middleware.ts [middleware-edge] (ecmascript)\\" } [middleware-edge] (ecmascript)" } [middleware-edge] (ecmascript)',
    ],
  },
]);
(() => {
  if (!Array.isArray(globalThis.TURBOPACK)) {
    return;
  }

  const CHUNK_BASE_PATH = "";
  const CHUNK_SUFFIX_PATH = "";
  const RELATIVE_ROOT_PATH = "../../../../../..";
  const RUNTIME_PUBLIC_PATH = "";

  const REEXPORTED_OBJECTS = new WeakMap();

  function Context(module, exports) {
    this.m = module;

    this.e = exports;
  }
  const contextPrototype = Context.prototype;
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const toStringTag = typeof Symbol !== "undefined" && Symbol.toStringTag;
  function defineProp(obj, name, options) {
    if (!hasOwnProperty.call(obj, name))
      Object.defineProperty(obj, name, options);
  }
  function getOverwrittenModule(moduleCache, id) {
    let module = moduleCache[id];
    if (!module) {
      module = createModuleObject(id);
      moduleCache[id] = module;
    }
    return module;
  }

  function createModuleObject(id) {
    return {
      exports: {},
      error: undefined,
      id,
      namespaceObject: undefined,
    };
  }
  const BindingTag_Value = 0;

  function esm(exports, bindings) {
    defineProp(exports, "__esModule", {
      value: true,
    });
    if (toStringTag)
      defineProp(exports, toStringTag, {
        value: "Module",
      });
    let i = 0;
    while (i < bindings.length) {
      const propName = bindings[i++];
      const tagOrFunction = bindings[i++];
      if (typeof tagOrFunction === "number") {
        if (tagOrFunction === BindingTag_Value) {
          defineProp(exports, propName, {
            value: bindings[i++],
            enumerable: true,
            writable: false,
          });
        } else {
          throw new Error(`unexpected tag: ${tagOrFunction}`);
        }
      } else {
        const getterFn = tagOrFunction;
        if (typeof bindings[i] === "function") {
          const setterFn = bindings[i++];
          defineProp(exports, propName, {
            get: getterFn,
            set: setterFn,
            enumerable: true,
          });
        } else {
          defineProp(exports, propName, {
            get: getterFn,
            enumerable: true,
          });
        }
      }
    }
    Object.seal(exports);
  }

  function esmExport(bindings, id) {
    let module;
    let exports;
    if (id != null) {
      module = getOverwrittenModule(this.c, id);
      exports = module.exports;
    } else {
      module = this.m;
      exports = this.e;
    }
    module.namespaceObject = exports;
    esm(exports, bindings);
  }
  contextPrototype.s = esmExport;
  function ensureDynamicExports(module, exports) {
    let reexportedObjects = REEXPORTED_OBJECTS.get(module);
    if (!reexportedObjects) {
      REEXPORTED_OBJECTS.set(module, (reexportedObjects = []));
      module.exports = module.namespaceObject = new Proxy(exports, {
        get(target, prop) {
          if (
            hasOwnProperty.call(target, prop) ||
            prop === "default" ||
            prop === "__esModule"
          ) {
            return Reflect.get(target, prop);
          }
          for (const obj of reexportedObjects) {
            const value = Reflect.get(obj, prop);
            if (value !== undefined) return value;
          }
          return undefined;
        },
        ownKeys(target) {
          const keys = Reflect.ownKeys(target);
          for (const obj of reexportedObjects) {
            for (const key of Reflect.ownKeys(obj)) {
              if (key !== "default" && !keys.includes(key)) keys.push(key);
            }
          }
          return keys;
        },
      });
    }
    return reexportedObjects;
  }

  function dynamicExport(object, id) {
    let module;
    let exports;
    if (id != null) {
      module = getOverwrittenModule(this.c, id);
      exports = module.exports;
    } else {
      module = this.m;
      exports = this.e;
    }
    const reexportedObjects = ensureDynamicExports(module, exports);
    if (typeof object === "object" && object !== null) {
      reexportedObjects.push(object);
    }
  }
  contextPrototype.j = dynamicExport;
  function exportValue(value, id) {
    let module;
    if (id != null) {
      module = getOverwrittenModule(this.c, id);
    } else {
      module = this.m;
    }
    module.exports = value;
  }
  contextPrototype.v = exportValue;
  function exportNamespace(namespace, id) {
    let module;
    if (id != null) {
      module = getOverwrittenModule(this.c, id);
    } else {
      module = this.m;
    }
    module.exports = module.namespaceObject = namespace;
  }
  contextPrototype.n = exportNamespace;
  function createGetter(obj, key) {
    return () => obj[key];
  }

  const getProto = Object.getPrototypeOf
    ? (obj) => Object.getPrototypeOf(obj)
    : (obj) => obj.__proto__;
  const LEAF_PROTOTYPES = [
    null,
    getProto({}),
    getProto([]),
    getProto(getProto),
  ];

  function interopEsm(raw, ns, allowExportDefault) {
    const bindings = [];
    let defaultLocation = -1;
    for (
      let current = raw;
      (typeof current === "object" || typeof current === "function") &&
      !LEAF_PROTOTYPES.includes(current);
      current = getProto(current)
    ) {
      for (const key of Object.getOwnPropertyNames(current)) {
        bindings.push(key, createGetter(raw, key));
        if (defaultLocation === -1 && key === "default") {
          defaultLocation = bindings.length - 1;
        }
      }
    }

    if (!(allowExportDefault && defaultLocation >= 0)) {
      if (defaultLocation >= 0) {
        bindings.splice(defaultLocation, 1, BindingTag_Value, raw);
      } else {
        bindings.push("default", BindingTag_Value, raw);
      }
    }
    esm(ns, bindings);
    return ns;
  }
  function createNS(raw) {
    if (typeof raw === "function") {
      return function (...args) {
        return raw.apply(this, args);
      };
    } else {
      return Object.create(null);
    }
  }
  function esmImport(id) {
    const module = getOrInstantiateModuleFromParent(id, this.m);

    if (module.namespaceObject) return module.namespaceObject;

    const raw = module.exports;
    return (module.namespaceObject = interopEsm(
      raw,
      createNS(raw),
      raw && raw.__esModule,
    ));
  }
  contextPrototype.i = esmImport;
  function asyncLoader(moduleId) {
    const loader = this.r(moduleId);
    return loader(esmImport.bind(this));
  }
  contextPrototype.A = asyncLoader;

  const runtimeRequire =
    typeof require === "function"
      ? require
      : function require1() {
          throw new Error("Unexpected use of runtime require");
        };
  contextPrototype.t = runtimeRequire;
  function commonJsRequire(id) {
    return getOrInstantiateModuleFromParent(id, this.m).exports;
  }
  contextPrototype.r = commonJsRequire;

  function moduleContext(map) {
    function moduleContext(id) {
      if (hasOwnProperty.call(map, id)) {
        return map[id].module();
      }
      const e = new Error(`Cannot find module '${id}'`);
      e.code = "MODULE_NOT_FOUND";
      throw e;
    }
    moduleContext.keys = () => {
      return Object.keys(map);
    };
    moduleContext.resolve = (id) => {
      if (hasOwnProperty.call(map, id)) {
        return map[id].id();
      }
      const e = new Error(`Cannot find module '${id}'`);
      e.code = "MODULE_NOT_FOUND";
      throw e;
    };
    moduleContext.import = async (id) => {
      return await moduleContext(id);
    };
    return moduleContext;
  }
  contextPrototype.f = moduleContext;

  function getChunkPath(chunkData) {
    return typeof chunkData === "string" ? chunkData : chunkData.path;
  }
  function isPromise(maybePromise) {
    return (
      maybePromise != null &&
      typeof maybePromise === "object" &&
      "then" in maybePromise &&
      typeof maybePromise.then === "function"
    );
  }
  function isAsyncModuleExt(obj) {
    return turbopackQueues in obj;
  }
  function createPromise() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      reject = rej;
      resolve = res;
    });
    return {
      promise,
      resolve: resolve,
      reject: reject,
    };
  }

  function installCompressedModuleFactories(
    chunkModules,
    offset,
    moduleFactories,
    newModuleId,
  ) {
    let i = offset;
    while (i < chunkModules.length) {
      let moduleId = chunkModules[i];
      let end = i + 1;

      while (
        end < chunkModules.length &&
        typeof chunkModules[end] !== "function"
      ) {
        end++;
      }
      if (end === chunkModules.length) {
        throw new Error("malformed chunk format, expected a factory function");
      }

      if (!moduleFactories.has(moduleId)) {
        const moduleFactoryFn = chunkModules[end];
        applyModuleFactoryName(moduleFactoryFn);
        newModuleId?.(moduleId);
        for (; i < end; i++) {
          moduleId = chunkModules[i];
          moduleFactories.set(moduleId, moduleFactoryFn);
        }
      }
      i = end + 1;
    }
  }

  const turbopackQueues = Symbol("turbopack queues");
  const turbopackExports = Symbol("turbopack exports");
  const turbopackError = Symbol("turbopack error");
  function resolveQueue(queue) {
    if (queue && queue.status !== 1) {
      queue.status = 1;
      queue.forEach((fn) => fn.queueCount--);
      queue.forEach((fn) => (fn.queueCount-- ? fn.queueCount++ : fn()));
    }
  }
  function wrapDeps(deps) {
    return deps.map((dep) => {
      if (dep !== null && typeof dep === "object") {
        if (isAsyncModuleExt(dep)) return dep;
        if (isPromise(dep)) {
          const queue = Object.assign([], {
            status: 0,
          });
          const obj = {
            [turbopackExports]: {},
            [turbopackQueues]: (fn) => fn(queue),
          };
          dep.then(
            (res) => {
              obj[turbopackExports] = res;
              resolveQueue(queue);
            },
            (err) => {
              obj[turbopackError] = err;
              resolveQueue(queue);
            },
          );
          return obj;
        }
      }
      return {
        [turbopackExports]: dep,
        [turbopackQueues]: () => {},
      };
    });
  }
  function asyncModule(body, hasAwait) {
    const module = this.m;
    const queue = hasAwait
      ? Object.assign([], {
          status: -1,
        })
      : undefined;
    const depQueues = new Set();
    const { resolve, reject, promise: rawPromise } = createPromise();
    const promise = Object.assign(rawPromise, {
      [turbopackExports]: module.exports,
      [turbopackQueues]: (fn) => {
        queue && fn(queue);
        depQueues.forEach(fn);
        promise["catch"](() => {});
      },
    });
    const attributes = {
      get() {
        return promise;
      },
      set(v) {
        if (v !== promise) {
          promise[turbopackExports] = v;
        }
      },
    };
    Object.defineProperty(module, "exports", attributes);
    Object.defineProperty(module, "namespaceObject", attributes);
    function handleAsyncDependencies(deps) {
      const currentDeps = wrapDeps(deps);
      const getResult = () =>
        currentDeps.map((d) => {
          if (d[turbopackError]) throw d[turbopackError];
          return d[turbopackExports];
        });
      const { promise, resolve } = createPromise();
      const fn = Object.assign(() => resolve(getResult), {
        queueCount: 0,
      });
      function fnQueue(q) {
        if (q !== queue && !depQueues.has(q)) {
          depQueues.add(q);
          if (q && q.status === 0) {
            fn.queueCount++;
            q.push(fn);
          }
        }
      }
      currentDeps.map((dep) => dep[turbopackQueues](fnQueue));
      return fn.queueCount ? promise : getResult();
    }
    function asyncResult(err) {
      if (err) {
        reject((promise[turbopackError] = err));
      } else {
        resolve(promise[turbopackExports]);
      }
      resolveQueue(queue);
    }
    body(handleAsyncDependencies, asyncResult);
    if (queue && queue.status === -1) {
      queue.status = 0;
    }
  }
  contextPrototype.a = asyncModule;

  const relativeURL = function relativeURL(inputUrl) {
    const realUrl = new URL(inputUrl, "x:/");
    const values = {};
    for (const key in realUrl) values[key] = realUrl[key];
    values.href = inputUrl;
    values.pathname = inputUrl.replace(/[?#].*/, "");
    values.origin = values.protocol = "";
    values.toString = values.toJSON = (..._args) => inputUrl;
    for (const key in values)
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        value: values[key],
      });
  };
  relativeURL.prototype = URL.prototype;
  contextPrototype.U = relativeURL;

  function invariant(never, computeMessage) {
    throw new Error(`Invariant: ${computeMessage(never)}`);
  }

  function requireStub(_moduleId) {
    throw new Error("dynamic usage of require is not supported");
  }
  contextPrototype.z = requireStub;

  contextPrototype.g = globalThis;
  function applyModuleFactoryName(factory) {
    Object.defineProperty(factory, "name", {
      value: "module evaluation",
    });
  }

  const browserContextPrototype = Context.prototype;
  var SourceType = (function (SourceType) {
    SourceType[(SourceType["Runtime"] = 0)] = "Runtime";

    SourceType[(SourceType["Parent"] = 1)] = "Parent";

    SourceType[(SourceType["Update"] = 2)] = "Update";
    return SourceType;
  })(SourceType || {});
  const moduleFactories = new Map();
  contextPrototype.M = moduleFactories;
  const availableModules = new Map();
  const availableModuleChunks = new Map();
  function factoryNotAvailableMessage(moduleId, sourceType, sourceData) {
    let instantiationReason;
    switch (sourceType) {
      case 0:
        instantiationReason = `as a runtime entry of chunk ${sourceData}`;
        break;
      case 1:
        instantiationReason = `because it was required from module ${sourceData}`;
        break;
      case 2:
        instantiationReason = "because of an HMR update";
        break;
      default:
        invariant(
          sourceType,
          (sourceType) => `Unknown source type: ${sourceType}`,
        );
    }
    return `Module ${moduleId} was instantiated ${instantiationReason}, but the module factory is not available.`;
  }
  function loadChunk(chunkData) {
    return loadChunkInternal(1, this.m.id, chunkData);
  }
  browserContextPrototype.l = loadChunk;
  function loadInitialChunk(chunkPath, chunkData) {
    return loadChunkInternal(0, chunkPath, chunkData);
  }
  async function loadChunkInternal(sourceType, sourceData, chunkData) {
    if (typeof chunkData === "string") {
      return loadChunkPath(sourceType, sourceData, chunkData);
    }
    const includedList = chunkData.included || [];
    const modulesPromises = includedList.map((included) => {
      if (moduleFactories.has(included)) return true;
      return availableModules.get(included);
    });
    if (modulesPromises.length > 0 && modulesPromises.every((p) => p)) {
      await Promise.all(modulesPromises);
      return;
    }
    const includedModuleChunksList = chunkData.moduleChunks || [];
    const moduleChunksPromises = includedModuleChunksList
      .map((included) => {
        return availableModuleChunks.get(included);
      })
      .filter((p) => p);
    let promise;
    if (moduleChunksPromises.length > 0) {
      if (moduleChunksPromises.length === includedModuleChunksList.length) {
        await Promise.all(moduleChunksPromises);
        return;
      }
      const moduleChunksToLoad = new Set();
      for (const moduleChunk of includedModuleChunksList) {
        if (!availableModuleChunks.has(moduleChunk)) {
          moduleChunksToLoad.add(moduleChunk);
        }
      }
      for (const moduleChunkToLoad of moduleChunksToLoad) {
        const promise = loadChunkPath(
          sourceType,
          sourceData,
          moduleChunkToLoad,
        );
        availableModuleChunks.set(moduleChunkToLoad, promise);
        moduleChunksPromises.push(promise);
      }
      promise = Promise.all(moduleChunksPromises);
    } else {
      promise = loadChunkPath(sourceType, sourceData, chunkData.path);

      for (const includedModuleChunk of includedModuleChunksList) {
        if (!availableModuleChunks.has(includedModuleChunk)) {
          availableModuleChunks.set(includedModuleChunk, promise);
        }
      }
    }
    for (const included of includedList) {
      if (!availableModules.has(included)) {
        availableModules.set(included, promise);
      }
    }
    await promise;
  }
  const loadedChunk = Promise.resolve(undefined);
  const instrumentedBackendLoadChunks = new WeakMap();

  function loadChunkByUrl(chunkUrl) {
    return loadChunkByUrlInternal(1, this.m.id, chunkUrl);
  }
  browserContextPrototype.L = loadChunkByUrl;

  function loadChunkByUrlInternal(sourceType, sourceData, chunkUrl) {
    const thenable = BACKEND.loadChunkCached(sourceType, chunkUrl);
    let entry = instrumentedBackendLoadChunks.get(thenable);
    if (entry === undefined) {
      const resolve = instrumentedBackendLoadChunks.set.bind(
        instrumentedBackendLoadChunks,
        thenable,
        loadedChunk,
      );
      entry = thenable.then(resolve).catch((error) => {
        let loadReason;
        switch (sourceType) {
          case 0:
            loadReason = `as a runtime dependency of chunk ${sourceData}`;
            break;
          case 1:
            loadReason = `from module ${sourceData}`;
            break;
          case 2:
            loadReason = "from an HMR update";
            break;
          default:
            invariant(
              sourceType,
              (sourceType) => `Unknown source type: ${sourceType}`,
            );
        }
        throw new Error(
          `Failed to load chunk ${chunkUrl} ${loadReason}${error ? `: ${error}` : ""}`,
          error
            ? {
                cause: error,
              }
            : undefined,
        );
      });
      instrumentedBackendLoadChunks.set(thenable, entry);
    }
    return entry;
  }

  function loadChunkPath(sourceType, sourceData, chunkPath) {
    const url = getChunkRelativeUrl(chunkPath);
    return loadChunkByUrlInternal(sourceType, sourceData, url);
  }

  function resolvePathFromModule(moduleId) {
    const exported = this.r(moduleId);
    return exported?.default ?? exported;
  }
  browserContextPrototype.R = resolvePathFromModule;

  function resolveAbsolutePath(modulePath) {
    return `/ROOT/${modulePath ?? ""}`;
  }
  browserContextPrototype.P = resolveAbsolutePath;

  function getWorkerBlobURL(chunks) {
    let bootstrap = `self.TURBOPACK_WORKER_LOCATION = ${JSON.stringify(location.origin)};
self.TURBOPACK_NEXT_CHUNK_URLS = ${JSON.stringify(chunks.reverse().map(getChunkRelativeUrl), null, 2)};
importScripts(...self.TURBOPACK_NEXT_CHUNK_URLS.map(c => self.TURBOPACK_WORKER_LOCATION + c).reverse());`;
    let blob = new Blob([bootstrap], {
      type: "text/javascript",
    });
    return URL.createObjectURL(blob);
  }
  browserContextPrototype.b = getWorkerBlobURL;

  function instantiateRuntimeModule(moduleId, chunkPath) {
    return instantiateModule(moduleId, 0, chunkPath);
  }

  function getChunkRelativeUrl(chunkPath) {
    return `${CHUNK_BASE_PATH}${chunkPath
      .split("/")
      .map((p) => encodeURIComponent(p))
      .join("/")}${CHUNK_SUFFIX_PATH}`;
  }
  function getPathFromScript(chunkScript) {
    if (typeof chunkScript === "string") {
      return chunkScript;
    }
    const chunkUrl =
      typeof TURBOPACK_NEXT_CHUNK_URLS !== "undefined"
        ? TURBOPACK_NEXT_CHUNK_URLS.pop()
        : chunkScript.getAttribute("src");
    const src = decodeURIComponent(chunkUrl.replace(/[?#].*$/, ""));
    const path = src.startsWith(CHUNK_BASE_PATH)
      ? src.slice(CHUNK_BASE_PATH.length)
      : src;
    return path;
  }
  const regexJsUrl = /\.js(?:\?[^#]*)?(?:#.*)?$/;

  function isJs(chunkUrlOrPath) {
    return regexJsUrl.test(chunkUrlOrPath);
  }
  const regexCssUrl = /\.css(?:\?[^#]*)?(?:#.*)?$/;

  function isCss(chunkUrl) {
    return regexCssUrl.test(chunkUrl);
  }
  function loadWebAssembly(chunkPath, edgeModule, importsObj) {
    return BACKEND.loadWebAssembly(
      1,
      this.m.id,
      chunkPath,
      edgeModule,
      importsObj,
    );
  }
  contextPrototype.w = loadWebAssembly;
  function loadWebAssemblyModule(chunkPath, edgeModule) {
    return BACKEND.loadWebAssemblyModule(1, this.m.id, chunkPath, edgeModule);
  }
  contextPrototype.u = loadWebAssemblyModule;

  const devContextPrototype = Context.prototype;

  const devModuleCache = Object.create(null);
  devContextPrototype.c = devModuleCache;
  class UpdateApplyError extends Error {
    name = "UpdateApplyError";
    dependencyChain;
    constructor(message, dependencyChain) {
      super(message);
      this.dependencyChain = dependencyChain;
    }
  }

  const runtimeModules = new Set();

  const moduleChunksMap = new Map();

  const chunkModulesMap = new Map();

  const runtimeChunkLists = new Set();

  const chunkListChunksMap = new Map();

  const chunkChunkListsMap = new Map();

  const moduleHotData = new Map();

  const moduleHotState = new Map();

  const queuedInvalidatedModules = new Set();

  function getOrInstantiateRuntimeModule(chunkPath, moduleId) {
    const module = devModuleCache[moduleId];
    if (module) {
      if (module.error) {
        throw module.error;
      }
      return module;
    }

    return instantiateModule(moduleId, SourceType.Runtime, chunkPath);
  }

  const getOrInstantiateModuleFromParent = (id, sourceModule) => {
    if (!sourceModule.hot.active) {
      console.warn(
        `Unexpected import of module ${id} from module ${sourceModule.id}, which was deleted by an HMR update`,
      );
    }
    const module = devModuleCache[id];
    if (sourceModule.children.indexOf(id) === -1) {
      sourceModule.children.push(id);
    }
    if (module) {
      if (module.error) {
        throw module.error;
      }
      if (module.parents.indexOf(sourceModule.id) === -1) {
        module.parents.push(sourceModule.id);
      }
      return module;
    }
    return instantiateModule(id, SourceType.Parent, sourceModule.id);
  };
  function DevContext(module, exports, refresh) {
    Context.call(this, module, exports);
    this.k = refresh;
  }
  DevContext.prototype = Context.prototype;
  function instantiateModule(moduleId, sourceType, sourceData) {
    let id = moduleId;
    const moduleFactory = moduleFactories.get(id);
    if (typeof moduleFactory !== "function") {
      throw new Error(
        factoryNotAvailableMessage(id, sourceType, sourceData) +
          " It might have been deleted in an HMR update.",
      );
    }
    const hotData = moduleHotData.get(id);
    const { hot, hotState } = createModuleHot(id, hotData);
    let parents;
    switch (sourceType) {
      case SourceType.Runtime:
        runtimeModules.add(id);
        parents = [];
        break;
      case SourceType.Parent:
        parents = [sourceData];
        break;
      case SourceType.Update:
        parents = sourceData || [];
        break;
      default:
        invariant(
          sourceType,
          (sourceType) => `Unknown source type: ${sourceType}`,
        );
    }
    const module = createModuleObject(id);
    const exports = module.exports;
    module.parents = parents;
    module.children = [];
    module.hot = hot;
    devModuleCache[id] = module;
    moduleHotState.set(module, hotState);

    try {
      runModuleExecutionHooks(module, (refresh) => {
        const context = new DevContext(module, exports, refresh);
        moduleFactory(context, module, exports);
      });
    } catch (error) {
      module.error = error;
      throw error;
    }
    if (module.namespaceObject && module.exports !== module.namespaceObject) {
      interopEsm(module.exports, module.namespaceObject);
    }
    return module;
  }
  const DUMMY_REFRESH_CONTEXT = {
    register: (_type, _id) => {},
    signature: () => (_type) => {},
    registerExports: (_module, _helpers) => {},
  };

  function runModuleExecutionHooks(module, executeModule) {
    if (typeof globalThis.$RefreshInterceptModuleExecution$ === "function") {
      const cleanupReactRefreshIntercept =
        globalThis.$RefreshInterceptModuleExecution$(module.id);
      try {
        executeModule({
          register: globalThis.$RefreshReg$,
          signature: globalThis.$RefreshSig$,
          registerExports: registerExportsAndSetupBoundaryForReactRefresh,
        });
      } finally {
        cleanupReactRefreshIntercept();
      }
    } else {
      executeModule(DUMMY_REFRESH_CONTEXT);
    }
  }

  function registerExportsAndSetupBoundaryForReactRefresh(module, helpers) {
    const currentExports = module.exports;
    const prevExports = module.hot.data.prevExports ?? null;
    helpers.registerExportsForReactRefresh(currentExports, module.id);

    if (helpers.isReactRefreshBoundary(currentExports)) {
      module.hot.dispose((data) => {
        data.prevExports = currentExports;
      });

      module.hot.accept();

      if (prevExports !== null) {
        if (
          helpers.shouldInvalidateReactRefreshBoundary(
            helpers.getRefreshBoundarySignature(prevExports),
            helpers.getRefreshBoundarySignature(currentExports),
          )
        ) {
          module.hot.invalidate();
        } else {
          helpers.scheduleUpdate();
        }
      }
    } else {
      const isNoLongerABoundary = prevExports !== null;
      if (isNoLongerABoundary) {
        module.hot.invalidate();
      }
    }
  }
  function formatDependencyChain(dependencyChain) {
    return `Dependency chain: ${dependencyChain.join(" -> ")}`;
  }
  function computeOutdatedModules(added, modified) {
    const newModuleFactories = new Map();
    for (const [moduleId, entry] of added) {
      if (entry != null) {
        newModuleFactories.set(moduleId, _eval(entry));
      }
    }
    const outdatedModules = computedInvalidatedModules(modified.keys());
    for (const [moduleId, entry] of modified) {
      newModuleFactories.set(moduleId, _eval(entry));
    }
    return {
      outdatedModules,
      newModuleFactories,
    };
  }
  function computedInvalidatedModules(invalidated) {
    const outdatedModules = new Set();
    for (const moduleId of invalidated) {
      const effect = getAffectedModuleEffects(moduleId);
      switch (effect.type) {
        case "unaccepted":
          throw new UpdateApplyError(
            `cannot apply update: unaccepted module. ${formatDependencyChain(effect.dependencyChain)}.`,
            effect.dependencyChain,
          );
        case "self-declined":
          throw new UpdateApplyError(
            `cannot apply update: self-declined module. ${formatDependencyChain(effect.dependencyChain)}.`,
            effect.dependencyChain,
          );
        case "accepted":
          for (const outdatedModuleId of effect.outdatedModules) {
            outdatedModules.add(outdatedModuleId);
          }
          break;

        default:
          invariant(effect, (effect) => `Unknown effect type: ${effect?.type}`);
      }
    }
    return outdatedModules;
  }
  function computeOutdatedSelfAcceptedModules(outdatedModules) {
    const outdatedSelfAcceptedModules = [];
    for (const moduleId of outdatedModules) {
      const module = devModuleCache[moduleId];
      const hotState = moduleHotState.get(module);
      if (module && hotState.selfAccepted && !hotState.selfInvalidated) {
        outdatedSelfAcceptedModules.push({
          moduleId,
          errorHandler: hotState.selfAccepted,
        });
      }
    }
    return outdatedSelfAcceptedModules;
  }

  function updateChunksPhase(chunksAddedModules, chunksDeletedModules) {
    for (const [chunkPath, addedModuleIds] of chunksAddedModules) {
      for (const moduleId of addedModuleIds) {
        addModuleToChunk(moduleId, chunkPath);
      }
    }
    const disposedModules = new Set();
    for (const [chunkPath, addedModuleIds] of chunksDeletedModules) {
      for (const moduleId of addedModuleIds) {
        if (removeModuleFromChunk(moduleId, chunkPath)) {
          disposedModules.add(moduleId);
        }
      }
    }
    return {
      disposedModules,
    };
  }
  function disposePhase(outdatedModules, disposedModules) {
    for (const moduleId of outdatedModules) {
      disposeModule(moduleId, "replace");
    }
    for (const moduleId of disposedModules) {
      disposeModule(moduleId, "clear");
    }

    const outdatedModuleParents = new Map();
    for (const moduleId of outdatedModules) {
      const oldModule = devModuleCache[moduleId];
      outdatedModuleParents.set(moduleId, oldModule?.parents);
      delete devModuleCache[moduleId];
    }

    return {
      outdatedModuleParents,
    };
  }

  function disposeModule(moduleId, mode) {
    const module = devModuleCache[moduleId];
    if (!module) {
      return;
    }
    const hotState = moduleHotState.get(module);
    const data = {};

    for (const disposeHandler of hotState.disposeHandlers) {
      disposeHandler(data);
    }

    module.hot.active = false;
    moduleHotState.delete(module);

    for (const childId of module.children) {
      const child = devModuleCache[childId];
      if (!child) {
        continue;
      }
      const idx = child.parents.indexOf(module.id);
      if (idx >= 0) {
        child.parents.splice(idx, 1);
      }
    }
    switch (mode) {
      case "clear":
        delete devModuleCache[module.id];
        moduleHotData.delete(module.id);
        break;
      case "replace":
        moduleHotData.set(module.id, data);
        break;
      default:
        invariant(mode, (mode) => `invalid mode: ${mode}`);
    }
  }
  function applyPhase(
    outdatedSelfAcceptedModules,
    newModuleFactories,
    outdatedModuleParents,
    reportError,
  ) {
    for (const [moduleId, factory] of newModuleFactories.entries()) {
      applyModuleFactoryName(factory);
      moduleFactories.set(moduleId, factory);
    }

    for (const { moduleId, errorHandler } of outdatedSelfAcceptedModules) {
      try {
        instantiateModule(
          moduleId,
          SourceType.Update,
          outdatedModuleParents.get(moduleId),
        );
      } catch (err) {
        if (typeof errorHandler === "function") {
          try {
            errorHandler(err, {
              moduleId,
              module: devModuleCache[moduleId],
            });
          } catch (err2) {
            reportError(err2);
            reportError(err);
          }
        } else {
          reportError(err);
        }
      }
    }
  }
  function applyUpdate(update) {
    switch (update.type) {
      case "ChunkListUpdate":
        applyChunkListUpdate(update);
        break;
      default:
        invariant(update, (update) => `Unknown update type: ${update.type}`);
    }
  }
  function applyChunkListUpdate(update) {
    if (update.merged != null) {
      for (const merged of update.merged) {
        switch (merged.type) {
          case "EcmascriptMergedUpdate":
            applyEcmascriptMergedUpdate(merged);
            break;
          default:
            invariant(
              merged,
              (merged) => `Unknown merged type: ${merged.type}`,
            );
        }
      }
    }
    if (update.chunks != null) {
      for (const [chunkPath, chunkUpdate] of Object.entries(update.chunks)) {
        const chunkUrl = getChunkRelativeUrl(chunkPath);
        switch (chunkUpdate.type) {
          case "added":
            BACKEND.loadChunkCached(SourceType.Update, chunkUrl);
            break;
          case "total":
            DEV_BACKEND.reloadChunk?.(chunkUrl);
            break;
          case "deleted":
            DEV_BACKEND.unloadChunk?.(chunkUrl);
            break;
          case "partial":
            invariant(
              chunkUpdate.instruction,
              (instruction) =>
                `Unknown partial instruction: ${JSON.stringify(instruction)}.`,
            );
            break;
          default:
            invariant(
              chunkUpdate,
              (chunkUpdate) => `Unknown chunk update type: ${chunkUpdate.type}`,
            );
        }
      }
    }
  }
  function applyEcmascriptMergedUpdate(update) {
    const { entries = {}, chunks = {} } = update;
    const { added, modified, chunksAdded, chunksDeleted } =
      computeChangedModules(entries, chunks);
    const { outdatedModules, newModuleFactories } = computeOutdatedModules(
      added,
      modified,
    );
    const { disposedModules } = updateChunksPhase(chunksAdded, chunksDeleted);
    applyInternal(outdatedModules, disposedModules, newModuleFactories);
  }
  function applyInvalidatedModules(outdatedModules) {
    if (queuedInvalidatedModules.size > 0) {
      computedInvalidatedModules(queuedInvalidatedModules).forEach(
        (moduleId) => {
          outdatedModules.add(moduleId);
        },
      );
      queuedInvalidatedModules.clear();
    }
    return outdatedModules;
  }
  function applyInternal(outdatedModules, disposedModules, newModuleFactories) {
    outdatedModules = applyInvalidatedModules(outdatedModules);
    const outdatedSelfAcceptedModules =
      computeOutdatedSelfAcceptedModules(outdatedModules);
    const { outdatedModuleParents } = disposePhase(
      outdatedModules,
      disposedModules,
    );

    let error;
    function reportError(err) {
      if (!error) error = err;
    }
    applyPhase(
      outdatedSelfAcceptedModules,
      newModuleFactories,
      outdatedModuleParents,
      reportError,
    );
    if (error) {
      throw error;
    }
    if (queuedInvalidatedModules.size > 0) {
      applyInternal(new Set(), [], new Map());
    }
  }
  function computeChangedModules(entries, updates) {
    const chunksAdded = new Map();
    const chunksDeleted = new Map();
    const added = new Map();
    const modified = new Map();
    const deleted = new Set();
    for (const [chunkPath, mergedChunkUpdate] of Object.entries(updates)) {
      switch (mergedChunkUpdate.type) {
        case "added": {
          const updateAdded = new Set(mergedChunkUpdate.modules);
          for (const moduleId of updateAdded) {
            added.set(moduleId, entries[moduleId]);
          }
          chunksAdded.set(chunkPath, updateAdded);
          break;
        }
        case "deleted": {
          const updateDeleted = new Set(chunkModulesMap.get(chunkPath));
          for (const moduleId of updateDeleted) {
            deleted.add(moduleId);
          }
          chunksDeleted.set(chunkPath, updateDeleted);
          break;
        }
        case "partial": {
          const updateAdded = new Set(mergedChunkUpdate.added);
          const updateDeleted = new Set(mergedChunkUpdate.deleted);
          for (const moduleId of updateAdded) {
            added.set(moduleId, entries[moduleId]);
          }
          for (const moduleId of updateDeleted) {
            deleted.add(moduleId);
          }
          chunksAdded.set(chunkPath, updateAdded);
          chunksDeleted.set(chunkPath, updateDeleted);
          break;
        }
        default:
          invariant(
            mergedChunkUpdate,
            (mergedChunkUpdate) =>
              `Unknown merged chunk update type: ${mergedChunkUpdate.type}`,
          );
      }
    }

    for (const moduleId of added.keys()) {
      if (deleted.has(moduleId)) {
        added.delete(moduleId);
        deleted.delete(moduleId);
      }
    }
    for (const [moduleId, entry] of Object.entries(entries)) {
      if (!added.has(moduleId)) {
        modified.set(moduleId, entry);
      }
    }
    return {
      added,
      deleted,
      modified,
      chunksAdded,
      chunksDeleted,
    };
  }
  function getAffectedModuleEffects(moduleId) {
    const outdatedModules = new Set();
    const queue = [
      {
        moduleId,
        dependencyChain: [],
      },
    ];
    let nextItem;
    while ((nextItem = queue.shift())) {
      const { moduleId, dependencyChain } = nextItem;
      if (moduleId != null) {
        if (outdatedModules.has(moduleId)) {
          continue;
        }
        outdatedModules.add(moduleId);
      }

      if (moduleId === undefined) {
        return {
          type: "unaccepted",
          dependencyChain,
        };
      }
      const module = devModuleCache[moduleId];
      const hotState = moduleHotState.get(module);
      if (!module || (hotState.selfAccepted && !hotState.selfInvalidated)) {
        continue;
      }
      if (hotState.selfDeclined) {
        return {
          type: "self-declined",
          dependencyChain,
          moduleId,
        };
      }
      if (runtimeModules.has(moduleId)) {
        queue.push({
          moduleId: undefined,
          dependencyChain: [...dependencyChain, moduleId],
        });
        continue;
      }
      for (const parentId of module.parents) {
        const parent = devModuleCache[parentId];
        if (!parent) {
          continue;
        }

        queue.push({
          moduleId: parentId,
          dependencyChain: [...dependencyChain, moduleId],
        });
      }
    }
    return {
      type: "accepted",
      moduleId,
      outdatedModules,
    };
  }
  function handleApply(chunkListPath, update) {
    switch (update.type) {
      case "partial": {
        applyUpdate(update.instruction);
        break;
      }
      case "restart": {
        DEV_BACKEND.restart();
        break;
      }
      case "notFound": {
        if (runtimeChunkLists.has(chunkListPath)) {
          DEV_BACKEND.restart();
        } else {
          disposeChunkList(chunkListPath);
        }
        break;
      }
      default:
        throw new Error(`Unknown update type: ${update.type}`);
    }
  }
  function createModuleHot(moduleId, hotData) {
    const hotState = {
      selfAccepted: false,
      selfDeclined: false,
      selfInvalidated: false,
      disposeHandlers: [],
    };
    const hot = {
      active: true,
      data: hotData ?? {},

      accept: (modules, _callback, _errorHandler) => {
        if (modules === undefined) {
          hotState.selfAccepted = true;
        } else if (typeof modules === "function") {
          hotState.selfAccepted = modules;
        } else {
          throw new Error("unsupported `accept` signature");
        }
      },
      decline: (dep) => {
        if (dep === undefined) {
          hotState.selfDeclined = true;
        } else {
          throw new Error("unsupported `decline` signature");
        }
      },
      dispose: (callback) => {
        hotState.disposeHandlers.push(callback);
      },
      addDisposeHandler: (callback) => {
        hotState.disposeHandlers.push(callback);
      },
      removeDisposeHandler: (callback) => {
        const idx = hotState.disposeHandlers.indexOf(callback);
        if (idx >= 0) {
          hotState.disposeHandlers.splice(idx, 1);
        }
      },
      invalidate: () => {
        hotState.selfInvalidated = true;
        queuedInvalidatedModules.add(moduleId);
      },

      status: () => "idle",

      addStatusHandler: (_handler) => {},
      removeStatusHandler: (_handler) => {},

      check: () => Promise.resolve(null),
    };
    return {
      hot,
      hotState,
    };
  }

  function removeModuleFromChunk(moduleId, chunkPath) {
    const moduleChunks = moduleChunksMap.get(moduleId);
    moduleChunks.delete(chunkPath);
    const chunkModules = chunkModulesMap.get(chunkPath);
    chunkModules.delete(moduleId);
    const noRemainingModules = chunkModules.size === 0;
    if (noRemainingModules) {
      chunkModulesMap.delete(chunkPath);
    }
    const noRemainingChunks = moduleChunks.size === 0;
    if (noRemainingChunks) {
      moduleChunksMap.delete(moduleId);
    }
    return noRemainingChunks;
  }

  function disposeChunkList(chunkListPath) {
    const chunkPaths = chunkListChunksMap.get(chunkListPath);
    if (chunkPaths == null) {
      return false;
    }
    chunkListChunksMap.delete(chunkListPath);
    for (const chunkPath of chunkPaths) {
      const chunkChunkLists = chunkChunkListsMap.get(chunkPath);
      chunkChunkLists.delete(chunkListPath);
      if (chunkChunkLists.size === 0) {
        chunkChunkListsMap.delete(chunkPath);
        disposeChunk(chunkPath);
      }
    }

    const chunkListUrl = getChunkRelativeUrl(chunkListPath);
    DEV_BACKEND.unloadChunk?.(chunkListUrl);
    return true;
  }

  function disposeChunk(chunkPath) {
    const chunkUrl = getChunkRelativeUrl(chunkPath);

    DEV_BACKEND.unloadChunk?.(chunkUrl);
    const chunkModules = chunkModulesMap.get(chunkPath);
    if (chunkModules == null) {
      return false;
    }
    chunkModules.delete(chunkPath);
    for (const moduleId of chunkModules) {
      const moduleChunks = moduleChunksMap.get(moduleId);
      moduleChunks.delete(chunkPath);
      const noRemainingChunks = moduleChunks.size === 0;
      if (noRemainingChunks) {
        moduleChunksMap.delete(moduleId);
        disposeModule(moduleId, "clear");
        availableModules.delete(moduleId);
      }
    }
    return true;
  }

  function addModuleToChunk(moduleId, chunkPath) {
    let moduleChunks = moduleChunksMap.get(moduleId);
    if (!moduleChunks) {
      moduleChunks = new Set([chunkPath]);
      moduleChunksMap.set(moduleId, moduleChunks);
    } else {
      moduleChunks.add(chunkPath);
    }
    let chunkModules = chunkModulesMap.get(chunkPath);
    if (!chunkModules) {
      chunkModules = new Set([moduleId]);
      chunkModulesMap.set(chunkPath, chunkModules);
    } else {
      chunkModules.add(moduleId);
    }
  }

  function markChunkListAsRuntime(chunkListPath) {
    runtimeChunkLists.add(chunkListPath);
  }
  function registerChunk(registration) {
    const chunkPath = getPathFromScript(registration[0]);
    let runtimeParams;

    if (registration.length === 2) {
      runtimeParams = registration[1];
    } else {
      runtimeParams = undefined;
      installCompressedModuleFactories(registration, 1, moduleFactories, (id) =>
        addModuleToChunk(id, chunkPath),
      );
    }
    return BACKEND.registerChunk(chunkPath, runtimeParams);
  }

  function registerChunkList(chunkList) {
    const chunkListScript = chunkList.script;
    const chunkListPath = getPathFromScript(chunkListScript);

    BACKEND.registerChunk(chunkListPath);
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS.push([
      chunkListPath,
      handleApply.bind(null, chunkListPath),
    ]);

    const chunkPaths = new Set(chunkList.chunks.map(getChunkPath));
    chunkListChunksMap.set(chunkListPath, chunkPaths);
    for (const chunkPath of chunkPaths) {
      let chunkChunkLists = chunkChunkListsMap.get(chunkPath);
      if (!chunkChunkLists) {
        chunkChunkLists = new Set([chunkListPath]);
        chunkChunkListsMap.set(chunkPath, chunkChunkLists);
      } else {
        chunkChunkLists.add(chunkListPath);
      }
    }
    if (chunkList.source === "entry") {
      markChunkListAsRuntime(chunkListPath);
    }
  }
  globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS ??= [];

  async function externalImport(id) {
    let raw;
    try {
      raw = await import(id);
    } catch (err) {
      throw new Error(`Failed to load external module ${id}: ${err}`);
    }
    if (raw && raw.__esModule && raw.default && "default" in raw.default) {
      return interopEsm(raw.default, createNS(raw), true);
    }
    return raw;
  }
  contextPrototype.y = externalImport;
  function externalRequire(id, thunk, esm = false) {
    let raw;
    try {
      raw = thunk();
    } catch (err) {
      throw new Error(`Failed to load external module ${id}: ${err}`);
    }
    if (!esm || raw.__esModule) {
      return raw;
    }
    return interopEsm(raw, createNS(raw), true);
  }
  externalRequire.resolve = (id, options) => {
    return require.resolve(id, options);
  };
  contextPrototype.x = externalRequire;

  let BACKEND;
  (() => {
    BACKEND = {
      registerChunk(chunkPath, params) {
        registeredChunks.add(chunkPath);
        instantiateDependentChunks(chunkPath);
        if (params == null) {
          return;
        }
        if (params.otherChunks.length === 0) {
          instantiateRuntimeModules(params.runtimeModuleIds, chunkPath);
        } else {
          registerChunkRunner(
            chunkPath,
            params.otherChunks.filter((chunk) => isJs(getChunkPath(chunk))),
            params.runtimeModuleIds,
          );
        }
      },
      loadChunkCached(_sourceType, _chunkUrl) {
        throw new Error("chunk loading is not supported");
      },
      async loadWebAssembly(
        _sourceType,
        _sourceData,
        chunkPath,
        edgeModule,
        imports,
      ) {
        const module = await loadEdgeWasm(chunkPath, edgeModule);
        return await WebAssembly.instantiate(module, imports);
      },
      async loadWebAssemblyModule(
        _sourceType,
        _sourceData,
        chunkPath,
        edgeModule,
      ) {
        return loadEdgeWasm(chunkPath, edgeModule);
      },
    };
    const registeredChunks = new Set();
    const runners = new Map();

    function registerChunkRunner(chunkPath, otherChunks, runtimeModuleIds) {
      const requiredChunks = new Set();
      const runner = {
        runtimeModuleIds,
        chunkPath,
        requiredChunks,
      };
      for (const otherChunkData of otherChunks) {
        const otherChunkPath = getChunkPath(otherChunkData);
        if (registeredChunks.has(otherChunkPath)) {
          continue;
        }
        requiredChunks.add(otherChunkPath);
        let runnersForChunk = runners.get(otherChunkPath);
        if (runnersForChunk == null) {
          runnersForChunk = new Set();
          runners.set(otherChunkPath, runnersForChunk);
        }
        runnersForChunk.add(runner);
      }

      if (runner.requiredChunks.size === 0) {
        instantiateRuntimeModules(runner.runtimeModuleIds, runner.chunkPath);
      }
    }

    function instantiateDependentChunks(chunkPath) {
      const runnersForChunk = runners.get(chunkPath);
      if (runnersForChunk != null) {
        for (const runner of runnersForChunk) {
          runner.requiredChunks.delete(chunkPath);
          if (runner.requiredChunks.size === 0) {
            instantiateRuntimeModules(
              runner.runtimeModuleIds,
              runner.chunkPath,
            );
          }
        }
        runners.delete(chunkPath);
      }
    }

    function instantiateRuntimeModules(runtimeModuleIds, chunkPath) {
      for (const moduleId of runtimeModuleIds) {
        getOrInstantiateRuntimeModule(chunkPath, moduleId);
      }
    }
    async function loadEdgeWasm(chunkPath, edgeModule) {
      let module;
      try {
        module = edgeModule();
      } catch (_e) {}
      if (!module) {
        throw new Error(
          `dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${chunkPath}'`,
        );
      }
      return module;
    }
  })();

  let DEV_BACKEND;
  (() => {
    DEV_BACKEND = {
      restart: () => {
        throw new Error("restart is not supported");
      },
    };
  })();
  function _eval(_) {
    throw new Error("HMR evaluation is not implemented on this backend");
  }
  const chunksToRegister = globalThis.TURBOPACK;
  globalThis.TURBOPACK = { push: registerChunk };
  chunksToRegister.forEach(registerChunk);
  const chunkListsToRegister = globalThis.TURBOPACK_CHUNK_LISTS || [];
  globalThis.TURBOPACK_CHUNK_LISTS = { push: registerChunkList };
  chunkListsToRegister.forEach(registerChunkList);
})();
