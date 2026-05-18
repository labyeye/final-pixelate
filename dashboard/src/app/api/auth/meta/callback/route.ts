import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import * as svc from "@/lib/services";
import {
  exchangeForLongLivedToken,
  getUserPages,
  getPageDetails,
} from "@/lib/meta-api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const stateRaw = searchParams.get("state");
  const oauthError = searchParams.get("error");

  const appUrl = "https://backend.pixelatenest.com";

  let stateObj: { clientId?: string; accountId?: string } = {};
  try {
    stateObj = JSON.parse(Buffer.from(stateRaw || "", "base64").toString());
  } catch {
    stateObj = { accountId: stateRaw || "" };
  }

  const { clientId, accountId } = stateObj;
  const returnUrl = clientId
    ? `${appUrl}/clients/${clientId}?tab=social-tokens`
    : `${appUrl}/social-media-planner/planner`;

  if (oauthError || !code) {
    return NextResponse.redirect(
      `${returnUrl}&meta_error=${encodeURIComponent(oauthError || "missing_code")}`,
    );
  }

  try {
    const callbackUrl = `${appUrl}/api/auth/meta/callback`;

    const tokenUrl = new URL(
      "https://graph.facebook.com/v19.0/oauth/access_token",
    );
    tokenUrl.searchParams.set("client_id", process.env.FACEBOOK_APP_ID!);
    tokenUrl.searchParams.set(
      "client_secret",
      process.env.FACEBOOK_APP_SECRET!,
    );
    tokenUrl.searchParams.set("redirect_uri", callbackUrl);
    tokenUrl.searchParams.set("code", code);

    const tokenRes = await fetch(tokenUrl.toString());
    if (!tokenRes.ok)
      throw new Error(`Code exchange failed: ${await tokenRes.text()}`);
    const { access_token: shortToken } = await tokenRes.json();

    const longToken = await exchangeForLongLivedToken(shortToken);

    const pages = await getUserPages(longToken);
    if (pages.length === 0) {
      throw new Error(
        "No Facebook Pages found. Make sure you manage at least one Page.",
      );
    }

    const enrichedPages = await Promise.all(
      pages.map(async (page) => {
        const details = await getPageDetails(page.id, page.access_token);
        return { ...page, link: details.link, username: details.username };
      }),
    );

    if (clientId) {
      const clientsCol = await svc.getCollection("clients");
      const accountsCol = await svc.getCollection("socialMediaAccounts");

      await clientsCol.updateOne(
        { _id: new ObjectId(clientId) },
        { $set: { metaAccessToken: longToken, updatedAt: new Date() } },
      );

      let upserted = 0;

      for (const page of enrichedPages) {
        const igId = page.instagram_business_account?.id ?? null;

        await accountsCol.updateOne(
          { clientId, platform: "Facebook", platformAccountId: page.id },
          {
            $set: {
              clientId,
              platform: "Facebook",
              handle: (page.username || page.id).toLowerCase(),
              displayName: page.name,
              accessToken: page.access_token,
              platformAccountId: page.id,
              igAccountId: igId,
              connectedPageName: page.name,
              updatedAt: new Date(),
            },
            $setOnInsert: { createdAt: new Date() },
          },
          { upsert: true },
        );
        upserted++;

        if (igId) {
          await accountsCol.updateOne(
            { clientId, platform: "Instagram", igAccountId: igId },
            {
              $set: {
                clientId,
                platform: "Instagram",
                handle: (page.username || igId).toLowerCase(),
                displayName: `${page.name} (Instagram)`,
                accessToken: page.access_token,
                platformAccountId: page.id,
                igAccountId: igId,
                connectedPageName: page.name,
                updatedAt: new Date(),
              },
              $setOnInsert: { createdAt: new Date() },
            },
            { upsert: true },
          );
          upserted++;
        }
      }

      return NextResponse.redirect(
        `${returnUrl}&meta_connected=${upserted}&pages=${enrichedPages.length}`,
      );
    }

    const col = await svc.getCollection("socialMediaAccounts");
    let triggerAccount: any = null;
    try {
      triggerAccount = await col.findOne({ _id: new ObjectId(accountId!) });
    } catch {}

    let connectedCount = 0;

    for (const page of enrichedPages) {
      const pageLink = (page.link || "").toLowerCase();
      const pageUsername = (page.username || "").toLowerCase();

      const query: any = { platform: { $in: ["Facebook", "Instagram"] } };
      if (triggerAccount?.clientId) query.clientId = triggerAccount.clientId;

      const candidates = await col.find(query).toArray();
      for (const acc of candidates) {
        const handle = (acc.handle || "").toLowerCase();
        const matches =
          (pageUsername && handle === pageUsername) ||
          (pageLink && handle.includes(pageUsername)) ||
          handle.includes(page.id);

        if (matches) {
          await col.updateOne(
            { _id: acc._id },
            {
              $set: {
                accessToken: page.access_token,
                platformAccountId: page.id,
                igAccountId: page.instagram_business_account?.id ?? null,
                connectedPageName: page.name,
                updatedAt: new Date(),
              },
            },
          );
          connectedCount++;
        }
      }
    }

    if (connectedCount === 0 && triggerAccount) {
      const firstPage = enrichedPages[0];
      await col.updateOne(
        { _id: new ObjectId(accountId!) },
        {
          $set: {
            accessToken: firstPage.access_token,
            platformAccountId: firstPage.id,
            igAccountId: firstPage.instagram_business_account?.id ?? null,
            connectedPageName: firstPage.name,
            updatedAt: new Date(),
          },
        },
      );
      connectedCount = 1;
    }

    return NextResponse.redirect(
      `${returnUrl}?meta_connected=${connectedCount}&pages=${enrichedPages.length}`,
    );
  } catch (e: any) {
    console.error("Meta OAuth callback error:", e);
    return NextResponse.redirect(
      `${returnUrl}&meta_error=${encodeURIComponent(e.message || "unknown_error")}`,
    );
  }
}
