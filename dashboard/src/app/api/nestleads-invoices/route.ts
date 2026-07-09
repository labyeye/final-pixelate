import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const NESTLEADS_URL = process.env.NESTLEADS_BACKEND_URL ?? "";
const NESTLEADS_SECRET =
  process.env.NESTLEADS_CRM_SECRET ?? process.env.NESTLEADS_STATS_SECRET ?? "";

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  if (!NESTLEADS_URL || !NESTLEADS_SECRET) {
    return NextResponse.json(
      { error: "Nest Leads not configured — add NESTLEADS_BACKEND_URL and NESTLEADS_CRM_SECRET to .env" },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const upstream = new URL(`${NESTLEADS_URL}/api/crm/invoices`);
  if (status) upstream.searchParams.set("status", status);

  try {
    const res = await fetch(upstream.toString(), {
      headers: { "x-api-key": NESTLEADS_SECRET },
      next: { revalidate: 0 },
    });

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(
        `Nest Leads returned non-JSON response (${res.status}): ${text.slice(0, 200)}`,
      );
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `Nest Leads invoices fetch failed (${res.status})`);

    return NextResponse.json(data);
  } catch (e: any) {
    console.error("Nest Leads invoices error:", e);
    return NextResponse.json(
      { error: e.message ?? "Failed to fetch Nest Leads invoices" },
      { status: 500 },
    );
  }
}
