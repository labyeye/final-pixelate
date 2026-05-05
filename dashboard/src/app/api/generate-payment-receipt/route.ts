import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { PaymentReceiptPDFDocument } from "@/components/payments/payment-receipt-pdf";

function getFinancialYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const fyStart = month >= 4 ? year : year - 1;
  return `${String(fyStart).slice(2)}${String(fyStart + 1).slice(2)}`;
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

  if (!clientName || !invoiceNo || !amount || !paymentDate || !paymentMode) {
    return NextResponse.json(
      {
        error:
          "Missing required fields: clientName, invoiceNo, amount, paymentDate, paymentMode",
      },
      { status: 400 },
    );
  }

  const finalReceiptNo =
    receiptNo || generateReceiptNo(receiptIndex || receiptCounter++);

  const data = {
    receiptNo: finalReceiptNo,
    clientName: String(clientName),
    clientAddress: clientAddress ? String(clientAddress) : undefined,
    clientPhone: clientPhone ? String(clientPhone) : undefined,
    invoiceNo: String(invoiceNo),
    projectTitle: projectTitle ? String(projectTitle) : undefined,
    amount: Number(amount),
    paymentDate: String(paymentDate),
    paymentMode: String(paymentMode),
    transactionRef: transactionRef ? String(transactionRef) : undefined,
    invoiceTotal: invoiceTotal ? Number(invoiceTotal) : undefined,
    balanceDue: balanceDue !== undefined ? Number(balanceDue) : undefined,
    invoiceStatus: invoiceStatus ? String(invoiceStatus) : undefined,
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
