import { NextRequest, NextResponse } from "next/server";
import * as svc from "@/lib/services";
import { ObjectId } from "mongodb";
import { requireAuth } from "@/lib/require-auth";

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (auth.error) return auth.error;
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");
    const type = searchParams.get("type");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!type) {
      return NextResponse.json(
        { error: "Report type is required" },
        { status: 400 },
      );
    }

    const startDate = from ? new Date(from) : new Date(0);
    const endDate = to ? new Date(to) : new Date();
    if (to && !to.includes("T")) {
      endDate.setHours(23, 59, 59, 999);
    }

    switch (type) {
      case "income":
        return await getIncomeStatement(startDate, endDate);
      case "expense":
        return await getExpenseStatement(startDate, endDate);
      case "staff":
        return await getStaffReport(
          startDate,
          endDate,
          searchParams.get("staffMemberId"),
        );
      case "client":
        return await getClientReport(startDate, endDate, clientId);
      case "task":
        return await getTaskReport(startDate, endDate);
      case "dues":
        return await getDuesReport(startDate, endDate);
      case "project":
        return await getProjectReport(startDate, endDate);
      default:
        return NextResponse.json(
          { error: "Invalid report type" },
          { status: 400 },
        );
    }
  } catch (error: any) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate report" },
      { status: 500 },
    );
  }
}

function getDateQuery(field: string, start: Date, end: Date) {
  return {
    $or: [
      { [field]: { $gte: start, $lte: end } },
      { [field]: { $gte: start.toISOString(), $lte: end.toISOString() } },
    ],
  };
}

async function getIncomeStatement(startDate: Date, endDate: Date) {
  const invoicesCol = await svc.getCollection("invoices");

  const invoices = await invoicesCol
    .find({
      $or: [
        { "paymentHistory.date": { $gte: startDate, $lte: endDate } },
        { createdAt: { $gte: startDate, $lte: endDate } },
        {
          createdAt: {
            $gte: startDate.toISOString(),
            $lte: endDate.toISOString(),
          },
        },
      ],
    })
    .toArray();

  let totalRevenue = 0;
  let totalPending = 0;
  const incomeDetails: any[] = [];
  const monthlyData: Record<string, number> = {};

  invoices.forEach((inv: any) => {
    const totalAmount = Number(inv.amount || 0);
    const paidAmount = Number(inv.paidAmount || 0);

    if (inv.paymentHistory && inv.paymentHistory.length > 0) {
      inv.paymentHistory.forEach((payment: any) => {
        const pDate = new Date(payment.date);
        if (pDate >= startDate && pDate <= endDate) {
          const amount = Number(payment.amount || 0);
          totalRevenue += amount;

          incomeDetails.push({
            date: payment.date,
            reference: inv.invoiceNo || inv.id,
            party: inv.clientName || "Unknown",
            description: `${inv.title || "Invoice Payment"} (${payment.mode || "Other"})`,
            amount: amount,
            totalAmount: totalAmount,
            type: "Credit",
            status: inv.status,
            isPaymentRecord: true,
          });

          const monthKey = `${pDate.getFullYear()}-${String(pDate.getMonth() + 1).padStart(2, "0")}`;
          monthlyData[monthKey] = (monthlyData[monthKey] || 0) + amount;
        }
      });
    } else if (paidAmount > 0) {
      const iDate = new Date(inv.createdAt);
      if (iDate >= startDate && iDate <= endDate) {
        totalRevenue += paidAmount;
        incomeDetails.push({
          date: inv.createdAt,
          reference: inv.invoiceNo || inv.id,
          party: inv.clientName || "Unknown",
          description: inv.title || "Invoice (Legacy)",
          amount: paidAmount,
          totalAmount: totalAmount,
          type: "Credit",
          status: inv.status,
        });

        const monthKey = `${iDate.getFullYear()}-${String(iDate.getMonth() + 1).padStart(2, "0")}`;
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + paidAmount;
      }
    }

    const iDate = new Date(inv.createdAt);
    if (iDate >= startDate && iDate <= endDate) {
      totalPending += totalAmount - paidAmount;
    }
  });

  const expensesCol = await svc.getCollection("expenses");
  const expenses = await expensesCol
    .find(getDateQuery("createdAt", startDate, endDate))
    .toArray();
  const totalExpenses = expenses.reduce(
    (acc, curr: any) => acc + Number(curr.amount || 0),
    0,
  );

  return NextResponse.json({
    title: "Income Statement (Cash Basis)",
    period: { from: startDate, to: endDate },
    summary: {
      totalRevenue,
      totalExpenses,
      netIncome: totalRevenue - totalExpenses,
      pendingIncome: totalPending,
    },
    details: incomeDetails.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
    monthlyBreakdown: Object.entries(monthlyData)
      .map(([k, v]) => ({ month: k, amount: v }))
      .sort((a, b) => a.month.localeCompare(b.month)),
  });
}

