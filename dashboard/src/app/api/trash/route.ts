import { NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { requireAuth } from "@/lib/require-auth";

export async function GET(request: Request) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const col = await svc.getCollection("_trash");
    const items = await col.find({}).sort({ deletedAt: -1 }).toArray();
    return NextResponse.json(items);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
