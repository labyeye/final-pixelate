import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  
  const clientId = searchParams.get("clientId");
  const accountId = searchParams.get("accountId");

  if (!clientId && !accountId) {
    return NextResponse.json(
      { error: "clientId query param is required" },
      { status: 400 },
    );
  }

  const appId = process.env.FACEBOOK_APP_ID;
  if (!appId) {
    return NextResponse.json(
      { error: "FACEBOOK_APP_ID is not configured in environment variables" },
      { status: 500 },
    );
  }

  const appUrl = "https://backend.pixelatenest.com";

  const callbackUrl = `${appUrl}/api/auth/meta/callback`;

  
  const state = clientId
    ? JSON.stringify({ clientId })
    : JSON.stringify({ accountId });

  const oauthUrl = new URL("https://www.facebook.com/v19.0/dialog/oauth");
  oauthUrl.searchParams.set("client_id", appId);
  oauthUrl.searchParams.set("redirect_uri", callbackUrl);
  oauthUrl.searchParams.set(
    "scope",
    "pages_read_engagement,pages_show_list,instagram_basic,instagram_manage_insights,business_management,leads_retrieval,pages_manage_ads",
  );
  oauthUrl.searchParams.set("state", Buffer.from(state).toString("base64"));
  oauthUrl.searchParams.set("response_type", "code");

  return NextResponse.redirect(oauthUrl.toString());
}
