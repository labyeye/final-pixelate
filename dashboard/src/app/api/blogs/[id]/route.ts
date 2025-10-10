import { NextResponse } from 'next/server';
import * as svc from '@/lib/services';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const item = await svc.findById('blogs', params.id);
    return NextResponse.json(item || {}, { headers: CORS_HEADERS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updated = await svc.updateById('blogs', params.id, { ...body, updatedAt: new Date() });
    return NextResponse.json(updated, { headers: CORS_HEADERS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = _request.headers.get('authorization') || '';
    const token = auth.replace('Bearer ', '');
    const { verifyToken } = await import('@/lib/auth');
    const decoded: any = verifyToken(token as string);
    if (!decoded) return new NextResponse(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: CORS_HEADERS });
    if (decoded.role !== 'admin') return new NextResponse(JSON.stringify({ error: 'forbidden' }), { status: 403, headers: CORS_HEADERS });
    const ok = await svc.deleteById('blogs', params.id);
    return NextResponse.json({ ok }, { headers: CORS_HEADERS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS_HEADERS });
  }
}
