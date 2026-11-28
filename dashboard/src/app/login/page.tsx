"use client";
import { apiFetch } from "@/lib/api-fetch";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth, AuthProvider } from "@/hooks/use-auth";
import Image from "next/image";
import logo from "@/assets/images/logo-transparent.png";
import companyimg from "@/assets/images/company_day.png";
function LoginContent() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [needCode, setNeedCode] = useState(false);
  const [locked, setLocked] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [msg, setMsg] = useState("");

  async function post(url: string, body: any) {
    const res = await apiFetch(url, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } });
    return { res, body: await res.json().catch(() => ({})) };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const { res, body } = await post("/api/auth/login", { email, password, ...(needCode ? { code } : {}) });
      if (body?.twoFactorRequired) { setNeedCode(true); return; }
      if (body?.locked) setLocked(true);
      if (!res.ok) throw new Error(body?.error || "Login failed");
      const { token, user } = body;
      if (token) localStorage.setItem("auth_token", token);
      if (user && (user.id || user._id))
        sessionStorage.setItem("userId", String(user.id ?? user._id));

      login(user.id ?? (user._id as any));

      if (user.role === "client") {
        router.replace("/client-portal");
      } else {
        router.replace("/dashboard");
      }
    } catch (err: any) {
      setMsg(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  async function sendUnlock() {
    setMsg("");
    const { res, body } = await post("/api/auth/unlock", { email });
    if (res.ok) { setOtpSent(true); setMsg("If this email has an account, a 6-digit code is on its way."); }
    else setMsg(body?.error || "Could not send the code");
  }
  async function verifyUnlock() {
    const { res, body } = await post("/api/auth/unlock", { email, otp });
    if (res.ok) { setLocked(false); setOtpSent(false); setOtp(""); setMsg("Account unlocked. Sign in again."); }
    else setMsg(body?.error || "Wrong code");
  }

  return (
    <div
      className="flex min-h-screen items-center justify-end bg-background p-4 font-headline"
      style={{
        backgroundImage: `
      
      url(${companyimg.src})
    `,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card className="w-full max-w-md border-4 border-black">
        <CardHeader className="text-center">
          <Image
            src={logo}
            alt="Pixelate Nest Logo"
            width={120}
            height={120}
            className="mx-auto mb-4"
          />
          <CardTitle className="text-5xl font-black tracking-tighter">
            PIXELATE NEST
          </CardTitle>
          <CardDescription className="text-lg font-bold text-muted-foreground">
            AGENCY CRM LOGIN
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {needCode && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">Authenticator code (or a backup code)</label>
                <Input value={code} onChange={(e) => setCode(e.target.value)} autoComplete="one-time-code" inputMode="text" autoFocus required />
              </div>
            )}
            {msg && <p className="text-sm font-bold text-red-600">{msg}</p>}
            <Button type="submit" className="w-full" disabled={loading || locked}>
              {loading ? "Signing in..." : needCode ? "Verify and sign in" : "Sign in"}
            </Button>
          </form>
          {locked && (
            <div className="mt-4 space-y-2 border-t-2 border-black pt-4">
              <p className="text-sm font-bold">Unlock with an emailed code</p>
              {!otpSent ? (
                <Button type="button" variant="outline" className="w-full" onClick={sendUnlock}>Email me a code</Button>
              ) : (
                <div className="flex gap-2">
                  <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit code" inputMode="numeric" maxLength={6} />
                  <Button type="button" onClick={verifyUnlock}>Unlock</Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginContent />
    </AuthProvider>
  );
}
