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
  "[project]/Desktop/Projects/final-pixelate/dashboard/src/app/api/whatsapp/bulk-send/route.ts [app-route] (ecmascript)",
  (__turbopack_context__) => {
    "use strict";

    __turbopack_context__.s(["GET", () => GET, "POST", () => POST]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        "[project]/Desktop/Projects/final-pixelate/dashboard/node_modules/next/server.js [app-route] (ecmascript)",
      );
    const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION || "v21.0";
    const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
    const DELAY_BETWEEN_MESSAGES = 1000;
    async function sendPersonalizedMessage(
      phone,
      name,
      _company,
      templateName = "bni_outreach",
      services,
    ) {
      try {
        const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_ID}/messages`;
        const payload = {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: phone,
          type: "template",
          template: {
            name: templateName,
            language: {
              code: "en",
            },
            components: [
              {
                type: "header",
                parameters: [
                  {
                    type: "text",
                    parameter_name: "person_name",
                    text: name,
                  },
                ],
              },
              {
                type: "body",
                parameters: [
                  {
                    type: "text",
                    parameter_name: "service_one",
                    text: services?.service_one ?? "Web Development",
                  },
                  {
                    type: "text",
                    parameter_name: "service_two",
                    text: services?.service_two ?? "App Development",
                  },
                  {
                    type: "text",
                    parameter_name: "service_three",
                    text: services?.service_three ?? "Digital Solutions",
                  },
                ],
              },
            ],
          },
        };
        console.log(
          `📤 Sending to ${phone}:`,
          JSON.stringify(payload, null, 2),
        );
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${META_ACCESS_TOKEN}`,
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const error = await response.json();
          console.error(`Failed to send message to ${phone}:`, error);
          return {
            success: false,
            phone,
            error: error.error?.message || "Failed to send message",
          };
        }
        const data = await response.json();
        return {
          success: true,
          phone,
          messageId: data.messages?.[0]?.id,
        };
      } catch (error) {
        console.error(`Error sending message to ${phone}:`, error);
        return {
          success: false,
          phone,
          error: error.message,
        };
      }
    }
    function formatPhoneNumber(phone) {
      let cleaned = phone.replace(/[^\d+]/g, "");
      if (!cleaned.startsWith("+")) {
        if (cleaned.length === 10) cleaned = "+91" + cleaned;
        else if (cleaned.length === 12 && cleaned.startsWith("91"))
          cleaned = "+" + cleaned;
      }
      return cleaned;
    }
    async function POST(request) {
      try {
        const body = await request.json();
        const { contacts, template_name = "bni_outreach", services } = body;
        if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
          return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
            "NextResponse"
          ].json(
            {
              error: "contacts array is required and must not be empty",
            },
            {
              status: 400,
            },
          );
        }
        if (!WHATSAPP_PHONE_ID || !META_ACCESS_TOKEN) {
          return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
            "NextResponse"
          ].json(
            {
              error: "WhatsApp API credentials not configured",
            },
            {
              status: 500,
            },
          );
        }
        if (contacts.length > 100) {
          return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
            "NextResponse"
          ].json(
            {
              error: "Maximum 100 contacts per request (use pagination)",
            },
            {
              status: 400,
            },
          );
        }
        const results = [];
        let successCount = 0;
        let failureCount = 0;
        console.log(
          `🚀 Starting bulk message send to ${contacts.length} contacts...`,
        );
        for (let i = 0; i < contacts.length; i++) {
          const contact = contacts[i];
          if (!contact.phone || !contact.name) {
            results.push({
              success: false,
              phone: contact.phone || "unknown",
              error: "Missing required fields: phone and name",
            });
            failureCount++;
            continue;
          }
          try {
            const formattedPhone = formatPhoneNumber(contact.phone);
            const result = await sendPersonalizedMessage(
              formattedPhone,
              contact.name,
              contact.company,
              template_name,
              services,
            );
            results.push(result);
            if (result.success) {
              successCount++;
              console.log(
                `✅ Message sent to ${contact.name} (${formattedPhone})`,
              );
            } else {
              failureCount++;
              console.log(
                `❌ Failed to send to ${contact.name}: ${result.error}`,
              );
            }
          } catch (error) {
            results.push({
              success: false,
              phone: contact.phone,
              error: error.message,
            });
            failureCount++;
          }
          if (i < contacts.length - 1) {
            await new Promise((resolve) =>
              setTimeout(resolve, DELAY_BETWEEN_MESSAGES),
            );
          }
        }
        console.log(
          `📊 Bulk send complete: ${successCount} sent, ${failureCount} failed`,
        );
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json({
          summary: {
            total: contacts.length,
            successful: successCount,
            failed: failureCount,
            success_rate: `${((successCount / contacts.length) * 100).toFixed(2)}%`,
          },
          details: results,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Bulk messaging error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
          "NextResponse"
        ].json(
          {
            error: error.message || "Internal server error",
          },
          {
            status: 500,
          },
        );
      }
    }
    async function GET() {
      return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Projects$2f$final$2d$pixelate$2f$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__[
        "NextResponse"
      ].json({
        message: "Bulk WhatsApp messaging endpoint",
        endpoint: "POST /api/whatsapp/bulk-send",
        documentation: "/api/whatsapp/bulk-send/docs",
      });
    }
  },
];
