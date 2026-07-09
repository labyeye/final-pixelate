"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RefreshCw,
  CheckCheck,
  Check,
  XCircle,
  MessageSquare,
  Reply,
  RotateCcw,
  FileText,
  Send,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface LogEntry {
  _id: string;
  source: "invoice" | "template";
  phone?: string;
  contactName?: string;
  invoiceNumber?: string;
  templateName?: string;
  message?: string;
  sentAt?: string;
  messageId?: string;
  status: string;
  deliveredAt?: string;
  readAt?: string;
  failedAt?: string;
  failCode?: number;
  failReason?: string;
  replyText?: string;
  replyAt?: string;
}

const STATUS_CONFIG = {
  sent: {
    label: "Sent",
    Icon: Check,
    tickClass: "text-neutral-400",
    chip: "bg-neutral-100 text-neutral-700 border-neutral-300",
  },
  delivered: {
    label: "Delivered",
    Icon: CheckCheck,
    tickClass: "text-neutral-500",
    chip: "bg-neutral-100 text-neutral-700 border-neutral-300",
  },
  read: {
    label: "Read",
    Icon: CheckCheck,
    tickClass: "text-blue-500",
    chip: "bg-blue-50 text-blue-700 border-blue-400",
  },
  failed: {
    label: "Failed",
    Icon: XCircle,
    tickClass: "text-red-500",
    chip: "bg-red-50 text-red-700 border-red-400",
  },
  received: {
    label: "Received",
    Icon: Check,
    tickClass: "text-green-600",
    chip: "bg-green-50 text-green-700 border-green-400",
  },
} as const;

function StatusBadge({ status }: { status?: string }) {
  if (!status) return <span className="text-xs text-neutral-400">—</span>;
  const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
  if (!cfg)
    return (
      <span className="text-[10px] font-black px-2 py-0.5 border-2 border-neutral-300 bg-neutral-100">
        {status}
      </span>
    );
  const { Icon } = cfg;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-black text-[10px] uppercase tracking-wide px-2 py-0.5 border-2",
        cfg.chip,
      )}
    >
      <Icon size={11} className={cfg.tickClass} />
      {cfg.label}
    </span>
  );
}

function TickIcon({ status }: { status?: string }) {
  if (!status) return <span className="text-neutral-300">—</span>;
  const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
  if (!cfg) return null;
  const { Icon } = cfg;
  return <Icon size={14} className={cfg.tickClass} />;
}

function fmt(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function wamidShort(id?: string) {
  if (!id) return "—";
  return "…" + id.slice(-16);
}

// default date range = last 30 days
function defaultDates() {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 30);
  return {
    from: from.toISOString().slice(0, 10),
    to: to.toISOString().slice(0, 10),
  };
}

