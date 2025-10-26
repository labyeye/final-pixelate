import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET applications (with optional jobId filter)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');
    
    const db = await getDb();
    
    const query = jobId ? { jobId: new ObjectId(jobId) } : {};
    
    const applications = await db
      .collection('applications')
      .find(query)
      .sort({ appliedAt: -1 })
      .toArray();

    return NextResponse.json(applications, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500, headers: corsHeaders });
  }
}

// POST create new application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDb();

    const newApplication = {
      ...body,
      jobId: new ObjectId(body.jobId),
      status: 'pending',
      appliedAt: new Date().toISOString(),
    };

    const result = await db.collection('applications').insertOne(newApplication);

    return NextResponse.json({ _id: result.insertedId, ...newApplication }, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500, headers: corsHeaders });
  }
}
