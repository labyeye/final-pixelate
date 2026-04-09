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
  toDateTime,
} from "@/lib/social-media-planner";
import { ClientPicker } from "@/components/social-media/client-picker";
import { AddPostModal } from "@/components/social-media/add-post-modal";

const statusBadge: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Ready: "bg-blue-100 text-blue-700",
  Scheduled: "bg-amber-100 text-amber-700",
  Posted: "bg-green-100 text-green-700",
  Missed: "bg-red-100 text-red-700",
  Cancelled: "bg-slate-100 text-slate-700",
};

export default function SocialMediaPlannerPage() {
  const { user } = useAuth();
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [staffFilter, setStaffFilter] = useState("");
  const [contentTypeFilter, setContentTypeFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Load posts filtered by selected client
  const loadPosts = async (clientId: string) => {
    if (!clientId) {
      setPosts([]);
      return;
    }
    try {
      const url = new URL("/api/social-media-posts", window.location.origin);
      url.searchParams.set("clientId", clientId);
      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch social posts");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setPosts([]);
    }
  };

  // Load team members
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/team-members", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        setTeam(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  // Reload posts when client changes
  useEffect(() => {
    loadPosts(selectedClientId);
  }, [selectedClientId]);

  const staffOptions = useMemo(() => {
    const fromTeam = team.map((m) => String(m?.name || "").trim()).filter(Boolean);
    const fromPosts = posts.map((p) => String(p.assignedTo || "").trim()).filter(Boolean);
    return Array.from(new Set([...fromTeam, ...fromPosts]));
  }, [team, posts]);

  const filtered = useMemo(() => {
    return posts.filter((item) => {
      const text = `${item.title} ${item.caption}`.toLowerCase();
      const q = search.trim().toLowerCase();
      if (q && !text.includes(q)) return false;
      if (platformFilter && item.platform !== platformFilter) return false;
      if (statusFilter && item.status !== statusFilter) return false;
      if (staffFilter && item.assignedTo !== staffFilter) return false;
      if (contentTypeFilter && item.contentType !== contentTypeFilter) return false;
      if (dateFrom && item.scheduledDate < dateFrom) return false;
      if (dateTo && item.scheduledDate > dateTo) return false;
      return true;
    });
  }, [posts, search, platformFilter, statusFilter, staffFilter, contentTypeFilter, dateFrom, dateTo]);

  const savePost = async (post: SocialMediaPost) => {
    try {
      const res = await fetch("/api/social-media-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (!res.ok) {
        throw new Error("Failed to create post");
      }
      await loadPosts(selectedClientId);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const deletePost = async (id: string) => {
    if (!window.confirm("Delete this post plan?")) return;
    const res = await fetch(`/api/social-media-posts/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Failed to delete post");
      return;
    }
    await loadPosts(selectedClientId);
  };

  const duplicatePost = async (item: SocialMediaPost) => {
    const payload = {
      ...item,
      title: `${item.title} (Copy)`,
      status: "Draft" as const,
      postedLink: "",
    };
    delete (payload as any)._id;
    delete (payload as any).id;
    const res = await fetch("/api/social-media-posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      alert("Failed to duplicate post");
      return;
    }
    await loadPosts(selectedClientId);
  };

  const updateStatus = async (id: string, status: string) => {
    const body: any = { status };
    if (status === "Posted") {
      const link = window.prompt("Paste posted link (optional):", "") || "";
      body.postedLink = link;
    }
    const res = await fetch(`/api/social-media-posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      alert("Failed to update status");
      return;
    }
    await loadPosts(selectedClientId);
  };

  const reschedulePost = async (item: SocialMediaPost) => {
    const nextDate = window.prompt("Reschedule Date (YYYY-MM-DD)", item.scheduledDate || "");
    if (!nextDate) return;
    const nextTime = window.prompt("Reschedule Time (HH:MM)", item.scheduledTime || "09:00");
    if (!nextTime) return;

    const res = await fetch(`/api/social-media-posts/${item._id || item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scheduledDate: nextDate, scheduledTime: nextTime, status: "Scheduled" }),
    });
    if (!res.ok) {
      alert("Failed to reschedule");
      return;
    }
    await loadPosts(selectedClientId);
  };

  return (
    <div className="space-y-6 font-headline">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">CONTENT PLANNER / SCHEDULER</h1>
          <p className="text-muted-foreground">Plan, schedule and track social media posts by platform and staff.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/social-media-planner" className="px-3 py-2 border rounded-md text-sm font-semibold">Dashboard</Link>
          <Link href="/social-media-planner/calendar" className="px-3 py-2 border rounded-md text-sm font-semibold">Calendar</Link>
          <Link href="/social-media-planner/analytics" className="px-3 py-2 border rounded-md text-sm font-semibold">Analytics</Link>
        </div>
      </header>

      {/* Client Picker */}
      <section className="border-2 border-black rounded-lg p-4">
        <ClientPicker
          onClientSelected={setSelectedClientId}
        />
      </section>

      {/* No Client Selected - Empty State */}
      {!selectedClientId && (
        <section className="border-2 border-yellow-400 bg-yellow-50 rounded-lg p-6 text-center">
          <div className="text-lg font-semibold text-yellow-900">
            ⚠️ Please select a client to view and manage content
          </div>
          <p className="text-sm text-yellow-700 mt-2">
            Select a client from the dropdown above to start planning and scheduling posts.
          </p>
        </section>
      )}

      {/* Add Button - Only visible when client is selected */}
      {selectedClientId && (
        <section className="flex justify-end">
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            ➕ Add Plan
          </Button>
        </section>
      )}

      {/* Add Post Modal */}
      <AddPostModal
        isOpen={isModalOpen}
        clientId={selectedClientId}
        onClose={() => setIsModalOpen(false)}
        onSave={savePost}
        staffOptions={staffOptions}
        createdBy={user?.name}
      />

      {/* Filters Section - Only visible when client is selected */}
      {selectedClientId && (
        <section className="border-2 border-black rounded-lg p-4 space-y-3">
          <h2 className="text-xl font-black">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-3">
            <Input placeholder="Search by title/caption" value={search} onChange={(e) => setSearch(e.target.value)} />

            <select className="border rounded-md p-2" value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
              <option value="">All Platforms</option>
              {SOCIAL_PLATFORMS.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
            </select>

            <select className="border rounded-md p-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Status</option>
              {POST_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>

            <select className="border rounded-md p-2" value={staffFilter} onChange={(e) => setStaffFilter(e.target.value)}>
              <option value="">All Staff</option>
              {staffOptions.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>

            <select className="border rounded-md p-2" value={contentTypeFilter} onChange={(e) => setContentTypeFilter(e.target.value)}>
              <option value="">All Content Types</option>
              {CONTENT_TYPES.map((contentType) => <option key={contentType} value={contentType}>{contentType}</option>)}
            </select>

            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />

            <Button variant="outline" onClick={() => {
              setSearch("");
              setPlatformFilter("");
              setStatusFilter("");
              setStaffFilter("");
              setContentTypeFilter("");
              setDateFrom("");
              setDateTo("");
            }}>
              Clear Filters
            </Button>
          </div>
        </section>
      )}

      {/* Posts Table - Only visible when client is selected */}
      {selectedClientId && (
        <section className="border-2 border-black rounded-lg overflow-hidden">
          <div className="p-4 border-b-2 border-black flex items-center justify-between">
            <h2 className="text-xl font-black">Planned Posts</h2>
            <div className="text-sm text-muted-foreground">{filtered.length} records</div>
          </div>

          <div className="overflow-auto">
            {posts.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground bg-gray-50">
                <p className="text-lg font-semibold">No posts planned for this client</p>
                <p className="text-sm mt-1">Click "➕ Add Plan" to create your first post</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="text-left p-2 border-b">Title</th>
                    <th className="text-left p-2 border-b">Platform</th>
                    <th className="text-left p-2 border-b">Content</th>
                    <th className="text-left p-2 border-b">Schedule</th>
                    <th className="text-left p-2 border-b">Assigned</th>
                    <th className="text-left p-2 border-b">Status</th>
                    <th className="text-left p-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => {
                    const itemId = String(item._id || item.id || "");
                    const dt = toDateTime(item.scheduledDate, item.scheduledTime);
                    const isOverdue =
                      !!dt &&
                      dt < new Date() &&
                      item.status !== "Posted" &&
                      item.status !== "Cancelled" &&
                      item.status !== "Missed";

                    return (
                      <tr key={itemId} className={isOverdue ? "bg-red-50" : ""}>
                        <td className="p-2 border-b align-top">
                          <div className="font-semibold">{item.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{item.caption}</div>
                        </td>
                        <td className="p-2 border-b align-top">{item.platform}</td>
                        <td className="p-2 border-b align-top">{item.contentType}</td>
                        <td className="p-2 border-b align-top">{item.scheduledDate} {item.scheduledTime}</td>
                        <td className="p-2 border-b align-top">{item.assignedTo || "Unassigned"}</td>
                        <td className="p-2 border-b align-top">
                          <span className={`px-2 py-1 rounded text-xs ${statusBadge[item.status] || "bg-gray-100"}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-2 border-b align-top">
                          <div className="flex flex-wrap gap-1">
                            <Button size="sm" variant="outline" onClick={() => duplicatePost(item)}>Duplicate</Button>
                            <Button size="sm" variant="outline" onClick={() => reschedulePost(item)}>Reschedule</Button>
                            <Button size="sm" variant="outline" onClick={() => updateStatus(itemId, "Posted")}>Mark Posted</Button>
                            <Button size="sm" variant="outline" onClick={() => updateStatus(itemId, "Missed")}>Mark Missed</Button>
                            <Button size="sm" variant="destructive" onClick={() => deletePost(itemId)}>Delete</Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {!filtered.length && posts.length > 0 && (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-muted-foreground">No posts found for selected filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
