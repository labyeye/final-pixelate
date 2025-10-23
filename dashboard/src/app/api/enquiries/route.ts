import { NextResponse } from 'next/server'
import * as svc from '@/lib/services'
import { ObjectId } from 'mongodb'
import { verifyToken } from '@/lib/auth'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS',
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
    // ensure default status and accept budget
    const toInsert = { ...body, status: body.status || 'pending', budget: body.budget || null, createdAt: new Date() }
    const res = await col.insertOne(toInsert)
    return NextResponse.json({ ...toInsert, _id: res.insertedId }, { status: 201, headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}

export async function PATCH(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'missing id' }, { status: 400, headers: CORS })
    const body = await request.json()
    const col = await svc.getCollection('enquiries')
    const updates: any = {}
    if (body.status) updates.status = body.status
    if (body.budget !== undefined) updates.budget = body.budget
    updates.updatedAt = new Date()
  const { acknowledged } = await col.updateOne({ _id: new ObjectId(id) }, { $set: updates })
    if (!acknowledged) return NextResponse.json({ error: 'update failed' }, { status: 500, headers: CORS })
  const updated = await col.findOne({ _id: new ObjectId(id) })
    return NextResponse.json(updated, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}
