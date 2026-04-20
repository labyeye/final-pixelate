import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import * as svc from "@/lib/services";
import { verifyToken } from "@/lib/auth";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Helper function to log events to ERP console
async function logErpEvent(
  type: string,
  target: string,
  details: any,
  userId?: string | null,
  email?: string | null
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/erp-events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, target, details, userId, email }),
      }
    );
    if (!response.ok) {
      console.warn("Failed to log ERP event:", await response.text());
    }
  } catch (err) {
    console.error("Error logging ERP event:", err);
  }
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const col = await svc.getCollection("socialMediaPosts");
    const item = await col.findOne({ _id: new ObjectId(id) });
    if (!item) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404, headers: CORS },
      );
    }
    return NextResponse.json(item, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const auth = request.headers.get("authorization") || "";
    const token = auth.replace("Bearer ", "");
    const decoded: any = token ? verifyToken(token) : null;

    const body = await request.json();
    const col = await svc.getCollection("socialMediaPosts");

    // Get the old post for comparison
    const oldPost = await col.findOne({ _id: new ObjectId(id) });
    
    if (!oldPost) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404, headers: CORS },
      );
    }

    // Remove immutable fields from the update
    const { _id, createdAt, ...updateData } = body;

    const updates = {
      ...updateData,
      updatedAt: new Date(),
    };

    const result = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates },
    );

    if (!result.matchedCount) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404, headers: CORS },
      );
    }

    const updated = await col.findOne({ _id: new ObjectId(id) });

    // Log the update event to ERP
    await logErpEvent(
      "post_updated",
      "socialMediaPost",
      {
        postId: id,
        changes: Object.keys(updateData).filter(
          (key) => (oldPost as any)[key] !== (updateData as any)[key]
        ),
        before: oldPost,
        after: updated,
      },
      decoded?.userId,
      decoded?.email
    );

    return NextResponse.json(updated, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const auth = request.headers.get("authorization") || "";
    const token = auth.replace("Bearer ", "");
    const decoded: any = token ? verifyToken(token) : null;

    if (!decoded || decoded.role !== "client") {
      return NextResponse.json(
        { error: "Unauthorized - Only clients can approve/reject posts" },
        { status: 401, headers: CORS },
      );
    }

    const body = await request.json();
    const col = await svc.getCollection("socialMediaPosts");

    // Find the post and verify it belongs to the client
    const post = await col.findOne({ _id: new ObjectId(id) });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404, headers: CORS },
      );
    }

    // Verify this post belongs to the client's company
    if (post.clientId !== decoded.clientId) {
      return NextResponse.json(
        { error: "Unauthorized - This post does not belong to you" },
        { status: 403, headers: CORS },
      );
    }

    // Only allow approval status and rejection reason updates
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (body.approvalStatus) {
      updateData.approvalStatus = body.approvalStatus;
    }

    if (body.rejectionReason && body.approvalStatus === "Rejected") {
      updateData.rejectionReason = body.rejectionReason;
    }

    const result = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Failed to update post" },
        { status: 400, headers: CORS },
      );
    }

    const updatedPost = await col.findOne({ _id: new ObjectId(id) });
    return NextResponse.json(updatedPost, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500, headers: CORS },
    );
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    // Extract user info from Authorization header or request body
    const body = await request.json().catch(() => ({}));
    let userId: string | null = body?.userId || null;
    let email: string | null = body?.email || null;

    // Try to extract from JWT token if not provided in body
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

    // Get the post before deletion to capture details for logging
    const col = await svc.getCollection("socialMediaPosts");
    const postBefore = await col.findOne({ _id: new ObjectId(id) });

    const ok = await svc.softDeleteById("socialMediaPosts", id, "Social Media Post");
    if (!ok) {
      return NextResponse.json(
        { error: "Delete failed" },
        { status: 500, headers: CORS },
      );
    }

    // Log the post deletion event to ERP console
    if (postBefore) {
      await logErpEvent(
        "post_deleted",
        `post_${id}`,
        {
          postId: id,
          postTitle: postBefore.title,
          platform: postBefore.platform,
          socialAccountIds: postBefore.socialAccountIds || [],
          socialAccountId: postBefore.socialAccountId,
          clientId: postBefore.clientId,
          status: postBefore.status,
          scheduledDate: postBefore.scheduledDate,
        },
        userId,
        email
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
