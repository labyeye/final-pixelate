"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Database, Folder, RefreshCw, Plus, Pencil, Trash2 } from "lucide-react";

const PRODUCT: Record<string, string> = {
  hrms: "Nest HR", nesthr: "Nest HR", leads: "Nest Leads", nestleads: "Nest Leads",
  nestsports: "Nest Academy", nestplay: "Nest Academy", gym: "Nest Gym", nestgym: "Nest Gym",
  care: "Nest Doc", nestcare: "Nest Doc", nest_transport: "Nest Transport", ktsllpsoftware: "Pixelate dashboard",
};
const LIMIT = 25;
const pretty = (v: any) => JSON.stringify(v, null, 2);
const cell = (v: any) => {
  if (v == null) return "—";
  const s = typeof v === "object" ? JSON.stringify(v) : String(v);
  return s.length > 60 ? s.slice(0, 60) + "…" : s;
};

async function call(url: string, init?: RequestInit) {
  const r = await apiFetch(url, init);
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || `Request failed (${r.status})`);
  return j;
}

export default function DbManagerPage() {
  const [dbs, setDbs] = useState<{ name: string }[]>([]);
  const [db, setDb] = useState("");
  const [cols, setCols] = useState<{ name: string; count: number }[]>([]);
  const [col, setCol] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [skip, setSkip] = useState(0);
  const [data, setData] = useState<{ docs: any[]; total: number } | null>(null);
  const [err, setErr] = useState("");
  const [editor, setEditor] = useState<{ id?: any; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const guard = async (fn: () => Promise<void>) => { setErr(""); try { await fn(); } catch (e: any) { setErr(e.message); } };

  useEffect(() => { guard(async () => setDbs((await call("/api/db-manager")).databases)); }, []);

  const pickDb = (name: string) => guard(async () => {
    setDb(name); setCol(""); setData(null); setSkip(0);
    setCols((await call(`/api/db-manager?db=${encodeURIComponent(name)}`)).collections);
  });

  const load = useCallback((c = col, s = skip) => guard(async () => {
    const q = new URLSearchParams({ db, col: c, skip: String(s), limit: String(LIMIT) });
    if (filter.trim()) q.set("filter", filter);
    if (sort.trim()) q.set("sort", sort);
    setData(await call(`/api/db-manager?${q}`));
  }), [db, col, skip, filter, sort]); // eslint-disable-line react-hooks/exhaustive-deps

  const pickCol = (c: string) => { setCol(c); setSkip(0); setFilter(""); setSort(""); load(c, 0); };

  const post = (body: object) => guard(async () => {
    setBusy(true);
    try { await call("/api/db-manager", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ db, col, ...body }) }); }
    finally { setBusy(false); }
    setEditor(null); await load();
  });

  const remove = (d: any) => {
    if (!confirm(`Delete this document from ${db}.${col}?\n\n${pretty(d._id)}\n\nThe previous version is saved in the audit log.`)) return;
    post({ op: "delete", id: pretty(d._id) });
  };

  const keys = data ? Array.from(new Set(data.docs.flatMap((d) => Object.keys(d)))).slice(0, 8) : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black uppercase flex items-center gap-2"><Database className="h-6 w-6" /> Database Manager</h1>
        <p className="text-xs text-muted-foreground">Live production data. Every change is audit-logged.</p>
      </div>
      {err && <div className="border-2 border-black bg-red-100 p-3 text-sm font-bold">{err}</div>}

      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
        <div className="border-2 border-black bg-white p-2 space-y-1 max-h-[75vh] overflow-auto">
          {dbs.map((d) => (
            <div key={d.name}>
              <button onClick={() => pickDb(d.name)} className={`w-full text-left px-2 py-1 text-sm font-bold flex items-center gap-2 ${db === d.name ? "bg-yellow-300" : "hover:bg-gray-100"}`}>
                <Database className="h-4 w-4" /> <span className="truncate">{PRODUCT[d.name] ?? d.name}</span>
                <span className="text-[10px] text-muted-foreground ml-auto">{d.name}</span>
              </button>
              {db === d.name && cols.map((c) => (
                <button key={c.name} onClick={() => pickCol(c.name)} className={`w-full text-left pl-8 pr-2 py-0.5 text-xs flex items-center gap-1 ${col === c.name ? "bg-black text-white" : "hover:bg-gray-100"}`}>
                  <Folder className="h-3 w-3" /> <span className="truncate">{c.name}</span><span className="ml-auto opacity-60">{c.count}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="space-y-3 min-w-0">
          {!col ? <p className="text-sm text-muted-foreground">Pick a database, then a collection.</p> : (
            <>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-black">{db}.{col}</span>
                <Input className="flex-1 min-w-[220px] font-mono text-xs" placeholder='Filter, e.g. { "email": "a@b.com" }' value={filter} onChange={(e) => setFilter(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (setSkip(0), load(col, 0))} />
                <Input className="w-48 font-mono text-xs" placeholder='Sort, e.g. { "createdAt": -1 }' value={sort} onChange={(e) => setSort(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (setSkip(0), load(col, 0))} />
                <Button size="sm" onClick={() => { setSkip(0); load(col, 0); }}><RefreshCw className="h-4 w-4 mr-1" />Find</Button>
                <Button size="sm" variant="outline" onClick={() => setEditor({ text: "{\n  \n}" })}><Plus className="h-4 w-4 mr-1" />Insert</Button>
              </div>

              {data && (
                <>
                  <div className="border-2 border-black bg-white overflow-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-100"><tr>{keys.map((k) => <th key={k} className="text-left p-2 font-black">{k}</th>)}<th className="p-2" /></tr></thead>
                      <tbody>
                        {data.docs.map((d, i) => (
                          <tr key={i} className="border-t">
                            {keys.map((k) => <td key={k} className="p-2 font-mono max-w-[260px] truncate" title={typeof d[k] === "object" ? JSON.stringify(d[k]) : String(d[k] ?? "")}>{cell(d[k])}</td>)}
                            <td className="p-2 whitespace-nowrap text-right">
                              <Button size="icon" variant="ghost" onClick={() => setEditor({ id: d._id, text: pretty(d) })}><Pencil className="h-4 w-4" /></Button>
                              <Button size="icon" variant="ghost" onClick={() => remove(d)}><Trash2 className="h-4 w-4 text-red-600" /></Button>
                            </td>
                          </tr>
                        ))}
                        {!data.docs.length && <tr><td className="p-4 text-muted-foreground" colSpan={keys.length + 1}>No documents.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Button size="sm" variant="outline" disabled={skip === 0} onClick={() => { const s = Math.max(0, skip - LIMIT); setSkip(s); load(col, s); }}>Prev</Button>
                    <span>{data.total ? skip + 1 : 0}–{Math.min(skip + LIMIT, data.total)} of {data.total}</span>
                    <Button size="sm" variant="outline" disabled={skip + LIMIT >= data.total} onClick={() => { const s = skip + LIMIT; setSkip(s); load(col, s); }}>Next</Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <Dialog open={!!editor} onOpenChange={(o) => !o && setEditor(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{editor?.id ? "Edit document" : "Insert document"} — {db}.{col}</DialogTitle></DialogHeader>
          <p className="text-xs text-muted-foreground">Extended JSON: ObjectId as {`{"$oid":"…"}`}, dates as {`{"$date":"2026-01-01T00:00:00Z"}`}. Saving replaces the whole document.</p>
          <Textarea className="font-mono text-xs h-80" value={editor?.text ?? ""} onChange={(e) => setEditor((x) => x && { ...x, text: e.target.value })} />
          <Button disabled={busy} onClick={() => editor && post(editor.id ? { op: "replace", id: pretty(editor.id), doc: editor.text } : { op: "insert", doc: editor.text })}>
            {busy ? "Saving…" : "Save"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
