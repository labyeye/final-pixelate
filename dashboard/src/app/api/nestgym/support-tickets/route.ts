import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";

// Receives ticket data pushed from NestGym when a support ticket is created
// or updated there. Mirrors /api/nestleads/support-tickets.
export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.NESTGYM_STATS_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      nestgymTicketId,
      ticketNumber,
      companyName,
      submittedBy,
      subject,
      priority,
      description,
      status,
      createdAt,
    } = body;

    if (!nestgymTicketId) {
      return NextResponse.json(
        { error: "nestgymTicketId is required" },
        { status: 400 }
      );
    }

    const col = await svc.getCollection("supportTickets");

    // Follow-up comment from the gym on an existing ticket
    if (body.reply?.message) {
      await col.updateOne(
        { nestgymTicketId },
        {
          $push: { activity: { type: "comment", user: body.reply.senderName || companyName || "Gym", message: String(body.reply.message).slice(0, 4000), timestamp: new Date() } } as any,
          $set: { status: "new" },
        }
      );
      return NextResponse.json(await col.findOne({ nestgymTicketId }));
    }

    // Upsert so duplicate pushes from NestGym are idempotent
    await col.updateOne(
      { nestgymTicketId },
      {
        $setOnInsert: {
          nestgymTicketId,
          ticketNumber,
          source: "nestgym",
          client: companyName,
          submittedBy,
          title: subject,
          priority: priority || "medium",
          description,
          status: status || "new",
          createdAt: createdAt ? new Date(createdAt) : new Date(),
          activity: [],
        },
      },
      { upsert: true }
    );

    const ticket = await col.findOne({ nestgymTicketId });
    return NextResponse.json(ticket, { status: 201 });
  } catch (error: any) {
    console.error("Error receiving NestGym support ticket:", error);
    return NextResponse.json(
      { error: error.message || "Failed to store ticket" },
      { status: 500 }
    );
  }
}
