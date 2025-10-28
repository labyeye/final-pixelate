(async () => {})();
import { NextResponse } from 'next/server';
import * as svc from '@/lib/services';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  // Include Cache-Control and common X- headers so browser preflight allows the client-set headers
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cache-Control, X-Requested-With',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}

export async function GET() {
  try {
    const col = await svc.getCollection('workGallery');
    const items = await col.find().toArray();
    return NextResponse.json(items, { headers: CORS_HEADERS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const col = await svc.getCollection('workGallery');
    const res = await col.insertOne({ ...body, createdAt: new Date() });
    return NextResponse.json({ ...body, _id: res.insertedId }, { status: 201, headers: CORS_HEADERS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS_HEADERS });
  }
}
