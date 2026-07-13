import { NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { requireAuth } from "@/lib/require-auth";

export async function GET(request: Request) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const col = await svc.getCollection("campaigns");
    const campaigns = await col.find().sort({ createdAt: -1 }).toArray();
    const out = campaigns.map((c: any) => ({ ...c, _id: String(c._id) }));
    return NextResponse.json(out);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
