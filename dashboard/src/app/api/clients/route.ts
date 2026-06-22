(async () => {})();
import { NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { requireAuth } from "@/lib/require-auth";

export async function GET(request: Request) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const items = await svc.getClients();
    return NextResponse.json(items, {
      headers: { "Cache-Control": "private, max-age=30, stale-while-revalidate=60" },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    const { loginEmail, loginPassword, ...clientData } = body;

    const created = await svc.createClient(clientData);
    const clientId = String(created._id ?? created.id);

    if (loginEmail && loginPassword) {
      const userPayload = {
        name: clientData.name,
        email: loginEmail,
        password: loginPassword,
        role: "client",
        clientId,
      };
      const createdUser = await svc.createUser(userPayload);

      const userId = String(createdUser._id ?? createdUser.id);
      await svc.updateById("clients", clientId, { userId, loginEmail });
      return NextResponse.json(
        { ...created, userId, loginEmail },
        { status: 201 },
      );
    }

    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
