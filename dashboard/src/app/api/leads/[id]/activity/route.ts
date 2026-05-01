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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.replace('Bearer ', '')
    if (!verifyToken(token)) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: CORS })

    const col = await svc.getCollection('lead_activities')
    const items = await col.find({ leadId: params.id }).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(items, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.replace('Bearer ', '')
    const decoded: any = verifyToken(token)
    if (!decoded) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: CORS })

    const body = await request.json()
    const col = await svc.getCollection('lead_activities')
    const doc = {
      leadId: params.id,
      type: body.type || 'note',
      content: body.content || '',
      createdBy: decoded.id || decoded._id,
      createdByName: decoded.name || decoded.email || 'Unknown',
      createdAt: new Date(),
    }
    const res = await col.insertOne(doc)

    
    await svc.updateById('leads', params.id, { updatedAt: new Date() })

    return NextResponse.json({ ...doc, _id: res.insertedId }, { status: 201, headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}
