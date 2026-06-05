"use client";

import { apiFetch } from "@/lib/api-fetch";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faXmark,
  faTriangleExclamation,
  faHourglassHalf,
  faCircleCheck,
  faCircleXmark,
  faEye,
  faPen,
  faCopy,
  faCalendarDays,
  faCheck,
  faTrash,
  faComment,
  faUpload,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import {
  CONTENT_TYPES,
  POST_STATUSES,
  SOCIAL_PLATFORMS,
  type SocialMediaPost,
  toDateTime,
} from "@/lib/social-media-planner";
import { ClientPicker } from "@/components/social-media/client-picker";
import { AddPostModal } from "@/components/social-media/add-post-modal";
import { SocialAccountsTable } from "@/components/social-media/social-accounts-table";
import { ViewPlanModal } from "@/components/social-media/view-plan-modal";
import { PlatformIcon } from "@/components/social-media/platform-icon";
import { PostLinksModal } from "@/components/social-media/post-links-modal";
import { DuplicatePostModal } from "@/components/social-media/duplicate-post-modal";

const statusBadge: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Ready: "bg-blue-100 text-blue-700",
  Scheduled: "bg-amber-100 text-amber-700",
  Posted: "bg-green-100 text-green-700",
  Missed: "bg-red-100 text-red-700",
  Cancelled: "bg-slate-100 text-slate-700",
};

const approvalBadge: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  Approved: "bg-green-100 text-green-700 border border-green-300",
  Rejected: "bg-red-100 text-red-700 border border-red-300",
};

const approvalFaIcon: Record<string, any> = {
  Pending: faHourglassHalf,
  Approved: faCircleCheck,
  Rejected: faCircleXmark,
};
const approvalIconColor: Record<string, string> = {
  Pending: "text-yellow-600",
  Approved: "text-green-600",
  Rejected: "text-red-600",
};

// Isolated so it can be wrapped in <Suspense> — useSearchParams() requires it
function MetaBannerSync({
  setMetaBanner,
}: {
  setMetaBanner: React.Dispatch<
    React.SetStateAction<{ type: "success" | "error"; message: string } | null>
  >;
}) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const connected = searchParams?.get("meta_connected");
    const metaError = searchParams?.get("meta_error");
    if (connected) {
      setMetaBanner({
        type: "success",
        message: `Successfully connected ${connected} account(s) to Meta. You can now sync metrics from the Analytics page.`,
      });
    } else if (metaError) {
      setMetaBanner({
        type: "error",
        message: `Meta connection failed: ${decodeURIComponent(metaError)}`,
      });
    }
  }, [searchParams, setMetaBanner]);
  return null;
}

