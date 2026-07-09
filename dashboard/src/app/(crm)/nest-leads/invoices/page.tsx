"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FileText, CheckCircle2, Clock, AlertCircle, RefreshCw } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { apiFetch } from "@/lib/api-fetch";

interface NestLeadsInvoice {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  currency: string;
  status: string;
  issuedDate: string;
  dueDate: string;
  subscriptionPlan?: string;
}

export default function NestLeadsInvoicesPage() {
  const [invoices, setInvoices] = useState<NestLeadsInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const url =
        statusFilter !== "all"
          ? `/api/nestleads-invoices?status=${statusFilter}`
          : `/api/nestleads-invoices`;

      const res = await apiFetch(url);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `Failed to fetch: ${res.status}`);
      }
      const data = await res.json();
      setInvoices(data.invoices ?? []);
    } catch (err: any) {
      console.error("Failed to load Nest Leads invoices", err);
      toast({
        title: "Fetch Failed",
        description: err.message || "Could not load Nest Leads invoices.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [statusFilter]);

  const exportCsv = () => {
    const escape = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const headers = [
      "Invoice No",
      "Client",
      "Email",
      "Amount",
      "Currency",
      "Status",
      "Plan",
      "Issued Date",
      "Due Date",
    ];
    const rows = [
      headers.map(escape).join(","),
      ...invoices.map((inv) =>
        [
          inv.invoiceNumber,
          inv.clientName,
          inv.clientEmail,
          inv.amount,
          inv.currency,
          inv.status,
          inv.subscriptionPlan ?? "",
          inv.issuedDate ? new Date(inv.issuedDate).toISOString() : "",
          inv.dueDate ? new Date(inv.dueDate).toISOString() : "",
        ]
          .map(escape)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nestleads-invoices-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const paid = invoices.filter((i) => i.status?.toLowerCase() === "paid");
  const unpaid = invoices.filter((i) => i.status?.toLowerCase() === "unpaid");
  const overdue = invoices.filter((i) => i.status?.toLowerCase() === "overdue");

  const statusColors: Record<string, string> = {
    paid: "bg-success text-success-foreground",
    unpaid: "bg-destructive text-destructive-foreground",
    overdue: "bg-accent text-accent-foreground",
  };

  return (
    <div className="space-y-8 font-headline">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">NEST LEADS INVOICES</h1>
          <p className="text-muted-foreground text-sm">
            Invoices generated from Nest Leads subscriptions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={exportCsv}>
            Export Excel
          </Button>
          <Button size="sm" variant="outline" onClick={fetchInvoices} disabled={loading}>
            <RefreshCw className={cn("w-4 h-4 mr-1", loading && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </header>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            icon: FileText,
            label: "TOTAL INVOICES",
            value: invoices.length,
            sub: `${invoices.length} records`,
            variant: "primary" as const,
          },
          {
            icon: CheckCircle2,
            label: "PAID",
            value: paid.length,
            sub: `₹${paid.reduce((s, i) => s + Number(i.amount ?? 0), 0).toLocaleString()}`,
            variant: "secondary" as const,
          },
          {
            icon: Clock,
            label: "UNPAID",
            value: unpaid.length,
            sub: `₹${unpaid.reduce((s, i) => s + Number(i.amount ?? 0), 0).toLocaleString()}`,
            variant: "primary" as const,
          },
          {
            icon: AlertCircle,
            label: "OVERDUE",
            value: overdue.length,
            sub: `₹${overdue.reduce((s, i) => s + Number(i.amount ?? 0), 0).toLocaleString()}`,
            variant: "secondary" as const,
          },
        ].map(({ icon, label, value, sub, variant }) => (
          <StatCard key={label} icon={icon} label={label} value={value} sub={sub} iconVariant={variant} />
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "paid", "unpaid", "overdue"].map((s) => (
          <Button
            key={s}
            size="sm"
            variant={statusFilter === s ? "default" : "outline"}
            onClick={() => setStatusFilter(s)}
            className="capitalize"
          >
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </Button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block border-2 border-black overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black">
              <TableHead className="text-sm font-bold">Invoice No</TableHead>
              <TableHead className="text-sm font-bold">Client</TableHead>
              <TableHead className="text-sm font-bold">Email</TableHead>
              <TableHead className="text-sm font-bold">Plan</TableHead>
              <TableHead className="text-sm font-bold">Amount</TableHead>
              <TableHead className="text-sm font-bold">Issued</TableHead>
              <TableHead className="text-sm font-bold">Due Date</TableHead>
              <TableHead className="text-right text-sm font-bold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-muted-foreground font-bold">
                  Loading invoices…
                </TableCell>
              </TableRow>
            )}
            {!loading && invoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-muted-foreground font-bold">
                  No invoices found.
                </TableCell>
              </TableRow>
            )}
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.invoiceNumber}
                className="border-b-2 border-black last:border-b-0"
              >
                <TableCell className="font-bold text-sm py-2">{invoice.invoiceNumber}</TableCell>
                <TableCell className="text-sm py-2">{invoice.clientName}</TableCell>
                <TableCell className="text-sm py-2">{invoice.clientEmail}</TableCell>
                <TableCell className="text-sm py-2">{invoice.subscriptionPlan ?? "-"}</TableCell>
                <TableCell className="text-sm py-2">
                  ₹{Number(invoice.amount ?? 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-sm py-2">
                  {invoice.issuedDate ? new Date(invoice.issuedDate).toLocaleDateString() : "-"}
                </TableCell>
                <TableCell className="text-sm py-2">
                  {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "-"}
                </TableCell>
                <TableCell className="text-right py-2">
                  <span
                    className={cn(
                      "text-xs font-black tracking-widest p-1",
                      statusColors[invoice.status?.toLowerCase()] ??
                        "bg-gray-100 text-gray-700",
                    )}
                  >
                    {invoice.status?.toUpperCase()}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {loading && (
          <div className="border-2 border-black p-8 text-center text-muted-foreground font-bold">
            Loading invoices…
          </div>
        )}
        {!loading && invoices.length === 0 && (
          <div className="border-2 border-black p-8 text-center text-muted-foreground font-bold">
            No invoices found.
          </div>
        )}
        {invoices.map((invoice) => (
          <div key={invoice.invoiceNumber} className="border-2 border-black bg-white">
            <div className="divide-y divide-gray-100">
              <div className="px-3 py-2 flex items-start justify-between">
                <div>
                  <div className="font-black text-sm">{invoice.invoiceNumber}</div>
                  <div className="text-xs text-muted-foreground">{invoice.subscriptionPlan ?? ""}</div>
                </div>
                <span
                  className={cn(
                    "text-xs font-black tracking-widest p-1",
                    statusColors[invoice.status?.toLowerCase()] ?? "bg-gray-100 text-gray-700",
                  )}
                >
                  {invoice.status?.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center px-3 py-2">
                <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Client</span>
                <span className="text-sm font-bold text-right flex-1">{invoice.clientName}</span>
              </div>
              <div className="flex justify-between items-center px-3 py-2">
                <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Email</span>
                <span className="text-sm text-right flex-1">{invoice.clientEmail}</span>
              </div>
              <div className="flex justify-between items-center px-3 py-2">
                <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Amount</span>
                <span className="font-black text-base">₹{Number(invoice.amount ?? 0).toLocaleString()}</span>
              </div>
              {invoice.dueDate && (
                <div className="flex justify-between items-center px-3 py-2">
                  <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Due</span>
                  <span className="text-sm">{new Date(invoice.dueDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
