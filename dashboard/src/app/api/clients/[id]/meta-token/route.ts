import { NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { verifyToken } from "@/lib/auth";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}


export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const col = await svc.getCollection("clients");
  const { ObjectId } = await import("mongodb");
  const client = await col.findOne({ _id: new ObjectId(id) });
  if (!client)
    return NextResponse.json(
      { error: "Not found" },
      { status: 404, headers: CORS },
    );

  return NextResponse.json(
    { hasToken: !!client.metaAccessToken },
    { headers: CORS },
  );
}


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = request.headers.get("authorization") || "";
    const jwt = auth.replace("Bearer ", "");
    const decoded: any = verifyToken(jwt);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403, headers: CORS },
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { metaAccessToken } = body;

    const col = await svc.getCollection("clients");
    const { ObjectId } = await import("mongodb");

    await col.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          metaAccessToken: metaAccessToken || null,
          updatedAt: new Date(),
        },
      },
    );

    return NextResponse.json({ success: true }, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}
