import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("clientId");

    const filter: Record<string, any> = {};
    if (clientId) filter.clientId = clientId;

    const guides = await db
      .collection("brand_guides")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(guides, { headers: CORS });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const body = await req.json();

    const {
      clientId,
      clientName,
      brandName,
      primaryColors,
      secondaryColors,
      fonts,
      brandVoice,
      logoUrl,
      pdfUrl,
      pdfBase64,
      notes,
    } = body;

    if (!clientId || !clientName) {
      return NextResponse.json(
        { error: "clientId and clientName are required" },
        { status: 400, headers: CORS },
      );
    }

    const doc = {
      clientId,
      clientName,
      brandName: brandName || clientName,
      primaryColors: primaryColors || [],
      secondaryColors: secondaryColors || [],
      fonts: fonts || [],
      brandVoice: brandVoice || "",
      logoUrl: logoUrl || "",
      pdfUrl: pdfUrl || "",
      pdfBase64: pdfBase64 || "",
      notes: notes || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("brand_guides").insertOne(doc);
    return NextResponse.json(
      { success: true, id: result.insertedId, ...doc },
      { status: 201, headers: CORS },
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: CORS });
  }
}
