import React from "react";
import { Target, Eye, Rocket, CheckSquare } from "lucide-react";
import type { Quotation, AgencySettings, Client } from "@/lib/quotation-models";

interface Props {
  quotation: Quotation;
  client: Client | null;
  settings: AgencySettings | null;
}

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
        height: "72px",
        borderBottom: "3px solid #111",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        background: "#fff",
        zIndex: 10,
      }}
    >
      <img
        src="/assets/images/logo-transparent.png"
        alt="Pixelate Nest"
        style={{ height: "44px", objectFit: "contain" }}
      />
      <div style={{ textAlign: "right", lineHeight: 1.2 }}>
        <div
          style={{
            fontSize: "13px",
            fontWeight: "900",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#111",
          }}
        >
          {clientName}
        </div>
        <div
          style={{
            fontSize: "10px",
            color: "#555",
            fontWeight: "600",
            marginTop: "2px",
          }}
        >
          Generated: {generatedAt}
        </div>
      </div>
    </div>
  );
}

function PageNumber({ num, total }: { num: number; total: number }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "16px",
        right: "48px",
        fontSize: "10px",
        fontWeight: "900",
        color: "#999",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {num} / {total}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "16px",
        borderLeft: "4px solid #111",
        paddingLeft: "12px",
      }}
    >
      <span
        style={{
          fontSize: "16px",
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#111",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export function QuotationPrintLayout({ quotation, client, settings }: Props) {
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
  const grandTotal = (quotation.services || []).reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  let totalPages = 2;
  totalPages += 1;
  if (quotation.scope && quotation.scope.length > 0) totalPages++;
  totalPages += 1;
  totalPages += 1;
  if (quotation.modules && quotation.modules.length > 0) totalPages++;
  totalPages += 1;

  let pageCounter = 0;
  const nextPage = () => ++pageCounter;

  const pageStyle: React.CSSProperties = {
    position: "relative",
    boxSizing: "border-box",
    padding: "88px 48px 48px",
  };

  return (
    <div
      style={{
        fontFamily: "'Noto Sans Local','Noto Sans',sans-serif",
        background: "#fff",
        maxWidth: "794px",
        margin: "0 auto",
      }}
    >
      {/* P1: Cover */}
      <section
        style={{
          position: "relative",
          height: "1122px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          borderBottom: "3px solid #111",
          padding: "0 48px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#111",
          }}
        />
        <div style={{ textAlign: "center", maxWidth: "520px" }}>
          <img
            src="/assets/images/logo-transparent.png"
            alt="Pixelate Nest"
            style={{
              height: "64px",
              marginBottom: "40px",
              objectFit: "contain",
            }}
          />
          <div
            style={{
              display: "inline-block",
              background: "#111",
              color: "#fff",
              padding: "6px 20px",
              fontSize: "11px",
              fontWeight: "900",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            {quotation.quoteId}
          </div>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "900",
              color: "#111",
              lineHeight: 1.1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            {quotation.title}
          </h1>
          {quotation.subtitle && (
            <p
              style={{ fontSize: "18px", color: "#555", marginBottom: "32px" }}
            >
              {quotation.subtitle}
            </p>
          )}
          <div
            style={{
              borderTop: "3px solid #044bab",
              borderBottom: "3px solid #111",
              padding: "20px 0",
              margin: "32px 0",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: "900",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#555",
                marginBottom: "8px",
              }}
            >
              Prepared For
            </p>
            <p
              style={{
                fontSize: "28px",
                fontWeight: "900",
                color: "#111",
                textTransform: "uppercase",
              }}
            >
              {clientName}
            </p>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "#555",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {formattedDate}
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#111",
          }}
        />
      </section>

      {/* P2: About */}
      {(() => {
        const pn = nextPage();
        return (
          <div
            style={{
              ...pageStyle,
              background: "#111",
              color: "#fff",
              minHeight: "1122px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "72px",
                borderBottom: "3px solid #fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 48px",
                background: "#111",
              }}
            >
              <img
                src="/assets/images/Logo_Color_Name_Large.png"
                alt="Pixelate Nest"
                style={{ height: "44px", objectFit: "contain" }}
              />
              <div style={{ textAlign: "right", lineHeight: 1.2 }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "900",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#fff",
                  }}
                >
                  {clientName}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#aaa",
                    fontWeight: "600",
                    marginTop: "2px",
                  }}
                >
                  Generated: {generatedAt}
                </div>
              </div>
            </div>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "900",
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                marginBottom: "8px",
              }}
            >
              {settings?.name || "Pixelate Nest"}
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#aaa",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "32px",
                borderBottom: "2px solid #444",
                paddingBottom: "20px",
              }}
            >
              Creative Software & Digital Solutions
            </p>
            {settings?.aboutUs && (
              <div style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    borderLeft: "4px solid #fff",
                    paddingLeft: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "900",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#aaa",
                    }}
                  >
                    About Us
                  </span>
                </div>
                <p
                  style={{ fontSize: "14px", color: "#ccc", lineHeight: "1.7" }}
                >
                  {settings.aboutUs}
                </p>
              </div>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "16px",
                marginBottom: "32px",
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
                    background: "#1e1e1e",
                    border: "2px solid #333",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    <Icon size={16} color="#fff" />
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "900",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#fff",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#bbb",
                      lineHeight: "1.6",
                    }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ border: "2px solid #333", padding: "20px" }}>
              <div
                style={{
                  borderLeft: "4px solid #fff",
                  paddingLeft: "12px",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "900",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#aaa",
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
                      settings?.address || "Kala Bhawan, Muzaffarpur, Bihar",
                  },
                  {
                    label: "Website",
                    value: settings?.website || "www.pixelatenest.com",
                  },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "900",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#666",
                        marginBottom: "4px",
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ color: "#fff", fontWeight: "700" }}>
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

      {/* P3: Client Information */}
      {(() => {
        const pn = nextPage();
        return (
          <div style={{ ...pageStyle, minHeight: "1122px" }}>
            <PageHeader clientName={clientName} generatedAt={generatedAt} />
            <section style={{ marginBottom: "32px" }}>
              <SectionHeading>Client Information</SectionHeading>
              <div style={{ border: "2px solid #111", padding: "24px" }}>
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
                        fontWeight: "900",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#555",
                        marginBottom: "4px",
                      }}
                    >
                      Client Name
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
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
                        fontWeight: "900",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#555",
                        marginBottom: "4px",
                      }}
                    >
                      Email
                    </div>
                    <div style={{ fontWeight: "700", color: "#111" }}>
                      {client?.email || "N/A"}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "900",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "#555",
                        marginBottom: "4px",
                      }}
                    >
                      Phone
                    </div>
                    <div style={{ fontWeight: "700", color: "#111" }}>
                      {client?.phone || "N/A"}
                    </div>
                  </div>
                  {client?.address && (
                    <div style={{ gridColumn: "span 3" }}>
                      <div
                        style={{
                          fontSize: "10px",
                          fontWeight: "900",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#555",
                          marginBottom: "4px",
                        }}
                      >
                        Address
                      </div>
                      <div style={{ fontWeight: "700", color: "#111" }}>
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
                    color: "#333",
                    lineHeight: "1.7",
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
                    color: "#333",
                    lineHeight: "1.7",
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

      {/* P4: Scope of Work */}
      {quotation.scope &&
        quotation.scope.length > 0 &&
        (() => {
          const pn = nextPage();
          return (
            <div style={{ ...pageStyle, minHeight: "1122px" }}>
              <PageHeader clientName={clientName} generatedAt={generatedAt} />
              <section>
                <SectionHeading>Scope of Work</SectionHeading>
                <div style={{ border: "2px solid #111" }}>
                  {quotation.scope.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        padding: "12px 16px",
                        borderBottom:
                          idx < quotation.scope!.length - 1
                            ? "1px solid #ddd"
                            : "none",
                        background: idx % 2 === 0 ? "#fff" : "#f8f8f8",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "900",
                          color: "#111",
                          minWidth: "20px",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}.
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
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
              <PageNumber num={pn} total={totalPages} />
            </div>
          );
        })()}

      {/* P5: Deliverables + Services */}
      {(() => {
        const pn = nextPage();
        return (
          <div style={{ ...pageStyle, minHeight: "1122px" }}>
            <PageHeader clientName={clientName} generatedAt={generatedAt} />
            {quotation.deliverables && quotation.deliverables.length > 0 && (
              <section style={{ marginBottom: "32px" }}>
                <SectionHeading>Deliverables</SectionHeading>
                <div style={{ border: "2px solid #111" }}>
                  {quotation.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        padding: "10px 16px",
                        borderBottom:
                          idx < quotation.deliverables!.length - 1
                            ? "1px solid #ddd"
                            : "none",
                        background: idx % 2 === 0 ? "#fff" : "#f8f8f8",
                      }}
                    >
                      <CheckSquare
                        size={14}
                        color="#111"
                        style={{ marginTop: "3px", flexShrink: 0 }}
                      />
                      <span style={{ fontSize: "14px", color: "#333" }}>
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
                    <tr style={{ background: "#111", color: "#fff" }}>
                      {["Service", "Qty", "Price", "Total"].map((h, i) => (
                        <th
                          key={h}
                          style={{
                            padding: "12px 14px",
                            textAlign:
                              i > 1 ? "right" : i === 1 ? "center" : "left",
                            fontSize: "10px",
                            fontWeight: "900",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            border: "1px solid #333",
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
                            background: idx % 2 === 0 ? "#fff" : "#f8f8f8",
                          }}
                        >
                          <td
                            style={{
                              padding: "11px 14px",
                              border: "1px solid #ddd",
                              fontWeight: "700",
                              color: "#111",
                            }}
                          >
                            {item.serviceName}
                          </td>
                          <td
                            style={{
                              padding: "11px 14px",
                              border: "1px solid #ddd",
                              textAlign: "center",
                              color: "#333",
                            }}
                          >
                            {item.qty}
                          </td>
                          <td
                            style={{
                              padding: "11px 14px",
                              border: "1px solid #ddd",
                              textAlign: "right",
                              color: "#333",
                            }}
                          >
                            Rs.{item.price.toLocaleString()}
                          </td>
                          <td
                            style={{
                              padding: "11px 14px",
                              border: "1px solid #ddd",
                              textAlign: "right",
                              fontWeight: "700",
                              color: "#111",
                            }}
                          >
                            Rs.{itemTotal.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: "#111", color: "#fff" }}>
                      <td
                        colSpan={3}
                        style={{
                          padding: "14px",
                          textAlign: "right",
                          fontWeight: "900",
                          fontSize: "11px",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          border: "1px solid #333",
                        }}
                      >
                        Grand Total
                      </td>
                      <td
                        style={{
                          padding: "14px",
                          textAlign: "right",
                          fontWeight: "900",
                          fontSize: "18px",
                          border: "1px solid #333",
                        }}
                      >
                        Rs.{grandTotal.toLocaleString()}
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

      {/* P6: Timeline */}
      {(() => {
        const pn = nextPage();
        return (
          <div style={{ ...pageStyle, minHeight: "1122px" }}>
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
                    <tr style={{ background: "#111", color: "#fff" }}>
                      {["Phase", "Description", "Duration"].map((h, i) => (
                        <th
                          key={h}
                          style={{
                            padding: "12px 14px",
                            textAlign: i === 2 ? "right" : "left",
                            fontSize: "10px",
                            fontWeight: "900",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            border: "1px solid #333",
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
                          background: idx % 2 === 0 ? "#fff" : "#f8f8f8",
                        }}
                      >
                        <td
                          style={{
                            padding: "11px 14px",
                            border: "1px solid #ddd",
                            fontWeight: "700",
                            color: "#111",
                          }}
                        >
                          {item.phase}
                        </td>
                        <td
                          style={{
                            padding: "11px 14px",
                            border: "1px solid #ddd",
                            color: "#333",
                          }}
                        >
                          {item.description}
                        </td>
                        <td
                          style={{
                            padding: "11px 14px",
                            border: "1px solid #ddd",
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

      {/* P7: Modules (conditional) */}
      {quotation.modules &&
        quotation.modules.length > 0 &&
        (() => {
          const pn = nextPage();
          return (
            <div style={{ ...pageStyle, minHeight: "1122px" }}>
              <PageHeader clientName={clientName} generatedAt={generatedAt} />
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
                      style={{ border: "2px solid #111", padding: "16px" }}
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
                            fontWeight: "900",
                            fontSize: "14px",
                            color: "#111",
                          }}
                        >
                          {mod.moduleName}
                        </span>
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: "900",
                            padding: "3px 8px",
                            background:
                              mod.status === "Completed"
                                ? "#111"
                                : mod.status === "Ongoing"
                                  ? "#555"
                                  : "#ddd",
                            color:
                              mod.status === "Completed" ||
                              mod.status === "Ongoing"
                                ? "#fff"
                                : "#111",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {mod.status}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#555",
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

      {/* P Last: Notes + Terms + Signature */}
      {(() => {
        const pn = nextPage();
        return (
          <div
            style={{
              ...pageStyle,
              minHeight: "1122px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <PageHeader clientName={clientName} generatedAt={generatedAt} />
            <div style={{ flex: 1 }}>
              {(quotation.notes || quotation.paymentTerms) && (
                <section style={{ marginBottom: "28px" }}>
                  <SectionHeading>Additional Information</SectionHeading>
                  <div style={{ border: "2px solid #111", padding: "20px" }}>
                    {quotation.paymentTerms && (
                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            fontSize: "10px",
                            fontWeight: "900",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "#555",
                            marginBottom: "6px",
                          }}
                        >
                          Payment Terms
                        </div>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#333",
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
                            fontWeight: "900",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            color: "#555",
                            marginBottom: "6px",
                          }}
                        >
                          Notes
                        </div>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#333",
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
              <section style={{ marginBottom: "28px" }}>
                <SectionHeading>Terms & Conditions</SectionHeading>
                <div style={{ border: "2px solid #111", padding: "20px" }}>
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
                        gap: "10px",
                        marginBottom: "8px",
                        fontSize: "13px",
                        color: "#333",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "900",
                          color: "#111",
                          minWidth: "20px",
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
                borderTop: "3px solid #111",
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
                    height: "64px",
                    objectFit: "contain",
                    marginBottom: "8px",
                    display: "block",
                  }}
                />
                <div style={{ borderTop: "2px solid #111", paddingTop: "8px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "900",
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
                      color: "#555",
                      marginTop: "2px",
                      fontWeight: "700",
                    }}
                  >
                    {settings?.name || "Kalahanu Tech Studios LLP"}
                  </div>
                </div>
              </div>
              <div>
                <div style={{ height: "64px", marginBottom: "8px" }} />
                <div style={{ borderTop: "2px solid #111", paddingTop: "8px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "900",
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
                      color: "#555",
                      marginTop: "2px",
                      fontWeight: "700",
                    }}
                  >
                    {clientName}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#999",
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
                borderTop: "1px solid #ddd",
                paddingTop: "12px",
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: "11px", color: "#555", fontWeight: "700" }}
              >
                {settings?.footerText ||
                  `© 2026 ${settings?.name || "Kalahanu Tech Studios LLP"}. All Rights Reserved.`}
              </div>
              <div
                style={{ fontSize: "10px", color: "#999", marginTop: "4px" }}
              >
                {settings?.phone || "+91 84069 12345"} &nbsp;|&nbsp;{" "}
                {settings?.email || "support@pixelatenest.com"} &nbsp;|&nbsp;{" "}
                {settings?.website || "www.pixelatenest.com"}
              </div>
            </div>

            <PageNumber num={pn} total={totalPages} />
          </div>
        );
      })()}
    </div>
  );
}
