"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Lead } from "@/lib/data";
import {
  leadStatuses,
  leadStatusColors,
  priorityColors,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  Trash,
  LayoutList,
  Kanban,
  RefreshCw,
  Filter,
  Search,
  Download,
  Plus,
  ChevronRight,
  Calendar,
  Phone,
  Mail,
  AlertTriangle,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  ArrowUpRight,
  X,
  Loader2,
  Eye,
} from "lucide-react";
import Link from "next/link";

function getToken() {
  return localStorage.getItem("auth_token") || "";
}
function authH(): Record<string, string> {
  const t = getToken();
  return t
    ? { Authorization: "Bearer " + t, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}
function getRole(): string | null {
  try {
    const t = getToken();
    if (!t) return null;
    return JSON.parse(atob(t.split(".")[1])).role || null;
  } catch {
    return null;
  }
}

function formatDate(d?: Date | string | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function isOverdue(followUpDate?: Date | string | null) {
  if (!followUpDate) return false;
  return new Date(followUpDate) < new Date();
}

function KanbanCard({
  lead,
  onStatusChange,
  onDelete,
  role,
}: {
  lead: Lead;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  role: string | null;
}) {
  const router = useRouter();
  const id = String(lead._id || lead.id);
  const overdueFlag = isOverdue(lead.followUpDate);
  return (
    <div
      className="bg-white border-2 border-black p-3 space-y-2 cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all group"
      onClick={() => router.push(`/leads/${id}`)}
    >
      <div className="flex items-start justify-between gap-1">
        <span className="font-bold text-sm leading-tight">{lead.name}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
        >
          <Trash className="w-3.5 h-3.5" />
        </button>
      </div>
      {lead.phone && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Phone className="w-3 h-3" /> {lead.phone}
        </div>
      )}
      {lead.budget && (
        <div className="text-xs font-bold text-green-700">₹{lead.budget}</div>
      )}
      <div className="flex items-center gap-1 flex-wrap">
        {lead.source && (
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
            {lead.source}
          </span>
        )}
        {lead.priority && (
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full border ${priorityColors[lead.priority] || ""}`}
          >
            {lead.priority}
          </span>
        )}
        {overdueFlag && (
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" /> overdue
          </span>
        )}
      </div>
      {lead.assignedToName && (
        <div className="text-xs text-muted-foreground">
          @{lead.assignedToName}
        </div>
      )}
      {lead.followUpDate && (
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar className="w-3 h-3" /> {formatDate(lead.followUpDate)}
        </div>
      )}
    </div>
  );
}

function AnalyticsStrip({ leads }: { leads: Lead[] }) {
  const total = leads.length;
  const converted = leads.filter((l) => l.status === "converted").length;
  const interested = leads.filter((l) => l.status === "interested").length;
  const meetingBooked = leads.filter(
    (l) => l.status === "meeting booked",
  ).length;
  const thisMonth = leads.filter((l) => {
    if (!l.createdAt) return false;
    const d = new Date(l.createdAt);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  }).length;
  const convRate = total ? Math.round((converted / total) * 100) : 0;

  const cards = [
    {
      label: "Total Leads",
      value: total,
      icon: Users,
      color: "border-black bg-white",
    },
    {
      label: "New This Month",
      value: thisMonth,
      icon: Plus,
      color: "border-black bg-white",
    },
    {
      label: "Interested",
      value: interested,
      icon: TrendingUp,
      color: "border-black bg-white",
    },
    {
      label: "Meeting Booked",
      value: meetingBooked,
      icon: Calendar,
      color: "border-black bg-white",
    },
    {
      label: "Converted",
      value: converted,
      icon: CheckCircle,
      color: "border-black bg-white",
    },
    {
      label: "Conv. Rate",
      value: `${convRate}%`,
      icon: ArrowUpRight,
      color: "border-black bg-white",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.label}
            className={`border-2 border-black p-3 flex flex-col gap-1 ${c.color}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                {c.label}
              </span>
              <Icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-2xl font-black">{c.value}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function LeadsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [view, setView] = useState<"table" | "kanban">("table");

  const [search, setSearch] = useState("");
  const [staffFilter, setStaffFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const role = typeof window !== "undefined" ? getRole() : null;

  async function fetchLeads(): Promise<Lead[]> {
    try {
      const res = await fetch("/api/leads", { headers: authH() });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [items, tm] = await Promise.all([
          fetchLeads(),
          fetch("/api/team-members")
            .then((r) => r.json())
            .catch(() => []),
        ]);
        setLeads(items);
        setTeam(Array.isArray(tm) ? tm : []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const allSources = useMemo(() => {
    const s = new Set(leads.map((l) => l.source || "Unknown"));
    return Array.from(s).sort();
  }, [leads]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (search) {
        const q = search.toLowerCase();
        const match = [l.name, l.phone, l.email, l.subject, l.projectType].some(
          (f) => f && String(f).toLowerCase().includes(q),
        );
        if (!match) return false;
      }
      if (staffFilter && String(l.assignedTo) !== staffFilter) return false;
      if (statusFilter && l.status !== statusFilter) return false;
      if (sourceFilter && (l.source || "Unknown") !== sourceFilter)
        return false;
      if (priorityFilter && (l.priority || "") !== priorityFilter) return false;
      return true;
    });
  }, [leads, search, staffFilter, statusFilter, sourceFilter, priorityFilter]);

  const kanbanGroups = useMemo(() => {
    const groups: Record<string, Lead[]> = {};
    leadStatuses.forEach((s) => {
      groups[s] = [];
    });
    filtered.forEach((l) => {
      const s = l.status || "not called";
      if (groups[s]) groups[s].push(l);
      else groups[s] = [l];
    });
    return groups;
  }, [filtered]);

  async function updateLeadStatus(leadId: string, newStatus: string) {
    setLeads((prev) =>
      prev.map((l) =>
        String(l._id || l.id) === leadId
          ? { ...l, status: newStatus as any }
          : l,
      ),
    );
    try {
      await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: authH(),
        body: JSON.stringify({ status: newStatus, updatedAt: new Date() }),
      });
    } catch {
      const items = await fetchLeads();
      setLeads(items);
    }
  }

  async function deleteLead(leadId: string) {
    if (!window.confirm("Delete this lead?")) return;
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "DELETE",
        headers: authH(),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.filter((l) => String(l._id || l.id) !== leadId),
        );
        setSelected((prev) => {
          const n = new Set(prev);
          n.delete(leadId);
          return n;
        });
        toast({ title: "Lead deleted" });
      } else {
        toast({ title: "Delete failed", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    }
  }

  async function bulkDelete() {
    if (!selected.size) return;
    if (!window.confirm(`Delete ${selected.size} selected leads?`)) return;
    setBulkDeleting(true);
    let deleted = 0;
    for (const id of Array.from(selected)) {
      try {
        const res = await fetch(`/api/leads/${id}`, {
          method: "DELETE",
          headers: authH(),
        });
        if (res.ok) {
          deleted++;
          setLeads((prev) => prev.filter((l) => String(l._id || l.id) !== id));
        }
      } catch {}
    }
    setSelected(new Set());
    setBulkDeleting(false);
    toast({ title: `Deleted ${deleted} leads` });
  }

  async function bulkAssign(staffId: string) {
    if (!selected.size || !staffId) return;
    const staffMember = team.find((t) => String(t._id || t.id) === staffId);
    const name = staffMember?.name || "";
    for (const id of Array.from(selected)) {
      try {
        await fetch(`/api/leads/${id}`, {
          method: "PATCH",
          headers: authH(),
          body: JSON.stringify({ assignedTo: staffId, assignedToName: name }),
        });
        setLeads((prev) =>
          prev.map((l) =>
            String(l._id || l.id) === id
              ? { ...l, assignedTo: staffId, assignedToName: name }
              : l,
          ),
        );
      } catch {}
    }
    setSelected(new Set());
    toast({ title: `Assigned ${selected.size} leads to ${name}` });
  }

  async function bulkStatus(status: string) {
    if (!selected.size || !status) return;
    for (const id of Array.from(selected)) {
      try {
        await fetch(`/api/leads/${id}`, {
          method: "PATCH",
          headers: authH(),
          body: JSON.stringify({ status }),
        });
        setLeads((prev) =>
          prev.map((l) =>
            String(l._id || l.id) === id ? { ...l, status: status as any } : l,
          ),
        );
      } catch {}
    }
    setSelected(new Set());
    toast({ title: `Updated ${selected.size} leads to "${status}"` });
  }

  function exportCSV() {
    const rows = [
      [
        "Name",
        "Phone",
        "Email",
        "Subject",
        "Project Type",
        "Budget",
        "Source",
        "Status",
        "Priority",
        "Assigned To",
        "Created",
      ],
      ...filtered.map((l) => [
        l.name,
        l.phone || "",
        l.email || "",
        l.subject || "",
        l.projectType || "",
        String(l.budget || ""),
        l.source || "",
        l.status || "",
        l.priority || "",
        l.assignedToName || "",
        l.createdAt ? new Date(l.createdAt).toLocaleDateString("en-IN") : "",
      ]),
    ];
    const csv = rows
      .map((r) =>
        r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: `Exported ${filtered.length} leads` });
  }

  async function syncMetaAds() {
    if (!window.confirm("Sync leads from Meta Ads?")) return;
    setIsSyncing(true);
    try {
      const res = await fetch("/api/meta-leads");
      const data = await res.json();
      if (res.ok) {
        const items = await fetchLeads();
        setLeads(items);
        toast({
          title: "Meta Ads Sync Complete",
          description: `${data.synced} new leads imported`,
        });
      } else {
        toast({
          title: "Meta Sync Failed",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch {
      toast({ title: "Meta Sync Error", variant: "destructive" });
    } finally {
      setIsSyncing(false);
    }
  }

  async function syncIndiaMART() {
    if (!window.confirm("Sync all leads from IndiaMART?")) return;
    setIsSyncing(true);
    try {
      const res = await fetch("/api/indiamart-webhook?action=sync_now");
      const data = await res.json();
      if (res.ok) {
        const items = await fetchLeads();
        setLeads(items);
        toast({
          title: "IndiaMART Sync Complete",
          description: `${data.synced} new leads`,
        });
      } else {
        toast({
          title: "Sync Failed",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch {
      toast({ title: "Sync Error", variant: "destructive" });
    } finally {
      setIsSyncing(false);
    }
  }

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  function toggleAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((l) => String(l._id || l.id))));
    }
  }

  const clearFilters = () => {
    setSearch("");
    setStaffFilter("");
    setStatusFilter("");
    setSourceFilter("");
    setPriorityFilter("");
  };
  const hasFilters =
    search || staffFilter || statusFilter || sourceFilter || priorityFilter;

  return (
    <div className="space-y-5 font-headline">
      {}
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">LEADS</h1>
          <p className="text-muted-foreground text-lg">
            {filtered.length} of {leads.length} leads
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView((v) => (v === "table" ? "kanban" : "table"))}
            className="border-2 border-black font-bold"
          >
            {view === "table" ? (
              <>
                <Kanban className="w-4 h-4 mr-1" /> Kanban
              </>
            ) : (
              <>
                <LayoutList className="w-4 h-4 mr-1" /> Table
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportCSV}
            className="border-2 border-black font-bold"
          >
            <Download className="w-4 h-4 mr-1" /> Export
          </Button>
          <Button
            size="sm"
            onClick={syncIndiaMART}
            disabled={isSyncing}
            className="bg-green-600 hover:bg-green-700 text-white border-2 border-black font-bold"
          >
            {isSyncing ? (
              <Loader2 className="w-4 h-4 animate-spin mr-1" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-1" />
            )}
            Sync IndiaMART
          </Button>
          <Button
            size="sm"
            onClick={syncMetaAds}
            disabled={isSyncing}
            className="bg-blue-600 hover:bg-blue-700 text-white border-2 border-black font-bold"
          >
            {isSyncing ? (
              <Loader2 className="w-4 h-4 animate-spin mr-1" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-1" />
            )}
            Sync Meta Ads
          </Button>
        </div>
      </header>

      {}
      <AnalyticsStrip leads={leads} />

      {}
      <div className=" gap-4">
        {}
        <div className=" border-2 border-black p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide mb-3">
            Pipeline Funnel
          </h3>
          <div className="flex w-max gap-auto flex-wrap">
            {leadStatuses.map((s) => {
              const count = leads.filter(
                (l) => (l.status || "not called") === s,
              ).length;
              const pct = leads.length
                ? Math.round((count / leads.length) * 100)
                : 0;
              return (
                <button
                  key={s}
                  onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
                  className={`flex flex-col items-center border-2 px-3 py-2 min-w-[90px] transition-all ${
                    statusFilter === s
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <span className="text-xl font-black">{count}</span>
                  <span className="text-xs font-medium capitalize text-center leading-tight">
                    {s}
                  </span>
                  <span className="text-xs opacity-60">{pct}%</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search name, phone, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 border-2 border-black"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters((p) => !p)}
          className={`border-2 font-bold ${showFilters ? "border-black bg-black text-white" : "border-black"}`}
        >
          <Filter className="w-4 h-4 mr-1" /> Filters
          {hasFilters && (
            <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              !
            </span>
          )}
        </Button>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground"
          >
            <X className="w-4 h-4 mr-1" /> Clear
          </Button>
        )}
      </div>

      {}
      {showFilters && (
        <div className="border-2 border-black p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-gray-50">
          <div>
            <label className="text-xs font-bold mb-1 block uppercase tracking-wide">
              Staff
            </label>
            <select
              value={staffFilter}
              onChange={(e) => setStaffFilter(e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg border-2 border-black text-sm bg-white"
            >
              <option value="">All Staff</option>
              {team.map((t) => (
                <option
                  key={String(t._id || t.id)}
                  value={String(t._id || t.id)}
                >
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold mb-1 block uppercase tracking-wide">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg border-2 border-black text-sm bg-white"
            >
              <option value="">All Statuses</option>
              {leadStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold mb-1 block uppercase tracking-wide">
              Source
            </label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg border-2 border-black text-sm bg-white"
            >
              <option value="">All Sources</option>
              {allSources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold mb-1 block uppercase tracking-wide">
              Priority
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg border-2 border-black text-sm bg-white"
            >
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      )}

      {}
      {selected.size > 0 && (
        <div className="border-2 border-black bg-black text-white px-4 py-3 flex items-center gap-3 flex-wrap">
          <span className="font-bold text-sm">{selected.size} selected</span>
          <div className="flex-1" />
          <select
            onChange={(e) => {
              if (e.target.value) {
                bulkStatus(e.target.value);
                e.target.value = "";
              }
            }}
            className="px-2 py-1.5 rounded-lg border border-white/30 bg-white/10 text-white text-sm"
          >
            <option value="">Change Status…</option>
            {leadStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {role === "admin" && (
            <select
              onChange={(e) => {
                if (e.target.value) {
                  bulkAssign(e.target.value);
                  e.target.value = "";
                }
              }}
              className="px-2 py-1.5 rounded-lg border border-white/30 bg-white/10 text-white text-sm"
            >
              <option value="">Assign to…</option>
              {team.map((t) => (
                <option
                  key={String(t._id || t.id)}
                  value={String(t._id || t.id)}
                >
                  {t.name}
                </option>
              ))}
            </select>
          )}
          <Button
            size="sm"
            variant="destructive"
            onClick={bulkDelete}
            disabled={bulkDeleting}
            className="border border-white/30"
          >
            {bulkDeleting ? (
              <Loader2 className="w-3 h-3 animate-spin mr-1" />
            ) : (
              <Trash className="w-3 h-3 mr-1" />
            )}
            Delete
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSelected(new Set())}
            className="text-white hover:bg-white/10"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}

      {}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
        </div>
      )}

      {}
      {!loading && view === "table" && (
        <div className="border-2 border-black overflow-hidden">
          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-black bg-gray-50">
                <TableHead className="w-10">
                  <input
                    type="checkbox"
                    checked={
                      filtered.length > 0 && selected.size === filtered.length
                    }
                    onChange={toggleAll}
                    className="w-4 h-4 border-2 border-black rounded"
                  />
                </TableHead>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Contact</TableHead>
                <TableHead className="font-bold">Project / Budget</TableHead>
                <TableHead className="font-bold">Source</TableHead>
                <TableHead className="font-bold">Assigned</TableHead>
                <TableHead className="font-bold">Priority</TableHead>
                <TableHead className="font-bold">Follow-up</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-12 text-muted-foreground"
                  >
                    No leads match your filters.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((lead) => {
                const id = String(lead._id || lead.id);
                const overdueFlag = isOverdue(lead.followUpDate);
                return (
                  <TableRow
                    key={id}
                    className={`border-b-2 border-black last:border-b-0 hover:bg-gray-50 transition-colors ${selected.has(id) ? "bg-blue-50" : ""}`}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selected.has(id)}
                        onChange={() => toggleSelect(id)}
                        className="w-4 h-4 border-2 border-black rounded"
                      />
                    </TableCell>
                    <TableCell className="font-bold">
                      <Link
                        href={`/leads/${id}`}
                        className="hover:underline flex items-center gap-1"
                      >
                        {lead.name}
                        <ChevronRight className="w-3 h-3 opacity-40" />
                      </Link>
                      {lead.doNotDelete && (
                        <span className="text-xs text-orange-600 flex items-center gap-0.5">
                          <AlertTriangle className="w-3 h-3" /> protected
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-0.5">
                        {lead.phone && (
                          <div className="text-sm flex items-center gap-1">
                            <Phone className="w-3 h-3 opacity-50" />
                            {lead.phone}
                          </div>
                        )}
                        {lead.email && (
                          <div className="text-xs text-muted-foreground flex items-center gap-1 max-w-[160px] truncate">
                            <Mail className="w-3 h-3 opacity-50 flex-shrink-0" />
                            {lead.email}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {lead.projectType || lead.subject || "—"}
                      </div>
                      {lead.budget && (
                        <div className="text-xs font-bold text-green-700">
                          ₹{lead.budget}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {lead.source || "Unknown"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">
                      {lead.assignedToName || "—"}
                    </TableCell>
                    <TableCell>
                      {lead.priority ? (
                        <span
                          className={`text-xs px-2 py-1 rounded-full border font-medium ${priorityColors[lead.priority] || ""}`}
                        >
                          {lead.priority}
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      {lead.followUpDate ? (
                        <span
                          className={`text-xs flex items-center gap-1 ${overdueFlag ? "text-red-600 font-bold" : "text-muted-foreground"}`}
                        >
                          <Calendar className="w-3 h-3" />
                          {formatDate(lead.followUpDate)}
                          {overdueFlag && <AlertTriangle className="w-3 h-3" />}
                        </span>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <select
                        value={lead.status || "not called"}
                        onChange={(e) => updateLeadStatus(id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className={`px-2 py-1 rounded-lg border-2 border-black text-xs font-bold ${leadStatusColors[lead.status || "not called"] || "bg-gray-100"}`}
                      >
                        {leadStatuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Link href={`/leads/${id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                        {role === "admin" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-red-500 hover:text-red-700"
                            onClick={() => deleteLead(id)}
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          </div>
        </div>
      )}

      {}
      {!loading && view === "kanban" && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {leadStatuses.map((status) => {
            const cards = kanbanGroups[status] || [];
            const statusColor = leadStatusColors[status] || "bg-gray-100";
            return (
              <div key={status} className="flex-shrink-0 w-72 min-w-[280px]">
                <div className={`border-2 border-black overflow-hidden`}>
                  <div
                    className={`px-3 py-2 border-b-2 border-black ${statusColor}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wide">
                        {status}
                      </span>
                      <span className="text-xs font-bold bg-white border border-black rounded-full w-6 h-6 flex items-center justify-center">
                        {cards.length}
                      </span>
                    </div>
                  </div>
                  <div className="p-2 space-y-2 min-h-[100px] bg-gray-50">
                    {cards.map((lead) => (
                      <KanbanCard
                        key={String(lead._id || lead.id)}
                        lead={lead}
                        onStatusChange={updateLeadStatus}
                        onDelete={deleteLead}
                        role={role}
                      />
                    ))}
                    {cards.length === 0 && (
                      <p className="text-xs text-center text-muted-foreground py-4">
                        Empty
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
