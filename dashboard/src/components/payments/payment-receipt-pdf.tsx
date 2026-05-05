import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/images/Logo_Color_Name_Large.png";
import sign from "../../assets/images/sign.png";

const signsrc = typeof sign === "string" ? sign : sign.src;
const logosrc = typeof logo === "string" ? logo : (logo as any).src;

const DARK = "#1a1a2e";
const GREEN = "#0d6e47";
const LIGHT_GREEN = "#e8f5f0";
const BORDER = "#1a6e47";
const GREY = "#555";
const LIGHT_GREY = "#f5f5f5";

const S = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: DARK,
    backgroundColor: "#fff",
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 28,
    paddingRight: 28,
  },

  // Outer cheque-style border
  outerBorder: {
    border: "2pt solid #1a6e47",
    borderRadius: 2,
  },
  innerBorder: {
    border: "0.5pt solid #a8d5c2",
    margin: 3,
  },

  // Header band
  headerBand: {
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  logo: { width: 130, height: 40, objectFit: "contain" },
  headerRight: { alignItems: "flex-end" },
  receiptTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#fff",
    letterSpacing: 3,
  },
  receiptSubtitle: {
    fontSize: 7,
    color: "#a8f0d0",
    letterSpacing: 1,
    marginTop: 2,
  },

  // Receipt meta strip
  metaStrip: {
    flexDirection: "row",
    backgroundColor: LIGHT_GREEN,
    borderBottom: `1pt solid ${BORDER}`,
    borderTop: `0.5pt solid #a8d5c2`,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  metaItem: { flex: 1 },
  metaLabel: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: DARK,
  },

  // Main receipt body — cheque style
  chequeBody: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 10,
    borderBottom: `1pt solid #c5e0d5`,
  },

  // "Received from" row
  receivedRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
    borderBottom: "0.75pt solid #1a6e47",
    paddingBottom: 4,
  },
  receivedLabel: {
    fontSize: 8,
    color: GREY,
    fontFamily: "Helvetica-Bold",
    marginRight: 6,
    width: 130,
  },
  receivedValue: {
    flex: 1,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    letterSpacing: 0.3,
  },

  // Amount row — cheque style
  amountSection: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 10,
    gap: 0,
  },
  amountWords: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
    border: "0.75pt solid #c5e0d5",
    padding: 8,
    marginRight: 10,
  },
  amountWordsLabel: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  amountWordsValue: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    lineHeight: 1.4,
  },
  amountBox: {
    width: 130,
    border: "1.5pt solid #1a6e47",
    backgroundColor: "#f0f9f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  amountBoxLabel: {
    fontSize: 6.5,
    color: GREEN,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  amountBoxValue: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
    letterSpacing: 0.5,
  },
  amountBoxCurrency: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
  },

  // Details row
  detailsRow: {
    flexDirection: "row",
    gap: 0,
    marginBottom: 10,
  },
  detailBlock: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
    border: "0.5pt solid #c5e0d5",
    padding: 7,
    marginRight: 8,
  },
  detailBlockLast: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
    border: "0.5pt solid #c5e0d5",
    padding: 7,
  },
  detailLabel: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: DARK,
  },

  // Invoice reference bar
  invoiceRefBar: {
    backgroundColor: LIGHT_GREEN,
    border: "0.75pt solid #a8d5c2",
    padding: 7,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  invoiceRefLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
    marginRight: 6,
  },
  invoiceRefValue: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    flex: 1,
  },
  invoiceStatusBadge: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
  },
  invoiceStatusText: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: "#fff",
    letterSpacing: 0.5,
  },

  // Signature section
  signatureSection: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 10,
    borderBottom: `0.5pt solid #c5e0d5`,
  },
  companyNote: {
    fontSize: 7,
    color: "#888",
    lineHeight: 1.5,
    flex: 1,
    marginRight: 20,
  },
  signatureBlock: {
    alignItems: "flex-end",
    width: 160,
  },
  signatureFor: {
    fontSize: 7,
    color: GREY,
    textAlign: "right",
    marginBottom: 2,
  },
  signatureImage: {
    width: 100,
    height: 36,
    objectFit: "contain",
    marginBottom: -14,
  },
  signatureLine: {
    width: 140,
    borderTop: `1pt solid ${DARK}`,
    marginTop: 20,
    marginBottom: 3,
  },
  signatureName: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    textAlign: "right",
  },
  signatureTitle: {
    fontSize: 7,
    color: GREY,
    textAlign: "right",
  },

  // Footer
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: LIGHT_GREEN,
  },
  footerText: { fontSize: 7, color: "#666" },
  footerBrand: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: GREEN },

  // Watermark-style "PAID" text overlay — done as positioned element
  paidWatermark: {
    position: "absolute",
    top: 130,
    left: 160,
    fontSize: 72,
    fontFamily: "Helvetica-Bold",
    color: "#e8f5f0",
    transform: "rotate(-30deg)",
    opacity: 0.4,
    zIndex: -1,
  },
});

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

