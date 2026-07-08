import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import * as svc from "@/lib/services";
import { requireAuth } from "@/lib/require-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: RouteContext) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const body = await request.json();
    const month = body.month; // "YYYY-MM"
    if (!month) {
      return NextResponse.json({ error: "month is required" }, { status: 400 });
    }
    const status: "paid" | "pending" = body.status === "paid" ? "paid" : "pending";
    const invoiceUrl: string | null = body.invoiceUrl || null;

    const fixedExpensesCol = await svc.getCollection("fixedExpenses");
    const expensesCol = await svc.getCollection("expenses");

    const fixedExpense = await svc.findById("fixedExpenses", id);
    if (!fixedExpense) {
      return NextResponse.json({ error: "Fixed expense not found" }, { status: 404 });
    }

    const payments: any[] = Array.isArray(fixedExpense.payments)
      ? fixedExpense.payments
      : [];
    const existingIdx = payments.findIndex((p: any) => p.month === month);

    const existingExpenseId =
      existingIdx >= 0 ? payments[existingIdx].expenseId : null;

    let expenseId: string | null = existingExpenseId || null;

    if (status === "paid") {
      const monthLabel = new Date(`${month}-01`).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      const expenseDoc = {
        title: `${fixedExpense.title} (${monthLabel})`,
        amount: Number(fixedExpense.amount || 0),
        category: fixedExpense.category || "miscellaneous",
        paymentMethod: fixedExpense.paymentMethod || "",
        status: "paid",
        vendor: fixedExpense.vendor || "",
        reference: `Fixed - ${monthLabel}`,
        date: `${month}-01`,
        note: fixedExpense.note || "",
        billUrl: invoiceUrl || undefined,
        fixedExpenseId: String(id),
        fixedExpenseMonth: month,
        updatedAt: new Date(),
      };

      if (existingExpenseId && ObjectId.isValid(existingExpenseId)) {
        await expensesCol.updateOne(
          { _id: new ObjectId(existingExpenseId) },
          { $set: expenseDoc },
        );
        expenseId = existingExpenseId;
      } else {
        const res = await expensesCol.insertOne({
          ...expenseDoc,
          createdAt: new Date(),
        });
        expenseId = res.insertedId.toString();
      }
    } else if (existingExpenseId && ObjectId.isValid(existingExpenseId)) {
      await svc.softDeleteById("expenses", existingExpenseId);
      expenseId = null;
    }

    const paymentEntry = {
      month,
      status,
      invoiceUrl: invoiceUrl || (existingIdx >= 0 ? payments[existingIdx].invoiceUrl : null),
      paidDate: status === "paid" ? new Date().toISOString() : null,
      expenseId,
      updatedAt: new Date(),
    };

    if (existingIdx >= 0) {
      payments[existingIdx] = paymentEntry;
    } else {
      payments.push(paymentEntry);
    }

    await fixedExpensesCol.updateOne(
      { _id: new ObjectId(id) },
      { $set: { payments, updatedAt: new Date() } },
    );

    const updated = await svc.findById("fixedExpenses", id);
    return NextResponse.json(updated);
  } catch (e: any) {
    console.error("Failed to update fixed expense payment", e);
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 },
    );
  }
}
