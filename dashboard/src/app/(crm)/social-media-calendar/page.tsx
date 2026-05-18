"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  POST_STATUSES,
  SOCIAL_PLATFORMS,
  type SocialMediaPost,
} from "@/lib/social-media-planner";
import { ClientPicker } from "@/components/social-media/client-picker";

type ViewMode = "month" | "week" | "day";

const statusColor: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-800 border-l-4 border-gray-400",
  Ready: "bg-blue-100 text-blue-800 border-l-4 border-blue-500",
  Scheduled: "bg-amber-100 text-amber-800 border-l-4 border-amber-500",
  Posted: "bg-green-100 text-green-800 border-l-4 border-green-500",
  Missed: "bg-red-100 text-red-800 border-l-4 border-red-500",
  Cancelled: "bg-slate-100 text-slate-800 border-l-4 border-slate-400",
};

const platformColor: Record<string, string> = {
  Instagram: "bg-gradient-to-r from-purple-400 to-pink-500 text-white",
  Facebook: "bg-blue-600 text-white",
  LinkedIn: "bg-blue-700 text-white",
  "X / Twitter": "bg-black text-white",
  "YouTube Shorts": "bg-red-600 text-white",
  "WhatsApp Channel": "bg-green-600 text-white",
  "Google My Business": "bg-yellow-600 text-white",
};

export default function SocialMediaCalendarPage() {
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [platformFilter, setPlatformFilter] = useState<string>("");

  const loadPosts = async (clientId: string) => {
    if (!clientId) {
      setPosts([]);
      return;
    }
    try {
      const url = new URL("/api/social-media-posts", window.location.origin);
      url.searchParams.set("clientId", clientId);
      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load posts");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setPosts([]);
    }
  };

  useEffect(() => {
    loadPosts(selectedClientId);
  }, [selectedClientId]);

  const parseDate = (dateStr: string): Date => {
    if (!dateStr) return new Date();
    if (dateStr.includes("T")) {
      return new Date(dateStr.split("T")[0]);
    }
    return new Date(dateStr);
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const postsByDate = useMemo(() => {
    const map = new Map<string, SocialMediaPost[]>();
    posts.forEach((post) => {
      const date = parseDate(post.scheduledDate);
      const key = formatDateKey(date);
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)!.push(post);
    });

    if (platformFilter) {
      const filtered = new Map<string, SocialMediaPost[]>();
      map.forEach((postsForDate, key) => {
        const filteredPosts = postsForDate.filter(
          (p) => p.platform === platformFilter,
        );
        if (filteredPosts.length > 0) {
          filtered.set(key, filteredPosts);
        }
      });
      return filtered;
    }

    return map;
  }, [posts, platformFilter]);

  const renderMonthCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const monthName = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {monthName} {year}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                  ),
                )
              }
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                  ),
                )
              }
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-semibold text-sm p-2">
              {day}
            </div>
          ))}

          {days.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="p-2 min-h-24" />;
            }

            const date = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day,
            );
            const dateKey = formatDateKey(date);
            const dayPosts = postsByDate.get(dateKey) || [];
            const isToday = dateKey === formatDateKey(new Date());

            return (
              <div
                key={`day-${day}`}
                className={`border rounded-lg p-2 min-h-24 overflow-y-auto ${
                  isToday ? "bg-blue-50 border-blue-300" : "bg-white"
                }`}
              >
                <div className="font-semibold text-sm mb-1">{day}</div>
                <div className="space-y-1">
                  {dayPosts.slice(0, 3).map((post) => (
                    <div
                      key={post._id || post.id}
                      className={`text-xs p-1 rounded cursor-pointer hover:shadow-md transition ${
                        statusColor[post.status]
                      }`}
                      title={`${post.title} (${post.platform})`}
                    >
                      <div className="font-medium truncate">{post.title}</div>
                      <div className="text-xs opacity-75 truncate">
                        {post.platform}
                      </div>
                    </div>
                  ))}
                  {dayPosts.length > 3 && (
                    <div className="text-xs text-gray-600 p-1 font-medium">
                      +{dayPosts.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    const sortedDates = Array.from(postsByDate.keys()).sort();

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Scheduled Tasks</h2>
          <Link href="/crm/social-media-planner/calendar">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>

        {sortedDates.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500">
                {selectedClientId
                  ? "No posts scheduled for this client"
                  : "Please select a client to view tasks"}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedDates.map((dateKey) => {
              const dayPosts = postsByDate.get(dateKey) || [];
              const date = new Date(dateKey);
              const dateStr = date.toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <div key={dateKey}>
                  <h3 className="font-bold text-lg mb-2 text-gray-700">
                    {dateStr}
                  </h3>
                  <div className="space-y-2">
                    {dayPosts.map((post) => (
                      <Card
                        key={post._id || post.id}
                        className={`${statusColor[post.status]}`}
                      >
                        <CardContent className="pt-4 pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm mb-1">
                                {post.title}
                              </h4>
                              <div className="flex flex-wrap gap-2 mb-2">
                                <span
                                  className={`text-xs px-2 py-1 rounded ${
                                    platformColor[post.platform] ||
                                    "bg-gray-200 text-gray-800"
                                  }`}
                                >
                                  {post.platform}
                                </span>
                                <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">
                                  {post.contentType}
                                </span>
                              </div>
                              {post.caption && (
                                <p className="text-xs line-clamp-2 opacity-75">
                                  {post.caption}
                                </p>
                              )}
                              {post.assignedTo && (
                                <div className="text-xs mt-2">
                                  <span className="font-medium">
                                    Assigned to:
                                  </span>{" "}
                                  {post.assignedTo}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-medium mb-2">
                                {post.scheduledTime}
                              </div>
                              <Link
                                href={`/crm/social-media-planner/calendar?postId=${
                                  post._id || post.id
                                }`}
                              >
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Social Media Calendar</h1>
        <p className="text-gray-600">
          Track all social media posts and tasks for your clients
        </p>
      </div>

      {}
      <div className="bg-white rounded-lg border p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Client</label>
            <ClientPicker onClientSelected={setSelectedClientId} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Platform</label>
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value="">All Platforms</option>
              {SOCIAL_PLATFORMS.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">View</label>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as ViewMode)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value="month">Month View</option>
              <option value="week">Week View</option>
              <option value="day">List View</option>
            </select>
          </div>
        </div>

        {selectedClientId && (
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-sm text-gray-600">
              Total scheduled posts:{" "}
              <span className="font-bold">{posts.length}</span>
            </div>
            <Link href="/crm/social-media-planner/calendar">
              <Button variant="default">
                <Plus className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
            </Link>
          </div>
        )}
      </div>

      {}
      <div className="bg-white rounded-lg border p-6">
        {!selectedClientId ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Please select a client to view calendar
            </p>
          </div>
        ) : viewMode === "month" ? (
          renderMonthCalendar()
        ) : (
          renderListView()
        )}
      </div>

      {}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Status Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {POST_STATUSES.map((status) => (
              <div key={status} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${statusColor[status]}`} />
                <span className="text-sm">{status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
