"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import {
  CONTENT_TYPES,
  SOCIAL_PLATFORMS,
  type SocialMediaPost,
} from "@/lib/social-media-planner";
import { ClientPicker } from "@/components/social-media/client-picker";
import { PostAccountDisplay } from "@/components/social-media/post-account-display";
import { PlatformLogo } from "@/components/social-media/platform-logo";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type AccountMetrics = {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  followers_gained: number;
};

const NO_ACCOUNT = "__no_account__";

const PLATFORM_COLORS: Record<string, string> = {
  Facebook: "#1877F2",
  Instagram: "#E1306C",
  LinkedIn: "#0A66C2",
  "X / Twitter": "#000000",
  "YouTube Shorts": "#FF0000",
  "WhatsApp Channel": "#25D366",
  "Google My Business": "#4285F4",
};

function getAccountMetrics(
  post: SocialMediaPost,
  accountId: string,
): AccountMetrics {
  if (accountId === NO_ACCOUNT) {
    return {
      views: post.views || 0,
      likes: post.likes || 0,
      comments: post.comments || 0,
      shares: post.shares || 0,
      followers_gained: post.followers_gained || 0,
    };
  }
  return (
    post.accountMetrics?.[accountId] || {
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      followers_gained: 0,
    }
  );
}

function calcEngRate(m: AccountMetrics): number {
  if (!m.views) return 0;
  return ((m.likes + m.comments + m.shares) / m.views) * 100;
}

function EngagementBadge({ m }: { m: AccountMetrics }) {
  const rate = calcEngRate(m);
  if (!m.views) return <span className="text-gray-400 font-semibold">—</span>;
  if (rate >= 5)
    return (
      <span className="inline-block px-2 py-0.5 rounded border-2 border-black bg-green-300 text-black text-xs font-bold">
        ↑ {rate.toFixed(2)}%
      </span>
    );
  if (rate >= 2)
    return (
      <span className="inline-block px-2 py-0.5 rounded border-2 border-black bg-blue-200 text-black text-xs font-bold">
        {rate.toFixed(2)}%
      </span>
    );
  return (
    <span className="inline-block px-2 py-0.5 rounded border-2 border-black bg-yellow-200 text-black text-xs font-bold">
      {rate.toFixed(2)}%
    </span>
  );
}

