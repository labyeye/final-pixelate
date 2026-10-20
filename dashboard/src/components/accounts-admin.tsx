"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Copy, KeyRound, Plus, RefreshCw, Search, Settings2, Trash2 } from "lucide-react";

// Uniform account control for every product (list, create, edit, subscription, users). The form fields come from the
// `meta` each backend returns (utils/crmAdapter.js), so one screen serves Nest HR, Leads, Play, Gym and Care.

const sel = "border-2 border-black h-9 px-2 text-sm bg-white w-full";
const fmtDate = (d?: string) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—");
const dayInput = (d?: string) => (d ? new Date(d).toISOString().slice(0, 10) : "");

function Heading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-black text-sm uppercase tracking-wider border-b-2 border-black pb-1 mt-2">{children}</h3>;
}
function Field({ label, value, onChange, ...p }: { label: string; value: any; onChange: (v: string) => void } & Record<string, any>) {
  return (
    <div className="space-y-1">
      <Label className="font-bold text-xs">{label}</Label>
      <Input className="border-2 border-black" value={value ?? ""} onChange={(e) => onChange(e.target.value)} {...p} />
    </div>
  );
}
function Select({ label, value, options, onChange, labels }: { label: string; value: any; options: string[]; onChange: (v: string) => void; labels?: string[] }) {
  return (
    <div className="space-y-1">
      <Label className="font-bold text-xs">{label}</Label>
      <select className={sel} value={value ?? options[0]} onChange={(e) => onChange(e.target.value)}>
        {options.map((o, i) => <option key={o} value={o}>{labels?.[i] ?? o}</option>)}
      </select>
    </div>
  );
}
function statusBadge(s?: string) {
  const good = s === "active";
  const mid = s === "trial" || s === "trialing";
  return <Badge className={`font-bold ${good ? "bg-green-100 text-green-700 border-green-300" : mid ? "bg-yellow-100 text-yellow-700 border-yellow-300" : "bg-red-100 text-red-700 border-red-300"}`}>{(s ?? "—").toUpperCase()}</Badge>;
}

export function AccountsAdmin({ product, title }: { product: string; title: string }) {
  const base = `/api/product-accounts/${product}`;
  const call = useCallback(async (path: string, method = "GET", body?: unknown) => {
    const res = await apiFetch(`${base}${path}`, { method, headers: { "Content-Type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body) });
    const j = await res.json().catch(() => ({}));
    if (!res.ok || j.success === false) throw new Error(j.error ?? j.message ?? "Request failed");
    return j;
  }, [base]);

  const [meta, setMeta] = useState<any>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [manageId, setManageId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const j = await call(`?search=${encodeURIComponent(search)}`);
      setMeta(j.meta);
      setAccounts(j.accounts);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [call, search]);
  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t); }, [load]);

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3"><Building2 className="w-8 h-8" /><h1 className="text-4xl font-black tracking-tighter">{title.toUpperCase()} · ACCOUNTS</h1></div>
          <p className="text-sm text-muted-foreground font-bold mt-1">Create accounts, change plans and limits, manage logins. Changes apply immediately.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-2 border-black font-bold" onClick={load}><RefreshCw className="w-4 h-4 mr-1" /> Refresh</Button>
          <Button size="sm" className="border-2 border-black font-bold" disabled={!meta} onClick={() => setCreateOpen(true)}><Plus className="w-4 h-4 mr-1" /> Create account</Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
        <Input className="pl-9 border-2 border-black" placeholder="Search name or email" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {error && <div className="border-2 border-red-400 bg-red-50 p-4 text-sm font-bold text-red-700">{error}</div>}

      <div className="border-2 border-black overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {["Account", "Status", "Plan", "Valid till", "Usage", "Last login", ""].map((h) => <TableHead key={h} className="font-black text-xs uppercase tracking-widest">{h}</TableHead>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((a) => (
              <TableRow key={a.id} className="border-b border-black/10">
                <TableCell><p className="font-bold">{a.name}</p><p className="text-xs text-muted-foreground">{a.email}{a.phone ? ` · ${a.phone}` : ""}</p></TableCell>
                <TableCell>{statusBadge(a.status)}</TableCell>
                <TableCell className="font-bold">{a.plan ?? "—"}</TableCell>
                <TableCell>{fmtDate(a.validTill)}</TableCell>
                <TableCell className="text-sm">{a.usage}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{fmtDate(a.lastLogin)}</TableCell>
                <TableCell><Button size="sm" variant="outline" className="border-2 border-black font-bold" onClick={() => setManageId(a.id)}><Settings2 className="w-4 h-4 mr-1" /> Manage</Button></TableCell>
              </TableRow>
            ))}
            {!loading && accounts.length === 0 && <TableRow><TableCell colSpan={7} className="text-center py-10 text-muted-foreground font-semibold">No accounts found</TableCell></TableRow>}
            {loading && accounts.length === 0 && <TableRow><TableCell colSpan={7} className="text-center py-10">Loading…</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      {meta && <CreateDialog open={createOpen} onClose={() => setCreateOpen(false)} meta={meta} call={call} onDone={load} />}
      {manageId && <ManageDialog id={manageId} call={call} onClose={() => setManageId(null)} onChanged={load} />}
    </div>
  );
}

