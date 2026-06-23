import { NextRequest, NextResponse } from "next/server";

function sanitisePhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

function isValidPhone(digits: string): boolean {
  return /^\d{7,15}$/.test(digits);
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { phone, clientName, brandName, mediaId, pdfUrl, templateName, templateLang } = body;

  const missingFields: string[] = [];
  if (!phone) missingFields.push("phone");
  if (!clientName) missingFields.push("clientName");
  if (!mediaId && !pdfUrl) missingFields.push("mediaId or pdfUrl (one is required)");

  if (missingFields.length) {
    return NextResponse.json(
      { error: `Missing required fields: ${missingFields.join(", ")}` },
      { status: 400 },
    );
  }

  const digits = sanitisePhone(phone);
  if (!isValidPhone(digits)) {
    return NextResponse.json(
      { error: "Invalid phone number. Provide digits in E.164 format without + (e.g. 919876543210)." },
      { status: 400 },
    );
  }

  if (pdfUrl && !pdfUrl.startsWith("https://")) {
    return NextResponse.json(
      { error: "pdfUrl must be a public HTTPS URL." },
      { status: 400 },
    );
  }

  const accessToken = process.env.META_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v21.0";

  if (!accessToken || !phoneNumberId) {
    return NextResponse.json(
      { error: "Server misconfiguration: missing WhatsApp credentials." },
      { status: 500 },
    );
  }

  const tmplName ="brand_guide";
  const tmplLang = "en_us";

  const safeFilename = `Brand-Guide-${(brandName || clientName).replace(/[/\\:*?"<>|]/g, "-")}.pdf`;

  const documentParam = mediaId
    ? { type: "document", document: { id: mediaId, filename: safeFilename } }
    : { type: "document", document: { link: pdfUrl!, filename: safeFilename } };

  const payload = {
    messaging_product: "whatsapp",
    to: digits,
    type: "template",
    template: {
      name: tmplName,
      language: { code: tmplLang },
      components: [
        {
          type: "header",
          parameters: [documentParam],
        },
        {
          type: "body",
          parameters: [
            { type: "text", parameter_name: "client_name", text: clientName },
            { type: "text", parameter_name: "brand_name", text: brandName || clientName },
          ],
        },
      ],
    },
  };

  const endpoint = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

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
  } catch (networkErr) {
    return NextResponse.json(
      { error: "Network error while contacting WhatsApp API. Please try again." },
      { status: 502 },
    );
  }

  const waJson = await waResponse.json().catch(() => ({}));

  if (!waResponse.ok) {
    const errDetail = (waJson as any)?.error ?? {};
    const friendlyMessage = errDetail.message ?? "WhatsApp API returned an error.";
    console.error("[WhatsApp brand-guide] API error:", JSON.stringify(waJson, null, 2));
    return NextResponse.json(
      { error: friendlyMessage, detail: errDetail },
      { status: waResponse.status >= 500 ? 502 : 422 },
    );
  }

  const messageId = (waJson as any)?.messages?.[0]?.id ?? null;
  console.info(`[WhatsApp brand-guide] Sent to ${digits}, wamid: ${messageId}`);

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
