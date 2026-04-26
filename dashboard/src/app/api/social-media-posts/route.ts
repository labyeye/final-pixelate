import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { verifyToken } from "@/lib/auth";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};


async function logErpEvent(
  type: string,
  target: string,
  details: any,
  userId?: string | null,
  email?: string | null,
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/erp-events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, target, details, userId, email }),
      },
    );
    if (!response.ok) {
      console.warn("Failed to log ERP event:", await response.text());
    }
  } catch (err) {
    console.error("Error logging ERP event:", err);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

export async function GET(request: NextRequest) {
  try {
    const col = await svc.getCollection("socialMediaPosts");
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");
    const platform = searchParams.get("platform");
    const assignedTo = searchParams.get("assignedTo");
    const status = searchParams.get("status");
    const contentType = searchParams.get("contentType");
    const fromDate = searchParams.get("fromDate");
    const toDate = searchParams.get("toDate");

    const query: any = {};
    if (clientId) query.clientId = clientId;
    if (platform) query.platform = platform;
    if (assignedTo) query.assignedTo = assignedTo;
    if (status) query.status = status;
    if (contentType) query.contentType = contentType;
    if (fromDate || toDate) {
      query.scheduledDate = {};
      if (fromDate) query.scheduledDate.$gte = fromDate;
      if (toDate) query.scheduledDate.$lte = toDate;
    }

    const items = await col
      .find(query)
      .sort({ scheduledDate: 1, scheduledTime: 1, createdAt: -1 })
      .toArray();

    return NextResponse.json(items, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}

export async function POST(request: Request) {
  try {
    
    const body = await request.json();
    let userId: string | null = body?.userId || null;
    let email: string | null = body?.email || null;

    
    if (!userId || !email) {
      const auth = request.headers.get("authorization") || "";
      const token = auth.replace("Bearer ", "");
      if (token) {
        const decoded: any = verifyToken(token);
        if (decoded) {
          userId = decoded.id || decoded.userId || null;
          email = decoded.email || null;
        }
      }
    }

    const col = await svc.getCollection("socialMediaPosts");

    const toInsert = {
      clientId: body?.clientId || "",
      socialAccountId: body?.socialAccountId || "",
      socialAccountIds: body?.socialAccountIds || [], 
      title: body?.title || "",
      platform: body?.platform || "Instagram",
      contentType: body?.contentType || "Image Post",
      caption: body?.caption || "",
      hashtags: body?.hashtags || "",
      mediaFile: body?.mediaFile || "",
      scheduledDate: body?.scheduledDate || "",
      scheduledTime: body?.scheduledTime || "",
      assignedTo: body?.assignedTo || "",
      status: body?.status || "Draft",
      approvalStatus: body?.approvalStatus || "Pending",
      notes: body?.notes || "",
      postedLink: body?.postedLink || "",
      createdBy: body?.createdBy || "",
      views: body?.views || 0,
      likes: body?.likes || 0,
      comments: body?.comments || 0,
      shares: body?.shares || 0,
      followers_gained: body?.followers_gained || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const res = await col.insertOne(toInsert);

    
    await logErpEvent(
      "post_created",
      `post_${res.insertedId}`,
      {
        postId: res.insertedId.toString(),
        postTitle: toInsert.title,
        platform: toInsert.platform,
        socialAccountIds: toInsert.socialAccountIds,
        socialAccountId: toInsert.socialAccountId,
        clientId: toInsert.clientId,
        scheduledDate: toInsert.scheduledDate,
        status: toInsert.status,
      },
      userId,
      email,
    );

    return NextResponse.json(
      { ...toInsert, _id: res.insertedId },
      { status: 201, headers: CORS },
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400, headers: CORS },
      );
    }

    
    let userId: string | null = body?.userId || null;
    let email: string | null = body?.email || null;

    
    if (!userId || !email) {
      const auth = request.headers.get("authorization") || "";
      const token = auth.replace("Bearer ", "");
      if (token) {
        const decoded: any = verifyToken(token);
        if (decoded) {
          userId = decoded.id || decoded.userId || null;
          email = decoded.email || null;
        }
      }
    }

    const col = await svc.getCollection("socialMediaPosts");
    const { ObjectId } = await import("mongodb");

    
    const postBefore = await col.findOne({ _id: new ObjectId(id) });

    const updateData: any = {
      updatedAt: new Date(),
    };

    
    const changedFields: string[] = [];
    const changeDetails: any = {};

    
    if (body.accountId) {
      
      const accountMetricsKey = `accountMetrics.${body.accountId}`;
      updateData[accountMetricsKey] = {
        views: Math.max(0, body.views || 0),
        likes: Math.max(0, body.likes || 0),
        comments: Math.max(0, body.comments || 0),
        shares: Math.max(0, body.shares || 0),
        followers_gained: Math.max(0, body.followers_gained || 0),
      };
      changedFields.push("accountMetrics");
      changeDetails.accountMetrics = {
        accountId: body.accountId,
        metrics: updateData[accountMetricsKey],
      };
    } else {
      
      if (body.views !== undefined && postBefore?.views !== body.views) {
        updateData.views = Math.max(0, body.views);
        changedFields.push("views");
        changeDetails.views = { before: postBefore?.views, after: body.views };
      }
      if (body.likes !== undefined && postBefore?.likes !== body.likes) {
        updateData.likes = Math.max(0, body.likes);
        changedFields.push("likes");
        changeDetails.likes = { before: postBefore?.likes, after: body.likes };
      }
      if (
        body.comments !== undefined &&
        postBefore?.comments !== body.comments
      ) {
        updateData.comments = Math.max(0, body.comments);
        changedFields.push("comments");
        changeDetails.comments = {
          before: postBefore?.comments,
          after: body.comments,
        };
      }
      if (body.shares !== undefined && postBefore?.shares !== body.shares) {
        updateData.shares = Math.max(0, body.shares);
        changedFields.push("shares");
        changeDetails.shares = {
          before: postBefore?.shares,
          after: body.shares,
        };
      }
      if (
        body.followers_gained !== undefined &&
        postBefore?.followers_gained !== body.followers_gained
      ) {
        updateData.followers_gained = Math.max(0, body.followers_gained);
        changedFields.push("followers_gained");
        changeDetails.followers_gained = {
          before: postBefore?.followers_gained,
          after: body.followers_gained,
        };
      }
    }

    
    if (body.status !== undefined && postBefore?.status !== body.status) {
      updateData.status = body.status;
      changedFields.push("status");
      changeDetails.status = { before: postBefore?.status, after: body.status };
    }
    if (
      body.scheduledDate !== undefined &&
      postBefore?.scheduledDate !== body.scheduledDate
    ) {
      updateData.scheduledDate = body.scheduledDate;
      changedFields.push("scheduledDate");
      changeDetails.scheduledDate = {
        before: postBefore?.scheduledDate,
        after: body.scheduledDate,
      };
    }
    if (
      body.scheduledTime !== undefined &&
      postBefore?.scheduledTime !== body.scheduledTime
    ) {
      updateData.scheduledTime = body.scheduledTime;
      changedFields.push("scheduledTime");
      changeDetails.scheduledTime = {
        before: postBefore?.scheduledTime,
        after: body.scheduledTime,
      };
    }
    if (
      body.postedLink !== undefined &&
      postBefore?.postedLink !== body.postedLink
    ) {
      updateData.postedLink = body.postedLink;
      changedFields.push("postedLink");
      changeDetails.postedLink = {
        before: postBefore?.postedLink,
        after: body.postedLink,
      };
    }

    const result = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404, headers: CORS },
      );
    }

    
    if (changedFields.length > 0) {
      await logErpEvent(
        "post_updated",
        `post_${id}`,
        {
          postId: id,
          postTitle: postBefore?.title,
          platform: postBefore?.platform,
          changedFields,
          changes: changeDetails,
          clientId: postBefore?.clientId,
        },
        userId,
        email,
      );
    }

    return NextResponse.json({ success: true }, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}
