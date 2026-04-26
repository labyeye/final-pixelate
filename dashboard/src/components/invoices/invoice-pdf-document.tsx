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
const S = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#111",
    backgroundColor: "#fff",
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 22,
    paddingRight: 22,
  },
  outerBorder: { border: "1.5pt solid #222" },
  titleBar: {
    borderBottom: "1.5pt solid #222",
    paddingVertical: 5,
    alignItems: "center",
  },
  titleText: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2,
    color: "#111",
  },
  originalCopy: { fontSize: 7, color: "#666", marginTop: 1 },

  
  headerRow: { flexDirection: "row", borderBottom: "1pt solid #222" },
  companyBlock: { flex: 1, padding: 8, borderRight: "1pt solid #222" },
  logo: { width: 150, height: 50, objectFit: "contain", marginBottom: 4 },
  companyLine: { fontSize: 8, color: "#333", marginBottom: 1 },
  companyGst: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#111",
    marginTop: 3,
    marginBottom: 1,
  },
  metaBlock: { width: 195, padding: 8 },
  metaRow: { flexDirection: "row", marginBottom: 4, alignItems: "flex-start" },
  metaLabel: {
    width: 80,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#444",
  },
  metaValue: { flex: 1, fontSize: 8, color: "#111" },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 7,
    alignSelf: "flex-start",
  },
  signatureImage: {
    width: 120,
    height: 40,
    objectFit: "contain",
    marginTop: 4,
    marginBottom: -20,
  },

  
  partyRow: { flexDirection: "row", borderBottom: "1pt solid #222" },
  partyBlock: { flex: 1, padding: 8 },
  partyBlockRight: { flex: 1, padding: 8, borderLeft: "1pt solid #222" },
  partyLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#666",
    textTransform: "uppercase",
    marginBottom: 3,
    letterSpacing: 0.5,
  },
  partyName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#111",
    marginBottom: 2,
  },
  partyLine: { fontSize: 8, color: "#333", marginBottom: 1 },

  
  tableContainer: { borderBottom: "1pt solid #222" },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#ececec",
    borderBottom: "1pt solid #222",
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  colSno: { width: 24, paddingHorizontal: 3, textAlign: "center" },
  colDesc: { flex: 1, paddingHorizontal: 4 },
  colHsn: { width: 52, paddingHorizontal: 3, textAlign: "center" },
  colQty: { width: 30, paddingHorizontal: 3, textAlign: "center" },
  colUnit: { width: 28, paddingHorizontal: 3, textAlign: "center" },
  colRate: { width: 62, paddingHorizontal: 4, textAlign: "right" },
  colDis: { width: 42, paddingHorizontal: 3, textAlign: "right" },
  colAmt: { width: 70, paddingHorizontal: 4, textAlign: "right" },
  thText: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: "#333" },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5pt solid #ddd",
    paddingVertical: 5,
    minHeight: 22,
  },
  tableRowAlt: { backgroundColor: "#fafafa" },
  tdText: { fontSize: 8, color: "#111" },
  tdDesc: { fontSize: 8, color: "#111" },
  tdDescSub: { fontSize: 7, color: "#777", marginTop: 1 },
  emptyRow: {
    flexDirection: "row",
    borderBottom: "0.5pt solid #ddd",
    height: 18,
  },

  
  amountWords: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottom: "1pt solid #222",
    backgroundColor: "#f9f9f9",
  },
  amountWordsLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: "#444",
    marginRight: 6,
  },
  amountWordsValue: { fontSize: 7.5, color: "#111", flex: 1 },

  
  bottomSection: { flexDirection: "row", borderBottom: "1pt solid #222" },
  bottomLeft: { flex: 1, borderRight: "1pt solid #222", padding: 8 },
  sectionLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: "#444",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  bankLine: { fontSize: 8, color: "#111", marginBottom: 2 },
  notesText: { fontSize: 7.5, color: "#666", lineHeight: 1.4 },
  dividerH: { borderBottom: "0.5pt solid #ddd", marginVertical: 6 },
  bottomRight: { width: 215, padding: 0 },
  totalRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderBottom: "0.5pt solid #ddd",
  },
  totalLabel: { flex: 1, fontSize: 8, color: "#555" },
  totalValue: { width: 85, fontSize: 8, textAlign: "right", color: "#111" },
  totalLabelBold: {
    flex: 1,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#111",
  },
  totalValueBold: {
    width: 85,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  grandTotalRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderBottom: "0.5pt solid #ddd",
  },
  grandTotalLabel: { flex: 1, fontSize: 8, color: "#555" },
  grandTotalValue: {
    width: 85,
    fontSize: 8,
    textAlign: "right",
    color: "#111",
  },

  
  taxSection: { borderBottom: "1pt solid #222" },
  taxHeader: {
    flexDirection: "row",
    backgroundColor: "#ececec",
    borderBottom: "0.5pt solid #222",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  taxRow: {
    flexDirection: "row",
    borderBottom: "0.5pt solid #ddd",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  taxTotalRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 4,
    backgroundColor: "#f0f0f0",
  },
  taxColW: { width: 90, fontSize: 7.5 },
  taxColN: { flex: 1, fontSize: 7.5, textAlign: "right" },
  taxColNH: {
    flex: 1,
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },

  
  footerSection: { flexDirection: "row", borderBottom: "1pt solid #222" },
  declarationBlock: {
    width: 333.25,
    padding: 8,
    borderRight: "1pt solid #222",
  },
  signatureBlock: { width: 210, padding: 8, alignItems: "flex-end" },
  declarationText: {
    fontSize: 7,
    color: "#666",
    lineHeight: 1.2,
    marginTop: 2,
  },
  signatureLine: {
    width: 150,
    borderTop: "1pt solid #222",
    marginTop: 32,
    marginBottom: 4,
  },
  signatureFor: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#111",
    textAlign: "right",
  },
  signatureTitle: { fontSize: 7.5, color: "#666", textAlign: "right" },

  
  footerNote: { paddingVertical: 5, alignItems: "center" },
  footerNoteText: { fontSize: 7.5, color: "#888" },
});


