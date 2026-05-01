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
    const msg = e.message || String(e);
    console.error("[fb-ads-connection/forms] Error for clientId", clientId, ":", msg);
    return NextResponse.json(
      {
        error: msg,
        hint: msg.includes("190") || msg.includes("Invalid OAuth")
          ? "Token is expired or invalid. Generate a new User Access Token from Meta Business Manager."
          : msg.includes("Pages") || msg.includes("pages_show_list")
          ? "Token needs 'pages_show_list' permission. Re-generate with that scope."
          : msg.includes("200") || msg.includes("permission")
          ? "Token is missing permissions. Re-generate with: ads_management, leads_retrieval, pages_show_list, pages_read_engagement."
          : "Check that the token has: ads_management + leads_retrieval + pages_show_list permissions.",
      },
      { status: 500, headers: CORS },
    );
  }
}
