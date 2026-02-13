import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/images/Logo_Color_Name_Large.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: "15mm 20mm",
    fontFamily: "Helvetica",
    color: "#333",
    backgroundColor: "#fff",
  },
  container: {
    width: "100%",
    maxWidth: "210mm",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  companySection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  companyText: {
    gap: 2,
  },
  companyName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#044bab",
  },
  companySubtitle: {
    fontSize: 12,
    color: "#666",
  },
  invoiceTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#044bab",
    textAlign: "right",
    marginBottom: 8,
  },
  statusSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  statusBadge: {
    padding: "6 12",
    borderRadius: 4,
    fontWeight: "bold",
    fontSize: 12,
    color: "#fff",
    marginBottom: 4,
  },
  amountInfo: {
    fontSize: 11,
    color: "#666",
    textAlign: "right",
  },
  infoSection: {
    marginTop: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 11,
    color: "#666",
    marginBottom: 2,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  fromToSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    gap: 30,
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#044bab",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  companyDetails: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  companyLogo: {
    width: 256,
    height: 92,
  },
  detailsText: {
    fontSize: 11,
    color: "#666",
    marginBottom: 2,
  },
  clientName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  table: {
    width: "100%",
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#044bab",
    padding: "10 12",
    color: "#fff",
  },
  headerCell: {
    flex: 1,
    fontSize: 11,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: "10 12",
    borderBottom: "1px solid #eee",
  },
  cell: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
  },
  cellNumber: {
    flex: 0.5,
    fontSize: 12,
    textAlign: "center",
  },
  cellRight: {
    flex: 1,
    fontSize: 12,
    textAlign: "right",
  },
  workDetails: {
    marginBottom: 20,
    padding: 12,
    border: "1px solid #eee",
    borderRadius: 6,
  },
  workDetailsTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#044bab",
    marginBottom: 8,
  },
  workDetailsContent: {
    fontSize: 11,
    color: "#333",
    lineHeight: 1.4,
  },
  summarySection: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 40,
    marginBottom: 30,
  },
  notesSection: {
    flex: 1,
  },
  notesTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#044bab",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  notesContent: {
    fontSize: 11,
    color: "#666",
    lineHeight: 1.5,
  },
  totalsBox: {
    width: 280,
    padding: 15,
    border: "1px solid #eee",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 12,
    color: "#666",
  },
  totalValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  finalTotal: {
    paddingTop: 12,
    borderTop: "2px solid #044bab",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  finalTotalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#044bab",
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#044bab",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 20,
    paddingTop: 20,
    borderTop: "1px solid #eee",
  },
  footerSection: {
    flex: 1,
  },
  footerTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#044bab",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  footerContent: {
    fontSize: 11,
    color: "#666",
    lineHeight: 1.5,
  },
  signatureSection: {
    alignItems: "center",
  },
  signatureLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#044bab",
    opacity: 0.5,
    marginBottom: 6,
  },
  signatureName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  signatureTitle: {
    fontSize: 11,
    color: "#666",
  },
  terms: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
    paddingTop: 15,
    borderTop: "1px solid #eee",
  },
});