async function getDuesReport(startDate: Date, endDate: Date) {
  const clientsCol = await svc.getCollection("clients");
  const allClients = await clientsCol.find().toArray();

  const invoicesCol = await svc.getCollection("invoices");
  const invoices = await invoicesCol
    .find(getDateQuery("createdAt", startDate, endDate))
    .toArray();

  const clientDues: Record<string, any> = {};
  const nameToId: Record<string, string> = {};

  allClients.forEach((c: any) => {
    const cId = c._id.toString();
    clientDues[cId] = {
      id: cId,
      name: c.name,
      totalBilled: 0,
      received: 0,
      pending: 0,
    };
    if (c.name) nameToId[c.name.toLowerCase()] = cId;
  });

  invoices.forEach((inv: any) => {
    const total = Number(inv.amount || 0);
    const paid = Number(inv.paidAmount || 0);
    let targetId = inv.clientId ? inv.clientId.toString() : null;
    if (!targetId && inv.clientName)
      targetId = nameToId[inv.clientName.toLowerCase()];

    const entryId = targetId || inv.clientId || inv.clientName || "unknown";
    if (!clientDues[entryId]) {
      clientDues[entryId] = {
        id: entryId,
        name: inv.clientName || "Unknown",
        totalBilled: 0,
        received: 0,
        pending: 0,
      };
    }
    clientDues[entryId].totalBilled += total;
    clientDues[entryId].received += paid;
    clientDues[entryId].pending += total - paid;
  });

  return NextResponse.json({
    title: "Outstanding Dues Report",
    period: { from: startDate, to: endDate },
    details: Object.values(clientDues).sort((a, b) => b.pending - a.pending),
  });
}

async function getExpenseStatement(startDate: Date, endDate: Date) {
  const expensesCol = await svc.getCollection("expenses");
  const expenses = await expensesCol
    .find(getDateQuery("createdAt", startDate, endDate))
    .toArray();
  const totalExpenses = expenses.reduce(
    (acc, curr: any) => acc + Number(curr.amount || 0),
    0,
  );

  const byCategory: Record<string, number> = {};
  expenses.forEach((exp: any) => {
    const cat = exp.category || "Uncategorized";
    byCategory[cat] = (byCategory[cat] || 0) + Number(exp.amount || 0);
  });

  return NextResponse.json({
    title: "Expense Statement",
    period: { from: startDate, to: endDate },
    summary: { totalExpenses },
    byCategory: Object.entries(byCategory).map(([k, v]) => ({
      category: k,
      amount: v,
    })),
    details: expenses.map((exp: any) => ({
      date: exp.createdAt,
      reference: exp.id || "-",
      party: exp.vendor || exp.paidTo || "-",
      description: exp.description || exp.category,
      amount: exp.amount,
      type: "Debit",
    })),
  });
}

