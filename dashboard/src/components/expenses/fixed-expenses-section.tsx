"use client";

import { apiFetch } from "@/lib/api-fetch";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Plus,
  FileUp,
  FileText,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Trash2,
  Repeat,
} from "lucide-react";
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from "./add-expense-dialog";

function currentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthOptions() {
  const opts: { value: string; label: string }[] = [];
  const d = new Date();
  for (let i = 0; i < 12; i++) {
    const dt = new Date(d.getFullYear(), d.getMonth() - i, 1);
    const value = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
    const label = dt.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    opts.push({ value, label });
  }
  return opts;
}

function billHref(url: string) {
  if (!url) return "#";
  if (url.startsWith("http")) return url;
  // New uploads live in this app's own public/ dir — same-origin, no prefix needed.
  if (url.startsWith("/uploads/")) return url;
  // Legacy bills saved under the separate website app's /assets/ path.
  return `https://www.pixelatenest.com${url}`;
}

function AddFixedExpenseDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("office");
  const [vendor, setVendor] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [note, setNote] = useState("");

  const reset = () => {
    setTitle("");
    setAmount("");
    setCategory("office");
    setVendor("");
    setPaymentMethod("");
    setNote("");
  };

  const handleSave = async () => {
    if (!title || !amount) return;
    setSaving(true);
    try {
      const res = await apiFetch("/api/fixed-expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          amount: Number(amount),
          category,
          vendor,
          paymentMethod,
          note,
        }),
      });
      if (!res.ok) throw new Error("Failed to create fixed expense");
      setOpen(false);
      reset();
      onCreated();
    } catch (e) {
      console.error(e);
      alert("Failed to save fixed expense");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button size="lg" className="gap-2" onClick={() => setOpen(true)}>
        <Plus className="h-5 w-5" />
        New Fixed Expense
      </Button>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            New Fixed (Recurring) Expense
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold">Title *</label>
            <Input
              placeholder="e.g. Office Rent, Server Hosting..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold">Amount (₹) *</label>
              <Input
                type="number"
                min={0}
                step={0.01}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      <span className="flex items-center gap-2">
                        <c.icon className="h-4 w-4" />
                        {c.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold">Vendor / Paid To</label>
              <Input value={vendor} onChange={(e) => setVendor(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold">Payment Method</label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold">Notes</label>
            <Textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || !title || !amount}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MarkPaidDialog({
  fixedExpense,
  month,
  open,
  onOpenChange,
  onSaved,
}: {
  fixedExpense: any;
  month: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSaved: (updated: any) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setInvoiceUrl("");
      setFileName("");
    }
  }, [open]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await apiFetch("/api/upload-expense-bill", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");
      setInvoiceUrl(data.url);
      setFileName(file.name);
    } catch (err: any) {
      alert(err?.message || "Failed to upload invoice");
    } finally {
      setUploading(false);
    }
  };

  const handleConfirm = async () => {
    if (!invoiceUrl) return;
    setSaving(true);
    try {
      const id = fixedExpense._id ?? fixedExpense.id;
      const res = await apiFetch(`/api/fixed-expenses/${id}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month, status: "paid", invoiceUrl }),
      });
      if (!res.ok) throw new Error("Failed to mark as paid");
      const updated = await res.json();
      onSaved(updated);
      onOpenChange(false);
    } catch (e) {
      console.error(e);
      alert("Failed to mark as paid");
    } finally {
      setSaving(false);
    }
  };

  const monthLabel = new Date(`${month}-01`).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-black">
            Mark Paid — {monthLabel}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Upload the invoice/receipt PDF for <strong>{fixedExpense.title}</strong>{" "}
            ({monthLabel}). This will also be added to your Expenses records.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFile}
          />
          {!invoiceUrl ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full border-2 border-dashed border-blue-300 rounded-sm p-6 flex flex-col items-center gap-2 text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FileUp className="h-6 w-6" />
              <span className="text-sm font-semibold">
                {uploading ? "Uploading..." : "Click to upload invoice PDF"}
              </span>
              <span className="text-xs text-blue-400">Max size: 10MB</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 p-3 bg-white border-2 border-blue-200 rounded-sm">
              <FileText className="h-8 w-8 text-blue-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{fileName}</p>
                <a
                  href={billHref(invoiceUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  View uploaded PDF
                </a>
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!invoiceUrl || saving}>
            {saving ? "Saving..." : "Confirm Paid"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function FixedExpensesSection() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(currentMonth());
  const [markPaidTarget, setMarkPaidTarget] = useState<any | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiFetch("/api/fixed-expenses");
      if (!res.ok) throw new Error("Failed to fetch fixed expenses");
      const json = await res.json();
      setItems(Array.isArray(json) ? json : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const months = useMemo(() => monthOptions(), []);

  const getPayment = (item: any, m: string) =>
    (item.payments || []).find((p: any) => p.month === m);

  const handleUnmark = async (item: any) => {
    if (!window.confirm("Mark this month as unpaid? This will remove the linked expense entry."))
      return;
    try {
      const id = item._id ?? item.id;
      const res = await apiFetch(`/api/fixed-expenses/${id}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ month, status: "pending" }),
      });
      if (!res.ok) throw new Error("Failed");
      const updated = await res.json();
      setItems((prev) =>
        prev.map((i) => ((i._id ?? i.id) === id ? updated : i)),
      );
    } catch (e) {
      console.error(e);
      alert("Failed to update");
    }
  };

  const handleDelete = async (item: any) => {
    try {
      const id = item._id ?? item.id;
      const res = await apiFetch(`/api/fixed-expenses/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed");
      setItems((prev) => prev.filter((i) => (i._id ?? i.id) !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete");
    }
  };

  const monthLabel = new Date(`${month}-01`).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Repeat className="h-5 w-5" />
          <div>
            <h2 className="text-lg font-black">Fixed / Recurring Expenses</h2>
            <p className="text-sm text-muted-foreground">
              Mark each month as paid and attach the invoice.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-[180px] border-2 border-black font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <AddFixedExpenseDialog onCreated={load} />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          Loading...
        </div>
      ) : items.length === 0 ? (
        <div className="border-2 border-black p-8 text-center text-muted-foreground font-bold">
          No fixed expenses yet. Add rent, hosting, subscriptions, etc.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const id = item._id ?? item.id;
            const payment = getPayment(item, month);
            const isPaid = payment?.status === "paid";
            return (
              <div
                key={id}
                className="border-2 border-black bg-white p-4 flex flex-wrap items-center justify-between gap-3"
              >
                <div className="min-w-[180px]">
                  <div className="font-black">{item.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {EXPENSE_CATEGORIES.find((c) => c.value === item.category)
                      ?.label || item.category}{" "}
                    {item.vendor ? `· ${item.vendor}` : ""}
                  </div>
                </div>
                <div className="font-black text-base">
                  ₹{Number(item.amount || 0).toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  {isPaid ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-bold bg-success/10 text-success border-success/30">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Paid — {monthLabel}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-bold bg-secondary/10 text-secondary border-secondary/30">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Pending — {monthLabel}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {isPaid ? (
                    <>
                      {payment?.invoiceUrl && (
                        <a
                          href={billHref(payment.invoiceUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 text-blue-500"
                            title="Download invoice"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => handleUnmark(item)}
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Unmark
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      className="gap-1"
                      onClick={() => setMarkPaidTarget(item)}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Mark Paid
                    </Button>
                  )}
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
                          Delete Fixed Expense?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This removes the recurring template &quot;{item.title}
                          &quot;. Past linked expense records will remain.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                          onClick={() => handleDelete(item)}
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
      )}

      {markPaidTarget && (
        <MarkPaidDialog
          fixedExpense={markPaidTarget}
          month={month}
          open={!!markPaidTarget}
          onOpenChange={(v) => {
            if (!v) setMarkPaidTarget(null);
          }}
          onSaved={(updated) => {
            setItems((prev) =>
              prev.map((i) =>
                (i._id ?? i.id) === (updated._id ?? updated.id) ? updated : i,
              ),
            );
          }}
        />
      )}
    </div>
  );
}

export default FixedExpensesSection;
