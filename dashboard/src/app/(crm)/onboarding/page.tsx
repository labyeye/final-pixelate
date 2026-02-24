"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import { OnboardingPDF } from "@/components/onboarding/onboarding-pdf";
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
import { Plus, FileText, Download, User } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const isClient = user?.role === "client";
  const myClientId = (user as any)?.clientId ?? null;

  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<any[]>([]);
  const [onboardings, setOnboardings] = useState<any[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialFormState = {
    clientName: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    projectType: "Website",
    productType: "Website",
    pages: "",
    budget: "",
    startDate: "",
    deadline: "",
    brief: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    deliverables: ["Discovery Call", "Wireframes", "Design", "Development"],
    notes: "",
    projectTitle: "",
    date: new Date().toISOString(),
  };

  const [form, setForm] = useState<any>(initialFormState);

  const update = (k: string, v: any) => setForm((s: any) => ({ ...s, [k]: v }));

  const fetchOnboardings = async () => {
    try {
      const url = isClient && myClientId
        ? `/api/onboarding?clientId=${myClientId}`
        : "/api/onboarding";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setOnboardings(data);
      }
    } catch (error) {
      console.error("Failed to fetch onboardings", error);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/clients");
        if (!res.ok) throw new Error("Failed to load clients");
        const items = await res.json();
        if (!mounted) return;
        setClients(items || []);
      } catch (e) {
        console.error("Could not fetch clients", e);
      }
    })();
    fetchOnboardings();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient, myClientId]);

  // when a client is selected, populate form fields
  useEffect(() => {
    if (!selectedClientId) return;
    const c = clients.find((x) => (x._id ?? x.id) === selectedClientId);
    if (!c) return;
    setForm((s: any) => ({
      ...s,
      clientName: c.name || s.clientName,
      company: c.companyName || c.name || s.company,
      email: c.email || s.email,
      phone: c.phone || s.phone,
      address: c.address || s.address,
      contactName: c.contactPerson || s.contactName,
      contactEmail: c.contactEmail || c.email || s.contactEmail,
      contactPhone: c.contactPhone || c.phone || s.contactPhone,
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
      } catch (e) {
        // ignore font loading errors
      }

      const pdfBody = renderToString(<OnboardingPDF data={dataToPrint} />);
      const styledHtml = `<div style="width:100%;height:100%;margin:0;padding:0;box-sizing:border-box;">${pdfBody}</div>`;

      // use html method if available, otherwise fallback to fromHTML via plugin
      if ((doc as any).html) {
        await new Promise<void>((res, rej) => {
          (doc as any).html(styledHtml, {
            callback: function (doc2: any) {
              try {
                doc2.save(
                  `onboarding-${(dataToPrint.clientName || "client").replace(/\s+/g, "-")}.pdf`,
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
        // fallback: add simple text
        doc.text(
          "Client Onboarding - " + (dataToPrint.clientName || ""),
          10,
          10,
        );
        doc.save(
          `onboarding-${(dataToPrint.clientName || "client").replace(/\s+/g, "-")}.pdf`,
        );
      }
    } catch (e) {
      console.error("Failed to generate PDF", e);
      alert("Failed to generate PDF");
    } finally {
      setLoading(false);
    }
  };

  const saveAndGenerate = async () => {
    // Save first
    setLoading(true);
    try {
      // Attach clientId for filtering
      const payload = {
        ...form,
        clientId: selectedClientId || myClientId || undefined,
      };
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast({ title: "Success", description: "Onboarding record saved." });
        // Generate PDF while modal is open (loading state persists)
        await generatePdf(form);

        // then refresh and close
        await fetchOnboardings();
        setIsModalOpen(false);
      } else {
        const err = await res.json();
        alert("Failed to save: " + (err.error || "Unknown"));
      }
    } catch (e) {
      console.error("Failed to save onboarding", e);
      alert("Failed to save onboarding record");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (clientId?: string) => {
    setForm(initialFormState);
    setSelectedClientId(clientId || null); // resets or sets client
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {isClient ? "My Onboarding Documents" : "Onboarding History"}
          </h2>
          <p className="text-muted-foreground">
            {isClient ? "View your onboarding documents." : "View and manage generated onboarding documents."}
          </p>
        </div>
        {!isClient && (
        <Button onClick={() => handleOpenModal()}>
          <Plus className="mr-2 h-4 w-4" /> New Onboarding
        </Button>
        )}
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead>Project Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {onboardings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center h-24 text-muted-foreground"
                >
                  No onboarding history found.
                </TableCell>
              </TableRow>
            ) : (
              onboardings.map((onb) => (
                <TableRow key={onb._id ?? onb.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{onb.clientName}</span>
                      <span className="text-xs text-muted-foreground">
                        {onb.company}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{onb.projectType}</TableCell>
                  <TableCell>
                    {onb.date ? format(new Date(onb.date), "PP") : "-"}
                  </TableCell>
                  <TableCell>{onb.contactName || onb.email}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => generatePdf(onb)}
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
            <DialogTitle>Client Onboarding Form</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="md:col-span-2 p-4 bg-muted/50 rounded-lg flex items-center gap-4">
              <User className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Select Existing Client
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
              <h3 className="font-semibold mb-4">Project Details</h3>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Client Name
              </label>
              <Input
                value={form.clientName}
                onChange={(e: any) => update("clientName", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <Input
                value={form.company}
                onChange={(e: any) => update("company", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e: any) => update("email", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input
                value={form.phone}
                onChange={(e: any) => update("phone", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <Textarea
                value={form.address}
                onChange={(e: any) => update("address", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Project Type
              </label>
              <Input
                value={form.projectType}
                onChange={(e: any) => update("projectType", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Type (Website/App)
              </label>
              <Input
                value={form.productType}
                onChange={(e: any) => update("productType", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Pages / Modules
              </label>
              <Input
                value={form.pages}
                onChange={(e: any) => update("pages", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Estimated Budget
              </label>
              <Input
                value={form.budget}
                onChange={(e: any) => update("budget", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <Input
                type="date"
                value={form.startDate}
                onChange={(e: any) => update("startDate", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Target Delivery
              </label>
              <Input
                type="date"
                value={form.deadline}
                onChange={(e: any) => update("deadline", e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Project Brief
              </label>
              <Textarea
                rows={6}
                value={form.brief}
                onChange={(e: any) => update("brief", e.target.value)}
              />
            </div>

            <div className="md:col-span-2 border-t pt-4 mt-2">
              <h3 className="font-semibold mb-4">Contact Person</h3>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Primary Contact Name
              </label>
              <Input
                value={form.contactName}
                onChange={(e: any) => update("contactName", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Primary Contact Email
              </label>
              <Input
                value={form.contactEmail}
                onChange={(e: any) => update("contactEmail", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Primary Contact Phone
              </label>
              <Input
                value={form.contactPhone}
                onChange={(e: any) => update("contactPhone", e.target.value)}
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
