import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/services";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") ?? "100", 10);

    const col = await getCollection("invoices");

    const query: Record<string, any> = { whatsapp_sent: true };
    if (status && status !== "all") {
      query.whatsapp_send_status = status;
    }

    const invoices = await col
      .find(query, {
        projection: {
          _id: 1,
          invoiceNumber: 1,
          clientName: 1,
          phone: 1,
          amount: 1,
          whatsapp_sent: 1,
          whatsapp_sent_at: 1,
          whatsapp_message_id: 1,
          whatsapp_send_status: 1,
          whatsapp_delivered_at: 1,
          whatsapp_read_at: 1,
          whatsapp_failed_at: 1,
          whatsapp_fail_code: 1,
          whatsapp_fail_reason: 1,
        },
      })
      .sort({ whatsapp_sent_at: -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json(invoices);
  } catch (error: any) {
    console.error("[WA Delivery Log] Failed to fetch:", error);
    return NextResponse.json(
      { error: error.message ?? "Failed to fetch delivery log" },
      { status: 500 },
    );
  }
}
