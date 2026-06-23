import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

function sanitisePhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth.error) return auth.error;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { phone, templateName, templateLang = "en", components = [] } = body;

  if (!phone || !templateName) {
    return NextResponse.json(
      { error: "phone and templateName are required." },
      { status: 400 },
    );
  }

  const digits = sanitisePhone(phone);
  if (!/^\d{7,15}$/.test(digits)) {
    return NextResponse.json(
      { error: "Invalid phone number. Provide digits without + (e.g. 919876543210)." },
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

  const payload = {
    messaging_product: "whatsapp",
    to: digits,
    type: "template",
    template: {
      name: templateName,
      language: { code: templateLang },
      components,
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
        body: JSON.stringify(payload),
      },
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errMsg = (data as any)?.error?.message || "WhatsApp API error";
      console.error("[whatsapp/send-template] API error:", JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: errMsg, detail: (data as any)?.error },
        { status: res.status >= 500 ? 502 : 422 },
      );
    }

    const messageId = (data as any)?.messages?.[0]?.id ?? null;
    console.info(`[whatsapp/send-template] Sent "${templateName}" to ${digits}, wamid: ${messageId}`);

    return NextResponse.json({ success: true, messageId, to: digits });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Network error" }, { status: 502 });
  }
}
