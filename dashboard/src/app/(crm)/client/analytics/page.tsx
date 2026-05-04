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
} from "recharts";
import { TrendingUp, Eye, Heart, Share2 } from "lucide-react";

export default function ClientAnalyticsPage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalLikes: 0,
    totalShares: 0,
    engagementRate: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "client") return;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("auth_token")
            : null;
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch("/api/social-media-planner", { headers });
        if (!res.ok) throw new Error("Failed to fetch analytics");

        const posts = await res.json();
        const clientPosts = Array.isArray(posts)
          ? posts.filter((p) => p.clientId === user.clientId)
          : [];

        const totalViews = clientPosts.reduce(
          (sum, p) => sum + (p.views || 0),
          0,
        );
        const totalLikes = clientPosts.reduce(
          (sum, p) => sum + (p.likes || 0),
          0,
        );
        const totalShares = clientPosts.reduce(
          (sum, p) => sum + (p.shares || 0),
          0,
        );
        const engagementRate =
          totalViews > 0
            ? Math.round(((totalLikes + totalShares) / totalViews) * 100)
            : 0;

        setAnalytics({
          totalViews,
          totalLikes,
          totalShares,
          engagementRate,
        });

        const last7Posts = clientPosts
          .sort(
            (a, b) =>
              new Date(b.scheduledDate).getTime() -
              new Date(a.scheduledDate).getTime(),
          )
          .slice(0, 7)
          .reverse()
          .map((p) => ({
            name: new Date(p.scheduledDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            views: p.views || 0,
            likes: p.likes || 0,
            shares: p.shares || 0,
          }));

        setChartData(last7Posts);
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
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

  return (
    <div className="min-h-screen bg-background font-headline p-6 space-y-6">
      {}
      <div>
        <h1 className="text-4xl font-black tracking-tighter">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track your performance metrics
        </p>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">
              {analytics.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total impressions
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Likes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-red-600">
              {analytics.totalLikes.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total likes</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Shares
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-blue-600">
              {analytics.totalShares.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total shares</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-green-600">
              {analytics.engagementRate}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Engagement rate
            </p>
          </CardContent>
        </Card>
      </div>

      {}
      {!loading && chartData.length > 0 && (
        <Card className="border-2 border-black">
          <CardHeader>
            <CardTitle>Performance Trend (Last 7 Posts)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#000" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#000"
                  strokeWidth={2}
                  name="Views"
                />
                <Line
                  type="monotone"
                  dataKey="likes"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Likes"
                />
                <Line
                  type="monotone"
                  dataKey="shares"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Shares"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {}
      <Card className="border-2 border-black bg-primary/5">
        <CardContent className="pt-6">
          <p className="text-sm">
            <span className="font-bold">💡 Note:</span> Analytics are updated
            daily. Your team manages all content. These metrics are for your
            transparency and reference only.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