const fmtDate = (v: any) => {
  if (!v) return new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  try {
    return new Date(v).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return String(v);
  }
};

function numToWords(n: number): string {
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  if (n === 0) return "Zero";
  const w = (x: number): string => {
    if (x < 20) return a[x] || "";
    if (x < 100) return b[Math.floor(x / 10)] + (x % 10 ? " " + a[x % 10] : "");
    if (x < 1000) return a[Math.floor(x / 100)] + " Hundred" + (x % 100 ? " " + w(x % 100) : "");
    if (x < 100000) return w(Math.floor(x / 1000)) + " Thousand" + (x % 1000 ? " " + w(x % 1000) : "");
    if (x < 10000000) return w(Math.floor(x / 100000)) + " Lakh" + (x % 100000 ? " " + w(x % 100000) : "");
    return w(Math.floor(x / 10000000)) + " Crore" + (x % 10000000 ? " " + w(x % 10000000) : "");
  };
  const paise = Math.round((n % 1) * 100);
  let res = w(Math.floor(n)) + " Rupees";
  if (paise > 0) res += " and " + w(paise) + " Paise";
  return res + " Only";
}

function getFinancialYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const fyStart = month >= 4 ? year : year - 1;
  return `${String(fyStart).slice(2)}${String(fyStart + 1).slice(2)}`;
}

export interface PaymentReceiptData {
  receiptNo: string;
  clientName: string;
  clientAddress?: string;
  clientPhone?: string;
  invoiceNo: string;
  projectTitle?: string;
  amount: number;
  paymentDate: string;
  paymentMode: string;
  transactionRef?: string;
  invoiceTotal?: number;
  balanceDue?: number;
  invoiceStatus?: string;
}

