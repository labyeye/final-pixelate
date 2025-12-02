import React, { useEffect, useState } from "react";
import type { Client } from "@/lib/data";
import logo from "@/assets/images/logo-transparent.png";
import signImg from "@/assets/images/sign.png";
import { formatCurrency } from "@/lib/currency";

function formatDate(value: any) {
  try {
    const d = new Date(value);
    return d.toLocaleDateString();
  } catch (e) {
    return String(value || "");
  }
}

function getItems(invoice: any) {
  if (!invoice) return [];
  if (Array.isArray(invoice.items) && invoice.items.length) return invoice.items;
  if (Array.isArray(invoice.lineItems) && invoice.lineItems.length) return invoice.lineItems;
  if (invoice.amount && !Array.isArray(invoice.items)) return [{ description: invoice.title || invoice.projectTitle || "Service", quantity: 1, price: Number(invoice.amount) }];
  return [];
}

export function InvoicePDF({ invoice, client: initialClient }: { invoice: any; client?: Client }) {
  const [client, setClient] = useState<Client | undefined>(initialClient);

  useEffect(() => {
    let mounted = true;
    if (!client && invoice?.clientId) {
      (async () => {
        try {
          const res = await fetch(`/api/clients/${invoice.clientId}`);
          if (!mounted) return;
          if (res.ok) {
            const data = await res.json();
            setClient(data as Client);
          }
        } catch (e) {
          // ignore fetch errors for PDF render
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [invoice, client]);

  const items = getItems(invoice);
  const subtotal = items.reduce((s: number, it: any) => {
    const qty = Number(it?.quantity ?? it?.qty ?? 1);
    const price = Number(it?.price ?? it?.unitPrice ?? it?.amount ?? 0);
    return s + qty * price;
  }, 0);
  const discount = Number(invoice?.discount ?? 0) || 0;
  const tax = Number(invoice?.tax ?? 0) || 0;
  const total = subtotal - discount + tax;

  const effectiveClientName = client?.name || invoice?.clientName || invoice?.client || "Client";

  return (
    <div style={{ fontFamily: "'Noto Sans Local', 'Noto Sans', Inter, Roboto, sans-serif", width: "100%", padding: "10mm", color: "#111", background: "#fff", boxSizing: "border-box" }}>
      {/* Top header with brand */}
      <div style={{ position: "relative", marginBottom: 8 }}>
        <div style={{ height: 90, borderRadius: 12, background: "linear-gradient(90deg,#ff7a18 0%,#ff4e50 100%)", overflow: "hidden", display: "flex", alignItems: "center", padding: "0 14px" }}>
          <img src={typeof logo === "string" ? logo : (logo as any).src} alt="Logo" style={{ width: 72, height: 72, objectFit: "contain" }} />
          <div style={{ marginLeft: 12, color: "#fff" }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>Pixelate Nest</div>
            <div style={{ fontSize: 12, opacity: 0.95 }}>Creative Software & Digital Solutions</div>
          </div>
        </div>

        <div style={{ position: 'absolute', right: 0, top: 10, background: '#111', color: '#fff', padding: '12px 18px', borderRadius: 8, textAlign: 'right' }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>INVOICE</div>
          <div style={{ fontSize: 12, marginTop: 6 }}>
            <div><strong>Invoice #:</strong> {invoice?.id ?? invoice?.invoiceNo ?? invoice?._id}</div>
            <div><strong>Date:</strong> {formatDate(invoice?.createdAt ?? Date.now())}</div>
            <div><strong>Due:</strong> {invoice?.dueDate ? formatDate(invoice.dueDate) : 'On receipt'}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, marginTop: 10 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Pixelate Nest</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>Kalahanu Enterprises Private Limited</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>GST - 10AADCK1491R2ZB</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Kala Bhawan, Akharaghat Road, Muzaffarpur, Bihar</div>
        </div>

        <div style={{ border: '1px solid #e6e6e6', borderRadius: 10, padding: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Invoice Details</div>
          <div style={{ fontSize: 12 }}><strong>Invoice #</strong>: {invoice?.id ?? invoice?.invoiceNo ?? invoice?._id}</div>
          <div style={{ fontSize: 12 }}><strong>Date</strong>: {formatDate(invoice?.createdAt ?? Date.now())}</div>
          <div style={{ fontSize: 12 }}><strong>Due</strong>: {invoice?.dueDate ? formatDate(invoice.dueDate) : 'On receipt'}</div>
        </div>
      </div>

      <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700 }}>BILLED TO</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginTop: 6 }}>{effectiveClientName}</div>
          <div style={{ fontSize: 12, marginTop: 6 }}>{client?.address || invoice?.clientAddress || ''}</div>
          <div style={{ fontSize: 12, marginTop: 4, color: '#666' }}>{client ? `${client.email} | ${client.phone || ''}` : `${invoice?.clientEmail || ''} ${invoice?.clientPhone ? `| ${invoice.clientPhone}` : ''}`}</div>
        </div>

        <div style={{ textAlign: 'right' }}>
          {invoice?.projectTitle && <div style={{ fontSize: 12, color: '#666' }}>{invoice.projectTitle}</div>}
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              <th style={{ padding: 10, borderBottom: '1px solid #e6e6e6', textAlign: 'left', width: 40 }}>NO</th>
              <th style={{ padding: 10, borderBottom: '1px solid #e6e6e6', textAlign: 'left' }}>DESCRIPTION</th>
              <th style={{ padding: 10, borderBottom: '1px solid #e6e6e6', textAlign: 'right', width: 60 }}>QTY</th>
              <th style={{ padding: 10, borderBottom: '1px solid #e6e6e6', textAlign: 'right', width: 120 }}>PRICE</th>
              <th style={{ padding: 10, borderBottom: '1px solid #e6e6e6', textAlign: 'right', width: 140 }}>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it: any, index: number) => {
              const qty = Number(it?.quantity ?? it?.qty ?? 1);
              const unit = Number(it?.price ?? it?.unitPrice ?? it?.amount ?? 0);
              const amt = qty * unit;
              return (
                <tr key={index}>
                  <td style={{ padding: 10, borderBottom: '1px solid #f0f0f0' }}>{String(index + 1).padStart(2, '0')}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f0f0f0' }}>{it?.description || it?.name || 'Service'}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>{qty}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>{formatCurrency(unit).replace(/₹/g, 'Rs.')}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f0f0f0', textAlign: 'right' }}>{formatCurrency(amt).replace(/₹/g, 'Rs.')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: 320, border: '1px solid #e6e6e6', borderRadius: 8, padding: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8 }}>
            <div>SUBTOTAL</div>
            <div>{formatCurrency(subtotal).replace(/₹/g, 'Rs.')}</div>
          </div>
          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8 }}>
              <div style={{ color: 'green' }}>DISCOUNT</div>
              <div style={{ color: 'green' }}>- {formatCurrency(discount).replace(/₹/g, 'Rs.')}</div>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8 }}>
            <div>Tax</div>
            <div style={{ fontWeight: 600 }}>{formatCurrency(tax).replace(/₹/g, 'Rs.')}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '2px solid #e6e6e6', fontWeight: 800, fontSize: 16 }}>
            <div>TOTAL</div>
            <div>{formatCurrency(total).replace(/₹/g, 'Rs.')}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 36, display: 'flex', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ flex: 1, fontSize: 12, color: '#666' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Payment Info</div>
          <div>Account No: 0000 1234 5678</div>
          <div>A/C Name: Kalahanu Enterprises Private Limited</div>
          <div>Bank Details: Your Bank Details here</div>
        </div>

        <div style={{ width: 320, textAlign: 'center' }}>
          <img src={typeof signImg === 'string' ? signImg : (signImg as any).src} alt="Signature" style={{ width: 260, height: 90, objectFit: 'contain' }} />
          <div style={{ marginTop: 6, fontSize: 13, fontWeight: 700 }}>Authorized Signatory</div>
          <div style={{ fontSize: 12, color: '#666' }}>Labh Chandra Bothra (Founder)</div>
          <div style={{ fontSize: 12, color: '#666' }}>Pixelate Nest</div>
        </div>
      </div>

      <div style={{ marginTop: 60, fontSize: 12, color: '#666' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, paddingBottom: 5 }}>Terms & Conditions</h3>
        <p>Payment due within 30 days. This invoice is subject to our standard terms of service.</p>
      </div>
    </div>
  );
}


