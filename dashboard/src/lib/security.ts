import crypto from "crypto";
import nodemailer from "nodemailer";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { signToken } from "@/lib/auth";

// Login hardening shared by /api/auth/*: persistent lockout, email OTP unlock, TOTP 2FA + backup codes.
export const MAX_FAILS = 3;
export const LOCK_MS = 15 * 60 * 1000;

// ---- TOTP (RFC 6238, SHA-1, 6 digits, 30s) -----------------------------------------------------------
const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
export function newSecret() {
  let bits = "", out = "";
  for (const x of crypto.randomBytes(20)) bits += x.toString(2).padStart(8, "0");
  for (let i = 0; i < 160; i += 5) out += B32[parseInt(bits.slice(i, i + 5), 2)];
  return out;
}
const b32dec = (s: string) => {
  let bits = "";
  for (const c of s) bits += B32.indexOf(c).toString(2).padStart(5, "0");
  const out: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) out.push(parseInt(bits.slice(i, i + 8), 2));
  return Buffer.from(out);
};
function hotp(secret: string, counter: number) {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(BigInt(counter));
  const h = crypto.createHmac("sha1", b32dec(secret)).update(buf).digest();
  const o = h[19] & 15;
  const n = ((h[o] & 0x7f) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3];
  return String(n % 1_000_000).padStart(6, "0");
}
export function verifyTotp(secret: string, code: string) {
  const s = String(code).replace(/\s/g, "");
  if (!/^\d{6}$/.test(s)) return false;
  const c = Math.floor(Date.now() / 30000);
  return [-1, 0, 1].some((d) => hotp(secret, c + d) === s); // one step of clock drift either way
}
export const otpauthUrl = (secret: string, email: string) =>
  `otpauth://totp/${encodeURIComponent("Pixelate Nest CRM:" + email)}?secret=${secret}&issuer=${encodeURIComponent("Pixelate Nest CRM")}`;

// ---- secrets at rest (AES-256-GCM, key derived from JWT_SECRET) ----------------------------------------
const KEY = () => crypto.createHash("sha256").update("totp:" + (process.env.JWT_SECRET || "dev-secret-change-me")).digest();
export function seal(text: string) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", KEY(), iv);
  const enc = Buffer.concat([c.update(text, "utf8"), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), enc]).toString("base64url");
}
export function unseal(token: string) {
  const b = Buffer.from(token, "base64url");
  const d = crypto.createDecipheriv("aes-256-gcm", KEY(), b.subarray(0, 12));
  d.setAuthTag(b.subarray(12, 28));
  return Buffer.concat([d.update(b.subarray(28)), d.final()]).toString("utf8");
}

// ---- backup codes ----------------------------------------------------------------------------------------
const sha = (s: string) => crypto.createHash("sha256").update(s).digest("hex");
export const normCode = (s: string) => String(s).toLowerCase().replace(/[^a-f0-9]/g, "");
export function newBackupCodes() {
  const codes = Array.from({ length: 8 }, () => crypto.randomBytes(4).toString("hex"));
  return { plain: codes.map((c) => `${c.slice(0, 4)}-${c.slice(4)}`), hashes: codes.map(sha) };
}
export const hashBackup = (s: string) => sha(normCode(s));

// ---- users ------------------------------------------------------------------------------------------------
export async function usersCol() {
  return (await getDb()).collection("users");
}
export async function findUserById(id: any) {
  const ids: any[] = [String(id)];
  if (ObjectId.isValid(String(id))) ids.push(new ObjectId(String(id)));
  return (await usersCol()).findOne({ _id: { $in: ids } } as any);
}

