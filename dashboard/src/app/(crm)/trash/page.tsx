"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, RotateCcw, AlertTriangle, Inbox, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";



type TrashItem = {
  _id: string;
  _originalId: string;
  originalCollection: string;
  collectionLabel: string;
  document: Record<string, any>;
  deletedAt: string;
};



const COLLECTION_META: Record<
  string,
  { label: string; colour: string; summary: (doc: any) => string }
> = {
  invoices:       { label: "Invoice",       colour: "bg-blue-100 text-blue-800",       summary: (d) => d.invoiceNo ?? d.id ?? "—" },
  leads:          { label: "Lead",          colour: "bg-yellow-100 text-yellow-800",    summary: (d) => d.name ?? d.email ?? "—" },
  clients:        { label: "Client",        colour: "bg-green-100 text-green-800",      summary: (d) => d.name ?? d.email ?? "—" },
  quotations:     { label: "Quotation",     colour: "bg-purple-100 text-purple-800",    summary: (d) => d.quotationNo ?? d.id ?? "—" },
  projects:       { label: "Project",       colour: "bg-indigo-100 text-indigo-800",    summary: (d) => d.title ?? d.name ?? "—" },
  tasks:          { label: "Task",          colour: "bg-pink-100 text-pink-800",        summary: (d) => d.title ?? d.name ?? "—" },
  expenses:       { label: "Expense",       colour: "bg-red-100 text-red-800",          summary: (d) => d.description ?? d.title ?? "—" },
  emi:            { label: "EMI",           colour: "bg-orange-100 text-orange-800",    summary: (d) => d.name ?? d.loanAccount ?? "—" },
  inventory:      { label: "Inventory",     colour: "bg-teal-100 text-teal-800",        summary: (d) => d.itemName ?? d.name ?? "—" },
  services:       { label: "Service",       colour: "bg-cyan-100 text-cyan-800",        summary: (d) => d.name ?? d.title ?? "—" },
  blogs:          { label: "Blog",          colour: "bg-lime-100 text-lime-800",        summary: (d) => d.title ?? "—" },
  reels:          { label: "Reel",          colour: "bg-rose-100 text-rose-800",        summary: (d) => d.title ?? d.caption ?? "—" },
  photoGalleries: { label: "Photo Gallery", colour: "bg-amber-100 text-amber-800",      summary: (d) => d.title ?? d.name ?? "—" },
  workGallery:    { label: "Work Gallery",  colour: "bg-violet-100 text-violet-800",    summary: (d) => d.title ?? d.projectName ?? "—" },
  enquiries:      { label: "Enquiry",       colour: "bg-sky-100 text-sky-800",          summary: (d) => d.name ?? d.email ?? "—" },
  supportTickets: { label: "Support Ticket",colour: "bg-slate-100 text-slate-800",      summary: (d) => d.subject ?? d.title ?? "—" },
  journey_events: { label: "Journey Event", colour: "bg-emerald-100 text-emerald-800",  summary: (d) => d.title ?? d.label ?? "—" },
  teamMembers:    { label: "Team Member",   colour: "bg-fuchsia-100 text-fuchsia-800",  summary: (d) => d.name ?? d.email ?? "—" },
  careers:        { label: "Career",        colour: "bg-stone-100 text-stone-800",      summary: (d) => d.title ?? d.position ?? "—" },
};

const getMeta = (col: string) =>
  COLLECTION_META[col] ?? {
    label: col,
    colour: "bg-gray-100 text-gray-700",
    summary: (d: any) => d.title ?? d.name ?? d._id ?? "—",
  };



const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });



