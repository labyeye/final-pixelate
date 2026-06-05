import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { requireAuth } from "@/lib/require-auth";

const CORS = { "Access-Control-Allow-Origin": "*" };

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth.error) return auth.error;
  try {
    const body = await req.json();
    const db = await getDb();

    const ev = {
      type: body.type || "event",
      userId: body.userId || null,
      email: body.email || null,
      target: body.target || null,
      details: body.details || null,
      createdAt: new Date(),
    };

    const res = await db.collection("erp_events").insertOne(ev);
    return NextResponse.json(
      { success: true, id: res.insertedId.toString() },
      { headers: CORS },
    );
  } catch (e) {
    console.error("ERP event logging error", e);
    return NextResponse.json(
      { error: "failed" },
      { status: 500, headers: CORS },
    );
  }
}

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const db = await getDb();
    const events = await db
      .collection("erp_events")
      .find({})
      .sort({ createdAt: -1 })
      .limit(1000)
      .toArray();
    return NextResponse.json(events, { headers: CORS });
  } catch (e) {
    console.error("Failed to fetch erp events", e);
    return NextResponse.json(
      { error: "failed" },
      { status: 500, headers: CORS },
    );
  }
}
