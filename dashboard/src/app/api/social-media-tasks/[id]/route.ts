import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { ObjectId } from "mongodb";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

type RouteContext = { params: Promise<{ id: string }> };

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();
    const col = await svc.getCollection("socialMediaTasks");
    const { _id, createdAt, ...rest } = body;
    await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...rest, updatedAt: new Date() } },
    );
    return NextResponse.json({ success: true }, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: CORS });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const col = await svc.getCollection("socialMediaTasks");
    await col.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true }, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: CORS });
  }
}
