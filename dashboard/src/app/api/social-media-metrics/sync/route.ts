import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import * as svc from "@/lib/services";
import {
  fetchFbPostMetrics,
  fetchIgMediaMetrics,
  getUserPages,
} from "@/lib/meta-api";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId, accountId } = body as {
      postId?: string;
      accountId?: string;
    };

    if (!postId || !accountId) {
      return NextResponse.json(
        { error: "postId and accountId are required" },
        { status: 400, headers: CORS },
      );
    }

    const postsCol = await svc.getCollection("socialMediaPosts");
    let post: any;
    try {
      post = await postsCol.findOne({ _id: new ObjectId(postId) });
    } catch {
      return NextResponse.json(
        { error: "Invalid postId" },
        { status: 400, headers: CORS },
      );
    }
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404, headers: CORS },
      );
    }

    const postedUrl: string | undefined =
      (post.postedLinks && post.postedLinks[accountId]) ||
      post.postedLink ||
      undefined;

    if (!postedUrl) {
      return NextResponse.json(
        {
          error:
            "No post URL found for this account. Please save the posted link first (use 'Mark as Posted' in the Planner).",
        },
        { status: 400, headers: CORS },
      );
    }

    const accountsCol = await svc.getCollection("socialMediaAccounts");
    let account: any;
    try {
      account = await accountsCol.findOne({ _id: new ObjectId(accountId) });
    } catch {
      return NextResponse.json(
        { error: "Invalid accountId" },
        { status: 400, headers: CORS },
      );
    }
    if (!account) {
      return NextResponse.json(
        { error: "Account not found" },
        { status: 404, headers: CORS },
      );
    }

    // Token priority: client System User Token → account Page Token → (no company fallback for client metrics)
    let clientMetaToken: string | null = null;
    if (post.clientId) {
      try {
        const clientsCol = await svc.getCollection("clients");
        const client = await clientsCol.findOne({
          _id: new ObjectId(post.clientId),
        });
        clientMetaToken = client?.metaAccessToken || null;
      } catch {}
    }
    // Prefer client's System User Token (doesn't expire) over account's Page Token (expires in 60 days)
    const baseToken = clientMetaToken || account.accessToken;

    if (!baseToken || !account.platformAccountId) {
      return NextResponse.json(
        {
          error: !account.platformAccountId
            ? "No Page ID saved for this account. Go to the client's Social Tokens tab and enter the Facebook Page ID."
            : "No access token available. Go to the client's Social Tokens tab and add a System User Token.",
          needsConnect: true,
          accountId,
        },
        { status: 400, headers: CORS },
      );
    }

    // Auto-exchange user token → page token.
    // Page-level endpoints (metrics, insights) require a Page Access Token, not a User Token.
    let effectiveToken = baseToken;
    try {
      const pages = await getUserPages(baseToken);
      const matchedPage = pages.find(
        (p) => String(p.id) === String(account.platformAccountId),
      );
      if (matchedPage?.access_token) {
        effectiveToken = matchedPage.access_token;
      }
    } catch {
      // if /me/accounts fails, proceed with stored token (may already be a page token)
    }

    const platform: string = post.platform;
    let metrics;

    // Catch URL/platform mismatch early before wasting API calls
    const urlLower = postedUrl.toLowerCase();
    if (
      platform === "Facebook" &&
      !urlLower.includes("facebook.com") &&
      !urlLower.includes("fb.com")
    ) {
      return NextResponse.json(
        {
          error: `URL mismatch: platform is Facebook but the posted link is not a Facebook URL (${postedUrl}). Update the posted link in the Planner.`,
        },
        { status: 400, headers: CORS },
      );
    }
    if (platform === "Instagram" && !urlLower.includes("instagram.com")) {
      return NextResponse.json(
        {
          error: `URL mismatch: platform is Instagram but the posted link is not an Instagram URL (${postedUrl}). Update the posted link in the Planner.`,
        },
        { status: 400, headers: CORS },
      );
    }

    if (platform === "Facebook") {
      metrics = await fetchFbPostMetrics(
        postedUrl,
        account.platformAccountId,
        effectiveToken,
      );
    } else if (platform === "Instagram") {
      if (!account.igAccountId) {
        return NextResponse.json(
          {
            error:
              "No Instagram Business Account linked to this account. Make sure your Facebook Page has an Instagram Business Account connected.",
          },
          { status: 400, headers: CORS },
        );
      }
      metrics = await fetchIgMediaMetrics(
        postedUrl,
        account.igAccountId,
        effectiveToken,
      );
      if ((metrics as any).skipped) {
        return NextResponse.json(
          { skipped: true, reason: (metrics as any).skipReason },
          { status: 200, headers: CORS },
        );
      }
    } else {
      return NextResponse.json(
        {
          error: `Auto-sync is not supported for ${platform} yet. Supported: Facebook, Instagram.`,
        },
        { status: 400, headers: CORS },
      );
    }

    await postsCol.updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: {
          [`accountMetrics.${accountId}`]: metrics,
          updatedAt: new Date(),
        },
      },
    );

    return NextResponse.json({ success: true, metrics }, { headers: CORS });
  } catch (e: any) {
    console.error("Metrics sync error:", e);
    return NextResponse.json(
      { error: e.message || "Sync failed. Check server logs for details." },
      { status: 500, headers: CORS },
    );
  }
}
