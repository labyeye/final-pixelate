import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  generateRegistrationOptions, verifyRegistrationResponse, generateAuthenticationOptions, verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import { requireAuth } from "@/lib/require-auth";
import { getDb } from "@/lib/mongodb";
import { usersCol, findUserById, issueLogin, audit, clientInfo } from "@/lib/security";

// Passkeys (WebAuthn). A passkey sign-in replaces password + 2FA, because the device unlock is the second factor.
//   GET                                  (auth)   list
//   DELETE ?id=                          (auth)   remove
//   POST { action: "register-options" }  (auth)
//   POST { action: "register", response, name }  (auth)
//   POST { action: "login-options" }     (public) -> { options, cid }
//   POST { action: "login", cid, response }  (public) -> same body as password login
const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

function rp(request: Request) {
  const host = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "").split(":")[0];
  const rpID = process.env.WEBAUTHN_RP_ID || host;
  const origin = request.headers.get("origin") || "";
  let okOrigin = false;
  try { const h = new URL(origin).hostname; okOrigin = h === rpID || h.endsWith("." + rpID); } catch {}
  return { rpID, origin, okOrigin };
}
const chal = async () => (await getDb()).collection("webauthn_challenges");
async function saveChallenge(key: string, challenge: string) {
  await (await chal()).updateOne({ key }, { $set: { key, challenge, exp: new Date(Date.now() + 5 * 60_000) } }, { upsert: true });
}
async function takeChallenge(key: string) {
  const c = await chal();
  const row: any = await c.findOne({ key });
  await c.deleteOne({ key });
  return row && row.exp > new Date() ? (row.challenge as string) : null;
}

export async function GET(request: NextRequest) {
  const a = requireAuth(request);
  if (a.error) return a.error;
  const u: any = await findUserById((a.decoded as any).id);
  return NextResponse.json({ passkeys: (u?.passkeys || []).map((p: any) => ({ id: p.id, name: p.name, createdAt: p.createdAt })) });
}

export async function DELETE(request: NextRequest) {
  const a = requireAuth(request);
  if (a.error) return a.error;
  const d = a.decoded as any;
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return bad("id required");
  const u: any = await findUserById(d.id);
  if (!u) return bad("user not found", 404);
  await (await usersCol()).updateOne({ _id: u._id }, { $pull: { passkeys: { id } } } as any);
  await audit("passkey_removed", u.email, "Passkey removed", clientInfo(request));
  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest) {
  try {
    const b = await request.json();
    const { rpID, origin, okOrigin } = rp(request);
    if (!okOrigin) return bad("Origin not allowed");

    if (b.action === "login-options") {
      const options = await generateAuthenticationOptions({ rpID, userVerification: "preferred" });
      const cid = crypto.randomUUID();
      await saveChallenge("login:" + cid, options.challenge);
      return NextResponse.json({ options, cid });
    }
    if (b.action === "login") {
      const expected = await takeChallenge("login:" + b.cid);
      if (!expected) return bad("Sign-in expired. Try again.");
      const col = await usersCol();
      const u: any = await col.findOne({ "passkeys.id": b.response?.id });
      const pk = u?.passkeys?.find((p: any) => p.id === b.response.id);
      if (!pk) return bad("This passkey is not registered", 401);
      if (u.loginLockUntil && new Date(u.loginLockUntil) > new Date()) return bad("Account locked. Unlock it with an emailed code first.", 423);
      const v = await verifyAuthenticationResponse({
        response: b.response, expectedChallenge: expected, expectedOrigin: origin, expectedRPID: rpID,
        credential: { id: pk.id, publicKey: Buffer.from(pk.publicKey, "base64url"), counter: pk.counter, transports: pk.transports },
      });
      if (!v.verified) return bad("Passkey check failed", 401);
      await col.updateOne({ _id: u._id, "passkeys.id": pk.id }, { $set: { "passkeys.$.counter": v.authenticationInfo.newCounter } });
      return NextResponse.json(await issueLogin(u, request, "passkey"));
    }

    // everything below needs a signed-in user
    const a = requireAuth(request);
    if (a.error) return a.error;
    const u: any = await findUserById((a.decoded as any).id);
    if (!u) return bad("user not found", 404);

    if (b.action === "register-options") {
      const options = await generateRegistrationOptions({
        rpName: "Pixelate Nest CRM", rpID, userName: u.email, userDisplayName: u.name || u.email,
        userID: new TextEncoder().encode(String(u._id)), attestationType: "none",
        excludeCredentials: (u.passkeys || []).map((p: any) => ({ id: p.id, transports: p.transports })),
        authenticatorSelection: { residentKey: "preferred", userVerification: "preferred" },
      });
      await saveChallenge("reg:" + u._id, options.challenge);
      return NextResponse.json(options);
    }
    if (b.action === "register") {
      const expected = await takeChallenge("reg:" + u._id);
      if (!expected) return bad("Setup expired. Try again.");
      const v = await verifyRegistrationResponse({ response: b.response, expectedChallenge: expected, expectedOrigin: origin, expectedRPID: rpID });
      if (!v.verified || !v.registrationInfo) return bad("Passkey could not be verified");
      const c = v.registrationInfo.credential;
      const entry = { id: c.id, publicKey: Buffer.from(c.publicKey).toString("base64url"), counter: c.counter, transports: b.response?.response?.transports, name: String(b.name || "Passkey").slice(0, 40), createdAt: new Date() };
      await (await usersCol()).updateOne({ _id: u._id }, { $push: { passkeys: entry } } as any);
      await audit("passkey_added", u.email, `Passkey added (${entry.name})`, clientInfo(request));
      return NextResponse.json({ ok: true });
    }
    return bad("Unknown action");
  } catch (e: any) {
    return bad(e.message || "failed", 500);
  }
}
