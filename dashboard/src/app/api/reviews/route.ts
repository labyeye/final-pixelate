(async () => {})();
import { NextResponse } from 'next/server';
import * as svc from '@/lib/services';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const approved = searchParams.get('approved');
    
    const col = await svc.getCollection('reviews');
    const filter: any = {};
    if (approved !== null && approved !== undefined) {
      filter.approved = approved === 'true';
    }
    
    const reviews = await col.find(filter).sort({ createdAt: -1 }).limit(limit).toArray();
    return NextResponse.json(reviews, { headers: CORS_HEADERS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const col = await svc.getCollection('reviews');
    const res = await col.insertOne({ 
      ...body, 
      createdAt: new Date(),
      approved: false // Reviews need approval by default
    });
    return NextResponse.json({ ...body, _id: res.insertedId }, { status: 201, headers: CORS_HEADERS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS_HEADERS });
  }
}
