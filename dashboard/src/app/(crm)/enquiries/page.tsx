"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SuccessModal } from "@/components/ui/success-modal";
import { StatCard } from "@/components/ui/stat-card";
import { MessageSquare, CheckCircle2, Clock, Inbox } from "lucide-react";

type SortKey = "createdAt" | "name" | "status";
type SortDir = "asc" | "desc";

export default function EnquiriesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filter state
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProjectType, setFilterProjectType] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");

  // Sort state
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 2000);
  };

  const updateItem = async (id: string, patch: any) => {
    try {
      const res = await apiFetch(
        `/api/enquiries?id=${encodeURIComponent(id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        },
      );
      if (!res.ok) throw new Error("update failed");
      const updated = await res.json();
      setItems((prev) =>
        prev.map((p) => (String(p._id || p.id) === String(id) ? updated : p)),
      );
      showSuccess("Status updated!");
    } catch (e) {
      console.error("Failed to update enquiry", e);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
      const res = await apiFetch(`/api/enquiries?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
      setItems((prev) => prev.filter((p) => String(p._id || p.id) !== String(id)));
      showSuccess("Enquiry deleted!");
    } catch (e) {
      console.error("Failed to delete enquiry", e);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await apiFetch("/api/enquiries");
        const json = await res.json();
        if (!mounted) return;
        setItems(json || []);
      } catch (e) {
        console.error("Failed to load enquiries", e);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Derived: unique project types for filter dropdown
  const projectTypes = useMemo(() => {
    const types = new Set<string>();
    items.forEach((i) => { if (i.projectType) types.add(i.projectType); });
    return Array.from(types).sort();
  }, [items]);

  // Derived: unique months for filter dropdown
  const months = useMemo(() => {
    const seen = new Set<string>();
    items.forEach((i) => {
      if (!i.createdAt) return;
      const d = new Date(i.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      seen.add(key);
    });
    return Array.from(seen).sort().reverse();
  }, [items]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  };

  const filtered = useMemo(() => {
    let out = items.filter((i) => {
      const q = search.toLowerCase();
      if (q) {
        const hay = `${i.name || ""} ${i.email || ""} ${i.phone || ""} ${i.subject || ""} ${i.message || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filterStatus !== "all" && (i.status || "pending") !== filterStatus) return false;
      if (filterProjectType !== "all" && i.projectType !== filterProjectType) return false;
      if (filterMonth !== "all" && i.createdAt) {
        const d = new Date(i.createdAt);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        if (key !== filterMonth) return false;
      }
      return true;
    });

    out = [...out].sort((a, b) => {
      let va: any, vb: any;
      if (sortKey === "createdAt") {
        va = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        vb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      } else if (sortKey === "name") {
        va = (a.name || "").toLowerCase();
        vb = (b.name || "").toLowerCase();
      } else if (sortKey === "status") {
        va = a.status || "pending";
        vb = b.status || "pending";
      }
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return out;
  }, [items, search, filterStatus, filterProjectType, filterMonth, sortKey, sortDir]);

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortKey === col ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕";

  return (
    <div className="space-y-6">
      {successMessage && <SuccessModal message={successMessage} />}
      <header>
        <h1 className="text-5xl font-black">Enquiries</h1>
        <p className="text-muted-foreground">
          All contact form submissions saved from the website.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Inbox} label="TOTAL" value={items.length} sub="all submissions" iconVariant="primary" />
        <StatCard icon={Clock} label="PENDING" value={items.filter((i) => !i.status || i.status === "pending").length} sub="awaiting review" iconVariant="secondary" />
        <StatCard icon={CheckCircle2} label="RESOLVED" value={items.filter((i) => i.status === "resolved" || i.status === "confirmation").length} sub="completed" iconVariant="primary" />
        <StatCard icon={MessageSquare} label="THIS MONTH" value={items.filter((i) => { if (!i.createdAt) return false; const d = new Date(i.createdAt); const n = new Date(); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); }).length} sub="new enquiries" iconVariant="secondary" />
      </div>

      {/* Filters + Sort */}
      <Card className="border-2 border-black">
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-3 items-end">
            {/* Search */}
            <div className="flex-1 min-w-[180px]">
              <label className="text-[10px] font-black tracking-widest uppercase text-muted-foreground block mb-1">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name, email, phone, message..."
                className="border-2 border-black rounded px-3 py-2 text-sm w-full"
              />
            </div>

            {/* Status filter */}
            <div>
              <label className="text-[10px] font-black tracking-widest uppercase text-muted-foreground block mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border-2 border-black rounded px-3 py-2 text-sm font-bold"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmation">Confirmation</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Project type filter */}
            <div>
              <label className="text-[10px] font-black tracking-widest uppercase text-muted-foreground block mb-1">Project Type</label>
              <select
                value={filterProjectType}
                onChange={(e) => setFilterProjectType(e.target.value)}
                className="border-2 border-black rounded px-3 py-2 text-sm font-bold"
              >
                <option value="all">All Types</option>
                {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Month filter */}
            <div>
              <label className="text-[10px] font-black tracking-widest uppercase text-muted-foreground block mb-1">Month</label>
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="border-2 border-black rounded px-3 py-2 text-sm font-bold"
              >
                <option value="all">All Time</option>
                {months.map((m) => {
                  const [y, mo] = m.split("-");
                  const label = new Date(Number(y), Number(mo) - 1).toLocaleString("en-IN", { month: "long", year: "numeric" });
                  return <option key={m} value={m}>{label}</option>;
                })}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="text-[10px] font-black tracking-widest uppercase text-muted-foreground block mb-1">Sort By</label>
              <div className="flex gap-1">
                {(["createdAt", "name", "status"] as SortKey[]).map((col) => (
                  <button
                    key={col}
                    onClick={() => toggleSort(col)}
                    className={`border-2 border-black rounded px-3 py-2 text-xs font-black ${sortKey === col ? "bg-black text-white" : "bg-white"}`}
                  >
                    {col === "createdAt" ? "Date" : col === "name" ? "Name" : "Status"}
                    <SortIcon col={col} />
                  </button>
                ))}
              </div>
            </div>

            {/* Clear filters */}
            {(search || filterStatus !== "all" || filterProjectType !== "all" || filterMonth !== "all") && (
              <button
                onClick={() => { setSearch(""); setFilterStatus("all"); setFilterProjectType("all"); setFilterMonth("all"); }}
                className="border-2 border-black rounded px-3 py-2 text-xs font-black bg-red-50 hover:bg-red-100 self-end"
              >
                Clear Filters
              </button>
            )}

            <span className="self-end text-xs text-muted-foreground font-bold pb-2">
              {filtered.length} of {items.length}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle>All Enquiries</CardTitle>
          <CardDescription>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} · sorted by {sortKey === "createdAt" ? "date" : sortKey} ({sortDir === "desc" ? "newest/Z first" : "oldest/A first"})
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("name")}>
                    Name<SortIcon col="name" />
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Project Type</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("status")}>
                    Status<SortIcon col="status" />
                  </TableHead>
                  <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("createdAt")}>
                    Date<SortIcon col="createdAt" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                      No enquiries match your filters.
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map((it) => (
                  <TableRow key={String(it._id || it.id)}>
                    <TableCell className="font-bold">{it.name || "-"}</TableCell>
                    <TableCell>{it.email || "-"}</TableCell>
                    <TableCell>{it.phone || "-"}</TableCell>
                    <TableCell>{it.subject || "-"}</TableCell>
                    <TableCell>{it.projectType || "-"}</TableCell>
                    <TableCell style={{ maxWidth: 300 }}>{it.message || "-"}</TableCell>
                    <TableCell>{it.budget || "-"}</TableCell>
                    <TableCell>
                      <select
                        value={it.status || "pending"}
                        onChange={(e) => updateItem(String(it._id || it.id), { status: e.target.value })}
                        className="border rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmation">Confirmation</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <span>{it.createdAt ? new Date(it.createdAt).toLocaleString() : "-"}</span>
                      <button onClick={() => deleteItem(String(it._id || it.id))} className="ml-2 text-sm text-red-600 hover:underline">Delete</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No enquiries match your filters.</p>
            )}
            {filtered.map((it) => {
              const id = String(it._id || it.id);
              return (
                <div key={id} className="border-2 border-black bg-white">
                  <div className="divide-y divide-gray-100">
                    <div className="flex justify-between items-start px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Name</span>
                      <span className="text-sm font-bold text-right flex-1">{it.name || "-"}</span>
                    </div>
                    {it.email && <div className="flex justify-between items-start px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Email</span>
                      <span className="text-sm text-right flex-1">{it.email}</span>
                    </div>}
                    {it.phone && <div className="flex justify-between items-start px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Phone</span>
                      <span className="text-sm text-right flex-1">{it.phone}</span>
                    </div>}
                    {it.subject && <div className="flex justify-between items-start px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Subject</span>
                      <span className="text-sm text-right flex-1">{it.subject}</span>
                    </div>}
                    {it.projectType && <div className="flex justify-between items-start px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Project</span>
                      <span className="text-sm text-right flex-1">{it.projectType}</span>
                    </div>}
                    {it.budget && <div className="flex justify-between items-start px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Budget</span>
                      <span className="text-sm font-bold text-right flex-1">{it.budget}</span>
                    </div>}
                    {it.message && <div className="px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase block mb-1">Message</span>
                      <span className="text-sm line-clamp-3">{it.message}</span>
                    </div>}
                    <div className="flex justify-between items-center px-3 py-2">
                      <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Date</span>
                      <span className="text-xs text-right flex-1">{it.createdAt ? new Date(it.createdAt).toLocaleDateString("en-IN") : "-"}</span>
                    </div>
                  </div>
                  <div className="border-t-2 border-black bg-gray-50 px-3 py-2 flex items-center justify-between gap-2">
                    <select
                      value={it.status || "pending"}
                      onChange={(e) => updateItem(id, { status: e.target.value })}
                      className="border-2 border-black rounded px-2 py-1 text-xs font-bold flex-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmation">Confirmation</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button onClick={() => deleteItem(id)} className="text-sm text-red-600 font-bold hover:underline">Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
