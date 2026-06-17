"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Client, Lead } from "@/lib/data";
import { clientStatusColors } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Save,
  X,
  Edit2,
  Loader2,
  AlertCircle,
  Tag,
  Building2,
  IndianRupee,
  FileText,
  FolderOpen,
  Zap,
  ChevronRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { FbAdsConnectionPanel } from "@/components/fb-ads/fb-ads-connection-panel";
import { SocialAccountTokenPanel } from "@/components/social-media/social-account-token-panel";

function formatDate(date?: Date | string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getToken() {
  return typeof window !== "undefined"
    ? localStorage.getItem("auth_token") || ""
    : "";
}
function authHeaders(): Record<string, string> {
  const t = getToken();
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (t) h["Authorization"] = "Bearer " + t;
  return h;
}

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const clientId = params.id as string;

  const [client, setClient] = useState<Client | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Client>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!clientId) return;
    setLoading(true);
    Promise.all([
      apiFetch(`/api/clients/${clientId}`, { headers: authHeaders() }).then(
        (r) => r.json(),
      ),
      apiFetch("/api/leads", { headers: authHeaders() })
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
      apiFetch("/api/projects", { headers: authHeaders() })
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
      apiFetch("/api/invoices", { headers: authHeaders() })
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
    ])
      .then(([clientData, allLeads, allProjects, allInvoices]) => {
        setClient(clientData);
        setEditForm(clientData);

        setLeads(
          Array.isArray(allLeads)
            ? allLeads.filter(
                (l: any) =>
                  String(l.clientId) === clientId ||
                  String(l.convertedToClientId) === clientId,
              )
            : [],
        );
        setProjects(
          Array.isArray(allProjects)
            ? allProjects.filter(
                (p: any) =>
                  String(p.clientId) === clientId ||
                  String(p.client) === clientId ||
                  (clientData?.name &&
                    String(p.clientName || p.client) === clientData.name),
              )
            : [],
        );
        setInvoices(
          Array.isArray(allInvoices)
            ? allInvoices.filter(
                (inv: any) =>
                  String(inv.clientId) === clientId ||
                  (clientData?.name &&
                    String(inv.clientName) === clientData.name),
              )
            : [],
        );
      })
      .catch((err) => {
        console.error(err);
        toast({ title: "Failed to load client", variant: "destructive" });
      })
      .finally(() => setLoading(false));
  }, [clientId]);

  async function saveClient() {
    setSaving(true);
    try {
      const res = await apiFetch(`/api/clients/${clientId}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Save failed");
      const updated = await res.json();
      setClient(updated);
      setIsEditing(false);
      toast({ title: "Client saved" });
    } catch {
      toast({ title: "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  const totalInvoiced = invoices.reduce(
    (sum, inv) => sum + (Number(inv.amount) || 0),
    0,
  );
  const totalPaid = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + (Number(inv.amount) || 0), 0);
  const outstanding = totalInvoiced - totalPaid;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <AlertCircle className="w-12 h-12 text-muted-foreground" />
        <p className="text-lg font-bold">Client not found</p>
        <Link href="/clients">
          <Button variant="outline">Back to Clients</Button>
        </Link>
      </div>
    );
  }

  const statusColor =
    clientStatusColors[client.status || "active"] ||
    "bg-green-100 text-green-700";

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-headline">
      {}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4">
          <Link href="/clients">
            <Button
              variant="outline"
              size="icon"
              className="border-2 border-black"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-black tracking-tighter">
              {client.name}
            </h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full border ${statusColor}`}
              >
                {client.status || "active"}
              </span>
              {client.hasGst && (
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  GST Registered
                </span>
              )}
              {client.userId && (
                <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Portal Active
                </span>
              )}
              {client.industry && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> {client.industry}
                </span>
              )}
              {client.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                onClick={saveClient}
                disabled={saving}
                className="border-2 border-black font-bold"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditForm(client);
                }}
                className="border-2 border-black"
              >
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="border-2 border-black font-bold"
            >
              <Edit2 className="w-4 h-4 mr-2" /> Edit
            </Button>
          )}
        </div>
      </div>

      {}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total Invoiced",
            value: `₹${totalInvoiced.toLocaleString("en-IN")}`,
            color: "bg-blue-50 border-blue-300",
          },
          {
            label: "Total Paid",
            value: `₹${totalPaid.toLocaleString("en-IN")}`,
            color: "bg-green-50 border-green-300",
          },
          {
            label: "Outstanding",
            value: `₹${outstanding.toLocaleString("en-IN")}`,
            color:
              outstanding > 0
                ? "bg-red-50 border-red-300"
                : "bg-gray-50 border-gray-200",
          },
          {
            label: "Projects",
            value: projects.length,
            color: "bg-purple-50 border-purple-300",
          },
        ].map((c) => (
          <div
            key={c.label}
            className={`border-2 border-black rounded-xl p-3 ${c.color}`}
          >
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {c.label}
            </p>
            <p className="text-2xl font-black mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {}
        <div className="space-y-4">
          {}
          <Card className="border-2 border-black">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wide">
                Contact Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    placeholder="Name"
                    value={editForm.name || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="border-2 border-black"
                  />
                  <Input
                    placeholder="Email"
                    value={editForm.email || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="border-2 border-black"
                  />
                  <Input
                    placeholder="Phone"
                    value={editForm.phone || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="border-2 border-black"
                  />
                  <Input
                    placeholder="Address"
                    value={editForm.address || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, address: e.target.value }))
                    }
                    className="border-2 border-black"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="City"
                      value={editForm.city || ""}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, city: e.target.value }))
                      }
                      className="border-2 border-black"
                    />
                    <Input
                      placeholder="State"
                      value={editForm.state || ""}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, state: e.target.value }))
                      }
                      className="border-2 border-black"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  {client.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={`mailto:${client.email}`}
                        className="hover:underline"
                      >
                        {client.email}
                      </a>
                    </div>
                  )}
                  {client.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={`tel:${client.phone}`}
                        className="hover:underline"
                      >
                        {client.phone}
                      </a>
                    </div>
                  )}
                  {(client.address || client.city) && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span>
                        {[client.address, client.city, client.state, client.pin]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {}
          <Card className="border-2 border-black">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wide">
                CRM Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isEditing ? (
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-bold mb-1 block">
                      Status
                    </label>
                    <select
                      value={editForm.status || "active"}
                      onChange={(e) =>
                        setEditForm((p) => ({
                          ...p,
                          status: e.target.value as any,
                        }))
                      }
                      className="w-full px-2 py-1.5 rounded-lg border-2 border-black text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="prospect">Prospect</option>
                      <option value="churned">Churned</option>
                    </select>
                  </div>
                  <Input
                    placeholder="Industry (e.g. e-commerce)"
                    value={editForm.industry || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, industry: e.target.value }))
                    }
                    className="border-2 border-black"
                  />
                  <Input
                    placeholder="Tags (comma separated)"
                    value={(editForm.tags || []).join(", ")}
                    onChange={(e) =>
                      setEditForm((p) => ({
                        ...p,
                        tags: e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      }))
                    }
                    className="border-2 border-black"
                  />
                  <Textarea
                    placeholder="Internal notes..."
                    value={editForm.notes || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, notes: e.target.value }))
                    }
                    className="border-2 border-black resize-none min-h-[80px]"
                  />
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full border ${clientStatusColors[client.status || "active"] || ""}`}
                    >
                      {client.status || "active"}
                    </span>
                  </div>
                  {client.industry && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Industry</span>
                      <span className="font-medium">{client.industry}</span>
                    </div>
                  )}
                  {client.convertedFromLeadId && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">From Lead</span>
                      <Link
                        href={`/leads/${client.convertedFromLeadId}`}
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                      >
                        View Lead <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                  {client.createdAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Since</span>
                      <span className="font-medium">
                        {formatDate(client.createdAt)}
                      </span>
                    </div>
                  )}
                  {client.notes && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="text-xs text-muted-foreground font-bold mb-1">
                        Notes
                      </p>
                      <p className="text-sm whitespace-pre-wrap">
                        {client.notes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {}
          {(client.hasGst || isEditing) && (
            <Card className="border-2 border-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wide">
                  GST Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {isEditing ? (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!editForm.hasGst}
                        onChange={(e) =>
                          setEditForm((p) => ({
                            ...p,
                            hasGst: e.target.checked,
                          }))
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">
                        GST Registered
                      </span>
                    </label>
                    {editForm.hasGst && (
                      <>
                        <Input
                          placeholder="GST Company Name"
                          value={editForm.gstCompanyName || ""}
                          onChange={(e) =>
                            setEditForm((p) => ({
                              ...p,
                              gstCompanyName: e.target.value,
                            }))
                          }
                          className="border-2 border-black"
                        />
                        <Input
                          placeholder="GSTIN"
                          value={editForm.gstNumber || ""}
                          onChange={(e) =>
                            setEditForm((p) => ({
                              ...p,
                              gstNumber: e.target.value,
                            }))
                          }
                          className="border-2 border-black"
                        />
                        <Input
                          placeholder="GST Address"
                          value={editForm.gstAddress || ""}
                          onChange={(e) =>
                            setEditForm((p) => ({
                              ...p,
                              gstAddress: e.target.value,
                            }))
                          }
                          className="border-2 border-black"
                        />
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    {client.gstCompanyName && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Company</span>
                        <span className="font-medium">
                          {client.gstCompanyName}
                        </span>
                      </div>
                    )}
                    {client.gstNumber && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">GSTIN</span>
                        <span className="font-mono text-xs">
                          {client.gstNumber}
                        </span>
                      </div>
                    )}
                    {client.gstAddress && (
                      <div>
                        <span className="text-muted-foreground">
                          GST Address:{" "}
                        </span>
                        {client.gstAddress}
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {}
        <div className="lg:col-span-2">
          <Tabs defaultValue="projects">
            <TabsList className="border-2 border-black mb-4 w-full justify-start flex-wrap">
              <TabsTrigger value="projects" className="font-bold">
                Projects ({projects.length})
              </TabsTrigger>
              <TabsTrigger value="invoices" className="font-bold">
                Invoices ({invoices.length})
              </TabsTrigger>
              <TabsTrigger value="leads" className="font-bold">
                Leads ({leads.length})
              </TabsTrigger>
              <TabsTrigger value="fb-leads" className="font-bold">
                FB Lead Ads
              </TabsTrigger>
              <TabsTrigger value="social-tokens" className="font-bold">
                Social Tokens
              </TabsTrigger>
            </TabsList>

            {}
            <TabsContent value="projects" className="space-y-3">
              {projects.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl text-muted-foreground">
                  <FolderOpen className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  No projects yet.
                </div>
              )}
              {projects.map((p) => {
                const pid = String(p._id || p.id);
                return (
                  <div
                    key={pid}
                    className="border-2 border-black rounded-xl p-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/projects`}
                          className="font-bold hover:underline flex items-center gap-1"
                        >
                          {p.title}{" "}
                          <ChevronRight className="w-3 h-3 opacity-40" />
                        </Link>
                        {p.status && (
                          <span className="text-xs px-2 py-0.5 rounded-full border mt-1 inline-block">
                            {p.status}
                          </span>
                        )}
                      </div>
                      {p.amount && (
                        <span className="font-black text-green-700 text-sm">
                          ₹{Number(p.amount).toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    {p.progress != null && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="font-bold">{p.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                          <div
                            className="h-full bg-black rounded-full"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                    {p.dueDate && (
                      <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Due:{" "}
                        {formatDate(p.dueDate)}
                      </div>
                    )}
                  </div>
                );
              })}
            </TabsContent>

            {}
            <TabsContent value="invoices" className="space-y-3">
              {invoices.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl text-muted-foreground">
                  <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  No invoices yet.
                </div>
              )}
              {invoices.map((inv) => {
                const invId = String(inv._id || inv.id || inv.invoiceNo);
                const statusColors: Record<string, string> = {
                  paid: "bg-green-100 text-green-700 border-green-300",
                  pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
                  overdue: "bg-red-100 text-red-700 border-red-300",
                };
                return (
                  <div
                    key={invId}
                    className="border-2 border-black rounded-xl p-4 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-bold text-sm">
                        {inv.invoiceNo || inv.title || "Invoice"}
                      </p>
                      {inv.dueDate && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Due{" "}
                          {formatDate(inv.dueDate)}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-black text-base">
                        ₹{Number(inv.amount || 0).toLocaleString("en-IN")}
                      </p>
                      {inv.status && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full border font-bold ${statusColors[inv.status] || "bg-gray-100"}`}
                        >
                          {inv.status}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            {}
            <TabsContent value="leads" className="space-y-3">
              {leads.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl text-muted-foreground">
                  <Zap className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  No linked leads.
                </div>
              )}
              {leads.map((l) => {
                const lid = String(l._id || l.id);
                return (
                  <Link key={lid} href={`/leads/${lid}`}>
                    <div className="border-2 border-black rounded-xl p-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-between gap-3">
                      <div>
                        <p className="font-bold text-sm">{l.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {l.subject || l.projectType || l.source || "—"}
                        </p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        {l.status && (
                          <span className="text-xs px-2 py-0.5 rounded-full border font-bold capitalize">
                            {l.status}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 opacity-40" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </TabsContent>

            {}
            <TabsContent value="fb-leads">
              <FbAdsConnectionPanel clientId={clientId} />
            </TabsContent>

            <TabsContent value="social-tokens">
              <SocialAccountTokenPanel clientId={clientId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
