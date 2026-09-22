"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StatCard } from "@/components/ui/stat-card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Clock, AlertCircle, CheckCircle2, MessageSquare, Search, Send, Headphones } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Status = "new" | "in_progress" | "resolved" | "closed";

interface Activity {
  type: "comment" | "status_change";
  user: string;
  message: string;
  timestamp: string;
  oldValue?: string;
  newValue?: string;
}

interface Ticket {
  _id: string;
  ticketNumber?: string;
  title: string;
  description: string;
  status: Status;
  priority: "low" | "medium" | "high" | "critical" | "urgent";
  client: string; // the tenant's company name
  submittedBy?: string;
  issueTypeLabel?: string;
  createdAt: string;
  activity?: Activity[];
}

const STATUS_LABEL: Record<Status, string> = {
  new: "New",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};
const STATUS_COLOR: Record<Status, string> = {
  new: "bg-blue-100 text-blue-700",
  in_progress: "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-slate-200 text-slate-700",
};
const PRIORITY_COLOR: Record<string, string> = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
  urgent: "bg-red-100 text-red-700",
};

// Client-queries inbox for one product (Nest HR or NestLeads): tickets are created in that
// product and pushed here (see /api/hrms/support-tickets and /api/nestleads/support-tickets);
// replying or changing status here pushes back so the tenant sees it in their own app.
export function ProductSupportPage({ source, productName }: { source: "hrms" | "nestleads"; productName: string }) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/support-tickets?source=${source}`);
      if (res.ok) setTickets(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [source]);

  const filtered = tickets.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return [t.title, t.client, t.ticketNumber].some((v) => (v || "").toLowerCase().includes(q));
  });

  const counts = {
    new: tickets.filter((t) => t.status === "new").length,
    in_progress: tickets.filter((t) => t.status === "in_progress").length,
    resolved: tickets.filter((t) => t.status === "resolved" || t.status === "closed").length,
  };

  const patch = async (ticket: Ticket, updates: Record<string, any>) => {
    const res = await apiFetch(`/api/support-tickets/${ticket._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Request failed");
    const updated = await res.json();
    setTickets((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    setSelected(updated);
    return updated;
  };

  const changeStatus = async (ticket: Ticket, status: Status) => {
    try {
      await patch(ticket, {
        status,
        activity: {
          type: "status_change",
          user: user?.name || "Admin",
          message: `Status changed to ${STATUS_LABEL[status]}`,
          timestamp: new Date(),
          oldValue: ticket.status,
          newValue: status,
        },
      });
      toast({ title: "Status updated", description: `${productName} will see this update.` });
    } catch {
      toast({ title: "Failed to update status", variant: "destructive" });
    }
  };

  const sendReply = async () => {
    if (!selected || !reply.trim()) return;
    setSending(true);
    try {
      await patch(selected, {
        activity: {
          type: "comment",
          user: user?.name || "Support",
          message: reply.trim(),
          timestamp: new Date(),
        },
        ...(selected.status === "new" ? { status: "in_progress" } : {}),
      });
      setReply("");
      toast({ title: "Reply sent", description: `Visible to the tenant in ${productName}.` });
    } catch {
      toast({ title: "Failed to send reply", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Headphones className="h-6 w-6" /> {productName} Support
          </h1>
          <p className="text-sm text-muted-foreground">Client queries raised inside {productName}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="New" value={counts.new} icon={AlertCircle} />
        <StatCard label="In Progress" value={counts.in_progress} icon={Clock} />
        <StatCard label="Resolved" value={counts.resolved} icon={CheckCircle2} />
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search tickets..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {Object.entries(STATUS_LABEL).map(([k, label]) => (
              <SelectItem key={k} value={k}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg divide-y">
        {loading ? (
          <p className="p-6 text-sm text-muted-foreground text-center">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground text-center">
            {tickets.length ? "No tickets match your filters." : `No ${productName} tickets yet.`}
          </p>
        ) : (
          filtered.map((t) => (
            <button
              key={t._id}
              onClick={() => setSelected(t)}
              className="w-full text-left p-4 hover:bg-muted/50 flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium truncate">{t.title}</span>
                  {t.ticketNumber && <span className="text-xs text-muted-foreground">#{t.ticketNumber}</span>}
                  <Badge className={cn("text-xs", PRIORITY_COLOR[t.priority])}>{t.priority}</Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate mt-0.5">
                  {t.client} {t.issueTypeLabel ? `· ${t.issueTypeLabel}` : ""}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <Badge className={cn("text-xs", STATUS_COLOR[t.status])}>{STATUS_LABEL[t.status]}</Badge>
                <span className="text-xs text-muted-foreground">{format(new Date(t.createdAt), "d MMM")}</span>
              </div>
            </button>
          ))
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 flex-wrap">
                  {selected.title}
                  {selected.ticketNumber && <span className="text-xs text-muted-foreground font-normal">#{selected.ticketNumber}</span>}
                </DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-2 flex-wrap text-sm">
                <Badge className={cn(PRIORITY_COLOR[selected.priority])}>{selected.priority}</Badge>
                <span className="text-muted-foreground">
                  {selected.client}
                  {selected.submittedBy ? ` · ${selected.submittedBy}` : ""}
                </span>
                <span className="text-muted-foreground ml-auto">{format(new Date(selected.createdAt), "d MMM yyyy, p")}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{selected.description}</p>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Status</span>
                <Select value={selected.status} onValueChange={(v) => changeStatus(selected, v as Status)}>
                  <SelectTrigger className="w-40 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATUS_LABEL).map(([k, label]) => (
                      <SelectItem key={k} value={k}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-3 max-h-56 overflow-y-auto">
                {(selected.activity || []).length === 0 && (
                  <p className="text-xs text-muted-foreground">No replies yet.</p>
                )}
                {(selected.activity || []).map((a, i) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <MessageSquare className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <div>
                      <p>
                        <span className="font-medium">{a.user}</span>{" "}
                        <span className="text-xs text-muted-foreground">{format(new Date(a.timestamp), "d MMM, p")}</span>
                      </p>
                      <p className="text-muted-foreground">{a.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Textarea
                  placeholder={`Reply — the ${productName} tenant will see this in their own Support screen.`}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={2}
                  className="flex-1"
                />
                <Button onClick={sendReply} disabled={sending || !reply.trim()} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
