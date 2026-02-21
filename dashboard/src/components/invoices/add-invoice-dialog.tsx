"use client";

import React, { useState, useEffect } from "react";
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
import type { Client, Service } from "@/lib/data";
import { InvoicePDF } from "./invoice-pdf";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";

export function AddInvoiceDialog({
  clients,
  services,
  projects,
  onCreated,
}: {
  clients: Client[];
  services: Service[];
  projects: any[];
  onCreated?: () => void;
}) {
  type AddFormValues = {
    clientId: string;
    serviceId: string;
    projectTitle: string;
    title: string;
    amount: number;
    dueDate: string;
    assignedStaff: string[];
    workDate: string;
    workTime: string;
    venueName: string;
    venueAddress: string;
    includeVenueName: boolean;
    includeVenueAddress: boolean;
    equipmentAssigned: string[];
    description: string;
  };

  const [open, setOpen] = React.useState(false);
  const form = useForm<AddFormValues>({
    defaultValues: {
      clientId: "",
      serviceId: "",
      projectTitle: "",
      title: "",
      amount: 0,
      dueDate: "",
      assignedStaff: [],
      workDate: "",
      workTime: "",
      venueName: "",
      venueAddress: "",
      includeVenueName: false,
      includeVenueAddress: false,
      equipmentAssigned: [],
      description: "",
    },
  });

  const selectedServiceId = form.watch("serviceId");
  const selectedService = services.find(
    (s) => String(s.id ?? s._id) === String(selectedServiceId),
  );
  const isWebDev =
    (selectedService?.name || "").toLowerCase() === "web development";

  const handleSave = async (values: any) => {
    try {
      const invoice: any = {
        clientId: values.clientId || null,
        clientName:
          clients.find((c) => String(c.id ?? c._id) === String(values.clientId))
            ?.name || "",
        serviceId: values.serviceId || null,
        projectTitle: values.projectTitle || values.title || "",
        title: values.title || values.projectTitle || "Invoice",
        amount: Number(values.amount || 0),
        dueDate: values.dueDate || "",
        // new fields
        assignedStaff: Array.isArray(values.assignedStaff)
          ? values.assignedStaff
          : values.assignedStaff
            ? String(values.assignedStaff)
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : [],
        workDate: values.workDate || "",
        workTime: values.workTime || "",

        equipmentAssigned: Array.isArray(values.equipmentAssigned)
          ? values.equipmentAssigned
          : values.equipmentAssigned
            ? String(values.equipmentAssigned)
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : [],
        description: isWebDev ? values.description || "" : undefined,
        status: "DUE",
        createdAt: new Date(),
      };
      // attach inventory usage if present
      if (inventoryRows.length) {
        invoice.inventoryItems = inventoryRows.map((r) => ({
          inventoryId: r.inventoryId,
          quantity: r.quantity,
          sellingPrice: r.sellingPrice,
          gstPercentage: r.gstPercentage,
        }));
        // calculate totals from inventory rows
        const itemsTotal = inventoryRows.reduce(
          (s, r) => s + Number(r.sellingPrice || 0) * Number(r.quantity || 0),
          0,
        );
        const gstTotal = inventoryRows.reduce(
          (s, r) =>
            s +
            Number(r.sellingPrice || 0) *
              Number(r.quantity || 0) *
              (Number(r.gstPercentage || 0) / 100),
          0,
        );
        invoice.amount = Number(invoice.amount || 0) + itemsTotal + gstTotal;
      }
      // Include venue fields only when toggles are enabled
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

      // generate PDF and download (A4, full page, use embedded fonts when possible)
      const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      });
      try {
        const { loadNotoSansForJsPDF } = await import("@/lib/pdf-fonts");
        const family = await loadNotoSansForJsPDF(doc, "NotoSans");
        if (family) {
          try {
            doc.setFont(family);
          } catch (e) {}
        }

        const pdfBody = renderToString(
          <InvoicePDF invoice={{ ...created, ...invoice }} />,
        );
        const notoHref =
          "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap";

        // attempt to inline local font as base64 for robust PDF rendering
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
            const localFontFace = `\n<style>\n@font-face { font-family: 'Noto Sans Local'; src: url('/fonts/NotoSans-Regular.ttf') format('truetype'); font-weight: 400; font-style: normal; font-display: swap; }\n@font-face { font-family: 'Noto Sans Local'; src: url('/fonts/NotoSans-Bold.ttf') format('truetype'); font-weight: 700; font-style: normal; font-display: swap; }\n</style>\n`;
            styledHtml = `${localFontFace}<link href="${notoHref}" rel="stylesheet"><div style="width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;font-family:'Noto Sans Local','Noto Sans',${
              family ? family : "sans-serif"
            }">${pdfBody}</div>`;
          }
        } catch (e) {
          styledHtml = `<link href="${notoHref}" rel="stylesheet"><div style="width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;font-family:'Noto Sans',${
            family ? family : "sans-serif"
          }">${pdfBody}</div>`;
        }

        const finalHtml = styledHtml.replace(/₹/g, "Rs.");
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.html(finalHtml, {
          callback: function (doc) {
            // Build filename: InvoiceID_ClientName.pdf (sanitize client name)
            const invoiceId = created.id ?? created.invoiceNo ?? created._id;
            const clientNameRaw =
              created.clientName || invoice.clientName || "";
            const sanitize = (s: string) =>
              s.replace(/[\\/:*?"<>|\s]+/g, "_").replace(/^_+|_+$/g, "");
            const clientSafe = sanitize(String(clientNameRaw || "Client"));
            const filename = `${invoiceId}_${clientSafe}.pdf`;
            doc.save(filename);
          },
          x: 0,
          y: 0,
          width: pageWidth,
          windowWidth: 1200,
        });
      } catch (e) {
        // fallback simple render
        const pdfContent = renderToString(
          <InvoicePDF invoice={{ ...created, ...invoice }} />,
        );
        const finalPdfContent = String(pdfContent).replace(/₹/g, "Rs.");
        const pageWidth = doc.internal.pageSize.getWidth();
        doc.html(finalPdfContent, {
          callback: function (doc) {
            const invoiceId = created.id ?? created.invoiceNo ?? created._id;
            const clientNameRaw =
              created.clientName || invoice.clientName || "";
            const sanitize = (s: string) =>
              s.replace(/[\\/:*?"<>|\s]+/g, "_").replace(/^_+|_+$/g, "");
            const clientSafe = sanitize(String(clientNameRaw || "Client"));
            const filename = `${invoiceId}_${clientSafe}.pdf`;
            doc.save(filename);
          },
          x: 0,
          y: 0,
          width: pageWidth,
          windowWidth: 1200,
        });
      }

      setOpen(false);
      form.reset();
      if (onCreated) onCreated();
    } catch (e) {
      console.error(e);
    }
  };

  const [inventory, setInventory] = useState<any[]>([]);
  const [inventoryRows, setInventoryRows] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/inventory");
        const data = await res.json();
        if (mounted) setInventory(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to load inventory", e);
      }
    })();
    (async () => {
      try {
        const res = await fetch("/api/team-members");
        const data = await res.json();
        if (mounted) setTeamMembers(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to load team members", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const addInventoryRow = () =>
    setInventoryRows((r) => [
      ...r,
      { inventoryId: "", quantity: 1, sellingPrice: 0, gstPercentage: 0 },
    ]);
  const updateInventoryRow = (idx: number, patch: any) =>
    setInventoryRows((r) =>
      r.map((row, i) => (i === idx ? { ...row, ...patch } : row)),
    );
  const removeInventoryRow = (idx: number) =>
    setInventoryRows((r) => r.filter((_, i) => i !== idx));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" onClick={() => setOpen(true)}>
          New Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="clientId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border p-2">
                        <option value="">Select client</option>
                        {clients.map((c) => (
                          <option
                            key={String(c.id ?? c._id)}
                            value={String(c.id ?? c._id)}
                          >
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
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <FormField
                name="serviceId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border p-2">
                        <option value="">Select service</option>
                        {services.map((s) => (
                          <option
                            key={String(s.id ?? s._id)}
                            value={String(s.id ?? s._id)}
                          >
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="assignedStaff"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned Staff</FormLabel>
                    <FormControl>
                      <div className="border rounded p-2 max-h-40 overflow-auto">
                        {teamMembers.length === 0 && (
                          <div className="text-sm text-muted-foreground">
                            No team members
                          </div>
                        )}
                        {teamMembers.map((m) => {
                          const id = String(m._id ?? m.id);
                          const selected =
                            Array.isArray(field.value) &&
                            field.value.includes(id);
                          return (
                            <div
                              key={id}
                              className="flex items-center justify-between p-1"
                            >
                              <div>{m.name}</div>
                              <div>
                                <label className="inline-flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    checked={selected}
                                    onChange={(e: any) => {
                                      const vals = Array.isArray(field.value)
                                        ? [...field.value]
                                        : [];
                                      if (e.target.checked) {
                                        if (!vals.includes(id)) vals.push(id);
                                      } else {
                                        const idx = vals.indexOf(id);
                                        if (idx >= 0) vals.splice(idx, 1);
                                      }
                                      field.onChange(vals);
                                    }}
                                  />
                                  <span className="text-sm">Select</span>
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="workDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Work</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="workTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time of Work</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="equipmentAssigned"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipment Assigned</FormLabel>
                    <FormControl>
                      <div className="border rounded p-2 max-h-40 overflow-auto">
                        {inventory.length === 0 && (
                          <div className="text-sm text-muted-foreground">
                            No inventory
                          </div>
                        )}
                        {inventory.map((it) => {
                          const id = String(it._id ?? it.id);
                          const selected =
                            Array.isArray(field.value) &&
                            field.value.includes(id);
                          return (
                            <div
                              key={id}
                              className="flex items-center justify-between p-1"
                            >
                              <div>
                                {it.itemName} ({it.quantityAvailable} {it.unit})
                              </div>
                              <div>
                                <label className="inline-flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    checked={selected}
                                    onChange={(e: any) => {
                                      const vals = Array.isArray(field.value)
                                        ? [...field.value]
                                        : [];
                                      if (e.target.checked) {
                                        if (!vals.includes(id)) vals.push(id);
                                      } else {
                                        const idx = vals.indexOf(id);
                                        if (idx >= 0) vals.splice(idx, 1);
                                      }
                                      field.onChange(vals);
                                    }}
                                  />
                                  <span className="text-sm">Select</span>
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2">
                <FormField
                  name="includeVenueName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <label className="inline-flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.value || false}
                          onChange={(e: any) =>
                            field.onChange(e.target.checked)
                          }
                        />
                        <span className="font-medium">Include Venue Name</span>
                      </label>
                    </FormItem>
                  )}
                />
                <FormField
                  name="venueName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!form.getValues().includeVenueName}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="includeVenueAddress"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <label className="inline-flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.value || false}
                          onChange={(e: any) =>
                            field.onChange(e.target.checked)
                          }
                        />
                        <span className="font-medium">
                          Include Venue Address
                        </span>
                      </label>
                    </FormItem>
                  )}
                />
                <FormField
                  name="venueAddress"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!form.getValues().includeVenueAddress}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {isWebDev && (
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description (Web Development)</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          className="w-full border p-2 h-24"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">Inventory Items</h3>
                  <div>
                    <Button type="button" onClick={addInventoryRow}>
                      Add Item
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {inventoryRows.map((row, idx) => {
                    const selected = inventory.find(
                      (i) => String(i._id ?? i.id) === String(row.inventoryId),
                    );
                    const maxQty = selected
                      ? Number(selected.quantityAvailable || 0)
                      : 0;
                    return (
                      <div
                        key={idx}
                        className="flex gap-2 items-center border p-2"
                      >
                        <select
                          className="p-2 border flex-1"
                          value={row.inventoryId}
                          onChange={(e: any) => {
                            const id = e.target.value;
                            const sel = inventory.find(
                              (i) => String(i._id ?? i.id) === id,
                            );
                            updateInventoryRow(idx, {
                              inventoryId: id,
                              sellingPrice: sel?.sellingPrice ?? 0,
                              gstPercentage: sel?.gstPercentage ?? 0,
                              quantity: 1,
                            });
                          }}
                        >
                          <option value="">Select item</option>
                          {inventory.map((it) => (
                            <option
                              key={String(it._id ?? it.id)}
                              value={String(it._id ?? it.id)}
                            >
                              {it.itemName} ({it.quantityAvailable} {it.unit})
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          className="w-20 p-2 border"
                          min={1}
                          value={row.quantity}
                          onChange={(e: any) =>
                            updateInventoryRow(idx, {
                              quantity: Number(e.target.value),
                            })
                          }
                        />
                        <div className="w-40">
                          <div>
                            Price: ₹
                            {Number(row.sellingPrice || 0).toLocaleString()}
                          </div>
                          <div>GST: {Number(row.gstPercentage || 0)}%</div>
                          <div>
                            Total: ₹
                            {(
                              Number(row.sellingPrice || 0) *
                              Number(row.quantity || 0)
                            ).toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => removeInventoryRow(idx)}
                          >
                            Remove
                          </Button>
                        </div>
                        {selected && Number(row.quantity || 0) > maxQty && (
                          <div className="text-sm text-red-600">
                            Insufficient stock
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" size="lg" className="w-full">
                  Create & Download PDF
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