export default function SocialMediaPlannerPage() {
  const { user } = useAuth();
  const [metaBanner, setMetaBanner] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [accountsMap, setAccountsMap] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<SocialMediaPost | null>(null);
  const [viewingPlan, setViewingPlan] = useState<SocialMediaPost | null>(null);
  const [isViewPlanModalOpen, setIsViewPlanModalOpen] = useState(false);
  const [isPostLinksModalOpen, setIsPostLinksModalOpen] = useState(false);
  const [postForLinks, setPostForLinks] = useState<SocialMediaPost | null>(
    null,
  );
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [duplicatingPost, setDuplicatingPost] =
    useState<SocialMediaPost | null>(null);
  const [dropdownInfo, setDropdownInfo] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);

  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [staffFilter, setStaffFilter] = useState("");
  const [contentTypeFilter, setContentTypeFilter] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

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

      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch social posts");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setPosts([]);
    }
  };

  const importFileRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);

  const handleExcelImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedClientId) return;
    setImporting(true);
    try {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(new Uint8Array(buffer), { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows: any[] = XLSX.utils.sheet_to_json(ws, { defval: "" });

      let created = 0;
      let skipped = 0;
      for (const row of rows) {
        const title = String(row["Title"] || row["title"] || "").trim();
        const scheduledDate = String(
          row["Scheduled Date"] || row["scheduled_date"] || "",
        ).trim();
        const scheduledTime = String(
          row["Scheduled Time"] || row["scheduled_time"] || "",
        ).trim();
        if (!title || !scheduledDate || !scheduledTime) {
          skipped++;
          continue;
        }

        const platform = String(
          row["Platform"] || row["platform"] || "Instagram",
        ).trim();
        const contentType = String(
          row["Content Type"] || row["content_type"] || "Image Post",
        ).trim();

        const post: any = {
          clientId: selectedClientId,
          title,
          platform,
          platforms: [platform],
          socialAccountId: "",
          socialAccountIds: [],
          contentType,
          caption: String(row["Caption"] || row["caption"] || "").trim(),
          hashtags: String(row["Hashtags"] || row["hashtags"] || "").trim(),
          mediaFile: String(row["Media URL"] || row["media_url"] || "").trim(),
          reelLink: String(
            row["Reel Video Link"] || row["reel_link"] || "",
          ).trim(),
          scheduledDate,
          scheduledTime,
          assignedTo: String(
            row["Assigned To"] || row["assigned_to"] || "",
          ).trim(),
          campaign: String(row["Campaign"] || row["campaign"] || "").trim(),
          notes: String(row["Notes"] || row["notes"] || "").trim(),
          status: "Scheduled",
          approvalStatus: String(
            row["Approval Status"] || row["approval_status"] || "Pending",
          ).trim(),
        };

        await apiFetch("/api/social-media-posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        });
        created++;
      }

      alert(
        `Import done: ${created} posts created, ${skipped} rows skipped (missing Title/Date/Time).`,
      );
      await loadPosts(selectedClientId);
    } catch (err: any) {
      alert(`Import failed: ${err.message}`);
    } finally {
      setImporting(false);
      if (importFileRef.current) importFileRef.current.value = "";
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/api/team-members", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        setTeam(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    loadPosts(selectedClientId);
    if (selectedClientId) {
      fetch(`/api/social-media-accounts?clientId=${selectedClientId}`, {
        cache: "no-store",
      })
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const map: Record<string, string> = {};
            data.forEach((a: any) => {
              const id = String(a._id || a.id || "");
              if (id) map[id] = a.displayName || `@${a.handle}`;
            });
            setAccountsMap(map);
          }
        })
        .catch(() => {});
    } else {
      setAccountsMap({});
    }
  }, [selectedClientId, user]);

  const staffOptions = useMemo(() => {
    const fromTeam = team
      .map((m) => String(m?.name || "").trim())
      .filter(Boolean);
    const fromPosts = posts
      .map((p) => String(p.assignedTo || "").trim())
      .filter(Boolean);
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
      if (contentTypeFilter && item.contentType !== contentTypeFilter)
        return false;
      if (campaignFilter && (item as any).campaign !== campaignFilter)
        return false;
      if (dateFrom && item.scheduledDate < dateFrom) return false;
      if (dateTo && item.scheduledDate > dateTo) return false;
      return true;
    });
  }, [
    posts,
    search,
    platformFilter,
    statusFilter,
    staffFilter,
    contentTypeFilter,
    campaignFilter,
    dateFrom,
    dateTo,
  ]);

  const savePost = async (post: SocialMediaPost) => {
    try {
      const isUpdate = !!(post._id || post.id);
      const method = isUpdate ? "PUT" : "POST";
      const url = isUpdate
        ? `/api/social-media-posts/${post._id || post.id}`
        : "/api/social-media-posts";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      const responseData = await res.json();

      if (!res.ok) {
        const errorMsg =
          responseData?.error ||
          (isUpdate ? "Failed to update post" : "Failed to create post");
        throw new Error(errorMsg);
      }

      await loadPosts(selectedClientId);
    } catch (e) {
      console.error("savePost error:", e);
      throw e;
    }
  };

  const deletePost = async (id: string) => {
    if (!window.confirm("Delete this post plan?")) return;
    const res = await fetch(`/api/social-media-posts/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Failed to delete post");
      return;
    }
    await loadPosts(selectedClientId);
  };

  const openDuplicateModal = (item: SocialMediaPost) => {
    setDuplicatingPost(item);
    setIsDuplicateModalOpen(true);
  };

  const handleDuplicate = async (platform: string, accountIds: string[]) => {
    if (!duplicatingPost) return;
    const payload = {
      ...duplicatingPost,
      title: duplicatingPost.title,
      platform,
      socialAccountIds: accountIds,
      socialAccountId: accountIds[0] || "",
      status: "Scheduled" as const,
      postedLink: "",
      postedLinks: {},
      postedAt: undefined,
    };
    delete (payload as any)._id;
    delete (payload as any).id;
    const res = await apiFetch("/api/social-media-posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error("Failed to duplicate post");
    }
    await loadPosts(selectedClientId);
    setDuplicatingPost(null);
  };

  const updateStatus = async (
    id: string,
    status: string,
    post?: SocialMediaPost,
  ) => {
    if (status === "Posted" && post) {
      const accountIds =
        post.socialAccountIds && post.socialAccountIds.length > 0
          ? post.socialAccountIds
          : post.socialAccountId
            ? [post.socialAccountId]
            : [];

      if (accountIds.length > 1) {
        setPostForLinks(post);
        setIsPostLinksModalOpen(true);
        return;
      } else if (accountIds.length === 1) {
        const accountId = accountIds[0];
        const link = window.prompt("Paste posted link (optional):", "") || "";
        const postedLinks = link && accountId ? { [accountId]: link } : {};
        const res = await fetch(`/api/social-media-posts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status, postedLink: link, postedLinks }),
        });
        if (!res.ok) {
          alert("Failed to update status");
          return;
        }
        await loadPosts(selectedClientId);
        return;
      }
    }

    const body: any = { status };
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

  const handleSavePostedLinks = async (links: Record<string, string>) => {
    if (!postForLinks) return;
    const postId = String(postForLinks._id || postForLinks.id || "");
    if (!postId) return;

    let body: Record<string, any>;

    if ("__direct__" in links) {
      // Fallback mode: old post with no account record — save to postedLink only
      const link = String(links.__direct__ || "").trim();
      body = { status: "Posted", postedLink: link };
    } else {
      const nonEmptyLinks = Object.fromEntries(
        Object.entries(links).filter(
          ([, link]) => String(link || "").trim().length > 0,
        ),
      );
      const firstLink = Object.values(nonEmptyLinks)[0] || "";
      body = {
        status: "Posted",
        postedLink: firstLink,
        postedLinks: nonEmptyLinks,
      };
    }

    const res = await fetch(`/api/social-media-posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      alert("Failed to update status");
      return;
    }

    setIsPostLinksModalOpen(false);
    setPostForLinks(null);
    await loadPosts(selectedClientId);
  };

  const reschedulePost = async (item: SocialMediaPost) => {
    const nextDate = window.prompt(
      "Reschedule Date (YYYY-MM-DD)",
      item.scheduledDate || "",
    );
    if (!nextDate) return;
    const nextTime = window.prompt(
      "Reschedule Time (HH:MM)",
      item.scheduledTime || "09:00",
    );
    if (!nextTime) return;

    const res = await fetch(`/api/social-media-posts/${item._id || item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scheduledDate: nextDate,
        scheduledTime: nextTime,
        status: "Scheduled",
      }),
    });
    if (!res.ok) {
      alert("Failed to reschedule");
      return;
    }
    await loadPosts(selectedClientId);
  };

  const editPost = (item: SocialMediaPost) => {
    setEditingPost(item);
    setIsModalOpen(true);
  };

  const openViewPlan = (item: SocialMediaPost) => {
    setViewingPlan(item);
    setIsViewPlanModalOpen(true);
  };

  return (
    <div className="space-y-6 font-headline">
      {/* searchParams reader — must live inside Suspense */}
      <Suspense fallback={null}>
        <MetaBannerSync setMetaBanner={setMetaBanner} />
      </Suspense>

      {}
      {metaBanner && (
        <div
          className={`rounded-lg border-2 px-4 py-3 text-sm font-medium flex items-center justify-between ${
            metaBanner.type === "success"
              ? "border-green-500 bg-green-50 text-green-900"
              : "border-red-500 bg-red-50 text-red-900"
          }`}
        >
          <span>{metaBanner.message}</span>
          <button
            className="ml-4 text-xs underline opacity-70 hover:opacity-100"
            onClick={() => setMetaBanner(null)}
          >
            Dismiss
          </button>
        </div>
      )}

      {}
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">
            CONTENT PLANNER / SCHEDULER
          </h1>
          <p className="text-muted-foreground">
            Plan, schedule and track social media posts by platform and staff.
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
            href="/social-media-planner/calendar"
            className="px-3 py-2 border rounded-md text-sm font-semibold"
          >
            Calendar
          </Link>
          <Link
            href="/social-media-planner/analytics"
            className="px-3 py-2 border rounded-md text-sm font-semibold"
          >
            Analytics
          </Link>
        </div>
      </header>

      {}
      <section className="border-2 border-black rounded-lg p-4">
        <ClientPicker onClientSelected={setSelectedClientId} />
      </section>

      {}
      {!selectedClientId && (
        <section className="border-2 border-yellow-400 bg-yellow-50 rounded-lg p-4 flex items-center gap-3">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-yellow-600 w-5 h-5 flex-shrink-0"
          />
          <div>
            <p className="text-sm font-semibold text-yellow-900">
              Please select a client to view and manage content
            </p>
            <p className="text-xs text-yellow-700 mt-0.5">
              Select a client from the dropdown above to start planning.
            </p>
          </div>
        </section>
      )}
      {selectedClientId && (
        <section className="flex items-center justify-between gap-3">
          {}
          <div className="flex-1 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50/60">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5 pr-2.5 border-r border-gray-300 mr-0.5">
                <FontAwesomeIcon icon={faFilter} className="w-3 h-3" />
                Filters
              </span>
              <Input
                className="h-7 text-xs py-0 w-36 border-gray-300"
                placeholder="Search title / caption…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="h-7 text-xs px-2 border border-gray-300 rounded-md bg-white"
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
              >
                <option value="">All Platforms</option>
                {SOCIAL_PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <select
                className="h-7 text-xs px-2 border border-gray-300 rounded-md bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                {POST_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                className="h-7 text-xs px-2 border border-gray-300 rounded-md bg-white"
                value={staffFilter}
                onChange={(e) => setStaffFilter(e.target.value)}
              >
                <option value="">All Staff</option>
                {staffOptions.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <select
                className="h-7 text-xs px-2 border border-gray-300 rounded-md bg-white"
                value={contentTypeFilter}
                onChange={(e) => setContentTypeFilter(e.target.value)}
              >
                <option value="">All Types</option>
                {CONTENT_TYPES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <Input
                className="h-7 text-xs py-0 w-32 border-gray-300"
                placeholder="Campaign…"
                value={campaignFilter}
                onChange={(e) => setCampaignFilter(e.target.value)}
              />
              <input
                type="date"
                className="h-7 text-xs px-2 border border-gray-300 rounded-md bg-white"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
              <input
                type="date"
                className="h-7 text-xs px-2 border border-gray-300 rounded-md bg-white"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
              {(search ||
                platformFilter ||
                statusFilter ||
                staffFilter ||
                contentTypeFilter ||
                campaignFilter ||
                dateFrom ||
                dateTo) && (
                <button
                  onClick={() => {
                    setSearch("");
                    setPlatformFilter("");
                    setStatusFilter("");
                    setStaffFilter("");
                    setContentTypeFilter("");
                    setCampaignFilter("");
                    setDateFrom("");
                    setDateTo("");
                  }}
                  className="h-7 text-xs px-2.5 border border-gray-300 rounded-md bg-white flex items-center gap-1.5 hover:bg-gray-100 text-gray-600"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* hidden file input for Excel import */}
            <input
              ref={importFileRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleExcelImport}
            />
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-2 border-black"
              disabled={importing || !selectedClientId}
              onClick={() => importFileRef.current?.click()}
              title="Import posts from Excel (.xlsx)"
            >
              <FontAwesomeIcon icon={faUpload} className="w-3 h-3" />
              {importing ? "Importing…" : "Import Excel"}
            </Button>
            <Button
              onClick={() => setIsModalOpen(true)}
              size="sm"
              className="gap-2"
            >
              <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
              Add Plan
            </Button>
          </div>
        </section>
      )}
      {selectedClientId && (
        <section className="border-2 border-black rounded-lg overflow-hidden">
          <div className="p-4 border-b-2 border-black flex items-center justify-between">
            <h2 className="text-xl font-black">Planned Posts</h2>
            <div className="text-sm text-muted-foreground">
              {filtered.length} records
            </div>
          </div>

          <div className="overflow-auto">
            {posts.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground bg-gray-50">
                <p className="text-lg font-semibold">
                  No posts planned for this client
                </p>
                <p className="text-sm mt-1 flex items-center justify-center gap-1.5">
                  Click{" "}
                  <FontAwesomeIcon icon={faPlus} className="w-2.5 h-2.5" /> Add
                  Plan to create your first post
                </p>
              </div>
            ) : (
              <>
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="text-left p-2 border-b w-[220px] max-w-[220px]">
                        Title
                      </th>
                      <th className="text-left p-2 border-b">Platform</th>
                      <th className="text-left p-2 border-b">Account</th>
                      <th className="text-left p-2 border-b">Content</th>
                      <th className="text-left p-2 border-b">
                        Scheduled / Posted
                      </th>
                      <th className="text-left p-2 border-b">Assigned</th>
                      <th className="text-left p-2 border-b">Status</th>
                      <th className="text-left p-2 border-b">Approval</th>
                      <th className="text-left p-2 border-b w-10">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => {
                      const itemId = String(item._id || item.id || "");
                      const dt = toDateTime(
                        item.scheduledDate,
                        item.scheduledTime,
                      );
                      const isOverdue =
                        !!dt &&
                        dt < new Date() &&
                        item.status !== "Posted" &&
                        item.status !== "Cancelled" &&
                        item.status !== "Missed";

                      const postedAt = (item as any).postedAt
                        ? new Date((item as any).postedAt).toLocaleString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )
                        : null;

                      return (
                        <tr
                          key={itemId}
                          className={isOverdue ? "bg-red-50" : ""}
                        >
                          <td className="p-2 border-b align-top w-[220px] max-w-[220px]">
                            <div className="font-semibold line-clamp-2 break-words">
                              {item.title}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {item.caption}
                            </div>
                            {(item as any).campaign && (
                              <span className="inline-block mt-1 px-1.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded font-medium">
                                {(item as any).campaign}
                              </span>
                            )}
                          </td>
                          <td className="p-2 border-b align-top">
                            <div className="flex items-center gap-1.5 whitespace-nowrap">
                              <PlatformIcon
                                platform={item.platform}
                                size="sm"
                              />
                              <span>{item.platform}</span>
                            </div>
                          </td>
                          <td className="p-2 border-b align-top">
                            {(() => {
                              const ids = item.socialAccountIds?.length
                                ? item.socialAccountIds
                                : item.socialAccountId
                                  ? [item.socialAccountId]
                                  : [];
                              if (!ids.length)
                                return (
                                  <span className="text-xs text-muted-foreground">
                                    —
                                  </span>
                                );
                              return (
                                <div className="flex flex-col gap-1">
                                  {ids.map((aid) => (
                                    <span
                                      key={aid}
                                      className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 whitespace-nowrap"
                                    >
                                      {accountsMap[aid] || aid}
                                    </span>
                                  ))}
                                </div>
                              );
                            })()}
                          </td>
                          <td className="p-2 border-b align-top whitespace-nowrap">
                            {item.contentType}
                          </td>
                          <td className="p-2 border-b align-top">
                            <div className="space-y-1">
                              <div className="text-xs">
                                <FontAwesomeIcon
                                  icon={faCalendarDays}
                                  className="w-2.5 h-2.5 text-muted-foreground mr-1"
                                />
                                <span className="font-medium">
                                  {item.scheduledDate}
                                </span>
                                {item.scheduledTime && (
                                  <span className="text-muted-foreground">
                                    {" "}
                                    {item.scheduledTime}
                                  </span>
                                )}
                              </div>
                              {postedAt && (
                                <div className="text-xs text-green-700 flex items-center gap-1">
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="w-2.5 h-2.5"
                                  />
                                  <span className="font-medium">
                                    {postedAt}
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="p-2 border-b align-top whitespace-nowrap">
                            {item.assignedTo || "Unassigned"}
                          </td>
                          <td className="p-2 border-b align-top">
                            <span
                              className={`px-2 py-1 rounded text-xs whitespace-nowrap ${statusBadge[item.status] || "bg-gray-100"}`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="p-2 border-b align-top">
                            {item.approvalStatus ? (
                              <div className="space-y-1">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap ${approvalBadge[item.approvalStatus] || "bg-gray-100"}`}
                                >
                                  <FontAwesomeIcon
                                    icon={approvalFaIcon[item.approvalStatus]}
                                    className={`w-2.5 h-2.5 ${approvalIconColor[item.approvalStatus]}`}
                                  />
                                  {item.approvalStatus}
                                </span>
                                {item.approvalStatus === "Rejected" &&
                                  (item as any).rejectionReason && (
                                    <div
                                      className="flex items-start gap-1 text-xs text-red-600 max-w-[130px] line-clamp-2 mt-1"
                                      title={(item as any).rejectionReason}
                                    >
                                      <FontAwesomeIcon
                                        icon={faComment}
                                        className="w-2.5 h-2.5 mt-0.5 flex-shrink-0"
                                      />
                                      <span>
                                        {(item as any).rejectionReason}
                                      </span>
                                    </div>
                                  )}
                                {(item as any).clientRemarks &&
                                  item.approvalStatus !== "Rejected" && (
                                    <div
                                      className="flex items-start gap-1 text-xs text-blue-700 max-w-[130px] line-clamp-2 mt-1"
                                      title={(item as any).clientRemarks}
                                    >
                                      <FontAwesomeIcon
                                        icon={faComment}
                                        className="w-2.5 h-2.5 mt-0.5 flex-shrink-0"
                                      />
                                      <span>{(item as any).clientRemarks}</span>
                                    </div>
                                  )}
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                —
                              </span>
                            )}
                          </td>
                          <td className="p-2 border-b align-top">
                            <div className="relative">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (dropdownInfo?.id === itemId) {
                                    setDropdownInfo(null);
                                  } else {
                                    const rect = (
                                      e.currentTarget as HTMLElement
                                    ).getBoundingClientRect();
                                    setDropdownInfo({
                                      id: itemId,
                                      x: rect.right - 176,
                                      y: rect.bottom + 4,
                                    });
                                  }
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100 text-gray-600 font-bold text-lg"
                                title="Actions"
                              >
                                ⋯
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {!filtered.length && posts.length > 0 && (
                      <tr>
                        <td
                          colSpan={9}
                          className="p-6 text-center text-muted-foreground"
                        >
                          No posts found for selected filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </section>
      )}

      {}
      {selectedClientId && (
        <section className="border-2 border-black rounded-lg p-4">
          <SocialAccountsTable clientId={selectedClientId} />
        </section>
      )}

      {}
      <AddPostModal
        isOpen={isModalOpen}
        clientId={selectedClientId}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPost(null);
        }}
        onSave={savePost}
        staffOptions={staffOptions}
        createdBy={user?.name}
        editingPost={editingPost}
      />

      {}
      <ViewPlanModal
        isOpen={isViewPlanModalOpen}
        plan={viewingPlan}
        onClose={() => {
          setIsViewPlanModalOpen(false);
          setViewingPlan(null);
        }}
      />

      <PostLinksModal
        isOpen={isPostLinksModalOpen}
        post={postForLinks}
        accountIds={
          postForLinks?.socialAccountIds?.length
            ? postForLinks.socialAccountIds
            : postForLinks?.socialAccountId
              ? [postForLinks.socialAccountId]
              : []
        }
        onClose={() => {
          setIsPostLinksModalOpen(false);
          setPostForLinks(null);
        }}
        onSave={handleSavePostedLinks}
      />

      <DuplicatePostModal
        isOpen={isDuplicateModalOpen}
        post={duplicatingPost}
        clientId={selectedClientId}
        onClose={() => {
          setIsDuplicateModalOpen(false);
          setDuplicatingPost(null);
        }}
        onDuplicate={handleDuplicate}
      />

      {}
      {dropdownInfo &&
        (() => {
          const dp = filtered.find(
            (p) => String(p._id || p.id) === dropdownInfo.id,
          );
          if (!dp) return null;
          const dpId = dropdownInfo.id;
          return (
            <>
              <div
                className="fixed inset-0 z-[9998]"
                onClick={() => setDropdownInfo(null)}
              />
              <div
                style={{
                  position: "fixed",
                  top: dropdownInfo.y,
                  left: Math.max(8, dropdownInfo.x),
                  zIndex: 9999,
                }}
                className="bg-white border-2 border-black rounded-xl shadow-2xl w-48 py-1.5 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    openViewPlan(dp);
                    setDropdownInfo(null);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2.5 font-medium text-gray-700"
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    className="w-3.5 h-3.5 text-gray-400"
                  />{" "}
                  View Details
                </button>
                <button
                  onClick={() => {
                    editPost(dp);
                    setDropdownInfo(null);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2.5 font-medium text-gray-700"
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    className="w-3.5 h-3.5 text-gray-400"
                  />{" "}
                  Edit
                </button>
                <button
                  onClick={() => {
                    openDuplicateModal(dp);
                    setDropdownInfo(null);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2.5 font-medium text-gray-700"
                >
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="w-3.5 h-3.5 text-gray-400"
                  />{" "}
                  Duplicate
                </button>
                <button
                  onClick={() => {
                    reschedulePost(dp);
                    setDropdownInfo(null);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2.5 font-medium text-gray-700"
                >
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="w-3.5 h-3.5 text-gray-400"
                  />{" "}
                  Reschedule
                </button>
                {dp.status === "Posted" && (
                  <button
                    onClick={() => {
                      setPostForLinks(dp);
                      setIsPostLinksModalOpen(true);
                      setDropdownInfo(null);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-700 flex items-center gap-2.5 font-medium"
                  >
                    <FontAwesomeIcon icon={faLink} className="w-3.5 h-3.5" />{" "}
                    Edit Posted Links
                  </button>
                )}
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={() => {
                    updateStatus(dpId, "Posted", dp);
                    setDropdownInfo(null);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-green-50 text-green-700 flex items-center gap-2.5 font-medium"
                >
                  <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5" />{" "}
                  Mark Posted
                </button>
                <button
                  onClick={() => {
                    updateStatus(dpId, "Missed");
                    setDropdownInfo(null);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-amber-50 text-amber-700 flex items-center gap-2.5 font-medium"
                >
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="w-3.5 h-3.5"
                  />{" "}
                  Mark Missed
                </button>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={() => {
                    deletePost(dpId);
                    setDropdownInfo(null);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2.5 font-medium"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />{" "}
                  Delete
                </button>
              </div>
            </>
          );
        })()}
    </div>
  );
}
