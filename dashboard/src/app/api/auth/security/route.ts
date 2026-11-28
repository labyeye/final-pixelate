import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { requireAuth } from "@/lib/require-auth";
import { verifyPasswordAsync } from "@/lib/auth";
import { audit, clientInfo, usersCol, findUserById, newSecret, otpauthUrl, verifyTotp, seal, unseal, newBackupCodes } from "@/lib/security";

// Account security for the signed-in user (TOTP 2FA + backup codes).
//   GET                                   -> { totpEnabled, backupCodesLeft }
//   POST { action: "setup" }              -> { secret, otpauth, qr }   (pending until "enable")
//   POST { action: "enable", code }       -> { backupCodes }            (shown once)
//   POST { action: "backup", code }       -> { backupCodes }            (regenerate)
//   POST { action: "disable", password, code }
const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

async function me(request: Request) {
  const a = requireAuth(request);
  if (a.error) return { error: a.error };
  const u: any = await findUserById((a.decoded as any).id);
  if (!u) return { error: bad("user not found", 404) };
  return { u };
}

export async function GET(request: NextRequest) {
  const m = await me(request);
  if (m.error) return m.error;
  return NextResponse.json({ totpEnabled: !!m.u.totpEnabled, backupCodesLeft: (m.u.backupCodes || []).length });
}

export async function POST(request: NextRequest) {
  const m = await me(request);
  if (m.error) return m.error;
  const u = m.u;
  const col = await usersCol();
  try {
    const b = await request.json();
    const liveSecret = () => (u.totpSecret ? unseal(u.totpSecret) : "");
    if (b.action === "setup") {
      if (u.totpEnabled) return bad("2FA is already on. Turn it off first to set it up again.");
      const secret = newSecret();
      await col.updateOne({ _id: u._id }, { $set: { totpPending: seal(secret) } });
      const otpauth = otpauthUrl(secret, u.email);
      return NextResponse.json({ secret, otpauth, qr: await QRCode.toDataURL(otpauth, { margin: 1, width: 220 }) });
    }
    if (b.action === "enable") {
      if (!u.totpPending) return bad("Start setup first");
      if (!verifyTotp(unseal(u.totpPending), String(b.code || ""))) return bad("That code is not right. Check the time on your phone and try again.");
      const { plain, hashes } = newBackupCodes();
      await col.updateOne({ _id: u._id }, { $set: { totpEnabled: true, totpSecret: u.totpPending, backupCodes: hashes }, $unset: { totpPending: "" } });
      await audit("2fa_enabled", u.email, "Two-factor authentication turned on", clientInfo(request));
      return NextResponse.json({ ok: true, backupCodes: plain });
    }
    if (!u.totpEnabled) return bad("2FA is not on");
    if (!verifyTotp(liveSecret(), String(b.code || ""))) return bad("That code is not right");
    if (b.action === "backup") {
      const { plain, hashes } = newBackupCodes();
      await col.updateOne({ _id: u._id }, { $set: { backupCodes: hashes } });
      return NextResponse.json({ ok: true, backupCodes: plain });
    }
    if (b.action === "disable") {
      if (!u.password || !(await verifyPasswordAsync(String(b.password || ""), u.password))) return bad("Password is wrong");
      await col.updateOne({ _id: u._id }, { $unset: { totpEnabled: "", totpSecret: "", backupCodes: "", totpPending: "" } });
      await audit("2fa_disabled", u.email, "Two-factor authentication turned off", clientInfo(request));
      return NextResponse.json({ ok: true });
    }
    return bad("Unknown action");
  } catch (e: any) {
    return bad(e.message || "failed", 500);
  }
}
