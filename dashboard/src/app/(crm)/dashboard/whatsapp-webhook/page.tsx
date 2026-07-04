"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState, useCallback } from "react";
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

// WhatsApp brand palette
const WA_DARK = "#075E54";
const WA_TEAL = "#128C7E";
const WA_GREEN = "#25D366";
const WA_CHAT_BG = "#ECE5DD";
const WA_BUBBLE = "#DCF8C6";

const STATUS_CONFIG = {
  sent: {
    label: "Sent",
    icon: Check,
    tick: "text-gray-500",
    chip: "bg-gray-100 text-gray-700 border-gray-300",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCheck,
    tick: "text-gray-500",
    chip: "bg-gray-100 text-gray-700 border-gray-300",
  },
  read: {
    label: "Read",
    icon: CheckCheck,
    tick: "text-[#53bdeb]",
    chip: "bg-[#e7f8f3] text-[#075E54] border-[#25D366]",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    tick: "text-red-500",
    chip: "bg-red-50 text-red-700 border-red-400",
  },
} as const;

function StatusBadge({ status }: { status?: string }) {
  if (!status) return <span className="text-xs text-neutral-400">—</span>;
  const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
  if (!cfg)
    return (
      <span className="text-xs font-bold px-2 py-0.5 border border-neutral-300">
        {status}
      </span>
    );
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-bold text-[11px] uppercase tracking-wide px-2 py-0.5 border",
        cfg.chip,
      )}
    >
      <Icon size={12} className={cfg.tick} />
      {cfg.label}
    </span>
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
      const res = await apiFetch(`/api/whatsapp/delivery-log?${params}`);
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
    <div
      className="min-h-screen -m-4 sm:-m-6 lg:-m-8"
      style={{ backgroundColor: WA_CHAT_BG, fontFamily: "inherit" }}
    >
      {/* Top app bar, WhatsApp Web style */}
      <div
        className="flex items-center justify-between px-6 py-4 flex-wrap gap-4"
        style={{ backgroundColor: WA_DARK }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 flex items-center justify-center"
            style={{ backgroundColor: WA_TEAL }}
          >
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white uppercase">
              WhatsApp Webhook Log
            </h1>
            <p className="text-[11px] text-white/70">
              Real-time delivery status for every WhatsApp message sent
              {lastRefreshed && (
                <> · Last updated {lastRefreshed.toLocaleTimeString("en-IN")}</>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 rounded-none border-0 bg-white/10 text-white font-bold focus:ring-0">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Button
            size="sm"
            className={cn(
              "rounded-none font-bold border-0",
              autoRefresh
                ? "text-white hover:opacity-90"
                : "bg-white/10 text-white hover:bg-white/20",
            )}
            style={autoRefresh ? { backgroundColor: WA_GREEN } : undefined}
            onClick={() => setAutoRefresh((v) => !v)}
          >
            {autoRefresh ? "Auto ✓" : "Auto Refresh"}
          </Button>

          <Button
            size="sm"
            className="rounded-none font-bold border-0 bg-white/10 text-white hover:bg-white/20"
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

      <div className="p-6 space-y-5">
        {/* Status tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border" style={{ borderColor: WA_DARK }}>
          {(["sent", "delivered", "read", "failed"] as const).map((s, i) => {
            const cfg = STATUS_CONFIG[s];
            const Icon = cfg.icon;
            const active = statusFilter === s;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(active ? "all" : s)}
                className={cn(
                  "p-4 text-left transition-colors border-r last:border-r-0",
                  i > 0 && "border-l-0",
                )}
                style={{
                  borderColor: WA_DARK,
                  backgroundColor: active ? WA_DARK : "#ffffff",
                  color: active ? "#ffffff" : "#111111",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={16} style={{ color: active ? WA_GREEN : WA_TEAL }} />
                  <span className="text-[11px] font-black uppercase tracking-widest">
                    {cfg.label}
                  </span>
                </div>
                <div className="text-3xl font-black">{counts[s] ?? 0}</div>
              </button>
            );
          })}
        </div>

        {/* Table panel */}
        <div className="border" style={{ borderColor: WA_DARK }}>
          <div
            className="px-4 py-2 flex items-center justify-between"
            style={{ backgroundColor: WA_DARK }}
          >
            <span className="font-bold text-sm text-white">
              {entries.length} message{entries.length !== 1 ? "s" : ""}
              {statusFilter !== "all" ? ` · ${statusFilter}` : ""}
            </span>
            {autoRefresh && (
              <span
                className="text-xs font-mono animate-pulse"
                style={{ color: WA_GREEN }}
              >
                ● live
              </span>
            )}
          </div>

          <div className="overflow-x-auto bg-white">
            <Table>
              <TableHeader>
                <TableRow
                  className="border-b-2"
                  style={{ borderColor: WA_DARK, backgroundColor: WA_CHAT_BG }}
                >
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
                      className="text-center py-16 text-neutral-400"
                    >
                      <RefreshCw
                        className="animate-spin mx-auto mb-2"
                        size={24}
                        style={{ color: WA_TEAL }}
                      />
                      Loading…
                    </TableCell>
                  </TableRow>
                ) : entries.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="text-center py-16 text-neutral-400"
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
                        "border-b transition-colors hover:bg-[#ECE5DD]/40",
                        entry.whatsapp_send_status === "failed" && "bg-red-50",
                        entry.whatsapp_send_status === "read" &&
                          "bg-[#dcf8c6]/25",
                      )}
                    >
                      <TableCell className="font-mono font-bold text-sm">
                        {entry.invoiceNumber ?? "—"}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {entry.clientName ?? "—"}
                      </TableCell>
                      <TableCell className="font-mono text-sm text-neutral-500">
                        {entry.phone ?? "—"}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={entry.whatsapp_send_status} />
                      </TableCell>
                      <TableCell className="text-xs text-neutral-500 whitespace-nowrap">
                        {formatTs(entry.whatsapp_sent_at)}
                      </TableCell>
                      <TableCell className="text-xs whitespace-nowrap">
                        {entry.whatsapp_send_status === "sent" ||
                        entry.whatsapp_send_status === "delivered" ||
                        entry.whatsapp_send_status === "read" ? (
                          <span
                            className="font-semibold"
                            style={{ color: WA_TEAL }}
                          >
                            ✓ sent
                          </span>
                        ) : entry.whatsapp_send_status === "failed" ? (
                          <span className="text-red-500">✗</span>
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs whitespace-nowrap">
                        {entry.whatsapp_delivered_at ? (
                          <span
                            className="font-semibold text-gray-500"
                            title={formatTs(entry.whatsapp_delivered_at)}
                          >
                            ✓✓ {formatTs(entry.whatsapp_delivered_at)}
                          </span>
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs whitespace-nowrap">
                        {entry.whatsapp_read_at ? (
                          <span
                            className="font-semibold"
                            style={{ color: "#53bdeb" }}
                            title={formatTs(entry.whatsapp_read_at)}
                          >
                            ✓✓ {formatTs(entry.whatsapp_read_at)}
                          </span>
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )}
                      </TableCell>
                      <TableCell
                        className="font-mono text-xs text-neutral-500 max-w-[180px] truncate"
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
                          <span className="text-neutral-400">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Legend, styled like a WhatsApp chat bubble strip */}
        <div
          className="flex flex-wrap gap-4 text-xs p-4 border"
          style={{ borderColor: WA_DARK, backgroundColor: WA_BUBBLE }}
        >
          <span className="font-black text-black">Legend:</span>
          <span>
            <strong style={{ color: WA_TEAL }}>Accepted by Meta</strong> —
            timestamp when our server sent the message to Meta&apos;s API
          </span>
          <span>
            <strong style={{ color: WA_TEAL }}>Sent</strong> — confirmed via
            webhook that Meta dispatched it to the recipient
          </span>
          <span>
            <strong className="text-gray-600">Delivered</strong> —
            recipient&apos;s device received it
          </span>
          <span>
            <strong style={{ color: "#53bdeb" }}>Read</strong> — recipient
            opened it
          </span>
          <span>
            <strong className="text-red-700">Failed</strong> — delivery failed
            (error code shown)
          </span>
        </div>
      </div>
    </div>
  );
}
