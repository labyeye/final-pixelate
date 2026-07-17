"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api-fetch";
import { Ticket, Plus, RefreshCw } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

type DiscountType = "bonus_months" | "flat_rate" | "percent_off";

interface OfferCode {
  _id: string;
  code: string;
  description?: string;
  discountType: DiscountType;
  bonusMonths?: number;
  flatRate?: number;
  percentOff?: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  expiresAt?: string | null;
  createdAt: string;
}

const DISCOUNT_LABELS: Record<DiscountType, string> = {
  bonus_months: "Bonus Months",
  flat_rate: "Flat Rate",
  percent_off: "Percent Off",
};

const RATE_PER_STUDENT = 150;

function formatValue(offer: OfferCode) {
  if (offer.discountType === "bonus_months") {
    return `+${offer.bonusMonths ?? 0} month(s)`;
  }
  if (offer.discountType === "flat_rate") {
    return `₹${offer.flatRate ?? 0}/student`;
  }
  return `${offer.percentOff ?? 0}% off`;
}

const emptyForm = {
  code: "",
  description: "",
  discountType: "bonus_months" as DiscountType,
  bonusMonths: "",
  flatRate: "",
  percentOff: "",
  maxUses: "200",
  expiresAt: "",
};

export default function NestSportsCouponsPage() {
  const [coupons, setCoupons] = useState<OfferCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const { toast } = useToast();

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/nestsports-offer-codes");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `Failed to fetch: ${res.status}`);
      setCoupons(data.data ?? []);
    } catch (err: any) {
      toast({
        title: "Fetch Failed",
        description: err.message || "Could not load coupons.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const active = useMemo(() => coupons.filter((c) => c.isActive), [coupons]);
  const totalUses = useMemo(
    () => coupons.reduce((s, c) => s + (c.usedCount ?? 0), 0),
    [coupons],
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim()) {
      toast({ title: "Code required", description: "Enter a coupon code.", variant: "destructive" });
      return;
    }

    const body: Record<string, any> = {
      code: form.code.trim().toUpperCase(),
      description: form.description || undefined,
      discountType: form.discountType,
      maxUses: form.maxUses ? Number(form.maxUses) : undefined,
      expiresAt: form.expiresAt || undefined,
    };
    if (form.discountType === "bonus_months") body.bonusMonths = Number(form.bonusMonths);
    if (form.discountType === "flat_rate") body.flatRate = Number(form.flatRate);
    if (form.discountType === "percent_off") body.percentOff = Number(form.percentOff);

    setSubmitting(true);
    try {
      const res = await apiFetch("/api/nestsports-offer-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `Failed to create: ${res.status}`);
      toast({ title: "Coupon Created", description: `${body.code} is ready to use.` });
      setForm(emptyForm);
      fetchCoupons();
    } catch (err: any) {
      toast({
        title: "Create Failed",
        description: err.message || "Could not create coupon.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (offer: OfferCode) => {
    const next = !offer.isActive;
    setCoupons((prev) =>
      prev.map((c) => (c._id === offer._id ? { ...c, isActive: next } : c)),
    );
    try {
      const res = await apiFetch(`/api/nestsports-offer-codes/${offer._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `Failed to update: ${res.status}`);
    } catch (err: any) {
      setCoupons((prev) =>
        prev.map((c) => (c._id === offer._id ? { ...c, isActive: !next } : c)),
      );
      toast({
        title: "Update Failed",
        description: err.message || "Could not update coupon.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8 font-headline">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">NEST SPORTS COUPONS</h1>
          <p className="text-muted-foreground text-sm">
            Manage discount coupons for Nest Sports subscriptions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={fetchCoupons} disabled={loading}>
            <RefreshCw className={cn("w-4 h-4 mr-1", loading && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Ticket} label="TOTAL COUPONS" value={coupons.length} sub={`${coupons.length} records`} iconVariant="primary" />
        <StatCard icon={Ticket} label="ACTIVE" value={active.length} sub={`${active.length} live`} iconVariant="secondary" />
        <StatCard icon={Ticket} label="TOTAL REDEMPTIONS" value={totalUses} sub="across all coupons" iconVariant="primary" />
        <StatCard icon={Ticket} label="PRICING" value="₹150" sub="per student/year, all features" iconVariant="secondary" />
      </div>

      {/* Create form */}
      <form
        onSubmit={handleCreate}
        className="border-2 border-black bg-white p-4 space-y-4"
      >
        <h2 className="text-lg font-black flex items-center gap-2">
          <Plus className="w-4 h-4" /> NEW COUPON
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              value={form.code}
              onChange={(e) =>
                setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))
              }
              placeholder="SUMMER2026"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Optional note"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Discount Type</Label>
          <RadioGroup
            value={form.discountType}
            onValueChange={(v) =>
              setForm((f) => ({ ...f, discountType: v as DiscountType }))
            }
            className="flex flex-wrap gap-6"
          >
            {(Object.keys(DISCOUNT_LABELS) as DiscountType[]).map((type) => (
              <div key={type} className="flex items-center gap-2">
                <RadioGroupItem value={type} id={type} />
                <Label htmlFor={type} className="font-normal cursor-pointer">
                  {DISCOUNT_LABELS[type]}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {form.discountType === "bonus_months" && (
            <div className="space-y-1">
              <Label htmlFor="bonusMonths">Bonus Months</Label>
              <Input
                id="bonusMonths"
                type="number"
                min={1}
                value={form.bonusMonths}
                onChange={(e) => setForm((f) => ({ ...f, bonusMonths: e.target.value }))}
                required
              />
            </div>
          )}
          {form.discountType === "flat_rate" && (
            <div className="space-y-1">
              <Label htmlFor="flatRate">Flat Rate (₹ per student)</Label>
              <Input
                id="flatRate"
                type="number"
                min={0}
                value={form.flatRate}
                onChange={(e) => setForm((f) => ({ ...f, flatRate: e.target.value }))}
                placeholder="e.g. 100"
                required
              />
              <p className="text-xs text-muted-foreground">
                ₹{RATE_PER_STUDENT} → ₹{form.flatRate || "?"} per student/year.
              </p>
            </div>
          )}
          {form.discountType === "percent_off" && (
            <div className="space-y-1">
              <Label htmlFor="percentOff">Percent Off</Label>
              <Input
                id="percentOff"
                type="number"
                min={1}
                max={100}
                value={form.percentOff}
                onChange={(e) => setForm((f) => ({ ...f, percentOff: e.target.value }))}
                required
              />
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="maxUses">Max Uses</Label>
            <Input
              id="maxUses"
              type="number"
              min={1}
              value={form.maxUses}
              onChange={(e) => setForm((f) => ({ ...f, maxUses: e.target.value }))}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="expiresAt">Expiry Date</Label>
            <Input
              id="expiresAt"
              type="date"
              value={form.expiresAt}
              onChange={(e) => setForm((f) => ({ ...f, expiresAt: e.target.value }))}
            />
          </div>
        </div>

        <Button type="submit" disabled={submitting}>
          {submitting ? "Creating…" : "Create Coupon"}
        </Button>
      </form>

      {/* Table */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black">EXISTING COUPONS</h2>
        <Button size="sm" variant="outline" onClick={fetchCoupons} disabled={loading}>
          <RefreshCw className={cn("w-4 h-4 mr-1", loading && "animate-spin")} />
          Refresh
        </Button>
      </div>

      <div className="border-2 border-black overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black">
              <TableHead className="text-sm font-bold">Code</TableHead>
              <TableHead className="text-sm font-bold">Type</TableHead>
              <TableHead className="text-sm font-bold">Value</TableHead>
              <TableHead className="text-sm font-bold">Used / Max</TableHead>
              <TableHead className="text-sm font-bold">Expires</TableHead>
              <TableHead className="text-right text-sm font-bold">Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground font-bold">
                  Loading coupons…
                </TableCell>
              </TableRow>
            )}
            {!loading && coupons.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground font-bold">
                  No coupons yet.
                </TableCell>
              </TableRow>
            )}
            {coupons.map((offer) => (
              <TableRow key={offer._id} className="border-b-2 border-black last:border-b-0">
                <TableCell className="font-bold text-sm py-2">
                  {offer.code}
                  {offer.description && (
                    <div className="text-xs text-muted-foreground font-normal">
                      {offer.description}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-sm py-2">{DISCOUNT_LABELS[offer.discountType]}</TableCell>
                <TableCell className="text-sm py-2">{formatValue(offer)}</TableCell>
                <TableCell className="text-sm py-2">
                  {offer.usedCount} / {offer.maxUses}
                </TableCell>
                <TableCell className="text-sm py-2">
                  {offer.expiresAt ? new Date(offer.expiresAt).toLocaleDateString() : "—"}
                </TableCell>
                <TableCell className="text-right py-2">
                  <Switch checked={offer.isActive} onCheckedChange={() => toggleActive(offer)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
