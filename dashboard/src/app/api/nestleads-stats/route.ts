import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const NESTLEADS_URL = process.env.NESTLEADS_BACKEND_URL ?? "";
const NESTLEADS_SECRET = process.env.NESTLEADS_STATS_SECRET ?? "";

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  if (!NESTLEADS_URL || !NESTLEADS_SECRET) {
    return NextResponse.json(
      { error: "Nest Leads not configured — add NESTLEADS_BACKEND_URL and NESTLEADS_STATS_SECRET to .env" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(`${NESTLEADS_URL}/internal/stats`, {
      headers: { "X-Stats-Key": NESTLEADS_SECRET },
      next: { revalidate: 60 },
    });

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(
        `Nest Leads returned non-JSON response (${res.status}): ${text.slice(0, 200)}`,
      );
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `Nest Leads stats fetch failed (${res.status})`);

    return NextResponse.json(data);
  } catch (e: any) {
    console.error("Nest Leads stats error:", e);
    return NextResponse.json(
      { error: e.message ?? "Failed to fetch Nest Leads stats" },
      { status: 500 },
    );
  }
}
