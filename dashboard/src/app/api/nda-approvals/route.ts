import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientIdParam = searchParams.get("clientId");

    const col = await svc.getCollection("nda_approvals");

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
    const created = await svc.createNdaApproval(body);
    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
