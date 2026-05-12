import { NextRequest, NextResponse } from "next/server";

function sanitisePhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const {
    phone,
    clientName,
    amount,
    receiptNo,
    paymentDate,
    paymentMode,
    transactionRef,
    mediaId,
    filename,
  } = body;

  const accessToken =
    process.env.META_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v21.0";

  if (!accessToken || !phoneNumberId) {
    return NextResponse.json(
      { error: "Server misconfiguration: missing WhatsApp credentials." },
      { status: 500 },
    );
  }

  const digits = sanitisePhone(phone);

  
  
  
  const payload = {
    messaging_product: "whatsapp",
    to: digits,
    type: "template",
    template: {
      name: "payment_receipt",
      language: { code: "en_US" },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "document",
              document: {
                id: mediaId,
                filename: filename || `Receipt-${receiptNo}.pdf`,
              },
            },
          ],
        },
        {
          type: "body",
          parameters: [
            { type: "text", text: clientName },
            { type: "text", text: String(amount) },
            { type: "text", text: receiptNo },
            {
              type: "text",
              text:
                paymentDate ||
                new Date().toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }),
            },
            { type: "text", text: paymentMode || "Bank Transfer" },
            { type: "text", text: transactionRef || "—" },
          ],
        },
      ],
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
      return NextResponse.json(
        { error: errMsg },
        { status: res.status >= 500 ? 502 : 422 },
      );
    }

    const messageId = (data as any)?.messages?.[0]?.id ?? null;
    return NextResponse.json({ success: true, messageId });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Network error" },
      { status: 502 },
    );
  }
}
