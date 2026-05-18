"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Eye,
  Heart,
  Share2,
  MessageCircle,
  Users,
  Instagram,
  Facebook,
  Linkedin,
  BarChart2,
  Image as ImageIcon,
  Calendar,
} from "lucide-react";

function getAuthHeaders(): Record<string, string> {
  const t =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  return {
    "Content-Type": "application/json",
    ...(t ? { Authorization: `Bearer ${t}` } : {}),
  };
}

const PLATFORM_COLORS: Record<string, string> = {
  Instagram: "#E1306C",
  Facebook: "#1877F2",
  LinkedIn: "#0A66C2",
};
const PIE_COLORS = [
  "#000000",
  "#E1306C",
  "#1877F2",
  "#0A66C2",
  "#10b981",
  "#f59e0b",
];

function StatCard({
  icon,
  label,
  value,
  sub,
  color = "text-foreground",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          {icon}
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-black ${color}`}>
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}

export default function ClientAnalyticsPage() {
  const { user } = useAuth();

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "client") return;
    (async () => {
      try {
        setLoading(true);
        const url = new URL("/api/social-media-posts", window.location.origin);
        url.searchParams.set("clientId", user.clientId || "");
        const res = await fetch(url.toString(), { headers: getAuthHeaders() });
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (!user || user.role !== "client") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This page is only accessible to clients.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const postedPosts = posts.filter((p) => p.status === "Posted");

  let totalViews = 0,
    totalLikes = 0,
    totalShares = 0,
    totalComments = 0;
  const platformTotals: Record<
    string,
    {
      views: number;
      likes: number;
      shares: number;
      comments: number;
      posts: number;
    }
  > = {};

  for (const p of postedPosts) {
    const accountIds = p.socialAccountIds?.length
      ? p.socialAccountIds
      : p.socialAccountId
        ? [p.socialAccountId]
        : null;

    const addMetrics = (
      v: number,
      l: number,
      s: number,
      c: number,
      platform: string,
    ) => {
      totalViews += v;
      totalLikes += l;
      totalShares += s;
      totalComments += c;
      if (!platformTotals[platform])
        platformTotals[platform] = {
          views: 0,
          likes: 0,
          shares: 0,
          comments: 0,
          posts: 0,
        };
      platformTotals[platform].views += v;
      platformTotals[platform].likes += l;
      platformTotals[platform].shares += s;
      platformTotals[platform].comments += c;
      platformTotals[platform].posts += 1;
    };

    if (accountIds && p.accountMetrics) {
      for (const id of accountIds) {
        const m = p.accountMetrics[id];
        if (m)
          addMetrics(
            m.views || 0,
            m.likes || 0,
            m.shares || 0,
            m.comments || 0,
            p.platform || "Other",
          );
      }
    } else {
      addMetrics(
        p.views || 0,
        p.likes || 0,
        p.shares || 0,
        0,
        p.platform || "Other",
      );
    }
  }

  const engagementRate =
    totalViews > 0
      ? (
          ((totalLikes + totalShares + totalComments) / totalViews) *
          100
        ).toFixed(1)
      : "0.0";

  const timelineData = postedPosts
    .sort(
      (a, b) =>
        new Date(a.scheduledDate).getTime() -
        new Date(b.scheduledDate).getTime(),
    )
    .slice(-10)
    .map((p) => {
      let v = 0,
        l = 0,
        s = 0,
        c = 0;
      const ids = p.socialAccountIds?.length
        ? p.socialAccountIds
        : p.socialAccountId
          ? [p.socialAccountId]
          : null;
      if (ids && p.accountMetrics) {
        for (const id of ids) {
          const m = p.accountMetrics[id];
          if (m) {
            v += m.views || 0;
            l += m.likes || 0;
            s += m.shares || 0;
            c += m.comments || 0;
          }
        }
      } else {
        v = p.views || 0;
        l = p.likes || 0;
        s = p.shares || 0;
      }
      return {
        name: new Date(p.scheduledDate).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        }),
        title: p.title || "Post",
        views: v,
        likes: l,
        shares: s,
        comments: c,
        engagement: v > 0 ? +(((l + s + c) / v) * 100).toFixed(1) : 0,
        platform: p.platform,
      };
    });

  const platformPieData = Object.entries(platformTotals)
    .map(([name, d]) => ({
      name,
      value: d.views || d.likes + d.shares + d.comments,
    }))
    .filter((d) => d.value > 0);

  const platformBarData = Object.entries(platformTotals).map(([name, d]) => ({
    name,
    views: d.views,
    likes: d.likes,
    shares: d.shares,
    comments: d.comments,
    posts: d.posts,
  }));

  const topPosts = postedPosts
    .map((p) => {
      let v = 0,
        l = 0,
        s = 0,
        c = 0;
      const ids = p.socialAccountIds?.length
        ? p.socialAccountIds
        : p.socialAccountId
          ? [p.socialAccountId]
          : null;
      if (ids && p.accountMetrics) {
        for (const id of ids) {
          const m = p.accountMetrics[id];
          if (m) {
            v += m.views || 0;
            l += m.likes || 0;
            s += m.shares || 0;
            c += m.comments || 0;
          }
        }
      } else {
        v = p.views || 0;
        l = p.likes || 0;
        s = p.shares || 0;
      }
      const eng = v > 0 ? +(((l + s + c) / v) * 100).toFixed(1) : 0;
      return {
        ...p,
        _views: v,
        _likes: l,
        _shares: s,
        _comments: c,
        _eng: eng,
      };
    })
    .filter((p) => p._views > 0 || p._likes > 0)
    .sort((a, b) => b._eng - a._eng)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {}
      <div>
        <h1 className="text-4xl font-black tracking-tighter">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Content performance across all your social accounts
        </p>
      </div>

      {loading ? (
        <div className="text-muted-foreground animate-pulse py-8 text-center">
          Loading analytics...
        </div>
      ) : (
        <>
          {}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard
              icon={<BarChart2 className="w-4 h-4" />}
              label="Posts"
              value={postedPosts.length}
              sub="Published"
            />
            <StatCard
              icon={<Eye className="w-4 h-4" />}
              label="Total Views"
              value={totalViews}
              sub="Impressions"
            />
            <StatCard
              icon={<Heart className="w-4 h-4" />}
              label="Likes"
              value={totalLikes}
              sub="Reactions"
              color="text-red-600"
            />
            <StatCard
              icon={<Share2 className="w-4 h-4" />}
              label="Shares"
              value={totalShares}
              sub="Reposts"
              color="text-blue-600"
            />
            <StatCard
              icon={<MessageCircle className="w-4 h-4" />}
              label="Comments"
              value={totalComments}
              sub="Replies"
              color="text-purple-600"
            />
            <StatCard
              icon={<TrendingUp className="w-4 h-4" />}
              label="Eng. Rate"
              value={`${engagementRate}%`}
              sub="(likes+shares+comments)/views"
              color="text-green-600"
            />
          </div>

          {}
          {platformBarData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {}
              <Card className="border-2 border-black">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-black">
                    By Platform
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {platformBarData.map((p) => (
                    <div
                      key={p.name}
                      className="border-2 border-black rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 font-bold text-sm">
                          {p.name === "Instagram" && (
                            <Instagram
                              className="w-4 h-4"
                              style={{ color: "#E1306C" }}
                            />
                          )}
                          {p.name === "Facebook" && (
                            <Facebook
                              className="w-4 h-4"
                              style={{ color: "#1877F2" }}
                            />
                          )}
                          {p.name === "LinkedIn" && (
                            <Linkedin
                              className="w-4 h-4"
                              style={{ color: "#0A66C2" }}
                            />
                          )}
                          {p.name}
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs border-black font-bold"
                        >
                          {p.posts} post{p.posts !== 1 ? "s" : ""}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div>
                          <div className="text-lg font-black">
                            {p.views.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Views
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-black text-red-600">
                            {p.likes.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Likes
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-black text-blue-600">
                            {p.shares.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Shares
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-black text-purple-600">
                            {p.comments.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Comments
                          </div>
                        </div>
                      </div>
                      {p.views > 0 && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">
                              Engagement rate
                            </span>
                            <span className="font-bold text-green-600">
                              {(
                                ((p.likes + p.shares + p.comments) / p.views) *
                                100
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{
                                width: `${Math.min(((p.likes + p.shares + p.comments) / p.views) * 100 * 5, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {}
              {platformPieData.length > 1 && (
                <Card className="border-2 border-black">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-black">
                      Views Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={platformPieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                        >
                          {platformPieData.map((entry, i) => (
                            <Cell
                              key={entry.name}
                              fill={
                                PLATFORM_COLORS[entry.name] ||
                                PIE_COLORS[i % PIE_COLORS.length]
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v: any) => v.toLocaleString()} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {}
          {timelineData.length > 0 && (
            <Card className="border-2 border-black">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-black">
                  Performance Timeline (Last 10 Posts)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={timelineData}
                    margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0]?.payload;
                        return (
                          <div className="bg-white border-2 border-black rounded-lg p-3 text-xs shadow-lg max-w-[200px]">
                            <p className="font-black mb-1 truncate">
                              {d?.title || label}
                            </p>
                            <p className="text-muted-foreground mb-1">
                              {label}
                            </p>
                            {payload.map((e: any) => (
                              <div
                                key={e.dataKey}
                                className="flex justify-between gap-4"
                              >
                                <span style={{ color: e.color }}>{e.name}</span>
                                <span className="font-bold">
                                  {(e.value || 0).toLocaleString()}
                                </span>
                              </div>
                            ))}
                            {d?.engagement > 0 && (
                              <div className="mt-1 pt-1 border-t border-gray-200 flex justify-between">
                                <span className="text-green-600">
                                  Eng. Rate
                                </span>
                                <span className="font-bold text-green-600">
                                  {d.engagement}%
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="views"
                      name="Views"
                      fill="#000"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="likes"
                      name="Likes"
                      fill="#E1306C"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="shares"
                      name="Shares"
                      fill="#1877F2"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="comments"
                      name="Comments"
                      fill="#7c3aed"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {}
          {timelineData.filter((d) => d.engagement > 0).length > 1 && (
            <Card className="border-2 border-black">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-black">
                  Engagement Rate Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={timelineData}
                    margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} unit="%" />
                    <Tooltip formatter={(v: any) => `${v}%`} />
                    <Line
                      type="monotone"
                      dataKey="engagement"
                      stroke="#10b981"
                      strokeWidth={2.5}
                      dot={{ fill: "#10b981", r: 4 }}
                      name="Eng. Rate %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          {}
          {topPosts.length > 0 && (
            <Card className="border-2 border-black">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-black">
                  Top Performing Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topPosts.map((p, i) => (
                    <div
                      key={String(p._id || i)}
                      className="flex items-center gap-3 p-3 border-2 border-black rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="text-2xl font-black text-muted-foreground w-6 text-center">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-sm truncate">
                            {p.title || "Untitled"}
                          </p>
                          {p.platform && (
                            <Badge
                              variant="outline"
                              className="text-xs border-black shrink-0"
                              style={{ color: PLATFORM_COLORS[p.platform] }}
                            >
                              {p.platform}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(p.scheduledDate).toLocaleDateString(
                              "en-IN",
                              { day: "numeric", month: "short" },
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {p._views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1 text-red-600">
                            <Heart className="w-3 h-3" />
                            {p._likes.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1 text-blue-600">
                            <Share2 className="w-3 h-3" />
                            {p._shares.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1 text-purple-600">
                            <MessageCircle className="w-3 h-3" />
                            {p._comments.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-black text-green-600">
                          {p._eng}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Eng. Rate
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {postedPosts.length === 0 && (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="pt-12 pb-12 text-center text-muted-foreground">
                <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-bold">No published posts yet</p>
                <p className="text-sm mt-1">
                  Analytics will appear once your team publishes content.
                </p>
              </CardContent>
            </Card>
          )}

          <Card className="border-2 border-black bg-primary/5">
            <CardContent className="pt-4 pb-4">
              <p className="text-sm">
                <span className="font-bold">Note:</span> Metrics are synced
                periodically. Follower vs. non-follower reach requires Facebook
                Page Insights API access — ask your account manager to enable
                advanced insights.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
