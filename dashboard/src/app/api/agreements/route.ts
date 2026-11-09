import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { requireAuth } from "@/lib/require-auth";
import { formatAgreementNo } from "@/lib/agreement-pdf";

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  const db = await getDb();
  const items = await db.collection("agreements").find({}).sort({ seq: -1 }).toArray();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    if (!body.name?.trim() || !body.role?.trim() || !body.date) {
      return NextResponse.json({ error: "name, role and date are required" }, { status: 400 });
    }
    const db = await getDb();
    // Atomic, gap-free-on-success sequence: KTSLLP/AGREEMENT/0001, 0002, ...
    const counter = await db
      .collection<{ _id: string; seq: number }>("counters")
      .findOneAndUpdate(
        { _id: "agreement" },
        { $inc: { seq: 1 } },
        { upsert: true, returnDocument: "after" },
      );
    const seq = (counter as any)?.seq ?? (counter as any)?.value?.seq;
    const doc = {
      seq,
      agreementNo: formatAgreementNo(seq),
      name: body.name.trim(),
      role: body.role.trim(),
      date: body.date,
      deliverables: body.deliverables || "",
      responsibilities: body.responsibilities || "",
      startDate: body.startDate || "",
      endDate: body.endDate || "",
      compensation: body.compensation || "",
      paymentTerms: body.paymentTerms || "",
      createdAt: new Date(),
    };
    const res = await db.collection("agreements").insertOne(doc);
    return NextResponse.json({ ...doc, _id: res.insertedId }, { status: 201 });
  } catch (e: any) {
    console.error("Create agreement failed:", e);
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
