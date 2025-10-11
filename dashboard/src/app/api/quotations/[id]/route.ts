import { NextRequest, NextResponse } from 'next/server';
import * as svc from '@/lib/services';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const quote = await svc.findById('quotations', id);
    if (!quote) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(quote);
  } catch (error: any) {
    console.error('Error fetching quotation:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch quotation' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await request.json();
    const updated = await svc.updateById('quotations', id, { ...body, updatedAt: new Date() });
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

    // Try to delete by ObjectId first (standard Mongo _id), fall back to deleting by custom `id` field.
    try {
      // if id looks like a 24-char hex string, attempt ObjectId deletion
      const hex24 = typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);
      if (hex24) {
        const ok = await svc.deleteById('quotations', id);
        if (ok) return NextResponse.json({ success: true });
        // else fall through to try deleting by `id` field
      }
    } catch (e) {
      // ignore and fall back
    }

    // fallback: delete by custom 'id' property (e.g. 'Q-2025-001')
    try {
      const col = await (await import('@/lib/services')).getCollection('quotations');
      const res = await col.deleteOne({ id: id });
      if (res.deletedCount === 1) return NextResponse.json({ success: true });
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    } catch (error: any) {
      console.error('Error deleting quotation:', error);
      return NextResponse.json({ error: error.message || 'Failed to delete quotation' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error deleting quotation:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete quotation' }, { status: 500 });
  }
}

