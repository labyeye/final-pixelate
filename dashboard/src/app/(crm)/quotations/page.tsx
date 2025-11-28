"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import type { Quotation, Project } from "@/lib/data";
import { cn } from "@/lib/utils";
// Quick quotation dialog removed per request
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { QuotationPDF } from "@/components/quotations/quotation-pdf";
import { formatCurrency } from "@/lib/currency";
import { renderToString } from "react-dom/server";
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

// This is a global state hack for demo purposes.
if (typeof window !== "undefined" && !(window as any).__projectsStore) {
  (window as any).__projectsStore = [];
}

export default function QuotationsPage() {
  const router = useRouter();
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [clientsMap, setClientsMap] = useState<Record<string, any>>({});

  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/quotations");
        if (!res.ok)
          throw new Error(`Failed to fetch quotations: ${res.status}`);
        const items = await res.json();
        if (mounted) setQuotations(items as Quotation[]);
      } catch (err) {
        console.error("Failed to load quotations", err);
      }
    })();

    // also load clients once for display in the table
    (async () => {
      try {
        const res = await fetch("/api/clients");
        if (!res.ok) return;
        const list = await res.json();
        const map: Record<string, any> = {};
        for (const c of list || []) {
          if (c._id) map[String(c._id)] = c;
          if (c.id) map[String(c.id)] = c;
        }
        if (mounted) setClientsMap(map);
      } catch (e) {
        // ignore
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Persist a status change to the server and update local state
  const persistStatus = async (quote: Quotation, newStatus: string) => {
    const token = localStorage.getItem("auth_token") || "";
    try {
      const id = (quote as any).id || (quote as any)._id;
      if (!id) throw new Error("No id to update");
      const res = await fetch(`/api/quotations/${id}`, {
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
            : q
        )
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
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
  };

  const deleteQuotation = async (id: string) => {
    const token = localStorage.getItem("auth_token") || "";
    try {
      const res = await fetch("/api/quotations/" + id, {
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
      id: new Date().getTime(), // simple unique id
      title: `New Project for ${quote.clientName}`,
      client: quote.clientName,
      progress: 0,
      description: `Project created from quotation ${
        quote.id
      }. Services: ${servicesList.map((s) => s.name).join(", ")}`,
    };

    // This is a global state hack for demo purposes.
    (window as any).__projectsStore.push(newProject);

    toast({
      title: "Project Created!",
      description: `A new project has been created for ${quote.clientName}.`,
    });
  };

  const generatePdf = (quote: Quotation) => {
    (async () => {
      try {
        // try to fetch client data so the PDF has full client details
        let client = undefined;
        if (quote.clientId) {
          const res = await fetch(`/api/clients/${quote.clientId}`);
          if (res.ok) client = await res.json();
        }
        // Use A4 paper (portrait) in mm so the PDF fills the page properly
        const doc = new jsPDF({
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        });
        try {
          const { loadNotoSansForJsPDF } = await import("@/lib/pdf-fonts");
          const family = await loadNotoSansForJsPDF(doc, "NotoSans");
          if (family) {
            try {
              doc.setFont(family);
            } catch (e) {}
          }
          const notoHref =
            "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap";
          if (typeof document !== "undefined") {
            if (!document.querySelector(`link[href="${notoHref}"]`)) {
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = notoHref;
              document.head.appendChild(link);
            }
            try {
              await (document as any).fonts.load('1em "Noto Sans"');
              await (document as any).fonts.ready;
            } catch (e) {}
          }
          const displayId =
            quote.id ||
            (quote._id
              ? `PN-${String(
                  quotations.findIndex((q) => q === quote) + 1
                ).padStart(5, "0")}`
              : undefined);
          const pdfBody = renderToString(
            <QuotationPDF quote={quote} client={client} displayId={displayId} />
          );
          let styledHtml: string;
          const fontLinkTag = `<link href="${notoHref}" rel="stylesheet">`;
          try {
            const fres = await fetch("/fonts/NotoSans-Regular.ttf");
            if (fres && fres.ok) {
              const arrayBuffer = await fres.arrayBuffer();
              const bytes = new Uint8Array(arrayBuffer);
              let binary = "";
              const chunkSize = 0x8000;
              for (let i = 0; i < bytes.length; i += chunkSize) {
                binary += String.fromCharCode.apply(
                  null,
                  Array.from(bytes.slice(i, i + chunkSize)) as any
                );
              }
              const base64 =
                typeof btoa !== "undefined"
                  ? btoa(binary)
                  : Buffer.from(binary, "binary").toString("base64");
              const fontDataFace = `
                <style>
                  @font-face {
                    font-family: 'Noto Sans Local';
                    src: url('data:font/truetype;base64,${base64}') format('truetype');
                    font-weight: 400;
                    font-style: normal;
                    font-display: swap;
                  }
                </style>
              `;
              // fill the entire A4 page (210mm x 297mm)
              styledHtml = `${fontDataFace}${fontLinkTag}<div style="width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;">${pdfBody}</div>`;
            } else {
              const localFontFace = `
                <style>
                  @font-face {
                    font-family: 'Noto Sans Local';
                    src: url('/fonts/NotoSans-Regular.ttf') format('truetype');
                    font-weight: 400;
                    font-style: normal;
                    font-display: swap;
                  }
                  @font-face {
                    font-family: 'Noto Sans Local';
                    src: url('/fonts/NotoSans-Bold.ttf') format('truetype');
                    font-weight: 700;
                    font-style: normal;
                    font-display: swap;
                  }
                </style>
              `;
              styledHtml = `${localFontFace}${fontLinkTag}<div style="width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;font-family:'Noto Sans Local','Noto Sans',${
                family ? family : "sans-serif"
              };">${pdfBody}</div>`;
            }
          } catch (e) {
            styledHtml = `${fontLinkTag}<div style="width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;font-family:'Noto Sans',${
              family ? family : "sans-serif"
            };">${pdfBody}</div>`;
          }

          // Replace rupee glyphs with ASCII 'Rs.' to avoid missing glyphs in PDFs
          const finalHtml = styledHtml.replace(/₹/g, "Rs.");

          // Render to occupy the full page. Use the document's page width so
          // units are consistent with the jsPDF instance (we created with mm).
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();

          doc.html(finalHtml, {
            callback: function (doc) {
              doc.save(`Quotation-${quote.id}.pdf`);
            },
            x: 0,
            y: 0,
            width: pageWidth,
            windowWidth: 1200,
          });
        } catch (e) {
          // if font loading fails, fall back to rendering without explicit font
          const pdfContent = renderToString(
            <QuotationPDF quote={quote} client={client} />
          );
          const finalPdfContent = String(pdfContent).replace(/₹/g, "Rs.");
          const pageWidth = doc.internal.pageSize.getWidth();
          doc.html(finalPdfContent, {
            callback: function (doc) {
              doc.save(`Quotation-${quote.id}.pdf`);
            },
            x: 0,
            y: 0,
            width: pageWidth,
            windowWidth: 1200,
          });
        }
      } catch (e) {
        console.error("Failed to generate PDF", e);
        toast({ title: "Failed", description: "Could not generate PDF" });
      }
    })();
  };

  const getAuthorName = (authorId: number | undefined) => {
    // we don't fetch users here for performance; return unknown when not provided
    return "Unknown";
  };

  return (
    <div className="space-y-8 font-headline">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black tracking-tighter">QUOTATIONS</h1>
          <p className="text-muted-foreground text-lg">
            Create, send, and track client quotations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="lg"
            className="text-lg bg-[#F36F21] hover:bg-[#d85e1a]"
            onClick={() => router.push("/quotations/create")}
          >
            New Professional Quotation
          </Button>
          {/* Quick Quotation removed — professional flow only */}
        </div>
      </header>

      <div className="border-2 border-black rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black bg-gray-50">
              <TableHead className="text-base font-bold">
                Quote ID / Title
              </TableHead>
              <TableHead className="text-base font-bold">Client</TableHead>
              <TableHead className="text-base font-bold">Date</TableHead>
              <TableHead className="text-base font-bold">Services</TableHead>
              <TableHead className="text-base font-bold">Modules</TableHead>
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
                // Calculate total from services if available.
                // Support multiple possible service shapes: { amount }, { total }, or { price, qty }
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
                        : Number.isFinite(fromTotal) && !Number.isNaN(fromTotal)
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
                  0
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
                              }
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
                                  s._id ?? s.id ?? s.serviceName ?? "service"
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
                                  m._id ?? m.id ?? m.moduleName ?? "module"
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
                            })
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
                              "bg-yellow-100 text-yellow-800 border-yellow-300"
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
                              }/view`
                            )
                          }
                        >
                          View
                        </Button>

                        {quote.status === "APPROVED" && (
                          <Button
                            size="sm"
                            className="bg-[#F36F21] hover:bg-[#d85e1a] h-8"
                            onClick={() => createProjectFromQuote(quote)}
                          >
                            Create Project
                          </Button>
                        )}

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
                                  confirm(
                                    "Are you sure you want to delete this quotation?"
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
  );
}
