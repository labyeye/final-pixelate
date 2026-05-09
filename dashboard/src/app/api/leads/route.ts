import { NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { verifyToken } from "@/lib/auth";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

export async function GET(request: Request) {
  try {
    const auth = request.headers.get("authorization") || "";
    const token = auth.replace("Bearer ", "");
    const decoded: any = token ? verifyToken(token) : null;
    if (!decoded)
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: CORS,
      });

    const col = await svc.getCollection("leads");
    let items: any[];
    if (decoded.role === "admin") {
      items = await col
        .find({ clientId: { $exists: false } })
        .sort({ createdAt: -1 })
        .toArray();
    } else if (decoded.role === "client") {
      items = await col
        .find({ clientId: decoded.clientId })
        .sort({ createdAt: -1 })
        .toArray();
    } else {
      items = await col
        .find({ assignedTo: decoded.id })
        .sort({ createdAt: -1 })
        .toArray();
    }
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
    const auth = request.headers.get("authorization") || "";
    const token = auth.replace("Bearer ", "");
    if (!verifyToken(token))
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: CORS,
      });
    const body = await request.json();
    const col = await svc.getCollection("leads");
    if (Array.isArray(body)) {
      const toInsert = [] as any[];
      for (const b of body) {
        const existing = await col.findOne({
          $or: [{ phone: b.phone || null }, { email: b.email || null }],
        });
        if (!existing) toInsert.push({ ...b, createdAt: new Date() });
      }
      const res = toInsert.length
        ? await col.insertMany(toInsert)
        : { insertedCount: 0 };

      return NextResponse.json(
        { insertedCount: res.insertedCount },
        { status: 201, headers: CORS },
      );
    }

    const exists = await col.findOne({
      $or: [{ phone: body.phone || null }, { email: body.email || null }],
    });
    if (exists)
      return NextResponse.json(
        { error: "duplicate" },
        { status: 409, headers: CORS },
      );
    const res = await col.insertOne({ ...body, createdAt: new Date() });
    return NextResponse.json(
      { ...body, _id: res.insertedId },
      { status: 201, headers: CORS },
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}