const fmt = (n: number) =>
  `Rs. ${Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const fmtDate = (v: any) => {
  if (!v) return "—";
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

const getItems = (invoice: any): any[] => {
  if (!invoice) return [];
  if (Array.isArray(invoice.items) && invoice.items.length)
    return invoice.items;
  if (Array.isArray(invoice.lineItems) && invoice.lineItems.length)
    return invoice.lineItems;
  if (invoice.amount) {
    return [
      {
        description:
          invoice.title || invoice.projectTitle || "Professional Services",
        hsn: String(invoice?.hsnCode || "998314"),
        quantity: 1,
        unit: "Nos",
        price: Number(invoice.amount),
        unitPrice: Number(invoice.amount),
        amount: Number(invoice.amount),
      },
    ];
  }
  return [];
};

function numToWords(n: number): string {
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  if (n === 0) return "Zero";
  const w = (x: number): string => {
    if (x < 20) return a[x] || "";
    if (x < 100) return b[Math.floor(x / 10)] + (x % 10 ? " " + a[x % 10] : "");
    if (x < 1000)
      return (
        a[Math.floor(x / 100)] + " Hundred" + (x % 100 ? " " + w(x % 100) : "")
      );
    if (x < 100000)
      return (
        w(Math.floor(x / 1000)) +
        " Thousand" +
        (x % 1000 ? " " + w(x % 1000) : "")
      );
    if (x < 10000000)
      return (
        w(Math.floor(x / 100000)) +
        " Lakh" +
        (x % 100000 ? " " + w(x % 100000) : "")
      );
    return (
      w(Math.floor(x / 10000000)) +
      " Crore" +
      (x % 10000000 ? " " + w(x % 10000000) : "")
    );
  };
  const paise = Math.round((n % 1) * 100);
  let res = w(Math.floor(n)) + " Rupees";
  if (paise > 0) res += " and " + w(paise) + " Paise";
  return res + " Only";
}


export function InvoicePDFDocument({
  invoice,
  client,
}: {
  invoice: any;
  client?: any;
}) {
  const items = getItems(invoice);
  const selectedHsnCode =
    String(invoice?.hsnCode || "998314") === "999612" ? "999612" : "998314";

  
  const subtotal = items.reduce((s: number, it: any) => {
    const qty = Number(it?.quantity ?? it?.qty ?? 1);
    const rate = Number(it?.price ?? it?.unitPrice ?? it?.amount ?? 0);
    return s + qty * rate;
  }, 0);

  const discount = Number(invoice?.discount ?? 0) || 0;
  const taxable = Math.max(0, subtotal - discount);
  const gstPct = 18;
  const taxAmt = (taxable * gstPct) / 100;

  const normalizedClientState = String(
    client?.state ?? invoice?.clientState ?? "",
  )
    .trim()
    .toLowerCase();
  const isBihar = normalizedClientState.includes("bihar");
  const isInterState = normalizedClientState ? !isBihar : false;
  const cgst = isInterState ? 0 : taxAmt / 2;
  const sgst = isInterState ? 0 : taxAmt / 2;
  const igst = isInterState ? taxAmt : 0;

  const total = taxable + taxAmt;
  const paidAmount = Number(invoice?.paidAmount ?? invoice?.paid ?? 0) || 0;
  const balance = total - paidAmount;

  const clientName =
    client?.name || invoice?.clientName || invoice?.client || "—";
  const clientAddress = client?.address || invoice?.clientAddress || "";
  const clientCity = client?.city || invoice?.clientCity || "";
  const clientState = client?.state || invoice?.clientState || "";
  const clientPin = client?.pin || invoice?.clientPin || "";
  const clientGst =
    client?.gst ||
    client?.gstNumber ||
    client?.gstin ||
    invoice?.clientGst ||
    invoice?.gstNumber ||
    "";
  const clientEmail = client?.email || invoice?.clientEmail || "";
  const clientPhone = client?.phone || invoice?.clientPhone || "";
  const fullAddress = [clientAddress, clientCity, clientState, clientPin]
    .filter(Boolean)
    .join(", ");

  const invNo = invoice?.invoiceNo ?? invoice?.id ?? invoice?._id ?? "—";
  const invDate = fmtDate(invoice?.createdAt ?? new Date());
  const dueDate = invoice?.dueDate ? fmtDate(invoice.dueDate) : "On Receipt";

  const MIN_ROWS = 6;
  const emptyRowCount = Math.max(0, MIN_ROWS - items.length);

  return (
    <Document>
      <Page size="A4" style={S.page}>
        <View style={S.outerBorder}>
          {}
          <View style={S.titleBar}>
            <Text style={S.titleText}>TAX INVOICE</Text>
            <Text style={S.originalCopy}>Original for Recipient</Text>
          </View>

          {}
          <View style={S.headerRow}>
            <View style={S.companyBlock}>
              <Image
                src={typeof logo === "string" ? logo : (logo as any).src}
                style={S.logo}
              />
              <Text
                style={[
                  S.companyLine,
                  { fontFamily: "Helvetica-Bold", fontSize: 9 },
                ]}
              >
                Kalahanu Tech Studios LLP
              </Text>
              <Text style={S.companyLine}>
                Kala Bhawan, Akharaghat Road, Muzaffarpur, Bihar – 842001
              </Text>
              <Text style={S.companyLine}>
                Email: support@pixelatenest.com | Phone: +91 84069 12345
              </Text>
              <Text style={S.companyLine}>Website: pixelatenest.com</Text>
              <Text style={S.companyGst}>GSTIN: 10ABFFK0650E1Z2</Text>
              <Text style={S.companyLine}>
                PAN: ABFFK0650E | State: Bihar (Code: 10)
              </Text>
            </View>

            <View style={S.metaBlock}>
              <View style={S.metaRow}>
                <Text style={S.metaLabel}>Invoice No.</Text>
                <Text style={S.metaValue}>: {invNo}</Text>
              </View>
              <View style={S.metaRow}>
                <Text style={S.metaLabel}>Invoice Date</Text>
                <Text style={S.metaValue}>: {invDate}</Text>
              </View>
              <View style={S.metaRow}>
                <Text style={S.metaLabel}>Due Date</Text>
                <Text style={S.metaValue}>: {dueDate}</Text>
              </View>
              {invoice?.poNumber ? (
                <View style={S.metaRow}>
                  <Text style={S.metaLabel}>PO / Ref No.</Text>
                  <Text style={S.metaValue}>: {invoice.poNumber}</Text>
                </View>
              ) : null}
              <View style={S.metaRow}>
                <Text style={S.metaLabel}>Place of Service</Text>
                <Text style={S.metaValue}>: {clientState || "Bihar (10)"}</Text>
              </View>
            </View>
          </View>
          <View style={S.partyRow}>
            <View style={S.partyBlock}>
              <Text style={S.partyLabel}>Bill To</Text>
              <Text style={S.partyName}>{clientName}</Text>
              {fullAddress ? (
                <Text style={S.partyLine}>{fullAddress}</Text>
              ) : null}
              {clientEmail ? (
                <Text style={S.partyLine}>Email: {clientEmail}</Text>
              ) : null}
              {clientPhone ? (
                <Text style={S.partyLine}>Phone: {clientPhone}</Text>
              ) : null}
              {clientGst ? (
                <Text style={[S.partyLine, { fontFamily: "Helvetica-Bold" }]}>
                  GSTIN: {clientGst}
                </Text>
              ) : null}
            </View>

            <View style={S.partyBlockRight}>
              <Text style={S.partyLabel}>Ship To / Deliver To</Text>
              <Text style={S.partyName}>{clientName}</Text>
              {fullAddress ? (
                <Text style={S.partyLine}>{fullAddress}</Text>
              ) : null}
            </View>
          </View>

          {}
          <View style={S.tableContainer}>
            {}
            <View style={S.tableHeader}>
              <Text style={[S.thText, S.colSno]}>S.No</Text>
              <Text style={[S.thText, S.colDesc]}>
                Description of Services / Goods
              </Text>
              <Text style={[S.thText, S.colHsn]}>HSN/SAC</Text>
              <Text style={[S.thText, S.colQty]}>Qty</Text>
              <Text style={[S.thText, S.colUnit]}>Unit</Text>
              <Text style={[S.thText, S.colRate]}>Rate (Rs.)</Text>
              <Text style={[S.thText, S.colDis]}>Disc.</Text>
              <Text style={[S.thText, S.colAmt]}>Amount (Rs.)</Text>
            </View>

            {}
            {items.map((item: any, idx: number) => {
              const qty = Number(item?.quantity ?? item?.qty ?? 1);
              const rate = Number(
                item?.price ?? item?.unitPrice ?? item?.amount ?? 0,
              );
              const itemDisc = Number(item?.discount ?? 0);
              const amt = qty * rate - itemDisc;
              const hsn =
                item?.hsn ?? item?.sac ?? item?.hsnCode ?? selectedHsnCode;
              const unit = item?.unit ?? "Nos";
              return (
                <View
                  key={idx}
                  style={[S.tableRow, idx % 2 === 1 ? S.tableRowAlt : {}]}
                >
                  <Text style={[S.tdText, S.colSno]}>{idx + 1}</Text>
                  <View style={S.colDesc}>
                    <Text style={S.tdDesc}>
                      {item?.description ||
                        item?.name ||
                        "Professional Service"}
                    </Text>
                    {item?.details ? (
                      <Text style={S.tdDescSub}>{item.details}</Text>
                    ) : null}
                  </View>
                  <Text style={[S.tdText, S.colHsn]}>{hsn}</Text>
                  <Text style={[S.tdText, S.colQty]}>{qty}</Text>
                  <Text style={[S.tdText, S.colUnit]}>{unit}</Text>
                  <Text style={[S.tdText, S.colRate]}>{fmt(rate)}</Text>
                  <Text style={[S.tdText, S.colDis]}>
                    {itemDisc > 0 ? fmt(itemDisc) : "—"}
                  </Text>
                  <Text style={[S.tdText, S.colAmt]}>{fmt(amt)}</Text>
                </View>
              );
            })}

            {}
            {Array.from({ length: emptyRowCount }).map((_, i) => (
              <View key={`e${i}`} style={S.emptyRow}>
                <Text style={[S.tdText, S.colSno]}> </Text>
                <Text style={[S.tdText, S.colDesc]}> </Text>
                <Text style={[S.tdText, S.colHsn]}> </Text>
                <Text style={[S.tdText, S.colQty]}> </Text>
                <Text style={[S.tdText, S.colUnit]}> </Text>
                <Text style={[S.tdText, S.colRate]}> </Text>
                <Text style={[S.tdText, S.colDis]}> </Text>
                <Text style={[S.tdText, S.colAmt]}> </Text>
              </View>
            ))}
          </View>

          {}
          <View style={S.amountWords}>
            <Text style={S.amountWordsLabel}>Amount in Words:</Text>
            <Text style={S.amountWordsValue}>
              {numToWords(Math.round(total))}
            </Text>
          </View>

          {}
          <View style={S.bottomSection}>
            <View style={S.bottomLeft}>
              <Text style={S.sectionLabel}>Bank Details</Text>
              <Text style={S.bankLine}>Bank Name : HDFC Bank Pvt. Ltd.</Text>
              <Text style={S.bankLine}>Account No. : 50200119083987</Text>
              <Text style={S.bankLine}>
                Account Name : KALAHANU TECH STUDIOS LLP
              </Text>
              <Text style={S.bankLine}>IFSC Code : HDFC0000344</Text>
              <Text style={S.bankLine}>
                Branch : Saraiyaganj, Muzaffarpur, Bihar
              </Text>
              <Text style={S.bankLine}>Account Type : Current</Text>

              <View style={S.dividerH} />

              <Text style={S.sectionLabel}>Terms &amp; Notes</Text>
              <Text style={S.notesText}>
                {invoice?.notes ||
                  "1. Payment is due within 30 days of invoice date.\n" +
                    "2. Quote invoice number in all payment references.\n" +
                    "3. Goods/services remain property of Pixelate Nest until paid in full.\n" +
                    "4. Interest @ 18% p.a. charged on overdue amounts."}
              </Text>
            </View>

            <View style={S.bottomRight}>
              <View style={S.totalRow}>
                <Text style={S.totalLabel}>Subtotal</Text>
                <Text style={S.totalValue}>{fmt(subtotal)}</Text>
              </View>
              {discount > 0 && (
                <View style={S.totalRow}>
                  <Text style={S.totalLabel}>(-) Discount</Text>
                  <Text style={S.totalValue}>{fmt(discount)}</Text>
                </View>
              )}
              <View style={S.totalRow}>
                <Text style={S.totalLabel}>Taxable Amount</Text>
                <Text style={S.totalValue}>{fmt(taxable)}</Text>
              </View>
              {isInterState ? (
                igst > 0 ? (
                  <View style={S.totalRow}>
                    <Text style={S.totalLabel}>IGST (18%)</Text>
                    <Text style={S.totalValue}>{fmt(igst)}</Text>
                  </View>
                ) : null
              ) : (
                <>
                  {cgst > 0 && (
                    <View style={S.totalRow}>
                      <Text style={S.totalLabel}>CGST (9%)</Text>
                      <Text style={S.totalValue}>{fmt(cgst)}</Text>
                    </View>
                  )}
                  {sgst > 0 && (
                    <View style={S.totalRow}>
                      <Text style={S.totalLabel}>SGST (9%)</Text>
                      <Text style={S.totalValue}>{fmt(sgst)}</Text>
                    </View>
                  )}
                  {taxAmt > 0 && cgst === 0 && sgst === 0 && (
                    <View style={S.totalRow}>
                      <Text style={S.totalLabel}>Tax</Text>
                      <Text style={S.totalValue}>{fmt(taxAmt)}</Text>
                    </View>
                  )}
                </>
              )}
              <View style={S.grandTotalRow}>
                <Text style={S.grandTotalLabel}>Grand Total</Text>
                <Text style={S.grandTotalValue}>{fmt(total)}</Text>
              </View>
              {paidAmount > 0 && (
                <>
                  <View style={S.totalRow}>
                    <Text style={S.totalLabel}>(-) Amount Paid</Text>
                    <Text style={S.totalValue}>{fmt(paidAmount)}</Text>
                  </View>
                  <View
                    style={[
                      S.totalRow,
                      { backgroundColor: balance > 0 ? "#fff5f5" : "#f0fdf4" },
                    ]}
                  >
                    <Text style={S.totalLabelBold}>Balance Due</Text>
                    <Text
                      style={[
                        S.totalValueBold,
                        { color: balance > 0 ? "#dc2626" : "#16a34a" },
                      ]}
                    >
                      {fmt(Math.max(0, balance))}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>

          {}
          {taxAmt > 0 && (
            <View style={S.taxSection}>
              <View style={S.taxHeader}>
                <Text style={[S.taxColW, { fontFamily: "Helvetica-Bold" }]}>
                  HSN / SAC Code
                </Text>
                <Text style={S.taxColNH}>Taxable Value</Text>
                {isInterState ? (
                  <>
                    <Text style={S.taxColNH}>IGST Rate</Text>
                    <Text style={S.taxColNH}>IGST Amt</Text>
                  </>
                ) : (
                  <>
                    <Text style={S.taxColNH}>CGST Rate</Text>
                    <Text style={S.taxColNH}>CGST Amt</Text>
                    <Text style={S.taxColNH}>SGST Rate</Text>
                    <Text style={S.taxColNH}>SGST Amt</Text>
                  </>
                )}
                <Text style={S.taxColNH}>Total Tax</Text>
              </View>
              <View style={S.taxRow}>
                <Text style={[S.taxColW, { fontSize: 7.5 }]}>{selectedHsnCode}</Text>
                <Text style={S.taxColN}>{fmt(taxable)}</Text>
                {isInterState ? (
                  <>
                    <Text style={S.taxColN}>18%</Text>
                    <Text style={S.taxColN}>{fmt(igst)}</Text>
                  </>
                ) : (
                  <>
                    <Text style={S.taxColN}>9%</Text>
                    <Text style={S.taxColN}>{fmt(cgst)}</Text>
                    <Text style={S.taxColN}>9%</Text>
                    <Text style={S.taxColN}>{fmt(sgst)}</Text>
                  </>
                )}
                <Text style={S.taxColN}>{fmt(taxAmt)}</Text>
              </View>
              <View style={S.taxTotalRow}>
                <Text
                  style={[
                    S.taxColW,
                    { fontFamily: "Helvetica-Bold", fontSize: 7.5 },
                  ]}
                >
                  Total
                </Text>
                <Text style={S.taxColNH}>{fmt(taxable)}</Text>
                {isInterState ? (
                  <>
                    <Text style={S.taxColNH}> </Text>
                    <Text style={S.taxColNH}>{fmt(igst)}</Text>
                  </>
                ) : (
                  <>
                    <Text style={S.taxColNH}> </Text>
                    <Text style={S.taxColNH}>{fmt(cgst)}</Text>
                    <Text style={S.taxColNH}> </Text>
                    <Text style={S.taxColNH}>{fmt(sgst)}</Text>
                  </>
                )}
                <Text style={S.taxColNH}>{fmt(taxAmt)}</Text>
              </View>
            </View>
          )}

          {}
          <View style={S.footerSection}>
            <View style={S.declarationBlock}>
              <Text style={S.sectionLabel}>Declaration</Text>
              <Text style={S.declarationText}>
                We declare that this invoice shows the actual price of the
                goods/services described and that all particulars are true and
                correct.{"\n"}
                All disputes are subject to Muzaffarpur jurisdiction only.
              </Text>
            </View>
            <View style={S.signatureBlock}>
              <Text style={{ fontSize: 8, color: "#555", textAlign: "right" }}>
                For Kalahanu Tech Studios LLP
              </Text>
              <Image src={signsrc} style={S.signatureImage} />
              <View style={S.signatureLine} />
              <Text style={S.signatureFor}>Authorised Signatory</Text>
              <Text style={S.signatureTitle}>
                Labh Chandra Bothra, Co-Founder
              </Text>
            </View>
          </View>

          {}
          <View style={S.footerNote}>
            <Text style={S.footerNoteText}>
              This is a computer-generated invoice and does not require a
              physical signature.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
