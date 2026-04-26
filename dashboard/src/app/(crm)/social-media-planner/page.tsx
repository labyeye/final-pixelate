"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  POST_STATUSES,
  SOCIAL_PLATFORMS,
  type SocialMediaPost,
  toDateTime,
  isSameDate,
} from "@/lib/social-media-planner";
import { ClientPicker } from "@/components/social-media/client-picker";

const statusColor: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Ready: "bg-blue-100 text-blue-700",
  Scheduled: "bg-amber-100 text-amber-700",
  Posted: "bg-green-100 text-green-700",
  Missed: "bg-red-100 text-red-700",
  Cancelled: "bg-slate-100 text-slate-700",
};

export default function SocialMediaPlannerDashboardPage() {
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);

  const loadPosts = async (clientId: string) => {
    if (!clientId) {
      setPosts([]);
      return;
    }
    try {
      let mounted = true;
      const url = new URL("/api/social-media-posts", window.location.origin);
      url.searchParams.set("clientId", clientId);
      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load social media posts");
      const data = await res.json();
      if (mounted) setPosts(Array.isArray(data) ? data : []);
      return () => {
        mounted = false;
      };
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadPosts(selectedClientId);
  }, [selectedClientId]);

  const now = new Date();
  const weekEnd = new Date(now);
  weekEnd.setDate(now.getDate() + 7);

  const metrics = useMemo(() => {
    const totalPlannedPosts = posts.length;
    const byStatus = Object.fromEntries(
      POST_STATUSES.map((status) => [
        status,
        posts.filter((item) => item.status === status).length,
      ]),
    ) as Record<string, number>;

    const dateTimePairs = posts
      .map((item) => ({ item, dt: toDateTime(item.scheduledDate, item.scheduledTime) }))
      .filter((x) => x.dt);

    const todaysPosts = dateTimePairs.filter((x) => isSameDate(x.dt as Date, now)).length;
    const thisWeeksPosts = dateTimePairs.filter(
      (x) => (x.dt as Date) >= new Date(now.setHours(0, 0, 0, 0)) && (x.dt as Date) <= weekEnd,
    ).length;

    const platformWise = Object.fromEntries(
      SOCIAL_PLATFORMS.map((platform) => [
        platform,
        posts.filter((item) => item.platform === platform).length,
      ]),
    ) as Record<string, number>;

    return {
      totalPlannedPosts,
      byStatus,
      todaysPosts,
      thisWeeksPosts,
      platformWise,
    };
  }, [posts]);

  const upcomingScheduled = useMemo(() => {
    const nowRef = new Date();
    return posts
      .filter((item) => item.status === "Scheduled")
      .map((item) => ({ item, dt: toDateTime(item.scheduledDate, item.scheduledTime) }))
      .filter((x) => x.dt && (x.dt as Date) >= nowRef)
      .sort((a, b) => +((a.dt as Date)) - +((b.dt as Date)))
      .slice(0, 8)
      .map((x) => x.item);
  }, [posts]);

  const missedPosts = useMemo(() => {
    const nowRef = new Date();
    return posts
      .filter((item) => {
        const dt = toDateTime(item.scheduledDate, item.scheduledTime);
        if (!dt) return item.status === "Missed";
        return item.status === "Missed" || ((item.status === "Scheduled" || item.status === "Ready") && dt < nowRef);
      })
      .sort((a, b) => {
        const ad = toDateTime(a.scheduledDate, a.scheduledTime);
        const bd = toDateTime(b.scheduledDate, b.scheduledTime);
        return +(bd || 0) - +(ad || 0);
      })
      .slice(0, 8);
  }, [posts]);

  const recentPosted = useMemo(() => {
    return posts
      .filter((item) => item.status === "Posted")
      .sort((a, b) => +(new Date(b.updatedAt || b.createdAt || 0)) - +(new Date(a.updatedAt || a.createdAt || 0)))
      .slice(0, 8);
  }, [posts]);

  const staffWiseAssigned = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((item) => {
      const key = item.assignedTo?.trim() || "Unassigned";
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const quickCalendar = useMemo(() => {
    return Array.from({ length: 7 }).map((_, idx) => {
      const date = new Date();
      date.setDate(date.getDate() + idx);
      const count = posts.filter((item) => {
        const dt = toDateTime(item.scheduledDate, item.scheduledTime);
        return dt ? isSameDate(dt, date) : false;
      }).length;
      return { date, count };
    });
  }, [posts]);

  return (
    <div className="space-y-8 font-headline">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">SOCIAL MEDIA PLANNER</h1>
          <p className="text-muted-foreground">Dashboard overview of social media posts</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/social-media-planner/planner" className="px-3 py-2 border rounded-md text-sm font-semibold">Planner</Link>
          <Link href="/social-media-planner/calendar" className="px-3 py-2 border rounded-md text-sm font-semibold">Calendar</Link>
          <Link href="/social-media-planner/analytics" className="px-3 py-2 border rounded-md text-sm font-semibold">Analytics</Link>
        </div>
      </header>

      {}
      <section className="border-2 border-black rounded-lg p-4">
        <ClientPicker
          onClientSelected={setSelectedClientId}
        />
      </section>

      {}
      {!selectedClientId && (
        <section className="border-2 border-yellow-400 bg-yellow-50 rounded-lg p-6 text-center">
          <div className="text-lg font-semibold text-yellow-900">
            ⚠️ Please select a client to view dashboard metrics
          </div>
          <p className="text-sm text-yellow-700 mt-2">
            Select a client from the dropdown above to view their social media statistics.
          </p>
        </section>
      )}

      {}
      {selectedClientId && (
        <div className="space-y-6">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black tracking-tighter">Dashboard Metrics</h2>
              <p className="text-muted-foreground">Daily planning and execution overview for social posting.</p>
            </div>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
            <StatCard label="Total Planned" value={metrics.totalPlannedPosts} />
            <StatCard label="Draft" value={metrics.byStatus.Draft || 0} />
            <StatCard label="Scheduled" value={metrics.byStatus.Scheduled || 0} />
            <StatCard label="Posted" value={metrics.byStatus.Posted || 0} />
            <StatCard label="Missed" value={metrics.byStatus.Missed || 0} />
            <StatCard label="Today" value={metrics.todaysPosts} />
            <StatCard label="This Week" value={metrics.thisWeeksPosts} />
            <StatCard label="Ready" value={metrics.byStatus.Ready || 0} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Scheduled Posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {upcomingScheduled.length === 0 ? <p className="text-sm text-muted-foreground">No upcoming scheduled posts.</p> : upcomingScheduled.map((item) => (
                  <div key={String(item._id || item.id)} className="border rounded p-2 flex items-center justify-between gap-2">
                    <div>
                      <div className="font-semibold text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.platform} · {item.scheduledDate} {item.scheduledTime}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${statusColor[item.status] || "bg-gray-100"}`}>{item.status}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform-wise Count</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <div key={platform} className="flex items-center justify-between text-sm">
                    <span>{platform}</span>
                    <span className="font-bold">{metrics.platformWise[platform] || 0}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Overdue / Missed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {missedPosts.length === 0 ? <p className="text-sm text-muted-foreground">No missed posts.</p> : missedPosts.map((item) => (
                  <div key={String(item._id || item.id)} className="border rounded p-2">
                    <div className="font-semibold text-sm">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.platform} · {item.scheduledDate} {item.scheduledTime}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Posted Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {recentPosted.length === 0 ? <p className="text-sm text-muted-foreground">No posted content yet.</p> : recentPosted.map((item) => (
                  <div key={String(item._id || item.id)} className="border rounded p-2">
                    <div className="font-semibold text-sm">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.platform} · {item.postedLink || "No link"}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Staff-wise Assigned</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {staffWiseAssigned.length === 0 ? <p className="text-sm text-muted-foreground">No assignments yet.</p> : staffWiseAssigned.map(([name, count]) => (
                  <div key={name} className="flex items-center justify-between text-sm border rounded px-2 py-1">
                    <span>{name}</span>
                    <span className="font-bold">{count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Calendar Preview (Next 7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {quickCalendar.map(({ date, count }) => (
                <div key={date.toISOString()} className="border rounded p-2 text-center">
                  <div className="text-xs text-muted-foreground">{date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</div>
                  <div className="text-xl font-black">{count}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-2xl font-black">{value}</div>
      </CardContent>
    </Card>
  );
}
