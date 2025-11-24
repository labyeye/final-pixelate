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
    const col = await svc.getCollection('photoGalleries')
    const items = await col.find().sort({ createdAt: -1 }).toArray()
    return NextResponse.json(items, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Basic payload size protection: estimate total size of base64 fields
    const entries = Array.isArray(body?.entries) ? body.entries : []
    let totalBase64Chars = 0
    for (const e of entries) {
      if (typeof e?.thumbnailBase64 === 'string') totalBase64Chars += e.thumbnailBase64.length
    }
    // also include brandLogoBase64 if present
    if (typeof body?.brandLogoBase64 === 'string') totalBase64Chars += body.brandLogoBase64.length
    // Convert chars to bytes (rough) and reject if exceeding 16MB Mongo document limit
    const approxBytes = Math.ceil(totalBase64Chars * 0.75) // base64 -> binary estimate
    const MAX_BYTES = 16 * 1024 * 1024 - 1024 // leave small headroom
    if (approxBytes > MAX_BYTES) {
      return NextResponse.json({ error: 'Payload too large for a single document. Reduce image sizes or upload fewer images.' }, { status: 413, headers: CORS })
    }
    const col = await svc.getCollection('photoGalleries')
    const toInsert = { ...body, createdAt: new Date() }
    const res = await col.insertOne(toInsert)
    return NextResponse.json({ ...toInsert, _id: res.insertedId }, { status: 201, headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}
