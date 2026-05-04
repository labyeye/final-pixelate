import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { defaultClientAllowed } from "@/lib/nav-config";

export async function GET() {
  try {
    const col = await svc.getCollection("agencySettings");
    const doc = await col.findOne({});
    const allowedClientPages: string[] =
      doc?.allowedClientPages ?? defaultClientAllowed;
    return NextResponse.json({ allowedClientPages });
  } catch (error: any) {
    console.error("Error fetching client sidebar settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch client sidebar settings" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { allowedClientPages } = await request.json();

    if (!Array.isArray(allowedClientPages)) {
      return NextResponse.json(
        { error: "allowedClientPages must be an array" },
        { status: 400 },
      );
    }

    const col = await svc.getCollection("agencySettings");
    const existing = await col.findOne({});
    if (existing) {
      await col.updateOne(
        {},
        { $set: { allowedClientPages, updatedAt: new Date() } },
      );
    } else {
      await col.insertOne({
        allowedClientPages,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return NextResponse.json({ success: true, allowedClientPages });
  } catch (error: any) {
    console.error("Error updating client sidebar settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update client sidebar settings" },
      { status: 500 },
    );
  }
}
