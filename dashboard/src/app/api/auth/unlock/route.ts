import { NextResponse } from "next/server";
import { usersCol, newOtp, hashOtp, sendOtpMail } from "@/lib/security";
import { audit, clientInfo } from "@/lib/security";
import { clearLoginRateLimit } from "@/lib/login-rate-limiter";

// POST { email }            -> emails a 6-digit code (same reply whether or not the account exists)
// POST { email, otp }       -> verifies it and lifts the lock
const sent = new Map<string, number>(); // per-email send throttle, 60s
export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();
    if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });
    const col = await usersCol();
    const u: any = await col.findOne({ email });

    if (!otp) {
      const key = String(email).toLowerCase();
      if (Date.now() - (sent.get(key) || 0) < 60_000) return NextResponse.json({ error: "Wait a minute before asking for another code" }, { status: 429 });
      sent.set(key, Date.now());
      if (u?.email) {
        const code = newOtp();
        await col.updateOne({ _id: u._id }, { $set: { unlockOtp: { hash: hashOtp(code), exp: Date.now() + 10 * 60_000, tries: 0 } } });
        await sendOtpMail(u.email, u.name, code).catch((e) => console.error("unlock mail failed", e.message));
      }
      return NextResponse.json({ ok: true });
    }

    const rec = u?.unlockOtp;
    if (!rec || rec.exp < Date.now() || rec.tries >= 5) return NextResponse.json({ error: "Code expired. Ask for a new one." }, { status: 400 });
    if (rec.hash !== hashOtp(String(otp).trim())) {
      await col.updateOne({ _id: u._id }, { $inc: { "unlockOtp.tries": 1 } });
      return NextResponse.json({ error: "Wrong code" }, { status: 400 });
    }
    await col.updateOne({ _id: u._id }, { $set: { loginFailed: 0 }, $unset: { loginLockUntil: "", unlockOtp: "" } });
    clearLoginRateLimit(email);
    await audit("account_unlocked", u.email, "Unlocked with emailed code", clientInfo(request));
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "failed" }, { status: 500 });
  }
}
