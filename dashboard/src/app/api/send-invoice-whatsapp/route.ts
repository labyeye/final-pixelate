import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import getDb from "@/lib/mongodb";

function sanitisePhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

function isValidPhone(digits: string): boolean {
  return /^\d{7,15}$/.test(digits);
}

interface SendInvoiceBody {
  phone: string;
  clientName: string;
  invNo: string;
  amount: string;
  filename?: string;

  mediaId?: string;

  pdfUrl?: string;

  clientId?: string;
  invoiceId?: string;
  templateName?: string;
  templateLang?: string;
}

interface WhatsAppErrorDetail {
  message?: string;
  type?: string;
  code?: number;
  fbtrace_id?: string;
}

const WA_ERROR_MAP: Record<number, string> = {
  131030: "Recipient phone number is not registered on WhatsApp.",
  131031: "Recipient phone number is not a valid WhatsApp account.",
  131026: "Message undeliverable to this recipient.",
  131047:
    "Session expired (24-hour window). Template was used but check template approval.",
  131051: "Unsupported message type for this recipient.",

  132000: "Template not found or not approved. Check WHATSAPP_TEMPLATE_NAME.",
  132001:
    "Template parameter count or type does not match the approved template.",
  132005: "Template language code is wrong. Set WHATSAPP_TEMPLATE_LANG=en_US.",
  132007:
    "Template header format does not match — ensure DOCUMENT header type.",
  132008: "Template components malformed.",
  132012: "Template parameter format mismatch.",
  135000:
    "Generic template error — check component types and parameter values.",

  190: "Access token expired or invalid. Regenerate your System User token.",
  200: "Permission error — ensure whatsapp_business_messaging permission is granted.",

  368: "Account temporarily blocked due to policy violation.",
  131048: "Spam rate limit hit. Slow down.",
  131049: "Message failed to send because of a business account issue.",

  131016: "Service temporarily unavailable.",

  100: "Invalid request or missing parameter. Check the payload structure.",
};

