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
import { UpdateMetricsModal } from "@/components/social-media/update-metrics-modal";
import { PostAccountDisplay } from "@/components/social-media/post-account-display";

type AccountMetrics = {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  followers_gained: number;
};

const NO_ACCOUNT = "__no_account__";

function getAccountMetrics(post: SocialMediaPost, accountId: string): AccountMetrics {
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

  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false);
  const [selectedPostForMetrics, setSelectedPostForMetrics] = useState<SocialMediaPost | null>(null);

  const [syncingKey, setSyncingKey] = useState<{ postId: string; accountId: string } | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

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
      } catch (e) {
        console.error(e);
      }
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
            : p.socialAccountId
              ? [p.socialAccountId]
              : null;

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
      if (!res.ok) {
        setSyncError(data.error || "Sync failed");
      } else {
        await loadPosts(selectedClientId);
      }
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

  const handleCancelInlineEdit = () => {
    setInlineEditingKey(null);
  };

  const handleSaveInlineMetrics = async () => {
    if (!inlineEditingKey) return;
    try {
      const body: any = { id: inlineEditingKey.postId, ...inlineMetrics };
      if (inlineEditingKey.accountId !== NO_ACCOUNT) {
        body.accountId = inlineEditingKey.accountId;
      }
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

  const engagementRate = (m: AccountMetrics): string => {
    if (!m.views) return "—";
    const rate = ((m.likes + m.comments + m.shares) / m.views) * 100;
    return `${rate.toFixed(2)}%`;
  };

  const handleExportCSV = () => {
    const headers = ["Title", "Platform", "Account ID", "Date", "Views", "Likes", "Comments", "Shares", "Followers", "Eng. Rate"];
    const rows = flatRows.map(({ post, accountId }) => {
      const m = getAccountMetrics(post, accountId);
      const er = m.views ? (((m.likes + m.comments + m.shares) / m.views) * 100).toFixed(2) + "%" : "—";
      return [
        `"${post.title.replace(/"/g, '""')}"`,
        post.platform,
        accountId === NO_ACCOUNT ? "" : accountId,
        post.scheduledDate,
        m.views,
        m.likes,
        m.comments,
        m.shares,
        m.followers_gained,
        er,
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

  const handleSaveMetrics = async (metrics: AccountMetrics) => {
    if (!selectedPostForMetrics) return;
    try {
      const res = await fetch("/api/social-media-posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedPostForMetrics._id || selectedPostForMetrics.id,
          ...metrics,
        }),
      });
      if (!res.ok) throw new Error("Failed to update metrics");
      await loadPosts(selectedClientId);
      setIsMetricsModalOpen(false);
    } catch (error) {
      console.error("Error saving metrics:", error);
      throw error;
    }
  };

  return (
    <div className="space-y-6 font-headline">
      {}
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">SOCIAL MEDIA ANALYTICS</h1>
          <p className="text-muted-foreground">Track post performance and engagement metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/social-media-planner" className="px-3 py-2 border rounded-md text-sm font-semibold">Dashboard</Link>
          <Link href="/social-media-planner/planner" className="px-3 py-2 border rounded-md text-sm font-semibold">Planner</Link>
          <Link href="/social-media-planner/calendar" className="px-3 py-2 border rounded-md text-sm font-semibold">Calendar</Link>
        </div>
      </header>

      {}
      <section className="border-2 border-black rounded-lg p-4">
        <ClientPicker onClientSelected={setSelectedClientId} />
      </section>

      {!selectedClientId && (
        <section className="border-2 border-yellow-400 bg-yellow-50 rounded-lg p-6">
          <div className="text-lg font-semibold text-yellow-900">
            ⚠️ Please select a client to view analytics
          </div>
        </section>
      )}

      {selectedClientId && (
        <>
          <div className="text-lg font-semibold text-gray-700">
            Analytics for: <span className="text-black">{selectedClient?.name || "Selected Client"}</span>
          </div>

          {}
          <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="border-2 border-black rounded-lg p-4 bg-blue-50">
              <div className="text-sm font-semibold text-gray-600">Total Views</div>
              <div className="text-3xl font-black text-blue-900 mt-2">{summary.totalViews.toLocaleString()}</div>
            </div>
            <div className="border-2 border-black rounded-lg p-4 bg-red-50">
              <div className="text-sm font-semibold text-gray-600">Total Likes</div>
              <div className="text-3xl font-black text-red-900 mt-2">{summary.totalLikes.toLocaleString()}</div>
            </div>
            <div className="border-2 border-black rounded-lg p-4 bg-green-50">
              <div className="text-sm font-semibold text-gray-600">Total Comments</div>
              <div className="text-3xl font-black text-green-900 mt-2">{summary.totalComments.toLocaleString()}</div>
            </div>
            <div className="border-2 border-black rounded-lg p-4 bg-purple-50">
              <div className="text-sm font-semibold text-gray-600">Total Shares</div>
              <div className="text-3xl font-black text-purple-900 mt-2">{summary.totalShares.toLocaleString()}</div>
            </div>
            <div className="border-2 border-black rounded-lg p-4 bg-orange-50">
              <div className="text-sm font-semibold text-gray-600">Followers Gained</div>
              <div className="text-3xl font-black text-orange-900 mt-2">{summary.totalFollowersGained.toLocaleString()}</div>
            </div>
          </section>

          {}
          {syncError && (
            <div className="rounded-lg border-2 border-red-400 bg-red-50 px-4 py-3 text-sm text-red-800 flex items-center justify-between">
              <span>{syncError}</span>
              <button className="ml-4 text-xs underline" onClick={() => setSyncError(null)}>Dismiss</button>
            </div>
          )}

          {}
          <section className="border-2 border-black rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div>
                <label className="block text-sm font-semibold mb-2">Search Posts</label>
                <Input
                  placeholder="Search by title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Platform</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
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
                <label className="block text-sm font-semibold mb-2">Content Type</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
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
                <label className="block text-sm font-semibold mb-2">From Date</label>
                <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">To Date</label>
                <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
              </div>
            </div>
          </section>

          {}
          <section className="border-2 border-black rounded-lg overflow-hidden">
            {flatRows.length > 0 && (
              <div className="flex justify-end px-4 pt-3 pb-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs font-semibold border-black"
                  onClick={handleExportCSV}
                >
                  Export CSV
                </Button>
              </div>
            )}
            {flatRows.length === 0 ? (
              <div className="p-6 text-center text-gray-600">
                <p className="text-lg">📊 No analytics data available for this client</p>
                <p className="text-sm text-gray-500 mt-2">Posts will appear here once created and metrics are updated.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="px-4 py-2 text-left font-bold">Title</th>
                      <th className="px-4 py-2 text-center font-bold">Platform</th>
                      <th className="px-4 py-2 text-center font-bold">Account</th>
                      <th className="px-4 py-2 text-center font-bold">Date</th>
                      <th className="px-4 py-2 text-right font-bold">Views</th>
                      <th className="px-4 py-2 text-right font-bold">Likes</th>
                      <th className="px-4 py-2 text-right font-bold">Comments</th>
                      <th className="px-4 py-2 text-right font-bold">Shares</th>
                      <th className="px-4 py-2 text-right font-bold">Followers</th>
                      <th className="px-4 py-2 text-right font-bold">Eng. Rate</th>
                      <th className="px-4 py-2 text-center font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flatRows.map(({ post, accountId, isFirst, totalAccounts }, rowIdx) => {
                      const postId = (post._id || post.id) as string;
                      const isEditing =
                        inlineEditingKey?.postId === postId &&
                        inlineEditingKey?.accountId === accountId;
                      const metrics = getAccountMetrics(post, accountId);

                      
                      const bgClass = rowIdx % 2 === 0 ? "bg-gray-50" : "bg-white";
                      const borderClass = isFirst && rowIdx !== 0 ? "border-t-2 border-gray-300" : "";

                      return (
                        <tr
                          key={`${postId}-${accountId}`}
                          className={`${bgClass} ${borderClass}`}
                        >
                          {}
                          <td className="px-4 py-3 font-semibold text-gray-900 max-w-[180px]">
                            {isFirst ? post.title : (
                              <span className="text-gray-400 text-xs italic">↳ {post.title}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center text-sm">
                            {isFirst ? post.platform : ""}
                          </td>
                          <td className="px-4 py-3 text-center text-sm">
                            {accountId === NO_ACCOUNT ? (
                              <span className="text-gray-400 text-xs">No account</span>
                            ) : (
                              <PostAccountDisplay accountId={accountId} />
                            )}
                          </td>
                          <td className="px-4 py-3 text-center text-sm text-gray-600">
                            {isFirst ? post.scheduledDate : ""}
                          </td>

                          {}
                          <td className="px-4 py-3 text-right">
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                value={inlineMetrics.views}
                                onChange={(e) =>
                                  setInlineMetrics((prev) => ({
                                    ...prev,
                                    views: Math.max(0, parseInt(e.target.value) || 0),
                                  }))
                                }
                                className="w-20 px-2 py-1 border rounded text-right font-semibold"
                              />
                            ) : (
                              <span className="font-semibold">{metrics.views.toLocaleString()}</span>
                            )}
                          </td>

                          {}
                          <td className="px-4 py-3 text-right">
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                value={inlineMetrics.likes}
                                onChange={(e) =>
                                  setInlineMetrics((prev) => ({
                                    ...prev,
                                    likes: Math.max(0, parseInt(e.target.value) || 0),
                                  }))
                                }
                                className="w-20 px-2 py-1 border rounded text-right font-semibold"
                              />
                            ) : (
                              <span className="font-semibold">{metrics.likes.toLocaleString()}</span>
                            )}
                          </td>

                          {}
                          <td className="px-4 py-3 text-right">
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                value={inlineMetrics.comments}
                                onChange={(e) =>
                                  setInlineMetrics((prev) => ({
                                    ...prev,
                                    comments: Math.max(0, parseInt(e.target.value) || 0),
                                  }))
                                }
                                className="w-20 px-2 py-1 border rounded text-right font-semibold"
                              />
                            ) : (
                              <span className="font-semibold">{metrics.comments.toLocaleString()}</span>
                            )}
                          </td>

                          {}
                          <td className="px-4 py-3 text-right">
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                value={inlineMetrics.shares}
                                onChange={(e) =>
                                  setInlineMetrics((prev) => ({
                                    ...prev,
                                    shares: Math.max(0, parseInt(e.target.value) || 0),
                                  }))
                                }
                                className="w-20 px-2 py-1 border rounded text-right font-semibold"
                              />
                            ) : (
                              <span className="font-semibold">{metrics.shares.toLocaleString()}</span>
                            )}
                          </td>

                          {}
                          <td className="px-4 py-3 text-right">
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                value={inlineMetrics.followers_gained}
                                onChange={(e) =>
                                  setInlineMetrics((prev) => ({
                                    ...prev,
                                    followers_gained: Math.max(0, parseInt(e.target.value) || 0),
                                  }))
                                }
                                className="w-20 px-2 py-1 border rounded text-right font-semibold"
                              />
                            ) : (
                              <span className="font-semibold">{metrics.followers_gained.toLocaleString()}</span>
                            )}
                          </td>

                          {}
                          <td className="px-4 py-3 text-right text-sm font-semibold text-indigo-700">
                            {isEditing ? "—" : engagementRate(metrics)}
                          </td>

                          {}
                          <td className="px-4 py-3 text-center">
                            {isEditing ? (
                              <div className="flex gap-2 justify-center">
                                <Button
                                  size="sm"
                                  className="text-xs bg-green-600 hover:bg-green-700"
                                  onClick={handleSaveInlineMetrics}
                                >
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs"
                                  onClick={handleCancelInlineEdit}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <div className="flex gap-1 justify-center">
                                {}
                                {(post.platform === "Facebook" || post.platform === "Instagram") && accountId !== NO_ACCOUNT && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs border-blue-500 text-blue-700 hover:bg-blue-50"
                                    disabled={!!syncingKey}
                                    onClick={() => handleSyncMetrics(post, accountId)}
                                    title="Fetch live metrics from Meta Graph API"
                                  >
                                    {syncingKey?.postId === postId && syncingKey?.accountId === accountId
                                      ? "Syncing…"
                                      : "Sync"}
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  className="text-xs"
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

      {}
      {selectedPostForMetrics && (
        <UpdateMetricsModal
          isOpen={isMetricsModalOpen}
          postTitle={selectedPostForMetrics.title}
          currentMetrics={{
            views: selectedPostForMetrics.views || 0,
            likes: selectedPostForMetrics.likes || 0,
            comments: selectedPostForMetrics.comments || 0,
            shares: selectedPostForMetrics.shares || 0,
            followers_gained: selectedPostForMetrics.followers_gained || 0,
          }}
          onClose={() => setIsMetricsModalOpen(false)}
          onSave={handleSaveMetrics}
        />
      )}
    </div>
  );
}
