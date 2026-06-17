import { NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { verifyPassword, signToken } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import {
  checkLoginRateLimit,
  clearLoginRateLimit,
} from "@/lib/login-rate-limiter";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password)
      return NextResponse.json(
        { error: "email+password required" },
        { status: 400 },
      );

    const { allowed, retryAfterSecs } = checkLoginRateLimit(email);
    if (!allowed) {
      const mins = Math.ceil((retryAfterSecs ?? 900) / 60);
      return NextResponse.json(
        {
          error: `Too many failed attempts. Try again in ${mins} minute${mins !== 1 ? "s" : ""}.`,
        },
        { status: 429, headers: { "Retry-After": String(retryAfterSecs) } },
      );
    }

    const users = await svc.getUsers();
    const u = (users || []).find((x: any) => x.email === email);
    if (!u)
      return NextResponse.json(
        { error: "invalid credentials" },
        { status: 401 },
      );
    if (!u.password || !verifyPassword(password, u.password))
      return NextResponse.json(
        { error: "invalid credentials" },
        { status: 401 },
      );

    clearLoginRateLimit(email);
    const token = signToken({
      id: u._id,
      email: u.email,
      role: u.role,
      clientId: u.clientId,
    });

    try {
      const db = await getDb();
      await db.collection("erp_events").insertOne({
        type: "login",
        userId: u._id,
        email: u.email,
        adminName: u.name,
        details: { message: "User logged in" },
        createdAt: new Date(),
      });
    } catch (e) {
      console.error("Failed to log login event", e);
    }

    return NextResponse.json({
      token,
      user: {
        id: u._id,
        email: u.email,
        name: u.name,
        role: u.role,
        allowedPages: u.allowedPages,
        clientId: u.clientId,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
