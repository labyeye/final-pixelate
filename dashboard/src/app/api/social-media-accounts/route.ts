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

function normalizeHandle(handle: string): string {
  return (handle || "").toLowerCase().replace(/^@+/, "").trim();
}

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
        query.id = id;
      }
    }

    const accounts = await col
      .find(query)
      .sort({ platform: 1, handle: 1 })
      .toArray();

    const safe = accounts.map(({ accessToken, ...rest }) => ({
      ...rest,
      isConnected: !!accessToken,
      hasToken: !!accessToken,
    }));

    return NextResponse.json(safe, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}

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
        { status: 400, headers: CORS },
      );
    }

    if (!handle) {
      return NextResponse.json(
        {
          error:
            "Username/Handle is required and must be at least 1 character after normalization",
        },
        { status: 400, headers: CORS },
      );
    }

    if (handle.length > 500) {
      return NextResponse.json(
        { error: "Username/Handle must be less than 500 characters" },
        { status: 400, headers: CORS },
      );
    }

    const existing = await col.findOne({
      clientId,
      platform,
      handle,
    });

    if (existing) {
      return NextResponse.json(existing, { status: 200, headers: CORS });
    }

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
      { status: 201, headers: CORS },
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400, headers: CORS },
      );
    }

    const col = await svc.getCollection("socialMediaAccounts");
    const displayName = body?.displayName;

    const updateData: any = { updatedAt: new Date() };
    if (displayName) updateData.displayName = displayName;
    if (body.accessToken !== undefined) updateData.accessToken = body.accessToken;
    if (body.platformAccountId !== undefined) updateData.platformAccountId = body.platformAccountId;
    if (body.igAccountId !== undefined) updateData.igAccountId = body.igAccountId;

    const result = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 404, headers: CORS },
      );
    }

    return NextResponse.json({ success: true }, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400, headers: CORS },
      );
    }

    const col = await svc.getCollection("socialMediaAccounts");
    const result = await col.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 404, headers: CORS },
      );
    }

    return NextResponse.json(
      { success: true, deletedCount: result.deletedCount },
      { headers: CORS },
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}
