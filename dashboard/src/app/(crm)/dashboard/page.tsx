"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-fetch";
import { useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Project, Quotation } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamMembersSection } from "@/components/dashboard/team-members-section";
import { TrendsSection } from "@/components/dashboard/trends-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Briefcase,
  IndianRupee,
  CalendarDays,
  ListTodo,
  TrendingUp,
  User,
  Settings,
  CheckCircle2,
  Clock,
  Link,
  Users,
  FileText,
  TrendingDown,
  Target,
  Activity,
  DollarSign,
  FileCheck,
  Building2,
  CreditCard,
  BarChart3,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { navGroups, defaultStaffAllowed } from "@/lib/nav-config";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function AnimatedNumber({
  value,
  duration = 800,
  currency = false,
}: {
  value: number;
  duration?: number;
  currency?: boolean;
}) {
  const ref = useRef<number | null>(null);
  const [display, setDisplay] = useState<number>(0);
  useEffect(() => {
    let start: number | null = null;
    const to = Number(value || 0);
    if (to === 0) {
      setDisplay(0);
      return;
    }
    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = Math.min(duration, ts - start);
      const cur = Math.round((elapsed / duration) * to);
      setDisplay(cur);
      if (elapsed < duration) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current as any);
    };
  }, [value, duration]);
  return (
    <>{currency ? `₹${Number(display || 0).toLocaleString()}` : display}</>
  );
}

const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="bg-[#1a3a8f] text-white py-3 px-4 flex items-center gap-2">
    <Icon className="w-4 h-4" />
    <span className="text-sm font-black tracking-widest">{title}</span>
  </div>
);

const statusColor: Record<string, string> = {
  COMPLETED: "bg-green-100 text-green-700 border-green-300",
  "IN PROGRESS": "bg-blue-100 text-blue-700 border-blue-300",
  "IN REVIEW": "bg-yellow-100 text-yellow-700 border-yellow-300",
  BACKLOG: "bg-gray-100 text-gray-600 border-gray-300",
};

const taskStatusColor: Record<string, string> = {
  COMPLETED: "bg-green-100 text-green-700 border-green-300",
  DONE: "bg-green-100 text-green-700 border-green-300",
  IN_PROGRESS: "bg-blue-100 text-blue-700 border-blue-300",
  "IN PROGRESS": "bg-blue-100 text-blue-700 border-blue-300",
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
  TODO: "bg-gray-100 text-gray-600 border-gray-300",
};

// ─── Tab content components ───────────────────────────────────────────────────

