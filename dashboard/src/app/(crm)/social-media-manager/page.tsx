"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Upload,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronRight,
  X,
  Check,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

const POST_TYPES = [
  "Image Post",
  "Reel-Phonk",
  "Reel-Explainer",
  "Meta Ad",
  "Carousel",
  "Story",
  "Video",
] as const;

const STATUSES = ["To Do", "In Progress", "In Review", "Done"] as const;
type Status = (typeof STATUSES)[number];

type ContentPlan = {
  _id?: string;
  week_number: number;
  week_label?: string;
  day_number: number;
  day_name: string;
  post_date: string;
  account: string;
  post_type: string;
  title: string;
  subtitle: string;
  product_image_note: string;
  price_tag: string;
  cta_button: string;
  emotional_touch: string;
  sound_note: string;
  caption: string;
  hashtags: string;
  reel_brief: string;
  ad_brief: string;
  status: Status;
  assigned_to: string;
  company: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
};

const emptyPlan = (): Omit<ContentPlan, "_id"> => ({
  week_number: 1,
  day_number: 1,
  day_name: "",
  post_date: "",
  account: "",
  post_type: "Image Post",
  title: "",
  subtitle: "",
  product_image_note: "",
  price_tag: "",
  cta_button: "",
  emotional_touch: "",
  sound_note: "",
  caption: "",
  hashtags: "",
  reel_brief: "",
  ad_brief: "",
  status: "To Do",
  assigned_to: "",
  company: "",
  created_by: "",
});

// ─── Status helpers ───────────────────────────────────────────────────────────

const statusConfig: Record<Status, { color: string; dot: string }> = {
  "To Do": { color: "bg-gray-100 text-gray-700 border-gray-300", dot: "bg-gray-400" },
  "In Progress": { color: "bg-blue-100 text-blue-700 border-blue-300", dot: "bg-blue-500" },
  "In Review": { color: "bg-amber-100 text-amber-700 border-amber-300", dot: "bg-amber-500" },
  Done: { color: "bg-green-100 text-green-700 border-green-300", dot: "bg-green-500" },
};

function StatusBadge({ status }: { status: Status }) {
  const cfg = statusConfig[status] ?? statusConfig["To Do"];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
        cfg.color,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
      {status}
    </span>
  );
}

// ─── Inline Status Picker ─────────────────────────────────────────────────────

