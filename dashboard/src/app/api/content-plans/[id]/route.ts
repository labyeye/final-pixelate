import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/services";
import { ObjectId } from "mongodb";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const col = await getCollection("content_plans");
    const body = await req.json();
    const { id } = params;

    const update: Record<string, any> = { updated_at: new Date() };

    // Staff can only update status; admin can update any field
    const allowedFields = [
      "week_number", "day_number", "day_name", "post_date", "account",
      "post_type", "title", "subtitle", "product_image_note", "price_tag",
      "cta_button", "emotional_touch", "sound_note", "caption", "hashtags",
      "reel_brief", "ad_brief", "status", "assigned_to", "company",
    ];

    const fieldsToUpdate = body.staffOnly
      ? ["status"]
      : allowedFields;

    for (const field of fieldsToUpdate) {
      if (field in body) update[field] = body[field];
    }

    const result = await col.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const col = await getCollection("content_plans");
    await col.deleteOne({ _id: new ObjectId(params.id) });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
