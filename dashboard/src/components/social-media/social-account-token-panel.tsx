"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("auth_token") || ""
    : "";
}
function authH(): Record<string, string> {
  const t = getToken();
  return {
    "Content-Type": "application/json",
    ...(t ? { Authorization: "Bearer " + t } : {}),
  };
}

interface SocialAccount {
  _id: string;
  clientId: string;
  platform: string;
  handle: string;
  displayName: string;
  isConnected: boolean;
  hasToken: boolean;
  platformAccountId?: string;
  igAccountId?: string;
  updatedAt?: string;
}

interface TokenForm {
  accessToken: string;
  platformAccountId: string;
  igAccountId: string;
}

function AccountTokenRow({ account, onSaved }: { account: SocialAccount; onSaved: () => void }) {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [form, setForm] = useState<TokenForm>({
    accessToken: "",
    platformAccountId: account.platformAccountId || "",
    igAccountId: account.igAccountId || "",
  });
  const [testResult, setTestResult] = useState<{ ok: boolean; msg: string } | null>(null);

  const isIg = account.platform === "Instagram";
  const isFb = account.platform === "Facebook";
  const needsToken = isIg || isFb;

  async function handleSave() {
    if (!form.accessToken.trim() && !form.platformAccountId.trim()) {
      toast({ title: "Enter at least an Access Token", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/social-media-accounts", {
        method: "PUT",
        headers: authH(),
        body: JSON.stringify({
          id: account._id,
          accessToken: form.accessToken.trim() || undefined,
          platformAccountId: form.platformAccountId.trim() || undefined,
          igAccountId: form.igAccountId.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast({ title: "Token saved successfully" });
      onSaved();
      setExpanded(false);
    } catch (e: any) {
      toast({ title: "Save failed: " + e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  async function handleTest() {
    if (!form.accessToken.trim()) {
      setTestResult({ ok: false, msg: "Enter an access token first" });
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const url = new URL("https://graph.facebook.com/v19.0/me");
      url.searchParams.set("access_token", form.accessToken.trim());
      url.searchParams.set("fields", "id,name");
      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.error) {
        setTestResult({ ok: false, msg: data.error.message });
      } else {
        setTestResult({ ok: true, msg: `Connected as: ${data.name} (ID: ${data.id})` });
      }
    } catch (e: any) {
      setTestResult({ ok: false, msg: e.message });
    } finally {
      setTesting(false);
    }
  }

  if (!needsToken) {
    return (
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0">
        <div>
          <span className="font-bold text-sm">{account.displayName || account.handle}</span>
          <span className="ml-2 text-xs text-gray-400">{account.platform}</span>
        </div>
        <span className="text-xs text-gray-400 italic">No token needed for {account.platform}</span>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-100 last:border-0">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-3">
          {account.hasToken ? (
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
          )}
          <div>
            <span className="font-bold text-sm">{account.displayName || account.handle}</span>
            <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{account.platform}</span>
            {account.platformAccountId && (
              <span className="ml-2 text-xs text-gray-400">Page ID: {account.platformAccountId}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold ${account.hasToken ? "text-green-600" : "text-yellow-600"}`}>
            {account.hasToken ? "Token Saved" : "No Token"}
          </span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 bg-gray-50 border-t border-gray-100">
          <div className="pt-3">
            <label className="block text-xs font-bold mb-1 uppercase tracking-wide">
              {isFb ? "Page" : "Instagram"} Access Token
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showToken ? "text" : "password"}
                  placeholder="Paste your long-lived access token here"
                  value={form.accessToken}
                  onChange={(e) => setForm((f) => ({ ...f, accessToken: e.target.value }))}
                  className="border-2 border-black pr-10 font-mono text-xs"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowToken((v) => !v)}
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-2 border-black font-bold shrink-0"
                onClick={handleTest}
                disabled={testing}
              >
                {testing ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                <span className="ml-1">Test</span>
              </Button>
            </div>
            {testResult && (
              <p className={`text-xs mt-1 font-semibold ${testResult.ok ? "text-green-600" : "text-red-600"}`}>
                {testResult.ok ? "✓" : "✗"} {testResult.msg}
              </p>
            )}
          </div>

          {isFb && (
            <div>
              <label className="block text-xs font-bold mb-1 uppercase tracking-wide">
                Facebook Page ID
              </label>
              <Input
                placeholder="e.g. 123456789012345"
                value={form.platformAccountId}
                onChange={(e) => setForm((f) => ({ ...f, platformAccountId: e.target.value }))}
                className="border-2 border-black font-mono text-xs"
              />
              <p className="text-xs text-gray-400 mt-0.5">
                Find it in Meta Business Suite → Settings → Page Info
              </p>
            </div>
          )}

          {isIg && (
            <>
              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wide">
                  Facebook Page ID (linked to Instagram)
                </label>
                <Input
                  placeholder="e.g. 123456789012345"
                  value={form.platformAccountId}
                  onChange={(e) => setForm((f) => ({ ...f, platformAccountId: e.target.value }))}
                  className="border-2 border-black font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wide">
                  Instagram Business Account ID
                </label>
                <Input
                  placeholder="e.g. 17841400000000000"
                  value={form.igAccountId}
                  onChange={(e) => setForm((f) => ({ ...f, igAccountId: e.target.value }))}
                  className="border-2 border-black font-mono text-xs"
                />
                <p className="text-xs text-gray-400 mt-0.5">
                  From Graph API: /me/accounts → instagram_business_account id
                </p>
              </div>
            </>
          )}

          <Button
            className="border-2 border-black font-bold w-full"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Token & IDs
          </Button>
        </div>
      )}
    </div>
  );
}

export function SocialAccountTokenPanel({ clientId }: { clientId: string }) {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/social-media-accounts?clientId=${clientId}`, {
        headers: authH(),
      });
      const data = await res.json();
      setAccounts(Array.isArray(data) ? data : []);
    } catch {
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (clientId) load();
  }, [clientId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl text-muted-foreground">
        <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-30" />
        <p className="text-sm font-semibold">No social media accounts added for this client.</p>
        <p className="text-xs mt-1">Add accounts in the Social Media Planner first.</p>
      </div>
    );
  }

  const connected = accounts.filter((a) => a.hasToken).length;

  return (
    <Card className="border-2 border-black">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold uppercase tracking-wide">
            Social Media Tokens
          </CardTitle>
          <span className="text-xs font-semibold text-gray-500">
            {connected}/{accounts.length} connected
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Save access tokens per account to enable live stats sync from Meta Graph API.
        </p>
      </CardHeader>
      <CardContent className="p-0">
        {accounts.map((acc) => (
          <AccountTokenRow key={acc._id} account={acc} onSaved={load} />
        ))}
      </CardContent>
    </Card>
  );
}
