"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Client } from "@/lib/data";
import { clientStatusColors, clientStatuses } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  ShieldCheck,
  Search,
  Filter,
  X,
  Download,
  ChevronRight,
  Users,
  UserCheck,
  TrendingUp,
  UserX,
  Plus,
} from "lucide-react";
import { AddClientDialog } from "@/components/clients/add-client-dialog";
import Link from "next/link";

function SuccessModal({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] px-10 py-8 flex flex-col items-center gap-4 animate-in zoom-in-90 duration-200">
        <div className="relative flex items-center justify-center">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
            <circle
              cx="36"
              cy="36"
              r="34"
              stroke="black"
              strokeWidth="4"
              fill="#22c55e"
            />
            <polyline
              points="20,37 31,48 52,26"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 50,
                strokeDashoffset: 0,
                animation: "draw-check 0.4s ease forwards",
              }}
            />
          </svg>
          <style>{`@keyframes draw-check { from { stroke-dashoffset: 50; } to { stroke-dashoffset: 0; } }`}</style>
        </div>
        <p className="text-xl font-black tracking-tight text-center">
          {message}
        </p>
      </div>
    </div>
  );
}

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 2000);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/clients");
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const items = await res.json();
        if (mounted) setClients(items as Client[]);
      } catch (err) {
        console.error("Failed to load clients", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    clients.forEach((c) => (c.tags || []).forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [clients]);

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      if (search) {
        const q = search.toLowerCase();
        const match = [
          c.name,
          c.email,
          c.phone,
          c.city,
          c.state,
          c.gstNumber,
        ].some((f) => f && String(f).toLowerCase().includes(q));
        if (!match) return false;
      }
      if (statusFilter && (c.status || "active") !== statusFilter) return false;
      if (tagFilter && !(c.tags || []).includes(tagFilter)) return false;
      return true;
    });
  }, [clients, search, statusFilter, tagFilter]);

  const active = clients.filter(
    (c) => (c.status || "active") === "active",
  ).length;
  const inactive = clients.filter((c) => c.status === "inactive").length;
  const prospect = clients.filter((c) => c.status === "prospect").length;
  const churned = clients.filter((c) => c.status === "churned").length;

  const handleAddClient = async (newClientData: Omit<Client, "id" | "_id">) => {
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        body: JSON.stringify(newClientData),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const newClient = await res.json();
      setClients((prev) => [...prev, newClient as Client]);
      showSuccess("Client created!");
    } catch (err) {
      console.error("Failed to add client", err);
      throw err;
    }
  };

  const handleDeleteClient = async (client: Client) => {
    if (!window.confirm(`Delete "${client.name}"?`)) return;
    try {
      const id = client._id ?? client.id;
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      setClients((prev) => prev.filter((c) => (c._id ?? c.id) !== id));
    } catch (err) {
      console.error("Failed to delete client", err);
    }
  };

  const handleSaveClient = async (
    id: string | number,
    update: Partial<Client>,
  ) => {
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: "PUT",
        body: JSON.stringify(update),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const updated = await res.json();
      setClients((prev) =>
        prev.map((c) => ((c._id ?? c.id) === id ? updated : c)),
      );
      showSuccess("Changes saved!");
    } catch (err) {
      console.error("Failed to save client", err);
      throw err;
    }
  };

  function exportCSV() {
    const rows = [
      [
        "Name",
        "Email",
        "Phone",
        "City",
        "State",
        "Status",
        "Industry",
        "Tags",
        "GST",
        "Portal",
      ],
      ...filtered.map((c) => [
        c.name,
        c.email || "",
        c.phone || "",
        c.city || "",
        c.state || "",
        c.status || "active",
        c.industry || "",
        (c.tags || []).join("; "),
        c.hasGst ? c.gstNumber || "yes" : "no",
        c.userId ? "active" : "none",
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
    a.download = "clients.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasFilters = search || statusFilter || tagFilter;
  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setTagFilter("");
  };

  return (
    <div className="space-y-6 font-headline">
      {successMessage && <SuccessModal message={successMessage} />}

      {}
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">CLIENTS</h1>
          <p className="text-muted-foreground text-lg">
            {filtered.length} of {clients.length} clients
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={exportCSV}
            className="border-2 border-black font-bold"
          >
            <Download className="w-4 h-4 mr-1" /> Export
          </Button>
          <AddClientDialog
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            onAddClient={handleAddClient}
          >
            <Button
              size="sm"
              className="border-2 border-black font-bold text-base"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Client
            </Button>
          </AddClientDialog>
          {}
          <AddClientDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setIsEditDialogOpen}
            initialValues={editingClient ?? undefined}
            onSave={handleSaveClient}
          >
            <div />
          </AddClientDialog>
        </div>
      </header>

      {}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Active",
            value: active,
            icon: UserCheck,
            color: "bg-green-50 border-green-300",
            filter: "active",
          },
          {
            label: "Prospect",
            value: prospect,
            icon: TrendingUp,
            color: "bg-blue-50 border-blue-300",
            filter: "prospect",
          },
          {
            label: "Inactive",
            value: inactive,
            icon: Users,
            color: "bg-gray-50 border-gray-300",
            filter: "inactive",
          },
          {
            label: "Churned",
            value: churned,
            icon: UserX,
            color: "bg-red-50 border-red-300",
            filter: "churned",
          },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.label}
              onClick={() =>
                setStatusFilter(statusFilter === s.filter ? "" : s.filter)
              }
              className={`border-2 border-black rounded-xl p-3 text-left transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                statusFilter === s.filter ? "bg-black text-white" : s.color
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide opacity-70">
                  {s.label}
                </span>
                <Icon className="w-4 h-4 opacity-60" />
              </div>
              <span className="text-2xl font-black">{s.value}</span>
            </button>
          );
        })}
      </div>

      {}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search name, email, phone, city, GSTIN…"
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

      {showFilters && (
        <div className="border-2 border-black rounded-xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50">
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
              {clientStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          {allTags.length > 0 && (
            <div>
              <label className="text-xs font-bold mb-1 block uppercase tracking-wide">
                Tag
              </label>
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="w-full px-2 py-1.5 rounded-lg border-2 border-black text-sm bg-white"
              >
                <option value="">All Tags</option>
                {allTags.map((t) => (
                  <option key={t} value={t}>
                    #{t}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {}
      <div className="border-2 border-black rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black bg-gray-50">
              <TableHead className="text-base font-bold">Name</TableHead>
              <TableHead className="text-base font-bold">Contact</TableHead>
              <TableHead className="text-base font-bold">Location</TableHead>
              <TableHead className="text-base font-bold">Status</TableHead>
              <TableHead className="text-base font-bold">Tags</TableHead>
              <TableHead className="text-base font-bold">Portal</TableHead>
              <TableHead className="text-right text-base font-bold">
                GST
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-12 text-muted-foreground"
                >
                  No clients match your filters.
                </TableCell>
              </TableRow>
            )}
            {filtered.map((c) => {
              const cid = String(c._id ?? c.id);
              const statusColor =
                clientStatusColors[c.status || "active"] ||
                "bg-green-100 text-green-700";
              return (
                <TableRow
                  key={cid}
                  className="border-b-2 border-black last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/clients/${cid}`)}
                >
                  <TableCell className="font-bold text-base py-4">
                    <div className="flex items-center gap-1">
                      {c.name}
                      <ChevronRight className="w-3 h-3 opacity-30" />
                    </div>
                    {c.industry && (
                      <div className="text-xs text-muted-foreground font-normal">
                        {c.industry}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-base py-4">
                    {c.email && <div className="text-sm">{c.email}</div>}
                    {c.phone && (
                      <div className="text-sm text-muted-foreground">
                        {c.phone}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm py-4 text-muted-foreground">
                    {[c.city, c.state].filter(Boolean).join(", ") || "—"}
                  </TableCell>
                  <TableCell className="py-4">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full border ${statusColor}`}
                    >
                      {c.status || "active"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-wrap gap-1">
                      {(c.tags || []).slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200"
                        >
                          #{tag}
                        </span>
                      ))}
                      {(c.tags || []).length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{(c.tags || []).length - 3}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    {c.userId ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-xs font-bold">Active</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        None
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <div
                      className="flex items-center justify-end gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {c.hasGst ? (
                        <Badge>Registered</Badge>
                      ) : (
                        <Badge variant="secondary">Not Registered</Badge>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => router.push(`/clients/${cid}`)}
                          >
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingClient(c);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClient(c)}
                            className="text-destructive"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
