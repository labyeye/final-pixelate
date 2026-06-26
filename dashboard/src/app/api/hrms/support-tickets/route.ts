import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";

// Receives ticket data pushed from HRMS when a support ticket is created there.
export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.NESTHR_STATS_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      hrmsTicketId,
      ticketNumber,
      companyName,
      submittedBy,
      subject,
      issueType,
      issueTypeLabel,
      priority,
      description,
      status,
      createdAt,
    } = body;

    if (!hrmsTicketId) {
      return NextResponse.json(
        { error: "hrmsTicketId is required" },
        { status: 400 }
      );
    }

    const col = await svc.getCollection("supportTickets");

    // Upsert so duplicate pushes from HRMS are idempotent
    await col.updateOne(
      { hrmsTicketId },
      {
        $setOnInsert: {
          hrmsTicketId,
          ticketNumber,
          source: "hrms",
          client: companyName,
          submittedBy,
          title: subject,
          issueType,
          issueTypeLabel,
          priority: priority || "medium",
          description,
          status: status || "new",
          createdAt: createdAt ? new Date(createdAt) : new Date(),
          activity: [],
        },
      },
      { upsert: true }
    );

    const ticket = await col.findOne({ hrmsTicketId });
    return NextResponse.json(ticket, { status: 201 });
  } catch (error: any) {
    console.error("Error receiving HRMS support ticket:", error);
    return NextResponse.json(
      { error: error.message || "Failed to store ticket" },
      { status: 500 }
    );
  }
}
