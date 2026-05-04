import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import * as svc from "@/lib/services";
import { fetchFbPostMetrics, fetchIgMediaMetrics } from "@/lib/meta-api";

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

    if (!account.accessToken || !account.platformAccountId) {
      return NextResponse.json(
        {
          error:
            "This account is not connected to Meta. Go to the Planner → Accounts section and click 'Connect to Meta'.",
          needsConnect: true,
          accountId,
        },
        { status: 400, headers: CORS },
      );
    }

    const platform: string = post.platform;
    let metrics;

    if (platform === "Facebook") {
      metrics = await fetchFbPostMetrics(
        postedUrl,
        account.platformAccountId,
        account.accessToken,
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
        account.accessToken,
      );
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
