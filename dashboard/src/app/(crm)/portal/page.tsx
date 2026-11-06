"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const TYPES = ["stack", "template", "palette", "font"];
const KINDS = ["web", "software", "app"];
const J = { "Content-Type": "application/json" };
const sel = "border-2 border-black bg-white px-2 py-2 text-sm font-bold";

export default function PortalAdminPage() {
  const { toast } = useToast();
  const [assets, setAssets] = useState<any[]>([]);
  const [passes, setPasses] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [a, setA] = useState<any>({ type: "stack", name: "", kinds: [], preview: "", code: "" });
  const [p, setP] = useState<any>({ projectId: "", kind: "web", sections: TYPES, days: 14 });
  const [fresh, setFresh] = useState("");

  const load = async () => {
    const [x, y, z] = await Promise.all(
      ["/api/portal-assets", "/api/portal-passes", "/api/projects"].map((u) => apiFetch(u).then((r) => r.json())),
    );
    setAssets(Array.isArray(x) ? x : []);
    setPasses(Array.isArray(y) ? y : []);
    setProjects(Array.isArray(z) ? z : []);
  };
  useEffect(() => { load(); }, []);

  const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((i) => i !== v) : [...arr, v]);

  const addAsset = async () => {
    const r = await apiFetch(a._id ? `/api/portal-assets?id=${a._id}` : "/api/portal-assets", {
      method: a._id ? "PUT" : "POST",
      headers: J,
      body: JSON.stringify(a),
    });
    if (!r.ok) return toast({ title: "Type and name required", variant: "destructive" });
    setA({ type: a.type, name: "", kinds: [], preview: "", code: "" });
    load();
  };
  const gen = async () => {
    const r = await apiFetch("/api/portal-passes", { method: "POST", headers: J, body: JSON.stringify(p) });
    const d = await r.json();
    if (!r.ok) return toast({ title: d.error || "Failed", variant: "destructive" });
    setFresh(d.code);
    load();
  };
  const link = (c: string) => `${process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.pixelatenest.com"}/portal.html?c=${c}`;

  return (
    <div className="space-y-10 font-headline">
      <header>
        <h1 className="text-5xl font-black tracking-tighter">CLIENT PORTAL</h1>
        <p className="text-muted-foreground text-lg">Library of assets + passes for clients.</p>
      </header>

      <section className="border-4 border-black p-5 space-y-3">
        <h2 className="text-2xl font-black">GENERATE PASS</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <select className={sel} value={p.projectId} onChange={(e) => setP({ ...p, projectId: e.target.value })}>
            <option value="">Select project…</option>
            {projects.map((x) => <option key={x._id} value={x._id}>{x.title}</option>)}
          </select>
          <select className={sel} value={p.kind} onChange={(e) => setP({ ...p, kind: e.target.value })}>
            {KINDS.map((k) => <option key={k}>{k}</option>)}
          </select>
          <Input className="w-24" type="number" value={p.days} onChange={(e) => setP({ ...p, days: e.target.value })} title="Valid days" />
          {TYPES.map((t) => (
            <label key={t} className="text-sm font-bold flex gap-1">
              <input type="checkbox" checked={p.sections.includes(t)} onChange={() => setP({ ...p, sections: toggle(p.sections, t) })} />
              {t}
            </label>
          ))}
          <Button onClick={gen} disabled={!p.projectId}>Generate</Button>
        </div>
        {fresh && (
          <div className="bg-black text-white p-4 font-mono">
            <div className="text-3xl font-black tracking-widest">{fresh}</div>
            <div className="text-xs break-all">{link(fresh)}</div>
            <div className="text-xs text-yellow-300 mt-1">Shown once — copy now.</div>
            <Button size="sm" className="mt-2" onClick={() => navigator.clipboard.writeText(link(fresh))}>Copy link</Button>
          </div>
        )}
        <div className="space-y-1 pt-2">
          {passes.map((x) => (
            <div key={x._id} className="flex flex-wrap items-center gap-3 border-2 border-black p-2 text-sm">
              <b>{projects.find((q) => q._id === x.projectId)?.title ?? x.projectId}</b>
              <span>{x.kind}</span>
              <span>{x.revoked ? "REVOKED" : new Date(x.expiresAt) < new Date() ? "EXPIRED" : "ACTIVE"}</span>
              <span>{x.submittedAt ? "SUBMITTED" : "pending"}</span>
              <span className="text-xs">{Object.entries(x.selections || {}).map(([k, v]) => `${k}: ${assets.find((q) => q._id === v)?.name ?? v}`).join(" · ")}</span>
              {!x.revoked && (
                <Button size="sm" variant="destructive" className="ml-auto" onClick={async () => { await apiFetch(`/api/portal-passes?id=${x._id}`, { method: "DELETE" }); load(); }}>
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="border-4 border-black p-5 space-y-3">
        <h2 className="text-2xl font-black">LIBRARY {a._id && "(editing)"}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex gap-2">
            <select className={sel} value={a.type} onChange={(e) => setA({ ...a, type: e.target.value })}>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            <Input placeholder="Name (e.g. Next.js, Playfair Display)" value={a.name} onChange={(e) => setA({ ...a, name: e.target.value })} />
          </div>
          <Input
            placeholder={a.type === "palette" ? "Hex list: #111111,#c9a24b,#f5f0e6" : a.type === "font" ? "Google font family name" : "Preview image URL"}
            value={a.preview}
            onChange={(e) => setA({ ...a, preview: e.target.value })}
          />
          <div className="flex gap-3 items-center">
            {KINDS.map((k) => (
              <label key={k} className="text-sm font-bold flex gap-1">
                <input type="checkbox" checked={a.kinds.includes(k)} onChange={() => setA({ ...a, kinds: toggle(a.kinds, k) })} />
                {k}
              </label>
            ))}
            <span className="text-xs text-muted-foreground">(none = all)</span>
          </div>
          <Textarea placeholder="Your code / notes — private, never shown to clients" value={a.code} onChange={(e) => setA({ ...a, code: e.target.value })} />
        </div>
        <Button onClick={addAsset}>{a._id ? "Save" : "Add asset"}</Button>
        <div className="grid gap-2 md:grid-cols-3">
          {assets.map((x) => (
            <div key={x._id} className="border-2 border-black p-2 text-sm">
              <b>{x.name}</b> <span className="text-xs">[{x.type}] {x.kinds?.join("/")}</span>
              <div className="flex gap-2 mt-1">
                <Button size="sm" variant="outline" onClick={() => { setA(x); scrollTo({ top: document.body.scrollHeight }); }}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={async () => { await apiFetch(`/api/portal-assets?id=${x._id}`, { method: "DELETE" }); load(); }}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
