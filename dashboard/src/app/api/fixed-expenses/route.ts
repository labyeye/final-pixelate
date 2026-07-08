import { NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { requireAuth } from "@/lib/require-auth";

export async function GET(request: Request) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const col = await svc.getCollection("fixedExpenses");
    const items = await col.find().sort({ createdAt: -1 }).toArray();
    return NextResponse.json(items);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const col = await svc.getCollection("fixedExpenses");
    const doc = {
      title: body.title,
      amount: Number(body.amount || 0),
      category: body.category || "miscellaneous",
      vendor: body.vendor || "",
      paymentMethod: body.paymentMethod || "",
      note: body.note || "",
      active: true,
      payments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const res = await col.insertOne(doc);
    return NextResponse.json(
      { ...doc, _id: res.insertedId },
      { status: 201 },
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
