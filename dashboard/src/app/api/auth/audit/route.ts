import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { getDb } from "@/lib/mongodb";

// Admin-only sign-in audit: logins, failures, locks, resets, 2FA/passkey changes.
const TYPES = ["login", "login_failed", "account_locked", "account_unlocked", "password_reset", "session_revoked", "2fa_enabled", "2fa_disabled", "passkey_added", "passkey_removed"];
export async function GET(request: NextRequest) {
  const a = requireAuth(request);
  if (a.error) return a.error;
  if ((a.decoded as any).role !== "admin") return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const sp = new URL(request.url).searchParams;
  const q: any = { type: { $in: sp.get("type") && TYPES.includes(sp.get("type")!) ? [sp.get("type")] : TYPES } };
  if (sp.get("email")) q.email = { $regex: sp.get("email")!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
  const rows = await (await getDb()).collection("erp_events").find(q, { projection: { type: 1, email: 1, details: 1, createdAt: 1 } })
    .sort({ createdAt: -1 }).limit(Math.min(parseInt(sp.get("limit") || "200") || 200, 500)).toArray();
  return NextResponse.json({ events: rows.map((r: any) => ({ id: String(r._id), type: r.type, email: r.email, message: r.details?.message, ip: r.details?.ip, ua: r.details?.ua, at: r.createdAt })) });
}
