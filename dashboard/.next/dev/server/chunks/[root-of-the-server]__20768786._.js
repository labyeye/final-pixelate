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
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/api/whatsapp-templates/upload-media/route.ts [app-route] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["POST", () => POST]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/server.js [app-route] (ecmascript)",
      );
    async function POST(req) {
      const accessToken = process.env.META_ACCESS_TOKEN;
      const appId = process.env.WHATSAPP_APP_ID;
      const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v21.0";
      if (!accessToken || !appId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "Missing META_ACCESS_TOKEN or WHATSAPP_APP_ID in .env",
          },
          {
            status: 500,
          },
        );
      }
      // ── Parse multipart form ───────────────────────────────────────────────────
      let formData;
      try {
        formData = await req.formData();
      } catch {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "Could not parse form data.",
          },
          {
            status: 400,
          },
        );
      }
      const file = formData.get("file");
      if (!file) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "No file provided. Send a `file` field.",
          },
          {
            status: 400,
          },
        );
      }
      const fileType = file.type || "application/octet-stream";
      const fileName = file.name || "upload";
      const fileBytes = await file.arrayBuffer();
      const fileLength = fileBytes.byteLength;
      console.info(
        `[upload-media] file="${fileName}" type="${fileType}" size=${fileLength}`,
      );
      // ── Step 1: Create upload session ─────────────────────────────────────────
      const sessionUrl =
        `https://graph.facebook.com/${apiVersion}/${appId}/uploads` +
        `?file_name=${encodeURIComponent(fileName)}` +
        `&file_length=${fileLength}` +
        `&file_type=${encodeURIComponent(fileType)}`;
      let sessionRes;
      try {
        sessionRes = await fetch(sessionUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "Network error creating upload session: " + err.message,
          },
          {
            status: 502,
          },
        );
      }
      const sessionJson = await sessionRes.json().catch(() => ({}));
      if (!sessionRes.ok) {
        const errDetail = sessionJson?.error ?? {};
        console.error(
          "[upload-media] Session creation failed:",
          JSON.stringify(sessionJson, null, 2),
        );
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: `Meta session error: ${errDetail.message ?? JSON.stringify(sessionJson)}`,
          },
          {
            status: 422,
          },
        );
      }
      const sessionId = sessionJson?.id;
      if (!sessionId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "Meta did not return an upload session ID.",
          },
          {
            status: 502,
          },
        );
      }
      console.info(`[upload-media] session created: ${sessionId}`);
      // ── Step 2: Upload file bytes ──────────────────────────────────────────────
      let uploadRes;
      try {
        uploadRes = await fetch(
          `https://graph.facebook.com/${apiVersion}/${sessionId}`,
          {
            method: "POST",
            headers: {
              Authorization: `OAuth ${accessToken}`,
              file_offset: "0",
              "Content-Type": fileType,
            },
            body: fileBytes,
          },
        );
      } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "Network error uploading file: " + err.message,
          },
          {
            status: 502,
          },
        );
      }
      const uploadJson = await uploadRes.json().catch(() => ({}));
      if (!uploadRes.ok) {
        const errDetail = uploadJson?.error ?? {};
        console.error(
          "[upload-media] Upload failed:",
          JSON.stringify(uploadJson, null, 2),
        );
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: `Meta upload error: ${errDetail.message ?? JSON.stringify(uploadJson)}`,
          },
          {
            status: 422,
          },
        );
      }
      // Meta returns { "h": "4::ABC..." } — this is the header_handle
      const handle = uploadJson?.h;
      if (!handle) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error:
              "Meta did not return a media handle. Response: " +
              JSON.stringify(uploadJson),
          },
          {
            status: 502,
          },
        );
      }
      console.info(`[upload-media] handle obtained: ${handle.slice(0, 30)}…`);
      return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
        "NextResponse"
      ].json({
        handle,
        fileName,
        fileType,
      });
    }
  },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__20768786._.js.map
