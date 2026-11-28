"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ShieldOff, KeyRound, Copy } from "lucide-react";
import { apiFetch } from "@/lib/api-fetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const authHeaders = (): Record<string, string> => {
  const t = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  return { "Content-Type": "application/json", ...(t ? { Authorization: `Bearer ${t}` } : {}) };
};

export default function AccountSecurityPage() {
  const { toast } = useToast();
  const [st, setSt] = useState<{ totpEnabled: boolean; backupCodesLeft: number } | null>(null);
  const [setup, setSetup] = useState<{ secret: string; qr: string } | null>(null);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [codes, setCodes] = useState<string[] | null>(null);
  const [busy, setBusy] = useState(false);

  const load = () => apiFetch("/api/auth/security", { headers: authHeaders() }).then((r) => r.json()).then(setSt).catch(() => {});
  useEffect(() => { load(); }, []);

  async function call(body: any, ok?: (d: any) => void) {
    setBusy(true);
    try {
      const r = await apiFetch("/api/auth/security", { method: "POST", headers: authHeaders(), body: JSON.stringify(body) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Failed");
      ok?.(d);
      await load();
    } catch (e: any) {
      toast({ title: "Could not complete", description: e.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  }

  const copy = (t: string) => navigator.clipboard?.writeText(t).then(() => toast({ title: "Copied" }));

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Account security</h1>
        <p className="text-sm text-muted-foreground">Protect your login with a code from an authenticator app.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {st?.totpEnabled ? <ShieldCheck className="h-5 w-5 text-green-600" /> : <ShieldOff className="h-5 w-5 text-muted-foreground" />}
            Two-factor authentication
          </CardTitle>
          <CardDescription>
            {st?.totpEnabled ? `On. ${st.backupCodesLeft} backup code${st.backupCodesLeft === 1 ? "" : "s"} left.` : "Off. Anyone with your password can sign in."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {codes && (
            <div className="border-2 border-black bg-amber-50 p-4">
              <p className="mb-2 text-sm font-bold">Save these backup codes now. Each works once, and they are not shown again.</p>
              <div className="grid grid-cols-2 gap-1 font-mono text-sm">{codes.map((c) => <span key={c}>{c}</span>)}</div>
              <Button size="sm" variant="outline" className="mt-3" onClick={() => copy(codes.join("\n"))}><Copy className="mr-2 h-4 w-4" />Copy all</Button>
            </div>
          )}

          {st && !st.totpEnabled && !setup && (
            <Button disabled={busy} onClick={() => call({ action: "setup" }, (d) => setSetup(d))}><KeyRound className="mr-2 h-4 w-4" />Set up 2FA</Button>
          )}

          {setup && !st?.totpEnabled && (
            <div className="space-y-3">
              <p className="text-sm">1. Scan this with Google Authenticator, Authy or 1Password.</p>
              <img src={setup.qr} alt="2FA QR code" className="h-[220px] w-[220px] border-2 border-black" />
              <p className="text-xs text-muted-foreground">Cannot scan? Enter this key manually: <button className="font-mono font-bold underline" onClick={() => copy(setup.secret)}>{setup.secret}</button></p>
              <p className="text-sm">2. Enter the 6-digit code it shows.</p>
              <div className="flex gap-2">
                <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" inputMode="numeric" maxLength={6} className="max-w-[160px]" />
                <Button disabled={busy || code.length < 6} onClick={() => call({ action: "enable", code }, (d) => { setCodes(d.backupCodes); setSetup(null); setCode(""); })}>Turn on</Button>
              </div>
            </div>
          )}

          {st?.totpEnabled && (
            <div className="space-y-3 border-t-2 border-black pt-4">
              <div className="flex flex-wrap gap-2">
                <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Current code" inputMode="numeric" maxLength={6} className="max-w-[160px]" />
                <Button variant="outline" disabled={busy || code.length < 6} onClick={() => call({ action: "backup", code }, (d) => { setCodes(d.backupCodes); setCode(""); })}>New backup codes</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="max-w-[200px]" />
                <Button variant="destructive" disabled={busy || code.length < 6 || !password} onClick={() => call({ action: "disable", code, password }, () => { setCode(""); setPassword(""); setCodes(null); })}>Turn off 2FA</Button>
              </div>
              <p className="text-xs text-muted-foreground">Turning off or making new backup codes needs your current authenticator code (and password for turning off).</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sign-in protection</CardTitle>
          <CardDescription>After 3 wrong passwords the account locks for 15 minutes. You can unlock it sooner with a code emailed to you from the sign-in page.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
