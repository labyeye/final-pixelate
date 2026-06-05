import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { requireAuth } from "@/lib/require-auth";

export async function GET(request: Request) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");

    if (!clientId) {
      return NextResponse.json(
        { error: "clientId query param is required" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const filter: Record<string, any> = (() => {
      try {
        return {
          $or: [{ clientId }, { clientId: new ObjectId(clientId) }],
        };
      } catch {
        return { clientId };
      }
    })();

    const events = await db
      .collection("journey_events")
      .find(filter)
      .sort({ occurredAt: 1 })
      .toArray();

    return NextResponse.json(events);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const body = await request.json();

    const {
      clientId,
      clientName,
      projectId,
      projectName,
      type,
      title,
      description,
      performedBy,
      status,
      fileUrl,
      linkUrl,
      occurredAt,
      metadata,
    } = body;

    if (!clientId || !type || !title) {
      return NextResponse.json(
        { error: "clientId, type, and title are required" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const doc = {
      clientId,
      clientName: clientName ?? "",
      projectId: projectId ?? null,
      projectName: projectName ?? null,
      type,
      title,
      description: description ?? "",
      performedBy: performedBy ?? "System",
      status: status ?? null,
      fileUrl: fileUrl ?? null,
      linkUrl: linkUrl ?? null,
      occurredAt: occurredAt ? new Date(occurredAt) : new Date(),
      metadata: metadata ?? {},
      createdAt: new Date(),
    };

    const result = await db.collection("journey_events").insertOne(doc);
    return NextResponse.json(
      { ...doc, _id: result.insertedId },
      { status: 201 },
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
