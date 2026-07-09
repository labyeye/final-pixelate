import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { requireAuth } from "@/lib/require-auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = requireAuth(req);
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
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

    const { remark, byId, byName, logUpdate, isFullEdit, requesterId, ...rest } =
      body;

    if (
      isFullEdit &&
      task.createdBy &&
      String(task.createdBy) !== String(requesterId)
    ) {
      return NextResponse.json(
        { error: "Only the task owner can edit this task" },
        { status: 403 },
      );
    }

    const updateData: any = {
      ...rest,
      updatedAt: new Date(),
    };
    delete updateData._id;
    delete updateData.id;

    const updateOps: any = { $set: updateData };

    if (logUpdate || remark) {
      updateOps.$push = {
        updates: {
          id: new ObjectId().toString(),
          status: updateData.status ?? task.status,
          remark: remark || "",
          completedLink: updateData.completedLink || null,
          byId: byId ?? userId ?? null,
          byName: byName ?? null,
          at: new Date(),
        },
      };
    }

    const result = await db
      .collection("tasks")
      .findOneAndUpdate({ _id: new ObjectId(id) }, updateOps, {
        returnDocument: "after",
      });

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
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = requireAuth(req);
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
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
