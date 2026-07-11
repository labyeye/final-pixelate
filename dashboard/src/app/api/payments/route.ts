import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { requireAuth } from "@/lib/require-auth";
import { syncClientSubscription } from "@/lib/product-sync";

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth.error) return auth.error;
  try {
    const body = await req.json();
    const { invoiceId, amount, date, mode, remarks } = body;

    if (!invoiceId || !amount) {
      return NextResponse.json(
        { error: "Invoice ID and Amount are required" },
        { status: 400 },
      );
    }

    const invoice = await svc.findById("invoices", invoiceId);

    if (!invoice) {
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

    if (newStatus === "PAID" && invoice.clientId) {
      await syncClientSubscription(
        String(invoice.clientId),
        "activate",
        invoice.renewalDate ?? null,
      );
    }

    return NextResponse.json({ success: true, newStatus, newPaid });
  } catch (error: any) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process payment" },
      { status: 500 },
    );
  }
}
