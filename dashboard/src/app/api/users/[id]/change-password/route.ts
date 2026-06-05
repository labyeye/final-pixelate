import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import bcryptjs from "bcryptjs";
import { requireAuth } from "@/lib/require-auth";

type RouteContext = { params: Promise<{ id: string }> };

async function getRouteId(context: RouteContext) {
  const { id } = await context.params;
  const normalized = String(id ?? "").trim();
  if (!normalized || normalized === "undefined" || normalized === "null") {
    return null;
  }
  return normalized;
}

export async function POST(request: NextRequest, context: RouteContext) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const id = await getRouteId(context);
    if (!id) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 },
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const user = await svc.findById("users", id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.password) {
      return NextResponse.json(
        { error: "User account has no password set" },
        { status: 400 },
      );
    }

    const isPasswordValid = await bcryptjs.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 },
      );
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    const updated = await svc.updateById("users", id, {
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
      user: updated,
    });
  } catch (e: any) {
    console.error("Password change error:", e);
    return NextResponse.json(
      { error: e.message || "Failed to change password" },
      { status: 500 },
    );
  }
}
