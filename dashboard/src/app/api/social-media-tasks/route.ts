import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { ObjectId } from "mongodb";

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
    const col = await svc.getCollection("socialMediaTasks");
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const campaign = searchParams.get("campaign") || "";
    const status = searchParams.get("status") || "";
    const assignedTo = searchParams.get("assignedTo") || "";

    const query: any = {};
    if (campaign) query.campaign = campaign;
    if (status) query.status = status;
    if (assignedTo) query.assignedTo = assignedTo;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { caption: { $regex: search, $options: "i" } },
      ];
    }

    const items = await col
      .find(query)
      .sort({ campaign: 1, scheduledDate: 1, scheduledTime: 1 })
      .toArray();

    return NextResponse.json(items, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: CORS });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (Array.isArray(body)) {
      const col = await svc.getCollection("socialMediaTasks");
      const docs = body.map((item: any) => ({
        title: item.title || "",
        scheduledDate: item.scheduledDate || "",
        scheduledTime: item.scheduledTime || "",
        platform: item.platform || "Instagram",
        contentType: item.contentType || "Image Post",
        caption: item.caption || "",
        hashtags: item.hashtags || "",
        mediaUrl: item.mediaUrl || "",
        reelVideoLink: item.reelVideoLink || "",
        campaign: item.campaign || "",
        company: item.company || "",
        assignedTo: item.assignedTo || "",
        notes: item.notes || "",
        status: item.status || "To Do",
        approvalStatus: item.approvalStatus || "Pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      const res = await col.insertMany(docs);
      return NextResponse.json({ insertedCount: res.insertedCount }, { status: 201, headers: CORS });
    }

    const col = await svc.getCollection("socialMediaTasks");
    const doc = {
      title: body.title || "",
      scheduledDate: body.scheduledDate || "",
      scheduledTime: body.scheduledTime || "",
      platform: body.platform || "Instagram",
      contentType: body.contentType || "Image Post",
      caption: body.caption || "",
      hashtags: body.hashtags || "",
      mediaUrl: body.mediaUrl || "",
      reelVideoLink: body.reelVideoLink || "",
      campaign: body.campaign || "",
      company: body.company || "",
      assignedTo: body.assignedTo || "",
      notes: body.notes || "",
      status: body.status || "To Do",
      approvalStatus: body.approvalStatus || "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const res = await col.insertOne(doc);
    return NextResponse.json({ ...doc, _id: res.insertedId }, { status: 201, headers: CORS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: CORS });
  }
}
