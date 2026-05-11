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
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/mongodb.ts [app-route] (ecmascript)",
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
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/api/whatsapp-templates/[id]/route.ts [app-route] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["DELETE", () => DELETE, "PATCH", () => PATCH]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/server.js [app-route] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/mongodb.ts [app-route] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ =
      __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
    const COLLECTION = "whatsapp_templates";
    function toObjectId(id) {
      try {
        return new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__[
          "ObjectId"
        ](id);
      } catch {
        return null;
      }
    }
    async function PATCH(req, { params }) {
      try {
        const { id } = await params;
        const oid = toObjectId(id);
        if (!oid)
          return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
            "NextResponse"
          ].json(
            {
              error: "Invalid id.",
            },
            {
              status: 400,
            },
          );
        const body = await req.json();
        const db = await (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "default"
        ])();
        const allowedFields = [
          "name",
          "category",
          "language",
          "headerType",
          "headerText",
          "headerMediaHandle",
          "headerMediaName",
          "body",
          "footer",
          "buttons",
          "variables",
          "exampleValues",
          "notes",
          "status",
          "metaTemplateId",
          "submittedAt",
          "approvedAt",
          "rejectedReason",
        ];
        const update = {
          updatedAt: new Date(),
        };
        for (const field of allowedFields) {
          if (field in body) update[field] = body[field];
        }
        const result = await db.collection(COLLECTION).findOneAndUpdate(
          {
            _id: oid,
          },
          {
            $set: update,
          },
          {
            returnDocument: "after",
          },
        );
        if (!result) {
          return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
            "NextResponse"
          ].json(
            {
              error: "Template not found.",
            },
            {
              status: 404,
            },
          );
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json({
          ...result,
          _id: result._id.toString(),
        });
      } catch (err) {
        console.error("[whatsapp-templates PATCH]", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "Failed to update template.",
          },
          {
            status: 500,
          },
        );
      }
    }
    async function DELETE(_req, { params }) {
      try {
        const { id } = await params;
        const oid = toObjectId(id);
        if (!oid)
          return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
            "NextResponse"
          ].json(
            {
              error: "Invalid id.",
            },
            {
              status: 400,
            },
          );
        const db = await (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "default"
        ])();
        const result = await db.collection(COLLECTION).deleteOne({
          _id: oid,
        });
        if (result.deletedCount === 0) {
          return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
            "NextResponse"
          ].json(
            {
              error: "Template not found.",
            },
            {
              status: 404,
            },
          );
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json({
          success: true,
        });
      } catch (err) {
        console.error("[whatsapp-templates DELETE]", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "Failed to delete template.",
          },
          {
            status: 500,
          },
        );
      }
    }
  },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4966acf2._.js.map
