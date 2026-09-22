import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { ObjectId } from "mongodb";

// A ticket pushed in from HRMS or NestLeads carries hrmsTicketId / nestleadsTicketId — when we
// change its status or add a reply here, push that back so the tenant sees it in their own app.
// Best effort: never blocks or fails the PATCH if the other side is unreachable or unconfigured.
async function notifySource(ticket: any, updates: any) {
  const reply =
    updates.activity?.type === "comment" ? updates.activity : null;
  const statusChanged = typeof updates.status === "string";
  if (!reply && !statusChanged) return;

  try {
    if (ticket.source === "hrms" && ticket.hrmsTicketId) {
      const base = process.env.NESTHR_BACKEND_URL;
      const key = process.env.NESTHR_STATS_SECRET;
      if (!base || !key) return;
      if (statusChanged) {
        await fetch(`${base}/api/support/${ticket.hrmsTicketId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", "x-api-key": key },
          body: JSON.stringify({ status: updates.status, resolvedNote: reply?.message }),
        }).catch(() => {});
      }
      if (reply) {
        await fetch(`${base}/api/support/${ticket.hrmsTicketId}/webhook-reply`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": key },
          body: JSON.stringify({ message: reply.message, authorName: reply.user || "Pixelate Nest Support" }),
        }).catch(() => {});
      }
    } else if (ticket.source === "nestleads" && ticket.nestleadsTicketId) {
      const base = process.env.NESTLEADS_BACKEND_URL;
      const key = process.env.NESTLEADS_STATS_SECRET;
      if (!base || !key) return;
      await fetch(`${base}/api/support/webhook/${ticket.nestleadsTicketId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": key },
        body: JSON.stringify({
          ...(statusChanged ? { status: updates.status } : {}),
          ...(reply ? { message: reply.message, senderName: reply.user || "Pixelate Nest Support" } : {}),
        }),
      }).catch(() => {});
    }
  } catch (err) {
    console.error("Error forwarding ticket update to source product:", err);
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const col = await svc.getCollection("supportTickets");

    const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
    const ticket = hex24
      ? await col.findOne({ _id: new ObjectId(id) })
      : await col.findOne({ id });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json(ticket);
  } catch (error: any) {
    console.error("Error fetching ticket:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch ticket" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const updates = await request.json();
    const col = await svc.getCollection("supportTickets");

    const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
    const filter = hex24 ? { _id: new ObjectId(id) } : { id };

    const currentTicket = await col.findOne(filter);

    if (updates.activity) {
      const existingActivity = currentTicket?.activity || [];

      await col.updateOne(filter, {
        $set: {
          ...updates,
          activity: [...existingActivity, updates.activity],
          updatedAt: new Date(),
        },
      });
    } else {
      await col.updateOne(filter, {
        $set: { ...updates, updatedAt: new Date() },
      });
    }

    const updatedTicket = await col.findOne(filter);
    if (currentTicket) notifySource(currentTicket, updates).catch(() => {});
    return NextResponse.json(updatedTicket);
  } catch (error: any) {
    console.error("Error updating ticket:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update ticket" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const ok = await svc.softDeleteById("supportTickets", id);
    if (!ok) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting ticket:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete ticket" },
      { status: 500 },
    );
  }
}
