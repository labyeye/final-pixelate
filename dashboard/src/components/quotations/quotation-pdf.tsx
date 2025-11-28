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
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    
    // Fetch client
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
    
    // Fetch settings
    (async () => {
      try {
        const res = await fetch('/api/settings');
        if (!mounted) return;
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (e) {
        // ignore
      }
    })();
    
    return () => {
      mounted = false;
    };
  }, [quote.clientId, client]);

  const effectiveClientName = client?.name || quote.clientName || "Client";

  // Calculate totals from services if available
  const servicesTotal = (quote.services || []).reduce((sum: number, item) => sum + Number(item.amount || 0), 0);
  const subtotal = servicesTotal || quote.amount || 0;
  const discount = Number(quote.discount || 0);
  const total = subtotal - discount;

  const formatDate = (d?: string | Date | number) => {
    if (!d) return "—";
    const dt = d instanceof Date ? d : new Date(d);
    if (isNaN(dt.getTime())) return "—";
    return dt.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (v: number) => {
    try {
      return `Rs.${(v || 0).toLocaleString('en-IN')}`;
    } catch (e) {
      return `Rs.${(v || 0).toLocaleString()}`;
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Noto Sans Local', 'Noto Sans', Inter, Roboto, sans-serif",
        width: "210mm",
        color: "#111",
        background: "#fff",
        fontSize: "14px",
        lineHeight: "1.6",
      }}
    >
      {/* PAGE 1: COVER PAGE */}
      <div
        style={{
          width: "210mm",
          height: "297mm",
          padding: "40mm 20mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          pageBreakAfter: "always",
        }}
      >
        <div
          style={{
            fontSize: "52px",
            fontWeight: "800",
            color: "#111",
            marginBottom: "30px",
            lineHeight: "1.2",
            maxWidth: "80%",
          }}
        >
          {(quote as any).title || "Project Quotation"}
        </div>

        <div
          style={{
            display: "inline-block",
            padding: "12px 32px",
            background: "#F36F21",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "700",
            borderRadius: "8px",
            marginBottom: "40px",
          }}
        >
          {displayId || quote.id || "QUOTE-001"}
        </div>

        {(quote as any).subtitle && (
          <div
            style={{
              fontSize: "20px",
              color: "#555",
              marginBottom: "50px",
              maxWidth: "70%",
            }}
          >
            {(quote as any).subtitle}
          </div>
        )}

        <div style={{ fontSize: "28px", fontWeight: "700", color: "#222", marginBottom: "20px" }}>
          {effectiveClientName}
        </div>

        <div style={{ fontSize: "18px", color: "#666" }}>
          {formatDate(new Date())}
        </div>
      </div>

      {/* PAGE 2: COMPANY INFORMATION (PERMANENT) */}
      <div
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "20mm",
          background: "#1a1a1a",
          color: "#fff",
          pageBreakAfter: "always",
        }}
      >
        {/* Company Header */}
        <div style={{ textAlign: "center", marginBottom: "40px", paddingTop: "20px" }}>
          <div style={{ fontSize: "42px", fontWeight: "800", color: "#F36F21", marginBottom: "10px" }}>
            {settings?.companyName || "Pixelate Nest"}
          </div>
          <div style={{ fontSize: "18px", color: "#ccc" }}>
            Creative Software & Digital Solutions
          </div>
        </div>

        {/* About Section */}
        {settings?.about && (
          <div style={{ marginBottom: "35px" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#F36F21",
                marginBottom: "15px",
                borderBottom: "2px solid #F36F21",
                paddingBottom: "8px",
              }}
            >
              About Us
            </div>
            <div style={{ fontSize: "16px", lineHeight: "1.8", color: "#ddd" }}>
              {settings.about}
            </div>
          </div>
        )}

        {/* Mission, Vision, Goal Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          {settings?.mission && (
            <div
              style={{
                background: "#2a2a2a",
                padding: "20px",
                borderRadius: "8px",
                borderLeft: "4px solid #F36F21",
              }}
            >
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#F36F21", marginBottom: "10px" }}>
                Mission
              </div>
              <div style={{ fontSize: "14px", color: "#ccc", lineHeight: "1.6" }}>
                {settings.mission}
              </div>
            </div>
          )}

          {settings?.vision && (
            <div
              style={{
                background: "#2a2a2a",
                padding: "20px",
                borderRadius: "8px",
                borderLeft: "4px solid #F36F21",
              }}
            >
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#F36F21", marginBottom: "10px" }}>
                Vision
              </div>
              <div style={{ fontSize: "14px", color: "#ccc", lineHeight: "1.6" }}>
                {settings.vision}
              </div>
            </div>
          )}

          {settings?.goal && (
            <div
              style={{
                background: "#2a2a2a",
                padding: "20px",
                borderRadius: "8px",
                borderLeft: "4px solid #F36F21",
              }}
            >
              <div style={{ fontSize: "18px", fontWeight: "700", color: "#F36F21", marginBottom: "10px" }}>
                Goal
              </div>
              <div style={{ fontSize: "14px", color: "#ccc", lineHeight: "1.6" }}>
                {settings.goal}
              </div>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div
          style={{
            background: "#2a2a2a",
            padding: "25px",
            borderRadius: "8px",
            marginTop: "30px",
          }}
        >
          <div style={{ fontSize: "22px", fontWeight: "700", color: "#F36F21", marginBottom: "20px" }}>
            Contact Information
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", fontSize: "14px" }}>
            <div>
              <div style={{ color: "#999", marginBottom: "5px" }}>Email</div>
              <div style={{ color: "#fff", fontWeight: "600" }}>
                {settings?.email || "info@pixelatenest.com"}
              </div>
            </div>
            <div>
              <div style={{ color: "#999", marginBottom: "5px" }}>Phone</div>
              <div style={{ color: "#fff", fontWeight: "600" }}>
                {settings?.phone || "+91 XXXXXXXXXX"}
              </div>
            </div>
            <div>
              <div style={{ color: "#999", marginBottom: "5px" }}>Address</div>
              <div style={{ color: "#fff", fontWeight: "600" }}>
                {settings?.address || "Kala Bhawan, Akharaghat Road, Muzaffarpur, Bihar"}
              </div>
            </div>
            <div>
              <div style={{ color: "#999", marginBottom: "5px" }}>Website</div>
              <div style={{ color: "#F36F21", fontWeight: "600" }}>
                {settings?.website || "www.pixelatenest.com"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 3+: QUOTATION DETAILS */}
      <div style={{ width: "210mm", padding: "20mm" }}>
        {/* Client Information */}
        <div style={{ marginBottom: "35px" }}>
          <div
            style={{
              fontSize: "26px",
              fontWeight: "700",
              color: "#111",
              marginBottom: "20px",
              borderBottom: "3px solid #F36F21",
              paddingBottom: "10px",
            }}
          >
            Client Information
          </div>
          <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "8px", fontSize: "15px" }}>
            <div style={{ marginBottom: "10px" }}>
              <strong>Name:</strong> {effectiveClientName}
            </div>
            {client?.email && (
              <div style={{ marginBottom: "10px" }}>
                <strong>Email:</strong> {client.email}
              </div>
            )}
            {client?.phone && (
              <div style={{ marginBottom: "10px" }}>
                <strong>Phone:</strong> {client.phone}
              </div>
            )}
            {client?.address && (
              <div style={{ marginBottom: "10px" }}>
                <strong>Address:</strong> {client.address}
              </div>
            )}
            {client?.hasGst && (
              <>
                <div style={{ marginTop: "15px", fontWeight: "700", color: "#F36F21" }}>GST Details</div>
                <div style={{ marginTop: "8px" }}>
                  <strong>Company:</strong> {client.gstCompanyName}
                </div>
                <div style={{ marginTop: "5px" }}>
                  <strong>GSTIN:</strong> {client.gstNumber}
                </div>
                <div style={{ marginTop: "5px" }}>
                  <strong>Address:</strong> {client.gstAddress}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Objective */}
        {(quote as any).objective && (
          <div style={{ marginBottom: "30px" }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#111",
                marginBottom: "12px",
                borderLeft: "4px solid #F36F21",
                paddingLeft: "12px",
              }}
            >
              Objective
            </div>
            <div style={{ fontSize: "15px", lineHeight: "1.7", color: "#333" }}>
              {(quote as any).objective}
            </div>
          </div>
        )}

        {/* Purpose */}
        {(quote as any).purpose && (
          <div style={{ marginBottom: "30px" }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#111",
                marginBottom: "12px",
                borderLeft: "4px solid #F36F21",
                paddingLeft: "12px",
              }}
            >
              Purpose
            </div>
            <div style={{ fontSize: "15px", lineHeight: "1.7", color: "#333" }}>
              {(quote as any).purpose}
            </div>
          </div>
        )}

        {/* Scope */}
        {(quote as any).scope && (quote as any).scope.length > 0 && (
          <div style={{ marginBottom: "30px", pageBreakInside: "avoid" }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#111",
                marginBottom: "15px",
                borderLeft: "4px solid #F36F21",
                paddingLeft: "12px",
              }}
            >
              Scope of Work
            </div>
            <div style={{ paddingLeft: "20px" }}>
              {(quote as any).scope.map((item: any, idx: number) => (
                <div key={idx} style={{ marginBottom: "8px", fontSize: "15px" }}>
                  <strong style={{ color: "#F36F21" }}>•</strong> {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deliverables */}
        {(quote as any).deliverables && (quote as any).deliverables.length > 0 && (
          <div style={{ marginBottom: "30px", pageBreakInside: "avoid" }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#111",
                marginBottom: "15px",
                borderLeft: "4px solid #F36F21",
                paddingLeft: "12px",
              }}
            >
              Deliverables
            </div>
            <div style={{ paddingLeft: "20px" }}>
              {(quote as any).deliverables.map((item: any, idx: number) => (
                <div key={idx} style={{ marginBottom: "8px", fontSize: "15px" }}>
                  <strong style={{ color: "#F36F21" }}>•</strong> {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        {(quote as any).timeline && (quote as any).timeline.length > 0 && (
          <div style={{ marginBottom: "35px", pageBreakInside: "avoid" }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#111",
                marginBottom: "15px",
                borderLeft: "4px solid #F36F21",
                paddingLeft: "12px",
              }}
            >
              Timeline
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#F36F21", color: "#fff" }}>
                  <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Phase</th>
                  <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Duration</th>
                  <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {(quote as any).timeline.map((item: any, idx: number) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? "#fff" : "#f8f9fa" }}>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.phase}</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.duration}</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Services Table */}
        {quote.services && quote.services.length > 0 && (
          <div style={{ marginBottom: "35px", pageBreakInside: "avoid" }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#111",
                marginBottom: "15px",
                borderLeft: "4px solid #F36F21",
                paddingLeft: "12px",
              }}
            >
              Services
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#F36F21", color: "#fff" }}>
                  <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Service</th>
                  <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Start Date</th>
                  <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>End Date</th>
                  <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Deliverables</th>
                  <th style={{ padding: "12px", textAlign: "right", border: "1px solid #ddd" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {quote.services.map((service, idx: number) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? "#fff" : "#f8f9fa" }}>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{service.name || "-"}</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {service.startDate ? formatDate(service.startDate) : "-"}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {service.endDate ? formatDate(service.endDate) : "-"}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>{service.deliverables || "-"}</td>
                    <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "right", fontWeight: "600" }}>
                      {formatCurrency(Number(service.amount || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pricing Breakdown */}
        <div
          style={{
            marginBottom: "35px",
            display: "flex",
            justifyContent: "flex-end",
            pageBreakInside: "avoid",
          }}
        >
          <div style={{ width: "300px", background: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "16px",
                marginBottom: "12px",
              }}
            >
              <span style={{ fontWeight: "600" }}>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "16px",
                  marginBottom: "12px",
                  color: "#28a745",
                }}
              >
                <span style={{ fontWeight: "600" }}>Discount</span>
                <span>- {formatCurrency(discount)}</span>
              </div>
            )}
            <div
              style={{
                borderTop: "2px solid #F36F21",
                paddingTop: "12px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "20px",
                fontWeight: "700",
                color: "#111",
              }}
            >
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        {/* Modules */}
        {(quote as any).modules && (quote as any).modules.length > 0 && (
          <div style={{ marginBottom: "35px", pageBreakInside: "avoid" }}>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#111",
                marginBottom: "15px",
                borderLeft: "4px solid #F36F21",
                paddingLeft: "12px",
              }}
            >
              Modules
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              {(quote as any).modules.map((module: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    background: "#f8f9fa",
                    padding: "15px",
                    borderRadius: "8px",
                    borderLeft: "3px solid #F36F21",
                  }}
                >
                  <div style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "8px" }}>
                    {module.name || `Module ${idx + 1}`}
                  </div>
                  {module.description && (
                    <div style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>
                      {module.description}
                    </div>
                  )}
                  {module.status && (
                    <div
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        background:
                          module.status === "completed"
                            ? "#28a745"
                            : module.status === "in-progress"
                            ? "#ffc107"
                            : "#6c757d",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "600",
                        borderRadius: "4px",
                      }}
                    >
                      {module.status}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terms & Conditions */}
        <div style={{ marginTop: "40px", pageBreakInside: "avoid" }}>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#111",
              marginBottom: "15px",
              borderLeft: "4px solid #F36F21",
              paddingLeft: "12px",
            }}
          >
            Terms & Conditions
          </div>
          <div style={{ fontSize: "14px", lineHeight: "1.7", color: "#555" }}>
            {(quote as any).paymentTerms && (
              <div style={{ marginBottom: "10px" }}>
                <strong>Payment Terms:</strong> {(quote as any).paymentTerms}
              </div>
            )}
            {(quote as any).customTerms && (quote as any).customTerms.length > 0 && (
              <div style={{ marginTop: "15px" }}>
                {(quote as any).customTerms.map((term: any, idx: number) => (
                  <div key={idx} style={{ marginBottom: "8px" }}>
                    <strong style={{ color: "#F36F21" }}>•</strong> {term}
                  </div>
                ))}
              </div>
            )}
            {(!(quote as any).paymentTerms && (!(quote as any).customTerms || (quote as any).customTerms.length === 0)) && (
              <div>
                {settings?.termsAndConditions ||
                  "Payment due within 30 days. This quotation is valid for 15 days from the date of issue. All work is subject to our standard terms of service."}
              </div>
            )}
          </div>
        </div>

        {/* Signature */}
        <div style={{ marginTop: "50px", display: "flex", justifyContent: "space-between" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ borderTop: "2px solid #111", width: "200px", paddingTop: "10px", marginTop: "60px" }}>
              <div style={{ fontWeight: "700", fontSize: "15px" }}>Client Signature</div>
              <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>Date: __________</div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src={typeof signImg === "string" ? signImg : (signImg as any).src}
              alt="Signature"
              style={{ width: "150px", height: "80px", objectFit: "contain" }}
            />
            <div style={{ borderTop: "2px solid #111", width: "200px", paddingTop: "10px" }}>
              <div style={{ fontWeight: "700", fontSize: "15px" }}>Authorized Signature</div>
              <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>
                {settings?.companyName || "Pixelate Nest"}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid #ddd",
            textAlign: "center",
            fontSize: "12px",
            color: "#999",
          }}
        >
          <div>{settings?.companyName || "Pixelate Nest"} | Creative Software & Digital Solutions</div>
          <div style={{ marginTop: "5px" }}>
            {settings?.email || "info@pixelatenest.com"} | {settings?.phone || "+91 XXXXXXXXXX"}
          </div>
          <div style={{ marginTop: "5px" }}>
            {settings?.address || "Kala Bhawan, Akharaghat Road, Muzaffarpur, Bihar"}
          </div>
        </div>
      </div>
    </div>
  );
}
