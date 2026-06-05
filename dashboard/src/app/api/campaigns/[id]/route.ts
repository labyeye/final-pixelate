import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { requireAuth } from "@/lib/require-auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const { id: campaignId } = await params;
    const db = await getDb();

    console.log("Attempting to delete campaign:", campaignId);

    let query: any = {};

    if (ObjectId.isValid(campaignId)) {
      query._id = new ObjectId(campaignId);
    } else {
      query._id = campaignId;
    }

    console.log("Delete query:", query);

    const result = await db.collection("campaigns").deleteOne(query);

    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      console.error("Campaign not found with query:", query);
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Campaign deleted successfully",
    });
  } catch (error: any) {
    console.error("Failed to delete campaign:", error);
    return NextResponse.json(
      { error: `Failed to delete campaign: ${error.message}` },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const { id: campaignId } = await params;
    const db = await getDb();
    const updates = await request.json();

    if (!ObjectId.isValid(campaignId)) {
      return NextResponse.json(
        { error: "Invalid campaign ID" },
        { status: 400 },
      );
    }

    const result = await db.collection("campaigns").updateOne(
      { _id: new ObjectId(campaignId) },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Campaign updated successfully",
    });
  } catch (error: any) {
    console.error("Failed to update campaign:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
