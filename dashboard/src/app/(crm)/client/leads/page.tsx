"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";



interface StatusHistoryEntry {
  from: string;
  to: string;
  changedAt: string;
}

interface Lead {
  _id?: string;
  id?: string;
  clientId?: string;
  metaLeadId?: string;
  name: string;
  phone?: string;
  email?: string;
  city?: string;
  source?: string;
  campaignName?: string;
  adSetName?: string;
  adName?: string;
  formName?: string;
  status: string;
  notes?: string;
  followUpDate?: string;
  createdAt?: string;
  metaFields?: Record<string, string>;
  statusHistory?: StatusHistoryEntry[];
}



const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; dot: string }
> = {
  "not called": {
    label: "Not Called",
    color: "text-gray-700",
    bg: "bg-gray-100",
    dot: "bg-gray-400",
  },
  called: {
    label: "Called",
    color: "text-blue-700",
    bg: "bg-blue-100",
    dot: "bg-blue-500",
  },
  interested: {
    label: "Interested",
    color: "text-green-700",
    bg: "bg-green-100",
    dot: "bg-green-500",
  },
  "meeting booked": {
    label: "Meeting Booked",
    color: "text-purple-700",
    bg: "bg-purple-100",
    dot: "bg-purple-500",
  },
  "not interested": {
    label: "Not Interested",
    color: "text-red-700",
    bg: "bg-red-100",
    dot: "bg-red-400",
  },
  "call back later": {
    label: "Call Back Later",
    color: "text-yellow-700",
    bg: "bg-yellow-100",
    dot: "bg-yellow-400",
  },
  other: {
    label: "Other",
    color: "text-slate-700",
    bg: "bg-slate-100",
    dot: "bg-slate-400",
  },
};

const ALL_STATUSES = Object.keys(STATUS_CONFIG);



function getAuthHeaders() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["other"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}



function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  confirmClass = "bg-black text-white font-black border-2 border-black hover:bg-gray-800",
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  confirmClass?: string;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white border-2 border-black rounded-xl shadow-2xl w-full max-w-sm p-6">
        <h3 className="font-black text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 px-4 border-2 border-black rounded-lg font-bold text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2 px-4 rounded-lg text-sm ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}



