import { NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { verifyPasswordAsync, signToken } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import {
  checkLoginRateLimit,
  clearLoginRateLimit,
} from "@/lib/login-rate-limiter";
import { MAX_FAILS, LOCK_MS, usersCol, verifyTotp, unseal, hashBackup } from "@/lib/security";

const fail = (error: string, status: number, extra: any = {}) =>
  NextResponse.json({ error, ...extra }, { status });

export async function POST(request: Request) {
  try {
    const { email, password, code } = await request.json();
    if (!email || !password) return fail("email+password required", 400);

    // in-memory backstop (also covers emails that do not exist)
    const { allowed, retryAfterSecs } = checkLoginRateLimit(email);
    if (!allowed) {
      const mins = Math.ceil((retryAfterSecs ?? 900) / 60);
      return NextResponse.json(
        { error: `Too many failed attempts. Try again in ${mins} minute${mins !== 1 ? "s" : ""}.` },
        { status: 429, headers: { "Retry-After": String(retryAfterSecs) } },
      );
    }

    const u: any = await svc.getUserByEmail(email);
    if (!u) return fail("invalid credentials", 401);

    // persistent lock (3 strikes); can be cleared early with the emailed OTP at /api/auth/unlock
    if (u.loginLockUntil && new Date(u.loginLockUntil) > new Date()) {
      const mins = Math.ceil((new Date(u.loginLockUntil).getTime() - Date.now()) / 60000);
      return fail(`Account locked after ${MAX_FAILS} wrong attempts. Try again in ${mins} minute${mins !== 1 ? "s" : ""}, or unlock it with a code sent to your email.`, 423, { locked: true });
    }

    const col = await usersCol();
    const strike = async (what: string) => {
      const n = (u.loginFailed || 0) + 1;
      if (n >= MAX_FAILS) {
        await col.updateOne({ _id: u._id }, { $set: { loginFailed: 0, loginLockUntil: new Date(Date.now() + LOCK_MS) } });
        return fail(`Account locked for ${LOCK_MS / 60000} minutes after ${MAX_FAILS} wrong attempts. You can unlock it with a code sent to your email.`, 423, { locked: true });
      }
      await col.updateOne({ _id: u._id }, { $set: { loginFailed: n } });
      return fail(what, 401, { attemptsLeft: MAX_FAILS - n });
    };

    if (!u.password || !(await verifyPasswordAsync(password, u.password)))
      return strike("invalid credentials");

    // 2FA: password was right, now ask for the authenticator (or a backup code)
    if (u.totpEnabled && u.totpSecret) {
      if (!code) return NextResponse.json({ twoFactorRequired: true });
      let ok = false;
      try { ok = verifyTotp(unseal(u.totpSecret), code); } catch {}
      if (!ok) {
        const h = hashBackup(String(code));
        if ((u.backupCodes || []).includes(h)) {
          await col.updateOne({ _id: u._id }, { $pull: { backupCodes: h } } as any); // single use
          ok = true;
        }
      }
      if (!ok) return strike("invalid code");
    }

    clearLoginRateLimit(email);
    await col.updateOne({ _id: u._id }, { $set: { loginFailed: 0 }, $unset: { loginLockUntil: "", unlockOtp: "" } });
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
        details: { message: u.totpEnabled ? "User logged in (2FA)" : "User logged in" },
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
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
