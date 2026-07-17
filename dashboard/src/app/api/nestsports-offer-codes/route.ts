import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const NESTSPORTS_URL = process.env.NESTSPORTS_BACKEND_URL ?? "";
const NESTSPORTS_SECRET =
  process.env.NESTSPORTS_CRM_SECRET ?? process.env.NESTSPORTS_STATS_SECRET ?? "";

function unconfigured() {
  return NextResponse.json(
    { error: "Not configured — add NESTSPORTS_BACKEND_URL and NESTSPORTS_CRM_SECRET to .env" },
    { status: 503 },
  );
}

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  if (!NESTSPORTS_URL || !NESTSPORTS_SECRET) return unconfigured();

  try {
    const res = await fetch(`${NESTSPORTS_URL}/api/crm/offers`, {
      headers: { "x-api-key": NESTSPORTS_SECRET },
      next: { revalidate: 0 },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `Failed to fetch coupons (${res.status})`);
    return NextResponse.json(data);
  } catch (e: any) {
    console.error("Nest Sports offer-codes fetch error:", e);
    return NextResponse.json({ error: e.message ?? "Failed to fetch coupons" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  if (!NESTSPORTS_URL || !NESTSPORTS_SECRET) return unconfigured();

  try {
    const body = await request.json();
    const res = await fetch(`${NESTSPORTS_URL}/api/crm/offers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": NESTSPORTS_SECRET,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `Failed to create coupon (${res.status})`);
    return NextResponse.json(data, { status: res.status });
  } catch (e: any) {
    console.error("Nest Sports offer-code create error:", e);
    return NextResponse.json({ error: e.message ?? "Failed to create coupon" }, { status: 500 });
  }
}
