import type { Quotation, Client } from "@/lib/data";
import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo-transparent.png";
import signImg from "@/assets/images/sign.png";

export function QuotationPDF({
  quote,
  client: initialClient,
  displayId,
}: {
  quote: Quotation;
  client?: Client;
  displayId?: string;
}) {
  const [client, setClient] = useState<Client | undefined>(initialClient);

  useEffect(() => {
    let mounted = true;
    if (!client && quote.clientId) {
      (async () => {
        try {
          const res = await fetch(`/api/clients/${quote.clientId}`);
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
  }, [quote.clientId, client]);

  // If client details couldn't be fetched, fall back to the stored clientName from the quote
  const effectiveClientName = client?.name || quote.clientName || "Client";

  const subtotal =
    (quote.services || []).reduce((s, it) => s + Number(it.amount || 0), 0) ||
    (quote.amount ?? 0);
  const discount = Number(quote.discount ?? 0);
  const total = subtotal - discount;

  const formatDate = (d?: string | Date | number) => {
    if (!d) return "—";
    const dt = d instanceof Date ? d : new Date(d);
    if (isNaN(dt.getTime())) return "—";
    const dd = String(dt.getDate()).padStart(2, "0");
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const yyyy = dt.getFullYear();
    return `${dd} / ${mm} / ${yyyy}`;
  };

  const formatCurrency = (v: number) => {
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }).format(v || 0);
    } catch (e) {
      // fallback to rupee char with separators
      return `₹${(v || 0).toLocaleString()}`;
    }
  };

  return (
    <div
      style={{
        // prefer a locally-embedded Noto Sans (registered as 'Noto Sans Local'),
        // then fallback to system fonts
        fontFamily: "'Noto Sans Local', 'Noto Sans', Inter, Roboto, sans-serif",
        // full A4 size
        width: "100%",
        height: "100%",
        padding: "10mm",
        color: "#111",
        background: "#fff",
        border: "none",
        borderRadius: "0",
        boxShadow: "none",
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
            QUOTATION
          </div>
          <div style={{ marginTop: 8, fontSize: 13 }}>
            <div>
              <strong>Quotation ID:</strong> {displayId || quote.id}
            </div>
            <div>
              <strong>Date:</strong> {formatDate(new Date())}
            </div>
            <div>
              <strong>Delivery:</strong>{" "}
              {quote.deliveryDate ? formatDate(quote.deliveryDate) : "—"}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2
          style={{
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          BILLED TO
        </h2>
        <p
          style={{ fontSize: "18px", fontWeight: "bold", margin: "6px 0 0 0" }}
        >
          {effectiveClientName}
        </p>
        <p style={{ fontSize: "14px", margin: "5px 0 0 0" }}>
          {client?.address || ""}
        </p>
        <p style={{ fontSize: "14px", margin: "5px 0 0 0" }}>
          {client ? `${client.email} | ${client.phone || ""}` : ""}
        </p>
      </div>

      {client?.hasGst && (
        <div style={{ marginTop: "20px" }}>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              paddingBottom: "5px",
            }}
          >
            GST DETAILS
          </h2>
          <p style={{ fontSize: "14px", margin: "10px 0 0 0" }}>
            <strong>Company:</strong> {client?.gstCompanyName}
          </p>
          <p style={{ fontSize: "14px", margin: "5px 0 0 0" }}>
            <strong>GSTIN:</strong> {client?.gstNumber}
          </p>
          <p style={{ fontSize: "14px", margin: "5px 0 0 0" }}>
            <strong>Address:</strong> {client?.gstAddress}
          </p>
        </div>
      )}

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
                SERVICE
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  textAlign: "left",
                  fontSize: "12px",
                }}
              >
                START
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  textAlign: "left",
                  fontSize: "12px",
                }}
              >
                END
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  textAlign: "left",
                  fontSize: "12px",
                }}
              >
                DELIVERABLES
              </th>
              <th
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  textAlign: "right",
                  fontSize: "12px",
                }}
              >
                AMOUNT
              </th>
            </tr>
          </thead>
          <tbody>
            {(quote.services ?? []).map((service, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    fontSize: "14px",
                  }}
                >
                  {service.name}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    fontSize: "14px",
                  }}
                >
                  {service.startDate ? formatDate(service.startDate) : "-"}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    fontSize: "14px",
                  }}
                >
                  {service.endDate ? formatDate(service.endDate) : "-"}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    fontSize: "14px",
                  }}
                >
                  {service.deliverables || "-"}
                </td>
                <td
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    fontSize: "14px",
                    textAlign: "right",
                  }}
                >
                  {formatCurrency(Number(service.amount || 0))}
                </td>
              </tr>
            ))}
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
            <span>{formatCurrency(subtotal)}</span>
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
              <span>- {formatCurrency(discount)}</span>
            </div>
          )}
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
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "60px", fontSize: "12px", color: "#666" }}>
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            paddingBottom: "5px",
          }}
        >
          Terms & Conditions
        </h3>
        <p>
          Payment due within 30 days. This quotation is valid for 15 days from
          the date of issue. All work is subject to our standard terms of
          service.
        </p>

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={typeof signImg === "string" ? signImg : (signImg as any).src}
              alt="Signature"
              style={{ width: 380, height: 300, objectFit: "cover" }}
            />
            <div style={{ marginTop: -40, fontSize: 15, color: "#333" }}>
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
