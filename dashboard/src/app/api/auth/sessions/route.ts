import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { getDb } from "@/lib/mongodb";
import { revokeSessions, audit, clientInfo } from "@/lib/security";

// Active sign-ins for the current user.
//   GET                 -> list (current one flagged)
//   DELETE ?id=<sid>    -> sign that device out
//   DELETE ?all=1       -> sign out everywhere except this device
export async function GET(request: NextRequest) {
  const a = requireAuth(request);
  if (a.error) return a.error;
  const d = a.decoded as any;
  const rows = await (await getDb()).collection("auth_sessions")
    .find({ userId: String(d.id), revoked: { $ne: true }, exp: { $gt: new Date() } }, { projection: { _id: 0, sid: 1, ip: 1, ua: 1, method: 1, createdAt: 1 } })
    .sort({ createdAt: -1 }).limit(50).toArray();
  return NextResponse.json({ sessions: rows.map((r: any) => ({ ...r, current: r.sid === d.sid })), tracked: !!d.sid });
}

export async function DELETE(request: NextRequest) {
  const a = requireAuth(request);
  if (a.error) return a.error;
  const d = a.decoded as any;
  const sp = new URL(request.url).searchParams;
  const n = sp.get("all")
    ? await revokeSessions(d.id, { exceptSid: d.sid })
    : sp.get("id") ? await revokeSessions(d.id, { sid: sp.get("id")! }) : 0;
  await audit("session_revoked", d.email, sp.get("all") ? "Signed out all other devices" : "Signed out a device", { ...clientInfo(request), count: n });
  return NextResponse.json({ ok: true, revoked: n });
}
