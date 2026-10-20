import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

// Each product backend serves GET /api/crm/metrics (see its utils/telemetry.js), guarded by its own CRM secret.
const PRODUCTS: Record<string, { url?: string; secret?: string; envHint: string }> = {
  hrms: { url: process.env.NESTHR_BACKEND_URL, secret: process.env.CRM_API_SECRET, envHint: "NESTHR_BACKEND_URL, CRM_API_SECRET" },
  leads: { url: process.env.NESTLEADS_BACKEND_URL, secret: process.env.NESTLEADS_CRM_SECRET ?? process.env.NESTLEADS_SECRET, envHint: "NESTLEADS_BACKEND_URL, NESTLEADS_CRM_SECRET" },
  play: { url: process.env.NESTPLAY_BACKEND_URL, secret: process.env.NESTPLAY_CRM_SECRET ?? process.env.NESTPLAY_STATS_SECRET, envHint: "NESTPLAY_BACKEND_URL, NESTPLAY_CRM_SECRET" },
  gym: { url: process.env.NESTGYM_BACKEND_URL, secret: process.env.NESTGYM_CRM_SECRET, envHint: "NESTGYM_BACKEND_URL, NESTGYM_CRM_SECRET" },
};

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  const { searchParams } = new URL(request.url);
  const p = PRODUCTS[searchParams.get("product") ?? ""];
  const platform = searchParams.get("platform") === "app" ? "app" : "web";
  if (!p) return NextResponse.json({ success: false, error: "Unknown product" }, { status: 400 });
  if (!p.url || !p.secret)
    return NextResponse.json({ success: false, error: `Not configured: add ${p.envHint} to .env` }, { status: 503 });

  try {
    const res = await fetch(`${p.url.replace(/\/$/, "").replace(/\/api$/, "")}/api/crm/metrics?platform=${platform}`, {
      headers: { "x-api-key": p.secret },
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data) throw new Error(data?.message ?? `Backend returned ${res.status} (is the latest backend deployed?)`);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message ?? "Failed to load metrics" }, { status: 502 });
  }
}
