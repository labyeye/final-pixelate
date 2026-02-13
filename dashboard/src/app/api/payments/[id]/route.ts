import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/services";
import { ObjectId } from "mongodb";

/**
 * DELETE /api/payments/[id]
 * Delete a specific payment from an invoice's payment history
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { searchParams } = new URL(req.url);
    const invoiceId = searchParams.get("invoiceId");
    const paymentIndex = searchParams.get("index");

    if (!invoiceId || paymentIndex === null) {
      return NextResponse.json(
        { error: "Invoice ID and payment index are required" },
        { status: 400 },
      );
    }

    const invoicesCol = await getCollection("invoices");

    // Find the invoice
    let invoice = await invoicesCol.findOne({ _id: invoiceId } as any);
    if (!invoice) {
      try {
        invoice = await invoicesCol.findOne({ _id: new ObjectId(invoiceId) });
      } catch (e) {
        // ignore
      }
    }

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const paymentHistory = invoice.paymentHistory || [];
    const idx = parseInt(paymentIndex);

    if (idx < 0 || idx >= paymentHistory.length) {
      return NextResponse.json(
        { error: "Invalid payment index" },
        { status: 400 },
      );
    }

    // Get the payment amount to subtract from paidAmount
    const deletedPayment = paymentHistory[idx];
    const deletedAmount = Number(deletedPayment.amount || 0);

    // Remove the payment from history
    paymentHistory.splice(idx, 1);

    // Recalculate paidAmount
    const newPaidAmount = paymentHistory.reduce(
      (sum: number, p: any) => sum + Number(p.amount || 0),
      0,
    );

    // Determine new status
    const totalAmount = Number(invoice.amount || 0);
    let newStatus = "PENDING";
    if (newPaidAmount >= totalAmount) {
      newStatus = "PAID";
    } else if (newPaidAmount > 0) {
      newStatus = "PARTIAL";
    }

    // Update the invoice
    await invoicesCol.updateOne(
      { _id: invoice._id },
      {
        $set: {
          paymentHistory,
          paidAmount: newPaidAmount,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        },
      },
    );

    return NextResponse.json({
      message: "Payment deleted successfully",
      paidAmount: newPaidAmount,
      status: newStatus,
    });
  } catch (error: any) {
    console.error("Error deleting payment:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete payment" },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/payments/[id]
 * Update a specific payment in an invoice's payment history
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { invoiceId, index, amount, date, mode, remarks } = await req.json();

    if (!invoiceId || index === undefined || !amount) {
      return NextResponse.json(
        { error: "Invoice ID, payment index, and amount are required" },
        { status: 400 },
      );
    }

    const invoicesCol = await getCollection("invoices");

    // Find the invoice
    let invoice = await invoicesCol.findOne({ _id: invoiceId } as any);
    if (!invoice) {
      try {
        invoice = await invoicesCol.findOne({ _id: new ObjectId(invoiceId) });
      } catch (e) {
        // ignore
      }
    }

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const paymentHistory = invoice.paymentHistory || [];
    const idx = parseInt(index);

    if (idx < 0 || idx >= paymentHistory.length) {
      return NextResponse.json(
        { error: "Invalid payment index" },
        { status: 400 },
      );
    }

    // Update the payment entry
    paymentHistory[idx] = {
      amount: Number(amount),
      date: date || paymentHistory[idx].date,
      mode: mode || paymentHistory[idx].mode,
      remarks: remarks || paymentHistory[idx].remarks || "",
    };

    // Recalculate paidAmount
    const newPaidAmount = paymentHistory.reduce(
      (sum: number, p: any) => sum + Number(p.amount || 0),
      0,
    );

    // Determine new status
    const totalAmount = Number(invoice.amount || 0);
    let newStatus = "PENDING";
    if (newPaidAmount >= totalAmount) {
      newStatus = "PAID";
    } else if (newPaidAmount > 0) {
      newStatus = "PARTIAL";
    }

    // Update the invoice
    await invoicesCol.updateOne(
      { _id: invoice._id },
      {
        $set: {
          paymentHistory,
          paidAmount: newPaidAmount,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        },
      },
    );

    return NextResponse.json({
      message: "Payment updated successfully",
      paidAmount: newPaidAmount,
      status: newStatus,
    });
  } catch (error: any) {
    console.error("Error updating payment:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update payment" },
      { status: 500 },
    );
  }
}
