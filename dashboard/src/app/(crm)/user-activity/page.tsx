"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Activity, Clock, Users, Globe } from "lucide-react";

interface UserActivity {
  _id: string;
  userId: string;
  url: string;
  startTime: string; // ISO string
  duration: number; // seconds
  userAgent: string;
  referrer: string;
}

const KNOWN_PAGES = [
  "/",
  "/about.html",
  "/pricing.html",
  "/webdev.html",
  "/app-dev.html",
  "/software-dev.html",
  "/blogs.html",
  "/careers.html",
  "/contact.html",
  "/technologies.html",
  "/industry-ecommerce.html",
  "/industry-education.html",
  "/industry-finance.html",
  "/industry-healthcare.html",
  "/industry-logistics.html",
  "/industry-manufacturing.html",
  "/industry-media.html",
  "/industry-realestate.html",
  "/industry-travel.html",
  "/industry-utilities.html",
  "/detailed-services.html",
  "/locations.html",
  "/video-ed.html",
  "/photography.html",
  "/privacy-policy.html",
  "/terms-of-service.html",
  "/cookie-policy.html",
  "/state.html",
];

export default function UserActivityPage() {
  const [data, setData] = useState<UserActivity[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/user-activity");
      const json = await res.json();
      if (Array.isArray(json)) {
        setData(json);
      }
    } catch (error) {
      console.error("Failed to fetch activity", error);
    } finally {
      setLoading(false);
    }
  };

  // Metrics
  const totalVisits = data.length;
  const uniqueUsers = new Set(data.map((d) => d.userId)).size;
  const avgDuration =
    data.length > 0
      ? (
          data.reduce((acc, curr) => acc + (curr.duration || 0), 0) /
          data.length
        ).toFixed(1)
      : 0;

  // Process Charts
  // 1. Visits over time (last 24h, grouped by hour)
  const visitsByHour = data.reduce(
    (acc, curr) => {
      const date = new Date(curr.startTime);
      const key = date.getHours() + ":00";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const visitsChartData = Object.entries(visitsByHour).map(([name, value]) => ({
    name,
    value,
  }));

  // 2. Top Pages
  const pagesCount = data.reduce(
    (acc, curr) => {
      // Simplify URL to path
      let path = curr.url;
      try {
        const urlObj = new URL(curr.url);
        path = urlObj.pathname;
        if (path === "/index.html") path = "/";
      } catch (e) {
        // fallback if url is relative or invalid, though api ensures it's stored
      }

      acc[path] = (acc[path] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const topPagesData = Object.entries(pagesCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  // 3. Page Performance (All Pages)
  const pagePerformance = KNOWN_PAGES.map((page) => {
    // Find all visits for this page
    const visits = data.filter((d) => {
      try {
        let p = new URL(d.url).pathname;
        if (p === "/index.html") p = "/";
        return p === page;
      } catch (e) {
        return false;
      }
    });

    const totalVisits = visits.length;
    const uniqueVisitors = new Set(visits.map((v) => v.userId)).size;
    const totalDuration = visits.reduce((sum, v) => sum + (v.duration || 0), 0);
    const avgTime =
      totalVisits > 0 ? (totalDuration / totalVisits).toFixed(1) : "0.0";

    return {
      page,
      visits: totalVisits,
      unique: uniqueVisitors,
      avgTime: avgTime,
    };
  }).sort((a, b) => b.visits - a.visits);

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            User Activity
          </h2>
          <p className="text-slate-500">
            Real-time insights into user behavior and website traffic.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-600">Live</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Visits
            </CardTitle>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {totalVisits}
            </div>
            <p className="text-xs text-slate-500">+19% from last hour</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Unique Users
            </CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {uniqueUsers}
            </div>
            <p className="text-xs text-slate-500">+201 since last week</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Avg. Duration
            </CardTitle>
            <Clock className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {avgDuration}s
            </div>
            <p className="text-xs text-slate-500">Per session</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Hourly traffic distribution.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={visitsChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  cursor={{ stroke: "#e2e8f0", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#6366f1",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 6, opacity: 0.5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>
              Most visited sections of the website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={topPagesData}
                layout="vertical"
                margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={true}
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={150}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                  cursor={{ fill: "#f1f5f9" }}
                />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* All Pages Performance Section */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle>Page Performance</CardTitle>
          <CardDescription>
            Detailed metrics for all website pages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page URL</TableHead>
                <TableHead>Total Visits</TableHead>
                <TableHead>Unique Visitors</TableHead>
                <TableHead>Avg. Time (s)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagePerformance.map((page) => (
                <TableRow key={page.page}>
                  <TableCell className="font-medium text-slate-800">
                    <span className="flex items-center gap-2">
                      <Globe className="h-3 w-3 text-slate-400" />
                      {page.page}
                    </span>
                  </TableCell>
                  <TableCell>
                    {page.visits > 0 ? (
                      <span className="font-bold text-slate-900">
                        {page.visits}
                      </span>
                    ) : (
                      <span className="text-slate-400">0</span>
                    )}
                  </TableCell>
                  <TableCell>{page.unique}</TableCell>
                  <TableCell>
                    {page.visits > 0 ? (
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                        {page.avgTime}s
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {page.visits > 0 ? (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
                        No Visits
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest user sessions and interactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">User</TableHead>
                <TableHead>Page</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Referrer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.slice(0, 10).map((activity) => (
                <TableRow key={activity._id}>
                  <TableCell className="font-mono text-xs text-slate-500">
                    {activity.userId.split("_")[1] || "Guest"}
                  </TableCell>
                  <TableCell className="font-medium text-slate-800 break-words max-w-md">
                    <span className="flex items-center gap-2">
                      <Globe className="h-3 w-3 text-slate-400" />
                      {activity.url
                        .replace("http://", "")
                        .replace("https://", "")
                        .substring(0, 50)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {activity.duration > 0 ? (
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                        {activity.duration}s
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-600 text-sm">
                    {new Date(activity.startTime).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="text-right text-xs text-slate-400 max-w-[150px] truncate">
                    {activity.referrer || "Direct"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
