"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tag,
  Plus,
  Pencil,
  Trash2,
  Eye,
  RefreshCw,
  Gift,
  CheckCircle2,
  XCircle,
  Users,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

interface Offer {
  _id: string;
  code: string;
  description: string;
  bonusMonths: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  expiresAt?: string;
  createdByEmail: string;
  createdAt: string;
  updatedAt: string;
}

interface Usage {
  companyName: string;
  userEmail: string;
  invoiceNumber: string;
  usedAt: string;
}

// ── Status helpers ──────────────────────────────────────────────────────────

function getOfferStatus(offer: Offer): "active" | "exhausted" | "expired" | "inactive" {
  if (!offer.isActive) return "inactive";
  if (offer.expiresAt && new Date(offer.expiresAt) < new Date()) return "expired";
  if (offer.usedCount >= offer.maxUses) return "exhausted";
  return "active";
}

function StatusBadge({ offer }: { offer: Offer }) {
  const status = getOfferStatus(offer);
  const map = {
    active: { label: "Active", className: "bg-green-100 text-green-800 border-green-300" },
    exhausted: { label: "Exhausted", className: "bg-orange-100 text-orange-800 border-orange-300" },
    expired: { label: "Expired", className: "bg-red-100 text-red-800 border-red-300" },
    inactive: { label: "Inactive", className: "bg-gray-100 text-gray-600 border-gray-300" },
  };
  const { label, className } = map[status];
  return (
    <Badge className={`border font-semibold ${className}`}>
      {label}
    </Badge>
  );
}

// ── Input helpers ──────────────────────────────────────────────────────────

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">{label}</label>
      <input
        className="border-2 border-black rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        {...props}
      />
    </div>
  );
}

function Textarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">{label}</label>
      <textarea
        className="border-2 border-black rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
        rows={3}
        {...props}
      />
    </div>
  );
}

// ── Create Form ────────────────────────────────────────────────────────────

