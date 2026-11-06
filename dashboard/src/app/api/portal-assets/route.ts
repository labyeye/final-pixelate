import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import * as svc from "@/lib/services";
import { requireAuth } from "@/lib/require-auth";
import { ASSET_TYPES, KINDS } from "@/lib/portal";

const col = () => svc.getCollection("portal_assets");

function clean(b: any) {
  if (!ASSET_TYPES.includes(b.type) || !String(b.name || "").trim()) return null;
  return {
    type: b.type,
    name: String(b.name).trim().slice(0, 80),
    kinds: (Array.isArray(b.kinds) ? b.kinds : []).filter((k: string) => KINDS.includes(k as any)),
    preview: String(b.preview || "").slice(0, 500), // image url / font family / hex list "#111,#c9a24b"
    code: String(b.code || "").slice(0, 100_000), // admin only, never sent to clients
  };
}

export async function GET(r: Request) {
  const a = requireAuth(r); if (a.error) return a.error;
  return NextResponse.json(await (await col()).find().sort({ createdAt: -1 }).toArray());
}
export async function POST(r: Request) {
  const a = requireAuth(r); if (a.error) return a.error;
  const d = clean(await r.json());
  if (!d) return NextResponse.json({ error: "type and name required" }, { status: 400 });
  const res = await (await col()).insertOne({ ...d, createdAt: new Date() });
  return NextResponse.json({ ...d, _id: res.insertedId }, { status: 201 });
}
export async function PUT(r: Request) {
  const a = requireAuth(r); if (a.error) return a.error;
  const id = new URL(r.url).searchParams.get("id");
  const d = clean(await r.json());
  if (!id || !ObjectId.isValid(id) || !d) return NextResponse.json({ error: "bad request" }, { status: 400 });
  await (await col()).updateOne({ _id: new ObjectId(id) }, { $set: d });
  return NextResponse.json({ ok: true });
}
export async function DELETE(r: Request) {
  const a = requireAuth(r); if (a.error) return a.error;
  const id = new URL(r.url).searchParams.get("id");
  if (!id || !ObjectId.isValid(id)) return NextResponse.json({ error: "bad id" }, { status: 400 });
  await (await col()).deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}
