import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { requireAuth } from "@/lib/require-auth";

// ponytail: $addToSet sets live in memory (100MB/stage cap) - fine to ~1M events/range;
// switch to a rollup collection if volume grows.
const size = (f: string) => ({ $size: `$${f}` });
const count = (t: string) => ({ $sum: { $cond: [{ $eq: ["$type", t] }, 1, 0] } });

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth.error) return auth.error;
  if ((auth.decoded as any).role !== "admin") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const sp = new URL(req.url).searchParams;
  const days = Math.min(Math.max(Number(sp.get("days")) || 7, 1), 90);
  const platform: any = sp.get("platform") === "mobile" ? { $in: ["android", "ios"] } : "web";
  const now = Date.now();
  const base = { platform, ts: { $gte: new Date(now - days * 864e5) } };
  const col = (await getDb()).collection("telemetry_events");
  const agg = (p: object[]) => col.aggregate(p).toArray();
  const live = { platform, type: { $in: ["ping", "page"] }, ts: { $gte: new Date(now - 90e3) } };

  const [onlineUsers, onlineSessions, totals, crashed, durations, pages, crashes, versions, os, devices, daily, recent] =
    await Promise.all([
      col.distinct("uid", live),
      col.distinct("sid", live),
      agg([
        { $match: base },
        {
          $group: {
            _id: null,
            users: { $addToSet: "$uid" },
            sessions: { $addToSet: "$sid" },
            pageViews: count("page"),
            crashes: count("crash"),
          },
        },
        { $project: { _id: 0, users: size("users"), sessions: size("sessions"), pageViews: 1, crashes: 1 } },
      ]),
      agg([
        { $match: { ...base, type: "crash" } },
        { $group: { _id: null, users: { $addToSet: "$uid" }, sessions: { $addToSet: "$sid" } } },
        { $project: { _id: 0, users: size("users"), sessions: size("sessions") } },
      ]),
      agg([
        { $match: base },
        { $group: { _id: "$sid", a: { $min: "$ts" }, b: { $max: "$ts" } } },
        { $group: { _id: null, avgMs: { $avg: { $subtract: ["$b", "$a"] } } } },
      ]),
      agg([
        { $match: { ...base, type: "page" } },
        { $group: { _id: "$page", views: { $sum: 1 }, users: { $addToSet: "$uid" } } },
        { $project: { _id: 0, page: "$_id", views: 1, users: size("users") } },
        { $sort: { views: -1 } },
        { $limit: 20 },
      ]),
      agg([
        { $match: { ...base, type: "crash" } },
        {
          $group: {
            _id: { msg: "$msg", v: "$v", platform: "$platform" },
            count: { $sum: 1 },
            users: { $addToSet: "$uid" },
            last: { $max: "$ts" },
            page: { $first: "$page" },
            stack: { $first: "$stack" },
            fatal: { $max: "$fatal" },
          },
        },
        { $project: { _id: 0, msg: "$_id.msg", v: "$_id.v", platform: "$_id.platform", count: 1, users: size("users"), last: 1, page: 1, stack: 1, fatal: 1 } },
        { $sort: { count: -1 } },
        { $limit: 15 },
      ]),
      agg([
        { $match: base },
        {
          $group: {
            _id: { platform: "$platform", v: "$v" },
            users: { $addToSet: "$uid" },
            sessions: { $addToSet: "$sid" },
            crashes: count("crash"),
          },
        },
        { $project: { _id: 0, platform: "$_id.platform", v: "$_id.v", users: size("users"), sessions: size("sessions"), crashes: 1 } },
        { $sort: { users: -1 } },
        { $limit: 15 },
      ]),
      ...["os", "device"].map((f) =>
        agg([
          { $match: base },
          { $group: { _id: `$${f}`, users: { $addToSet: "$uid" }, crashes: count("crash") } },
          { $project: { _id: 0, name: "$_id", users: size("users"), crashes: 1 } },
          { $sort: { users: -1 } },
          { $limit: 10 },
        ]),
      ),
      agg([
        { $match: base },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$ts", timezone: "Asia/Kolkata" } },
            users: { $addToSet: "$uid" },
            sessions: { $addToSet: "$sid" },
            pageViews: count("page"),
            crashes: count("crash"),
          },
        },
        { $project: { _id: 0, day: "$_id", users: size("users"), sessions: size("sessions"), pageViews: 1, crashes: 1 } },
        { $sort: { day: 1 } },
      ]),
      col
        .find({ ...base, type: "crash" }, { projection: { _id: 0, type: 0 } })
        .sort({ ts: -1 })
        .limit(25)
        .toArray(),
    ]);

  // Consented web visitors (IP + location are only stored on those page events).
  const visits = { ...base, type: "page", ip: { $exists: true } };
  const top = (f: string) => [
    { $match: { ...visits, [f]: { $ne: "" } } },
    { $group: { _id: `$${f}`, visits: { $sum: 1 }, users: { $addToSet: "$uid" } } },
    { $project: { _id: 0, name: "$_id", visits: 1, users: size("users") } },
    { $sort: { visits: -1 } },
    { $limit: 10 },
  ];
  const [visitors, countries, cities] = platform === "web"
    ? await Promise.all([
        col
          .find(visits, { projection: { _id: 0, ip: 1, city: 1, region: 1, country: 1, page: 1, ref: 1, device: 1, os: 1, ts: 1 } })
          .sort({ ts: -1 })
          .limit(50)
          .toArray(),
        agg(top("country")),
        agg(top("city")),
      ])
    : [[], [], []];

  const t = totals[0] || { users: 0, sessions: 0, pageViews: 0, crashes: 0 };
  const c = crashed[0] || { users: 0, sessions: 0 };
  const pct = (bad: number, all: number) => (all ? +(100 - (bad / all) * 100).toFixed(2) : 100);

  return NextResponse.json({
    days,
    online: { users: onlineUsers.length, sessions: onlineSessions.length },
    totals: {
      ...t,
      avgSessionSec: Math.round((durations[0]?.avgMs || 0) / 1000),
      crashFreeSessions: pct(c.sessions, t.sessions),
      crashFreeUsers: pct(c.users, t.users),
      crashedUsers: c.users,
    },
    pages, crashes, versions, os, devices, daily, recent, visitors, countries, cities,
  });
}
