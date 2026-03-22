"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import {
  CONTENT_TYPES,
  POST_STATUSES,
  SOCIAL_PLATFORMS,
  type SocialMediaPost,
  toDateTime,
} from "@/lib/social-media-planner";

const initialForm: SocialMediaPost = {
  title: "",
  platform: "Instagram",
  contentType: "Image Post",
  caption: "",
  hashtags: "",
  mediaFile: "",
  scheduledDate: "",
  scheduledTime: "",
  assignedTo: "",
  status: "Draft",
  notes: "",
  postedLink: "",
};

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
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [form, setForm] = useState<SocialMediaPost>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [team, setTeam] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [staffFilter, setStaffFilter] = useState("");
  const [contentTypeFilter, setContentTypeFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const load = async () => {
    const res = await fetch("/api/social-media-posts", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch social posts");
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    (async () => {
      try {
        await load();
      } catch (e) {
        console.error(e);
      }
    })();
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

  const handleChange = (key: keyof SocialMediaPost, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const fileToBase64 = (file: File | null) => {
    if (!file) return Promise.resolve("");
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const savePost = async () => {
    if (!form.title || !form.platform || !form.scheduledDate || !form.scheduledTime) {
      alert("Please fill title, platform, scheduled date and time.");
      return;
    }

    const payload = {
      ...form,
      status: form.status || "Draft",
      createdBy: form.createdBy || user?.name || "",
    };

    if (editingId) {
      const res = await fetch(`/api/social-media-posts/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        alert("Failed to update post");
        return;
      }
    } else {
      const res = await fetch("/api/social-media-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        alert("Failed to create post");
        return;
      }
    }

    setForm(initialForm);
    setEditingId(null);
    await load();
  };

  const editPost = (item: SocialMediaPost) => {
    setEditingId(String(item._id || item.id || ""));
    setForm({ ...initialForm, ...item });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deletePost = async (id: string) => {
    if (!window.confirm("Delete this post plan?")) return;
    const res = await fetch(`/api/social-media-posts/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Failed to delete post");
      return;
    }
    await load();
  };

  const duplicatePost = async (item: SocialMediaPost) => {
    const payload = {
      ...item,
      title: `${item.title} (Copy)`,
      status: "Draft",
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
    await load();
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
    await load();
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
    await load();
  };

  return (
    <div className="space-y-6 font-headline">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">CONTENT PLANNER / SCHEDULER</h1>
          <p className="text-muted-foreground">Plan, schedule and track social media posts by platform and staff.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/social-media-planner" className="px-3 py-2 border rounded-md text-sm font-semibold">Dashboard</Link>
          <Link href="/social-media-planner/calendar" className="px-3 py-2 border rounded-md text-sm font-semibold">Calendar</Link>
        </div>
      </header>

      <section className="border-2 border-black rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-black">{editingId ? "Edit Social Post" : "Create Social Post Plan"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <Input placeholder="Post Title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} />

          <select className="border rounded-md p-2" value={form.platform} onChange={(e) => handleChange("platform", e.target.value)}>
            {SOCIAL_PLATFORMS.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
          </select>

          <select className="border rounded-md p-2" value={form.contentType} onChange={(e) => handleChange("contentType", e.target.value)}>
            {CONTENT_TYPES.map((contentType) => <option key={contentType} value={contentType}>{contentType}</option>)}
          </select>

          <Input type="date" value={form.scheduledDate} onChange={(e) => handleChange("scheduledDate", e.target.value)} />
          <Input type="time" value={form.scheduledTime} onChange={(e) => handleChange("scheduledTime", e.target.value)} />

          <select className="border rounded-md p-2" value={form.assignedTo} onChange={(e) => handleChange("assignedTo", e.target.value)}>
            <option value="">Assigned Staff</option>
            {staffOptions.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>

          <select className="border rounded-md p-2" value={form.status} onChange={(e) => handleChange("status", e.target.value)}>
            {POST_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>

          <Input placeholder="Hashtags" value={form.hashtags || ""} onChange={(e) => handleChange("hashtags", e.target.value)} />

          <Input placeholder="Posted Link (optional)" value={form.postedLink || ""} onChange={(e) => handleChange("postedLink", e.target.value)} />

          <Input placeholder="Media URL or attachment path" value={form.mediaFile || ""} onChange={(e) => handleChange("mediaFile", e.target.value)} />
          <Input type="file" accept="image/*,video/*" onChange={async (e) => {
            const file = e.target.files?.[0] || null;
            const data = await fileToBase64(file);
            if (data) handleChange("mediaFile", data);
          }} />
        </div>

        <Textarea placeholder="Caption / Post Copy" value={form.caption || ""} onChange={(e) => handleChange("caption", e.target.value)} />
        <Textarea placeholder="Notes" value={form.notes || ""} onChange={(e) => handleChange("notes", e.target.value)} />

        {form.mediaFile ? (
          <div className="border rounded p-2">
            <div className="text-xs text-muted-foreground mb-1">Media Preview</div>
            {String(form.mediaFile).startsWith("data:image") ? (
              <img src={form.mediaFile} alt="preview" className="h-24 w-24 object-cover rounded" />
            ) : String(form.mediaFile).startsWith("data:video") ? (
              <video src={form.mediaFile} className="h-28 rounded" controls />
            ) : (
              <a className="text-sm underline text-blue-600" href={form.mediaFile} target="_blank">Open Attachment</a>
            )}
          </div>
        ) : null}

        <div className="flex gap-2">
          <Button onClick={savePost}>{editingId ? "Update Post" : "Create Post"}</Button>
          <Button
            variant="outline"
            onClick={() => {
              setForm(initialForm);
              setEditingId(null);
            }}
          >
            Reset
          </Button>
        </div>
      </section>

      <section className="border-2 border-black rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-black">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
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

      <section className="border-2 border-black rounded-lg overflow-hidden">
        <div className="p-4 border-b-2 border-black flex items-center justify-between">
          <h2 className="text-xl font-black">Planned Posts</h2>
          <div className="text-sm text-muted-foreground">{filtered.length} records</div>
        </div>

        <div className="overflow-auto">
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
                        <Button size="sm" variant="outline" onClick={() => editPost(item)}>Edit</Button>
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
              {!filtered.length && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-muted-foreground">No posts found for selected filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
