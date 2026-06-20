"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api-fetch";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, X, Upload } from "lucide-react";
import Link from "next/link";

/* ─── types ─── */
export interface GalleryImage { url: string; caption: string }
export interface Feature     { icon: string; title: string; description: string }
export interface CSPair      { challenge: string; solution: string }
export interface ImpactStat  { icon: string; number: string; label: string }
export interface TimelinePhase { phase_name: string; description: string }

export interface WorkGalleryPayload {
  /* base */
  title: string;
  project_type: string;
  client_name: string;
  year: string;
  location: string;
  short_description: string;
  long_description: string;
  thumbnailBase64: string;
  live_url: string;
  status: string;
  seo_meta_title: string;
  seo_meta_desc: string;
  /* legacy compat */
  link: string;
  tech: string;
  description: string;
  rating: number;
  showOn: string;
  brand: string;
  note: string;
  /* rich — web */
  web?: {
    category: string;
    tech_frontend: string[];
    tech_backend: string[];
    tech_database: string[];
    tech_tools: string[];
    features: Feature[];
    challenges: CSPair[];
    stats: { total_pages: string; timeline: string; team_size: string; industry: string };
    impact_stats: ImpactStat[];
    timeline_phases: TimelinePhase[];
    gallery: GalleryImage[];
  };
  /* rich — app */
  app?: {
    platform: string;
    tech_stack: string[];
    play_store_url: string;
    app_store_url: string;
    features: Feature[];
    screens_flows: string[];
    challenges: CSPair[];
    impact_stats: ImpactStat[];
    gallery: GalleryImage[];
  };
  /* rich — software */
  software?: {
    software_type: string;
    tech_stack: string[];
    platform_os: string[];
    modules: { module_name: string; description: string }[];
    integrations: string[];
    challenges: CSPair[];
    impact_stats: ImpactStat[];
    gallery: GalleryImage[];
  };
  /* rich — video */
  video?: {
    video_type: string;
    tools_used: string[];
    duration: string;
    style_mood: string[];
    embed_url: string;
    deliverables: string[];
    bts_gallery: GalleryImage[];
  };
  /* rich — marketing */
  marketing?: {
    services: string[];
    platforms: string[];
    campaign_duration: string;
    target_audience: string;
    impact_stats: ImpactStat[];
    gallery: GalleryImage[];
    case_study: string;
  };
  /* rich — uiux */
  uiux?: {
    design_type: string;
    tools_used: string[];
    screens_count: string;
    figma_url: string;
    process_steps: { step_name: string; description: string }[];
    color_palette: string[];
    typography: string[];
    gallery: GalleryImage[];
  };
  /* rich — branding */
  branding?: {
    services: string[];
    tools_used: string[];
    color_palette: string[];
    typography: string[];
    brand_voice: string;
    deliverables: string[];
    gallery: GalleryImage[];
  };
}

const emptyPayload = (): WorkGalleryPayload => ({
  title: "", project_type: "", client_name: "", year: "", location: "",
  short_description: "", long_description: "", thumbnailBase64: "",
  live_url: "", status: "draft", seo_meta_title: "", seo_meta_desc: "",
  link: "", tech: "", description: "", rating: 0, showOn: "none", brand: "", note: "",
  web: { category: "", tech_frontend: [], tech_backend: [], tech_database: [], tech_tools: [],
    features: [], challenges: [],
    stats: { total_pages: "", timeline: "", team_size: "", industry: "" },
    impact_stats: [], timeline_phases: [], gallery: [] },
  app: { platform: "", tech_stack: [], play_store_url: "", app_store_url: "",
    features: [], screens_flows: [], challenges: [], impact_stats: [], gallery: [] },
  software: { software_type: "", tech_stack: [], platform_os: [], modules: [],
    integrations: [], challenges: [], impact_stats: [], gallery: [] },
  video: { video_type: "", tools_used: [], duration: "", style_mood: [],
    embed_url: "", deliverables: [], bts_gallery: [] },
  marketing: { services: [], platforms: [], campaign_duration: "",
    target_audience: "", impact_stats: [], gallery: [], case_study: "" },
  uiux: { design_type: "", tools_used: [], screens_count: "", figma_url: "",
    process_steps: [], color_palette: [], typography: [], gallery: [] },
  branding: { services: [], tools_used: [], color_palette: [], typography: [],
    brand_voice: "", deliverables: [], gallery: [] },
});

