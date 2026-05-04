import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Task } from "@/lib/task-models";

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();

    const userId = req.nextUrl.searchParams.get("userId");

    const query = userId ? { assigneeId: userId } : {};

    const tasks = await db
      .collection("tasks")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    const mappedTasks = tasks.map((t) => ({
      ...t,
      id: t._id.toString(),
    }));

    return NextResponse.json(mappedTasks);
  } catch (error) {
    console.error("Failed to fetch tasks", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getDb();

    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newTask: Omit<Task, "id" | "_id"> = {
      title: body.title,
      description: body.description || "",
      status: body.status || "not-started",
      priority: body.priority || "medium",
      projectId: body.projectId || null,
      projectTitle: body.projectTitle || null,
      assigneeId: body.assigneeId || null,
      assigneeName: body.assigneeName || null,
      assigneeAvatar: body.assigneeAvatar || null,
      dueDate: body.dueDate || null,
      tags: body.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("tasks").insertOne(newTask);

    return NextResponse.json(
      {
        ...newTask,
        id: result.insertedId.toString(),
        _id: result.insertedId,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create task", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}
