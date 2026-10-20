"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, RefreshCw, Monitor, Smartphone } from "lucide-react";

const REFRESH_MS = 30_000;
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
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await apiFetch(`/api/product-metrics?product=${product}&platform=${platform}`);
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
  }, [product, platform]);

  useEffect(() => {
    setLoading(true);
    load();
    const t = setInterval(load, REFRESH_MS);
    return () => clearInterval(t);
  }, [load]);

  const hourly: { hour: string; views: number; crashes: number }[] = data?.hourly ?? [];
  const maxViews = Math.max(1, ...hourly.map((h) => h.views));
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
      </div>

      {loading && <p className="text-sm font-bold">Loading…</p>}
      {error && (
        <div className="border-2 border-red-400 bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>
      )}

      {data && (
        <>
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
            <CardHeader><CardTitle className="font-black text-lg">Page views per hour (last 24h)</CardTitle></CardHeader>
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
              <CardHeader><CardTitle className="font-black text-lg">Top pages / screens (24h)</CardTitle></CardHeader>
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
        </>
      )}
    </div>
  );
}
