"use client";

import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import type { Client, Service } from '@/lib/data';
import { InvoicePDF } from './invoice-pdf';
import jsPDF from 'jspdf';
import { renderToString } from 'react-dom/server';

export function AddInvoiceDialog({ clients, services, projects, onCreated }: { clients: Client[]; services: Service[]; projects: any[]; onCreated?: () => void }) {
  const [open, setOpen] = React.useState(false);
  const form = useForm({ defaultValues: { clientId: '', serviceId: '', projectTitle: '', title: '', amount: 0, dueDate: '', invoiceNo: '' } });

  const handleSave = async (values: any) => {
    try {
      const invoice = {
        clientId: values.clientId || null,
        clientName: clients.find(c => String(c.id ?? c._id) === String(values.clientId))?.name || '',
        serviceId: values.serviceId || null,
        invoiceNo: values.invoiceNo || undefined,
        projectTitle: values.projectTitle || values.title || '',
        title: values.title || values.projectTitle || 'Invoice',
        amount: Number(values.amount || 0),
        dueDate: values.dueDate || '',
        status: 'DUE',
        createdAt: new Date()
      };
      const res = await fetch('/api/invoices', { method: 'POST', body: JSON.stringify(invoice), headers: { 'Content-Type': 'application/json' } });
      if (!res.ok) throw new Error('Failed to create invoice');
      const created = await res.json();

      // generate PDF and download (A4, full page, use embedded fonts when possible)
      const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      try {
        const { loadNotoSansForJsPDF } = await import('@/lib/pdf-fonts');
        const family = await loadNotoSansForJsPDF(doc, 'NotoSans');
        if (family) {
          try { doc.setFont(family); } catch (e) {}
        }

        const pdfBody = renderToString(<InvoicePDF invoice={{ ...created, ...invoice }} />);
        const notoHref = 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap';

        // attempt to inline local font as base64 for robust PDF rendering
        let styledHtml: string;
        try {
          const fres = await fetch('/fonts/NotoSans-Regular.ttf');
          if (fres && fres.ok) {
            const arrayBuffer = await fres.arrayBuffer();
            const bytes = new Uint8Array(arrayBuffer);
            let binary = '';
            const chunkSize = 0x8000;
            for (let i = 0; i < bytes.length; i += chunkSize) {
              binary += String.fromCharCode.apply(null, Array.from(bytes.slice(i, i + chunkSize)) as any);
            }
            const base64 = typeof btoa !== 'undefined' ? btoa(binary) : Buffer.from(binary, 'binary').toString('base64');
            const fontDataFace = `\n<style>\n@font-face { font-family: 'Noto Sans Local'; src: url('data:font/truetype;base64,${base64}') format('truetype'); font-weight: 400; font-style: normal; font-display: swap; }\n</style>\n`;
            styledHtml = `${fontDataFace}<link href="${notoHref}" rel="stylesheet">` + `<div style="width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;">${pdfBody}</div>`;
          } else {
            const localFontFace = `\n<style>\n@font-face { font-family: 'Noto Sans Local'; src: url('/fonts/NotoSans-Regular.ttf') format('truetype'); font-weight: 400; font-style: normal; font-display: swap; }\n@font-face { font-family: 'Noto Sans Local'; src: url('/fonts/NotoSans-Bold.ttf') format('truetype'); font-weight: 700; font-style: normal; font-display: swap; }\n</style>\n`;
            styledHtml = `${localFontFace}<link href="${notoHref}" rel="stylesheet"><div style="width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;font-family:'Noto Sans Local','Noto Sans',${family ? family : 'sans-serif'};">${pdfBody}</div>`;
          }
        } catch (e) {
          styledHtml = `<link href="${notoHref}" rel="stylesheet"><div style="width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;font-family:'Noto Sans',${family ? family : 'sans-serif'};">${pdfBody}</div>`;
        }

        const finalHtml = styledHtml.replace(/₹/g, 'Rs.');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.html(finalHtml, {
          callback: function (doc) { doc.save(`Invoice-${created.invoiceNo ?? created.id ?? created._id}.pdf`); },
          x: 0, y: 0, width: pageWidth, windowWidth: 1200
        });
      } catch (e) {
        // fallback simple render
        const pdfContent = renderToString(<InvoicePDF invoice={{ ...created, ...invoice }} />);
        const finalPdfContent = String(pdfContent).replace(/₹/g, 'Rs.');
        const pageWidth = doc.internal.pageSize.getWidth();
  doc.html(finalPdfContent, { callback: function (doc) { doc.save(`Invoice-${created.invoiceNo ?? created.id ?? created._id}.pdf`); }, x: 0, y: 0, width: pageWidth, windowWidth: 1200 });
      }

      setOpen(false);
      form.reset();
      if (onCreated) onCreated();
    } catch (e) { console.error(e); }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" onClick={() => setOpen(true)}>New Invoice</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField name="invoiceNo" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice No</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Optional - INV-00001" />
                  </FormControl>
                </FormItem>
              )} />
              <FormField name="clientId" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border p-2">
                      <option value="">Select client</option>
                      {clients.map(c => <option key={String(c.id ?? c._id)} value={String(c.id ?? c._id)}>{c.name}</option>)}
                    </select>
                  </FormControl>
                </FormItem>
              )} />

              <FormField name="projectTitle" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )} />

              <FormField name="title" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )} />

              <FormField name="amount" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )} />

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField name="dueDate" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )} />

              <FormField name="serviceId" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border p-2">
                      <option value="">Select service</option>
                      {services.map(s => <option key={String(s.id ?? s._id)} value={String(s.id ?? s._id)}>{s.name}</option>)}
                    </select>
                  </FormControl>
                </FormItem>
              )} />
            </div>

            <DialogFooter>
              <Button type="submit" size="lg" className="w-full">Create & Download PDF</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
