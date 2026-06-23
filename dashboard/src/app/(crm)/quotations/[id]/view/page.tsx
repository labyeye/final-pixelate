"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Printer, Edit, Target, Eye, Rocket, CheckSquare } from "lucide-react";
import type { Quotation, AgencySettings, Client } from "@/lib/quotation-models";

// ─── Page Header (appears on every inner page) ────────────────────────────────
function PageHeader({
  clientName,
  generatedAt,
}: {
  clientName: string;
  generatedAt: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        background: "#fff",
        zIndex: 10,
      }}
    >
      <img
        src="/assets/images/Logo_Color_Name_Large.png"
        alt="Pixelate Nest"
        style={{ height: "65px", objectFit: "cover", marginTop: "36px" }}
      />
      <div style={{ textAlign: "right", lineHeight: 1.3, marginTop: "36px" }}>
        <div style={{ fontSize: "15px", fontWeight: "700", color: "#111" }}>
          {clientName}
        </div>
        <div style={{ fontSize: "15px", color: "#000", marginTop: "2px" }}>
          {generatedAt}
        </div>
      </div>
    </div>
  );
}

// ─── Page Number ──────────────────────────────────────────────────────────────
function PageNumber({ num, total }: { num: number; total: number }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "16px",
        right: "48px",
        fontSize: "10px",
        fontWeight: "600",
        color: "#bbb",
        letterSpacing: "0.05em",
      }}
    >
      Page: {num}/{total}
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "16px",
        borderLeft: "4px solid #044bab",
        paddingLeft: "12px",
        marginTop: "40px",
      }}
    >
      <span
        style={{
          fontSize: "15px",
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#111",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default function QuotationViewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [settings, setSettings] = useState<AgencySettings | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const [qRes, sRes] = await Promise.all([
          apiFetch(`/api/quotations/${id}`),
          apiFetch("/api/settings"),
        ]);
        if (!qRes.ok) throw new Error("Failed to fetch quotation");
        const qData = await qRes.json();
        setQuotation(qData);
        if (sRes.ok) setSettings(await sRes.json());
        if (qData.clientId) {
          const cRes = await apiFetch(`/api/clients/${qData.clientId}`);
          if (cRes.ok) setClient(await cRes.json());
        }
      } catch (error) {
        console.error("Error loading quotation:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-black tracking-widest uppercase">
          Loading quotation...
        </div>
      </div>
    );
  }

  if (!quotation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-black text-red-600 uppercase">
          Quotation not found
        </div>
      </div>
    );
  }

  const clientName = client?.businessName || client?.name || "Valued Client";
  const generatedAt = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedDate = new Date(quotation.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const grandTotal = quotation.services
    ? quotation.services.reduce((sum, item) => sum + item.price * item.qty, 0)
    : 0;

  // Build TOC entries and total page count
  // P1=Cover, P2=TOC, P3=About, P4=Client Info
  let totalPages = 4;
  if (quotation.scope && quotation.scope.length > 0) totalPages++; // P5
  totalPages++; // P5/6: Deliverables+Services
  totalPages++; // P6/7: Timeline
  if (quotation.modules && quotation.modules.length > 0) totalPages++; // P7/8
  totalPages++; // PLast: Terms+Signature

  const tocEntries: { title: string; page: number }[] = [];
  let pg = 3; // starts after cover(1) and toc(2)
  tocEntries.push({ title: "About Us", page: pg++ });
  tocEntries.push({ title: "Client Information", page: pg++ });
  if (quotation.scope && quotation.scope.length > 0)
    tocEntries.push({ title: "Scope of Work", page: pg++ });
  tocEntries.push({ title: "Deliverables & Services", page: pg++ });
  tocEntries.push({ title: "Project Timeline", page: pg++ });
  if (quotation.modules && quotation.modules.length > 0)
    tocEntries.push({ title: "Modules & Features", page: pg++ });
  tocEntries.push({ title: "Terms, Notes & Signature", page: pg++ });

  let pageCounter = 0;
  const nextPage = () => ++pageCounter;

  const pageStyle: React.CSSProperties = {
    position: "relative",
    boxSizing: "border-box",
    padding: "80px 48px 52px",
  };

  return (
    <>
      {/* ── Toolbar ── */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={() => {
            const editId =
              (quotation as any)._id || (quotation as any).id || id;
            router.push(`/quotations/create?edit=${editId}`);
          }}
          size="lg"
          variant="outline"
          className="shadow-lg border-2 border-black font-black"
        >
          <Edit className="mr-2 h-4 w-4" /> Edit
        </Button>
        <Button
          onClick={() => window.print()}
          size="lg"
          className="shadow-lg bg-[#111] text-white hover:bg-[#333] border-2 border-black font-black"
        >
          <Printer className="mr-2 h-4 w-4" /> Print / Download PDF
        </Button>
      </div>

      <div className="print-area min-h-screen bg-white">
        <div className="max-w-[210mm] mx-auto">
          {/* ── P1: Cover Page ── */}
          <section
            className="print-page"
            style={{
              position: "relative",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              background: "#fff",
              padding: "160px 64px 0",
              boxSizing: "border-box",
            }}
          >
            {/* Logo — top left */}
            <div style={{ position: "absolute", top: "36px", left: "48px" }}>
              <img
                src="/assets/images/Logo_Color_Name_Large.png"
                alt="Pixelate Nest"
                style={{ height: "65px", objectFit: "contain" }}
              />
            </div>

            {/* Center content */}
            <div style={{ textAlign: "center", maxWidth: "500px" }}>
              {/* Colored agency name */}
              <div
                style={{
                  fontSize: "50px",
                  fontWeight: "500",
                  marginTop: "30px",
                  marginBottom: "8px",
                  letterSpacing: "0.03em",
                }}
              >
                <span style={{ color: "#2563EB" }}>P</span>
                <span style={{ color: "#111" }}>ixelate </span>
                <span style={{ color: "#F36F21" }}>N</span>
                <span style={{ color: "#111" }}>est</span>
              </div>

              {/* Main title */}
              <h1
                style={{
                  fontSize: "67px",
                  fontWeight: "600",
                  color: "#111",
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                  margin: "0 0 40px 0",
                }}
              >
                {quotation.title || "Quotation"}
              </h1>

              {quotation.subtitle && (
                <p
                  style={{
                    fontSize: "15px",
                    color: "#888",
                    marginBottom: "32px",
                    fontWeight: "400",
                  }}
                >
                  {quotation.subtitle}
                </p>
              )}

              {/* Prepared for */}
              <p
                style={{
                  fontSize: "28px",
                  color: "#000",
                  fontWeight: "500",
                  marginTop: "180px",

                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}
              >
                Prepared For
              </p>
              <p
                style={{
                  fontSize: "45px",
                  fontWeight: "600",
                  color: "#111",
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                {clientName}
              </p>
            </div>

            {/* Date — bottom center */}
            <div
              style={{
                position: "absolute",
                bottom: "44px",
                left: 0,
                right: 0,
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  color: "#000",
                  fontWeight: "500",
                  letterSpacing: "0.06em",
                }}
              >
                {formattedDate}
              </span>
            </div>
          </section>

          {/* ── P2: Table of Contents ── */}
          {(() => {
            const pn = nextPage();
            return (
              <div
                className="print-page"
                style={{ ...pageStyle, minHeight: "100vh" }}
              >
                <PageHeader clientName={clientName} generatedAt={generatedAt} />

                {/* TOC heading */}
                <div style={{ marginBottom: "40px" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#044bab",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                      marginTop: "20px",
                    }}
                  >
                    Contents
                  </div>
                  <h2
                    style={{
                      fontSize: "36px",
                      fontWeight: "900",
                      color: "#111",
                      letterSpacing: "-0.02em",
                      margin: 0,
                    }}
                  >
                    Table of Contents
                  </h2>
                </div>

                {/* TOC entries */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "0" }}
                >
                  {tocEntries.map((entry, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "14px 14px",
                        border: "1px solid #000",
                      }}
                    >
                      {/* Number */}
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: "900",
                          color: "#000",
                          flexShrink: 0,
                          marginRight: "16px",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      {/* Title */}
                      <span
                        style={{
                          flex: 1,
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#111",
                        }}
                      >
                        {entry.title}
                      </span>
                      {/* Dots */}
                      <div
                        style={{
                          flex: 1,
                          borderBottom: "2px dotted #000",
                          margin: "0 12px",
                          height: "1px",
                        }}
                      />
                      {/* Page number */}
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "900",
                          color: "#111",
                          minWidth: "20px",
                          textAlign: "right",
                        }}
                      >
                        {entry.page}
                      </span>
                    </div>
                  ))}
                </div>

                <PageNumber num={pn} total={totalPages} />
              </div>
            );
          })()}

          {/* ── P3: About + Contact ── */}
          {(() => {
            const pn = nextPage();
            return (
              <div
                className="print-page"
                style={{
                  ...pageStyle,
                  background: "#fff",
                  color: "#000",
                  minHeight: "100vh",
                }}
              >
                <PageHeader clientName={clientName} generatedAt={generatedAt} />
                <h2
                  style={{
                    fontSize: "28px",
                    fontWeight: "900",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    marginBottom: "4px",
                  }}
                >
                  {settings?.name || "Pixelate Nest"}
                </h2>

                <h2
                  style={{
                    fontSize: "36px",
                    fontWeight: "900",
                    color: "#111",
                    letterSpacing: "-0.02em",
                    marginBottom: "30px",
                    margin: 0,
                  }}
                >
                  About Pixelate Nest{" "}
                </h2>
                <p>
                  In 2026, Pixelate Nest was founded with a clear mission: to
                  help ambitious brands navigate the digital world with
                  confidence. We started by combining our passions for cinematic
                  storytelling and cutting-edge web technology, creating a
                  single, integrated agency where creative ideas can truly take
                  flight. Today, we partner with clients to build everything
                  from high-performance websites to compelling video campaigns.
                  At every step, you get access to a dedicated team with the
                  strategic insights and technical expertise needed to turn your
                  vision into a powerful digital asset.
                </p>

                {settings?.aboutUs && (
                  <div style={{ marginBottom: "28px" }}>
                    <div
                      style={{
                        borderLeft: "3px solid #F36F21",
                        paddingLeft: "12px",
                        marginBottom: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#aaa",
                        }}
                      >
                        About Us
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#ccc",
                        lineHeight: "1.7",
                      }}
                    >
                      {settings.aboutUs}
                    </p>
                  </div>
                )}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "12px",
                    marginBottom: "28px",
                    marginTop: "20px",
                  }}
                >
                  {[
                    {
                      label: "Mission",
                      Icon: Target,
                      text:
                        settings?.mission ||
                        "To deliver exceptional digital solutions that exceed client expectations.",
                    },
                    {
                      label: "Vision",
                      Icon: Eye,
                      text:
                        settings?.vision ||
                        "To be the leading creative digital agency transforming businesses globally.",
                    },
                    {
                      label: "Goal",
                      Icon: Rocket,
                      text:
                        settings?.goal ||
                        "To empower 1000+ businesses with cutting-edge digital solutions.",
                    },
                  ].map(({ label, Icon, text }) => (
                    <div
                      key={label}
                      style={{
                        background: "#fff",
                        border: "1px solid #2a2a2a",
                        padding: "16px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <Icon size={14} color="#044bab" />
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "#000",
                          }}
                        >
                          {label}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#000",
                          lineHeight: "1.6",
                        }}
                      >
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ border: "1px solid #2a2a2a", padding: "20px" }}>
                  <div
                    style={{
                      borderLeft: "3px solid #044bab",
                      paddingLeft: "12px",
                      marginBottom: "14px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#000",
                      }}
                    >
                      Contact
                    </span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                      fontSize: "13px",
                    }}
                  >
                    {[
                      {
                        label: "Email",
                        value: settings?.email || "info@pixelatenest.com",
                      },
                      {
                        label: "Phone",
                        value: settings?.phone || "+91 XXXXXXXXXX",
                      },
                      {
                        label: "Address",
                        value:
                          settings?.address ||
                          "Kala Bhawan, Muzaffarpur, Bihar",
                      },
                      {
                        label: "Website",
                        value: settings?.website || "www.pixelatenest.com",
                      },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "#000",
                            marginBottom: "3px",
                          }}
                        >
                          {label}
                        </div>
                        <div
                          style={{
                            color: "#000",
                            fontWeight: "400",
                            fontSize: "13px",
                          }}
                        >
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <PageNumber num={pn} total={totalPages} />
              </div>
            );
          })()}

          {/* ── P4: Client Information ── */}
          {(() => {
            const pn = nextPage();
            return (
              <div
                className="print-page"
                style={{ ...pageStyle, minHeight: "100vh" }}
              >
                <PageHeader clientName={clientName} generatedAt={generatedAt} />

                <section style={{ marginBottom: "28px" }}>
                  <SectionHeading>Client Information</SectionHeading>
                  <div
                    style={{
                      border: "1px solid #e5e7eb",
                      padding: "24px",
                      background: "#fafafa",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "20px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "#000",
                            marginBottom: "4px",
                          }}
                        >
                          Client Name
                        </div>
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: "900",
                            color: "#111",
                          }}
                        >
                          {client?.name || "N/A"}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "#000",
                            marginBottom: "4px",
                          }}
                        >
                          Email
                        </div>
                        <div
                          style={{
                            fontWeight: "600",
                            color: "#333",
                            fontSize: "13px",
                          }}
                        >
                          {client?.email || "N/A"}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "#000",
                            marginBottom: "4px",
                          }}
                        >
                          Phone
                        </div>
                        <div
                          style={{
                            fontWeight: "600",
                            color: "#333",
                            fontSize: "13px",
                          }}
                        >
                          {client?.phone || "N/A"}
                        </div>
                      </div>
                      {client?.address && (
                        <div style={{ gridColumn: "span 3" }}>
                          <div
                            style={{
                              fontSize: "10px",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                              color: "#000",
                              marginBottom: "4px",
                            }}
                          >
                            Address
                          </div>
                          <div
                            style={{
                              fontWeight: "600",
                              color: "#000",
                              fontSize: "13px",
                            }}
                          >
                            {client.address}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {quotation.objective && (
                  <section style={{ marginBottom: "24px" }}>
                    <SectionHeading>Project Objective</SectionHeading>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#444",
                        lineHeight: "1.8",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {quotation.objective}
                    </p>
                  </section>
                )}
                {quotation.purpose && (
                  <section style={{ marginBottom: "24px" }}>
                    <SectionHeading>Purpose</SectionHeading>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#444",
                        lineHeight: "1.8",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {quotation.purpose}
                    </p>
                  </section>
                )}
                <PageNumber num={pn} total={totalPages} />
              </div>
            );
          })()}

          {/* ── P5 (cond): Scope of Work ── */}
          {quotation.scope &&
            quotation.scope.length > 0 &&
            (() => {
              const pn = nextPage();
              return (
                <div
                  className="print-page"
                  style={{ ...pageStyle, minHeight: "100vh" }}
                >
                  <PageHeader
                    clientName={clientName}
                    generatedAt={generatedAt}
                  />
                  <section>
                    <SectionHeading>Scope of Work</SectionHeading>
                    <div style={{ border: "1px solid #e5e7eb" }}>
                      {quotation.scope.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "14px",
                            padding: "13px 16px",
                            borderBottom:
                              idx < quotation.scope!.length - 1
                                ? "1px solid #f0f0f0"
                                : "none",
                            background: idx % 2 === 0 ? "#fff" : "#fafafa",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: "900",
                              color: "#F36F21",
                              minWidth: "24px",
                              marginTop: "1px",
                            }}
                          >
                            {String(idx + 1).padStart(2, "0")}.
                          </span>
                          <span
                            style={{
                              fontSize: "13px",
                              color: "#333",
                              lineHeight: "1.7",
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                  <PageNumber num={pn} total={totalPages} />
                </div>
              );
            })()}

          {/* ── P: Deliverables + Services ── */}
          {(() => {
            const pn = nextPage();
            return (
              <div
                className="print-page"
                style={{ ...pageStyle, minHeight: "100vh" }}
              >
                <PageHeader clientName={clientName} generatedAt={generatedAt} />

                {quotation.deliverables &&
                  quotation.deliverables.length > 0 && (
                    <section style={{ marginBottom: "32px" }}>
                      <SectionHeading>Deliverables</SectionHeading>
                      <div style={{ border: "1px solid #e5e7eb" }}>
                        {quotation.deliverables.map((item, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              padding: "11px 16px",
                              borderBottom:
                                idx < quotation.deliverables!.length - 1
                                  ? "1px solid #f0f0f0"
                                  : "none",
                              background: idx % 2 === 0 ? "#fff" : "#fafafa",
                            }}
                          >
                            <CheckSquare
                              size={14}
                              color="#F36F21"
                              style={{ marginTop: "2px", flexShrink: 0 }}
                            />
                            <span
                              style={{
                                fontSize: "13px",
                                color: "#333",
                                lineHeight: "1.6",
                              }}
                            >
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                {quotation.services && quotation.services.length > 0 && (
                  <section>
                    <SectionHeading>Services Breakdown</SectionHeading>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "13px",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            background: "#fff",
                            color: "#000",
                            border: "2px solid #111",
                          }}
                        >
                          {["Service", "Qty", "Price", "Total"].map((h, i) => (
                            <th
                              key={h}
                              style={{
                                padding: "11px 14px",
                                textAlign:
                                  i > 1 ? "right" : i === 1 ? "center" : "left",
                                fontSize: "13px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {quotation.services.map((item, idx) => {
                          const itemTotal = item.price * item.qty;
                          return (
                            <tr
                              key={idx}
                              style={{
                                background: idx % 2 === 0 ? "#fff" : "#fafafa",
                                borderBottom: "1px solid #f0f0f0",
                              }}
                            >
                              <td
                                style={{
                                  padding: "11px 14px",
                                  fontWeight: "600",
                                  color: "#111",
                                }}
                              >
                                {item.serviceName}
                              </td>
                              <td
                                style={{
                                  padding: "11px 14px",
                                  textAlign: "center",
                                  color: "#555",
                                }}
                              >
                                {item.qty}
                              </td>
                              <td
                                style={{
                                  padding: "11px 14px",
                                  textAlign: "right",
                                  color: "#555",
                                }}
                              >
                                Rs.{item.price.toLocaleString("en-IN")}
                              </td>
                              <td
                                style={{
                                  padding: "11px 14px",
                                  textAlign: "right",
                                  fontWeight: "700",
                                  color: "#111",
                                }}
                              >
                                Rs.{itemTotal.toLocaleString("en-IN")}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr style={{ background: "#fff", color: "#000" }}>
                          <td
                            colSpan={3}
                            style={{
                              padding: "13px 14px",
                              textAlign: "right",
                              fontWeight: "700",
                              fontSize: "14px",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                            }}
                          >
                            Grand Total
                          </td>
                          <td
                            style={{
                              padding: "13px 14px",
                              textAlign: "right",
                              fontWeight: "900",
                              fontSize: "14px",
                            }}
                          >
                            Rs.{grandTotal.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </section>
                )}
                <PageNumber num={pn} total={totalPages} />
              </div>
            );
          })()}

          {/* ── P: Timeline ── */}
          {(() => {
            const pn = nextPage();
            return (
              <div
                className="print-page"
                style={{ ...pageStyle, minHeight: "100vh" }}
              >
                <PageHeader clientName={clientName} generatedAt={generatedAt} />
                {quotation.timeline && quotation.timeline.length > 0 && (
                  <section>
                    <SectionHeading>Project Timeline</SectionHeading>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "13px",
                      }}
                    >
                      <thead>
                        <tr style={{ background: "#044bab", color: "#fff" }}>
                          {["Phase", "Description", "Duration"].map((h, i) => (
                            <th
                              key={h}
                              style={{
                                padding: "11px 14px",
                                textAlign: i === 2 ? "right" : "left",
                                fontSize: "10px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {quotation.timeline.map((item, idx) => (
                          <tr
                            key={idx}
                            style={{
                              background: idx % 2 === 0 ? "#fff" : "#fafafa",
                              border: "1px solid #000",
                            }}
                          >
                            <td
                              style={{
                                padding: "11px 14px",
                                fontWeight: "700",
                                color: "#111",
                              }}
                            >
                              {item.phase}
                            </td>
                            <td style={{ padding: "11px 14px", color: "#555" }}>
                              {item.description}
                            </td>
                            <td
                              style={{
                                padding: "11px 14px",
                                textAlign: "right",
                                fontWeight: "700",
                                color: "#111",
                              }}
                            >
                              {item.duration}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>
                )}
                <PageNumber num={pn} total={totalPages} />
              </div>
            );
          })()}

          {/* ── P (cond): Modules ── */}
          {quotation.modules &&
            quotation.modules.length > 0 &&
            (() => {
              const pn = nextPage();
              return (
                <div
                  className="print-page"
                  style={{ ...pageStyle, minHeight: "100vh" }}
                >
                  <PageHeader
                    clientName={clientName}
                    generatedAt={generatedAt}
                  />
                  <section>
                    <SectionHeading>Modules & Features</SectionHeading>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px",
                      }}
                    >
                      {quotation.modules.map((mod, idx) => (
                        <div
                          key={idx}
                          style={{
                            border: "1px solid #000",
                            padding: "16px",
                            background: "#fafafa",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              marginBottom: "8px",
                            }}
                          >
                            <span
                              style={{
                                fontWeight: "800",
                                fontSize: "13px",
                                color: "#111",
                              }}
                            >
                              {mod.moduleName}
                            </span>
                            <span
                              style={{
                                fontSize: "9px",
                                fontWeight: "700",
                                padding: "3px 8px",
                                background:
                                  mod.status === "Completed"
                                    ? "#111"
                                    : mod.status === "Ongoing"
                                      ? "#F36F21"
                                      : "#e5e7eb",
                                color:
                                  mod.status === "Completed" ||
                                  mod.status === "Ongoing"
                                    ? "#fff"
                                    : "#000",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                              }}
                            >
                              {mod.status}
                            </span>
                          </div>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#666",
                              lineHeight: "1.5",
                            }}
                          >
                            {mod.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                  <PageNumber num={pn} total={totalPages} />
                </div>
              );
            })()}

          {/* ── P Last: Notes + Terms + Signature ── */}
          {(() => {
            const pn = nextPage();
            return (
              <div
                className="print-page"
                style={{
                  ...pageStyle,
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <PageHeader clientName={clientName} generatedAt={generatedAt} />

                <div style={{ flex: 1 }}>
                  {(quotation.notes || quotation.paymentTerms) && (
                    <section style={{ marginBottom: "24px" }}>
                      <SectionHeading>Additional Information</SectionHeading>
                      <div
                        style={{
                          border: "1px solid #e5e7eb",
                          padding: "20px",
                          background: "#fafafa",
                        }}
                      >
                        {quotation.paymentTerms && (
                          <div style={{ marginBottom: "14px" }}>
                            <div
                              style={{
                                fontSize: "10px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "#aaa",
                                marginBottom: "5px",
                              }}
                            >
                              Payment Terms
                            </div>
                            <p
                              style={{
                                fontSize: "13px",
                                color: "#444",
                                lineHeight: "1.7",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {quotation.paymentTerms}
                            </p>
                          </div>
                        )}
                        {quotation.notes && (
                          <div>
                            <div
                              style={{
                                fontSize: "10px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "#aaa",
                                marginBottom: "5px",
                              }}
                            >
                              Notes
                            </div>
                            <p
                              style={{
                                fontSize: "13px",
                                color: "#444",
                                lineHeight: "1.7",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {quotation.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  <section style={{ marginBottom: "24px" }}>
                    <SectionHeading>Terms & Conditions</SectionHeading>
                    <div
                      style={{
                        border: "1px solid #e5e7eb",
                        padding: "20px",
                        background: "#fafafa",
                      }}
                    >
                      {(settings?.terms && settings.terms.length > 0
                        ? settings.terms
                        : [
                            "Payment terms: 50% advance, 50% on completion",
                            "Project timeline is subject to timely feedback and approvals",
                            "Revisions beyond agreed scope will be charged separately",
                            "All deliverables remain property of Pixelate Nest until full payment",
                            "Client must provide necessary content and assets on time",
                          ]
                      ).map((term: string, idx: number) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            gap: "12px",
                            marginBottom: "10px",
                            fontSize: "13px",
                            color: "#444",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "900",
                              color: "#F36F21",
                              minWidth: "20px",
                              fontSize: "12px",
                            }}
                          >
                            {idx + 1}.
                          </span>
                          <span style={{ lineHeight: "1.6" }}>{term}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Signature */}
                <div
                  style={{
                    borderTop: "1px solid #e5e7eb",
                    paddingTop: "24px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "40px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <img
                      src="/assets/images/sign.png"
                      alt="Authorized Signature"
                      style={{
                        height: "60px",
                        objectFit: "contain",
                        marginBottom: "8px",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        borderTop: "1.5px solid #111",
                        paddingTop: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "#111",
                        }}
                      >
                        Authorized Signatory
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#888",
                          marginTop: "2px",
                        }}
                      >
                        {settings?.name || "Kalahanu Tech Studios LLP"}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{ height: "60px", marginBottom: "8px" }} />
                    <div
                      style={{
                        borderTop: "1.5px solid #111",
                        paddingTop: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "#111",
                        }}
                      >
                        Client Signature
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#888",
                          marginTop: "2px",
                        }}
                      >
                        {clientName}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#bbb",
                          marginTop: "4px",
                        }}
                      >
                        Date: __________________
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div
                  style={{
                    borderTop: "1px solid #f0f0f0",
                    paddingTop: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#888",
                      fontWeight: "500",
                    }}
                  >
                    {settings?.footerText ||
                      `© 2026 ${settings?.name || "Kalahanu Tech Studios LLP"}. All Rights Reserved.`}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#bbb",
                      marginTop: "4px",
                    }}
                  >
                    {settings?.phone || "+91 84069 12345"} &nbsp;|&nbsp;{" "}
                    {settings?.email || "support@pixelatenest.com"}{" "}
                    &nbsp;|&nbsp; {settings?.website || "www.pixelatenest.com"}
                  </div>
                </div>

                <PageNumber num={pn} total={totalPages} />
              </div>
            );
          })()}
        </div>
      </div>

      <style jsx global>{`
        @media print {
          * {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
          body {
            margin: 0 !important;
            padding: 0 !important;
          }
          header,
          nav,
          aside,
          [class*="sidebar"],
          [class*="navbar"] {
            display: none !important;
          }
          .print-area {
            margin: 0;
            padding: 0;
            max-width: none;
          }
          .print-page {
            page-break-before: always;
            page-break-inside: avoid;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
}
