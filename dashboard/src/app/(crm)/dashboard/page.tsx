"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import type { Project, Quotation } from "@/lib/data";
import type { Client } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Helper: month names for display
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const projectChartConfig = {
  count: { label: "Projects" },
  BACKLOG: { label: "Backlog", color: "hsl(var(--chart-1))" },
  "IN PROGRESS": { label: "In Progress", color: "hsl(var(--chart-2))" },
  "IN REVIEW": { label: "In Review", color: "hsl(var(--chart-3))" },
  COMPLETED: { label: "Completed", color: "hsl(var(--chart-4))" },
};

export default function DashboardPage() {
  const { user } = useAuth();

  const isStaff = user?.role === "staff";

  const [stats, setStats] = useState<any[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const token = localStorage.getItem("auth_token") || "";
        const [projectsRes, invoicesRes, leadsRes, quotationsRes, servicesRes, expensesRes] =
          await Promise.all([
            fetch("/api/projects"),
            fetch("/api/invoices"),
            fetch("/api/leads", {
              headers: token ? { Authorization: "Bearer " + token } : {},
            }),
            fetch("/api/quotations"),
            fetch("/api/services"),
            fetch("/api/expenses"),
          ]);
        const [
          projectsData,
          invoicesData,
          leadsData,
          quotationsData,
          servicesData,
          expensesData,
        ] = await Promise.all([
          projectsRes.json(),
          invoicesRes.json(),
          leadsRes.json(),
          quotationsRes.json(),
          servicesRes.json(),
          expensesRes.json(),
        ]);
        if (!mounted) return;
    setProjects(projectsData || []);
    setInvoices(invoicesData || []);
    setExpenses(expensesData || []);
        // ensure leads is an array even if server returned an error object (401 etc)
        setLeads(Array.isArray(leadsData) ? leadsData : []);
        setQuotations(quotationsData || []);
        setServices(servicesData || []);

  // Derived metrics
        const clientsList = await (await fetch("/api/clients")).json();
        setClients(clientsList || []);
        const clientsCount = (clientsList || []).length || 0;
        const projectsCount = (projectsData || []).length || 0;
        const totalRevenue = (invoicesData || []).reduce(
          (s: any, inv: any) => s + Number(inv.amount || 0),
          0
        );
        // Use recorded expenses from the expenses collection for dashboard expense
        const totalExpense = (expensesData || []).reduce(
          (s: any, ex: any) => s + Number(ex.amount || 0),
          0
        );

        setStats([
          {
            name: "clients",
            value: clientsCount,
            change: "+1.1%",
            changeType: "positive",
          },
          {
            name: "projects",
            value: projectsCount,
            change: "+2.4%",
            changeType: "positive",
          },
          {
            name: "revenue",
            value: totalRevenue,
            change: "+4.2%",
            changeType: "positive",
          },
          {
            name: "expense",
            value: totalExpense,
            change: "-0.8%",
            changeType: "negative",
          },
        ]);
      } catch (e) {
        console.error("Failed to load dashboard data", e);
      }
    }

    load();

    const handler = (ev: Event) => {
      const custom = ev as CustomEvent;
      (async () => {
        try {
          if (custom?.detail?.invoices) {
            setInvoices(custom.detail.invoices || []);
            const projectsRes = await fetch("/api/projects");
            const projectsData = await projectsRes.json();
            if (!mounted) return;
            setProjects(projectsData || []);
          } else {
            const [projectsRes, invoicesRes] = await Promise.all([
              fetch("/api/projects"),
              fetch("/api/invoices"),
            ]);
            const [projectsData, invoicesData] = await Promise.all([
              projectsRes.json(),
              invoicesRes.json(),
            ]);
            if (!mounted) return;
            setProjects(projectsData || []);
            setInvoices(invoicesData || []);
          }
        } catch (e) {
          console.error("Failed to refresh dashboard data", e);
        }
      })();
    };

    window.addEventListener("data:changed", handler as EventListener);
    return () => {
      mounted = false;
      window.removeEventListener("data:changed", handler as EventListener);
    };
  }, []);

  // Derived helper data
  const projectStatusCounts = projects.reduce((acc, project) => {
    const status = project.status || "BACKLOG";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const projectChartData = Object.keys(projectStatusCounts).map((status) => ({
    status,
    count: projectStatusCounts[status],
    fill: `hsl(var(--chart-${
      Object.keys(projectStatusCounts).indexOf(status) + 1
    }))`,
  }));

  const leadsByStatus = leads.reduce((acc, lead) => {
    const key = lead.status ?? "NEW";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const serviceUsageCounts = quotations
    .filter((q) => q.status === "APPROVED")
    .flatMap((q) => q.services ?? [])
    .reduce((acc, service) => {
      if (!service) return acc;
      const name = service.name ?? "Unknown";
      acc[name] = (acc[name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const serviceChartData = Object.entries(serviceUsageCounts)
    .map(([service, count]) => ({ service, count }))
    .sort((a, b) => b.count - a.count);

  // Compute revenue per month for the last 6 months from invoices
  const revenueData = (() => {
    const now = new Date();
    const months: { month: string; revenue: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ month: MONTH_NAMES[d.getMonth()], revenue: 0 });
    }

    for (const inv of invoices || []) {
      const created = inv.createdAt ? new Date(inv.createdAt) : null;
      if (!created || Number.isNaN(created.getTime())) continue;
      const monthsAgo =
        (now.getFullYear() - created.getFullYear()) * 12 +
        (now.getMonth() - created.getMonth());
      if (monthsAgo >= 0 && monthsAgo < 6) {
        const idx = 5 - monthsAgo;
        months[idx].revenue += Number(inv.amount || 0);
      }
    }

    return months;
  })();

  const completedProjectChartData = (projects || [])
    .filter((p) => p.status === "COMPLETED")
    .map((p) => ({ title: p.title, amount: Number(p.amount || 0) }));

  // Compute earnings for the logged-in staff user by summing payouts in project.assignees
  const myEarnings = (() => {
    if (!user || user.role !== "staff") return 0;
    const uid = user.id ?? (user._id as any);
    let sum = 0;
    for (const p of projects || []) {
      const ass = p.assignees || [];
      for (const aRaw of ass) {
        const a: any = aRaw as any;
        // assignee id may be stored in multiple shapes; tolerate common keys
        const aid =
          a && (a.id ?? a._id ?? a.teamMemberId ?? a.memberId ?? a.userId ?? a);
        if (!aid) continue;
        if (String(aid) === String(uid)) {
          sum += Number(a.payout || 0);
        }
      }
    }
    return sum;
  })();

  // Breakdown of earnings per project for the logged-in staff user
  const myEarningsByProject = (() => {
    if (!user || user.role !== "staff")
      return [] as {
        projectId: any;
        title: string;
        payout: number;
        clientName?: string;
      }[];
    const uid = user.id ?? (user._id as any);
    const map = new Map<
      string,
      { projectId: any; title: string; payout: number; clientName?: string }
    >();
    for (const p of projects || []) {
      const ass = p.assignees || [];
      for (const aRaw of ass) {
        const a: any = aRaw as any;
        const aid =
          a && (a.id ?? a._id ?? a.teamMemberId ?? a.memberId ?? a.userId ?? a);
        if (!aid) continue;
        if (String(aid) === String(uid)) {
          const pid = String(p._id ?? p.id ?? p.title);
          // resolve client name with multiple fallbacks:
          // 1) explicit p.clientName, 2) p.client as object with .name,
          // 3) p.client or p.clientId treated as id to lookup in clients list,
          // 4) p.client as string fallback, otherwise '-'
          let clientName = (p as any).clientName || "-";
          try {
            if (!clientName || clientName === "-") {
              // case: project.client is an object like { id, name }
              if (
                p.client &&
                typeof p.client === "object" &&
                ((p.client as any).name || (p.client as any).title)
              ) {
                clientName =
                  (p.client as any).name ||
                  (p.client as any).title ||
                  String(p.client);
              } else if (p.client) {
                // p.client may be an id or a string name
                const found = (clients || []).find(
                  (c: any) => String(c.id ?? c._id) === String(p.client)
                );
                clientName = found?.name || String(p.client);
              } else if ((p as any).clientId) {
                const found = (clients || []).find(
                  (c: any) =>
                    String(c.id ?? c._id) === String((p as any).clientId)
                );
                clientName = found?.name || String((p as any).clientId);
              } else {
                clientName = "-";
              }
            }
          } catch (e) {
            clientName = "-";
          }

          const prev = map.get(pid) || {
            projectId: p._id ?? p.id ?? pid,
            title: p.title || "Untitled",
            payout: 0,
            clientName,
          };
          prev.payout += Number(a.payout || 0);
          // keep the clientName (if already present, preserve)
          if (!prev.clientName) prev.clientName = clientName;
          map.set(pid, prev);
        }
      }
    }
    return Array.from(map.values()).sort((a, b) => b.payout - a.payout);
  })();

  return (
    <div className="space-y-8 font-headline">
      <header>
        <h1 className="text-5xl font-black tracking-tighter">DASHBOARD</h1>
        <p className="text-muted-foreground text-lg">
          Real-time pulse of your agency.
        </p>
      </header>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-1 h-auto">
          <TabsTrigger value="overview" className="h-12 text-lg">
            Overview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8 mt-8">
          {isStaff ? (
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle className="text-2xl font-black tracking-tighter">
                    Leads Pipeline
                  </CardTitle>
                  <CardDescription>
                    Current status of all leads.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(leadsByStatus).map(([status, count]) => (
                    <div
                      key={status}
                      className="flex justify-between items-center bg-muted p-3"
                    >
                      <span className="font-bold text-muted-foreground text-lg">
                        {status}
                      </span>
                      <span className="font-black text-3xl">
                        {Number(count)}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle className="text-2xl font-black tracking-tighter">
                    My Earnings
                  </CardTitle>
                  <CardDescription>
                    Total payouts assigned to you across projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-black">
                    ₹{Number(myEarnings || 0).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle className="text-2xl font-black tracking-tighter">
                    Earnings by Project
                  </CardTitle>
                  <CardDescription>
                    Which projects contributed to your earnings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {myEarningsByProject.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                      No assigned payouts found
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Project</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead className="text-right">Payout</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {myEarningsByProject.map((p) => (
                          <TableRow key={String(p.projectId)}>
                            <TableCell className="font-bold">
                              {p.title}
                            </TableCell>
                            <TableCell>{p.clientName || "-"}</TableCell>
                            <TableCell className="text-right font-black">
                              ₹{Number(p.payout || 0).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <Card key={stat.name} className="border-2 border-black">
                    <CardHeader>
                      <CardTitle className="text-base font-bold text-muted-foreground tracking-widest">
                        {stat.name.toUpperCase()}
                      </CardTitle>
                    </CardHeader>
                      <CardContent>
                      <p className="text-5xl font-black tracking-tighter">
                        {stat.name === 'revenue' || stat.name === 'expense' ? 
                          `₹${Number(stat.value || 0).toLocaleString()}` : stat.value}
                      </p>
                      <p
                        className={cn(
                          "text-sm font-bold",
                          stat.changeType === "positive" && "text-success",
                          stat.changeType === "negative" && "text-destructive"
                        )}
                      >
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-2 border-black">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black tracking-tighter">
                      Recent Invoices
                    </CardTitle>
                    <CardDescription>
                      A quick look at the latest billing activity.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Invoice ID</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Project / Title</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.slice(0, 4).map((invoice: any) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-bold">
                              {invoice.id}
                            </TableCell>
                            <TableCell>
                              {invoice.client || invoice.clientName || "-"}
                            </TableCell>
                            <TableCell>
                              {invoice.clientName ||
                                invoice.client ||
                                clients.find(
                                  (c: any) =>
                                    String(c.id ?? c._id) ===
                                    String(invoice.clientId)
                                )?.name ||
                                "-"}
                            </TableCell>
                            <TableCell>
                              {invoice.title || invoice.projectTitle || "-"}
                            </TableCell>
                            <TableCell>
                              ₹{Number(invoice.amount || 0).toLocaleString()}
                            </TableCell>
                            <TableCell className="text-right font-bold">
                              {invoice.status}
                            </TableCell>
                            
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card className="border-2 border-black">
                  <CardHeader>
                    <CardTitle className="text-2xl font-black tracking-tighter">
                      Leads Pipeline
                    </CardTitle>
                    <CardDescription>
                      Current status of all leads.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(leadsByStatus).map(([status, count]) => (
                      <div
                        key={status}
                        className="flex justify-between items-center bg-muted p-3"
                      >
                        <span className="font-bold text-muted-foreground text-lg">
                          {status}
                        </span>
                        <span className="font-black text-3xl">
                          {Number(count)}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        {/* Insert monthly revenue into Overview for non-staff users */}
        { !isStaff && (
          <div className="space-y-8 mt-8">
            <Card className="lg:col-span-2 border-2 border-black">
              <CardHeader>
                <CardTitle className="text-2xl font-black tracking-tighter">
                  MONTHLY REVENUE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData}
                      margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--foreground))"
                        opacity={0.2}
                      />
                      <XAxis
                        dataKey="month"
                        stroke="hsl(var(--foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="hsl(var(--foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `₹${value / 1000}k`}
                      />
                      <Bar dataKey="revenue" radius={[4,4,0,0]}>
                        {revenueData.map((entry, idx) => (
                          <Cell key={entry.month} fill={['#0ea5e9','#7c3aed','#ef4444','#f59e0b','#10b981','#06b6d4'][idx % 6]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Tabs>
    </div>
  );
}
