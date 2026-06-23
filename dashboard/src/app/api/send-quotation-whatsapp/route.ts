import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION || "v21.0";
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  if (!WHATSAPP_PHONE_ID || !META_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "WhatsApp API not configured. Add WHATSAPP_PHONE_NUMBER_ID and META_ACCESS_TOKEN to .env" },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const { phone, quotation, clientName } = body as {
      phone: string;
      clientName: string;
      quotation: {
        quoteId?: string;
        title?: string;
        services?: Array<{ serviceName: string; price: number; qty: number }>;
        timeline?: Array<{ phase: string; duration: string }>;
        paymentTerms?: string;
        date?: string;
      };
    };

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Normalize phone: preserve country code if provided with +, else assume India for 10-digit numbers
    const rawDigits = phone.replace(/\D/g, "");
    const normalizedPhone = phone.trim().startsWith("+")
      ? rawDigits
      : rawDigits.length === 10
        ? "91" + rawDigits
        : rawDigits;

    // Build grand total
    const grandTotal = (quotation.services || []).reduce(
      (sum, s) => sum + s.price * s.qty,
      0,
    );

    // Build concise services list (max 5)
    const serviceLines = (quotation.services || [])
      .slice(0, 5)
      .map((s) => `  - ${s.serviceName}: Rs.${(s.price * s.qty).toLocaleString("en-IN")}`)
      .join("\n");

    // Build timeline summary (max 4 phases)
    const timelineLines = (quotation.timeline || [])
      .slice(0, 4)
      .map((t) => `  - ${t.phase}: ${t.duration}`)
      .join("\n");

    const quoteDate = quotation.date
      ? new Date(quotation.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
      : new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

    const message = [
      `Hello ${clientName},`,
      ``,
      `We have prepared a quotation for you from *Pixelate Nest*.`,
      ``,
      `*Quotation ID:* ${quotation.quoteId || "—"}`,
      `*Project:* ${quotation.title || "—"}`,
      `*Date:* ${quoteDate}`,
      ``,
      serviceLines
        ? `*Services:*\n${serviceLines}`
        : null,
      ``,
      `*Total Amount:* Rs.${grandTotal.toLocaleString("en-IN")}`,
      ``,
      timelineLines
        ? `*Timeline:*\n${timelineLines}`
        : null,
      ``,
      quotation.paymentTerms
        ? `*Payment Terms:* ${quotation.paymentTerms}`
        : `*Payment Terms:* 50% advance, 50% on completion`,
      ``,
      `Please review and let us know if you have any questions. We look forward to working with you!`,
      ``,
      `*Pixelate Nest*`,
      `www.pixelatenest.com`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_ID}/messages`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${META_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: normalizedPhone,
        type: "text",
        text: { body: message, preview_url: false },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("WhatsApp API error:", data);
      return NextResponse.json(
        { error: data?.error?.message || "WhatsApp send failed", details: data },
        { status: res.status },
      );
    }

    return NextResponse.json({
      success: true,
      messageId: data?.messages?.[0]?.id,
    });
  } catch (e: any) {
    console.error("send-quotation-whatsapp error:", e);
    return NextResponse.json({ error: e.message || "Internal error" }, { status: 500 });
  }
}
