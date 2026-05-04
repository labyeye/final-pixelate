import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/images/Logo_White_Name_Large.png";
import sign from "../../assets/sign.png";
const signsrc = typeof sign === "string" ? sign : sign.src;
const logoSrc = typeof logo === "string" ? logo : logo.src;

const DARK = "#0449A9";
const CREAM = "#FA7319";
const CREAM_LIGHT = "#F4F7FC";
const ACCENT = "#5A88C4";
const RULE = "#D9E3F5";
const MUTED = "#666667";
const WHITE = "#ffffff";
const TEXT = "#000000";

const displayValue = (value?: string | number | null): string => {
  if (value === null || value === undefined) return "—";
  const text = String(value).trim();
  return text.length > 0 ? text : "—";
};

const normalizeList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? "").trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

const formatDate = (value?: string | Date | number | null): string => {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value as string);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 52,
    paddingHorizontal: 44,
    fontSize: 10,
    color: TEXT,
    fontFamily: "Helvetica",
    lineHeight: 1.55,
    backgroundColor: WHITE,
  },
  coverPage: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: DARK,
  },

  coverTop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 56,
    paddingTop: 72,
    paddingBottom: 40,
  },
  coverAgencyLabel: {
    fontSize: 11,
    color: WHITE,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 10,
    opacity: 0.75,
  },
  coverAgencyName: {
    fontSize: 34,
    fontFamily: "Helvetica-Bold",
    color: WHITE,
    letterSpacing: 1,
    marginBottom: 4,
  },
  coverDividerLine: {
    width: 60,
    height: 2,
    backgroundColor: WHITE,
    marginVertical: 20,
    opacity: 0.5,
  },
  coverDocTitle: {
    fontSize: 14,
    color: WHITE,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 48,
    opacity: 0.85,
  },
  coverInfoBox: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 6,
    borderLeft: `3 solid ${WHITE}`,
    paddingVertical: 20,
    paddingHorizontal: 24,
    width: "100%",
    marginBottom: 32,
  },
  coverInfoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  coverInfoLabel: {
    width: 110,
    fontSize: 9,
    color: WHITE,
    opacity: 0.65,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  coverInfoValue: {
    flex: 1,
    fontSize: 11,
    color: WHITE,
    fontFamily: "Helvetica-Bold",
  },
  coverBottom: {
    height: 52,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  coverBottomText: {
    fontSize: 9,
    color: WHITE,
    opacity: 0.55,
    letterSpacing: 1.5,
  },

  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    paddingBottom: 10,
    borderBottom: `1.5 solid ${DARK}`,
  },
  pageHeaderAgency: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    letterSpacing: 0.5,
  },
  pageHeaderSection: {
    fontSize: 9,
    color: MUTED,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  pageFooter: {
    position: "absolute",
    bottom: 22,
    left: 44,
    right: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTop: `0.75 solid ${RULE}`,
  },
  pageFooterText: {
    fontSize: 8,
    color: MUTED,
  },

  sectionHeading: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginBottom: 14,
    paddingBottom: 6,
    borderBottom: `1 solid ${RULE}`,
  },
  subHeading: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginBottom: 8,
    marginTop: 10,
  },

  card: {
    backgroundColor: CREAM_LIGHT,
    borderRadius: 5,
    borderLeft: `3 solid ${DARK}`,
    padding: 14,
    marginBottom: 16,
  },
  cardGhost: {
    borderRadius: 5,
    border: `0.75 solid ${RULE}`,
    padding: 14,
    marginBottom: 16,
  },
  cardDark: {
    backgroundColor: DARK,
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
  },

  fieldRow: {
    flexDirection: "row",
    marginBottom: 7,
    alignItems: "flex-start",
  },
  fieldLabel: {
    width: 130,
    fontSize: 9,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    paddingTop: 1,
  },
  fieldValue: {
    flex: 1,
    fontSize: 10,
    color: TEXT,
  },

  row: {
    flexDirection: "row",
    gap: 14,
  },
  col: {
    flex: 1,
  },

  bulletRow: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "flex-start",
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: DARK,
    marginTop: 4,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },

  deliverableRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: CREAM_LIGHT,
    border: `0.5 solid ${RULE}`,
  },
  deliverableCheck: {
    width: 14,
    height: 14,
    borderRadius: 3,
    border: `1 solid ${DARK}`,
    marginRight: 10,
    backgroundColor: WHITE,
  },
  deliverableCheckFilled: {
    width: 14,
    height: 14,
    borderRadius: 3,
    backgroundColor: DARK,
    marginRight: 10,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  deliverableTextWrap: {
    flex: 1,
    flexDirection: "column",
  },
  deliverableLabel: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: TEXT,
    marginBottom: 2,
    lineHeight: 1.35,
  },
  deliverableDesc: {
    fontSize: 9,
    color: MUTED,
    lineHeight: 1.35,
  },

  paymentMethodsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
  },
  paymentMethodChip: {
    fontSize: 9,
    color: DARK,
    backgroundColor: CREAM_LIGHT,
    border: `0.75 solid ${RULE}`,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },

  timelineItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  timelineLeft: {
    width: 14,
    alignItems: "center",
    marginRight: 12,
  },
  timelineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: DARK,
    marginTop: 2,
  },
  timelineLine: {
    flex: 1,
    width: 1.5,
    backgroundColor: RULE,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  timelineLabel: {
    fontSize: 9,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  timelineValue: {
    fontSize: 10,
    color: TEXT,
    fontFamily: "Helvetica-Bold",
  },

  milestoneRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 6,
    borderRadius: 4,
    border: `0.75 solid ${RULE}`,
  },
  milestoneBadge: {
    fontSize: 8,
    color: WHITE,
    backgroundColor: DARK,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 3,
    marginRight: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  milestoneDesc: {
    flex: 1,
    fontSize: 10,
    color: TEXT,
  },
  milestoneAmt: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: DARK,
  },

  termHeading: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginBottom: 4,
  },
  termText: {
    fontSize: 9.5,
    color: TEXT,
    marginBottom: 12,
    lineHeight: 1.6,
  },

  signatureBox: {
    borderTop: `1 solid ${DARK}`,
    paddingTop: 8,
    marginTop: 36,
    width: "45%",
  },
  signatureLabel: {
    fontSize: 9,
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  signatureName: {
    fontSize: 10,
    color: TEXT,
    marginTop: 4,
  },
  signatureDate: {
    fontSize: 9,
    color: MUTED,
    marginTop: 2,
  },

  briefText: {
    fontSize: 10,
    color: TEXT,
    lineHeight: 1.7,
  },
  pillBadge: {
    fontSize: 9,
    color: WHITE,
    backgroundColor: ACCENT,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    marginRight: 6,
    marginBottom: 5,
  },
  infoChip: {
    fontSize: 8,
    color: DARK,
    backgroundColor: CREAM,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 3,
    marginRight: 6,
    marginBottom: 5,
    border: `0.5 solid ${RULE}`,
  },
});

