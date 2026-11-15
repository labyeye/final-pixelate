"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api-fetch";

interface Bill {
  _id: string;
  invoiceNumber: string;
  company?: { name?: string; email?: string };
  credits: number;
  price: number;
  gst: number;
  total: number;
  paidAt: string;
}

export default function NestHRCreditBillsPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    apiFetch("/api/nesthr-credit-bills")
      .then((r) => r.json())
      .then((d) => (d.error ? Promise.reject(new Error(d.error)) : setBills(d.bills ?? [])))
      .catch((e) => toast({ title: "Load failed", description: e.message, variant: "destructive" }));
  }, [toast]);

  const download = async (id: string) => {
    const w = window.open("", "_blank");
    try {
      const d = await (await apiFetch(`/api/nesthr-credit-bills?id=${id}`)).json();
      if (!d.html) throw new Error(d.error ?? "No invoice");
      w?.document.write(d.html);
      w?.document.close();
      setTimeout(() => w?.print(), 500);
    } catch (e: any) {
      w?.close();
      toast({ title: "Download failed", description: e.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 font-headline">
      <header>
        <h1 className="text-3xl font-black tracking-tighter">WHATSAPP CREDIT BILLS</h1>
        <p className="text-muted-foreground text-sm">
          GST invoices for NestHR WhatsApp credit top-ups (CR-HRMS-…). Download opens the print dialog; save as PDF.
        </p>
      </header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Credits</TableHead>
            <TableHead>Total (incl. GST)</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((b) => (
            <TableRow key={b._id}>
              <TableCell className="font-bold">{b.invoiceNumber}</TableCell>
              <TableCell>{b.company?.name ?? "-"}</TableCell>
              <TableCell>{new Date(b.paidAt).toLocaleDateString()}</TableCell>
              <TableCell>{b.credits}</TableCell>
              <TableCell>₹{Number(b.total).toLocaleString("en-IN")}</TableCell>
              <TableCell>
                <Button size="sm" variant="outline" onClick={() => download(b._id)}>
                  Download
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {bills.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No credit top-ups yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
