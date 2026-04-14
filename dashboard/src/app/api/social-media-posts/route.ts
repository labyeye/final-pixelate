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
    const clientId = searchParams.get("clientId");
    const platform = searchParams.get("platform");
    const assignedTo = searchParams.get("assignedTo");
    const status = searchParams.get("status");
    const contentType = searchParams.get("contentType");
    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");

    const query: any = {};
    if (clientId) query.clientId = clientId;
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
      clientId: body?.clientId || "",
      socialAccountId: body?.socialAccountId || "",
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
      approvalStatus: body?.approvalStatus || "Pending",
      notes: body?.notes || "",
      postedLink: body?.postedLink || "",
      createdBy: body?.createdBy || "",
      views: body?.views || 0,
      likes: body?.likes || 0,
      comments: body?.comments || 0,
      shares: body?.shares || 0,
      followers_gained: body?.followers_gained || 0,
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400, headers: CORS },
      );
    }

    const col = await svc.getCollection("socialMediaPosts");
    const { ObjectId } = await import("mongodb");

    const updateData: any = {
      updatedAt: new Date(),
    };

    // Update metrics fields
    if (body.views !== undefined) updateData.views = Math.max(0, body.views);
    if (body.likes !== undefined) updateData.likes = Math.max(0, body.likes);
    if (body.comments !== undefined) updateData.comments = Math.max(0, body.comments);
    if (body.shares !== undefined) updateData.shares = Math.max(0, body.shares);
    if (body.followers_gained !== undefined) updateData.followers_gained = Math.max(0, body.followers_gained);

    // Update other fields if provided
    if (body.status !== undefined) updateData.status = body.status;
    if (body.scheduledDate !== undefined) updateData.scheduledDate = body.scheduledDate;
    if (body.scheduledTime !== undefined) updateData.scheduledTime = body.scheduledTime;
    if (body.postedLink !== undefined) updateData.postedLink = body.postedLink;

    const result = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404, headers: CORS },
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
