import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import * as svc from "@/lib/services";
import { requireAuth } from "@/lib/require-auth";
import { ASSET_TYPES, KINDS, hashCode, newCode } from "@/lib/portal";

const col = () => svc.getCollection("portal_passes");

export async function GET(r: Request) {
  const a = requireAuth(r); if (a.error) return a.error;
  const projectId = new URL(r.url).searchParams.get("projectId");
  const q = projectId ? { projectId } : {};
  const rows = await (await col()).find(q, { projection: { codeHash: 0 } }).sort({ createdAt: -1 }).toArray();
  return NextResponse.json(rows);
}
export async function POST(r: Request) {
  const a = requireAuth(r); if (a.error) return a.error;
  const b = await r.json();
  if (!b.projectId || !KINDS.includes(b.kind)) return NextResponse.json({ error: "projectId and kind required" }, { status: 400 });
  const sections = (Array.isArray(b.sections) ? b.sections : ASSET_TYPES).filter((s: string) => ASSET_TYPES.includes(s as any));
  const days = Math.min(Math.max(Number(b.days) || 14, 1), 365);
  const code = newCode();
  await (await col()).insertOne({
    projectId: String(b.projectId), kind: b.kind, sections,
    codeHash: hashCode(code), revoked: false, selections: {}, submittedAt: null,
    expiresAt: new Date(Date.now() + days * 864e5), createdAt: new Date(),
  });
  return NextResponse.json({ code }, { status: 201 }); // shown once; only hash is stored
}
export async function DELETE(r: Request) {
  const a = requireAuth(r); if (a.error) return a.error;
  const id = new URL(r.url).searchParams.get("id");
  if (!id || !ObjectId.isValid(id)) return NextResponse.json({ error: "bad id" }, { status: 400 });
  await (await col()).updateOne({ _id: new ObjectId(id) }, { $set: { revoked: true } });
  return NextResponse.json({ ok: true });
}
