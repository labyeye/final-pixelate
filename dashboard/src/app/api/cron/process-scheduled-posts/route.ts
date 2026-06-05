import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { publishInstagramPost, publishFacebookPost } from "@/lib/meta-api";
import { toDateTime } from "@/lib/social-media-planner";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const secret =
    request.headers.get("x-cron-secret") ||
    request.nextUrl.searchParams.get("secret");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const postsCol = await svc.getCollection("socialMediaPosts");
    const accountsCol = await svc.getCollection("socialMediaAccounts");

    const now = new Date();

    const pendingPosts = await postsCol
      .find({
        status: "Scheduled",
        approvalStatus: { $nin: ["Rejected"] },
      })
      .toArray();

    const results = [];

    // Fetch client token once per unique clientId to avoid repeated DB calls
    const clientTokenCache: Record<string, string | null> = {};
    const getClientToken = async (clientId: string): Promise<string | null> => {
      if (clientId in clientTokenCache) return clientTokenCache[clientId];
      try {
        const clientsCol = await svc.getCollection("clients");
        const client = await clientsCol.findOne({
          _id: ObjectId.isValid(clientId) ? new ObjectId(clientId) : (clientId as any),
        });
        clientTokenCache[clientId] = client?.metaAccessToken || null;
      } catch {
        clientTokenCache[clientId] = null;
      }
      return clientTokenCache[clientId];
    };

    for (const post of pendingPosts) {
      const scheduledDt = toDateTime(post.scheduledDate, post.scheduledTime);
      if (!scheduledDt || scheduledDt > now) continue;

      const accountIds: string[] = post.socialAccountIds?.length
        ? post.socialAccountIds
        : post.socialAccountId
          ? [post.socialAccountId]
          : [];

      console.log(`[DEBUG] Processing post: ${post.title} | accounts: ${accountIds.length}`);

      if (accountIds.length === 0) {
        await postsCol.updateOne(
          { _id: post._id },
          { $set: { status: "Failed", notes: "Auto-post failed: No social account linked to this post", updatedAt: new Date() } },
        );
        results.push({ id: post._id, status: "Failed", error: "No social account linked to this post" });
        continue;
      }

      let mediaUrl =
        post.contentType === "Reel" || post.contentType === "Video"
          ? post.reelLink || post.mediaFile
          : post.mediaFile;

      if (mediaUrl && mediaUrl.includes("cloud.laxmilube.in/s/") && !mediaUrl.endsWith("/download")) {
        mediaUrl = mediaUrl.endsWith("/") ? mediaUrl + "download" : mediaUrl + "/download";
      }

      if (!mediaUrl) {
        await postsCol.updateOne(
          { _id: post._id },
          { $set: { status: "Failed", notes: `Auto-post failed: No media URL found. Add a Reel Video Link or Media URL.`, updatedAt: new Date() } },
        );
        results.push({ id: post._id, status: "Failed", error: "No media URL found" });
        continue;
      }

      const caption = post.caption + (post.hashtags ? "\n\n" + post.hashtags : "");
      const accountResults: { accountId: string; status: string; link?: string; error?: string }[] = [];
      const postedLinks: Record<string, string> = { ...(post.postedLinks || {}) };
      let anySuccess = false;

      for (const accountId of accountIds) {
        try {
          let queryId: any = accountId;
          try {
            if (typeof accountId === "string" && ObjectId.isValid(accountId)) queryId = new ObjectId(accountId);
          } catch {}

          const account = await accountsCol.findOne({ $or: [{ _id: queryId }, { _id: accountId.toString() }] });
          console.log(`[DEBUG] Account ${accountId} found: ${account ? "Yes" : "No"} | platform: ${account?.platform}`);

          let effectiveToken = account?.accessToken || null;
          if (post.clientId) {
            const clientToken = await getClientToken(String(post.clientId));
            if (clientToken) effectiveToken = clientToken;
          }

          if (!effectiveToken) throw new Error(`Access Token missing for account ${accountId}`);

          const platform: string = account?.platform || post.platform || "";
          let publishRes: { id: string; permalink: string };

          if (platform === "Instagram") {
            const igId = account?.igAccountId;
            if (!igId) throw new Error(`Instagram Account ID (igAccountId) missing for account ${accountId} — set it in Social Accounts settings`);

            const isVideoContent =
              post.contentType === "Reel" ||
              post.contentType === "Video" ||
              /\.(mp4|mov|avi|mkv|webm|m4v)(\?|$)/i.test(mediaUrl || "");

            publishRes = await publishInstagramPost(igId, effectiveToken, caption, mediaUrl, isVideoContent ? "REELS" : "IMAGE");
          } else if (platform === "Facebook") {
            const fbId = account?.platformAccountId;
            if (!fbId) throw new Error(`Facebook Page ID (platformAccountId) missing for account ${accountId}`);
            const isFbVideo =
              post.contentType === "Reel" ||
              post.contentType === "Video" ||
              /\.(mp4|mov|avi|mkv|webm|m4v)(\?|$)/i.test(mediaUrl || "");
            publishRes = await publishFacebookPost(fbId, effectiveToken, caption, mediaUrl, isFbVideo ? "VIDEO" : "IMAGE");
          } else {
            accountResults.push({ accountId, status: "Skipped", error: `Platform "${platform}" auto-posting not supported` });
            continue;
          }

          postedLinks[accountId] = publishRes.permalink;
          anySuccess = true;
          accountResults.push({ accountId, status: "Success", link: publishRes.permalink });
          console.log(`[DEBUG] Posted to ${platform} account ${accountId}: ${publishRes.permalink}`);
        } catch (err: any) {
          console.error(`Failed to post ${post._id} to account ${accountId}:`, err);
          accountResults.push({ accountId, status: "Failed", error: err.message });
        }
      }

      const allFailed = accountResults.every((r) => r.status === "Failed");
      const finalStatus = allFailed ? "Failed" : "Posted";
      const firstSuccess = accountResults.find((r) => r.status === "Success");

      await postsCol.updateOne(
        { _id: post._id },
        {
          $set: {
            status: finalStatus,
            postedAt: anySuccess ? new Date() : undefined,
            postedLink: firstSuccess?.link || "",
            postedLinks,
            updatedAt: new Date(),
            ...(allFailed && { notes: `Auto-post failed: ${accountResults.map((r) => r.error).filter(Boolean).join("; ")}` }),
          },
        },
      );

      results.push({ id: post._id, status: finalStatus, accounts: accountResults });
    }

    return NextResponse.json({
      processedCount: pendingPosts.length,
      results,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
