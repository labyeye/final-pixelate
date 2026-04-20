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
import { MultiAccountDisplay } from "@/components/social-media/multi-account-display";

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
  const [inlineEditingPostId, setInlineEditingPostId] = useState<string | null>(null);
  const [inlineMetrics, setInlineMetrics] = useState<{
    views: number;
    likes: number;
    comments: number;
    shares: number;
    followers_gained: number;
  }>({
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    followers_gained: 0,
  });

  // Load posts for selected client
  const loadPosts = async (clientId: string) => {
    if (!clientId) {
      setPosts([]);
      return;
    }
    try {
      const url = new URL("/api/social-media-posts", window.location.origin);
      url.searchParams.set("clientId", clientId);
      
      // If user is not an admin, filter by their name to show only assigned posts
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

  // Load clients for client name display
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

  // Reload posts when client or date range changes
  useEffect(() => {
    loadPosts(selectedClientId);
  }, [selectedClientId, dateFrom, dateTo, user]);

  const selectedClient = useMemo(
    () => clients.find((c) => (c._id || c.id) === selectedClientId),
    [clients, selectedClientId],
  );

  // Calculate summary statistics
  const summary = useMemo(() => {
    if (!posts.length) {
      return { totalViews: 0, totalLikes: 0, totalComments: 0, totalFollowersGained: 0, totalShares: 0 };
    }
    return {
      totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0),
      totalLikes: posts.reduce((sum, p) => sum + (p.likes || 0), 0),
      totalComments: posts.reduce((sum, p) => sum + (p.comments || 0), 0),
      totalShares: posts.reduce((sum, p) => sum + (p.shares || 0), 0),
      totalFollowersGained: posts.reduce((sum, p) => sum + (p.followers_gained || 0), 0),
    };
  }, [posts]);

  // Filter posts based on search and filters
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
      const matchesPlatform = !platformFilter || post.platform === platformFilter;
      const matchesContentType = !contentTypeFilter || post.contentType === contentTypeFilter;
      return matchesSearch && matchesPlatform && matchesContentType;
    });
  }, [posts, search, platformFilter, contentTypeFilter]);

  const handleUpdateMetrics = (post: SocialMediaPost) => {
    setSelectedPostForMetrics(post);
    setIsMetricsModalOpen(true);
  };

  const handleStartInlineEdit = (post: SocialMediaPost) => {
    setInlineEditingPostId((post._id || post.id) as string);
    setInlineMetrics({
      views: post.views || 0,
      likes: post.likes || 0,
      comments: post.comments || 0,
      shares: post.shares || 0,
      followers_gained: post.followers_gained || 0,
    });
  };

  const handleCancelInlineEdit = () => {
    setInlineEditingPostId(null);
  };

  const handleSaveInlineMetrics = async () => {
    if (!inlineEditingPostId) return;
    try {
      const res = await fetch("/api/social-media-posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: inlineEditingPostId,
          ...inlineMetrics,
        }),
      });
      if (!res.ok) throw new Error("Failed to update metrics");
      await loadPosts(selectedClientId);
      setInlineEditingPostId(null);
    } catch (error) {
      console.error("Error saving metrics:", error);
      alert("Failed to save metrics. Please try again.");
    }
  };

  const handleSaveMetrics = async (metrics: any) => {
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
      {/* Header */}
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

      {/* Client Picker */}
      <section className="border-2 border-black rounded-lg p-4">
        <ClientPicker onClientSelected={setSelectedClientId} />
      </section>

      {/* Empty State - No Client Selected */}
      {!selectedClientId && (
        <section className="border-2 border-yellow-400 bg-yellow-50 rounded-lg p-6">
          <div className="text-lg font-semibold text-yellow-900">
            ⚠️ Please select a client to view analytics
          </div>
        </section>
      )}

      {/* Analytics Content - Only show when client selected */}
      {selectedClientId && (
        <>
          {/* Client Name Display */}
          <div className="text-lg font-semibold text-gray-700">
            Analytics for: <span className="text-black">{selectedClient?.name || "Selected Client"}</span>
          </div>

          {/* Summary Cards */}
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

          {/* Filters */}
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
                    <option key={p} value={p}>
                      {p}
                    </option>
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
                    <option key={ct} value={ct}>
                      {ct}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">From Date</label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">To Date</label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Analytics Table */}
          <section className="border-2 border-black rounded-lg overflow-hidden">
            {filteredPosts.length === 0 ? (
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
                      <th className="px-4 py-2 text-center font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post, idx) => {
                      const isEditing = inlineEditingPostId === (post._id || post.id);
                      return (
                        <tr key={post._id || post.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                          <td className="px-4 py-3 font-semibold text-gray-900">{post.title}</td>
                          <td className="px-4 py-3 text-center text-sm">{post.platform}</td>
                          <td className="px-4 py-3 text-center text-sm">
                            {(post.socialAccountIds && post.socialAccountIds.length > 0) ? (
                              <MultiAccountDisplay accountIds={post.socialAccountIds} />
                            ) : (
                              <PostAccountDisplay accountId={post.socialAccountId} />
                            )}
                          </td>
                          <td className="px-4 py-3 text-center text-sm text-gray-600">{post.scheduledDate}</td>
                          <td className="px-4 py-3 text-right">
                            {inlineEditingPostId === (post._id || post.id) ? (
                              <input
                                type="number"
                                min="0"
                                value={inlineMetrics.views}
                                onChange={(e) => setInlineMetrics({ ...inlineMetrics, views: Math.max(0, parseInt(e.target.value) || 0) })}
                                className="w-full px-2 py-1 border rounded text-right font-semibold"
                              />
                            ) : (
                              <span className="font-semibold">{(post.views || 0).toLocaleString()}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                value={inlineMetrics.likes}
                                onChange={(e) => setInlineMetrics({ ...inlineMetrics, likes: Math.max(0, parseInt(e.target.value) || 0) })}
                                className="w-full px-2 py-1 border rounded text-right font-semibold"
                              />
                            ) : (
                              <span className="font-semibold">{(post.likes || 0).toLocaleString()}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                value={inlineMetrics.comments}
                                onChange={(e) => setInlineMetrics({ ...inlineMetrics, comments: Math.max(0, parseInt(e.target.value) || 0) })}
                                className="w-full px-2 py-1 border rounded text-right font-semibold"
                              />
                            ) : (
                              <span className="font-semibold">{(post.comments || 0).toLocaleString()}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                value={inlineMetrics.shares}
                                onChange={(e) => setInlineMetrics({ ...inlineMetrics, shares: Math.max(0, parseInt(e.target.value) || 0) })}
                                className="w-full px-2 py-1 border rounded text-right font-semibold"
                              />
                            ) : (
                              <span className="font-semibold">{(post.shares || 0).toLocaleString()}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                value={inlineMetrics.followers_gained}
                                onChange={(e) => setInlineMetrics({ ...inlineMetrics, followers_gained: Math.max(0, parseInt(e.target.value) || 0) })}
                                className="w-full px-2 py-1 border rounded text-right font-semibold"
                              />
                            ) : (
                              <span className="font-semibold">{(post.followers_gained || 0).toLocaleString()}</span>
                            )}
                          </td>
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
                              <Button
                                size="sm"
                                className="text-xs"
                                onClick={() => handleStartInlineEdit(post)}
                              >
                                Edit Metrics
                              </Button>
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

      {/* Update Metrics Modal */}
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
