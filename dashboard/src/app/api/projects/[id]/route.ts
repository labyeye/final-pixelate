import { NextResponse } from 'next/server';
import * as svc from '@/lib/services';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const item = await svc.findById('projects', id);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await svc.updateById('projects', id, { ...body, updatedAt: new Date() });
    try {
      // update any invoice linked to this projectId
      const col = await svc.getCollection('invoices');
      await col.updateMany({ projectId: String(id) }, { $set: { title: body.title, amount: body.amount, updatedAt: new Date() } });

      // If project marked complete, create an invoice if none exists
      if (body.status === 'COMPLETED' || (updated && updated.status === 'COMPLETED')) {
        const existing = await col.findOne({ projectId: String(id) });
        if (!existing) {
          await col.insertOne({ projectId: String(id), title: body.title ?? updated?.title ?? '', amount: body.amount ?? updated?.amount ?? 0, clientId: body.clientId ?? updated?.clientId ?? null, createdAt: new Date() });
        }
      }
    } catch (e) {
      console.error('Failed to update/create linked invoices', e);
    }
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const ok = await svc.softDeleteById('projects', id);
    if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
