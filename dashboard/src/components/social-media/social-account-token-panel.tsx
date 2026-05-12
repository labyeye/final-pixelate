"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Key,
  ExternalLink,
} from "lucide-react";

function getAuthToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("auth_token") || ""
    : "";
}
function authH(): Record<string, string> {
  const t = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(t ? { Authorization: "Bearer " + t } : {}),
  };
}

interface SocialAccount {
  _id: string;
  platform: string;
  handle: string;
  displayName: string;
  hasToken: boolean;
  platformAccountId?: string;
  igAccountId?: string;
  connectedPageName?: string;
}

const REQUIRED_PERMISSIONS = [
  { key: "pages_show_list", desc: "See list of pages" },
  { key: "pages_read_engagement", desc: "Read post metrics & insights" },
  { key: "leads_retrieval", desc: "Fetch lead ad form submissions" },
  { key: "instagram_basic", desc: "Access Instagram account info" },
  { key: "instagram_manage_insights", desc: "Read Instagram post metrics" },
  { key: "pages_manage_ads", desc: "Access ad-related page data" },
];


function ClientTokenSetup({
  clientId,
  hasToken,
  onSaved,
}: {
  clientId: string;
  hasToken: boolean;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(!hasToken);
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    ok: boolean;
    msg: string;
  } | null>(null);

  async function handleTest() {
    if (!token.trim()) {
      setTestResult({ ok: false, msg: "Paste a token first" });
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const url = `https://graph.facebook.com/v19.0/me?fields=id,name&access_token=${token.trim()}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.error) setTestResult({ ok: false, msg: data.error.message });
      else
        setTestResult({ ok: true, msg: `✓ Valid — ${data.name} (${data.id})` });
    } catch (e: any) {
      setTestResult({ ok: false, msg: e.message });
    } finally {
      setTesting(false);
    }
  }

  async function handleSave() {
    if (!token.trim()) {
      toast({
        title: "Paste a System User Token first",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/clients/${clientId}/meta-token`, {
        method: "PUT",
        headers: authH(),
        body: JSON.stringify({ metaAccessToken: token.trim() }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast({ title: "Token saved successfully" });
      setToken("");
      setOpen(false);
      onSaved();
    } catch (e: any) {
      toast({ title: "Save failed: " + e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove() {
    await fetch(`/api/clients/${clientId}/meta-token`, {
      method: "PUT",
      headers: authH(),
      body: JSON.stringify({ metaAccessToken: null }),
    });
    onSaved();
    toast({ title: "Token removed" });
  }

  return (
    <div className="border-b-2 border-black pb-5 mb-4">
      {}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4" />
          <span className="font-black text-sm uppercase tracking-wide">
            System User Token
          </span>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full border ml-1 ${
              hasToken
                ? "bg-green-50 text-green-700 border-green-300"
                : "bg-yellow-50 text-yellow-700 border-yellow-300"
            }`}
          >
            {hasToken ? "✓ Saved" : "Not Set"}
          </span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </div>

      {open && (
        <div className="mt-4 space-y-4">
          {}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 text-xs space-y-2">
            <p className="font-black text-sm">How to get System User Token:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>
                Open{" "}
                <a
                  href="https://business.facebook.com/settings/system-users"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline font-semibold inline-flex items-center gap-0.5"
                >
                  Meta Business Suite → System Users
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>Select client's Business Portfolio from top-left dropdown</li>
              <li>
                Click <strong>Add</strong> → Name it anything → Role:{" "}
                <strong>Admin</strong>
              </li>
              <li>
                Click <strong>Generate Token</strong> → Select your App
              </li>
              <li>Check these permissions:</li>
            </ol>

            {/* Permission checklist */}
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-4">
              {REQUIRED_PERMISSIONS.map((p) => (
                <label
                  key={p.key}
                  className="flex items-center gap-2 cursor-default"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  <span>
                    <code className="font-mono bg-gray-200 px-1 rounded text-xs">
                      {p.key}
                    </code>
                    <span className="text-gray-500 ml-1">{p.desc}</span>
                  </span>
                </label>
              ))}
            </div>

            <p className="mt-2 text-gray-500">
              6. Also click <strong>Add Assets</strong> and assign the client's
              Pages to this System User.
            </p>
            <p className="text-gray-500">
              7. Copy the generated token and paste below.
            </p>
          </div>

          {}
          <div>
            <label className="block text-xs font-bold mb-1 uppercase tracking-wide">
              Paste Token
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type={showToken ? "text" : "password"}
                  placeholder="EAAWHyy..."
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="border-2 border-black pr-10 font-mono text-xs"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowToken((v) => !v)}
                >
                  {showToken ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-2 border-black font-bold shrink-0"
                onClick={handleTest}
                disabled={testing}
              >
                {testing ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <RefreshCw className="w-3 h-3" />
                )}
                <span className="ml-1">Test</span>
              </Button>
              <Button
                className="border-2 border-black font-bold shrink-0"
                onClick={handleSave}
                disabled={saving}
              >
                {saving && <Loader2 className="w-3 h-3 animate-spin mr-1" />}
                Save
              </Button>
            </div>
            {testResult && (
              <p
                className={`text-xs mt-1.5 font-semibold ${
                  testResult.ok ? "text-green-600" : "text-red-600"
                }`}
              >
                {testResult.msg}
              </p>
            )}
          </div>

          {hasToken && (
            <button
              className="text-xs text-red-500 underline"
              onClick={handleRemove}
            >
              Remove token
            </button>
          )}
        </div>
      )}
    </div>
  );
}


function AccountRow({
  account,
  onSaved,
}: {
  account: SocialAccount;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    platformAccountId: account.platformAccountId || "",
    igAccountId: account.igAccountId || "",
  });

  const isIg = account.platform === "Instagram";
  const isFb = account.platform === "Facebook";
  const isConnected = !!account.platformAccountId;

  if (!isIg && !isFb) return null;

  async function handleSave() {
    if (!form.platformAccountId.trim()) {
      toast({ title: "Facebook Page ID is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/social-media-accounts", {
        method: "PUT",
        headers: authH(),
        body: JSON.stringify({
          id: account._id,
          platformAccountId: form.platformAccountId.trim(),
          igAccountId: form.igAccountId.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast({ title: "IDs saved" });
      onSaved();
      setExpanded(false);
    } catch (e: any) {
      toast({ title: "Save failed: " + e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="border-b border-gray-100 last:border-0">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-3">
          {isConnected ? (
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
          )}
          <div>
            <span className="font-bold text-sm">
              {account.displayName || account.handle}
            </span>
            <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
              {account.platform}
            </span>
            {account.platformAccountId && (
              <span className="ml-2 text-xs text-gray-400 font-mono">
                {account.platformAccountId}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold ${
              isConnected ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {isConnected ? "IDs Set" : "Missing IDs"}
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 bg-gray-50 border-t border-gray-100 pt-3">
          <div>
            <label className="block text-xs font-bold mb-1 uppercase tracking-wide">
              Facebook Page ID
            </label>
            <Input
              placeholder="e.g. 100931523472122222"
              value={form.platformAccountId}
              onChange={(e) =>
                setForm((f) => ({ ...f, platformAccountId: e.target.value }))
              }
              className="border-2 border-black font-mono text-xs"
            />
            <p className="text-xs text-gray-400 mt-0.5">
              Graph API Explorer → /me/accounts → id field
            </p>
          </div>

          {isIg && (
            <div>
              <label className="block text-xs font-bold mb-1 uppercase tracking-wide">
                Instagram Business Account ID
              </label>
              <Input
                placeholder="e.g. 17841430541330912"
                value={form.igAccountId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, igAccountId: e.target.value }))
                }
                className="border-2 border-black font-mono text-xs"
              />
              <p className="text-xs text-gray-400 mt-0.5">
                Graph API Explorer →
                /me/accounts?fields=id,name,instagram_business_account
              </p>
            </div>
          )}

          <Button
            className="border-2 border-black font-bold w-full"
            onClick={handleSave}
            disabled={saving}
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Save IDs
          </Button>
        </div>
      )}
    </div>
  );
}


export function SocialAccountTokenPanel({ clientId }: { clientId: string }) {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasClientToken, setHasClientToken] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const [accRes, tokenRes] = await Promise.all([
        fetch(`/api/social-media-accounts?clientId=${clientId}`, {
          headers: authH(),
        }),
        fetch(`/api/clients/${clientId}/meta-token`, { headers: authH() }),
      ]);
      const accData = await accRes.json();
      const tokenData = await tokenRes.json();
      setAccounts(Array.isArray(accData) ? accData : []);
      setHasClientToken(!!tokenData.hasToken);
    } catch {
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (clientId) load();
  }, [clientId]);

  const metaAccounts = accounts.filter(
    (a) => a.platform === "Facebook" || a.platform === "Instagram",
  );
  const connectedCount = metaAccounts.filter(
    (a) => !!a.platformAccountId,
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <Card className="border-2 border-black">
      <CardContent className="pt-5">
        {}
        <ClientTokenSetup
          clientId={clientId}
          hasToken={hasClientToken}
          onSaved={load}
        />

        {}
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-black uppercase tracking-wide">
              Step 2 — Account IDs
            </p>
            {metaAccounts.length > 0 && (
              <span className="text-xs text-gray-500 font-semibold">
                {connectedCount}/{metaAccounts.length} set
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Enter Page ID + Instagram ID for each account. Token from Step 1 is
            shared across all.
          </p>

          {metaAccounts.length === 0 ? (
            <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl text-muted-foreground">
              <AlertCircle className="w-6 h-6 mx-auto mb-1 opacity-30" />
              <p className="text-xs font-semibold">
                No Facebook/Instagram accounts added for this client yet.
              </p>
              <p className="text-xs mt-1 opacity-60">
                Add accounts in Social Media Planner first.
              </p>
            </div>
          ) : (
            <div className="border-2 border-black rounded-lg overflow-hidden">
              {metaAccounts.map((acc) => (
                <AccountRow key={acc._id} account={acc} onSaved={load} />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
