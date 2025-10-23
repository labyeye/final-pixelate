import { NextResponse } from 'next/server'
import * as svc from '@/lib/services'
import { verifyToken } from '@/lib/auth'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS })
}

export async function GET(request: Request) {
  try {
    const col = await svc.getCollection('enquiries')
    const items = await col.find().sort({ createdAt: -1 }).toArray()
    return NextResponse.json(items, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const col = await svc.getCollection('enquiries')
    const toInsert = { ...body, createdAt: new Date() }
    const res = await col.insertOne(toInsert)
    return NextResponse.json({ ...toInsert, _id: res.insertedId }, { status: 201, headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}
