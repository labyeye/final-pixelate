import { NextResponse } from 'next/server'
import * as svc from '@/lib/services'
import { verifyPassword, signToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) return NextResponse.json({ error: 'email+password required' }, { status: 400 })
    const users = await svc.getUsers()
    const u = (users || []).find((x: any) => x.email === email)
    if (!u) return NextResponse.json({ error: 'invalid credentials' }, { status: 401 })
    if (!u.password || !verifyPassword(password, u.password)) return NextResponse.json({ error: 'invalid credentials' }, { status: 401 })
    const token = signToken({ id: u._id, email: u.email, role: u.role })
    return NextResponse.json({ token, user: { id: u._id, email: u.email, name: u.name, role: u.role } })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 })
  }
}
