import { NextRequest, NextResponse } from "next/server";
import geoip from "geoip-lite";
import { getDb } from "@/lib/mongodb";

// Public ingest for web + mobile telemetry (page views, heartbeats, crashes).
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const TYPES = new Set(["page", "ping", "crash"]);
const PLATFORMS = new Set(["web", "android", "ios"]);
const s = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : "");

const safeDecode = (v: string) => {
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
};

// Visitor IP + approximate location, only ever attached to web events the browser
// flagged consent:true (cookie banner "Accept"). CDN geo headers win over the local DB.
function visitor(req: NextRequest) {
  const h = req.headers;
  const ip = (h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || "").trim().slice(0, 64);
  let country = h.get("cf-ipcountry") || h.get("x-vercel-ip-country") || "";
  let region = h.get("x-vercel-ip-country-region") || "";
  let city = h.get("x-vercel-ip-city") || "";
  if (ip && !city) {
    const g = geoip.lookup(ip);
    if (g) ({ country, region, city } = { country: g.country, region: g.region, city: g.city });
  }
  return { ip, country: s(country, 2), region: s(region, 40), city: s(safeDecode(city), 60) };
}

let indexed = false;
async function ensureIndexes(col: any) {
  if (indexed) return;
  indexed = true;
  // 90-day retention keeps the collection bounded.
  await col.createIndex({ ts: 1 }, { expireAfterSeconds: 90 * 86400 });
  await col.createIndex({ platform: 1, type: 1, ts: -1 });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(req: NextRequest) {
  try {
    // text/plain body so navigator.sendBeacon needs no CORS preflight.
    const raw = (await req.text()).slice(0, 100_000);
    const body = JSON.parse(raw);
    const list = (Array.isArray(body?.events) ? body.events : []).slice(0, 25);

    const now = new Date();
    const geo = visitor(req);
    const docs = list
      .filter((e: any) => TYPES.has(e?.type) && PLATFORMS.has(e?.platform) && e?.sid && e?.uid)
      .map((e: any) => ({
        sid: s(e.sid, 64),
        uid: s(e.uid, 64),
        platform: e.platform,
        type: e.type,
        v: s(e.v, 24),
        device: s(e.device, 80),
        os: s(e.os, 40),
        page: s(e.page, 200),
        msg: s(e.msg, 300),
        stack: s(e.stack, 2000),
        fatal: !!e.fatal,
        ts: now,
        // consented web visitors only
        ...(e.type === "page" && e.consent === true && e.platform === "web"
          ? {
              ...geo,
              ref: s(e.ref, 300),
              qs: s(e.qs, 300),
              lang: s(e.lang, 20),
              tz: s(e.tz, 60),
              screen: s(e.screen, 16),
            }
          : {}),
      }));

    if (docs.length) {
      const col = (await getDb()).collection("telemetry_events");
      await ensureIndexes(col);
      await col.insertMany(docs);
    }
    return NextResponse.json({ ok: true, n: docs.length }, { headers: CORS });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400, headers: CORS });
  }
}
