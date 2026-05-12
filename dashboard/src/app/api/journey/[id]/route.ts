import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const db = await getDb();

    const updateDoc = { ...body, updatedAt: new Date() };
    delete updateDoc._id;

    const hex24 = /^[a-fA-F0-9]{24}$/.test(id);
    const filter = hex24 ? { _id: new ObjectId(id) } : { id };

    await db
      .collection("journey_events")
      .updateOne(filter, { $set: updateDoc });
    const updated = hex24
      ? await db.collection("journey_events").findOne({ _id: new ObjectId(id) })
      : await db.collection("journey_events").findOne({ id });

    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { softDeleteById } = await import("@/lib/services");
    const ok = await softDeleteById("journey_events", id);
    if (!ok)
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
