import { NextResponse } from 'next/server'
import * as svc from '@/lib/services'
import { verifyToken, verifyPassword, hashPassword } from '@/lib/auth'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PATCH,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS })
}

export async function GET(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.replace('Bearer ', '')
    const decoded: any = token ? verifyToken(token) : null
    if (!decoded) return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: CORS })
    const user = await svc.findById('users', decoded.id)
    if (!user) return NextResponse.json({ error: 'not found' }, { status: 404, headers: CORS })
    // Do not return password hash
    delete user.password
    return NextResponse.json(user, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}

export async function PATCH(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.replace('Bearer ', '')
    const decoded: any = token ? verifyToken(token) : null
    if (!decoded) return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: CORS })
    const body = await request.json()
    // avoid changing role via this endpoint
    if (body.role) delete body.role
    // sanitize
    if (body.password) delete body.password
    const updated = await svc.updateById('users', decoded.id, body)
    if (!updated) return NextResponse.json({ error: 'not found' }, { status: 404, headers: CORS })
    if (updated.password) delete updated.password
    return NextResponse.json(updated, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}

export async function POST(request: Request) {
  // This will handle change-password when POSTed to /api/me with action=change-password
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.replace('Bearer ', '')
    const decoded: any = token ? verifyToken(token) : null
    if (!decoded) return NextResponse.json({ error: 'unauthorized' }, { status: 401, headers: CORS })
    const body = await request.json()
      if (body.action !== 'change-password') return NextResponse.json({ error: 'invalid action' }, { status: 400, headers: CORS })
      const { newPassword } = body
      if (!newPassword) return NextResponse.json({ error: 'missing fields' }, { status: 400, headers: CORS })
      // Update password for the current user. Note: this endpoint assumes the user is authenticated.
      await svc.updateById('users', decoded.id, { password: newPassword })
      return NextResponse.json({ success: true }, { headers: CORS })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS })
  }
}
