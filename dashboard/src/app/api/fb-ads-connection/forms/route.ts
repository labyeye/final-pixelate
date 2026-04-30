import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { verifyToken } from "@/lib/auth";
import { getLeadAdForms } from "@/lib/meta-api";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

/**
 * GET /api/fb-ads-connection/forms?clientId=xxx
 * Admin only: list all Lead Ad forms available on the client's connected Ad Account.
 */
export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace("Bearer ", "");
  const decoded: any = verifyToken(token);
  if (!decoded) return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: CORS });
  if (decoded.role !== "admin") return NextResponse.json({ error: "forbidden" }, { status: 403, headers: CORS });

  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId");
  if (!clientId) return NextResponse.json({ error: "clientId required" }, { status: 400, headers: CORS });

  const col = await svc.getCollection("fbAdsConnections");
  const conn = await col.findOne({ clientId });
  if (!conn?.accessToken) {
    return NextResponse.json(
      { error: "No FB Ads connection found for this client. Save the connection first." },
      { status: 404, headers: CORS },
    );
  }

  try {
    const forms = await getLeadAdForms(conn.adAccountId, conn.accessToken);
    return NextResponse.json(forms, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500, headers: CORS });
  }
}
