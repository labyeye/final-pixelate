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
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { AddInvoiceDialog } from "@/components/invoices/add-invoice-dialog";
import EditInvoiceDialog from "@/components/invoices/edit-invoice-dialog";
import RecordPaymentDialog from "@/components/invoices/record-payment-dialog";
import { pdf } from "@react-pdf/renderer";
import { renderToString } from "react-dom/server";
import { InvoicePDFDocument } from "@/components/invoices/invoice-pdf-document";
import dynamic from "next/dynamic";
import {
  WhatsAppInvoiceSendButton,
  WhatsAppOptInToggle,
} from "@/components/invoices/send-whatsapp-invoice-dialog";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center py-10">Loading PDF Viewer...</div>
    ),
  },
);
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type Invoice = any;

const getInvoiceItems = (invoice: any) => {
  if (!invoice) return [];
  if (Array.isArray(invoice.items) && invoice.items.length)
    return invoice.items;
  if (Array.isArray(invoice.lineItems) && invoice.lineItems.length)
    return invoice.lineItems;
  if (invoice.amount && !Array.isArray(invoice.items)) {
    return [
      {
        description: invoice.title || invoice.projectTitle || "Service",
        quantity: 1,
        unitPrice: Number(invoice.amount),
        amount: Number(invoice.amount),
      },
    ];
  }
  return [];
};

const calculateInvoiceTotals = (invoice: any) => {
  const items = getInvoiceItems(invoice);
  const subtotal = items.reduce(
    (sum: number, item: any) => sum + (item.amount || 0),
    0,
  );
  const discount = Number(invoice?.discount ?? 0);
  const tax = (Math.max(0, subtotal - discount) * 18) / 100;
  const total = subtotal - discount + tax;
  const paidAmount = Number(invoice?.paidAmount ?? invoice?.paid ?? 0);

  return { subtotal, discount, tax, total, paidAmount };
};