async function getStaffReport(
  startDate: Date,
  endDate: Date,
  staffMemberId?: string | null,
) {
  const tasksCol = await svc.getCollection("tasks");
  const dateQuery = getDateQuery("createdAt", startDate, endDate);

  if (staffMemberId && staffMemberId !== "all") {
    let staffName: string | null = null;
    try {
      const member = await svc.findById("team-members", staffMemberId);
      staffName = member?.name ?? null;
    } catch (_) {}

    const nameFilter = staffName
      ? { $or: [{ assigneeId: staffMemberId }, { assigneeName: staffName }] }
      : { assigneeId: staffMemberId };

    const tasks = await tasksCol
      .find({ $and: [dateQuery, nameFilter] })
      .toArray();

    let completed = 0;
    let pending = 0;
    tasks.forEach((task: any) => {
      const s = (task.status || "pending").toLowerCase();
      if (s === "done" || s === "completed") completed++;
      else pending++;
    });

    const projectsCol = await svc.getCollection("projects");
    const allProjects = await projectsCol.find({}).toArray();

    const staffEarnings: any[] = [];
    allProjects.forEach((p: any) => {
      const assignees: any[] = Array.isArray(p.assignees) ? p.assignees : [];
      const isAssigned = assignees.some((a: any) => {
        if (typeof a === "string") {
          return a === staffName || a === staffMemberId;
        }
        return (
          a?.name === staffName ||
          String(a?.id) === staffMemberId ||
          String(a?._id) === staffMemberId
        );
      });
      if (isAssigned) {
        const totalAmount = Number(p.amount || 0);
        const assigneeCount = assignees.length || 1;
        const myShare = Math.round(totalAmount / assigneeCount);
        staffEarnings.push({
          projectId: p._id?.toString(),
          projectTitle: p.title || "Untitled",
          client: p.client || p.clientName || "—",
          status: (p.status || "UNKNOWN").toUpperCase(),
          totalAmount,
          myShare,
          progress: Number(p.progress || 0),
          createdAt: p.createdAt,
        });
      }
    });

    const expensesCol = await svc.getCollection("expenses");
    const salaryExpenses = await expensesCol
      .find({
        $and: [
          { category: { $regex: /^salary$/i } },
          {
            $or: [
              { staffMemberId: staffMemberId },
              ...(staffName ? [{ staffName: staffName }] : []),
            ],
          },
        ],
      })
      .toArray();

    const payouts = salaryExpenses
      .map((e: any) => ({
        date: e.date || e.createdAt,
        amount: Number(e.amount || 0),
        paymentMethod: e.paymentMethod || "—",
        linkedProjectId: e.linkedProjectId || "",
        linkedProjectTitle: e.linkedProjectTitle || "—",
        note: e.note || e.reference || "",
        status: e.status || "paid",
      }))
      .sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

    const totalEarnings = staffEarnings.reduce((s, e) => s + e.myShare, 0);
    const totalPayouts = payouts.reduce((s: number, p: any) => s + p.amount, 0);

    return NextResponse.json({
      title: `Staff Report — ${staffName || staffMemberId}`,
      period: { from: startDate, to: endDate },
      isSingleStaff: true,
      staffName: staffName || staffMemberId,
      summary: { total: tasks.length, completed, pending },
      details: tasks.map((t: any) => ({
        title: t.title,
        status: t.status,
        priority: t.priority,
        createdAt: t.createdAt,
      })),
      earnings: staffEarnings,
      earningsSummary: { totalProjects: staffEarnings.length, totalEarnings },
      payouts,
      payoutSummary: { totalPayouts, count: payouts.length },
    });
  }

  const tasks = await tasksCol.find(dateQuery).toArray();

  const stats: Record<string, any> = {};
  tasks.forEach((task: any) => {
    const assignee = task.assigneeName || "Unassigned";
    if (!stats[assignee])
      stats[assignee] = { name: assignee, completed: 0, pending: 0, total: 0 };
    stats[assignee].total++;
    const status = (task.status || "pending").toLowerCase();
    if (status === "done" || status === "completed")
      stats[assignee].completed++;
    else stats[assignee].pending++;
  });

  return NextResponse.json({
    title: "Staff Performance Report",
    period: { from: startDate, to: endDate },
    isSingleStaff: false,
    details: Object.values(stats),
  });
}

