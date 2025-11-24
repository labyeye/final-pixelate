import { NextResponse } from 'next/server'
import * as svc from '@/lib/services'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() { return new NextResponse(null, { headers: CORS }) }

export async function GET() {
  try {
    const col = await svc.getCollection('photos')
    const items = await col.find().sort({ createdAt: -1 }).toArray()
    return NextResponse.json(items, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const doc = {
      thumbnailBase64: body.thumbnailBase64 || '',
      title: body.title || '',
      link: body.link || '',
      createdAt: new Date(),
    }
    const col = await svc.getCollection('photos')
    const res = await col.insertOne(doc)
    return NextResponse.json({ ...doc, _id: res.insertedId }, { status: 201, headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}
