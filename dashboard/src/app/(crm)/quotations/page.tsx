"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Quotation, Project } from "@/lib/data";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Download, FileText, CheckCircle2, Clock, IndianRupee, Loader2, Check, X } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/currency";
import { useAuth } from "@/hooks/use-auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

if (typeof window !== "undefined" && !(window as any).__projectsStore) {
  (window as any).__projectsStore = [];
}

function WhatsAppLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <path d="M34.5 13.4C32 10.9 28.7 9.5 25.2 9.5c-7.3 0-13.2 5.9-13.2 13.2 0 2.3.6 4.6 1.8 6.6L12 38.5l9.4-2.5c1.9 1 4 1.6 6.2 1.6h.1c7.3 0 13.2-5.9 13.2-13.2-.1-3.5-1.5-6.8-4.4-9zm-9.3 20.3h-.1c-2 0-3.9-.5-5.6-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4c-1.1-1.7-1.7-3.7-1.7-5.8 0-5.9 4.8-10.7 10.7-10.7 2.9 0 5.5 1.1 7.5 3.1s3.1 4.7 3.1 7.5c0 5.9-4.8 10.7-10.7 10.7l.6.3zm5.9-8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.4 4.7.8.3 1.4.5 1.8.7.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.1-1.5.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.5z" fill="white"/>
    </svg>
  );
}

function GmailLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 39.5h7V23.3L2 14.5v21A4 4 0 0 0 4.5 39.5z" fill="#4285F4"/>
      <path d="M36.5 39.5h7a4 4 0 0 0 2.5-3.7v-21l-9.5 8.8z" fill="#34A853"/>
      <path d="M36.5 10.5v12.8L46 14.5V12a6 6 0 0 0-9.5-4.8z" fill="#FBBC05"/>
      <path d="M11.5 23.3V10.5L24 20.3l12.5-9.8v12.8L24 33.1z" fill="#EA4335"/>
      <path d="M2 12v2.5l9.5 8.8V10.5L9.5 7.2A6 6 0 0 0 2 12z" fill="#C5221F"/>
    </svg>
  );
}

