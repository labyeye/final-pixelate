"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useState, useEffect, useMemo } from "react";
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
  Download,
  MessageCircle,
  ArrowDownUp,
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
import { pdf } from "@react-pdf/renderer";
import { PaymentReceiptPDFDocument } from "@/components/payments/payment-receipt-pdf";

function getFinancialYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const fyStart = month >= 4 ? year : year - 1;
  return `${String(fyStart).slice(2)}${String(fyStart + 1).slice(2)}`;
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="16" r="16" fill="currentColor" />
      <path
        d="M22.8 19.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.59-.49-.51-.68-.52-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"
        fill="white"
      />
      <path
        d="M16 5.5C10.2 5.5 5.5 10.2 5.5 16c0 1.86.5 3.6 1.36 5.1L5.5 26.5l5.56-1.34A10.44 10.44 0 0 0 16 26.5c5.8 0 10.5-4.7 10.5-10.5S21.8 5.5 16 5.5zm0 19.25a8.73 8.73 0 0 1-4.47-1.22l-.32-.19-3.3.8.82-3.22-.21-.33A8.74 8.74 0 0 1 7.25 16c0-4.83 3.93-8.75 8.75-8.75S24.75 11.17 24.75 16 20.83 24.75 16 24.75z"
        fill="white"
      />
    </svg>
  );
}

interface FlatPayment {
  invoiceId: string;
  invoiceNo: string;
  projectTitle: string;
  clientName: string;
  clientPhone?: string;
  clientAddress?: string;
  paymentIndex: number;
  receiptNo: string;
  amount: number;
  date: string;
  mode: string;
  remarks?: string;
  invoiceTotal: number;
  balanceDue: number;
  invoiceStatus: string;
}

