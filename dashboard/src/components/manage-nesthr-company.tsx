"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Settings2, Trash2, KeyRound } from "lucide-react";

const api = async (path: string, method = "GET", body?: unknown) => {
  const res = await apiFetch(`/api/hrms-manage/${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok || data.success === false) throw new Error(data.error ?? "Request failed");
  return data;
};
const day = (d?: string) => (d ? new Date(d).toISOString().slice(0, 10) : "");
const sel = "border-2 border-black h-9 px-2 text-sm bg-white w-full";
const ROLES = ["super_admin", "hr_manager", "department_head", "employee"];
const NEW_USER = { name: "", email: "", role: "hr_manager", password: "" };

function Heading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-black text-sm uppercase tracking-wider border-b-2 border-black pb-1 mt-2">{children}</h3>;
}

function Field({ obj, set, k, label, ...props }: { obj: any; set: (v: any) => void; k: string; label: string } & Record<string, any>) {
  return (
    <div className="space-y-1">
      <Label className="font-bold text-xs">{label}</Label>
      <Input className="border-2 border-black" value={obj[k] ?? ""} onChange={(e) => set({ ...obj, [k]: e.target.value })} {...props} />
    </div>
  );
}

export function ManageNestHrCompany({ companyId, name, onChanged }: { companyId: string; name: string; onChanged?: () => void }) {
  const [open, setOpen] = useState(false);
  const [d, setD] = useState<any>(null);
  const [co, setCo] = useState<any>({});
  const [sub, setSub] = useState<any>({});
  const [nu, setNu] = useState(NEW_USER);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    const r = await api(`companies/${companyId}`);
    setD(r);
    setCo(r.company);
    const s = r.subscription ?? {};
    setSub({ ...s, customFeatures: (s.customFeatures ?? []).join("\n"), startDate: day(s.startDate), renewalDate: day(s.renewalDate), trialEndDate: day(s.trialEndDate) });
  }
  useEffect(() => {
    if (open) load().catch((e) => setMsg({ ok: false, text: e.message }));
  }, [open]);

  async function run(label: string, fn: () => Promise<any>) {
    setBusy(true);
    setMsg(null);
    try {
      const r = await fn();
      setMsg({ ok: true, text: r?.password ? `${label}. Password: ${r.password}` : `${label}.` });
      await load();
      onChanged?.();
    } catch (e: any) {
      setMsg({ ok: false, text: e.message });
    } finally {
      setBusy(false);
    }
  }
  const pick = (k: string, label: string, options: string[], labels?: string[]) => (
    <div className="space-y-1">
      <Label className="font-bold text-xs">{label}</Label>
      <select className={sel} value={sub[k] ?? options[0]} onChange={(e) => setSub({ ...sub, [k]: e.target.value })}>
        {options.map((x, i) => <option key={x} value={x}>{labels?.[i] ?? x}</option>)}
      </select>
    </div>
  );

  return (
    <>
      <Button size="sm" variant="outline" className="border-2 border-black font-bold" onClick={() => setOpen(true)}>
        <Settings2 className="w-4 h-4 mr-1" /> Manage
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-2 border-black max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-black">{name}</DialogTitle></DialogHeader>
          {msg && <p className={`text-sm font-bold break-all ${msg.ok ? "text-green-700" : "text-red-600"}`}>{msg.text}</p>}
          {!d ? <p className="text-sm">Loading…</p> : (
            <div className="space-y-4">
              <Heading>Company</Heading>
              <div className="grid grid-cols-2 gap-3">
                <Field obj={co} set={setCo} k="name" label="Name" />
                <Field obj={co} set={setCo} k="phone" label="Phone" />
                <Field obj={co} set={setCo} k="gstNumber" label="GST" />
                <Field obj={co} set={setCo} k="industry" label="Industry" />
                <div className="space-y-1">
                  <Label className="font-bold text-xs">Status (inactive blocks all logins)</Label>
                  <select className={sel} value={co.status} onChange={(e) => setCo({ ...co, status: e.target.value })}>
                    <option value="active">active</option><option value="trial">trial</option><option value="inactive">inactive</option>
                  </select>
                </div>
              </div>
              <Button size="sm" disabled={busy} className="border-2 border-black font-bold"
                onClick={() => run("Company saved", () => api(`companies/${companyId}`, "PATCH", { name: co.name, phone: co.phone, gstNumber: co.gstNumber, industry: co.industry, status: co.status }))}>
                Save company
              </Button>

              <Heading>Subscription · {d.activeEmployees} active employees</Heading>
              <div className="grid grid-cols-3 gap-3">
                <Field obj={sub} set={setSub} k="plan" label="Plan name (internal)" />
                <Field obj={sub} set={setSub} k="maxEmployees" label="Employee limit" type="number" />
                <Field obj={sub} set={setSub} k="amountPaid" label="Amount paid ₹" type="number" />
                <Field obj={sub} set={setSub} k="startDate" label="Start" type="date" />
                <Field obj={sub} set={setSub} k="renewalDate" label="Valid till" type="date" />
                {pick("status", "Status", ["active", "inactive", "cancelled", "pending_renewal"])}
                {pick("paymentStatus", "Payment", ["pending", "completed", "failed"])}
                {pick("tier", "WhatsApp", ["web_mobile_whatsapp", "web_mobile"], ["included", "not included"])}
                <label className="flex items-end gap-2 text-sm font-bold pb-2">
                  <input type="checkbox" checked={!!sub.isTrial} onChange={(e) => setSub({ ...sub, isTrial: e.target.checked })} /> Trial
                </label>
              </div>
              <Field obj={sub} set={setSub} k="customPlanName" label="Custom plan name shown to customer (blank = default)" />
              <div className="space-y-1">
                <Label className="font-bold text-xs">Custom features on billing page (one per line; blank = default list)</Label>
                <Textarea className="border-2 border-black" rows={5} value={sub.customFeatures ?? ""} onChange={(e) => setSub({ ...sub, customFeatures: e.target.value })} />
              </div>
              <Button size="sm" disabled={busy} className="border-2 border-black font-bold"
                onClick={() => run("Subscription saved", () => api(`companies/${companyId}/subscription`, "PUT", { ...sub, isTrial: !!sub.isTrial, trialEndDate: sub.isTrial ? sub.trialEndDate || sub.renewalDate : undefined }))}>
                Save subscription
              </Button>

              <Heading>Users ({d.users.length})</Heading>
              <div className="space-y-2">
                {d.users.map((u: any) => (
                  <div key={u._id} className="border-2 border-black p-2 grid grid-cols-12 gap-2 items-center text-sm">
                    <div className="col-span-5"><p className="font-bold truncate">{u.name}</p><p className="text-xs text-muted-foreground truncate">{u.email}</p></div>
                    <select className={`${sel} col-span-3`} value={u.role} onChange={(e) => run("Role updated", () => api(`users/${u._id}`, "PATCH", { role: e.target.value }))}>
                      {ROLES.map((r) => <option key={r}>{r}</option>)}
                    </select>
                    <Button size="sm" variant="outline" className="col-span-1 border-2 border-black text-xs px-1" disabled={busy}
                      onClick={() => run(u.status === "active" ? "User deactivated" : "User activated", () => api(`users/${u._id}`, "PATCH", { status: u.status === "active" ? "inactive" : "active" }))}>
                      {u.status === "active" ? "On" : "Off"}
                    </Button>
                    <Button size="sm" variant="outline" className="col-span-1 border-2 border-black px-1" title="Reset password" disabled={busy}
                      onClick={() => { const pw = prompt(`New password for ${u.email} (8+ chars, upper, lower, number):`); if (pw) run("Password reset", () => api(`users/${u._id}`, "PATCH", { password: pw })); }}>
                      <KeyRound className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="col-span-1 border-2 border-red-500 text-red-600 px-1" title="Delete user" disabled={busy}
                      onClick={() => { if (confirm(`Delete login ${u.email}? This cannot be undone.`)) run("User deleted", () => api(`users/${u._id}`, "DELETE")); }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-3"><Field obj={nu} set={setNu} k="name" label="Name" /></div>
                <div className="col-span-4"><Field obj={nu} set={setNu} k="email" label="Email" /></div>
                <div className="col-span-3 space-y-1">
                  <Label className="font-bold text-xs">Role</Label>
                  <select className={sel} value={nu.role} onChange={(e) => setNu({ ...nu, role: e.target.value })}>{ROLES.map((r) => <option key={r}>{r}</option>)}</select>
                </div>
                <Button size="sm" className="col-span-2 border-2 border-black font-bold" disabled={busy}
                  onClick={() => run("User added", async () => { const r = await api(`companies/${companyId}/users`, "POST", nu); setNu(NEW_USER); return r; })}>
                  Add user
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Delete removes the login only; the employee record and payroll history stay. The company owner cannot be deleted.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
