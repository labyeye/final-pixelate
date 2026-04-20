import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { ObjectId } from "mongodb";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

/**
 * Normalize social account handle
 * - Convert to lowercase
 * - Remove @ symbol if present
 * - Trim whitespace
 */
function normalizeHandle(handle: string): string {
  return (handle || "").toLowerCase().replace(/^@+/, "").trim();
}

/**
 * GET /api/social-media-accounts
 * Query params:
 * - clientId: filter by client
 * - platform: filter by platform
 * - id: filter by account ID (returns array with single item if found)
 */
export async function GET(request: NextRequest) {
  try {
    const col = await svc.getCollection("socialMediaAccounts");
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");
    const platform = searchParams.get("platform");
    const id = searchParams.get("id");

    const query: any = {};
    if (clientId) query.clientId = clientId;
    if (platform) query.platform = platform;
    if (id) {
      try {
        query._id = new ObjectId(id);
      } catch (e) {
        // If id is not a valid ObjectId, just search by id field
        query.id = id;
      }
    }

    const accounts = await col
      .find(query)
      .sort({ platform: 1, handle: 1 })
      .toArray();

    return NextResponse.json(accounts, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS }
    );
  }
}

/**
 * POST /api/social-media-accounts
 * Create a new social account or return existing if already exists
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const col = await svc.getCollection("socialMediaAccounts");

    const clientId = body?.clientId || "";
    const platform = body?.platform || "";
    const handle = normalizeHandle(body?.handle || "");
    const displayName = body?.displayName || handle;

    if (!clientId || !platform) {
      return NextResponse.json(
        { error: "clientId and platform are required" },
        { status: 400, headers: CORS }
      );
    }

    if (!handle) {
      return NextResponse.json(
        { error: "Username/Handle is required and must be at least 1 character after normalization" },
        { status: 400, headers: CORS }
      );
    }

    if (handle.length > 500) {
      return NextResponse.json(
        { error: "Username/Handle must be less than 500 characters" },
        { status: 400, headers: CORS }
      );
    }

    // Check if account already exists
    const existing = await col.findOne({
      clientId,
      platform,
      handle,
    });

    if (existing) {
      return NextResponse.json(existing, { status: 200, headers: CORS });
    }

    // Create new account
    const toInsert = {
      clientId,
      platform,
      handle,
      displayName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const res = await col.insertOne(toInsert);
    return NextResponse.json(
      { ...toInsert, _id: res.insertedId },
      { status: 201, headers: CORS }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS }
    );
  }
}

/**
 * PUT /api/social-media-accounts/[id]
 * Update account details (displayName, etc.)
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400, headers: CORS }
      );
    }

    const col = await svc.getCollection("socialMediaAccounts");
    const displayName = body?.displayName;

    const updateData: any = { updatedAt: new Date() };
    if (displayName) updateData.displayName = displayName;

    const result = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 404, headers: CORS }
      );
    }

    return NextResponse.json({ success: true }, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS }
    );
  }
}

/**
 * DELETE /api/social-media-accounts/[id]
 * Delete an account
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400, headers: CORS }
      );
    }

    const col = await svc.getCollection("socialMediaAccounts");
    const result = await col.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 404, headers: CORS }
      );
    }

    return NextResponse.json(
      { success: true, deletedCount: result.deletedCount },
      { headers: CORS }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS }
    );
  }
}
