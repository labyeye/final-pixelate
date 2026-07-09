import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/mongodb";
import { getCollection } from "@/lib/services";
import { requireAuth } from "@/lib/require-auth";

// Sync = count what's already stored in our DB for the given date range.
// The real data arrives via the Meta webhook POST to /api/whatsapp-webhook —
// we cannot call that endpoint ourselves (it requires Meta's HMAC signature).
export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  try {
    const db = await getDb();
    const body = await request.json().catch(() => ({}));

    const from = body.from ? new Date(body.from + "T00:00:00.000Z") : null;
    const to = body.to ? new Date(body.to + "T23:59:59.999Z") : null;

    const dateFilter: Record<string, any> = {};
    if (from) dateFilter.$gte = from;
    if (to) dateFilter.$lte = to;

    const hasDates = from || to;

    const [sentCount, receivedCount, invoiceCount] = await Promise.all([
      db.collection("whatsapp_messages").countDocuments({
        messageType: "sent",
        ...(hasDates ? { timestamp: dateFilter } : {}),
      }),
      db.collection("whatsapp_messages").countDocuments({
        messageType: "received",
        ...(hasDates ? { timestamp: dateFilter } : {}),
      }),
      (await getCollection("invoices")).countDocuments({
        whatsapp_sent: true,
        ...(hasDates ? { whatsapp_sent_at: dateFilter } : {}),
      }),
    ]);

    return NextResponse.json({
      ok: true,
      sent: sentCount,
      received: receivedCount,
      invoices: invoiceCount,
      total: sentCount + receivedCount + invoiceCount,
      from: body.from ?? null,
      to: body.to ?? null,
    });
  } catch (error: any) {
    console.error("[WA Sync] Error:", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Sync failed" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  try {
    const db = await getDb();
    const [sent, received] = await Promise.all([
      db.collection("whatsapp_messages").countDocuments({ messageType: "sent" }),
      db.collection("whatsapp_messages").countDocuments({ messageType: "received" }),
    ]);
    return NextResponse.json({ ok: true, sent, received });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