function PageHeader({
  section,
  pageNum,
}: {
  section: string;
  pageNum: string;
}) {
  return (
    <View style={styles.pageHeader} fixed>
      <Text style={styles.pageHeaderAgency}>Pixelate Nest</Text>
      <Text style={styles.pageHeaderSection}>{section}</Text>
    </View>
  );
}

function PageFooter({ data }: { data: any }) {
  const footerClientName = data?.clientName ?? data?.client ?? data?.company;
  const footerProjectTitle = data?.projectTitle ?? data?.title;
  return (
    <View style={styles.pageFooter} fixed>
      <Text style={styles.pageFooterText}>
        Client Onboarding Document · {displayValue(footerClientName)} ·{" "}
        {displayValue(footerProjectTitle)}
      </Text>
      <Text style={styles.pageFooterText}>Confidential — Pixelate Nest</Text>
    </View>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{displayValue(value)}</Text>
    </View>
  );
}

function BulletItem({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bulletDot} />
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

function SectionHeading({ title }: { title: string }) {
  return <Text style={styles.sectionHeading}>{title}</Text>;
}

export function OnboardingPDF({ data }: { data: any }) {
  const clientName = data?.clientName ?? data?.client ?? data?.company;
  const company = data?.company ?? data?.businessName;
  const projectTitle = data?.projectTitle ?? data?.title;
  const projectType = data?.projectType ?? data?.purpose ?? data?.objective;
  const productType =
    data?.productType ??
    (Array.isArray(data?.modules) && data.modules.length > 0
      ? "Custom"
      : "Website");
  const pagesValue =
    data?.pages ??
    (Array.isArray(data?.modules) && data.modules.length > 0
      ? data.modules
          .map((module: any) => module?.moduleName || module?.name)
          .filter(Boolean)
          .join(", ")
      : "");
  const startDateValue = data?.startDate ?? data?.date;
  const deadlineValue = data?.deadline ?? data?.deliveryDate;
  const briefValue = data?.brief ?? data?.objective ?? data?.purpose;

  const parseTechStack = (value: unknown): string[] => {
    if (Array.isArray(value)) {
      return value.map((item) => String(item ?? "").trim()).filter(Boolean);
    }
    if (typeof value === "string") {
      return value
        .split(/[\n,]/)
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  };

  const deriveBudget = (source: any): string | number | null => {
    if (
      source?.budget !== undefined &&
      source?.budget !== null &&
      String(source?.budget).trim() !== ""
    ) {
      return source.budget;
    }
    if (
      source?.amount !== undefined &&
      source?.amount !== null &&
      String(source?.amount).trim() !== ""
    ) {
      return source.amount;
    }

    const servicesTotal = Array.isArray(source?.services)
      ? source.services.reduce((sum: number, item: any) => {
          const value = Number(
            item?.total ??
              item?.amount ??
              Number(item?.qty || 0) * Number(item?.price || 0),
          );
          return sum + (Number.isFinite(value) ? value : 0);
        }, 0)
      : 0;
    const lineItemsTotal = Array.isArray(source?.lineItems)
      ? source.lineItems.reduce((sum: number, item: any) => {
          const value = Number(
            item?.total ??
              Number(item?.qty || 0) * Number(item?.unitPrice || 0),
          );
          return sum + (Number.isFinite(value) ? value : 0);
        }, 0)
      : 0;

    const total = servicesTotal + lineItemsTotal;
    return total > 0 ? total : null;
  };

  const deliverablePhases = [
    {
      phase: "01",
      label: "Discovery",
      desc:
        data?.deliveryDiscovery ||
        "Requirement gathering, stakeholder interviews, scope finalization",
    },
    {
      phase: "02",
      label: "Wireframes",
      desc:
        data?.deliveryWireframes ||
        "Low-fidelity layouts and information architecture",
    },
    {
      phase: "03",
      label: "Design",
      desc:
        data?.deliveryDesign ||
        "High-fidelity UI designs, style guide, asset creation",
    },
    {
      phase: "04",
      label: "Development",
      desc:
        data?.deliveryDevelopment ||
        "Front-end & back-end implementation per approved designs",
    },
    {
      phase: "05",
      label: "Testing",
      desc:
        data?.deliveryTesting ||
        "QA, browser/device testing, bug fixes, performance checks",
    },
    {
      phase: "06",
      label: "Deployment",
      desc:
        data?.deliveryDeployment ||
        "Production deployment, go-live support, post-launch monitoring",
    },
  ];

  const scopeOfWork = normalizeList(data?.scopeOfWork ?? data?.scope);
  const outOfScope = normalizeList(data?.outOfScope ?? data?.exclusions);
  const techStackFromModel = parseTechStack(data?.techStack);
  const derivedTechStack = [
    ...(Array.isArray(data?.services)
      ? data.services
          .map((service: any) => service?.serviceName || service?.name)
          .filter(Boolean)
      : []),
    ...(Array.isArray(data?.modules)
      ? data.modules
          .map((module: any) => module?.moduleName || module?.name)
          .filter(Boolean)
      : []),
  ];
  const techStack =
    techStackFromModel.length > 0 ? techStackFromModel : derivedTechStack;

  const milestones = normalizeList(
    data?.milestones ??
      (Array.isArray(data?.timeline)
        ? data.timeline
            .map((step: any) => {
              const phase = String(step?.phase ?? "").trim();
              const description = String(
                step?.description ?? step?.duration ?? "",
              ).trim();
              if (phase && description) return `${phase}: ${description}`;
              return phase || description;
            })
            .filter(Boolean)
            .join("\n")
        : ""),
  );

  const paymentMilestones = normalizeList(
    data?.paymentMilestones ?? data?.paymentTerms,
  );

  const budgetValue = deriveBudget(data);

  const onboardingDate = formatDate(data?.date || new Date());
  const agencySignatureDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Document
      title={`Client Onboarding — ${displayValue(clientName)} — ${displayValue(projectTitle)}`}
      author="Pixelate Nest"
      creator="Pixelate Nest CRM"
      subject="Client Onboarding Document"
    >
      {}
      <Page size="A4" style={[styles.page, styles.coverPage]}>
        <View style={styles.coverTop}>
          <Image src={logoSrc} style={{ width: 400, marginBottom: 120 }} />
          <Text style={styles.coverAgencyLabel}>
            Client Onboarding Document
          </Text>
          <View style={styles.coverDividerLine} />
          <Text style={styles.coverDocTitle}>
            {displayValue(projectTitle || "New Project")}
          </Text>

          {}
          <View style={styles.coverInfoBox}>
            <View style={styles.coverInfoRow}>
              <Text style={styles.coverInfoLabel}>Client</Text>
              <Text style={styles.coverInfoValue}>
                {displayValue(clientName)}
              </Text>
            </View>
            <View style={styles.coverInfoRow}>
              <Text style={styles.coverInfoLabel}>Company</Text>
              <Text style={styles.coverInfoValue}>{displayValue(company)}</Text>
            </View>
            <View style={styles.coverInfoRow}>
              <Text style={styles.coverInfoLabel}>Onboarding Date</Text>
              <Text style={styles.coverInfoValue}>{onboardingDate}</Text>
            </View>
          </View>

          {}
          <Text
            style={{
              fontSize: 9,
              color: WHITE,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            This document is confidential and prepared exclusively for the
            above-named client.
          </Text>
        </View>

        <View style={styles.coverBottom}>
          <Text style={styles.coverBottomText}>
            www.pixelatenest.com · support@pixelatenest.com
          </Text>
        </View>
      </Page>

      {}
      <Page size="A4" style={styles.page}>
        <PageHeader section="Client Details" pageNum="2" />

        <SectionHeading title="Client Information" />
        <View style={styles.card}>
          <Field label="Full Name" value={clientName} />
          <Field label="Company" value={company} />
          <Field label="Email Address" value={data?.email} />
          <Field label="Phone Number" value={data?.phone} />
          <Field label="Address" value={data?.address} />
        </View>

        <SectionHeading title="Primary Contact Person" />
        <View style={styles.cardGhost}>
          <Field label="Contact Name" value={data?.contactName} />
          <Field label="Contact Email" value={data?.contactEmail} />
          <Field label="Contact Phone" value={data?.contactPhone} />
        </View>

        <PageFooter data={data} />
      </Page>

      {}
      <Page size="A4" style={styles.page}>
        <PageHeader section="Project Overview" pageNum="3" />

        <SectionHeading title="Project Overview" />

        <View style={styles.row}>
          <View style={styles.col}>
            <View style={styles.card}>
              <Field label="Project Title" value={projectTitle} />
              <Field label="Project Type" value={projectType} />
              <Field label="Product Type" value={productType} />
            </View>
          </View>
          <View style={styles.col}>
            <View style={styles.cardGhost}>
              <Field label="Pages / Modules" value={pagesValue} />
              <Field label="Start Date" value={formatDate(startDateValue)} />
              <Field
                label="Target Delivery"
                value={formatDate(deadlineValue)}
              />
            </View>
          </View>
        </View>

        <Text style={styles.subHeading}>Project Brief &amp; Requirements</Text>
        <View style={styles.cardGhost}>
          <Text style={styles.briefText}>{displayValue(briefValue)}</Text>
        </View>

        {data?.notes ? (
          <>
            <Text style={styles.subHeading}>Additional Notes</Text>
            <View style={styles.cardGhost}>
              <Text style={styles.briefText}>{displayValue(data?.notes)}</Text>
            </View>
          </>
        ) : null}

        <PageFooter data={data} />
      </Page>

      {}
      <Page size="A4" style={styles.page}>
        <PageHeader section="Project Scope" pageNum="4" />

        <SectionHeading title="Project Scope" />

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.subHeading}>Scope of Work</Text>
            <View style={styles.card}>
              {scopeOfWork.length > 0 ? (
                scopeOfWork.map((item, i) => <BulletItem key={i} text={item} />)
              ) : (
                <Text style={styles.briefText}>{displayValue(null)}</Text>
              )}
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.subHeading}>Out of Scope</Text>
            <View style={styles.cardGhost}>
              {outOfScope.length > 0 ? (
                outOfScope.map((item, i) => <BulletItem key={i} text={item} />)
              ) : (
                <Text style={styles.briefText}>{displayValue(null)}</Text>
              )}
            </View>
          </View>
        </View>

        <Text style={styles.subHeading}>Technology Stack</Text>
        <View
          style={[styles.cardGhost, { flexDirection: "row", flexWrap: "wrap" }]}
        >
          {techStack.length > 0 ? (
            techStack.map((t, i) => (
              <Text key={i} style={styles.pillBadge}>
                {t}
              </Text>
            ))
          ) : (
            <Text style={styles.briefText}>—</Text>
          )}
        </View>

        <Text style={styles.subHeading}>Pages / Modules</Text>
        <View style={styles.card}>
          <Text style={styles.briefText}>{displayValue(pagesValue)}</Text>
        </View>

        <PageFooter data={data} />
      </Page>

      {}
      <Page size="A4" style={styles.page}>
        <PageHeader section="Project Timeline" pageNum="5" />

        <SectionHeading title="Project Timeline" />

        {}
        <View style={styles.row}>
          <View style={[styles.col, styles.card]}>
            <Text style={styles.subHeading}>Start Date</Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Helvetica-Bold",
                color: DARK,
              }}
            >
              {formatDate(data?.startDate)}
            </Text>
          </View>
          <View style={[styles.col, styles.card]}>
            <Text style={styles.subHeading}>Target Delivery</Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Helvetica-Bold",
                color: DARK,
              }}
            >
              {formatDate(data?.deadline)}
            </Text>
          </View>
        </View>

        {}
        {milestones.length > 0 && (
          <>
            <Text style={styles.subHeading}>Project Milestones</Text>
            <View style={styles.cardGhost}>
              {milestones.map((m, i) => (
                <View key={i} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View style={styles.timelineDot} />
                    {i < milestones.length - 1 && (
                      <View style={styles.timelineLine} />
                    )}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineValue}>{m}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        <PageFooter data={data} />
      </Page>

      {}
      <Page size="A4" style={styles.page}>
        <PageHeader section="Financial Details" pageNum="6" />

        <SectionHeading title="Financial Details" />

        <View style={styles.row}>
          <View style={[styles.col, styles.cardDark]}>
            <Text
              style={{
                fontSize: 9,
                color: WHITE,
                textTransform: "uppercase",
                letterSpacing: 0.8,
                marginBottom: 6,
              }}
            >
              Estimated Budget
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Helvetica-Bold",
                color: WHITE,
              }}
            >
              ₹ {displayValue(budgetValue)}
            </Text>
          </View>
          <View style={[styles.col, styles.card]}>
            <Text
              style={{
                fontSize: 9,
                color: MUTED,
                textTransform: "uppercase",
                letterSpacing: 0.8,
                marginBottom: 6,
              }}
            >
              Payment Methods
            </Text>
            <View style={styles.paymentMethodsWrap}>
              <Text style={styles.paymentMethodChip}>UPI</Text>
              <Text style={styles.paymentMethodChip}>Cash</Text>
              <Text style={styles.paymentMethodChip}>Bank Transfer</Text>
            </View>
          </View>
        </View>

        {paymentMilestones.length > 0 && (
          <>
            <Text style={styles.subHeading}>Payment Milestones</Text>
            {paymentMilestones.map((m, i) => (
              <View key={i} style={styles.milestoneRow}>
                <Text style={styles.milestoneBadge}>
                  {String(i + 1).padStart(2, "0")}
                </Text>
                <Text style={styles.milestoneDesc}>{m}</Text>
              </View>
            ))}
          </>
        )}

        <PageFooter data={data} />
      </Page>

      {}
      <Page size="A4" style={styles.page}>
        <PageHeader section="Deliverables" pageNum="7" />

        <SectionHeading title="Deliverables" />
        <Text style={{ fontSize: 9.5, color: MUTED, marginBottom: 16 }}>
          The following deliverables are included in the project scope and will
          be provided upon completion of each respective phase.
        </Text>

        {deliverablePhases.map((d) => (
          <View key={d.phase} style={styles.deliverableRow}>
            <View style={styles.deliverableCheckFilled}>
              <Text style={{ fontSize: 7, color: WHITE, textAlign: "center" }}>
                ✓
              </Text>
            </View>
            <View style={styles.deliverableTextWrap}>
              <Text style={styles.deliverableLabel}>
                Phase {d.phase} — {d.label}
              </Text>
              <Text style={styles.deliverableDesc}>{d.desc}</Text>
            </View>
          </View>
        ))}

        <PageFooter data={data} />
      </Page>

      {}
      <Page size="A4" style={styles.page}>
        <PageHeader section="Terms & Conditions" pageNum="8" />

        <SectionHeading title="Terms &amp; Conditions" />

        <Text style={styles.termHeading}>1. Revision Policy</Text>
        <Text style={styles.termText}>
          {data?.termsRevision ||
            "Each deliverable phase includes up to two (2) rounds of revisions based on the agreed brief. Revisions requested beyond this allowance, or changes to the original scope, will be quoted separately and must be approved in writing before work begins. Minor text or image swaps do not count as revision rounds."}
        </Text>

        <Text style={styles.termHeading}>2. Scope Change Policy</Text>
        <Text style={styles.termText}>
          {data?.termsScope ||
            "Any additions to the project scope after sign-off will be documented via a Change Request (CR). Each CR will include an updated timeline and cost estimate. Work on scope additions will not commence until a revised agreement is signed by both parties. Pixelate Nest reserves the right to adjust delivery timelines accordingly."}
        </Text>

        <Text style={styles.termHeading}>3. Payment Policy</Text>
        <Text style={styles.termText}>
          {data?.termsPayment ||
            "Payments are due as per the milestones outlined in the Financial Details section. Invoices are payable within 7 days of issuance. A delay in payment beyond 14 days may result in a pause of project work. Pixelate Nest retains ownership of all work and intellectual property until payment is received in full. No refunds are applicable on completed milestones."}
        </Text>

        <Text style={styles.termHeading}>4. Client Responsibilities</Text>
        <Text style={styles.termText}>
          {data?.termsClientResp ||
            "The client agrees to: (a) provide all required content, assets, and access credentials within 5 business days of request; (b) review and provide consolidated feedback within 5 business days of each deliverable submission; (c) ensure a single designated point of contact for all project communications; (d) not share confidential project documents with third parties without prior written consent from Pixelate Nest. Delays in client-side responsibilities may impact the project delivery timeline and Pixelate Nest shall not be held liable for such delays."}
        </Text>

        <PageFooter data={data} />
      </Page>

      {}
      <Page size="A4" style={styles.page}>
        <PageHeader section="Approval & Signatures" pageNum="9" />

        <SectionHeading title="Document Approval" />

        <Text
          style={{
            fontSize: 10,
            color: MUTED,
            marginBottom: 24,
            lineHeight: 1.7,
          }}
        >
          By signing below, both parties confirm that they have read,
          understood, and agreed to the terms and conditions outlined in this
          onboarding document. This document constitutes a formal agreement
          between the client and Pixelate Nest for the project described herein.
        </Text>

        {}
        <View style={[styles.cardDark, { marginBottom: 28 }]}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text
                style={{
                  fontSize: 8,
                  color: WHITE,
                  textTransform: "uppercase",
                  letterSpacing: 0.7,
                  marginBottom: 4,
                }}
              >
                Project
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: WHITE,
                  fontFamily: "Helvetica-Bold",
                }}
              >
                {displayValue(data?.projectTitle)}
              </Text>
            </View>
            <View style={styles.col}>
              <Text
                style={{
                  fontSize: 8,
                  color: WHITE,
                  textTransform: "uppercase",
                  letterSpacing: 0.7,
                  marginBottom: 4,
                }}
              >
                Client
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: WHITE,
                  fontFamily: "Helvetica-Bold",
                }}
              >
                {displayValue(data?.clientName)}
              </Text>
            </View>
            <View style={styles.col}>
              <Text
                style={{
                  fontSize: 8,
                  color: WHITE,
                  textTransform: "uppercase",
                  letterSpacing: 0.7,
                  marginBottom: 4,
                }}
              >
                Date
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: WHITE,
                  fontFamily: "Helvetica-Bold",
                }}
              >
                {onboardingDate}
              </Text>
            </View>
          </View>
        </View>

        {}
        <View style={[styles.row, { marginTop: 8 }]}>
          {}
          <View style={styles.col}>
            <Text style={styles.subHeading}>Client Signature</Text>
            <Text style={{ fontSize: 9, color: MUTED, marginBottom: 40 }}>
              I hereby confirm my agreement to the terms set out in this
              document.
            </Text>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Signature</Text>
            </View>
            <View style={[styles.signatureBox, { marginTop: 14 }]}>
              <Text style={styles.signatureLabel}>Printed Name</Text>
              <Text style={styles.signatureName}>
                {displayValue(data?.clientName)}
              </Text>
            </View>
            <View style={[styles.signatureBox, { marginTop: 14 }]}>
              <Text style={styles.signatureLabel}>Date</Text>
              <Text style={styles.signatureDate}>____________________</Text>
            </View>
          </View>

          {}
          <View
            style={{ width: 1, backgroundColor: RULE, marginHorizontal: 16 }}
          />

          {}
          <View style={styles.col}>
            <Text style={styles.subHeading}>
              Pixelate Nest — Agency Signature
            </Text>
            <Text style={{ fontSize: 9, color: MUTED, marginBottom: 40 }}>
              On behalf of Pixelate Nest, we confirm our commitment to
              delivering the project as described.
            </Text>
            <Image src={signsrc} style={{ width: 120, marginBottom: -20 }} />

            <View style={styles.signatureBox}>
              <Text style={styles.signatureLabel}>Signature</Text>
            </View>
            <View style={[styles.signatureBox, { marginTop: 14 }]}>
              <Text style={styles.signatureLabel}>Authorised Signatory</Text>
              <Text style={styles.signatureName}>Pixelate Nest</Text>
            </View>
            <View style={[styles.signatureBox, { marginTop: 14 }]}>
              <Text style={styles.signatureLabel}>Date</Text>
              <Text style={styles.signatureDate}>{agencySignatureDate}</Text>
            </View>
          </View>
        </View>

        <PageFooter data={data} />
      </Page>
    </Document>
  );
}
