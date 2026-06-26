import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";

// Called by HRMS to push a status update back into the CRM ticket.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ hrmsTicketId: string }> }
) {
  const apiKey = request.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.NESTHR_STATS_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const { hrmsTicketId } = await params;
    const { status, resolvedNote } = await request.json();

    const validStatuses = ["new", "in_progress", "resolved", "closed"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `status must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const col = await svc.getCollection("supportTickets");
    const ticket = await col.findOne({ hrmsTicketId });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    const activityEntry = {
      type: "status_change",
      user: "HRMS",
      message: resolvedNote
        ? `Status updated to ${status}: ${resolvedNote}`
        : `Status updated to ${status}`,
      timestamp: new Date(),
      oldValue: ticket.status,
      newValue: status,
    };

    await col.updateOne(
      { hrmsTicketId },
      {
        $set: {
          status,
          ...(resolvedNote ? { resolvedNote } : {}),
          updatedAt: new Date(),
        },
        $push: { activity: activityEntry } as any,
      }
    );

    const updated = await col.findOne({ hrmsTicketId });
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Error updating ticket status from HRMS:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update status" },
      { status: 500 }
    );
  }
}
