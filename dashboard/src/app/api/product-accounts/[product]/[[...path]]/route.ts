import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/require-auth";
import { productConfig, backendRoot } from "@/lib/product-config";

// Proxy to <product backend>/api/crm/accounts/*  (list, create, edit, subscription, users). Only those shapes pass.
const ALLOWED = /^(|[a-f0-9]{24}|[a-f0-9]{24}\/(subscription|users)|users\/[a-f0-9]{24})$/;

async function proxy(request: NextRequest, { params }: { params: Promise<{ product: string; path?: string[] }> }) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  const { product, path: parts } = await params;
  const path = (parts ?? []).join("/");
  const p = productConfig(product);
  if (!p || !ALLOWED.test(path)) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  if (!p.url || !p.secret)
    return NextResponse.json({ success: false, error: `Not configured: add ${p.envHint} to .env` }, { status: 503 });
  try {
    const search = new URL(request.url).search;
    const hasBody = !["GET", "DELETE"].includes(request.method);
    const res = await fetch(`${backendRoot(p.url)}/api/crm/accounts${path ? `/${path}` : ""}${search}`, {
      method: request.method,
      headers: { "x-api-key": p.secret, "Content-Type": "application/json" },
      body: hasBody ? await request.text() : undefined,
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data) return NextResponse.json({ success: false, error: data?.message ?? `Backend returned ${res.status} (is the latest backend deployed?)` }, { status: res.status || 502 });
    return NextResponse.json(data, { status: res.status });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message ?? "Request failed" }, { status: 502 });
  }
}

export { proxy as GET, proxy as POST, proxy as PATCH, proxy as PUT, proxy as DELETE };
