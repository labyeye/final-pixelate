import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const NESTPLAY_URL = process.env.NESTPLAY_BACKEND_URL ?? "";
const NESTPLAY_SECRET =
  process.env.NESTPLAY_CRM_SECRET ?? process.env.NESTPLAY_STATS_SECRET ?? "";

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  if (!NESTPLAY_URL || !NESTPLAY_SECRET) {
    return NextResponse.json(
      { error: "Nest Play not configured — add NESTPLAY_BACKEND_URL and NESTPLAY_CRM_SECRET to .env" },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const upstream = new URL(`${NESTPLAY_URL}/api/crm/invoices`);
  if (status) upstream.searchParams.set("status", status);

  try {
    const res = await fetch(upstream.toString(), {
      headers: { "x-api-key": NESTPLAY_SECRET },
      next: { revalidate: 0 },
    });

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(
        `Nest Play returned non-JSON response (${res.status}): ${text.slice(0, 200)}`,
      );
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `Nest Play invoices fetch failed (${res.status})`);

    return NextResponse.json(data);
  } catch (e: any) {
    console.error("Nest Play invoices error:", e);
    return NextResponse.json(
      { error: e.message ?? "Failed to fetch Nest Play invoices" },
      { status: 500 },
    );
  }
}
