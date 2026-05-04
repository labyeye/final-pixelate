import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";

export async function POST(request: NextRequest) {
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
