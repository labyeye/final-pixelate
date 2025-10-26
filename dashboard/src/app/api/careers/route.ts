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

// GET all job postings
export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    
    const jobs = await db
      .collection('careers')
      .aggregate([
        {
          $lookup: {
            from: 'applications',
            localField: '_id',
            foreignField: 'jobId',
            as: 'applications',
          },
        },
        {
          $addFields: {
            applicationsCount: { $size: '$applications' },
          },
        },
        {
          $project: {
            applications: 0,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray();

    return NextResponse.json(jobs, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500, headers: corsHeaders });
  }
}

// POST create new job posting
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDb();

    const newJob = {
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await db.collection('careers').insertOne(newJob);

    return NextResponse.json({ _id: result.insertedId, ...newJob }, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500, headers: corsHeaders });
  }
}
