import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { productConfig, backendRoot } from "@/lib/product-config";

// GET /api/product-metrics?product=hrms|leads|play|gym|care&platform=web|app
export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  const { searchParams } = new URL(request.url);
  const p = productConfig(searchParams.get("product") ?? "");
  const platform = searchParams.get("platform") === "app" ? "app" : "web";
  if (!p) return NextResponse.json({ success: false, error: "Unknown product" }, { status: 400 });
  if (!p.url || !p.secret)
    return NextResponse.json({ success: false, error: `Not configured: add ${p.envHint} to .env` }, { status: 503 });

  try {
    const res = await fetch(`${backendRoot(p.url)}/api/crm/metrics?platform=${platform}`, {
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
