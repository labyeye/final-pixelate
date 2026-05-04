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
  "[externals]/crypto [external] (crypto, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x("crypto", () => require("crypto"));

    module.exports = mod;
  },
  "[externals]/buffer [external] (buffer, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x("buffer", () => require("buffer"));

    module.exports = mod;
  },
  "[externals]/stream [external] (stream, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x("stream", () => require("stream"));

    module.exports = mod;
  },
  "[externals]/util [external] (util, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x("util", () => require("util"));

    module.exports = mod;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/auth.ts [app-route] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "default",
      () => __TURBOPACK__default__export__,
      "hashPassword",
      () => hashPassword,
      "signToken",
      () => signToken,
      "verifyPassword",
      () => verifyPassword,
      "verifyToken",
      () => verifyToken,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/bcryptjs/index.js [app-route] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)",
      );
    const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
    function hashPassword(password) {
      return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
        "default"
      ].hashSync(password, 10);
    }
    function verifyPassword(password, hash) {
      return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
        "default"
      ].compareSync(password, hash);
    }
    function signToken(payload, opts = {}) {
      return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
        "default"
      ].sign(payload, JWT_SECRET, {
        expiresIn: "7d",
        ...opts,
      });
    }
    function verifyToken(token) {
      try {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "default"
        ].verify(token, JWT_SECRET);
      } catch (e) {
        return null;
      }
    }
    const __TURBOPACK__default__export__ = {
      hashPassword,
      verifyPassword,
      signToken,
      verifyToken,
    };
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/services.ts [app-route] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "createClient",
      () => createClient,
      "createInventory",
      () => createInventory,
      "createInvoice",
      () => createInvoice,
      "createNdaApproval",
      () => createNdaApproval,
      "createOnboarding",
      () => createOnboarding,
      "createQuotation",
      () => createQuotation,
      "createService",
      () => createService,
      "createTeamMember",
      () => createTeamMember,
      "createUser",
      () => createUser,
      "default",
      () => __TURBOPACK__default__export__,
      "deleteById",
      () => deleteById,
      "deleteInventory",
      () => deleteInventory,
      "findById",
      () => findById,
      "getClients",
      () => getClients,
      "getCollection",
      () => getCollection,
      "getFinancialYear",
      () => getFinancialYear,
      "getInventory",
      () => getInventory,
      "getInvoices",
      () => getInvoices,
      "getNdaApprovals",
      () => getNdaApprovals,
      "getOnboardings",
      () => getOnboardings,
      "getQuotations",
      () => getQuotations,
      "getServices",
      () => getServices,
      "getTeamMembers",
      () => getTeamMembers,
      "getUsers",
      () => getUsers,
      "permanentlyDestroyTrashItem",
      () => permanentlyDestroyTrashItem,
      "renumberInvoices",
      () => renumberInvoices,
      "restoreFromTrash",
      () => restoreFromTrash,
      "softDeleteById",
      () => softDeleteById,
      "updateById",
      () => updateById,
      "updateInventory",
      () => updateInventory,
    ]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/mongodb.ts [app-route] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/auth.ts [app-route] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__ =
      __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs)");
    function getFinancialYear(date = new Date()) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      if (month >= 4) {
        return `${year}-${year + 1}`;
      } else {
        return `${year - 1}-${year}`;
      }
    }
    async function getCollection(name) {
      const db = await (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
        "getDb"
      ])();
      return db.collection(name);
    }
    async function getClients() {
      const col = await getCollection("clients");
      return col.find().toArray();
    }
    async function createClient(client) {
      const col = await getCollection("clients");
      const res = await col.insertOne({
        ...client,
        createdAt: new Date(),
      });
      return {
        ...client,
        _id: res.insertedId,
      };
    }
    async function getServices() {
      const col = await getCollection("services");
      return col.find().toArray();
    }
    async function createService(service) {
      const col = await getCollection("services");
      const res = await col.insertOne({
        ...service,
        createdAt: new Date(),
      });
      return {
        ...service,
        _id: res.insertedId,
      };
    }
    async function getInventory() {
      const col = await getCollection("inventory");
      return col.find().toArray();
    }
    async function createInventory(item) {
      const col = await getCollection("inventory");
      const toInsert = {
        itemName: item.itemName || "",
        category: item.category || "",
        quantityAvailable: Number(item.quantityAvailable || 0),
        unit: item.unit || "pcs",
        price: Number(item.price || 0),
        sellingPrice: Number(item.price || 0),
        vendorName: item.vendorName || "",
        vendorContact: item.vendorContact || "",
        vendorGstNumber: item.vendorGstNumber || null,
        gstPercentage:
          item.gstPercentage != null ? Number(item.gstPercentage) : null,
        gstAmount: item.gstAmount != null ? Number(item.gstAmount) : 0,
        status:
          Number(item.quantityAvailable || 0) > 0 ? "Available" : "Booked",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const res = await col.insertOne(toInsert);
      return {
        ...toInsert,
        _id: res.insertedId,
      };
    }
    async function updateInventory(id, update) {
      const col = await getCollection("inventory");
      const updateDoc = {
        ...update,
        updatedAt: new Date(),
      };
      if (updateDoc.price != null)
        updateDoc.sellingPrice = Number(updateDoc.price);
      const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
      if (hex24) {
        await col.updateOne(
          {
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__[
              "ObjectId"
            ](id),
          },
          {
            $set: updateDoc,
          },
        );
        return await col.findOne({
          _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__[
            "ObjectId"
          ](id),
        });
      }
      await col.updateOne(
        {
          id,
        },
        {
          $set: updateDoc,
        },
      );
      return await col.findOne({
        id,
      });
    }
    async function deleteInventory(id) {
      return softDeleteById("inventory", id);
    }
    async function softDeleteById(collectionName, id, collectionLabel) {
      const normalizedId = String(id ?? "").trim();
      if (
        !normalizedId ||
        normalizedId === "undefined" ||
        normalizedId === "null"
      ) {
        return false;
      }
      const col = await getCollection(collectionName);
      const trash = await getCollection("_trash");
      const hex24 = /^[a-fA-F0-9]{24}$/.test(normalizedId);
      let doc = null;
      let filter = null;
      if (hex24) {
        try {
          doc = await col.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__[
              "ObjectId"
            ](normalizedId),
          });
          if (doc)
            filter = {
              _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__[
                "ObjectId"
              ](normalizedId),
            };
        } catch (_) {}
      }
      if (!doc) {
        doc = await col.findOne({
          _id: normalizedId,
        });
        if (doc)
          filter = {
            _id: normalizedId,
          };
      }
      if (!doc) {
        doc = await col.findOne({
          id: normalizedId,
        });
        if (doc)
          filter = {
            id: normalizedId,
          };
      }
      if (!doc && collectionName === "invoices") {
        doc = await col.findOne({
          invoiceNo: normalizedId,
        });
        if (doc)
          filter = {
            invoiceNo: normalizedId,
          };
      }
      if (!doc || !filter) return false;
      if (collectionName === "invoices") {
        if (Array.isArray(doc.inventoryItems) && doc.inventoryItems.length) {
          try {
            const items = doc.inventoryItems.map((r) => ({
              inventoryId: r.inventoryId,
              quantity: Number(r.quantity || 0),
            }));
            await adjustInventoryQuantities(items, "increment");
          } catch (e) {
            console.error("Failed to restore inventory on soft-delete", e);
          }
        }
      }
      const LABELS = {
        invoices: "Invoice",
        leads: "Lead",
        clients: "Client",
        quotations: "Quotation",
        projects: "Project",
        tasks: "Task",
        expenses: "Expense",
        emi: "EMI",
        inventory: "Inventory",
        services: "Service",
        blogs: "Blog",
        reels: "Reel",
        photoGalleries: "Photo Gallery",
        workGallery: "Work Gallery",
        enquiries: "Enquiry",
        supportTickets: "Support Ticket",
        journey_events: "Journey Event",
        teamMembers: "Team Member",
        careers: "Career",
      };
      await trash.insertOne({
        _originalId: String(doc._id),
        originalCollection: collectionName,
        collectionLabel:
          collectionLabel ?? LABELS[collectionName] ?? collectionName,
        document: doc,
        deletedAt: new Date(),
      });
      const res = await col.deleteOne(filter);
      return res.deletedCount === 1;
    }
    async function restoreFromTrash(trashId) {
      const normalizedId = String(trashId ?? "").trim();
      if (
        !normalizedId ||
        normalizedId === "undefined" ||
        normalizedId === "null"
      ) {
        return false;
      }
      const trash = await getCollection("_trash");
      let trashDoc = null;
      if (/^[a-fA-F0-9]{24}$/.test(normalizedId)) {
        try {
          trashDoc = await trash.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__[
              "ObjectId"
            ](normalizedId),
          });
        } catch (_) {}
      }
      if (!trashDoc) {
        trashDoc = await trash.findOne({
          _id: normalizedId,
        });
      }
      if (!trashDoc) return false;
      const originalCol = await getCollection(trashDoc.originalCollection);
      const doc = {
        ...trashDoc.document,
      };
      if (
        trashDoc._originalId &&
        /^[a-fA-F0-9]{24}$/.test(trashDoc._originalId)
      ) {
        doc._id =
          new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__[
            "ObjectId"
          ](trashDoc._originalId);
      }
      if (trashDoc.originalCollection === "invoices") {
        if (Array.isArray(doc.inventoryItems) && doc.inventoryItems.length) {
          try {
            const items = doc.inventoryItems.map((r) => ({
              inventoryId: r.inventoryId,
              quantity: Number(r.quantity || 0),
            }));
            await adjustInventoryQuantities(items, "decrement");
          } catch (e) {
            console.error("Failed to re-decrement inventory on restore", e);
          }
        }
      }
      try {
        await originalCol.insertOne(doc);
      } catch (e) {
        if (e?.code === 11000) {
          delete doc._id;
          await originalCol.insertOne(doc);
        } else {
          throw e;
        }
      }
      await trash.deleteOne({
        _id: trashDoc._id,
      });
      return true;
    }
    async function permanentlyDestroyTrashItem(trashId) {
      const normalizedId = String(trashId ?? "").trim();
      if (
        !normalizedId ||
        normalizedId === "undefined" ||
        normalizedId === "null"
      ) {
        return false;
      }
      const trash = await getCollection("_trash");
      let res;
      if (/^[a-fA-F0-9]{24}$/.test(normalizedId)) {
        try {
          res = await trash.deleteOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__[
              "ObjectId"
            ](normalizedId),
          });
        } catch (_) {
          res = await trash.deleteOne({
            _id: normalizedId,
          });
        }
      } else {
        res = await trash.deleteOne({
          _id: normalizedId,
        });
      }
      return (res?.deletedCount ?? 0) === 1;
    }
    async function adjustInventoryQuantities(items, direction) {
      if (!Array.isArray(items) || items.length === 0) return;
      const col = await getCollection("inventory");
      for (const it of items) {
        try {
          const id = it.inventoryId || it._id || it.id;
          const qty = Number(it.quantity || 0);
          if (!id || qty === 0) continue;
          const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
          const filter = hex24
            ? {
                _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__[
                  "ObjectId"
                ](id),
              }
            : {
                id,
              };
          const doc = await col.findOne(filter);
          if (!doc) continue;
          const current = Number(doc.quantityAvailable || 0);
          const next =
            direction === "decrement" ? current - qty : current + qty;
          const status = next > 0 ? "Available" : "Booked";
          await col.updateOne(filter, {
            $set: {
              quantityAvailable: next,
              status,
              updatedAt: new Date(),
            },
          });
        } catch (e) {
          console.error("Error adjusting inventory", e);
        }
      }
    }
    async function getTeamMembers() {
      const col = await getCollection("users");
      return col
        .find({
          jobRole: {
            $exists: true,
          },
        })
        .toArray();
    }
    async function createTeamMember(member) {
      const usersCol = await getCollection("users");
      const toInsert = {
        ...member,
        jobRole: member.role ?? member.jobRole,
        role: member.authRole ?? "staff",
        createdAt: new Date(),
      };
      delete toInsert.role;
      const authRole = member.loginRole ?? member.authRole ?? "staff";
      toInsert.role = authRole;
      if (member.password) {
        toInsert.password = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "hashPassword"
        ])(member.password);
      }
      const res = await usersCol.insertOne(toInsert);
      return {
        ...toInsert,
        _id: res.insertedId,
      };
    }
    async function getUsers() {
      const col = await getCollection("users");
      return col.find().toArray();
    }
    async function createUser(user) {
      const col = await getCollection("users");
      const toInsert = {
        ...user,
      };
      if (toInsert.password) {
        toInsert.password = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "hashPassword"
        ])(toInsert.password);
      }
      const res = await col.insertOne({
        ...toInsert,
        createdAt: new Date(),
      });
      return {
        ...toInsert,
        _id: res.insertedId,
      };
    }
    async function findById(collectionName, id) {
      const col = await getCollection(collectionName);
      if (!id) return null;
      const byRawId = await col.findOne({
        _id: id,
      });
      if (byRawId) return byRawId;
      const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
      if (hex24) {
        try {
          const byObjectId = await col.findOne({
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__[
              "ObjectId"
            ](id),
          });
          if (byObjectId) return byObjectId;
        } catch (e) {}
      }
      if (collectionName === "invoices") {
        const byInvoiceNo = await col.findOne({
          invoiceNo: id,
        });
        if (byInvoiceNo) return byInvoiceNo;
      }
      const byCustomId = await col.findOne({
        id: id,
      });
      return byCustomId;
    }
    async function updateById(collectionName, id, update) {
      const col = await getCollection(collectionName);
      const updateDoc = {
        ...(update || {}),
      };
      if (updateDoc._id) delete updateDoc._id;
      if (updateDoc && updateDoc.password) {
        updateDoc.password = (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "hashPassword"
        ])(updateDoc.password);
      }
      const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
      if (hex24) {
        await col.updateOne(
          {
            _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$29$__[
              "ObjectId"
            ](id),
          },
          {
            $set: updateDoc,
          },
        );
        return findById(collectionName, id);
      }
      if (collectionName === "invoices") {
        const byInvoiceNo = await col.findOne({
          invoiceNo: id,
        });
        if (byInvoiceNo) {
          await col.updateOne(
            {
              _id: byInvoiceNo._id,
            },
            {
              $set: updateDoc,
            },
          );
          return findById(collectionName, String(byInvoiceNo._id));
        }
      }
      await col.updateOne(
        {
          id: id,
        },
        {
          $set: updateDoc,
        },
      );
      return findById(collectionName, id);
    }
    async function deleteById(collectionName, id) {
      return softDeleteById(collectionName, id);
    }
    async function getInvoices() {
      const col = await getCollection("invoices");
      return col.find().toArray();
    }
    async function renumberInvoices(financialYear) {
      const col = await getCollection("invoices");
      const invoices = await col
        .find({})
        .sort({
          createdAt: 1,
        })
        .toArray();
      if (!invoices || !invoices.length)
        return {
          updated: 0,
        };
      let counter = 1;
      for (const inv of invoices) {
        const fy =
          financialYear || getFinancialYear(inv.createdAt || new Date());
        const padded = String(counter).padStart(4, "0");
        const invoiceNo = `KTS/${fy}/${padded}`;
        await col.updateOne(
          {
            _id: inv._id,
          },
          {
            $set: {
              invoiceNo,
            },
          },
        );
        counter++;
      }
      return {
        updated: counter - 1,
      };
    }
    async function createInvoice(invoice) {
      const col = await getCollection("invoices");
      try {
        const fy = getFinancialYear(new Date());
        const regex = new RegExp(`^KTS/${fy}/(\\d+)$`);
        const docs = await col
          .find({
            invoiceNo: {
              $regex: `^KTS/${fy}/`,
            },
          })
          .project({
            invoiceNo: 1,
          })
          .toArray();
        let maxNum = 0;
        for (const d of docs) {
          const s = String(d.invoiceNo || "");
          const m = s.match(regex);
          if (m) {
            const n = parseInt(m[1], 10);
            if (!isNaN(n) && n > maxNum) maxNum = n;
          }
        }
        const nextNum = maxNum + 1;
        const padded = String(nextNum).padStart(4, "0");
        const invoiceNo = `KTS/${fy}/${padded}`;
        const id = `PN-${padded}`;
        const res = await col.insertOne({
          ...invoice,
          id,
          invoiceNo,
          createdAt: new Date(),
        });
        const created = {
          ...invoice,
          id,
          invoiceNo,
          _id: res.insertedId,
        };
        if (
          Array.isArray(invoice.inventoryItems) &&
          invoice.inventoryItems.length
        ) {
          const items = invoice.inventoryItems.map((r) => ({
            inventoryId: r.inventoryId,
            quantity: Number(r.quantity || 0),
          }));
          await adjustInventoryQuantities(items, "decrement");
        }
        return created;
      } catch (e) {
        const res = await col.insertOne({
          ...invoice,
          createdAt: new Date(),
        });
        return {
          ...invoice,
          _id: res.insertedId,
        };
      }
    }
    async function getQuotations() {
      const col = await getCollection("quotations");
      return col.find().toArray();
    }
    async function createQuotation(q) {
      const col = await getCollection("quotations");
      try {
        const last = await col
          .find({})
          .sort({
            createdAt: -1,
          })
          .limit(1)
          .toArray();
        let lastNum = 0;
        if (last && last.length) {
          const lastId = last[0].id || last[0]._id || "";
          const match = String(lastId).match(/pn-(\d+)/i);
          if (match) lastNum = parseInt(match[1], 10);
        }
        const nextNum = lastNum + 1;
        const padded = String(nextNum).padStart(5, "0");
        const id = `PN-${padded}`;
        const res = await col.insertOne({
          ...q,
          id,
          createdAt: new Date(),
        });
        return {
          ...q,
          id,
          _id: res.insertedId,
        };
      } catch (e) {
        const res = await col.insertOne({
          ...q,
          createdAt: new Date(),
        });
        return {
          ...q,
          _id: res.insertedId,
        };
      }
    }
    async function getNdaApprovals() {
      const col = await getCollection("nda_approvals");
      return col.find().toArray();
    }
    async function createNdaApproval(data) {
      const col = await getCollection("nda_approvals");
      const toInsert = {
        ...data,
        createdAt: new Date(),
      };
      const res = await col.insertOne(toInsert);
      return {
        ...toInsert,
        _id: res.insertedId,
      };
    }
    async function getOnboardings() {
      const col = await getCollection("onboardings");
      return col
        .find()
        .sort({
          createdAt: -1,
        })
        .toArray();
    }
    async function createOnboarding(data) {
      const col = await getCollection("onboardings");
      const toInsert = {
        ...data,
        createdAt: new Date(),
      };
      const res = await col.insertOne(toInsert);
      return {
        ...toInsert,
        _id: res.insertedId,
      };
    }
    const __TURBOPACK__default__export__ = {
      getClients,
      createClient,
      getServices,
      createService,
      getInventory,
      createInventory,
      updateInventory,
      deleteInventory,
      getTeamMembers,
      createTeamMember,
      getUsers,
      createUser,
      findById,
      updateById,
      deleteById,
      getNdaApprovals,
      createNdaApproval,
      getOnboardings,
      createOnboarding,
    };
  },
  "[externals]/node:crypto [external] (node:crypto, cjs)",
  (__turbopack_context__, module, exports) => {
    const mod = __turbopack_context__.x("node:crypto", () =>
      require("node:crypto"),
    );

    module.exports = mod;
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/meta-api.ts [app-route] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s([
      "exchangeForLongLivedToken",
      () => exchangeForLongLivedToken,
      "fetchFbPostMetrics",
      () => fetchFbPostMetrics,
      "fetchIgMediaMetrics",
      () => fetchIgMediaMetrics,
      "getFormLeads",
      () => getFormLeads,
      "getLeadAdForms",
      () => getLeadAdForms,
      "getPageDetails",
      () => getPageDetails,
      "getUserPages",
      () => getUserPages,
      "hashForMeta",
      () => hashForMeta,
      "parseFbPostId",
      () => parseFbPostId,
      "sendConversionEvents",
      () => sendConversionEvents,
    ]);
    var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ =
      __turbopack_context__.i(
        "[externals]/node:crypto [external] (node:crypto, cjs)",
      );
    const META_GRAPH_API = "https://graph.facebook.com/v19.0";
    async function exchangeForLongLivedToken(shortToken) {
      const url = new URL(`${META_GRAPH_API}/oauth/access_token`);
      url.searchParams.set("grant_type", "fb_exchange_token");
      url.searchParams.set("client_id", process.env.FACEBOOK_APP_ID);
      url.searchParams.set("client_secret", process.env.FACEBOOK_APP_SECRET);
      url.searchParams.set("fb_exchange_token", shortToken);
      const res = await fetch(url.toString());
      if (!res.ok)
        throw new Error(`Token exchange failed: ${await res.text()}`);
      const data = await res.json();
      if (!data.access_token)
        throw new Error("No access_token in exchange response");
      return data.access_token;
    }
    async function getUserPages(longLivedToken) {
      const url = new URL(`${META_GRAPH_API}/me/accounts`);
      url.searchParams.set(
        "fields",
        "id,name,access_token,instagram_business_account",
      );
      url.searchParams.set("access_token", longLivedToken);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`Failed to get pages: ${await res.text()}`);
      const data = await res.json();
      return data.data || [];
    }
    async function getPageDetails(pageId, pageToken) {
      const url = new URL(`${META_GRAPH_API}/${pageId}`);
      url.searchParams.set("fields", "id,name,link,username");
      url.searchParams.set("access_token", pageToken);
      const res = await fetch(url.toString());
      if (!res.ok)
        return {
          id: pageId,
          name: pageId,
        };
      return res.json();
    }
    function parseFbPostId(postUrl) {
      try {
        const u = new URL(postUrl);
        const pathname = u.pathname;
        const reelMatch = pathname.match(/\/reel\/(\d+)/);
        if (reelMatch)
          return {
            postId: reelMatch[1],
            pageId: null,
          };
        const fbid = u.searchParams.get("fbid");
        const pageIdFromQuery = u.searchParams.get("id");
        if (fbid && pathname.includes("photo"))
          return {
            postId: fbid,
            pageId: pageIdFromQuery,
          };
        const storyFbid = u.searchParams.get("story_fbid");
        if (storyFbid)
          return {
            postId: storyFbid,
            pageId: pageIdFromQuery,
          };
        const videoId = u.searchParams.get("v");
        if (videoId)
          return {
            postId: videoId,
            pageId: null,
          };
        const pathMatch = pathname.match(
          /\/[^/]+\/(posts|videos|photos|notes)\/([^/?]+)/,
        );
        if (pathMatch)
          return {
            postId: pathMatch[2],
            pageId: null,
          };
      } catch {}
      return {
        postId: null,
        pageId: null,
      };
    }
    async function fetchFbPostMetrics(postUrl, pageId, pageAccessToken) {
      const { postId } = parseFbPostId(postUrl);
      if (!postId)
        throw new Error("Could not extract post ID from URL: " + postUrl);
      const graphId = `${pageId}_${postId}`;
      const engUrl = new URL(`${META_GRAPH_API}/${graphId}`);
      engUrl.searchParams.set(
        "fields",
        "id,reactions.summary(true).limit(0),likes.summary(true).limit(0),comments.summary(true).limit(0),shares",
      );
      engUrl.searchParams.set("access_token", pageAccessToken);
      let eng = null;
      const engRes = await fetch(engUrl.toString());
      if (engRes.ok) {
        eng = await engRes.json();
      } else {
        const fallbackUrl = new URL(`${META_GRAPH_API}/${postId}`);
        fallbackUrl.searchParams.set(
          "fields",
          "id,reactions.summary(true).limit(0),likes.summary(true).limit(0),comments.summary(true).limit(0),shares",
        );
        fallbackUrl.searchParams.set("access_token", pageAccessToken);
        const fbRes = await fetch(fallbackUrl.toString());
        if (!fbRes.ok)
          throw new Error(
            `Failed to fetch post metrics: ${await fbRes.text()}`,
          );
        eng = await fbRes.json();
      }
      let views = 0;
      try {
        const insightUrl = new URL(`${META_GRAPH_API}/${graphId}/insights`);
        insightUrl.searchParams.set("metric", "post_impressions_unique");
        insightUrl.searchParams.set("access_token", pageAccessToken);
        const insightRes = await fetch(insightUrl.toString());
        if (insightRes.ok) {
          const insightData = await insightRes.json();
          const metric = (insightData.data || []).find(
            (d) => d.name === "post_impressions_unique",
          );
          views = metric?.values?.[0]?.value ?? metric?.value ?? 0;
        }
      } catch {}
      return {
        views,
        likes:
          eng?.reactions?.summary?.total_count ??
          eng?.likes?.summary?.total_count ??
          0,
        comments: eng?.comments?.summary?.total_count ?? 0,
        shares: eng?.shares?.count ?? 0,
        followers_gained: 0,
      };
    }
    async function resolveIgMediaId(permalink, igAccountId, accessToken) {
      try {
        const oembedUrl = new URL(`${META_GRAPH_API}/instagram_oembed`);
        oembedUrl.searchParams.set("url", permalink);
        oembedUrl.searchParams.set("access_token", accessToken);
        const oembedRes = await fetch(oembedUrl.toString());
        if (oembedRes.ok) {
          const data = await oembedRes.json();
          if (data.media_id) return data.media_id;
        }
      } catch {}
      const normalised = permalink.replace(/\/$/, "").toLowerCase();
      let after = null;
      for (let page = 0; page < 3; page++) {
        const url = new URL(`${META_GRAPH_API}/${igAccountId}/media`);
        url.searchParams.set("fields", "id,permalink");
        url.searchParams.set("limit", "50");
        url.searchParams.set("access_token", accessToken);
        if (after) url.searchParams.set("after", after);
        const res = await fetch(url.toString());
        if (!res.ok) break;
        const data = await res.json();
        for (const item of data.data || []) {
          if (
            (item.permalink || "").replace(/\/$/, "").toLowerCase() ===
            normalised
          ) {
            return item.id;
          }
        }
        after = data.paging?.cursors?.after;
        if (!after) break;
      }
      return null;
    }
    async function getLeadAdForms(_adAccountId, accessToken) {
      let pages = [];
      try {
        pages = await getUserPages(accessToken);
      } catch (e) {
        throw new Error(
          `Could not fetch Facebook Pages: ${e.message}. Make sure the token has pages_show_list permission.`,
        );
      }
      if (pages.length === 0) {
        throw new Error(
          "No Facebook Pages found for this token. The token must belong to a user who manages at least one Page.",
        );
      }

      const allForms = [];
      for (const page of pages) {
        const pageToken = page.access_token || accessToken;
        const url = new URL(`${META_GRAPH_API}/${page.id}/leadgen_forms`);
        url.searchParams.set(
          "fields",
          "id,name,status,created_time,leads_count",
        );
        url.searchParams.set("access_token", pageToken);
        try {
          const res = await fetch(url.toString());
          const data = await res.json();
          if (!data.error && Array.isArray(data.data)) {
            for (const form of data.data) {
              allForms.push({
                ...form,
                pageName: page.name,
              });
            }
          }
        } catch {}
      }
      return allForms;
    }
    async function getFormLeads(formId, accessToken, since) {
      const leads = [];
      const initialUrl = new URL(`${META_GRAPH_API}/${formId}/leads`);
      initialUrl.searchParams.set("fields", "id,created_time,field_data");
      initialUrl.searchParams.set("limit", "100");
      initialUrl.searchParams.set("access_token", accessToken);
      if (since) {
        initialUrl.searchParams.set(
          "filtering",
          JSON.stringify([
            {
              field: "time_created",
              operator: "GREATER_THAN",
              value: since,
            },
          ]),
        );
      }
      let nextUrl = initialUrl.toString();
      while (nextUrl) {
        const url = nextUrl;

        const response = await fetch(url);
        if (!response.ok) break;

        const pageData = await response.json();
        if (pageData.error) break;
        leads.push(...(pageData.data || []));
        nextUrl = pageData.paging?.next || null;
      }
      return leads;
    }
    function hashForMeta(value) {
      return (0,
      __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__[
        "createHash"
      ])("sha256")
        .update(value.trim().toLowerCase())
        .digest("hex");
    }
    async function sendConversionEvents(datasetId, accessToken, events) {
      const url = `https://graph.facebook.com/v25.0/${datasetId}/events`;
      const payload = {
        access_token: accessToken,
        data: events.map((e) => ({
          action_source: "system_generated",
          event_name: e.event_name,
          event_time: e.event_time,
          custom_data: {
            event_source: "crm",
            lead_event_source: e.lead_event_source || "Pixelate CRM",
          },
          user_data: {
            ...(e.hashed_email
              ? {
                  em: [e.hashed_email],
                }
              : {}),
            ...(e.hashed_phone
              ? {
                  ph: [e.hashed_phone],
                }
              : {}),
            ...(e.lead_id
              ? {
                  lead_id: e.lead_id,
                }
              : {}),
          },
        })),
      };
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok)
        throw new Error(`Conversions API error: ${JSON.stringify(result)}`);
      return result;
    }
    async function fetchIgMediaMetrics(postUrl, igAccountId, accessToken) {
      const mediaId = await resolveIgMediaId(postUrl, igAccountId, accessToken);
      if (!mediaId)
        throw new Error("Could not find Instagram media for this URL");
      const mediaUrl = new URL(`${META_GRAPH_API}/${mediaId}`);
      mediaUrl.searchParams.set(
        "fields",
        "id,like_count,comments_count,permalink",
      );
      mediaUrl.searchParams.set("access_token", accessToken);
      const mediaRes = await fetch(mediaUrl.toString());
      if (!mediaRes.ok)
        throw new Error(`Failed to fetch IG media: ${await mediaRes.text()}`);
      const media = await mediaRes.json();
      let views = 0;
      let shares = 0;
      let followers_gained = 0;
      try {
        const insightUrl = new URL(`${META_GRAPH_API}/${mediaId}/insights`);
        insightUrl.searchParams.set(
          "metric",
          "impressions,reach,shares,follows",
        );
        insightUrl.searchParams.set("access_token", accessToken);
        const insightRes = await fetch(insightUrl.toString());
        if (insightRes.ok) {
          const insightData = await insightRes.json();
          for (const item of insightData.data || []) {
            const val = item.values?.[0]?.value ?? item.value ?? 0;
            if (item.name === "impressions") views = val;
            if (item.name === "shares") shares = val;
            if (item.name === "follows") followers_gained = val;
          }
        }
      } catch {}
      return {
        views,
        likes: media.like_count ?? 0,
        comments: media.comments_count ?? 0,
        shares,
        followers_gained,
      };
    }
  },
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/api/fb-ads-connection/forms/route.ts [app-route] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["GET", () => GET, "OPTIONS", () => OPTIONS]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/server.js [app-route] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/services.ts [app-route] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/auth.ts [app-route] (ecmascript)",
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$meta$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/src/lib/meta-api.ts [app-route] (ecmascript)",
      );
    const CORS = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
    async function OPTIONS() {
      return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
        "NextResponse"
      ](null, {
        headers: CORS,
      });
    }
    async function GET(request) {
      const auth = request.headers.get("authorization") || "";
      const token = auth.replace("Bearer ", "");
      const decoded = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
        "verifyToken"
      ])(token);
      if (!decoded)
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "unauthorized",
          },
          {
            status: 401,
            headers: CORS,
          },
        );
      if (decoded.role !== "admin")
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "forbidden",
          },
          {
            status: 403,
            headers: CORS,
          },
        );
      const { searchParams } = new URL(request.url);
      const clientId = searchParams.get("clientId");
      if (!clientId)
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "clientId required",
          },
          {
            status: 400,
            headers: CORS,
          },
        );
      const col =
        await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "getCollection"
        ]("fbAdsConnections");
      const conn = await col.findOne({
        clientId,
      });
      if (!conn?.accessToken) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error:
              "No FB Ads connection found for this client. Save the connection first.",
          },
          {
            status: 404,
            headers: CORS,
          },
        );
      }
      try {
        const forms = await (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$src$2f$lib$2f$meta$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "getLeadAdForms"
        ])(conn.adAccountId, conn.accessToken);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(forms, {
          headers: CORS,
        });
      } catch (e) {
        const msg = e.message || String(e);
        console.error(
          "[fb-ads-connection/forms] Error for clientId",
          clientId,
          ":",
          msg,
        );
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: msg,
            hint:
              msg.includes("190") || msg.includes("Invalid OAuth")
                ? "Token is expired or invalid. Generate a new User Access Token from Meta Business Manager."
                : msg.includes("Pages") || msg.includes("pages_show_list")
                  ? "Token needs 'pages_show_list' permission. Re-generate with that scope."
                  : msg.includes("200") || msg.includes("permission")
                    ? "Token is missing permissions. Re-generate with: ads_management, leads_retrieval, pages_show_list, pages_read_engagement."
                    : "Check that the token has: ads_management + leads_retrieval + pages_show_list permissions.",
          },
          {
            status: 500,
            headers: CORS,
          },
        );
      }
    }
  },
];
