"use client";

import { useEffect, useRef, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Mail,
  MessageCircle,
  Plus,
  Upload,
  Trash2,
  Edit2,
  Loader2,
  X,
  FileText,
  Palette,
  Type,
  Mic2,
  Image as ImageIcon,
  Send,
  Eye,
  CheckCircle2,
  Circle,
  Sparkles,
} from "lucide-react";

interface BrandGuide {
  _id?: string;
  id?: string;
  clientId: string;
  clientName: string;
  brandName: string;
  primaryColors: string[];
  secondaryColors: string[];
  fonts: string[];
  brandVoice: string;
  logoUrl: string;
  pdfUrl: string;
  pdfBase64: string;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Client {
  _id?: string;
  id?: string;
  name: string;
  email?: string;
  phone?: string;
}

const emptyGuide: Omit<BrandGuide, "_id" | "id" | "createdAt" | "updatedAt"> = {
  clientId: "",
  clientName: "",
  brandName: "",
  primaryColors: [],
  secondaryColors: [],
  fonts: [],
  brandVoice: "",
  logoUrl: "",
  pdfUrl: "",
  pdfBase64: "",
  notes: "",
};

function ColorChips({
  colors,
  onChange,
}: {
  colors: string[];
  onChange: (colors: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const v = input.trim();
    if (v && !colors.includes(v)) onChange([...colors, v]);
    setInput("");
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 flex-wrap">
        {colors.map((c) => (
          <span
            key={c}
            className="flex items-center gap-1 px-2 py-1 text-xs rounded border border-black font-bold bg-white"
          >
            <span
              className="inline-block w-3 h-3 rounded-full border border-black"
              style={{ background: c }}
            />
            {c}
            <button
              type="button"
              className="ml-1 text-muted-foreground hover:text-destructive"
              onClick={() => onChange(colors.filter((x) => x !== c))}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="#044bab or Red"
          className="h-8 text-sm"
        />
        <Button type="button" size="sm" variant="outline" onClick={add} className="border-black">
          Add
        </Button>
      </div>
    </div>
  );
}

function FontChips({
  fonts,
  onChange,
}: {
  fonts: string[];
  onChange: (fonts: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const v = input.trim();
    if (v && !fonts.includes(v)) onChange([...fonts, v]);
    setInput("");
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 flex-wrap">
        {fonts.map((f) => (
          <span
            key={f}
            className="flex items-center gap-1 px-2 py-1 text-xs rounded border border-black font-bold bg-white"
          >
            {f}
            <button
              type="button"
              className="ml-1 text-muted-foreground hover:text-destructive"
              onClick={() => onChange(fonts.filter((x) => x !== f))}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="Inter, Roboto, Playfair Display..."
          className="h-8 text-sm"
        />
        <Button type="button" size="sm" variant="outline" onClick={add} className="border-black">
          Add
        </Button>
      </div>
    </div>
  );
}

export default function BrandGuidePage() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [guides, setGuides] = useState<BrandGuide[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sendingEmail, setSendingEmail] = useState<string | null>(null);
  const [sendingWa, setSendingWa] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyGuide });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string>("");
  const [parsing, setParsing] = useState(false);
  // 0 = idle, 1 = uploading, 2 = processing, 3 = analysing, 4 = done
  const [parseStep, setParseStep] = useState(0);

  const [filterClient, setFilterClient] = useState("all");

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const [guidesRes, clientsRes] = await Promise.all([
        apiFetch("/api/brand-guides"),
        apiFetch("/api/clients"),
      ]);
      const guidesData = await guidesRes.json();
      const clientsData = await clientsRes.json();
      setGuides(Array.isArray(guidesData) ? guidesData : []);
      setClients(Array.isArray(clientsData) ? clientsData : []);
    } catch {
      toast({ title: "Error", description: "Failed to load data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  function openNew() {
    setForm({ ...emptyGuide });
    setPdfFile(null);
    setPdfPreview("");
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(guide: BrandGuide) {
    const id = String(guide._id ?? guide.id ?? "");
    setForm({
      clientId: guide.clientId,
      clientName: guide.clientName,
      brandName: guide.brandName,
      primaryColors: guide.primaryColors ?? [],
      secondaryColors: guide.secondaryColors ?? [],
      fonts: guide.fonts ?? [],
      brandVoice: guide.brandVoice ?? "",
      logoUrl: guide.logoUrl ?? "",
      pdfUrl: guide.pdfUrl ?? "",
      pdfBase64: guide.pdfBase64 ?? "",
      notes: guide.notes ?? "",
    });
    setPdfPreview(guide.pdfBase64 ? "existing" : "");
    setPdfFile(null);
    setEditingId(id);
    setShowForm(true);
  }

  function handleClientSelect(clientId: string) {
    const client = clients.find((c) => String(c._id ?? c.id) === clientId);
    setForm((f) => ({
      ...f,
      clientId,
      clientName: client?.name ?? "",
      brandName: f.brandName || client?.name || "",
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast({ title: "Invalid file", description: "Only PDF files are allowed.", variant: "destructive" });
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      toast({ title: "File too large", description: "PDF must be under 50 MB.", variant: "destructive" });
      return;
    }
    setPdfFile(file);

    // Step 1 — Uploading (reading file into base64)
    setParsing(true);
    setParseStep(1);

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64 = (ev.target?.result as string).split(",")[1];
      setForm((f) => ({ ...f, pdfBase64: base64 }));
      setPdfPreview("new");

      // Step 2 — Processing
      setParseStep(2);
      await new Promise((r) => setTimeout(r, 600));

      // Step 3 — Analysing (Gemini call)
      setParseStep(3);
      try {
        const res = await apiFetch("/api/parse-brand-guide-pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pdfBase64: base64 }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Parse failed");

        // Step 4 — Done, auto-fill
        setParseStep(4);
        await new Promise((r) => setTimeout(r, 700));

        setForm((f) => ({
          ...f,
          pdfBase64: base64,
          brandName: data.brandName || f.brandName,
          primaryColors: data.primaryColors?.length ? data.primaryColors : f.primaryColors,
          secondaryColors: data.secondaryColors?.length ? data.secondaryColors : f.secondaryColors,
          fonts: data.fonts?.length ? data.fonts : f.fonts,
          brandVoice: data.brandVoice || f.brandVoice,
          notes: data.notes || f.notes,
        }));
      } catch (err: any) {
        toast({
          title: "Auto-fill failed",
          description: err.message || "Could not read the PDF. Please fill in details manually.",
          variant: "destructive",
        });
      } finally {
        setParsing(false);
        setParseStep(0);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    if (!form.clientId) {
      toast({ title: "Select a client", description: "Please choose a client first.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await apiFetch(`/api/brand-guides/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        toast({ title: "Saved", description: "Brand guide updated." });
      } else {
        await apiFetch("/api/brand-guides", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        toast({ title: "Created", description: "Brand guide created." });
      }
      setShowForm(false);
      fetchAll();
    } catch {
      toast({ title: "Error", description: "Failed to save brand guide.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(guide: BrandGuide) {
    const id = String(guide._id ?? guide.id ?? "");
    if (!confirm(`Delete brand guide for "${guide.brandName}"?`)) return;
    try {
      await apiFetch(`/api/brand-guides/${id}`, { method: "DELETE" });
      toast({ title: "Deleted", description: "Brand guide removed." });
      fetchAll();
    } catch {
      toast({ title: "Error", description: "Failed to delete.", variant: "destructive" });
    }
  }

  async function handleSendEmail(guide: BrandGuide) {
    const id = String(guide._id ?? guide.id ?? "");
    const client = clients.find((c) => String(c._id ?? c.id) === guide.clientId);
    const email = client?.email;
    if (!email) {
      toast({ title: "No email", description: "This client has no email address saved.", variant: "destructive" });
      return;
    }
    if (!guide.pdfBase64) {
      toast({ title: "No PDF", description: "Please upload a PDF first.", variant: "destructive" });
      return;
    }
    setSendingEmail(id);
    try {
      const res = await apiFetch("/api/send-brand-guide-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          clientName: guide.clientName,
          brandName: guide.brandName,
          pdfBase64: guide.pdfBase64,
          fileName: `Brand-Guide-${guide.brandName}.pdf`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      toast({ title: "Email sent!", description: `Brand guide sent to ${email}` });
    } catch (err: any) {
      toast({ title: "Email failed", description: err.message, variant: "destructive" });
    } finally {
      setSendingEmail(null);
    }
  }

  async function handleSendWhatsApp(guide: BrandGuide) {
    const id = String(guide._id ?? guide.id ?? "");
    const client = clients.find((c) => String(c._id ?? c.id) === guide.clientId);
    const phone = client?.phone;
    if (!phone) {
      toast({ title: "No phone", description: "This client has no phone number saved.", variant: "destructive" });
      return;
    }
    if (!guide.pdfBase64 && !guide.pdfUrl) {
      toast({ title: "No PDF", description: "Please upload a PDF first.", variant: "destructive" });
      return;
    }

    setSendingWa(id);
    try {
      let mediaId: string | undefined;
      let pdfUrl: string | undefined;

      if (guide.pdfBase64) {
        // Upload to WhatsApp media first
        const uploadRes = await apiFetch("/api/upload-whatsapp-media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            base64: guide.pdfBase64,
            filename: `Brand-Guide-${guide.brandName}.pdf`,
            mimeType: "application/pdf",
          }),
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || "Media upload failed");
        mediaId = uploadData.mediaId || uploadData.id;
      } else {
        pdfUrl = guide.pdfUrl;
      }

      const res = await apiFetch("/api/send-brand-guide-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          clientName: guide.clientName,
          brandName: guide.brandName,
          mediaId,
          pdfUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      toast({ title: "WhatsApp sent!", description: `Brand guide sent to ${phone}` });
    } catch (err: any) {
      toast({ title: "WhatsApp failed", description: err.message, variant: "destructive" });
    } finally {
      setSendingWa(null);
    }
  }

  const filtered = filterClient === "all"
    ? guides
    : guides.filter((g) => g.clientId === filterClient);

  const uniqueClientIds = [...new Set(guides.map((g) => g.clientId))];
  const clientsWithGuides = clients.filter((c) =>
    uniqueClientIds.includes(String(c._id ?? c.id)),
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border-2 border-black bg-primary flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Brand Guides</h1>
            <p className="text-sm text-muted-foreground font-medium">
              Upload and send brand guides to clients
            </p>
          </div>
        </div>
        <Button
          onClick={openNew}
          className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Brand Guide
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Guides", value: guides.length, icon: BookOpen },
          { label: "Clients Covered", value: uniqueClientIds.length, icon: FileText },
          { label: "With PDF", value: guides.filter((g) => g.pdfBase64 || g.pdfUrl).length, icon: Upload },
          { label: "Pending PDF", value: guides.filter((g) => !g.pdfBase64 && !g.pdfUrl).length, icon: FileText },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-md border-2 border-black bg-muted flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-2xl font-black">{value}</p>
                <p className="text-xs text-muted-foreground font-bold">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <Select value={filterClient} onValueChange={setFilterClient}>
          <SelectTrigger className="w-56 border-2 border-black font-bold">
            <SelectValue placeholder="Filter by client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clients</SelectItem>
            {clientsWithGuides.map((c) => (
              <SelectItem key={String(c._id ?? c.id)} value={String(c._id ?? c.id)}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground font-medium">
          {filtered.length} guide{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Guides list */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-2 border-dashed border-black/30">
          <CardContent className="p-12 flex flex-col items-center gap-3 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground/40" />
            <p className="font-black text-lg">No brand guides yet</p>
            <p className="text-sm text-muted-foreground">
              Click "New Brand Guide" to create one for a client.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((guide) => {
            const id = String(guide._id ?? guide.id ?? "");
            const client = clients.find((c) => String(c._id ?? c.id) === guide.clientId);
            const hasPdf = !!(guide.pdfBase64 || guide.pdfUrl);
            return (
              <Card
                key={id}
                className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base font-black truncate">
                        {guide.brandName || guide.clientName}
                      </CardTitle>
                      <CardDescription className="font-bold">
                        {guide.clientName}
                      </CardDescription>
                    </div>
                    <Badge
                      className={`shrink-0 border-2 border-black font-bold text-xs ${
                        hasPdf
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {hasPdf ? "PDF Ready" : "No PDF"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Colors */}
                  {(guide.primaryColors?.length > 0 || guide.secondaryColors?.length > 0) && (
                    <div className="flex items-center gap-2">
                      <Palette className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <div className="flex gap-1 flex-wrap">
                        {[...(guide.primaryColors ?? []), ...(guide.secondaryColors ?? [])].slice(0, 6).map((c) => (
                          <span
                            key={c}
                            className="w-5 h-5 rounded border border-black"
                            style={{ background: c }}
                            title={c}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fonts */}
                  {guide.fonts?.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Type className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground font-medium truncate">
                        {guide.fonts.join(", ")}
                      </span>
                    </div>
                  )}

                  {/* Brand voice */}
                  {guide.brandVoice && (
                    <div className="flex items-start gap-2">
                      <Mic2 className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground font-medium line-clamp-2">
                        {guide.brandVoice}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 border-t border-black/10 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-2 border-black font-bold text-xs h-8"
                      onClick={() => openEdit(guide)}
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 border-2 border-black font-bold text-xs h-8 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleSendEmail(guide)}
                      disabled={!hasPdf || sendingEmail === id}
                      title={!client?.email ? "Client has no email" : ""}
                    >
                      {sendingEmail === id ? (
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      ) : (
                        <Mail className="w-3 h-3 mr-1" />
                      )}
                      Email
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 border-2 border-black font-bold text-xs h-8 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleSendWhatsApp(guide)}
                      disabled={!hasPdf || sendingWa === id}
                      title={!client?.phone ? "Client has no phone" : ""}
                    >
                      {sendingWa === id ? (
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      ) : (
                        <MessageCircle className="w-3 h-3 mr-1" />
                      )}
                      WhatsApp
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-2 border-black font-bold text-xs h-8 text-destructive hover:bg-destructive hover:text-white"
                      onClick={() => handleDelete(guide)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* PDF Parse Progress Modal */}
      <Dialog open={parsing} onOpenChange={() => {}}>
        <DialogContent
          className="max-w-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="font-black text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Reading Brand Guide
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 space-y-4">
            {[
              { step: 1, label: "Uploading", desc: "Reading your PDF file" },
              { step: 2, label: "Processing", desc: "Preparing document for AI" },
              { step: 3, label: "Analysing", desc: "Gemini extracting brand data" },
              { step: 4, label: "Auto-filling", desc: "Populating your form fields" },
            ].map(({ step, label, desc }) => {
              const isDone = parseStep > step;
              const isActive = parseStep === step;
              return (
                <div key={step} className="flex items-center gap-4">
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : isActive ? (
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground/30" />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-black ${isDone ? "text-green-700" : isActive ? "text-foreground" : "text-muted-foreground/50"}`}>
                      {label}
                    </p>
                    <p className={`text-xs ${isDone || isActive ? "text-muted-foreground" : "text-muted-foreground/30"}`}>
                      {desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Create / Edit Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-black">
          <DialogHeader>
            <DialogTitle className="font-black text-xl">
              {editingId ? "Edit Brand Guide" : "New Brand Guide"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Client */}
            <div className="space-y-1.5">
              <label className="text-sm font-black">Client *</label>
              <Select value={form.clientId} onValueChange={handleClientSelect}>
                <SelectTrigger className="border-2 border-black font-bold">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={String(c._id ?? c.id)} value={String(c._id ?? c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Brand name */}
            <div className="space-y-1.5">
              <label className="text-sm font-black">Brand Name</label>
              <Input
                value={form.brandName}
                onChange={(e) => setForm((f) => ({ ...f, brandName: e.target.value }))}
                placeholder="e.g. Pixelate Nest"
                className="border-2 border-black font-medium"
              />
            </div>

            {/* Colors */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-black flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" /> Primary Colors
                </label>
                <ColorChips
                  colors={form.primaryColors}
                  onChange={(c) => setForm((f) => ({ ...f, primaryColors: c }))}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-black flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" /> Secondary Colors
                </label>
                <ColorChips
                  colors={form.secondaryColors}
                  onChange={(c) => setForm((f) => ({ ...f, secondaryColors: c }))}
                />
              </div>
            </div>

            {/* Fonts */}
            <div className="space-y-1.5">
              <label className="text-sm font-black flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5" /> Fonts / Typography
              </label>
              <FontChips
                fonts={form.fonts}
                onChange={(fonts) => setForm((f) => ({ ...f, fonts }))}
              />
            </div>

            {/* Brand voice */}
            <div className="space-y-1.5">
              <label className="text-sm font-black flex items-center gap-1.5">
                <Mic2 className="w-3.5 h-3.5" /> Brand Voice & Tone
              </label>
              <Textarea
                value={form.brandVoice}
                onChange={(e) => setForm((f) => ({ ...f, brandVoice: e.target.value }))}
                placeholder="Professional, friendly, approachable. Avoid jargon..."
                className="border-2 border-black font-medium resize-none"
                rows={3}
              />
            </div>

            {/* Logo URL */}
            <div className="space-y-1.5">
              <label className="text-sm font-black flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" /> Logo URL
              </label>
              <Input
                value={form.logoUrl}
                onChange={(e) => setForm((f) => ({ ...f, logoUrl: e.target.value }))}
                placeholder="https://..."
                className="border-2 border-black font-medium"
              />
            </div>

            {/* PDF Upload */}
            <div className="space-y-1.5">
              <label className="text-sm font-black flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Brand Guide PDF
              </label>
              <div
                className="border-2 border-dashed border-black rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => !parsing && fileInputRef.current?.click()}
              >
                {pdfPreview === "new" && pdfFile ? (
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="w-8 h-8 text-primary" />
                    <p className="font-bold text-sm">{pdfFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(pdfFile.size / 1024 / 1024).toFixed(2)} MB · Click to replace
                    </p>
                  </div>
                ) : pdfPreview === "existing" ? (
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="w-8 h-8 text-green-600" />
                    <p className="font-bold text-sm text-green-700">PDF already uploaded</p>
                    <p className="text-xs text-muted-foreground">Click to replace with a new PDF</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <p className="font-bold text-sm">Click to upload PDF</p>
                    <p className="text-xs text-muted-foreground">Max 50 MB · PDF only · AI auto-fills the form</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              {/* OR manual URL */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground font-bold">OR</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <Input
                value={form.pdfUrl}
                onChange={(e) => setForm((f) => ({ ...f, pdfUrl: e.target.value }))}
                placeholder="Public HTTPS URL of the PDF"
                className="border-2 border-black font-medium"
              />
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="text-sm font-black">Notes</label>
              <Textarea
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Any additional notes about this brand guide..."
                className="border-2 border-black font-medium resize-none"
                rows={2}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="border-2 border-black font-bold"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button
              className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold"
              onClick={handleSave}
              disabled={saving || parsing}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {editingId ? "Update Guide" : "Create Guide"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
