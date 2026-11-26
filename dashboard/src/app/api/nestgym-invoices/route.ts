import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const NESTGYM_URL = process.env.NESTGYM_BACKEND_URL ?? "";
const NESTGYM_SECRET = process.env.NESTGYM_CRM_SECRET ?? "";

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  if (!NESTGYM_URL || !NESTGYM_SECRET) {
    return NextResponse.json(
      { error: "NestGym not configured — add NESTGYM_BACKEND_URL and NESTGYM_CRM_SECRET to .env" },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const upstream = new URL(`${NESTGYM_URL}/api/crm/invoices`);
  if (status) upstream.searchParams.set("status", status);

  try {
    const res = await fetch(upstream.toString(), {
      headers: { "x-api-key": NESTGYM_SECRET },
      next: { revalidate: 0 },
    });

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(
        `NestGym returned non-JSON response (${res.status}): ${text.slice(0, 200)}`,
      );
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `NestGym invoices fetch failed (${res.status})`);

    return NextResponse.json(data);
  } catch (e: any) {
    console.error("NestGym invoices error:", e);
    return NextResponse.json(
      { error: e.message ?? "Failed to fetch NestGym invoices" },
      { status: 500 },
    );
  }
}
