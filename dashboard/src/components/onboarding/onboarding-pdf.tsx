import React, { useEffect, useState } from "react";

export function OnboardingPDF({ data }: { data: any }) {
  const formatDate = (d?: string | Date | number) => {
    if (!d) return "—";
    const dt = d instanceof Date ? d : new Date(d);
    if (isNaN(dt.getTime())) return "—";
    return dt.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      style={{
        fontFamily: "'Noto Sans Local', 'Noto Sans', Inter, Roboto, sans-serif",
        width: "210mm",
        color: "#111",
        background: "#fff",
        fontSize: "13px",
        lineHeight: "1.5",
        boxSizing: "border-box",
      }}
    >
      {/* Cover */}
      <div
        style={{
          width: "210mm",
          height: "297mm",
          padding: "36mm 20mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "linear-gradient(135deg,#f7fbff 0%,#eef6ff 100%)",
          pageBreakAfter: "always",
        }}
      >
        <h1 style={{ fontSize: "44px", margin: 0, color: "#0b3a91" }}>Client Onboarding</h1>
        <div style={{ marginTop: 18, fontSize: 18, color: "#333" }}>{data?.projectTitle || "New Project"}</div>
        <div style={{ marginTop: 28, fontSize: 16, color: "#666" }}>{formatDate(data?.date || new Date())}</div>
      </div>

      {/* Client Details */}
      <div style={{ width: "210mm", padding: "20mm", pageBreakAfter: "always" }}>
        <div style={{ marginBottom: 12, fontSize: 20, fontWeight: 700, color: "#0b3a91" }}>Client Details</div>
        <div style={{ background: "#f6f7fb", padding: 16, borderRadius: 8 }}>
          <div style={{ marginBottom: 8 }}><strong>Name:</strong> {data.clientName || "—"}</div>
          <div style={{ marginBottom: 8 }}><strong>Company:</strong> {data.company || "—"}</div>
          <div style={{ marginBottom: 8 }}><strong>Email:</strong> {data.email || "—"}</div>
          <div style={{ marginBottom: 8 }}><strong>Phone:</strong> {data.phone || "—"}</div>
          <div style={{ marginBottom: 8 }}><strong>Address:</strong> {data.address || "—"}</div>
        </div>

        <div style={{ marginTop: 20, marginBottom: 12, fontSize: 20, fontWeight: 700, color: "#0b3a91" }}>Project Snapshot</div>
        <div style={{ background: "#fff", padding: 16, borderRadius: 8, border: "1px solid #eee" }}>
          <div style={{ marginBottom: 8 }}><strong>Project Type:</strong> {data.projectType || "—"}</div>
          <div style={{ marginBottom: 8 }}><strong>Website / App Type:</strong> {data.productType || "—"}</div>
          <div style={{ marginBottom: 8 }}><strong>Pages / Modules:</strong> {data.pages || "—"}</div>
          <div style={{ marginBottom: 8 }}><strong>Estimated Budget:</strong> {data.budget || "—"}</div>
          <div style={{ marginBottom: 8 }}><strong>Start Date:</strong> {formatDate(data.startDate)}</div>
          <div style={{ marginBottom: 8 }}><strong>Target Delivery:</strong> {formatDate(data.deadline)}</div>
        </div>
      </div>

      {/* Requirements / Brief */}
      <div style={{ width: "210mm", padding: "20mm" }}>
        <div style={{ marginBottom: 12, fontSize: 20, fontWeight: 700, color: "#0b3a91" }}>Project Brief / Requirements</div>
        <div style={{ background: "#f6f7fb", padding: 16, borderRadius: 8, minHeight: 120 }}>
          <div style={{ whiteSpace: "pre-wrap", fontSize: 14, color: "#222" }}>{data.brief || "—"}</div>
        </div>

        <div style={{ marginTop: 20, display: "flex", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Primary Contact</div>
            <div style={{ background: "#fff", padding: 12, borderRadius: 8, border: "1px solid #eee" }}>
              <div style={{ marginBottom: 6 }}><strong>{data.contactName || "—"}</strong></div>
              <div style={{ marginBottom: 4 }}>{data.contactEmail || "—"}</div>
              <div>{data.contactPhone || "—"}</div>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Deliverables (High level)</div>
            <div style={{ background: "#fff", padding: 12, borderRadius: 8, border: "1px solid #eee" }}>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {(data.deliverables || []).length > 0 ? (
                  (data.deliverables || []).map((d: string, i: number) => <li key={i}>{d}</li>)
                ) : (
                  <li>—</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 14, color: "#666" }}>Notes</div>
          <div style={{ marginTop: 8, background: "#fff", padding: 12, borderRadius: 8, border: "1px solid #eee" }}>
            <div style={{ whiteSpace: "pre-wrap" }}>{data.notes || "—"}</div>
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13, color: "#777" }}>Generated by Pixelate Nest</div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{data.clientName || "Client"}</div>
              <div style={{ fontSize: 12, color: "#777", marginTop: 8 }}>Signature: ________________________</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
