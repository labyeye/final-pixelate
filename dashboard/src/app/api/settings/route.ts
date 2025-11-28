import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { generateQuotationId } from "@/lib/quotation-models";

/**
 * GET /api/settings - Fetch agency settings
 */
export async function GET() {
  try {
    const col = await svc.getCollection("agencySettings");
    const settings = await col.findOne({});

    // Return defaults if no settings exist
    if (!settings) {
      return NextResponse.json({
        name: "Pixelate Nest",
        aboutUs:
          "We are a leading creative agency specializing in digital solutions.",
        mission:
          "To deliver exceptional digital experiences that drive business growth.",
        vision:
          "To be the most trusted creative partner for businesses worldwide.",
        goal: "Empowering businesses through innovative technology and design.",
        approach: [
          "Discovery & Research",
          "Strategic Planning",
          "Design & Development",
          "Testing & Quality Assurance",
          "Launch & Support",
        ],
        terms: [
          "Payment terms: 50% advance, 50% on completion",
          "Project timeline is subject to timely feedback and approvals",
          "Revisions beyond agreed scope will be charged separately",
          "All deliverables remain property of Pixelate Nest until full payment",
          "Client must provide necessary content and assets on time",
        ],
        footerText: "© 2025 Pixelate Nest. All rights reserved.",
        address: "Bihar, India",
        email: "contact@pixelatenest.com",
        phone: "+91 XXXXXXXXXX",
        website: "https://www.pixelatenest.com",
      });
    }

    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/settings - Update agency settings
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const col = await svc.getCollection("agencySettings");

    const existing = await col.findOne({});

    if (existing) {
      await col.updateOne({}, { $set: { ...body, updatedAt: new Date() } });
    } else {
      await col.insertOne({
        ...body,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const updated = await col.findOne({});
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
