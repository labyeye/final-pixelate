"use client";

import { useEffect, useRef, useState } from "react";
<<<<<<< HEAD
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
=======
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";

// ─── Types ────────────────────────────────────────────────────────────────────

type TaskStatus = "To Do" | "In Progress" | "In Review" | "Done";

interface Task {
  _id?: string;
  id?: string;
  title: string;
  scheduledDate: string;
  scheduledTime: string;
  platform: string;
  contentType: string;
  caption: string;
  hashtags: string;
  mediaUrl: string;
  reelVideoLink: string;
  campaign: string;
  company: string;
  assignedTo: string;
  notes: string;
  status: TaskStatus;
  approvalStatus: string;
}

const STATUSES: TaskStatus[] = ["To Do", "In Progress", "In Review", "Done"];
const PLATFORMS = ["Instagram", "Facebook", "X / Twitter", "LinkedIn", "YouTube Shorts", "WhatsApp Channel", "Google My Business"];
const CONTENT_TYPES = ["Image Post", "Reel", "Video", "Carousel", "Story", "Blog Idea", "Text Post"];

const STATUS_STYLE: Record<TaskStatus, string> = {
  "To Do":      "bg-gray-100 text-gray-700 border-gray-300",
  "In Progress":"bg-blue-100 text-blue-700 border-blue-300",
  "In Review":  "bg-amber-100 text-amber-700 border-amber-300",
  "Done":       "bg-green-100 text-green-700 border-green-300",
};

