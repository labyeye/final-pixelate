import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { verifyToken } from "@/lib/auth";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}







export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace("Bearer ", "");
  const decoded: any = verifyToken(token);
  if (!decoded) return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: CORS });

  const { searchParams } = new URL(request.url);
  let clientId = searchParams.get("clientId");
  if (decoded.role === "client") clientId = decoded.clientId;
  if (!clientId) return NextResponse.json({ error: "clientId required" }, { status: 400, headers: CORS });

  const col = await svc.getCollection("fbAdsConnections");
  const conn = await col.findOne({ clientId });
  if (!conn) return NextResponse.json(null, { headers: CORS });

  
  const { accessToken: _tok, ...safe } = conn as any;
  return NextResponse.json({ ...safe, isConnected: !!_tok }, { headers: CORS });
}






export async function POST(request: NextRequest) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace("Bearer ", "");
  const decoded: any = verifyToken(token);
  if (!decoded) return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: CORS });
  if (decoded.role !== "admin") return NextResponse.json({ error: "forbidden" }, { status: 403, headers: CORS });

  const body = await request.json();
  const { clientId, accessToken, adAccountId, datasetId, selectedFormIds } = body;
  if (!clientId || !accessToken || !adAccountId) {
    return NextResponse.json(
      { error: "clientId, accessToken and adAccountId are required" },
      { status: 400, headers: CORS },
    );
  }

  const col = await svc.getCollection("fbAdsConnections");
  await col.updateOne(
    { clientId },
    {
      $set: {
        clientId,
        accessToken,
        adAccountId: adAccountId.startsWith("act_") ? adAccountId : `act_${adAccountId}`,
        datasetId: datasetId || null,
        selectedFormIds: Array.isArray(selectedFormIds) ? selectedFormIds : [],
        isActive: true,
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date(), lastSyncAt: null, totalImported: 0 },
    },
    { upsert: true },
  );

  return NextResponse.json({ success: true }, { headers: CORS });
}






export async function PATCH(request: NextRequest) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace("Bearer ", "");
  const decoded: any = verifyToken(token);
  if (!decoded) return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: CORS });
  if (decoded.role !== "admin") return NextResponse.json({ error: "forbidden" }, { status: 403, headers: CORS });

  const body = await request.json();
  const { clientId, selectedFormIds, datasetId } = body;
  if (!clientId) return NextResponse.json({ error: "clientId required" }, { status: 400, headers: CORS });

  const updates: Record<string, any> = { updatedAt: new Date() };
  if (Array.isArray(selectedFormIds)) updates.selectedFormIds = selectedFormIds;
  if (datasetId !== undefined) updates.datasetId = datasetId || null;

  const col = await svc.getCollection("fbAdsConnections");
  await col.updateOne({ clientId }, { $set: updates });
  return NextResponse.json({ success: true }, { headers: CORS });
}





export async function DELETE(request: NextRequest) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace("Bearer ", "");
  const decoded: any = verifyToken(token);
  if (!decoded) return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: CORS });
  if (decoded.role !== "admin") return NextResponse.json({ error: "forbidden" }, { status: 403, headers: CORS });

  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId");
  if (!clientId) return NextResponse.json({ error: "clientId required" }, { status: 400, headers: CORS });

  const col = await svc.getCollection("fbAdsConnections");
  await col.deleteOne({ clientId });
  return NextResponse.json({ success: true }, { headers: CORS });
}
