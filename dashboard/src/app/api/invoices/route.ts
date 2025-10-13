import { NextRequest, NextResponse } from 'next/server';
import * as svc from '@/lib/services';

export async function GET() {
  try {
    const invoices = await svc.getInvoices();
    return NextResponse.json(invoices);
  } catch (error: any) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch invoices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const invoiceData = await request.json();
    // Use service helper so we get a friendly `id` like PN-00001
    const created = await svc.createInvoice(invoiceData);
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error('Error creating invoice:', error);
    return NextResponse.json({ error: error.message || 'Failed to create invoice' }, { status: 500 });
  }
}