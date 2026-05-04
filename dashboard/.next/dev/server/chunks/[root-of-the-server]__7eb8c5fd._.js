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
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/api/campaigns/route.ts [app-route] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["GET", () => GET, "POST", () => POST]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/server.js [app-route] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/mongodb.ts [app-route] (ecmascript)",
      );
    async function GET(request) {
      try {
        const db = await (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "default"
        ])();
        const campaigns = await db
          .collection("campaigns")
          .find({})
          .sort({
            createdAt: -1,
          })
          .toArray();

        const messages = await db
          .collection("whatsapp_messages")
          .find({})
          .toArray();

        const insights = campaigns.reduce(
          (acc, campaign) => ({
            totalInitiated: acc.totalInitiated + campaign.totalContacts,
            totalSent: acc.totalSent + campaign.sent,
            totalDelivered: acc.totalDelivered + campaign.delivered,
            totalRead: acc.totalRead + campaign.read,
            totalReplied: acc.totalReplied + campaign.replied,
            totalFailed: acc.totalFailed + campaign.failed,
          }),
          {
            totalInitiated: 0,
            totalSent: 0,
            totalDelivered: 0,
            totalRead: 0,
            totalReplied: 0,
            totalFailed: 0,
          },
        );

        const deliveredCount = messages.filter(
          (m) => m.deliveryStatus === "delivered" || m.status === "delivered",
        ).length;
        const failedCount = messages.filter(
          (m) => m.deliveryStatus === "failed" || m.status === "failed",
        ).length;
        const sentCount = messages.filter(
          (m) => m.messageType === "sent",
        ).length;
        const receivedCount = messages.filter(
          (m) => m.messageType === "received",
        ).length;

        const pendingCount = messages.filter(
          (m) =>
            m.messageType === "sent" &&
            m.deliveryStatus !== "delivered" &&
            m.deliveryStatus !== "failed",
        ).length;

        const byCategory = {
          marketing: 0,
          "marketing-lite": 0,
          utility: 0,
          authentication: 0,
          "authentication-international": 0,
          "ai-provider": 0,
          service: 0,
          "customer-service": 0,
          "entry-point": 0,
        };
        messages.forEach((msg) => {
          const category =
            msg.category || msg.templateName?.toLowerCase() || "marketing";
          if (category in byCategory) {
            byCategory[category]++;
          }
        });

        const failedMessages = messages.filter(
          (m) => m.deliveryStatus === "failed" || m.status === "failed",
        );

        const failureReasons = {};
        failedMessages.forEach((msg) => {
          const reason = msg.failureReason || msg.error_reason || "Unknown";
          failureReasons[reason] = (failureReasons[reason] || 0) + 1;
        });

        const chargesPerCategory = {
          marketing: 0.25,
          "marketing-lite": 0.15,
          utility: 0.06,
          authentication: 0.001,
          "authentication-international": 0.002,
          "ai-provider": 0.12,
          service: 0.06,
          "customer-service": 0.12,
          "entry-point": 0.001,
        };

        let estimatedCharges = 0;
        const deliveredByCategory = {};
        messages.forEach((msg) => {
          if (
            msg.deliveryStatus === "delivered" ||
            msg.status === "delivered"
          ) {
            const category =
              msg.category || msg.templateName?.toLowerCase() || "marketing";
            deliveredByCategory[category] =
              (deliveredByCategory[category] || 0) + 1;
            estimatedCharges += chargesPerCategory[category] || 0.25;
          }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json({
          success: true,
          campaigns,
          insights: {
            ...insights,

            totalDelivered: deliveredCount,
            totalFailed: failedCount,
            totalSent: sentCount,
            totalReplied: receivedCount,

            byCategory,
            deliveredByCategory,

            deliveryStatus: {
              delivered: deliveredCount,
              failed: failedCount,
              pending: pendingCount,
              sent: sentCount,
            },

            failureReasons,

            estimatedCharges: parseFloat(estimatedCharges.toFixed(2)),

            metrics: {
              deliveryRate:
                sentCount > 0
                  ? ((deliveredCount / sentCount) * 100).toFixed(1)
                  : "0",
              failureRate:
                sentCount > 0
                  ? ((failedCount / sentCount) * 100).toFixed(1)
                  : "0",
              pendingRate:
                sentCount > 0
                  ? ((pendingCount / sentCount) * 100).toFixed(1)
                  : "0",
            },
          },
        });
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            success: false,
            error: error.message,
          },
          {
            status: 500,
          },
        );
      }
    }
    async function POST(request) {
      try {
        const db = await (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "default"
        ])();
        const body = await request.json();
        const campaign = {
          name: body.name,
          description: body.description,
          templateName: body.templateName,
          status: "active",
          totalContacts: body.totalContacts,
          sent: body.sent || 0,
          delivered: body.delivered || 0,
          read: body.read || 0,
          replied: body.replied || 0,
          failed: body.failed || 0,
          startDate: new Date(),
          createdBy: body.createdBy || "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const result = await db.collection("campaigns").insertOne(campaign);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json({
          success: true,
          campaign: {
            ...campaign,
            _id: result.insertedId,
          },
        });
      } catch (error) {
        console.error("Failed to create campaign:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            success: false,
            error: error.message,
          },
          {
            status: 500,
          },
        );
      }
    }
  },
];
