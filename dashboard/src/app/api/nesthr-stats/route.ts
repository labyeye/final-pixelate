import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const NESTHR_URL = process.env.NESTHR_BACKEND_URL ?? "";
const NESTHR_SECRET = process.env.NESTHR_STATS_SECRET ?? "";

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  if (!NESTHR_URL || !NESTHR_SECRET) {
    return NextResponse.json(
      { error: "NestHR not configured — add NESTHR_BACKEND_URL and NESTHR_STATS_SECRET to .env" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(`${NESTHR_URL}/internal/stats`, {
      headers: { "X-Stats-Key": NESTHR_SECRET },
      next: { revalidate: 60 },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? "NestHR stats fetch failed");

    return NextResponse.json(data);
  } catch (e: any) {
    console.error("NestHR stats error:", e);
    return NextResponse.json(
      { error: e.message ?? "Failed to fetch NestHR stats" },
      { status: 500 },
    );
  }
}