const APPROVAL_STYLE: Record<string, string> = {
  Pending:  "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

// ─── Day label helper ─────────────────────────────────────────────────────────
// Within a campaign group, assign D1, D2… based on sorted unique dates
function buildDayMap(tasks: Task[]): Map<string, string> {
  const uniqueDates = Array.from(new Set(tasks.map((t) => t.scheduledDate).filter(Boolean))).sort();
  const map = new Map<string, string>();
  uniqueDates.forEach((date, i) => map.set(date, `D${i + 1}`));
  return map;
}

// ─── View Modal ───────────────────────────────────────────────────────────────
function ViewModal({ task, onClose }: { task: Task; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-black text-white px-5 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="font-black text-lg">{task.title}</h2>
            <p className="text-gray-300 text-xs mt-0.5">{task.campaign || "No Campaign"}</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-300 text-2xl font-black leading-none">×</button>
        </div>
        <div className="p-5 space-y-4">
          {/* Meta row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Platform", value: task.platform },
              { label: "Content Type", value: task.contentType },
              { label: "Scheduled Date", value: task.scheduledDate || "—" },
              { label: "Scheduled Time", value: task.scheduledTime || "—" },
              { label: "Assigned To", value: task.assignedTo || "—" },
              { label: "Company", value: task.company || "—" },
              { label: "Status", value: task.status },
              { label: "Approval", value: task.approvalStatus || "—" },
            ].map(({ label, value }) => (
              <div key={label} className="border-2 border-black rounded-lg p-2">
                <p className="text-xs font-bold text-gray-500 mb-0.5">{label.toUpperCase()}</p>
                <p className="text-sm font-black">{value}</p>
              </div>
            ))}
          </div>

          {/* Caption */}
          <div className="border-2 border-black rounded-lg p-3">
            <p className="text-xs font-black text-gray-500 mb-1">CAPTION</p>
            <p className="text-sm whitespace-pre-wrap">{task.caption || "—"}</p>
          </div>

          {/* Hashtags */}
          {task.hashtags && (
            <div className="border-2 border-black rounded-lg p-3">
              <p className="text-xs font-black text-gray-500 mb-1">HASHTAGS</p>
              <p className="text-sm text-blue-700">{task.hashtags}</p>
            </div>
          )}

          {/* Media links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {task.mediaUrl && (
              <div className="border-2 border-black rounded-lg p-3">
                <p className="text-xs font-black text-gray-500 mb-1">MEDIA URL</p>
                <a href={task.mediaUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-blue-600 underline break-all">{task.mediaUrl}</a>
              </div>
            )}
            {task.reelVideoLink && (
              <div className="border-2 border-black rounded-lg p-3">
                <p className="text-xs font-black text-gray-500 mb-1">REEL VIDEO LINK</p>
                <a href={task.reelVideoLink} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-blue-600 underline break-all">{task.reelVideoLink}</a>
              </div>
            )}
          </div>

          {/* Notes */}
          {task.notes && (
            <div className="border-2 border-black rounded-lg p-3">
              <p className="text-xs font-black text-gray-500 mb-1">NOTES</p>
              <p className="text-sm">{task.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Add / Edit Modal ─────────────────────────────────────────────────────────
function TaskFormModal({
  initial,
  onClose,
  onSave,
}: {
  initial?: Partial<Task>;
  onClose: () => void;
  onSave: (t: Partial<Task>) => Promise<void>;
}) {
  const [form, setForm] = useState<Partial<Task>>({
    title: "",
    scheduledDate: "",
    scheduledTime: "",
    platform: "Instagram",
    contentType: "Image Post",
    caption: "",
    hashtags: "",
    mediaUrl: "",
    reelVideoLink: "",
    campaign: "",
    company: "",
    assignedTo: "",
    notes: "",
    status: "To Do",
    approvalStatus: "Pending",
    ...initial,
  });
  const [saving, setSaving] = useState(false);

  const set = (k: keyof Task, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.title?.trim()) { alert("Title is required"); return; }
    setSaving(true);
    try { await onSave(form); onClose(); }
    catch (e: any) { alert(e.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-black text-white px-5 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="font-black text-lg">{initial?._id ? "Edit Task" : "Add Task"}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300 text-2xl font-black leading-none">×</button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <label className="block text-xs font-black mb-1">TITLE *</label>
              <Input value={form.title || ""} onChange={(e) => set("title", e.target.value)} className="border-2 border-black" />
            </div>
            <div>
              <label className="block text-xs font-black mb-1">PLATFORM</label>
              <select value={form.platform} onChange={(e) => set("platform", e.target.value)} className="w-full border-2 border-black rounded-md p-2 text-sm">
                {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black mb-1">CONTENT TYPE</label>
              <select value={form.contentType} onChange={(e) => set("contentType", e.target.value)} className="w-full border-2 border-black rounded-md p-2 text-sm">
                {CONTENT_TYPES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black mb-1">SCHEDULED DATE</label>
              <Input type="date" value={form.scheduledDate || ""} onChange={(e) => set("scheduledDate", e.target.value)} className="border-2 border-black" />
            </div>
            <div>
              <label className="block text-xs font-black mb-1">SCHEDULED TIME</label>
              <Input type="time" value={form.scheduledTime || ""} onChange={(e) => set("scheduledTime", e.target.value)} className="border-2 border-black" />
            </div>
            <div>
              <label className="block text-xs font-black mb-1">CAMPAIGN / WEEK</label>
              <Input value={form.campaign || ""} onChange={(e) => set("campaign", e.target.value)} placeholder="e.g. Week 1 – Engagement" className="border-2 border-black" />
            </div>
            <div>
              <label className="block text-xs font-black mb-1">COMPANY <span className="font-normal text-gray-400">(reference only)</span></label>
              <Input value={form.company || ""} onChange={(e) => set("company", e.target.value)} placeholder="e.g. Kalahanu Tech" className="border-2 border-black" />
            </div>
            <div>
              <label className="block text-xs font-black mb-1">ASSIGNED TO</label>
              <Input value={form.assignedTo || ""} onChange={(e) => set("assignedTo", e.target.value)} className="border-2 border-black" />
            </div>
            <div>
              <label className="block text-xs font-black mb-1">STATUS</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value as TaskStatus)} className="w-full border-2 border-black rounded-md p-2 text-sm">
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black mb-1">APPROVAL STATUS</label>
              <select value={form.approvalStatus} onChange={(e) => set("approvalStatus", e.target.value)} className="w-full border-2 border-black rounded-md p-2 text-sm">
                {["Pending", "Approved", "Rejected"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-black mb-1">CAPTION</label>
              <textarea value={form.caption || ""} onChange={(e) => set("caption", e.target.value)} rows={3} className="w-full border-2 border-black rounded-md p-2 text-sm resize-none focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-black mb-1">HASHTAGS</label>
              <Input value={form.hashtags || ""} onChange={(e) => set("hashtags", e.target.value)} placeholder="#tag1 #tag2" className="border-2 border-black" />
            </div>
            <div>
              <label className="block text-xs font-black mb-1">MEDIA URL</label>
              <Input value={form.mediaUrl || ""} onChange={(e) => set("mediaUrl", e.target.value)} placeholder="https://..." className="border-2 border-black" />
            </div>
            <div>
              <label className="block text-xs font-black mb-1">REEL VIDEO LINK</label>
              <Input value={form.reelVideoLink || ""} onChange={(e) => set("reelVideoLink", e.target.value)} placeholder="https://..." className="border-2 border-black" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-black mb-1">NOTES</label>
              <textarea value={form.notes || ""} onChange={(e) => set("notes", e.target.value)} rows={2} className="w-full border-2 border-black rounded-md p-2 text-sm resize-none focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="border-t-2 border-black p-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={saving} className="border-2 border-black font-bold">Cancel</Button>
          <Button onClick={handleSubmit} disabled={saving} className="bg-black text-white font-black border-2 border-black">
            {saving ? "Saving…" : "Save Task"}
          </Button>
        </div>
      </div>
>>>>>>> 33d44498e (D)
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
<<<<<<< HEAD

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
=======
export default function SocialMediaManagerPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("");

  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [editTask, setEditTask] = useState<Task | null | "new">(null);

  const [importing, setImporting] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const url = new URL("/api/social-media-tasks", window.location.origin);
      // Staff see only their own tasks; admins see all
      if (!isAdmin && user.name) {
        url.searchParams.set("assignedTo", user.name);
      }
      const res = await fetch(url.toString(), { cache: "no-store" });
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [user]);

  // Filters
  const filtered = tasks.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch = !search ||
      t.title?.toLowerCase().includes(q) ||
      t.company?.toLowerCase().includes(q) ||
      t.assignedTo?.toLowerCase().includes(q) ||
      t.campaign?.toLowerCase().includes(q);
    const matchStatus = !statusFilter || t.status === statusFilter;
    const matchCampaign = !campaignFilter || t.campaign === campaignFilter;
    return matchSearch && matchStatus && matchCampaign;
  });

  // Group by campaign
  const campaigns = Array.from(new Set(filtered.map((t) => t.campaign || ""))).sort();
  const grouped = campaigns.map((camp) => ({
    campaign: camp || "No Campaign",
    tasks: filtered.filter((t) => (t.campaign || "") === camp),
  }));

  // Count by status
  const countBy = (s: TaskStatus) => tasks.filter((t) => t.status === s).length;

  // All unique campaigns for filter dropdown
  const allCampaigns = Array.from(new Set(tasks.map((t) => t.campaign || "").filter(Boolean))).sort();

  // Status update
  const updateStatus = async (task: Task, status: TaskStatus) => {
    const id = task._id || task.id;
    await fetch(`/api/social-media-tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setTasks((prev) => prev.map((t) => (t._id || t.id) === id ? { ...t, status } : t));
  };

  const deleteTask = async (task: Task) => {
    if (!confirm(`Delete "${task.title}"?`)) return;
    const id = task._id || task.id;
    await fetch(`/api/social-media-tasks/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => (t._id || t.id) !== id));
  };

  const saveTask = async (data: Partial<Task>) => {
    if (editTask && editTask !== "new" && (editTask._id || editTask.id)) {
      const id = editTask._id || editTask.id;
      await fetch(`/api/social-media-tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/social-media-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    await load();
  };

  // Excel import
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(new Uint8Array(buffer), { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows: any[] = XLSX.utils.sheet_to_json(ws, { defval: "" });

      let skipped = 0;
      const docs: any[] = [];
      for (const row of rows) {
        const title = String(row["Title"] || row["title"] || "").trim();
        if (!title) { skipped++; continue; }
        docs.push({
          title,
          scheduledDate: String(row["Scheduled Date"] || row["scheduled_date"] || "").trim(),
          scheduledTime: String(row["Scheduled Time"] || row["scheduled_time"] || "").trim(),
          platform: String(row["Platform"] || row["platform"] || "Instagram").trim(),
          contentType: String(row["Content Type"] || row["content_type"] || "Image Post").trim(),
          caption: String(row["Caption"] || row["caption"] || "").trim(),
          hashtags: String(row["Hashtags"] || row["hashtags"] || "").trim(),
          mediaUrl: String(row["Media URL"] || row["media_url"] || "").trim(),
          reelVideoLink: String(row["Reel Video Link"] || row["reel_video_link"] || "").trim(),
          campaign: String(row["Campaign"] || row["campaign"] || "").trim(),
          company: String(row["Company"] || row["company"] || "").trim(),
          assignedTo: String(row["Assigned To"] || row["assigned_to"] || "").trim(),
          notes: String(row["Notes"] || row["notes"] || "").trim(),
          status: "To Do" as TaskStatus,
          approvalStatus: String(row["Approval Status"] || row["approval_status"] || "Pending").trim(),
        });
      }

      if (docs.length === 0) { alert("No valid rows found (Title column required)."); return; }

      const res = await fetch("/api/social-media-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(docs),
      });
      const result = await res.json();
      alert(`Import done: ${result.insertedCount} tasks added, ${skipped} rows skipped.`);
      await load();
    } catch (err: any) {
      alert(`Import failed: ${err.message}`);
    } finally {
      setImporting(false);
      if (importRef.current) importRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-background font-headline p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">SOCIAL MEDIA MANAGER</h1>
          <p className="text-muted-foreground mt-1">Plan, assign, and track content tasks for your team</p>
        </div>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <>
              <input ref={importRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleImport} />
              <Button
                variant="outline"
                onClick={() => importRef.current?.click()}
                disabled={importing}
                className="border-2 border-black font-bold gap-2"
              >
                {importing ? "Importing…" : "⬆ Import Excel"}
              </Button>
              <Button
                onClick={() => setEditTask("new")}
                className="bg-black text-white font-black border-2 border-black gap-2"
              >
                + Add Task
              </Button>
            </>
          )}
          {!isAdmin && user?.name && (
            <span className="text-sm font-bold text-gray-600 border-2 border-gray-300 rounded-lg px-3 py-1.5">
              Showing tasks for: <span className="text-black">{user.name}</span>
            </span>
          )}
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border-2 text-sm font-bold transition-all ${
              statusFilter === s
                ? "border-black bg-black text-white"
                : `border-gray-300 ${STATUS_STYLE[s]}`
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${
              s === "To Do" ? "bg-gray-400" : s === "In Progress" ? "bg-blue-500" : s === "In Review" ? "bg-amber-500" : "bg-green-500"
            }`} />
            {s}
            <span className="font-black">({countBy(s)})</span>
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-500 font-semibold">{filtered.length} tasks</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Input
          placeholder="Search title, company, campaign..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 border-black font-semibold max-w-xs"
        />
        <select
          value={campaignFilter}
          onChange={(e) => setCampaignFilter(e.target.value)}
          className="px-3 py-2 border-2 border-black rounded-md bg-white font-semibold text-sm"
        >
          <option value="">All Companies</option>
          {allCampaigns.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {(search || statusFilter || campaignFilter) && (
          <button
            onClick={() => { setSearch(""); setStatusFilter(""); setCampaignFilter(""); }}
            className="px-3 py-2 border-2 border-black rounded-md text-xs font-bold hover:bg-gray-50"
          >
            ✕ Clear
>>>>>>> 33d44498e (D)
          </button>
        )}
      </div>

<<<<<<< HEAD
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
=======
      {/* Table grouped by Campaign */}
      {loading ? (
        <div className="border-2 border-black rounded-xl p-12 text-center text-muted-foreground font-semibold">
          Loading tasks…
        </div>
      ) : filtered.length === 0 ? (
        <div className="border-2 border-black rounded-xl p-12 text-center">
          <p className="text-xl font-black">No tasks found</p>
          <p className="text-sm text-gray-500 mt-1">Import an Excel file or add tasks manually</p>
        </div>
      ) : (
        <div className="space-y-4">
          {grouped.map(({ campaign, tasks: campTasks }) => {
            const dayMap = buildDayMap(campTasks);
            return (
              <div key={campaign} className="border-2 border-black rounded-xl overflow-hidden">
                {/* Week header */}
                <div className="bg-black text-white px-4 py-2.5 flex items-center justify-between">
                  <span className="font-black text-sm uppercase tracking-wide">{campaign}</span>
                  <span className="text-xs text-gray-400">{campTasks.length} tasks</span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b-2 border-black">
                      <tr>
                        {["DAY", "DATE", "COMPANY", "POST TYPE", "TITLE", "STATUS", "ASSIGNED TO", "ACTIONS"].map((h) => (
                          <th key={h} className="px-3 py-2.5 text-left text-xs font-black uppercase text-gray-600 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {campTasks.map((task, i) => {
                        const taskId = task._id || task.id || String(i);
                        const dayLabel = task.scheduledDate ? (dayMap.get(task.scheduledDate) || "—") : "—";
                        return (
                          <tr key={taskId} className={`border-b border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                            <td className="px-3 py-2.5">
                              <span className="text-xs font-black text-gray-500">{dayLabel}</span>
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap text-xs text-gray-600 font-semibold">
                              {task.scheduledDate || "—"}
                              {task.scheduledTime && <span className="ml-1 text-gray-400">{task.scheduledTime}</span>}
                            </td>
                            <td className="px-3 py-2.5 max-w-[120px]">
                              <span className="text-xs text-gray-500 truncate block">{task.company || "—"}</span>
                            </td>
                            <td className="px-3 py-2.5">
                              <span className="inline-block px-2 py-0.5 bg-gray-100 rounded text-xs font-semibold text-gray-700 whitespace-nowrap">
                                {task.contentType}
                              </span>
                            </td>
                            <td className="px-3 py-2.5 max-w-[220px]">
                              <div className="font-black text-sm truncate">{task.title}</div>
                              {task.platform && (
                                <div className="text-xs text-gray-400 mt-0.5">{task.platform}</div>
                              )}
                            </td>
                            <td className="px-3 py-2.5">
                              <select
                                value={task.status}
                                onChange={(e) => updateStatus(task, e.target.value as TaskStatus)}
                                className={`text-xs font-bold px-2 py-1 rounded border cursor-pointer ${STATUS_STYLE[task.status]}`}
                              >
                                {STATUSES.map((s) => <option key={s}>{s}</option>)}
                              </select>
                            </td>
                            <td className="px-3 py-2.5 text-xs font-semibold text-gray-700 whitespace-nowrap">
                              {task.assignedTo || "—"}
                            </td>
                            <td className="px-3 py-2.5">
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => setViewTask(task)}
                                  className="px-2.5 py-1 text-xs font-bold border-2 border-black rounded hover:bg-black hover:text-white transition-colors"
                                >
                                  View
                                </button>
                                {isAdmin && (
                                  <>
                                    <button
                                      onClick={() => setEditTask(task)}
                                      className="px-2.5 py-1 text-xs font-bold border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => deleteTask(task)}
                                      className="px-2.5 py-1 text-xs font-bold border-2 border-red-400 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                      ✕
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {viewTask && <ViewModal task={viewTask} onClose={() => setViewTask(null)} />}
      {editTask && (
        <TaskFormModal
          initial={editTask === "new" ? undefined : editTask}
          onClose={() => setEditTask(null)}
          onSave={saveTask}
        />
      )}
>>>>>>> 33d44498e (D)
    </div>
  );
}
