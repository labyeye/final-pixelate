import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

export async function GET(request: NextRequest) {
  try {
    const col = await svc.getCollection("socialMediaPosts");
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get("platform");
    const assignedTo = searchParams.get("assignedTo");
    const status = searchParams.get("status");
    const contentType = searchParams.get("contentType");
    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");

    const query: any = {};
    if (platform) query.platform = platform;
    if (assignedTo) query.assignedTo = assignedTo;
    if (status) query.status = status;
    if (contentType) query.contentType = contentType;
    if (fromDate || toDate) {
      query.scheduledDate = {};
      if (fromDate) query.scheduledDate.$gte = fromDate;
      if (toDate) query.scheduledDate.$lte = toDate;
    }

    const items = await col
      .find(query)
      .sort({ scheduledDate: 1, scheduledTime: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json(items, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const col = await svc.getCollection("socialMediaPosts");

    const toInsert = {
      title: body?.title || "",
      platform: body?.platform || "Instagram",
      contentType: body?.contentType || "Image Post",
      caption: body?.caption || "",
      hashtags: body?.hashtags || "",
      mediaFile: body?.mediaFile || "",
      scheduledDate: body?.scheduledDate || "",
      scheduledTime: body?.scheduledTime || "",
      assignedTo: body?.assignedTo || "",
      status: body?.status || "Draft",
      notes: body?.notes || "",
      postedLink: body?.postedLink || "",
      createdBy: body?.createdBy || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const res = await col.insertOne(toInsert);
    return NextResponse.json(
      { ...toInsert, _id: res.insertedId },
      { status: 201, headers: CORS },
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}
