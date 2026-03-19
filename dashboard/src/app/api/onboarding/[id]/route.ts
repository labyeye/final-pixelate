import { NextResponse } from "next/server";
import * as svc from "@/lib/services";

type RouteContext = { params: Promise<{ id: string }> };

async function getRouteId(context: RouteContext) {
  const { id } = await context.params;
  const normalized = String(id ?? "").trim();
  if (!normalized || normalized === "undefined" || normalized === "null") {
    return null;
  }
  return normalized;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const id = await getRouteId(context);
    if (!id) {
      return NextResponse.json({ error: "Invalid onboarding id" }, { status: 400 });
    }

    const item = await svc.findById("onboardings", id);
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const id = await getRouteId(context);
    if (!id) {
      return NextResponse.json({ error: "Invalid onboarding id" }, { status: 400 });
    }

    const body = await request.json();
    const updated = await svc.updateById("onboardings", id, {
      ...body,
      updatedAt: new Date(),
    });

    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const id = await getRouteId(context);
    if (!id) {
      return NextResponse.json({ error: "Invalid onboarding id" }, { status: 400 });
    }

    const ok = await svc.deleteById("onboardings", id);
    if (!ok) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}