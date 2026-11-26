"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Undo2 } from "lucide-react";

const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

async function api(method: "GET" | "POST", qs: string, body?: unknown) {
  const res = await apiFetch(`/api/account-deletions${qs}`, { method, headers: { "Content-Type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body) });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(j.error ?? "Request failed");
  return j;
}

// Danger zone shown inside an account's Manage dialog. `onDone` runs after a delete/schedule so the list refreshes.
export function DeleteAccount({ product, id, name, onDone }: { product: string; id: string; name: string; onDone: () => void }) {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"soft" | "hard">("soft");
  const [pv, setPv] = useState<any>(null);
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  useEffect(() => { api("GET", `?product=${product}`).then((j) => setEnabled(!!j.enabled)).catch(() => {}); }, [product]);

  async function openDialog() {
    setOpen(true); setErr(null); setOk(null); setPv(null); setConfirm(""); setMode("soft");
    try { setPv((await api("GET", `?product=${product}&id=${id}`)).preview); } catch (e: any) { setErr(e.message); }
  }
  async function go() {
    setBusy(true); setErr(null);
    try {
      const r = await api("POST", "", { action: mode, product, id, confirm });
      setOk(mode === "soft" ? `Account suspended. It will be deleted automatically on ${fmt(r.purgeAt)}. You can restore it until then.` : "Account and all its data were deleted.");
      onDone();
    } catch (e: any) { setErr(e.message); }
    finally { setBusy(false); }
  }

  if (!enabled) return null;
  return (
    <div className="border-2 border-red-500 p-3 space-y-2">
      <p className="text-xs font-black uppercase tracking-widest text-red-600">Danger zone</p>
      <p className="text-xs text-muted-foreground">Delete this account together with all its logins, employees and records.</p>
      <Button size="sm" variant="outline" className="border-2 border-red-500 text-red-600 font-bold" onClick={openDialog}><Trash2 className="w-4 h-4 mr-1" /> Delete account…</Button>
      <Dialog open={open} onOpenChange={(v) => !v && !busy && setOpen(false)}>
        <DialogContent className="border-2 border-black max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-black">Delete {name}</DialogTitle></DialogHeader>
          {ok ? (
            <div className="space-y-3"><p className="text-sm font-bold text-green-700">{ok}</p><Button size="sm" onClick={() => setOpen(false)}>Close</Button></div>
          ) : (
            <div className="space-y-3">
              {!pv && !err && <p className="text-sm">Counting what will be removed…</p>}
              {pv && (
                <div className="border-2 border-black p-3 text-sm space-y-1 bg-muted/30">
                  <p><b>{pv.logins}</b> logins · <b>{pv.employees}</b> employees</p>
                  <p className="text-xs text-muted-foreground">{pv.counts.map((c: any) => `${c.collection}: ${c.count}`).join(" · ") || "No other records"}</p>
                </div>
              )}
              <label className="flex gap-2 items-start text-sm cursor-pointer"><input type="radio" checked={mode === "soft"} onChange={() => setMode("soft")} className="mt-1" />
                <span><b>Delete after 30 days</b> (recommended). The account and every login are suspended right away; all data is deleted automatically on day 30. Restore any time before that.</span></label>
              <label className="flex gap-2 items-start text-sm cursor-pointer"><input type="radio" checked={mode === "hard"} onChange={() => setMode("hard")} className="mt-1" />
                <span className="text-red-700"><b>Delete permanently now.</b> Everything is erased immediately and cannot be recovered.</span></label>
              <div>
                <p className="text-xs font-bold mb-1">Type the account name <b>{name}</b> to confirm</p>
                <Input className="border-2 border-black" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="off" />
              </div>
              {err && <p className="text-sm font-bold text-red-600 break-all">{err}</p>}
              <div className="flex gap-2">
                <Button size="sm" disabled={busy || !pv || confirm.trim() !== name.trim()} className={`font-bold border-2 border-black ${mode === "hard" ? "bg-red-600 hover:bg-red-700 text-white" : ""}`} onClick={go}>
                  {busy ? "Working…" : mode === "hard" ? "Delete permanently" : "Schedule deletion (30 days)"}
                </Button>
                <Button size="sm" variant="outline" className="border-2 border-black" disabled={busy} onClick={() => setOpen(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Accounts waiting for their 30-day purge, with Restore and Delete-now.
export function ScheduledDeletions({ product, refreshKey, onChanged }: { product: string; refreshKey: number; onChanged: () => void }) {
  const [rows, setRows] = useState<any[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const load = useCallback(() => api("GET", `?product=${product}`).then((j) => setRows(j.scheduled ?? [])).catch(() => {}), [product]);
  useEffect(() => { load(); }, [load, refreshKey]);

  async function act(action: "restore" | "hard", r: any) {
    if (action === "hard" && prompt(`Permanently delete "${r.name}" now? Type its name to confirm:`)?.trim() !== r.name.trim()) return;
    setBusy(true); setMsg(null);
    try { await api("POST", "", { action, product, id: r.id, confirm: r.name }); await load(); onChanged(); }
    catch (e: any) { setMsg(e.message); }
    finally { setBusy(false); }
  }

  if (!rows.length) return null;
  return (
    <div className="border-2 border-red-500 p-4 space-y-2">
      <p className="text-xs font-black uppercase tracking-widest text-red-600">Scheduled for deletion ({rows.length})</p>
      {msg && <p className="text-sm font-bold text-red-600">{msg}</p>}
      {rows.map((r) => (
        <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 text-sm border-t border-black/10 pt-2">
          <div><p className="font-bold">{r.name}</p><p className="text-xs text-muted-foreground">{r.email} · deletes on {fmt(r.purgeAt)}</p></div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled={busy} className="border-2 border-black font-bold" onClick={() => act("restore", r)}><Undo2 className="w-4 h-4 mr-1" /> Restore</Button>
            <Button size="sm" variant="outline" disabled={busy} className="border-2 border-red-500 text-red-600 font-bold" onClick={() => act("hard", r)}><Trash2 className="w-4 h-4 mr-1" /> Delete now</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
