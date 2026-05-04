import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import {
  createOnboardingJourneyEvent,
  createProjectJourneyEvent,
  createQuotationJourneyEvent,
} from "@/lib/journey-helpers";

export async function POST() {
  try {
    const db = await getDb();

    const quotations = await db
      .collection("quotations")
      .find({ status: { $nin: ["DRAFT"] }, deleted: { $ne: true } })
      .toArray();

    let createdQuotation = 0;
    let skippedQuotation = 0;
    let createdOnboarding = 0;
    let skippedOnboarding = 0;
    let createdProject = 0;
    let skippedProject = 0;

    for (const q of quotations) {
      const quotationId = String(q._id);

      const exists = await db.collection("journey_events").findOne({
        "metadata.quotationId": quotationId,
      });

      if (exists) {
        skippedQuotation++;
        continue;
      }

      try {
        await createQuotationJourneyEvent(
          db,
          quotationId,
          q as Record<string, any>,
        );
        createdQuotation++;
      } catch (err) {
        console.error(
          `Failed to create journey event for quotation ${quotationId}:`,
          err,
        );
      }
    }

    const onboardings = await db
      .collection("onboardings")
      .find({ deleted: { $ne: true } })
      .toArray();

    for (const onboarding of onboardings) {
      const onboardingId = String(onboarding._id);
      const hasClient = Boolean(onboarding?.clientId);
      if (!hasClient) {
        skippedOnboarding++;
        continue;
      }

      const exists = await db.collection("journey_events").findOne({
        "metadata.onboardingId": onboardingId,
      });

      if (exists) {
        skippedOnboarding++;
        continue;
      }

      try {
        await createOnboardingJourneyEvent(
          db,
          onboardingId,
          onboarding as Record<string, any>,
        );
        createdOnboarding++;
      } catch (err) {
        console.error(
          `Failed to create journey event for onboarding ${onboardingId}:`,
          err,
        );
      }
    }

    const projects = await db
      .collection("projects")
      .find({ deleted: { $ne: true } })
      .toArray();

    for (const project of projects) {
      const projectId = String(project._id);
      const hasClient = Boolean(project?.clientId ?? project?.client);
      if (!hasClient) {
        skippedProject++;
        continue;
      }

      const exists = await db.collection("journey_events").findOne({
        "metadata.projectId": projectId,
        type: "project_update",
      });

      if (exists) {
        skippedProject++;
        continue;
      }

      try {
        await createProjectJourneyEvent(
          db,
          projectId,
          project as Record<string, any>,
        );
        createdProject++;
      } catch (err) {
        console.error(
          `Failed to create journey event for project ${projectId}:`,
          err,
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `Backfill complete. Quotations created: ${createdQuotation}, skipped: ${skippedQuotation}. Onboardings created: ${createdOnboarding}, skipped: ${skippedOnboarding}. Projects created: ${createdProject}, skipped: ${skippedProject}.`,
      quotations: {
        created: createdQuotation,
        skipped: skippedQuotation,
      },
      onboardings: {
        created: createdOnboarding,
        skipped: skippedOnboarding,
      },
      projects: {
        created: createdProject,
        skipped: skippedProject,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
