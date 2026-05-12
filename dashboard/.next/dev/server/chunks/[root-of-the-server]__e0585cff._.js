module.exports = [
  "[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      "next/dist/compiled/next-server/app-route-turbo.runtime.dev.js",
      () =>
        require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"),
    );

    module.exports = mod;
  },
  "[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      "next/dist/compiled/next-server/app-page-turbo.runtime.dev.js",
      () =>
        require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"),
    );

    module.exports = mod;
  },
  "[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      "next/dist/server/app-render/work-unit-async-storage.external.js",
      () =>
        require("next/dist/server/app-render/work-unit-async-storage.external.js"),
    );

    module.exports = mod;
  },
  "[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      "next/dist/server/app-render/work-async-storage.external.js",
      () =>
        require("next/dist/server/app-render/work-async-storage.external.js"),
    );

    module.exports = mod;
  },
  "[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      "next/dist/shared/lib/no-fallback-error.external.js",
      () => require("next/dist/shared/lib/no-fallback-error.external.js"),
    );

    module.exports = mod;
  },
  "[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x(
      "next/dist/server/app-render/after-task-async-storage.external.js",
      () =>
        require("next/dist/server/app-render/after-task-async-storage.external.js"),
    );

    module.exports = mod;
  },
  "[externals]/mongodb [external] (mongodb, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x("mongodb", () => require("mongodb"));

    module.exports = mod;
  },
  "[project]/src/lib/mongodb.ts [app-route] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "closeMongoClient",
      () => closeMongoClient,
      "default",
      () => __TURBOPACK__default__export__,
      "getDb",
      () => getDb,
      "getMongoClient",
      () => getMongoClient,
    ]);
    var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ =
      __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI || "";
    const defaultDbFromEnv = process.env.MONGODB_DB || process.env.MONGO_DB;
    if (!uri) {
      console.warn(
        "MONGODB_URI is not set. MongoDB operations will fail until it's provided.",
      );
    }
    let client = global._mongoClient;
    let clientPromise = global._mongoClientPromise;
    function parseDbNameFromUri(connectionString) {
      if (!connectionString) return undefined;
      const withoutQuery = connectionString.split("?")[0];
      const lastSlash = withoutQuery.lastIndexOf("/");
      if (lastSlash === -1) return undefined;
      const db = withoutQuery.substring(lastSlash + 1);
      return db || undefined;
    }
    function ensureClientInitialized() {
      if (!client) {
        if (!uri) {
          return Promise.reject(new Error("MONGODB_URI is not defined."));
        }
        client =
          new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__[
            "MongoClient"
          ](uri);
        clientPromise = client.connect();
        try {
          global._mongoClient = client;
          global._mongoClientPromise = clientPromise;
        } catch (e) {}
      }
      return clientPromise;
    }
    async function getMongoClient() {
      return ensureClientInitialized();
    }
    async function getDb(dbName) {
      const conn = await ensureClientInitialized();
      const dbFromUri = parseDbNameFromUri(uri);
      const name = dbName || defaultDbFromEnv || dbFromUri || "admin";
      return conn.db(name);
    }
    async function closeMongoClient() {
      if (!client) return;
      try {
        await client.close();
      } finally {
        client = undefined;
        clientPromise = undefined;
        try {
          global._mongoClient = undefined;
          global._mongoClientPromise = undefined;
        } catch (e) {}
      }
    }
    const __TURBOPACK__default__export__ = getDb;
  },
  "[project]/src/app/api/tasks/route.ts [app-route] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["GET", () => GET, "POST", () => POST]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/node_modules/next/server.js [app-route] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/src/lib/mongodb.ts [app-route] (ecmascript)",
      );
    async function GET(req) {
      try {
        const db = await (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "getDb"
        ])();
        const userId = req.nextUrl.searchParams.get("userId");
        const query = userId
          ? {
              assigneeId: userId,
            }
          : {};
        const tasks = await db
          .collection("tasks")
          .find(query)
          .sort({
            createdAt: -1,
          })
          .toArray();
        const mappedTasks = tasks.map((t) => ({
          ...t,
          id: t._id.toString(),
        }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(mappedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "Failed to fetch tasks",
          },
          {
            status: 500,
          },
        );
      }
    }
    async function POST(req) {
      try {
        const body = await req.json();
        const db = await (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "getDb"
        ])();
        if (!body.title) {
          return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
            "NextResponse"
          ].json(
            {
              error: "Title is required",
            },
            {
              status: 400,
            },
          );
        }
        const newTask = {
          title: body.title,
          description: body.description || "",
          status: body.status || "not-started",
          priority: body.priority || "medium",
          projectId: body.projectId || null,
          projectTitle: body.projectTitle || null,
          assigneeId: body.assigneeId || null,
          assigneeName: body.assigneeName || null,
          assigneeAvatar: body.assigneeAvatar || null,
          dueDate: body.dueDate || null,
          tags: body.tags || [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const result = await db.collection("tasks").insertOne(newTask);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            ...newTask,
            id: result.insertedId.toString(),
            _id: result.insertedId,
          },
          {
            status: 201,
          },
        );
      } catch (error) {
        console.error("Failed to create task", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "Failed to create task",
          },
          {
            status: 500,
          },
        );
      }
    }
  },
];