export function PaymentReceiptPDFDocument({ data }: { data: PaymentReceiptData }) {
  const fy = getFinancialYear();
  const receiptNo = data.receiptNo || `RCPT/${fy}/0001`;

  return (
    <Document>
      <Page size="A4" style={S.page}>
        <View style={S.outerBorder}>
          <View style={S.innerBorder}>

            {/* PAID watermark */}
            <Text style={S.paidWatermark}>PAID</Text>

            {/* Header Band */}
            <View style={S.headerBand}>
              <Image src={logosrc} style={S.logo} />
              <View style={S.headerRight}>
                <Text style={S.receiptTitle}>PAYMENT RECEIPT</Text>
                <Text style={S.receiptSubtitle}>OFFICIAL ACKNOWLEDGEMENT OF PAYMENT</Text>
              </View>
            </View>

            {/* Meta strip */}
            <View style={S.metaStrip}>
              <View style={S.metaItem}>
                <Text style={S.metaLabel}>Receipt No.</Text>
                <Text style={S.metaValue}>{receiptNo}</Text>
              </View>
              <View style={S.metaItem}>
                <Text style={S.metaLabel}>Receipt Date</Text>
                <Text style={S.metaValue}>{fmtDate(data.paymentDate)}</Text>
              </View>
              <View style={S.metaItem}>
                <Text style={S.metaLabel}>Financial Year</Text>
                <Text style={S.metaValue}>20{fy.slice(0, 2)} – 20{fy.slice(2)}</Text>
              </View>
              <View style={[S.metaItem, { alignItems: "flex-end" }]}>
                <Text style={S.metaLabel}>Issued By</Text>
                <Text style={S.metaValue}>Pixelate Nest</Text>
              </View>
            </View>

            {/* Cheque Body */}
            <View style={S.chequeBody}>

              {/* Received From */}
              <View style={S.receivedRow}>
                <Text style={S.receivedLabel}>Received with thanks from:</Text>
                <Text style={S.receivedValue}>{data.clientName}</Text>
              </View>

              {/* Amount in Words + Amount Box */}
              <View style={S.amountSection}>
                <View style={S.amountWords}>
                  <Text style={S.amountWordsLabel}>Amount in Words (INR)</Text>
                  <Text style={S.amountWordsValue}>
                    {numToWords(Math.round(data.amount))}
                  </Text>
                </View>
                <View style={S.amountBox}>
                  <Text style={S.amountBoxLabel}>Amount Paid</Text>
                  <Text style={S.amountBoxValue}>
                    ₹ {fmt(data.amount)}
                  </Text>
                </View>
              </View>

              {/* Payment Details Row */}
              <View style={S.detailsRow}>
                <View style={S.detailBlock}>
                  <Text style={S.detailLabel}>Payment Mode</Text>
                  <Text style={S.detailValue}>{data.paymentMode}</Text>
                </View>
                <View style={S.detailBlock}>
                  <Text style={S.detailLabel}>Transaction Ref / Cheque No.</Text>
                  <Text style={S.detailValue}>{data.transactionRef || "—"}</Text>
                </View>
                <View style={S.detailBlockLast}>
                  <Text style={S.detailLabel}>Payment Date</Text>
                  <Text style={S.detailValue}>{fmtDate(data.paymentDate)}</Text>
                </View>
              </View>

              {/* Invoice Reference Bar */}
              <View style={S.invoiceRefBar}>
                <Text style={S.invoiceRefLabel}>Being payment against Invoice:</Text>
                <Text style={S.invoiceRefValue}>
                  {data.invoiceNo}
                  {data.projectTitle ? `  •  ${data.projectTitle}` : ""}
                </Text>
                {data.balanceDue !== undefined && data.balanceDue <= 0 ? (
                  <View style={S.invoiceStatusBadge}>
                    <Text style={S.invoiceStatusText}>FULLY PAID</Text>
                  </View>
                ) : data.balanceDue !== undefined && data.balanceDue > 0 ? (
                  <View style={[S.invoiceStatusBadge, { backgroundColor: "#d97706" }]}>
                    <Text style={S.invoiceStatusText}>PARTIAL — Bal ₹{fmt(data.balanceDue)}</Text>
                  </View>
                ) : null}
              </View>

              {/* Company & Client details */}
              {(data.clientAddress || data.clientPhone) && (
                <View style={{ flexDirection: "row", gap: 0, marginBottom: 4 }}>
                  <View style={[S.detailBlock, { flex: 2 }]}>
                    <Text style={S.detailLabel}>Client Address</Text>
                    <Text style={S.detailValue}>{data.clientAddress || "—"}</Text>
                    {data.clientPhone && (
                      <Text style={[S.detailValue, { marginTop: 2, fontSize: 8 }]}>
                        Ph: {data.clientPhone}
                      </Text>
                    )}
                  </View>
                  <View style={[S.detailBlockLast, { flex: 2, marginLeft: 8 }]}>
                    <Text style={S.detailLabel}>Received By (Company Bank)</Text>
                    <Text style={S.detailValue}>Kalahanu Tech Studios LLP</Text>
                    <Text style={[S.detailValue, { fontSize: 7.5, color: GREY, marginTop: 2 }]}>
                      HDFC Bank • A/c: 50200119083987 • IFSC: HDFC0000344
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Signature Section */}
            <View style={S.signatureSection}>
              <Text style={S.companyNote}>
                {"This is an official receipt issued by Kalahanu Tech Studios LLP (Pixelate Nest).\n"}
                {"GSTIN: 10ABFFK0650E1Z2 | PAN: ABFFK0650E | support@pixelatenest.com\n"}
                {"Kala Bhawan, Akharaghat Road, Muzaffarpur, Bihar – 842001"}
              </Text>
              <View style={S.signatureBlock}>
                <Text style={S.signatureFor}>For Kalahanu Tech Studios LLP</Text>
                <Image src={signsrc} style={S.signatureImage} />
                <View style={S.signatureLine} />
                <Text style={S.signatureName}>Labh Chandra Bothra</Text>
                <Text style={S.signatureTitle}>Co-Founder & Authorised Signatory</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={S.footer}>
              <Text style={S.footerText}>
                This is a computer-generated receipt. No physical signature required.
              </Text>
              <Text style={S.footerBrand}>pixelatenest.com</Text>
            </View>

          </View>
        </View>
      </Page>
    </Document>
  );
}
