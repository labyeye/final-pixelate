import React, { useEffect, useState } from "react";
import type { Client } from "@/lib/data";
import logo from "@/assets/images/logo-transparent.png";
import signImg from "@/assets/images/sign.png";
import { formatCurrency } from "@/lib/currency";

// Invoice PDF that uses the same visual template as quotations
export function InvoicePDF({
  invoice,
  client: initialClient,
}: {
  invoice: any;
  client?: Client;
}) {
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
            setClient(data);
          }
        } catch (e) {
          // ignore
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [invoice?.clientId, client]);

  const effectiveClientName = client?.name || invoice?.clientName || "Client";

  const items: Array<any> =
    invoice?.items && Array.isArray(invoice.items) && invoice.items.length
      ? invoice.items
      : invoice?.lineItems &&
        Array.isArray(invoice.lineItems) &&
        invoice.lineItems.length
      ? invoice.lineItems
      : [
          {
            description:
              invoice?.title || invoice?.projectTitle || "Project work",
            amount: Number(invoice?.amount || 0),
          },
        ];

  const subtotal = items.reduce(
    (s, it) => s + Number(it?.amount || it?.price || 0),
    0
  );
  const tax = Number(invoice?.tax || invoice?.vat || 0);
  const discount = Number(invoice?.discount || 0);
  const total = subtotal + tax - discount;

  const formatDate = (d?: string | Date | number) => {
    if (!d) return "—";
    const dt = d instanceof Date ? d : new Date(d);
    if (isNaN(dt.getTime())) return "—";
    const dd = String(dt.getDate()).padStart(2, "0");
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const yyyy = dt.getFullYear();
    return `${dd} / ${mm} / ${yyyy}`;
  };

  // use the local-embedded font family name used in quotation template
  return (
    <div
      style={{
        fontFamily: "'Noto Sans Local', 'Noto Sans', Inter, Roboto, sans-serif",
        width: "100%",
        height: "100%",
        padding: "10mm",
        color: "#111",
        background: "#fff",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          paddingBottom: "18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img
            src={typeof logo === "string" ? logo : (logo as any).src}
            alt="Logo"
            style={{ width: 88, height: 88, objectFit: "contain" }}
          />
          <div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>Pixelate Nest</div>

            <div style={{ fontSize: 13, color: "#666" }}>
              Creative Software & Digital Solutions
            </div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
              Kalahanu Enterprises Private Limited
            </div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
              GST - 10AADCK1491R2ZB
            </div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
              Kala Bhawan, Akharaghat Road, Muzaffarpur, Bihar
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#111" }}>
            INVOICE
          </div>
          <div style={{ marginTop: 8, fontSize: 13 }}>
            <div>
              <strong>Invoice #:</strong> {invoice?.invoiceNo ?? invoice?.id ?? invoice?._id}
            </div>
            <div>
              <strong>Date:</strong>{" "}
              {formatDate(invoice?.createdAt ?? Date.now())}
            </div>
            <div>
              <strong>Due:</strong>{" "}
              {invoice?.dueDate ? formatDate(invoice.dueDate) : "On receipt"}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>BILLED TO</h2>
        <p
          style={{ fontSize: "18px", fontWeight: "bold", margin: "6px 0 0 0" }}
        >
          {effectiveClientName}
        </p>
        <p style={{ fontSize: "14px", margin: "5px 0 0 0" }}>
          {client?.address || invoice?.clientAddress || ""}
        </p>
        <p style={{ fontSize: "14px", margin: "5px 0 0 0" }}>
          {client
            ? `${client.email} | ${client.phone || ""}`
            : `${invoice?.clientEmail || ""} ${
                invoice?.clientPhone ? `| ${invoice.clientPhone}` : ""
              }`}
        </p>
      </div>

      <div style={{ marginTop: "40px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  textAlign: "left",
                  fontSize: "12px",
                }}
              >
                DESCRIPTION
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  textAlign: "right",
                  fontSize: "12px",
                  width: 80,
                }}
              >
                QTY
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  textAlign: "right",
                  fontSize: "12px",
                  width: 140,
                }}
              >
                UNIT
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  textAlign: "right",
                  fontSize: "12px",
                  width: 160,
                }}
              >
                AMOUNT
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, index) => {
              const qty = Number(it?.quantity ?? it?.qty ?? 1);
              const unit = Number(
                it?.price ?? it?.unitPrice ?? it?.amount ?? 0
              );
              const amt = qty * unit;
              return (
                <tr key={index}>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      fontSize: "14px",
                    }}
                  >
                    {it?.description || it?.name || "Service"}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      fontSize: "14px",
                      textAlign: "right",
                    }}
                  >
                    {qty}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      fontSize: "14px",
                      textAlign: "right",
                    }}
                  >
                    {formatCurrency(unit).replace(/₹/g, "Rs.")}
                  </td>
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      fontSize: "14px",
                      textAlign: "right",
                    }}
                  >
                    {formatCurrency(amt).replace(/₹/g, "Rs.")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ width: "250px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "16px",
              paddingBottom: "10px",
            }}
          >
            <span>SUBTOTAL</span>
            <span>{formatCurrency(subtotal).replace(/₹/g, "Rs.")}</span>
          </div>
          {discount > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "16px",
                paddingBottom: "10px",
                color: "green",
              }}
            >
              <span>DISCOUNT</span>
              <span>- {formatCurrency(discount).replace(/₹/g, "Rs.")}</span>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "16px",
              paddingBottom: "10px",
            }}
          >
            <div>Tax</div>
            <div style={{ fontWeight: 600 }}>
              {formatCurrency(tax).replace(/₹/g, "Rs.")}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "20px",
              borderTop: "2px solid black",
              paddingTop: "10px",
              fontWeight: "bold",
            }}
          >
            <span>TOTAL</span>
            <span>{formatCurrency(total).replace(/₹/g, "Rs.")}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "60px", fontSize: "12px", color: "#666" }}>
        <h3
          style={{ fontSize: "14px", fontWeight: "bold", paddingBottom: "5px" }}
        >
          Terms & Conditions
        </h3>
        <p>
          Payment due within 30 days. This invoice is subject to our standard
          terms of service.
        </p>

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={typeof signImg === "string" ? signImg : (signImg as any).src}
              alt="Signature"
              style={{ width: 380, height: 300, objectFit: "contain" }}
            />
            <div style={{ marginTop: -40, fontSize: 14, color: "#333" }}>
              Authorized Signatory
            </div>
            <div style={{ fontSize: 14, color: "#666" }}>
              Labh Chandra Bothra (Founder)
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>Pixelate Nest</div>
          </div>
        </div>
      </div>
    </div>
  );
}
