import { NextResponse } from "next/server";
import * as svc from "@/lib/services";

/**
 * PATCH /api/trash/[id] — restore a trashed item back to its original collection
 */
export async function PATCH(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const ok = await svc.restoreFromTrash(params.id);
    if (!ok)
      return NextResponse.json(
        { error: "Item not found in trash" },
        { status: 404 },
      );
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}

/**
 * DELETE /api/trash/[id] — permanently destroy a trashed item (no recovery)
 */
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const ok = await svc.permanentlyDestroyTrashItem(params.id);
    if (!ok)
      return NextResponse.json(
        { error: "Item not found in trash" },
        { status: 404 },
      );
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
