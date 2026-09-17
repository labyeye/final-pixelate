import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const NESTLEADS_URL = process.env.NESTLEADS_BACKEND_URL ?? "";
const NESTLEADS_SECRET =
  process.env.NESTLEADS_CRM_SECRET ?? process.env.NESTLEADS_STATS_SECRET ?? "";

function unconfigured() {
  return NextResponse.json(
    { error: "Nest Leads not configured — add NESTLEADS_BACKEND_URL and NESTLEADS_STATS_SECRET to .env" },
    { status: 503 },
  );
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  if (!NESTLEADS_URL || !NESTLEADS_SECRET) return unconfigured();

  try {
    const { id } = await params;
    const res = await fetch(`${NESTLEADS_URL}/api/crm/offers/${id}`, {
      headers: { "x-api-key": NESTLEADS_SECRET },
      next: { revalidate: 0 },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `Failed to fetch offer (${res.status})`);
    return NextResponse.json(data);
  } catch (e: any) {
    console.error("Nest Leads offer fetch error:", e);
    return NextResponse.json({ error: e.message ?? "Failed to fetch offer" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  if (!NESTLEADS_URL || !NESTLEADS_SECRET) return unconfigured();

  try {
    const { id } = await params;
    const body = await request.json();
    const res = await fetch(`${NESTLEADS_URL}/api/crm/offers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": NESTLEADS_SECRET,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `Failed to update offer (${res.status})`);
    return NextResponse.json(data);
  } catch (e: any) {
    console.error("Nest Leads offer update error:", e);
    return NextResponse.json({ error: e.message ?? "Failed to update offer" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  if (!NESTLEADS_URL || !NESTLEADS_SECRET) return unconfigured();

  try {
    const { id } = await params;
    const res = await fetch(`${NESTLEADS_URL}/api/crm/offers/${id}`, {
      method: "DELETE",
      headers: { "x-api-key": NESTLEADS_SECRET },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `Failed to delete offer (${res.status})`);
    return NextResponse.json(data);
  } catch (e: any) {
    console.error("Nest Leads offer delete error:", e);
    return NextResponse.json({ error: e.message ?? "Failed to delete offer" }, { status: 500 });
  }
}
