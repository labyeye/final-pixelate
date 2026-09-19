import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const NESTPLAY_URL = process.env.NESTPLAY_BACKEND_URL ?? "";
const NESTPLAY_SECRET =
  process.env.NESTPLAY_CRM_SECRET ?? process.env.NESTPLAY_STATS_SECRET ?? "";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  if (!NESTPLAY_URL || !NESTPLAY_SECRET) {
    return NextResponse.json(
      { error: "Not configured — add NESTPLAY_BACKEND_URL and NESTPLAY_CRM_SECRET to .env" },
      { status: 503 },
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const res = await fetch(`${NESTPLAY_URL}/api/crm/offers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": NESTPLAY_SECRET,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `Failed to update coupon (${res.status})`);
    return NextResponse.json(data);
  } catch (e: any) {
    console.error("Nest Play offer-code update error:", e);
    return NextResponse.json({ error: e.message ?? "Failed to update coupon" }, { status: 500 });
  }
}