// ---- email OTP (unlock) -------------------------------------------------------------------------------------
export const newOtp = () => String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
export const hashOtp = (otp: string) => sha("otp:" + otp);
export async function sendOtpMail(to: string, name: string, otp: string) {
  const { EMAIL, APP_PASSWORD } = process.env;
  if (!EMAIL || !APP_PASSWORD) throw new Error("EMAIL/APP_PASSWORD not set");
  await nodemailer.createTransport({ service: "gmail", auth: { user: EMAIL, pass: APP_PASSWORD } }).sendMail({
    from: `Pixelate Nest <${EMAIL}>`,
    to,
    subject: "Your Pixelate Nest unlock code",
    html: `<p>Hi ${String(name || "there").replace(/[<>&]/g, "")},</p><p>Your code to unlock your CRM account is <b style="font-size:20px;letter-spacing:3px">${otp}</b>. It is valid for 10 minutes.</p><p>If you did not try to sign in, ignore this email and consider changing your password.</p>`,
  });
}

// ---- password policy (same shape as NestHR's checklist) ---------------------------------------------------
export function passwordProblem(p: string) {
  if (typeof p !== "string" || p.length < 8) return "Use at least 8 characters";
  if (!/[a-z]/.test(p) || !/[A-Z]/.test(p)) return "Use both upper and lower case letters";
  if (!/\d/.test(p)) return "Add at least one number";
  return null;
}

// ---- audit trail (shares the erp_events collection with the existing login event) --------------------------
export async function audit(type: string, email: string, message: string, extra: Record<string, any> = {}) {
  try {
    await (await getDb()).collection("erp_events").insertOne({ type, email, details: { message, ...extra }, createdAt: new Date() });
  } catch {}
}
export const clientInfo = (req: Request) => ({
  ip: (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "",
  ua: (req.headers.get("user-agent") || "").slice(0, 200),
});

// ---- sessions: JWTs carry a sid; revoking a sid makes requireAuth reject that token ----------------------
declare global { var _revokedSids: Set<string> | undefined; var _revokedLoaded: boolean | undefined }
const revoked = () => (global._revokedSids ??= new Set());
async function loadRevoked() {
  if (global._revokedLoaded) return;
  global._revokedLoaded = true;
  try {
    const rows = await (await getDb()).collection("auth_sessions").find({ revoked: true, exp: { $gt: new Date() } }, { projection: { sid: 1 } }).toArray();
    rows.forEach((r: any) => revoked().add(r.sid));
  } catch { global._revokedLoaded = false; }
}
loadRevoked();
export const isRevoked = (sid?: string) => !!sid && revoked().has(sid);

export async function revokeSessions(userId: any, opts: { exceptSid?: string; sid?: string } = {}) {
  const col = (await getDb()).collection("auth_sessions");
  const q: any = { userId: String(userId), revoked: { $ne: true }, exp: { $gt: new Date() } };
  if (opts.sid) q.sid = opts.sid;
  if (opts.exceptSid) q.sid = { $ne: opts.exceptSid };
  const rows = await col.find(q, { projection: { sid: 1 } }).toArray();
  rows.forEach((r: any) => revoked().add(r.sid));
  await col.updateMany(q, { $set: { revoked: true, revokedAt: new Date() } });
  return rows.length;
}

// Creates the session row, signs the JWT and returns the login response body (password and passkey logins share this).
export async function issueLogin(u: any, req: Request, method: "password" | "2fa" | "passkey") {
  const sid = crypto.randomUUID();
  const { ip, ua } = clientInfo(req);
  const db = await getDb();
  await db.collection("auth_sessions").insertOne({ sid, userId: String(u._id), email: u.email, ip, ua, method, createdAt: new Date(), exp: new Date(Date.now() + 7 * 864e5) });
  await db.collection("users").updateOne({ _id: u._id }, { $set: { loginFailed: 0 }, $unset: { loginLockUntil: "", unlockOtp: "" } });
  await audit("login", u.email, method === "passkey" ? "User logged in (passkey)" : method === "2fa" ? "User logged in (2FA)" : "User logged in", { ip, ua, userId: u._id, adminName: u.name });
  const token = signToken({ id: u._id, email: u.email, role: u.role, clientId: u.clientId, sid });
  return { token, user: { id: u._id, email: u.email, name: u.name, role: u.role, allowedPages: u.allowedPages, clientId: u.clientId } };
}
