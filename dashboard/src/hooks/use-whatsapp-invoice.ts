












"use client";

import { useState, useCallback } from "react";
import { pdf } from "@react-pdf/renderer";
import { InvoicePDFDocument } from "@/components/invoices/invoice-pdf-document";
import React from "react";

export type WhatsAppSendStatus =
  | "idle"
  | "generating-pdf"
  | "uploading-media"
  | "sending"
  | "success"
  | "error";

export interface WhatsAppInvoiceOptions {
  invoice: any;
  client: any;
  
  phone: string;
  



  publicPdfUrl?: string;
  



  clientId?: string;
  




  invoiceId?: string;
}

export interface WhatsAppInvoiceResult {
  
  send: (opts: WhatsAppInvoiceOptions) => Promise<void>;
  
  sending: boolean;
  status: WhatsAppSendStatus;
  
  statusMessage: string;
  
  error: string | null;
  
  messageId: string | null;
}


const statusLabel: Record<WhatsAppSendStatus, string> = {
  idle: "Ready",
  "generating-pdf": "Generating PDF…",
  "uploading-media": "Uploading PDF to WhatsApp…",
  sending: "Sending WhatsApp message…",
  success: "WhatsApp message sent!",
  error: "Failed to send",
};

function getInvoiceItems(invoice: any) {
  if (!invoice) return [];
  if (Array.isArray(invoice.items) && invoice.items.length)
    return invoice.items;
  if (Array.isArray(invoice.lineItems) && invoice.lineItems.length)
    return invoice.lineItems;
  if (Array.isArray(invoice.services) && invoice.services.length)
    return invoice.services;
  return [];
}

function calculateTotal(invoice: any): number {
  if (!invoice) return 0;

  
  const precomputed =
    invoice.totalAmount ??
    invoice.grandTotal ??
    invoice.total ??
    invoice.invoiceTotal ??
    invoice.finalAmount ??
    null;
  if (precomputed !== null && precomputed !== undefined) {
    const n = Number(precomputed);
    if (!isNaN(n) && n > 0) return n;
  }

  
  
  
  const items = getInvoiceItems(invoice);
  const subtotal = items.reduce((s: number, it: any) => {
    
    const lineTotal =
      it?.amount !== undefined
        ? Number(it.amount)
        : Number(it?.quantity ?? it?.qty ?? 1) *
          Number(it?.price ?? it?.unitPrice ?? it?.rate ?? 0);
    return s + lineTotal;
  }, 0);
  return subtotal - Number(invoice?.discount ?? 0) + Number(invoice?.tax ?? 0);
}






function sanitiseFilename(name: string): string {
  return name
    .replace(/[/\\:*?"<>|]/g, "-") // replace path separators & illegal chars
    .replace(/-{2,}/g, "-")          // collapse multiple dashes
    .replace(/^-|-$/g, "")           // trim leading/trailing dashes
    .trim();
}

export function useWhatsAppInvoice(): WhatsAppInvoiceResult {
  const [status, setStatus] = useState<WhatsAppSendStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [messageId, setMessageId] = useState<string | null>(null);

  const send = useCallback(
    async ({
      invoice,
      client,
      phone,
      publicPdfUrl,
      clientId,
      invoiceId,
    }: WhatsAppInvoiceOptions) => {
      setError(null);
      setMessageId(null);

      try {
        // ── Step 1: Generate PDF ───────────────────────────────────────────
        let mediaId: string | undefined;
        let pdfUrl: string | undefined;

        if (publicPdfUrl) {
          // Skip upload – use public URL approach
          pdfUrl = publicPdfUrl;
        } else {
          setStatus("generating-pdf");
          // InvoicePDFDocument renders a react-pdf <Document>.
          // Cast to `any` to satisfy the strict DocumentProps generic of pdf().
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const blob = await pdf(
            React.createElement(InvoicePDFDocument, { invoice, client }) as any,
          ).toBlob();

          // ── Step 2: Upload to WhatsApp /media ────────────────────────────
          setStatus("uploading-media");

          const clientName =
            client?.name ?? invoice?.clientName ?? invoice?.client ?? "Client";
          const invNo = invoice?.invoiceNo ?? invoice?.id ?? "invoice";
          // CRITICAL: sanitise filename — invoice numbers contain "/" (e.g. KTS/2025-2026/00021)
          // WhatsApp Cloud API silently fails to deliver documents with "/" in the filename.
          // Strip the .pdf extension first so sanitiseFilename doesn't produce .pdf.pdf.
          const rawBase = `Invoice-${clientName.replace(/\s+/g, "-")}-${invNo}`;
          const fileName = sanitiseFilename(rawBase) + ".pdf";

          const form = new FormData();
          form.append("file", blob, fileName);

          // [FIX-7] INTERNAL_API_SECRET must NEVER be NEXT_PUBLIC_.
          // Server-to-server internal routes on Next.js are called from the
          // same origin (browser → /api/...), so no secret header is needed
          // from the client. The secret header is only checked on routes that
          // are called server-to-server, and this is a client-side call.
          // Remove the secret from the client entirely.
          const uploadRes = await fetch("/api/upload-whatsapp-media", {
            method: "POST",
            body: form,
          });

          if (!uploadRes.ok) {
            const err = await uploadRes.json().catch(() => ({}));
            throw new Error(
              (err as any)?.error ?? "Failed to upload PDF to WhatsApp.",
            );
          }

          const uploadData = await uploadRes.json();
          mediaId = uploadData.mediaId;
          if (!mediaId) throw new Error("No media_id returned from upload.");
        }

        // ── Step 3: Send WhatsApp template message ──────────────────────────
        setStatus("sending");

        const clientName =
          client?.name ?? invoice?.clientName ?? invoice?.client ?? "Client";
        const invNo = invoice?.invoiceNo ?? invoice?.id ?? "N/A";
        const total = calculateTotal(invoice);
        const amount = `₹${total.toLocaleString("en-IN")}`;

        // [FIX-7] Same as above — no NEXT_PUBLIC_ secret from client.
        const sendRes = await fetch("/api/send-invoice-whatsapp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            clientName,
            invNo,
            amount,
            filename: sanitiseFilename(`Invoice-${invNo}`) + ".pdf",
            ...(mediaId ? { mediaId } : {}),
            ...(pdfUrl ? { pdfUrl } : {}),
            // Opt-in guard + idempotency — pass IDs to the API
            ...(clientId ? { clientId } : {}),
            ...(invoiceId ? { invoiceId } : {}),
          }),
        });

        if (!sendRes.ok) {
          const err = await sendRes.json().catch(() => ({}));
          throw new Error(
            (err as any)?.error ?? "WhatsApp API rejected the request.",
          );
        }

        const sendData = await sendRes.json();
        setMessageId(sendData.messageId ?? null);
        setStatus("success");
      } catch (err: any) {
        console.error("[useWhatsAppInvoice]", err);
        setError(err?.message ?? "Unexpected error. Please try again.");
        setStatus("error");
      }
    },
    [],
  );

  return {
    send,
    sending: ["generating-pdf", "uploading-media", "sending"].includes(status),
    status,
    statusMessage: statusLabel[status],
    error,
    messageId,
  };
}
