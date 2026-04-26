"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  _id?: string;
  clientId?: string;
  title: string;
  platform: string;
  caption: string;
  scheduledDate: string;
  scheduledTime?: string;
  status: string;
  approvalStatus?: "Pending" | "Approved" | "Rejected";
  createdBy?: string;
  notes?: string;
}

export default function ClientPlannerPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!user || user.role !== "client") return;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const url = new URL("/api/social-media-posts", window.location.origin);
        url.searchParams.set("clientId", user.clientId || "");
        const res = await fetch(url.toString(), { headers });
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data: any[] = await res.json();
        
        const clientPosts = Array.isArray(data)
          ? data.filter((p) => p.clientId === user.clientId)
          : [];
        setPosts(clientPosts);
      } catch (err) {
        console.error("Failed to load posts", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const handleApprove = async (postId: string) => {
    try {
      setIsSubmitting((prev) => ({ ...prev, [postId]: true }));
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`/api/social-media-posts/${postId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          approvalStatus: "Approved",
        }),
      });

      if (!res.ok) throw new Error("Failed to approve post");

      toast({
        title: "Post Approved ✅",
        description: "Your team will be notified.",
      });

      
      const url = new URL("/api/social-media-posts", window.location.origin);
      url.searchParams.set("clientId", user?.clientId || "");
      const allRes = await fetch(url.toString(), { headers });
      const data = await allRes.json();
      const clientPosts = Array.isArray(data)
        ? data.filter((p) => p.clientId === user?.clientId)
        : [];
      setPosts(clientPosts);
    } catch (err) {
      console.error("Error approving post", err);
      toast({
        title: "Error",
        description: "Failed to approve post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleReject = async (postId: string) => {
    const reason = rejectionReason[postId];
    if (!reason.trim()) {
      toast({
        title: "Required",
        description: "Please provide a reason for rejection",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting((prev) => ({ ...prev, [postId]: true }));
      const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`/api/social-media-posts/${postId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          approvalStatus: "Rejected",
          rejectionReason: reason,
        }),
      });

      if (!res.ok) throw new Error("Failed to reject post");

      toast({
        title: "Post Rejected ❌",
        description: "Your team will be notified with the reason.",
      });

      
      setRejectionReason((prev) => {
        const newState = { ...prev };
        delete newState[postId];
        return newState;
      });

      
      const url = new URL("/api/social-media-posts", window.location.origin);
      url.searchParams.set("clientId", user?.clientId || "");
      const allRes = await fetch(url.toString(), { headers });
      const data = await allRes.json();
      const clientPosts = Array.isArray(data)
        ? data.filter((p) => p.clientId === user?.clientId)
        : [];
      setPosts(clientPosts);
    } catch (err) {
      console.error("Error rejecting post", err);
      toast({
        title: "Error",
        description: "Failed to reject post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [postId]: false }));
    }
  };

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

  
  const pendingPosts = posts.filter((p) => p.approvalStatus === "Pending" || !p.approvalStatus);
  const approvedPosts = posts.filter((p) => p.approvalStatus === "Approved");
  const rejectedPosts = posts.filter((p) => p.approvalStatus === "Rejected");

  return (
    <div className="min-h-screen bg-background font-headline p-6 space-y-6">
      {}
      <div>
        <h1 className="text-4xl font-black tracking-tighter">Social Media Posts</h1>
        <p className="text-muted-foreground mt-1">Review and approve social media content created by your team</p>
      </div>

      {}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-2 border-black">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-black">{pendingPosts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">⏳ Pending Review</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-black bg-green-50">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-black text-green-600">{approvedPosts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">✅ Approved</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-black bg-red-50">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-black text-red-600">{rejectedPosts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">❌ Rejected</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground">Loading posts...</div>
      ) : (
        <>
          {}
          {pendingPosts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black">⏳ Pending Review</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {pendingPosts.map((post) => (
                  <Card
                    key={post._id}
                    className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base line-clamp-2">{post.title}</CardTitle>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="border-black font-bold">
                              {post.platform}
                            </Badge>
                            <Badge className="bg-yellow-100 text-yellow-700 border-black font-bold">
                              {post.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground font-bold mb-1">Caption</p>
                        <p className="text-sm line-clamp-3 bg-muted p-2 rounded border border-black">
                          {post.caption}
                        </p>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        📅 {new Date(post.scheduledDate).toLocaleDateString()} at{" "}
                        {post.scheduledTime || "00:00"}
                      </div>

                      {}
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-bold">
                          Rejection Reason (if needed)
                        </p>
                        <Textarea
                          placeholder="Explain why you're rejecting this post..."
                          value={rejectionReason[post._id || ""] || ""}
                          onChange={(e) =>
                            setRejectionReason((prev) => ({
                              ...prev,
                              [post._id || ""]: e.target.value,
                            }))
                          }
                          className="border-2 border-black text-sm"
                          rows={2}
                        />
                      </div>

                      {}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(post._id || "")}
                          disabled={isSubmitting[post._id || ""]}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white border-2 border-black font-bold"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(post._id || "")}
                          disabled={isSubmitting[post._id || ""]}
                          variant="destructive"
                          className="flex-1 border-2 border-black font-bold"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {}
          {approvedPosts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black">✅ Approved Posts</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {approvedPosts.map((post) => (
                  <Card
                    key={post._id}
                    className="border-2 border-green-600 bg-green-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <CardHeader>
                      <div>
                        <CardTitle className="text-base line-clamp-2">{post.title}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="border-green-600 font-bold">
                            {post.platform}
                          </Badge>
                          <Badge className="bg-green-600 text-white font-bold">
                            <CheckCircle className="w-3 h-3 mr-1" /> Approved
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm line-clamp-2">{post.caption}</p>
                      <p className="text-xs text-muted-foreground">
                        📅 {new Date(post.scheduledDate).toLocaleDateString()} at{" "}
                        {post.scheduledTime || "00:00"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {}
          {rejectedPosts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-black">❌ Rejected Posts</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {rejectedPosts.map((post) => (
                  <Card
                    key={post._id}
                    className="border-2 border-red-600 bg-red-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <CardHeader>
                      <div>
                        <CardTitle className="text-base line-clamp-2">{post.title}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="border-red-600 font-bold">
                            {post.platform}
                          </Badge>
                          <Badge className="bg-red-600 text-white font-bold">
                            <XCircle className="w-3 h-3 mr-1" /> Rejected
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm line-clamp-2">{post.caption}</p>
                      {(post as any).rejectionReason && (
                        <div className="bg-red-100 p-2 rounded border border-red-300">
                          <p className="text-xs font-bold text-red-700 mb-1">Your Feedback:</p>
                          <p className="text-sm text-red-800">{(post as any).rejectionReason}</p>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        📅 {new Date(post.scheduledDate).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {posts.length === 0 && (
            <Card className="border-2 border-black">
              <CardContent className="pt-6 text-center">
                  <p className="font-bold">No posts yet</p>
                <p className="text-sm text-muted-foreground">
                  Your team will share posts here for your approval
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {}
      <Card className="border-2 border-black bg-primary/5">
        <CardContent className="pt-6">
          <p className="text-sm">
            <span className="font-bold">💡 How it works:</span> Your team creates social media posts and sends them for your approval. Review the content, and either approve it to be scheduled or reject it with feedback so they can revise.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
