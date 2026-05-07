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
  Facebook,
  RefreshCw,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

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
  platform: string;
  handle: string;
  displayName: string;
  hasToken: boolean;
  platformAccountId?: string;
  igAccountId?: string;
  connectedPageName?: string;
}

// ── Per-account row (read-only display + optional manual ID override) ────────
function AccountRow({ account, onSaved }: { account: SocialAccount; onSaved: () => void }) {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    platformAccountId: account.platformAccountId || "",
    igAccountId: account.igAccountId || "",
  });

  const isIg = account.platform === "Instagram";
  const isFb = account.platform === "Facebook";
  const needsIds = isIg || isFb;
  const isConnected = account.hasToken && !!account.platformAccountId;

  if (!needsIds) return null;

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
      toast({ title: "Saved" });
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
              {account.connectedPageName || account.displayName || account.handle}
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
          <span className={`text-xs font-bold ${isConnected ? "text-green-600" : "text-yellow-600"}`}>
            {isConnected ? "Connected" : "Not Connected"}
          </span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 bg-gray-50 border-t border-gray-100 pt-3">
          <p className="text-xs text-gray-500">
            Override IDs manually if auto-connect picked the wrong page.
          </p>
          <div>
            <label className="block text-xs font-bold mb-1 uppercase tracking-wide">
              Facebook Page ID
            </label>
            <Input
              placeholder="e.g. 100931523472122222"
              value={form.platformAccountId}
              onChange={(e) => setForm((f) => ({ ...f, platformAccountId: e.target.value }))}
              className="border-2 border-black font-mono text-xs"
            />
          </div>
          {isIg && (
            <div>
              <label className="block text-xs font-bold mb-1 uppercase tracking-wide">
                Instagram Business Account ID
              </label>
              <Input
                placeholder="e.g. 17841430541330912"
                value={form.igAccountId}
                onChange={(e) => setForm((f) => ({ ...f, igAccountId: e.target.value }))}
                className="border-2 border-black font-mono text-xs"
              />
            </div>
          )}
          <Button
            className="border-2 border-black font-bold w-full"
            onClick={handleSave}
            disabled={saving}
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Save Override
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Main panel ───────────────────────────────────────────────────────────────
export function SocialAccountTokenPanel({ clientId }: { clientId: string }) {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasClientToken, setHasClientToken] = useState(false);

  const searchParams = useSearchParams();

  async function load() {
    setLoading(true);
    try {
      const [accRes, tokenRes] = await Promise.all([
        fetch(`/api/social-media-accounts?clientId=${clientId}`, { headers: authH() }),
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

  // Show toast on return from OAuth
  useEffect(() => {
    const connected = searchParams.get("meta_connected");
    const error = searchParams.get("meta_error");
    if (connected) {
      toast({ title: `Facebook connected — ${connected} accounts synced` });
      load();
    }
    if (error) {
      toast({ title: `Facebook connect failed: ${error}`, variant: "destructive" });
    }
  }, []);

  function handleConnectFacebook() {
    window.location.href = `/api/auth/meta/connect?clientId=${clientId}`;
  }

  const connectedAccounts = accounts.filter(
    (a) => (a.platform === "Facebook" || a.platform === "Instagram") && a.hasToken && a.platformAccountId,
  );
  const totalMetaAccounts = accounts.filter(
    (a) => a.platform === "Facebook" || a.platform === "Instagram",
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-2 border-black">
        <CardContent className="pt-5">
          {/* Connect button */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              <h3 className="font-black text-sm uppercase tracking-wide">
                Facebook / Instagram
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {hasClientToken
                  ? `${connectedAccounts.length}/${totalMetaAccounts.length} accounts connected`
                  : "Not connected — click Connect to link all pages automatically"}
              </p>
            </div>
            <div className="flex gap-2">
              {hasClientToken && (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-2 border-black font-bold text-xs"
                  onClick={handleConnectFacebook}
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Reconnect
                </Button>
              )}
              <Button
                size="sm"
                className="bg-[#1877F2] hover:bg-[#166fe5] text-white border-2 border-[#1877F2] font-bold text-xs"
                onClick={handleConnectFacebook}
              >
                <Facebook className="w-4 h-4 mr-2" />
                {hasClientToken ? "Connect Another Account" : "Connect Facebook"}
              </Button>
            </div>
          </div>

          {/* What happens on connect */}
          {!hasClientToken && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-800 space-y-1">
              <p className="font-bold">After clicking Connect:</p>
              <p>✓ Client logs into their Facebook account</p>
              <p>✓ All their Pages are automatically fetched</p>
              <p>✓ Instagram Business Accounts are linked automatically</p>
              <p>✓ Stats sync will work immediately — no manual IDs needed</p>
            </div>
          )}

          {/* Connected accounts list */}
          {totalMetaAccounts.length > 0 && (
            <div className="border-2 border-black rounded-lg overflow-hidden">
              {totalMetaAccounts.map((acc) => (
                <AccountRow key={acc._id} account={acc} onSaved={load} />
              ))}
            </div>
          )}

          {totalMetaAccounts.length === 0 && hasClientToken && (
            <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl text-muted-foreground">
              <p className="text-xs font-semibold">
                No Facebook/Instagram accounts added yet. They will appear here after connecting.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
