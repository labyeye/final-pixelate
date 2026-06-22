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

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const upstream = new URL(`${NESTHR_URL}/api/crm/invoices`);
  if (status) upstream.searchParams.set("status", status);

  try {
    const res = await fetch(upstream.toString(), {
      headers: { "x-api-key": NESTHR_SECRET },
      next: { revalidate: 0 },
    });

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(
        `NestHR returned non-JSON response (${res.status}): ${text.slice(0, 200)}`,
      );
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `NestHR invoices fetch failed (${res.status})`);

    return NextResponse.json(data);
  } catch (e: any) {
    console.error("NestHR invoices error:", e);
    return NextResponse.json(
      { error: e.message ?? "Failed to fetch NestHR invoices" },
      { status: 500 },
    );
  }
}
