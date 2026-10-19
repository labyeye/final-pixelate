import { NextRequest, NextResponse } from "next/server";
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