function LeadModal({
  lead,
  onClose,
  onSave,
}: {
  lead: Lead;
  onClose: () => void;
  onSave: (
    id: string,
    updates: Partial<Lead>,
  ) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [status, setStatus] = useState(lead.status || "not called");
  const [notes, setNotes] = useState(lead.notes || "");
  const [followUpDate, setFollowUpDate] = useState(lead.followUpDate || "");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState(false);

  const handleSaveClick = () => {
    setSaveError(null);
    setConfirm(true);
  };

  const handleConfirm = async () => {
    setConfirm(false);
    setSaving(true);
    const result = await onSave(String(lead._id || lead.id), {
      status,
      notes,
      followUpDate,
    });
    setSaving(false);
    if (result.ok) {
      onClose();
    } else {
      setSaveError(result.error || "Failed to save. Please try again.");
    }
  };

  const extraFields = lead.metaFields
    ? Object.entries(lead.metaFields).filter(
        ([k]) =>
          ![
            "full_name",
            "name",
            "phone_number",
            "phone",
            "mobile_number",
            "contact_number",
            "mobile",
            "whatsapp_number",
            "email",
            "email_address",
            "first_name",
            "last_name",
          ].includes(k),
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white border-2 border-black rounded-xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto">
        {}
        <div className="sticky top-0 bg-black text-white px-5 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="font-black text-lg">{lead.name}</h2>
            <p className="text-gray-300 text-xs mt-0.5">
              {lead.campaignName || lead.source || "Meta Ads"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl leading-none font-black"
          >
            ×
          </button>
        </div>

        <div className="p-5 space-y-5">
          {}
          <div className="grid grid-cols-2 gap-3">
            {lead.phone && (
              <div className="border-2 border-black rounded-lg p-3">
                <p className="text-xs font-bold text-gray-500 mb-1">PHONE</p>
                <a
                  href={`tel:${lead.phone}`}
                  className="font-black text-blue-700 hover:underline text-sm"
                >
                  {lead.phone}
                </a>
                <div className="flex gap-2 mt-2">
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex-1 text-center text-xs py-1.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                  >
                    📞 Call
                  </a>
                  <a
                    href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-xs py-1.5 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            )}
            {lead.email && (
              <div className="border-2 border-black rounded-lg p-3">
                <p className="text-xs font-bold text-gray-500 mb-1">EMAIL</p>
                <a
                  href={`mailto:${lead.email}`}
                  className="font-black text-blue-700 hover:underline text-sm break-all"
                >
                  {lead.email}
                </a>
                <a
                  href={`mailto:${lead.email}`}
                  className="block mt-2 text-center text-xs py-1.5 bg-gray-800 text-white rounded-lg font-bold hover:bg-black"
                >
                  ✉ Send Email
                </a>
              </div>
            )}
          </div>

          {}
          <div className="border-2 border-black rounded-lg p-3 bg-blue-50 space-y-1.5">
            <p className="text-xs font-black text-gray-500 uppercase mb-2">
              Ad Campaign Info
            </p>
            {lead.campaignName && (
              <p className="text-xs font-semibold">
                📢 <span className="font-black">{lead.campaignName}</span>
              </p>
            )}
            {lead.adSetName && (
              <p className="text-xs text-gray-600">
                🎯 Ad Set: {lead.adSetName}
              </p>
            )}
            {lead.adName && (
              <p className="text-xs text-gray-600">📄 Ad: {lead.adName}</p>
            )}
            {lead.formName && (
              <p className="text-xs text-gray-600">📋 Form: {lead.formName}</p>
            )}
            {lead.createdAt && (
              <p className="text-xs text-gray-500">
                🕐 Submitted:{" "}
                {new Date(lead.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>

          {}
          {extraFields.length > 0 && (
            <div className="border-2 border-black rounded-lg p-3">
              <p className="text-xs font-black text-gray-500 uppercase mb-2">
                Form Responses
              </p>
              <div className="space-y-1.5">
                {extraFields.map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs">
                    <span className="font-bold text-gray-600 capitalize">
                      {k.replace(/_/g, " ")}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {v || "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {}
          <div className="border-2 border-black rounded-lg p-3">
            <p className="text-xs font-black text-gray-500 uppercase mb-2">
              Lead Status
            </p>
            <div className="grid grid-cols-2 gap-2">
              {ALL_STATUSES.map((s) => {
                const cfg = STATUS_CONFIG[s];
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`text-xs font-bold py-2 px-3 rounded-lg border-2 transition-all text-left flex items-center gap-2
                      ${status === s ? `border-black ${cfg.bg} ${cfg.color}` : "border-gray-200 text-gray-500 hover:border-gray-400"}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${status === s ? cfg.dot : "bg-gray-300"}`}
                    />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {}
          <div className="border-2 border-black rounded-lg p-3">
            <p className="text-xs font-black text-gray-500 uppercase mb-2">
              Follow-up Date
            </p>
            <input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black rounded-lg text-sm font-semibold"
            />
          </div>

          {}
          <div className="border-2 border-black rounded-lg p-3">
            <p className="text-xs font-black text-gray-500 uppercase mb-2">
              Notes
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add call notes, follow-up details..."
              rows={3}
              className="w-full px-3 py-2 border-2 border-black rounded-lg text-sm font-semibold resize-none focus:outline-none"
            />
          </div>

          {}
          {lead.statusHistory && lead.statusHistory.length > 0 && (
            <div className="border-2 border-black rounded-lg p-3">
              <p className="text-xs font-black text-gray-500 uppercase mb-3">
                Status History
              </p>
              <div className="relative pl-4">
                <div className="absolute left-1.5 top-0 bottom-0 w-px bg-gray-200" />
                {[...lead.statusHistory].reverse().map((h, i) => {
                  const fromCfg =
                    STATUS_CONFIG[h.from] || STATUS_CONFIG["other"];
                  const toCfg = STATUS_CONFIG[h.to] || STATUS_CONFIG["other"];
                  return (
                    <div key={i} className="relative mb-3 last:mb-0">
                      <span
                        className={`absolute -left-[11px] w-3 h-3 rounded-full border-2 border-white ${toCfg.dot}`}
                      />
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${fromCfg.bg} ${fromCfg.color}`}
                        >
                          {fromCfg.label}
                        </span>
                        <span className="text-xs text-gray-400">→</span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${toCfg.bg} ${toCfg.color}`}
                        >
                          {toCfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(h.changedAt).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {}
          {saveError && (
            <div className="border-2 border-red-400 bg-red-50 rounded-lg px-4 py-3 text-sm font-bold text-red-700">
              ⚠ {saveError}
            </div>
          )}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-2 border-black font-bold"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveClick}
              disabled={saving}
              className="flex-1 bg-black text-white font-black border-2 border-black hover:bg-gray-800"
            >
              {saving ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>

      {confirm && (
        <ConfirmModal
          title="Save Changes?"
          message={
            status !== lead.status
              ? `Change status from "${STATUS_CONFIG[lead.status]?.label || lead.status}" to "${STATUS_CONFIG[status]?.label || status}"${notes !== lead.notes || followUpDate !== lead.followUpDate ? " and update notes/follow-up date" : ""}?`
              : "Save notes and follow-up date changes?"
          }
          confirmLabel="Yes, Save"
          onConfirm={handleConfirm}
          onCancel={() => setConfirm(false)}
        />
      )}
    </div>
  );
}



export default function ClientLeadsPage() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<any>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [dateSortDir, setDateSortDir] = useState<"asc" | "desc">("desc");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/leads", { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.role !== "client") return;
    fetchLeads();
  }, [user]);

  const handleSyncFbLeads = async () => {
    if (!user?.clientId) return;
    setSyncing(true);
    setSyncError(null);
    setSyncResult(null);
    try {
      const res = await fetch("/api/client-leads/sync", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ clientId: user.clientId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSyncError(data.error || "Sync failed");
        return;
      }
      setSyncResult(data);
      await fetchLeads();
    } catch (e: any) {
      setSyncError(e.message || "Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  const handleSaveLead = async (
    id: string,
    updates: Partial<Lead>,
  ): Promise<{ ok: boolean; error?: string }> => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return {
          ok: false,
          error: data.error || `Server error (${res.status})`,
        };
      }
      await res.json();
      setLeads((prev) =>
        prev.map((l) =>
          String(l._id || l.id) !== id ? l : { ...l, ...updates },
        ),
      );
      setSelectedLead((prev) => (prev ? { ...prev, ...updates } : prev));
      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: e.message || "Network error" };
    }
  };

  
  const stats = useMemo(() => {
    const total = leads.length;
    const converted = leads.filter(
      (l) => l.status === "interested" || l.status === "meeting booked",
    ).length;
    const notCalled = leads.filter(
      (l) => !l.status || l.status === "not called",
    ).length;
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const newThisMonth = leads.filter(
      (l) => l.createdAt && new Date(l.createdAt) >= monthStart,
    ).length;
    return {
      total,
      converted,
      notCalled,
      newThisMonth,
      conversionRate: total > 0 ? Math.round((converted / total) * 100) : 0,
    };
  }, [leads]);

  
  const campaigns = useMemo(
    () =>
      Array.from(
        new Set(leads.map((l) => l.campaignName).filter(Boolean)),
      ) as string[],
    [leads],
  );

  
  const getCity = (lead: Lead): string => {
    if (lead.city) return lead.city;
    if (lead.metaFields) {
      const cityKey = Object.keys(lead.metaFields).find((k) =>
        ["city", "location", "town", "district"].includes(k.toLowerCase()),
      );
      if (cityKey) return lead.metaFields[cityKey];
    }
    return "";
  };

  
  const filtered = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    const result = leads.filter((l) => {
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        l.name?.toLowerCase().includes(q) ||
        l.phone?.includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.campaignName?.toLowerCase().includes(q) ||
        getCity(l).toLowerCase().includes(q);
      const matchStatus = !statusFilter || l.status === statusFilter;
      const matchCampaign =
        !campaignFilter || l.campaignName === campaignFilter;
      let matchDate = true;
      if (dateFilter && l.createdAt) {
        const d = new Date(l.createdAt);
        if (dateFilter === "today")
          matchDate = l.createdAt.slice(0, 10) === todayStr;
        else if (dateFilter === "week") matchDate = d >= weekStart;
        else if (dateFilter === "month") matchDate = d >= monthStart;
        else if (dateFilter === "last_month")
          matchDate = d >= lastMonthStart && d <= lastMonthEnd;
      } else if (dateFilter) {
        matchDate = false;
      }
      return matchSearch && matchStatus && matchCampaign && matchDate;
    });

    result.sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateSortDir === "desc" ? db - da : da - db;
    });

    return result;
  }, [leads, search, statusFilter, campaignFilter, dateFilter, dateSortDir]);

  
  const followUpsDue = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return leads.filter(
      (l) =>
        l.followUpDate &&
        l.followUpDate <= today &&
        l.status !== "not interested",
    );
  }, [leads]);

  if (!user || user.role !== "client") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="border-2 border-black rounded-xl p-8 text-center">
          <h2 className="text-xl font-black">Access Denied</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-headline p-6 space-y-6">
      {}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">
            Lead Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Track, manage and follow up on your leads
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Button
            onClick={handleSyncFbLeads}
            disabled={syncing}
            className="bg-blue-600 hover:bg-blue-700 text-white border-2 border-black font-bold"
          >
            {syncing ? "Syncing…" : "⟳ Sync from Facebook Ads"}
          </Button>
          {syncResult && (
            <p className="text-xs font-semibold text-green-700">
              ✓ {syncResult.synced} new · {syncResult.skipped} existing ·{" "}
              {syncResult.total} total found
            </p>
          )}
          {syncError && (
            <p className="text-xs font-semibold text-red-600">⚠ {syncError}</p>
          )}
        </div>
      </div>

      {}
      {followUpsDue.length > 0 && (
        <div className="border-2 border-orange-400 bg-orange-50 rounded-xl px-4 py-3 flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm font-bold text-orange-800">
            🔔 {followUpsDue.length} follow-up
            {followUpsDue.length > 1 ? "s" : ""} due today —{" "}
            {followUpsDue
              .map((l) => l.name)
              .slice(0, 3)
              .join(", ")}
            {followUpsDue.length > 3 && ` +${followUpsDue.length - 3} more`}
          </p>
          <button
            onClick={() => setStatusFilter("")}
            className="text-xs font-bold text-orange-700 underline"
          >
            View All
          </button>
        </div>
      )}

      {}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          {
            label: "Total Leads",
            value: stats.total,
            color: "bg-gray-50",
            icon: "👥",
          },
          {
            label: "Not Called",
            value: stats.notCalled,
            color: "bg-red-50",
            icon: "📵",
          },
          {
            label: "Interested",
            value: stats.converted,
            color: "bg-green-50",
            icon: "✅",
          },
          {
            label: "This Month",
            value: stats.newThisMonth,
            color: "bg-blue-50",
            icon: "📅",
          },
          {
            label: "Conv. Rate",
            value: `${stats.conversionRate}%`,
            color: "bg-purple-50",
            icon: "🎯",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`border-2 border-black rounded-xl p-4 ${s.color}`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                {s.label}
              </span>
              <span className="text-base">{s.icon}</span>
            </div>
            <div className="text-2xl font-black">{s.value}</div>
          </div>
        ))}
      </div>

      {}
      <div className="border-2 border-black rounded-xl p-4">
        <p className="text-xs font-black text-gray-500 uppercase mb-3">
          Status Breakdown
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_STATUSES.map((s) => {
            const count = leads.filter((l) => l.status === s).length;
            if (count === 0) return null;
            const cfg = STATUS_CONFIG[s];
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all
                  ${statusFilter === s ? `border-black ${cfg.bg} ${cfg.color}` : "border-gray-200 hover:border-gray-400 text-gray-600"}`}
              >
                <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                {cfg.label} <span className="font-black">({count})</span>
              </button>
            );
          })}
          {statusFilter && (
            <button
              onClick={() => setStatusFilter("")}
              className="px-3 py-1.5 rounded-full border-2 border-gray-300 text-xs font-bold text-gray-500 hover:border-black"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {}
      <div className="border-2 border-black rounded-xl overflow-hidden">
        {}
        <div className="border-b-2 border-black px-4 py-3 bg-gray-50 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3 flex-1">
            <Input
              placeholder="Search name, phone, email, campaign..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 border-black font-semibold text-sm max-w-xs"
            />
            <select
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
              className="px-3 py-2 border-2 border-black rounded-md bg-white font-semibold text-sm"
            >
              <option value="">All Campaigns</option>
              {campaigns.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <span className="text-xs font-bold text-gray-500">
            {filtered.length} leads
          </span>
        </div>

        {}
        {loading ? (
          <div className="p-12 text-center text-muted-foreground font-semibold">
            Loading leads…
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-xl font-black">No leads found</p>
            <p className="text-sm text-gray-500 mt-1">
              Try syncing from Facebook Ads or adjust filters
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">
                    Lead
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">
                    City
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">
                    Campaign
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase min-w-[140px]">
                    <div className="flex flex-col gap-1">
                      <span>Campaign Status</span>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white text-black text-xs font-semibold rounded px-1 py-0.5 border border-gray-300 w-full"
                      >
                        <option value="">All</option>
                        {ALL_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {STATUS_CONFIG[s].label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">
                    Follow-up
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase">
                    Notes
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-black uppercase min-w-[150px]">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <span>Date</span>
                        <button
                          onClick={() =>
                            setDateSortDir((d) =>
                              d === "desc" ? "asc" : "desc",
                            )
                          }
                          className="text-gray-300 hover:text-white text-xs"
                          title={
                            dateSortDir === "desc"
                              ? "Newest first"
                              : "Oldest first"
                          }
                        >
                          {dateSortDir === "desc" ? "↓" : "↑"}
                        </button>
                      </div>
                      <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white text-black text-xs font-semibold rounded px-1 py-0.5 border border-gray-300 w-full"
                      >
                        <option value="">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">Last 7 Days</option>
                        <option value="month">This Month</option>
                        <option value="last_month">Last Month</option>
                      </select>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-black uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => {
                  const followUpDue =
                    lead.followUpDate &&
                    lead.followUpDate <= new Date().toISOString().slice(0, 10);
                  return (
                    <tr
                      key={String(lead._id || lead.id)}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-black text-sm">
                          {lead.name || "—"}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-sm font-semibold text-blue-700 hover:underline block"
                          >
                            {lead.phone}
                          </a>
                        )}
                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-xs text-gray-500 hover:underline block truncate max-w-[140px]"
                          >
                            {lead.email}
                          </a>
                        )}
                        {lead.phone && (
                          <a
                            href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-green-600 font-bold hover:underline mt-1"
                          >
                            💬 WhatsApp
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-700">
                        {getCity(lead) || (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 max-w-[160px]">
                        {lead.campaignName && (
                          <div className="text-xs font-black truncate">
                            📢 {lead.campaignName}
                          </div>
                        )}
                        {lead.adSetName && (
                          <div className="text-xs text-gray-500 truncate">
                            🎯 {lead.adSetName}
                          </div>
                        )}
                        {lead.formName && !lead.campaignName && (
                          <div className="text-xs text-gray-500 truncate">
                            📋 {lead.formName}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={lead.status || "not called"} />
                      </td>
                      <td className="px-4 py-3">
                        {lead.followUpDate ? (
                          <span
                            className={`text-xs font-bold ${followUpDue ? "text-red-600" : "text-gray-600"}`}
                          >
                            {followUpDue ? "🔔 " : "📅 "}
                            {new Date(lead.followUpDate).toLocaleDateString(
                              "en-IN",
                              { day: "2-digit", month: "short" },
                            )}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 max-w-[150px]">
                        <p className="text-xs text-gray-600 truncate">
                          {lead.notes || "—"}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 font-semibold whitespace-nowrap">
                        {lead.createdAt
                          ? new Date(lead.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "2-digit",
                              },
                            )
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button
                          size="sm"
                          className="text-xs font-bold border-2 border-black h-7 px-3 bg-white text-black hover:bg-black hover:text-white"
                          onClick={() => setSelectedLead(lead)}
                        >
                          Manage
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {}
      {selectedLead && (
        <LeadModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={handleSaveLead}
        />
      )}
    </div>
  );
}