export default function QuotationsPage() {
  const router = useRouter();
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [clientsMap, setClientsMap] = useState<Record<string, any>>({});

  const { toast } = useToast();
  const { user } = useAuth();

  const isClient = user?.role === "client";
  const myClientId = (user as any)?.clientId ?? null;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const url =
          isClient && myClientId
            ? `/api/quotations?clientId=${myClientId}`
            : "/api/quotations";
        const res = await apiFetch(url);
        if (!res.ok)
          throw new Error(`Failed to fetch quotations: ${res.status}`);
        const items = await res.json();
        if (mounted) setQuotations(items as Quotation[]);
      } catch (err) {
        console.error("Failed to load quotations", err);
      }
    })();

    if (!isClient) {
      (async () => {
        try {
          const res = await apiFetch("/api/clients");
          if (!res.ok) return;
          const list = await res.json();
          const map: Record<string, any> = {};
          for (const c of list || []) {
            if (c._id) map[String(c._id)] = c;
            if (c.id) map[String(c.id)] = c;
          }
          if (mounted) setClientsMap(map);
        } catch (e) {}
      })();
    }

    return () => {
      mounted = false;
    };
  }, [isClient, myClientId]);

  const persistStatus = async (quote: Quotation, newStatus: string) => {
    const token = localStorage.getItem("auth_token") || "";
    try {
      const id = (quote as any).id || (quote as any)._id;
      if (!id) throw new Error("No id to update");
      const res = await apiFetch(`/api/quotations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ ...quote, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setQuotations((prev) =>
        prev.map((q) =>
          ((q as any).id &&
            (updated as any).id &&
            (q as any).id === (updated as any).id) ||
          ((q as any)._id &&
            (updated as any)._id &&
            String((q as any)._id) === String((updated as any)._id))
            ? updated
            : q,
        ),
      );
      toast({ title: "Updated", description: "Quotation status saved." });
    } catch (err: any) {
      console.error("Failed to persist status", err);
      toast({
        title: "Failed",
        description: err?.message || "Could not update status",
      });
    }
  };

  const updateStatus = (id: string, status: "APPROVED" | "REJECTED") => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q)),
    );
  };

  const deleteQuotation = async (id: string) => {
    const token = localStorage.getItem("auth_token") || "";
    try {
      const res = await apiFetch("/api/quotations/" + id, {
        method: "DELETE",
        headers: token ? { Authorization: "Bearer " + token } : {},
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Failed to delete");
      }
      setQuotations((prev) => prev.filter((q) => q.id !== id));
      toast({ title: "Deleted", description: "Quotation deleted." });
    } catch (e: any) {
      console.error("Failed to delete quotation", e);
      toast({ title: "Failed", description: e.message || "Could not delete" });
    }
  };

  const createProjectFromQuote = (quote: Quotation) => {
    const servicesList = quote.services ?? [];
    const newProject: Project = {
      id: new Date().getTime(),
      title: `New Project for ${quote.clientName}`,
      client: quote.clientName,
      progress: 0,
      description: `Project created from quotation ${
        quote.id
      }. Services: ${servicesList.map((s) => s.name).join(", ")}`,
    };

    (window as any).__projectsStore.push(newProject);

    toast({
      title: "Project Created!",
      description: `A new project has been created for ${quote.clientName}.`,
    });
  };

  const generatePdf = (quote: Quotation) => {
    const quoteAny = quote as any;
    const id = quoteAny._id || quoteAny.id || quote.id;
    // Open the view page — the user prints from there exactly as seen
    router.push(`/quotations/${id}/view`);
  };

  const [sendingEmail, setSendingEmail] = useState<string | null>(null);

  // Progress modal state
  type WaStep = "generating" | "uploading" | "sending" | "done" | "error";
  const [waModal, setWaModal] = useState<{ open: boolean; step: WaStep; error?: string }>({ open: false, step: "generating" });

  const generateQuotationPdf = async (quote: Quotation, _clientData: any): Promise<{ blob: Blob; base64: string; filename: string }> => {
    const quotationId = (quote as any)._id || (quote as any).id || quote.id;
    const res = await apiFetch("/api/generate-quotation-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quotationId }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as any)?.error || "PDF generation failed");
    }
    const blob = await res.blob();
    const filename = res.headers.get("X-Filename") || `${(quote as any).quoteId || quotationId}.pdf`;
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
      reader.readAsDataURL(blob);
    });
    return { blob, base64, filename };
  };

  const sendWhatsApp = async (quote: Quotation) => {
    const client = clientsMap[String(quote.clientId)];
    const phone = client?.phone || client?.whatsapp;
    if (!phone) {
      toast({ title: "No phone number", description: "This client has no phone number saved." });
      return;
    }

    setWaModal({ open: true, step: "generating" });
    try {
      const clientName = client?.businessName || client?.name || (quote as any).clientName || "Client";
      const grandTotal = (quote.services || []).reduce((s: number, sv: any) => s + (Number(sv.price || 0) * Number(sv.qty || 1)), 0);

      // Step 1 — generate PDF (native jsPDF, no canvas, tiny file)
      const { blob, filename } = await generateQuotationPdf(quote, client);

      // Step 2 — upload to WhatsApp media
      setWaModal({ open: true, step: "uploading" });
      const form = new FormData();
      form.append("file", new Blob([blob], { type: "application/pdf" }), filename);
      const uploadRes = await apiFetch("/api/upload-whatsapp-media", { method: "POST", body: form });
      if (!uploadRes.ok) {
        const err = await uploadRes.json().catch(() => ({}));
        throw new Error((err as any)?.error || "Failed to upload PDF to WhatsApp");
      }
      const { mediaId } = await uploadRes.json();
      if (!mediaId) throw new Error("No media_id returned from upload");

      // Step 3 — send via template
      setWaModal({ open: true, step: "sending" });
      const rawDigits = phone.replace(/\D/g, "");
      const normalizedPhone = phone.trim().startsWith("+")
        ? rawDigits
        : rawDigits.length === 10
          ? "91" + rawDigits
          : rawDigits;
      const res = await apiFetch("/api/send-invoice-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: normalizedPhone,
          clientName,
          invNo: (quote as any).quoteId || quote.id || "QUOTE",
          amount: `Rs.${grandTotal.toLocaleString("en-IN")}`,
          filename,
          mediaId,
          templateName: process.env.NEXT_PUBLIC_QUOTATION_WA_TEMPLATE || "quotation_send",
          extraBodyParams: [
            { type: "text", parameter_name: "project_title", text: (quote as any).title || "Project Quotation" },
          ],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "WhatsApp send failed");

      setWaModal({ open: true, step: "done" });
    } catch (e: any) {
      setWaModal({ open: true, step: "error", error: e.message || "Could not send WhatsApp message." });
    }
  };

  const sendEmail = async (quote: Quotation) => {
    const quoteId = String((quote as any)._id || (quote as any).id || "");
    const client = clientsMap[String(quote.clientId)];
    const to = client?.email || (quote as any).clientEmail;
    if (!to) {
      toast({ title: "No email", description: "This client has no email address saved." });
      return;
    }
    setSendingEmail(quoteId);
    try {
      // Generate PDF first
      const { base64, filename } = await generateQuotationPdf(quote, client);

      const settingsRes = await apiFetch("/api/settings");
      const settings = settingsRes.ok ? await settingsRes.json() : {};

      const res = await apiFetch("/api/send-quotation-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          pdfBase64: base64,
          pdfFilename: filename,
          clientName: client?.businessName || client?.name || (quote as any).clientName || "Client",
          agencyName: settings?.name,
          agencyPhone: settings?.phone,
          agencyEmail: settings?.email,
          agencyWebsite: settings?.website,
          quotation: {
            quoteId: (quote as any).quoteId || quote.id,
            title: (quote as any).title,
            date: (quote as any).date,
            services: quote.services,
            timeline: (quote as any).timeline,
            paymentTerms: (quote as any).paymentTerms,
            notes: (quote as any).notes,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      toast({ title: "Email Sent", description: `Quotation PDF emailed to ${to}.` });
    } catch (e: any) {
      toast({ title: "Email Failed", description: e.message || "Could not send email." });
    } finally {
      setSendingEmail(null);
    }
  };

  const getAuthorName = (authorId: number | undefined) => {
    return "Unknown";
  };

  const WA_STEPS: { key: WaStep; label: string }[] = [
    { key: "generating", label: "Generating PDF" },
    { key: "uploading",  label: "Uploading to WhatsApp" },
    { key: "sending",    label: "Sending message" },
    { key: "done",       label: "Sent successfully!" },
  ];
  const waStepIndex = WA_STEPS.findIndex(s => s.key === waModal.step);

  return (
    <div className="space-y-8 font-headline">

      {/* ── WhatsApp Progress Modal ── */}
      {waModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white border-[3px] border-black shadow-[6px_6px_0px_#111] w-full max-w-sm mx-4 p-7">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <svg width="22" height="22" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="#25D366"/>
                  <path d="M34.5 13.4C32 10.9 28.7 9.5 25.2 9.5c-7.3 0-13.2 5.9-13.2 13.2 0 2.3.6 4.6 1.8 6.6L12 38.5l9.4-2.5c1.9 1 4 1.6 6.2 1.6h.1c7.3 0 13.2-5.9 13.2-13.2-.1-3.5-1.5-6.8-4.4-9z" fill="white"/>
                </svg>
                <span className="font-black text-[15px] uppercase tracking-wide">Sending via WhatsApp</span>
              </div>
              {(waModal.step === "done" || waModal.step === "error") && (
                <button onClick={() => setWaModal({ open: false, step: "generating" })} className="text-gray-400 hover:text-black transition-colors">
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="space-y-3">
              {WA_STEPS.slice(0, 3).map((s, i) => {
                const isDone = waModal.step === "error" ? false : (waStepIndex > i || waModal.step === "done");
                const isActive = waModal.step === s.key;
                const isError = waModal.step === "error" && waStepIndex === i;
                return (
                  <div key={s.key} className="flex items-center gap-3">
                    <div className={`w-7 h-7 border-[2px] flex items-center justify-center flex-shrink-0 ${
                      isDone ? "border-black bg-black" :
                      isError ? "border-red-600 bg-red-600" :
                      isActive ? "border-black" : "border-gray-300"
                    }`}>
                      {isDone && <Check size={14} className="text-white" strokeWidth={3} />}
                      {isError && <X size={14} className="text-white" strokeWidth={3} />}
                      {isActive && !isError && <Loader2 size={14} className="text-black animate-spin" />}
                    </div>
                    <span className={`text-sm font-bold uppercase tracking-wide ${
                      isDone ? "text-black" :
                      isError ? "text-red-600" :
                      isActive ? "text-black" : "text-gray-400"
                    }`}>{s.label}</span>
                  </div>
                );
              })}
            </div>

            {waModal.step === "done" && (
              <div className="mt-5 border-t-[2px] border-black pt-4 flex items-center gap-2">
                <div className="w-7 h-7 border-[2px] border-black bg-black flex items-center justify-center">
                  <Check size={14} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-sm font-black uppercase tracking-wide text-black">Sent successfully!</span>
              </div>
            )}

            {waModal.step === "error" && (
              <div className="mt-5 border-t-[2px] border-red-600 pt-4">
                <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">Error</p>
                <p className="text-sm text-red-700">{waModal.error}</p>
              </div>
            )}

            {(waModal.step === "done" || waModal.step === "error") && (
              <button
                onClick={() => setWaModal({ open: false, step: "generating" })}
                className="mt-5 w-full bg-black text-white text-xs font-black uppercase tracking-widest py-2.5 hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}

      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">QUOTATIONS</h1>
          <p className="text-muted-foreground text-lg">
            {isClient
              ? "View your quotations from us."
              : "Create, send, and track client quotations."}
          </p>
        </div>
        {!isClient && (
          <div className="flex gap-2">
            <Button
              size="lg"
              className="text-lg bg-[#F36F21] hover:bg-[#d85e1a]"
              onClick={() => router.push("/quotations/create")}
            >
              New Professional Quotation
            </Button>
          </div>
        )}
      </header>

      {!isClient && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { icon: FileText, label: "TOTAL QUOTES", value: quotations.length, sub: `${quotations.length} records` },
            { icon: CheckCircle2, label: "ACCEPTED", value: quotations.filter((q: any) => q.status === "accepted").length, sub: "approved" },
            { icon: Clock, label: "PENDING", value: quotations.filter((q: any) => !q.status || q.status === "pending" || q.status === "sent").length, sub: "awaiting response" },
            { icon: IndianRupee, label: "TOTAL VALUE", value: `₹${quotations.reduce((s: number, q: any) => s + Number(q.total ?? q.amount ?? 0), 0).toLocaleString()}`, sub: "all quotes" },
          ].map(({ icon, label, value, sub }, i) => (
            <StatCard key={label} icon={icon} label={label} value={value} sub={sub} iconVariant={i % 2 === 0 ? "primary" : "secondary"} />
          ))}
        </div>
      )}

      <div className="hidden md:block border-2 border-black rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-black bg-gray-50">
                <TableHead className="text-xs sm:text-sm font-bold">
                  Quote ID / Title
                </TableHead>
                <TableHead className="text-xs sm:text-sm font-bold">
                  Client
                </TableHead>
                <TableHead className="text-xs sm:text-sm font-bold">
                  Date
                </TableHead>
                <TableHead className="text-xs sm:text-sm font-bold">
                  Services
                </TableHead>
                <TableHead className="text-xs sm:text-sm font-bold">
                  Modules
                </TableHead>
                <TableHead className="text-base font-bold text-right">
                  Total Amount
                </TableHead>
                <TableHead className="text-base font-bold text-center">
                  Status
                </TableHead>
                <TableHead className="text-base font-bold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotations.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No quotations found. Create your first quotation to get
                    started.
                  </TableCell>
                </TableRow>
              ) : (
                quotations.map((quote, idx) => {
                  const servicesTotal = (quote.services || []).reduce(
                    (sum: number, item: any) => {
                      const fromAmount = Number(item?.amount ?? NaN);
                      const fromTotal = Number(item?.total ?? NaN);
                      const fromPriceQty =
                        item?.price && item?.qty
                          ? Number(item.price) * Number(item.qty)
                          : NaN;
                      const fromUnitPriceQty =
                        item?.unitPrice && item?.qty
                          ? Number(item.unitPrice) * Number(item.qty)
                          : NaN;
                      const val =
                        Number.isFinite(fromAmount) && !Number.isNaN(fromAmount)
                          ? fromAmount
                          : Number.isFinite(fromTotal) &&
                              !Number.isNaN(fromTotal)
                            ? fromTotal
                            : Number.isFinite(fromPriceQty) &&
                                !Number.isNaN(fromPriceQty)
                              ? fromPriceQty
                              : Number.isFinite(fromUnitPriceQty) &&
                                  !Number.isNaN(fromUnitPriceQty)
                                ? fromUnitPriceQty
                                : 0;
                      return sum + val;
                    },
                    0,
                  );
                  const totalAmount = servicesTotal || quote.amount || 0;

                  return (
                    <TableRow
                      key={quote._id ?? quote.id ?? idx}
                      className="border-b border-gray-200 last:border-b-0 hover:bg-orange-50 transition-colors"
                    >
                      <TableCell className="py-4 max-w-xs">
                        <div className="font-bold text-base text-[#F36F21]">
                          {(quote as any).quoteId ||
                            quote.id ||
                            `PN-${String(idx + 1).padStart(5, "0")}`}
                        </div>
                        <div className="text-sm font-semibold text-gray-900 mt-1 truncate">
                          {(quote as any).title || "Untitled Project"}
                        </div>
                        {(quote as any).subtitle && (
                          <div className="text-xs text-gray-600 mt-0.5 truncate">
                            {(quote as any).subtitle}
                          </div>
                        )}
                      </TableCell>

                      <TableCell className="py-4">
                        <div className="font-bold text-gray-900">
                          {(quote.clientId &&
                            clientsMap[String(quote.clientId)]?.businessName) ||
                            (quote.clientId &&
                              clientsMap[String(quote.clientId)]?.name) ||
                            quote.clientName ||
                            "Client"}
                        </div>
                        {quote.clientId &&
                          clientsMap[String(quote.clientId)]?.email && (
                            <div className="text-xs text-gray-600 mt-0.5">
                              {clientsMap[String(quote.clientId)].email}
                            </div>
                          )}
                      </TableCell>

                      <TableCell className="py-4">
                        <div className="text-sm text-gray-900">
                          {(quote as any).date
                            ? new Date((quote as any).date).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "N/A"}
                        </div>
                      </TableCell>

                      <TableCell className="py-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {quote.services && quote.services.length > 0 ? (
                            quote.services
                              .slice(0, 3)
                              .map((s: any, sidx: number) => (
                                <Badge
                                  key={`${String(
                                    s._id ?? s.id ?? s.serviceName ?? "service",
                                  )}-${sidx}`}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {s.serviceName || s.name || "Service"}
                                </Badge>
                              ))
                          ) : (
                            <span className="text-xs text-gray-500">
                              No services
                            </span>
                          )}
                          {quote.services && quote.services.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{quote.services.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="py-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {(quote as any).modules &&
                          (quote as any).modules.length > 0 ? (
                            (quote as any).modules
                              .slice(0, 2)
                              .map((m: any, midx: number) => (
                                <Badge
                                  key={`${String(
                                    m._id ?? m.id ?? m.moduleName ?? "module",
                                  )}-${midx}`}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {m.moduleName || "Module"}
                                </Badge>
                              ))
                          ) : (
                            <span className="text-xs text-gray-500">
                              No modules
                            </span>
                          )}
                          {(quote as any).modules &&
                            (quote as any).modules.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{(quote as any).modules.length - 2}
                              </Badge>
                            )}
                        </div>
                      </TableCell>

                      <TableCell className="text-right font-bold text-base py-4">
                        {formatCurrency(totalAmount)}
                      </TableCell>

                      <TableCell className="text-center py-4">
                        {isClient ? (
                          <span
                            className={cn(
                              "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                              quote.status === "APPROVED" &&
                                "bg-green-100 text-green-800",
                              quote.status === "REJECTED" &&
                                "bg-red-100 text-red-800",
                              (!quote.status || quote.status === "PENDING") &&
                                "bg-yellow-100 text-yellow-800",
                            )}
                          >
                            {quote.status || "PENDING"}
                          </span>
                        ) : (
                          <Select
                            value={quote.status || "PENDING"}
                            onValueChange={(v) => {
                              setQuotations((prev) =>
                                prev.map((q) => {
                                  const same =
                                    (q as any)._id && (quote as any)._id
                                      ? String((q as any)._id) ===
                                        String((quote as any)._id)
                                      : (q as any).id && (quote as any).id
                                        ? (q as any).id === (quote as any).id
                                        : false;
                                  return same ? { ...q, status: v as any } : q;
                                }),
                              );
                              persistStatus(quote, v);
                            }}
                          >
                            <SelectTrigger
                              className={cn(
                                "h-9 px-3 font-semibold text-xs w-[110px]",
                                quote.status === "APPROVED" &&
                                  "bg-green-100 text-green-800 border-green-300",
                                quote.status === "REJECTED" &&
                                  "bg-red-100 text-red-800 border-red-300",
                                (!quote.status || quote.status === "PENDING") &&
                                  "bg-yellow-100 text-yellow-800 border-yellow-300",
                              )}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PENDING">PENDING</SelectItem>
                              <SelectItem value="APPROVED">APPROVED</SelectItem>
                              <SelectItem value="REJECTED">REJECTED</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </TableCell>

                      <TableCell className="text-right py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8"
                            onClick={() =>
                              router.push(
                                `/quotations/${
                                  (quote as any)._id || (quote as any).id
                                }/view`,
                              )
                            }
                          >
                            View
                          </Button>

                          {!isClient && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 border-[#25D366] hover:bg-[#f0fff4] disabled:opacity-50"
                              title="Send quotation via WhatsApp"
                              disabled={waModal.open && waModal.step !== "done" && waModal.step !== "error"}
                              onClick={() => sendWhatsApp(quote)}
                            >
                              <WhatsAppLogo size={16} />
                            </Button>
                          )}

                          {!isClient && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                              title="Send quotation via Email"
                              disabled={sendingEmail === String((quote as any)._id || (quote as any).id)}
                              onClick={() => sendEmail(quote)}
                            >
                              {sendingEmail === String((quote as any)._id || (quote as any).id) ? (
                                <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <GmailLogo size={16} />
                              )}
                            </Button>
                          )}

                          {!isClient && quote.status === "APPROVED" && (
                            <Button
                              size="sm"
                              className="bg-[#F36F21] hover:bg-[#d85e1a] h-8"
                              onClick={() => createProjectFromQuote(quote)}
                            >
                              Create Project
                            </Button>
                          )}

                          {!isClient && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    const id =
                                      (quote as any)._id || (quote as any).id;
                                    if (
                                      id &&
                                      window.confirm(
                                        "Are you sure you want to delete this quotation?",
                                      )
                                    ) {
                                      deleteQuotation(String(id));
                                    }
                                  }}
                                  className="text-destructive font-semibold"
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {quotations.length === 0 && <div className="border-2 border-black p-8 text-center text-muted-foreground font-bold">No quotations found.</div>}
        {quotations.map((quote, idx) => {
          const qid = (quote as any)._id || (quote as any).id;
          const servicesTotal = (quote.services || []).reduce((sum: number, item: any) => {
            const v = Number(item?.amount ?? item?.total ?? (item?.price && item?.qty ? Number(item.price) * Number(item.qty) : item?.unitPrice && item?.qty ? Number(item.unitPrice) * Number(item.qty) : 0));
            return sum + (Number.isFinite(v) ? v : 0);
          }, 0);
          const totalAmount = servicesTotal || quote.amount || 0;
          const clientName = (quote.clientId && clientsMap[String(quote.clientId)]?.businessName) || (quote.clientId && clientsMap[String(quote.clientId)]?.name) || quote.clientName || "Client";
          return (
            <div key={qid ?? idx} className="border-2 border-black bg-white">
              <div className="divide-y divide-gray-100">
                <div className="px-3 py-2">
                  <div className="font-bold text-base text-[#F36F21]">{(quote as any).quoteId || (quote as any).id || `PN-${String(idx + 1).padStart(5, "0")}`}</div>
                  <div className="font-semibold text-sm">{(quote as any).title || "Untitled Project"}</div>
                </div>
                <div className="flex justify-between items-center px-3 py-2">
                  <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Client</span>
                  <span className="text-sm font-bold text-right flex-1">{clientName}</span>
                </div>
                <div className="flex justify-between items-center px-3 py-2">
                  <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Amount</span>
                  <span className="font-black text-base">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between items-center px-3 py-2">
                  <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Date</span>
                  <span className="text-sm">{(quote as any).date ? new Date((quote as any).date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "N/A"}</span>
                </div>
                {quote.services && quote.services.length > 0 && (
                  <div className="px-3 py-2">
                    <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase block mb-1">Services</span>
                    <div className="flex flex-wrap gap-1">
                      {quote.services.slice(0, 3).map((s: any, si: number) => <Badge key={si} variant="secondary" className="text-xs">{s.serviceName || s.name || "Service"}</Badge>)}
                      {quote.services.length > 3 && <Badge variant="outline" className="text-xs">+{quote.services.length - 3} more</Badge>}
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center px-3 py-2">
                  <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase min-w-[80px]">Status</span>
                  {isClient ? (
                    <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", quote.status === "APPROVED" && "bg-green-100 text-green-800", quote.status === "REJECTED" && "bg-red-100 text-red-800", (!quote.status || quote.status === "PENDING") && "bg-yellow-100 text-yellow-800")}>{quote.status || "PENDING"}</span>
                  ) : (
                    <Select value={quote.status || "PENDING"} onValueChange={(v) => { setQuotations((prev) => prev.map((q) => { const same = (q as any)._id && (quote as any)._id ? String((q as any)._id) === String((quote as any)._id) : (q as any).id && (quote as any).id ? (q as any).id === (quote as any).id : false; return same ? { ...q, status: v as any } : q; })); persistStatus(quote, v); }}>
                      <SelectTrigger className={cn("h-8 px-2 font-semibold text-xs w-[110px]", quote.status === "APPROVED" && "bg-green-100 text-green-800 border-green-300", quote.status === "REJECTED" && "bg-red-100 text-red-800 border-red-300", (!quote.status || quote.status === "PENDING") && "bg-yellow-100 text-yellow-800 border-yellow-300")}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">PENDING</SelectItem>
                        <SelectItem value="APPROVED">APPROVED</SelectItem>
                        <SelectItem value="REJECTED">REJECTED</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
              <div className="border-t-2 border-black bg-gray-50 px-3 py-2 flex items-center gap-2 flex-wrap">
                <Button size="sm" variant="outline" className="h-8 text-xs border-2 border-black font-bold" onClick={() => router.push(`/quotations/${qid}/view`)}>View</Button>
                {!isClient && quote.status === "APPROVED" && <Button size="sm" className="bg-[#F36F21] hover:bg-[#d85e1a] h-8 text-xs" onClick={() => createProjectFromQuote(quote)}>Create Project</Button>}
                {!isClient && <Button size="sm" variant="ghost" className="h-8 text-xs text-red-600 hover:text-red-700 ml-auto" onClick={() => { if (qid && window.confirm("Delete this quotation?")) deleteQuotation(String(qid)); }}>Delete</Button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