async function sendTextFallback(
  digits: string,
  clientName: string,
  invNo: string,
  amount: string,
  phoneNumberId: string,
  accessToken: string,
  apiVersion: string,
): Promise<void> {
  const fallbackPayload = {
    messaging_product: "whatsapp",
    to: digits,
    type: "text",
    text: {
      body:
        `Hi ${clientName},\n\nYour invoice *${invNo}* for *${amount}* has been generated.\n\n` +
        `We were unable to attach the PDF document in this message. ` +
        `Please contact us to receive it via email or download link.\n\n` +
        `— Pixelate Studio`,
    },
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fallbackPayload),
      },
    );
    const json = await res.json().catch(() => ({}));
    if (res.ok) {
      console.info(
        `[WhatsApp] Fallback text sent — to: ${digits}, invNo: ${invNo}`,
      );
    } else {
      console.error(
        "[WhatsApp] Fallback text also failed:",
        JSON.stringify(json),
      );
    }
  } catch (err) {
    console.error("[WhatsApp] Fallback text network error:", err);
  }
}
export async function POST(req: NextRequest) {
  const internalSecret = process.env.INTERNAL_API_SECRET;
  if (internalSecret) {
    const authHeader = req.headers.get("x-internal-secret");
    if (authHeader !== internalSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  let body: SendInvoiceBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const {
    phone,
    clientName,
    invNo,
    amount,
    filename,
    mediaId,
    pdfUrl,
    clientId,
    invoiceId,
    templateName: bodyTemplateName,
    templateLang: bodyTemplateLang,
  } = body;
  if (clientId) {
    try {
      const clientDoc = await svc.findById("clients", clientId);
      if (!clientDoc) {
        return NextResponse.json(
          { error: "Client not found.", code: "CLIENT_NOT_FOUND" },
          { status: 404 },
        );
      }
      if (clientDoc.whatsapp_opted_in !== true) {
        console.warn(
          `[WhatsApp] Blocked send to client ${clientId} — no opt-in on record.`,
        );
        return NextResponse.json(
          {
            error:
              "Client has not opted in to receive WhatsApp messages. " +
              "Ask the client to consent first (checkbox on invoice creation).",
            code: "OPT_IN_REQUIRED",
          },
          { status: 403 },
        );
      }
      if (clientDoc.whatsapp_opted_in === false) {
        console.warn(
          `[WhatsApp] Blocked send to client ${clientId} — client has opted out.`,
        );
        return NextResponse.json(
          {
            error:
              "Client has opted out of WhatsApp messages (replied STOP). Cannot send.",
            code: "OPT_OUT",
          },
          { status: 403 },
        );
      }
    } catch (dbErr: any) {
      console.error("[WhatsApp] DB error during opt-in check:", dbErr);
      return NextResponse.json(
        { error: "Could not verify opt-in status. Try again." },
        { status: 500 },
      );
    }
  }
  if (invoiceId) {
    try {
      const invoiceDoc = await svc.findById("invoices", invoiceId);
      if (invoiceDoc?.whatsapp_sent === true) {
        console.info(
          `[WhatsApp] Invoice ${invoiceId} already sent. Resending. Previous wamid: ${invoiceDoc.whatsapp_message_id}`,
        );
      }
    } catch (dbErr: any) {
      console.error("[WhatsApp] DB error during send check:", dbErr);
    }
  }
  const missingFields: string[] = [];
  if (!phone) missingFields.push("phone");
  if (!clientName) missingFields.push("clientName");
  if (!invNo) missingFields.push("invNo");
  if (!amount) missingFields.push("amount");
  if (!mediaId && !pdfUrl)
    missingFields.push("mediaId or pdfUrl (one is required)");

  if (missingFields.length) {
    return NextResponse.json(
      { error: `Missing required fields: ${missingFields.join(", ")}` },
      { status: 400 },
    );
  }

  const digits = sanitisePhone(phone);
  if (!isValidPhone(digits)) {
    return NextResponse.json(
      {
        error:
          "Invalid phone number. Provide digits only in E.164 format without the + " +
          "(e.g. 919876543210 for an Indian number).",
      },
      { status: 400 },
    );
  }
  if (pdfUrl) {
    if (!pdfUrl.startsWith("https://")) {
      return NextResponse.json(
        {
          error:
            "pdfUrl must be a public HTTPS URL with no authentication, no redirects, " +
            "and directly accessible via curl/incognito. HTTP URLs are rejected by WhatsApp.",
        },
        { status: 400 },
      );
    }
  }
  const accessToken = process.env.META_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken) {
    console.error("[WhatsApp] META_ACCESS_TOKEN is not set.");
    return NextResponse.json(
      { error: "Server misconfiguration: missing token." },
      { status: 500 },
    );
  }
  if (!phoneNumberId) {
    console.error("[WhatsApp] WHATSAPP_PHONE_NUMBER_ID is not set.");
    return NextResponse.json(
      { error: "Server misconfiguration: missing phone number ID." },
      { status: 500 },
    );
  }
  console.info(
    `[WhatsApp] Sending to: ${digits} (sender phoneNumberId: ${phoneNumberId})`,
  );
  const templateName =
    bodyTemplateName || process.env.WHATSAPP_TEMPLATE_NAME || "invoicing";
  const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v21.0";

  // Resolve template language: body param > DB lookup > env > fallback
  let templateLang =
    bodyTemplateLang || process.env.WHATSAPP_TEMPLATE_LANG || "en_US";
  try {
    const db = await getDb();
    const tmplDoc = await db
      .collection("whatsapp_templates")
      .findOne({ name: templateName });
    if (tmplDoc?.language) {
      templateLang = tmplDoc.language;
      console.info(
        `[WhatsApp] Resolved template language from DB: ${templateLang} (template: ${templateName})`,
      );
    }
  } catch (dbErr) {
    console.warn(
      "[WhatsApp] Could not look up template language from DB — using fallback:",
      templateLang,
    );
  }

  function sanitiseFilename(raw: string): string {
    return raw
      .replace(/[/\\:*?"<>|]/g, "-")
      .replace(/-{2,}/g, "-")
      .replace(/^-|-$/g, "")
      .trim();
  }

  const safeFilename = filename
    ? sanitiseFilename(filename.replace(/\.pdf$/i, "")) + ".pdf"
    : sanitiseFilename(`Invoice-${invNo}`) + ".pdf";

  const documentParam = mediaId
    ? {
        type: "document",
        document: {
          id: mediaId,
          filename: safeFilename,
        },
      }
    : {
        type: "document",
        document: {
          link: pdfUrl!,
          filename: safeFilename,
        },
      };

  const payload = {
    messaging_product: "whatsapp",
    to: digits,
    type: "template",
    template: {
      name: templateName,
      language: { code: templateLang },
      components: [
        {
          type: "header",
          parameters: [documentParam],
        },
        {
          type: "body",
          parameters: [
            { type: "text", parameter_name: "client_name", text: clientName },
            { type: "text", parameter_name: "inv_no", text: invNo },
            {
              type: "text",
              parameter_name: "amount",
              text: `${String(amount)} incl GST`,
            },
          ],
        },
      ],
    },
  };

  const endpoint = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

  console.info("[WhatsApp] Sending payload:", JSON.stringify(payload, null, 2));
  let waResponse: Response;
  try {
    waResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (networkErr: unknown) {
    console.error("[WhatsApp] Network error calling Graph API:", networkErr);
    return NextResponse.json(
      {
        error: "Network error while contacting WhatsApp API. Please try again.",
      },
      { status: 502 },
    );
  }

  const waJson = await waResponse.json().catch(() => ({}));
  if (!waResponse.ok) {
    const errDetail: WhatsAppErrorDetail = (waJson as any)?.error ?? {};
    const code = errDetail.code ?? waResponse.status;

    console.error(
      `[WhatsApp] API error — HTTP ${waResponse.status}:`,
      JSON.stringify(waJson, null, 2),
    );

    const friendlyMessage =
      WA_ERROR_MAP[code as number] ??
      errDetail.message ??
      "WhatsApp API returned an error.";
    const documentErrorCodes = [131016, 131026, 100];
    const isDocumentError =
      documentErrorCodes.includes(code as number) ||
      (errDetail.message ?? "").toLowerCase().includes("media");

    if (isDocumentError && pdfUrl) {
      console.warn(
        "[WhatsApp] Document delivery failed — sending text fallback.",
      );
      await sendTextFallback(
        digits,
        clientName,
        invNo,
        String(amount),
        phoneNumberId,
        accessToken,
        apiVersion,
      );
      return NextResponse.json(
        {
          error: `Document delivery failed: ${friendlyMessage}. A text notification was sent instead.`,
          code,
          fallbackSent: true,
          detail: errDetail,
        },
        { status: 207 },
      );
    }

    return NextResponse.json(
      { error: friendlyMessage, code, detail: errDetail, fallbackSent: false },
      { status: waResponse.status >= 500 ? 502 : 422 },
    );
  }
  const messageId = (waJson as any)?.messages?.[0]?.id ?? null;

  console.info(
    `[WhatsApp] Accepted by Meta — to: ${digits}, invNo: ${invNo}, wamid: ${messageId}`,
  );
  console.info(
    "[WhatsApp] IMPORTANT: wamid ≠ delivered. Check webhook for sent/delivered/read/failed events.",
  );
  if (invoiceId) {
    try {
      await svc.updateById("invoices", invoiceId, {
        whatsapp_sent: true,
        whatsapp_sent_at: new Date().toISOString(),
        whatsapp_message_id: messageId,
        whatsapp_send_status: "sent",
      });
    } catch (dbErr: any) {
      console.error(
        "[WhatsApp] Failed to mark invoice as sent in DB (non-fatal):",
        dbErr,
      );
    }
  }

  return NextResponse.json({
    success: true,
    messageId,
    to: digits,
    note: "Message accepted by Meta. Delivery confirmed via webhook only.",
  });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
