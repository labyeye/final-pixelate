import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { clearLoginRateLimit } from "@/lib/login-rate-limiter";
import {
  usersCol, newOtp, hashOtp, sendOtpMail, passwordProblem, verifyTotp, unseal, revokeSessions, audit, clientInfo,
} from "@/lib/security";

// Forgot password, two ways (like NestHR):
//   POST { email }                                   -> emails a 6-digit code (same reply if the account does not exist)
//   GET  ?email=                                     -> { totp: boolean } so the page can offer the authenticator option
//   POST { email, otp | totp, password }             -> sets the new password, signs out every device, lifts any lock
const sent = new Map<string, number>();
const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

export async function GET(request: Request) {
  const email = new URL(request.url).searchParams.get("email") || "";
  const u: any = email ? await (await usersCol()).findOne({ email }) : null;
  return NextResponse.json({ totp: !!u?.totpEnabled }); // only says whether the authenticator option exists
}

export async function POST(request: Request) {
  try {
    const { email, otp, totp, password } = await request.json();
    if (!email) return bad("email required");
    const col = await usersCol();
    const u: any = await col.findOne({ email });

    if (!password) {
      const key = String(email).toLowerCase();
      if (Date.now() - (sent.get(key) || 0) < 60_000) return bad("Wait a minute before asking for another code", 429);
      sent.set(key, Date.now());
      if (u?.email) {
        const code = newOtp();
        await col.updateOne({ _id: u._id }, { $set: { unlockOtp: { hash: hashOtp(code), exp: Date.now() + 10 * 60_000, tries: 0 } } });
        await sendOtpMail(u.email, u.name, code).catch((e) => console.error("reset mail failed", e.message));
      }
      return NextResponse.json({ ok: true });
    }

    const problem = passwordProblem(password);
    if (problem) return bad(problem);
    if (!u) return bad("Wrong code");

    let ok = false;
    if (totp) {
      try { ok = !!u.totpEnabled && verifyTotp(unseal(u.totpSecret), String(totp)); } catch {}
    } else {
      const rec = u.unlockOtp;
      if (!rec || rec.exp < Date.now() || rec.tries >= 5) return bad("Code expired. Ask for a new one.");
      ok = rec.hash === hashOtp(String(otp || "").trim());
      if (!ok) await col.updateOne({ _id: u._id }, { $inc: { "unlockOtp.tries": 1 } });
    }
    if (!ok) return bad("Wrong code");

    await col.updateOne({ _id: u._id }, { $set: { password: hashPassword(password), loginFailed: 0, passwordChangedAt: new Date() }, $unset: { loginLockUntil: "", unlockOtp: "" } });
    clearLoginRateLimit(email);
    await revokeSessions(u._id);
    await audit("password_reset", u.email, totp ? "Password reset (authenticator)" : "Password reset (email code)", clientInfo(request));
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return bad(e.message || "failed", 500);
  }
}
