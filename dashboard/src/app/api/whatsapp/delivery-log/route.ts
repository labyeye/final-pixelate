import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/services";
import { requireAuth } from "@/lib/require-auth";
import getDb from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth.error) return auth.error;
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") ?? "200", 10);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const db = await getDb();

    // ── date filter helpers ──
    const buildDateFilter = (field: string) => {
      if (!from && !to) return {};
      const f: Record<string, Date> = {};
      if (from) f.$gte = new Date(from + "T00:00:00.000Z");
      if (to) f.$lte = new Date(to + "T23:59:59.999Z");
      return { [field]: f };
    };

    // ── 1. Invoice sends ──
    const invQuery: Record<string, any> = {
      whatsapp_sent: true,
      ...buildDateFilter("whatsapp_sent_at"),
    };
    if (status && status !== "all") invQuery.whatsapp_send_status = status;

    const invoices = await (await getCollection("invoices"))
      .find(invQuery, {
        projection: {
          _id: 1,
          invoiceNumber: 1,
          clientName: 1,
          phone: 1,
          amount: 1,
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

    // ── 2. Template / direct sends from whatsapp_messages ──
    const msgQuery: Record<string, any> = {
      messageType: "sent",
      ...buildDateFilter("timestamp"),
    };
    if (status && status !== "all") msgQuery.status = status;

    const sentMessages = await db
      .collection("whatsapp_messages")
      .find(msgQuery)
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();

    // ── 3. Replies (received messages) — matched by phone ──
    const phones = [
      ...new Set([
        ...invoices.map((i) => i.phone).filter(Boolean),
        ...sentMessages.map((m) => m.phone).filter(Boolean),
      ]),
    ];

    const receivedMap: Record<string, { message: string; timestamp: Date }> = {};
    if (phones.length > 0) {
      const received = await db
        .collection("whatsapp_messages")
        .find({ messageType: "received", phone: { $in: phones } })
        .sort({ timestamp: -1 })
        .toArray();

      // keep the latest reply per phone
      for (const r of received) {
        if (!receivedMap[r.phone]) {
          receivedMap[r.phone] = {
            message: r.message,
            timestamp: r.timestamp,
          };
        }
      }
    }

    // ── 4. Normalise to unified shape ──
    type LogEntry = {
      _id: string;
      source: "invoice" | "template";
      phone?: string;
      contactName?: string;
      invoiceNumber?: string;
      templateName?: string;
      message?: string;
      sentAt?: string;
      messageId?: string;
      status: string;
      deliveredAt?: string;
      readAt?: string;
      failedAt?: string;
      failCode?: number;
      failReason?: string;
      replyText?: string;
      replyAt?: string;
    };

    const invoiceEntries: LogEntry[] = invoices.map((inv) => ({
      _id: String(inv._id),
      source: "invoice",
      phone: inv.phone,
      contactName: inv.clientName,
      invoiceNumber: inv.invoiceNumber,
      message: inv.invoiceNumber ? `Invoice #${inv.invoiceNumber}` : "Invoice",
      sentAt: inv.whatsapp_sent_at,
      messageId: inv.whatsapp_message_id,
      status: inv.whatsapp_send_status ?? "sent",
      deliveredAt: inv.whatsapp_delivered_at,
      readAt: inv.whatsapp_read_at,
      failedAt: inv.whatsapp_failed_at,
      failCode: inv.whatsapp_fail_code,
      failReason: inv.whatsapp_fail_reason,
      replyText: inv.phone ? receivedMap[inv.phone]?.message : undefined,
      replyAt: inv.phone
        ? receivedMap[inv.phone]?.timestamp?.toISOString()
        : undefined,
    }));

    const templateEntries: LogEntry[] = sentMessages.map((m) => ({
      _id: String(m._id),
      source: "template",
      phone: m.phone,
      contactName: m.contactName,
      templateName: m.templateName,
      message: m.message,
      sentAt: m.timestamp?.toISOString?.() ?? m.timestamp,
      messageId: m.messageId,
      status: m.status ?? "sent",
      replyText: m.phone ? receivedMap[m.phone]?.message : undefined,
      replyAt: m.phone
        ? receivedMap[m.phone]?.timestamp?.toISOString()
        : undefined,
    }));

    // merge and sort by sentAt desc
    const all = [...invoiceEntries, ...templateEntries].sort((a, b) => {
      const ta = a.sentAt ? new Date(a.sentAt).getTime() : 0;
      const tb = b.sentAt ? new Date(b.sentAt).getTime() : 0;
      return tb - ta;
    });

    return NextResponse.json(all);
  } catch (error: any) {
    console.error("[WA Delivery Log] Failed to fetch:", error);
    return NextResponse.json(
      { error: error.message ?? "Failed to fetch delivery log" },
      { status: 500 },
    );
  }
}
