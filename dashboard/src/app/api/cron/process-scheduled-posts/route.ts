import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { publishInstagramPost, publishFacebookPost } from "@/lib/meta-api";
import { toDateTime } from "@/lib/social-media-planner";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // 1. Fetch posts that are Approved, Scheduled, and time has passed
    const postsCol = await svc.getCollection("socialMediaPosts");
    const accountsCol = await svc.getCollection("socialMediaAccounts");

    const now = new Date();
    
    // We fetch posts that are Scheduled AND Approved
    const pendingPosts = await postsCol
      .find({
        status: "Scheduled",
        approvalStatus: "Approved",
      })
      .toArray();

    const results = [];

    for (const post of pendingPosts) {
      const scheduledDt = toDateTime(post.scheduledDate, post.scheduledTime);
      if (!scheduledDt || scheduledDt > now) continue;

      try {
        // Find the social account for tokens
        let accountId = post.socialAccountId || (post.socialAccountIds && post.socialAccountIds[0]);
        
        console.log(`[DEBUG] Processing post: ${post.title}`);
        console.log(`[DEBUG] Linked Account ID: ${accountId}`);
        
        if (!accountId) {
          throw new Error("No social account linked to this post");
        }

        let queryId: any = accountId;
        try {
          if (typeof accountId === "string" && ObjectId.isValid(accountId)) {
            queryId = new ObjectId(accountId);
          }
        } catch (e) {}

        const account = await accountsCol.findOne({
          $or: [{ _id: queryId }, { _id: accountId.toString() }],
        });

        console.log(`[DEBUG] Account found: ${account ? "Yes" : "No"}`);
        
        // Fetch token from Client document first (like metrics sync does)
        let effectiveToken = account?.accessToken || null;
        
        if (post.clientId) {
          try {
            const clientsCol = await svc.getCollection("clients");
            const client = await clientsCol.findOne({
              _id: typeof post.clientId === "string" ? new ObjectId(post.clientId) : post.clientId,
            });
            if (client?.metaAccessToken) {
              effectiveToken = client.metaAccessToken;
              console.log(`[DEBUG] Using token from Client: ${post.clientId}`);
            }
          } catch (e) {
            console.error("[DEBUG] Error fetching client token:", e);
          }
        }
        
        console.log(`[DEBUG] Token present: ${!!effectiveToken}`);
        
        let mediaUrl = post.mediaFile;
        // Fix for Nextcloud share links - they need /download at the end for direct access
        if (mediaUrl.includes("cloud.laxmilube.in/s/") && !mediaUrl.endsWith("/download")) {
          mediaUrl = mediaUrl.endsWith("/") ? mediaUrl + "download" : mediaUrl + "/download";
          console.log(`[DEBUG] Fixed Media URL for Nextcloud: ${mediaUrl}`);
        }

        console.log(`[DEBUG] Final Media File URL: ${mediaUrl}`);

        if (!effectiveToken) {
          throw new Error(`Access Token missing for post: ${post.title}. Please ensure client or account has a token.`);
        }

        let publishRes;
        if (post.platform === "Instagram") {
          const igId = account?.igAccountId || post.igAccountId;
          if (!igId) throw new Error("Instagram Account ID missing in settings");
          
          publishRes = await publishInstagramPost(
            igId,
            effectiveToken,
            post.caption + (post.hashtags ? "\n\n" + post.hashtags : ""),
            mediaUrl,
            post.contentType === "Reel" ? "REELS" : "IMAGE"
          );
        } else if (post.platform === "Facebook") {
          const fbId = account?.platformAccountId || post.platformAccountId;
          if (!fbId) throw new Error("Facebook Page ID missing in settings");

          publishRes = await publishFacebookPost(
            fbId,
            effectiveToken,
            post.caption + (post.hashtags ? "\n\n" + post.hashtags : ""),
            mediaUrl
          );
        } else {
          // Skip unsupported platforms without marking as failed
          results.push({ id: post._id, status: "Skipped", error: `Platform ${post.platform} auto-posting not supported` });
          continue;
        }

        // Update post status
        await postsCol.updateOne(
          { _id: post._id },
          {
            $set: {
              status: "Posted",
              postedAt: new Date(),
              postedLink: publishRes.permalink,
              platformPostId: publishRes.id,
              updatedAt: new Date(),
            },
          }
        );

        results.push({ id: post._id, status: "Success", link: publishRes.permalink });
      } catch (err: any) {
        console.error(`Failed to post ${post._id}:`, err);
        // Update post with error
        await postsCol.updateOne(
          { _id: post._id },
          {
            $set: {
              status: "Failed",
              notes: `Auto-post failed: ${err.message}`,
              updatedAt: new Date(),
            },
          }
        );
        results.push({ id: post._id, status: "Failed", error: err.message });
      }
    }

    return NextResponse.json({
      processedCount: pendingPosts.length,
      results,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
