import { NextRequest, NextResponse } from 'next/server';
import * as svc from '@/lib/services';
import { ObjectId } from 'mongodb';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');

    // Check auth header for token
    const auth = request.headers.get('authorization') || ''
    const token = auth.replace('Bearer ', '')
    const decoded: any = token ? verifyToken(token) : null

    const col = await svc.getCollection('supportTickets');
    let filter: Record<string, any> = {};

    // If client role, only show their tickets
    if (decoded?.role === 'client') {
      filter = { clientId: decoded.clientId }
    } else if (clientId) {
      try {
        filter = { $or: [{ clientId: new ObjectId(clientId) }, { clientId }] };
      } catch {
        filter = { clientId };
      }
    }

    const tickets = await col.find(filter).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(tickets);
  } catch (error: any) {
    console.error('Error fetching support tickets:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch support tickets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.replace('Bearer ', '')
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    const ticketData = await request.json();
    const col = await svc.getCollection('supportTickets');
    const res = await col.insertOne({ ...ticketData, createdAt: new Date() });
    return NextResponse.json({ ...ticketData, _id: res.insertedId }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating support ticket:', error);
    return NextResponse.json({ error: error.message || 'Failed to create support ticket' }, { status: 500 });
  }
}