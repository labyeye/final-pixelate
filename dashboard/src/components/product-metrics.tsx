"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, RefreshCw, Monitor, Smartphone, X } from "lucide-react";

const REFRESH_MS = 30_000;
const RANGES = ["1h", "24h", "7d", "30d"];
const DIM_LABELS: Record<string, string> = {
  country: "Country", region: "State / region", city: "City", isp: "ISP / network", ip: "IP address",
  browser: "Browser", os: "Operating system", device: "Device", tenantId: "Company ID",
  userName: "Person", userId: "User ID", tenantName: "Company", role: "Role", version: "App version", path: "Page / screen",
};
const dur = (sec: number) => {
  const d = Math.floor(sec / 86400), h = Math.floor((sec % 86400) / 3600), m = Math.floor((sec % 3600) / 60);
  return d ? `${d}d ${h}h` : h ? `${h}h ${m}m` : `${m}m ${sec % 60}s`;
};
const ago = (t: string) => {
  const s = Math.max(0, Math.round((Date.now() - new Date(t).getTime()) / 1000));
  return s < 60 ? `${s}s ago` : s < 3600 ? `${Math.floor(s / 60)}m ago` : `${Math.floor(s / 3600)}h ago`;
};
const n = (v: number | null | undefined) => (v == null ? "—" : new Intl.NumberFormat("en-IN").format(v));

