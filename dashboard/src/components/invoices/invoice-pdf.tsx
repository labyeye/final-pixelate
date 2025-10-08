import React, { useEffect, useState } from "react";
import type { Client } from "@/lib/data";
import logo from "@/assets/images/logo-transparent.png";

// Professional Invoice PDF component
export function InvoicePDF({ invoice }: { invoice: any }) {
  const [client, setClient] = useState<Client | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    if (invoice?.clientId) {
      (async () => {
        try {
          const res = await fetch(`/api/clients/${invoice.clientId}`);
          if (!mounted) return;
          if (res.ok) setClient(await res.json());
        } catch (e) {
          // ignore
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [invoice?.clientId]);

  const formatCurrency = (v: number) => {
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }).format(v || 0);
    } catch (e) {
      return `₹${(v || 0).toLocaleString()}`;
    }
  };

  const date = new Date(invoice?.createdAt || Date.now()).toLocaleDateString();
  const due = invoice?.dueDate
    ? new Date(invoice.dueDate).toLocaleDateString()
    : "";

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

  // brand colors (match the logo orange + white)
  const brand = "#E65100";
  const lightGray = "#f5f5f7";

  return (
    <div
      style={{
        fontFamily: "Inter, Roboto, sans-serif",
        padding: 28,
        color: "#111",
        width: 750,
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img
            src={typeof logo === "string" ? logo : (logo as any).src}
            alt="Pixelate Nest"
            style={{ width: 72, height: 72, objectFit: "contain" }}
          />
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: brand }}>
              Pixelate Nest
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>
              Creative Software & Digital Solutions
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: brand }}>
            INVOICE
          </div>
          <div style={{ marginTop: 6 }}>
            <div style={{ fontSize: 12 }}>
              <strong>Invoice #</strong> {invoice?.id ?? invoice?._id ?? "—"}
            </div>
            <div style={{ fontSize: 12 }}>
              <strong>Date</strong> {date}
            </div>
            <div style={{ fontSize: 12 }}>
              <strong>Due</strong> {due || "On receipt"}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 18 }}
      >
        <div
          style={{
            flex: "1 1 50%",
            background: lightGray,
            padding: 12,
            borderRadius: 6,
          }}
        >
          <div style={{ fontSize: 12, color: "#333", fontWeight: 600 }}>
            Bill From
          </div>
          <div style={{ marginTop: 8, fontSize: 13 }}>
            <div style={{ fontWeight: 700 }}>Pixelate Nest</div>
            <div>Kalahanu Enterprises Private Limited</div>
            <div>
              Kala Bhawan Akharaghat Road, Near G.D Mother International School
            </div>
            <div>Muzaffarpur, Bihar, 842001</div>

            <div style={{ marginTop: 6 }}>Phone: +91 92341 12345</div>
            <div>Email: pixelatenest@gmail.com</div>
          </div>
        </div>

        <div style={{ flex: "1 1 45%", padding: 12 }}>
          <div style={{ fontSize: 12, color: "#333", fontWeight: 600 }}>
            Bill To
          </div>
          <div style={{ marginTop: 8, fontSize: 13 }}>
            <div style={{ fontWeight: 700 }}>
              {client ? client.name : invoice?.clientName || "Client Name"}
            </div>
            {client ? (
              <>
                <div>{client.address || ""}</div>
                <div style={{ marginTop: 6 }}>
                  {client.email} | {client.phone}
                </div>
              </>
            ) : (
              <>
                <div>{invoice?.clientAddress || invoice?.clientCity || ""}</div>
                <div style={{ marginTop: 6 }}>
                  {invoice?.clientEmail || ""}{" "}
                  {invoice?.clientPhone ? `| ${invoice.clientPhone}` : ""}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <thead>
            <tr style={{ background: brand, color: "#fff", textAlign: "left" }}>
              <th
                style={{
                  padding: "10px 12px",
                  borderBottom: `2px solid ${brand}`,
                }}
              >
                Description
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  borderBottom: `2px solid ${brand}`,
                  width: 120,
                  textAlign: "right",
                }}
              >
                Quantity
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  borderBottom: `2px solid ${brand}`,
                  width: 140,
                  textAlign: "right",
                }}
              >
                Unit Price
              </th>
              <th
                style={{
                  padding: "10px 12px",
                  borderBottom: `2px solid ${brand}`,
                  width: 140,
                  textAlign: "right",
                }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => {
              const qty = Number(it?.quantity ?? it?.qty ?? 1);
              const unit = Number(
                it?.price ?? it?.unitPrice ?? it?.amount ?? 0
              );
              const amt = qty * unit;
              return (
                <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px 12px", verticalAlign: "top" }}>
                    <div style={{ fontWeight: 600 }}>
                      {it?.description || it?.name || "Service"}
                    </div>
                    {it?.notes && (
                      <div
                        style={{ marginTop: 6, color: "#666", fontSize: 12 }}
                      >
                        {it.notes}
                      </div>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      verticalAlign: "top",
                    }}
                  >
                    {qty}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      verticalAlign: "top",
                    }}
                  >
                    {formatCurrency(unit)}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      textAlign: "right",
                      verticalAlign: "top",
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

      <div
        style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}
      >
        <div
          style={{
            width: 320,
            background: lightGray,
            padding: 12,
            borderRadius: 6,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div>Subtotal</div>
            <div style={{ fontWeight: 600 }}>{formatCurrency(subtotal)}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div>Tax</div>
            <div style={{ fontWeight: 600 }}>{formatCurrency(tax)}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div>Discount</div>
            <div style={{ fontWeight: 600 }}>-{formatCurrency(discount)}</div>
          </div>
          <div style={{ height: 1, background: "#e8e8e8", margin: "8px 0" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              fontWeight: 800,
              color: brand,
            }}
          >
            <div>Total</div>
            <div>{formatCurrency(total)}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 28, fontSize: 12, color: "#666" }}>
        <div style={{ marginBottom: 8 }}>
          Payment Terms:{" "}
          {invoice?.paymentTerms ||
            "Payment due within 30 days. Bank transfer preferred."}
        </div>
        <div style={{ marginBottom: 8 }}>
          Bank Details: Pixelate Nest | A/c: 1234567890 | IFSC: PIXE0000123 |
          Bank: Pixelate Bank
        </div>
        <div style={{ marginBottom: 8 }}>
          Notes:{" "}
          {invoice?.notes ||
            "Thank you for your business. Please remit payment by the due date to avoid late fees."}
        </div>
        <div style={{ marginTop: 10, color: "#999", fontSize: 11 }}>
          If you have any questions regarding this invoice, please contact
          accounts at hello@pixelatenest.example or +91 98765 43210.
        </div>
      </div>
    </div>
  );
}
