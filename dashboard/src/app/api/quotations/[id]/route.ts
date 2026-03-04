import { NextRequest, NextResponse } from 'next/server';
import * as svc from '@/lib/services';
import { verifyToken } from '@/lib/auth';
import { getDb } from '@/lib/mongodb';
import { createQuotationJourneyEvent } from '@/lib/journey-helpers';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const quote = await svc.findById('quotations', id);
    if (!quote) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(quote);
  } catch (error: any) {
    console.error('Error fetching quotation:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch quotation' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Fetch existing to know the previous status
    const existing = await svc.findById('quotations', id);
    const prevStatus = (existing as any)?.status ?? 'DRAFT';
    const newStatus  = body.status ?? prevStatus;

    await svc.updateById('quotations', id, { ...body, updatedAt: new Date() });

    // Re-fetch the fully updated document from DB
    const updated = await svc.findById('quotations', id);

    // ── Auto-create Journey event when status moves out of DRAFT ──────────
    if (
      updated &&
      (updated as any).clientId &&
      prevStatus === 'DRAFT' &&
      newStatus !== 'DRAFT'
    ) {
      try {
        const db = await getDb();
        // Guard against duplicates
        const alreadyExists = await db.collection('journey_events').findOne({
          'metadata.quotationId': id,
        });
        if (!alreadyExists) {
          await createQuotationJourneyEvent(db, id, updated as Record<string, any>);
        }
      } catch (journeyErr) {
        console.error('Failed to auto-create journey event on update:', journeyErr);
      }
    }
    // ─────────────────────────────────────────────────────────────────────

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating quotation:', error);
    return NextResponse.json({ error: error.message || 'Failed to update quotation' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const auth = request.headers.get('authorization') || '';
    const token = auth.replace(/^Bearer\s*/, '') || '';
    const decoded: any = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (decoded.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const resolvedParams: any = await params;
    const id = resolvedParams.id;

    const ok = await svc.softDeleteById('quotations', id);
    if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting quotation:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete quotation' }, { status: 500 });
  }
}

