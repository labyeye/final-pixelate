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
import { AddInvoiceDialog } from "@/components/invoices/add-invoice-dialog";
import EditInvoiceDialog from "@/components/invoices/edit-invoice-dialog";
import RecordPaymentDialog from "@/components/invoices/record-payment-dialog";
import { InvoicePDF } from "@/components/invoices/invoice-pdf";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type Invoice = any;

export default function InvoicingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [downloading, setDownloading] = useState<Record<string, boolean>>({});
  const [previewInvoice, setPreviewInvoice] = useState<any | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/invoices");
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
  }, []);
  const refresh = async () => {
    try {
      const res = await fetch("/api/invoices");
      if (!res.ok) throw new Error("Failed to fetch invoices");
      const list = await res.json();
      setInvoices(list as Invoice[]);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadInvoice = async (invoice: any) => {
    // Open preview dialog instead of auto-saving
    setPreviewInvoice(invoice);
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
      const pdfContent = renderToString(
        <InvoicePDF
          invoice={invoice}
          client={clients.find(
            (c) => String(c.id ?? c._id) === String(invoice.clientId)
          )}
        />
      );
      const doc = new jsPDF();
      await doc.html(pdfContent, {
        callback: function (doc) {
          doc.save(fileName);
        },
        x: 10,
        y: 10,
        width: 180,
        windowWidth: 800,
      });
    } catch (e) {
      console.error("Failed to generate PDF", e);
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

  return (
    <div className="space-y-8 font-headline">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">INVOICING</h1>
          <p className="text-muted-foreground text-lg">
            Manage and track all client invoices.
          </p>
        </div>
        <AddInvoiceDialog
          clients={clients}
          services={services}
          projects={projects}
          onCreated={refresh}
        />
      </header>

      <div className="border-2 border-black">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black">
              <TableHead className="text-base font-bold">Invoice No</TableHead>
              <TableHead className="text-base font-bold">Client</TableHead>
              <TableHead className="text-base font-bold">
                Project / Title
              </TableHead>
              <TableHead className="text-base font-bold">Amount</TableHead>
              <TableHead className="text-base font-bold">Paid</TableHead>
              <TableHead className="text-base font-bold">Due Date</TableHead>
              <TableHead className="text-right text-base font-bold">
                Status
              </TableHead>
              <TableHead className="text-right text-base font-bold">
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
                <TableCell className="font-bold text-base py-4">
                  {invoice.invoiceNo ?? invoice.id ?? invoice._id}
                </TableCell>
                <TableCell className="text-base py-4">
                  {invoice.clientName ||
                    invoice.client ||
                    clients.find(
                      (c) => String(c.id ?? c._id) === String(invoice.clientId)
                    )?.name ||
                    "-"}
                </TableCell>
                <TableCell className="text-base py-4">
                  {invoice.title ?? invoice.projectTitle ?? "-"}
                </TableCell>
                <TableCell className="text-base py-4">
                  ₹{(invoice.amount ?? 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-base py-4">
                  ₹{(invoice.paidAmount ?? 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-base py-4">
                  {invoice.dueDate
                    ? new Date(invoice.dueDate).toLocaleDateString()
                    : ""}
                </TableCell>
                <TableCell className="text-right py-4">
                  <span
                    className={cn(
                      "text-xl font-black tracking-widest p-2",
                      invoice.status === "PAID" &&
                        "bg-success text-success-foreground",
                      invoice.status === "DUE" &&
                        "bg-destructive text-destructive-foreground",
                      invoice.status === "OVERDUE" &&
                        "bg-accent text-accent-foreground"
                    )}
                  >
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="flex items-center justify-end gap-2">
                    <EditInvoiceDialog
                      invoice={invoice}
                      clients={clients}
                      services={services}
                      projects={projects}
                      onUpdated={refresh}
                    />
                    <RecordPaymentDialog
                      invoice={invoice}
                      onRecorded={refresh}
                    />
                    <Button
                      size="sm"
                      onClick={() => downloadInvoice(invoice)}
                      disabled={
                        !!downloading[
                          String(
                            invoice.invoiceNo ?? invoice._id ?? invoice.id ?? ""
                          )
                        ]
                      }
                    >
                      {downloading[
                        String(
                          invoice.invoiceNo ?? invoice._id ?? invoice.id ?? ""
                        )
                      ]
                        ? "Downloading..."
                        : "Download"}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async () => {
                        if (!confirm("Delete this invoice?")) return;
                        try {
                          const res = await fetch(
                            `/api/invoices/${invoice._id ?? invoice.id}`,
                            { method: "DELETE" }
                          );
                          if (!res.ok) throw new Error("Delete failed");
                          await refresh();
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      Delete
                    </Button>
                    {invoice.status !== "PAID" && (
                      <Button
                        size="sm"
                        className="bg-green-600 text-white"
                        onClick={async () => {
                          try {
                            // optimistic update
                            setInvoices((prev) =>
                              prev.map((inv) =>
                                inv._id === invoice._id ||
                                inv.id === invoice.id ||
                                inv.invoiceNo === invoice.invoiceNo
                                  ? { ...inv, status: "PAID" }
                                  : inv
                              )
                            );
                            const res = await fetch(
                              `/api/invoices/${
                                invoice._id ?? invoice.id ?? invoice.invoiceNo
                              }`,
                              {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ status: "PAID" }),
                              }
                            );
                            if (!res.ok) throw new Error("Failed to mark paid");
                            await refresh();
                          } catch (err) {
                            console.error(
                              "Failed to mark invoice as paid",
                              err
                            );
                            await refresh();
                          }
                        }}
                      >
                        Mark received
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Preview Dialog */}
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
              <div className="p-4 bg-white">
                <InvoicePDF
                  invoice={previewInvoice}
                  client={clients.find((c) => String(c.id ?? c._id) === String(previewInvoice.clientId))}
                />
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
                onClick={() => previewInvoice && generatePdfAndSave(previewInvoice)}
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
