import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { deletable, preview, softDelete, hardDelete, restore, listScheduled, purgeDue } from "@/lib/account-delete";

// Admin-only (same rule as /db-manager).
//   GET  ?product=hrms[&id=…]  -> scheduled deletions (and, with id, a dry-run of what would be removed)
//   POST { action: "soft"|"hard"|"restore", product, id, confirm }
function guard(request: Request) {
  const auth = requireAuth(request);
  if (auth.error) return { error: auth.error };
  if ((auth.decoded as any).role !== "admin") return { error: NextResponse.json({ error: "forbidden" }, { status: 403 }) };
  const d = auth.decoded as any;
  return { who: String(d.email ?? d.id ?? "admin") };
}
const fail = (e: any) => NextResponse.json({ error: e.message ?? "failed" }, { status: 400 });

export async function GET(request: NextRequest) {
  const g = guard(request);
  if (g.error) return g.error;
  const sp = new URL(request.url).searchParams;
  const product = sp.get("product") ?? "";
  try {
    if (product && !deletable(product)) return NextResponse.json({ enabled: false, scheduled: [] });
    await purgeDue().catch(() => {});
    const id = sp.get("id");
    return NextResponse.json({ enabled: true, scheduled: await listScheduled(product || undefined), ...(id ? { preview: await preview(product, id) } : {}) });
  } catch (e) { return fail(e); }
}

export async function POST(request: NextRequest) {
  const g = guard(request);
  if (g.error) return g.error;
  try {
    const b = await request.json();
    if (!deletable(b.product)) throw new Error("Delete is not enabled for this product yet");
    if (b.action === "soft") return NextResponse.json({ ok: true, ...(await softDelete(b.product, b.id, String(b.confirm ?? ""), g.who!)) });
    if (b.action === "hard") return NextResponse.json({ ok: true, ...(await hardDelete(b.product, b.id, String(b.confirm ?? ""), g.who!)) });
    if (b.action === "restore") { await restore(b.product, b.id, g.who!); return NextResponse.json({ ok: true }); }
    throw new Error("Unknown action");
  } catch (e) { return fail(e); }
}
