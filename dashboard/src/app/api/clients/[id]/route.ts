import { NextResponse } from 'next/server';
import * as svc from '@/lib/services';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params as any;
    const item = await svc.findById('clients', id);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params as any;
    const body = await request.json();
    const updated = await svc.updateById('clients', id, body);
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params as any;
    const ok = await svc.deleteById('clients', id);
    return NextResponse.json({ ok });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
