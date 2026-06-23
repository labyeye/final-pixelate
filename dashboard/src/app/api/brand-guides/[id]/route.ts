import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

function resolveId(id: string) {
  try {
    return ObjectId.isValid(id) && id.length === 24
      ? { _id: new ObjectId(id) }
      : { _id: id as any };
  } catch {
    return { _id: id as any };
  }
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDb();
    const doc = await db.collection("brand_guides").findOne(resolveId(params.id));
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404, headers: CORS });
    return NextResponse.json(doc, { headers: CORS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDb();
    const body = await req.json();
    const { _id, ...update } = body;

    await db.collection("brand_guides").updateOne(resolveId(params.id), {
      $set: { ...update, updatedAt: new Date() },
    });

    return NextResponse.json({ success: true }, { headers: CORS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = await getDb();
    await db.collection("brand_guides").deleteOne(resolveId(params.id));
    return NextResponse.json({ success: true }, { headers: CORS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS });
  }
}
