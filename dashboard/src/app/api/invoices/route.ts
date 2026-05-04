import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");
    const status = searchParams.get("status");

    const query: any = {};
    if (clientId) query.clientId = clientId;
    if (status) query.status = status.toUpperCase();

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
