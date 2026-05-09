import { NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { verifyToken } from "@/lib/auth";
import { ObjectId } from "mongodb";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const item = await svc.findById("leads", params.id);
    return NextResponse.json(item, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const auth = request.headers.get("authorization") || "";
    const token = auth.replace("Bearer ", "");
    if (!verifyToken(token))
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: CORS,
      });
    const body = await request.json();
    const { status: newStatus, ...rest } = body;

    const col = await svc.getCollection("leads");
    const hex24 = /^[a-fA-F0-9]{24}$/.test(params.id);
    const filter = hex24 ? { _id: new ObjectId(params.id) } : { id: params.id };

    const existing = await col.findOne(filter);
    const setDoc: Record<string, any> = { ...rest, updatedAt: new Date() };
    const pushDoc: Record<string, any> = {};

    if (newStatus !== undefined) {
      setDoc.status = newStatus;
      if (existing?.status !== newStatus) {
        pushDoc.statusHistory = {
          from: existing?.status ?? "not called",
          to: newStatus,
          changedAt: new Date(),
        };
      }
    }

    const mongoUpdate: Record<string, any> = { $set: setDoc };
    if (Object.keys(pushDoc).length) mongoUpdate.$push = pushDoc;

    await col.updateOne(filter, mongoUpdate);
    const updated = await col.findOne(filter);
    return NextResponse.json(updated, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const auth = request.headers.get("authorization") || "";
    const token = auth.replace("Bearer ", "");
    const decoded: any = verifyToken(token);
    if (!decoded)
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: CORS,
      });

    if (decoded.role !== "admin")
      return new Response(JSON.stringify({ error: "forbidden" }), {
        status: 403,
        headers: CORS,
      });
    const ok = await svc.deleteById("leads", params.id);
    return NextResponse.json({ deleted: ok }, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}
