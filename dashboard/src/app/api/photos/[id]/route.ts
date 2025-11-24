import { NextResponse } from 'next/server'
import * as svc from '@/lib/services'
import { ObjectId } from 'mongodb'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() { return new NextResponse(null, { headers: CORS }) }

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params as any
    const col = await svc.getCollection('photos')
    const item = await col.findOne({ _id: new ObjectId(id) })
    return NextResponse.json(item, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params as any
    const body = await request.json()
    const col = await svc.getCollection('photos')
    const updates = { ...body, updatedAt: new Date() }
    const { acknowledged } = await col.updateOne({ _id: new ObjectId(id) }, { $set: updates })
    if (!acknowledged) return NextResponse.json({ error: 'update failed' }, { status: 500, headers: CORS })
    const updated = await col.findOne({ _id: new ObjectId(id) })
    return NextResponse.json(updated, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params as any
    const col = await svc.getCollection('photos')
    const { acknowledged, deletedCount } = await col.deleteOne({ _id: new ObjectId(id) })
    if (!acknowledged || deletedCount === 0) return NextResponse.json({ error: 'delete failed' }, { status: 500, headers: CORS })
    return NextResponse.json({ success: true }, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}
