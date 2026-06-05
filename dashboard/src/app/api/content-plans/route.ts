import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/services";
import { ObjectId } from "mongodb";
import { requireAuth } from "@/lib/require-auth";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth.error) return auth.error;
  try {
    const col = await getCollection("content_plans");
    const { searchParams } = new URL(req.url);
    const assignedTo = searchParams.get("assignedTo");
    const company = searchParams.get("company");

    const filter: Record<string, any> = {};
    if (assignedTo) filter.assigned_to = assignedTo;
    if (company) filter.company = company;

    const items = await col.find(filter).sort({ week_number: 1, day_number: 1 }).toArray();
    return NextResponse.json(items);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth.error) return auth.error;
  try {
    const body = await req.json();
    const col = await getCollection("content_plans");
    const now = new Date();
    const doc = {
      week_number: body.week_number || 1,
      day_number: body.day_number || 1,
      day_name: body.day_name || "",
      post_date: body.post_date || "",
      account: body.account || "",
      post_type: body.post_type || "Image Post",
      title: body.title || "",
      subtitle: body.subtitle || "",
      product_image_note: body.product_image_note || "",
      price_tag: body.price_tag || "",
      cta_button: body.cta_button || "",
      emotional_touch: body.emotional_touch || "",
      sound_note: body.sound_note || "",
      caption: body.caption || "",
      hashtags: body.hashtags || "",
      reel_brief: body.reel_brief || "",
      ad_brief: body.ad_brief || "",
      status: body.status || "To Do",
      assigned_to: body.assigned_to || "",
      company: body.company || "",
      created_by: body.created_by || "",
      created_at: now,
      updated_at: now,
    };
    const result = await col.insertOne(doc);
    return NextResponse.json({ ...doc, _id: result.insertedId }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
