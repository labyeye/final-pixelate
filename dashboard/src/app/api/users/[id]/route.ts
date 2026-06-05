import { NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { ObjectId } from "mongodb";
import { requireAuth } from "@/lib/require-auth";

type RouteContext = { params: Promise<{ id: string }> };

async function getRouteId(context: RouteContext) {
  const { id } = await context.params;
  const normalized = String(id ?? "").trim();
  if (!normalized || normalized === "undefined" || normalized === "null") {
    return null;
  }
  return normalized;
}

export async function GET(request: Request, context: RouteContext) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const id = await getRouteId(context);
    if (!id) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }
    const item = await svc.findById("users", id);
    if (!item)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const id = await getRouteId(context);
    if (!id) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }
    const body = await request.json();
    const updated = await svc.updateById("users", id, body);
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const id = await getRouteId(context);
    if (!id) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }

    const ok = await svc.deleteById("users", id);
    if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });

    try {
      const projectsCol = await svc.getCollection("projects");

      const affected = await projectsCol
        .find({ "assignees.id": { $exists: true } })
        .toArray();
      for (const p of affected) {
        const before = Array.isArray(p.assignees) ? p.assignees : [];
        const after = before.filter((a: any) => String(a.id) !== String(id));
        if (after.length !== before.length) {
          await projectsCol.updateOne(
            { _id: p._id },
            { $set: { assignees: after, updatedAt: new Date() } },
          );
        }
      }

      const leadsCol = await svc.getCollection("leads");
      const assignedToFilters: any[] = [{ assignedTo: id }];
      if (ObjectId.isValid(id))
        assignedToFilters.push({ assignedTo: new ObjectId(id) });
      await leadsCol.updateMany(
        { $or: assignedToFilters },
        { $unset: { assignedTo: "", assignedToName: "" } },
      );

      const quotationsCol = await svc.getCollection("quotations");
      const authorIds: any[] = [id];
      if (ObjectId.isValid(id)) authorIds.push(new ObjectId(id));
      await quotationsCol.updateMany(
        { authorId: { $in: authorIds } },
        { $unset: { authorId: "" } },
      );
    } catch (e) {
      console.error("Failed to cascade-clean references for deleted user", e);
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