// Helper functions
const formatCurrency = (amount: number) => {
  return `Rs. ${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
const formatDate = (date: string | Date) => {
  try {
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return String(date || "");
  }
};

const getItems = (invoice: any) => {
  if (!invoice) return [];
  if (Array.isArray(invoice.items) && invoice.items.length)
    return invoice.items;
  if (Array.isArray(invoice.lineItems) && invoice.lineItems.length)
    return invoice.lineItems;
  if (invoice.amount && !Array.isArray(invoice.items)) {
    return [
      {
        description: invoice.title || invoice.projectTitle || "Service",
        quantity: 1,
        price: Number(invoice.amount),
        unitPrice: Number(invoice.amount),
        amount: Number(invoice.amount),
      },
    ];
  }
  return [];
};

export function InvoicePDFDocument({
  invoice,
  client,
}: {
  invoice: any;
  client?: any;
}) {
  const items = getItems(invoice);
  const subtotal = items.reduce((s: number, it: any) => {
    const qty = Number(it?.quantity ?? it?.qty ?? 1);
    const price = Number(it?.price ?? it?.unitPrice ?? it?.amount ?? 0);
    return s + qty * price;
  }, 0);

  const discount = Number(invoice?.discount ?? 0) || 0;
  const tax = Number(invoice?.tax ?? 0) || 0;
  const total = subtotal - discount + tax;
  const paidAmount = Number(invoice?.paidAmount ?? invoice?.paid ?? 0) || 0;

  let status = "DUE";
  let statusColor = "#044bab";

  const isPaid =
    invoice?.status === "PAID" || (paidAmount >= total - 1 && total > 0);

  if (isPaid) {
    status = "PAID";
    statusColor = "#16a34a";
  } else if (paidAmount > 0 && paidAmount < total) {
    status = "PARTIAL";
    statusColor = "#f59e0b";
  }

  const clientName =
    client?.name || invoice?.clientName || invoice?.client || "Client";
  const clientAddress = client?.address || invoice?.clientAddress || "";
  const clientEmail = client?.email || invoice?.clientEmail || "";
  const clientPhone = client?.phone || invoice?.clientPhone || "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.companySection}>
              <View style={styles.companyText}>
                <Image
                  src={typeof logo === "string" ? logo : logo.src}
                  style={styles.companyLogo}
                />
                <Text style={styles.companySubtitle}>
                  Kalahanu Tech Studios
                </Text>
              </View>
            </View>

            <View>
              <Text style={styles.invoiceTitle}>TAX INVOICE</Text>
              <View style={styles.statusSection}>
                {/* <View
                  style={[styles.statusBadge, { backgroundColor: statusColor }]}
                >
                  <Text>{status}</Text>
                </View> */}
                <View style={styles.amountInfo}>
                  <Text>Paid: {formatCurrency(paidAmount)}</Text>
                  <Text>Total: {formatCurrency(total)}</Text>
                </View>
              </View>
              <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Invoice #:</Text>
                  <Text>
                    {invoice?.invoiceNo ?? invoice?.id ?? invoice?._id}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Date:</Text>
                  <Text>{formatDate(invoice?.createdAt ?? Date.now())}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Due:</Text>
                  <Text>
                    {invoice?.dueDate
                      ? formatDate(invoice.dueDate)
                      : "On receipt"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* From and To Sections */}
          <View style={styles.fromToSection}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>FROM</Text>
              <Text style={styles.companyDetails}>
                Kalahanu Tech Studios LLP
              </Text>
              <Text style={styles.detailsText}>GST: 10AADCK1491R2ZB</Text>
              <Text style={styles.detailsText}>
                Kala Bhawan, Akharaghat Road
              </Text>
              <Text style={styles.detailsText}>
                Muzaffarpur, Bihar - 842001
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>BILL TO</Text>
              <Text style={styles.clientName}>{clientName}</Text>
              {clientAddress ? (
                <Text style={styles.detailsText}>{clientAddress}</Text>
              ) : null}
              {clientEmail ? (
                <Text style={styles.detailsText}>{clientEmail}</Text>
              ) : null}
              {clientPhone ? (
                <Text style={styles.detailsText}>{clientPhone}</Text>
              ) : null}
            </View>
          </View>

          {/* Items Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text
                style={[styles.headerCell, { flex: 0.5, textAlign: "center" }]}
              >
                #
              </Text>
              <Text style={[styles.headerCell, { textAlign: "center" }]}>
                Description
              </Text>
              <Text style={[styles.headerCell, { textAlign: "right" }]}>
                Qty
              </Text>
              <Text style={[styles.headerCell, { textAlign: "right" }]}>
                Unit Price
              </Text>
              <Text style={[styles.headerCell, { textAlign: "right" }]}>
                Amount
              </Text>
            </View>

            {items.slice(0, 8).map((item: any, index: number) => {
              const qty = Number(item?.quantity ?? item?.qty ?? 1);
              const unitPrice = Number(
                item?.price ?? item?.unitPrice ?? item?.amount ?? 0,
              );
              const amount = qty * unitPrice;

              return (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.cellNumber}>{index + 1}</Text>
                  <Text style={styles.cell}>
                    {item?.description || item?.name || "Service"}
                  </Text>
                  <Text style={styles.cellRight}>{qty}</Text>
                  <Text style={styles.cellRight}>
                    {formatCurrency(unitPrice)}
                  </Text>
                  <Text style={styles.cellRight}>{formatCurrency(amount)}</Text>
                </View>
              );
            })}
          </View>

          {/* Summary Section */}
          <View style={styles.summarySection}>
            <View style={styles.notesSection}>
              <Text style={styles.notesTitle}>NOTES</Text>
              <Text style={styles.notesContent}>
                {invoice?.notes ||
                  "Payment due within 30 days of invoice date. Please include invoice number with payment."}
              </Text>
            </View>

            <View style={styles.totalsBox}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>
                  {formatCurrency(subtotal)}
                </Text>
              </View>

              {discount > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Discount</Text>
                  <Text style={styles.totalValue}>
                    - {formatCurrency(discount)}
                  </Text>
                </View>
              )}

              {tax > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Tax</Text>
                  <Text style={styles.totalValue}>{formatCurrency(tax)}</Text>
                </View>
              )}

              <View style={styles.finalTotal}>
                <Text style={styles.finalTotalLabel}>Total</Text>
                <Text style={styles.finalTotalValue}>
                  {formatCurrency(total)}
                </Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerSection}>
              <Text style={styles.footerTitle}>PAYMENT INFO</Text>
              <Text style={styles.footerContent}>
                Bank: HDFC BANK PVT LTD{"\n"}
                A/C: 0000 1234 5678{"\n"}
                Name: Kalahanu Tech Studios{"\n"}
                IFSC: HDFC0001234
              </Text>
            </View>

            <View style={[styles.footerSection, styles.signatureSection]}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>Labh Chandra Bothra</Text>
              <Text style={styles.signatureTitle}>Co-Founder</Text>
            </View>

            <View style={[styles.footerSection, { alignItems: "flex-end" }]}>
              <Text style={styles.footerTitle}>CONTACT</Text>
              <Text style={styles.footerContent}>
                support@pixelatenest.com{"\n"}
                +91 84069 12345{"\n"}
                pixelatenest.com
              </Text>
            </View>
          </View>

          {/* Terms */}
          <Text style={styles.terms}>
            This invoice is computer generated and does not require a signature.
            All goods and services remain the property of Pixelate Nest until
            paid in full.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