const STAT_CONFIG = [
  { key: "totalViews", label: "Total Views", icon: "👁", bg: "bg-blue-100" },
  { key: "totalLikes", label: "Total Likes", icon: "❤️", bg: "bg-red-100" },
  { key: "totalComments", label: "Comments", icon: "💬", bg: "bg-green-100" },
  { key: "totalShares", label: "Shares", icon: "↗", bg: "bg-purple-100" },
  {
    key: "totalFollowersGained",
    label: "Followers Gained",
    icon: "📈",
    bg: "bg-orange-100",
  },
];

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [clients, setClients] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [contentTypeFilter, setContentTypeFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [syncingKey, setSyncingKey] = useState<{
    postId: string;
    accountId: string;
  } | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [syncingAll, setSyncingAll] = useState(false);
  const [syncAllResult, setSyncAllResult] = useState<{ synced: number; skipped: number } | null>(null);
  const [syncProgress, setSyncProgress] = useState<{
    current: number;
    total: number;
    currentTitle: string;
    errors: { title: string; error: string }[];
  } | null>(null);

  const [inlineEditingKey, setInlineEditingKey] = useState<{
    postId: string;
    accountId: string;
  } | null>(null);
  const [inlineMetrics, setInlineMetrics] = useState<AccountMetrics>({
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    followers_gained: 0,
  });

  const loadPosts = async (clientId: string) => {
    if (!clientId) { setPosts([]); return; }
    try {
      const url = new URL("/api/social-media-posts", window.location.origin);
      url.searchParams.set("clientId", clientId);
      if (user && user.role !== "admin" && user.name)
        url.searchParams.set("assignedTo", user.name);
      if (dateFrom) url.searchParams.set("fromDate", dateFrom);
      if (dateTo) url.searchParams.set("toDate", dateTo);
      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch analytics data");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setPosts([]);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/clients", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        setClients(Array.isArray(data) ? data : []);
      } catch (e) { console.error(e); }
    })();
  }, []);

  useEffect(() => {
    loadPosts(selectedClientId);
  }, [selectedClientId, dateFrom, dateTo, user]);

  const selectedClient = useMemo(
    () => clients.find((c) => (c._id || c.id) === selectedClientId),
    [clients, selectedClientId],
  );

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
      const matchesPlatform = !platformFilter || post.platform === platformFilter;
      const matchesContentType = !contentTypeFilter || post.contentType === contentTypeFilter;
      return matchesSearch && matchesPlatform && matchesContentType;
    });
  }, [posts, search, platformFilter, contentTypeFilter]);

  const flatRows = useMemo(() => {
    return filteredPosts.flatMap((post) => {
      const accountIds =
        post.socialAccountIds && post.socialAccountIds.length > 0
          ? post.socialAccountIds
          : post.socialAccountId
            ? [post.socialAccountId]
            : [NO_ACCOUNT];
      return accountIds.map((accountId, idx) => ({
        post,
        accountId,
        isFirst: idx === 0,
        totalAccounts: accountIds.length,
      }));
    });
  }, [filteredPosts]);

  const summary = useMemo(() => {
    return posts.reduce(
      (acc, p) => {
        const accountIds =
          p.socialAccountIds && p.socialAccountIds.length > 0
            ? p.socialAccountIds
            : p.socialAccountId ? [p.socialAccountId] : null;
        if (accountIds && p.accountMetrics) {
          let hasAny = false;
          for (const id of accountIds) {
            const m = p.accountMetrics[id];
            if (m) {
              hasAny = true;
              acc.totalViews += m.views || 0;
              acc.totalLikes += m.likes || 0;
              acc.totalComments += m.comments || 0;
              acc.totalShares += m.shares || 0;
              acc.totalFollowersGained += m.followers_gained || 0;
            }
          }
          if (!hasAny) {
            acc.totalViews += p.views || 0;
            acc.totalLikes += p.likes || 0;
            acc.totalComments += p.comments || 0;
            acc.totalShares += p.shares || 0;
            acc.totalFollowersGained += p.followers_gained || 0;
          }
        } else {
          acc.totalViews += p.views || 0;
          acc.totalLikes += p.likes || 0;
          acc.totalComments += p.comments || 0;
          acc.totalShares += p.shares || 0;
          acc.totalFollowersGained += p.followers_gained || 0;
        }
        return acc;
      },
      { totalViews: 0, totalLikes: 0, totalComments: 0, totalShares: 0, totalFollowersGained: 0 },
    );
  }, [posts]);

  const overallEngRate = useMemo(() => {
    if (!summary.totalViews) return null;
    return (
      ((summary.totalLikes + summary.totalComments + summary.totalShares) /
        summary.totalViews) * 100
    ).toFixed(2);
  }, [summary]);

  const platformBreakdown = useMemo(() => {
    const map: Record<string, AccountMetrics> = {};
    posts.forEach((p) => {
      if (!map[p.platform])
        map[p.platform] = { views: 0, likes: 0, comments: 0, shares: 0, followers_gained: 0 };
      const accountIds =
        p.socialAccountIds && p.socialAccountIds.length > 0
          ? p.socialAccountIds
          : p.socialAccountId ? [p.socialAccountId] : null;
      if (accountIds && p.accountMetrics) {
        for (const id of accountIds) {
          const m = p.accountMetrics[id];
          if (m) {
            map[p.platform].views += m.views || 0;
            map[p.platform].likes += m.likes || 0;
          }
        }
      } else {
        map[p.platform].views += p.views || 0;
        map[p.platform].likes += p.likes || 0;
      }
    });
    return Object.entries(map)
      .map(([platform, m]) => ({ platform, ...m }))
      .filter((e) => e.views > 0)
      .sort((a, b) => b.views - a.views);
  }, [posts]);

  const topPosts = useMemo(() => {
    return flatRows
      .map(({ post, accountId }) => {
        const m = getAccountMetrics(post, accountId);
        return { post, accountId, m, er: calcEngRate(m) };
      })
      .filter((r) => r.m.views > 0)
      .sort((a, b) => b.er - a.er)
      .slice(0, 3);
  }, [flatRows]);

  const handleSyncAll = async () => {
    setSyncingAll(true);
    setSyncError(null);
    setSyncAllResult(null);
    setSyncProgress(null);

    const syncable = flatRows.filter(({ post, accountId }) => {
      const isMetaPlatform = post.platform === "Facebook" || post.platform === "Instagram";
      const hasAccount = accountId !== NO_ACCOUNT;
      const hasLink = !!(post.postedLink || (post as any).postedLinks?.[accountId]);
      return isMetaPlatform && hasAccount && hasLink;
    });

    setSyncProgress({ current: 0, total: syncable.length, currentTitle: "", errors: [] });

    let synced = 0;
    let skipped = 0;
    const errors: { title: string; error: string }[] = [];

    for (let i = 0; i < syncable.length; i++) {
      const { post, accountId } = syncable[i];
      const postId = (post._id || post.id) as string;
      setSyncProgress((prev) => prev ? { ...prev, current: i + 1, currentTitle: post.title } : prev);
      try {
        const res = await fetch("/api/social-media-metrics/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, accountId }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && !data.skipped) {
          synced++;
        } else {
          skipped++;
          const msg = data.reason || data.error || `HTTP ${res.status}`;
          errors.push({ title: post.title, error: msg });
          setSyncProgress((prev) => prev ? { ...prev, errors: [...prev.errors, { title: post.title, error: msg }] } : prev);
        }
      } catch (e: any) {
        skipped++;
        errors.push({ title: post.title, error: e.message || "Network error" });
        setSyncProgress((prev) => prev ? { ...prev, errors: [...prev.errors, { title: post.title, error: e.message || "Network error" }] } : prev);
      }
    }

    await loadPosts(selectedClientId);
    setSyncingAll(false);
    setSyncAllResult({ synced, skipped });
  };

  const handleSyncMetrics = async (post: SocialMediaPost, accountId: string) => {
    const postId = (post._id || post.id) as string;
    setSyncingKey({ postId, accountId });
    setSyncError(null);
    try {
      const res = await fetch("/api/social-media-metrics/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, accountId }),
      });
      const data = await res.json();
      if (!res.ok) setSyncError(data.error || "Sync failed");
      else await loadPosts(selectedClientId);
    } catch (e: any) {
      setSyncError(e.message || "Sync failed");
    } finally {
      setSyncingKey(null);
    }
  };

  const handleStartInlineEdit = (post: SocialMediaPost, accountId: string) => {
    setInlineEditingKey({ postId: (post._id || post.id) as string, accountId });
    setInlineMetrics(getAccountMetrics(post, accountId));
  };

  const handleSaveInlineMetrics = async () => {
    if (!inlineEditingKey) return;
    try {
      const body: any = { id: inlineEditingKey.postId, ...inlineMetrics };
      if (inlineEditingKey.accountId !== NO_ACCOUNT) body.accountId = inlineEditingKey.accountId;
      const res = await fetch("/api/social-media-posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to update metrics");
      await loadPosts(selectedClientId);
      setInlineEditingKey(null);
    } catch (error) {
      console.error("Error saving metrics:", error);
      alert("Failed to save metrics. Please try again.");
    }
  };

  const handleExportCSV = () => {
    const headers = ["Title", "Platform", "Account ID", "Date", "Views", "Likes", "Comments", "Shares", "Followers", "Eng. Rate"];
    const rows = flatRows.map(({ post, accountId }) => {
      const m = getAccountMetrics(post, accountId);
      const er = m.views
        ? (((m.likes + m.comments + m.shares) / m.views) * 100).toFixed(2) + "%"
        : "—";
      return [
        `"${post.title.replace(/"/g, '""')}"`,
        post.platform,
        accountId === NO_ACCOUNT ? "" : accountId,
        post.scheduledDate,
        m.views, m.likes, m.comments, m.shares, m.followers_gained, er,
      ].join(",");
    });
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${selectedClient?.name || "export"}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isSyncDone = !syncingAll && syncProgress !== null;

  return (
    <div className="space-y-6 font-headline">

      {/* Sync Progress Modal */}
      {syncProgress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white border-2 border-black rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            {/* Header */}
            <div className="bg-black text-white px-5 py-4 flex items-center justify-between">
              <h2 className="font-black text-base tracking-tight">
                {isSyncDone ? "SYNC COMPLETE" : "SYNCING POSTS…"}
              </h2>
              {isSyncDone && (
                <button
                  className="text-white hover:text-gray-300 font-black text-xl leading-none"
                  onClick={() => setSyncProgress(null)}
                >
                  ×
                </button>
              )}
            </div>

            <div className="px-5 py-4 space-y-4">
              {/* Progress counter */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-600">
                  {isSyncDone ? "Finished" : `Post ${syncProgress.current} of ${syncProgress.total}`}
                </span>
                <span className="text-sm font-black">
                  {syncProgress.current}/{syncProgress.total}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 border border-black overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${syncProgress.total > 0 ? (syncProgress.current / syncProgress.total) * 100 : 0}%`,
                    backgroundColor: isSyncDone ? "#22c55e" : "#2563eb",
                  }}
                />
              </div>

              {/* Current post */}
              {!isSyncDone && syncProgress.currentTitle && (
                <p className="text-xs font-semibold text-gray-500 truncate">
                  Syncing: <span className="text-black font-bold">{syncProgress.currentTitle}</span>
                </p>
              )}

              {/* Result summary when done */}
              {isSyncDone && syncAllResult && (
                <div className="flex gap-3">
                  <div className="flex-1 bg-green-50 border-2 border-green-400 rounded-lg p-3 text-center">
                    <div className="text-2xl font-black text-green-700">{syncAllResult.synced}</div>
                    <div className="text-xs font-bold text-green-600 uppercase">Synced</div>
                  </div>
                  <div className="flex-1 bg-red-50 border-2 border-red-300 rounded-lg p-3 text-center">
                    <div className="text-2xl font-black text-red-600">{syncAllResult.skipped}</div>
                    <div className="text-xs font-bold text-red-500 uppercase">Skipped</div>
                  </div>
                </div>
              )}

              {/* Errors list */}
              {syncProgress.errors.length > 0 && (
                <div className="max-h-40 overflow-y-auto space-y-1.5">
                  <p className="text-xs font-black uppercase text-gray-500 mb-1">
                    Skipped Posts ({syncProgress.errors.length})
                  </p>
                  {syncProgress.errors.map((e, i) => (
                    <div key={i} className="bg-red-50 border border-red-200 rounded-md px-3 py-2">
                      <p className="text-xs font-bold text-gray-800 truncate">{e.title}</p>
                      <p className="text-xs text-red-600 mt-0.5">{e.error}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Close button */}
              {isSyncDone && (
                <button
                  className="w-full py-2 bg-black text-white font-black rounded-lg text-sm hover:bg-gray-800 transition-colors"
                  onClick={() => setSyncProgress(null)}
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">
            SOCIAL MEDIA ANALYTICS
          </h1>
          <p className="text-muted-foreground">
            Track post performance and engagement metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/social-media-planner" className="px-3 py-2 border-2 border-black rounded-md text-sm font-semibold hover:bg-black hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/social-media-planner/planner" className="px-3 py-2 border-2 border-black rounded-md text-sm font-semibold hover:bg-black hover:text-white transition-colors">
            Planner
          </Link>
          <Link href="/social-media-planner/calendar" className="px-3 py-2 border-2 border-black rounded-md text-sm font-semibold hover:bg-black hover:text-white transition-colors">
            Calendar
          </Link>
        </div>
      </header>

      {/* Client Picker */}
      <section className="border-2 border-black rounded-lg p-4">
        <ClientPicker onClientSelected={setSelectedClientId} />
      </section>

      {!selectedClientId && (
        <section className="border-2 border-yellow-400 bg-yellow-50 rounded-lg p-6 text-center">
          <div className="text-lg font-semibold text-yellow-900">
            ⚠️ Please select a client to view analytics
          </div>
        </section>
      )}

      {selectedClientId && (
        <>
          <div className="text-lg font-semibold text-gray-700">
            Analytics for:{" "}
            <span className="text-black font-black">
              {selectedClient?.name || "Selected Client"}
            </span>
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({posts.length} posts)
            </span>
          </div>

          {/* Sync error */}
          {syncError && (
            <div className="rounded-lg border-2 border-red-400 bg-red-50 px-4 py-3 text-sm text-red-800 flex items-center justify-between">
              <span>⚠ {syncError}</span>
              <button className="ml-4 text-xs underline font-semibold" onClick={() => setSyncError(null)}>
                Dismiss
              </button>
            </div>
          )}

          {/* Summary Stats */}
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {STAT_CONFIG.map((cfg) => (
              <div key={cfg.key} className={`border-2 border-black rounded-lg p-4 ${cfg.bg}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                    {cfg.label}
                  </div>
                  <span className="text-lg">{cfg.icon}</span>
                </div>
                <div className="text-3xl font-black">
                  {summary[cfg.key as keyof typeof summary].toLocaleString()}
                </div>
              </div>
            ))}
            {/* Avg Engagement Rate */}
            <div className="border-2 border-black rounded-lg p-4 bg-lime-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Avg. Eng. Rate
                </div>
                <span className="text-lg">🎯</span>
              </div>
              <div className="text-3xl font-black">
                {overallEngRate ? `${overallEngRate}%` : "—"}
              </div>
            </div>
          </section>

          {/* Charts Row */}
          {posts.length > 0 && (platformBreakdown.length > 0 || topPosts.length > 0) && (
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Platform Views Chart */}
              {platformBreakdown.length > 0 && (
                <div className="border-2 border-black rounded-lg p-5">
                  <h3 className="text-base font-black mb-4 tracking-tight">
                    VIEWS BY PLATFORM
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                      data={platformBreakdown}
                      layout="vertical"
                      margin={{ left: 8, right: 16, top: 4, bottom: 4 }}
                    >
                      <XAxis
                        type="number"
                        tick={{ fontSize: 11, fontWeight: 600 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        type="category"
                        dataKey="platform"
                        tick={{ fontSize: 11, fontWeight: 700 }}
                        tickLine={false}
                        axisLine={false}
                        width={110}
                      />
                      <Tooltip
                        formatter={(v: any) => [v.toLocaleString() + " views", "Views"]}
                        contentStyle={{
                          fontSize: 12,
                          fontWeight: 700,
                          border: "2px solid black",
                          borderRadius: 8,
                        }}
                      />
                      <Bar dataKey="views" radius={[0, 4, 4, 0]}>
                        {platformBreakdown.map((entry, i) => (
                          <Cell key={i} fill={PLATFORM_COLORS[entry.platform] || "#6366f1"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Top Posts */}
              {topPosts.length > 0 && (
                <div className="border-2 border-black rounded-lg p-5">
                  <h3 className="text-base font-black mb-4 tracking-tight">
                    TOP PERFORMING POSTS
                  </h3>
                  <div className="space-y-3">
                    {topPosts.map(({ post, m, er }, i) => (
                      <div
                        key={(post._id || post.id) as string}
                        className="flex items-center gap-3 p-3 border-2 border-black rounded-lg bg-gray-50"
                      >
                        <span className="text-2xl font-black text-gray-300 w-6 text-center flex-shrink-0">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-black truncate">{post.title}</div>
                          <div className="text-xs text-gray-500 font-semibold mt-0.5">
                            {post.platform} · {m.views.toLocaleString()} views
                          </div>
                        </div>
                        <EngagementBadge m={m} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Filters */}
          <section className="border-2 border-black rounded-lg p-4">
            <h3 className="text-base font-black mb-4 tracking-tight">FILTERS</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide">
                  Search Posts
                </label>
                <Input
                  placeholder="Search by title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border-2 border-black rounded-md font-semibold text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide">
                  Platform
                </label>
                <select
                  className="w-full px-3 py-2 border-2 border-black rounded-md font-semibold text-sm bg-white"
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                >
                  <option value="">All Platforms</option>
                  {SOCIAL_PLATFORMS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide">
                  Content Type
                </label>
                <select
                  className="w-full px-3 py-2 border-2 border-black rounded-md font-semibold text-sm bg-white"
                  value={contentTypeFilter}
                  onChange={(e) => setContentTypeFilter(e.target.value)}
                >
                  <option value="">All Types</option>
                  {CONTENT_TYPES.map((ct) => (
                    <option key={ct} value={ct}>{ct}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide">
                  From Date
                </label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="border-2 border-black rounded-md font-semibold text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide">
                  To Date
                </label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="border-2 border-black rounded-md font-semibold text-sm"
                />
              </div>
            </div>
          </section>

          {/* Posts Table */}
          <section className="border-2 border-black rounded-lg overflow-hidden">
            {flatRows.length > 0 && (
              <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b-2 border-black flex-wrap gap-2">
                <h3 className="text-base font-black tracking-tight">
                  POSTS PERFORMANCE
                  <span className="ml-2 text-sm font-semibold text-gray-500">
                    ({flatRows.length} rows)
                  </span>
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {syncAllResult && (
                    <span className="text-xs font-semibold text-gray-500">
                      ✓ {syncAllResult.synced} synced, {syncAllResult.skipped} skipped
                    </span>
                  )}
                  <Button
                    size="sm"
                    className="text-xs font-bold border-2 border-blue-600 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    onClick={handleSyncAll}
                    disabled={syncingAll || !!syncingKey}
                  >
                    {syncingAll ? "Syncing…" : "⟳ Sync All"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
                    onClick={handleExportCSV}
                  >
                    ↓ Export CSV
                  </Button>
                </div>
              </div>
            )}

            {flatRows.length === 0 ? (
              <div className="p-10 text-center">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-lg font-black">No analytics data available</p>
                <p className="text-sm text-gray-500 font-semibold mt-1">
                  Posts will appear here once created and metrics are updated.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide">Platform</th>
                      <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide">Account</th>
                      <th className="px-4 py-3 text-center text-xs font-black uppercase tracking-wide">Date</th>
                      <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide">Views</th>
                      <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide">Likes</th>
                      <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide">Comments</th>
                      <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide">Shares</th>
                      <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide">Followers</th>
                      <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide">Eng. Rate</th>
                      <th className="px-4 py-3 text-center text-xs font-black uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flatRows.map(({ post, accountId, isFirst }, rowIdx) => {
                      const postId = (post._id || post.id) as string;
                      const isEditing =
                        inlineEditingKey?.postId === postId &&
                        inlineEditingKey?.accountId === accountId;
                      const metrics = getAccountMetrics(post, accountId);
                      const bgClass = rowIdx % 2 === 0 ? "bg-gray-50" : "bg-white";
                      const borderClass = isFirst && rowIdx !== 0 ? "border-t-2 border-black" : "";

                      return (
                        <tr key={`${postId}-${accountId}`} className={`${bgClass} ${borderClass}`}>
                          {/* Title */}
                          <td className="px-4 py-3 max-w-[200px]">
                            {isFirst ? (
                              <div className="font-black text-sm text-gray-900 truncate">
                                {post.title}
                                <div className="text-xs font-semibold text-gray-400 mt-0.5">
                                  {post.contentType}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-xs italic font-semibold pl-2">
                                ↳ {post.title}
                              </span>
                            )}
                          </td>

                          {/* Platform */}
                          <td className="px-4 py-3">
                            {isFirst && (
                              <div className="flex items-center gap-1.5">
                                <PlatformLogo platform={post.platform} size="sm" />
                                <span className="text-xs font-bold text-gray-700">{post.platform}</span>
                              </div>
                            )}
                          </td>

                          {/* Account */}
                          <td className="px-4 py-3 text-sm">
                            {accountId === NO_ACCOUNT ? (
                              <span className="text-gray-400 text-xs font-semibold">—</span>
                            ) : (
                              <PostAccountDisplay accountId={accountId} />
                            )}
                          </td>

                          {/* Date */}
                          <td className="px-4 py-3 text-center text-xs font-bold text-gray-600">
                            {isFirst ? post.scheduledDate : ""}
                          </td>

                          {/* Metric cells */}
                          {isEditing ? (
                            <>
                              {(["views", "likes", "comments", "shares", "followers_gained"] as const).map((field) => (
                                <td key={field} className="px-4 py-3 text-right">
                                  <input
                                    type="number"
                                    min="0"
                                    value={inlineMetrics[field]}
                                    onChange={(e) =>
                                      setInlineMetrics((prev) => ({
                                        ...prev,
                                        [field]: Math.max(0, parseInt(e.target.value) || 0),
                                      }))
                                    }
                                    className="w-20 px-2 py-1 border-2 border-black rounded text-right font-bold text-sm"
                                  />
                                </td>
                              ))}
                              <td className="px-4 py-3 text-right text-gray-400 font-semibold text-sm">—</td>
                            </>
                          ) : (
                            <>
                              <td className="px-4 py-3 text-right font-black text-gray-900 text-sm">
                                {metrics.views.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-right font-black text-gray-900 text-sm">
                                {metrics.likes.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-right font-black text-gray-900 text-sm">
                                {metrics.comments.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-right font-black text-gray-900 text-sm">
                                {metrics.shares.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-right font-black text-gray-900 text-sm">
                                {metrics.followers_gained.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <EngagementBadge m={metrics} />
                              </td>
                            </>
                          )}

                          {/* Actions */}
                          <td className="px-4 py-3 text-center">
                            {isEditing ? (
                              <div className="flex gap-1.5 justify-center">
                                <Button
                                  size="sm"
                                  className="text-xs font-bold bg-green-500 hover:bg-green-600 border-2 border-black h-7 px-3"
                                  onClick={handleSaveInlineMetrics}
                                >
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs font-bold border-2 border-black h-7 px-3"
                                  onClick={() => setInlineEditingKey(null)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <div className="flex gap-1.5 justify-center">
                                {(post.platform === "Facebook" || post.platform === "Instagram") &&
                                  accountId !== NO_ACCOUNT && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-xs font-bold border-2 border-blue-500 text-blue-700 hover:bg-blue-50 h-7 px-2"
                                      disabled={!!syncingKey}
                                      onClick={() => handleSyncMetrics(post, accountId)}
                                      title="Fetch live metrics from Meta Graph API"
                                    >
                                      {syncingKey?.postId === postId && syncingKey?.accountId === accountId
                                        ? "Syncing…"
                                        : "⟳ Sync"}
                                    </Button>
                                  )}
                                <Button
                                  size="sm"
                                  className="text-xs font-bold border-2 border-black h-7 px-2"
                                  onClick={() => handleStartInlineEdit(post, accountId)}
                                >
                                  Edit
                                </Button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
