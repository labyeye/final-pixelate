import crypto from "crypto";
import nodemailer from "nodemailer";
import { makeCertificate } from "./welcome-certificate";

// Welcome flow for CRM-created accounts: Gmail envelope mail -> public animated postcard page + WhatsApp template.
// The card link carries the login details AES-GCM encrypted (stateless, 7-day expiry). Mail clients can't run
// animation/JS, so the mail shows a static envelope and the animation lives on the /welcome/[token] page.
const KEY = () => crypto.createHash("sha256").update(process.env.WELCOME_SECRET || process.env.JWT_SECRET || "dev-secret-change-me").digest();

// Brand colours (sampled from the Pixelate Nest logo).
export const BRAND = { blue: "#0048A8", navy: "#0A2A5E", orange: "#F87018", ink: "#1a2233" };

// Where each product lives. Add a product here as it gets rolled out; missing = no button on the card.
export const APP_LINKS: Record<string, { web?: string; play?: string }> = {
  hrms: { web: "https://hrms.pixelatenest.com", play: "https://play.google.com/store/apps/details?id=com.nestleads" },
};

export type Welcome = {
  product: string; name: string; company?: string; phone?: string; email: string; password: string;
  web?: string; play?: string; validTill?: string; exp: number;
};

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
const appBase = () => (process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");
export const logoUrl = () => `${appBase()}/assets/images/Logo_Color_Name_Large.png`;

export function welcomeHtml(w: { product: string; name: string; company?: string }, cardUrl: string) {
  const { blue, navy, orange, ink } = BRAND;
  const p = esc(w.product);
  const n = esc(w.name);
  const step = (i: number, t: string) =>
    `<tr><td width="34" valign="top" style="padding:0 0 12px"><div style="width:24px;height:24px;border-radius:12px;background:${blue};color:#fff;font-size:12px;font-weight:bold;line-height:24px;text-align:center">${i}</div></td><td style="padding:2px 0 12px;font-size:14px;line-height:1.5;color:#444">${t}</td></tr>`;
  return `<!DOCTYPE html><html><body style="margin:0;background:#eef2f9;font-family:Helvetica,Arial,sans-serif;color:${ink}">
<div style="display:none;max-height:0;overflow:hidden">Your ${p} account is ready. Open your welcome card to get started.</div>
<table width="100%" cellpadding="0" cellspacing="0" bgcolor="#eef2f9"><tr><td align="center" style="padding:28px 12px">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #dfe6f3">
<tr><td align="center" bgcolor="#ffffff" style="padding:26px 28px 20px"><img src="${logoUrl()}" width="190" alt="Pixelate Nest" style="display:block;border:0;height:auto"></td></tr>
<tr><td height="5" bgcolor="${blue}" style="font-size:0;line-height:0">&nbsp;</td></tr>
<tr><td height="3" bgcolor="${orange}" style="font-size:0;line-height:0">&nbsp;</td></tr>
<tr><td style="padding:34px 36px 6px"><p style="margin:0;font-size:12px;letter-spacing:2px;color:${orange};font-weight:bold">WELCOME TO THE PIXELATE NEST FAMILY</p>
<h1 style="margin:10px 0 12px;font-size:25px;line-height:1.3;color:${blue}">Dear ${n}, your ${p} account is ready.</h1>
<p style="margin:0;font-size:15px;line-height:1.7;color:#444">We are honoured to have ${w.company ? `<b>${esc(w.company)}</b>` : "you"} onboard. Your personal welcome card, sealed with your account details, is waiting for you below. A Certificate of Welcome is attached to this email.</p></td></tr>
<tr><td align="center" style="padding:26px 36px">
<table width="330" cellpadding="0" cellspacing="0" style="width:330px;max-width:100%"><tr><td align="center" bgcolor="${blue}" style="border-radius:8px;padding:26px 20px">
<table cellpadding="0" cellspacing="0"><tr><td align="center" bgcolor="#ffffff" style="border-radius:6px;padding:12px 20px"><img src="${logoUrl()}" width="140" alt="" style="display:block;border:0;height:auto"></td></tr></table>
<p style="margin:16px 0 4px;font-size:11px;letter-spacing:2px;color:#cfe0ff">A SEALED CARD FOR</p>
<p style="margin:0 0 18px;font-size:17px;font-weight:bold;color:#ffffff">${n}</p>
<a href="${cardUrl}" style="display:inline-block;background:${orange};color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;padding:13px 30px;border-radius:5px">Open your card</a>
</td></tr></table></td></tr>
<tr><td style="padding:4px 36px 10px"><p style="margin:0 0 12px;font-size:13px;letter-spacing:1.5px;color:${navy};font-weight:bold">GETTING STARTED</p>
<table cellpadding="0" cellspacing="0" width="100%">${step(1, "Open your welcome card to see your account details.")}${step(2, `Sign in on the ${p} web app, or install the mobile app from the card.`)}${step(3, "Change your password after your first sign-in.")}</table></td></tr>
<tr><td style="padding:6px 36px 30px;font-size:13px;line-height:1.7;color:#777">The card link stays valid for 7 days. Need a hand? Simply reply to this email and our team will help you.</td></tr>
<tr><td bgcolor="${navy}" align="center" style="padding:20px;font-size:12px;line-height:1.7;color:#a9bde0">&copy; 2026 Kalahanu Tech Studios LLP &middot; Pixelate Nest<br>Crafting Digital Experiences</td></tr>
</table></td></tr></table></body></html>`;
}

async function sendMail(to: string, product: string, name: string, company: string | undefined, cardUrl: string, cert: Buffer, file: string) {
  const { EMAIL, APP_PASSWORD } = process.env;
  if (!EMAIL || !APP_PASSWORD) throw new Error("EMAIL/APP_PASSWORD not set");
  await nodemailer.createTransport({ service: "gmail", auth: { user: EMAIL, pass: APP_PASSWORD } }).sendMail({
    from: `Pixelate Nest <${EMAIL}>`,
    to,
    subject: `Welcome to ${product} - your account is ready`,
    html: welcomeHtml({ product, name, company }, cardUrl),
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

export async function sendWelcome(a: { productId: string; product: string; name: string; company?: string; email: string; phone: string; password: string; validTill?: string }) {
  const links = APP_LINKS[a.productId] ?? {};
  const token = sealWelcome({ product: a.product, name: a.name, company: a.company, phone: a.phone, email: a.email, password: a.password, web: links.web, play: links.play, validTill: a.validTill });
  const cardUrl = `${appBase()}/welcome/${token}`;
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
    run(() => sendMail(a.email, a.product, a.name, a.company, cardUrl, cert, file)),
    run(() => sendWhatsApp(a.phone, a.product, a.name, cardUrl, cert, file)),
  ]);
  return { email, whatsapp };
}
