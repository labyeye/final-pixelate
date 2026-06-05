import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { ObjectId } from "mongodb";
import { requireAuth } from "@/lib/require-auth";

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const users = await svc.getUsers();

    const staff = users
      .filter((u: any) => u.role === "staff")
      .map((u: any) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,

        allowedPages: u.allowedPages || [],
        pagePermissions:
          u.pagePermissions ||
          (u.allowedPages || []).reduce((acc: any, href: string) => {
            acc[href] = { view: true };
            return acc;
          }, {}),
      }));

    return NextResponse.json(staff);
  } catch (error: any) {
    console.error("Error fetching staff settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch staff settings" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const body = await request.json();
    const { userId, allowedPages, pagePermissions } = body;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    let finalAllowedPages: string[] = [];
    if (pagePermissions && typeof pagePermissions === "object") {
      finalAllowedPages = Object.keys(pagePermissions).filter((href) => {
        const perms = pagePermissions[href] || {};
        return !!(perms.view || perms.add || perms.edit || perms.delete);
      });
    } else if (Array.isArray(allowedPages)) {
      finalAllowedPages = allowedPages;
    } else {
      finalAllowedPages = [];
    }

    const col = await svc.getCollection("users");

    const update: any = { allowedPages: finalAllowedPages };
    if (pagePermissions && typeof pagePermissions === "object")
      update.pagePermissions = pagePermissions;

    await col.updateOne({ _id: new ObjectId(userId) }, { $set: update });

    try {
      const { getDb } = await import("@/lib/mongodb");
      const db = await getDb();

      const targetUser = await db
        .collection("users")
        .findOne({ _id: new ObjectId(userId) });
      const targetName = targetUser?.name || targetUser?.email || userId;

      const adminName = body.adminName || "Admin";

      await db.collection("erp_events").insertOne({
        type: "permission_change",
        userId,
        targetName,
        adminName,
        details: { pagePermissions },
        createdAt: new Date(),
      });
    } catch (e) {
      console.error("Failed to log permission change", e);
    }

    return NextResponse.json({
      success: true,
      userId,
      allowedPages: finalAllowedPages,
      pagePermissions,
    });
  } catch (error: any) {
    console.error("Error updating staff settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update staff settings" },
      { status: 500 },
    );
  }
}
