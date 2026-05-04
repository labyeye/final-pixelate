import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Cache-Control, X-Requested-With",
};

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 200, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getDb();

    if (!body.userId || !body.url) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: CORS_HEADERS },
      );
    }

    const activity = {
      userId: body.userId,
      url: body.url,
      startTime: new Date(body.startTime),
      endTime: body.endTime ? new Date(body.endTime) : null,
      duration: body.duration || 0,
      userAgent: body.userAgent,
      referrer: body.referrer,
      createdAt: new Date(),
    };

    let result;
    if (body.type === "page_view") {
      const insertData = {
        ...activity,
        startTime: new Date(),
        lastPing: new Date(),
        duration: 0,
      };
      result = await db.collection("user_activity").insertOne(insertData);
      return NextResponse.json(
        { success: true, id: result.insertedId.toString() },
        { headers: CORS_HEADERS },
      );
    } else if (body.type === "ping" && body.id) {
      const ObjectId = require("mongodb").ObjectId;

      await db.collection("user_activity").updateOne(
        { _id: new (require("mongodb").ObjectId)(body.id) },
        {
          $set: {
            duration: body.duration,
            lastPing: new Date(),
          },
        },
      );
      return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
    }

    return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error("Tracking Error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const activities = await db
      .collection("user_activity")
      .find({})
      .sort({ createdAt: -1 })
      .limit(1000)
      .toArray();

    return NextResponse.json(activities, { headers: CORS_HEADERS });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}
