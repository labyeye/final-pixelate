"use client";

import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Clock,
  XCircle,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DeliveryEntry {
  _id: string;
  invoiceNumber?: string;
  clientName?: string;
  phone?: string;
  amount?: number | string;
  whatsapp_sent_at?: string;
  whatsapp_message_id?: string;
  whatsapp_send_status?: "sent" | "delivered" | "read" | "failed";
  whatsapp_delivered_at?: string;
  whatsapp_read_at?: string;
  whatsapp_failed_at?: string;
  whatsapp_fail_code?: number;
  whatsapp_fail_reason?: string;
}

const STATUS_CONFIG = {
  sent: {
    label: "Sent",
    icon: Check,
    className: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCheck,
    className: "bg-blue-100 text-blue-800 border-blue-300",
  },
  read: {
    label: "Read",
    icon: CheckCheck,
    className: "bg-green-100 text-green-800 border-green-300",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "bg-red-100 text-red-800 border-red-300",
  },
} as const;

function StatusBadge({ status }: { status?: string }) {
  if (!status) return <span className="text-muted-foreground text-xs">—</span>;
  const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
  if (!cfg) return <Badge variant="outline">{status}</Badge>;
  const Icon = cfg.icon;
  return (
    <Badge
      variant="outline"
      className={cn(
        "flex items-center gap-1 font-semibold text-xs px-2 py-0.5 w-fit",
        cfg.className,
      )}
    >
      <Icon size={12} />
      {cfg.label}
    </Badge>
  );
}

