"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TYPES: Record<string, { label: string; cls: string }> = {
  login: { label: "Signed in", cls: "bg-green-200" },
  login_failed: { label: "Failed", cls: "bg-amber-200" },
  account_locked: { label: "Locked", cls: "bg-red-300" },
  account_unlocked: { label: "Unlocked", cls: "bg-blue-200" },
  password_reset: { label: "Password reset", cls: "bg-blue-200" },
  session_revoked: { label: "Signed out", cls: "bg-gray-200" },
  "2fa_enabled": { label: "2FA on", cls: "bg-green-200" },
  "2fa_disabled": { label: "2FA off", cls: "bg-red-300" },
  passkey_added: { label: "Passkey added", cls: "bg-green-200" },
  passkey_removed: { label: "Passkey removed", cls: "bg-red-300" },
};

export default function LoginAuditPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("auth_token");
    const qs = new URLSearchParams({ ...(type ? { type } : {}), ...(email ? { email } : {}) }).toString();
    apiFetch(`/api/auth/audit?${qs}`, { headers: t ? { Authorization: `Bearer ${t}` } : {} })
      .then(async (r) => (r.ok ? r.json() : Promise.reject((await r.json()).error)))
      .then((d) => { setRows(d.events); setErr(""); })
      .catch((e) => setErr(String(e)));
  }, [type, email]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Sign-in audit</h1>
        <p className="text-sm text-muted-foreground">Logins, failures, locks, resets and security changes. Latest 200.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <select value={type} onChange={(e) => setType(e.target.value)} className="h-10 border-2 border-black bg-background px-3 text-sm font-medium">
          <option value="">All events</option>
          {Object.entries(TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Filter by email" className="max-w-[260px]" />
      </div>
      {err && <p className="text-sm font-bold text-red-600">{err}</p>}
      <div className="border-2 border-black overflow-x-auto">
        <Table>
          <TableHeader><TableRow><TableHead>When</TableHead><TableHead>Event</TableHead><TableHead>Account</TableHead><TableHead>Details</TableHead><TableHead>IP</TableHead><TableHead>Device</TableHead></TableRow></TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="whitespace-nowrap">{new Date(r.at).toLocaleString("en-IN")}</TableCell>
                <TableCell><span className={`inline-block border-2 border-black px-2 py-0.5 text-[11px] font-bold ${TYPES[r.type]?.cls || ""}`}>{TYPES[r.type]?.label || r.type}</span></TableCell>
                <TableCell>{r.email}</TableCell>
                <TableCell>{r.message}</TableCell>
                <TableCell className="font-mono">{r.ip || "-"}</TableCell>
                <TableCell className="max-w-[240px] truncate" title={r.ua}>{r.ua || "-"}</TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && !err && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">No events yet.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