export default function PaymentsPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const isClient = user?.role === "client";
  const myClientId = (user as any)?.clientId ?? null;

  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedClientObj, setSelectedClientObj] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [paymentDate, setPaymentDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [paymentMode, setPaymentMode] = useState<string>("Bank Transfer");
  const [paymentRemarks, setPaymentRemarks] = useState<string>("");
  const [activeInvoice, setActiveInvoice] = useState<any>(null);

  const [expandedInvoices, setExpandedInvoices] = useState<
    Record<string, boolean>
  >({});

  const [editingPayment, setEditingPayment] = useState<{
    invoice: any;
    index: number;
  } | null>(null);
  const [editAmount, setEditAmount] = useState<string>("");
  const [editDate, setEditDate] = useState<string>("");
  const [editMode, setEditMode] = useState<string>("");
  const [editRemarks, setEditRemarks] = useState<string>("");

  const [downloadingReceipt, setDownloadingReceipt] = useState<string | null>(
    null,
  );
  const [sendingWhatsApp, setSendingWhatsApp] = useState<string | null>(null);

  const toggleInvoiceExpand = (id: string) => {
    setExpandedInvoices((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const clientSummary = invoices.reduce(
    (acc, inv) => {
      const baseAmount = Number(inv.amount || 0);
      const taxAmount = Number(inv.tax || 0);
      const totalAmount = baseAmount + taxAmount;
      acc.billed += totalAmount;
      acc.received += Number(inv.paidAmount || 0);
      return acc;
    },
    { billed: 0, received: 0 },
  );
  const outstanding = clientSummary.billed - clientSummary.received;

  const allPayments = useMemo<FlatPayment[]>(() => {
    const fy = getFinancialYear();
    let globalIndex = 1;
    const payments: FlatPayment[] = [];

    invoices.forEach((inv) => {
      const baseAmount = Number(inv.amount || 0);
      const taxAmount = Number(inv.tax || 0);
      const total = baseAmount + taxAmount;
      const paid = Number(inv.paidAmount || 0);
      const balance = total - paid;

      (inv.paymentHistory || []).forEach((h: any, idx: number) => {
        payments.push({
          invoiceId: String(inv._id || inv.id),
          invoiceNo: inv.invoiceNo || "—",
          projectTitle: inv.projectTitle || inv.title || "Untitled Project",
          clientName: inv.clientName || selectedClientObj?.name || "—",
          clientPhone: inv.clientPhone || selectedClientObj?.phone,
          clientAddress: inv.clientAddress
            ? [
                inv.clientAddress,
                inv.clientCity,
                inv.clientState,
                inv.clientPin,
              ]
                .filter(Boolean)
                .join(", ")
            : selectedClientObj
              ? [
                  selectedClientObj.address,
                  selectedClientObj.city,
                  selectedClientObj.state,
                  selectedClientObj.pin,
                ]
                  .filter(Boolean)
                  .join(", ")
              : undefined,
          paymentIndex: idx,
          receiptNo: `${settings?.receiptPrefix ?? "RCPT/"}${fy}/${String(globalIndex++).padStart(4, "0")}`,
          amount: Number(h.amount),
          date: h.date,
          mode: h.mode || "Bank Transfer",
          remarks: h.remarks,
          invoiceTotal: total,
          balanceDue: balance,
          invoiceStatus: (inv.status || "PENDING").toUpperCase(),
        });
      });
    });

    return payments.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [invoices, selectedClientObj]);

  useEffect(() => {
    if (isClient) {
      if (myClientId) setSelectedClient(String(myClientId));
      return;
    }
    apiFetch("/api/clients")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch(console.error);

    apiFetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(console.error);
  }, [isClient, myClientId]);

  useEffect(() => {
    if (!selectedClient) {
      setInvoices([]);
      setSelectedClientObj(null);
      return;
    }
    const found = clients.find((c) => String(c._id || c.id) === selectedClient);
    setSelectedClientObj(found || null);

    setLoading(true);
    apiFetch(`/api/invoices?clientId=${selectedClient}`)
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedClient, clients]);

  const handlePayClick = (invoice: any) => {
    setActiveInvoice(invoice);
    const remaining = (invoice.amount || 0) - (invoice.paidAmount || 0);
    const amountWithTax = remaining > 0 ? remaining * 1.18 : 0;
    setPaymentAmount(amountWithTax > 0 ? amountWithTax.toString() : "0");
  };

  const submitPayment = async () => {
    if (!activeInvoice || !paymentAmount) return;
    try {
      const res = await apiFetch("/api/payments", {
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
      const updatedRes = await fetch(
        `/api/invoices?clientId=${selectedClient}`,
      );
      const updatedData = await updatedRes.json();
      setInvoices(updatedData);
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
      const res = await apiFetch(`/api/payments/${editingPayment.index}`, {
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
        description: "Payment details updated successfully",
      });
      const updatedRes = await fetch(
        `/api/invoices?clientId=${selectedClient}`,
      );
      const updatedData = await updatedRes.json();
      setInvoices(updatedData);
      setEditingPayment(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update payment",
        variant: "destructive",
      });
    }
  };

  const handleDeletePayment = async (invoice: any, index: number) => {
    if (!window.confirm("Delete this payment entry? This cannot be undone."))
      return;
    try {
      const res = await fetch(
        `/api/payments/${index}?invoiceId=${String(invoice._id || invoice.id)}&index=${index}`,
        { method: "DELETE" },
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to delete payment");
      }
      toast({
        title: "Payment Deleted",
        description: "Payment entry removed successfully",
      });
      const updatedRes = await fetch(
        `/api/invoices?clientId=${selectedClient}`,
      );
      const updatedData = await updatedRes.json();
      setInvoices(updatedData);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete payment",
        variant: "destructive",
      });
    }
  };

  const handleDownloadReceipt = async (payment: FlatPayment) => {
    const key = `${payment.invoiceId}-${payment.paymentIndex}`;
    setDownloadingReceipt(key);
    try {
      const blob = await pdf(
        <PaymentReceiptPDFDocument
          data={{
            receiptNo: payment.receiptNo,
            clientName: payment.clientName,
            clientAddress: payment.clientAddress,
            clientPhone: payment.clientPhone,
            invoiceNo: payment.invoiceNo,
            projectTitle: payment.projectTitle,
            amount: payment.amount,
            paymentDate: payment.date,
            paymentMode: payment.mode,
            transactionRef: payment.remarks,
            invoiceTotal: payment.invoiceTotal,
            balanceDue: payment.balanceDue,
            invoiceStatus: payment.invoiceStatus,
          }}
        />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Receipt-${payment.invoiceNo}-${payment.clientName}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Receipt Downloaded",
        description: `Receipt for ${payment.invoiceNo} downloaded.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not generate receipt",
        variant: "destructive",
      });
    } finally {
      setDownloadingReceipt(null);
    }
  };

  const handleWhatsAppReceipt = async (payment: FlatPayment) => {
    const phone = payment.clientPhone?.replace(/\D/g, "") || "";
    if (!phone) {
      toast({
        title: "No Phone Number",
        description: "This client has no phone number saved.",
        variant: "destructive",
      });
      return;
    }

    const key = `${payment.invoiceId}-${payment.paymentIndex}`;
    setSendingWhatsApp(key);

    try {
      const pdfBlob = await pdf(
        <PaymentReceiptPDFDocument
          data={{
            receiptNo: payment.receiptNo,
            clientName: payment.clientName,
            clientAddress: payment.clientAddress,
            clientPhone: payment.clientPhone,
            invoiceNo: payment.invoiceNo,
            projectTitle: payment.projectTitle,
            amount: payment.amount,
            paymentDate: payment.date,
            paymentMode: payment.mode,
            transactionRef: payment.remarks,
            invoiceTotal: payment.invoiceTotal,
            balanceDue: payment.balanceDue,
            invoiceStatus: payment.invoiceStatus,
          }}
        />,
      ).toBlob();
      const safeFilename = `Receipt-${payment.invoiceNo.replace(/[/\\]/g, "-")}-${payment.clientName.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`;

      const formData = new FormData();
      formData.append(
        "file",
        new File([pdfBlob], safeFilename, { type: "application/pdf" }),
      );

      const uploadRes = await apiFetch("/api/upload-whatsapp-media", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload receipt to WhatsApp");
      }

      const { mediaId } = await uploadRes.json();

      const digits = phone.length === 10 ? "91" + phone : phone;
      const amountFormatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(payment.amount);

      const sendRes = await apiFetch("/api/send-payment-receipt-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: digits,
          clientName: payment.clientName,
          receiptNo: payment.receiptNo,
          amount: amountFormatted,
          filename: safeFilename,
          mediaId,
          paymentDate: new Date(payment.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          paymentMode: payment.mode,
          transactionRef: payment.remarks || "—",
        }),
      });

      const sendData = await sendRes.json().catch(() => ({}));

      if (!sendRes.ok && sendRes.status !== 207) {
        throw new Error(sendData.error || "WhatsApp delivery failed");
      }

      toast({
        title: "Receipt Sent via WhatsApp",
        description: `Payment receipt sent to ${payment.clientName} (${digits})`,
      });
    } catch (error: any) {
      toast({
        title: "WhatsApp Error",
        description: error.message || "Could not send receipt via WhatsApp",
        variant: "destructive",
      });
    } finally {
      setSendingWhatsApp(null);
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  if (user?.role !== "admin" && user?.role !== "client") {
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
            {isClient ? "My Payments" : "Receive Payments"}
          </h1>
          <p className="text-muted-foreground font-medium">
            {isClient
              ? "Track your invoices and payment history"
              : "Manage incoming cash flow and reconcile client accounts"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {}
        <div className="lg:col-span-1 space-y-6">
          {!isClient && (
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="bg-neutral-50 border-b-2 border-black">
                <CardTitle className="text-xs font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                  <Receipt className="w-4 h-4" /> Billing Account
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <Select
                  value={selectedClient}
                  onValueChange={setSelectedClient}
                >
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
          )}

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
                  <div className="pt-1 border-t border-neutral-200">
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">
                      Total Payments
                    </p>
                    <p className="text-xl font-black text-neutral-700">
                      {allPayments.length} transaction
                      {allPayments.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {}
        <div className="lg:col-span-3 space-y-6">
          {!selectedClient ? (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-neutral-300 rounded-xl bg-neutral-50/50 opacity-60">
              <Info className="w-12 h-12 text-neutral-400 mb-4" />
              <h3 className="text-lg font-black uppercase text-neutral-400">
                No client selected
              </h3>
              <p className="text-neutral-400 font-medium text-sm">
                Select a client account to view invoices and record payments
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {}
              {allPayments.length > 0 && (
                <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b-2 border-black bg-green-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                        <ArrowDownUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h2 className="font-black text-lg uppercase tracking-tight">
                          Recent Payments
                        </h2>
                        <p className="text-xs text-neutral-500 font-medium">
                          {allPayments.length} transactions • Download or send
                          receipt via WhatsApp
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-black bg-neutral-50">
                          <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                            Date
                          </th>
                          <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                            Receipt No.
                          </th>
                          <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                            Invoice
                          </th>
                          <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-neutral-500 hidden md:table-cell">
                            Project
                          </th>
                          <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                            Mode
                          </th>
                          <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                            Amount
                          </th>
                          <th className="text-center px-4 py-3 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {allPayments.map((payment, rowIdx) => {
                          const key = `${payment.invoiceId}-${payment.paymentIndex}`;
                          const isDownloading = downloadingReceipt === key;
                          const isSendingWA = sendingWhatsApp === key;

                          return (
                            <tr
                              key={key}
                              className={cn(
                                "border-b border-neutral-100 hover:bg-neutral-50 transition-colors",
                                rowIdx % 2 === 0
                                  ? "bg-white"
                                  : "bg-neutral-50/40",
                              )}
                            >
                              <td className="px-4 py-3">
                                <p className="font-bold text-sm text-neutral-800">
                                  {format(new Date(payment.date), "dd MMM yy")}
                                </p>
                              </td>
                              <td className="px-4 py-3">
                                <span className="font-black text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">
                                  {payment.receiptNo}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <p className="font-black text-sm">
                                  {payment.invoiceNo}
                                </p>
                                <p className="text-[10px] text-neutral-400 font-medium">
                                  {payment.invoiceStatus}
                                </p>
                              </td>
                              <td className="px-4 py-3 hidden md:table-cell">
                                <p className="text-sm font-bold text-neutral-700 truncate max-w-[140px]">
                                  {payment.projectTitle}
                                </p>
                                {payment.remarks && (
                                  <p className="text-[10px] text-neutral-400 italic truncate max-w-[140px]">
                                    {payment.remarks}
                                  </p>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <span className="text-[10px] font-black uppercase bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded">
                                  {payment.mode}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <p className="font-black text-base text-green-700">
                                  {formatCurrency(payment.amount)}
                                </p>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-center gap-2">
                                  {}
                                  <button
                                    onClick={() =>
                                      handleDownloadReceipt(payment)
                                    }
                                    disabled={isDownloading}
                                    title="Download Payment Receipt (PDF)"
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black text-white text-[10px] font-black uppercase rounded hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {isDownloading ? (
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                      <Download className="w-3 h-3" />
                                    )}
                                    <span>Receipt</span>
                                  </button>

                                  {}
                                  <button
                                    onClick={() =>
                                      handleWhatsAppReceipt(payment)
                                    }
                                    disabled={
                                      isSendingWA || !payment.clientPhone
                                    }
                                    title={
                                      !payment.clientPhone
                                        ? "No phone number for this client"
                                        : "Send receipt via WhatsApp"
                                    }
                                    className="flex items-center gap-1 px-2.5 py-1.5 bg-[#25D366] text-white text-[10px] font-black uppercase rounded hover:bg-[#1ebe5a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                  >
                                    {isSendingWA ? (
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                      <WhatsAppIcon className="w-3 h-3" />
                                    )}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {}
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
                    const baseAmount = Number(inv.amount || 0);
                    const taxAmount = Number(inv.tax || 0);
                    const total = baseAmount + taxAmount;
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
                              {!isPaid && !isClient && (
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
                                            {!isClient && (
                                              <>
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
                                                    handleDeletePayment(
                                                      inv,
                                                      idx,
                                                    )
                                                  }
                                                  className="p-1.5 hover:bg-red-50 rounded border border-transparent hover:border-red-200 transition-colors"
                                                  title="Delete payment"
                                                >
                                                  <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                                </button>
                                              </>
                                            )}
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

      {}
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
                  Amount Received (INR) + 18% GST
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
                <div className="bg-blue-50 p-3 border-2 border-blue-200 rounded space-y-1">
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-blue-600">Bill Amount:</span>
                    <span className="text-blue-700">
                      {formatCurrency(
                        (activeInvoice.amount || 0) -
                          (activeInvoice.paidAmount || 0),
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-blue-600">GST (18%):</span>
                    <span className="text-blue-700">
                      {formatCurrency(
                        ((activeInvoice.amount || 0) -
                          (activeInvoice.paidAmount || 0)) *
                          0.18,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-black border-t border-blue-200 pt-1 mt-1">
                    <span className="text-blue-700 uppercase tracking-wider">
                      Total to Receive:
                    </span>
                    <span className="text-blue-900 text-sm">
                      {formatCurrency(
                        ((activeInvoice.amount || 0) -
                          (activeInvoice.paidAmount || 0)) *
                          1.18,
                      )}
                    </span>
                  </div>
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

      {}
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 font-black text-xl transition-all hover:scale-[1.02] active:scale-95"
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
