import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");
    const status = searchParams.get("status"); // e.g., 'pending', 'paid'

    // Construct query
    const query: any = {};
    if (clientId) query.clientId = clientId;
    if (status) query.status = status.toUpperCase();

    // svc.getInvoices() returns all by default if no args, but we need filtered find.
    // Let's use getCollection directly for filtering.
    const col = await svc.getCollection("invoices");
    const invoices = await col.find(query).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(invoices);
  } catch (error: any) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch invoices" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const invoiceData = await request.json();
    // Use service helper so we get a friendly `id` like PN-00001
    const created = await svc.createInvoice(invoiceData);
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create invoice" },
      { status: 500 },
    );
  }
}