function formatTs(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function wamidShort(wamid?: string) {
  if (!wamid) return "—";
  
  return "…" + wamid.slice(-20);
}

export default function WhatsAppWebhookPage() {
  const [entries, setEntries] = useState<DeliveryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status: statusFilter,
        limit: "200",
      });
      const res = await fetch(`/api/whatsapp/delivery-log?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEntries(data);
      setLastRefreshed(new Date());
    } catch {
      
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(fetchData, 10_000);
    return () => clearInterval(id);
  }, [autoRefresh, fetchData]);

  
  const counts = entries.reduce(
    (acc, e) => {
      const s = e.whatsapp_send_status ?? "sent";
      acc[s] = (acc[s] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className="space-y-6">
      {}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-green-600" />
            WhatsApp Webhook Log
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time delivery status for every WhatsApp message sent by this
            system
          </p>
          {lastRefreshed && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Last updated: {lastRefreshed.toLocaleTimeString("en-IN")}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 border-2 border-black font-bold">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            className={cn(
              "border-2 border-black font-bold",
              autoRefresh && "bg-green-600 text-white hover:bg-green-700",
            )}
            onClick={() => setAutoRefresh((v) => !v)}
          >
            {autoRefresh ? "Auto ✓" : "Auto Refresh"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="border-2 border-black font-bold"
            onClick={fetchData}
            disabled={loading}
          >
            <RefreshCw
              size={14}
              className={cn("mr-1", loading && "animate-spin")}
            />
            Refresh
          </Button>
        </div>
      </div>

      {}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(["sent", "delivered", "read", "failed"] as const).map((s) => {
          const cfg = STATUS_CONFIG[s];
          const Icon = cfg.icon;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-xl border-2 border-black p-4 text-left shadow-[2px_2px_0px_black] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all",
                statusFilter === s ? "bg-black text-white" : "bg-white",
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} />
                <span className="text-xs font-bold uppercase tracking-wide">
                  {cfg.label}
                </span>
              </div>
              <div className="text-3xl font-black">{counts[s] ?? 0}</div>
            </button>
          );
        })}
      </div>

      {}
      <div className="rounded-xl border-2 border-black overflow-hidden shadow-[3px_3px_0px_black]">
        <div className="bg-black text-white px-4 py-2 flex items-center justify-between">
          <span className="font-bold text-sm">
            {entries.length} message{entries.length !== 1 ? "s" : ""}
            {statusFilter !== "all" ? ` • ${statusFilter}` : ""}
          </span>
          {autoRefresh && (
            <span className="text-xs text-green-400 font-mono animate-pulse">
              ● live
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b-2 border-black">
                <TableHead className="font-black text-black">Invoice</TableHead>
                <TableHead className="font-black text-black">Client</TableHead>
                <TableHead className="font-black text-black">Phone</TableHead>
                <TableHead className="font-black text-black">Status</TableHead>
                <TableHead className="font-black text-black">
                  Accepted by Meta
                </TableHead>
                <TableHead className="font-black text-black">Sent</TableHead>
                <TableHead className="font-black text-black">
                  Delivered
                </TableHead>
                <TableHead className="font-black text-black">Read</TableHead>
                <TableHead className="font-black text-black">wamid</TableHead>
                <TableHead className="font-black text-black">
                  Failure Reason
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && entries.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-16 text-muted-foreground"
                  >
                    <RefreshCw
                      className="animate-spin mx-auto mb-2"
                      size={24}
                    />
                    Loading…
                  </TableCell>
                </TableRow>
              ) : entries.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-16 text-muted-foreground"
                  >
                    No WhatsApp messages found
                    {statusFilter !== "all"
                      ? ` with status "${statusFilter}"`
                      : ""}
                    .
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry) => (
                  <TableRow
                    key={entry._id}
                    className={cn(
                      "border-b border-gray-200 hover:bg-gray-50 transition-colors",
                      entry.whatsapp_send_status === "failed" && "bg-red-50",
                      entry.whatsapp_send_status === "read" && "bg-green-50/40",
                    )}
                  >
                    <TableCell className="font-mono font-bold text-sm">
                      {entry.invoiceNumber ?? "—"}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {entry.clientName ?? "—"}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {entry.phone ?? "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={entry.whatsapp_send_status} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTs(entry.whatsapp_sent_at)}
                    </TableCell>
                    {}
                    <TableCell className="text-xs whitespace-nowrap">
                      {entry.whatsapp_send_status === "sent" ||
                      entry.whatsapp_send_status === "delivered" ||
                      entry.whatsapp_send_status === "read" ? (
                        <span className="text-yellow-700 font-semibold">
                          ✓ sent
                        </span>
                      ) : entry.whatsapp_send_status === "failed" ? (
                        <span className="text-red-500">✗</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs whitespace-nowrap">
                      {entry.whatsapp_delivered_at ? (
                        <span
                          className="text-blue-700 font-semibold"
                          title={formatTs(entry.whatsapp_delivered_at)}
                        >
                          ✓✓ {formatTs(entry.whatsapp_delivered_at)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs whitespace-nowrap">
                      {entry.whatsapp_read_at ? (
                        <span
                          className="text-green-700 font-semibold"
                          title={formatTs(entry.whatsapp_read_at)}
                        >
                          ✓✓ {formatTs(entry.whatsapp_read_at)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell
                      className="font-mono text-xs text-muted-foreground max-w-[180px] truncate"
                      title={entry.whatsapp_message_id}
                    >
                      {wamidShort(entry.whatsapp_message_id)}
                    </TableCell>
                    <TableCell className="text-xs max-w-[200px]">
                      {entry.whatsapp_send_status === "failed" ? (
                        <span className="text-red-700 font-semibold">
                          {entry.whatsapp_fail_code
                            ? `[${entry.whatsapp_fail_code}] `
                            : ""}
                          {entry.whatsapp_fail_reason ?? "Unknown error"}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground border-t pt-4">
        <span className="font-bold text-black">Legend:</span>
        <span>
          <strong className="text-yellow-700">Accepted by Meta</strong> —
          timestamp when our server sent the message to Meta&apos;s API
        </span>
        <span>
          <strong className="text-yellow-700">Sent</strong> — confirmed via
          webhook that Meta dispatched it to the recipient
        </span>
        <span>
          <strong className="text-blue-700">Delivered</strong> —
          recipient&apos;s device received it
        </span>
        <span>
          <strong className="text-green-700">Read</strong> — recipient opened it
        </span>
        <span>
          <strong className="text-red-700">Failed</strong> — delivery failed
          (error code shown)
        </span>
      </div>
    </div>
  );
}
