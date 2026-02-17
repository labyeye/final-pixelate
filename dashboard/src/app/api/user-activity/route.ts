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

    // Validate
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
      duration: body.duration || 0, // in seconds
      userAgent: body.userAgent,
      referrer: body.referrer,
      createdAt: new Date(),
    };

    // If it's an update (e.g. valid activityId provided? Or just log a new event?)
    // Simpler: Just log every event. For "time spent", the client might send "heartbeats" or "exit" events.
    // Let's assume the client sends one "page_view" event initially, and then updates user's session?
    // KEEP IT SIMPLE:
    // Client sends "page_view" on load.
    // Client sends "page_leave" on unload (with duration).
    // Or client sends heartbeat.

    // User wants "how much time they were there".
    // I will log "visits".
    // If body.type === 'page_view', insert new.
    // If body.type === 'time_update', update the duration of the last visit for this user/url?
    // That requires returning an ID.

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
      // Update duration
      // Calculate duration based on Now - StartTime? No, simpler to just increment or update 'lastPing' and recalc duration.
      // Let's just update 'duration' provided by client (client calculates performance.now)
      // Or update 'lastPing' and 'duration'.

      const ObjectId = require("mongodb").ObjectId; // Import issue? relying on global or simple import
      // Better use proper import

      // Client sends duration so far.
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
