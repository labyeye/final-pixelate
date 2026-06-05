"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Briefcase,
  FileText,
  LogOut,
  User,
  Instagram,
  Facebook,
  Check,
  X,
  Eye,
  Share2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ClientPortalPage() {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [socialPosts, setSocialPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingPostId, setProcessingPostId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== "client") return;
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    (async () => {
      try {
        const [projRes, invRes, socialRes] = await Promise.all([
          apiFetch("/api/projects", { headers }),
          apiFetch("/api/invoices", { headers }),
          fetch(`/api/social-media-posts?clientId=${user.clientId}`, {
            headers,
          }),
        ]);
        const allProjects = projRes.ok ? await projRes.json() : [];
        const allInvoices = invRes.ok ? await invRes.json() : [];
        const allSocialPosts = socialRes.ok ? await socialRes.json() : [];

        const cid = user.clientId;
        const myProjects = allProjects.filter(
          (p: any) => cid && String(p.clientId) === String(cid),
        );
        const myInvoices = allInvoices.filter(
          (i: any) => cid && String(i.clientId) === String(cid),
        );
        setProjects(myProjects);
        setInvoices(myInvoices);
        setSocialPosts(Array.isArray(allSocialPosts) ? allSocialPosts : []);
      } catch (e) {
        console.error("Failed to load client portal data", e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const handleUpdateApproval = async (postId: string, status: string) => {
    setProcessingPostId(postId);
    try {
      const token = localStorage.getItem("auth_token");
      const res = await apiFetch("/api/social-media-posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: postId, approvalStatus: status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setSocialPosts((prev) =>
        prev.map((p) =>
          (p._id || p.id) === postId ? { ...p, approvalStatus: status } : p,
        ),
      );
      toast({
        title: `Post ${status}`,
        description: `The post has been marked as ${status.toLowerCase()}.`,
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Failed to update post status.",
        variant: "destructive",
      });
    } finally {
      setProcessingPostId(null);
    }
  };

  const pendingSocialPosts = socialPosts.filter(
    (p) => p.approvalStatus === "Pending" || !p.approvalStatus,
  );

  if (!user) return null;

  if (user.role !== "client") {
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
    <div className="min-h-screen bg-background font-headline">
      {}
      <header className="border-b-2 border-black bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/logo-transparent.png"
              alt="Logo"
              className="w-10 h-10"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div>
              <h1 className="text-2xl font-black tracking-tighter">
                PIXELATE NEST
              </h1>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                Client Portal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-black rounded-lg">
              <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-black text-sm">
                {user.name?.charAt(0).toUpperCase() ?? "C"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="border-2 border-black ml-2"
            >
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {}
        <section>
          <h2 className="text-4xl font-black tracking-tighter">
            Welcome, {user.name?.split(" ")[0]}!
          </h2>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your projects and invoices.
          </p>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="border-2 border-black">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 border-2 border-black">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-black">{projects.length}</p>
                <p className="text-sm text-muted-foreground font-bold">
                  Total Projects
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-black">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 border-2 border-black">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-black">{invoices.length}</p>
                <p className="text-sm text-muted-foreground font-bold">
                  Total Invoices
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-black">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 border-2 border-black">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-black">
                  {pendingSocialPosts.length}
                </p>
                <p className="text-sm text-muted-foreground font-bold">
                  Posts to Approve
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Approval */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black tracking-tighter flex items-center gap-2">
              <Instagram className="w-5 h-5" /> Social Media Approval
            </h3>
            {pendingSocialPosts.length > 0 && (
              <Badge className="bg-amber-500 border-black animate-pulse">
                Action Required
              </Badge>
            )}
          </div>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : pendingSocialPosts.length === 0 ? (
            <Card className="border-2 border-black">
              <CardContent className="py-8 text-center text-muted-foreground">
                No posts awaiting your approval.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingSocialPosts.map((post) => (
                <Card
                  key={String(post._id ?? post.id)}
                  className="border-2 border-black overflow-hidden flex flex-col"
                >
                  <div className="aspect-video bg-muted relative border-b-2 border-black">
                    {post.mediaFile ? (
                      <img
                        src={post.mediaFile}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FileText className="w-10 h-10 text-muted-foreground" />
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2 bg-white text-black border-2 border-black font-black">
                      {post.platform}
                    </Badge>
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col gap-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="font-black text-lg leading-tight">
                          {post.title}
                        </p>
                        <Badge
                          variant="outline"
                          className="border-black text-[10px]"
                        >
                          {post.contentType}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground font-bold mt-1">
                        Scheduled: {post.scheduledDate} {post.scheduledTime}
                      </p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded border border-black/10 text-sm italic line-clamp-3">
                      "{post.caption}"
                    </div>
                    <div className="flex gap-2 mt-auto pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white border-2 border-black"
                        onClick={() =>
                          handleUpdateApproval(post._id || post.id, "Approved")
                        }
                        disabled={processingPostId === (post._id || post.id)}
                      >
                        <Check className="w-4 h-4 mr-1" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1 border-2 border-black"
                        onClick={() =>
                          handleUpdateApproval(post._id || post.id, "Rejected")
                        }
                        disabled={processingPostId === (post._id || post.id)}
                      >
                        <X className="w-4 h-4 mr-1" /> Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Projects */}
        <section className="space-y-4">
          <h3 className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <Briefcase className="w-5 h-5" /> Projects
          </h3>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : projects.length === 0 ? (
            <Card className="border-2 border-black">
              <CardContent className="py-8 text-center text-muted-foreground">
                No projects yet.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {projects.map((p) => (
                <Card
                  key={String(p._id ?? p.id)}
                  className="border-2 border-black"
                >
                  <CardContent className="py-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base truncate">{p.title}</p>
                      {p.deliveryDate && (
                        <p className="text-sm text-muted-foreground">
                          Delivery:{" "}
                          {new Date(p.deliveryDate).toLocaleDateString("en-IN")}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {typeof p.progress === "number" && (
                        <div className="text-right">
                          <p className="text-sm font-bold">{p.progress}%</p>
                          <div className="h-2 w-24 bg-muted rounded-full border border-black overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${p.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      {p.amount != null && (
                        <Badge
                          variant="outline"
                          className="border-black font-bold"
                        >
                          ₹{Number(p.amount).toLocaleString("en-IN")}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Invoices */}
        <section className="space-y-4">
          <h3 className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <FileText className="w-5 h-5" /> Invoices
          </h3>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : invoices.length === 0 ? (
            <Card className="border-2 border-black">
              <CardContent className="py-8 text-center text-muted-foreground">
                No invoices yet.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {invoices.map((inv) => (
                <Card
                  key={String(inv._id ?? inv.id)}
                  className="border-2 border-black"
                >
                  <CardContent className="py-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base">
                        {inv.title || inv.invoiceNo || "Invoice"}
                      </p>
                      {inv.invoiceNo && inv.title && (
                        <p className="text-sm text-muted-foreground">
                          {inv.invoiceNo}
                        </p>
                      )}
                      {inv.dueDate && (
                        <p className="text-sm text-muted-foreground">
                          Due:{" "}
                          {new Date(inv.dueDate).toLocaleDateString("en-IN")}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {inv.amount != null && (
                        <Badge
                          variant="outline"
                          className="border-black font-bold"
                        >
                          ₹{Number(inv.amount).toLocaleString("en-IN")}
                        </Badge>
                      )}
                      {inv.status && (
                        <Badge
                          className={
                            inv.status === "paid"
                              ? "bg-green-500 text-white border-green-700"
                              : inv.status === "overdue"
                                ? "bg-red-500 text-white border-red-700"
                                : "border-black"
                          }
                          variant="outline"
                        >
                          {inv.status}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
