import crypto from "crypto";
import nodemailer from "nodemailer";
import { makeCertificate } from "./welcome-certificate";

// Welcome flow for CRM-created accounts: Gmail envelope mail -> public animated postcard page + WhatsApp template.
// The card link carries the login details AES-GCM encrypted (stateless, 7-day expiry). Mail clients can't run
// animation/JS, so the mail shows a static envelope and the animation lives on the /welcome/[token] page.
const KEY = () => crypto.createHash("sha256").update(process.env.WELCOME_SECRET || process.env.JWT_SECRET || "dev-secret-change-me").digest();

export type Welcome = { product: string; name: string; email: string; password: string; loginUrl: string; validTill?: string; exp: number };

export function sealWelcome(w: Omit<Welcome, "exp">) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", KEY(), iv);
  const enc = Buffer.concat([c.update(JSON.stringify({ ...w, exp: Date.now() + 7 * 864e5 })), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), enc]).toString("base64url");
}

export function openWelcome(token: string): Welcome | null {
  try {
    const b = Buffer.from(token, "base64url");
    const d = crypto.createDecipheriv("aes-256-gcm", KEY(), b.subarray(0, 12));
    d.setAuthTag(b.subarray(12, 28));
    const w = JSON.parse(Buffer.concat([d.update(b.subarray(28)), d.final()]).toString());
    return w.exp > Date.now() ? w : null;
  } catch {
    return null;
  }
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function welcomeHtml(w: { product: string; name: string }, cardUrl: string) {
  const site = process.env.WEBSITE_URL || "";
  const p = esc(w.product);
  const n = esc(w.name);
  return `<!DOCTYPE html><html><body style="margin:0;background:#eef1f5;font-family:Helvetica,Arial,sans-serif;color:#1a1a1a">
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#eef1f5"><tr><td align="center" style="padding:24px 12px">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:6px;overflow:hidden">
<tr><td bgcolor="#1a1a1a" style="padding:20px 28px"><img src="${site}/assets/logo-2.webp" height="44" alt="Pixelate Nest" style="display:block"></td></tr>
<tr><td height="4" bgcolor="#ff640d" style="font-size:0;line-height:0">&nbsp;</td></tr>
<tr><td style="padding:36px 28px 8px"><p style="margin:0;font-size:12px;letter-spacing:2px;color:#ff640d;font-weight:bold">WELCOME ABOARD</p>
<h1 style="margin:8px 0 12px;font-size:26px">Hello ${n}, your ${p} account is ready.</h1>
<p style="margin:0;font-size:15px;line-height:1.6;color:#555">We have sent you a sealed card with your login details. Open it to get started. Your Certificate of Welcome is attached to this email.</p></td></tr>
<tr><td align="center" style="padding:28px">
<table width="320" cellpadding="0" cellspacing="0" style="width:320px;max-width:100%"><tr><td align="center" bgcolor="#f3d9a4" style="border:2px solid #1a1a1a;border-radius:6px;padding:46px 20px">
<div style="font-size:34px;line-height:1">&#9993;</div>
<p style="margin:10px 0 18px;font-size:13px;color:#6b4e16;letter-spacing:1px">SEALED FOR ${n.toUpperCase()}</p>
<a href="${cardUrl}" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;font-weight:bold;font-size:15px;padding:13px 26px;border-radius:4px">Open your card</a>
</td></tr></table></td></tr>
<tr><td style="padding:0 28px 28px;font-size:13px;line-height:1.6;color:#777">The card link works for 7 days. For your security, please change your password after your first login. Need help? Just reply to this email.</td></tr>
<tr><td bgcolor="#1a1a1a" align="center" style="padding:18px;font-size:12px;color:#999">&copy; 2026 Kalahanu Tech Studios LLP &middot; Pixelate Nest</td></tr>
</table></td></tr></table></body></html>`;
}

async function sendMail(to: string, product: string, name: string, cardUrl: string, cert: Buffer, file: string) {
  const { EMAIL, APP_PASSWORD } = process.env;
  if (!EMAIL || !APP_PASSWORD) throw new Error("EMAIL/APP_PASSWORD not set");
  await nodemailer.createTransport({ service: "gmail", auth: { user: EMAIL, pass: APP_PASSWORD } }).sendMail({
    from: `Pixelate Nest <${EMAIL}>`,
    to,
    subject: `Welcome to ${product} - your account is ready`,
    html: welcomeHtml({ product, name }, cardUrl),
    attachments: [{ filename: file, content: cert, contentType: "application/pdf" }],
  });
}

// Template WHATSAPP_WELCOME_TEMPLATE (default nest_welcome_v2): DOCUMENT header (certificate PDF),
// body vars {{1}} name, {{2}} product, {{3}} card link.
async function sendWhatsApp(phone: string, product: string, name: string, cardUrl: string, cert: Buffer, file: string) {
  const { META_ACCESS_TOKEN: tok, WHATSAPP_PHONE_NUMBER_ID: id } = process.env;
  if (!tok || !id) throw new Error("WhatsApp env not set");
  let to = phone.replace(/\D/g, "");
  if (to.length === 10) to = "91" + to;
  const api = `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION ?? "v21.0"}/${id}`;
  const form = new FormData();
  form.append("messaging_product", "whatsapp");
  form.append("type", "application/pdf");
  form.append("file", new Blob([new Uint8Array(cert)], { type: "application/pdf" }), file);
  const up = await fetch(`${api}/media`, { method: "POST", headers: { Authorization: `Bearer ${tok}` }, body: form });
  const mediaId = ((await up.json().catch(() => null)) as any)?.id;
  if (!up.ok || !mediaId) throw new Error("WhatsApp media upload failed");
  const r = await fetch(`${api}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: process.env.WHATSAPP_WELCOME_TEMPLATE || "nest_welcome_v2",
        language: { code: "en" },
        components: [
          { type: "header", parameters: [{ type: "document", document: { id: mediaId, filename: file } }] },
          { type: "body", parameters: [name, product, cardUrl].map((text) => ({ type: "text", text })) },
        ],
      },
    }),
  });
  if (!r.ok) throw new Error(((await r.json().catch(() => null)) as any)?.error?.message ?? `WhatsApp ${r.status}`);
}

export async function sendWelcome(a: { product: string; name: string; email: string; phone: string; password: string; loginUrl: string; validTill?: string }) {
  const base = (process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");
  const token = sealWelcome({ product: a.product, name: a.name, email: a.email, password: a.password, loginUrl: a.loginUrl, validTill: a.validTill });
  const cardUrl = `${base}/welcome/${token}`;
  const run = (f: () => Promise<void>) => f().then(() => "sent", (e: Error) => `failed: ${e.message}`);
  const file = "Pixelate-Nest-Certificate-of-Welcome.pdf";
  let cert: Buffer;
  try {
    cert = Buffer.from(await makeCertificate({ name: a.name, product: a.product, validTill: a.validTill }));
  } catch (e: any) {
    const f = `failed: certificate: ${e.message}`;
    return { email: f, whatsapp: f };
  }
  const [email, whatsapp] = await Promise.all([
    run(() => sendMail(a.email, a.product, a.name, cardUrl, cert, file)),
    run(() => sendWhatsApp(a.phone, a.product, a.name, cardUrl, cert, file)),
  ]);
  return { email, whatsapp };
}
