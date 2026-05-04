import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await req.json();
    const db = await getDb();

    const userId = req.nextUrl.searchParams.get("userId");

    const task = await db
      .collection("tasks")
      .findOne({ _id: new ObjectId(id) });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    if (userId && String(task.assigneeId) !== String(userId)) {
      return NextResponse.json(
        { error: "You can only update your own tasks" },
        { status: 403 },
      );
    }

    const updateData = {
      ...body,
      updatedAt: new Date(),
    };
    delete updateData._id;
    delete updateData.id;

    const result = await db
      .collection("tasks")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: "after" },
      );

    if (!result) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ ...result, id: result._id.toString() });
  } catch (error) {
    console.error("Failed to update task", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const { softDeleteById } = await import("@/lib/services");
    const ok = await softDeleteById("tasks", id);
    if (!ok)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete task", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 },
    );
  }
}
