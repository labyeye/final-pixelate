import React, { useEffect, useState } from "react";
import type { Client } from "@/lib/data";
import logo from "@/assets/images/logo-transparent.png";
import signImg from "@/assets/images/sign.png";
import { formatCurrency } from "@/lib/currency";

function formatDate(value: any) {
  try {
    const d = new Date(value);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return String(value || "");
  }
}

function getItems(invoice: any) {
  if (!invoice) return [];
  if (Array.isArray(invoice.items) && invoice.items.length)
    return invoice.items;
  if (Array.isArray(invoice.lineItems) && invoice.lineItems.length)
    return invoice.lineItems;
  if (invoice.amount && !Array.isArray(invoice.items))
    return [
      {
        description: invoice.title || invoice.projectTitle || "Service",
        quantity: 1,
        price: Number(invoice.amount),
      },
    ];
  return [];
}

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
          const res = await fetch(
            `https://backend.pixelatenest.com/api/clients/${invoice.clientId}`,
          );
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
  const taxable = Math.max(0, subtotal - discount);
  const tax = (taxable * 18) / 100;
  const normalizedClientState = String(
    client?.state ?? (invoice as any)?.clientState ?? "",
  )
    .trim()
    .toLowerCase();
  const isBihar = normalizedClientState.includes("bihar");
  const isInterState = normalizedClientState ? !isBihar : false;
  const cgst = isInterState ? 0 : tax / 2;
  const sgst = isInterState ? 0 : tax / 2;
  const igst = isInterState ? tax : 0;
  const total = taxable + tax;

  const paidAmount = Number(invoice?.paidAmount ?? invoice?.paid ?? 0) || 0;
  let status = "DUE";
  let statusColor = "#044bab";

  // Check if explicitly marked as PAID or if paid amount covers the total (with small tolerance)
  const isPaid =
    invoice?.status === "PAID" || (paidAmount >= total - 1 && total > 0);

  if (isPaid) {
    status = "PAID";
    statusColor = "#16a34a"; // green
  } else if (paidAmount > 0 && paidAmount < total) {
    status = "PARTIAL";
    statusColor = "#f59e0b"; // amber
  }

  const effectiveClientName =
    client?.name || invoice?.clientName || invoice?.client || "Client";
  const clientGst =
    (client as any)?.gst ||
    (client as any)?.gstNumber ||
    (client as any)?.gstin ||
    (invoice as any)?.clientGst ||
    (invoice as any)?.gstNumber ||
    "";

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        width: "100%",
        padding: "15mm 20mm",
        color: "#333",
        background: "#fff",
        boxSizing: "border-box",
        maxWidth: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 60,
              height: 60,
              background: "#fff",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={typeof logo === "string" ? logo : (logo as any).src}
              alt="Logo"
              style={{
                width: 45,
                height: 45,
                objectFit: "contain",
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#044bab" }}>
              Pixelate Nest
            </div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
              Kalahanu Tech Studios
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#044bab",
              marginBottom: 8,
            }}
          >
            TAX INVOICE
          </div>

          {/* Improved Status Section with better centering */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 4,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "6px 12px",
                borderRadius: 8,
                background: statusColor,
                color: "#fff",
                fontWeight: 800,
                fontSize: 12,
                width: "fit-content",
                marginLeft: "auto",
              }}
            >
              {status}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#666",
                textAlign: "right",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <span style={{ fontWeight: 600 }}>Paid:</span>
                <span>{formatCurrency(paidAmount)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <span style={{ fontWeight: 600 }}>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <span style={{ fontWeight: 600 }}>Invoice #:</span>
              <span>{invoice?.id ?? invoice?.invoiceNo ?? invoice?._id}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <span style={{ fontWeight: 600 }}>Date:</span>
              <span>{formatDate(invoice?.createdAt ?? Date.now())}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <span style={{ fontWeight: 600 }}>Due:</span>
              <span>
                {invoice?.dueDate ? formatDate(invoice.dueDate) : "On receipt"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Company and Client Info */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
          marginBottom: 20,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#044bab",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            From
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#333" }}>
            Kalahanu Tech Studios LLP
          </div>
          <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>
            GST: 10ABFFK0650E1Z2
          </div>
          <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>
            Kala Bhawan, Akharaghat Road
          </div>
          <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>
            Muzaffarpur, Bihar - 842001
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#044bab",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Bill To
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#333",
              marginBottom: 4,
            }}
          >
            {effectiveClientName}
          </div>
          <div style={{ fontSize: 11, color: "#666", marginBottom: 3 }}>
            {client?.address || invoice?.clientAddress || ""}
          </div>
          <div style={{ fontSize: 11, color: "#666" }}>
            {client?.email || invoice?.clientEmail || ""}
          </div>
          <div style={{ fontSize: 11, color: "#666" }}>
            {client?.phone || invoice?.clientPhone || ""}
          </div>
          {clientGst ? (
            <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>
              GSTIN: {clientGst}
            </div>
          ) : null}
        </div>
      </div>

      {/* Items Table */}
      <div style={{ marginBottom: 20 }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 12,
          }}
        >
          <thead>
            <tr
              style={{
                background: "#044bab",
                color: "#fff",
              }}
            >
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: 11,
                  width: "5%",
                }}
              >
                #
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: 11,
                  width: "50%",
                }}
              >
                Description
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 600,
                  fontSize: 11,
                  width: "10%",
                }}
              >
                Qty
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 600,
                  fontSize: 11,
                  width: "15%",
                }}
              >
                Unit Price
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 600,
                  fontSize: 11,
                  width: "20%",
                }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 8).map((it: any, index: number) => {
              const qty = Number(it?.quantity ?? it?.qty ?? 1);
              const unit = Number(
                it?.price ?? it?.unitPrice ?? it?.amount ?? 0,
              );
              const amt = qty * unit;

              return (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <td
                    style={{
                      padding: "10px 12px",
                      fontWeight: 500,
                      color: "#666",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      fontWeight: 500,
                    }}
                  >
                    {it?.description || it?.name || "Service"}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 500,
                      color: "#666",
                    }}
                  >
                    {qty}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 500,
                      color: "#666",
                    }}
                  >
                    {formatCurrency(unit)}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 600,
                      color: "#333",
                    }}
                  >
                    {formatCurrency(amt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Work / Job Details (optional) */}

      {/* Summary Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 40,
          marginBottom: 25,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#044bab",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Notes
          </div>
          <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5 }}>
            {invoice?.notes ||
              "Payment due within 30 days of invoice date. Please include invoice number with payment."}
          </div>
        </div>

        <div
          style={{
            width: 280,
            padding: 15,
            border: "1px solid #eee",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 12, color: "#666" }}>Subtotal</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>
              {formatCurrency(subtotal)}
            </span>
          </div>

          {discount > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 12, color: "#666" }}>Discount</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>
                - {formatCurrency(discount)}
              </span>
            </div>
          )}

          {isInterState && igst > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 12, color: "#666" }}>IGST (18%)</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>
                {formatCurrency(igst)}
              </span>
            </div>
          )}

          {!isInterState && cgst > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 12, color: "#666" }}>CGST (9%)</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>
                {formatCurrency(cgst)}
              </span>
            </div>
          )}

          {!isInterState && sgst > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 12, color: "#666" }}>SGST (9%)</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>
                {formatCurrency(sgst)}
              </span>
            </div>
          )}

          <div
            style={{
              paddingTop: 12,
              borderTop: "2px solid #044bab",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#044bab",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#044bab",
              }}
            >
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
          marginBottom: 20,
          paddingTop: 20,
          borderTop: "1px solid #eee",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#044bab",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Payment Info
          </div>
          <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5 }}>
            <div>Bank: HDFC BANK PVT LTD</div>
            <div>A/C: 0000 1234 5678</div>
            <div>Name: Kalahanu Tech Studios</div>
            <div>IFSC: HDFC0000344</div>
          </div>
        </div>

        <div style={{ textAlign: "center", alignItems: "center" }}>
          <img
            src={typeof signImg === "string" ? signImg : (signImg as any).src}
            alt="Signature"
            style={{
              width: "180px",
              height: "100px",
              objectFit: "contain",
              display: "block",
              margin: "0 auto",
            }}
          />
          <div
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#044bab",
              margin: "0 auto 6px",
              opacity: 0.5,
            }}
          />
          <div style={{ fontSize: 12, fontWeight: 700, color: "#333" }}>
            Labh Chandra Bothra
          </div>
          <div style={{ fontSize: 11, color: "#666" }}>Co-Founder</div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#044bab",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Contact
          </div>
          <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5 }}>
            <div>📧 support@pixelatenest.com</div>
            <div>📞 +91 84069 12345</div>
            <div>🌐 pixelatenest.com</div>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div
        style={{
          fontSize: 10,
          color: "#666",
          textAlign: "center",
          paddingTop: 15,
          borderTop: "1px solid #eee",
        }}
      >
        This invoice is computer generated and does not require a signature. All
        goods and services remain the property of Pixelate Nest until paid in
        full.
      </div>
    </div>
  );
}
