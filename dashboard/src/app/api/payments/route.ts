import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { invoiceId, amount, date, mode, remarks } = body;

    console.log("PAYMENT_DEBUG: Incoming request", { invoiceId, amount });

    if (!invoiceId || !amount) {
      return NextResponse.json(
        { error: "Invoice ID and Amount are required" },
        { status: 400 },
      );
    }

    // Use robust helper to find invoice by _id, invoiceNo, or custom id
    const invoice = await svc.findById("invoices", invoiceId);

    if (!invoice) {
      console.warn("PAYMENT_DEBUG: Invoice not found in DB for ID:", invoiceId);
      return NextResponse.json(
        {
          error: "Invoice not found in database",
          searchedId: invoiceId,
          help: "The API route exists, but this specific invoice record was not found.",
        },
        { status: 404 },
      );
    }

    const currentPaid = Number(invoice.paidAmount || 0);
    const totalAmount = Number(invoice.amount || 0);
    const newPaid = currentPaid + Number(amount);

    let newStatus = invoice.status;
    if (newPaid >= totalAmount) {
      newStatus = "PAID";
    } else if (newPaid > 0) {
      newStatus = "PARTIAL";
    }

    const invoicesCol = await svc.getCollection("invoices");
    await invoicesCol.updateOne(
      { _id: invoice._id },
      {
        $set: {
          paidAmount: newPaid,
          status: newStatus,
          updatedAt: new Date(),
        },
        $push: {
          paymentHistory: {
            amount: Number(amount),
            date: new Date(date),
            mode: mode,
            remarks: remarks,
          },
        } as any,
      },
    );

    console.log("PAYMENT_DEBUG: Success", { invoiceId, newStatus, newPaid });
    return NextResponse.json({ success: true, newStatus, newPaid });
  } catch (error: any) {
    console.error("PAYMENT_DEBUG: Error", error);
    return NextResponse.json(
      { error: error.message || "Failed to process payment" },
      { status: 500 },
    );
  }
}
