"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Download, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import html2canvas from "html2canvas";

type ReportType = "income" | "expense" | "staff" | "client" | "task" | "dues" | "project";

export default function ReportsPage() {
  const { user } = useAuth();
  const isClient = user?.role === "client";
  const myClientId = (user as any)?.clientId ?? null;

  const [reportType, setReportType] = useState<ReportType>("income");
  const [date, setDate] = useState<{ from: Date; to: Date } | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of month
    to: new Date(),
  });
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [clientId, setClientId] = useState<string>("all");
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [staffMemberId, setStaffMemberId] = useState<string>("all");
  const reportRef = useRef<HTMLDivElement>(null);

  // For client role: auto-set report type to "client" and lock to their clientId
  useEffect(() => {
    if (isClient && myClientId) {
      setReportType("client");
      setClientId(String(myClientId));
    }
  }, [isClient, myClientId]);

  // Fetch clients on mount
  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch(console.error);
  }, []);

  // Fetch team members on mount
  useEffect(() => {
    fetch("/api/team-members")
      .then((res) => res.json())
      .then((data) => setTeamMembers(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  // Helper to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const fetchReport = async () => {
    if (!date?.from || !date?.to) return;
    setLoading(true);
    try {
      const query = new URLSearchParams({
        type: reportType,
        from: date.from.toISOString(),
        to: date.to.toISOString(),
        clientId: clientId,
        staffMemberId: staffMemberId,
      });
      const res = await fetch(`/api/reports?${query}`);
      if (!res.ok) throw new Error("Failed to fetch report");
      const data = await res.json();
      setReportData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) {
      alert("Report not available");
      return;
    }

    try {
      // Capture the report as canvas
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        allowTaint: true,
      });

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          alert("Failed to generate PDF");
          return;
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `report-${reportType}-${format(new Date(), "yyyy-MM-dd")}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  // Non-admin, non-client users: deny access
  if (user && user.role !== "admin" && user.role !== "client") {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
          <p className="text-muted-foreground">Only admins can view reports.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto print:p-0">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            {isClient ? "View your account statement and payment history." : "Generate financial and operational reports."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button onClick={handleDownloadPDF} disabled={!reportData}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="print:hidden">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            {!isClient && (
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium">Report Type</label>
              <Select
                value={reportType}
                onValueChange={(v) => {
                  setReportType(v as ReportType);
                  setReportData(null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income Statement</SelectItem>
                  <SelectItem value="expense">Expense Statement</SelectItem>
                  <SelectItem value="client">Client Report</SelectItem>
                  <SelectItem value="dues">Dues Report</SelectItem>
                  <SelectItem value="staff">Staff Report</SelectItem>
                  <SelectItem value="task">Task Report</SelectItem>
                  <SelectItem value="project">Project Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            )}

            {isClient && (
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Report Type</label>
                <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-medium">
                  My Account Statement
                </div>
              </div>
            )}

            {reportType === "client" && !isClient && (
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Client (Optional)</label>
                <Select value={clientId} onValueChange={(v) => setClientId(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Clients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Clients</SelectItem>
                    {clients.map((c) => (
                      <SelectItem
                        key={c._id || c.id}
                        value={String(c._id || c.id)}
                      >
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {reportType === "staff" && !isClient && (
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium">Staff Member</label>
                <Select value={staffMemberId} onValueChange={(v) => setStaffMemberId(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Staff" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Staff</SelectItem>
                    {teamMembers.map((m) => (
                      <SelectItem
                        key={m._id || m.id}
                        value={String(m._id || m.id)}
                      >
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium">Date Range</label>
              <div className="flex gap-2">
                <div className="grid gap-1.5">
                  <span className="text-xs text-muted-foreground">From</span>
                  <input
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={date?.from ? format(date.from, "yyyy-MM-dd") : ""}
                    onChange={(e) =>
                      setDate((prev) => ({
                        ...prev!,
                        from: e.target.value
                          ? new Date(e.target.value)
                          : new Date(),
                      }))
                    }
                  />
                </div>
                <div className="grid gap-1.5">
                  <span className="text-xs text-muted-foreground">To</span>
                  <input
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={date?.to ? format(date.to, "yyyy-MM-dd") : ""}
                    onChange={(e) =>
                      setDate((prev) => ({
                        ...prev!,
                        to: e.target.value
                          ? new Date(e.target.value)
                          : new Date(),
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <Button onClick={fetchReport} disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Generate Report"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Display - Tally Format */}
      {reportData && (
        <Card
          ref={reportRef}
          className="print:shadow-none print:border-none mt-6 border-2 border-black"
        >
          <CardHeader className="pb-0 print:pb-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-dashed border-black pb-6 gap-4">
              <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter">
                  Kalahanu Tech
                </h1>
                <p className="text-muted-foreground font-medium">
                  Studio CRM Reporting
                </p>
                <div className="mt-2 text-sm text-neutral-500 space-y-0.5">
                  <p>123 Creative Avenue, Tech City</p>
                  <p>contact@kalahanu.com | +91 98765 43210</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="inline-block px-4 py-1 rounded-full bg-black text-white font-bold text-sm uppercase mb-2">
                  {reportType.replace("-", " ")} Report
                </span>
                <div className="text-sm font-medium border border-black px-3 py-1 rounded-md bg-neutral-50">
                  <span className="text-neutral-500 mr-2">Period:</span>
                  {format(
                    new Date(reportData.period.from),
                    "dd MMM yyyy",
                  )} - {format(new Date(reportData.period.to), "dd MMM yyyy")}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Generated on: {format(new Date(), "PPP p")}
                </p>
              </div>
            </div>

            {/* Summary Section */}
            {reportType === "income" && (
              <div className="grid grid-cols-3 gap-4 mt-4 text-left border-t border-b border-gray-200 py-4 font-mono text-sm">
                <div>
                  <span className="block text-muted-foreground">
                    Total Revenue
                  </span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(reportData.summary.totalRevenue)}
                  </span>
                </div>
                <div>
                  <span className="block text-muted-foreground">
                    Total Expenses
                  </span>
                  <span className="font-bold text-red-600">
                    {formatCurrency(reportData.summary.totalExpenses)}
                  </span>
                </div>
                <div>
                  <span className="block text-muted-foreground">
                    Net Income
                  </span>
                  <span
                    className={cn(
                      "font-bold",
                      reportData.summary.netIncome >= 0
                        ? "text-green-600"
                        : "text-red-600",
                    )}
                  >
                    {formatCurrency(reportData.summary.netIncome)}
                  </span>
                </div>
              </div>
            )}
            {reportType === "expense" && (
              <div className="grid grid-cols-1 gap-4 mt-4 text-left border-t border-b border-gray-200 py-4 font-mono text-sm">
                <div>
                  <span className="block text-muted-foreground">
                    Total Expenses
                  </span>
                  <span className="font-bold text-red-600">
                    {formatCurrency(reportData.summary.totalExpenses)}
                  </span>
                </div>
              </div>
            )}
            {reportType === "task" && (
              <div className="grid grid-cols-3 gap-4 mt-4 text-left border-t border-b border-gray-200 py-4 font-mono text-sm">
                <div>
                  <span className="block text-muted-foreground">
                    Total Tasks
                  </span>
                  <span className="font-bold">
                    {reportData.summary.totalTasks}
                  </span>
                </div>
              </div>
            )}
            {reportType === "project" && (
              <div className="grid grid-cols-4 gap-4 mt-4 text-left border-t border-b border-gray-200 py-4 font-mono text-sm">
                <div>
                  <span className="block text-muted-foreground">Total Projects</span>
                  <span className="font-bold">{reportData.summary.totalProjects}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Avg Progress</span>
                  <span className="font-bold text-blue-600">{reportData.summary.avgProgress}%</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Total Value</span>
                  <span className="font-bold text-green-700">{formatCurrency(reportData.summary.totalAmount)}</span>
                </div>
                <div>
                  <span className="block text-muted-foreground">Completed Value</span>
                  <span className="font-bold text-green-600">{formatCurrency(reportData.summary.completedAmount)}</span>
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-6 font-mono text-sm overflow-x-auto">
            {/* Income / Expense Table */}
            {(reportType === "income" || reportType === "expense") && (
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-black">
                    <TableHead className="w-[100px] font-bold text-black">
                      Date
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Reference
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Party
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Description
                    </TableHead>
                    <TableHead className="text-right font-bold text-black">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.details.map((row: any, i: number) => (
                    <TableRow
                      key={i}
                      className="border-b border-gray-100 hover:bg-muted/50"
                    >
                      <TableCell>
                        {format(new Date(row.date), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>{row.reference}</TableCell>
                      <TableCell>{row.party}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(row.amount)}
                        {row.type === "Debit" && (
                          <span className="text-xs text-muted-foreground ml-1">
                            (Dr)
                          </span>
                        )}
                        {row.type === "Credit" && (
                          <span className="text-xs text-muted-foreground ml-1">
                            (Cr)
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Footer Total */}
                  <TableRow className="bg-muted/30 font-bold border-t-2 border-black">
                    <TableCell colSpan={4} className="text-right uppercase">
                      Total
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(
                        reportType === "income"
                          ? reportData.summary.totalRevenue
                          : reportData.summary.totalExpenses,
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}

            {/* Client Table */}
            {reportType === "client" &&
              (reportData.isSingleClient ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-black">
                        <TableHead className="font-bold text-black">
                          Date
                        </TableHead>
                        <TableHead className="font-bold text-black">
                          Ref
                        </TableHead>
                        <TableHead className="font-bold text-black">
                          Description
                        </TableHead>
                        <TableHead className="font-bold text-black">
                          Status
                        </TableHead>
                        <TableHead className="text-right font-bold text-black">
                          Amount
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportData.details.map((row: any, i: number) => (
                        <TableRow key={i} className="border-b border-gray-100">
                          <TableCell>
                            {format(new Date(row.date), "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell>{row.invoiceNo}</TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(row.amount)}
                          </TableCell>
                        </TableRow>
                      ))}
                      {/* Summary Rows */}
                      <TableRow className="bg-muted/30 font-bold border-t-2 border-black">
                        <TableCell colSpan={4} className="text-right uppercase">
                          Total Billed
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(reportData.summary.totalBilled)}
                        </TableCell>
                      </TableRow>
                      <TableRow className="bg-muted/30 font-bold">
                        <TableCell
                          colSpan={4}
                          className="text-right uppercase text-green-600"
                        >
                          Received
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          {formatCurrency(reportData.summary.received)}
                        </TableCell>
                      </TableRow>
                      <TableRow className="bg-muted/30 font-bold">
                        <TableCell
                          colSpan={4}
                          className="text-right uppercase text-red-600"
                        >
                          Pending
                        </TableCell>
                        <TableCell className="text-right text-red-600">
                          {formatCurrency(reportData.summary.pending)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  {/* Payment Receipts Table - Tally Style */}
                  {reportData.paymentDetails &&
                    reportData.paymentDetails.length > 0 && (
                      <div className="mt-8 pt-6 border-t-4 border-black">
                        <h3 className="text-xl font-black uppercase mb-4 tracking-tight">
                          Payment Receipts Register
                        </h3>
                        <Table>
                          <TableHeader>
                            <TableRow className="border-b-2 border-black bg-neutral-100">
                              <TableHead className="font-bold text-black">
                                Date
                              </TableHead>
                              <TableHead className="font-bold text-black">
                                Invoice Ref
                              </TableHead>
                              <TableHead className="font-bold text-black">
                                Payment Mode
                              </TableHead>
                              <TableHead className="text-right font-bold text-black">
                                Amount Received
                              </TableHead>
                              <TableHead className="font-bold text-black">
                                Remarks
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {reportData.paymentDetails.map(
                              (payment: any, i: number) => (
                                <TableRow
                                  key={i}
                                  className="border-b border-gray-100 hover:bg-green-50/30"
                                >
                                  <TableCell className="font-medium">
                                    {format(
                                      new Date(payment.date),
                                      "dd/MM/yyyy",
                                    )}
                                  </TableCell>
                                  <TableCell className="font-mono text-sm">
                                    {payment.invoiceNo}
                                  </TableCell>
                                  <TableCell>
                                    <span className="inline-block px-2 py-1 text-xs font-bold uppercase bg-blue-50 text-blue-700 rounded border border-blue-200">
                                      {payment.mode}
                                    </span>
                                  </TableCell>
                                  <TableCell className="text-right font-bold text-green-700">
                                    {formatCurrency(payment.amount)}
                                    <span className="text-xs text-muted-foreground ml-1">
                                      (Cr)
                                    </span>
                                  </TableCell>
                                  <TableCell className="text-sm text-muted-foreground italic">
                                    {payment.remarks}
                                  </TableCell>
                                </TableRow>
                              ),
                            )}
                            {/* Total Received Row */}
                            <TableRow className="bg-green-50 font-bold border-t-2 border-black">
                              <TableCell
                                colSpan={3}
                                className="text-right uppercase"
                              >
                                Total Received
                              </TableCell>
                              <TableCell className="text-right text-green-700 text-lg">
                                {formatCurrency(
                                  reportData.paymentDetails.reduce(
                                    (sum: number, p: any) =>
                                      sum + Number(p.amount || 0),
                                    0,
                                  ),
                                )}
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    )}
                </>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-black">
                      <TableHead className="font-bold text-black">
                        Client Name
                      </TableHead>
                      <TableHead className="text-right font-bold text-black">
                        Invoices
                      </TableHead>
                      <TableHead className="text-right font-bold text-black">
                        Total Billed
                      </TableHead>
                      <TableHead className="text-right font-bold text-black">
                        Received
                      </TableHead>
                      <TableHead className="text-right font-bold text-black">
                        Pending
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.details.map((row: any, i: number) => (
                      <TableRow key={i} className="border-b border-gray-100">
                        <TableCell className="font-bold">{row.name}</TableCell>
                        <TableCell className="text-right">
                          {row.invoiceCount}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(row.totalBilled)}
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          {formatCurrency(row.received)}
                        </TableCell>
                        <TableCell className="text-right text-red-600">
                          {formatCurrency(row.pending)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ))}

            {/* Staff Table */}
            {reportType === "staff" && (
              reportData.isSingleStaff ? (
                // Detailed task list for a specific staff member
                <>
                  {/* Summary cards */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="border-2 border-black p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Total Tasks</p>
                      <p className="text-3xl font-black mt-1">{reportData.summary.total}</p>
                    </div>
                    <div className="border-2 border-black p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Completed</p>
                      <p className="text-3xl font-black mt-1 text-green-600">{reportData.summary.completed}</p>
                    </div>
                    <div className="border-2 border-black p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Pending</p>
                      <p className="text-3xl font-black mt-1 text-yellow-600">{reportData.summary.pending}</p>
                    </div>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-black">
                        <TableHead className="font-bold text-black">Task Title</TableHead>
                        <TableHead className="font-bold text-black">Status</TableHead>
                        <TableHead className="font-bold text-black">Priority</TableHead>
                        <TableHead className="text-right font-bold text-black">Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reportData.details.map((row: any, i: number) => {
                        const statusCls: Record<string, string> = {
                          done: "bg-green-100 text-green-800",
                          completed: "bg-green-100 text-green-800",
                          "in-progress": "bg-blue-100 text-blue-800",
                          pending: "bg-yellow-100 text-yellow-800",
                          todo: "bg-gray-100 text-gray-700",
                        };
                        const priorityCls: Record<string, string> = {
                          high: "bg-red-100 text-red-700",
                          medium: "bg-yellow-100 text-yellow-700",
                          low: "bg-green-100 text-green-700",
                        };
                        const sc = statusCls[(row.status || "").toLowerCase()] ?? "bg-gray-100 text-gray-700";
                        const pc = priorityCls[(row.priority || "").toLowerCase()] ?? "bg-gray-100 text-gray-700";
                        return (
                          <TableRow key={i} className={`border-b border-gray-100 hover:bg-muted/50 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                            <TableCell className="font-medium">{row.title}</TableCell>
                            <TableCell>
                              <span className={`text-xs font-black px-2 py-0.5 capitalize ${sc}`}>
                                {(row.status || "").replace("-", " ")}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={`text-xs font-black px-2 py-0.5 capitalize ${pc}`}>
                                {row.priority || "—"}
                              </span>
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground">
                              {row.createdAt ? format(new Date(row.createdAt), "dd/MM/yyyy") : "—"}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>

                  {/* ── Earnings by Booking / Project ── */}
                  <div className="mt-8 pt-6 border-t-4 border-black">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-black uppercase tracking-tight">Earnings by Booking</h3>
                      {reportData.earningsSummary && (
                        <div className="flex gap-4 text-sm font-mono">
                          <span className="border border-black px-3 py-1">
                            <span className="text-muted-foreground mr-1">Projects:</span>
                            <span className="font-black">{reportData.earningsSummary.totalProjects}</span>
                          </span>
                          <span className="border border-green-600 bg-green-50 text-green-700 px-3 py-1">
                            <span className="mr-1">Total Share:</span>
                            <span className="font-black">{formatCurrency(reportData.earningsSummary.totalEarnings)}</span>
                          </span>
                        </div>
                      )}
                    </div>
                    {reportData.earnings && reportData.earnings.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b-2 border-black bg-neutral-100">
                            <TableHead className="font-bold text-black">Project / Booking</TableHead>
                            <TableHead className="font-bold text-black">Client</TableHead>
                            <TableHead className="font-bold text-black">Status</TableHead>
                            <TableHead className="font-bold text-black">Progress</TableHead>
                            <TableHead className="text-right font-bold text-black">Total Value</TableHead>
                            <TableHead className="text-right font-bold text-black">My Share</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {reportData.earnings.map((row: any, i: number) => {
                            const statusColors: Record<string, string> = {
                              COMPLETED: "bg-green-100 text-green-800",
                              "IN PROGRESS": "bg-blue-100 text-blue-800",
                              PENDING: "bg-yellow-100 text-yellow-800",
                              CANCELLED: "bg-red-100 text-red-800",
                            };
                            const sc = statusColors[row.status] ?? "bg-gray-100 text-gray-800";
                            return (
                              <TableRow key={i} className={`border-b border-gray-100 hover:bg-green-50/30 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                                <TableCell className="font-bold">{row.projectTitle}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">{row.client}</TableCell>
                                <TableCell>
                                  <span className={`text-xs font-black px-2 py-0.5 uppercase tracking-widest ${sc}`}>
                                    {row.status}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 bg-gray-200 h-1.5 rounded-full">
                                      <div
                                        className={`h-1.5 rounded-full ${row.progress >= 100 ? "bg-green-500" : row.progress >= 50 ? "bg-blue-500" : "bg-yellow-500"}`}
                                        style={{ width: `${Math.min(row.progress, 100)}%` }}
                                      />
                                    </div>
                                    <span className="text-xs font-bold">{row.progress}%</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground">{formatCurrency(row.totalAmount)}</TableCell>
                                <TableCell className="text-right font-black text-green-700">{formatCurrency(row.myShare)}</TableCell>
                              </TableRow>
                            );
                          })}
                          <TableRow className="bg-green-50 font-bold border-t-2 border-black">
                            <TableCell colSpan={5} className="text-right uppercase">Total Earnings Share</TableCell>
                            <TableCell className="text-right text-green-700 text-lg font-black">
                              {formatCurrency(reportData.earningsSummary?.totalEarnings || 0)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-gray-200">
                        <p className="font-semibold">No project bookings found for this staff member.</p>
                      </div>
                    )}
                  </div>

                  {/* ── Payout History ── */}
                  <div className="mt-8 pt-6 border-t-4 border-black">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-black uppercase tracking-tight">Payout History</h3>
                      {reportData.payoutSummary && (
                        <div className="flex gap-4 text-sm font-mono">
                          <span className="border border-black px-3 py-1">
                            <span className="text-muted-foreground mr-1">Payouts:</span>
                            <span className="font-black">{reportData.payoutSummary.count}</span>
                          </span>
                          <span className="border border-amber-600 bg-amber-50 text-amber-700 px-3 py-1">
                            <span className="mr-1">Total Paid Out:</span>
                            <span className="font-black">{formatCurrency(reportData.payoutSummary.totalPayouts)}</span>
                          </span>
                        </div>
                      )}
                    </div>
                    {reportData.payouts && reportData.payouts.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b-2 border-black bg-neutral-100">
                            <TableHead className="font-bold text-black">Date</TableHead>
                            <TableHead className="font-bold text-black">Linked Booking</TableHead>
                            <TableHead className="font-bold text-black">Payment Mode</TableHead>
                            <TableHead className="font-bold text-black">Status</TableHead>
                            <TableHead className="font-bold text-black">Note / Reference</TableHead>
                            <TableHead className="text-right font-bold text-black">Amount Paid</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {reportData.payouts.map((row: any, i: number) => (
                            <TableRow key={i} className={`border-b border-gray-100 hover:bg-amber-50/30 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                              <TableCell className="font-medium whitespace-nowrap">
                                {row.date ? format(new Date(row.date), "dd/MM/yyyy") : "—"}
                              </TableCell>
                              <TableCell className="text-sm">
                                {row.linkedProjectTitle && row.linkedProjectTitle !== "—"
                                  ? <span className="font-semibold">{row.linkedProjectTitle}</span>
                                  : <span className="text-muted-foreground italic">General Salary</span>
                                }
                              </TableCell>
                              <TableCell>
                                <span className="inline-block px-2 py-1 text-xs font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                                  {row.paymentMethod}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className={`text-xs font-black px-2 py-0.5 uppercase ${row.status === "paid" ? "bg-green-100 text-green-800" : row.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-700"}`}>
                                  {row.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground italic">{row.note || "—"}</TableCell>
                              <TableCell className="text-right font-black text-amber-700">{formatCurrency(row.amount)}</TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="bg-amber-50 font-bold border-t-2 border-black">
                            <TableCell colSpan={5} className="text-right uppercase">Total Paid Out</TableCell>
                            <TableCell className="text-right text-amber-700 text-lg font-black">
                              {formatCurrency(reportData.payoutSummary?.totalPayouts || 0)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-gray-200">
                        <p className="font-semibold">No salary payouts recorded for this staff member yet.</p>
                        <p className="text-xs mt-1">Add a salary expense with this staff member linked to track payouts.</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // Summary table for all staff
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-black">
                      <TableHead className="font-bold text-black">Staff Member</TableHead>
                      <TableHead className="text-right font-bold text-black">Total Tasks</TableHead>
                      <TableHead className="text-right font-bold text-black">Completed</TableHead>
                      <TableHead className="text-right font-bold text-black">Pending</TableHead>
                      <TableHead className="text-right font-bold text-black">Completion %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.details.map((row: any, i: number) => (
                      <TableRow key={i} className={`border-b border-gray-100 hover:bg-muted/50 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                        <TableCell className="font-bold">{row.name || "Unassigned"}</TableCell>
                        <TableCell className="text-right">{row.total}</TableCell>
                        <TableCell className="text-right text-green-600 font-bold">{row.completed}</TableCell>
                        <TableCell className="text-right text-yellow-600 font-bold">{row.pending}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 bg-gray-200 h-1.5 rounded-full">
                              <div
                                className="bg-green-500 h-1.5 rounded-full"
                                style={{ width: `${row.total > 0 ? Math.round((row.completed / row.total) * 100) : 0}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold">
                              {row.total > 0 ? Math.round((row.completed / row.total) * 100) : 0}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )
            )}

            {/* Task Table */}
            {reportType === "task" && (
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-black">
                    <TableHead className="font-bold text-black">
                      Task Title
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Status
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Priority
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Assignee
                    </TableHead>
                    <TableHead className="text-right font-bold text-black">
                      Due Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.details.map((row: any, i: number) => (
                    <TableRow key={i} className="border-b border-gray-100">
                      <TableCell className="font-medium">{row.title}</TableCell>
                      <TableCell>
                        <span className="capitalize">
                          {row.status.replace("-", " ")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">{row.priority}</span>
                      </TableCell>
                      <TableCell>{row.assignee || "-"}</TableCell>
                      <TableCell className="text-right">
                        {row.dueDate
                          ? format(new Date(row.dueDate), "dd/MM/yyyy")
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* Project Summary Cards */}
            {reportType === "project" && reportData?.summary && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="border-2 border-black p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Total Projects</p>
                    <p className="text-3xl font-black mt-1">{reportData.summary.totalProjects}</p>
                  </div>
                  <div className="border-2 border-black p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Avg Progress</p>
                    <p className="text-3xl font-black mt-1 text-blue-600">{reportData.summary.avgProgress}%</p>
                  </div>
                  <div className="border-2 border-black p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Total Value</p>
                    <p className="text-3xl font-black mt-1 text-green-700">{formatCurrency(reportData.summary.totalAmount)}</p>
                  </div>
                  <div className="border-2 border-black p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Completed Value</p>
                    <p className="text-3xl font-black mt-1 text-green-600">{formatCurrency(reportData.summary.completedAmount)}</p>
                  </div>
                </div>

                {/* Status breakdown pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {reportData.summary.byStatus.map((s: any) => {
                    const colors: Record<string, string> = {
                      COMPLETED: "bg-green-100 text-green-800 border-green-300",
                      "IN PROGRESS": "bg-blue-100 text-blue-800 border-blue-300",
                      PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
                      CANCELLED: "bg-red-100 text-red-800 border-red-300",
                    };
                    const cls = colors[s.status] ?? "bg-gray-100 text-gray-800 border-gray-300";
                    return (
                      <span key={s.status} className={`inline-flex items-center gap-2 px-3 py-1 border text-xs font-black uppercase tracking-widest ${cls}`}>
                        {s.status} <span className="text-base font-black">{s.count}</span>
                      </span>
                    );
                  })}
                </div>

                {/* Project details table */}
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-black">
                      <TableHead className="font-bold text-black">Project</TableHead>
                      <TableHead className="font-bold text-black">Client</TableHead>
                      <TableHead className="font-bold text-black">Status</TableHead>
                      <TableHead className="font-bold text-black">Progress</TableHead>
                      <TableHead className="font-bold text-black">Assignees</TableHead>
                      <TableHead className="text-right font-bold text-black">Amount</TableHead>
                      <TableHead className="text-right font-bold text-black">Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.details.map((row: any, i: number) => {
                      const statusColors: Record<string, string> = {
                        COMPLETED: "bg-green-100 text-green-800",
                        "IN PROGRESS": "bg-blue-100 text-blue-800",
                        PENDING: "bg-yellow-100 text-yellow-800",
                        CANCELLED: "bg-red-100 text-red-800",
                      };
                      const sc = statusColors[row.status] ?? "bg-gray-100 text-gray-800";
                      return (
                        <TableRow key={i} className={`border-b border-gray-100 hover:bg-muted/50 ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
                          <TableCell>
                            <div className="font-bold text-sm">{row.title}</div>
                            {row.description && (
                              <div className="text-xs text-muted-foreground line-clamp-1 max-w-[180px]">{row.description}</div>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{row.client}</TableCell>
                          <TableCell>
                            <span className={`text-xs font-black px-2 py-0.5 uppercase tracking-widest ${sc}`}>
                              {row.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 h-2 rounded-full min-w-[60px]">
                                <div
                                  className={`h-2 rounded-full ${
                                    row.progress >= 100
                                      ? "bg-green-500"
                                      : row.progress >= 50
                                      ? "bg-blue-500"
                                      : "bg-yellow-500"
                                  }`}
                                  style={{ width: `${Math.min(row.progress, 100)}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold whitespace-nowrap">{row.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{row.assignees}</TableCell>
                          <TableCell className="text-right font-bold">{formatCurrency(row.amount)}</TableCell>
                          <TableCell className="text-right text-sm text-muted-foreground">
                            {row.createdAt ? format(new Date(row.createdAt), "dd/MM/yyyy") : "—"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {/* Total row */}
                    <TableRow className="bg-muted/30 font-bold border-t-2 border-black">
                      <TableCell colSpan={5} className="text-right uppercase">Total Project Value</TableCell>
                      <TableCell className="text-right">{formatCurrency(reportData.summary.totalAmount)}</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </>
            )}

            {/* Dues Table */}
            {reportType === "dues" && (
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-black">
                    <TableHead className="font-bold text-black">
                      Client Name
                    </TableHead>
                    <TableHead className="text-right font-bold text-black">
                      Total Billed
                    </TableHead>
                    <TableHead className="text-right font-bold text-black">
                      Received
                    </TableHead>
                    <TableHead className="text-right font-bold text-black">
                      Pending (Dues)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.details.map((row: any, i: number) => (
                    <TableRow key={i} className="border-b border-gray-100">
                      <TableCell className="font-bold">{row.name}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(row.totalBilled)}
                      </TableCell>
                      <TableCell className="text-right text-green-600">
                        {formatCurrency(row.received)}
                      </TableCell>
                      <TableCell className="text-right font-bold text-red-600">
                        {formatCurrency(row.pending)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