async function getClientReport(
  startDate: Date,
  endDate: Date,
  clientId?: string | null,
) {
  const invoicesCol = await svc.getCollection("invoices");

  let query: any = getDateQuery("createdAt", startDate, endDate);

  if (clientId && clientId !== "all") {
    const client = await svc.findById("clients", clientId);
    const clientName = client?.name;

    query = {
      $and: [
        query,
        {
          $or: [
            { clientId: clientId },
            ...(clientName ? [{ clientName: clientName }] : []),

            ...(clientId.length === 24
              ? [{ clientId: new ObjectId(clientId) }]
              : []),
          ],
        },
      ],
    };
  }

  const invoices = await invoicesCol.find(query).toArray();

  if (clientId && clientId !== "all") {
    let totalBilled = 0;
    let received = 0;
    let pending = 0;

    const paymentDetails: any[] = [];

    const details = invoices.map((inv: any) => {
      const amount = Number(inv.amount || 0);
      const paid = Number(inv.paidAmount || 0);

      totalBilled += amount;
      received += paid;
      pending += amount - paid;

      if (inv.paymentHistory && inv.paymentHistory.length > 0) {
        inv.paymentHistory.forEach((payment: any) => {
          const pDate = new Date(payment.date);

          if (pDate >= startDate && pDate <= endDate) {
            paymentDetails.push({
              date: payment.date,
              invoiceNo: inv.invoiceNo || inv.id,
              mode: payment.mode || "Other",
              amount: Number(payment.amount || 0),
              remarks: payment.remarks || "-",
            });
          }
        });
      }

      return {
        date: inv.createdAt,
        invoiceNo: inv.invoiceNo || inv.id,
        description: inv.title || "Invoice",
        amount: amount,
        paid: paid,
        status: inv.status,
      };
    });

    paymentDetails.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return NextResponse.json({
      title: "Client Statement",
      period: { from: startDate, to: endDate },
      isSingleClient: true,
      summary: {
        totalBilled,
        received,
        pending,
        invoiceCount: invoices.length,
      },
      details,
      paymentDetails,
    });
  }

  const clientStats: Record<string, any> = {};
  invoices.forEach((inv: any) => {
    const client = inv.clientName || "Unknown Client";
    if (!clientStats[client]) {
      clientStats[client] = {
        name: client,
        totalBilled: 0,
        received: 0,
        pending: 0,
        invoiceCount: 0,
      };
    }
    const amount = Number(inv.amount || 0);
    const paid = Number(inv.paidAmount || 0);
    clientStats[client].totalBilled += amount;
    clientStats[client].received += paid;
    clientStats[client].pending += amount - paid;
    clientStats[client].invoiceCount += 1;
  });

  return NextResponse.json({
    title: "Client Financial Report",
    period: { from: startDate, to: endDate },
    isSingleClient: false,
    details: Object.values(clientStats),
  });
}

async function getTaskReport(startDate: Date, endDate: Date) {
  const tasksCol = await svc.getCollection("tasks");
  const tasks = await tasksCol
    .find(getDateQuery("createdAt", startDate, endDate))
    .toArray();

  const statusStats: Record<string, number> = {};
  tasks.forEach((t: any) => {
    const s = t.status || "no-status";
    statusStats[s] = (statusStats[s] || 0) + 1;
  });

  return NextResponse.json({
    title: "Task Report",
    period: { from: startDate, to: endDate },
    summary: {
      totalTasks: tasks.length,
      byStatus: Object.entries(statusStats).map(([status, count]) => ({
        status,
        count,
      })),
    },
    details: tasks.map((t) => ({
      title: t.title,
      status: t.status,
      priority: t.priority,
      assignee: t.assigneeName,
      createdAt: t.createdAt,
    })),
  });
}

async function getProjectReport(startDate: Date, endDate: Date) {
  const projectsCol = await svc.getCollection("projects");
  const projects = await projectsCol
    .find(getDateQuery("createdAt", startDate, endDate))
    .toArray();

  const statusStats: Record<string, number> = {};
  let totalAmount = 0;
  let completedAmount = 0;
  let totalProgress = 0;

  projects.forEach((p: any) => {
    const s = (p.status || "UNKNOWN").toUpperCase();
    statusStats[s] = (statusStats[s] || 0) + 1;
    totalAmount += Number(p.amount || 0);
    if (s === "COMPLETED") completedAmount += Number(p.amount || 0);
    totalProgress += Number(p.progress || 0);
  });

  const avgProgress =
    projects.length > 0 ? Math.round(totalProgress / projects.length) : 0;

  return NextResponse.json({
    title: "Project Status Report",
    period: { from: startDate, to: endDate },
    summary: {
      totalProjects: projects.length,
      totalAmount,
      completedAmount,
      avgProgress,
      byStatus: Object.entries(statusStats).map(([status, count]) => ({
        status,
        count,
      })),
    },
    details: projects.map((p: any) => ({
      title: p.title,
      client: p.client || p.clientName || "—",
      status: (p.status || "UNKNOWN").toUpperCase(),
      progress: Number(p.progress || 0),
      amount: Number(p.amount || 0),
      assignees: Array.isArray(p.assignees)
        ? p.assignees
            .map((a: any) => (typeof a === "string" ? a : (a?.name ?? "—")))
            .join(", ")
        : "—",
      createdAt: p.createdAt,
      description: p.description || "",
    })),
  });
}
