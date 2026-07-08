"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddExpenseDialog, {
  EXPENSE_CATEGORIES,
  PAYMENT_METHODS,
} from "@/components/expenses/add-expense-dialog";
import { FixedExpensesSection } from "@/components/expenses/fixed-expenses-section";
import { StatCard } from "@/components/ui/stat-card";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  CalendarDays,
  Search,
  Trash2,
  Pencil,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  LayoutGrid,
  Repeat,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const STATUS_CONFIG: Record<
  string,
  { label: string; icon: any; class: string }
> = {
  paid: {
    label: "Paid",
    icon: CheckCircle2,
    class: "bg-success/10 text-success border-success/30",
  },
  pending: {
    label: "Pending",
    icon: AlertCircle,
    class: "bg-secondary/10 text-secondary border-secondary/30",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    class: "bg-destructive/10 text-destructive border-destructive/30",
  },
};

function getCategoryLabel(value: string) {
  return EXPENSE_CATEGORIES.find((c) => c.value === value)?.label || value;
}

function getPaymentLabel(value: string | undefined) {
  if (!value) return null;
  return PAYMENT_METHODS.find((p) => p.value === value)?.label || value;
}

function CategoryCell({ category }: { category: string }) {
  const known = EXPENSE_CATEGORIES.find((c) => c.value === category);
  if (known)
    return (
      <span className="inline-flex items-center gap-1.5 text-sm">
        <known.icon className="h-3.5 w-3.5 text-muted-foreground" />
        {known.label}
      </span>
    );

  return (
    <span className="text-sm px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">
      {category || "—"}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold ${cfg.class}`}
    >
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/expenses");
      if (!res.ok) throw new Error("Failed to fetch expenses");
      const json = await res.json();
      setExpenses(json || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id: string) => {
    try {
      const res = await apiFetch(`/api/expenses/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await load();
    } catch (e) {
      console.error(e);
      alert("Failed to delete expense");
    }
  };

  const isPaid = (e: any) => !e.status || e.status === "paid";
  const isPending = (e: any) => e.status === "pending";

  const stats = useMemo(() => {
    const now = new Date();
    const thisMonth = expenses.filter((e) => {
      const d = new Date(e.date || e.createdAt);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    });
    const paidExpenses = expenses.filter(isPaid);
    const pendingExpenses = expenses.filter(isPending);

    const total = paidExpenses.reduce((s, e) => s + Number(e.amount || 0), 0);
    const thisMonthTotal = thisMonth
      .filter(isPaid)
      .reduce((s, e) => s + Number(e.amount || 0), 0);
    const pendingTotal = pendingExpenses.reduce(
      (s, e) => s + Number(e.amount || 0),
      0,
    );

    const byCat: Record<string, number> = {};
    paidExpenses.forEach((e) => {
      const cat = e.category || "miscellaneous";
      byCat[cat] = (byCat[cat] || 0) + Number(e.amount || 0);
    });
    const topCategory = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];

    return {
      total,
      thisMonthTotal,
      pendingTotal,
      count: expenses.length,
      topCategory,
    };
  }, [expenses]);

  const months = useMemo(() => {
    const set = new Set<string>();
    expenses.forEach((e) => {
      const d = new Date(e.date || e.createdAt);
      if (!isNaN(d.getTime()))
        set.add(
          `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        );
    });
    return Array.from(set).sort().reverse();
  }, [expenses]);

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchSearch =
        !search ||
        e.title?.toLowerCase().includes(search.toLowerCase()) ||
        e.vendor?.toLowerCase().includes(search.toLowerCase()) ||
        e.reference?.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        filterCategory === "all" || e.category === filterCategory;
      const matchStatus = filterStatus === "all" || e.status === filterStatus;
      const matchMonth =
        filterMonth === "all" ||
        (() => {
          const d = new Date(e.date || e.createdAt);
          return (
            `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}` ===
            filterMonth
          );
        })();
      const matchTab = activeTab === "all" || e.category === activeTab;
      return matchSearch && matchCat && matchStatus && matchMonth && matchTab;
    });
  }, [expenses, search, filterCategory, filterStatus, filterMonth, activeTab]);

  const filteredTotal = useMemo(
    () =>
      filtered.filter(isPaid).reduce((s, e) => s + Number(e.amount || 0), 0),
    [filtered],
  );

  return (
    <div className="space-y-6 font-headline">
      {}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-black">EXPENSES</h1>
          <p className="text-muted-foreground mt-1">
            Complete business expense management — salary, inventory, office &
            more.
          </p>
        </div>
        <AddExpenseDialog onCreated={load} />
      </header>

      {}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Wallet}
          label="TOTAL PAID"
          value={`₹${stats.total.toLocaleString()}`}
          sub={`${stats.count} entries`}
          iconVariant="primary"
        />
        <StatCard
          icon={CalendarDays}
          label="THIS MONTH"
          value={`₹${stats.thisMonthTotal.toLocaleString()}`}
          sub="paid expenses"
          iconVariant="secondary"
        />
        <StatCard
          icon={AlertCircle}
          label="PENDING"
          value={`₹${stats.pendingTotal.toLocaleString()}`}
          sub="to be paid"
          iconVariant="primary"
        />
        <StatCard
          icon={TrendingUp}
          label="TOP CATEGORY"
          value={
            stats.topCategory
              ? getCategoryLabel(stats.topCategory[0])
                  .split(" ")
                  .slice(1)
                  .join(" ") || getCategoryLabel(stats.topCategory[0])
              : "—"
          }
          sub={
            stats.topCategory
              ? `₹${Number(stats.topCategory[1]).toLocaleString()}`
              : "No data"
          }
          iconVariant="secondary"
        />
      </div>

      {}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto pb-1 -mx-1 px-1">
          <TabsList className="flex h-auto w-max gap-1.5 bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="shrink-0 flex items-center gap-1.5 border-black data-[state=active]:bg-black data-[state=active]:text-white rounded-lg px-3 py-1.5 text-sm font-bold whitespace-nowrap"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              All
            </TabsTrigger>
            <TabsTrigger
              value="fixed"
              className="shrink-0 flex items-center gap-1.5 border-black data-[state=active]:bg-black data-[state=active]:text-white rounded-lg px-3 py-1.5 text-sm font-bold whitespace-nowrap"
            >
              <Repeat className="h-3.5 w-3.5" />
              Fixed Expenses
            </TabsTrigger>
            {EXPENSE_CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.value}
                value={cat.value}
                className="shrink-0 flex items-center gap-1.5 border-black data-[state=active]:bg-black data-[state=active]:text-white rounded-lg px-3 py-1.5 text-sm font-bold whitespace-nowrap"
              >
                <cat.icon className="h-3.5 w-3.5" />
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {}
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, vendor, reference..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 border-2 border-black"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px] border-2 border-black font-semibold">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger className="w-[160px] border-2 border-black font-semibold">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {months.map((m) => {
                const [y, mo] = m.split("-");
                const label = new Date(
                  Number(y),
                  Number(mo) - 1,
                ).toLocaleString("default", { month: "long", year: "numeric" });
                return (
                  <SelectItem key={m} value={m}>
                    {label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {}
        <TabsContent value="fixed" className="mt-4">
          <FixedExpensesSection />
        </TabsContent>

        {}
        {(["all", ...EXPENSE_CATEGORIES.map((c) => c.value)] as string[]).map(
          (tabVal) => (
            <TabsContent key={tabVal} value={tabVal} className="mt-4">
              <Card className="border-2 border-black">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-black">
                      {tabVal === "all"
                        ? "All Expenses"
                        : getCategoryLabel(tabVal)}
                    </CardTitle>
                    <CardDescription>
                      {filtered.length} records · Total Paid:{" "}
                      <span className="font-bold text-black">
                        ₹{filteredTotal.toLocaleString()}
                      </span>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {loading ? (
                    <div className="flex items-center justify-center h-40 text-muted-foreground">
                      Loading expenses...
                    </div>
                  ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-muted-foreground gap-2">
                      <TrendingDown className="h-10 w-10 opacity-30" />
                      <p className="font-semibold">No expenses found</p>
                      <p className="text-sm">
                        Add a new expense to get started.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="hidden md:block overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/50">
                              <TableHead className="font-black">
                                Title
                              </TableHead>
                              <TableHead className="font-black">
                                Category
                              </TableHead>
                              <TableHead className="font-black">
                                Vendor
                              </TableHead>
                              <TableHead className="font-black">
                                Payment
                              </TableHead>
                              <TableHead className="font-black">
                                Status
                              </TableHead>
                              <TableHead className="font-black text-right">
                                Amount
                              </TableHead>
                              <TableHead className="font-black text-right">
                                Date
                              </TableHead>
                              <TableHead className="font-black text-center">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filtered.map((e) => (
                              <TableRow
                                key={e._id ?? e.id}
                                className="hover:bg-muted/30 transition-colors"
                              >
                                <TableCell>
                                  <div className="font-bold">{e.title}</div>
                                  {e.staffName && (
                                    <div className="text-xs text-blue-600 font-semibold">
                                      Staff: {e.staffName}
                                    </div>
                                  )}
                                  {e.linkedProjectTitle && (
                                    <div className="text-xs text-purple-600 font-semibold">
                                      Project: {e.linkedProjectTitle}
                                    </div>
                                  )}
                                  {e.reference && (
                                    <div className="text-xs text-muted-foreground">
                                      Ref: {e.reference}
                                    </div>
                                  )}
                                  {e.note && (
                                    <div className="text-xs text-muted-foreground italic truncate max-w-[180px]">
                                      {e.note}
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <CategoryCell category={e.category} />
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {e.vendor || "—"}
                                </TableCell>
                                <TableCell className="text-sm">
                                  {getPaymentLabel(e.paymentMethod) || "—"}
                                </TableCell>
                                <TableCell>
                                  <StatusBadge status={e.status || "paid"} />
                                </TableCell>
                                <TableCell className="text-right">
                                  <span className="font-black text-base">
                                    ₹{Number(e.amount || 0).toLocaleString()}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right text-sm text-muted-foreground whitespace-nowrap">
                                  {e.date
                                    ? new Date(e.date).toLocaleDateString(
                                        "en-IN",
                                        {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        },
                                      )
                                    : e.createdAt
                                      ? new Date(
                                          e.createdAt,
                                        ).toLocaleDateString("en-IN", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        })
                                      : "—"}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center justify-center gap-1">
                                    {e.category === "inventory" &&
                                      e.billUrl && (
                                        <a
                                          href={`https://www.pixelatenest.com${e.billUrl}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          title="View Inventory Bill PDF"
                                        >
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 text-blue-500"
                                          >
                                            <FileText className="h-4 w-4" />
                                          </Button>
                                        </a>
                                      )}
                                    <AddExpenseDialog
                                      onCreated={load}
                                      editData={e}
                                      editId={e._id?.toString() || e.id}
                                      trigger={
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                                        >
                                          <Pencil className="h-4 w-4" />
                                        </Button>
                                      }
                                    />
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Delete Expense?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Are you sure you want to delete{" "}
                                            <strong>
                                              &quot;{e.title}&quot;
                                            </strong>
                                            ? This action cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                            onClick={() =>
                                              handleDelete(
                                                e._id?.toString() || e.id,
                                              )
                                            }
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Mobile cards */}
                      <div className="md:hidden space-y-3 mt-3">
                        {filtered.map((e) => {
                          const eid = e._id?.toString() || e.id;
                          return (
                            <div
                              key={eid}
                              className="border-2 border-black bg-white"
                            >
                              <div className="divide-y divide-gray-100">
                                <div className="px-3 py-2">
                                  <div className="font-bold text-sm">
                                    {e.title}
                                  </div>
                                  {e.staffName && (
                                    <div className="text-xs text-blue-600 font-semibold">
                                      Staff: {e.staffName}
                                    </div>
                                  )}
                                  {e.linkedProjectTitle && (
                                    <div className="text-xs text-purple-600 font-semibold">
                                      Project: {e.linkedProjectTitle}
                                    </div>
                                  )}
                                  {e.note && (
                                    <div className="text-xs text-muted-foreground italic">
                                      {e.note}
                                    </div>
                                  )}
                                </div>
                                <div className="flex justify-between items-center px-3 py-2">
                                  <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">
                                    Amount
                                  </span>
                                  <span className="font-black text-base">
                                    ₹{Number(e.amount || 0).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2">
                                  <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">
                                    Category
                                  </span>
                                  <CategoryCell category={e.category} />
                                </div>
                                {e.vendor && (
                                  <div className="flex justify-between items-center px-3 py-2">
                                    <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">
                                      Vendor
                                    </span>
                                    <span className="text-sm text-right flex-1">
                                      {e.vendor}
                                    </span>
                                  </div>
                                )}
                                <div className="flex justify-between items-center px-3 py-2">
                                  <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">
                                    Status
                                  </span>
                                  <StatusBadge status={e.status || "paid"} />
                                </div>
                                <div className="flex justify-between items-center px-3 py-2">
                                  <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">
                                    Date
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {e.date
                                      ? new Date(e.date).toLocaleDateString(
                                          "en-IN",
                                          {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                          },
                                        )
                                      : e.createdAt
                                        ? new Date(
                                            e.createdAt,
                                          ).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                          })
                                        : "—"}
                                  </span>
                                </div>
                              </div>
                              <div className="border-t-2 border-black bg-gray-50 px-3 py-2 flex items-center gap-1">
                                {e.category === "inventory" && e.billUrl && (
                                  <a
                                    href={`https://www.pixelatenest.com${e.billUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 text-blue-500"
                                    >
                                      <FileText className="h-4 w-4" />
                                    </Button>
                                  </a>
                                )}
                                <AddExpenseDialog
                                  onCreated={load}
                                  editData={e}
                                  editId={eid}
                                  trigger={
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  }
                                />
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete Expense?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete{" "}
                                        <strong>&quot;{e.title}&quot;</strong>?
                                        This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                        onClick={() => handleDelete(eid)}
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ),
        )}
      </Tabs>
    </div>
  );
}
