"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { format } from "date-fns";
import {
  Loader2,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  History,
  Info,
  Receipt,
  Edit,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function PaymentsPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Payment Form State
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [paymentDate, setPaymentDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [paymentMode, setPaymentMode] = useState<string>("Bank Transfer");
  const [paymentRemarks, setPaymentRemarks] = useState<string>("");
  const [activeInvoice, setActiveInvoice] = useState<any>(null); // The invoice being paid

  // UI State
  const [expandedInvoices, setExpandedInvoices] = useState<
    Record<string, boolean>
  >({});

  // Edit Payment State
  const [editingPayment, setEditingPayment] = useState<{
    invoice: any;
    index: number;
  } | null>(null);
  const [editAmount, setEditAmount] = useState<string>("");
  const [editDate, setEditDate] = useState<string>("");
  const [editMode, setEditMode] = useState<string>("");
  const [editRemarks, setEditRemarks] = useState<string>("");

  const toggleInvoiceExpand = (id: string) => {
    setExpandedInvoices((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate client summary
  const clientSummary = invoices.reduce(
    (acc, inv) => {
      acc.billed += Number(inv.amount || 0);
      acc.received += Number(inv.paidAmount || 0);
      return acc;
    },
    { billed: 0, received: 0 },
  );
  const outstanding = clientSummary.billed - clientSummary.received;

  // Fetch clients on mount
  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch(console.error);
  }, []);

  // Fetch invoices when client changes
  useEffect(() => {
    if (!selectedClient) {
      setInvoices([]);
      return;
    }

    setLoading(true);
    fetch(`/api/invoices?clientId=${selectedClient}`)
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedClient]);

  const handlePayClick = (invoice: any) => {
    setActiveInvoice(invoice);
    const remaining = (invoice.amount || 0) - (invoice.paidAmount || 0);
    setPaymentAmount(remaining > 0 ? remaining.toString() : "0");
  };

  const submitPayment = async () => {
    if (!activeInvoice || !paymentAmount) return;

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId: String(activeInvoice._id || activeInvoice.id),
          amount: Number(paymentAmount),
          date: paymentDate,
          mode: paymentMode,
          remarks: paymentRemarks,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Payment failed");
      }

      toast({
        title: "Payment Recorded",
        description: `Successfully recorded payment of ₹${paymentAmount} for invoice ${activeInvoice.invoiceNo}`,
      });

      // Refresh invoices
      const updatedRes = await fetch(
        `/api/invoices?clientId=${selectedClient}`,
      );
      const updatedData = await updatedRes.json();
      setInvoices(updatedData);

      // Reset form
      setActiveInvoice(null);
      setPaymentAmount("");
      setPaymentRemarks("");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to record payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditPayment = (invoice: any, index: number) => {
    const payment = invoice.paymentHistory[index];
    setEditingPayment({ invoice, index });
    setEditAmount(payment.amount.toString());
    setEditDate(
      payment.date
        ? new Date(payment.date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    );
    setEditMode(payment.mode || "Bank Transfer");
    setEditRemarks(payment.remarks || "");
  };

  const submitEditPayment = async () => {
    if (!editingPayment || !editAmount) return;

    try {
      const res = await fetch(`/api/payments/${editingPayment.index}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId: String(
            editingPayment.invoice._id || editingPayment.invoice.id,
          ),
          index: editingPayment.index,
          amount: Number(editAmount),
          date: editDate,
          mode: editMode,
          remarks: editRemarks,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update payment");
      }

      toast({
        title: "Payment Updated",
        description: "Payment details have been updated successfully",
      });

      // Refresh invoices
      const updatedRes = await fetch(
        `/api/invoices?clientId=${selectedClient}`,
      );
      const updatedData = await updatedRes.json();
      setInvoices(updatedData);

      // Reset edit form
      setEditingPayment(null);
      setEditAmount("");
      setEditDate("");
      setEditMode("");
      setEditRemarks("");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Failed to update payment",
        variant: "destructive",
      });
    }
  };

  const handleDeletePayment = async (invoice: any, index: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this payment entry? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      const res = await fetch(
        `/api/payments/${index}?invoiceId=${String(invoice._id || invoice.id)}&index=${index}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to delete payment");
      }

      toast({
        title: "Payment Deleted",
        description: "Payment entry has been removed successfully",
      });

      // Refresh invoices
      const updatedRes = await fetch(
        `/api/invoices?clientId=${selectedClient}`,
      );
      const updatedData = await updatedRes.json();
      setInvoices(updatedData);
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete payment",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  if (user?.role !== "admin") {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
          <p className="text-muted-foreground">
            Only admins can record payments.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-end border-b pb-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase italic">
            Receive Payments
          </h1>
          <p className="text-muted-foreground font-medium">
            Manage your incoming cash flow and reconcile client accounts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Side: Client Selector & Stats */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="bg-neutral-50 border-b-2 border-black">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                <Receipt className="w-4 h-4" /> Billing Account
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger className="w-full border-2 border-black font-black h-12 bg-white">
                  <SelectValue placeholder="Select a client..." />
                </SelectTrigger>
                <SelectContent className="border-2 border-black font-bold">
                  {clients.map((c) => (
                    <SelectItem key={c._id || c.id} value={c._id || c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {selectedClient && (
            <div className="space-y-4">
              <Card className="border-2 border-neutral-200 shadow-sm bg-neutral-50/50 overflow-hidden">
                <div className="p-4 space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                      Total Billed
                    </p>
                    <p className="text-2xl font-black">
                      {formatCurrency(clientSummary.billed)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                      Total Received
                    </p>
                    <p className="text-2xl font-black text-green-600">
                      {formatCurrency(clientSummary.received)}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-neutral-300">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">
                      Total Outstanding
                    </p>
                    <p className="text-3xl font-black text-red-600 underline decoration-4 underline-offset-4">
                      {formatCurrency(outstanding)}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Right Side: Invoice List & History */}
        <div className="lg:col-span-3 space-y-6">
          {!selectedClient ? (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-neutral-300 rounded-xl bg-neutral-50/50 opacity-60">
              <Info className="w-12 h-12 text-neutral-400 mb-4" />
              <h3 className="text-lg font-black uppercase text-neutral-400">
                No client selected
              </h3>
              <p className="text-neutral-400 font-medium text-sm">
                Please select a client account to view their invoices and record
                payments
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-5 border-2 border-black rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-2xl font-black flex items-center gap-3 italic">
                  <Receipt className="w-6 h-6" /> Invoice Ledger
                </h2>
                <div className="text-[10px] font-black uppercase bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
                  {invoices.length} ACTIVE ITEMS
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center p-12">
                  <Loader2 className="animate-spin w-10 h-10 text-neutral-400" />
                </div>
              ) : invoices.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-neutral-300 rounded-xl">
                  <p className="text-neutral-400 font-black italic">
                    NO INVOICES FOUND FOR THIS ACCOUNT
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {invoices.map((inv) => {
                    const total = Number(inv.amount || 0);
                    const paid = Number(inv.paidAmount || 0);
                    const balance = total - paid;
                    const status = (inv.status || "PENDING").toUpperCase();
                    const isPaid = status === "PAID" || balance <= 0;
                    const isExpanded = expandedInvoices[inv._id || inv.id];

                    return (
                      <div
                        key={inv._id || inv.id}
                        className={cn(
                          "bg-white border-2 border-black rounded-xl transition-all overflow-hidden",
                          isPaid
                            ? "bg-neutral-50 border-neutral-300"
                            : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                        )}
                      >
                        <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                          <div className="space-y-2 flex-grow">
                            <div className="flex items-center gap-3">
                              <span className="font-black text-xl tracking-tighter">
                                {inv.invoiceNo}
                              </span>
                              <span
                                className={cn(
                                  "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border-2",
                                  isPaid
                                    ? "bg-green-50 text-green-700 border-green-700"
                                    : "bg-yellow-50 text-yellow-700 border-yellow-700",
                                )}
                              >
                                {status}
                              </span>
                            </div>
                            <p className="text-sm font-black text-neutral-600 uppercase tracking-tight">
                              {inv.projectTitle ||
                                inv.title ||
                                "Untitled Project"}
                            </p>
                            <div className="flex items-center gap-6 text-[11px] text-neutral-400 font-bold uppercase tracking-wider pt-1">
                              <span className="flex items-center gap-1.5">
                                <History className="w-3 h-3" /> Issued:{" "}
                                {format(new Date(inv.createdAt), "dd MMM yy")}
                              </span>
                              {inv.dueDate && (
                                <span
                                  className={cn(
                                    "flex items-center gap-1.5",
                                    new Date(inv.dueDate) < new Date() &&
                                      !isPaid
                                      ? "text-red-500"
                                      : "",
                                  )}
                                >
                                  <AlertCircle className="w-3 h-3" /> Due:{" "}
                                  {format(new Date(inv.dueDate), "dd MMM yy")}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-10 md:text-right w-full md:w-auto">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                                Outstanding
                              </p>
                              <p
                                className={cn(
                                  "text-2xl font-black",
                                  balance > 0
                                    ? "text-red-600"
                                    : "text-green-600",
                                )}
                              >
                                {formatCurrency(balance)}
                              </p>
                              <p className="text-[10px] font-bold text-neutral-400 italic">
                                Total: {formatCurrency(total)}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2 min-w-[120px]">
                              {!isPaid && (
                                <Button
                                  size="sm"
                                  className="bg-black hover:bg-neutral-800 text-white font-black uppercase text-xs h-10 border-2 border-black"
                                  onClick={() => handlePayClick(inv)}
                                >
                                  Record Pay
                                </Button>
                              )}
                              <button
                                onClick={() =>
                                  toggleInvoiceExpand(inv._id || inv.id)
                                }
                                className="text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-black flex items-center justify-center gap-1"
                              >
                                {isExpanded ? (
                                  <>
                                    <ChevronUp className="w-3 h-3" /> Less
                                    Detail
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-3 h-3" /> Full
                                    Detail
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="border-t-2 border-black bg-neutral-50/80 p-6 animate-in slide-in-from-top-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 border-b-2 border-neutral-200 pb-2">
                                  Business Details
                                </h4>
                                <div className="space-y-3 text-sm">
                                  <div className="grid grid-cols-3">
                                    <span className="font-black text-neutral-400 uppercase text-[10px]">
                                      Client
                                    </span>
                                    <span className="col-span-2 font-bold">
                                      {inv.clientName}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-3">
                                    <span className="font-black text-neutral-400 uppercase text-[10px]">
                                      Project
                                    </span>
                                    <span className="col-span-2 font-bold">
                                      {inv.projectTitle || "-"}
                                    </span>
                                  </div>
                                  {inv.venueName && (
                                    <div className="grid grid-cols-3">
                                      <span className="font-black text-neutral-400 uppercase text-[10px]">
                                        Venue
                                      </span>
                                      <span className="col-span-2 font-bold">
                                        {inv.venueName}
                                      </span>
                                    </div>
                                  )}
                                  {inv.workDate && (
                                    <div className="grid grid-cols-3">
                                      <span className="font-black text-neutral-400 uppercase text-[10px]">
                                        Date
                                      </span>
                                      <span className="col-span-2 font-bold">
                                        {format(new Date(inv.workDate), "PPP")}
                                      </span>
                                    </div>
                                  )}
                                  {inv.description && (
                                    <div className="pt-2 italic text-neutral-500 text-xs border-t border-dashed border-neutral-300">
                                      "{inv.description}"
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 border-b-2 border-neutral-200 pb-2 flex items-center justify-between">
                                  <span>Payment History</span>
                                  <History className="w-3 h-3" />
                                </h4>
                                <div className="space-y-3">
                                  {inv.paymentHistory &&
                                  inv.paymentHistory.length > 0 ? (
                                    inv.paymentHistory.map(
                                      (h: any, idx: number) => (
                                        <div
                                          key={idx}
                                          className="flex justify-between items-center p-3 bg-white border-2 border-neutral-200 rounded-lg shadow-sm hover:border-neutral-300 transition-colors"
                                        >
                                          <div className="space-y-0.5 flex-1">
                                            <div className="flex items-center gap-2">
                                              <p className="font-black text-sm text-green-700">
                                                {formatCurrency(h.amount)}
                                              </p>
                                              <span className="text-[8px] font-black uppercase py-0.5 px-1.5 bg-neutral-100 text-neutral-600 rounded">
                                                {h.mode}
                                              </span>
                                            </div>
                                            <p className="text-[10px] text-neutral-400 font-bold uppercase">
                                              {format(
                                                new Date(h.date),
                                                "dd MMM yyyy",
                                              )}
                                            </p>
                                            {h.remarks && (
                                              <p className="text-[10px] font-medium text-neutral-400 italic">
                                                {h.remarks}
                                              </p>
                                            )}
                                          </div>
                                          <div className="flex items-center gap-1 ml-2">
                                            <button
                                              onClick={() =>
                                                handleEditPayment(inv, idx)
                                              }
                                              className="p-1.5 hover:bg-blue-50 rounded border border-transparent hover:border-blue-200 transition-colors"
                                              title="Edit payment"
                                            >
                                              <Edit className="w-3.5 h-3.5 text-blue-600" />
                                            </button>
                                            <button
                                              onClick={() =>
                                                handleDeletePayment(inv, idx)
                                              }
                                              className="p-1.5 hover:bg-red-50 rounded border border-transparent hover:border-red-200 transition-colors"
                                              title="Delete payment"
                                            >
                                              <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                            </button>
                                          </div>
                                        </div>
                                      ),
                                    )
                                  ) : (
                                    <div className="py-6 text-center border-2 border-dashed border-neutral-200 rounded-lg bg-white/50">
                                      <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest italic">
                                        No payments detected
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating Payment Modal Overly-ish card */}
      {activeInvoice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white animate-in zoom-in-95 duration-300">
            <CardHeader className="bg-neutral-50 border-b-2 border-black pb-4 relative">
              <CardTitle className="text-2xl font-black uppercase tracking-tighter italic">
                Receive Funds
              </CardTitle>
              <CardDescription className="font-bold text-black opacity-60">
                Recording for Invoice # {activeInvoice.invoiceNo}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6 pb-8 px-8">
              <div className="space-y-2">
                <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                  Amount Received (INR)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-3 h-6 w-6 text-neutral-400" />
                  <Input
                    type="number"
                    className="pl-12 h-14 border-2 border-black text-2xl font-black bg-white focus-visible:ring-0 focus-visible:border-blue-600 transition-colors"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center bg-red-50 p-2 border-2 border-red-100 rounded">
                  <span className="text-[10px] font-black uppercase text-red-600 tracking-wider flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Remaining Balance
                  </span>
                  <span className="text-sm font-black text-red-700">
                    {formatCurrency(
                      (activeInvoice.amount || 0) -
                        (activeInvoice.paidAmount || 0),
                    )}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                    Date
                  </Label>
                  <Input
                    type="date"
                    className="border-2 border-black font-bold h-12"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                    Mode
                  </Label>
                  <Select value={paymentMode} onValueChange={setPaymentMode}>
                    <SelectTrigger className="border-2 border-black font-bold h-12 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-black font-bold">
                      <SelectItem value="Bank Transfer">NEFT/IMPS</SelectItem>
                      <SelectItem value="UPI">UPI / QR</SelectItem>
                      <SelectItem value="Cheque">CHEQUE</SelectItem>
                      <SelectItem value="Cash">CASH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                  Transaction Ref / Remarks
                </Label>
                <Input
                  placeholder="e.g. TXN-9876543210"
                  className="border-2 border-black font-bold h-12"
                  value={paymentRemarks}
                  onChange={(e) => setPaymentRemarks(e.target.value)}
                />
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <Button
                  className="w-full bg-black hover:bg-neutral-800 text-white h-14 font-black text-xl transition-all hover:scale-[1.02] active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                  onClick={submitPayment}
                >
                  <CheckCircle2 className="mr-2 h-6 w-6" />
                  SUBMIT TRANSACTION
                </Button>
                <button
                  className="w-full font-black uppercase text-xs tracking-widest text-neutral-400 hover:text-black transition-colors py-2"
                  onClick={() => setActiveInvoice(null)}
                >
                  Dismiss Modal
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Payment Modal */}
      {editingPayment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white animate-in zoom-in-95 duration-300">
            <CardHeader className="bg-blue-50 border-b-2 border-black pb-4 relative">
              <CardTitle className="text-2xl font-black uppercase tracking-tighter italic">
                Edit Payment
              </CardTitle>
              <CardDescription className="font-bold text-black opacity-60">
                Updating payment for Invoice #{" "}
                {editingPayment.invoice.invoiceNo}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6 pb-8 px-8">
              <div className="space-y-2">
                <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                  Amount Received
                </Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="border-2 border-black font-black text-2xl h-16 text-center"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                    Payment Date
                  </Label>
                  <Input
                    type="date"
                    className="border-2 border-black font-bold h-12"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                    Payment Mode
                  </Label>
                  <Select value={editMode} onValueChange={setEditMode}>
                    <SelectTrigger className="border-2 border-black font-bold h-12 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-2 border-black font-bold">
                      <SelectItem value="Bank Transfer">NEFT/IMPS</SelectItem>
                      <SelectItem value="UPI">UPI / QR</SelectItem>
                      <SelectItem value="Cheque">CHEQUE</SelectItem>
                      <SelectItem value="Cash">CASH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-black uppercase text-[10px] tracking-widest text-neutral-500">
                  Transaction Ref / Remarks
                </Label>
                <Input
                  placeholder="e.g. TXN-9876543210"
                  className="border-2 border-black font-bold h-12"
                  value={editRemarks}
                  onChange={(e) => setEditRemarks(e.target.value)}
                />
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 font-black text-xl transition-all hover:scale-[1.02] active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                  onClick={submitEditPayment}
                >
                  <CheckCircle2 className="mr-2 h-6 w-6" />
                  UPDATE PAYMENT
                </Button>
                <button
                  className="w-full font-black uppercase text-xs tracking-widest text-neutral-400 hover:text-black transition-colors py-2"
                  onClick={() => setEditingPayment(null)}
                >
                  Cancel
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
