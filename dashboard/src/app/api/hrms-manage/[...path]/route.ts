import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";

const BASE = "https://hrms.pixelatenest.com/api/crm";
const API_KEY = process.env.CRM_API_SECRET ?? "";
// Only the company/user management endpoints are reachable through this proxy.
const ALLOWED = /^(companies\/[a-f0-9]{24}(\/(subscription|users))?|users\/[a-f0-9]{24})$/;

async function proxy(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  const path = (await params).path.join("/");
  if (!ALLOWED.test(path)) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  try {
    const hasBody = !["GET", "DELETE"].includes(request.method);
    const res = await fetch(`${BASE}/${path}`, {
      method: request.method,
      headers: { "x-api-key": API_KEY, "Content-Type": "application/json" },
      body: hasBody ? await request.text() : undefined,
    });
    const data = await res.json();
    if (!res.ok) return NextResponse.json({ success: false, error: data?.message ?? `NestHR error ${res.status}` }, { status: res.status });
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message ?? "Request failed" }, { status: 500 });
  }
}

export { proxy as GET, proxy as POST, proxy as PATCH, proxy as PUT, proxy as DELETE };
