import { NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { verifyPasswordAsync, signToken } from "@/lib/auth";
import {
  checkLoginRateLimit,
  clearLoginRateLimit,
} from "@/lib/login-rate-limiter";
import { MAX_FAILS, LOCK_MS, usersCol, verifyTotp, unseal, hashBackup, issueLogin, audit, clientInfo } from "@/lib/security";

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
      await audit(n >= MAX_FAILS ? "account_locked" : "login_failed", u.email, n >= MAX_FAILS ? `Locked after ${MAX_FAILS} wrong attempts` : `Failed sign-in (${what})`, clientInfo(request));
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
    return NextResponse.json(await issueLogin(u, request, u.totpEnabled ? "2fa" : "password"));
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 500 });
  }
}