/* ─── small helpers ─── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-orange-400 pl-3 mb-4">
      <p className="text-xs font-bold uppercase tracking-widest text-blue-800">{children}</p>
    </div>
  );
}

function FieldGroup({ label, required, children, hint }: {
  label: string; required?: boolean; children: React.ReactNode; hint?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-sm font-semibold">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

/* Tag input */
function TagInput({ tags, onChange, placeholder }: {
  tags: string[]; onChange: (t: string[]) => void; placeholder?: string
}) {
  const [val, setVal] = useState("");
  const add = (raw: string) => {
    const v = raw.trim().replace(/,+$/, "").trim();
    if (!v || tags.includes(v)) return;
    onChange([...tags, v]);
    setVal("");
  };
  return (
    <div className="flex flex-wrap gap-1.5 border rounded-md px-2 py-1.5 min-h-[40px] cursor-text"
      onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.focus()}>
      {tags.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
          {t}
          <button type="button" onClick={() => onChange(tags.filter((x) => x !== t))} className="opacity-60 hover:opacity-100">×</button>
        </span>
      ))}
      <input
        className="flex-1 min-w-[80px] border-none outline-none bg-transparent text-sm"
        value={val}
        placeholder={tags.length ? "" : placeholder}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(val); }
          if (e.key === "Backspace" && !val && tags.length) onChange(tags.slice(0, -1));
        }}
        onBlur={() => { if (val.trim()) add(val); }}
      />
    </div>
  );
}

