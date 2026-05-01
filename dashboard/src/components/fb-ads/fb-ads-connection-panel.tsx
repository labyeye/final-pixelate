"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Facebook,
  RefreshCw,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Info,
  Save,
} from "lucide-react";

function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("auth_token") || "" : "";
}
function authH(): Record<string, string> {
  const t = getToken();
  return { "Content-Type": "application/json", ...(t ? { Authorization: "Bearer " + t } : {}) };
}
function timeAgo(date: string | Date | null | undefined): string {
  if (!date) return "Never";
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

interface LeadAdForm {
  id: string;
  name: string;
  status: string;
  created_time: string;
  leads_count?: number;
}

interface FbAdsConnection {
  _id?: string;
  clientId: string;
  isConnected: boolean;
  adAccountId?: string;
  datasetId?: string;
  selectedFormIds?: string[];
  lastSyncAt?: string | null;
  totalImported?: number;
  updatedAt?: string;
}

interface Props {
  
  clientId: string;
  
  readOnly?: boolean;
}

export function FbAdsConnectionPanel({ clientId, readOnly = false }: Props) {
  const { toast } = useToast();

  const [conn, setConn] = useState<FbAdsConnection | null>(null);
  const [loadingConn, setLoadingConn] = useState(true);

  
  const [accessToken, setAccessToken] = useState("");
  const [adAccountId, setAdAccountId] = useState("");
  const [datasetId, setDatasetId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  
  const [forms, setForms] = useState<LeadAdForm[]>([]);
  const [loadingForms, setLoadingForms] = useState(false);
  const [selectedFormIds, setSelectedFormIds] = useState<string[]>([]);
  const [showForms, setShowForms] = useState(false);
  const [savingForms, setSavingForms] = useState(false);

  
  const [syncing, setSyncing] = useState(false);

  async function loadConnection() {
    setLoadingConn(true);
    try {
      const res = await fetch(`/api/fb-ads-connection?clientId=${clientId}`, { headers: authH() });
      if (res.ok) {
        const data = await res.json();
        setConn(data);
        if (data) {
          setAdAccountId(data.adAccountId || "");
          setDatasetId(data.datasetId || "");
          setSelectedFormIds(data.selectedFormIds || []);
        }
      }
    } catch {
      
    } finally {
      setLoadingConn(false);
    }
  }

  useEffect(() => {
    loadConnection();
  }, [clientId]);

  async function saveConnection() {
    if (!accessToken.trim() || !adAccountId.trim()) {
      toast({ title: "Access Token and Ad Account ID are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/fb-ads-connection", {
        method: "POST",
        headers: authH(),
        body: JSON.stringify({
          clientId,
          accessToken: accessToken.trim(),
          adAccountId: adAccountId.trim(),
          datasetId: datasetId.trim() || null,
          selectedFormIds,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }
      toast({ title: "FB Ads connection saved" });
      setIsEditing(false);
      setAccessToken("");
      await loadConnection();
    } catch (e: any) {
      toast({ title: e.message || "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  async function disconnect() {
    if (!confirm("Remove FB Ads connection for this client?")) return;
    try {
      await fetch(`/api/fb-ads-connection?clientId=${clientId}`, {
        method: "DELETE",
        headers: authH(),
      });
      setConn(null);
      setForms([]);
      setSelectedFormIds([]);
      toast({ title: "Connection removed" });
    } catch {
      toast({ title: "Failed to remove connection", variant: "destructive" });
    }
  }

  async function loadForms() {
    setLoadingForms(true);
    setShowForms(true);
    try {
      const res = await fetch(`/api/fb-ads-connection/forms?clientId=${clientId}`, { headers: authH() });
      const json = await res.json();
      if (!res.ok) {
        toast({
          title: json.error || "Failed to load forms",
          description: json.hint || undefined,
          variant: "destructive",
        });
        setShowForms(false);
        return;
      }
      setForms(json || []);
      if ((json || []).length === 0) {
        toast({
          title: "No Lead Ad forms found in this Ad Account",
          description: "Make sure the token has access to this ad account and it has Lead Ad campaigns.",
          variant: "destructive",
        });
      }
    } catch (e: any) {
      toast({ title: e.message || "Failed to load forms", variant: "destructive" });
    } finally {
      setLoadingForms(false);
    }
  }

  async function saveForms() {
    setSavingForms(true);
    try {
      const res = await fetch("/api/fb-ads-connection", {
        method: "PATCH",
        headers: authH(),
        body: JSON.stringify({ clientId, selectedFormIds, datasetId: datasetId || null }),
      });
      if (!res.ok) throw new Error("Failed to save form selection");
      toast({ title: `${selectedFormIds.length} form(s) saved for sync` });
      await loadConnection();
    } catch (e: any) {
      toast({ title: e.message || "Failed to save", variant: "destructive" });
    } finally {
      setSavingForms(false);
    }
  }

  function toggleForm(id: string) {
    setSelectedFormIds((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  }

  async function syncNow(fullSync = false) {
    setSyncing(true);
    try {
      const res = await fetch("/api/fb-ads-connection/sync", {
        method: "POST",
        headers: authH(),
        body: JSON.stringify({ clientId, fullSync }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sync failed");
      toast({
        title: `Sync complete: ${data.imported} new lead(s) imported`,
        description: data.skipped > 0 ? `${data.skipped} duplicate(s) skipped` : undefined,
      });
      await loadConnection();
    } catch (e: any) {
      toast({ title: e.message || "Sync failed", variant: "destructive" });
    } finally {
      setSyncing(false);
    }
  }

  if (loadingConn) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground py-4">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading FB Ads settings...
      </div>
    );
  }

  
  if (readOnly) {
    if (!conn?.isConnected) {
      return (
        <Card className="border-2 border-black bg-blue-50">
          <CardContent className="pt-5 flex items-start gap-3">
            <Facebook className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-sm">Facebook Lead Ads not connected</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Ask your account manager to connect your Facebook Ads account to start importing leads automatically.
              </p>
            </div>
          </CardContent>
        </Card>
      );
    }

    const formsReady = (conn.selectedFormIds?.length || 0) > 0;

    return (
      <Card className="border-2 border-black">
        <CardContent className="pt-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Facebook className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">Facebook Lead Ads</span>
                  <Badge className="bg-green-100 text-green-700 border-green-300 font-bold text-xs">Connected</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formsReady
                    ? <>{conn.selectedFormIds!.length} form(s) active · {conn.totalImported || 0} leads imported · Last sync: {timeAgo(conn.lastSyncAt)}</>
                    : "Forms not configured yet — ask your account manager to select Lead Ad forms"
                  }
                </p>
              </div>
            </div>
            {formsReady && (
              <Button
                size="sm"
                onClick={syncNow}
                disabled={syncing}
                className="border-2 border-black font-bold"
              >
                {syncing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                Sync Now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  
  return (
    <div className="space-y-4">
      {}
      <Card className="border-2 border-black">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Facebook className="w-5 h-5 text-blue-600" />
            Facebook Lead Ads Connection
            {conn?.isConnected ? (
              <Badge className="bg-green-100 text-green-700 border-green-300 font-bold ml-auto">
                <CheckCircle className="w-3 h-3 mr-1" /> Connected
              </Badge>
            ) : (
              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 font-bold ml-auto">
                <AlertCircle className="w-3 h-3 mr-1" /> Not Connected
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {conn?.isConnected && !isEditing ? (
            
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Ad Account:</span>{" "}
                  <span className="font-mono font-bold">{conn.adAccountId}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Dataset ID:</span>{" "}
                  <span className="font-mono font-bold">{conn.datasetId || "—"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Forms selected:</span>{" "}
                  <span className="font-bold">{conn.selectedFormIds?.length || 0}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total imported:</span>{" "}
                  <span className="font-bold">{conn.totalImported || 0}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="border-2 border-black font-bold"
                >
                  Edit Connection
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={disconnect}
                  className="border-2 border-red-500 text-red-600 font-bold"
                >
                  <Trash2 className="w-3 h-3 mr-1" /> Disconnect
                </Button>
              </div>
            </div>
          ) : (
            
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-xs text-blue-800 flex gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold mb-1">How to get these values:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Go to <strong>Meta Business Manager → Settings → System Users</strong> (or use a User token)</li>
                    <li>Generate token with permissions: <code>ads_management</code>, <code>leads_retrieval</code>, <code>pages_show_list</code>, <code>pages_read_engagement</code></li>
                    <li><strong>Ad Account ID</strong>: copy from <strong>Ads Manager → Account Settings</strong> (e.g. <code>act_123456789</code>). This field is optional — forms are fetched via your Pages.</li>
                    <li><strong>Dataset ID</strong> (optional): from <strong>Events Manager → your pixel → Settings</strong></li>
                  </ol>
                </div>
              </div>

              <div className="grid gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Access Token *
                  </label>
                  <Input
                    type="password"
                    placeholder="Paste your System User access token..."
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                    className="border-2 border-black mt-1 font-mono text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Ad Account ID *
                    </label>
                    <Input
                      placeholder="act_123456789"
                      value={adAccountId}
                      onChange={(e) => setAdAccountId(e.target.value)}
                      className="border-2 border-black mt-1 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Dataset ID <span className="text-muted-foreground font-normal">(for Conversions API)</span>
                    </label>
                    <Input
                      placeholder="e.g. 2116147625829931"
                      value={datasetId}
                      onChange={(e) => setDatasetId(e.target.value)}
                      className="border-2 border-black mt-1 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={saveConnection}
                  disabled={saving}
                  className="border-2 border-black font-bold bg-black text-white"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Connection
                </Button>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="border-2 border-black font-bold"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {}
      {conn?.isConnected && !isEditing && (
        <Card className="border-2 border-black">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Lead Ad Forms to Sync</CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={showForms ? () => setShowForms(false) : loadForms}
                className="border-2 border-black font-bold"
                disabled={loadingForms}
              >
                {loadingForms ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                ) : showForms ? (
                  <ChevronUp className="w-4 h-4 mr-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 mr-1" />
                )}
                {showForms ? "Hide" : "Load Forms"}
              </Button>
            </div>
            {!showForms && (conn.selectedFormIds?.length || 0) > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                {conn.selectedFormIds!.length} form(s) currently selected
              </p>
            )}
          </CardHeader>

          {showForms && (
            <CardContent className="space-y-3">
              {forms.length === 0 && !loadingForms ? (
                <p className="text-sm text-muted-foreground">No forms found. Make sure the access token has access to this Ad Account.</p>
              ) : (
                <div className="space-y-2">
                  {forms.map((form) => (
                    <label
                      key={form.id}
                      className="flex items-center gap-3 p-3 border-2 border-black rounded-md cursor-pointer hover:bg-muted/50"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFormIds.includes(form.id)}
                        onChange={() => toggleForm(form.id)}
                        className="w-4 h-4 accent-black"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{form.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ID: {form.id} ·{" "}
                          {form.leads_count !== undefined ? `${form.leads_count} leads` : ""} ·{" "}
                          <span className={form.status === "ACTIVE" ? "text-green-600" : "text-yellow-600"}>
                            {form.status}
                          </span>
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {forms.length > 0 && (
                <Button
                  size="sm"
                  onClick={saveForms}
                  disabled={savingForms}
                  className="border-2 border-black font-bold bg-black text-white"
                >
                  {savingForms ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Form Selection ({selectedFormIds.length} selected)
                </Button>
              )}
            </CardContent>
          )}
        </Card>
      )}

      {}
      {conn?.isConnected && (conn.selectedFormIds?.length || 0) > 0 && (
        <Card className="border-2 border-black">
          <CardContent className="pt-5 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-bold text-sm">Sync Leads from Facebook</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Last sync: {timeAgo(conn.lastSyncAt)} ·{" "}
                  {conn.totalImported || 0} total leads imported
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => syncNow(false)}
                  disabled={syncing}
                  className="border-2 border-black font-bold"
                >
                  {syncing ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  {syncing ? "Syncing..." : "Sync New"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (confirm("This will re-import ALL leads from the beginning (duplicates are skipped). Continue?")) {
                      syncNow(true);
                    }
                  }}
                  disabled={syncing}
                  className="border-2 border-black font-bold"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Full Sync (Sab Leads)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