function CreateDialog({ open, onClose, meta, call, onDone }: { open: boolean; onClose: () => void; meta: any; call: any; onDone: () => void }) {
  const empty = () => ({
    name: "", adminName: "", email: "", phone: "", password: "", months: "1", amountPaid: "0",
    plan: meta.planOptions ? meta.planOptions[0] : "", limits: { ...meta.createLimitDefaults } as Record<string, any>,
    flags: Object.fromEntries((meta.flagFields ?? []).map((f: any) => [f.key, true])) as Record<string, boolean>,
    extra: Object.fromEntries((meta.createExtraFields ?? []).map((f: any) => [f.key, f.options ? f.options[0] : ""])) as Record<string, string>,
  });
  const [f, setF] = useState<any>(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<any>(null);

  function close() { setF(empty()); setDone(null); setError(null); onClose(); }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      const body = { ...f, months: Number(f.months), amountPaid: Number(f.amountPaid), limits: Object.fromEntries(Object.entries(f.limits).map(([k, v]) => [k, Number(v)])) };
      setDone(await call("", "POST", body));
      onDone();
    } catch (err: any) { setError(err.message); }
    finally { setBusy(false); }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && close()}>
      <DialogContent className="border-2 border-black max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="font-black">Create {meta.accountLabel} account</DialogTitle></DialogHeader>
        {done ? (
          <div className="space-y-3">
            <p className="text-sm font-bold text-green-700">Account created and activated.</p>
            <div className="border-2 border-black p-3 text-sm space-y-1 bg-muted/30">
              <p>Login: <b>{done.email}</b></p><p>Password: <b>{done.password}</b></p><p>Valid till: <b>{fmtDate(done.validTill)}</b></p>
            </div>
            <p className="text-xs text-muted-foreground">Copy the password now; it is not shown again.</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-2 border-black font-bold" onClick={() => navigator.clipboard?.writeText(`Login: ${done.email}\nPassword: ${done.password}`)}><Copy className="w-4 h-4 mr-1" /> Copy login</Button>
              <Button size="sm" onClick={close}>Done</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <Field label={`${meta.accountLabel} name *`} value={f.name} onChange={(v) => setF({ ...f, name: v })} required />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Admin name *" value={f.adminName} onChange={(v) => setF({ ...f, adminName: v })} required />
              <Field label="Phone *" value={f.phone} onChange={(v) => setF({ ...f, phone: v })} required />
            </div>
            <Field label="Login email *" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} required />
            <Field label="Password (blank = auto-generate)" value={f.password} onChange={(v) => setF({ ...f, password: v })} autoComplete="off" />
            {meta.planOptions && <Select label="Plan" value={f.plan} options={meta.planOptions} onChange={(v) => setF({ ...f, plan: v })} />}
            {!meta.planOptions && <Field label="Plan name" value={f.plan} onChange={(v) => setF({ ...f, plan: v })} placeholder="e.g. NestHR 2000" />}
            <div className="grid grid-cols-3 gap-3">
              {meta.limitFields.map((l: any) => <Field key={l.key} label={l.label} type="number" min={0} value={f.limits[l.key]} onChange={(v) => setF({ ...f, limits: { ...f.limits, [l.key]: v } })} />)}
              <Field label="Months of access" type="number" min={1} max={36} value={f.months} onChange={(v) => setF({ ...f, months: v })} />
              {meta.paymentStatusOptions && <Field label="Amount paid ₹" type="number" min={0} value={f.amountPaid} onChange={(v) => setF({ ...f, amountPaid: v })} />}
            </div>
            {(meta.flagFields ?? []).map((fl: any) => (
              <label key={fl.key} className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={!!f.flags[fl.key]} onChange={(e) => setF({ ...f, flags: { ...f.flags, [fl.key]: e.target.checked } })} /> {fl.label}</label>
            ))}
            {(meta.createExtraFields ?? []).map((x: any) => x.options
              ? <Select key={x.key} label={x.label} value={f.extra[x.key]} options={x.options} onChange={(v) => setF({ ...f, extra: { ...f.extra, [x.key]: v } })} />
              : <Field key={x.key} label={x.label} value={f.extra[x.key]} onChange={(v) => setF({ ...f, extra: { ...f.extra, [x.key]: v } })} />)}
            <p className="text-xs text-muted-foreground">Creates the owner login and an active plan. No invoice is generated; bill separately once payment is confirmed.</p>
            {error && <p className="text-sm font-bold text-red-600">{error}</p>}
            <Button type="submit" disabled={busy} className="w-full border-2 border-black font-bold">{busy ? "Creating…" : "Create account"}</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ManageDialog({ id, call, onClose, onChanged }: { id: string; call: any; onClose: () => void; onChanged: () => void }) {
  const [d, setD] = useState<any>(null);
  const [acc, setAcc] = useState<any>({});
  const [sub, setSub] = useState<any>({});
  const [nu, setNu] = useState<any>({ name: "", email: "", role: "", password: "" });
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const j = await call(`/${id}`);
    setD(j);
    setAcc(j.account);
    const s = j.subscription ?? {};
    setSub({ ...s, startDate: dayInput(s.startDate), validTill: dayInput(s.validTill), customFeatures: (s.customFeatures ?? []).join("\n"), limits: { ...(s.limits ?? {}) }, flags: { ...(s.flags ?? {}) } });
    setNu((n: any) => ({ ...n, role: n.role || j.meta.defaultRole }));
  }, [call, id]);
  useEffect(() => { load().catch((e) => setMsg({ ok: false, text: e.message })); }, [load]);

  async function run(label: string, fn: () => Promise<any>) {
    setBusy(true); setMsg(null);
    try {
      const r = await fn();
      setMsg({ ok: true, text: r?.password ? `${label}. Password: ${r.password}` : `${label}.` });
      await load();
      onChanged();
    } catch (e: any) { setMsg({ ok: false, text: e.message }); }
    finally { setBusy(false); }
  }
  const m = d?.meta;

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="border-2 border-black max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="font-black">{acc.name ?? "Account"}</DialogTitle></DialogHeader>
        {msg && <p className={`text-sm font-bold break-all ${msg.ok ? "text-green-700" : "text-red-600"}`}>{msg.text}</p>}
        {!d ? <p className="text-sm">Loading…</p> : (
          <div className="space-y-4">
            <Heading>{m.accountLabel}</Heading>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name" value={acc.name} onChange={(v) => setAcc({ ...acc, name: v })} />
              <Field label="Owner phone" value={acc.phone} onChange={(v) => setAcc({ ...acc, phone: v })} />
              {(m.accountExtraFields ?? []).map((x: any) => <Field key={x.key} label={x.label} value={acc[x.key]} onChange={(v) => setAcc({ ...acc, [x.key]: v })} />)}
              <Select label={`Status (${m.accountStatusHint})`} value={acc.status} options={m.accountStatusOptions} onChange={(v) => setAcc({ ...acc, status: v })} />
            </div>
            <p className="text-xs text-muted-foreground">Owner login: {acc.email}</p>
            <Button size="sm" disabled={busy} className="border-2 border-black font-bold"
              onClick={() => run("Saved", () => call(`/${id}`, "PATCH", { name: acc.name, phone: acc.phone, status: acc.status, extra: Object.fromEntries((m.accountExtraFields ?? []).map((x: any) => [x.key, acc[x.key]])) }))}>Save {m.accountLabel.toLowerCase()}</Button>

            <Heading>Subscription</Heading>
            <div className="grid grid-cols-3 gap-3">
              {m.planOptions
                ? <Select label="Plan" value={sub.plan} options={m.planOptions} onChange={(v) => setSub({ ...sub, plan: v })} />
                : <Field label="Plan name (internal)" value={sub.plan} onChange={(v) => setSub({ ...sub, plan: v })} />}
              {m.limitFields.map((l: any) => <Field key={l.key} label={l.label} type="number" min={0} value={sub.limits?.[l.key]} onChange={(v) => setSub({ ...sub, limits: { ...sub.limits, [l.key]: v } })} />)}
              {m.subscriptionStatusOptions && <Field label="Start" type="date" value={sub.startDate} onChange={(v) => setSub({ ...sub, startDate: v })} />}
              <Field label="Valid till" type="date" value={sub.validTill} onChange={(v) => setSub({ ...sub, validTill: v })} />
              {m.subscriptionStatusOptions && <Select label="Subscription status" value={sub.status} options={m.subscriptionStatusOptions} onChange={(v) => setSub({ ...sub, status: v })} />}
              {m.paymentStatusOptions && <Select label="Payment" value={sub.paymentStatus} options={m.paymentStatusOptions} onChange={(v) => setSub({ ...sub, paymentStatus: v })} />}
              {m.paymentStatusOptions && <Field label="Amount paid ₹" type="number" min={0} value={sub.amountPaid} onChange={(v) => setSub({ ...sub, amountPaid: v })} />}
              {(m.flagFields ?? []).map((fl: any) => <label key={fl.key} className="flex items-end gap-2 text-sm font-bold pb-2"><input type="checkbox" checked={!!sub.flags?.[fl.key]} onChange={(e) => setSub({ ...sub, flags: { ...sub.flags, [fl.key]: e.target.checked } })} /> {fl.label}</label>)}
              {m.subscriptionStatusOptions && <label className="flex items-end gap-2 text-sm font-bold pb-2"><input type="checkbox" checked={!!sub.isTrial} onChange={(e) => setSub({ ...sub, isTrial: e.target.checked })} /> Trial</label>}
            </div>
            <Field label="Custom plan name shown to customer (blank = default)" value={sub.customPlanName} onChange={(v) => setSub({ ...sub, customPlanName: v })} />
            <div className="space-y-1">
              <Label className="font-bold text-xs">Custom features on the customer's billing page (one per line; blank = default list)</Label>
              <Textarea className="border-2 border-black" rows={5} value={sub.customFeatures ?? ""} onChange={(e) => setSub({ ...sub, customFeatures: e.target.value })} />
            </div>
            <Button size="sm" disabled={busy} className="border-2 border-black font-bold"
              onClick={() => run("Subscription saved", () => call(`/${id}/subscription`, "PUT", { ...sub, limits: Object.fromEntries(Object.entries(sub.limits ?? {}).map(([k, v]) => [k, Number(v)])) }))}>Save subscription</Button>

            <Heading>Logins ({d.users.length})</Heading>
            <div className="space-y-2">
              {d.users.map((u: any) => (
                <div key={u.id} className="border-2 border-black p-2 grid grid-cols-12 gap-2 items-center text-sm">
                  <div className="col-span-5"><p className="font-bold truncate">{u.name}{u.isOwner ? " · owner" : ""}</p><p className="text-xs text-muted-foreground truncate">{u.email}</p></div>
                  <select className={`${sel} col-span-3`} value={u.role} onChange={(e) => run("Role updated", () => call(`/users/${u.id}`, "PATCH", { role: e.target.value }))}>
                    {m.roleOptions.map((r: string) => <option key={r}>{r}</option>)}
                  </select>
                  <Button size="sm" variant="outline" className="col-span-1 border-2 border-black text-xs px-1" disabled={busy} title="Turn login on/off"
                    onClick={() => run(u.status === "active" ? "Login turned off" : "Login turned on", () => call(`/users/${u.id}`, "PATCH", { status: u.status === "active" ? "inactive" : "active" }))}>{u.status === "active" ? "On" : "Off"}</Button>
                  <Button size="sm" variant="outline" className="col-span-1 border-2 border-black px-1" title="Reset password" disabled={busy}
                    onClick={() => { const pw = prompt(`New password for ${u.email} (8+ chars, upper, lower, number):`); if (pw) run("Password reset", () => call(`/users/${u.id}`, "PATCH", { password: pw })); }}><KeyRound className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline" className="col-span-1 border-2 border-red-500 text-red-600 px-1" title="Delete login" disabled={busy || u.isOwner}
                    onClick={() => { if (confirm(`Delete login ${u.email}? This cannot be undone.`)) run("Login deleted", () => call(`/users/${u.id}`, "DELETE")); }}><Trash2 className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-3"><Field label="Name" value={nu.name} onChange={(v) => setNu({ ...nu, name: v })} /></div>
              <div className="col-span-4"><Field label="Email" value={nu.email} onChange={(v) => setNu({ ...nu, email: v })} /></div>
              <div className="col-span-3"><Select label="Role" value={nu.role} options={m.roleOptions} onChange={(v) => setNu({ ...nu, role: v })} /></div>
              <Button size="sm" className="col-span-2 border-2 border-black font-bold" disabled={busy}
                onClick={() => run("Login added", async () => { const r = await call(`/${id}/users`, "POST", nu); setNu({ name: "", email: "", role: m.defaultRole, password: "" }); return r; })}>Add login</Button>
            </div>
            <p className="text-xs text-muted-foreground">Delete removes the login only; business records (employees, members, payroll…) stay. The owner login cannot be deleted; set the account to inactive / suspended instead.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
