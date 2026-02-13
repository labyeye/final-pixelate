import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { ObjectId } from "mongodb";

/**
 * GET /api/settings/sidebar - Fetch staff users and their allowed pages
 */
export async function GET() {
  try {
    const users = await svc.getUsers();
    // Filter for staff only
    const staff = users
      .filter((u: any) => u.role === "staff")
      .map((u: any) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        allowedPages: u.allowedPages || [], // Default to empty if not set
      }));

    return NextResponse.json(staff);
  } catch (error: any) {
    console.error("Error fetching staff settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch staff settings" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/settings/sidebar - Update allowed pages for a user
 */
export async function POST(request: NextRequest) {
  try {
    const { userId, allowedPages } = await request.json();

    if (!userId || !Array.isArray(allowedPages)) {
      return NextResponse.json(
        { error: "Invalid userId or allowedPages" },
        { status: 400 },
      );
    }

    const col = await svc.getCollection("users");
    // Update the user's allowedPages
    await col.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { allowedPages: allowedPages } },
    );

    return NextResponse.json({ success: true, userId, allowedPages });
  } catch (error: any) {
    console.error("Error updating staff settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update staff settings" },
      { status: 500 },
    );
  }
}
