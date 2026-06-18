"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building2,
  Users,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  IndianRupee,
  CheckCircle2,
  Clock,
  XCircle,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Types ──────────────────────────────────────────────────────────────────

interface Stats {
  success: boolean;
  generatedAt: string;
  overview: {
    tenants: {
      total: number;
      active: number;
      trial: number;
      inactive: number;
      newLast7Days: number;
      newLast30Days: number;
    };
    subscriptions: {
      total: number;
      active: number;
      trial: number;
      cancelled: number;
      pendingRenewal: number;
      expiringIn7Days: number;
      expiringIn30Days: number;
      expired: number;
    };
    revenue: {
      totalAllTime: number;
      last30Days: number;
      mrr: number;
      arr: number;
      byBillingCycle: {
        monthly: { total: number; count: number };
        yearly: { total: number; count: number };
      };
    };
    employees: {
      total: number;
      active: number;
      avgPerTenant: number;
      maxInOneTenant: number;
    };
    activity: {
      attendanceRecordsLast30Days: number;
      leaveRequestsLast30Days: number;
      payrollsProcessedLast30Days: number;
    };
    planBreakdown: { plan: string; billingCycle: string; count: number }[];
  };
  alerts: {
    expiringIn7Days: AlertTenant[];
    expiringIn30Days: AlertTenant[];
    expired: AlertTenant[];
    trialsActive: TrialTenant[];
  };
  tenants: Tenant[];
}

interface AlertTenant {
  name: string;
  email: string;
  plan: string;
  renewalDate: string;
  lastLogin?: string;
}

interface TrialTenant {
  name: string;
  email: string;
  trialEndDate: string;
  activeEmployees: number;
}

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  city: string;
  state: string;
  status: "active" | "trial" | "inactive";
  lastLogin: string;
  joinedAt: string;
  activeEmployees: number;
  loginUsers: number;
  subscription: {
    plan: string;
    billingCycle: string;
    status: string;
    isTrial: boolean;
    trialEndDate: string | null;
    renewalDate: string;
    maxEmployees: number;
    currentEmployeeCount: number;
    amountPaid: number;
    paymentStatus: string;
    autoRenew: boolean;
    expiringIn7Days: boolean;
    expiringIn30Days: boolean;
    isExpired: boolean;
  };
}

// ── Helpers ────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN").format(n);
}

function fmtCurrency(n: number) {
  return `₹${fmt(n)}`;
}

function fmtDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function statusBadge(status: string, extra?: boolean) {
  if (extra) return <Badge className="bg-red-100 text-red-700 border-red-300 font-bold">EXPIRING</Badge>;
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-700 border-green-300 font-bold">ACTIVE</Badge>;
    case "trial":
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300 font-bold">TRIAL</Badge>;
    case "inactive":
      return <Badge className="bg-gray-100 text-gray-600 border-gray-300 font-bold">INACTIVE</Badge>;
    case "cancelled":
      return <Badge className="bg-red-100 text-red-700 border-red-300 font-bold">CANCELLED</Badge>;
    case "pending_renewal":
      return <Badge className="bg-orange-100 text-orange-700 border-orange-300 font-bold">PENDING RENEWAL</Badge>;
    default:
      return <Badge className="font-bold">{status.toUpperCase()}</Badge>;
  }
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function NestHRSubscriptionsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "tenants" | "alerts">("overview");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/api/nesthr-stats");
      const data = await res.json();
      if (!data.success) throw new Error(data.error ?? "Unknown error");
      // Normalise — fill any missing sub-objects so the page never crashes on undefined
      data.overview = data.overview ?? {};
      data.overview.tenants = data.overview.tenants ?? {};
      data.overview.subscriptions = data.overview.subscriptions ?? {};
      data.overview.revenue = data.overview.revenue ?? {};
      data.overview.revenue.byBillingCycle = data.overview.revenue.byBillingCycle ?? {};
      data.overview.revenue.byBillingCycle.monthly = data.overview.revenue.byBillingCycle.monthly ?? { total: 0, count: 0 };
      data.overview.revenue.byBillingCycle.yearly = data.overview.revenue.byBillingCycle.yearly ?? { total: 0, count: 0 };
      data.overview.employees = data.overview.employees ?? {};
      data.overview.activity = data.overview.activity ?? {};
      data.overview.planBreakdown = data.overview.planBreakdown ?? [];
      data.alerts = data.alerts ?? {};
      data.alerts.expiringIn7Days = data.alerts.expiringIn7Days ?? [];
      data.alerts.expiringIn30Days = data.alerts.expiringIn30Days ?? [];
      data.alerts.expired = data.alerts.expired ?? [];
      data.alerts.trialsActive = data.alerts.trialsActive ?? [];
      data.tenants = data.tenants ?? [];
      setStats(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to load stats");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8" />
          <h1 className="text-4xl font-black tracking-tighter">NEST HR — SUBSCRIPTIONS</h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 border-2 border-black rounded-md bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (error || !stats) {
    return (
      <div className="p-8 space-y-4">
        <h1 className="text-4xl font-black tracking-tighter">NEST HR — SUBSCRIPTIONS</h1>
        <div className="border-2 border-red-400 bg-red-50 rounded-md p-6 flex flex-col gap-3 max-w-lg">
          <p className="font-bold text-red-700 flex items-center gap-2">
            <XCircle className="w-5 h-5" /> {error ?? "No data returned"}
          </p>
          <p className="text-sm text-red-600">
            Make sure <code className="bg-red-100 px-1 rounded">NESTHR_BACKEND_URL</code> and{" "}
            <code className="bg-red-100 px-1 rounded">NESTHR_STATS_SECRET</code> are set in{" "}
            <code className="bg-red-100 px-1 rounded">.env</code>.
          </p>
          <Button onClick={load} size="sm" className="w-fit">Retry</Button>
        </div>
      </div>
    );
  }

  const { overview, alerts, tenants } = stats;
  const ov = overview;

  return (
    <div className="p-6 md:p-8 space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8" />
            <h1 className="text-4xl font-black tracking-tighter">NEST HR</h1>
          </div>
          <p className="text-sm text-muted-foreground font-bold mt-1">
            Platform subscription snapshot · Last updated: {fmtDate(stats.generatedAt)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {alerts.expiringIn7Days.length > 0 && (
            <Badge className="bg-red-100 text-red-700 border-red-400 font-bold text-sm px-3 py-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              {alerts.expiringIn7Days.length} expiring in 7 days
            </Badge>
          )}
          <Button variant="outline" size="sm" onClick={load} className="border-2 border-black font-bold">
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh
          </Button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-2 border-b-2 border-black">
        {(["overview", "tenants", "alerts"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-black uppercase tracking-wider border-2 rounded-t-md transition-all ${
              activeTab === tab
                ? "border-black border-b-white bg-white -mb-0.5"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
            {tab === "alerts" && (alerts.expiringIn7Days.length + alerts.expired.length) > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                {alerts.expiringIn7Days.length + alerts.expired.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* OVERVIEW TAB                                                       */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <div className="space-y-8">

          {/* ── Revenue ── */}
          <div>
            <h2 className="text-xl font-black tracking-tighter mb-3 flex items-center gap-2">
              <IndianRupee className="w-5 h-5" /> Revenue
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-2 border-black bg-green-50">
                <CardHeader className="pb-1 pt-4 px-4">
                  <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-widest">All-Time Revenue</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-3xl font-black tracking-tighter">{fmtCurrency(ov.revenue.totalAllTime)}</p>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">all paid invoices</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-black bg-green-50">
                <CardHeader className="pb-1 pt-4 px-4">
                  <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-widest">Last 30 Days</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-3xl font-black tracking-tighter">{fmtCurrency(ov.revenue.last30Days)}</p>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">collected revenue</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-black bg-blue-50">
                <CardHeader className="pb-1 pt-4 px-4">
                  <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-widest">MRR</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-3xl font-black tracking-tighter">{fmtCurrency(ov.revenue.mrr)}</p>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">monthly recurring</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-black bg-blue-50">
                <CardHeader className="pb-1 pt-4 px-4">
                  <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-widest">ARR</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-3xl font-black tracking-tighter">{fmtCurrency(ov.revenue.arr)}</p>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">annualised recurring</p>
                </CardContent>
              </Card>
            </div>
            {/* Billing cycle split */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Card className="border-2 border-black">
                <CardHeader className="pb-1 pt-4 px-4">
                  <CardTitle className="text-xs font-black uppercase tracking-widest">Monthly Plans</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black">{fmtCurrency(ov.revenue.byBillingCycle.monthly.total)}</p>
                    <p className="text-xs text-muted-foreground font-semibold">{ov.revenue.byBillingCycle.monthly.count} subscribers</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-black">
                <CardHeader className="pb-1 pt-4 px-4">
                  <CardTitle className="text-xs font-black uppercase tracking-widest">Yearly Plans</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black">{fmtCurrency(ov.revenue.byBillingCycle.yearly.total)}</p>
                    <p className="text-xs text-muted-foreground font-semibold">{ov.revenue.byBillingCycle.yearly.count} subscribers</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ── Tenants ── */}
          <div>
            <h2 className="text-xl font-black tracking-tighter mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5" /> Tenants
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Total Companies", value: ov.tenants.total, color: "bg-white" },
                { label: "Active", value: ov.tenants.active, color: "bg-green-50" },
                { label: "On Trial", value: ov.tenants.trial, color: "bg-yellow-50" },
                { label: "Inactive", value: ov.tenants.inactive, color: "bg-gray-50" },
                { label: "New (7 days)", value: ov.tenants.newLast7Days, color: "bg-blue-50" },
                { label: "New (30 days)", value: ov.tenants.newLast30Days, color: "bg-blue-50" },
              ].map((s) => (
                <Card key={s.label} className={`border-2 border-black ${s.color}`}>
                  <CardHeader className="pb-1 pt-4 px-4">
                    <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-widest">{s.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <p className="text-4xl font-black tracking-tighter">{fmt(s.value)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ── Subscriptions ── */}
          <div>
            <h2 className="text-xl font-black tracking-tighter mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Subscriptions
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Active", value: ov.subscriptions.active, color: "bg-green-50" },
                { label: "Trial", value: ov.subscriptions.trial, color: "bg-yellow-50" },
                { label: "Cancelled", value: ov.subscriptions.cancelled, color: "bg-gray-50" },
                { label: "Pending Renewal", value: ov.subscriptions.pendingRenewal, color: "bg-orange-50" },
                { label: "Expiring in 7 Days", value: ov.subscriptions.expiringIn7Days, color: "bg-red-50" },
                { label: "Expiring in 30 Days", value: ov.subscriptions.expiringIn30Days, color: "bg-orange-50" },
                { label: "Expired", value: ov.subscriptions.expired, color: "bg-red-50" },
                { label: "Total", value: ov.subscriptions.total, color: "bg-white" },
              ].map((s) => (
                <Card key={s.label} className={`border-2 border-black ${s.color}`}>
                  <CardHeader className="pb-1 pt-4 px-4">
                    <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-widest">{s.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <p className="text-4xl font-black tracking-tighter">{fmt(s.value)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ── Employees ── */}
          <div>
            <h2 className="text-xl font-black tracking-tighter mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" /> Employees Across Platform
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Employees", value: fmt(ov.employees.total) },
                { label: "Active Employees", value: fmt(ov.employees.active) },
                { label: "Avg per Tenant", value: String(ov.employees.avgPerTenant) },
                { label: "Largest Tenant", value: fmt(ov.employees.maxInOneTenant) },
              ].map((s) => (
                <Card key={s.label} className="border-2 border-black bg-white">
                  <CardHeader className="pb-1 pt-4 px-4">
                    <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-widest">{s.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <p className="text-4xl font-black tracking-tighter">{s.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ── Activity ── */}
          <div>
            <h2 className="text-xl font-black tracking-tighter mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5" /> Platform Activity (Last 30 Days)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Attendance Records", value: ov.activity.attendanceRecordsLast30Days },
                { label: "Leave Requests", value: ov.activity.leaveRequestsLast30Days },
                { label: "Payrolls Processed", value: ov.activity.payrollsProcessedLast30Days },
              ].map((s) => (
                <Card key={s.label} className="border-2 border-black bg-white">
                  <CardHeader className="pb-1 pt-4 px-4">
                    <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-widest">{s.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <p className="text-4xl font-black tracking-tighter">{fmt(s.value)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ── Plan Breakdown ── */}
          <div>
            <h2 className="text-xl font-black tracking-tighter mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> Plan Breakdown
            </h2>
            <Card className="border-2 border-black">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-black bg-muted">
                      <TableHead className="font-black text-xs uppercase tracking-widest">Plan</TableHead>
                      <TableHead className="font-black text-xs uppercase tracking-widest">Billing Cycle</TableHead>
                      <TableHead className="font-black text-xs uppercase tracking-widest text-right">Active Subscribers</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ov.planBreakdown.map((row, i) => (
                      <TableRow key={i} className="border-b border-black/10">
                        <TableCell className="font-bold">{row.plan}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-bold capitalize border-black">
                            {row.billingCycle}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-black text-2xl">{row.count}</TableCell>
                      </TableRow>
                    ))}
                    {ov.planBreakdown.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-8 font-semibold">No plan data</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* TENANTS TAB                                                        */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "tenants" && (
        <div className="space-y-4">
          <p className="text-sm font-bold text-muted-foreground">{tenants.length} companies · newest first</p>
          <Card className="border-2 border-black">
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-black bg-muted">
                    <TableHead className="font-black text-xs uppercase tracking-widest">Company</TableHead>
                    <TableHead className="font-black text-xs uppercase tracking-widest">Status</TableHead>
                    <TableHead className="font-black text-xs uppercase tracking-widest">Plan</TableHead>
                    <TableHead className="font-black text-xs uppercase tracking-widest">Cycle</TableHead>
                    <TableHead className="font-black text-xs uppercase tracking-widest">Employees</TableHead>
                    <TableHead className="font-black text-xs uppercase tracking-widest">Renewal</TableHead>
                    <TableHead className="font-black text-xs uppercase tracking-widest">Last Login</TableHead>
                    <TableHead className="font-black text-xs uppercase tracking-widest text-right">Paid</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenants.map((t) => (
                    <TableRow
                      key={t.id}
                      className={`border-b border-black/10 ${
                        t.subscription.isExpired
                          ? "bg-red-50"
                          : t.subscription.expiringIn7Days
                          ? "bg-orange-50"
                          : ""
                      }`}
                    >
                      <TableCell>
                        <div>
                          <p className="font-bold">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.email}</p>
                          {t.city && (
                            <p className="text-xs text-muted-foreground">{t.city}, {t.state}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{statusBadge(t.status, t.subscription.expiringIn7Days)}</TableCell>
                      <TableCell className="font-bold">{t.subscription.plan}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-bold capitalize border-black text-xs">
                          {t.subscription.billingCycle}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-black">{t.activeEmployees}</span>
                        <span className="text-muted-foreground text-xs"> / {t.subscription.maxEmployees}</span>
                      </TableCell>
                      <TableCell>
                        <span className={t.subscription.isExpired ? "text-red-600 font-black" : "font-semibold"}>
                          {fmtDate(t.subscription.renewalDate)}
                        </span>
                        {t.subscription.isExpired && (
                          <p className="text-xs text-red-500 font-bold">EXPIRED</p>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{fmtDate(t.lastLogin)}</TableCell>
                      <TableCell className="text-right font-black">{fmtCurrency(t.subscription.amountPaid)}</TableCell>
                    </TableRow>
                  ))}
                  {tenants.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-12 text-muted-foreground font-semibold">No tenants found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* ALERTS TAB                                                         */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      {activeTab === "alerts" && (
        <div className="space-y-8">

          {/* Expiring in 7 days */}
          <div>
            <h2 className="text-xl font-black tracking-tighter mb-3 flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" /> Expiring in 7 Days ({alerts.expiringIn7Days.length})
            </h2>
            {alerts.expiringIn7Days.length === 0 ? (
              <p className="text-sm text-muted-foreground font-semibold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> None — all clear</p>
            ) : (
              <AlertTable rows={alerts.expiringIn7Days} />
            )}
          </div>

          {/* Expiring in 30 days */}
          <div>
            <h2 className="text-xl font-black tracking-tighter mb-3 flex items-center gap-2 text-orange-600">
              <Clock className="w-5 h-5" /> Expiring in 30 Days ({alerts.expiringIn30Days.length})
            </h2>
            {alerts.expiringIn30Days.length === 0 ? (
              <p className="text-sm text-muted-foreground font-semibold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> None</p>
            ) : (
              <AlertTable rows={alerts.expiringIn30Days} />
            )}
          </div>

          {/* Expired */}
          <div>
            <h2 className="text-xl font-black tracking-tighter mb-3 flex items-center gap-2 text-red-700">
              <XCircle className="w-5 h-5" /> Expired — Follow Up ({alerts.expired.length})
            </h2>
            {alerts.expired.length === 0 ? (
              <p className="text-sm text-muted-foreground font-semibold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> None</p>
            ) : (
              <AlertTable rows={alerts.expired} showLastLogin />
            )}
          </div>

          {/* Active trials */}
          <div>
            <h2 className="text-xl font-black tracking-tighter mb-3 flex items-center gap-2 text-yellow-600">
              <Clock className="w-5 h-5" /> Active Trials ({alerts.trialsActive.length})
            </h2>
            {alerts.trialsActive.length === 0 ? (
              <p className="text-sm text-muted-foreground font-semibold">No active trials</p>
            ) : (
              <Card className="border-2 border-black">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-black bg-muted">
                        <TableHead className="font-black text-xs uppercase tracking-widest">Company</TableHead>
                        <TableHead className="font-black text-xs uppercase tracking-widest">Email</TableHead>
                        <TableHead className="font-black text-xs uppercase tracking-widest">Trial Ends</TableHead>
                        <TableHead className="font-black text-xs uppercase tracking-widest text-right">Active Employees</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {alerts.trialsActive.map((t, i) => (
                        <TableRow key={i} className="border-b border-black/10 bg-yellow-50">
                          <TableCell className="font-bold">{t.name}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{t.email}</TableCell>
                          <TableCell className="font-semibold">{fmtDate(t.trialEndDate)}</TableCell>
                          <TableCell className="text-right font-black text-xl">{t.activeEmployees}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Alert table sub-component ──────────────────────────────────────────────

function AlertTable({ rows, showLastLogin = false }: { rows: AlertTenant[]; showLastLogin?: boolean }) {
  function fmtDate(d: string) {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  return (
    <Card className="border-2 border-black">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black bg-muted">
              <TableHead className="font-black text-xs uppercase tracking-widest">Company</TableHead>
              <TableHead className="font-black text-xs uppercase tracking-widest">Email</TableHead>
              <TableHead className="font-black text-xs uppercase tracking-widest">Plan</TableHead>
              <TableHead className="font-black text-xs uppercase tracking-widest">Renewal Date</TableHead>
              {showLastLogin && <TableHead className="font-black text-xs uppercase tracking-widest">Last Login</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i} className="border-b border-black/10">
                <TableCell className="font-bold">{r.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{r.email}</TableCell>
                <TableCell className="font-semibold">{r.plan}</TableCell>
                <TableCell className="font-semibold">{fmtDate(r.renewalDate)}</TableCell>
                {showLastLogin && <TableCell className="text-xs text-muted-foreground">{fmtDate(r.lastLogin ?? "")}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