function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "bad" | "good" }) {
  return (
    <div className="border-2 border-black p-4 bg-white shadow-[4px_4px_0_0_#000]">
      <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`text-3xl font-black mt-1 ${tone === "bad" ? "text-red-600" : tone === "good" ? "text-green-700" : ""}`}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

export function ProductMetrics({ product, title }: { product: string; title: string }) {
  const [platform, setPlatform] = useState<"web" | "app">("web");
  const [range, setRange] = useState("24h");
  const [liveMin, setLiveMin] = useState("10");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const qs = new URLSearchParams({ product, platform, range, liveMin, ...filters });
      const res = await apiFetch(`/api/product-metrics?${qs}`);
      const j = await res.json();
      if (!res.ok || !j.success) throw new Error(j.error ?? "Failed to load");
      setData(j);
      setError(null);
    } catch (e: any) {
      setData(null);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [product, platform, range, liveMin, filters]);

  useEffect(() => {
    setLoading(true);
    load();
    const t = setInterval(load, REFRESH_MS);
    return () => clearInterval(t);
  }, [load]);

  const hourly: { hour: string; views: number; crashes: number }[] = data?.hourly ?? [];
  const maxViews = Math.max(1, ...hourly.map((h) => h.views));
  const setFilter = (k: string, v: string) => setFilters((f) => ({ ...f, [k]: v }));
  const clearFilter = (k: string) => setFilters(({ [k]: _, ...rest }) => rest);
  const a = data?.api;
  const u = data?.users;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3"><Activity className="w-8 h-8" /><h1 className="text-4xl font-black tracking-tighter">{title.toUpperCase()} · LIVE METRICS</h1></div>
          <p className="text-sm text-muted-foreground font-bold mt-1">
            Usage, errors and performance · refreshes every 30 s{data ? ` · updated ${new Date(data.generatedAt).toLocaleTimeString("en-IN")}` : ""}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={load} className="border-2 border-black font-bold w-fit"><RefreshCw className="w-4 h-4 mr-1" /> Refresh</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex border-2 border-black">
          <button onClick={() => setPlatform("web")} className={`px-4 py-2 text-sm font-black uppercase flex items-center gap-1 ${platform === "web" ? "bg-[#024BAB] text-white" : "bg-white"}`}><Monitor className="w-4 h-4" /> Web</button>
          <button onClick={() => setPlatform("app")} className={`px-4 py-2 text-sm font-black uppercase flex items-center gap-1 ${platform === "app" ? "bg-[#FA731C] text-white" : "bg-white"}`}><Smartphone className="w-4 h-4" /> App</button>
        </div>
        <div className="flex border-2 border-black">
          {RANGES.map((r) => (
            <button key={r} onClick={() => setRange(r)} className={`px-4 py-2 text-sm font-black uppercase ${range === r ? "bg-black text-white" : "bg-white"}`}>{r}</button>
          ))}
        </div>
        {Object.entries(filters).map(([k, v]) => (
          <button key={k} onClick={() => clearFilter(k)} className="border-2 border-black bg-yellow-200 px-3 py-2 text-xs font-black flex items-center gap-1" title="Remove filter">
            {DIM_LABELS[k] ?? k}: {v} <X className="w-3 h-3" />
          </button>
        ))}
        {Object.keys(filters).length > 1 && (
          <button onClick={() => setFilters({})} className="text-xs font-black underline px-2">Clear all</button>
        )}
      </div>

      {loading && <p className="text-sm font-bold">Loading…</p>}
      {error && (
        <div className="border-2 border-red-400 bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>
      )}

      {data && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black tracking-tighter flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full bg-green-500" /> RIGHT NOW · {n(data.live.total)} {data.live.total === 1 ? "person" : "people"} online</h2>
            <div className="flex items-center gap-2 text-xs font-black">
              active in last
              <div className="flex border-2 border-black">
                {["5", "10", "15", "30", "60"].map((m) => (
                  <button key={m} onClick={() => setLiveMin(m)} className={`px-3 py-1 ${liveMin === m ? "bg-black text-white" : "bg-white"}`}>{m}m</button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-bold -mt-4">A person counts as online while their last screen view is inside this window. Idle on one screen longer than that and they drop off.</p>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {data.live.byScreen.length === 0 && <p className="text-sm text-muted-foreground">Nobody online in this window.</p>}
            {data.live.byScreen.map((sc: any) => (
              <button key={sc.screen} onClick={() => setFilter("path", sc.screen)} className="text-left border-2 border-black bg-white p-3 shadow-[4px_4px_0_0_#000] hover:bg-yellow-50">
                <p className="text-3xl font-black">{sc.people}</p>
                <p className="text-sm font-black break-all">{sc.screen}</p>
                <p className="text-xs text-muted-foreground break-words">{sc.names.join(", ")}</p>
              </button>
            ))}
          </div>

          <Card className="border-2 border-black">
            <CardHeader><CardTitle className="font-black text-lg">Who is online, where and since when</CardTitle></CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  {["Person", "Company", "Role", "Screen now", "Online since", "Last seen", "Pages", "IP", "Location", "ISP", "Device"].map((h) => (
                    <TableHead key={h} className="font-black text-xs uppercase whitespace-nowrap">{h}</TableHead>
                  ))}
                </TableRow></TableHeader>
                <TableBody>
                  {data.live.online.map((o: any, i: number) => (
                    <TableRow key={i} className="text-xs">
                      <TableCell className="font-black whitespace-nowrap">{o.who}{o.email && <span className="block font-normal text-muted-foreground">{o.email}</span>}</TableCell>
                      <TableCell>{o.company ?? "—"}</TableCell>
                      <TableCell>{o.role ?? "—"}</TableCell>
                      <TableCell className="font-bold">{o.screen}</TableCell>
                      <TableCell className="whitespace-nowrap">{new Date(o.since).toLocaleTimeString("en-IN")}</TableCell>
                      <TableCell className="whitespace-nowrap">{ago(o.lastSeen)}</TableCell>
                      <TableCell>{o.pagesViewed}</TableCell>
                      <TableCell className="font-mono">{o.ip ?? "—"}</TableCell>
                      <TableCell className="whitespace-nowrap">{[o.city, o.region, o.country].filter(Boolean).join(", ") || "—"}{o.lat != null && <a className="underline ml-1" target="_blank" rel="noreferrer" href={`https://www.google.com/maps?q=${o.lat},${o.lon}`}>map</a>}</TableCell>
                      <TableCell>{o.isp ?? "—"}</TableCell>
                      <TableCell className="whitespace-nowrap">{[o.browser, o.os, o.device].filter(Boolean).join(" · ") || "—"}</TableCell>
                    </TableRow>
                  ))}
                  {data.live.online.length === 0 && <TableRow><TableCell colSpan={11} className="text-center text-muted-foreground py-6">Nobody online</TableCell></TableRow>}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat label="Active now" value={n(u.activeNow)} sub="last 5 minutes" tone="good" />
            <Stat label="Active 24h / 7d / 30d" value={`${n(u.active24h)} / ${n(u.active7d)} / ${n(u.active30d)}`} />
            <Stat label="Total users" value={n(u.total)} sub="all platforms" />
            <Stat label="Inactive (30d)" value={n(u.inactive30d)} sub="no activity on this platform" />
            <Stat label="API success rate" value={a.successRate == null ? "—" : `${a.successRate}%`} sub={`${n(a.requests24h)} requests in 24h`} tone={a.successRate != null && a.successRate < 98 ? "bad" : "good"} />
            <Stat label="Avg response" value={a.avgMs == null ? "—" : `${n(a.avgMs)} ms`} sub={`${n(a.slowOver1s)} slower than 1 s`} />
            <Stat label="Server errors (5xx)" value={n(a.serverErrors)} sub={`${n(a.clientErrors)} client errors (4xx)`} tone={a.serverErrors > 0 ? "bad" : undefined} />
            <Stat label="Crashes / errors 24h" value={n(data.crashes.last24h)} tone={data.crashes.last24h > 0 ? "bad" : "good"} />
          </div>

          <Card className="border-2 border-black">
            <CardHeader><CardTitle className="font-black text-lg">Page views per {range === "7d" || range === "30d" ? "day" : "hour"} (last {range})</CardTitle></CardHeader>
            <CardContent>
              {hourly.length === 0 ? <p className="text-sm text-muted-foreground">No activity yet.</p> : (
                <div className="flex items-end gap-1 h-32">
                  {hourly.map((h) => (
                    <div key={h.hour} className="flex-1 flex flex-col justify-end h-full" title={`${new Date(h.hour).toLocaleString("en-IN")}: ${h.views} views, ${h.crashes} crashes`}>
                      <div className={h.crashes ? "bg-red-500" : "bg-[#024BAB]"} style={{ height: `${Math.max(4, (h.views / maxViews) * 100)}%` }} />
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-2">Red bars = hours with crashes or errors.</p>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-2 border-black">
              <CardHeader><CardTitle className="font-black text-lg">Top pages / screens ({range})</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow>
                    <TableHead className="font-black text-xs uppercase">Page</TableHead>
                    <TableHead className="font-black text-xs uppercase text-right">Views</TableHead>
                    <TableHead className="font-black text-xs uppercase text-right">Users</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {data.topPages.map((p: any) => (
                      <TableRow key={p.path}><TableCell className="font-bold">{p.path}</TableCell><TableCell className="text-right">{n(p.views)}</TableCell><TableCell className="text-right">{n(p.users)}</TableCell></TableRow>
                    ))}
                    {data.topPages.length === 0 && <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-6">No page views yet</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-2 border-black">
              <CardHeader><CardTitle className="font-black text-lg">Recent crashes & errors</CardTitle></CardHeader>
              <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                {data.crashes.recent.length === 0 && <p className="text-sm text-muted-foreground">None. 🎉</p>}
                {data.crashes.recent.map((c: any) => (
                  <div key={c._id} className="border-2 border-black p-2 text-xs">
                    <p className="font-black"><span className={c.type === "crash" ? "text-red-600" : "text-orange-600"}>{c.type.toUpperCase()}</span> · {c.path} · {new Date(c.ts).toLocaleString("en-IN")}</p>
                    <p className="break-words">{c.message}</p>
                    <p className="text-muted-foreground">user {c.userId ?? "—"}{c.version ? ` · v${c.version}` : ""}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-black tracking-tighter">WHO &amp; WHERE · {n(data.totalEvents)} events in {range}</h2>
            <p className="text-xs text-muted-foreground font-bold">Click any value to filter. Filters stack, so you can combine country + browser + company + page. Location comes from the visitor&apos;s IP (city level, approximate).</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.keys(DIM_LABELS).map((d) => (
              <Card key={d} className="border-2 border-black">
                <CardHeader className="pb-2"><CardTitle className="font-black text-base">{DIM_LABELS[d]}</CardTitle></CardHeader>
                <CardContent className="space-y-1 max-h-72 overflow-y-auto">
                  {(data.breakdowns[d] ?? []).length === 0 && <p className="text-sm text-muted-foreground">No data</p>}
                  {(data.breakdowns[d] ?? []).map((r: any) => (
                    <button key={r.value} onClick={() => setFilter(d, r.value)} disabled={filters[d] === r.value}
                      className="w-full flex justify-between gap-2 text-left text-xs border border-black/20 px-2 py-1 hover:bg-yellow-100 disabled:bg-yellow-200">
                      <span className="font-bold break-all">{r.value}</span>
                      <span className="whitespace-nowrap text-muted-foreground">{n(r.events)} ev · {n(r.users)} users</span>
                    </button>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-black">
            <CardHeader><CardTitle className="font-black text-lg">Latest events (newest 100, matching filters)</CardTitle></CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  {["Time", "Type", "Page", "User", "Company", "Role", "IP", "Location", "ISP", "Device", "Ver"].map((h) => (
                    <TableHead key={h} className="font-black text-xs uppercase whitespace-nowrap">{h}</TableHead>
                  ))}
                </TableRow></TableHeader>
                <TableBody>
                  {data.events.map((e: any) => (
                    <TableRow key={e._id} className="text-xs">
                      <TableCell className="whitespace-nowrap">{new Date(e.ts).toLocaleString("en-IN")}</TableCell>
                      <TableCell className={e.type === "page" ? "" : "text-red-600 font-black"}>{e.type}</TableCell>
                      <TableCell className="font-bold">{e.path}</TableCell>
                      <TableCell>{e.userName ?? e.userId ?? "—"}</TableCell>
                      <TableCell>{e.tenantName ?? e.tenantId ?? "—"}</TableCell>
                      <TableCell>{e.role ?? "—"}</TableCell>
                      <TableCell className="font-mono">{e.ip ?? "—"}</TableCell>
                      <TableCell className="whitespace-nowrap">{[e.city, e.region, e.country].filter(Boolean).join(", ") || "—"}{e.lat != null && <a className="underline ml-1" target="_blank" rel="noreferrer" href={`https://www.google.com/maps?q=${e.lat},${e.lon}`}>map</a>}</TableCell>
                      <TableCell>{e.isp ?? "—"}</TableCell>
                      <TableCell className="whitespace-nowrap" title={e.ua}>{[e.browser, e.os, e.device].filter(Boolean).join(" · ") || "—"}</TableCell>
                      <TableCell>{e.version ?? "—"}</TableCell>
                    </TableRow>
                  ))}
                  {data.events.length === 0 && <TableRow><TableCell colSpan={11} className="text-center text-muted-foreground py-6">No events match</TableCell></TableRow>}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {data.server && (
            <>
              <h2 className="text-2xl font-black tracking-tighter">SERVER · RUNTIME</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Stat label="Process uptime" value={dur(data.server.processUptimeSec)} sub={`host up ${dur(data.server.hostUptimeSec)}`} />
                <Stat label="Process CPU" value={`${data.server.cpuProcessPct}%`} sub={`${data.server.cpuCores} cores · load ${data.server.loadAvg.join(" / ")}`} tone={data.server.cpuProcessPct > 80 ? "bad" : undefined} />
                <Stat label="Event-loop lag" value={`${data.server.eventLoopLagMs} ms`} sub="over ~50 ms = Node is struggling" tone={data.server.eventLoopLagMs > 100 ? "bad" : "good"} />
                <Stat label="Node / pid" value={data.server.node} sub={`pid ${data.server.pid} · ${data.server.env}`} />
                <Stat label="Process memory" value={`${data.server.memory.rssMb} MB`} sub={`heap ${data.server.memory.heapUsedMb} / ${data.server.memory.heapTotalMb} MB`} />
                <Stat label="System memory free" value={`${n(Math.round(data.server.memory.systemFreeMb))} MB`} sub={`of ${n(Math.round(data.server.memory.systemTotalMb))} MB`} tone={data.server.memory.systemFreeMb < 150 ? "bad" : undefined} />
                <Stat label="Disk free" value={data.server.disk ? `${data.server.disk.freeGb} GB` : "—"} sub={data.server.disk ? `of ${data.server.disk.totalGb} GB` : "not available"} tone={data.server.disk && data.server.disk.freeGb < 3 ? "bad" : undefined} />
                <Stat label="MongoDB" value={data.server.mongo.state} sub={data.server.mongo.db ? `${data.server.mongo.db.name} · ${n(data.server.mongo.db.documents)} docs · ${data.server.mongo.db.collections} collections · data ${data.server.mongo.db.dataMb} MB, storage ${data.server.mongo.db.storageMb} MB, indexes ${data.server.mongo.db.indexMb} MB` : "db stats not permitted for this user"} tone={data.server.mongo.state === "connected" ? "good" : "bad"} />
              </div>
              <p className="text-xs text-muted-foreground font-bold">{data.server.host} · {data.server.platform}</p>

              <Card className="border-2 border-black">
                <CardHeader><CardTitle className="font-black text-lg">API requests per minute (last hour)</CardTitle></CardHeader>
                <CardContent>
                  {data.apiSeries.length === 0 ? <p className="text-sm text-muted-foreground">No requests yet.</p> : (
                    <div className="flex items-end gap-px h-32">
                      {data.apiSeries.map((m: any) => {
                        const max = Math.max(1, ...data.apiSeries.map((x: any) => x.requests));
                        return (
                          <div key={m.minute} className="flex-1 flex flex-col justify-end h-full" title={`${new Date(m.minute).toLocaleTimeString("en-IN")}: ${m.requests} requests, ${m.errors5xx} server errors, avg ${m.avgMs} ms`}>
                            <div className={m.errors5xx ? "bg-red-500" : "bg-[#FA731C]"} style={{ height: `${Math.max(4, (m.requests / max) * 100)}%` }} />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">Red bars = minutes with 5xx errors. Hover for avg response time.</p>
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
}
