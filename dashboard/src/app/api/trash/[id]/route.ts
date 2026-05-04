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

export async function PATCH(_request: Request, context: RouteContext) {
  try {
    const id = await getRouteId(context);
    if (!id) {
      return NextResponse.json(
        { error: "Invalid trash item id" },
        { status: 400 },
      );
    }

    const ok = await svc.restoreFromTrash(id);
    if (!ok)
      return NextResponse.json(
        { error: "Item not found in trash" },
        { status: 404 },
      );
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const id = await getRouteId(context);
    if (!id) {
      return NextResponse.json(
        { error: "Invalid trash item id" },
        { status: 400 },
      );
    }

    const ok = await svc.permanentlyDestroyTrashItem(id);
    if (!ok)
      return NextResponse.json(
        { error: "Item not found in trash" },
        { status: 404 },
      );
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
