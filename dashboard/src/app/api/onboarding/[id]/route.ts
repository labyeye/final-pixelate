import { NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { getDb } from "@/lib/mongodb";
import {
  createOnboardingJourneyEvent,
  parseJourneyOccurredAt,
} from "@/lib/journey-helpers";
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
      return NextResponse.json(
        { error: "Invalid onboarding id" },
        { status: 400 },
      );
    }

    const item = await svc.findById("onboardings", id);
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

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
      return NextResponse.json(
        { error: "Invalid onboarding id" },
        { status: 400 },
      );
    }

    const body = await request.json();
    const updated = await svc.updateById("onboardings", id, {
      ...body,
      updatedAt: new Date(),
    });

    if (updated?.clientId) {
      try {
        const db = await getDb();
        const onboardingId = String(updated._id ?? updated.id ?? id);
        const existing = await db.collection("journey_events").findOne({
          "metadata.onboardingId": onboardingId,
        });

        if (existing?._id) {
          await db.collection("journey_events").updateOne(
            { _id: existing._id },
            {
              $set: {
                clientId: String(updated.clientId),
                clientName:
                  updated.clientName ??
                  updated.company ??
                  existing.clientName ??
                  "",
                projectId: updated.projectId ? String(updated.projectId) : null,
                projectName:
                  updated.projectTitle ??
                  updated.projectType ??
                  updated.productType ??
                  existing.projectName ??
                  null,
                title: `Onboarding Completed${updated.projectTitle ? ` – ${updated.projectTitle}` : ""}`,
                status: "Completed",
                occurredAt: parseJourneyOccurredAt(
                  updated.date,
                  parseJourneyOccurredAt(existing.occurredAt),
                ),
                updatedAt: new Date(),
                metadata: {
                  ...(existing.metadata ?? {}),
                  onboardingId,
                  projectTitle: updated.projectTitle ?? null,
                  projectType: updated.projectType ?? null,
                  productType: updated.productType ?? null,
                },
              },
            },
          );
        } else {
          await createOnboardingJourneyEvent(
            db,
            onboardingId,
            updated as Record<string, any>,
          );
        }
      } catch (journeyErr) {
        console.error(
          "Failed to sync onboarding update to journey:",
          journeyErr,
        );
      }
    }

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
      return NextResponse.json(
        { error: "Invalid onboarding id" },
        { status: 400 },
      );
    }

    const ok = await svc.deleteById("onboardings", id);
    if (!ok) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
