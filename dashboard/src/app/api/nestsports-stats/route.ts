import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const NESTSPORTS_URL = process.env.NESTSPORTS_BACKEND_URL ?? "";
const NESTSPORTS_SECRET = process.env.NESTSPORTS_STATS_SECRET ?? "";

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  if (!NESTSPORTS_URL || !NESTSPORTS_SECRET) {
    return NextResponse.json(
      { error: "Nest Sports not configured — add NESTSPORTS_BACKEND_URL and NESTSPORTS_STATS_SECRET to .env" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(`${NESTSPORTS_URL}/internal/stats`, {
      headers: { "X-Stats-Key": NESTSPORTS_SECRET },
      next: { revalidate: 60 },
    });

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(
        `Nest Sports returned non-JSON response (${res.status}): ${text.slice(0, 200)}`,
      );
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `Nest Sports stats fetch failed (${res.status})`);

    return NextResponse.json(data);
  } catch (e: any) {
    console.error("Nest Sports stats error:", e);
    return NextResponse.json(
      { error: e.message ?? "Failed to fetch Nest Sports stats" },
      { status: 500 },
    );
  }
}
