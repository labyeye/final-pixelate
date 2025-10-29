import { NextResponse } from 'next/server';
import * as svc from '@/lib/services';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cache-Control, X-Requested-With',
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS });
}

export async function GET() {
  try {
    const col = await svc.getCollection('announcements');
    const announcement = await col.findOne({ _id: 'main' } as any);
    
    if (!announcement) {
      // No announcement configured — return empty/disabled response
      return NextResponse.json({
        text: '',
        enabled: false,
      }, { headers: CORS_HEADERS });
    }

    // Only enable the announcement when text exists and enabled isn't false
    const text = announcement.text ?? '';
    const enabled = (announcement.enabled !== false) && Boolean(text);

    return NextResponse.json({
      text,
      enabled,
    }, { headers: CORS_HEADERS });
  } catch (e: any) {
    console.error('Error fetching announcement:', e);
    // On error, return an empty/disabled announcement so clients hide the bar
    return NextResponse.json({
      text: '',
      enabled: false,
    }, { status: 200, headers: CORS_HEADERS });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { text, enabled } = body;
    
    if (typeof text !== 'string' || text.length > 200) {
      return NextResponse.json(
        { error: 'Invalid announcement text (max 200 characters)' }, 
        { status: 400, headers: CORS_HEADERS }
      );
    }
    
    const col = await svc.getCollection('announcements');
    await col.updateOne(
      { _id: 'main' } as any,
      { 
        $set: { 
          text, 
          enabled: enabled !== false,
          updatedAt: new Date() 
        } 
      },
      { upsert: true }
    );
    
    return NextResponse.json({ 
      success: true, 
      text, 
      enabled: enabled !== false 
    }, { headers: CORS_HEADERS });
  } catch (e: any) {
    console.error('Error updating announcement:', e);
    return NextResponse.json(
      { error: e.message || 'Failed to update announcement' }, 
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
