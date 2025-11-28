import { NextRequest, NextResponse } from 'next/server';
import * as svc from '@/lib/services';
import { generateQuotationId } from '@/lib/quotation-models';

export async function GET() {
  try {
    const col = await svc.getCollection('quotations');
    const quotations = await col.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(quotations);
  } catch (error: any) {
    console.error('Error fetching quotations:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch quotations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const quotationData = await request.json();
    const col = await svc.getCollection('quotations');
    
    // Generate next quotation ID if not provided
    if (!quotationData.quoteId) {
      const lastQuote = await col.findOne({}, { sort: { createdAt: -1 } });
      quotationData.quoteId = generateQuotationId(lastQuote?.quoteId);
    }
    
    // Set defaults
    const newQuotation = {
      ...quotationData,
      status: quotationData.status || 'DRAFT',
      date: quotationData.date || new Date(),
      timeline: quotationData.timeline || [],
      lineItems: quotationData.lineItems || [],
      services: quotationData.services || [],
      modules: quotationData.modules || [],
      scope: quotationData.scope || [],
      deliverables: quotationData.deliverables || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await col.insertOne(newQuotation);
    const created = await col.findOne({ _id: result.insertedId });
    
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error('Error creating quotation:', error);
    return NextResponse.json({ error: error.message || 'Failed to create quotation' }, { status: 500 });
  }
}