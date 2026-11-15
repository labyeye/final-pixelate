import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const URL_ = process.env.NESTHR_BACKEND_URL ?? "";
const SECRET = process.env.NESTHR_CRM_SECRET ?? process.env.NESTHR_STATS_SECRET ?? "";

// GET            -> list of paid WhatsApp-credit top-ups
// GET ?id=<id>   -> { html } printable GST invoice for that top-up
export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  if (!URL_ || !SECRET)
    return NextResponse.json({ error: "NestHR not configured" }, { status: 503 });

  const id = new URL(request.url).searchParams.get("id");
  const path = id
    ? `/api/crm/credit-bills/${encodeURIComponent(id)}/html`
    : "/api/crm/credit-bills";
  try {
    const res = await fetch(`${URL_}${path}`, {
      headers: { "x-api-key": SECRET },
      next: { revalidate: 0 },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `NestHR failed (${res.status})`);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Failed" }, { status: 500 });
  }
}
