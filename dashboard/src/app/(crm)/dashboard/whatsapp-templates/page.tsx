"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  RefreshCw,
  Search,
  Copy,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  ChevronDown,
  Eye,
  FileText,
  Loader2,
  AlertCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WaButton {
  type: "QUICK_REPLY" | "URL" | "PHONE_NUMBER";
  text: string;
  url?: string;
  phone?: string;
}

interface WaTemplate {
  _id: string;
  name: string;
  category: "MARKETING" | "UTILITY" | "AUTHENTICATION";
  language: string;
  headerType: "NONE" | "TEXT" | "IMAGE" | "DOCUMENT" | "VIDEO";
  headerText?: string | null;
  body: string;
  footer?: string | null;
  buttons: WaButton[];
  variables: string[];
  notes?: string | null;
  status: "LOCAL" | "SUBMITTED" | "APPROVED" | "REJECTED" | "PAUSED" | "UNKNOWN";
  metaTemplateId?: string | null;
  syncedFromMeta?: boolean;
  createdAt: string;
  updatedAt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  MARKETING: "Marketing",
  UTILITY: "Utility",
  AUTHENTICATION: "Authentication",
};

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; border: string }
> = {
  APPROVED: {
    label: "Approved",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-600",
  },
  LOCAL: {
    label: "Local Draft",
    bg: "bg-neutral-100",
    text: "text-neutral-600",
    border: "border-neutral-400",
  },
  SUBMITTED: {
    label: "Under Review",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-500",
  },
  REJECTED: {
    label: "Rejected",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-500",
  },
  PAUSED: {
    label: "Paused",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-500",
  },
  UNKNOWN: {
    label: "Unknown",
    bg: "bg-neutral-100",
    text: "text-neutral-500",
    border: "border-neutral-300",
  },
};

const HEADER_TYPES = ["NONE", "TEXT", "IMAGE", "DOCUMENT", "VIDEO"];
const CATEGORIES = ["MARKETING", "UTILITY", "AUTHENTICATION"];
const LANGUAGES = [
  { code: "en_US", label: "English (US)" },
  { code: "en_GB", label: "English (UK)" },
  { code: "hi", label: "Hindi" },
  { code: "mr", label: "Marathi" },
  { code: "gu", label: "Gujarati" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "bn", label: "Bengali" },
];

