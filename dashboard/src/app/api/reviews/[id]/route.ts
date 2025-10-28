(async () => {})();
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import * as svc from '@/lib/services';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,PATCH,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const col = await svc.getCollection('reviews');
    const review = await col.findOne({ _id: new ObjectId(params.id) });
    
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404, headers: CORS_HEADERS });
    }
    
    return NextResponse.json(review, { headers: CORS_HEADERS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const col = await svc.getCollection('reviews');
    
    const updateData: any = { updatedAt: new Date() };
    if (body.name !== undefined) updateData.name = body.name;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.workDone !== undefined) updateData.workDone = body.workDone;
    if (body.brand !== undefined) updateData.brand = body.brand;
    if (body.message !== undefined) updateData.message = body.message;
    if (body.rating !== undefined) updateData.rating = body.rating;
    if (body.approved !== undefined) updateData.approved = body.approved;
    
    const result = await col.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404, headers: CORS_HEADERS });
    }
    
    return NextResponse.json({ success: true, modified: result.modifiedCount > 0 }, { headers: CORS_HEADERS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS_HEADERS });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const col = await svc.getCollection('reviews');
    const result = await col.deleteOne({ _id: new ObjectId(params.id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404, headers: CORS_HEADERS });
    }
    
    return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS_HEADERS });
  }
}