export default function TrashPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === "admin";

  const [items, setItems]           = useState<TrashItem[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [filterCol, setFilterCol]   = useState<string>("all");
  const [restoringIds, setRestoringIds] = useState<Set<string>>(new Set());
  const [deletingIds, setDeletingIds]   = useState<Set<string>>(new Set());

  
  const fetchTrash = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/trash");
      if (!res.ok) throw new Error("Failed to load trash");
      setItems(await res.json());
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTrash(); }, []); 

  
  const collectionOptions = useMemo(() => {
    const cols = Array.from(new Set(items.map((i) => i.originalCollection))).sort();
    return cols;
  }, [items]);

  const filtered = useMemo(() => {
    let list = items;
    if (filterCol !== "all") list = list.filter((i) => i.originalCollection === filterCol);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((i) => {
        const meta = getMeta(i.originalCollection);
        const summary = meta.summary(i.document).toLowerCase();
        return (
          summary.includes(q) ||
          i.collectionLabel.toLowerCase().includes(q) ||
          i.originalCollection.toLowerCase().includes(q)
        );
      });
    }
    return list;
  }, [items, filterCol, search]);

  
  const handleRestore = async (item: TrashItem) => {
    const id = String(item._id);
    if (restoringIds.has(id)) return;
    setRestoringIds((p) => new Set(p).add(id));
    try {
      const res = await fetch(`/api/trash/${id}`, { method: "PATCH" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Restore failed");
      }
      setItems((p) => p.filter((i) => String(i._id) !== id));
      toast({
        title: "Restored",
        description: `${item.collectionLabel} "${getMeta(item.originalCollection).summary(item.document)}" has been restored.`,
      });
    } catch (e: any) {
      toast({ title: "Restore Failed", description: e.message, variant: "destructive" });
    } finally {
      setRestoringIds((p) => { const n = new Set(p); n.delete(id); return n; });
    }
  };

  const handlePermanentDelete = async (item: TrashItem) => {
    const id = String(item._id);
    if (deletingIds.has(id)) return;
    setDeletingIds((p) => new Set(p).add(id));
    try {
      const res = await fetch(`/api/trash/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Permanent delete failed");
      }
      setItems((p) => p.filter((i) => String(i._id) !== id));
      toast({
        title: "Permanently Deleted",
        description: `${item.collectionLabel} has been permanently removed.`,
        variant: "destructive",
      });
    } catch (e: any) {
      toast({ title: "Delete Failed", description: e.message, variant: "destructive" });
    } finally {
      setDeletingIds((p) => { const n = new Set(p); n.delete(id); return n; });
    }
  };

  
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <AlertTriangle className="w-12 h-12 text-destructive" />
        <h2 className="text-2xl font-black">Access Denied</h2>
        <p className="text-muted-foreground font-semibold">
          Only admins can access the trash.
        </p>
      </div>
    );
  }

  
  return (
    <div className="space-y-6">
      {}
      <div className="border-b-2 border-black pb-4 flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Trash2 className="w-7 h-7 shrink-0" />
          <div>
            <h1 className="text-3xl font-black tracking-tight">Trash</h1>
            <p className="text-sm text-muted-foreground font-semibold mt-0.5">
              All deleted records across the CRM. Restore or permanently delete them.
            </p>
          </div>
        </div>
        <span className="text-xs font-black uppercase tracking-widest bg-muted border-2 border-black px-3 py-1 rounded-lg self-start">
          {items.length} item{items.length !== 1 ? "s" : ""} in trash
        </span>
      </div>

      {}
      <div className="flex items-start gap-3 border-2 border-amber-400 bg-amber-50 rounded-lg p-4">
        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-sm font-semibold text-amber-800">
          Permanently deleted items <strong>cannot be recovered</strong>.
          Use <strong>Restore</strong> to bring a record back to its original section.
        </p>
      </div>

      {}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search deleted items…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 border-2 border-black font-semibold"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filterCol}
            onChange={(e) => setFilterCol(e.target.value)}
            className="border-2 border-black rounded-md px-3 py-2 text-sm font-bold bg-background focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="all">All Types</option>
            {collectionOptions.map((col) => (
              <option key={col} value={col}>
                {getMeta(col).label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {}
      {loading ? (
        <div className="py-20 text-center text-muted-foreground font-semibold animate-pulse">
          Loading trash…
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 border-2 border-dashed border-black/20 rounded-xl">
          <Inbox className="w-14 h-14 text-muted-foreground/40" />
          <p className="text-lg font-black text-muted-foreground">
            {items.length === 0 ? "Trash is empty" : "No results match your filter"}
          </p>
          <p className="text-sm text-muted-foreground font-semibold">
            {items.length === 0
              ? "Deleted items from any section will appear here."
              : "Try a different search or filter."}
          </p>
        </div>
      ) : (
        <div className="border-2 border-black rounded-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/60">
              <TableRow className="border-b-2 border-black">
                <TableHead className="font-black text-xs uppercase tracking-widest w-36">Type</TableHead>
                <TableHead className="font-black text-xs uppercase tracking-widest">Record</TableHead>
                <TableHead className="font-black text-xs uppercase tracking-widest hidden md:table-cell">Details</TableHead>
                <TableHead className="font-black text-xs uppercase tracking-widest hidden lg:table-cell">Deleted At</TableHead>
                <TableHead className="text-right font-black text-xs uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => {
                const id         = String(item._id);
                const meta       = getMeta(item.originalCollection);
                const summary    = meta.summary(item.document);
                const isRestoring = restoringIds.has(id);
                const isDeleting  = deletingIds.has(id);
                const doc         = item.document;

                
                const detail =
                  doc.clientName ?? doc.client ?? doc.email ?? doc.status ?? doc.amount
                    ? [
                        doc.clientName ?? doc.client ?? "",
                        doc.email ?? "",
                        doc.amount != null ? `₹${Number(doc.amount).toLocaleString()}` : "",
                        doc.status ?? "",
                      ]
                        .filter(Boolean)
                        .join(" · ")
                    : "—";

                return (
                  <TableRow
                    key={id}
                    className="border-b-2 border-black/10 last:border-b-0 hover:bg-muted/30 transition-colors"
                  >
                    {}
                    <TableCell className="py-3">
                      <span
                        className={cn(
                          "text-xs font-black tracking-wider px-2 py-0.5 rounded-md whitespace-nowrap",
                          meta.colour,
                        )}
                      >
                        {meta.label}
                      </span>
                    </TableCell>

                    {}
                    <TableCell className="py-3 font-bold text-sm max-w-[200px] truncate">
                      {summary}
                    </TableCell>

                    {}
                    <TableCell className="py-3 text-sm text-muted-foreground hidden md:table-cell max-w-[240px] truncate">
                      {detail}
                    </TableCell>

                    {}
                    <TableCell className="py-3 text-xs text-muted-foreground hidden lg:table-cell whitespace-nowrap">
                      {item.deletedAt ? fmtDate(item.deletedAt) : "—"}
                    </TableCell>

                    {}
                    <TableCell className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-2 border-black font-bold gap-1.5 hover:bg-primary hover:text-primary-foreground"
                          disabled={isRestoring || isDeleting}
                          onClick={() => handleRestore(item)}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          {isRestoring ? "Restoring…" : "Restore"}
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="font-bold gap-1.5"
                              disabled={isRestoring || isDeleting}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              {isDeleting ? "Deleting…" : "Delete Forever"}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="border-2 border-black">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-black text-xl flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-destructive" />
                                Permanently Delete?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="font-semibold">
                                <span className={cn("text-xs font-black px-1.5 py-0.5 rounded mr-1", meta.colour)}>
                                  {meta.label}
                                </span>
                                <strong>{summary}</strong> will be permanently removed
                                from the database. This action{" "}
                                <strong className="text-destructive">cannot be undone</strong>.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-2 border-black font-bold">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground font-bold hover:bg-destructive/90"
                                onClick={() => handlePermanentDelete(item)}
                              >
                                Yes, Delete Forever
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <p className="text-xs text-muted-foreground font-semibold text-right">
        Showing {filtered.length} of {items.length} item{items.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
