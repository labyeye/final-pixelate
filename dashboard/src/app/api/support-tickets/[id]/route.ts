import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { ObjectId } from "mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
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
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const updates = await request.json();
    const col = await svc.getCollection("supportTickets");

    const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
    const filter = hex24 ? { _id: new ObjectId(id) } : { id };

    // If activity is being added, push it to the activity array
    if (updates.activity) {
      const currentTicket = await col.findOne(filter);
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
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const col = await svc.getCollection("supportTickets");

    const hex24 = typeof id === "string" && /^[a-fA-F0-9]{24}$/.test(id);
    const result = hex24
      ? await col.deleteOne({ _id: new ObjectId(id) })
      : await col.deleteOne({ id });

    if (result.deletedCount === 0) {
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