function StatusPicker({
  value,
  onChange,
  disabled,
}: {
  value: Status;
  onChange: (s: Status) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (disabled) return <StatusBadge status={value} />;

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 focus:outline-none"
      >
        <StatusBadge status={value} />
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-1 left-0 bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[140px]">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => {
                onChange(s);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg",
                s === value && "bg-muted",
              )}
            >
              <span className={cn("w-2 h-2 rounded-full", statusConfig[s].dot)} />
              {s}
              {s === value && <Check className="w-3 h-3 ml-auto" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Row Detail Modal ─────────────────────────────────────────────────────────

function PlanModal({
  open,
  plan,
  users,
  isAdmin,
  onClose,
  onSave,
}: {
  open: boolean;
  plan: ContentPlan | null;
  users: { _id?: string; id?: number; name: string }[];
  isAdmin: boolean;
  onClose: () => void;
  onSave: (data: ContentPlan) => void;
}) {
  const [form, setForm] = useState<ContentPlan>(plan ?? (emptyPlan() as ContentPlan));

  useEffect(() => {
    setForm(plan ?? (emptyPlan() as ContentPlan));
  }, [plan, open]);

  const set = (field: keyof ContentPlan, value: any) =>
    setForm((f) => ({ ...f, [field]: value }));

  const Field = ({
    label,
    field,
    type = "text",
    textarea = false,
    disabled = false,
  }: {
    label: string;
    field: keyof ContentPlan;
    type?: string;
    textarea?: boolean;
    disabled?: boolean;
  }) => (
    <div className="space-y-1">
      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      {textarea ? (
        <Textarea
          value={String(form[field] ?? "")}
          onChange={(e) => set(field, e.target.value)}
          disabled={disabled || !isAdmin}
          rows={3}
          className="text-sm"
        />
      ) : (
        <Input
          type={type}
          value={String(form[field] ?? "")}
          onChange={(e) => set(field, e.target.value)}
          disabled={disabled || !isAdmin}
          className="text-sm"
        />
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto font-headline">
        <DialogHeader>
          <DialogTitle className="text-xl font-black tracking-tighter">
            {plan?._id ? (isAdmin ? "Edit Task" : "View Task") : "New Task"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-2">
          {/* Week / Day */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Week #
            </label>
            <Input
              type="number"
              value={form.week_number}
              onChange={(e) => set("week_number", Number(e.target.value))}
              disabled={!isAdmin}
              className="text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Day #
            </label>
            <Input
              type="number"
              value={form.day_number}
              onChange={(e) => set("day_number", Number(e.target.value))}
              disabled={!isAdmin}
              className="text-sm"
            />
          </div>
          <Field label="Day Name" field="day_name" />
          <Field label="Post Date" field="post_date" type="date" />
          <Field label="Account (e.g. @handle)" field="account" />

          {/* Post Type */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Post Type
            </label>
            <Select
              value={form.post_type}
              onValueChange={(v) => set("post_type", v)}
              disabled={!isAdmin}
            >
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {POST_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <Field label="Title" field="title" />
          </div>
          <div className="col-span-2">
            <Field label="Subtitle" field="subtitle" />
          </div>
          <Field label="Product Image Note" field="product_image_note" />
          <Field label="Price Tag" field="price_tag" />
          <Field label="CTA Button" field="cta_button" />
          <Field label="Emotional Touch" field="emotional_touch" />
          <Field label="Sound Note" field="sound_note" />

          <div className="col-span-2">
            <Field label="Caption" field="caption" textarea />
          </div>
          <div className="col-span-2">
            <Field label="Hashtags" field="hashtags" textarea />
          </div>
          <div className="col-span-2">
            <Field label="Reel Brief" field="reel_brief" textarea />
          </div>
          <div className="col-span-2">
            <Field label="Ad Brief" field="ad_brief" textarea />
          </div>

          {/* Status — editable by both admin and assigned staff */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Status
            </label>
            <Select
              value={form.status}
              onValueChange={(v) => set("status", v as Status)}
            >
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assign To — admin only */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Assigned To
            </label>
            <Select
              value={form.assigned_to}
              onValueChange={(v) => set("assigned_to", v)}
              disabled={!isAdmin}
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Unassigned" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Unassigned</SelectItem>
                {users.map((u) => {
                  const uid = String(u._id ?? u.id ?? u.name);
                  return (
                    <SelectItem key={uid} value={uid}>
                      {u.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {isAdmin && (
            <div className="col-span-2">
              <Field label="Company / Client" field="company" />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => onSave(form)}
            className="bg-black text-white hover:bg-black/80"
          >
            <Check className="w-4 h-4 mr-1" /> Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Import Modal ─────────────────────────────────────────────────────────────

function ImportModal({
  open,
  userId,
  onClose,
  onDone,
}: {
  open: boolean;
  userId: string;
  onClose: () => void;
  onDone: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImport = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("company", company);
      fd.append("created_by", userId);
      const res = await fetch("/api/content-plans/import", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      onDone();
      onClose();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md font-headline">
        <DialogHeader>
          <DialogTitle className="text-xl font-black tracking-tighter">
            Import from Excel
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <p className="text-sm text-muted-foreground">
            Upload an <strong>.xlsx</strong> or <strong>.csv</strong> file. Column headers
            should match the field names (e.g. <code>week_number</code>, <code>title</code>,
            <code>assigned_to</code>, etc.)
          </p>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider">Company / Client</label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Kalahanu Agencies"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider">Excel File</label>
            <Input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            onClick={handleImport}
            disabled={!file || loading}
            className="w-full bg-black text-white hover:bg-black/80"
          >
            <Upload className="w-4 h-4 mr-2" />
            {loading ? "Importing…" : "Import"}
          </Button>

          {/* Template download hint */}
          <p className="text-xs text-center text-muted-foreground">
            Expected columns: <strong>Week</strong>, <strong>Day No.</strong>, <strong>Post Date</strong>,{" "}
            <strong>Client / Company</strong>, <strong>Account</strong>, <strong>Post Type</strong>,{" "}
            <strong>Title</strong>, <strong>Subtitle</strong>, <strong>Product Image Note</strong>,{" "}
            <strong>Price Tag</strong>, <strong>CTA Button</strong>, <strong>Emotional Touch</strong>,{" "}
            <strong>Caption</strong>, <strong>Hashtags</strong>, <strong>Reel / Ad Brief</strong>,{" "}
            <strong>Assigned To</strong>, <strong>Status</strong>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Week Group ───────────────────────────────────────────────────────────────

function WeekGroup({
  week,
  rows,
  isAdmin,
  userId,
  users,
  onStatusChange,
  onEdit,
  onDelete,
}: {
  week: number;
  rows: ContentPlan[];
  isAdmin: boolean;
  userId: string;
  users: { _id?: string; id?: number; name: string }[];
  onStatusChange: (id: string, status: Status) => void;
  onEdit: (plan: ContentPlan) => void;
  onDelete: (id: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const getUserName = (uid: string) => {
    const u = users.find(
      (x) => String(x._id ?? x.id) === uid || x.name === uid,
    );
    return u ? u.name : uid || "—";
  };

  return (
    <div className="mb-4">
      {/* Week header */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center gap-2 w-full text-left px-3 py-2 bg-black text-white rounded-t-lg font-black tracking-tight text-sm hover:bg-black/80 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
        {rows[0]?.week_label ? rows[0].week_label.toUpperCase() : `WEEK ${week}`}
        <span className="ml-auto font-normal opacity-70">{rows.length} tasks</span>
      </button>

      {!collapsed && (
        <div className="overflow-x-auto border-2 border-t-0 border-black rounded-b-lg">
          <table className="w-full text-sm min-w-[1100px]">
            <thead>
              <tr className="border-b-2 border-black bg-muted/50">
                {[
                  "Day",
                  "Date",
                  "Account",
                  "Post Type",
                  "Title",
                  "Status",
                  "Assigned To",
                  ...(isAdmin ? ["Actions"] : []),
                ].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2 text-left text-xs font-black uppercase tracking-wider text-muted-foreground whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const id = String(row._id);
                const canChangeStatus =
                  isAdmin || String(row.assigned_to) === userId;
                return (
                  <tr
                    key={id}
                    className="border-b border-muted hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-3 py-2 whitespace-nowrap font-medium">
                      <span className="text-muted-foreground text-xs mr-1">D{row.day_number}</span>
                      {row.day_name}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs text-muted-foreground">
                      {row.post_date || "—"}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                        {row.account || "—"}
                      </code>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className="text-xs bg-black/5 border border-black/10 px-2 py-0.5 rounded font-medium">
                        {row.post_type}
                      </span>
                    </td>
                    <td className="px-3 py-2 max-w-[200px]">
                      <div className="font-semibold truncate">{row.title || "—"}</div>
                      {row.subtitle && (
                        <div className="text-xs text-muted-foreground truncate">{row.subtitle}</div>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <StatusPicker
                        value={row.status}
                        onChange={(s) => onStatusChange(id, s)}
                        disabled={!canChangeStatus}
                      />
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      {getUserName(row.assigned_to)}
                    </td>
                    {isAdmin && (
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onEdit(row)}
                            className="p-1.5 rounded hover:bg-muted border border-transparent hover:border-black/20 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDelete(id)}
                            className="p-1.5 rounded hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SocialMediaManagerPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const userId = String(user?._id ?? user?.id ?? "");

  const [plans, setPlans] = useState<ContentPlan[]>([]);
  const [users, setUsers] = useState<{ _id?: string; id?: number; name: string }[]>([]);
  const [filterCompany, setFilterCompany] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "">("");
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editPlan, setEditPlan] = useState<ContentPlan | null>(null);
  const [importOpen, setImportOpen] = useState(false);

  const load = async () => {
    const params = new URLSearchParams();
    if (!isAdmin) params.set("assignedTo", userId);
    const res = await fetch(`/api/content-plans?${params}`);
    const data = await res.json();
    setPlans(Array.isArray(data) ? data : []);
  };

  const loadUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    if (userId) {
      load();
      loadUsers();
    }
  }, [userId, isAdmin]);

  // ── Filtering ──────────────────────────────────────────────────────────────
  const visible = plans.filter((p) => {
    if (filterCompany && p.company !== filterCompany) return false;
    if (filterStatus && p.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.account.toLowerCase().includes(q) ||
        p.caption.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const companies = [...new Set(plans.map((p) => p.company).filter(Boolean))];

  // Group by week
  const byWeek = visible.reduce<Record<number, ContentPlan[]>>((acc, p) => {
    (acc[p.week_number] ??= []).push(p);
    return acc;
  }, {});
  const weeks = Object.keys(byWeek)
    .map(Number)
    .sort((a, b) => a - b);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleStatusChange = async (id: string, status: Status) => {
    setPlans((prev) =>
      prev.map((p) => (String(p._id) === id ? { ...p, status } : p)),
    );
    await fetch(`/api/content-plans/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, staffOnly: !isAdmin }),
    });
  };

  const handleSave = async (data: ContentPlan) => {
    if (data._id) {
      const res = await fetch(`/api/content-plans/${data._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });
      const updated = await res.json();
      setPlans((prev) =>
        prev.map((p) => (String(p._id) === String(data._id) ? updated : p)),
      );
    } else {
      const res = await fetch("/api/content-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, created_by: userId }),
      });
      const created = await res.json();
      setPlans((prev) => [...prev, created]);
    }
    setModalOpen(false);
    setEditPlan(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return;
    await fetch(`/api/content-plans/${id}`, { method: "DELETE" });
    setPlans((prev) => prev.filter((p) => String(p._id) !== id));
  };

  const openNew = () => {
    setEditPlan(null);
    setModalOpen(true);
  };

  const openEdit = (plan: ContentPlan) => {
    setEditPlan(plan);
    setModalOpen(true);
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  const statsMap = STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = visible.filter((p) => p.status === s).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6 font-headline">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">
            SOCIAL MEDIA MANAGER
          </h1>
          <p className="text-muted-foreground">
            {isAdmin
              ? "Plan, assign, and track content tasks for your team"
              : "Your assigned content tasks"}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {isAdmin && (
            <Button
              variant="outline"
              className="border-2 border-black font-bold"
              onClick={() => setImportOpen(true)}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Excel
            </Button>
          )}
          {isAdmin && (
            <Button
              className="bg-black text-white hover:bg-black/80 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              onClick={openNew}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          )}
        </div>
      </header>

      {/* Stats pills */}
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => {
          const cfg = statusConfig[s];
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(filterStatus === s ? "" : s)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all",
                filterStatus === s
                  ? "border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "border-transparent hover:border-black/30",
                cfg.color,
              )}
            >
              <span className={cn("w-2 h-2 rounded-full", cfg.dot)} />
              {s}
              <span className="ml-1 bg-black/10 px-1.5 rounded-full">
                {statsMap[s] ?? 0}
              </span>
            </button>
          );
        })}
        <span className="ml-auto text-xs text-muted-foreground self-center">
          {visible.length} task{visible.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search title, account, caption…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-56 border-2 border-black"
        />
        {isAdmin && (
          <Select
            value={filterCompany || "__all__"}
            onValueChange={(v) => setFilterCompany(v === "__all__" ? "" : v)}
          >
            <SelectTrigger className="w-48 border-2 border-black">
              <SelectValue placeholder="All Companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All Companies</SelectItem>
              {companies.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {(filterCompany || filterStatus || search) && (
          <button
            onClick={() => {
              setFilterCompany("");
              setFilterStatus("");
              setSearch("");
            }}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>

      {/* Table grouped by week */}
      {weeks.length === 0 ? (
        <div className="border-2 border-dashed border-black rounded-lg p-12 text-center">
          <p className="text-lg font-bold text-muted-foreground">
            {isAdmin ? "No tasks yet. Add one or import from Excel." : "No tasks assigned to you yet."}
          </p>
          {isAdmin && (
            <Button className="mt-4 bg-black text-white" onClick={openNew}>
              <Plus className="w-4 h-4 mr-2" /> Add Task
            </Button>
          )}
        </div>
      ) : (
        weeks.map((w) => (
          <WeekGroup
            key={w}
            week={w}
            rows={byWeek[w].sort((a, b) => a.day_number - b.day_number)}
            isAdmin={isAdmin}
            userId={userId}
            users={users}
            onStatusChange={handleStatusChange}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        ))
      )}

      {/* Modals */}
      <PlanModal
        open={modalOpen}
        plan={editPlan}
        users={users}
        isAdmin={isAdmin}
        onClose={() => {
          setModalOpen(false);
          setEditPlan(null);
        }}
        onSave={handleSave}
      />

      <ImportModal
        open={importOpen}
        userId={userId}
        onClose={() => setImportOpen(false)}
        onDone={load}
      />
    </div>
  );
}
