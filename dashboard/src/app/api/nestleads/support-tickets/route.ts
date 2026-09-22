import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";

// Receives ticket data pushed from NestLeads (leads-pixelate) when a support ticket is created
// or updated there. Mirrors /api/hrms/support-tickets for the other product.
export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.NESTLEADS_STATS_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      nestleadsTicketId,
      ticketNumber,
      companyName,
      submittedBy,
      subject,
      priority,
      description,
      status,
      createdAt,
    } = body;

    if (!nestleadsTicketId) {
      return NextResponse.json(
        { error: "nestleadsTicketId is required" },
        { status: 400 }
      );
    }

    const col = await svc.getCollection("supportTickets");

    // Upsert so duplicate pushes from NestLeads are idempotent
    await col.updateOne(
      { nestleadsTicketId },
      {
        $setOnInsert: {
          nestleadsTicketId,
          ticketNumber,
          source: "nestleads",
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

    const ticket = await col.findOne({ nestleadsTicketId });
    return NextResponse.json(ticket, { status: 201 });
  } catch (error: any) {
    console.error("Error receiving NestLeads support ticket:", error);
    return NextResponse.json(
      { error: error.message || "Failed to store ticket" },
      { status: 500 }
    );
  }
}
