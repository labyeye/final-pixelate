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
      // Return default announcement if none exists
      return NextResponse.json({ 
        text: 'Get FLAT 25% OFF Sitewide', 
        enabled: true 
      }, { headers: CORS_HEADERS });
    }
    
    return NextResponse.json({
      text: announcement.text || 'Get FLAT 25% OFF Sitewide',
      enabled: announcement.enabled !== false
    }, { headers: CORS_HEADERS });
  } catch (e: any) {
    console.error('Error fetching announcement:', e);
    return NextResponse.json({ 
      text: 'Get FLAT 25% OFF Sitewide', 
      enabled: true 
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
