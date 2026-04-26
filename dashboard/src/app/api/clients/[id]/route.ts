import { NextResponse } from 'next/server';
import * as svc from '@/lib/services';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params as any;
    const item = await svc.findById('clients', id);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params as any;
    const body = await request.json();
    const { loginEmail, loginPassword, ...clientData } = body;

    
    const existing = await svc.findById('clients', id);

    
    const clientUpdate: any = { ...clientData };
    if (loginEmail) clientUpdate.loginEmail = loginEmail;

    const updated = await svc.updateById('clients', id, clientUpdate);

    
    if (loginEmail || loginPassword) {
      if (existing?.userId) {
        
        const userUpdate: any = {};
        if (loginEmail) userUpdate.email = loginEmail;
        if (loginPassword) userUpdate.password = loginPassword;
        await svc.updateById('users', String(existing.userId), userUpdate);
      } else if (loginEmail && loginPassword) {
        
        const userPayload = {
          name: clientData.name || existing?.name,
          email: loginEmail,
          password: loginPassword,
          role: 'client',
          clientId: id,
        };
        const createdUser = await svc.createUser(userPayload);
        const userId = String(createdUser._id ?? createdUser.id);
        await svc.updateById('clients', id, { userId, loginEmail });
      }
    }

    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params as any;
    
    const existing = await svc.findById('clients', id);
    if (existing?.userId) {
      try { await svc.deleteById('users', String(existing.userId)); } catch (e) {  }
    }
    const ok = await svc.deleteById('clients', id);
    return NextResponse.json({ ok });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
