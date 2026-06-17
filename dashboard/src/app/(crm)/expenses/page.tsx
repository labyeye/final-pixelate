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
  if (known) return <span className="text-sm">{known.label}</span>;

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
        <Card className="border-2 border-black">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                  Total Paid
                </p>
                <p className="text-2xl font-black mt-1">
                  ₹{stats.total.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stats.count} entries
                </p>
              </div>
              <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                  This Month
                </p>
                <p className="text-2xl font-black mt-1">
                  ₹{stats.thisMonthTotal.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Paid expenses
                </p>
              </div>
              <div className="h-12 w-12 bg-accent rounded-xl flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                  Pending
                </p>
                <p className="text-2xl font-black mt-1">
                  ₹{stats.pendingTotal.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  To be paid
                </p>
              </div>
              <div className="h-12 w-12 bg-secondary rounded-xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                  Top Category
                </p>
                <p className="text-lg font-black mt-1 capitalize leading-tight">
                  {stats.topCategory
                    ? getCategoryLabel(stats.topCategory[0])
                        .split(" ")
                        .slice(1)
                        .join(" ")
                    : "—"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stats.topCategory
                    ? `₹${Number(stats.topCategory[1]).toLocaleString()}`
                    : "No data"}
                </p>
              </div>
              <div className="h-12 w-12 bg-success rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto pb-1">
          <TabsList className="inline-flex h-auto gap-1 bg-transparent p-0 flex-wrap">
            <TabsTrigger
              value="all"
              className="border-2 border-black data-[state=active]:bg-black data-[state=active]:text-white rounded-lg px-3 py-1.5 text-sm font-bold"
            >
              All
            </TabsTrigger>
            {EXPENSE_CATEGORIES.map((cat) => (
              <TabsTrigger
                key={cat.value}
                value={cat.value}
                className="border-2 border-black data-[state=active]:bg-black data-[state=active]:text-white rounded-lg px-3 py-1.5 text-sm font-bold whitespace-nowrap"
              >
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
              <SelectItem value="paid">✅ Paid</SelectItem>
              <SelectItem value="pending">⏳ Pending</SelectItem>
              <SelectItem value="cancelled">❌ Cancelled</SelectItem>
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
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="font-black">Title</TableHead>
                            <TableHead className="font-black">
                              Category
                            </TableHead>
                            <TableHead className="font-black">Vendor</TableHead>
                            <TableHead className="font-black">
                              Payment
                            </TableHead>
                            <TableHead className="font-black">Status</TableHead>
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
                                    ? new Date(e.createdAt).toLocaleDateString(
                                        "en-IN",
                                        {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        },
                                      )
                                    : "—"}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center gap-1">
                                  {e.category === "inventory" && e.billUrl && (
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
                                          <strong>&quot;{e.title}&quot;</strong>
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
