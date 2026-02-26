import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

/**
 * Journey API – stores chronological activity events per client.
 *
 * GET  /api/journey?clientId=<id>   – fetch all events for a client
 * POST /api/journey                 – create a new journey event
 */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');

    if (!clientId) {
      return NextResponse.json({ error: 'clientId query param is required' }, { status: 400 });
    }

    const db = await getDb();
    const events = await db
      .collection('journey_events')
      .find({ clientId })
      .sort({ occurredAt: 1 })
      .toArray();

    return NextResponse.json(events);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      clientId,
      clientName,
      projectId,
      projectName,
      type,       // meeting | quotation | nda | onboarding | project_update | payment | note
      title,
      description,
      performedBy,
      status,     // optional badge: Sent | Approved | Completed | Pending | Rejected
      fileUrl,
      linkUrl,
      occurredAt, // ISO string – defaults to now
      metadata,   // free-form additional data for future automation
    } = body;

    if (!clientId || !type || !title) {
      return NextResponse.json(
        { error: 'clientId, type, and title are required' },
        { status: 400 },
      );
    }

    const db = await getDb();
    const doc = {
      clientId,
      clientName: clientName ?? '',
      projectId: projectId ?? null,
      projectName: projectName ?? null,
      type,
      title,
      description: description ?? '',
      performedBy: performedBy ?? 'System',
      status: status ?? null,
      fileUrl: fileUrl ?? null,
      linkUrl: linkUrl ?? null,
      occurredAt: occurredAt ? new Date(occurredAt) : new Date(),
      metadata: metadata ?? {},
      createdAt: new Date(),
    };

    const result = await db.collection('journey_events').insertOne(doc);
    return NextResponse.json({ ...doc, _id: result.insertedId }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
