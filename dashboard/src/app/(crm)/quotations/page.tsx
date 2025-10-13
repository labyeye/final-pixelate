"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import type { Quotation, Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AddQuotationDialog } from "@/components/quotations/add-quotation-dialog";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// This is a global state hack for demo purposes.
if (typeof window !== "undefined" && !(window as any).__projectsStore) {
  (window as any).__projectsStore = [];
}

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [clientsMap, setClientsMap] = useState<Record<string, any>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quotation | null>(null);
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

  const addQuotation = async (newQuoteData: any) => {
    if (!user) return;
    try {
      const token = localStorage.getItem("auth_token") || "";
      // If editing an existing quotation (editingQuote set), call PUT
      if (editingQuote) {
        const editId = (editingQuote as any).id || (editingQuote as any)._id;
        const res = await fetch("/api/quotations/" + editId, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: "Bearer " + token } : {}),
          },
          body: JSON.stringify(newQuoteData),
        });
        if (!res.ok) throw new Error("Failed to update quotation");
        const updated = await res.json();
        setQuotations((prev) => prev.map((q) => ((q.id && updated.id && q.id === updated.id) || (q._id && updated._id && String(q._id) === String(updated._id))) ? updated : q));
        setEditingQuote(null);
        toast({ title: "Quotation updated", description: "Quotation saved." });
      } else {
        const res = await fetch("/api/quotations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: "Bearer " + token } : {}),
          },
          body: JSON.stringify({
            ...newQuoteData,
            status: "PENDING",
            authorId: user.id,
          }),
        });
        if (!res.ok) throw new Error("Failed to create quotation");
        const created = await res.json();
        setQuotations((prev) => [created, ...prev]);
        toast({
          title: "Quotation created",
          description: "Quotation saved to server.",
        });
      }
    } catch (e) {
      console.error("Failed to create quotation", e);
      toast({ title: "Failed", description: "Could not create quotation" });
    }
  };

  // Persist a status change to the server and update local state
  const persistStatus = async (quote: Quotation, newStatus: string) => {
    const token = localStorage.getItem("auth_token") || "";
    try {
      const id = (quote as any).id || (quote as any)._id;
      if (!id) throw new Error("No id to update");
      const res = await fetch(`/api/quotations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ ...quote, status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updated = await res.json();
      setQuotations((prev) => prev.map((q) => ((q as any).id && (updated as any).id && (q as any).id === (updated as any).id) || ((q as any)._id && (updated as any)._id && String((q as any)._id) === String((updated as any)._id)) ? updated : q));
      toast({ title: 'Updated', description: 'Quotation status saved.' });
    } catch (err: any) {
      console.error('Failed to persist status', err);
      toast({ title: 'Failed', description: err?.message || 'Could not update status' });
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
        <AddQuotationDialog
          isOpen={isDialogOpen}
          setIsOpen={(v) => {
            setIsDialogOpen(v);
            if (!v) setEditingQuote(null);
          }}
          onAddQuotation={addQuotation}
          initialValues={editingQuote || undefined}
        >
          <Button size="lg" className="text-lg">
            New Quotation
          </Button>
        </AddQuotationDialog>
      </header>

      <div className="border-2 border-black">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black">
              <TableHead className="text-base font-bold">Details</TableHead>
              <TableHead className="text-base font-bold">Client</TableHead>
              <TableHead className="text-base font-bold">Services</TableHead>
              <TableHead className="text-base font-bold text-right">
                Amount
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
            {quotations.map((quote, idx) => (
              <TableRow
                key={quote._id ?? quote.id ?? idx}
                className="border-b-2 border-black last:border-b-0"
              >
                <TableCell className="py-4">
                  <div className="font-bold text-base">
                    {quote.id ||
                      (quote._id
                        ? `PN-${String(idx + 1).padStart(5, "0")}`
                        : "PN-00001")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    by {getAuthorName(quote.authorId)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {quote.deliveryDate
                      ? new Date(quote.deliveryDate).toLocaleDateString()
                      : ""}
                  </div>
                </TableCell>
                <TableCell className="text-base py-4 font-bold">
                  {(quote.clientId &&
                    clientsMap[String(quote.clientId)]?.name) ||
                    quote.clientName ||
                    "Client"}
                </TableCell>
                <TableCell className="text-base py-4">
                  <div className="flex flex-wrap gap-1">
                    {(quote.services ?? []).map((s, sidx) => (
                      <Badge key={`${String(s.id ?? s.name ?? 'service')}-${sidx}`} variant="secondary">
                        {s.name}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold text-base py-4">
                  {formatCurrency((quote.amount ?? 0) - (quote.discount ?? 0))}
                </TableCell>
                <TableCell className="text-center py-4">
                  <Select value={quote.status} onValueChange={(v) => {
                    // update locally by matching id (avoid reference equality issues)
                    setQuotations((prev) => prev.map((q) => {
                      const same = (q as any)._id && (quote as any)._id ? String((q as any)._id) === String((quote as any)._id) : (q as any).id && (quote as any).id ? (q as any).id === (quote as any).id : false;
                      return same ? { ...q, status: v as any } : q;
                    }));
                    // persist to server
                    persistStatus(quote, v);
                  }}>
                    <SelectTrigger className={cn("h-10 px-3", quote.status === "APPROVED" && "bg-success text-success-foreground", quote.status === "REJECTED" && "bg-destructive text-destructive-foreground", quote.status === "PENDING" && "bg-accent text-accent-foreground")}>
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
                    {quote.status === "PENDING" && (
                      <>
                        {quote.id && (
                          <>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                updateStatus(quote.id as string, "REJECTED")
                              }
                            >
                              REJECT
                            </Button>
                            <Button
                              size="sm"
                              className="bg-success text-success-foreground hover:bg-success/90"
                              onClick={() =>
                                updateStatus(quote.id as string, "APPROVED")
                              }
                            >
                              APPROVE
                            </Button>
                          </>
                        )}
                      </>
                    )}
                    {quote.status === "APPROVED" && (
                      <Button
                        size="sm"
                        onClick={() => createProjectFromQuote(quote)}
                      >
                        CREATE PROJECT
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingQuote(quote);
                            setIsDialogOpen(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => generatePdf(quote)}
                          className="font-bold"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            quote.id && deleteQuotation(quote.id as string)
                          }
                          className="text-destructive font-bold"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
