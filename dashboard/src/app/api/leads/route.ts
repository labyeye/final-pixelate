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
    // Expect an Authorization header with a Bearer token. Admins see all leads.
    // Staff role users will only receive leads where assignedTo === their id.
    const auth = request.headers.get('authorization') || ''
    const token = auth.replace('Bearer ', '')
    const decoded: any = token ? verifyToken(token) : null
    if (!decoded) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: CORS })

    const col = await svc.getCollection('leads')
    let items: any[]
    if (decoded.role === 'admin') {
      items = await col.find().sort({ createdAt: -1 }).toArray()
    } else {
      // for staff, return only leads assigned to this user (_id stored as string in assignedTo)
      items = await col.find({ assignedTo: decoded.id }).sort({ createdAt: -1 }).toArray()
    }
    return NextResponse.json(items, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}

// Accept either single lead or array of leads
export async function POST(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.replace('Bearer ', '')
    if (!verifyToken(token)) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: CORS })
    const body = await request.json()
    const col = await svc.getCollection('leads')
    if (Array.isArray(body)) {
      // dedupe by phone or email server-side
      const toInsert = [] as any[]
      for (const b of body) {
        const existing = await col.findOne({ $or: [{ phone: b.phone || null }, { email: b.email || null }] })
        if (!existing) toInsert.push({ ...b, createdAt: new Date() })
      }
      const res = toInsert.length ? await col.insertMany(toInsert) : { insertedCount: 0 }
      // return insertedCount
      return NextResponse.json({ insertedCount: res.insertedCount }, { status: 201, headers: CORS })
    }
    // single insert with dedupe
    const exists = await col.findOne({ $or: [{ phone: body.phone || null }, { email: body.email || null }] })
    if (exists) return NextResponse.json({ error: 'duplicate' }, { status: 409, headers: CORS })
    const res = await col.insertOne({ ...body, createdAt: new Date() })
    return NextResponse.json({ ...body, _id: res.insertedId }, { status: 201, headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}
