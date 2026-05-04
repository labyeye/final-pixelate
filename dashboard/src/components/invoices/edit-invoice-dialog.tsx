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

const HSN_OPTIONS = [
  { value: "998314", label: "998314 – IT/Creative Services" },
  { value: "999612", label: "999612 – Photography/Video" },
  { value: "998315", label: "998315 – Hosting/Maintenance" },
  { value: "998361", label: "998361 – Advertising Services" },
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

type FormValues = {
  clientId: string;
  projectTitle: string;
  title: string;
  dueDate: string;
  status: string;
  invoiceNo: string;
  venueName: string;
  venueAddress: string;
  includeVenueName: boolean;
  includeVenueAddress: boolean;
};

export function EditInvoiceDialog({
  invoice,
  clients,
  services,
  projects,
  onUpdated,
}: {
  invoice: any;
  clients: any[];
  services: any[];
  projects: any[];
  onUpdated?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [lineItems, setLineItems] = useState<LineItem[]>([emptyLineItem()]);

  const form = useForm<FormValues>({
    defaultValues: {
      clientId: "",
      projectTitle: "",
      title: "",
      dueDate: "",
      status: "",
      invoiceNo: "",
      venueName: "",
      venueAddress: "",
      includeVenueName: false,
      includeVenueAddress: false,
    },
  });

  React.useEffect(() => {
    if (open && invoice) {
      form.reset({
        clientId: String(
          invoice.clientId ?? invoice.client ?? invoice.clientName ?? "",
        ),
        invoiceNo: invoice.invoiceNo ?? "",
        projectTitle: invoice.projectTitle ?? invoice.title ?? "",
        title: invoice.title ?? invoice.projectTitle ?? "",
        dueDate: invoice.dueDate
          ? new Date(invoice.dueDate).toISOString().slice(0, 10)
          : "",
        status: invoice.status ?? "DUE",
        venueName: invoice.venueName ?? "",
        venueAddress: invoice.venueAddress ?? "",
        includeVenueName: Boolean(invoice.venueName),
        includeVenueAddress: Boolean(invoice.venueAddress),
      });

      if (Array.isArray(invoice.lineItems) && invoice.lineItems.length) {
        setLineItems(
          invoice.lineItems.map((it: any) => ({
            description: it.description ?? "",
            hsnCode: it.hsnCode ?? it.hsn ?? "998314",
            quantity: Number(it.quantity ?? 1),
            rate: Number(it.price ?? it.rate ?? it.amount ?? 0),
          })),
        );
      } else if (invoice.amount) {
        setLineItems([
          {
            description:
              invoice.title || invoice.projectTitle || "Professional Services",
            hsnCode: invoice.hsnCode ?? "998314",
            quantity: 1,
            rate: Number(invoice.amount || 0),
          },
        ]);
      } else {
        setLineItems([emptyLineItem()]);
      }
    }
  }, [open, invoice]);

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

  const handleSave = async (values: FormValues) => {
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

      const body: any = {
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
        applyGst: true,
        gstPercent: 18,
        tax,
        dueDate: values.dueDate || "",
        status: values.status || "DUE",
      };

      if (values.includeVenueName) body.venueName = values.venueName || "";
      if (values.includeVenueAddress)
        body.venueAddress = values.venueAddress || "";

      const res = await fetch(`/api/invoices/${invoice._id ?? invoice.id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to update invoice");
      setOpen(false);
      if (onUpdated) onUpdated();
    } catch (e) {
      console.error("Failed to save invoice", e);
    }
  };

  const includeVenueName = form.watch("includeVenueName");
  const includeVenueAddress = form.watch("includeVenueAddress");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Invoice</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            {}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="invoiceNo"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice No</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />

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
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border rounded p-2">
                        <option value="DUE">DUE</option>
                        <option value="PARTIAL">PARTIAL</option>
                        <option value="PAID">PAID</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-base">
                  Services / Line Items
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addLineItem}
                >
                  + Add Row
                </Button>
              </div>

              {}
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
                        onChange={(e) =>
                          updateLineItem(idx, { description: e.target.value })
                        }
                      />
                      <select
                        className="border rounded p-2 text-sm"
                        value={row.hsnCode}
                        onChange={(e) =>
                          updateLineItem(idx, { hsnCode: e.target.value })
                        }
                      >
                        {HSN_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.value}
                          </option>
                        ))}
                      </select>
                      <Input
                        type="number"
                        min={1}
                        value={row.quantity}
                        onChange={(e) =>
                          updateLineItem(idx, {
                            quantity: Number(e.target.value),
                          })
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

              {}
              <div className="mt-4 flex flex-col items-end gap-1 text-sm border-t pt-3">
                <div className="flex gap-8">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="w-28 text-right font-medium">
                    ₹
                    {subtotal.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
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
                    ₹
                    {total.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>

            {}
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
                          onChange={(e: any) =>
                            field.onChange(e.target.checked)
                          }
                        />
                        <span className="font-medium text-sm">
                          Include Venue Name
                        </span>
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
                        <Input
                          {...field}
                          disabled={!includeVenueName}
                          placeholder="Venue name"
                        />
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
                          onChange={(e: any) =>
                            field.onChange(e.target.checked)
                          }
                        />
                        <span className="font-medium text-sm">
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
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!includeVenueAddress}
                          placeholder="Venue address"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" size="lg" className="w-full">
                Save Invoice
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditInvoiceDialog;