/* Repeater — features */
function FeaturesRepeater({ items, onChange }: { items: Feature[]; onChange: (v: Feature[]) => void }) {
  const update = (i: number, key: keyof Feature, val: string) => {
    const next = [...items]; next[i] = { ...next[i], [key]: val }; onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((f, i) => (
        <div key={i} className="grid grid-cols-[64px_1fr_1fr_36px] gap-2 items-start bg-gray-50 border rounded-md p-3">
          <Input value={f.icon} onChange={(e) => update(i, "icon", e.target.value)} placeholder="🛍️" />
          <Input value={f.title} onChange={(e) => update(i, "title", e.target.value)} placeholder="Feature title" />
          <Input value={f.description} onChange={(e) => update(i, "description", e.target.value)} placeholder="One-line description" />
          <Button type="button" size="icon" variant="ghost" className="text-red-500 mt-0.5" onClick={() => onChange(items.filter((_, j) => j !== i))}><X size={14} /></Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="border-dashed border-blue-700 text-blue-700"
        onClick={() => onChange([...items, { icon: "", title: "", description: "" }])}>
        <Plus size={14} className="mr-1" /> Add Feature
      </Button>
    </div>
  );
}

/* Repeater — challenges */
function CSRepeater({ items, onChange }: { items: CSPair[]; onChange: (v: CSPair[]) => void }) {
  const update = (i: number, key: keyof CSPair, val: string) => {
    const next = [...items]; next[i] = { ...next[i], [key]: val }; onChange(next);
  };
  return (
    <div className="space-y-3">
      {items.map((p, i) => (
        <div key={i} className="grid sm:grid-cols-2 gap-2 bg-gray-50 border rounded-md p-3 relative">
          <div>
            <Label className="text-xs mb-1 block text-red-600 font-semibold">⚠ Challenge</Label>
            <Textarea rows={2} value={p.challenge} onChange={(e) => update(i, "challenge", e.target.value)} placeholder="Describe the challenge…" />
          </div>
          <div>
            <Label className="text-xs mb-1 block text-green-700 font-semibold">✅ Solution</Label>
            <Textarea rows={2} value={p.solution} onChange={(e) => update(i, "solution", e.target.value)} placeholder="Describe the solution…" />
          </div>
          <Button type="button" size="icon" variant="ghost" className="absolute top-2 right-2 text-red-500" onClick={() => onChange(items.filter((_, j) => j !== i))}><X size={14} /></Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="border-dashed border-blue-700 text-blue-700"
        onClick={() => onChange([...items, { challenge: "", solution: "" }])}>
        <Plus size={14} className="mr-1" /> Add Challenge / Solution
      </Button>
    </div>
  );
}

/* Repeater — impact stats */
function ImpactRepeater({ items, onChange }: { items: ImpactStat[]; onChange: (v: ImpactStat[]) => void }) {
  const update = (i: number, key: keyof ImpactStat, val: string) => {
    const next = [...items]; next[i] = { ...next[i], [key]: val }; onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((s, i) => (
        <div key={i} className="grid grid-cols-[64px_1fr_1fr_36px] gap-2 items-start bg-gray-50 border rounded-md p-3">
          <Input value={s.icon} onChange={(e) => update(i, "icon", e.target.value)} placeholder="📦" />
          <Input value={s.number} onChange={(e) => update(i, "number", e.target.value)} placeholder="500+" />
          <Input value={s.label} onChange={(e) => update(i, "label", e.target.value)} placeholder="Products Listed" />
          <Button type="button" size="icon" variant="ghost" className="text-red-500 mt-0.5" onClick={() => onChange(items.filter((_, j) => j !== i))}><X size={14} /></Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="border-dashed border-blue-700 text-blue-700"
        onClick={() => onChange([...items, { icon: "", number: "", label: "" }])}>
        <Plus size={14} className="mr-1" /> Add Stat
      </Button>
    </div>
  );
}

/* Repeater — timeline phases */
function TimelineRepeater({ items, onChange, nameKey = "phase_name" }: {
  items: any[]; onChange: (v: any[]) => void; nameKey?: string
}) {
  const update = (i: number, key: string, val: string) => {
    const next = [...items]; next[i] = { ...next[i], [key]: val }; onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((p, i) => (
        <div key={i} className="grid sm:grid-cols-[1fr_2fr_36px] gap-2 items-start bg-gray-50 border rounded-md p-3">
          <Input value={p[nameKey] || ""} onChange={(e) => update(i, nameKey, e.target.value)} placeholder="Phase name" />
          <Input value={p.description || ""} onChange={(e) => update(i, "description", e.target.value)} placeholder="Brief description" />
          <Button type="button" size="icon" variant="ghost" className="text-red-500 mt-0.5" onClick={() => onChange(items.filter((_, j) => j !== i))}><X size={14} /></Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="border-dashed border-blue-700 text-blue-700"
        onClick={() => onChange([...items, { [nameKey]: "", description: "" }])}>
        <Plus size={14} className="mr-1" /> Add Phase
      </Button>
    </div>
  );
}

/* Multi-image upload */
function MultiImageUpload({ images, onChange }: { images: GalleryImage[]; onChange: (v: GalleryImage[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange([...images, { url: String(e.target?.result ?? ""), caption: "" }]);
      };
      reader.readAsDataURL(file);
    });
  };
  const updateCaption = (i: number, cap: string) => {
    const next = [...images]; next[i] = { ...next[i], caption: cap }; onChange(next);
  };
  return (
    <div>
      <div
        className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors mb-3"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
      >
        <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground"><span className="font-semibold text-blue-700">Click to upload</span> or drag &amp; drop</p>
        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP — multiple files supported</p>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      </div>
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative w-32">
              <img src={img.url} alt={img.caption} className="w-32 h-24 object-cover rounded border" />
              <button type="button" onClick={() => onChange(images.filter((_, j) => j !== i))}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
              <input
                className="mt-1 w-full text-xs border rounded px-1.5 py-1"
                placeholder="Caption…"
                value={img.caption}
                onChange={(e) => updateCaption(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Checkbox group */
function CheckboxGroup({ options, selected, onChange }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void
}) {
  const toggle = (val: string) =>
    onChange(selected.includes(val) ? selected.filter((x) => x !== val) : [...selected, val]);
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer select-none">
          <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)}
            className="accent-blue-700 w-4 h-4" />
          {opt}
        </label>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN FORM COMPONENT
   ═══════════════════════════════════════════ */
interface Props {
  mode: "add" | "edit";
  initialData?: Partial<WorkGalleryPayload>;
  itemId?: string;
}

export default function WorkGalleryForm({ mode, initialData, itemId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WorkGalleryPayload>(() => ({ ...emptyPayload(), ...initialData }));

  const set = (key: keyof WorkGalleryPayload, val: any) =>
    setData((prev) => ({ ...prev, [key]: val }));

  const setWeb = (key: string, val: any) =>
    setData((prev) => ({ ...prev, web: { ...prev.web!, [key]: val } }));

  const setApp = (key: string, val: any) =>
    setData((prev) => ({ ...prev, app: { ...prev.app!, [key]: val } }));

  const setSoftware = (key: string, val: any) =>
    setData((prev) => ({ ...prev, software: { ...prev.software!, [key]: val } }));

  const setVideo = (key: string, val: any) =>
    setData((prev) => ({ ...prev, video: { ...prev.video!, [key]: val } }));

  const setMarketing = (key: string, val: any) =>
    setData((prev) => ({ ...prev, marketing: { ...prev.marketing!, [key]: val } }));

  const setUiux = (key: string, val: any) =>
    setData((prev) => ({ ...prev, uiux: { ...prev.uiux!, [key]: val } }));

  const setBranding = (key: string, val: any) =>
    setData((prev) => ({ ...prev, branding: { ...prev.branding!, [key]: val } }));

  /* thumbnail single upload */
  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => set("thumbnailBase64", String(reader.result));
    reader.readAsDataURL(f);
  };

  /* sync legacy fields from rich data before submit */
  const buildPayload = () => {
    const p = { ...data };
    // legacy compat: populate old fields from new ones
    p.link        = p.link || p.live_url || "";
    p.description = p.description || p.short_description || "";
    p.showOn      = p.showOn !== "none" ? p.showOn : (p.project_type || "none");
    // strip undefined nested keys
    if (!p.project_type) {
      delete p.web; delete p.app; delete p.software;
      delete p.video; delete p.marketing; delete p.uiux; delete p.branding;
    }
    return p;
  };

  const handleSubmit = async (status: "draft" | "published") => {
    if (!data.title.trim()) {
      toast({ title: "Validation", description: "Project title is required.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const payload = { ...buildPayload(), status };
      const url  = mode === "edit" ? `/api/work-gallery/${itemId}` : "/api/work-gallery";
      const method = mode === "edit" ? "PUT" : "POST";
      const res  = await apiFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      toast({ title: mode === "edit" ? "Updated!" : "Saved!", description: `Project ${status === "draft" ? "saved as draft" : "published"} successfully.` });
      router.push("/work-gallery");
    } catch (e) {
      toast({ title: "Error", description: "Could not save. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const pt = data.project_type;

  return (
    <div className="space-y-5 pb-20">
      {/* ── Back ── */}
      <Link href="/work-gallery" className="inline-flex items-center gap-2 text-sm text-blue-700 hover:underline">
        <ArrowLeft size={15} /> Back to Work Gallery
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-blue-900">{mode === "edit" ? "Edit Project" : "Add New Project"}</h1>
        <p className="text-sm text-muted-foreground mt-1">Dynamic fields appear based on the Project Type you select.</p>
      </div>

      {/* ══ BASE FIELDS ══ */}
      <Card>
        <CardHeader><CardTitle className="text-base"><SectionTitle>Project Information</SectionTitle></CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <FieldGroup label="Project Title" required>
              <Input value={data.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Flaunt By Nishi" />
            </FieldGroup>
            <FieldGroup label="Project Type" required>
              <Select value={data.project_type} onValueChange={(v) => { set("project_type", v); set("showOn", v.replace("_", "-")); }}>
                <SelectTrigger><SelectValue placeholder="Select type…" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="web_development">Web Development</SelectItem>
                  <SelectItem value="app_development">App Development</SelectItem>
                  <SelectItem value="software_development">Software Development</SelectItem>
                  <SelectItem value="video_editing">Video Editing</SelectItem>
                  <SelectItem value="digital_marketing">Digital Marketing</SelectItem>
                  <SelectItem value="uiux_design">UI/UX Design</SelectItem>
                  <SelectItem value="branding">Branding</SelectItem>
                </SelectContent>
              </Select>
            </FieldGroup>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <FieldGroup label="Client Name" required>
              <Input value={data.client_name} onChange={(e) => set("client_name", e.target.value)} placeholder="e.g. Nishi Sharma" />
            </FieldGroup>
            <FieldGroup label="Year">
              <Input type="number" value={data.year} onChange={(e) => set("year", e.target.value)} placeholder="2024" />
            </FieldGroup>
            <FieldGroup label="Location / City">
              <Input value={data.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Surat, Gujarat" />
            </FieldGroup>
          </div>

          <FieldGroup label="Short Description" required hint={`${data.short_description.length}/200 chars`}>
            <Textarea maxLength={200} rows={2} value={data.short_description}
              onChange={(e) => set("short_description", e.target.value)}
              placeholder="Shown on portfolio card…" />
          </FieldGroup>

          <FieldGroup label="Full Description / About the Project">
            <Textarea rows={5} value={data.long_description}
              onChange={(e) => set("long_description", e.target.value)}
              placeholder="Detailed project story shown on the details page…" />
          </FieldGroup>

          <div className="grid sm:grid-cols-2 gap-4">
            <FieldGroup label="Live URL">
              <Input type="url" value={data.live_url} onChange={(e) => { set("live_url", e.target.value); set("link", e.target.value); }}
                placeholder="https://example.com" />
            </FieldGroup>
            <FieldGroup label="Status">
              <Select value={data.status} onValueChange={(v) => set("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </FieldGroup>
          </div>

          <FieldGroup label="Hero / Thumbnail Image">
            {data.thumbnailBase64 && (
              <div className="mb-2 relative w-fit">
                <img src={data.thumbnailBase64} alt="Thumbnail" className="w-32 h-24 object-cover rounded border" />
                <button type="button" onClick={() => set("thumbnailBase64", "")}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">×</button>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleThumbnail} className="text-sm" />
          </FieldGroup>
        </CardContent>
      </Card>

      {/* ══ SEO ══ */}
      <Card>
        <CardContent className="pt-5 space-y-4">
          <SectionTitle>SEO Meta</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-4">
            <FieldGroup label="Meta Title">
              <Input maxLength={60} value={data.seo_meta_title} onChange={(e) => set("seo_meta_title", e.target.value)} placeholder="SEO title (60 chars)" />
            </FieldGroup>
            <FieldGroup label="Meta Description">
              <Input maxLength={160} value={data.seo_meta_desc} onChange={(e) => set("seo_meta_desc", e.target.value)} placeholder="SEO description (160 chars)" />
            </FieldGroup>
          </div>
        </CardContent>
      </Card>

      {/* ══ WEB DEVELOPMENT ══ */}
      {pt === "web_development" && (
        <>
          <Card>
            <CardContent className="pt-5 space-y-4">
              <SectionTitle>Web Development Details</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                <FieldGroup label="Category">
                  <Select value={data.web!.category} onValueChange={(v) => setWeb("category", v)}>
                    <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      {["E-Commerce","Blog/CMS","SaaS","Corporate","Landing Page","Web App","Other"].map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {(["total_pages","timeline","team_size","industry"] as const).map((k) => (
                  <FieldGroup key={k} label={k.split("_").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")}>
                    <Input value={(data.web!.stats as any)[k]} onChange={(e) => setWeb("stats", { ...data.web!.stats, [k]: e.target.value })} placeholder={k === "timeline" ? "e.g. 8 weeks" : k === "team_size" ? "e.g. 3 members" : ""} />
                  </FieldGroup>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 space-y-4">
              <SectionTitle>Tech Stack</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                <FieldGroup label="Frontend"><TagInput tags={data.web!.tech_frontend} onChange={(v) => setWeb("tech_frontend", v)} placeholder="React, Vue… Enter to add" /></FieldGroup>
                <FieldGroup label="Backend"><TagInput tags={data.web!.tech_backend} onChange={(v) => setWeb("tech_backend", v)} placeholder="Node.js, Django… Enter to add" /></FieldGroup>
                <FieldGroup label="Database"><TagInput tags={data.web!.tech_database} onChange={(v) => setWeb("tech_database", v)} placeholder="MongoDB, MySQL… Enter to add" /></FieldGroup>
                <FieldGroup label="Tools & DevOps"><TagInput tags={data.web!.tech_tools} onChange={(v) => setWeb("tech_tools", v)} placeholder="Docker, Vercel… Enter to add" /></FieldGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 space-y-3">
              <SectionTitle>Key Features</SectionTitle>
              <FeaturesRepeater items={data.web!.features} onChange={(v) => setWeb("features", v)} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 space-y-3">
              <SectionTitle>Challenges &amp; Solutions</SectionTitle>
              <CSRepeater items={data.web!.challenges} onChange={(v) => setWeb("challenges", v)} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 space-y-3">
              <SectionTitle>Result / Impact Stats</SectionTitle>
              <ImpactRepeater items={data.web!.impact_stats} onChange={(v) => setWeb("impact_stats", v)} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 space-y-3">
              <SectionTitle>Project Timeline Phases</SectionTitle>
              <TimelineRepeater items={data.web!.timeline_phases} onChange={(v) => setWeb("timeline_phases", v)} nameKey="phase_name" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 space-y-3">
              <SectionTitle>Screenshots / Gallery</SectionTitle>
              <MultiImageUpload images={data.web!.gallery} onChange={(v) => setWeb("gallery", v)} />
            </CardContent>
          </Card>
        </>
      )}

      {/* ══ APP DEVELOPMENT ══ */}
      {pt === "app_development" && (
        <>
          <Card>
            <CardContent className="pt-5 space-y-4">
              <SectionTitle>App Development Details</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                <FieldGroup label="Platform">
                  <Select value={data.app!.platform} onValueChange={(v) => setApp("platform", v)}>
                    <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      {["Android","iOS","Both (Flutter/RN)","PWA","Cross-Platform"].map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup label="Tech Stack"><TagInput tags={data.app!.tech_stack} onChange={(v) => setApp("tech_stack", v)} placeholder="Flutter, Swift… Enter to add" /></FieldGroup>
                <FieldGroup label="Google Play Store URL"><Input type="url" value={data.app!.play_store_url} onChange={(e) => setApp("play_store_url", e.target.value)} placeholder="https://play.google.com/…" /></FieldGroup>
                <FieldGroup label="Apple App Store URL"><Input type="url" value={data.app!.app_store_url} onChange={(e) => setApp("app_store_url", e.target.value)} placeholder="https://apps.apple.com/…" /></FieldGroup>
              </div>
              <FieldGroup label="Screens / Flows Covered"><TagInput tags={data.app!.screens_flows} onChange={(v) => setApp("screens_flows", v)} placeholder="Onboarding, Dashboard… Enter to add" /></FieldGroup>
            </CardContent>
          </Card>
          <Card><CardContent className="pt-5 space-y-3"><SectionTitle>Key Features</SectionTitle><FeaturesRepeater items={data.app!.features} onChange={(v) => setApp("features", v)} /></CardContent></Card>
          <Card><CardContent className="pt-5 space-y-3"><SectionTitle>Challenges &amp; Solutions</SectionTitle><CSRepeater items={data.app!.challenges} onChange={(v) => setApp("challenges", v)} /></CardContent></Card>
          <Card><CardContent className="pt-5 space-y-3"><SectionTitle>Impact Stats</SectionTitle><ImpactRepeater items={data.app!.impact_stats} onChange={(v) => setApp("impact_stats", v)} /></CardContent></Card>
          <Card><CardContent className="pt-5 space-y-3"><SectionTitle>Screenshots / Gallery</SectionTitle><MultiImageUpload images={data.app!.gallery} onChange={(v) => setApp("gallery", v)} /></CardContent></Card>
        </>
      )}

      {/* ══ SOFTWARE DEVELOPMENT ══ */}
      {pt === "software_development" && (
        <>
          <Card>
            <CardContent className="pt-5 space-y-4">
              <SectionTitle>Software Details</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                <FieldGroup label="Software Type">
                  <Select value={data.software!.software_type} onValueChange={(v) => setSoftware("software_type", v)}>
                    <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      {["Desktop App","ERP","CRM","Billing","Inventory","HR","Custom"].map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup label="Tech Stack"><TagInput tags={data.software!.tech_stack} onChange={(v) => setSoftware("tech_stack", v)} placeholder="Python, Electron… Enter to add" /></FieldGroup>
              </div>
              <FieldGroup label="Platform / OS">
                <CheckboxGroup options={["Windows","Mac","Linux","Web-based"]} selected={data.software!.platform_os} onChange={(v) => setSoftware("platform_os", v)} />
              </FieldGroup>
              <FieldGroup label="Integrations"><TagInput tags={data.software!.integrations} onChange={(v) => setSoftware("integrations", v)} placeholder="Tally, GST API… Enter to add" /></FieldGroup>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-3">
              <SectionTitle>Key Modules</SectionTitle>
              <TimelineRepeater items={data.software!.modules} onChange={(v) => setSoftware("modules", v)} nameKey="module_name" />
            </CardContent>
          </Card>
          <Card><CardContent className="pt-5 space-y-3"><SectionTitle>Challenges &amp; Solutions</SectionTitle><CSRepeater items={data.software!.challenges} onChange={(v) => setSoftware("challenges", v)} /></CardContent></Card>
          <Card><CardContent className="pt-5 space-y-3"><SectionTitle>Impact Stats</SectionTitle><ImpactRepeater items={data.software!.impact_stats} onChange={(v) => setSoftware("impact_stats", v)} /></CardContent></Card>
          <Card><CardContent className="pt-5 space-y-3"><SectionTitle>Screenshots / Gallery</SectionTitle><MultiImageUpload images={data.software!.gallery} onChange={(v) => setSoftware("gallery", v)} /></CardContent></Card>
        </>
      )}

      {/* ══ VIDEO EDITING ══ */}
      {pt === "video_editing" && (
        <>
          <Card>
            <CardContent className="pt-5 space-y-4">
              <SectionTitle>Video Editing Details</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                <FieldGroup label="Video Type">
                  <Select value={data.video!.video_type} onValueChange={(v) => setVideo("video_type", v)}>
                    <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      {["Brand Film","Reels/Shorts","Product Video","Testimonial","Event Coverage","YouTube","Ad Creative"].map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup label="Duration"><Input value={data.video!.duration} onChange={(e) => setVideo("duration", e.target.value)} placeholder="e.g. 2:30 mins" /></FieldGroup>
                <FieldGroup label="Tools Used"><TagInput tags={data.video!.tools_used} onChange={(v) => setVideo("tools_used", v)} placeholder="Premiere Pro, DaVinci… Enter to add" /></FieldGroup>
                <FieldGroup label="Style / Mood"><TagInput tags={data.video!.style_mood} onChange={(v) => setVideo("style_mood", v)} placeholder="Cinematic, Minimal… Enter to add" /></FieldGroup>
              </div>
              <FieldGroup label="Deliverables"><TagInput tags={data.video!.deliverables} onChange={(v) => setVideo("deliverables", v)} placeholder="4K Export, Subtitles… Enter to add" /></FieldGroup>
              <FieldGroup label="YouTube / Vimeo Embed URL">
                <Input type="url" value={data.video!.embed_url} onChange={(e) => setVideo("embed_url", e.target.value)} placeholder="https://youtu.be/…" />
                {data.video!.embed_url && (() => {
                  const yt = data.video!.embed_url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
                  const vm = data.video!.embed_url.match(/vimeo\.com\/(\d+)/);
                  const src = yt ? `https://www.youtube.com/embed/${yt[1]}` : vm ? `https://player.vimeo.com/video/${vm[1]}` : null;
                  return src ? (
                    <div className="mt-2 rounded overflow-hidden border aspect-video">
                      <iframe src={src} className="w-full h-full" allowFullScreen />
                    </div>
                  ) : null;
                })()}
              </FieldGroup>
            </CardContent>
          </Card>
          <Card><CardContent className="pt-5 space-y-3"><SectionTitle>Behind-the-Scenes Gallery</SectionTitle><MultiImageUpload images={data.video!.bts_gallery} onChange={(v) => setVideo("bts_gallery", v)} /></CardContent></Card>
        </>
      )}

      {/* ══ DIGITAL MARKETING ══ */}
      {pt === "digital_marketing" && (
        <>
          <Card>
            <CardContent className="pt-5 space-y-4">
              <SectionTitle>Digital Marketing Details</SectionTitle>
              <FieldGroup label="Services Provided">
                <CheckboxGroup options={["SEO","SMM","PPC","Email Marketing","Content Marketing","Influencer","WhatsApp Marketing"]} selected={data.marketing!.services} onChange={(v) => setMarketing("services", v)} />
              </FieldGroup>
              <div className="grid sm:grid-cols-2 gap-4">
                <FieldGroup label="Platforms"><TagInput tags={data.marketing!.platforms} onChange={(v) => setMarketing("platforms", v)} placeholder="Google, Instagram… Enter to add" /></FieldGroup>
                <FieldGroup label="Campaign Duration"><Input value={data.marketing!.campaign_duration} onChange={(e) => setMarketing("campaign_duration", e.target.value)} placeholder="e.g. 3 months" /></FieldGroup>
              </div>
              <FieldGroup label="Target Audience"><Textarea rows={2} value={data.marketing!.target_audience} onChange={(e) => setMarketing("target_audience", e.target.value)} placeholder="Describe the target audience…" /></FieldGroup>
              <FieldGroup label="Case Study Summary"><Textarea rows={4} value={data.marketing!.case_study} onChange={(e) => setMarketing("case_study", e.target.value)} placeholder="Write a detailed case study…" /></FieldGroup>
            </CardContent>
          </Card>
          <Card><CardContent className="pt-5 space-y-3"><SectionTitle>Impact Stats</SectionTitle><ImpactRepeater items={data.marketing!.impact_stats} onChange={(v) => setMarketing("impact_stats", v)} /></CardContent></Card>
          <Card><CardContent className="pt-5 space-y-3"><SectionTitle>Creatives / Gallery</SectionTitle><MultiImageUpload images={data.marketing!.gallery} onChange={(v) => setMarketing("gallery", v)} /></CardContent></Card>
        </>
      )}

      {/* ══ UI/UX DESIGN ══ */}
      {pt === "uiux_design" && (
        <>
          <Card>
            <CardContent className="pt-5 space-y-4">
              <SectionTitle>UI/UX Design Details</SectionTitle>
              <div className="grid sm:grid-cols-2 gap-4">
                <FieldGroup label="Design Type">
                  <Select value={data.uiux!.design_type} onValueChange={(v) => setUiux("design_type", v)}>
                    <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      {["Website UI","App UI","Dashboard","Design System","Prototype","Wireframe"].map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup label="No. of Screens Designed"><Input type="number" value={data.uiux!.screens_count} onChange={(e) => setUiux("screens_count", e.target.value)} placeholder="e.g. 24" /></FieldGroup>
                <FieldGroup label="Tools Used"><TagInput tags={data.uiux!.tools_used} onChange={(v) => setUiux("tools_used", v)} placeholder="Figma, Adobe XD… Enter to add" /></FieldGroup>
                <FieldGroup label="Typography / Fonts"><TagInput tags={data.uiux!.typography} onChange={(v) => setUiux("typography", v)} placeholder="Inter, Poppins… Enter to add" /></FieldGroup>
              </div>
              <FieldGroup label="Figma / Prototype Link"><Input type="url" value={data.uiux!.figma_url} onChange={(e) => setUiux("figma_url", e.target.value)} placeholder="https://figma.com/…" /></FieldGroup>
              <FieldGroup label="Color Palette">
                <div className="flex flex-wrap gap-3 items-center">
                  {data.uiux!.color_palette.map((c, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <input type="color" value={c} onChange={(e) => {
                        const next = [...data.uiux!.color_palette]; next[i] = e.target.value; setUiux("color_palette", next);
                      }} className="w-10 h-10 rounded-full cursor-pointer border-none p-0" />
                      <span className="text-[10px] text-muted-foreground font-mono">{c.toUpperCase()}</span>
                      <button type="button" className="text-red-400 text-xs" onClick={() => setUiux("color_palette", data.uiux!.color_palette.filter((_, j) => j !== i))}>✕</button>
                    </div>
                  ))}
                  {data.uiux!.color_palette.length < 5 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => setUiux("color_palette", [...data.uiux!.color_palette, "#044bab"])}>
                      <Plus size={12} className="mr-1" /> Add Color
                    </Button>
                  )}
                </div>
              </FieldGroup>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 space-y-3">
              <SectionTitle>Design Process Steps</SectionTitle>
              <TimelineRepeater items={data.uiux!.process_steps} onChange={(v) => setUiux("process_steps", v)} nameKey="step_name" />
            </CardContent>
          </Card>
          <Card><CardContent className="pt-5 space-y-3"><SectionTitle>Screenshots / Gallery</SectionTitle><MultiImageUpload images={data.uiux!.gallery} onChange={(v) => setUiux("gallery", v)} /></CardContent></Card>
        </>
      )}

      {/* ══ BRANDING ══ */}
      {pt === "branding" && (
        <>
          <Card>
            <CardContent className="pt-5 space-y-4">
              <SectionTitle>Branding Details</SectionTitle>
              <FieldGroup label="Branding Services">
                <CheckboxGroup options={["Logo Design","Brand Guidelines","Business Card","Social Kit","Packaging","Pitch Deck"]} selected={data.branding!.services} onChange={(v) => setBranding("services", v)} />
              </FieldGroup>
              <div className="grid sm:grid-cols-2 gap-4">
                <FieldGroup label="Tools Used"><TagInput tags={data.branding!.tools_used} onChange={(v) => setBranding("tools_used", v)} placeholder="Illustrator, Canva… Enter to add" /></FieldGroup>
                <FieldGroup label="Typography / Fonts"><TagInput tags={data.branding!.typography} onChange={(v) => setBranding("typography", v)} placeholder="Playfair, Montserrat… Enter to add" /></FieldGroup>
                <FieldGroup label="Brand Voice / Tone">
                  <Select value={data.branding!.brand_voice} onValueChange={(v) => setBranding("brand_voice", v)}>
                    <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                    <SelectContent>
                      {["Professional","Playful","Minimal","Luxury","Bold"].map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup label="Deliverables"><TagInput tags={data.branding!.deliverables} onChange={(v) => setBranding("deliverables", v)} placeholder="AI Files, PNG… Enter to add" /></FieldGroup>
              </div>
              <FieldGroup label="Color Palette">
                <div className="flex flex-wrap gap-3 items-center">
                  {data.branding!.color_palette.map((c, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <input type="color" value={c} onChange={(e) => {
                        const next = [...data.branding!.color_palette]; next[i] = e.target.value; setBranding("color_palette", next);
                      }} className="w-10 h-10 rounded-full cursor-pointer border-none p-0" />
                      <span className="text-[10px] text-muted-foreground font-mono">{c.toUpperCase()}</span>
                      <button type="button" className="text-red-400 text-xs" onClick={() => setBranding("color_palette", data.branding!.color_palette.filter((_, j) => j !== i))}>✕</button>
                    </div>
                  ))}
                  {data.branding!.color_palette.length < 5 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => setBranding("color_palette", [...data.branding!.color_palette, "#044bab"])}>
                      <Plus size={12} className="mr-1" /> Add Color
                    </Button>
                  )}
                </div>
              </FieldGroup>
            </CardContent>
          </Card>
          <Card><CardContent className="pt-5 space-y-3"><SectionTitle>Brand Assets Gallery</SectionTitle><MultiImageUpload images={data.branding!.gallery} onChange={(v) => setBranding("gallery", v)} /></CardContent></Card>
        </>
      )}

      {/* ══ ACTION BAR ══ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg px-6 py-3 flex items-center gap-3 z-50">
        <Button type="button" variant="outline" disabled={loading} onClick={() => handleSubmit("draft")}>
          💾 Save as Draft
        </Button>
        <Button type="button" disabled={loading} onClick={() => handleSubmit("published")} className="bg-blue-800 hover:bg-blue-900">
          🚀 {loading ? "Saving…" : "Publish Project"}
        </Button>
        <span className="ml-auto text-xs text-muted-foreground">Fields marked <span className="text-red-500">*</span> are required.</span>
      </div>
    </div>
  );
}
