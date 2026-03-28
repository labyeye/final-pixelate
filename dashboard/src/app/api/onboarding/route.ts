import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/services";
import { createOnboarding } from "@/lib/services";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { createOnboardingJourneyEvent } from "@/lib/journey-helpers";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientIdParam = searchParams.get("clientId");

    const col = await getCollection("onboardings");

    let filter: Record<string, any> = {};
    if (clientIdParam) {
      try {
        filter = { $or: [{ clientId: new ObjectId(clientIdParam) }, { clientId: clientIdParam }] };
      } catch {
        filter = { clientId: clientIdParam };
      }
    }

    const items = await col.find(filter).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(items);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const created = await createOnboarding(body);

    if (created?.clientId) {
      try {
        const db = await getDb();
        const onboardingId = String(created._id ?? created.id ?? "");
        const existing = onboardingId
          ? await db.collection("journey_events").findOne({
              "metadata.onboardingId": onboardingId,
            })
          : null;

        if (!existing && onboardingId) {
          await createOnboardingJourneyEvent(
            db,
            onboardingId,
            created as Record<string, any>,
          );
        }
      } catch (journeyErr) {
        console.error("Failed to auto-create journey event for onboarding:", journeyErr);
      }
    }

    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
