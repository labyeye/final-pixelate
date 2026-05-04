import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { generateQuotationId } from "@/lib/quotation-models";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { createQuotationJourneyEvent } from "@/lib/journey-helpers";

export async function GET(request: NextRequest) {
  try {
    const col = await svc.getCollection("quotations");
    const { searchParams } = new URL(request.url);
    const clientIdParam = searchParams.get("clientId");

    let filter: Record<string, any> = {};
    if (clientIdParam) {
      try {
        filter = {
          $or: [
            { clientId: new ObjectId(clientIdParam) },
            { clientId: clientIdParam },
          ],
        };
      } catch {
        filter = { clientId: clientIdParam };
      }
    }

    const quotations = await col.find(filter).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(quotations);
  } catch (error: any) {
    console.error("Error fetching quotations:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch quotations" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const quotationData = await request.json();
    const col = await svc.getCollection("quotations");

    if (!quotationData.quoteId) {
      const lastQuote = await col.findOne({}, { sort: { createdAt: -1 } });
      quotationData.quoteId = generateQuotationId(lastQuote?.quoteId);
    }

    const newQuotation = {
      ...quotationData,
      status: quotationData.status || "DRAFT",
      date: quotationData.date || new Date(),
      timeline: quotationData.timeline || [],
      lineItems: quotationData.lineItems || [],
      services: quotationData.services || [],
      modules: quotationData.modules || [],
      scope: quotationData.scope || [],
      deliverables: quotationData.deliverables || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await col.insertOne(newQuotation);

    const created = await col.findOne({ _id: result.insertedId });

    if (created && created.clientId && created.status !== "DRAFT") {
      try {
        const db = await getDb();
        await createQuotationJourneyEvent(
          db,
          String(result.insertedId),
          created,
        );
      } catch (journeyErr) {
        console.error("Failed to auto-create journey event:", journeyErr);
      }
    }

    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error("Error creating quotation:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create quotation" },
      { status: 500 },
    );
  }
}
