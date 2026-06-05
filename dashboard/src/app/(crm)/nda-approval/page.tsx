"use client";

import { apiFetch } from "@/lib/api-fetch";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import { NdaPDF } from "@/components/nda/nda-pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Download, User } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

export default function NdaApprovalPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const isClient = user?.role === "client";
  const myClientId = (user as any)?.clientId ?? null;

  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [ndaApprovals, setNdaApprovals] = useState<any[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFormState = {
    title: "NDA Approval",
    clientName: "",
    disclosingParty: "",
    receivingParty: "",
    effectiveDate: new Date().toISOString().split("T")[0],
    term: "2 years",
    scope: "",
    confidentialDefinition: "",
    exclusions: "",
    signatureName: "",
    date: new Date().toISOString().split("T")[0],
  };

  const [form, setForm] = useState<any>(initialFormState);

  const update = (k: string, v: any) => setForm((s: any) => ({ ...s, [k]: v }));

  const fetchNdaApprovals = async () => {
    try {
      const url =
        isClient && myClientId
          ? `/api/nda-approvals?clientId=${myClientId}`
          : "/api/nda-approvals";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();

        setNdaApprovals(data.reverse());
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await apiFetch("/api/clients");
        if (!res.ok) throw new Error("Failed to fetch clients");
        const items = await res.json();
        if (!mounted) return;
        setClients(items || []);
      } catch (e) {
        console.error(e);
      }
    })();
    fetchNdaApprovals();
    return () => {
      mounted = false;
    };
  }, [isClient, myClientId]);

  useEffect(() => {
    if (!selectedClientId) return;
    const c = clients.find((x) => (x._id ?? x.id) === selectedClientId);
    if (!c) return;
    setForm((s: any) => ({
      ...s,
      clientName: c.name || c.companyName || s.clientName,
    }));
  }, [selectedClientId, clients]);

  const generatePdf = async (dataToPrint: any = form) => {
    setLoading(true);
    try {
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
      } catch (e) {}

      const pdfBody = renderToString(<NdaPDF data={dataToPrint} />);
      const styledHtml = `<div style="width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;">${pdfBody}</div>`;

      if ((doc as any).html) {
        await new Promise<void>((res, rej) => {
          (doc as any).html(styledHtml, {
            callback: function (doc2: any) {
              try {
                doc2.save(
                  `nda-approval-${(dataToPrint.clientName || "client").replace(/\s+/g, "-")}.pdf`,
                );
                res();
              } catch (e) {
                rej(e);
              }
            },
            x: 0,
            y: 0,
            width: 210,
          });
        });
      } else {
        doc.text(
          "NDA Approval - " + (dataToPrint.clientName || "Client"),
          10,
          10,
        );
        doc.save(
          `nda-approval-${(dataToPrint.clientName || "client").replace(/\s+/g, "-")}.pdf`,
        );
      }
    } catch (e) {
      console.error(e);
      alert("Failed to generate PDF");
    } finally {
      setLoading(false);
    }
  };

  const saveAndGenerate = async () => {
    setLoading(true);
    try {
      const payload = {
        ...form,
        clientId: selectedClientId || myClientId || undefined,
      };
      const res = await apiFetch("/api/nda-approvals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save");

      toast({ title: "Success", description: "NDA record saved." });

      await generatePdf(form);

      await fetchNdaApprovals();
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
      alert("Failed to save NDA");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (clientId?: string) => {
    setForm(initialFormState);
    setSelectedClientId(clientId || null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {isClient ? "My NDA Documents" : "NDA Approvals History"}
          </h2>
          <p className="text-muted-foreground">
            {isClient
              ? "View your signed NDA agreements."
              : "Manage NDA documents and approvals."}
          </p>
        </div>
        {!isClient && (
          <Button onClick={() => handleOpenModal()}>
            <Plus className="mr-2 h-4 w-4" /> New NDA
          </Button>
        )}
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Signature Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ndaApprovals.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center h-24 text-muted-foreground"
                >
                  No NDA history found.
                </TableCell>
              </TableRow>
            ) : (
              ndaApprovals.map((nda) => (
                <TableRow key={nda._id ?? nda.id}>
                  <TableCell className="font-medium">
                    {nda.clientName}
                  </TableCell>
                  <TableCell>{nda.signatureName || "-"}</TableCell>
                  <TableCell>
                    {nda.date ? format(new Date(nda.date), "PP") : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => generatePdf(nda)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>NDA Approval Form</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="md:col-span-2 p-4 bg-muted/50 rounded-lg flex items-center gap-4">
              <User className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Select Client (optional)
                </label>
                <Select
                  value={selectedClientId ?? "__none__"}
                  onValueChange={(v) =>
                    setSelectedClientId(v === "__none__" ? null : v)
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue>
                      {selectedClientId
                        ? clients.find(
                            (c) => (c._id ?? c.id) === selectedClientId,
                          )?.name
                        : "Choose a client to autofill"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">-- None --</SelectItem>
                    {clients.map((c) => (
                      <SelectItem
                        key={c._id ?? c.id}
                        value={String(c._id ?? c.id)}
                      >
                        {c.name} {c.companyName ? `(${c.companyName})` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="md:col-span-2 border-t pt-4 mt-2">
              <h3 className="font-semibold mb-4">Agreement Details</h3>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Client / Party Name
              </label>
              <Input
                value={form.clientName}
                onChange={(e: any) => update("clientName", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Disclosing Party
              </label>
              <Input
                value={form.disclosingParty}
                onChange={(e: any) => update("disclosingParty", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Receiving Party
              </label>
              <Input
                value={form.receivingParty}
                onChange={(e: any) => update("receivingParty", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Effective Date
              </label>
              <Input
                type="date"
                value={form.effectiveDate}
                onChange={(e: any) => update("effectiveDate", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Term</label>
              <Input
                value={form.term}
                onChange={(e: any) => update("term", e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Scope / Description
              </label>
              <Textarea
                rows={6}
                value={form.scope}
                onChange={(e: any) => update("scope", e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Confidential Definition
              </label>
              <Textarea
                rows={4}
                value={form.confidentialDefinition}
                onChange={(e: any) =>
                  update("confidentialDefinition", e.target.value)
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Exclusions
              </label>
              <Textarea
                rows={3}
                value={form.exclusions}
                onChange={(e: any) => update("exclusions", e.target.value)}
              />
            </div>

            <div className="md:col-span-2 border-t pt-4 mt-2">
              <h3 className="font-semibold mb-4">Signature</h3>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Signature Name
              </label>
              <Input
                value={form.signatureName}
                onChange={(e: any) => update("signatureName", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Signature Date
              </label>
              <Input
                type="date"
                value={form.date}
                onChange={(e: any) => update("date", e.target.value)}
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-3 mt-6 border-t pt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveAndGenerate} disabled={loading}>
                {loading ? "Generating..." : "Save & Generate PDF"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
