import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const NESTHR_URL = process.env.NESTHR_BACKEND_URL ?? "";
const NESTHR_TOKEN = process.env.NESTHR_PLATFORM_TOKEN ?? "";

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  if (!NESTHR_URL || !NESTHR_TOKEN) {
    return NextResponse.json({ error: "NestHR not configured" }, { status: 503 });
  }

  try {
    const res = await fetch(`${NESTHR_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${NESTHR_TOKEN}` },
      next: { revalidate: 60 },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? "NestHR stats failed");

    return NextResponse.json(data);
  } catch (e: any) {
    console.error("NestHR stats error:", e);
    return NextResponse.json({ error: e.message ?? "Failed to fetch NestHR stats" }, { status: 500 });
  }
}
