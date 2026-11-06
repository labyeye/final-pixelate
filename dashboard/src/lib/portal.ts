import { createHash, randomInt } from "crypto";

export const hashCode = (c: string) =>
  createHash("sha256").update(c.trim().toUpperCase()).digest("hex");

const AL = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export const newCode = () =>
  "PN-" + Array.from({ length: 6 }, () => AL[randomInt(AL.length)]).join("");

export const ASSET_TYPES = ["stack", "template", "palette", "font"] as const;
export const KINDS = ["web", "software", "app"] as const;

// ponytail: in-memory per-instance limiter; move to Mongo/Redis if running multiple instances
const fails = new Map<string, { n: number; until: number }>();
export const ipOf = (r: Request) =>
  (r.headers.get("x-forwarded-for") || "?").split(",")[0].trim();
export const isBlocked = (ip: string) => (fails.get(ip)?.until ?? 0) > Date.now();
export function noteFail(ip: string) {
  const f = fails.get(ip) ?? { n: 0, until: 0 };
  f.n++;
  if (f.n >= 10) { f.until = Date.now() + 15 * 60_000; f.n = 0; }
  fails.set(ip, f);
}

export const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

// Email (EMAIL/APP_PASSWORD) + WhatsApp (needs an approved template, see env). Never throws.
export async function notifySubmit(title: string, lines: string[]) {
  const text = `${title}\n${lines.join("\n")}`;
  try {
    const { EMAIL, APP_PASSWORD } = process.env;
    if (EMAIL && APP_PASSWORD) {
      const nodemailer = (await import("nodemailer")).default;
      await nodemailer.createTransport({ service: "gmail", auth: { user: EMAIL, pass: APP_PASSWORD } })
        .sendMail({ from: EMAIL, to: process.env.PORTAL_NOTIFY_EMAIL || EMAIL, subject: `Portal submission: ${title}`, text });
    }
  } catch (e) { console.error("portal email failed", e); }
  try {
    const { META_ACCESS_TOKEN: tok, WHATSAPP_PHONE_NUMBER_ID: pid, PORTAL_NOTIFY_PHONE: to, PORTAL_WA_TEMPLATE: tpl } = process.env;
    if (tok && pid && to && tpl) {
      // template body = 2 text params: {{1}} project, {{2}} selections summary (no newlines allowed)
      await fetch(`https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION ?? "v21.0"}/${pid}/messages`, {
        method: "POST",
        headers: { Authorization: `Bearer ${tok}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          messaging_product: "whatsapp", to: to.replace(/\D/g, ""), type: "template",
          template: { name: tpl, language: { code: process.env.PORTAL_WA_LANG ?? "en" }, components: [{ type: "body", parameters: [{ type: "text", text: title }, { type: "text", text: lines.join(" | ") }] }] },
        }),
      });
    }
  } catch (e) { console.error("portal whatsapp failed", e); }
}
