import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const COLLECTION = "whatsapp_templates";


export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    const query: Record<string, string> = {};
    if (category && category !== "all") query.category = category;
    if (status && status !== "all") query.status = status;

    const templates = await db
      .collection(COLLECTION)
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    
    const serialized = templates.map((t) => ({
      ...t,
      _id: t._id.toString(),
    }));

    return NextResponse.json(serialized);
  } catch (err: any) {
    console.error("[whatsapp-templates GET]", err);
    return NextResponse.json(
      { error: "Failed to fetch templates." },
      { status: 500 },
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      category,
      language,
      headerType,
      headerText,
      body: bodyText,
      footer,
      buttons,
      variables,
      exampleValues,
      notes,
    } = body;

    if (!name || !category || !bodyText) {
      return NextResponse.json(
        { error: "name, category, and body are required." },
        { status: 400 },
      );
    }

    const db = await getDb();

    
    const existing = await db.collection(COLLECTION).findOne({ name });
    if (existing) {
      return NextResponse.json(
        { error: `A template named "${name}" already exists.` },
        { status: 409 },
      );
    }

    const now = new Date();
    const doc = {
      name: String(name).trim(),
      category: String(category),
      language: String(language || "en_US"),
      headerType: headerType || "NONE",
      headerText: headerText ? String(headerText) : null,
      body: String(bodyText),
      footer: footer ? String(footer) : null,
      buttons: Array.isArray(buttons) ? buttons : [],
      variables: Array.isArray(variables) ? variables : [],
      exampleValues: Array.isArray(exampleValues) ? exampleValues : [],
      notes: notes ? String(notes) : null,
      status: "LOCAL", 
      metaTemplateId: null,
      submittedAt: null,
      approvedAt: null,
      rejectedReason: null,
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection(COLLECTION).insertOne(doc);
    return NextResponse.json(
      { ...doc, _id: result.insertedId.toString() },
      { status: 201 },
    );
  } catch (err: any) {
    console.error("[whatsapp-templates POST]", err);
    return NextResponse.json(
      { error: "Failed to create template." },
      { status: 500 },
    );
  }
}
