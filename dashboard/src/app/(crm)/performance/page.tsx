"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, Bug, Clock, Eye, ShieldCheck, Users, Wifi } from "lucide-react";

type Scope = "web" | "mobile";

function Kpi({ icon: Icon, label, value, hint, tone }: { icon: any; label: string; value: string | number; hint?: string; tone?: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">{label}</CardTitle>
        <Icon className="h-4 w-4 text-slate-400" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${tone || "text-slate-900"}`}>{value}</div>
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
      </CardContent>
    </Card>
  );
}

function Empty({ cols }: { cols: number }) {
  return (
    <TableRow>
      <TableCell colSpan={cols} className="text-center text-slate-400">
        No data yet
      </TableCell>
    </TableRow>
  );
}

const dur = (s: number) => (s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`);
const healthTone = (p: number) => (p >= 99 ? "text-green-600" : p >= 95 ? "text-amber-600" : "text-red-600");

export default function PerformancePage() {
  const [scope, setScope] = useState<Scope>("web");
  const [days, setDays] = useState("7");
  const [d, setD] = useState<any>(null);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await apiFetch(`/api/telemetry/report?platform=${scope}&days=${days}`);
      if (!res.ok) throw new Error(res.status === 403 ? "Admin access required" : "Failed to load report");
      setD(await res.json());
      setErr("");
    } catch (e: any) {
      setErr(e.message);
    }
  }, [scope, days]);

  useEffect(() => {
    setD(null);
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, [load]);

  const t = d?.totals;
  const mobile = scope === "mobile";

  return (
    <div className="p-4 md:p-8 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">App Performance</h2>
          <p className="text-slate-500">Live usage, stability and page traffic. Refreshes every 15s.</p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={scope} onValueChange={(v) => setScope(v as Scope)}>
            <TabsList>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="mobile">Mobile App</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={days} onValueChange={setDays}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Last 24 hours</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {err && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{err}</div>}
      {!d && !err && <div className="text-slate-500">Loading…</div>}

      {d && (
        <>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <Kpi icon={Wifi} label="Online now" value={d.online.users} hint={`${d.online.sessions} active sessions (last 90s)`} tone="text-green-600" />
            <Kpi icon={Users} label="Active users" value={t.users} hint={`${t.sessions} sessions`} />
            <Kpi icon={Eye} label={mobile ? "Screen views" : "Page views"} value={t.pageViews} />
            <Kpi icon={Clock} label="Avg session" value={dur(t.avgSessionSec)} />
            <Kpi icon={Bug} label="Crashes / errors" value={t.crashes} hint={`${t.crashedUsers} users affected`} tone={t.crashes ? "text-red-600" : undefined} />
            <Kpi icon={ShieldCheck} label="Crash-free users" value={`${t.crashFreeUsers}%`} tone={healthTone(t.crashFreeUsers)} />
            <Kpi icon={ShieldCheck} label="Crash-free sessions" value={`${t.crashFreeSessions}%`} tone={healthTone(t.crashFreeSessions)} />
            <Kpi icon={Activity} label="Pages / session" value={t.sessions ? (t.pageViews / t.sessions).toFixed(1) : "0"} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily trend</CardTitle>
              <CardDescription>Users, sessions and crashes per day (IST).</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={d.daily}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="users" name="Users" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} />
                  <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} />
                  <Area type="monotone" dataKey="crashes" name="Crashes" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Most visited {mobile ? "screens" : "pages"}</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{mobile ? "Screen" : "Page"}</TableHead>
                      <TableHead className="text-right">Views</TableHead>
                      <TableHead className="text-right">Users</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {d.pages.length ? (
                      d.pages.map((p: any) => (
                        <TableRow key={p.page}>
                          <TableCell className="font-medium break-all">{p.page || "(unknown)"}</TableCell>
                          <TableCell className="text-right">{p.views}</TableCell>
                          <TableCell className="text-right">{p.users}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <Empty cols={3} />
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {mobile && (
              <Card>
                <CardHeader>
                  <CardTitle>App versions</CardTitle>
                  <CardDescription>Users and crashes per release.</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Version</TableHead>
                        <TableHead className="text-right">Users</TableHead>
                        <TableHead className="text-right">Crashes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {d.versions.length ? (
                        d.versions.map((r: any, i: number) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">{`${r.v || "?"} (${r.platform})`}</TableCell>
                            <TableCell className="text-right">{r.users}</TableCell>
                            <TableCell className={`text-right ${r.crashes ? "text-red-600 font-semibold" : ""}`}>{r.crashes}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <Empty cols={3} />
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {[
              ["Operating systems", d.os],
              [mobile ? "Devices" : "Browser + device type", d.devices],
            ].map(([title, rows]: any) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Users</TableHead>
                        <TableHead className="text-right">Crashes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.length ? (
                        rows.map((r: any, i: number) => (
                          <TableRow key={i}>
                            <TableCell>{r.name || "?"}</TableCell>
                            <TableCell className="text-right">{r.users}</TableCell>
                            <TableCell className="text-right">{r.crashes}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <Empty cols={3} />
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top crashes &amp; errors</CardTitle>
              <CardDescription>Grouped by message and version, most frequent first.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Error</TableHead>
                    <TableHead>Where</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Users</TableHead>
                    <TableHead>Last seen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {d.crashes.length ? (
                    d.crashes.map((c: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="max-w-md">
                          <div className="font-medium break-words">
                            {c.fatal && <span className="mr-2 rounded bg-red-100 px-1.5 py-0.5 text-xs text-red-700">FATAL</span>}
                            {c.msg}
                          </div>
                          {c.stack && (
                            <details className="text-xs text-slate-500">
                              <summary className="cursor-pointer">stack</summary>
                              <pre className="whitespace-pre-wrap">{c.stack}</pre>
                            </details>
                          )}
                        </TableCell>
                        <TableCell className="break-all">{c.page || "-"}</TableCell>
                        <TableCell>{c.v || "-"}</TableCell>
                        <TableCell className="text-right font-semibold">{c.count}</TableCell>
                        <TableCell className="text-right">{c.users}</TableCell>
                        <TableCell className="whitespace-nowrap text-xs">{new Date(c.last).toLocaleString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Empty cols={6} />
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent crashes</CardTitle>
              <CardDescription>Latest 25 individual events — who, where, on what device.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Error</TableHead>
                    <TableHead>Screen / page</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>OS</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>User</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {d.recent.length ? (
                    d.recent.map((c: any, i: number) => (
                      <TableRow key={i}>
                        <TableCell className="whitespace-nowrap text-xs">{new Date(c.ts).toLocaleString()}</TableCell>
                        <TableCell className="max-w-xs break-words">{c.msg}</TableCell>
                        <TableCell className="break-all">{c.page || "-"}</TableCell>
                        <TableCell>{c.device || "-"}</TableCell>
                        <TableCell>{c.os || "-"}</TableCell>
                        <TableCell>{c.v || "-"}</TableCell>
                        <TableCell className="font-mono text-xs">{String(c.uid).slice(-8)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Empty cols={7} />
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