export default function InvoicingPage() {
  const { user } = useAuth();
  const isClient = user?.role === "client";
  const myClientId = (user as any)?.clientId ?? null;

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [downloading, setDownloading] = useState<Record<string, boolean>>({});
  const [previewInvoice, setPreviewInvoice] = useState<any | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [gmailSending, setGmailSending] = useState<Record<string, boolean>>({});
  const [deletingInvoices, setDeletingInvoices] = useState<Set<string>>(
    new Set(),
  );
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const url =
          isClient && myClientId
            ? `/api/invoices?clientId=${encodeURIComponent(myClientId)}`
            : "/api/invoices";
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch invoices: ${res.status}`);
        const list = await res.json();
        if (mounted) setInvoices(list as Invoice[]);
      } catch (err) {
        console.error("Failed to load invoices", err);
      }
    })();
    (async () => {
      try {
        const [cRes, sRes, pRes] = await Promise.all([
          fetch("/api/clients"),
          fetch("/api/services"),
          fetch("/api/projects"),
        ]);
        const [cJson, sJson, pJson] = await Promise.all([
          cRes.json(),
          sRes.json(),
          pRes.json(),
        ]);
        if (mounted) {
          setClients(cJson || []);
          setServices(sJson || []);
          setProjects(pJson || []);
        }
      } catch (e) {
        console.error("Failed to load invoice helpers", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [isClient, myClientId]);

  const refresh = async () => {
    try {
      const url =
        isClient && myClientId
          ? `/api/invoices?clientId=${encodeURIComponent(myClientId)}`
          : "/api/invoices";
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch invoices");
      const list = await res.json();
      setInvoices(list as Invoice[]);
    } catch (err) {
      console.error(err);
    }
  };

  const refreshClients = async () => {
    try {
      const res = await fetch("/api/clients");
      if (!res.ok) return;
      const data = await res.json();
      setClients(data || []);
    } catch (err) {
      console.error("Failed to refresh clients", err);
    }
  };

  const handleDeleteInvoice = async (invoiceId: string, invoiceNo: string) => {
    if (deletingInvoices.has(invoiceId)) return;
    if (!window.confirm("Delete this invoice? This cannot be undone.")) return;

    setDeletingInvoices((prev) => new Set(prev).add(invoiceId));
    try {
      const res = await fetch(`/api/invoices/${invoiceId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Delete failed");
      }

      setInvoices((prev) =>
        prev.filter((inv) => String(inv._id ?? inv.id ?? "") !== invoiceId),
      );
      toast({
        title: "Invoice Deleted",
        description: `Invoice ${invoiceNo} deleted.`,
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Delete Failed",
        description:
          err.message || "Could not delete invoice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletingInvoices((prev) => {
        const next = new Set(prev);
        next.delete(invoiceId);
        return next;
      });
    }
  };

  const sanitizeFileName = (s: string) =>
    String(s || "invoice")
      .replace(/[^a-z0-9\-\_ ]/gi, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 120);

  const generatePdfAndSave = async (invoice: any) => {
    const id = String(invoice._id ?? invoice.id ?? Date.now());
    const clientName =
      invoice.clientName ||
      invoice.client ||
      clients.find((c) => String(c.id ?? c._id) === String(invoice.clientId))
        ?.name ||
      "Client";
    const namePart = sanitizeFileName(clientName);
    const fileName = `Invoice-${namePart}-${id}.pdf`;

    try {
      setPreviewLoading(true);
      setDownloading((prev) => ({ ...prev, [id]: true }));

      const client = clients.find(
        (c) => String(c.id ?? c._id) === String(invoice.clientId),
      );

      console.log("Generating PDF with @react-pdf/renderer...");

      const blob = await pdf(
        <InvoicePDFDocument invoice={invoice} client={client} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log("PDF generated successfully");
    } catch (error) {
      console.error("PDF generation failed:", error);

      try {
        console.log("Trying alternative PDF generation...");

        const printWindow = window.open("", "_blank");
        if (printWindow) {
          const previewContent = document.querySelector(
            ".invoice-preview-content",
          );

          const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Invoice ${invoice.invoiceNo || invoice.id}</title>
              <style>
                body { 
                  font-family: 'Inter', 'Segoe UI', sans-serif; 
                  padding: 15mm 20mm;
                  color: #333;
                  background: #fff;
                  width: 210mm;
                  min-height: 297mm;
                  margin: 0 auto;
                  box-sizing: border-box;
                }
                .invoice-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-start;
                  margin-bottom: 20px;
                }
                .company-info {
                  display: flex;
                  align-items: center;
                  gap: 12px;
                }
                .company-name {
                  font-size: 22px;
                  font-weight: 800;
                  color: #044bab;
                }
                .company-subtitle {
                  font-size: 12px;
                  color: #666;
                  margin-top: 2px;
                }
                .invoice-title {
                  font-size: 26px;
                  font-weight: 800;
                  color: #044bab;
                  text-align: right;
                  margin-bottom: 8px;
                }
                .status-section {
                  display: flex;
                  flex-direction: column;
                  align-items: flex-end;
                  gap: 4px;
                  margin-bottom: 8px;
                }
                .status-badge {
                  display: inline-flex;
                  justify-content: center;
                  align-items: center;
                  padding: 6px 12px;
                  border-radius: 8px;
                  background: #16a34a;
                  color: #fff;
                  font-weight: 800;
                  font-size: 12px;
                }
                .amount-info {
                  font-size: 11px;
                  color: #666;
                  text-align: right;
                }
                .from-to-section {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 30px;
                  margin-bottom: 20px;
                }
                .section-title {
                  font-size: 11px;
                  font-weight: 600;
                  color: #044bab;
                  text-transform: uppercase;
                  margin-bottom: 6px;
                }
                .company-details {
                  font-size: 14px;
                  font-weight: 700;
                  color: #333;
                }
                .details-text {
                  font-size: 11px;
                  color: #666;
                  margin-top: 3px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 20px;
                  font-size: 12px;
                }
                th {
                  background: #044bab;
                  color: #fff;
                  padding: 10px 12px;
                  text-align: left;
                  font-weight: 600;
                  font-size: 11px;
                }
                td {
                  padding: 10px 12px;
                  border-bottom: 1px solid #eee;
                }
                .text-right {
                  text-align: right;
                }
                .work-details {
                  margin-bottom: 20px;
                  padding: 12px;
                  border: 1px solid #eee;
                  border-radius: 6px;
                }
                .work-details-title {
                  font-size: 12px;
                  font-weight: 700;
                  color: #044bab;
                  margin-bottom: 8px;
                }
                .work-details-content {
                  font-size: 11px;
                  color: #333;
                  line-height: 1.4;
                }
                .summary-section {
                  display: flex;
                  justify-content: space-between;
                  gap: 40px;
                  margin-bottom: 25px;
                }
                .notes-section {
                  flex: 1;
                }
                .notes-title {
                  font-size: 11px;
                  font-weight: 600;
                  color: #044bab;
                  text-transform: uppercase;
                  margin-bottom: 10px;
                }
                .notes-content {
                  font-size: 11px;
                  color: #666;
                  line-height: 1.5;
                }
                .totals-box {
                  width: 280px;
                  padding: 15px;
                  border: 1px solid #eee;
                }
                .total-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 8px;
                }
                .total-label {
                  font-size: 12px;
                  color: #666;
                }
                .total-value {
                  font-size: 12px;
                  font-weight: 600;
                  color: #333;
                }
                .final-total {
                  padding-top: 12px;
                  border-top: 2px solid #044bab;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                }
                .final-total-label {
                  font-size: 14px;
                  font-weight: 700;
                  color: #044bab;
                }
                .final-total-value {
                  font-size: 18px;
                  font-weight: 800;
                  color: #044bab;
                }
                .footer {
                  display: grid;
                  grid-template-columns: 1fr 1fr 1fr;
                  gap: 20px;
                  margin-bottom: 20px;
                  padding-top: 20px;
                  border-top: 1px solid #eee;
                }
                .footer-title {
                  font-size: 11px;
                  font-weight: 600;
                  color: #044bab;
                  text-transform: uppercase;
                  margin-bottom: 8px;
                }
                .footer-content {
                  font-size: 11px;
                  color: #666;
                  line-height: 1.5;
                }
                .terms {
                  font-size: 10px;
                  color: #666;
                  text-align: center;
                  padding-top: 15px;
                  border-top: 1px solid #eee;
                }
                @media print {
                  body { margin: 0; }
                }
              </style>
            </head>
            <body>
              ${renderToString(
                <div className="invoice-preview-content">
                  <InvoicePDFDocument
                    invoice={invoice}
                    client={clients.find(
                      (c) => String(c.id ?? c._id) === String(invoice.clientId),
                    )}
                  />
                </div>,
              )}
            </body>
          </html>
        `;

          printWindow.document.write(htmlContent);
          printWindow.document.close();

          printWindow.onload = function () {
            printWindow.print();
            setTimeout(() => {
              printWindow.close();
            }, 1000);
          };
        } else {
          toast({
            title: "Popups Blocked",
            description:
              "Please allow popups to download the invoice, or try again.",
            variant: "destructive",
          });
        }
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError);

        const { total, paidAmount } = calculateInvoiceTotals(invoice);
        const simpleText =
          `Invoice #: ${invoice.invoiceNo || invoice.id}\n` +
          `Client: ${clientName}\n` +
          `Total: ₹${total.toLocaleString()}\n` +
          `Paid: ₹${paidAmount.toLocaleString()}\n\n` +
          `Please contact support for a proper invoice.`;

        toast({
          title: "PDF Generation Failed",
          description: "PDF could not be generated. Please contact support.",
          variant: "destructive",
        });
      }
    } finally {
      setPreviewLoading(false);
      setDownloading((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setPreviewInvoice(null);
    }
  };

  const sendGmailInvoice = async (invoice: any) => {
    const id = String(invoice._id ?? invoice.id ?? Date.now());
    const clientObj = clients.find(
      (c) => String(c.id ?? c._id) === String(invoice.clientId),
    );
    const clientEmail =
      clientObj?.email || invoice?.clientEmail || invoice?.email || "";
    const clientName =
      invoice.clientName || invoice.client || clientObj?.name || "Client";

    if (!clientEmail) {
      toast({
        title: "No Email Found",
        description:
          "No email address found for this client. Please update the client record first.",
        variant: "destructive",
      });
      return;
    }

    try {
      setGmailSending((prev) => ({ ...prev, [id]: true }));

      const blob = await pdf(
        <InvoicePDFDocument invoice={invoice} client={clientObj} />,
      ).toBlob();

      const arrayBuffer = await blob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = "";
      uint8Array.forEach((byte) => {
        binary += String.fromCharCode(byte);
      });
      const base64 = btoa(binary);

      const sanitized = String(clientName || "invoice")
        .replace(/[^a-z0-9\-\_ ]/gi, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 80);
      const fileName = `Invoice-${sanitized}-${id}.pdf`;

      const res = await fetch("/api/send-invoice-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: clientEmail,
          invoiceNo: invoice.invoiceNo ?? invoice.id,
          clientName,
          pdfBase64: base64,
          fileName,
          amount: invoice.amount ?? 0,
          dueDate: invoice.dueDate ?? null,
          status: invoice.status ?? null,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to send email");
      }

      toast({
        title: "Email Sent ✅",
        description: `Invoice sent to ${clientEmail} successfully!`,
      });
    } catch (e: any) {
      console.error("Gmail invoice send failed:", e);
      toast({
        title: "Email Failed",
        description: e.message || String(e),
        variant: "destructive",
      });
    } finally {
      setGmailSending((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const exportCsv = async () => {
    try {
      const escape = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
      const headers = [
        "Invoice No",
        "Client",
        "Title",
        "Amount",
        "Paid Amount",
        "Due Date",
        "Status",
        "Inventory Items",
        "Inventory Items Total",
        "GST Total",
        "Final Total",
        "Created At",
        "Updated At",
      ];
      const rows: string[] = [];
      rows.push(headers.map((h) => escape(h)).join(","));
      for (const inv of invoices) {
        const invItems = Array.isArray(inv.inventoryItems)
          ? inv.inventoryItems
          : [];
        const invItemsStr = invItems
          .map(
            (it: any) =>
              `${it.inventoryId || ""}:${it.quantity || 0}@${it.sellingPrice || 0}`,
          )
          .join("; ");
        const itemsTotal = invItems.reduce(
          (s: number, r: any) =>
            s + Number(r.sellingPrice || 0) * Number(r.quantity || 0),
          0,
        );
        const gstTotal = invItems.reduce(
          (s: number, r: any) =>
            s +
            Number(r.sellingPrice || 0) *
              Number(r.quantity || 0) *
              (Number(r.gstPercentage || 0) / 100),
          0,
        );
        const finalTotal = Number(inv.amount || 0);
        const clientName =
          inv.clientName ||
          inv.client ||
          clients.find((c) => String(c.id ?? c._id) === String(inv.clientId))
            ?.name ||
          "";
        const row = [
          inv.invoiceNo ?? inv.id ?? "",
          clientName,
          inv.title ?? inv.projectTitle ?? "",
          Number(inv.amount ?? 0).toFixed(2),
          Number(inv.paidAmount ?? 0).toFixed(2),
          inv.dueDate ? new Date(inv.dueDate).toISOString() : "",
          inv.status || "",
          invItemsStr,
          itemsTotal.toFixed(2),
          gstTotal.toFixed(2),
          finalTotal.toFixed(2),
          inv.createdAt ? new Date(inv.createdAt).toISOString() : "",
          inv.updatedAt ? new Date(inv.updatedAt).toISOString() : "",
        ];
        rows.push(row.map((c) => escape(c)).join(","));
      }
      const csv = rows.join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute(
        "download",
        `invoices-${new Date().toISOString().slice(0, 10)}.csv`,
      );
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Export CSV failed", e);
      toast({
        title: "Export Failed",
        description: "Failed to export invoices. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8 font-headline">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">
            {isClient ? "MY INVOICES" : "INVOICING"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isClient
              ? "All invoices raised for your account."
              : "Manage and track all client invoices."}
          </p>
        </div>
        {!isClient && (
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={exportCsv}>
              Export Excel
            </Button>
            <AddInvoiceDialog clients={clients} onCreated={refresh} />
          </div>
        )}
      </header>

      <div className="border-2 border-black">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black">
              <TableHead className="text-sm font-bold">Invoice No</TableHead>
              <TableHead className="text-sm font-bold">Client</TableHead>
              <TableHead className="text-sm font-bold">
                Project / Title
              </TableHead>
              <TableHead className="text-sm font-bold">Amount</TableHead>
              <TableHead className="text-sm font-bold">Paid</TableHead>
              <TableHead className="text-sm font-bold">Due Date</TableHead>
              <TableHead className="text-right text-sm font-bold">
                Status
              </TableHead>
              <TableHead className="text-right text-sm font-bold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice._id ?? invoice.id ?? invoice.invoiceNo}
                className="border-b-2 border-black last:border-b-0"
              >
                <TableCell className="font-bold text-sm py-2">
                  {invoice.invoiceNo ?? invoice.id ?? invoice._id}
                </TableCell>
                <TableCell className="text-sm py-2">
                  {invoice.clientName ||
                    invoice.client ||
                    clients.find(
                      (c) => String(c.id ?? c._id) === String(invoice.clientId),
                    )?.name ||
                    "-"}
                </TableCell>
                <TableCell className="text-sm py-2">
                  {invoice.title ?? invoice.projectTitle ?? "-"}
                </TableCell>
                <TableCell className="text-sm py-2">
                  ₹{(invoice.amount ?? 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-sm py-2">
                  ₹{(invoice.paidAmount ?? 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-sm py-2">
                  {invoice.dueDate
                    ? new Date(invoice.dueDate).toLocaleDateString()
                    : ""}
                </TableCell>
                <TableCell className="text-right py-2">
                  <span
                    className={cn(
                      "text-xs font-black tracking-widest p-1",
                      invoice.status === "PAID" &&
                        "bg-success text-success-foreground",
                      invoice.status === "DUE" &&
                        "bg-destructive text-destructive-foreground",
                      invoice.status === "OVERDUE" &&
                        "bg-accent text-accent-foreground",
                    )}
                  >
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell className="text-right py-2">
                  <div className="flex items-center justify-end gap-2">
                    {!isClient && (
                      <EditInvoiceDialog
                        invoice={invoice}
                        clients={clients}
                        services={services}
                        projects={projects}
                        onUpdated={refresh}
                      />
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPreviewInvoice(invoice)}
                    >
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => generatePdfAndSave(invoice)}
                      disabled={
                        !!downloading[
                          String(
                            invoice.invoiceNo ??
                              invoice._id ??
                              invoice.id ??
                              "",
                          )
                        ]
                      }
                    >
                      {downloading[
                        String(
                          invoice.invoiceNo ?? invoice._id ?? invoice.id ?? "",
                        )
                      ]
                        ? "Downloading..."
                        : "Download"}
                    </Button>
                    {!isClient && (
                      <>
                        {}
                        <WhatsAppOptInToggle
                          client={clients.find(
                            (c) =>
                              String(c.id ?? c._id) ===
                              String(invoice.clientId),
                          )}
                          onClientUpdate={refreshClients}
                        />

                        {}
                        <WhatsAppInvoiceSendButton
                          invoice={invoice}
                          client={clients.find(
                            (c) =>
                              String(c.id ?? c._id) ===
                              String(invoice.clientId),
                          )}
                          onClientUpdate={refreshClients}
                        />

                        {}
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-[#EA4335] text-[#EA4335] hover:bg-[#EA4335] hover:text-white disabled:opacity-50"
                          title="Send via Gmail"
                          disabled={
                            !!gmailSending[
                              String(invoice._id ?? invoice.id ?? "")
                            ]
                          }
                          onClick={() => sendGmailInvoice(invoice)}
                        >
                          {gmailSending[
                            String(invoice._id ?? invoice.id ?? "")
                          ] ? (
                            <svg
                              className="w-3.5 h-3.5 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                              />
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.908 1.528-1.148C21.69 2.28 24 3.434 24 5.457z"
                                fill="currentColor"
                              />
                            </svg>
                          )}
                        </Button>
                      </>
                    )}
                    {!isClient && (
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={deletingInvoices.has(
                          String(invoice._id ?? invoice.id ?? ""),
                        )}
                        onClick={() =>
                          handleDeleteInvoice(
                            String(invoice._id ?? invoice.id ?? ""),
                            String(invoice.invoiceNo ?? invoice.id ?? ""),
                          )
                        }
                      >
                        {deletingInvoices.has(
                          String(invoice._id ?? invoice.id ?? ""),
                        )
                          ? "Deleting..."
                          : "Delete"}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {}
      <Dialog
        open={!!previewInvoice}
        onOpenChange={(open) => {
          if (!open) setPreviewInvoice(null);
        }}
      >
        <DialogContent className="max-w-4xl w-full">
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[70vh] overflow-auto border-t pt-4">
            {previewInvoice ? (
              <div className="h-[70vh] w-full">
                <PDFViewer
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0"
                >
                  <InvoicePDFDocument
                    invoice={previewInvoice}
                    client={clients.find(
                      (c) =>
                        String(c.id ?? c._id) ===
                        String(previewInvoice.clientId),
                    )}
                  />
                </PDFViewer>
              </div>
            ) : (
              <div className="p-4">No preview available</div>
            )}
          </div>
          <DialogFooter>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setPreviewInvoice(null)}>
                Close
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  previewInvoice && generatePdfAndSave(previewInvoice)
                }
                disabled={previewLoading}
              >
                {previewLoading ? "Preparing..." : "Download PDF"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
