import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const NESTSPORTS_URL = process.env.NESTSPORTS_BACKEND_URL ?? "";
const NESTSPORTS_SECRET =
  process.env.NESTSPORTS_CRM_SECRET ?? process.env.NESTSPORTS_STATS_SECRET ?? "";

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  if (!NESTSPORTS_URL || !NESTSPORTS_SECRET) {
    return NextResponse.json(
      { error: "Nest Sports not configured — add NESTSPORTS_BACKEND_URL and NESTSPORTS_CRM_SECRET to .env" },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const upstream = new URL(`${NESTSPORTS_URL}/api/crm/invoices`);
  if (status) upstream.searchParams.set("status", status);

  try {
    const res = await fetch(upstream.toString(), {
      headers: { "x-api-key": NESTSPORTS_SECRET },
      next: { revalidate: 0 },
    });

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(
        `Nest Sports returned non-JSON response (${res.status}): ${text.slice(0, 200)}`,
      );
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `Nest Sports invoices fetch failed (${res.status})`);

    return NextResponse.json(data);
  } catch (e: any) {
    console.error("Nest Sports invoices error:", e);
    return NextResponse.json(
      { error: e.message ?? "Failed to fetch Nest Sports invoices" },
      { status: 500 },
    );
  }
}
