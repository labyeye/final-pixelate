import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import * as svc from "@/lib/services";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const col = await svc.getCollection("socialMediaPosts");
    const item = await col.findOne({ _id: new ObjectId(id) });
    if (!item) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404, headers: CORS },
      );
    }
    return NextResponse.json(item, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();
    const col = await svc.getCollection("socialMediaPosts");

    const updates = {
      ...body,
      updatedAt: new Date(),
    };

    const result = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates },
    );

    if (!result.matchedCount) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404, headers: CORS },
      );
    }

    const updated = await col.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(updated, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const ok = await svc.softDeleteById("socialMediaPosts", id, "Social Media Post");
    if (!ok) {
      return NextResponse.json(
        { error: "Delete failed" },
        { status: 500, headers: CORS },
      );
    }
    return NextResponse.json({ success: true }, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}
