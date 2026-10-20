"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserPlus, Copy } from "lucide-react";

const EMPTY = {
  companyName: "",
  adminName: "",
  email: "",
  phone: "",
  password: "",
  maxEmployees: "2000",
  months: "1",
  amountPaid: "0",
  gstNumber: "",
  industry: "",
};

export function CreateNestHrAccount({ onCreated }: { onCreated?: () => void }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ email: string; password: string; renewalDate: string } | null>(null);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF({ ...f, [k]: e.target.value });

  function close(v: boolean) {
    setOpen(v);
    if (!v) { setF(EMPTY); setDone(null); setError(null); }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await apiFetch("/api/hrms-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...f,
          maxEmployees: Number(f.maxEmployees),
          months: Number(f.months),
          amountPaid: Number(f.amountPaid),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Failed to create account");
      setDone(data.data);
      onCreated?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const field = (k: keyof typeof EMPTY, label: string, props: React.ComponentProps<typeof Input> = {}) => (
    <div className="space-y-1">
      <Label className="font-bold text-xs">{label}</Label>
      <Input value={f[k]} onChange={set(k)} className="border-2 border-black" {...props} />
    </div>
  );

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)} className="border-2 border-black font-bold">
        <UserPlus className="w-4 h-4 mr-1" /> Create account
      </Button>
      <Dialog open={open} onOpenChange={close}>
        <DialogContent className="border-2 border-black max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-black">Create NestHR account</DialogTitle>
          </DialogHeader>
          {done ? (
            <div className="space-y-3">
              <p className="text-sm font-bold text-green-700">Account created and activated.</p>
              <div className="border-2 border-black p-3 text-sm space-y-1 bg-muted/30">
                <p>Login: <b>{done.email}</b></p>
                <p>Password: <b>{done.password}</b></p>
                <p>Plan valid till: <b>{new Date(done.renewalDate).toLocaleDateString("en-IN")}</b></p>
              </div>
              <p className="text-xs text-muted-foreground">Copy the password now; it is not shown again.</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-2 border-black font-bold"
                  onClick={() => navigator.clipboard?.writeText(`NestHR login: ${done.email}\nPassword: ${done.password}`)}>
                  <Copy className="w-4 h-4 mr-1" /> Copy login
                </Button>
                <Button size="sm" onClick={() => close(false)}>Done</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              {field("companyName", "Company name *", { required: true })}
              <div className="grid grid-cols-2 gap-3">
                {field("adminName", "Admin name *", { required: true })}
                {field("phone", "Phone *", { required: true })}
              </div>
              {field("email", "Login email *", { type: "email", required: true })}
              {field("password", "Password (blank = auto-generate)", { type: "text", autoComplete: "off" })}
              <div className="grid grid-cols-3 gap-3">
                {field("maxEmployees", "Employee limit *", { type: "number", min: 1, required: true })}
                {field("months", "Months of access", { type: "number", min: 1, max: 36 })}
                {field("amountPaid", "Amount paid (₹)", { type: "number", min: 0 })}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {field("gstNumber", "GST number")}
                {field("industry", "Industry")}
              </div>
              <p className="text-xs text-muted-foreground">
                Creates the login, company and an active plan. No invoice is generated; bill separately once payment is confirmed.
              </p>
              {error && <p className="text-sm font-bold text-red-600">{error}</p>}
              <Button type="submit" disabled={busy} className="w-full border-2 border-black font-bold">
                {busy ? "Creating…" : "Create account"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
