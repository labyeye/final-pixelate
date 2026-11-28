"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ShieldOff, KeyRound, Copy, Fingerprint, Laptop, Trash2, LogOut } from "lucide-react";
import { startRegistration } from "@simplewebauthn/browser";
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
  const [sessions, setSessions] = useState<any[]>([]);
  const [passkeys, setPasskeys] = useState<any[]>([]);
  const [pkName, setPkName] = useState("");

  const loadSessions = () => apiFetch("/api/auth/sessions", { headers: authHeaders() }).then((r) => r.json()).then((d) => setSessions(d.sessions || [])).catch(() => {});
  const loadPasskeys = () => apiFetch("/api/auth/passkey", { headers: authHeaders() }).then((r) => r.json()).then((d) => setPasskeys(d.passkeys || [])).catch(() => {});
  useEffect(() => { loadSessions(); loadPasskeys(); }, []);

  async function revoke(q: string) {
    await apiFetch(`/api/auth/sessions?${q}`, { method: "DELETE", headers: authHeaders() });
    loadSessions();
  }
  async function addPasskey() {
    setBusy(true);
    try {
      const o = await apiFetch("/api/auth/passkey", { method: "POST", headers: authHeaders(), body: JSON.stringify({ action: "register-options" }) });
      const opts = await o.json();
      if (!o.ok) throw new Error(opts.error || "Passkeys are not available here");
      const response = await startRegistration({ optionsJSON: opts });
      const r = await apiFetch("/api/auth/passkey", { method: "POST", headers: authHeaders(), body: JSON.stringify({ action: "register", response, name: pkName || "This device" }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Could not save the passkey");
      setPkName("");
      toast({ title: "Passkey added" });
      loadPasskeys();
    } catch (e: any) {
      toast({ title: "Could not add passkey", description: e?.name === "NotAllowedError" ? "Cancelled" : e.message, variant: "destructive" });
    } finally { setBusy(false); }
  }
  async function removePasskey(id: string) {
    await apiFetch(`/api/auth/passkey?id=${encodeURIComponent(id)}`, { method: "DELETE", headers: authHeaders() });
    loadPasskeys();
  }
  const device = (ua: string) =>
    (/iPhone|iPad/.test(ua) ? "iPhone / iPad" : /Android/.test(ua) ? "Android" : /Mac OS/.test(ua) ? "Mac" : /Windows/.test(ua) ? "Windows" : /Linux/.test(ua) ? "Linux" : "Unknown device") +
    (/Edg\//.test(ua) ? " · Edge" : /Chrome\//.test(ua) ? " · Chrome" : /Firefox\//.test(ua) ? " · Firefox" : /Safari\//.test(ua) ? " · Safari" : "");

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
          <CardTitle className="flex items-center gap-2"><Fingerprint className="h-5 w-5" />Passkeys</CardTitle>
          <CardDescription>Sign in with your fingerprint, face or screen lock instead of a password. A passkey replaces the 2FA code.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {passkeys.map((p) => (
            <div key={p.id} className="flex items-center justify-between border-2 border-black px-3 py-2 text-sm">
              <span><b>{p.name}</b> <span className="text-xs text-muted-foreground">added {new Date(p.createdAt).toLocaleDateString("en-IN")}</span></span>
              <Button size="sm" variant="destructive" className="h-8 w-8 p-0" title="Remove passkey" onClick={() => removePasskey(p.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Input value={pkName} onChange={(e) => setPkName(e.target.value)} placeholder="Name, e.g. MacBook" className="max-w-[220px]" />
            <Button disabled={busy} onClick={addPasskey}><Fingerprint className="mr-2 h-4 w-4" />Add a passkey</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Laptop className="h-5 w-5" />Active sessions</CardTitle>
          <CardDescription>Devices signed in to your account. Sign out any you do not recognise.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {sessions.length === 0 && <p className="text-sm text-muted-foreground">No tracked sessions yet. Sign out and in again to start tracking this device.</p>}
          {sessions.map((x) => (
            <div key={x.sid} className="flex items-center justify-between border-2 border-black px-3 py-2 text-sm">
              <span>
                <b>{device(x.ua || "")}</b>{x.current && <span className="ml-2 border-2 border-black bg-green-200 px-1.5 text-[10px] font-bold">THIS DEVICE</span>}
                <span className="block text-xs text-muted-foreground">{x.ip || "unknown IP"} · {x.method} · {new Date(x.createdAt).toLocaleString("en-IN")}</span>
              </span>
              {!x.current && <Button size="sm" variant="outline" className="h-8 w-8 p-0" title="Sign out this device" onClick={() => revoke("id=" + x.sid)}><LogOut className="h-3.5 w-3.5" /></Button>}
            </div>
          ))}
          {sessions.filter((x) => !x.current).length > 0 && <Button size="sm" variant="destructive" onClick={() => revoke("all=1")}>Sign out all other devices</Button>}
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
