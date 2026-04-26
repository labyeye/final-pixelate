"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import type { Client } from "@/lib/data";
import { InvoicePDF } from "./invoice-pdf";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";

const WA_GREEN = "#25D366";

const HSN_OPTIONS = [
  { value: "998314", label: "998314 – IT/Creative Services" },
  { value: "999612", label: "999612 – Photography/Video" },
  { value: "998315", label: "998315 – Hosting/Maintenance" },
];

type LineItem = {
  description: string;
  hsnCode: string;
  quantity: number;
  rate: number;
};

const emptyLineItem = (): LineItem => ({
  description: "",
  hsnCode: "998314",
  quantity: 1,
  rate: 0,
});

type AddFormValues = {
  clientId: string;
  projectTitle: string;
  title: string;
  dueDate: string;
  venueName: string;
  venueAddress: string;
  includeVenueName: boolean;
  includeVenueAddress: boolean;
};

export function AddInvoiceDialog({
  clients,
  onCreated,
}: {
  clients: Client[];
  onCreated?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [waOptIn, setWaOptIn] = React.useState(false);
  const [lineItems, setLineItems] = useState<LineItem[]>([emptyLineItem()]);

  React.useEffect(() => {
    if (!open) {
      setWaOptIn(false);
      setLineItems([emptyLineItem()]);
    }
  }, [open]);

  const form = useForm<AddFormValues>({
    defaultValues: {
      clientId: "",
      projectTitle: "",
      title: "",
      dueDate: "",
      venueName: "",
      venueAddress: "",
      includeVenueName: false,
      includeVenueAddress: false,
    },
  });

  const addLineItem = () => setLineItems((r) => [...r, emptyLineItem()]);
  const removeLineItem = (idx: number) =>
    setLineItems((r) => r.filter((_, i) => i !== idx));
  const updateLineItem = (idx: number, patch: Partial<LineItem>) =>
    setLineItems((r) =>
      r.map((row, i) => (i === idx ? { ...row, ...patch } : row)),
    );

  const subtotal = lineItems.reduce(
    (s, r) => s + Number(r.rate || 0) * Number(r.quantity || 0),
    0,
  );
  const tax = (subtotal * 18) / 100;
  const total = subtotal + tax;

  const handleSave = async (values: AddFormValues) => {
    try {
      const selectedClient: any = clients.find(
        (c) => String(c.id ?? c._id) === String(values.clientId),
      );

      const apiLineItems = lineItems.map((r) => ({
        description: r.description || "Professional Services",
        hsnCode: r.hsnCode || "998314",
        quantity: Number(r.quantity || 1),
        price: Number(r.rate || 0),
        unit: "Nos",
        discount: 0,
        amount: Number(r.rate || 0) * Number(r.quantity || 1),
      }));

      const primaryHsn = lineItems[0]?.hsnCode || "998314";

      const invoice: any = {
        clientId: values.clientId || null,
        clientName: selectedClient?.name || "",
        clientAddress: selectedClient?.address || "",
        clientCity: selectedClient?.city || "",
        clientState: selectedClient?.state || "",
        clientPin: selectedClient?.pin || "",
        clientGst:
          selectedClient?.gst ||
          selectedClient?.gstin ||
          selectedClient?.gstNumber ||
          "",
        projectTitle: values.projectTitle || values.title || "",
        title: values.title || values.projectTitle || "Invoice",
        lineItems: apiLineItems,
        amount: subtotal,
        hsnCode: primaryHsn,
        dueDate: values.dueDate || "",
        applyGst: true,
        gstPercent: 18,
        tax,
        status: "DUE",
        createdAt: new Date(),
        whatsapp_opt_in: waOptIn,
        whatsapp_opt_in_source: waOptIn ? "invoice_creation" : null,
        whatsapp_opt_in_time: waOptIn ? new Date().toISOString() : null,
      };

      if (values.includeVenueName) invoice.venueName = values.venueName || "";
      if (values.includeVenueAddress)
        invoice.venueAddress = values.venueAddress || "";

      const res = await fetch("/api/invoices", {
        method: "POST",
        body: JSON.stringify(invoice),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to create invoice");
      const created = await res.json();

      if (waOptIn && values.clientId) {
        try {
          await fetch("/api/whatsapp-optin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              clientId: values.clientId,
              invoiceNo: created.invoiceNo ?? created.id ?? "",
              source: "invoice_creation",
            }),
          });
        } catch (e) {
          console.error("[WhatsApp] Failed to save opt-in:", e);
        }
      }

      
      const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      try {
        const { loadNotoSansForJsPDF } = await import("@/lib/pdf-fonts");
        const family = await loadNotoSansForJsPDF(doc, "NotoSans");
        if (family) { try { doc.setFont(family); } catch (e) {} }

        const pdfBody = renderToString(
          <InvoicePDF invoice={{ ...created, ...invoice }} client={selectedClient} />,
        );
        const notoHref =
          "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap";

        let styledHtml: string;
        try {
          const fres = await fetch("/fonts/NotoSans-Regular.ttf");
          if (fres && fres.ok) {
            const arrayBuffer = await fres.arrayBuffer();
            const bytes = new Uint8Array(arrayBuffer);
            let binary = "";
            const chunkSize = 0x8000;
            for (let i = 0; i < bytes.length; i += chunkSize) {
              binary += String.fromCharCode.apply(
                null,
                Array.from(bytes.slice(i, i + chunkSize)) as any,
              );
            }
            const base64 =
              typeof btoa !== "undefined"
                ? btoa(binary)
                : Buffer.from(binary, "binary").toString("base64");
            const fontDataFace = `\n<style>\n@font-face { font-family: 'Noto Sans Local'; src: url('data:font/truetype;base64,${base64}') format('truetype'); font-weight: 400; font-style: normal; font-display: swap; }\n</style>\n`;
            styledHtml =
              `${fontDataFace}<link href="${notoHref}" rel="stylesheet">` +
              `<div style="width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;">${pdfBody}</div>`;
          } else {
            styledHtml = `<link href="${notoHref}" rel="stylesheet"><div style="width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;">${pdfBody}</div>`;
          }
        } catch (e) {
          styledHtml = `<link href="${notoHref}" rel="stylesheet"><div style="width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;">${pdfBody}</div>`;
        }

        const finalHtml = styledHtml.replace(/₹/g, "Rs.");
        const pageWidth = doc.internal.pageSize.getWidth();
        doc.html(finalHtml, {
          callback: (doc) => {
            const invoiceId = created.id ?? created.invoiceNo ?? created._id;
            const sanitize = (s: string) =>
              s.replace(/[\\/:*?"<>|\s]+/g, "_").replace(/^_+|_+$/g, "");
            const clientSafe = sanitize(String(created.clientName || selectedClient?.name || "Client"));
            doc.save(`${invoiceId}_${clientSafe}.pdf`);
          },
          x: 0,
          y: 0,
          width: pageWidth,
          windowWidth: 1200,
        });
      } catch (e) {
        const pdfContent = renderToString(
          <InvoicePDF invoice={{ ...created, ...invoice }} client={selectedClient} />,
        );
        const pageWidth = doc.internal.pageSize.getWidth();
        doc.html(pdfContent.replace(/₹/g, "Rs."), {
          callback: (doc) => {
            const invoiceId = created.id ?? created.invoiceNo ?? created._id;
            doc.save(`${invoiceId}_Invoice.pdf`);
          },
          x: 0, y: 0, width: pageWidth, windowWidth: 1200,
        });
      }

      setOpen(false);
      form.reset();
      if (onCreated) onCreated();
    } catch (e) {
      console.error(e);
    }
  };

  const includeVenueName = form.watch("includeVenueName");
  const includeVenueAddress = form.watch("includeVenueAddress");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" onClick={() => setOpen(true)}>
          New Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            {/* ── Basic Info ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="clientId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border rounded p-2">
                        <option value="">Select client</option>
                        {clients.map((c) => (
                          <option key={String(c.id ?? c._id)} value={String(c.id ?? c._id)}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="projectTitle"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="dueDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* ── Line Items ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-base">Services / Line Items</h3>
                <Button type="button" variant="outline" size="sm" onClick={addLineItem}>
                  + Add Row
                </Button>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-[2fr_1fr_80px_100px_100px_40px] gap-2 text-xs font-semibold text-muted-foreground border-b pb-1 mb-1 px-1">
                <span>Description</span>
                <span>HSN Code</span>
                <span>Qty</span>
                <span className="text-right">Rate (₹)</span>
                <span className="text-right">Amount (₹)</span>
                <span></span>
              </div>

              <div className="space-y-2">
                {lineItems.map((row, idx) => {
                  const amt = Number(row.rate || 0) * Number(row.quantity || 0);
                  return (
                    <div
                      key={idx}
                      className="grid grid-cols-[2fr_1fr_80px_100px_100px_40px] gap-2 items-center"
                    >
                      <Input
                        placeholder="Service description"
                        value={row.description}
                        onChange={(e) => updateLineItem(idx, { description: e.target.value })}
                      />
                      <select
                        className="border rounded p-2 text-sm"
                        value={row.hsnCode}
                        onChange={(e) => updateLineItem(idx, { hsnCode: e.target.value })}
                      >
                        {HSN_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.value}</option>
                        ))}
                      </select>
                      <Input
                        type="number"
                        min={1}
                        value={row.quantity}
                        onChange={(e) =>
                          updateLineItem(idx, { quantity: Number(e.target.value) })
                        }
                      />
                      <Input
                        type="number"
                        min={0}
                        value={row.rate}
                        onChange={(e) =>
                          updateLineItem(idx, { rate: Number(e.target.value) })
                        }
                        className="text-right"
                      />
                      <div className="text-right text-sm font-medium pr-1 self-center">
                        {amt.toLocaleString("en-IN")}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 px-2"
                        disabled={lineItems.length === 1}
                        onClick={() => removeLineItem(idx)}
                      >
                        ✕
                      </Button>
                    </div>
                  );
                })}
              </div>

              {/* Totals summary */}
              <div className="mt-4 flex flex-col items-end gap-1 text-sm border-t pt-3">
                <div className="flex gap-8">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="w-28 text-right font-medium">
                    ₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex gap-8">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="w-28 text-right font-medium">
                    ₹{tax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex gap-8 text-base font-semibold border-t pt-1 mt-1">
                  <span>Total</span>
                  <span className="w-28 text-right">
                    ₹{total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Venue (optional) ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <FormField
                  name="includeVenueName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <label className="inline-flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.value || false}
                          onChange={(e: any) => field.onChange(e.target.checked)}
                        />
                        <span className="font-medium text-sm">Include Venue Name</span>
                      </label>
                    </FormItem>
                  )}
                />
                <FormField
                  name="venueName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} disabled={!includeVenueName} placeholder="Venue name" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-2">
                <FormField
                  name="includeVenueAddress"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <label className="inline-flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.value || false}
                          onChange={(e: any) => field.onChange(e.target.checked)}
                        />
                        <span className="font-medium text-sm">Include Venue Address</span>
                      </label>
                    </FormItem>
                  )}
                />
                <FormField
                  name="venueAddress"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} disabled={!includeVenueAddress} placeholder="Venue address" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* ── WhatsApp Opt-In + Submit ── */}
            <DialogFooter>
              <div className="w-full space-y-3">
                {(() => {
                  const selectedClientId = form.watch("clientId");
                  const selectedClient = clients.find(
                    (c) => String(c.id ?? c._id) === String(selectedClientId),
                  );
                  const hasPhone = !!(
                    (selectedClient as any)?.phone ||
                    (selectedClient as any)?.whatsapp
                  );
                  if (!selectedClientId) return null;
                  return (
                    <div
                      style={{
                        border: `1.5px solid ${waOptIn ? WA_GREEN : "#e2e8f0"}`,
                        borderRadius: 10,
                        padding: "12px 14px",
                        background: waOptIn ? "#f0fdf4" : "#fafafa",
                        transition: "all 0.2s",
                      }}
                    >
                      <label
                        className="flex items-start gap-3 cursor-pointer select-none"
                        htmlFor="wa-optin-checkbox"
                      >
                        <input
                          id="wa-optin-checkbox"
                          type="checkbox"
                          checked={waOptIn}
                          onChange={(e) => setWaOptIn(e.target.checked)}
                          style={{
                            marginTop: 3,
                            accentColor: WA_GREEN,
                            width: 16,
                            height: 16,
                            flexShrink: 0,
                          }}
                        />
                        <span>
                          <span
                            className="font-semibold text-sm"
                            style={{ color: waOptIn ? "#15803d" : "#374151" }}
                          >
                            📲 Send this invoice to {selectedClient?.name ?? "client"} on WhatsApp
                          </span>
                          <span
                            className="block text-xs mt-1"
                            style={{ color: "#6b7280", lineHeight: 1.5 }}
                          >
                            By checking this box, you confirm that{" "}
                            <strong>{selectedClient?.name ?? "the client"}</strong>{" "}
                            has agreed to receive invoice and payment notifications from Pixelate Studio on WhatsApp.
                            {!hasPhone && (
                              <span className="block mt-1 text-amber-600 font-medium">
                                ⚠️ No WhatsApp number saved for this client. Add their number in the client profile first.
                              </span>
                            )}
                          </span>
                        </span>
                      </label>
                    </div>
                  );
                })()}

                <Button type="submit" size="lg" className="w-full">
                  {waOptIn ? "Create Invoice & Send on WhatsApp ✓" : "Create & Download PDF"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
