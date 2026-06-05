import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { requireAuth } from "@/lib/require-auth";

export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const body = await request.json().catch(() => ({}));
    const fy = body?.financialYear;
    const res = await svc.renumberInvoices(fy);
    return NextResponse.json({ success: true, ...res });
  } catch (e: any) {
    console.error("Failed to renumber invoices", e);
    return NextResponse.json(
      { success: false, error: e.message || String(e) },
      { status: 500 },
    );
  }
}
