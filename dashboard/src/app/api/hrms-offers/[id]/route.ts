import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const BASE = "https://hrms.pixelatenest.com/api/crm";
const API_KEY = process.env.CRM_API_SECRET ?? "";

function crmHeaders() {
  return { "x-api-key": API_KEY, "Content-Type": "application/json" };
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  try {
    const res = await fetch(`${BASE}/offers/${params.id}`, { headers: crmHeaders() });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `CRM error ${res.status}`);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Failed to fetch offer" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  try {
    const body = await request.json();
    const res = await fetch(`${BASE}/offers/${params.id}`, {
      method: "PATCH",
      headers: crmHeaders(),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `CRM error ${res.status}`);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Failed to update offer" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;

  try {
    const res = await fetch(`${BASE}/offers/${params.id}`, {
      method: "DELETE",
      headers: crmHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? `CRM error ${res.status}`);
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Failed to delete offer" }, { status: 500 });
  }
}
