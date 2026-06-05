"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Lead, LeadActivity } from "@/lib/data";
import {
  leadStatuses,
  leadStatusColors,
  priorityColors,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Tag,
  User,
  AlertCircle,
  MessageSquare,
  PhoneCall,
  AtSign,
  Users,
  Clock,
  CheckCircle2,
  Star,
  Edit2,
  Save,
  X,
  Plus,
  Loader2,
} from "lucide-react";
import Link from "next/link";

const ACTIVITY_ICONS: Record<string, any> = {
  note: MessageSquare,
  call: PhoneCall,
  email: AtSign,
  meeting: Users,
  status_change: CheckCircle2,
  conversion: Star,
};

const ACTIVITY_LABELS: Record<string, string> = {
  note: "Note",
  call: "Call Log",
  email: "Email",
  meeting: "Meeting",
  status_change: "Status Changed",
  conversion: "Converted",
};

function timeAgo(date: Date | string) {
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDate(date?: Date | string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const leadId = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<LeadActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Lead>>({});

  const [newActivity, setNewActivity] = useState({ type: "note", content: "" });
  const [postingActivity, setPostingActivity] = useState(false);

  const [convertLoading, setConvertLoading] = useState(false);

  function getToken() {
    return localStorage.getItem("auth_token") || "";
  }

  function authHeaders(): Record<string, string> {
    const t = getToken();
    const h: Record<string, string> = { "Content-Type": "application/json" };
    if (t) h["Authorization"] = "Bearer " + t;
    return h;
  }

  useEffect(() => {
    if (!leadId) return;
    setLoading(true);
    Promise.all([
      apiFetch(`/api/leads/${leadId}`, { headers: authHeaders() }).then((r) =>
        r.json(),
      ),
      apiFetch(`/api/leads/${leadId}/activity`, { headers: authHeaders() }).then(
        (r) => r.json(),
      ),
    ])
      .then(([leadData, actData]) => {
        setLead(leadData);
        setEditForm(leadData);
        setActivities(Array.isArray(actData) ? actData : []);
      })
      .catch((err) => {
        console.error(err);
        toast({ title: "Failed to load lead", variant: "destructive" });
      })
      .finally(() => setLoading(false));
  }, [leadId]);

  async function saveLead() {
    if (!lead) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Save failed");
      const updated = await res.json();
      setLead(updated);
      setIsEditing(false);
      toast({ title: "Lead saved" });
    } catch {
      toast({ title: "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  async function postActivity() {
    if (!newActivity.content.trim()) return;
    setPostingActivity(true);
    try {
      const res = await apiFetch(`/api/leads/${leadId}/activity`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(newActivity),
      });
      if (!res.ok) throw new Error("Failed");
      const created = await res.json();
      setActivities((prev) => [created, ...prev]);
      setNewActivity({ type: "note", content: "" });
      toast({ title: "Activity logged" });
    } catch {
      toast({ title: "Failed to log activity", variant: "destructive" });
    } finally {
      setPostingActivity(false);
    }
  }

  async function updateStatus(newStatus: string) {
    try {
      await apiFetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ status: newStatus, updatedAt: new Date() }),
      });
      setLead((prev) => (prev ? { ...prev, status: newStatus as any } : prev));

      const res = await apiFetch(`/api/leads/${leadId}/activity`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          type: "status_change",
          content: `Status changed to: ${newStatus}`,
        }),
      });
      const created = await res.json();
      setActivities((prev) => [created, ...prev]);
      toast({ title: `Status → ${newStatus}` });
    } catch {
      toast({ title: "Failed to update status", variant: "destructive" });
    }
  }

  async function convertToClient() {
    if (!lead) return;
    if (
      !window.confirm(
        `Convert "${lead.name}" to a client? This will create a new client record.`,
      )
    )
      return;
    setConvertLoading(true);
    try {
      const clientData = {
        name: lead.name,
        email: lead.email || "",
        phone: lead.phone || "",
        address: "",
        city: lead.city || "",
        status: "active",
        convertedFromLeadId: leadId,
      };
      const res = await apiFetch("/api/clients", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(clientData),
      });
      if (!res.ok) throw new Error("Failed to create client");
      const newClient = await res.json();
      const clientId = String(newClient._id || newClient.id);

      await apiFetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({
          status: "converted",
          convertedToClientId: clientId,
        }),
      });
      setLead((prev) =>
        prev
          ? { ...prev, status: "converted", convertedToClientId: clientId }
          : prev,
      );

      const actRes = await apiFetch(`/api/leads/${leadId}/activity`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          type: "conversion",
          content: `Lead converted to client (ID: ${clientId})`,
        }),
      });
      const actCreated = await actRes.json();
      setActivities((prev) => [actCreated, ...prev]);

      toast({
        title: "Lead converted to client!",
        description: `Client "${lead.name}" created.`,
      });
      setTimeout(() => router.push(`/clients/${clientId}`), 1500);
    } catch {
      toast({ title: "Conversion failed", variant: "destructive" });
    } finally {
      setConvertLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <AlertCircle className="w-12 h-12 text-muted-foreground" />
        <p className="text-lg font-bold">Lead not found</p>
        <Link href="/leads">
          <Button variant="outline">Back to Leads</Button>
        </Link>
      </div>
    );
  }

  const statusColor =
    leadStatusColors[lead.status || "not called"] ||
    "bg-gray-100 text-gray-700";
  const priorityColor =
    priorityColors[lead.priority || "medium"] ||
    "bg-yellow-100 text-yellow-700";

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Link href="/leads">
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
              {lead.name}
            </h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full border ${statusColor}`}
              >
                {lead.status || "not called"}
              </span>
              {lead.priority && (
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full border ${priorityColor}`}
                >
                  {lead.priority} priority
                </span>
              )}
              {lead.source && (
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {lead.source}
                </span>
              )}
              {lead.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {lead.status !== "converted" && (
            <Button
              onClick={convertToClient}
              disabled={convertLoading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-black font-bold"
            >
              {convertLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Star className="w-4 h-4 mr-2" />
              )}
              Convert to Client
            </Button>
          )}
          {lead.status === "converted" && lead.convertedToClientId && (
            <Link href={`/clients/${lead.convertedToClientId}`}>
              <Button
                variant="outline"
                className="border-2 border-emerald-500 text-emerald-700 font-bold"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" /> View Client
              </Button>
            </Link>
          )}
          {isEditing ? (
            <>
              <Button
                onClick={saveLead}
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
                  setEditForm(lead);
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {}
        <div className="lg:col-span-1 space-y-4">
          {}
          <Card className="border-2 border-black">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wide">
                Pipeline Stage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {leadStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg border font-medium transition-all ${
                    lead.status === s
                      ? (leadStatusColors[s] || "bg-gray-100") + " border-2"
                      : "bg-white hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  {lead.status === s && <span className="mr-2">●</span>}
                  {s}
                </button>
              ))}
            </CardContent>
          </Card>

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
                    placeholder="Phone"
                    value={editForm.phone || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, phone: e.target.value }))
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
                    placeholder="City"
                    value={editForm.city || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, city: e.target.value }))
                    }
                    className="border-2 border-black"
                  />
                </div>
              ) : (
                <>
                  {lead.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <a
                        href={`tel:${lead.phone}`}
                        className="hover:underline font-medium"
                      >
                        {lead.phone}
                      </a>
                    </div>
                  )}
                  {lead.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <a
                        href={`mailto:${lead.email}`}
                        className="hover:underline font-medium truncate"
                      >
                        {lead.email}
                      </a>
                    </div>
                  )}
                  {lead.city && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span>{lead.city}</span>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {}
          <Card className="border-2 border-black">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-wide">
                Deal Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    placeholder="Subject"
                    value={editForm.subject || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, subject: e.target.value }))
                    }
                    className="border-2 border-black"
                  />
                  <Input
                    placeholder="Project Type"
                    value={editForm.projectType || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({
                        ...p,
                        projectType: e.target.value,
                      }))
                    }
                    className="border-2 border-black"
                  />
                  <Input
                    placeholder="Budget"
                    value={editForm.budget || ""}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, budget: e.target.value }))
                    }
                    className="border-2 border-black"
                  />
                  <div>
                    <label className="text-xs font-bold mb-1 block">
                      Priority
                    </label>
                    <select
                      value={editForm.priority || "medium"}
                      onChange={(e) =>
                        setEditForm((p) => ({
                          ...p,
                          priority: e.target.value as any,
                        }))
                      }
                      className="w-full px-2 py-1 rounded-md border-2 border-black text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold mb-1 block">
                      Follow-up Date
                    </label>
                    <Input
                      type="date"
                      value={
                        editForm.followUpDate
                          ? String(editForm.followUpDate).slice(0, 10)
                          : ""
                      }
                      onChange={(e) =>
                        setEditForm((p) => ({
                          ...p,
                          followUpDate: e.target.value,
                        }))
                      }
                      className="border-2 border-black"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subject</span>
                    <span className="font-medium text-right max-w-[60%]">
                      {lead.subject || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Project Type</span>
                    <span className="font-medium">
                      {lead.projectType || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-bold text-green-700">
                      {lead.budget ? `₹${lead.budget}` : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Priority</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full border ${priorityColors[lead.priority || "medium"] || ""}`}
                    >
                      {lead.priority || "medium"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Follow-up</span>
                    <span className="font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(lead.followUpDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assigned To</span>
                    <span className="font-medium">
                      {lead.assignedToName || lead.assignedTo || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span className="font-medium">
                      {formatDate(lead.createdAt)}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {}
          {isEditing && (
            <Card className="border-2 border-black">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wide">
                  Tags (comma separated)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="e-commerce, website, urgent"
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
              </CardContent>
            </Card>
          )}
        </div>

        {}
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity">
            <TabsList className="border-2 border-black mb-4 w-full justify-start">
              <TabsTrigger value="activity" className="font-bold">
                Activity
              </TabsTrigger>
              <TabsTrigger value="message" className="font-bold">
                Message
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              {}
              <Card className="border-2 border-black">
                <CardContent className="pt-4 space-y-3">
                  <div className="flex gap-2">
                    {(["note", "call", "email", "meeting"] as const).map(
                      (t) => {
                        const Icon = ACTIVITY_ICONS[t];
                        return (
                          <button
                            key={t}
                            onClick={() =>
                              setNewActivity((p) => ({ ...p, type: t }))
                            }
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
                              newActivity.type === t
                                ? "border-black bg-black text-white"
                                : "border-gray-200 hover:border-gray-400"
                            }`}
                          >
                            <Icon className="w-3 h-3" />
                            {ACTIVITY_LABELS[t]}
                          </button>
                        );
                      },
                    )}
                  </div>
                  <Textarea
                    placeholder={`Log a ${newActivity.type}...`}
                    value={newActivity.content}
                    onChange={(e) =>
                      setNewActivity((p) => ({ ...p, content: e.target.value }))
                    }
                    className="border-2 border-black resize-none min-h-[80px]"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={postActivity}
                      disabled={postingActivity || !newActivity.content.trim()}
                      className="border-2 border-black font-bold"
                    >
                      {postingActivity ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      Log Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {}
              <div className="space-y-3">
                {activities.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-gray-200 rounded-xl">
                    No activities yet. Log a call, note, or meeting to get
                    started.
                  </div>
                )}
                {activities.map((act) => {
                  const Icon = ACTIVITY_ICONS[act.type] || MessageSquare;
                  return (
                    <div key={String(act._id)} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 border-2 border-black rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                            {ACTIVITY_LABELS[act.type] || act.type}
                          </span>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {act.createdAt ? timeAgo(act.createdAt) : ""}
                            {act.createdByName && (
                              <span>· {act.createdByName}</span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">
                          {act.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="message">
              <Card className="border-2 border-black">
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">
                      Original message from lead:
                    </p>
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-sm whitespace-pre-wrap">
                      {lead.message || "No message provided."}
                    </div>
                  </div>
                  {lead.statusReason && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-muted-foreground font-medium">
                        Last status reason:
                      </p>
                      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-sm">
                        {lead.statusReason}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