function OverviewTab({
  user,
  myProjects,
  myTasks,
  earningsByProject,
  totalEarnings,
  projInProgress,
  projCompleted,
}: any) {
  const taskDone = myTasks.filter(
    (t: any) => t.status === "COMPLETED" || t.status === "DONE",
  ).length;
  const taskPending = myTasks.filter(
    (t: any) =>
      t.status === "PENDING" ||
      t.status === "TODO" ||
      t.status === "IN_PROGRESS" ||
      t.status === "IN PROGRESS",
  ).length;
  const taskOverdue = myTasks.filter((t: any) => {
    if (!t.dueDate) return false;
    return (
      new Date(t.dueDate) < new Date() &&
      t.status !== "COMPLETED" &&
      t.status !== "DONE"
    );
  }).length;

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left col */}
      <div className="space-y-4">
        <Card className="border-2 border-black">
          <SectionHeader icon={User} title="PERSONAL INFORMATION" />
          <CardContent className="p-0">
            {[
              { label: "FULL NAME", value: user?.name || "—" },
              { label: "EMAIL", value: user?.email || "—" },
              { label: "ROLE", value: user?.role?.toUpperCase() || "—" },
              { label: "JOB ROLE", value: user?.jobRole || "—" },
              { label: "JOINED", value: joinedDate },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="px-4 py-3 border-b border-gray-100 last:border-0"
              >
                <p className="text-[10px] font-black text-muted-foreground tracking-widest">
                  {label}
                </p>
                <p className="font-bold text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <SectionHeader icon={TrendingUp} title="TASK SUMMARY" />
          <CardContent className="p-0">
            {[
              {
                label: "TOTAL TASKS",
                value: myTasks.length,
                color: "text-foreground",
              },
              {
                label: "COMPLETED",
                value: taskDone,
                color: "text-green-600",
              },
              {
                label: "IN PROGRESS / PENDING",
                value: taskPending,
                color: "text-blue-600",
              },
              {
                label: "OVERDUE",
                value: taskOverdue,
                color: "text-red-500",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="px-4 py-3 border-b border-gray-100 last:border-0 flex justify-between items-center"
              >
                <p className="text-[10px] font-black text-muted-foreground tracking-widest">
                  {label}
                </p>
                <p className={cn("font-black text-xl", color)}>{value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Right col */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: "MY PROJECTS",
              value: myProjects.length,
              sub: `${projInProgress} in progress`,
              accent: "border-l-blue-500",
            },
            {
              label: "COMPLETED",
              value: projCompleted,
              sub: `${myProjects.length - projCompleted} remaining`,
              accent: "border-l-green-500",
            },
            {
              label: "TOTAL EARNINGS",
              value: `₹${totalEarnings.toLocaleString()}`,
              sub: `across ${earningsByProject.filter((e: any) => e.payout > 0).length} projects`,
              accent: "border-l-[#1a3a8f]",
            },
          ].map(({ label, value, sub, accent }) => (
            <Card
              key={label}
              className={cn("border-2 border-black border-l-4", accent)}
            >
              <CardContent className="p-4">
                <p className="text-[10px] font-black text-muted-foreground tracking-widest mb-2">
                  {label}
                </p>
                <p className="text-3xl font-black">{value}</p>
                <p className="text-xs text-muted-foreground mt-1 font-bold">
                  {sub}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-2 border-black">
          <SectionHeader icon={Briefcase} title="MY ASSIGNED PROJECTS" />
          <CardContent className="p-0">
            {myProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground p-4">
                No projects assigned yet.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-[10px] font-black tracking-widest">
                      PROJECT
                    </TableHead>
                    <TableHead className="text-[10px] font-black tracking-widest">
                      CLIENT
                    </TableHead>
                    <TableHead className="text-[10px] font-black tracking-widest">
                      STATUS
                    </TableHead>
                    <TableHead className="text-[10px] font-black tracking-widest text-right">
                      PAYOUT
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {earningsByProject.map((p: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell className="font-bold text-sm">
                        {p.title}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {p.client}
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "text-[10px] font-black px-2 py-0.5 rounded border",
                            statusColor[p.status] ||
                              "bg-gray-100 text-gray-600 border-gray-300",
                          )}
                        >
                          {p.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-black">
                        {p.payout > 0 ? `₹${p.payout.toLocaleString()}` : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <SectionHeader icon={ListTodo} title="RECENT TASKS" />
          <CardContent className="p-0">
            {myTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground p-4">
                No tasks assigned yet.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-[10px] font-black tracking-widest">
                      TASK
                    </TableHead>
                    <TableHead className="text-[10px] font-black tracking-widest">
                      STATUS
                    </TableHead>
                    <TableHead className="text-[10px] font-black tracking-widest">
                      PRIORITY
                    </TableHead>
                    <TableHead className="text-[10px] font-black tracking-widest text-right">
                      DUE DATE
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myTasks.slice(0, 8).map((t: any, i: number) => {
                    const isOverdue =
                      t.dueDate &&
                      new Date(t.dueDate) < new Date() &&
                      t.status !== "COMPLETED" &&
                      t.status !== "DONE";
                    return (
                      <TableRow key={i}>
                        <TableCell className="font-bold text-sm">
                          {t.title}
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "text-[10px] font-black px-2 py-0.5 rounded border",
                              taskStatusColor[t.status] ||
                                "bg-gray-100 text-gray-600 border-gray-300",
                            )}
                          >
                            {t.status || "TODO"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "text-[10px] font-black px-2 py-0.5 rounded border",
                              t.priority === "HIGH"
                                ? "bg-red-100 text-red-700 border-red-300"
                                : t.priority === "MEDIUM"
                                  ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                                  : "bg-gray-100 text-gray-600 border-gray-300",
                            )}
                          >
                            {t.priority || "LOW"}
                          </span>
                        </TableCell>
                        <TableCell
                          className={cn(
                            "text-right text-sm font-bold",
                            isOverdue ? "text-red-500" : "",
                          )}
                        >
                          {t.dueDate
                            ? new Date(t.dueDate).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MyProjectsTab({ earningsByProject, myProjects }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(["BACKLOG", "IN PROGRESS", "IN REVIEW", "COMPLETED"] as string[]).map(
          (s) => {
            const count = myProjects.filter(
              (p: any) => (p.status || "BACKLOG") === s,
            ).length;
            return (
              <Card key={s} className="border-2 border-black">
                <CardContent className="p-4">
                  <p className="text-[10px] font-black text-muted-foreground tracking-widest mb-2">
                    {s}
                  </p>
                  <p
                    className={cn(
                      "text-3xl font-black",
                      s === "COMPLETED"
                        ? "text-green-600"
                        : s === "IN PROGRESS"
                          ? "text-blue-600"
                          : s === "IN REVIEW"
                            ? "text-yellow-600"
                            : "text-gray-500",
                    )}
                  >
                    {count}
                  </p>
                </CardContent>
              </Card>
            );
          },
        )}
      </div>

      <Card className="border-2 border-black">
        <SectionHeader icon={Briefcase} title="ALL MY PROJECTS" />
        <CardContent className="p-0">
          {myProjects.length === 0 ? (
            <p className="text-sm text-muted-foreground p-6">
              No projects assigned to you yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-[10px] font-black tracking-widest">
                    PROJECT
                  </TableHead>
                  <TableHead className="text-[10px] font-black tracking-widest">
                    CLIENT
                  </TableHead>
                  <TableHead className="text-[10px] font-black tracking-widest">
                    STATUS
                  </TableHead>
                  <TableHead className="text-[10px] font-black tracking-widest">
                    DEADLINE
                  </TableHead>
                  <TableHead className="text-[10px] font-black tracking-widest text-right">
                    PAYOUT
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {earningsByProject.map((p: any, i: number) => (
                  <TableRow key={i}>
                    <TableCell className="font-bold">{p.title}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {p.client}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "text-[10px] font-black px-2 py-0.5 rounded border",
                          statusColor[p.status] ||
                            "bg-gray-100 text-gray-600 border-gray-300",
                        )}
                      >
                        {p.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {p.deadline
                        ? new Date(p.deadline).toLocaleDateString("en-IN")
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right font-black">
                      {p.payout > 0 ? `₹${p.payout.toLocaleString()}` : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function MyTasksTab({ myTasks }: { myTasks: any[] }) {
  const [filter, setFilter] = useState("ALL");
  const statuses = [
    "ALL",
    "TODO",
    "IN PROGRESS",
    "IN_PROGRESS",
    "PENDING",
    "COMPLETED",
    "DONE",
  ];
  const displayStatuses = [
    "ALL",
    "TODO",
    "IN PROGRESS",
    "PENDING",
    "COMPLETED",
    "DONE",
  ];

  const filtered =
    filter === "ALL"
      ? myTasks
      : myTasks.filter(
          (t) =>
            t.status === filter ||
            (filter === "IN PROGRESS" && t.status === "IN_PROGRESS"),
        );

  const overdue = myTasks.filter(
    (t) =>
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== "COMPLETED" &&
      t.status !== "DONE",
  ).length;

  return (
    <div className="space-y-5">
      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "TOTAL", value: myTasks.length, color: "text-foreground" },
          {
            label: "COMPLETED",
            value: myTasks.filter(
              (t) => t.status === "COMPLETED" || t.status === "DONE",
            ).length,
            color: "text-green-600",
          },
          {
            label: "PENDING",
            value: myTasks.filter(
              (t) =>
                t.status === "PENDING" ||
                t.status === "TODO" ||
                t.status === "IN_PROGRESS" ||
                t.status === "IN PROGRESS",
            ).length,
            color: "text-blue-600",
          },
          { label: "OVERDUE", value: overdue, color: "text-red-500" },
        ].map(({ label, value, color }) => (
          <Card key={label} className="border-2 border-black">
            <CardContent className="p-4">
              <p className="text-[10px] font-black text-muted-foreground tracking-widest mb-1">
                {label}
              </p>
              <p className={cn("text-3xl font-black", color)}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap">
        {displayStatuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "text-[10px] font-black px-3 py-1.5 border-2 tracking-widest transition-colors",
              filter === s
                ? "bg-[#1a3a8f] text-white border-[#1a3a8f]"
                : "border-black text-muted-foreground hover:bg-muted",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <Card className="border-2 border-black">
        <SectionHeader icon={ListTodo} title="MY TASKS" />
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground p-6">No tasks found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-[10px] font-black tracking-widest">
                    TASK
                  </TableHead>
                  <TableHead className="text-[10px] font-black tracking-widest">
                    STATUS
                  </TableHead>
                  <TableHead className="text-[10px] font-black tracking-widest">
                    PRIORITY
                  </TableHead>
                  <TableHead className="text-[10px] font-black tracking-widest text-right">
                    DUE DATE
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t: any, i: number) => {
                  const isOverdue =
                    t.dueDate &&
                    new Date(t.dueDate) < new Date() &&
                    t.status !== "COMPLETED" &&
                    t.status !== "DONE";
                  return (
                    <TableRow key={i}>
                      <TableCell className="font-bold">{t.title}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "text-[10px] font-black px-2 py-0.5 rounded border",
                            taskStatusColor[t.status] ||
                              "bg-gray-100 text-gray-600 border-gray-300",
                          )}
                        >
                          {t.status || "TODO"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "text-[10px] font-black px-2 py-0.5 rounded border",
                            t.priority === "HIGH"
                              ? "bg-red-100 text-red-700 border-red-300"
                              : t.priority === "MEDIUM"
                                ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                                : "bg-gray-100 text-gray-600 border-gray-300",
                          )}
                        >
                          {t.priority || "LOW"}
                        </span>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-right text-sm font-bold",
                          isOverdue ? "text-red-500" : "",
                        )}
                      >
                        {t.dueDate
                          ? new Date(t.dueDate).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                        {isOverdue && (
                          <span className="ml-1 text-[10px] text-red-500 font-black">
                            OVERDUE
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function EarningsTab({
  earningsByProject,
  totalEarnings,
}: {
  earningsByProject: any[];
  totalEarnings: number;
}) {
  const paid = earningsByProject.filter(
    (p) => p.status === "COMPLETED" && p.payout > 0,
  );
  const pending = earningsByProject.filter(
    (p) => p.status !== "COMPLETED" && p.payout > 0,
  );
  const paidTotal = paid.reduce((s, p) => s + p.payout, 0);
  const pendingTotal = pending.reduce((s, p) => s + p.payout, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "TOTAL EARNINGS",
            value: `₹${totalEarnings.toLocaleString()}`,
            color: "text-[#1a3a8f]",
            accent: "border-l-[#1a3a8f]",
          },
          {
            label: "FROM COMPLETED",
            value: `₹${paidTotal.toLocaleString()}`,
            color: "text-green-600",
            accent: "border-l-green-500",
          },
          {
            label: "PENDING (IN PROGRESS)",
            value: `₹${pendingTotal.toLocaleString()}`,
            color: "text-yellow-600",
            accent: "border-l-yellow-500",
          },
        ].map(({ label, value, color, accent }) => (
          <Card
            key={label}
            className={cn("border-2 border-black border-l-4", accent)}
          >
            <CardContent className="p-5">
              <p className="text-[10px] font-black text-muted-foreground tracking-widest mb-2">
                {label}
              </p>
              <p className={cn("text-4xl font-black", color)}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-black">
        <SectionHeader
          icon={IndianRupee}
          title="EARNINGS BREAKDOWN BY PROJECT"
        />
        <CardContent className="p-0">
          {earningsByProject.filter((e) => e.payout > 0).length === 0 ? (
            <p className="text-sm text-muted-foreground p-6">
              No payouts assigned yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-[10px] font-black tracking-widest">
                    PROJECT
                  </TableHead>
                  <TableHead className="text-[10px] font-black tracking-widest">
                    CLIENT
                  </TableHead>
                  <TableHead className="text-[10px] font-black tracking-widest">
                    STATUS
                  </TableHead>
                  <TableHead className="text-[10px] font-black tracking-widest text-right">
                    PAYOUT
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {earningsByProject
                  .filter((e) => e.payout > 0)
                  .sort((a, b) => b.payout - a.payout)
                  .map((p, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-bold">{p.title}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {p.client}
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "text-[10px] font-black px-2 py-0.5 rounded border",
                            statusColor[p.status] ||
                              "bg-gray-100 text-gray-600 border-gray-300",
                          )}
                        >
                          {p.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-black text-[#1a3a8f]">
                        ₹{p.payout.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsTab({ user }: { user: any }) {
  const allowedPages: string[] =
    Array.isArray(user?.allowedPages) && user.allowedPages.length > 0
      ? user.allowedPages
      : [];

  // Build a map of all nav items for quick lookup
  const allItems = navGroups.flatMap((g) =>
    g.items.map((item) => ({ ...item, group: g.title })),
  );

  // Filter to only those the user is allowed
  const allowed = allItems.filter((item) => allowedPages.includes(item.href));

  // Group them by nav group title
  const grouped = navGroups
    .map((g) => ({
      title: g.title,
      items: g.items.filter((item) => allowedPages.includes(item.href)),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="space-y-6 max-w-2xl">
      <Card className="border-2 border-black">
        <SectionHeader icon={Settings} title="MY ACCESS & PERMISSIONS" />
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground mb-4">
            These are the pages and sections you have access to. Contact your
            admin to request additional access.
          </p>
          <div className="space-y-5">
            {grouped.map((group) => (
              <div key={group.title}>
                <p className="text-[10px] font-black tracking-widest text-muted-foreground mb-2 uppercase">
                  {group.title}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <div
                      key={item.href}
                      className="flex items-center gap-3 px-3 py-2 border border-gray-200 bg-green-50"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      <item.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="font-bold text-sm">{item.label}</span>
                      <span className="ml-auto text-[10px] text-muted-foreground font-mono">
                        {item.href}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {allowed.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No specific pages assigned. Contact your admin.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="border-2 border-black">
        <SectionHeader icon={User} title="ACCOUNT SETTINGS" />
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground mb-3">
            To update your profile picture, name, email or password, visit your
            profile page.
          </p>
          <a
            href="/profile"
            className="inline-flex items-center gap-2 border-2 border-black bg-[#1a3a8f] text-white px-4 py-2 text-sm font-black hover:bg-[#152d6e] transition-colors"
          >
            <User className="w-4 h-4" />
            GO TO PROFILE
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Staff Dashboard shell ────────────────────────────────────────────────────
function StaffDashboard({
  user,
  projects,
  tasks,
  clients,
}: {
  user: any;
  projects: any[];
  tasks: any[];
  clients: any[];
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const uid = String(user?.id ?? user?._id ?? "");

  const myProjects = projects.filter((p) =>
    (p.assignees || []).some((a: any) => String(a.id ?? a._id ?? a) === uid),
  );

  const myTasks = tasks.filter(
    (t) => String(t.assigneeId ?? t.userId ?? "") === uid,
  );

  let totalEarnings = 0;
  const earningsByProject: {
    title: string;
    client: string;
    payout: number;
    status: string;
    deadline?: string;
  }[] = [];
  for (const p of myProjects) {
    const assignee = (p.assignees || []).find(
      (a: any) => String(a.id ?? a._id ?? a) === uid,
    );
    const payout = Number(assignee?.payout || 0);
    const clientName =
      p.clientName ||
      clients.find(
        (c: any) => String(c._id ?? c.id) === String(p.clientId ?? p.client),
      )?.name ||
      "-";
    totalEarnings += payout;
    earningsByProject.push({
      title: p.title || "Untitled",
      client: clientName,
      payout,
      status: p.status || "BACKLOG",
      deadline: p.deadline || p.dueDate,
    });
  }

  const projInProgress = myProjects.filter(
    (p) => p.status === "IN PROGRESS",
  ).length;
  const projCompleted = myProjects.filter(
    (p) => p.status === "COMPLETED",
  ).length;

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  const TABS = [
    { id: "overview", label: "OVERVIEW", icon: User },
    { id: "projects", label: "MY PROJECTS", icon: Briefcase },
    { id: "tasks", label: "MY TASKS", icon: ListTodo },
    { id: "earnings", label: "EARNINGS", icon: IndianRupee },
    { id: "settings", label: "SETTINGS", icon: Settings },
  ];

  return (
    <div className="space-y-0 font-headline">
      {/* ── Hero Banner ── */}
      <div className="relative bg-[#1a3a8f] overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,.15) 10px,rgba(255,255,255,.15) 11px)",
          }}
        />
        <div className="relative flex flex-col sm:flex-row items-center gap-5 px-6 py-5">
          <div className="shrink-0">
            <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
              <AvatarImage
                src={user?.avatar || undefined}
                alt={user?.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-white text-[#1a3a8f] text-4xl font-black">
                {user?.name?.charAt(0).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="text-3xl font-black tracking-tight text-white uppercase">
                {user?.name || "Staff Member"}
              </h1>
              <span className="text-xs font-bold bg-green-400 text-green-900 px-2 py-0.5 uppercase tracking-wider">
                Active
              </span>
            </div>
            <p className="text-blue-200 text-sm font-bold mt-1 uppercase tracking-wider">
              {user?.jobRole || user?.role || "Staff"} ·{" "}
              {user?.role?.toUpperCase() || "STAFF"}
            </p>
          </div>

          <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
            {[
              {
                icon: IndianRupee,
                label: "EARNINGS",
                value: `₹${totalEarnings.toLocaleString()}`,
                valueClass: "text-white",
              },
              {
                icon: CalendarDays,
                label: "JOINED",
                value: joinedDate,
                valueClass: "text-white",
              },
              {
                icon: Briefcase,
                label: "PROJECTS",
                value: myProjects.length,
                valueClass: "text-cyan-300",
              },
            ].map(({ icon: Icon, label, value, valueClass }) => (
              <div
                key={label}
                className="border-2 border-white/40 bg-white/10 text-white px-4 py-2 text-center min-w-[90px]"
              >
                <div className="flex items-center justify-center gap-1 text-blue-200 text-[10px] font-black mb-1 tracking-widest">
                  <Icon className="w-3 h-3" />
                  {label}
                </div>
                <p className={cn("text-base font-black", valueClass)}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className="flex border-b-2 border-black bg-white overflow-x-auto">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 text-xs font-black tracking-widest border-r-2 border-black whitespace-nowrap transition-colors",
              activeTab === id
                ? "bg-[#1a3a8f] text-white"
                : "text-muted-foreground hover:bg-muted",
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div className="pt-6">
        {activeTab === "overview" && (
          <OverviewTab
            user={user}
            myProjects={myProjects}
            myTasks={myTasks}
            earningsByProject={earningsByProject}
            totalEarnings={totalEarnings}
            projInProgress={projInProgress}
            projCompleted={projCompleted}
          />
        )}
        {activeTab === "projects" && (
          <MyProjectsTab
            myProjects={myProjects}
            earningsByProject={earningsByProject}
          />
        )}
        {activeTab === "tasks" && <MyTasksTab myTasks={myTasks} />}
        {activeTab === "earnings" && (
          <EarningsTab
            earningsByProject={earningsByProject}
            totalEarnings={totalEarnings}
          />
        )}
        {activeTab === "settings" && <SettingsTab user={user} />}
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
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
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [nesthrStats, setNesthrStats] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [
          projectsRes,
          invoicesRes,
          leadsRes,
          quotationsRes,
          expensesRes,
          teamMembersRes,
          tasksRes,
        ] = await Promise.all([
          apiFetch("/api/projects"),
          apiFetch("/api/invoices"),
          apiFetch("/api/leads"),
          apiFetch("/api/quotations"),
          apiFetch("/api/expenses"),
          apiFetch("/api/users"),
          apiFetch("/api/tasks"),
        ]);
        const [
          projectsData,
          invoicesData,
          leadsData,
          quotationsData,
          expensesData,
          teamMembersData,
          tasksData,
        ] = await Promise.all([
          projectsRes.json(),
          invoicesRes.json(),
          leadsRes.json(),
          quotationsRes.json(),
          expensesRes.json(),
          teamMembersRes.json(),
          tasksRes.json(),
        ]);
        if (!mounted) return;
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setInvoices(Array.isArray(invoicesData) ? invoicesData : []);
        setExpenses(Array.isArray(expensesData) ? expensesData : []);
        setLeads(Array.isArray(leadsData) ? leadsData : []);
        setQuotations(Array.isArray(quotationsData) ? quotationsData : []);
        setTeamMembers(Array.isArray(teamMembersData) ? teamMembersData : []);
        setTasks(Array.isArray(tasksData) ? tasksData : []);

        const [clientsList, nesthrRes] = await Promise.all([
          apiFetch("/api/clients").then((r) => r.json()),
          apiFetch("/api/nesthr-stats")
            .then((r) => r.json())
            .catch(() => null),
        ]);
        if (!mounted) return;
        if (nesthrRes?.success) setNesthrStats(nesthrRes.data);
        setClients(clientsList || []);

        const totalRevenue = (invoicesData || []).reduce(
          (s: any, inv: any) => s + Number(inv.amount || 0),
          0,
        );
        const totalExpense = (expensesData || []).reduce(
          (s: any, ex: any) => s + Number(ex.amount || 0),
          0,
        );
        const leadsCount = (Array.isArray(leadsData) ? leadsData : []).length;
        const newLeadsCount = (
          Array.isArray(leadsData) ? leadsData : []
        ).filter((l: any) => l.status === "NEW" || l.status === "new").length;
        const activeProjectsCount = (projectsData || []).filter(
          (p: any) => p.status === "IN PROGRESS",
        ).length;
        const openQuotationsCount = (quotationsData || []).filter(
          (q: any) => q.status === "PENDING" || q.status === "SENT",
        ).length;
        const paidInvoicesCount = (invoicesData || []).filter(
          (inv: any) => inv.status === "PAID",
        ).length;

        setStats([
          {
            name: "clients",
            value: (clientsList || []).length,
            change: "+1.1%",
            changeType: "positive",
          },
          {
            name: "projects",
            value: (projectsData || []).length,
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
          {
            name: "leads",
            value: leadsCount,
            change: `${newLeadsCount} new`,
            changeType: "positive",
          },
          {
            name: "active projects",
            value: activeProjectsCount,
            change: "in progress",
            changeType: "positive",
          },
          {
            name: "net profit",
            value: totalRevenue - totalExpense,
            change: totalRevenue - totalExpense >= 0 ? "surplus" : "deficit",
            changeType:
              totalRevenue - totalExpense >= 0 ? "positive" : "negative",
          },
          {
            name: "open quotes",
            value: openQuotationsCount,
            change: `${paidInvoicesCount} paid invoices`,
            changeType: "positive",
          },
        ]);
      } catch (e) {
        console.error("Failed to load dashboard data", e);
      }
    }
    load();
    const handler = () => {
      (async () => {
        try {
          const [projectsRes, invoicesRes] = await Promise.all([
            apiFetch("/api/projects"),
            apiFetch("/api/invoices"),
          ]);
          const [projectsData, invoicesData] = await Promise.all([
            projectsRes.json(),
            invoicesRes.json(),
          ]);
          if (!mounted) return;
          setProjects(Array.isArray(projectsData) ? projectsData : []);
          setInvoices(Array.isArray(invoicesData) ? invoicesData : []);
        } catch (e) {}
      })();
    };
    window.addEventListener("data:changed", handler as EventListener);
    return () => {
      mounted = false;
      window.removeEventListener("data:changed", handler as EventListener);
    };
  }, []);

  const leadsByStatus = leads.reduce(
    (acc, lead) => {
      const key = lead.status ?? "NEW";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  if (isStaff) {
    return (
      <StaffDashboard
        user={user}
        projects={projects}
        tasks={tasks}
        clients={clients}
      />
    );
  }

  return (
    <div className="space-y-8 font-headline">
      <header>
        <h1 className="text-5xl font-black tracking-tighter">DASHBOARD</h1>
        <p className="text-muted-foreground text-lg">
          Real-time pulse of your agency.
        </p>
      </header>

      <Tabs defaultValue="overview">
        <TabsContent value="overview" className="space-y-8 mt-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {(
              [
                { name: "clients", icon: Users },
                { name: "projects", icon: Briefcase },
                { name: "revenue", icon: IndianRupee },
                { name: "expense", icon: TrendingDown },
                { name: "leads", icon: Target },
                { name: "active projects", icon: Activity },
                { name: "net profit", icon: DollarSign },
                { name: "open quotes", icon: FileText },
              ] as { name: string; icon: any }[]
            ).map((meta, i) => {
              const stat = stats.find((s) => s.name === meta.name);
              if (!stat) return null;
              const isCurrency = ["revenue", "expense", "net profit"].includes(
                stat.name,
              );
              return (
                <StatCard
                  key={stat.name}
                  icon={meta.icon}
                  label={stat.name.toUpperCase()}
                  value={
                    isCurrency
                      ? `₹${Number(stat.value || 0).toLocaleString()}`
                      : Number(stat.value || 0)
                  }
                  sub={stat.change}
                  iconVariant={i % 2 === 0 ? "primary" : "secondary"}
                />
              );
            })}
          </div>

          {nesthrStats && (
            <div className="space-y-4">
              <h2 className="text-3xl font-black tracking-tighter">
                NESTHR — SAAS OVERVIEW
              </h2>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                  { label: "TOTAL TENANTS", value: nesthrStats.companies?.total ?? 0, sub: `${nesthrStats.companies?.newThisMonth ?? 0} new this month`, icon: Building2 },
                  { label: "ACTIVE SUBS", value: nesthrStats.subscriptions?.active ?? 0, sub: `${nesthrStats.subscriptions?.expiringSoon ?? 0} expiring in 30d`, icon: CreditCard },
                  { label: "MRR", value: `₹${(nesthrStats.revenue?.mrr ?? 0).toLocaleString()}`, sub: "monthly recurring", icon: BarChart3 },
                  { label: "TOTAL REVENUE", value: `₹${(nesthrStats.revenue?.total ?? 0).toLocaleString()}`, sub: `₹${(nesthrStats.revenue?.thisMonth ?? 0).toLocaleString()} this month`, icon: IndianRupee },
                ].map(({ label, value, sub, icon }, i) => (
                  <StatCard key={label} icon={icon} label={label} value={value} sub={sub} iconVariant={i % 2 === 0 ? "primary" : "secondary"} />
                ))}
              </div>
            </div>
          )}

          <TrendsSection invoices={invoices} clients={clients} />
          <TeamMembersSection teamMembers={teamMembers} projects={projects} />

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
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.slice(0, 6).map((invoice: any) => (
                      <TableRow key={invoice.id ?? invoice._id}>
                        <TableCell className="font-bold">
                          {invoice.id ?? invoice._id}
                        </TableCell>
                        <TableCell>
                          {invoice.clientName ||
                            invoice.client ||
                            clients.find(
                              (c: any) =>
                                String(c.id ?? c._id) ===
                                String(invoice.clientId),
                            )?.name ||
                            "-"}
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
                <CardDescription>Current status of all leads.</CardDescription>
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
                      <AnimatedNumber value={Number(count)} duration={700} />
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