export default function WhatsAppLogPage() {
  const { toast } = useToast();
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [dates, setDates] = useState(defaultDates);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status: statusFilter,
        limit: "300",
        from: dates.from,
        to: dates.to,
      });
      const res = await apiFetch(`/api/whatsapp/delivery-log?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEntries(Array.isArray(data) ? data : []);
      setLastRefreshed(new Date());
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [statusFilter, dates.from, dates.to]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await apiFetch("/api/whatsapp/webhook-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: dates.from, to: dates.to }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sync failed");
      toast({
        title: "Synced from DB",
        description: `${data.sent ?? 0} sent · ${data.received ?? 0} received · ${data.invoices ?? 0} invoices (${dates.from} → ${dates.to})`,
      });
      await fetchData();
    } catch (e: any) {
      toast({ title: "Sync Failed", description: e.message, variant: "destructive" });
    } finally {
      setSyncing(false);
    }
  };

  const filtered = entries.filter((e) => {
    if (sourceFilter !== "all" && e.source !== sourceFilter) return false;
    return true;
  });

  const counts = entries.reduce(
    (acc, e) => {
      const s = e.status ?? "sent";
      acc[s] = (acc[s] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const repliedCount = entries.filter((e) => !!e.replyText).length;

  return (
    <div className="p-6 space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-2 border-black pb-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase italic flex items-center gap-3">
            <MessageSquare className="w-8 h-8" />
            WhatsApp Log
          </h1>
          <p className="text-muted-foreground font-medium mt-1">
            All template & invoice messages · delivery status · replies
            {lastRefreshed && (
              <> · Last refreshed at {lastRefreshed.toLocaleTimeString("en-IN")}</>
            )}
          </p>
        </div>

        {/* Sync controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 border-2 border-black bg-white px-3 h-10">
            <Calendar className="w-4 h-4 text-neutral-500 shrink-0" />
            <Input
              type="date"
              value={dates.from}
              onChange={(e) => setDates((d) => ({ ...d, from: e.target.value }))}
              className="border-0 shadow-none p-0 h-auto text-sm font-bold w-28 focus-visible:ring-0"
            />
            <span className="text-neutral-400 text-sm">→</span>
            <Input
              type="date"
              value={dates.to}
              onChange={(e) => setDates((d) => ({ ...d, to: e.target.value }))}
              className="border-0 shadow-none p-0 h-auto text-sm font-bold w-28 focus-visible:ring-0"
            />
          </div>

          <Button
            variant="outline"
            className="border-2 border-black font-black h-10 gap-2 hover:bg-neutral-100"
            onClick={handleSync}
            disabled={syncing || loading}
          >
            <RotateCcw
              className={cn("w-4 h-4", syncing && "animate-spin")}
            />
            {syncing ? "Syncing…" : "Sync"}
          </Button>

          <Button
            className="bg-black hover:bg-neutral-800 text-white font-black h-10 gap-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]"
            onClick={fetchData}
            disabled={loading}
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* ── Stat tiles ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {(
          [
            { key: "sent", label: "Sent", Icon: Send },
            { key: "delivered", label: "Delivered", Icon: CheckCheck },
            { key: "read", label: "Read", Icon: CheckCheck },
            { key: "failed", label: "Failed", Icon: XCircle },
          ] as const
        ).map(({ key, label, Icon }) => {
          const active = statusFilter === key;
          return (
            <button
              key={key}
              onClick={() => setStatusFilter(active ? "all" : key)}
              className={cn(
                "p-4 text-left border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]",
                active
                  ? "bg-black text-white"
                  : "bg-white text-black",
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon
                  size={15}
                  className={cn(
                    key === "read" && !active && "text-blue-500",
                    key === "failed" && !active && "text-red-500",
                    active && "text-white",
                  )}
                />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {label}
                </span>
              </div>
              <p className="text-3xl font-black">{counts[key] ?? 0}</p>
            </button>
          );
        })}

        {/* Replied tile */}
        <button
          onClick={() => {}}
          className="p-4 text-left border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-white text-black col-span-1"
        >
          <div className="flex items-center gap-2 mb-1">
            <Reply size={15} className="text-purple-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Replied
            </span>
          </div>
          <p className="text-3xl font-black">{repliedCount}</p>
        </button>

        {/* Total tile */}
        <div className="p-4 text-left border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-neutral-900 text-white col-span-1">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare size={15} className="text-neutral-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Total
            </span>
          </div>
          <p className="text-3xl font-black">{entries.length}</p>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44 border-2 border-black font-bold h-10 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="border-2 border-black font-bold">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-44 border-2 border-black font-bold h-10 bg-white">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent className="border-2 border-black font-bold">
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="invoice">Invoice Sends</SelectItem>
            <SelectItem value="template">Template Sends</SelectItem>
          </SelectContent>
        </Select>

        {(statusFilter !== "all" || sourceFilter !== "all") && (
          <Button
            variant="outline"
            className="border-2 border-black font-black h-10 hover:bg-neutral-100"
            onClick={() => {
              setStatusFilter("all");
              setSourceFilter("all");
            }}
          >
            Clear Filters
          </Button>
        )}

        <div className="ml-auto flex items-center text-sm font-bold text-neutral-500">
          {filtered.length} of {entries.length} messages
        </div>
      </div>

      {/* ── Table ── */}
      <div className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="px-4 py-2 bg-black flex items-center justify-between">
          <span className="font-black text-sm text-white uppercase tracking-widest">
            Message Log
          </span>
          {loading && (
            <RefreshCw className="w-4 h-4 text-neutral-400 animate-spin" />
          )}
        </div>

        <div className="overflow-x-auto bg-white">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-black bg-neutral-50">
                <TableHead className="font-black text-black text-[11px] uppercase tracking-wide">Source</TableHead>
                <TableHead className="font-black text-black text-[11px] uppercase tracking-wide">Contact</TableHead>
                <TableHead className="font-black text-black text-[11px] uppercase tracking-wide">Phone</TableHead>
                <TableHead className="font-black text-black text-[11px] uppercase tracking-wide">Template / Invoice</TableHead>
                <TableHead className="font-black text-black text-[11px] uppercase tracking-wide">Status</TableHead>
                <TableHead className="font-black text-black text-[11px] uppercase tracking-wide">Ticks</TableHead>
                <TableHead className="font-black text-black text-[11px] uppercase tracking-wide">Sent At</TableHead>
                <TableHead className="font-black text-black text-[11px] uppercase tracking-wide">Delivered</TableHead>
                <TableHead className="font-black text-black text-[11px] uppercase tracking-wide">Read</TableHead>
                <TableHead className="font-black text-black text-[11px] uppercase tracking-wide">Reply</TableHead>
                <TableHead className="font-black text-black text-[11px] uppercase tracking-wide">Failure</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-16">
                    <RefreshCw className="animate-spin mx-auto mb-2 text-neutral-400" size={24} />
                    <p className="text-neutral-400 font-bold">Loading…</p>
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="text-center py-16">
                    <MessageSquare className="mx-auto mb-2 text-neutral-200" size={32} />
                    <p className="text-neutral-400 font-bold">
                      No messages found
                      {statusFilter !== "all" ? ` with status "${statusFilter}"` : ""}
                      {sourceFilter !== "all" ? ` from "${sourceFilter}"` : ""}
                      {` between ${dates.from} and ${dates.to}`}
                    </p>
                    <p className="text-neutral-400 text-sm mt-1">
                      Try adjusting the date range or click Sync to pull new data.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((entry) => {
                  const isRead = entry.status === "read";
                  const isFailed = entry.status === "failed";
                  const hasReply = !!entry.replyText;

                  return (
                    <TableRow
                      key={entry._id}
                      className={cn(
                        "border-b transition-colors",
                        isFailed && "bg-red-50",
                        isRead && !isFailed && "bg-blue-50/30",
                        hasReply && !isFailed && !isRead && "bg-purple-50/20",
                      )}
                    >
                      {/* Source badge */}
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 border-2",
                            entry.source === "invoice"
                              ? "bg-neutral-900 text-white border-neutral-900"
                              : "bg-white text-black border-black",
                          )}
                        >
                          {entry.source === "invoice" ? (
                            <FileText size={9} />
                          ) : (
                            <Send size={9} />
                          )}
                          {entry.source === "invoice" ? "Invoice" : "Template"}
                        </span>
                      </TableCell>

                      {/* Contact */}
                      <TableCell className="font-semibold text-sm max-w-[120px] truncate">
                        {entry.contactName ?? "—"}
                      </TableCell>

                      {/* Phone */}
                      <TableCell className="font-mono text-xs text-neutral-500">
                        {entry.phone ?? "—"}
                      </TableCell>

                      {/* Template / Invoice */}
                      <TableCell className="max-w-[160px]">
                        {entry.invoiceNumber && (
                          <span className="font-mono font-black text-xs">
                            #{entry.invoiceNumber}
                          </span>
                        )}
                        {entry.templateName && (
                          <span className="text-xs font-bold text-neutral-600 block">
                            {entry.templateName}
                          </span>
                        )}
                        {!entry.invoiceNumber && !entry.templateName && entry.message && (
                          <span className="text-xs text-neutral-400 truncate block max-w-[140px]" title={entry.message}>
                            {entry.message.slice(0, 40)}…
                          </span>
                        )}
                      </TableCell>

                      {/* Status badge */}
                      <TableCell>
                        <StatusBadge status={entry.status} />
                      </TableCell>

                      {/* Tick icon — blue for read */}
                      <TableCell>
                        <TickIcon status={entry.status} />
                      </TableCell>

                      {/* Sent at */}
                      <TableCell className="text-xs text-neutral-500 whitespace-nowrap">
                        {fmt(entry.sentAt)}
                      </TableCell>

                      {/* Delivered */}
                      <TableCell className="text-xs whitespace-nowrap">
                        {entry.deliveredAt ? (
                          <span className="text-neutral-500 font-semibold flex items-center gap-1">
                            <CheckCheck size={12} className="text-neutral-400" />
                            {fmt(entry.deliveredAt)}
                          </span>
                        ) : (
                          <span className="text-neutral-300">—</span>
                        )}
                      </TableCell>

                      {/* Read — blue ticks */}
                      <TableCell className="text-xs whitespace-nowrap">
                        {entry.readAt ? (
                          <span className="text-blue-600 font-semibold flex items-center gap-1">
                            <CheckCheck size={12} className="text-blue-500" />
                            {fmt(entry.readAt)}
                          </span>
                        ) : (
                          <span className="text-neutral-300">—</span>
                        )}
                      </TableCell>

                      {/* Reply */}
                      <TableCell className="max-w-[180px]">
                        {hasReply ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1">
                              <Reply size={10} className="text-purple-500 shrink-0" />
                              <span className="text-[10px] font-black text-purple-600 uppercase tracking-wide">
                                Replied
                              </span>
                            </div>
                            <p
                              className="text-xs text-neutral-700 truncate max-w-[160px] font-medium"
                              title={entry.replyText}
                            >
                              {entry.replyText}
                            </p>
                            {entry.replyAt && (
                              <p className="text-[10px] text-neutral-400">
                                {fmt(entry.replyAt)}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-neutral-300 text-xs">—</span>
                        )}
                      </TableCell>

                      {/* Failure */}
                      <TableCell className="text-xs max-w-[160px]">
                        {isFailed ? (
                          <span className="text-red-700 font-bold">
                            {entry.failCode ? `[${entry.failCode}] ` : ""}
                            {entry.failReason ?? "Unknown error"}
                          </span>
                        ) : (
                          <span className="text-neutral-300">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ── Legend ── */}
      <div className="border-2 border-black p-4 bg-neutral-50 flex flex-wrap gap-x-6 gap-y-2 text-xs">
        <span className="font-black text-black uppercase tracking-widest">Legend</span>
        <span className="flex items-center gap-1.5">
          <Check size={12} className="text-neutral-400" />
          <strong>Sent</strong> — dispatched to Meta
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCheck size={12} className="text-neutral-500" />
          <strong>Delivered</strong> — reached recipient's device
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCheck size={12} className="text-blue-500" />
          <strong className="text-blue-700">Read</strong> — recipient opened message
        </span>
        <span className="flex items-center gap-1.5">
          <Reply size={12} className="text-purple-500" />
          <strong className="text-purple-700">Replied</strong> — client sent a text back
        </span>
        <span className="flex items-center gap-1.5">
          <XCircle size={12} className="text-red-500" />
          <strong className="text-red-700">Failed</strong> — delivery error (code shown)
        </span>
      </div>
    </div>
  );
}
