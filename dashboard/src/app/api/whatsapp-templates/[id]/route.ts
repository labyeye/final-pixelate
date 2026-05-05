import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const COLLECTION = "whatsapp_templates";

function toObjectId(id: string) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

// ── PATCH — update a template ──
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const oid = toObjectId(id);
    if (!oid) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

    const body = await req.json();
    const db = await getDb();

    const allowedFields = [
      "name", "category", "language", "headerType", "headerText",
      "headerMediaHandle", "headerMediaName",
      "body", "footer", "buttons", "variables", "exampleValues", "notes",
      "status", "metaTemplateId", "submittedAt", "approvedAt", "rejectedReason",
    ];

    const update: Record<string, any> = { updatedAt: new Date() };
    for (const field of allowedFields) {
      if (field in body) update[field] = body[field];
    }

    const result = await db
      .collection(COLLECTION)
      .findOneAndUpdate(
        { _id: oid },
        { $set: update },
        { returnDocument: "after" },
      );

    if (!result) {
      return NextResponse.json({ error: "Template not found." }, { status: 404 });
    }

    return NextResponse.json({ ...result, _id: result._id.toString() });
  } catch (err: any) {
    console.error("[whatsapp-templates PATCH]", err);
    return NextResponse.json({ error: "Failed to update template." }, { status: 500 });
  }
}

// ── DELETE — remove a template ──
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const oid = toObjectId(id);
    if (!oid) return NextResponse.json({ error: "Invalid id." }, { status: 400 });

    const db = await getDb();
    const result = await db.collection(COLLECTION).deleteOne({ _id: oid });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Template not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[whatsapp-templates DELETE]", err);
    return NextResponse.json({ error: "Failed to delete template." }, { status: 500 });
  }
}
