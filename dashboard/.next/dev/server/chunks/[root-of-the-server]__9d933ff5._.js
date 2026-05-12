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
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/api/upload-whatsapp-media/route.ts [app-route] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["GET", () => GET, "POST", () => POST]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/server.js [app-route] (ecmascript)",
      );
    async function POST(req) {
      const internalSecret = process.env.INTERNAL_API_SECRET;
      if (internalSecret) {
        const header = req.headers.get("x-internal-secret");
        if (header !== internalSecret) {
          return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
            "NextResponse"
          ].json(
            {
              error: "Unauthorized",
            },
            {
              status: 401,
            },
          );
        }
      }
      const accessToken = process.env.META_ACCESS_TOKEN;
      const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
      const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v21.0";
      if (!accessToken || !phoneNumberId) {
        console.error(
          "[WhatsApp Media] Missing META_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID",
        );
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "Server misconfiguration.",
          },
          {
            status: 500,
          },
        );
      }
      let formData;
      try {
        formData = await req.formData();
      } catch {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "Invalid multipart form data.",
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
            error: 'Form field "file" is required.',
          },
          {
            status: 400,
          },
        );
      }
      if (file.type !== "application/pdf") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: `Invalid file type "${file.type}". Only application/pdf is accepted.`,
          },
          {
            status: 400,
          },
        );
      }
      const MAX_BYTES = 100 * 1024 * 1024;
      if (file.size > MAX_BYTES) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "File too large. Maximum size is 100 MB.",
          },
          {
            status: 400,
          },
        );
      }
      const fileBuffer = await file.arrayBuffer();
      const pdfBlob = new Blob([fileBuffer], {
        type: "application/pdf",
      });
      const safeFilename = (file.name || "invoice.pdf").replace(
        /[^a-zA-Z0-9.\-_]/g,
        "_",
      );
      console.info(
        `[WhatsApp Media] Uploading: ${safeFilename}, size: ${(file.size / 1024).toFixed(1)} KB`,
      );
      const waForm = new FormData();
      waForm.append("file", pdfBlob, safeFilename);
      waForm.append("type", "application/pdf");
      waForm.append("messaging_product", "whatsapp");
      const endpoint = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/media`;
      let waResponse;
      try {
        waResponse = await fetch(endpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: waForm,
        });
      } catch (networkErr) {
        console.error("[WhatsApp Media] Network error:", networkErr);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "Network error while uploading to WhatsApp. Try again.",
          },
          {
            status: 502,
          },
        );
      }
      const waJson = await waResponse.json().catch(() => ({}));
      if (!waResponse.ok) {
        const errDetail = waJson?.error ?? {};
        console.error(
          `[WhatsApp Media] Upload failed — HTTP ${waResponse.status}, ` +
            `code: ${errDetail?.code}, fbtrace_id: ${errDetail?.fbtrace_id}:`,
          JSON.stringify(waJson, null, 2),
        );
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: errDetail?.message ?? "WhatsApp media upload failed.",
            code: errDetail?.code,
            fbtrace_id: errDetail?.fbtrace_id,
            detail: errDetail,
          },
          {
            status: waResponse.status >= 500 ? 502 : 422,
          },
        );
      }
      const mediaId = waJson?.id;
      if (!mediaId) {
        console.error("[WhatsApp Media] No media id in response:", waJson);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: "WhatsApp returned no media_id. Inspect the full response.",
          },
          {
            status: 502,
          },
        );
      }
      console.info(
        `[WhatsApp Media] Uploaded OK — mediaId: ${mediaId}, filename: ${safeFilename}`,
      );
      return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
        "NextResponse"
      ].json({
        mediaId,
      });
    }
    async function GET() {
      return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
        "NextResponse"
      ].json(
        {
          error: "Method not allowed.",
        },
        {
          status: 405,
        },
      );
    }
  },
];