function CreateOfferModal({
  open,
  onClose,
  onCreated,
  userEmail,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  userEmail: string;
}) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    code: "",
    description: "",
    bonusMonths: 1,
    maxUses: 100,
    expiresAt: "",
    createdByEmail: userEmail,
  });

  function set(k: string, v: string | number) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const body: Record<string, any> = {
        code: form.code.toUpperCase(),
        description: form.description,
        bonusMonths: Number(form.bonusMonths),
        maxUses: Number(form.maxUses),
        createdByEmail: form.createdByEmail,
      };
      if (form.expiresAt) body.expiresAt = new Date(form.expiresAt).toISOString();

      const res = await apiFetch("/api/hrms-offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to create offer");
      }
      toast({ title: "Offer created successfully" });
      onCreated();
      onClose();
      setForm({ code: "", description: "", bonusMonths: 1, maxUses: 100, expiresAt: "", createdByEmail: userEmail });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-2 border-black">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" /> Create Offer Code
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-4 mt-2">
          <Input
            label="Code"
            value={form.code}
            onChange={(e) => set("code", e.target.value.toUpperCase())}
            placeholder="e.g. SUMMER3"
            required
          />
          <Textarea
            label="Description"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="What does this offer do?"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Bonus Months"
              type="number"
              min={1}
              value={form.bonusMonths}
              onChange={(e) => set("bonusMonths", e.target.value)}
              required
            />
            <Input
              label="Max Uses"
              type="number"
              min={1}
              value={form.maxUses}
              onChange={(e) => set("maxUses", e.target.value)}
              required
            />
          </div>
          <Input
            label="Expires At (optional)"
            type="date"
            value={form.expiresAt}
            onChange={(e) => set("expiresAt", e.target.value)}
          />
          <Input
            label="Your Email"
            type="email"
            value={form.createdByEmail}
            onChange={(e) => set("createdByEmail", e.target.value)}
            required
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="border-2 border-black">
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="border-2 border-black">
              {saving ? "Creating…" : "Create Offer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Edit Modal ──────────────────────────────────────────────────────────────

function EditOfferModal({
  offer,
  onClose,
  onSaved,
}: {
  offer: Offer | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    description: "",
    bonusMonths: 1,
    maxUses: 100,
    isActive: true,
    expiresAt: "",
  });

  useEffect(() => {
    if (offer) {
      setForm({
        description: offer.description,
        bonusMonths: offer.bonusMonths,
        maxUses: offer.maxUses,
        isActive: offer.isActive,
        expiresAt: offer.expiresAt ? offer.expiresAt.slice(0, 10) : "",
      });
    }
  }, [offer]);

  function set(k: string, v: string | number | boolean) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!offer) return;
    setSaving(true);
    try {
      const body: Record<string, any> = {
        description: form.description,
        bonusMonths: Number(form.bonusMonths),
        maxUses: Number(form.maxUses),
        isActive: form.isActive,
      };
      if (form.expiresAt) body.expiresAt = new Date(form.expiresAt).toISOString();
      else body.expiresAt = null;

      const res = await apiFetch(`/api/hrms-offers/${offer._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to update offer");
      }
      toast({ title: "Offer updated" });
      onSaved();
      onClose();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={!!offer} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-2 border-black">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="h-5 w-5" /> Edit Offer — {offer?.code}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="flex flex-col gap-4 mt-2">
          <Textarea
            label="Description"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Bonus Months"
              type="number"
              min={1}
              value={form.bonusMonths}
              onChange={(e) => set("bonusMonths", e.target.value)}
              required
            />
            <Input
              label="Max Uses"
              type="number"
              min={1}
              value={form.maxUses}
              onChange={(e) => set("maxUses", e.target.value)}
              required
            />
          </div>
          <Input
            label="Expires At (optional)"
            type="date"
            value={form.expiresAt}
            onChange={(e) => set("expiresAt", e.target.value)}
          />
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold">Active</label>
            <button
              type="button"
              onClick={() => set("isActive", !form.isActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 border-black transition-colors ${
                form.isActive ? "bg-black" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white border border-black transition-transform ${
                  form.isActive ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm text-gray-500">{form.isActive ? "Active" : "Inactive"}</span>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="border-2 border-black">
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="border-2 border-black">
              {saving ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Usages Modal ───────────────────────────────────────────────────────────

function UsagesModal({
  offerId,
  offerCode,
  onClose,
}: {
  offerId: string | null;
  offerCode: string;
  onClose: () => void;
}) {
  const [usages, setUsages] = useState<Usage[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!offerId) return;
    setLoading(true);
    apiFetch(`/api/hrms-offers/${offerId}`)
      .then((r) => r.json())
      .then((data) => setUsages(data?.offer?.usages ?? data?.usages ?? []))
      .catch(() => toast({ title: "Failed to load usages", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [offerId]);

  return (
    <Dialog open={!!offerId} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl border-2 border-black">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" /> Usages — {offerCode}
          </DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="py-8 text-center text-gray-500">Loading…</div>
        ) : usages.length === 0 ? (
          <div className="py-8 text-center text-gray-500">No usages yet.</div>
        ) : (
          <div className="overflow-auto max-h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Used At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usages.map((u, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{u.companyName}</TableCell>
                    <TableCell>{u.userEmail}</TableCell>
                    <TableCell>{u.invoiceNumber}</TableCell>
                    <TableCell>{new Date(u.usedAt).toLocaleDateString("en-IN")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────

export default function OffersPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editOffer, setEditOffer] = useState<Offer | null>(null);
  const [usagesId, setUsagesId] = useState<string | null>(null);
  const [usagesCode, setUsagesCode] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function fetchOffers() {
    setLoading(true);
    try {
      const res = await apiFetch("/api/hrms-offers");
      const data = await res.json();
      setOffers(data?.offers ?? []);
    } catch {
      toast({ title: "Failed to load offers", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOffers();
  }, []);

  async function toggleActive(offer: Offer) {
    setTogglingId(offer._id);
    try {
      const res = await apiFetch(`/api/hrms-offers/${offer._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !offer.isActive }),
      });
      if (!res.ok) throw new Error("Failed");
      await fetchOffers();
      toast({ title: `Offer ${offer.isActive ? "deactivated" : "activated"}` });
    } catch {
      toast({ title: "Failed to update", variant: "destructive" });
    } finally {
      setTogglingId(null);
    }
  }

  async function deleteOffer() {
    if (!deleteId) return;
    try {
      const res = await apiFetch(`/api/hrms-offers/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      toast({ title: "Offer deleted" });
      setDeleteId(null);
      await fetchOffers();
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  }

  // Stats
  const totalOffers = offers.length;
  const totalActive = offers.filter((o) => getOfferStatus(o) === "active").length;
  const totalUsed = offers.reduce((sum, o) => sum + (o.usedCount ?? 0), 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Tag className="h-6 w-6" /> HRMS Offer Codes
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage discount & bonus offer codes for hrms.pixelatenest.com</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchOffers} className="border-2 border-black gap-2">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
          <Button onClick={() => setShowCreate(true)} className="border-2 border-black gap-2">
            <Plus className="h-4 w-4" /> New Offer
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Offers" value={totalOffers} icon={Tag} />
        <StatCard label="Active Offers" value={totalActive} icon={CheckCircle2} />
        <StatCard label="Total Codes Used" value={totalUsed} icon={Gift} />
      </div>

      {/* Table */}
      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle className="text-base">All Offers</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 text-center text-gray-500">Loading offers…</div>
          ) : offers.length === 0 ? (
            <div className="py-16 text-center text-gray-500">No offers found. Create one to get started.</div>
          ) : (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center">Bonus Months</TableHead>
                    <TableHead className="text-center">Used / Max</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-center">Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offers.map((offer) => (
                    <TableRow key={offer._id}>
                      <TableCell>
                        <span className="font-mono font-bold text-sm bg-gray-100 px-2 py-0.5 rounded border">
                          {offer.code}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm text-gray-600">
                        {offer.description}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        +{offer.bonusMonths}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={offer.usedCount >= offer.maxUses ? "text-orange-600 font-semibold" : ""}>
                          {offer.usedCount} / {offer.maxUses}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusBadge offer={offer} />
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {offer.expiresAt
                          ? new Date(offer.expiresAt).toLocaleDateString("en-IN")
                          : "—"}
                      </TableCell>
                      <TableCell className="text-center">
                        <button
                          onClick={() => toggleActive(offer)}
                          disabled={togglingId === offer._id}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full border-2 border-black transition-colors disabled:opacity-50 ${
                            offer.isActive ? "bg-black" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white border border-black transition-transform ${
                              offer.isActive ? "translate-x-4" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0 border-2 border-black"
                            onClick={() => {
                              setUsagesId(offer._id);
                              setUsagesCode(offer.code);
                            }}
                            title="View usages"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0 border-2 border-black"
                            onClick={() => setEditOffer(offer)}
                            title="Edit"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0 border-2 border-red-500 text-red-600 hover:bg-red-50"
                            onClick={() => setDeleteId(offer._id)}
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <CreateOfferModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={fetchOffers}
        userEmail={user?.email ?? ""}
      />

      <EditOfferModal
        offer={editOffer}
        onClose={() => setEditOffer(null)}
        onSaved={fetchOffers}
      />

      <UsagesModal
        offerId={usagesId}
        offerCode={usagesCode}
        onClose={() => {
          setUsagesId(null);
          setUsagesCode("");
        }}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="border-2 border-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Offer?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the offer code. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-2 border-black">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteOffer}
              className="bg-red-600 hover:bg-red-700 border-2 border-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
