import { NextResponse } from 'next/server'
import * as svc from '@/lib/services'
import { verifyToken } from '@/lib/auth'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PATCH,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS })
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const item = await svc.findById('leads', params.id)
    return NextResponse.json(item, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.replace('Bearer ', '')
    if (!verifyToken(token)) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: CORS })
    const body = await request.json()
    const updated = await svc.updateById('leads', params.id, body)
    return NextResponse.json(updated, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.replace('Bearer ', '')
    if (!verifyToken(token)) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: CORS })
    const ok = await svc.deleteById('leads', params.id)
    return NextResponse.json({ deleted: ok }, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}