// ─── Variable highlighter — replaces {{n}} with a badge in the preview ───────
function renderBodyPreview(text: string) {
  const parts = text.split(/({{[^}]+}})/g);
  return parts.map((part, i) => {
    if (/^{{[^}]+}}$/.test(part)) {
      return (
        <span
          key={i}
          className="inline-block px-1.5 py-0.5 text-[10px] font-black bg-yellow-200 text-yellow-900 border border-yellow-400 rounded mx-0.5 align-middle"
        >
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ─── Blank form state ─────────────────────────────────────────────────────────
interface FormState {
  name: string;
  category: WaTemplate["category"];
  language: string;
  headerType: WaTemplate["headerType"];
  headerText: string;
  body: string;
  footer: string;
  buttons: WaButton[];
  variables: string[];
  notes: string;
}

const blankForm = (): FormState => ({
  name: "",
  category: "UTILITY",
  language: "en_US",
  headerType: "NONE",
  headerText: "",
  body: "",
  footer: "",
  buttons: [],
  variables: [],
  notes: "",
});

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WhatsAppTemplatesPage() {
  const { toast } = useToast();

  const [templates, setTemplates] = useState<WaTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<WaTemplate | null>(null);
  const [form, setForm] = useState<FormState>(blankForm());
  const [saving, setSaving] = useState(false);

  const [previewTemplate, setPreviewTemplate] = useState<WaTemplate | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [newButtonText, setNewButtonText] = useState("");
  const [newButtonType, setNewButtonType] = useState<WaButton["type"]>("QUICK_REPLY");
  const [newVariableLabel, setNewVariableLabel] = useState("");

  // ── fetch ──────────────────────────────────────────────────────────────────
  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/whatsapp-templates");
      const data = await res.json();
      setTemplates(Array.isArray(data) ? data : []);
    } catch {
      toast({ title: "Error", description: "Could not load templates.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTemplates(); }, []);

  // ── sync from Meta ─────────────────────────────────────────────────────────
  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/whatsapp-templates/sync");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sync failed");
      toast({
        title: "Synced from Meta",
        description: `${data.total} templates fetched — ${data.upserted} updated, ${data.skipped} unchanged.`,
      });
      await fetchTemplates();
    } catch (err: any) {
      toast({ title: "Sync Failed", description: err.message, variant: "destructive" });
    } finally {
      setSyncing(false);
    }
  };

  // ── filtered list ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.body.toLowerCase().includes(q) ||
        (t.notes ?? "").toLowerCase().includes(q);
      const matchCategory =
        filterCategory === "all" || t.category === filterCategory;
      const matchStatus =
        filterStatus === "all" || t.status === filterStatus;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [templates, search, filterCategory, filterStatus]);

  // ── stats ──────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    return {
      total: templates.length,
      approved: templates.filter((t) => t.status === "APPROVED").length,
      local: templates.filter((t) => t.status === "LOCAL").length,
      rejected: templates.filter((t) => t.status === "REJECTED").length,
    };
  }, [templates]);

  // ── open create/edit form ──────────────────────────────────────────────────
  const openCreate = () => {
    setEditTarget(null);
    setForm(blankForm());
    setShowForm(true);
  };

  const openEdit = (t: WaTemplate) => {
    setEditTarget(t);
    setForm({
      name: t.name,
      category: t.category,
      language: t.language,
      headerType: t.headerType,
      headerText: t.headerText ?? "",
      body: t.body,
      footer: t.footer ?? "",
      buttons: t.buttons ?? [],
      variables: t.variables ?? [],
      notes: t.notes ?? "",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditTarget(null);
    setForm(blankForm());
    setNewButtonText("");
    setNewVariableLabel("");
  };

  // ── save ───────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.name.trim() || !form.body.trim()) {
      toast({ title: "Required", description: "Template name and body are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim().toLowerCase().replace(/\s+/g, "_"),
        category: form.category,
        language: form.language,
        headerType: form.headerType,
        headerText: form.headerText || null,
        body: form.body,
        footer: form.footer || null,
        buttons: form.buttons,
        variables: form.variables,
        notes: form.notes || null,
      };

      const url = editTarget
        ? `/api/whatsapp-templates/${editTarget._id}`
        : "/api/whatsapp-templates";
      const method = editTarget ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      toast({ title: editTarget ? "Template Updated" : "Template Created", description: `"${data.name}" saved successfully.` });
      closeForm();
      await fetchTemplates();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  // ── delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (t: WaTemplate) => {
    if (!window.confirm(`Delete template "${t.name}"? This cannot be undone.`)) return;
    setDeletingId(t._id);
    try {
      const res = await fetch(`/api/whatsapp-templates/${t._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error || "Delete failed");
      toast({ title: "Deleted", description: `"${t.name}" removed.` });
      setTemplates((prev) => prev.filter((x) => x._id !== t._id));
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  // ── copy name to clipboard ─────────────────────────────────────────────────
  const copyName = (name: string) => {
    navigator.clipboard.writeText(name).then(() =>
      toast({ title: "Copied", description: `Template name "${name}" copied.` }),
    );
  };

  // ── add/remove button ──────────────────────────────────────────────────────
  const addButton = () => {
    if (!newButtonText.trim()) return;
    setForm((f) => ({
      ...f,
      buttons: [...f.buttons, { type: newButtonType, text: newButtonText.trim() }],
    }));
    setNewButtonText("");
  };

  const removeButton = (idx: number) => {
    setForm((f) => ({ ...f, buttons: f.buttons.filter((_, i) => i !== idx) }));
  };

  // ── add variable label ─────────────────────────────────────────────────────
  const addVariable = () => {
    if (!newVariableLabel.trim()) return;
    setForm((f) => ({
      ...f,
      variables: [...f.variables, newVariableLabel.trim()],
    }));
    setNewVariableLabel("");
  };

  const insertVariable = () => {
    const n = form.variables.length + 1;
    setForm((f) => ({ ...f, body: f.body + `{{${n}}}` }));
  };

  // ── extract variables from body text ──────────────────────────────────────
  const detectedVars = useMemo(() => {
    const matches = form.body.match(/{{[^}]+}}/g) ?? [];
    return [...new Set(matches)];
  }, [form.body]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-2 border-black pb-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase italic flex items-center gap-3">
            WhatsApp Templates
          </h1>
          <p className="text-muted-foreground font-medium mt-1">
            Manage message templates for campaigns, invoices, receipts & alerts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-2 border-black font-black h-10 gap-2 hover:bg-neutral-100"
            onClick={handleSync}
            disabled={syncing}
          >
            {syncing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            Sync from Meta
          </Button>
          <Button
            className="bg-black hover:bg-neutral-800 text-white font-black h-10 gap-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]"
            onClick={openCreate}
          >
            <Plus className="w-4 h-4" />
            New Template
          </Button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Templates", value: stats.total, color: "bg-black text-white" },
          { label: "Approved", value: stats.approved, color: "bg-green-600 text-white" },
          { label: "Local Drafts", value: stats.local, color: "bg-neutral-100 text-neutral-800" },
          { label: "Rejected", value: stats.rejected, color: "bg-red-50 text-red-700 border-2 border-red-200" },
        ].map((s) => (
          <div
            key={s.label}
            className={cn(
              "rounded-lg p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
              s.color,
            )}
          >
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">{s.label}</p>
            <p className="text-4xl font-black mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Search by name, body content, notes..."
            className="pl-9 border-2 border-black font-medium h-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-44 border-2 border-black font-bold h-10 bg-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="border-2 border-black font-bold">
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>{CATEGORY_LABELS[c]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-44 border-2 border-black font-bold h-10 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="border-2 border-black font-bold">
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.keys(STATUS_CONFIG).map((s) => (
              <SelectItem key={s} value={s}>{STATUS_CONFIG[s].label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Template List ── */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-neutral-400" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-neutral-300 rounded-xl bg-neutral-50">
          <FileText className="w-12 h-12 text-neutral-300 mb-4" />
          <p className="font-black text-neutral-400 uppercase text-lg">No templates found</p>
          <p className="text-neutral-400 text-sm mt-1">
            {templates.length === 0
              ? "Create your first template or sync from Meta."
              : "Try adjusting your search or filters."}
          </p>
          {templates.length === 0 && (
            <Button className="mt-6 bg-black text-white font-black" onClick={openCreate}>
              <Plus className="w-4 h-4 mr-2" /> Create First Template
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((t) => {
            const sc = STATUS_CONFIG[t.status] ?? STATUS_CONFIG.UNKNOWN;
            const isDel = deletingId === t._id;

            return (
              <div
                key={t._id}
                className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              >
                {/* Card header */}
                <div className="flex items-start justify-between p-4 border-b-2 border-black bg-neutral-50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border-2",
                          sc.bg, sc.text, sc.border,
                        )}
                      >
                        {sc.label}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-neutral-200 text-neutral-600 border-2 border-neutral-300">
                        {CATEGORY_LABELS[t.category] ?? t.category}
                      </span>
                      {t.syncedFromMeta && (
                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-green-50 text-green-700 border-2 border-green-300">
                          Meta Synced
                        </span>
                      )}
                    </div>
                    <p className="font-black text-base mt-1.5 truncate" title={t.name}>
                      {t.name}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase mt-0.5">
                      {LANGUAGES.find((l) => l.code === t.language)?.label ?? t.language}
                      {t.headerType !== "NONE" && ` · ${t.headerType} Header`}
                      {t.buttons.length > 0 && ` · ${t.buttons.length} Button${t.buttons.length > 1 ? "s" : ""}`}
                    </p>
                  </div>
                </div>

                {/* Body preview */}
                <div className="flex-1 p-4">
                  {/* WhatsApp-style bubble preview */}
                  <div className="bg-[#e5ddd5] rounded-lg p-3">
                    {t.headerType === "TEXT" && t.headerText && (
                      <p className="font-black text-xs text-[#1a1a1a] mb-2">
                        {t.headerText}
                      </p>
                    )}
                    {["IMAGE", "DOCUMENT", "VIDEO"].includes(t.headerType) && (
                      <div className="bg-neutral-300 rounded h-14 flex items-center justify-center mb-2">
                        <span className="text-[10px] font-black text-neutral-500 uppercase">
                          {t.headerType} ATTACHMENT
                        </span>
                      </div>
                    )}
                    <div className="bg-white rounded p-2 shadow-sm">
                      <p className="text-xs text-[#1a1a1a] leading-relaxed whitespace-pre-wrap break-words">
                        {renderBodyPreview(t.body)}
                      </p>
                      {t.footer && (
                        <p className="text-[10px] text-neutral-400 mt-1">{t.footer}</p>
                      )}
                    </div>
                    {t.buttons.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {t.buttons.map((btn, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold text-[#128C7E] bg-white border border-[#25D366] px-2 py-0.5 rounded"
                          >
                            {btn.text}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {t.notes && (
                    <p className="text-[10px] text-neutral-400 italic mt-2 flex items-start gap-1">
                      <Info className="w-3 h-3 mt-0.5 shrink-0" /> {t.notes}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 p-3 border-t-2 border-black bg-neutral-50">
                  <button
                    onClick={() => copyName(t.name)}
                    title="Copy template name"
                    className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-neutral-500 hover:text-black px-2 py-1.5 rounded hover:bg-neutral-200 transition-colors border border-neutral-200 hover:border-black"
                  >
                    <Copy className="w-3 h-3" /> Copy Name
                  </button>
                  <button
                    onClick={() => setPreviewTemplate(t)}
                    title="Full preview"
                    className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-neutral-500 hover:text-black px-2 py-1.5 rounded hover:bg-neutral-200 transition-colors border border-neutral-200 hover:border-black"
                  >
                    <Eye className="w-3 h-3" /> Preview
                  </button>
                  <div className="flex-1" />
                  <button
                    onClick={() => openEdit(t)}
                    title="Edit"
                    className="p-1.5 rounded hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(t)}
                    disabled={isDel}
                    title="Delete"
                    className="p-1.5 rounded hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors disabled:opacity-40"
                  >
                    {isDel ? (
                      <Loader2 className="w-3.5 h-3.5 text-red-500 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Create / Edit Modal ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-xl w-full max-w-2xl my-8 animate-in zoom-in-95 duration-200">
            {/* Modal header */}
            <div className="flex items-center justify-between p-5 border-b-2 border-black bg-neutral-50">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight italic">
                  {editTarget ? "Edit Template" : "New Template"}
                </h2>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">
                  {editTarget
                    ? "Update the template details below"
                    : "Create a local template record — submit it on Meta separately for approval"}
                </p>
              </div>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-neutral-200 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Name + Category + Language */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                    Template Name *
                  </Label>
                  <Input
                    placeholder="e.g. payment_receipt"
                    className="border-2 border-black font-bold h-11"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        name: e.target.value.toLowerCase().replace(/\s+/g, "_"),
                      }))
                    }
                  />
                  <p className="text-[10px] text-neutral-400">
                    Lowercase, underscores only — matches Meta's format
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                    Category *
                  </Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => setForm((f) => ({ ...f, category: v as any }))}
                  >
                    <SelectTrigger className="border-2 border-black font-bold h-11 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-black font-bold">
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>{CATEGORY_LABELS[c]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                    Language
                  </Label>
                  <Select
                    value={form.language}
                    onValueChange={(v) => setForm((f) => ({ ...f, language: v }))}
                  >
                    <SelectTrigger className="border-2 border-black font-bold h-11 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-black font-bold">
                      {LANGUAGES.map((l) => (
                        <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                    Header Type
                  </Label>
                  <Select
                    value={form.headerType}
                    onValueChange={(v) => setForm((f) => ({ ...f, headerType: v as any }))}
                  >
                    <SelectTrigger className="border-2 border-black font-bold h-11 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-black font-bold">
                      {HEADER_TYPES.map((h) => (
                        <SelectItem key={h} value={h}>{h}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {form.headerType === "TEXT" && (
                <div className="space-y-1.5">
                  <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                    Header Text
                  </Label>
                  <Input
                    placeholder="Bold header text (max 60 chars)"
                    maxLength={60}
                    className="border-2 border-black font-bold h-11"
                    value={form.headerText}
                    onChange={(e) => setForm((f) => ({ ...f, headerText: e.target.value }))}
                  />
                </div>
              )}

              {/* Body */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                    Body Text *
                  </Label>
                  <button
                    type="button"
                    onClick={insertVariable}
                    className="text-[10px] font-black uppercase tracking-wider text-blue-600 hover:text-blue-800 flex items-center gap-1 border border-blue-200 rounded px-2 py-0.5 hover:bg-blue-50"
                  >
                    + Insert Variable
                  </button>
                </div>
                <Textarea
                  placeholder={"Hi {{1}},\n\nYour payment of {{2}} has been received.\n\nThank you!"}
                  rows={6}
                  className="border-2 border-black font-medium resize-none leading-relaxed"
                  value={form.body}
                  onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                />
                {detectedVars.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black text-neutral-400 uppercase">
                      Variables detected:
                    </span>
                    {detectedVars.map((v) => (
                      <span
                        key={v}
                        className="text-[10px] font-black bg-yellow-100 text-yellow-800 border border-yellow-300 px-1.5 py-0.5 rounded"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Variable labels */}
              <div className="space-y-2">
                <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                  Variable Labels (for reference)
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder={`e.g. client_name, amount, invoice_no...`}
                    className="border-2 border-black font-medium h-9 text-sm"
                    value={newVariableLabel}
                    onChange={(e) => setNewVariableLabel(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addVariable())}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="border-2 border-black font-black h-9"
                    onClick={addVariable}
                  >
                    Add
                  </Button>
                </div>
                {form.variables.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {form.variables.map((v, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 text-[10px] font-black bg-neutral-100 border border-neutral-300 text-neutral-700 px-2 py-0.5 rounded"
                      >
                        <span className="text-neutral-400">{`{{${i + 1}}}`}</span> {v}
                        <button
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              variables: f.variables.filter((_, j) => j !== i),
                            }))
                          }
                          className="ml-1 text-neutral-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="space-y-1.5">
                <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                  Footer Text (optional)
                </Label>
                <Input
                  placeholder="e.g. Pixelate Nest Team"
                  maxLength={60}
                  className="border-2 border-black font-medium h-11"
                  value={form.footer}
                  onChange={(e) => setForm((f) => ({ ...f, footer: e.target.value }))}
                />
              </div>

              {/* Buttons */}
              <div className="space-y-2">
                <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                  Buttons (max 3)
                </Label>
                <div className="flex gap-2">
                  <Select
                    value={newButtonType}
                    onValueChange={(v) => setNewButtonType(v as WaButton["type"])}
                  >
                    <SelectTrigger className="w-36 border-2 border-black font-bold h-9 bg-white text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-black font-bold">
                      <SelectItem value="QUICK_REPLY">Quick Reply</SelectItem>
                      <SelectItem value="URL">URL</SelectItem>
                      <SelectItem value="PHONE_NUMBER">Phone</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Button label"
                    className="border-2 border-black font-medium h-9 text-sm"
                    value={newButtonText}
                    onChange={(e) => setNewButtonText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addButton())}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="border-2 border-black font-black h-9"
                    onClick={addButton}
                    disabled={form.buttons.length >= 3}
                  >
                    Add
                  </Button>
                </div>
                {form.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.buttons.map((btn, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 text-[10px] font-black text-[#128C7E] bg-white border-2 border-[#25D366] px-2 py-1 rounded"
                      >
                        <span className="text-[8px] font-black text-neutral-400 uppercase mr-1">
                          {btn.type}
                        </span>
                        {btn.text}
                        <button
                          onClick={() => removeButton(i)}
                          className="ml-1 text-neutral-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                  Internal Notes (optional)
                </Label>
                <Input
                  placeholder="e.g. Used for payment receipt confirmations"
                  className="border-2 border-black font-medium h-11"
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                />
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex gap-3 p-5 border-t-2 border-black bg-neutral-50">
              <Button
                className="flex-1 bg-black hover:bg-neutral-800 text-white h-12 font-black text-base"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                )}
                {editTarget ? "Save Changes" : "Create Template"}
              </Button>
              <button
                onClick={closeForm}
                className="px-6 font-black uppercase text-xs tracking-widest text-neutral-500 hover:text-black transition-colors border-2 border-neutral-200 rounded-lg hover:border-black"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Full Preview Modal ── */}
      {previewTemplate && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-xl w-full max-w-md animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Preview header */}
            <div className="flex items-center justify-between p-4 border-b-2 border-black bg-neutral-50">
              <div>
                <p className="font-black text-base">{previewTemplate.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border-2",
                      STATUS_CONFIG[previewTemplate.status]?.bg,
                      STATUS_CONFIG[previewTemplate.status]?.text,
                      STATUS_CONFIG[previewTemplate.status]?.border,
                    )}
                  >
                    {STATUS_CONFIG[previewTemplate.status]?.label}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-neutral-100 border-2 border-neutral-300 text-neutral-600">
                    {CATEGORY_LABELS[previewTemplate.category]}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-2 hover:bg-neutral-200 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* WhatsApp phone mockup */}
            <div className="p-6 bg-[#e5ddd5]">
              <div className="bg-[#075E54] text-white text-xs font-bold px-3 py-2 rounded-t-lg flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                  P
                </div>
                Pixelate Nest
              </div>
              <div className="bg-[#e5ddd5] p-3 rounded-b-lg min-h-[120px]">
                <div className="bg-white rounded-lg p-3 shadow-sm max-w-[90%]">
                  {previewTemplate.headerType === "TEXT" && previewTemplate.headerText && (
                    <p className="font-black text-sm text-[#1a1a1a] mb-2 border-b pb-2">
                      {previewTemplate.headerText}
                    </p>
                  )}
                  {["IMAGE", "DOCUMENT", "VIDEO"].includes(previewTemplate.headerType) && (
                    <div className="bg-neutral-200 rounded h-20 flex items-center justify-center mb-2">
                      <span className="text-[10px] font-black text-neutral-500 uppercase">
                        {previewTemplate.headerType}
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-[#1a1a1a] leading-relaxed whitespace-pre-wrap">
                    {renderBodyPreview(previewTemplate.body)}
                  </p>
                  {previewTemplate.footer && (
                    <p className="text-[11px] text-neutral-400 mt-2 border-t pt-1">
                      {previewTemplate.footer}
                    </p>
                  )}
                  <p className="text-[10px] text-neutral-300 text-right mt-1">09:41 ✓✓</p>
                </div>
                {previewTemplate.buttons.length > 0 && (
                  <div className="flex flex-col gap-1 mt-2 max-w-[90%]">
                    {previewTemplate.buttons.map((btn, i) => (
                      <div
                        key={i}
                        className="bg-white text-center text-sm font-bold text-[#128C7E] border-t border-neutral-200 rounded-b-lg py-2 shadow-sm"
                      >
                        {btn.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Variable reference table */}
            {previewTemplate.variables.length > 0 && (
              <div className="p-4 border-t-2 border-black">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-2">
                  Variable Reference
                </p>
                <div className="space-y-1">
                  {previewTemplate.variables.map((v, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="font-black text-yellow-700 bg-yellow-100 border border-yellow-300 px-1.5 py-0.5 rounded text-[10px]">
                        {`{{${i + 1}}}`}
                      </span>
                      <span className="font-medium text-neutral-700">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {previewTemplate.notes && (
              <div className="px-4 pb-4">
                <p className="text-[10px] text-neutral-400 italic flex items-start gap-1">
                  <Info className="w-3 h-3 mt-0.5 shrink-0" /> {previewTemplate.notes}
                </p>
              </div>
            )}

            <div className="flex gap-2 p-4 border-t-2 border-black bg-neutral-50">
              <Button
                variant="outline"
                className="flex-1 border-2 border-black font-black h-10 gap-2"
                onClick={() => { copyName(previewTemplate.name); }}
              >
                <Copy className="w-3.5 h-3.5" /> Copy Name
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-2 border-black font-black h-10 gap-2"
                onClick={() => { setPreviewTemplate(null); openEdit(previewTemplate); }}
              >
                <Edit className="w-3.5 h-3.5" /> Edit
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── How to use info banner ── */}
      <div className="border-2 border-neutral-200 rounded-xl p-5 bg-neutral-50 space-y-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-neutral-500" />
          <p className="font-black uppercase text-xs tracking-widest text-neutral-500">
            How WhatsApp Templates Work
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-600">
          <div className="space-y-1">
            <p className="font-black text-neutral-800">1. Create here</p>
            <p>Draft your template with variables, buttons and preview it in the WhatsApp bubble format.</p>
          </div>
          <div className="space-y-1">
            <p className="font-black text-neutral-800">2. Submit on Meta</p>
            <p>Go to Meta Business Suite → WhatsApp Manager → Message Templates and submit for approval. Approval takes 2–48 hrs.</p>
          </div>
          <div className="space-y-1">
            <p className="font-black text-neutral-800">3. Sync & Use</p>
            <p>Click <strong>Sync from Meta</strong> to pull live statuses. Use the template name in your <code className="text-[11px] bg-neutral-200 px-1 rounded">WHATSAPP_TEMPLATE_NAME</code> env var or API calls.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
