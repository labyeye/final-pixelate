import { NextResponse } from "next/server";
import * as svc from "@/lib/services";

/** GET /api/trash — returns all soft-deleted items across all collections */
export async function GET() {
  try {
    const col = await svc.getCollection("_trash");
    const items = await col.find({}).sort({ deletedAt: -1 }).toArray();
    return NextResponse.json(items);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
