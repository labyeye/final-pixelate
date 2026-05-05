import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { PaymentReceiptPDFDocument } from "@/components/payments/payment-receipt-pdf";

function getFinancialYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const fyStart = month >= 4 ? year : year - 1;
  return `${fyStart}-${fyStart + 1}`;
}

let receiptCounter = 1;

function generateReceiptNo(index: number): string {
  const fy = getFinancialYear();
  return `RCPT/${fy}/${String(index).padStart(4, "0")}`;
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const {
    receiptNo,
    clientName,
    clientAddress,
    clientPhone,
    invoiceNo,
    projectTitle,
    amount,
    paymentDate,
    paymentMode,
    transactionRef,
    invoiceTotal,
    balanceDue,
    invoiceStatus,
    receiptIndex,
  } = body;

  if (!clientName || !invoiceNo || !paymentDate || !paymentMode) {
    return NextResponse.json(
      { error: "Missing required fields: clientName, invoiceNo, paymentDate, paymentMode" },
      { status: 400 },
    );
  }

  const finalReceiptNo =
    receiptNo || generateReceiptNo(receiptIndex || receiptCounter++);

  // Safely coerce a value that might be a BSON Decimal128 / extended JSON object
  function coerceNum(v: unknown): number {
    if (v === null || v === undefined) return 0;
    if (typeof v === "number") return isFinite(v) ? v : 0;
    if (typeof v === "string") return parseFloat(v) || 0;
    if (typeof v === "object") {
      const o = v as Record<string, unknown>;
      const raw = o.$numberDecimal ?? o.$numberLong ?? o.$numberInt ?? o.$numberDouble;
      if (raw !== undefined) return parseFloat(String(raw)) || 0;
    }
    return parseFloat(String(v)) || 0;
  }

  function coerceStr(v: unknown): string {
    if (v === null || v === undefined) return "";
    if (typeof v === "string") return v;
    if (typeof v === "object") {
      const o = v as Record<string, unknown>;
      if (o.$date) return String(o.$date);
      const n = o.$numberDecimal ?? o.$numberLong ?? o.$numberInt;
      if (n !== undefined) return String(n);
      return "";
    }
    return String(v);
  }

  const data = {
    receiptNo: finalReceiptNo,
    clientName: coerceStr(clientName) || "Client",
    clientAddress: clientAddress ? coerceStr(clientAddress) : undefined,
    clientPhone: clientPhone ? coerceStr(clientPhone) : undefined,
    invoiceNo: coerceStr(invoiceNo) || "—",
    projectTitle: projectTitle ? coerceStr(projectTitle) : undefined,
    amount: coerceNum(amount),
    paymentDate: coerceStr(paymentDate) || new Date().toISOString(),
    paymentMode: coerceStr(paymentMode) || "Bank Transfer",
    transactionRef: transactionRef ? coerceStr(transactionRef) : undefined,
    invoiceTotal: invoiceTotal !== undefined && invoiceTotal !== null ? coerceNum(invoiceTotal) : undefined,
    balanceDue: balanceDue !== undefined && balanceDue !== null ? coerceNum(balanceDue) : undefined,
    invoiceStatus: invoiceStatus ? coerceStr(invoiceStatus) : undefined,
  };

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = await renderToBuffer(
      React.createElement(PaymentReceiptPDFDocument, { data }) as any,
    );

    const safeClient = String(clientName)
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    const safeInv = String(invoiceNo).replace(/[^a-zA-Z0-9]/g, "-");
    const filename = `Receipt-${safeInv}-${safeClient}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(pdfBuffer.length),
      },
    });
  } catch (err: any) {
    console.error("[generate-payment-receipt] PDF generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate receipt PDF. " + (err?.message || "") },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
