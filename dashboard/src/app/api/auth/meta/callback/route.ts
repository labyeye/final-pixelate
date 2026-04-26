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
  const accountId = searchParams.get("state");
  const oauthError = searchParams.get("error");

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    "http://localhost:9002";

  const returnBase = `${appUrl}/social-media-planner/planner`;

  if (oauthError || !code || !accountId) {
    const reason = oauthError || "missing_code";
    return NextResponse.redirect(`${returnBase}?meta_error=${encodeURIComponent(reason)}`);
  }

  try {
    const callbackUrl = `${appUrl}/api/auth/meta/callback`;

    
    const tokenUrl = new URL("https://graph.facebook.com/v19.0/oauth/access_token");
    tokenUrl.searchParams.set("client_id", process.env.FACEBOOK_APP_ID!);
    tokenUrl.searchParams.set("client_secret", process.env.FACEBOOK_APP_SECRET!);
    tokenUrl.searchParams.set("redirect_uri", callbackUrl);
    tokenUrl.searchParams.set("code", code);

    const tokenRes = await fetch(tokenUrl.toString());
    if (!tokenRes.ok) {
      throw new Error(`Code exchange failed: ${await tokenRes.text()}`);
    }
    const { access_token: shortToken } = await tokenRes.json();

    
    const longToken = await exchangeForLongLivedToken(shortToken);

    
    const pages = await getUserPages(longToken);
    if (pages.length === 0) {
      throw new Error("No Facebook Pages found. Make sure you manage at least one Page.");
    }

    
    const enrichedPages = await Promise.all(
      pages.map(async (page) => {
        const details = await getPageDetails(page.id, page.access_token);
        return { ...page, link: details.link, username: details.username };
      }),
    );

    
    const col = await svc.getCollection("socialMediaAccounts");
    let triggerAccount: any = null;
    try {
      triggerAccount = await col.findOne({ _id: new ObjectId(accountId) });
    } catch {
      
    }

    
    let connectedCount = 0;

    for (const page of enrichedPages) {
      const pageLink = (page.link || "").toLowerCase();
      const pageUsername = (page.username || "").toLowerCase();
      const pageId = page.id;

      
      const query: any = { platform: { $in: ["Facebook", "Instagram"] } };
      if (triggerAccount?.clientId) query.clientId = triggerAccount.clientId;

      const candidates = await col.find(query).toArray();

      for (const acc of candidates) {
        const handle = (acc.handle || "").toLowerCase();

        const matches =
          
          (pageLink && (handle === pageLink || handle.includes(pageUsername))) ||
          
          (pageUsername && handle === pageUsername) ||
          
          handle.includes(pageId) ||
          
          (pageLink && pageLink.includes(handle.replace(/^https?:\/\/[^/]+\

        if (matches) {
          await col.updateOne(
            { _id: acc._id },
            {
              $set: {
                accessToken: page.access_token,
                platformAccountId: pageId,
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
        { _id: new ObjectId(accountId) },
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
      `${returnBase}?meta_connected=${connectedCount}&pages=${enrichedPages.length}`,
    );
  } catch (e: any) {
    console.error("Meta OAuth callback error:", e);
    return NextResponse.redirect(
      `${returnBase}?meta_error=${encodeURIComponent(e.message || "unknown_error")}`,
    );
  }
}
