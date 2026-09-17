import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const NESTLEADS_URL = process.env.NESTLEADS_BACKEND_URL ?? "";
const NESTLEADS_SECRET =
  process.env.NESTLEADS_CRM_SECRET ?? process.env.NESTLEADS_STATS_SECRET ?? "";

function unconfigured() {
  return NextResponse.json(
    { error: "Nest Leads not configured — add NESTLEADS_BACKEND_URL and NESTLEADS_STATS_SECRET to .env" },
    { status: 503 },
  );
}

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  if (!NESTLEADS_URL || !NESTLEADS_SECRET) return unconfigured();

  try {
    const res = await fetch(`${NESTLEADS_URL}/api/crm/offers`, {
      headers: { "x-api-key": NESTLEADS_SECRET },
      next: { revalidate: 0 },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `Failed to fetch offers (${res.status})`);
    return NextResponse.json(data);
  } catch (e: any) {
    console.error("Nest Leads offers fetch error:", e);
    return NextResponse.json({ error: e.message ?? "Failed to fetch offers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  if (!NESTLEADS_URL || !NESTLEADS_SECRET) return unconfigured();

  try {
    const body = await request.json();
    const res = await fetch(`${NESTLEADS_URL}/api/crm/offers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": NESTLEADS_SECRET,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `Failed to create offer (${res.status})`);
    return NextResponse.json(data, { status: res.status });
  } catch (e: any) {
    console.error("Nest Leads offer create error:", e);
    return NextResponse.json({ error: e.message ?? "Failed to create offer" }, { status: 500 });
  }
}
