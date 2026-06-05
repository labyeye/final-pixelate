"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import {
  CONTENT_TYPES,
  POST_STATUSES,
  SOCIAL_PLATFORMS,
  type SocialMediaPost,
  isSameDate,
  toDateTime,
} from "@/lib/social-media-planner";
import { ClientPicker } from "@/components/social-media/client-picker";
import { PostAccountDisplay } from "@/components/social-media/post-account-display";
import { MultiAccountDisplay } from "@/components/social-media/multi-account-display";

type ViewMode = "daily" | "weekly" | "monthly";

const statusBg: Record<string, string> = {
  Draft: "bg-gray-100",
  Ready: "bg-blue-100",
  Scheduled: "bg-amber-100",
  Posted: "bg-green-100",
  Missed: "bg-red-100",
  Cancelled: "bg-slate-100",
};

export default function SocialMediaCalendarPage() {
  const { user } = useAuth();
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("monthly");
  const [cursorDate, setCursorDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [platformFilter, setPlatformFilter] = useState("");
  const [staffFilter, setStaffFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [contentTypeFilter, setContentTypeFilter] = useState("");

  const loadPosts = async (clientId: string) => {
    if (!clientId) {
      setPosts([]);
      return;
    }
    try {
      const url = new URL("/api/social-media-posts", window.location.origin);
      url.searchParams.set("clientId", clientId);

      if (user && user.role !== "admin" && user.name) {
        url.searchParams.set("assignedTo", user.name);
      }

      const res = await apiFetch(url.toString(), { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load social posts");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setPosts([]);
    }
  };

  useEffect(() => {
    loadPosts(selectedClientId);
  }, [selectedClientId, user]);

  const filtered = useMemo(() => {
    return posts.filter((item) => {
      if (platformFilter && item.platform !== platformFilter) return false;
      if (staffFilter && item.assignedTo !== staffFilter) return false;
      if (statusFilter && item.status !== statusFilter) return false;
      if (contentTypeFilter && item.contentType !== contentTypeFilter)
        return false;
      return true;
    });
  }, [posts, platformFilter, staffFilter, statusFilter, contentTypeFilter]);

  const staffOptions = useMemo(() => {
    const set = new Set<string>();
    filtered.forEach((item) => {
      const value = String(item.assignedTo || "").trim();
      if (value) set.add(value);
    });
    return Array.from(set);
  }, [filtered]);

  const postsByDate = useMemo(() => {
    const map = new Map<string, SocialMediaPost[]>();
    filtered.forEach((item) => {
      if (!item.scheduledDate) return;

      let normalizedDate = item.scheduledDate;

      if (normalizedDate.includes("T")) {
        normalizedDate = normalizedDate.split("T")[0];
      }

      if (normalizedDate.includes("-") && normalizedDate.length === 10) {
        const key = normalizedDate;
        const arr = map.get(key) || [];
        arr.push(item);
        map.set(key, arr);
      } else {
        try {
          const dateObj = new Date(normalizedDate);
          if (!Number.isNaN(dateObj.getTime())) {
            const key = dateObj.toISOString().slice(0, 10);
            const arr = map.get(key) || [];
            arr.push(item);
            map.set(key, arr);
          }
        } catch (e) {
          console.warn("Failed to parse date:", normalizedDate, e);
        }
      }
    });
    return map;
  }, [filtered]);

  const todayQueue = useMemo(() => {
    return filtered
      .filter((item) => {
        const dt = toDateTime(item.scheduledDate, item.scheduledTime);
        return dt ? isSameDate(dt, new Date()) : false;
      })
      .sort((a, b) =>
        String(a.scheduledTime).localeCompare(String(b.scheduledTime)),
      );
  }, [filtered]);

  const upcoming = useMemo(() => {
    const now = new Date();
    return filtered
      .map((item) => ({
        item,
        dt: toDateTime(item.scheduledDate, item.scheduledTime),
      }))
      .filter((x) => x.dt && (x.dt as Date) >= now)
      .sort((a, b) => +(a.dt as Date) - +(b.dt as Date))
      .slice(0, 8)
      .map((x) => x.item);
  }, [filtered]);

  const missed = useMemo(() => {
    const now = new Date();
    return filtered
      .filter((item) => {
        const dt = toDateTime(item.scheduledDate, item.scheduledTime);
        if (!dt) return item.status === "Missed";
        return (
          item.status === "Missed" ||
          ((item.status === "Scheduled" || item.status === "Ready") && dt < now)
        );
      })
      .slice(0, 8);
  }, [filtered]);

  const updatePostDate = async (id: string, dateStr: string) => {
    const res = await apiFetch(`/api/social-media-posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scheduledDate: dateStr, status: "Scheduled" }),
    });
    if (!res.ok) {
      alert("Failed to reschedule post");
      return;
    }
    await loadPosts(selectedClientId);
  };

  const onDragStart = (event: React.DragEvent, id: string) => {
    event.dataTransfer.setData("text/plain", id);
  };

  const onDropDay = async (event: React.DragEvent, dateStr: string) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    if (!id) return;
    await updatePostDate(id, dateStr);
  };

  const monthCells = useMemo(() => {
    const first = new Date(cursorDate.getFullYear(), cursorDate.getMonth(), 1);
    const start = new Date(first);
    start.setDate(first.getDate() - first.getDay());

    return Array.from({ length: 42 }).map((_, idx) => {
      const date = new Date(start);
      date.setDate(start.getDate() + idx);
      return date;
    });
  }, [cursorDate]);

  const moveMonth = (delta: number) => {
    const next = new Date(cursorDate);
    next.setMonth(next.getMonth() + delta);
    setCursorDate(next);
  };

  const selectedKey = selectedDate.toISOString().slice(0, 10);
  const selectedPosts = postsByDate.get(selectedKey) || [];

  const weekDays = useMemo(() => {
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }).map((_, idx) => {
      const d = new Date(start);
      d.setDate(start.getDate() + idx);
      return d;
    });
  }, [selectedDate]);

  const dayPosts = useMemo(() => {
    return selectedPosts.sort((a, b) =>
      String(a.scheduledTime).localeCompare(String(b.scheduledTime)),
    );
  }, [selectedPosts]);

  return (
    <div className="space-y-6 font-headline">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">
            CONTENT CALENDAR
          </h1>
          <p className="text-muted-foreground">
            Daily, weekly and monthly social posting schedule.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/social-media-planner"
            className="px-3 py-2 border rounded-md text-sm font-semibold"
          >
            Dashboard
          </Link>
          <Link
            href="/social-media-planner/planner"
            className="px-3 py-2 border rounded-md text-sm font-semibold"
          >
            Planner
          </Link>
          <Link
            href="/social-media-planner/analytics"
            className="px-3 py-2 border rounded-md text-sm font-semibold"
          >
            Analytics
          </Link>
        </div>
      </header>

      <section className="border-2 border-black rounded-lg p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
        <select
          className="border rounded-md p-2"
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
        >
          <option value="">All Platforms</option>
          {SOCIAL_PLATFORMS.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
        <select
          className="border rounded-md p-2"
          value={staffFilter}
          onChange={(e) => setStaffFilter(e.target.value)}
        >
          <option value="">All Staff</option>
          {staffOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <select
          className="border rounded-md p-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          {POST_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          className="border rounded-md p-2"
          value={contentTypeFilter}
          onChange={(e) => setContentTypeFilter(e.target.value)}
        >
          <option value="">All Content Types</option>
          {CONTENT_TYPES.map((contentType) => (
            <option key={contentType} value={contentType}>
              {contentType}
            </option>
          ))}
        </select>
        <select
          className="border rounded-md p-2"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value as ViewMode)}
        >
          <option value="daily">Daily View</option>
          <option value="weekly">Weekly View</option>
          <option value="monthly">Monthly View</option>
        </select>
        <button
          className="border rounded-md p-2 text-sm"
          onClick={() => {
            setPlatformFilter("");
            setStaffFilter("");
            setStatusFilter("");
            setContentTypeFilter("");
          }}
        >
          Clear Filters
        </button>
      </section>

      {viewMode === "monthly" && (
        <section className="border-2 border-black rounded-lg overflow-hidden">
          <div className="p-3 border-b-2 border-black flex items-center justify-between">
            <button
              className="border rounded px-2 py-1"
              onClick={() => moveMonth(-1)}
            >
              Prev
            </button>
            <div className="font-black text-lg">
              {cursorDate.toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <button
              className="border rounded px-2 py-1"
              onClick={() => moveMonth(1)}
            >
              Next
            </button>
          </div>

          <div className="grid grid-cols-7 border-b">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="p-2 text-xs font-semibold border-r last:border-r-0"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {monthCells.map((date) => {
              const key = date.toISOString().slice(0, 10);
              const dayItems = postsByDate.get(key) || [];
              const isCurrentMonth = date.getMonth() === cursorDate.getMonth();
              const isToday = isSameDate(date, new Date());

              return (
                <div
                  key={key}
                  onClick={() => setSelectedDate(date)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => onDropDay(e, key)}
                  className={`min-h-28 border-r border-b p-1 cursor-pointer ${isCurrentMonth ? "bg-white" : "bg-slate-50 text-muted-foreground"} ${isToday ? "ring-1 ring-blue-500" : ""}`}
                >
                  <div className="text-xs font-semibold mb-1">
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayItems.slice(0, 3).map((item) => (
                      <div
                        key={String(item._id || item.id)}
                        draggable
                        onDragStart={(e) =>
                          onDragStart(e, String(item._id || item.id || ""))
                        }
                        className={`text-[10px] px-1 py-0.5 rounded truncate ${statusBg[item.status] || "bg-gray-100"}`}
                        title={`${item.title} · ${item.platform}`}
                      >
                        {item.scheduledTime} {item.title}
                      </div>
                    ))}
                    {dayItems.length > 3 && (
                      <div className="text-[10px] text-muted-foreground">
                        +{dayItems.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="border rounded-lg p-3">
        <h3 className="font-black mb-2">
          Selected Date Posts (
          {selectedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
          )
        </h3>
        <div className="space-y-2">
          {!selectedPosts.length && (
            <p className="text-sm text-muted-foreground">
              No posts scheduled on selected date.
            </p>
          )}
          {selectedPosts
            .slice()
            .sort((a, b) =>
              String(a.scheduledTime).localeCompare(String(b.scheduledTime)),
            )
            .map((item) => (
              <div
                key={`sel-${String(item._id || item.id)}`}
                className="border rounded p-2"
              >
                <div className="font-semibold text-sm">
                  {item.scheduledTime} · {item.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.platform} ·
                  {item.socialAccountIds && item.socialAccountIds.length > 0 ? (
                    <MultiAccountDisplay
                      accountIds={item.socialAccountIds}
                      className="inline"
                    />
                  ) : (
                    <PostAccountDisplay accountId={item.socialAccountId} />
                  )}
                  · {item.assignedTo || "Unassigned"} · {item.status}
                </div>
              </div>
            ))}
        </div>
      </section>

      {viewMode === "weekly" && (
        <section className="border-2 border-black rounded-lg overflow-hidden">
          <div className="p-3 border-b-2 border-black flex items-center justify-between">
            <button
              className="border rounded px-2 py-1"
              onClick={() =>
                setSelectedDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate() - 7,
                  ),
                )
              }
            >
              Prev Week
            </button>
            <div className="font-black text-lg">
              Week of{" "}
              {weekDays[0].toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              })}
            </div>
            <button
              className="border rounded px-2 py-1"
              onClick={() =>
                setSelectedDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate() + 7,
                  ),
                )
              }
            >
              Next Week
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2 p-2">
            {weekDays.map((date) => {
              const key = date.toISOString().slice(0, 10);
              const dayItems = postsByDate.get(key) || [];
              return (
                <div key={key} className="border rounded p-2 min-h-32">
                  <div className="text-xs font-semibold mb-1">
                    {date.toLocaleDateString("en-IN", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                    })}
                  </div>
                  <div className="space-y-1">
                    {dayItems.length ? (
                      dayItems.map((item) => (
                        <div
                          key={String(item._id || item.id)}
                          className={`text-[11px] px-1 py-0.5 rounded ${statusBg[item.status] || "bg-gray-100"}`}
                        >
                          {item.scheduledTime} {item.title}
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        No posts
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {viewMode === "daily" && (
        <section className="border-2 border-black rounded-lg overflow-hidden">
          <div className="p-3 border-b-2 border-black flex items-center justify-between">
            <button
              className="border rounded px-2 py-1"
              onClick={() =>
                setSelectedDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate() - 1,
                  ),
                )
              }
            >
              Prev Day
            </button>
            <div className="font-black text-lg">
              {selectedDate.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            <button
              className="border rounded px-2 py-1"
              onClick={() =>
                setSelectedDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate() + 1,
                  ),
                )
              }
            >
              Next Day
            </button>
          </div>
          <div className="p-3 space-y-2">
            {dayPosts.length ? (
              dayPosts.map((item) => (
                <div
                  key={String(item._id || item.id)}
                  className={`border rounded p-2 ${statusBg[item.status] || "bg-gray-50"}`}
                >
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.platform} ·
                    {item.socialAccountIds &&
                    item.socialAccountIds.length > 0 ? (
                      <MultiAccountDisplay
                        accountIds={item.socialAccountIds}
                        className="inline"
                      />
                    ) : (
                      <PostAccountDisplay accountId={item.socialAccountId} />
                    )}
                    · {item.contentType} · {item.scheduledTime}
                  </div>
                  <div className="text-xs mt-1">{item.caption}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">
                No posts scheduled for this day.
              </div>
            )}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <section className="border rounded-lg p-3">
          <h3 className="font-black mb-2">Today’s Queue</h3>
          <div className="space-y-2">
            {!todayQueue.length && (
              <p className="text-sm text-muted-foreground">
                No posts for today.
              </p>
            )}
            {todayQueue.map((item) => (
              <div
                key={String(item._id || item.id)}
                className="border rounded p-2"
              >
                <div className="font-semibold text-sm">
                  {item.scheduledTime} · {item.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.platform} ·
                  {item.socialAccountIds && item.socialAccountIds.length > 0 ? (
                    <MultiAccountDisplay
                      accountIds={item.socialAccountIds}
                      className="inline"
                    />
                  ) : (
                    <PostAccountDisplay accountId={item.socialAccountId} />
                  )}
                  · {item.assignedTo || "Unassigned"}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border rounded-lg p-3">
          <h3 className="font-black mb-2">Upcoming & Missed</h3>
          <div className="space-y-2 max-h-60 overflow-auto">
            {upcoming.map((item) => (
              <div
                key={`up-${String(item._id || item.id)}`}
                className="border rounded p-2"
              >
                <div className="text-sm font-semibold">{item.title}</div>
                <div className="text-xs text-muted-foreground">
                  Upcoming · {item.scheduledDate} {item.scheduledTime}
                </div>
              </div>
            ))}
            {missed.map((item) => (
              <div
                key={`ms-${String(item._id || item.id)}`}
                className="border rounded p-2 bg-red-50"
              >
                <div className="text-sm font-semibold">{item.title}</div>
                <div className="text-xs text-red-700">
                  Missed · {item.scheduledDate} {item.scheduledTime}
                </div>
              </div>
            ))}
            {!upcoming.length && !missed.length && (
              <p className="text-sm text-muted-foreground">
                No upcoming or missed posts.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
