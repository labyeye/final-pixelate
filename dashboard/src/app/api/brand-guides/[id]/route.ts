import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { unlink } from "fs/promises";
import { join } from "path";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

function resolveId(id: string) {
  try {
    return ObjectId.isValid(id) && id.length === 24
      ? { _id: new ObjectId(id) }
      : { _id: id as any };
  } catch {
    return { _id: id as any };
  }
}

async function deleteFile(pdfUrl: string | undefined) {
  if (!pdfUrl || !pdfUrl.startsWith("/uploads/brand-guides/")) return;
  try {
    const filePath = join(process.cwd(), "public", pdfUrl);
    await unlink(filePath);
  } catch {
    // file already gone — ignore
  }
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await getDb();
    const doc = await db.collection("brand_guides").findOne(resolveId(id));
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404, headers: CORS });
    return NextResponse.json(doc, { headers: CORS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await getDb();
    const body = await req.json();
    const { _id, ...update } = body;

    const existing = await db.collection("brand_guides").findOne(resolveId(id));
    if (existing?.pdfUrl && update.pdfUrl && existing.pdfUrl !== update.pdfUrl) {
      await deleteFile(existing.pdfUrl);
    }

    await db.collection("brand_guides").updateOne(resolveId(id), {
      $set: { ...update, updatedAt: new Date() },
    });

    return NextResponse.json({ success: true }, { headers: CORS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await getDb();
    const existing = await db.collection("brand_guides").findOne(resolveId(id));
    await deleteFile(existing?.pdfUrl);
    await db.collection("brand_guides").deleteOne(resolveId(id));
    return NextResponse.json({ success: true }, { headers: CORS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS });
  }
}
